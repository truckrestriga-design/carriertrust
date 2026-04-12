// supabase/functions/send-billing-emails/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function daysFromNow(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return String(value);
  }
}

function escapeHtml(value: string | null | undefined) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buttonHtml(label: string, href: string) {
  return `
    <a href="${href}" style="
      display:inline-block;
      background:#111111;
      color:#ffffff;
      text-decoration:none;
      font-weight:700;
      font-size:14px;
      line-height:14px;
      padding:14px 18px;
      border-radius:12px;
    ">
      ${escapeHtml(label)}
    </a>
  `;
}

function secondaryLinkHtml(label: string, href: string) {
  return `
    <a href="${href}" style="
      display:inline-block;
      color:#111111;
      text-decoration:none;
      font-weight:600;
      font-size:14px;
      margin-left:12px;
    ">
      ${escapeHtml(label)} →
    </a>
  `;
}

function emailLayout(params: {
  preview: string;
  title: string;
  subtitle?: string;
  bodyHtml: string;
}) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(params.title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f6f7fb;font-family:Inter,Arial,sans-serif;color:#111111;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      ${escapeHtml(params.preview)}
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f6f7fb;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;">
            <tr>
              <td style="padding:0 0 14px 0;text-align:left;">
                <div style="font-size:20px;font-weight:900;letter-spacing:-0.02em;color:#111111;">
                  CarrierTrust
                </div>
              </td>
            </tr>

            <tr>
              <td style="
                background:#ffffff;
                border:1px solid #e8ebf2;
                border-radius:24px;
                padding:32px 28px;
                box-shadow:0 10px 30px rgba(15, 23, 42, 0.06);
              ">
                <div style="font-size:28px;line-height:1.1;font-weight:900;letter-spacing:-0.03em;color:#111111;">
                  ${escapeHtml(params.title)}
                </div>

                ${
                  params.subtitle
                    ? `<div style="margin-top:10px;font-size:15px;line-height:1.6;color:#5b6473;">
                        ${escapeHtml(params.subtitle)}
                      </div>`
                    : ""
                }

                <div style="margin-top:24px;font-size:15px;line-height:1.75;color:#1f2937;">
                  ${params.bodyHtml}
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 6px 0 6px;font-size:12px;line-height:1.7;color:#7b8494;text-align:left;">
                CarrierTrust.eu<br />
                Reputation platform for transport companies
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}

function oneMonthEndingEmail(params: {
  companyName: string;
  targetDate: string;
  pricingUrl: string;
}) {
  const companyName = escapeHtml(params.companyName);
  const endDate = formatDate(params.targetDate);

  return emailLayout({
    preview: "Your ONE MONTH access ends tomorrow.",
    title: "Your ONE MONTH access ends tomorrow",
    subtitle: "Choose how you want to continue without losing momentum.",
    bodyHtml: `
      <p style="margin:0 0 16px 0;">
        Your ONE MONTH access for <strong>${companyName}</strong> ends on <strong>${endDate}</strong>.
      </p>

      <div style="
        margin:20px 0;
        padding:18px 18px;
        border:1px solid #e8ebf2;
        border-radius:18px;
        background:#fafbff;
      ">
        <div style="font-size:13px;font-weight:800;letter-spacing:0.02em;color:#6b7280;text-transform:uppercase;">
          Continue with
        </div>

        <div style="margin-top:12px;font-size:15px;line-height:1.75;color:#111111;">
          <strong>PRO — €49 / month</strong><br />
          Auto-renewing subscription with continuous access and billing management.
        </div>

        <div style="margin-top:14px;font-size:15px;line-height:1.75;color:#111111;">
          <strong>ONE MONTH — €69</strong><br />
          One-time 30-day access without auto-renewal.
        </div>
      </div>

      <div style="margin:26px 0 8px 0;">
        ${buttonHtml("Open pricing", params.pricingUrl)}
        ${secondaryLinkHtml("Compare plans", params.pricingUrl)}
      </div>

      <p style="margin:22px 0 0 0;color:#5b6473;">
        You can choose the option that fits your company best from your pricing page.
      </p>
    `,
  });
}

