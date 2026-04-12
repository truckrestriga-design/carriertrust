import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
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

function escapeHtml(input: string) {
  return String(input ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendEmail(params: {
  apiKey: string;
  from: string;
  to: string | string[];
  subject: string;
  html: string;
}) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${params.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: params.from,
        to: params.to,
        subject: params.subject,
        html: params.html,
      }),
    });

    const raw = await res.text();

    let parsed: any = null;
    try {
      parsed = raw ? JSON.parse(raw) : null;
    } catch {
      parsed = { raw };
    }

    return {
      ok: res.ok,
      status: res.status,
      body: parsed,
    };
  } catch (e) {
    return {
      ok: false,
      status: 0,
      body: { error: String(e) },
    };
  }
}

function brandHeader() {
  return `
    <div style="padding:28px 28px 14px 28px;background:linear-gradient(135deg,#ecfeff 0%,#f0fdf4 100%);">
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,#14b8a6 0%,#10b981 100%);color:#fff;font-size:28px;font-weight:800;line-height:56px;text-align:center;box-shadow:0 12px 30px rgba(16,185,129,0.25);">
          CT
        </div>
        <div>
          <div style="font-size:30px;font-weight:800;line-height:1;color:#0f172a;">CarrierTrust</div>
          <div style="margin-top:6px;font-size:14px;color:#64748b;">EU logistics reputation network</div>
        </div>
      </div>
    </div>
  `;
}

function emailShell(content: string) {
  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f3f6fb;font-family:Inter,Arial,sans-serif;color:#0f172a;">
    <div style="max-width:680px;margin:0 auto;padding:32px 20px;">
      <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:28px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,0.06);">
        ${brandHeader()}
        <div style="padding:28px;">
          ${content}
        </div>
      </div>
    </div>
  </body>
