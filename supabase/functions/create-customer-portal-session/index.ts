// supabase/functions/create-customer-portal-session/index.ts
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

async function requireUser(url: string, anonKey: string, authHeader: string) {
  const anon = createClient(url, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data, error } = await anon.auth.getUser();
  if (error || !data?.user) return null;
  return data.user;
}

async function getLatestApprovedCompanyId(service: any, userId: string): Promise<string | null> {
  const { data, error } = await service
    .from("company_claims")
    .select("company_id")
    .eq("claimant_user_id", userId)
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("getLatestApprovedCompanyId error:", error);
    return null;
  }

  return data?.company_id ? String(data.company_id) : null;
}

Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    if (req.method !== "POST") {
      return json({ ok: false, error: "Method not allowed" }, 405);
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
    const SITE_URL = Deno.env.get("SITE_URL") ?? "http://localhost:3000";

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
      return json({ ok: false, error: "Supabase env missing" }, 500);
    }

    if (!STRIPE_SECRET_KEY) {
      return json({ ok: false, error: "Stripe env missing" }, 500);
    }

    const authHeader = req.headers.get("authorization") || "";
    const user = await requireUser(SUPABASE_URL, SUPABASE_ANON_KEY, authHeader);

    if (!user) {
      return json({ ok: false, error: "Unauthorized" }, 401);
    }

    const service = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const companyId = await getLatestApprovedCompanyId(service, user.id);
    if (!companyId) {
      return json({ ok: false, error: "No approved company claim found." }, 403);
    }

    const { data: companyPlan, error: planError } = await service
      .from("company_plans")
      .select("stripe_customer_id, stripe_subscription_id, plan")
      .eq("company_id", companyId)
      .maybeSingle();

    if (planError) {
      console.error("company_plans fetch error:", planError);
      return json({ ok: false, error: "Could not load company billing." }, 500);
    }

    const stripeCustomerId = companyPlan?.stripe_customer_id
      ? String(companyPlan.stripe_customer_id)
      : "";

    if (!stripeCustomerId) {
      return json({
        ok: false,
        error: "No Stripe customer found for this company yet.",
      }, 400);
    }

    const form = new URLSearchParams();
    form.set("customer", stripeCustomerId);
    form.set("return_url", `${SITE_URL}/pricing`);

    const resp = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    const data = await resp.json();

    if (!resp.ok) {
      console.error("Stripe portal session creation failed", data);
      return json({
        ok: false,
        error: data?.error?.message || "Could not open billing portal",
      }, 400);
    }

    return json({
      ok: true,
      url: data.url,
      company_id: companyId,
    });
  } catch (e) {
    console.error("create-customer-portal-session fatal error:", e);
    return json({ ok: false, error: "Server error" }, 500);
  }
});