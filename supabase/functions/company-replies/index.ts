// supabase/functions/company-replies/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function requireUser(url: string, anonKey: string, authHeader: string) {
  const anon = createClient(url, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data, error } = await anon.auth.getUser();
  if (error || !data?.user) return null;
  return data.user;
}

async function requireApprovedClaim(service: any, user_id: string, company_id: string) {
  const { data, error } = await service
    .from("company_claims")
    .select("status")
    .eq("company_id", company_id)
    .eq("claimant_user_id", user_id)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) return { ok: false, error: error.message };
  if (!data?.length) return { ok: false, error: "No claim" };

  const st = String((data[0] as any).status || "").toLowerCase();
  if (st !== "approved") return { ok: false, error: "Claim not approved" };

  return { ok: true, error: null };
}

type UserPlan = "free" | "pro" | "business";

function normalizePlan(v: unknown): UserPlan {
  const s = String(v || "free").toLowerCase();
  if (s === "business") return "business";
  if (s === "pro") return "pro";
  return "free";
}

async function getUserPlan(service: any, user_id: string): Promise<UserPlan> {
  const { data, error } = await service.from("profiles").select("plan").eq("id", user_id).maybeSingle();
  if (error) return "free";
  return normalizePlan((data as any)?.plan);
}

type PlanRow = {
  plan: string | null;
  replies_limit: number | null;
  replies_used: number | null;
};

async function getCompanyPlan(service: any, company_id: string): Promise<PlanRow | null> {
  const { data, error } = await service
    .from("company_plans")
    .select("plan, replies_limit, replies_used")
    .eq("company_id", company_id)
    .maybeSingle();

  if (error) return null;
  return (data as any) as PlanRow;
}

async function upsertCompanyPlan(service: any, company_id: string, plan: string, replies_limit: number, replies_used: number) {
  await service
    .from("company_plans")
    .upsert(
      {
        company_id,
        plan,
        replies_limit,
        replies_used,
      },
      { onConflict: "company_id" }
    );
}

function parseReviewIdsFromUrl(url: URL): string[] {
  const raw = url.searchParams.get("review_ids") || "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function publicGetReplies(service: any, company_id: string, review_ids: string[]) {
  if (!company_id) return { ok: false, error: "company_id required" };

  let q = service
    .from("review_replies")
    .select("review_id, reply_text, updated_at")
    .eq("company_id", company_id)
    .eq("status", "published")
    .order("updated_at", { ascending: false });

  if (review_ids.length > 0) {
    q = q.in("review_id", review_ids);
  }

  const { data, error } = await q;
  if (error) return { ok: false, error: error.message };

  const replies = (data || []).map((r: any) => ({
    review_id: String(r.review_id),
    reply_text: r.reply_text ?? null,
    updated_at: r.updated_at ?? null,
  }));

  return { ok: true, replies };
}

Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const ANON = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!SUPABASE_URL || !ANON || !SERVICE) {
      return json({ ok: false, error: "Server misconfigured (missing env)" }, 500);
    }

    const service = createClient(SUPABASE_URL, SERVICE);
    const url = new URL(req.url);

    // PUBLIC
    if (req.method === "GET") {
      const company_id = String(url.searchParams.get("company_id") || "").trim();
      const review_ids = parseReviewIdsFromUrl(url);
      const result = await publicGetReplies(service, company_id, review_ids);
      if (!result.ok) return json({ ok: false, error: result.error }, 400);
      return json({ ok: true, replies: result.replies });
    }

    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const company_id = String(body.company_id || "").trim();
      const review_ids = Array.isArray(body.review_ids)
        ? body.review_ids.map((x: any) => String(x || "").trim()).filter(Boolean)
        : [];
      const result = await publicGetReplies(service, company_id, review_ids);
      if (!result.ok) return json({ ok: false, error: result.error }, 400);
      return json({ ok: true, replies: result.replies });
    }

    // PATCH (owner only)
    if (req.method === "PATCH") {
      const auth = req.headers.get("authorization") || "";
      const user = await requireUser(SUPABASE_URL, ANON, auth);
      if (!user) return json({ ok: false, error: "Unauthorized" }, 401);

      const body = await req.json().catch(() => ({}));
      const review_id = String(body.review_id || "").trim();
      const reply_text = String(body.reply_text || "").trim();

      if (!review_id) return json({ ok: false, error: "review_id required" }, 400);
      if (reply_text.length < 2) return json({ ok: false, error: "reply too short" }, 400);

      const userPlan = await getUserPlan(service, user.id);

      // 1) get review -> company_id
      const { data: review, error: rErr } = await service
        .from("reviews")
        .select("id, company_id")
        .eq("id", review_id)
        .single();

      if (rErr || !review) return json({ ok: false, error: "Review not found" }, 404);

      const company_id = String((review as any).company_id || "");
      if (!company_id) return json({ ok: false, error: "Review has no company_id" }, 500);

      // 2) check claim
      const claim = await requireApprovedClaim(service, user.id, company_id);
      if (!claim.ok) return json({ ok: false, error: "Not company owner" }, 403);

      // 3) check existing reply
      const { data: existing, error: exErr } = await service
        .from("review_replies")
        .select("id")
        .eq("review_id", review_id)
        .limit(1);

      if (exErr) return json({ ok: false, error: exErr.message }, 500);

      // UPDATE: NEW RULE -> FREE cannot edit
      if (existing?.length) {
        if (userPlan === "free") {
          return json(
            {
              ok: false,
              code: "PLAN_EDIT_BLOCKED",
              error: "Editing replies is available on PRO.",
            },
            403
          );
        }

        const { error: updErr } = await service
          .from("review_replies")
          .update({
            reply_text,
            updated_at: new Date().toISOString(),
            status: "published",
          })
          .eq("id", (existing[0] as any).id);

        if (updErr) return json({ ok: false, error: "Failed to update reply", details: updErr.message }, 500);

        return json({ ok: true, updated: true });
      }

      // CREATE: FREE allows only 1 total
      if (userPlan === "free") {
        const planRow = await getCompanyPlan(service, company_id);
        const used = Number(planRow?.replies_used ?? 0);
        const safeUsed = Number.isFinite(used) ? Math.max(0, used) : 0;

        if (safeUsed >= 1) {
          return json(
            {
              ok: false,
              code: "PLAN_LIMIT",
              error: "Free plan allows only 1 reply. Upgrade to PRO.",
            },
            403
          );
        }
      }

      const { error: insErr } = await service.from("review_replies").insert({
        review_id,
        company_id,
        author_user_id: user.id,
        reply_text,
        status: "published",
      });

      if (insErr) return json({ ok: false, error: "Failed to create reply", details: insErr.message }, 500);

      if (userPlan === "free") {
        const planRow = await getCompanyPlan(service, company_id);
        const used = Number(planRow?.replies_used ?? 0);
        const safeUsed = Number.isFinite(used) ? Math.max(0, used) : 0;

        await upsertCompanyPlan(service, company_id, "free", 1, safeUsed + 1);
      }

      return json({ ok: true, created: true });
    }

    return json({ ok: false, error: "Method not allowed" }, 405);
  } catch (e) {
    console.error("company-replies error:", e);
    return json({ ok: false, error: "Server error" }, 500);
  }
});