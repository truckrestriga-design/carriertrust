// supabase/functions/admin-reviews-list/index.ts
//
// Admin-only. Returns reviews with all statuses using SERVICE ROLE.
//
// GET query params:
//   limit=500
//
// Response:
// {
//   ok: true,
//   rows: [...]
//
// }

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    if (req.method !== "GET") {
      return json({ ok: false, error: "Method not allowed" }, 405);
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") ?? "";

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY || !ADMIN_EMAIL) {
      return json({ ok: false, error: "Server misconfigured (missing secrets)" }, 500);
    }

    const authHeader = req.headers.get("authorization") || "";

    const anon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userErr } = await anon.auth.getUser();
    if (userErr || !userData?.user) {
      return json({ ok: false, error: "Unauthorized" }, 401);
    }

    const adminEmail = (userData.user.email || "").toLowerCase();
    if (adminEmail !== ADMIN_EMAIL.toLowerCase()) {
      return json({ ok: false, error: "Forbidden" }, 403);
    }

    const url = new URL(req.url);
    const limitRaw = Number(url.searchParams.get("limit") || "500");
    const limit = Math.max(1, Math.min(1000, limitRaw));

    const service = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 1) Load reviews only
    const { data: reviews, error: reviewsError } = await service
      .from("reviews")
      .select("id, created_at, rating, issue_type, review_text, status, company_id")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (reviewsError) {
      return json(
        { ok: false, error: "Failed to load reviews", details: reviewsError.message },
        500
      );
    }

    const safeReviews = reviews || [];

    // 2) Load company data separately
    const companyIds = Array.from(
      new Set(
        safeReviews
          .map((r) => r.company_id)
          .filter((v): v is string => typeof v === "string" && v.length > 0)
      )
    );

    let companyMap = new Map<
      string,
      {
        name: string | null;
        vat_uid: string | null;
        is_verified_company: boolean | null;
        verified_at: string | null;
      }
    >();

    if (companyIds.length > 0) {
      const { data: companies, error: companiesError } = await service
        .from("companies")
        .select("id, name, vat_uid, is_verified_company, verified_at")
        .in("id", companyIds);

      if (companiesError) {
        return json(
          { ok: false, error: "Failed to load companies", details: companiesError.message },
          500
        );
      }

      companyMap = new Map(
        (companies || []).map((c: any) => [
          c.id,
          {
            name: c.name ?? null,
            vat_uid: c.vat_uid ?? null,
            is_verified_company: c.is_verified_company ?? null,
            verified_at: c.verified_at ?? null,
          },
        ])
      );
    }

    // 3) Merge manually
    const rows = safeReviews.map((r: any) => ({
      ...r,
      companies: r.company_id ? companyMap.get(r.company_id) ?? null : null,
    }));

    return json({
      ok: true,
      rows,
    });
  } catch (e) {
    console.error("admin-reviews-list error:", e);
    return json({ ok: false, error: "Internal error" }, 500);
  }
});