function proStartedEmail(params: {
  companyName: string;
  pricingUrl: string;
  portalUrl?: string;
}) {
  const companyName = escapeHtml(params.companyName);

  return emailLayout({
    preview: "Your PRO plan is now active.",
    title: "Your PRO plan is now active",
    subtitle: "You now have access to your PRO billing and plan management.",
    bodyHtml: `
      <p style="margin:0 0 16px 0;">
        Your PRO plan for <strong>${companyName}</strong> is now active.
      </p>

      <div style="
        margin:20px 0;
        padding:18px 18px;
        border:1px solid #e8ebf2;
        border-radius:18px;
        background:#fafbff;
      ">
        <div style="font-size:13px;font-weight:800;letter-spacing:0.02em;color:#6b7280;text-transform:uppercase;">
          Included
        </div>

        <div style="margin-top:12px;font-size:15px;line-height:1.75;color:#111111;">
          Unlimited replies<br />
          Review dispute tools<br />
          Analytics and PRO billing access
        </div>
      </div>

      <div style="margin:26px 0 8px 0;">
        ${buttonHtml("Open pricing", params.pricingUrl)}
        ${
          params.portalUrl
            ? secondaryLinkHtml("Manage billing", params.portalUrl)
            : secondaryLinkHtml("Manage billing", params.pricingUrl)
        }
      </div>

      <p style="margin:22px 0 0 0;color:#5b6473;">
        You can manage your billing details and subscription from your account at any time.
      </p>
    `,
  });
}

function proRenewalEmail(params: {
  companyName: string;
  targetDate: string;
  pricingUrl: string;
  portalUrl?: string;
}) {
  const companyName = escapeHtml(params.companyName);
  const renewDate = formatDate(params.targetDate);

  return emailLayout({
    preview: "Your PRO plan renews tomorrow.",
    title: "Your PRO plan renews tomorrow",
    subtitle: "A €49 renewal is scheduled for the next billing period.",
    bodyHtml: `
      <p style="margin:0 0 16px 0;">
        Your PRO plan for <strong>${companyName}</strong> renews on <strong>${renewDate}</strong>.
      </p>

      <div style="
        margin:20px 0;
        padding:18px 18px;
        border:1px solid #e8ebf2;
        border-radius:18px;
        background:#fafbff;
      ">
        <div style="font-size:13px;font-weight:800;letter-spacing:0.02em;color:#6b7280;text-transform:uppercase;">
          Next charge
        </div>

        <div style="margin-top:12px;font-size:26px;line-height:1.2;font-weight:900;color:#111111;">
          €49
        </div>

        <div style="margin-top:6px;font-size:14px;line-height:1.7;color:#5b6473;">
          Monthly PRO renewal
        </div>
      </div>

      <div style="margin:26px 0 8px 0;">
        ${
          params.portalUrl
            ? buttonHtml("Manage subscription", params.portalUrl)
            : buttonHtml("Open pricing", params.pricingUrl)
        }
        ${secondaryLinkHtml("Open pricing", params.pricingUrl)}
      </div>

      <p style="margin:22px 0 0 0;color:#5b6473;">
        If you need to update payment details or review billing, use your billing management page.
      </p>
    `,
  });
}

async function sendEmail(params: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
}) {
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: params.from,
      to: [params.to],
      subject: params.subject,
      html: params.html,
    }),
  });

  const data = await resp.json();

  if (!resp.ok) {
    console.error("sendEmail failed", data);
    throw new Error(data?.message || "Email send failed");
  }

  return data;
}

