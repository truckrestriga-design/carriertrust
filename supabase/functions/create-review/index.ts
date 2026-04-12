import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

async function sha256Hex(input: string) {
  const buf = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  const bytes = Array.from(new Uint8Array(hash));
  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
}

type FraudEvent = { type: string; severity: number; meta?: any };

Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    if (req.method !== "POST") {
      return json({ ok: false, error: "Method not allowed" }, 405);
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const ANON = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!SUPABASE_URL || !ANON || !SERVICE) {
      return json({ ok: false, error: "Server misconfigured (missing secrets)" }, 500);
    }

    const authHeader = req.headers.get("authorization") || "";

    const anon = createClient(SUPABASE_URL, ANON, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userErr } = await anon.auth.getUser();

    if (userErr || !userData?.user) {
      return json({ ok: false, error: "Unauthorized" }, 401);
    }

    const user = userData.user;
    const body = await req.json().catch(() => ({}));

    const company_id = String(body.company_id || "").trim();
    const rating = clamp(Number(body.rating ?? 0), 1, 5);
    const issue_type = String(body.issue_type || "").trim();
    const review_text = String(body.review_text || "").trim();

    const author_company = String(body.author_company || "").trim();
    const author_company_vat = String(body.author_company_vat || "").trim().toUpperCase() || null;

    if (!company_id || !review_text || !issue_type || !rating || !author_company) {
      return json({ ok: false, error: "Missing fields" }, 400);
    }

    const service = createClient(SUPABASE_URL, SERVICE);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

    const { data: existing, error: exErr } = await service
      .from("reviews")
      .select("id, created_at")
      .eq("company_id", company_id)
      .eq("author_user_id", user.id)
      .gte("created_at", startOfToday.toISOString())
      .lt("created_at", startOfTomorrow.toISOString())
      .limit(1);

    if (exErr) {
      return json(
        {
          ok: false,
          error: "Duplicate check failed",
          details: exErr.message,
        },
        500,
      );
    }

    if (existing?.length) {
      return json({
        ok: false,
        code: "DUPLICATE_DAILY",
        error: "Sorry, you can only leave one review per company per day.",
      });
    }

    const ip_address =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      null;

    const user_agent = req.headers.get("user-agent") || null;
    const ip_hash = ip_address ? await sha256Hex(`ip:${ip_address}`) : null;

    const events: FraudEvent[] = [];
    let risk_score = 0;

    if (rating <= 2) risk_score += 1;
    if (review_text.length < 40) risk_score += 1;

    try {
      const { data: companyRow } = await service
        .from("companies")
        .select("vat_uid")
        .eq("id", company_id)
        .single();

      const targetVat = String(companyRow?.vat_uid || "").trim().toUpperCase();

      if (author_company_vat && targetVat && author_company_vat === targetVat) {
        risk_score += 3;
        events.push({
          type: "self_review",
          severity: 4,
          meta: { author_company_vat, targetVat },
        });
      }
    } catch {
      // ignore
    }

    try {
      const { count: attackCount } = await service
        .from("reviews")
        .select("id", { count: "exact", head: true })
        .eq("company_id", company_id)
        .gte("created_at", new Date(Date.now() - 15 * 60 * 1000).toISOString());

      if ((attackCount ?? 0) >= 5) {
        risk_score += 2;
        events.push({
          type: "mass_attack",
          severity: 3,
          meta: { attackCount: attackCount ?? 0 },
        });
      }
    } catch {
      // ignore
    }

    if (ip_hash) {
      try {
        const { count: burstCount } = await service
          .from("review_traces")
          .select("id", { count: "exact", head: true })
          .eq("ip_hash", ip_hash)
          .gte("created_at", new Date(Date.now() - 10 * 60 * 1000).toISOString());

        if ((burstCount ?? 0) >= 5) {
          risk_score += 2;
          events.push({
            type: "ip_burst",
            severity: 3,
            meta: { burstCount: burstCount ?? 0 },
          });
        }
      } catch {
        // ignore
      }

      try {
        const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const { data: rows } = await service
          .from("review_traces")
          .select("user_id")
          .eq("ip_hash", ip_hash)
          .gte("created_at", since24h)
          .limit(200);

        const uniq = new Set((rows || []).map((r: any) => String(r.user_id || "")));
        uniq.delete("");
        const uniqCount = uniq.size;

        if (uniqCount >= 3) {
          risk_score += 2;
          events.push({
            type: "same_ip_multi_account",
            severity: 4,
            meta: { uniqUsers24h: uniqCount },
          });
        } else if (uniqCount === 2) {
          risk_score += 1;
          events.push({
            type: "same_ip_two_accounts",
            severity: 2,
            meta: { uniqUsers24h: uniqCount },
          });
        }
      } catch {
        // ignore
      }
    }

    risk_score = clamp(risk_score, 0, 5);
    const is_flagged = risk_score >= 3;

    const { data: created, error: insErr } = await service
      .from("reviews")
      .insert({
        company_id,
        author_user_id: user.id,
        author_email: user.email,
        author_company,
        author_company_vat,
        rating,
        issue_type,
        review_text,
        status: "published",
        risk_score,
        is_flagged,
      })
      .select("id")
      .single();

    if (insErr || !created?.id) {
      return json(
        {
          ok: false,
          error: "Failed to publish",
          details: insErr?.message || "unknown",
        },
        500,
      );
    }

    const review_id = created.id;

    try {
      await service.from("review_traces").insert({
        review_id,
        company_id,
        user_id: user.id,
        ip_address,
        user_agent,
        ip_hash,
      });
    } catch {
      // ignore
    }

    try {
      for (const ev of events) {
        await service.from("fraud_events").insert({
          type: ev.type,
          severity: ev.severity,
          review_id,
          company_id,
          user_id: user.id,
          meta: ev.meta ?? {},
        });
      }
    } catch {
      // ignore
    }

    let moderation: any = null;
    try {
      const m = await service.functions.invoke("auto-moderate", {
        body: { review_id, company_id },
      });
      moderation = (m as any)?.data ?? null;
    } catch {
      moderation = { ok: false, error: "auto-moderate invoke failed" };
    }

    let reviewAlert: any = null;
    try {
      const a = await service.functions.invoke("send-review-alert", {
        body: {
          review_id,
          company_id,
          review_text,
          rating,
          issue_type,
          author_email: user.email,
          author_company,
        },
      });
      reviewAlert = (a as any)?.data ?? null;
    } catch {
      reviewAlert = { ok: false, error: "send-review-alert invoke failed" };
    }

    return json({
      ok: true,
      review_id,
      company_id,
      risk_score,
      flagged: is_flagged,
      moderation,
      reviewAlert,
    });
  } catch (e: any) {
    console.error("create-review error:", e);
    return json(
      {
        ok: false,
        error: "Internal error",
        details: String(e?.message || e),
      },
      500,
    );
  }
});