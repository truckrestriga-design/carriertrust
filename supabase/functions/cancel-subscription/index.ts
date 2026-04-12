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

async function getApprovedCompanyId(service: any, userId: string): Promise<string | null> {
  const { data, error } = await service
    .from("company_claims")
    .select("company_id")
    .eq("claimant_user_id", userId)
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) return null;
  if (!data?.company_id) return null;

  return String(data.company_id);
}

async function stripeRequest(
  stripeSecretKey: string,
  path: string,
  init?: RequestInit
) {
  const resp = await fetch(`https://api.stripe.com/v1/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      ...(init?.headers || {}),
    },
  });

  const data = await resp.json();
  return { resp, data };
}

async function stripePost(
  stripeSecretKey: string,
  path: string,
  form: URLSearchParams
) {
  return stripeRequest(stripeSecretKey, path, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });
}

async function stripeGet(stripeSecretKey: string, path: string) {
  return stripeRequest(stripeSecretKey, path, {
    method: "GET",
  });
}

function unixToIso(value: unknown): string | null {
  if (!value || typeof value !== "number") return null;
  return new Date(value * 1000).toISOString();
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
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
    const ANON = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") ?? "";

    if (!SUPABASE_URL || !ANON || !SERVICE) {
      return json({ ok: false, error: "Supabase env missing" }, 500);
    }

    if (!STRIPE_SECRET_KEY) {
      return json({ ok: false, error: "Stripe key missing" }, 500);
    }

    const auth = req.headers.get("authorization") || "";
    const user = await requireUser(SUPABASE_URL, ANON, auth);

    if (!user) {
      return json({ ok: false, error: "Unauthorized" }, 401);
    }

    const service = createClient(SUPABASE_URL, SERVICE);

    const companyId = await getApprovedCompanyId(service, user.id);
    if (!companyId) {
      return json({ ok: false, error: "No approved company claim" }, 403);
    }

    const { data: planRow, error: pErr } = await service
      .from("company_plans")
      .select(
        "stripe_subscription_id, stripe_customer_id, plan, commitment_end, cancel_at_period_end, current_period_end"
      )
      .eq("company_id", companyId)
      .maybeSingle();

    if (pErr) {
      return json({ ok: false, error: pErr.message }, 500);
    }

    const subId = String((planRow as any)?.stripe_subscription_id || "").trim();
    const customerId = String((planRow as any)?.stripe_customer_id || "").trim();
    const plan = String((planRow as any)?.plan || "free").toLowerCase();
    const cancelAtPeriodEnd = Boolean((planRow as any)?.cancel_at_period_end);
    const commitmentEndRaw = (planRow as any)?.commitment_end || null;
    const currentPeriodEndRaw = (planRow as any)?.current_period_end || null;

    if (!subId || plan !== "pro") {
      return json({ ok: false, error: "No active PRO subscription" }, 400);
    }

    if (!customerId) {
      return json({ ok: false, error: "Stripe customer not found" }, 400);
    }

    if (cancelAtPeriodEnd) {
      return json({
        ok: true,
        cancel_at_period_end: true,
        early_cancellation_fee_applied: earlyCancellationFeeApplied,
        fee_invoice_id: feeInvoiceId,
        fee_payment_status: feePaymentStatus,
        current_period_end: stripeCurrentPeriodEnd,
        payment_method_used: paymentMethodToUse,
        source_used: sourceToUse,
      });
    }

    const isEarlyCancellation =
      commitmentEndRaw ? new Date() < new Date(commitmentEndRaw) : false;

    let feeInvoiceId: string | null = null;
    let feePaymentStatus: string | null = null;
    let earlyCancellationFeeApplied = false;

    const subscriptionRes = await stripeGet(
      STRIPE_SECRET_KEY,
      `subscriptions/${encodeURIComponent(subId)}`
    );

    if (!subscriptionRes.resp.ok) {
      return json(
        {
          ok: false,
          error: subscriptionRes.data?.error?.message || "Could not load subscription",
        },
        400
      );
    }

    const subscription = subscriptionRes.data;

    const customerRes = await stripeGet(
      STRIPE_SECRET_KEY,
      `customers/${encodeURIComponent(customerId)}`
    );

    if (!customerRes.resp.ok) {
      return json(
        {
          ok: false,
          error: customerRes.data?.error?.message || "Could not load customer",
        },
        400
      );
    }

    const customer = customerRes.data;

    let paymentMethodToUse =
      asString(subscription?.default_payment_method) ||
      asString(customer?.invoice_settings?.default_payment_method) ||
      null;

    let sourceToUse =
      asString(subscription?.default_source) ||
      asString(customer?.default_source) ||
      null;

    // Если default payment method нет — пробуем взять первую карту клиента
    if (!paymentMethodToUse) {
      const pmListRes = await stripeGet(
        STRIPE_SECRET_KEY,
        `payment_methods?customer=${encodeURIComponent(customerId)}&type=card`
      );

      if (pmListRes.resp.ok && Array.isArray(pmListRes.data?.data) && pmListRes.data.data.length > 0) {
        paymentMethodToUse = asString(pmListRes.data.data[0]?.id);
      }
    }

    if (isEarlyCancellation) {
      const feeItemForm = new URLSearchParams();
      feeItemForm.set("customer", customerId);
      feeItemForm.set("currency", "eur");
      feeItemForm.set("amount", "4900");
      feeItemForm.set("description", "Early cancellation fee");

      const feeItemRes = await stripePost(
        STRIPE_SECRET_KEY,
        "invoiceitems",
        feeItemForm
      );

      if (!feeItemRes.resp.ok) {
        return json(
          {
            ok: false,
            error: feeItemRes.data?.error?.message || "Could not create early cancellation fee item",
          },
          400
        );
      }

      const invoiceCreateForm = new URLSearchParams();
      invoiceCreateForm.set("customer", customerId);
      invoiceCreateForm.set("collection_method", "charge_automatically");
      invoiceCreateForm.set("auto_advance", "false");
      invoiceCreateForm.set("pending_invoice_items_behavior", "include");

      if (paymentMethodToUse) {
        invoiceCreateForm.set("default_payment_method", paymentMethodToUse);
      }

      if (sourceToUse) {
        invoiceCreateForm.set("default_source", sourceToUse);
      }

      const invoiceRes = await stripePost(
        STRIPE_SECRET_KEY,
        "invoices",
        invoiceCreateForm
      );

      if (!invoiceRes.resp.ok) {
        return json(
          {
            ok: false,
            error: invoiceRes.data?.error?.message || "Could not create penalty invoice",
          },
          400
        );
      }

      feeInvoiceId = String(invoiceRes.data?.id || "");

      const finalizeRes = await stripePost(
        STRIPE_SECRET_KEY,
        `invoices/${encodeURIComponent(feeInvoiceId)}/finalize`,
        new URLSearchParams()
      );

      if (!finalizeRes.resp.ok) {
        return json(
          {
            ok: false,
            error: finalizeRes.data?.error?.message || "Could not finalize penalty invoice",
          },
          400
        );
      }

      const payForm = new URLSearchParams();

      if (paymentMethodToUse) {
        payForm.set("payment_method", paymentMethodToUse);
      }

      if (sourceToUse) {
        payForm.set("source", sourceToUse);
      }

      const payRes = await stripePost(
        STRIPE_SECRET_KEY,
        `invoices/${encodeURIComponent(feeInvoiceId)}/pay`,
        payForm
      );

      if (!payRes.resp.ok) {
        return json(
          {
            ok: false,
            error: payRes.data?.error?.message || "Could not charge €49 early cancellation fee",
          },
          400
        );
      }

      feePaymentStatus = String(payRes.data?.status || "");
      earlyCancellationFeeApplied = feePaymentStatus === "paid";

      if (!earlyCancellationFeeApplied) {
        return json(
          {
            ok: false,
            error: "Early cancellation fee was not paid",
          },
          400
        );
      }
    }

    const cancelForm = new URLSearchParams();
    cancelForm.set("cancel_at_period_end", "true");

    const cancelRes = await stripePost(
      STRIPE_SECRET_KEY,
      `subscriptions/${encodeURIComponent(subId)}`,
      cancelForm
    );

    if (!cancelRes.resp.ok) {
      return json(
        { ok: false, error: cancelRes.data?.error?.message || "Stripe error" },
        400
      );
    }

    const stripeCurrentPeriodEnd =
  unixToIso(subscription?.current_period_end) ||
  unixToIso(cancelRes.data?.current_period_end) ||
  currentPeriodEndRaw ||
  null;
  console.log("stripeCurrentPeriodEnd =", stripeCurrentPeriodEnd);
  console.log("subscription.current_period_end =", subscription?.current_period_end);
  console.log("cancelRes.current_period_end =", cancelRes.data?.current_period_end);
const canceledAtIso = new Date().toISOString();

await service
  .from("company_plans")
  .update({
    cancel_at_period_end: true,
    canceled_at: canceledAtIso,
    current_period_end: stripeCurrentPeriodEnd,
  })
  .eq("company_id", companyId);

return json({
  ok: true,
  cancel_at_period_end: true,
  early_cancellation_fee_applied: earlyCancellationFeeApplied,
  fee_invoice_id: feeInvoiceId,
  fee_payment_status: feePaymentStatus,
  current_period_end: stripeCurrentPeriodEnd,
  payment_method_used: paymentMethodToUse,
  source_used: sourceToUse,
});
  } catch (e) {
    console.error("cancel-subscription error:", e);
    return json({ ok: false, error: "Server error" }, 500);
  }
});