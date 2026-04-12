// supabase/functions/stripe-webhook/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, stripe-signature",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a[i] ^ b[i];
  return result === 0;
}

async function hmacSha256Hex(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  const bytes = new Uint8Array(signature);
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function parseStripeSignatureHeader(sigHeader: string) {
  const parts = sigHeader.split(",").map((p) => p.trim());
  const timestamp = parts.find((p) => p.startsWith("t="))?.slice(2) || "";
  const signatures = parts
    .filter((p) => p.startsWith("v1="))
    .map((p) => p.slice(3))
    .filter(Boolean);

  return { timestamp, signatures };
}

function getUnixNow() {
  return Math.floor(Date.now() / 1000);
}

async function verifyStripeSignature(rawBody: string, sigHeader: string, webhookSecret: string) {
  if (!sigHeader) return { ok: false, error: "Missing stripe-signature header" };

  const { timestamp, signatures } = parseStripeSignatureHeader(sigHeader);

  if (!timestamp || signatures.length === 0) {
    return { ok: false, error: "Invalid stripe-signature header format" };
  }

  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) {
    return { ok: false, error: "Invalid stripe-signature timestamp" };
  }

  const age = Math.abs(getUnixNow() - ts);
  if (age > 300) {
    return { ok: false, error: "Stripe signature timestamp too old" };
  }

  const signedPayload = `${timestamp}.${rawBody}`;
  const expectedHex = await hmacSha256Hex(webhookSecret, signedPayload);

  const expectedBytes = new TextEncoder().encode(expectedHex);

  for (const sig of signatures) {
    const sigBytes = new TextEncoder().encode(sig);
    if (timingSafeEqual(expectedBytes, sigBytes)) {
      return { ok: true, error: null };
    }
  }

  return { ok: false, error: "Stripe signature verification failed" };
}

function toIsoFromUnixSeconds(value: unknown): string | null {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  return new Date(n * 1000).toISOString();
}

