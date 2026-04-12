// supabase/functions/create-checkout-session/index.ts
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

type CompanyPlanRow = {
  plan: string | null;
  plan_status: string | null;
  current_period_end: string | null;
  commitment_end: string | null;
  scheduled_plan: string | null;
  scheduled_start_at: string | null;
  scheduled_setup_intent_id: string | null;
  scheduled_stripe_subscription_id: string | null;
};

async function getCompanyPlan(service: any, companyId: string): Promise<CompanyPlanRow | null> {
  const { data, error } = await service
    .from("company_plans")
    .select(
      "plan, plan_status, current_period_end, commitment_end, scheduled_plan, scheduled_start_at, scheduled_setup_intent_id, scheduled_stripe_subscription_id"
    )
    .eq("company_id", companyId)
    .maybeSingle();

  if (error) {
    console.error("getCompanyPlan error:", error);
    return null;
  }

  return (data as CompanyPlanRow) || null;
}

function normalizePlan(value: string | null | undefined) {
  return String(value || "free").toLowerCase();
}

function isFutureIso(value: string | null | undefined) {
  if (!value) return false;
  const t = new Date(value).getTime();
  return Number.isFinite(t) && t > Date.now();
}

async function createStripeCustomer(params: {
  stripeSecretKey: string;
  email: string | null | undefined;
  userId: string;
  companyId: string;
}) {
  const form = new URLSearchParams();

  if (params.email) {
    form.set("email", params.email);
  }

  form.set("metadata[user_id]", params.userId);
  form.set("metadata[company_id]", params.companyId);

  const resp = await fetch("https://api.stripe.com/v1/customers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.stripeSecretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  const data = await resp.json();

  if (!resp.ok) {
    console.error("createStripeCustomer failed", data);
    throw new Error(data?.error?.message || "Could not create Stripe customer");
  }

  return String(data.id);
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
    const STRIPE_PRICE_PRO_MONTHLY = Deno.env.get("STRIPE_PRICE_PRO_MONTHLY") ?? "";
    const STRIPE_PRICE_ONE_MONTH = Deno.env.get("STRIPE_PRICE_ONE_MONTH") ?? "";
    const SITE_URL = Deno.env.get("SITE_URL") ?? "http://localhost:3000";

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing Supabase env");
      return json({ ok: false, error: "Supabase env missing" }, 500);
    }

    if (!STRIPE_SECRET_KEY || !STRIPE_PRICE_PRO_MONTHLY || !STRIPE_PRICE_ONE_MONTH) {
      console.error("Missing Stripe env");
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
      return json(
        {
          ok: false,
          code: "NO_COMPANY",
          error: "No approved company claim. Please claim and verify your company first.",
        },
        403
      );
    }

    const body = await req.json().catch(() => ({}));
    const purchase = String(body?.purchase || "pro_monthly").toLowerCase();

    if (purchase !== "pro_monthly" && purchase !== "one_month") {
      return json({ ok: false, error: "Invalid purchase type" }, 400);
    }

    const currentPlanRow = await getCompanyPlan(service, companyId);
    const currentPlan = normalizePlan(currentPlanRow?.plan);
    const currentPeriodEnd = currentPlanRow?.current_period_end || null;
    const scheduledPlan = normalizePlan(currentPlanRow?.scheduled_plan);
    const scheduledStartAt = currentPlanRow?.scheduled_start_at || null;

    const hasActiveOneMonth =
      currentPlan === "one_month" &&
      normalizePlan(currentPlanRow?.plan_status) === "active" &&
      isFutureIso(currentPeriodEnd);

    const hasActivePro = currentPlan === "pro";

    const hasScheduledPro =
      scheduledPlan === "pro" &&
      isFutureIso(scheduledStartAt);

    if (purchase === "pro_monthly" && (hasActivePro || hasScheduledPro)) {
      return json({
        ok: true,
        already_paid_plan: true,
        company_id: companyId,
        current_plan: currentPlan,
        scheduled_plan: scheduledPlan,
        scheduled_start_at: scheduledStartAt,
      });
    }

    if (purchase === "one_month" && hasActiveOneMonth) {
      return json({
        ok: true,
        already_paid_plan: true,
        company_id: companyId,
        current_plan: currentPlan,
      });
    }

    const delayedUpgradeFromOneMonth =
      purchase === "pro_monthly" && hasActiveOneMonth && Boolean(currentPeriodEnd);

    const successUrl = delayedUpgradeFromOneMonth
      ? `${SITE_URL}/pricing?paid=1&purchase=${encodeURIComponent(
          purchase
        )}&delayed_upgrade=1&delayed_until=${encodeURIComponent(
          String(currentPeriodEnd)
        )}&session_id={CHECKOUT_SESSION_ID}`
      : `${SITE_URL}/pricing?paid=1&purchase=${encodeURIComponent(
          purchase
        )}&session_id={CHECKOUT_SESSION_ID}`;

    console.log("create-checkout-session start", {
      user_id: user.id,
      email: user.email ?? null,
      company_id: companyId,
      purchase,
      current_plan: currentPlan,
      current_period_end: currentPeriodEnd,
      scheduled_plan: scheduledPlan,
      scheduled_start_at: scheduledStartAt,
      delayed_upgrade_from_one_month: delayedUpgradeFromOneMonth,
    });

    // DELAYED PRO AFTER ACTIVE ONE MONTH
    // setup mode, so checkout does not show "29 days free"
    if (delayedUpgradeFromOneMonth && currentPeriodEnd) {
      const customerId = await createStripeCustomer({
        stripeSecretKey: STRIPE_SECRET_KEY,
        email: user.email,
        userId: user.id,
        companyId,
      });

      const form = new URLSearchParams();
      form.set("mode", "setup");
      form.set("currency", "eur"); // ВАЖНО: без этого Stripe ругается Missing required param: currency
      form.set("customer", customerId);
      form.set("success_url", successUrl);
      form.set(
        "cancel_url",
        `${SITE_URL}/pricing?canceled=1&purchase=${encodeURIComponent(purchase)}`
      );

      form.set("metadata[user_id]", user.id);
      form.set("metadata[company_id]", companyId);
      form.set("metadata[purchase]", purchase);
      form.set("metadata[upgrade_mode]", "delayed_from_one_month");
      form.set("metadata[delayed_until]", currentPeriodEnd);

      const stripeResp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form.toString(),
      });

      const stripeData = await stripeResp.json();

      if (!stripeResp.ok) {
        console.error("Stripe setup checkout creation failed", stripeData);

        return json(
          {
            ok: false,
            code: "STRIPE_ERROR",
            error: stripeData?.error?.message || "Stripe error",
            stripe_http_status: stripeResp.status,
            stripe_type: stripeData?.error?.type || null,
            stripe_code: stripeData?.error?.code || null,
          },
          400
        );
      }

      console.log("create-checkout-session success (setup mode)", {
        session_id: stripeData?.id ?? null,
        company_id: companyId,
        purchase,
        delayed_until: currentPeriodEnd,
        checkout_url: stripeData?.url ?? null,
      });

      return json({
        ok: true,
        url: stripeData.url,
        session_id: stripeData.id,
        company_id: companyId,
        purchase,
        mode: "setup",
        delayed_upgrade_from_one_month: true,
        delayed_until: currentPeriodEnd,
      });
    }

    // ONE MONTH OR IMMEDIATE PRO
    const isOneMonth = purchase === "one_month";
    const mode = isOneMonth ? "payment" : "subscription";
    const priceId = isOneMonth ? STRIPE_PRICE_ONE_MONTH : STRIPE_PRICE_PRO_MONTHLY;

    const form = new URLSearchParams();
    form.set("mode", mode);
    form.set("success_url", successUrl);
    form.set(
      "cancel_url",
      `${SITE_URL}/pricing?canceled=1&purchase=${encodeURIComponent(purchase)}`
    );

    form.set("client_reference_id", user.id);

    if (user.email) {
      form.set("customer_email", user.email);
    }

    form.set("line_items[0][price]", priceId);
    form.set("line_items[0][quantity]", "1");

    form.set("metadata[user_id]", user.id);
    form.set("metadata[company_id]", companyId);
    form.set("metadata[purchase]", purchase);

    if (!isOneMonth) {
      form.set("subscription_data[metadata][user_id]", user.id);
      form.set("subscription_data[metadata][company_id]", companyId);
      form.set("subscription_data[metadata][purchase]", purchase);
      form.set("subscription_data[metadata][upgrade_mode]", "immediate");
    }

    const stripeResp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    const stripeData = await stripeResp.json();

    if (!stripeResp.ok) {
      console.error("Stripe checkout session creation failed", stripeData);

      return json(
        {
          ok: false,
          code: "STRIPE_ERROR",
          error: stripeData?.error?.message || "Stripe error",
          stripe_http_status: stripeResp.status,
          stripe_type: stripeData?.error?.type || null,
          stripe_code: stripeData?.error?.code || null,
        },
        400
      );
    }

    console.log("create-checkout-session success", {
      session_id: stripeData?.id ?? null,
      company_id: companyId,
      purchase,
      mode,
      checkout_url: stripeData?.url ?? null,
    });

    return json({
      ok: true,
      url: stripeData.url,
      session_id: stripeData.id,
      company_id: companyId,
      purchase,
      mode,
      delayed_upgrade_from_one_month: false,
      delayed_until: null,
    });
  } catch (e) {
    console.error("create-checkout-session fatal error:", e);
    return json({ ok: false, error: "Server error" }, 500);
  }
});