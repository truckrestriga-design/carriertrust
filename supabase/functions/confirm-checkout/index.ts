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
  const anon = createClient(url, anonKey, { global: { headers: { Authorization: authHeader } } });
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

  if (error) return null;
  const companyId = (data as any)?.company_id ? String((data as any).company_id) : null;
  return companyId;
}

Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
    if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const ANON = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") ?? "";

    if (!SUPABASE_URL || !ANON || !SERVICE) return json({ ok: false, error: "Supabase env missing" }, 500);
    if (!STRIPE_SECRET_KEY) return json({ ok: false, error: "Stripe env missing" }, 500);

    const auth = req.headers.get("authorization") || "";
    const user = await requireUser(SUPABASE_URL, ANON, auth);
    if (!user) return json({ ok: false, error: "Unauthorized" }, 401);

    const body = await req.json().catch(() => ({}));
    const session_id = String(body.session_id || "").trim();
    if (!session_id) return json({ ok: false, error: "session_id required" }, 400);

    const service = createClient(SUPABASE_URL, SERVICE);

    // 1) Получаем Checkout Session из Stripe
    const sResp = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(session_id)}?expand[]=subscription`, {
      method: "GET",
      headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` },
    });

    const session = await sResp.json();
    if (!sResp.ok) {
      return json(
        {
          ok: false,
          code: "STRIPE_ERROR",
          error: session?.error?.message || "Stripe error",
          stripe: { http_status: sResp.status },
        },
        400
      );
    }

    // 2) Безопасность: проверяем, что сессия действительно пользователя
    const clientRef = String(session?.client_reference_id || "");
    if (!clientRef || clientRef !== user.id) {
      return json({ ok: false, error: "Session does not belong to user" }, 403);
    }

    // 3) Проверяем оплату
    // Stripe: paid обычно subscription mode, payment_status='paid' после успешной оплаты
    const paymentStatus = String(session?.payment_status || "").toLowerCase();
    if (paymentStatus !== "paid") {
      return json({ ok: false, error: `Payment not completed (status=${paymentStatus || "unknown"})` }, 400);
    }

    const subscription = session?.subscription || null;
    const subscriptionId = subscription?.id ? String(subscription.id) : null;
    const customerId = session?.customer ? String(session.customer) : null;

    const periodEndUnix = subscription?.current_period_end ? Number(subscription.current_period_end) : null;
    const periodEnd = periodEndUnix ? new Date(periodEndUnix * 1000).toISOString() : null;

    // 4) Активируем PRO в profiles
    const { error: updErr } = await service
      .from("profiles")
      .update({
        plan: "pro",
        plan_status: "active",
        plan_started_at: new Date().toISOString(),
        plan_current_period_end: periodEnd,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
      })
      .eq("id", user.id);

    if (updErr) return json({ ok: false, error: updErr.message }, 500);

    // 5) И для company_plans (unlimited replies)
    const companyId = await getLatestApprovedCompanyId(service, user.id);
    if (companyId) {
      // replies_limit: null = unlimited
      await service.from("company_plans").upsert(
        {
          company_id: companyId,
          plan: "pro",
          replies_limit: null,
          // replies_used оставляем как есть
        },
        { onConflict: "company_id" }
      );
    }

    return json({ ok: true, activated: true, plan: "pro", plan_current_period_end: periodEnd });
  } catch (e) {
    console.error("confirm-checkout error:", e);
    return json({ ok: false, error: "Server error" }, 500);
  }
});