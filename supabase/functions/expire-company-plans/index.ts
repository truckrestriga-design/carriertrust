// supabase/functions/expire-company-plans/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function isPast(value: string | null | undefined) {
  if (!value) return false;
  const t = new Date(value).getTime();
  return Number.isFinite(t) && t < Date.now();
}

Deno.serve(async (req) => {
  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return json({ ok: false, error: "Supabase env missing" }, 500);
    }

    const service = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const body = await req.json().catch(() => ({}));
    const testMode = Boolean(body?.test_mode);
    const onlyCompanyId = body?.company_id ? String(body.company_id) : null;

    const { data: rows, error } = await service
      .from("company_plans")
      .select(`
        id,
        company_id,
        plan,
        plan_status,
        current_period_end,
        commitment_end,
        scheduled_plan,
        scheduled_start_at,
        stripe_customer_id,
        stripe_subscription_id,
        scheduled_stripe_subscription_id,
        replies_limit,
        replies_used
      `);

    if (error) {
      console.error("expire-company-plans select error", error);
      return json({ ok: false, error: error.message }, 500);
    }

    const candidates = (rows || []).filter((row: any) => {
      if (onlyCompanyId && String(row.company_id) !== onlyCompanyId) return false;
      return true;
    });

    let checked = 0;
    let expired_one_month = 0;
    let cleaned_stale_schedule = 0;
    const changes: Array<Record<string, unknown>> = [];

    for (const row of candidates) {
      checked += 1;

      const companyId = String(row.company_id);
      const plan = String(row.plan || "free").toLowerCase();
      const planStatus = String(row.plan_status || "").toLowerCase();
      const currentPeriodEnd = row.current_period_end ? String(row.current_period_end) : null;
      const scheduledPlan = row.scheduled_plan ? String(row.scheduled_plan).toLowerCase() : null;
      const scheduledStartAt = row.scheduled_start_at ? String(row.scheduled_start_at) : null;

      // 1) ONE MONTH expired -> FREE
      if (
        plan === "one_month" &&
        isPast(currentPeriodEnd)
      ) {
        const nextValues = {
          plan: "free",
          plan_status: "inactive",
          current_period_end: null,
          commitment_end: null,
          scheduled_plan: null,
          scheduled_start_at: null,
          scheduled_stripe_subscription_id: null,
          replies_limit: 1,
        };

        changes.push({
          company_id: companyId,
          action: "expired_one_month_to_free",
          next: nextValues,
        });

        if (!testMode) {
          const { error: updateError } = await service
            .from("company_plans")
            .update(nextValues)
            .eq("company_id", companyId);

          if (updateError) {
            console.error("expire one_month update error", { companyId, updateError });
            continue;
          }
        }

        expired_one_month += 1;
        continue;
      }

      // 2) stale scheduled PRO in obviously broken state:
      // if current plan is free, but scheduled_plan exists and scheduled date already passed,
      // remove broken scheduled leftovers
      if (
        plan === "free" &&
        scheduledPlan === "pro" &&
        isPast(scheduledStartAt)
      ) {
        const nextValues = {
          scheduled_plan: null,
          scheduled_start_at: null,
          scheduled_stripe_subscription_id: null,
        };

        changes.push({
          company_id: companyId,
          action: "cleaned_stale_scheduled_pro",
          next: nextValues,
        });

        if (!testMode) {
          const { error: updateError } = await service
            .from("company_plans")
            .update(nextValues)
            .eq("company_id", companyId);

          if (updateError) {
            console.error("clean stale scheduled update error", { companyId, updateError });
            continue;
          }
        }

        cleaned_stale_schedule += 1;
        continue;
      }

      // 3) optionally clean inactive pro with ended period
      // safe fallback only if explicitly inactive and already ended
      if (
        plan === "pro" &&
        planStatus === "inactive" &&
        isPast(currentPeriodEnd)
      ) {
        const nextValues = {
          plan: "free",
          current_period_end: null,
          commitment_end: null,
          scheduled_plan: null,
          scheduled_start_at: null,
          scheduled_stripe_subscription_id: null,
          stripe_subscription_id: null,
          replies_limit: 1,
        };

        changes.push({
          company_id: companyId,
          action: "inactive_pro_to_free",
          next: nextValues,
        });

        if (!testMode) {
          const { error: updateError } = await service
            .from("company_plans")
            .update(nextValues)
            .eq("company_id", companyId);

          if (updateError) {
            console.error("inactive pro cleanup error", { companyId, updateError });
            continue;
          }
        }
      }
    }

    return json({
      ok: true,
      test_mode: testMode,
      checked,
      expired_one_month,
      cleaned_stale_schedule,
      changes,
    });
  } catch (e) {
    console.error("expire-company-plans fatal error:", e);
    return json({ ok: false, error: "Server error" }, 500);
  }
});