// supabase/functions/recompute-review-risk/index.ts
//
// Admin-only Edge Function.
// Recomputes risk_score (0..10), is_flagged, risk_level, risk_reasons for reviews.
//
// POST body examples:
// 1) { "review_id": "uuid" }
// 2) { "company_id": "uuid", "limit": 50 }
// 3) { "limit": 100 }  // latest reviews across all companies
//
// Response:
// { ok:true, updated:number, items:[{review_id, risk_score, is_flagged, risk_level, reasons}] }

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

function normalizeText(s: string) {
  return (s || "")
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, " ") // remove urls
    .replace(/[^\p{L}\p{N}\s]+/gu, " ") // remove punctuation (unicode)
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(s: string) {
  const t = normalizeText(s);
  if (!t) return [];
  return t.split(" ").filter(Boolean);
}

function jaccard(a: string[], b: string[]) {
  const A = new Set(a);
  const B = new Set(b);
  if (A.size === 0 && B.size === 0) return 1;
  if (A.size === 0 || B.size === 0) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  const union = A.size + B.size - inter;
  return union ? inter / union : 0;
}

function isFreeEmail(email: string) {
  const domain = (email.split("@")[1] || "").toLowerCase();
  const blocked = new Set([
    "gmail.com",
    "googlemail.com",
    "yahoo.com",
    "yahoo.co.uk",
    "outlook.com",
    "hotmail.com",
    "live.com",
    "icloud.com",
    "aol.com",
    "proton.me",
    "protonmail.com",
    "gmx.com",
    "mail.com",
    "yandex.ru",
    "yandex.com",
  ]);
  return domain ? blocked.has(domain) : false;
}

type ReviewRow = {
  id: string;
  created_at: string;
  company_id: string | null;
  rating: number | null;
  issue_type: string | null;
  review_text: string | null;
  author_email: string | null;
  author_company: string | null;
  author_company_vat: string | null;
};

type RiskResult = {
  risk_score: number; // 0..10
  risk_level: "low" | "medium" | "high";
  is_flagged: boolean;
  reasons: { code: string; weight: number; detail?: string }[];
};

