// supabase/functions/admin-billing-monitor/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

async function requireUser(url: string, anonKey: string, authHeader: string) {
  const anon = createClient(url, anonKey, {
    global: {
      headers: { Authorization: authHeader },
    },
  });

  const { data, error } = await anon.auth.getUser();
  if (error || !data?.user) return null;
  return data.user;
}

function normalizeEmails(raw: string) {
  return raw
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
}

function isAdminEmail(userEmail: string | null | undefined, adminEmails: string[]) {
  const email = String(userEmail || "").trim().toLowerCase();
  if (!email) return false;
  return adminEmails.includes(email);
}

function plusDaysIso(fromIso: string | null | undefined, days: number) {
  const d = fromIso ? new Date(fromIso) : new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

function plusMonthsIso(fromIso: string | null | undefined, months: number) {
  const d = fromIso ? new Date(fromIso) : new Date();
  d.setMonth(d.getMonth() + months);
  return d.toISOString();
}

function expectedConfirmWord(action: string) {
  if (action === "activate_pro_now") return "ACTIVATE";
  if (action === "cancel_scheduled_pro") return "CANCEL";
  if (action === "extend_one_month_30d") return "EXTEND";
  if (action === "reset_to_free") return "RESET";
  return "";
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
    const ADMIN_EMAILS_RAW = Deno.env.get("ADMIN_EMAILS") ?? "";

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
      return json({ ok: false, error: "Supabase env missing" }, 500);
    }

    const adminEmails = normalizeEmails(ADMIN_EMAILS_RAW);
    if (adminEmails.length === 0) {
      return json({ ok: false, error: "ADMIN_EMAILS secret is empty" }, 500);
    }

    const authHeader = req.headers.get("authorization") || "";
    const user = await requireUser(SUPABASE_URL, SUPABASE_ANON_KEY, authHeader);

    if (!user) {
      return json({ ok: false, error: "Unauthorized" }, 401);
    }

    if (!isAdminEmail(user.email, adminEmails)) {
      return json({ ok: false, error: "Forbidden" }, 403);
    }

    const service = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    async function writeAudit(
        action: string,
        targetCompanyId: string,
        details: Record<string, unknown> = {}
      ) {
        await service.from("admin_audit_log").insert({
          admin_email: user.email || null,
          action,
          target_company_id: targetCompanyId,
          details,
        });
      }
    const body = await req.json().catch(() => ({}));

    const action = String(body?.action || "list").toLowerCase();

    // ACTIONS
    if (action !== "list") {
      const planRowId = String(body?.plan_row_id || "");
      const companyId = String(body?.company_id || "");
      const confirmWord = String(body?.confirm_word || "");

      if (!planRowId || !companyId) {
        return json({ ok: false, error: "plan_row_id and company_id are required" }, 400);
      }

      const expectedWord = expectedConfirmWord(action);
      if (!expectedWord) {
        return json({ ok: false, error: "Unknown action" }, 400);
      }

      if (confirmWord !== expectedWord) {
        return json(
          {
            ok: false,
            error: `Confirmation failed. Expected word: ${expectedWord}`,
          },
          400
        );
      }

      const existingRes = await service
        .from("company_plans")
        .select("*")
        .eq("id", planRowId)
        .eq("company_id", companyId)
        .maybeSingle();

      if (existingRes.error) {
        return json({ ok: false, error: existingRes.error.message }, 500);
      }

      const existing: any = existingRes.data;
      if (!existing) {
        return json({ ok: false, error: "Exact company plan row not found" }, 404);
      }

      if (action === "activate_pro_now") {
        const currentEnd = existing.current_period_end || plusDaysIso(null, 30);
        const commitmentEnd = existing.commitment_end || plusMonthsIso(null, 12);

        const updateRes = await service
          .from("company_plans")
          .update({
            plan: "pro",
            plan_status: "active",
            current_period_end: currentEnd,
            commitment_end: commitmentEnd,
            scheduled_plan: null,
            scheduled_start_at: null,
          })
          .eq("id", planRowId)
          .eq("company_id", companyId)
          .select()
          .maybeSingle();

        if (updateRes.error) {
          return json({ ok: false, error: updateRes.error.message }, 500);
        }
        await writeAudit("activate_pro_now", companyId, {
            plan_row_id: planRowId,
          });
        return json({
          ok: true,
          action: "activate_pro_now",
          row: updateRes.data,
        });
      }

      if (action === "cancel_scheduled_pro") {
        const updateRes = await service
          .from("company_plans")
          .update({
            scheduled_plan: null,
            scheduled_start_at: null,
            scheduled_stripe_subscription_id: null,
          })
          .eq("id", planRowId)
          .eq("company_id", companyId)
          .select()
          .maybeSingle();

        if (updateRes.error) {
          return json({ ok: false, error: updateRes.error.message }, 500);
        }
        await writeAudit("cancel_scheduled_pro", companyId, {
            plan_row_id: planRowId,
          });
        return json({
          ok: true,
          action: "cancel_scheduled_pro",
          row: updateRes.data,
        });
      }

      if (action === "reset_to_free") {
        const updateRes = await service
          .from("company_plans")
          .update({
            plan: "free",
            plan_status: "inactive",
            current_period_end: null,
            commitment_end: null,
            scheduled_plan: null,
            scheduled_start_at: null,
            scheduled_stripe_subscription_id: null,
            stripe_subscription_id: null,
            replies_limit: 1,
          })
          .eq("id", planRowId)
          .eq("company_id", companyId)
          .select()
          .maybeSingle();

        if (updateRes.error) {
          return json({ ok: false, error: updateRes.error.message }, 500);
        }
        await writeAudit("reset_to_free", companyId, {
            plan_row_id: planRowId,
          });
        return json({
          ok: true,
          action: "reset_to_free",
          row: updateRes.data,
        });
      }

      if (action === "extend_one_month_30d") {
        const baseDate = existing.current_period_end || new Date().toISOString();
        const nextEnd = plusDaysIso(baseDate, 30);

        const updateRes = await service
          .from("company_plans")
          .update({
            plan: "one_month",
            plan_status: "active",
            current_period_end: nextEnd,
          })
          .eq("id", planRowId)
          .eq("company_id", companyId)
          .select()
          .maybeSingle();

        if (updateRes.error) {
          return json({ ok: false, error: updateRes.error.message }, 500);
        }
        await writeAudit("extend_one_month_30d", companyId, {
            plan_row_id: planRowId,
          });
        return json({
          ok: true,
          action: "extend_one_month_30d",
          row: updateRes.data,
        });
      }

      return json({ ok: false, error: "Unknown action" }, 400);
    }

    // LIST
    const plansRes = await service
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
      `)
      .order("current_period_end", { ascending: true });

    if (plansRes.error) {
      console.error("company_plans query error:", plansRes.error);
      return json({ ok: false, error: plansRes.error.message }, 500);
    }

    const plans = plansRes.data || [];
    const companyIds = plans.map((row: any) => String(row.company_id));

    let companiesMap = new Map<string, any>();

    if (companyIds.length > 0) {
      const companiesRes = await service
        .from("companies")
        .select("id, name, vat_uid, country, billing_email")
        .in("id", companyIds);

      if (companiesRes.error) {
        console.error("companies query error:", companiesRes.error);
        return json({ ok: false, error: companiesRes.error.message }, 500);
      }

      companiesMap = new Map(
        (companiesRes.data || []).map((company: any) => [String(company.id), company])
      );
    }

    const rows = plans.map((row: any) => {
      const company = companiesMap.get(String(row.company_id));

      return {
        plan_row_id: row.id,
        company_id: row.company_id,
        company_name: company?.name || null,
        vat_uid: company?.vat_uid || null,
        country: company?.country || null,
        billing_email: company?.billing_email || null,
        plan: row.plan || null,
        plan_status: row.plan_status || null,
        current_period_end: row.current_period_end || null,
        commitment_end: row.commitment_end || null,
        scheduled_plan: row.scheduled_plan || null,
        scheduled_start_at: row.scheduled_start_at || null,
        stripe_customer_id: row.stripe_customer_id || null,
        stripe_subscription_id: row.stripe_subscription_id || null,
        scheduled_stripe_subscription_id: row.scheduled_stripe_subscription_id || null,
        replies_limit: row.replies_limit ?? null,
        replies_used: row.replies_used ?? null,
      };
    });

    return json({
      ok: true,
      rows,
      count: rows.length,
      viewer_email: user.email || null,
    });
  } catch (e: any) {
    console.error("admin-billing-monitor fatal error:", e);
    return json({ ok: false, error: String(e?.message || e || "Server error") }, 500);
  }
});