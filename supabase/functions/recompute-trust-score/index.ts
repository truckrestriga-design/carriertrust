// supabase/functions/recompute-trust-score/index.ts
//
// Admin-only now (later: scheduled / trigger-based).
// Computes Trust Score v1 for one company OR for a batch.
//
// POST body:
// {
//   "company_id": "uuid"?,
//   "limit": 50?   // if company_id omitted, recompute latest companies (optional)
// }
//
// Response:
// { ok:true, updated:number, items:[{company_id, trust_score, trust_level}] }

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders: Record<string, string> = {
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

// Trust Score v1 (simple + explainable)
// Inputs:
// - avg_rating (1..5)
// - reviews_count
// - reports_count (complaints)
// - replies_ratio (how often company replies)
//
// Output:
// - score 0..100
// - level: low / medium / high
function computeTrustScore(input: {
  avg_rating: number;
  reviews_count: number;
  reports_count: number;
  replied_reviews_count: number;
}) {
  const avg = clamp(input.avg_rating, 1, 5);
  const n = Math.max(0, input.reviews_count);
  const reports = Math.max(0, input.reports_count);
  const replied = Math.max(0, input.replied_reviews_count);

  // 1) Rating component (0..70)
  // 1★ -> 0, 5★ -> 70
  const ratingScore = ((avg - 1) / 4) * 70;

  // 2) Volume confidence (0..15)
  // More reviews => more confidence, but diminishing returns.
  // 0 reviews => 0, 10 reviews => ~10, 50 reviews => ~15
  const volumeScore = 15 * (1 - Math.exp(-n / 15));

  // 3) Complaints penalty (0..-25)
  // Each report hurts, but saturates.
  const complaintPenalty = -25 * (1 - Math.exp(-reports / 8));

  // 4) Responsiveness bonus (0..+10)
  // replies ratio among reviews, but capped.
  const replyRatio = n > 0 ? replied / n : 0;
  const responsivenessScore = 10 * clamp(replyRatio, 0, 1);

  const raw = ratingScore + volumeScore + complaintPenalty + responsivenessScore;
  const score = Math.round(clamp(raw, 0, 100));

  const level = score >= 75 ? "high" : score >= 45 ? "medium" : "low";

  const breakdown = {
    version: "v1",
    components: {
      ratingScore: Math.round(ratingScore),
      volumeScore: Math.round(volumeScore),
      complaintPenalty: Math.round(complaintPenalty),
      responsivenessScore: Math.round(responsivenessScore),
    },
    signals: {
      avg_rating: Number(avg.toFixed(2)),
      reviews_count: n,
      reports_count: reports,
      replied_reviews_count: replied,
      reply_ratio: Number(replyRatio.toFixed(2)),
    },
  };

  return { score, level, breakdown };
}

Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
    if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") ?? "";

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY || !ADMIN_EMAIL) {
      return json({ ok: false, error: "Server misconfigured (missing secrets)" }, 500);
    }

    // Admin auth
    const authHeader = req.headers.get("authorization") || "";
    const anon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userErr } = await anon.auth.getUser();
    if (userErr || !userData?.user) return json({ ok: false, error: "Unauthorized" }, 401);
    if ((userData.user.email || "").toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return json({ ok: false, error: "Forbidden" }, 403);
    }

    const body = await req.json().catch(() => ({}));
    const company_id = body.company_id ? String(body.company_id).trim() : null;
    const limit = clamp(Number(body.limit || 50), 1, 200);

    const service = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Decide which companies to recompute
    let companies: { id: string }[] = [];

    if (company_id) {
      companies = [{ id: company_id }];
    } else {
      // latest updated / latest created companies (simple selection)
      const { data, error } = await service
        .from("companies")
        .select("id")
        .order("updated_at", { ascending: false })
        .limit(limit);

      if (error) return json({ ok: false, error: "Failed to load companies", details: error.message }, 500);
      companies = (data as any) ?? [];
    }

    const items: any[] = [];
    let updated = 0;

    for (const c of companies) {
      // 1) Reviews stats
      const { data: reviewAgg, error: rErr } = await service
        .from("reviews")
        .select("rating, id")
        .eq("company_id", c.id)
        .eq("status", "published");

      if (rErr) {
        console.error("reviews load error", c.id, rErr);
        continue;
      }

      const ratings = (reviewAgg ?? []).map((x: any) => Number(x.rating)).filter((n: any) => Number.isFinite(n));
      const reviews_count = ratings.length;
      const avg_rating = reviews_count ? ratings.reduce((a: number, b: number) => a + b, 0) / reviews_count : 0;

      const reviewIds = (reviewAgg ?? []).map((x: any) => x.id);

      // 2) Reports count (complaints)
      // If your reports table name differs, tell me and I’ll adapt.
      let reports_count = 0;
      if (reviewIds.length) {
        const { count, error: repErr } = await service
          .from("reports")
          .select("id", { count: "exact", head: true })
          .in("review_id", reviewIds);

        if (!repErr && typeof count === "number") reports_count = count;
      }

      // 3) Replies count (responsiveness)
      // If your replies table name differs, tell me and I’ll adapt.
      let replied_reviews_count = 0;
      if (reviewIds.length) {
        const { data: reps, error: rrErr } = await service
          .from("review_replies")
          .select("review_id")
          .in("review_id", reviewIds);

        if (!rrErr && reps) {
          const unique = new Set((reps as any[]).map((x) => x.review_id));
          replied_reviews_count = unique.size;
        }
      }

      const { score, level, breakdown } = computeTrustScore({
        avg_rating: reviews_count ? avg_rating : 1, // if no reviews, treat as minimal baseline
        reviews_count,
        reports_count,
        replied_reviews_count,
      });

      const now = new Date().toISOString();

      const { error: updErr } = await service
        .from("companies")
        .update({
          trust_score: score,
          trust_level: level,
          trust_updated_at: now,
          trust_breakdown: breakdown,
        })
        .eq("id", c.id);

      if (updErr) {
        console.error("company update error", c.id, updErr);
        continue;
      }

      // Write history row (optional)
      await service.from("company_trust_history").insert({
        company_id: c.id,
        trust_score: score,
        trust_level: level,
        breakdown,
      });

      updated += 1;
      items.push({ company_id: c.id, trust_score: score, trust_level: level });
    }

    return json({ ok: true, updated, items });
  } catch (e) {
    console.error("recompute-trust-score error:", e);
    return json({ ok: false, error: "Internal error" }, 500);
  }
});