function computeRiskLocal(input: {
  review: ReviewRow;
  burst_count_1h: number; // how many other reviews in last hour for this company
  same_email_count_30d: number;
  same_text_exact_count_180d: number;
  near_duplicate_max_jaccard: number; // 0..1
}) : RiskResult {
  const r = input.review;
  const reasons: { code: string; weight: number; detail?: string }[] = [];
  let score = 0;

  const textRaw = (r.review_text || "").trim();
  const textNorm = normalizeText(textRaw);

  // Signal 1: missing identity fields (weak)
  if (!r.author_email && !r.author_company) {
    score += 1;
    reasons.push({ code: "missing_identity", weight: 1, detail: "no email and no company provided" });
  }

  // Signal 2: free email provider (weak-medium)
  if (r.author_email && isFreeEmail(r.author_email)) {
    score += 1;
    reasons.push({ code: "free_email", weight: 1, detail: "free email provider" });
  }

  // Signal 3: very short / low-effort text
  if (textNorm.length > 0 && textNorm.length < 25) {
    score += 2;
    reasons.push({ code: "very_short_text", weight: 2, detail: `len=${textNorm.length}` });
  } else if (textNorm.length >= 25 && textNorm.length < 60) {
    score += 1;
    reasons.push({ code: "short_text", weight: 1, detail: `len=${textNorm.length}` });
  }

  // Signal 4: burst activity (possible attack / campaign)
  // 0.. -> +0, >=3 -> +2, >=8 -> +3
  if (input.burst_count_1h >= 8) {
    score += 3;
    reasons.push({ code: "burst_1h_high", weight: 3, detail: `count=${input.burst_count_1h}` });
  } else if (input.burst_count_1h >= 3) {
    score += 2;
    reasons.push({ code: "burst_1h", weight: 2, detail: `count=${input.burst_count_1h}` });
  }

  // Signal 5: same email posting multiple times in 30 days for same company
  if (input.same_email_count_30d >= 2) {
    score += 2;
    reasons.push({ code: "repeat_same_email_30d", weight: 2, detail: `count=${input.same_email_count_30d}` });
  }

  // Signal 6: exact duplicated text for same company (strong)
  if (input.same_text_exact_count_180d >= 1 && textNorm.length >= 20) {
    score += 4;
    reasons.push({ code: "duplicate_text_exact", weight: 4, detail: `matches=${input.same_text_exact_count_180d}` });
  }

  // Signal 7: near-duplicate (jaccard similarity)
  // if >0.85 consider suspicious
  if (input.near_duplicate_max_jaccard >= 0.85 && textNorm.length >= 40) {
    score += 3;
    reasons.push({ code: "near_duplicate_text", weight: 3, detail: `jaccard=${input.near_duplicate_max_jaccard.toFixed(2)}` });
  }

  // Signal 8: extreme rating combined with burst/short (pattern of attacks)
  const rating = typeof r.rating === "number" ? r.rating : null;
  const extreme = rating === 1 || rating === 5;
  if (extreme && (input.burst_count_1h >= 3 || textNorm.length < 60)) {
    score += 1;
    reasons.push({ code: "extreme_rating_pattern", weight: 1, detail: `rating=${rating}` });
  }

  score = clamp(score, 0, 10);
  const risk_level = score >= 7 ? "high" : score >= 4 ? "medium" : "low";
  const is_flagged = score >= 7; // threshold

  return { risk_score: score, risk_level, is_flagged, reasons };
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
    const review_id = body.review_id ? String(body.review_id).trim() : null;
    const company_id = body.company_id ? String(body.company_id).trim() : null;
    const limit = clamp(Number(body.limit || 100), 1, 500);

    const service = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Select target reviews
    let target: ReviewRow[] = [];

    if (review_id) {
      const { data, error } = await service
        .from("reviews")
        .select("id, created_at, company_id, rating, issue_type, review_text, author_email, author_company, author_company_vat")
        .eq("id", review_id)
        .single();

      if (error || !data) return json({ ok: false, error: "Review not found", details: error?.message }, 404);
      target = [data as any];
    } else {
      let q = service
        .from("reviews")
        .select("id, created_at, company_id, rating, issue_type, review_text, author_email, author_company, author_company_vat")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (company_id) q = q.eq("company_id", company_id);

      const { data, error } = await q;
      if (error) return json({ ok: false, error: "Failed to load reviews", details: error.message }, 500);
      target = (data as any) || [];
    }

    const items: any[] = [];
    let updated = 0;

    for (const r of target) {
      if (!r.company_id) continue;

      const createdAt = new Date(r.created_at);
      const nowIso = new Date().toISOString();

      // 1) burst count last 1h (other reviews same company)
      const oneHourAgo = new Date(createdAt.getTime() - 60 * 60 * 1000).toISOString();
      const { count: burstCount, error: burstErr } = await service
        .from("reviews")
        .select("id", { count: "exact", head: true })
        .eq("company_id", r.company_id)
        .gte("created_at", oneHourAgo)
        .lte("created_at", r.created_at);

      const burst_count_1h = !burstErr && typeof burstCount === "number" ? Math.max(0, burstCount - 1) : 0;

      // 2) same email count 30d (same company)
      let same_email_count_30d = 0;
      if (r.author_email) {
        const d30 = new Date(createdAt.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
        const { count, error } = await service
          .from("reviews")
          .select("id", { count: "exact", head: true })
          .eq("company_id", r.company_id)
          .eq("author_email", r.author_email)
          .gte("created_at", d30)
          .lte("created_at", r.created_at);

        if (!error && typeof count === "number") same_email_count_30d = Math.max(0, count - 1);
      }

      // 3) duplicate text exact 180d (same company)
      let same_text_exact_count_180d = 0;
      const norm = normalizeText(r.review_text || "");
      if (norm.length >= 20) {
        const d180 = new Date(createdAt.getTime() - 180 * 24 * 60 * 60 * 1000).toISOString();
        // we load recent reviews to compare normalized text in JS (simple + safe)
        const { data: candidates, error: candErr } = await service
          .from("reviews")
          .select("id, review_text, created_at")
          .eq("company_id", r.company_id)
          .gte("created_at", d180)
          .lte("created_at", r.created_at)
          .order("created_at", { ascending: false })
          .limit(200);

        if (!candErr && candidates) {
          for (const c of candidates as any[]) {
            if (c.id === r.id) continue;
            const cn = normalizeText(c.review_text || "");
            if (cn && cn === norm) same_text_exact_count_180d++;
          }
        }
      }

      // 4) near-duplicate (max jaccard)
      let near_duplicate_max_jaccard = 0;
      const tokens = tokenize(r.review_text || "");
      if (tokens.length >= 8) {
        const d180 = new Date(createdAt.getTime() - 180 * 24 * 60 * 60 * 1000).toISOString();
        const { data: candidates, error: candErr } = await service
          .from("reviews")
          .select("id, review_text, created_at")
          .eq("company_id", r.company_id)
          .gte("created_at", d180)
          .lte("created_at", r.created_at)
          .order("created_at", { ascending: false })
          .limit(120);

        if (!candErr && candidates) {
          for (const c of candidates as any[]) {
            if (c.id === r.id) continue;
            const jt = jaccard(tokens, tokenize(c.review_text || ""));
            if (jt > near_duplicate_max_jaccard) near_duplicate_max_jaccard = jt;
          }
        }
      }

      const rr = computeRiskLocal({
        review: r,
        burst_count_1h,
        same_email_count_30d,
        same_text_exact_count_180d,
        near_duplicate_max_jaccard,
      });

      const { error: updErr } = await service
        .from("reviews")
        .update({
          risk_score: rr.risk_score,
          risk_level: rr.risk_level,
          is_flagged: rr.is_flagged,
          risk_reasons: rr.reasons,
          risk_updated_at: nowIso,
        })
        .eq("id", r.id);

      if (updErr) {
        console.error("risk update error", r.id, updErr);
        continue;
      }

      updated++;
      items.push({
        review_id: r.id,
        risk_score: rr.risk_score,
        risk_level: rr.risk_level,
        is_flagged: rr.is_flagged,
        reasons: rr.reasons,
      });
    }

    return json({ ok: true, updated, items });
  } catch (e) {
    console.error("recompute-review-risk error:", e);
    return json({ ok: false, error: "Internal error" }, 500);
  }
});