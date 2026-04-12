import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const service = createClient(SUPABASE_URL, SERVICE);

    const body = await req.json().catch(() => ({}));
    const review_id = String(body.review_id || "").trim();
    const company_id = String(body.company_id || "").trim();

    if (!review_id || !company_id) return json({ ok: false, error: "missing review_id/company_id" }, 400);

    // 1) Load review
    const { data: review, error: rErr } = await service
      .from("reviews")
      .select("id, company_id, risk_score, is_flagged, status")
      .eq("id", review_id)
      .single();

    if (rErr || !review) return json({ ok: false, error: "review not found" }, 404);

    // 2) Auto-hide high risk reviews
    if ((review.risk_score ?? 0) >= 4) {
      await service
        .from("reviews")
        .update({ status: "hidden", is_flagged: true })
        .eq("id", review_id);

      await service.from("fraud_events").insert({
        type: "auto_hidden_review",
        severity: 4,
        review_id,
        company_id,
        user_id: null,
        meta: { risk_score: review.risk_score },
      });
    }

    // 3) Company fraud stats
    const { count: flaggedCount, error: fErr } = await service
      .from("reviews")
      .select("id", { count: "exact", head: true })
      .eq("company_id", company_id)
      .eq("is_flagged", true);

    if (fErr) return json({ ok: false, error: "flagged count failed", details: fErr.message }, 500);

    const { count: totalCount, error: tErr } = await service
      .from("reviews")
      .select("id", { count: "exact", head: true })
      .eq("company_id", company_id);

    if (tErr) return json({ ok: false, error: "total count failed", details: tErr.message }, 500);

    const flagged = flaggedCount ?? 0;
    const total = totalCount ?? 0;

    // 4) Fraud scoring (v1 baseline)
    let fraud_score = 0;

    if (flagged >= 3) fraud_score += 2;
    if (flagged >= 6) fraud_score += 3;
    if (flagged >= 10) fraud_score += 5;

    if (total > 0) {
      const ratio = flagged / total;
      if (ratio > 0.4) fraud_score += 3;
      if (ratio > 0.6) fraud_score += 5;
    }

    // Extra signal: many fraud_events recently (last 24h)
    const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: events24h } = await service
      .from("fraud_events")
      .select("id", { count: "exact", head: true })
      .eq("company_id", company_id)
      .gte("created_at", since24h);

    if ((events24h ?? 0) >= 5) fraud_score += 2;
    if ((events24h ?? 0) >= 10) fraud_score += 3;

    fraud_score = Math.max(0, Math.min(100, fraud_score));

    let risk_level: "low" | "medium" | "high" = "low";
    if (fraud_score >= 8) risk_level = "high";
    else if (fraud_score >= 4) risk_level = "medium";

    await service
      .from("companies")
      .update({
        fraud_score,
        risk_level,
        auto_flagged: fraud_score >= 6,
      })
      .eq("id", company_id);

    // Optional: log company update event
    await service.from("fraud_events").insert({
      type: "company_fraud_score_updated",
      severity: risk_level === "high" ? 4 : risk_level === "medium" ? 2 : 1,
      company_id,
      review_id,
      user_id: null,
      meta: { fraud_score, risk_level, flagged, total, events24h: events24h ?? 0 },
    });

    return json({ ok: true, company_id, fraud_score, risk_level, flagged, total });
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: "server error" }, 500);
  }
});