import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, PATCH, OPTIONS",
};

function json(status: number, data: unknown) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json; charset=utf-8" },
  });
}

function getBearer(req: Request) {
  const h = req.headers.get("authorization") || "";
  return h.startsWith("Bearer ") ? h.slice(7) : "";
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const ADMIN_EMAIL = (Deno.env.get("ADMIN_EMAIL") || "").toLowerCase();

    if (!SUPABASE_URL) return json(500, { error: "Missing SUPABASE_URL" });
    if (!SUPABASE_ANON_KEY) return json(500, { error: "Missing SUPABASE_ANON_KEY" });
    if (!SUPABASE_SERVICE_ROLE_KEY) return json(500, { error: "Missing SUPABASE_SERVICE_ROLE_KEY" });
    if (!ADMIN_EMAIL) return json(500, { error: "Missing ADMIN_EMAIL secret" });

    // --------- Auth check (через JWT пользователя) ----------
    const token = getBearer(req);
    if (!token) return json(401, { error: "Missing Authorization Bearer token" });

    const supabaseAuth = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false },
    });

    const { data: userRes, error: userErr } = await supabaseAuth.auth.getUser();
    if (userErr) {
      console.error("auth.getUser error:", userErr);
      return json(401, { error: "Invalid JWT", details: userErr.message });
    }

    const userEmail = (userRes.user?.email || "").toLowerCase();
    if (!userRes.user || userEmail !== ADMIN_EMAIL) {
      return json(403, { error: "Forbidden (not admin)" });
    }

    // --------- Admin client (service role) ----------
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // =========================================================
    // GET: список отзывов + ответ компании (если есть)
    // =========================================================
    if (req.method === "GET") {
      const url = new URL(req.url);
      const limit = Math.min(parseInt(url.searchParams.get("limit") || "250", 10) || 250, 500);
      const q = (url.searchParams.get("q") || "").trim().toLowerCase();

      // Берём reviews + companies + review_replies
      // (Если у тебя связка по FK называется иначе — скажи, поправим)
      const query = supabaseAdmin
        .from("reviews")
        .select(
          `
          id, created_at, rating, issue_type, review_text, status,
          company_id,
          companies(name, vat_uid),
          review_replies(id, reply_text, updated_at)
        `,
        )
        .order("created_at", { ascending: false })
        .limit(limit);

      const { data, error } = await query;
      if (error) {
        console.error("GET admin-replies db error:", error);
        return json(500, { error: "Failed to load replies", details: error.message });
      }

      let rows: any[] = (data || []) as any[];

      if (q) {
        rows = rows.filter((r) => {
          const companyName = String(r?.companies?.name || "").toLowerCase();
          const vat = String(r?.companies?.vat_uid || "").toLowerCase();
          const text = String(r?.review_text || "").toLowerCase();
          const st = String(r?.status || "").toLowerCase();
          return companyName.includes(q) || vat.includes(q) || text.includes(q) || st.includes(q);
        });
      }

      return json(200, { ok: true, data: rows });
    }

    // =========================================================
    // PATCH: сохранить/обновить reply
    // body: { review_id: string, reply_text: string }
    // =========================================================
    if (req.method === "PATCH") {
      let body: any = {};
      try {
        body = await req.json();
      } catch {
        return json(400, { error: "Invalid JSON" });
      }

      const review_id = String(body?.review_id || "").trim();
      const reply_text = String(body?.reply_text || "").trim();

      if (!review_id) return json(400, { error: "Missing review_id" });
      if (!reply_text) return json(400, { error: "Missing reply_text" });
      if (reply_text.length > 5000) return json(400, { error: "reply_text too long (max 5000)" });

      // Нужен company_id (берём из reviews)
      const { data: rev, error: revErr } = await supabaseAdmin
        .from("reviews")
        .select("id, company_id")
        .eq("id", review_id)
        .maybeSingle();

      if (revErr) {
        console.error("PATCH load review error:", revErr);
        return json(500, { error: "Failed to load review", details: revErr.message });
      }
      if (!rev) return json(404, { error: "Review not found" });

      const company_id = rev.company_id;

      // upsert reply (желательно чтобы в review_replies был UNIQUE(review_id))
      const { data: up, error: upErr } = await supabaseAdmin
        .from("review_replies")
        .upsert(
          {
            review_id,
            company_id,
            reply_text,
            author_user_id: userRes.user.id,
            author_email: userRes.user.email,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "review_id" },
        )
        .select("id, review_id, reply_text, updated_at")
        .single();

      if (upErr) {
        console.error("PATCH upsert reply error:", upErr);
        return json(500, { error: "Failed to save reply", details: upErr.message });
      }

      return json(200, { ok: true, data: up });
    }

    return json(405, { error: "Method not allowed" });
  } catch (e) {
    console.error("admin-replies unexpected error:", e);
    return json(500, { error: "Unexpected error", details: String((e as any)?.message || e) });
  }
});