function plusDaysIso(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

function plusMonthsIso(months: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toISOString();
}

function isFutureIso(value: string | null | undefined) {
  if (!value) return false;
  const t = new Date(value).getTime();
  return Number.isFinite(t) && t > Date.now();
}

type ExistingCompanyPlan = {
  plan: string | null;
  plan_status: string | null;
  current_period_end: string | null;
  commitment_end: string | null;
  scheduled_plan: string | null;
  scheduled_start_at: string | null;
  scheduled_setup_intent_id: string | null;
  scheduled_stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
};

async function getCompanyPlan(service: any, companyId: string): Promise<ExistingCompanyPlan | null> {
  const { data, error } = await service
    .from("company_plans")
    .select(
      "plan, plan_status, current_period_end, commitment_end, scheduled_plan, scheduled_start_at, scheduled_setup_intent_id, scheduled_stripe_subscription_id, stripe_customer_id, stripe_subscription_id"
    )
    .eq("company_id", companyId)
    .maybeSingle();

  if (error) {
    console.error("getCompanyPlan error", error);
    return null;
  }

  return (data as ExistingCompanyPlan) || null;
}

async function upsertCompanyPlan(
  service: any,
  companyId: string,
  payload: {
    plan: "free" | "pro" | "one_month";
    plan_status: string | null;
    current_period_end?: string | null;
    commitment_end?: string | null;
    scheduled_plan?: string | null;
    scheduled_start_at?: string | null;
    scheduled_setup_intent_id?: string | null;
    scheduled_stripe_subscription_id?: string | null;
    stripe_customer_id?: string | null;
    stripe_subscription_id?: string | null;
    replies_limit?: number | null;
  }
) {
  const row: Record<string, unknown> = {
    company_id: companyId,
    plan: payload.plan,
    plan_status: payload.plan_status ?? null,
    current_period_end: payload.current_period_end ?? null,
    commitment_end: payload.commitment_end ?? null,
    scheduled_plan: payload.scheduled_plan ?? null,
    scheduled_start_at: payload.scheduled_start_at ?? null,
    scheduled_setup_intent_id: payload.scheduled_setup_intent_id ?? null,
    scheduled_stripe_subscription_id: payload.scheduled_stripe_subscription_id ?? null,
    stripe_customer_id: payload.stripe_customer_id ?? null,
    stripe_subscription_id: payload.stripe_subscription_id ?? null,
  };

  if (payload.replies_limit !== undefined) {
    row.replies_limit = payload.replies_limit;
  }

  console.log("upsertCompanyPlan payload", row);

  const { data, error } = await service
    .from("company_plans")
    .upsert(row, { onConflict: "company_id" })
    .select();

  if (error) {
    console.error("upsertCompanyPlan error", error);
    throw new Error(error.message);
  }

  console.log("upsertCompanyPlan success", data);
}

async function setFree(service: any, companyId: string) {
  const existing = await getCompanyPlan(service, companyId);

  await upsertCompanyPlan(service, companyId, {
    plan: "free",
    plan_status: "inactive",
    current_period_end: null,
    commitment_end: null,
    scheduled_plan: null,
    scheduled_start_at: null,
    scheduled_setup_intent_id: null,
    scheduled_stripe_subscription_id: null,
    stripe_customer_id: existing?.stripe_customer_id || null,
    stripe_subscription_id: null,
    replies_limit: 1,
  });
}

async function setOneMonth(service: any, companyId: string, customerId: string | null) {
  const existing = await getCompanyPlan(service, companyId);

  await upsertCompanyPlan(service, companyId, {
    plan: "one_month",
    plan_status: "active",
    current_period_end: plusDaysIso(30),
    commitment_end: null,
    scheduled_plan: null,
    scheduled_start_at: null,
    scheduled_setup_intent_id: null,
    scheduled_stripe_subscription_id: null,
    stripe_customer_id: customerId || existing?.stripe_customer_id || null,
    stripe_subscription_id: null,
    replies_limit: null,
  });
}

async function setScheduledPro(
  service: any,
  companyId: string,
  params: {
    startAtIso: string;
    setupIntentId: string | null;
    subscriptionId: string | null;
    customerId: string | null;
  }
) {
  const existing = await getCompanyPlan(service, companyId);

  await upsertCompanyPlan(service, companyId, {
    plan: (existing?.plan as "free" | "pro" | "one_month") || "one_month",
    plan_status: existing?.plan_status || "active",
    current_period_end: existing?.current_period_end || params.startAtIso,
    commitment_end: existing?.commitment_end || null,
    scheduled_plan: "pro",
    scheduled_start_at: params.startAtIso,
    scheduled_setup_intent_id: params.setupIntentId,
    scheduled_stripe_subscription_id: params.subscriptionId,
    stripe_customer_id: params.customerId || existing?.stripe_customer_id || null,
    stripe_subscription_id: existing?.stripe_subscription_id || null,
    replies_limit: null,
  });
}

async function setPro(
  service: any,
  companyId: string,
  params: {
    periodEndIso: string | null;
    commitmentEndIso: string | null;
    customerId: string | null;
    subscriptionId: string | null;
  }
) {
  await upsertCompanyPlan(service, companyId, {
    plan: "pro",
    plan_status: "active",
    current_period_end: params.periodEndIso,
    commitment_end: params.commitmentEndIso,
    scheduled_plan: null,
    scheduled_start_at: null,
    scheduled_setup_intent_id: null,
    scheduled_stripe_subscription_id: null,
    stripe_customer_id: params.customerId,
    stripe_subscription_id: params.subscriptionId,
    replies_limit: null,
  });
}

async function stripeGet(stripeSecretKey: string, path: string) {
  const resp = await fetch(`https://api.stripe.com${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
    },
  });

  const data = await resp.json();

  if (!resp.ok) {
    console.error("stripeGet failed", path, data);
    throw new Error(data?.error?.message || "Stripe GET failed");
  }

  return data;
}

async function stripePost(stripeSecretKey: string, path: string, form: URLSearchParams) {
  const resp = await fetch(`https://api.stripe.com${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  const data = await resp.json();

  if (!resp.ok) {
    console.error("stripePost failed", path, data);
    throw new Error(data?.error?.message || "Stripe POST failed");
  }

  return data;
}

function isoToUnixSeconds(iso: string) {
  return Math.floor(new Date(iso).getTime() / 1000);
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
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";
    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
    const STRIPE_PRICE_PRO_MONTHLY = Deno.env.get("STRIPE_PRICE_PRO_MONTHLY") ?? "";

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return json({ ok: false, error: "Supabase env missing" }, 500);
    }

    if (!STRIPE_WEBHOOK_SECRET || !STRIPE_SECRET_KEY || !STRIPE_PRICE_PRO_MONTHLY) {
      console.error("Missing Stripe env in webhook", {
        hasWebhookSecret: Boolean(STRIPE_WEBHOOK_SECRET),
        hasStripeSecret: Boolean(STRIPE_SECRET_KEY),
        hasProPrice: Boolean(STRIPE_PRICE_PRO_MONTHLY),
      });
      return json({ ok: false, error: "Stripe env missing" }, 500);
    }

    const signatureHeader = req.headers.get("stripe-signature") || "";
    const rawBody = await req.text();

    const verified = await verifyStripeSignature(rawBody, signatureHeader, STRIPE_WEBHOOK_SECRET);

    if (!verified.ok) {
      console.error("stripe-webhook signature verification failed", verified.error);
      return json({ ok: false, error: verified.error }, 400);
    }

    const event = JSON.parse(rawBody);
    const eventType = String(event?.type || "");
    const obj = event?.data?.object ?? {};

    console.log("stripe-webhook event", {
      type: eventType,
      object_id: obj?.id ?? null,
    });

    const service = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    if (eventType === "checkout.session.completed") {
      const mode = String(obj?.mode || "");
      const paymentStatus = String(obj?.payment_status || "").toLowerCase();
      const purchase = String(obj?.metadata?.purchase || "").toLowerCase();
      const companyId = obj?.metadata?.company_id ? String(obj.metadata.company_id) : "";
      const upgradeMode = String(obj?.metadata?.upgrade_mode || "").toLowerCase();
      const customerId = obj?.customer ? String(obj.customer) : "";

      console.log("checkout.session.completed parsed", {
        mode,
        paymentStatus,
        purchase,
        companyId,
        upgradeMode,
        customerId,
        setupIntent: obj?.setup_intent ?? null,
      });

      if (!companyId) {
        return json({ ok: true, ignored: true, reason: "missing company_id" });
      }

      if (mode === "payment" && paymentStatus === "paid" && purchase === "one_month") {
        await setOneMonth(service, companyId, customerId || null);
        return json({ ok: true, applied: "one_month" });
      }

      if (mode === "setup" && purchase === "pro_monthly" && upgradeMode === "delayed_from_one_month") {
        const delayedUntil = String(obj?.metadata?.delayed_until || "");
        const setupIntentId = obj?.setup_intent ? String(obj.setup_intent) : "";

        console.log("delayed setup checkout branch", {
          delayedUntil,
          setupIntentId,
          customerId,
        });

        if (!delayedUntil || !customerId || !setupIntentId) {
          console.error("Missing delayed subscription data", {
            delayedUntil,
            setupIntentId,
            customerId,
          });
          return json({ ok: false, error: "Missing delayed subscription data" }, 400);
        }

        const existingPlan = await getCompanyPlan(service, companyId);

        if (
          existingPlan?.scheduled_plan === "pro" &&
          existingPlan?.scheduled_start_at &&
          isFutureIso(existingPlan.scheduled_start_at)
        ) {
          console.log("already scheduled, ignoring duplicate");
          return json({ ok: true, already_scheduled: true });
        }

        const setupIntent = await stripeGet(
          STRIPE_SECRET_KEY,
          `/v1/setup_intents/${encodeURIComponent(setupIntentId)}`
        );

        const paymentMethodId = setupIntent?.payment_method
          ? String(setupIntent.payment_method)
          : "";

        console.log("setup intent fetched", {
          paymentMethodId,
        });

        if (!paymentMethodId) {
          console.error("SetupIntent payment_method missing");
          return json({ ok: false, error: "SetupIntent payment_method missing" }, 400);
        }

        const form = new URLSearchParams();
        form.set("customer", customerId);
        form.set("items[0][price]", STRIPE_PRICE_PRO_MONTHLY);
        form.set("default_payment_method", paymentMethodId);
        form.set("trial_end", String(isoToUnixSeconds(delayedUntil)));

        form.set("metadata[company_id]", companyId);
        form.set("metadata[purchase]", "pro_monthly");
        form.set("metadata[upgrade_mode]", "delayed_from_one_month");
        form.set("metadata[delayed_until]", delayedUntil);

        const subscription = await stripePost(
          STRIPE_SECRET_KEY,
          "/v1/subscriptions",
          form
        );

        console.log("subscription created for delayed pro", {
          subscriptionId: subscription?.id ?? null,
          customerId,
        });

        await setScheduledPro(service, companyId, {
          startAtIso: delayedUntil,
          setupIntentId,
          subscriptionId: String(subscription.id),
          customerId,
        });

        console.log("scheduled pro saved in db");

        return json({
          ok: true,
          applied: "delayed_pro_subscription_created",
          subscription_id: subscription.id,
        });
      }

      if (mode === "subscription" && purchase === "pro_monthly") {
        console.log("immediate pro checkout completed; waiting subscription events");
        return json({ ok: true, applied: "pro_checkout_wait_subscription_events" });
      }

      console.log("checkout.session.completed ignored");
      return json({ ok: true, ignored: true });
    }

    if (eventType === "customer.subscription.created" || eventType === "customer.subscription.updated") {
      const status = String(obj?.status || "").toLowerCase();
      const purchase = String(obj?.metadata?.purchase || "").toLowerCase();
      const companyId = obj?.metadata?.company_id ? String(obj.metadata.company_id) : "";
      const upgradeMode = String(obj?.metadata?.upgrade_mode || "immediate").toLowerCase();

      const periodEndIso = toIsoFromUnixSeconds(obj?.current_period_end);
      const trialEndIso = toIsoFromUnixSeconds(obj?.trial_end);
      const commitmentEndIso = plusMonthsIso(12);
      const subscriptionId = obj?.id ? String(obj.id) : "";
      const customerId = obj?.customer ? String(obj.customer) : "";

      console.log("subscription event parsed", {
        status,
        purchase,
        companyId,
        upgradeMode,
        periodEndIso,
        trialEndIso,
        subscriptionId,
        customerId,
      });

      if (!companyId) {
        return json({ ok: true, ignored: true, reason: "missing company_id" });
      }

      if (purchase !== "pro_monthly") {
        return json({ ok: true, ignored: true, reason: "not pro_monthly" });
      }

      if (upgradeMode === "delayed_from_one_month" && status === "trialing" && isFutureIso(trialEndIso)) {
        await setScheduledPro(service, companyId, {
          startAtIso: trialEndIso!,
          setupIntentId: null,
          subscriptionId,
          customerId,
        });

        console.log("scheduled pro refreshed from subscription event");

        return json({ ok: true, deferred: true, applied: "waiting_until_one_month_end" });
      }

      const isActive = status === "active" || status === "trialing" || status === "past_due";

      if (isActive) {
        await setPro(service, companyId, {
          periodEndIso,
          commitmentEndIso,
          customerId,
          subscriptionId,
        });
        console.log("active pro saved");
      } else {
        await setFree(service, companyId);
        console.log("plan set to free from subscription event");
      }

      return json({ ok: true, applied: "subscription_sync" });
    }

    if (eventType === "customer.subscription.deleted") {
      const companyId = obj?.metadata?.company_id ? String(obj.metadata.company_id) : "";
      const upgradeMode = String(obj?.metadata?.upgrade_mode || "immediate").toLowerCase();

      console.log("subscription deleted event", {
        companyId,
        upgradeMode,
      });

      if (!companyId) {
        return json({ ok: true, ignored: true, reason: "missing company_id" });
      }

      if (upgradeMode === "delayed_from_one_month") {
        const existingPlan = await getCompanyPlan(service, companyId);

        if (
          existingPlan?.plan === "one_month" &&
          existingPlan?.plan_status === "active" &&
          isFutureIso(existingPlan?.current_period_end)
        ) {
          await upsertCompanyPlan(service, companyId, {
            plan: "one_month",
            plan_status: "active",
            current_period_end: existingPlan.current_period_end,
            commitment_end: null,
            scheduled_plan: null,
            scheduled_start_at: null,
            scheduled_setup_intent_id: null,
            scheduled_stripe_subscription_id: null,
            stripe_customer_id: existingPlan.stripe_customer_id,
            stripe_subscription_id: null,
            replies_limit: null,
          });

          console.log("kept existing one month after delayed sub deletion");

          return json({ ok: true, kept_existing_one_month: true });
        }
      }

      await setFree(service, companyId);
      console.log("set free after subscription deleted");
      return json({ ok: true, applied: "subscription_deleted" });
    }

    console.log("event ignored", eventType);
    return json({ ok: true, ignored: true, event_type: eventType });
  } catch (e) {
    console.error("stripe-webhook fatal error:", e);
    return json({ ok: false, error: "Server error" }, 500);
  }
});