</html>
  `;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";

    if (!SUPABASE_URL || !SERVICE_ROLE || !RESEND_API_KEY) {
      return json({ ok: false, error: "Missing env secrets" }, 500);
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    const body = await req.json().catch(() => ({}));
    const companyId = String(body.company_id || "").trim();
    const rawReviewText = String(body.review_text || "").trim();
    const rating = Number(body.rating ?? 0);
    const issueType = String(body.issue_type || "").trim();
    const authorEmail = String(body.author_email || "").trim();
    const authorCompany = String(body.author_company || "").trim();

    if (!companyId) {
      return json({ ok: false, error: "company_id missing" }, 400);
    }

    const adminEmail = "carriertrust.eu@gmail.com";
    const fromEmail = "info@carriertrust.eu";
    const websiteUrl = "https://www.carriertrust.eu";
    const reviewText = rawReviewText || "A new review has been added.";

    const { data: company, error: companyError } = await supabase
      .from("companies")
      .select("id, name, vat_uid, country")
      .eq("id", companyId)
      .maybeSingle();

    if (companyError) {
      return json({
        ok: false,
        step: "company_lookup",
        error: companyError.message,
      });
    }

    const companyName = String(company?.name || "your company");
    const companyVat = String(company?.vat_uid || "");
    const companyCountry = String(company?.country || "");

    const { data: planRows, error: planError } = await supabase
      .from("company_plans")
      .select("plan, created_at")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (planError) {
      return json({
        ok: false,
        step: "plan_lookup",
        error: planError.message,
      });
    }

    const planRow = planRows?.[0] ?? null;
    const currentPlan = String(planRow?.plan || "free").toLowerCase();
    const isPaidPlan = currentPlan === "pro" || currentPlan === "one_month";

    const { data: claim, error: claimError } = await supabase
      .from("company_claims")
      .select("claimant_user_id, claimant_email, status, created_at")
      .eq("company_id", companyId)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (claimError) {
      return json({
        ok: false,
        step: "claim_lookup",
        error: claimError.message,
      });
    }

    const ownerUserId = String(claim?.claimant_user_id || "");
    const ownerEmail = String(claim?.claimant_email || "").trim() || null;

    // SIMPLE ADMIN EMAIL
    const adminHtml = `
      <h1>New review is published</h1>
      <p><strong>Company:</strong> ${escapeHtml(companyName)}</p>
      ${companyCountry ? `<p><strong>Country:</strong> ${escapeHtml(companyCountry)}</p>` : ""}
      ${companyVat ? `<p><strong>VAT:</strong> ${escapeHtml(companyVat)}</p>` : ""}
      ${rating ? `<p><strong>Rating:</strong> ${escapeHtml(String(rating))}/5</p>` : ""}
      ${issueType ? `<p><strong>Issue:</strong> ${escapeHtml(issueType)}</p>` : ""}
      ${authorEmail ? `<p><strong>Author:</strong> ${escapeHtml(authorEmail)}</p>` : ""}
      <hr />
      <p>${escapeHtml(reviewText)}</p>
      <hr />
      <p>
        Go to admin panel:
        <a href="${websiteUrl}/admin">carriertrust.eu/admin</a>
      </p>
    `;

    const adminResult = await sendEmail({
      apiKey: RESEND_API_KEY,
      from: fromEmail,
      to: adminEmail,
      subject: `New review : ${companyName}`,
      html: adminHtml,
    });

    // COMPANY OWNER EMAIL
    let companyResult: any = {
      ok: false,
      skipped: true,
      reason: "not_attempted",
    };

    if (!isPaidPlan) {
      companyResult = {
        ok: false,
        skipped: true,
        reason: "plan_not_paid",
      };
    } else if (!ownerEmail) {
      companyResult = {
        ok: false,
        skipped: true,
        reason: "owner_email_not_found",
      };
    } else {
      const companyHtml = emailShell(`
        <h1 style="margin:0 0 14px 0;font-size:32px;line-height:1.2;color:#0f172a;">New review published</h1>
        <p style="margin:0 0 20px 0;font-size:16px;line-height:1.7;color:#334155;">
          A new review has been published for your company on CarrierTrust.
        </p>

        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:18px;padding:18px 18px 8px 18px;margin-bottom:18px;">
          <p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;"><strong>Company:</strong> ${escapeHtml(companyName)}</p>
          ${companyCountry ? `<p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;"><strong>Country:</strong> ${escapeHtml(companyCountry)}</p>` : ""}
          ${companyVat ? `<p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;"><strong>VAT:</strong> ${escapeHtml(companyVat)}</p>` : ""}
          ${rating ? `<p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;"><strong>Rating:</strong> ${escapeHtml(String(rating))}/5</p>` : ""}
          ${issueType ? `<p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;"><strong>Issue:</strong> ${escapeHtml(issueType)}</p>` : ""}
          ${authorCompany ? `<p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;"><strong>Author:</strong> ${escapeHtml(authorCompany)}</p>` : ""}
        </div>

        <div style="border-left:4px solid #10b981;background:#f8fafc;padding:16px 18px;border-radius:12px;margin-bottom:24px;">
          <div style="font-size:16px;line-height:1.7;color:#0f172a;">
            ${escapeHtml(reviewText)}
          </div>
        </div>

        <a href="${websiteUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:14px;font-weight:700;font-size:15px;">
          Open CarrierTrust
        </a>

        <p style="margin:22px 0 0 0;font-size:14px;line-height:1.7;color:#64748b;">
          Visit <a href="${websiteUrl}" style="color:#0f172a;font-weight:700;">www.carriertrust.eu</a> to review and respond.
        </p>
      `);

      companyResult = await sendEmail({
        apiKey: RESEND_API_KEY,
        from: fromEmail,
        to: ownerEmail,
        subject: `New review published: ${companyName}`,
        html: companyHtml,
      });
    }

    console.log("[send-review-alert] ownerEmail =", ownerEmail);
    console.log("[send-review-alert] adminResult =", JSON.stringify(adminResult));
    console.log("[send-review-alert] companyResult =", JSON.stringify(companyResult));

    return json({
      ok: true,
      company_id: companyId,
      company_name: companyName,
      plan: currentPlan,
      owner_user_id: ownerUserId || null,
      owner_email: ownerEmail,
      adminEmailSent: !!adminResult?.ok,
      companyEmailSent: !!companyResult?.ok,
      adminResult,
      companyResult,
    });
  } catch (e) {
    console.error("[send-review-alert] fatal", e);
    return json({
      ok: false,
      error: String(e),
      step: "fatal",
    });
  }
});