async function alreadySent(
  service: any,
  companyId: string,
  emailType: string,
  targetDate: string | null
) {
  let query = service
    .from("billing_email_log")
    .select("id")
    .eq("company_id", companyId)
    .eq("email_type", emailType);

  if (targetDate) {
    query = query.eq("target_date", targetDate);
  } else {
    query = query.is("target_date", null);
  }

  const { data, error } = await query.limit(1);

  if (error) {
    console.error("alreadySent error", error);
    return false;
  }

  return Boolean(data && data.length > 0);
}

async function markSent(
  service: any,
  companyId: string,
  emailType: string,
  targetDate: string | null
) {
  const { error } = await service.from("billing_email_log").insert({
    company_id: companyId,
    email_type: emailType,
    target_date: targetDate,
  });

  if (error) {
    console.error("markSent error", error);
    throw new Error(error.message);
  }
}

Deno.serve(async (req) => {
  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
    const EMAIL_FROM = Deno.env.get("EMAIL_FROM") ?? "";
    const SITE_URL = Deno.env.get("SITE_URL") ?? "http://localhost:3000";

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return json({ ok: false, error: "Supabase env missing" }, 500);
    }

    if (!RESEND_API_KEY || !EMAIL_FROM) {
      return json({ ok: false, error: "Email env missing" }, 500);
    }

    const service = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const body = await req.json().catch(() => ({}));
    const testMode = Boolean(body?.test_mode);
    const testCompanyId = body?.company_id ? String(body.company_id) : null;
    const forceEmailType = body?.email_type ? String(body.email_type) : null;

    if (testMode) {
      if (!testCompanyId || !forceEmailType) {
        return json(
          {
            ok: false,
            error: "For test_mode you must pass company_id and email_type",
          },
          400
        );
      }

      const { data: companyData, error: companyError } = await service
        .from("companies")
        .select("id, name, billing_email")
        .eq("id", testCompanyId)
        .maybeSingle();

      if (companyError || !companyData) {
        return json({ ok: false, error: "Company not found" }, 404);
      }

      const companyName = companyData.name || "your company";
      const to = companyData.billing_email || null;
      const pricingUrl = `${SITE_URL}/pricing`;

      if (!to) {
        return json({ ok: false, error: "billing_email is empty" }, 400);
      }

      if (forceEmailType === "one_month_ending") {
        await sendEmail({
          apiKey: RESEND_API_KEY,
          from: EMAIL_FROM,
          to,
          subject: "TEST — Your ONE MONTH access ends tomorrow",
          html: oneMonthEndingEmail({
            companyName,
            targetDate: new Date().toISOString(),
            pricingUrl,
          }),
        });

        return json({ ok: true, sent_test_email: "one_month_ending", to });
      }

      if (forceEmailType === "pro_started") {
        await sendEmail({
          apiKey: RESEND_API_KEY,
          from: EMAIL_FROM,
          to,
          subject: "TEST — Your PRO plan is now active",
          html: proStartedEmail({
            companyName,
            pricingUrl,
            portalUrl: pricingUrl,
          }),
        });

        return json({ ok: true, sent_test_email: "pro_started", to });
      }

      if (forceEmailType === "pro_renewal_tomorrow") {
        await sendEmail({
          apiKey: RESEND_API_KEY,
          from: EMAIL_FROM,
          to,
          subject: "TEST — Your PRO plan renews tomorrow",
          html: proRenewalEmail({
            companyName,
            targetDate: new Date().toISOString(),
            pricingUrl,
            portalUrl: pricingUrl,
          }),
        });

        return json({ ok: true, sent_test_email: "pro_renewal_tomorrow", to });
      }

      return json({ ok: false, error: "Unknown email_type" }, 400);
    }

    const tomorrowStart = startOfDay(daysFromNow(1)).toISOString();
    const tomorrowEnd = endOfDay(daysFromNow(1)).toISOString();
    const pricingUrl = `${SITE_URL}/pricing`;

    // 1) ONE MONTH ends tomorrow
    const { data: oneMonthRows, error: oneMonthError } = await service
      .from("company_plans")
      .select(`
        company_id,
        plan,
        plan_status,
        current_period_end,
        companies!inner (
          id,
          name,
          billing_email
        )
      `)
      .eq("plan", "one_month")
      .eq("plan_status", "active")
      .gte("current_period_end", tomorrowStart)
      .lte("current_period_end", tomorrowEnd);

    if (oneMonthError) {
      console.error("oneMonth query error", oneMonthError);
      throw new Error(oneMonthError.message);
    }

    for (const row of oneMonthRows || []) {
      const companyId = String(row.company_id);
      const targetDate = row.current_period_end ? String(row.current_period_end) : null;
      const companyName = row.companies?.name || "your company";
      const to = row.companies?.billing_email || null;

      if (!to || !targetDate) continue;

      const sent = await alreadySent(service, companyId, "one_month_ending", targetDate);
      if (sent) continue;

      await sendEmail({
        apiKey: RESEND_API_KEY,
        from: EMAIL_FROM,
        to,
        subject: "Your ONE MONTH access ends tomorrow",
        html: oneMonthEndingEmail({
          companyName,
          targetDate,
          pricingUrl,
        }),
      });

      await markSent(service, companyId, "one_month_ending", targetDate);
    }

    // 2) PRO renews tomorrow
    const { data: proRenewRows, error: proRenewError } = await service
      .from("company_plans")
      .select(`
        company_id,
        plan,
        plan_status,
        current_period_end,
        companies!inner (
          id,
          name,
          billing_email
        )
      `)
      .eq("plan", "pro")
      .eq("plan_status", "active")
      .gte("current_period_end", tomorrowStart)
      .lte("current_period_end", tomorrowEnd);

    if (proRenewError) {
      console.error("proRenew query error", proRenewError);
      throw new Error(proRenewError.message);
    }

    for (const row of proRenewRows || []) {
      const companyId = String(row.company_id);
      const targetDate = row.current_period_end ? String(row.current_period_end) : null;
      const companyName = row.companies?.name || "your company";
      const to = row.companies?.billing_email || null;

      if (!to || !targetDate) continue;

      const sent = await alreadySent(service, companyId, "pro_renewal_tomorrow", targetDate);
      if (sent) continue;

      await sendEmail({
        apiKey: RESEND_API_KEY,
        from: EMAIL_FROM,
        to,
        subject: "Your PRO plan renews tomorrow",
        html: proRenewalEmail({
          companyName,
          targetDate,
          pricingUrl,
          portalUrl: pricingUrl,
        }),
      });

      await markSent(service, companyId, "pro_renewal_tomorrow", targetDate);
    }

    // 3) PRO started today
    const { data: proStartRows, error: proStartError } = await service
      .from("company_plans")
      .select(`
        company_id,
        plan,
        plan_status,
        companies!inner (
          id,
          name,
          billing_email
        )
      `)
      .eq("plan", "pro")
      .eq("plan_status", "active");

    if (proStartError) {
      console.error("proStart query error", proStartError);
      throw new Error(proStartError.message);
    }

    for (const row of proStartRows || []) {
      const companyId = String(row.company_id);
      const companyName = row.companies?.name || "your company";
      const to = row.companies?.billing_email || null;

      if (!to) continue;

      const sent = await alreadySent(service, companyId, "pro_started", null);
      if (sent) continue;

      await sendEmail({
        apiKey: RESEND_API_KEY,
        from: EMAIL_FROM,
        to,
        subject: "Your PRO plan is now active",
        html: proStartedEmail({
          companyName,
          pricingUrl,
          portalUrl: pricingUrl,
        }),
      });

      await markSent(service, companyId, "pro_started", null);
    }

    return json({
      ok: true,
      one_month_checked: (oneMonthRows || []).length,
      pro_renew_checked: (proRenewRows || []).length,
      pro_start_checked: (proStartRows || []).length,
    });
  } catch (e) {
    console.error("send-billing-emails fatal error:", e);
    return json({ ok: false, error: "Server error" }, 500);
  }
});