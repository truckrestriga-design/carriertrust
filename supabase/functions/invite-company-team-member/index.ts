import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
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

function escapeHtml(value: string) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeEmail(value: unknown) {
  return String(value ?? "").trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function createInviteToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
}

async function sha256(value: string) {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return bytesToHex(new Uint8Array(digest));
}

async function sendEmail(params: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
}) {
  const response = await fetch("https://api.resend.com/emails", {
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

  const raw = await response.text();

  let result: unknown = null;

  try {
    result = raw ? JSON.parse(raw) : null;
  } catch {
    result = { raw };
  }

  return {
    ok: response.ok,
    status: response.status,
    result,
  };
}

function brandHeader() {
  return `
    <div style="padding:30px 32px 18px 32px;background:#ffffff;">
      <img
        src="https://www.carriertrust.eu/ct-email-logo.png"
        width="230"
        alt="CarrierTrust"
        style="display:block;width:230px;max-width:100%;height:auto;border:0;outline:none;text-decoration:none;"
      />
    </div>
  `;
}

function emailShell(content: string) {
  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;background:#f5f7fa;font-family:Inter,Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f5f7fa;">
      <tr>
        <td align="center" style="padding:32px 14px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#ffffff;border:1px solid #e7ebef;border-radius:24px;overflow:hidden;">
            <tr>
              <td>${brandHeader()}</td>
            </tr>
            <tr>
              <td style="padding:6px 32px 34px 32px;">
                ${content}
              </td>
            </tr>
          </table>

          <div style="max-width:640px;padding:16px 6px 0 6px;font-size:12px;line-height:1.7;color:#8a94a3;text-align:left;">
            CarrierTrust.eu<br />
            Trust infrastructure for European logistics
          </div>
        </td>
      </tr>
    </table>
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
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const SERVICE_ROLE_KEY =
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
    const EMAIL_FROM =
      Deno.env.get("RESEND_FROM") ??
      "CarrierTrust <info@carriertrust.eu>";

    if (
      !SUPABASE_URL ||
      !SUPABASE_ANON_KEY ||
      !SERVICE_ROLE_KEY ||
      !RESEND_API_KEY
    ) {
      return json(
        {
          ok: false,
          error: "Missing required environment secrets",
        },
        500,
      );
    }

    const authorization = req.headers.get("Authorization") ?? "";

    if (!authorization.startsWith("Bearer ")) {
      return json(
        {
          ok: false,
          error: "Authorization required",
        },
        401,
      );
    }

    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: authorization,
        },
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser();

    if (userError || !user) {
      return json(
        {
          ok: false,
          error: "Invalid or expired session",
        },
        401,
      );
    }

    const body = await req.json().catch(() => ({}));

    const companyId = String(body.company_id ?? "").trim();
    const email = normalizeEmail(body.email);

    if (!companyId) {
      return json(
        {
          ok: false,
          error: "company_id is required",
        },
        400,
      );
    }

    if (!email || !isValidEmail(email)) {
      return json(
        {
          ok: false,
          error: "Valid email is required",
        },
        400,
      );
    }

    if (normalizeEmail(user.email) === email) {
      return json(
        {
          ok: false,
          error: "You cannot invite your own email",
        },
        400,
      );
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data: ownership, error: ownershipError } = await admin
      .from("company_claims")
      .select("id")
      .eq("company_id", companyId)
      .eq("claimant_user_id", user.id)
      .eq("status", "approved")
      .maybeSingle();

    if (ownershipError) {
      console.error("Ownership lookup failed:", ownershipError);

      return json(
        {
          ok: false,
          error: "Could not verify company ownership",
        },
        500,
      );
    }

    if (!ownership) {
      return json(
        {
          ok: false,
          error: "Only the approved company owner can invite team members",
        },
        403,
      );
    }

    const { data: company, error: companyError } = await admin
      .from("companies")
      .select("id, name")
      .eq("id", companyId)
      .maybeSingle();

    if (companyError || !company) {
      return json(
        {
          ok: false,
          error: "Company not found",
        },
        404,
      );
    }

    const { data: existingMember, error: memberError } = await admin
      .from("company_team_members")
      .select("id, status")
      .eq("company_id", companyId)
      .ilike("email", email)
      .maybeSingle();

    if (memberError) {
      console.error("Member lookup failed:", memberError);

      return json(
        {
          ok: false,
          error: "Could not check existing team members",
        },
        500,
      );
    }

    if (existingMember?.status === "active") {
      return json(
        {
          ok: false,
          error: "Sorry, this email is already a member of your company team.",
          code: "TEAM_MEMBER_ALREADY_ACTIVE",
        },
        409,
      );
    }

    const { data: existingInvite, error: existingInviteError } =
      await admin
        .from("company_team_invites")
        .select("id, status, expires_at")
        .eq("company_id", companyId)
        .ilike("email", email)
        .eq("status", "pending")
        .maybeSingle();

    if (existingInviteError) {
      console.error("Pending invite lookup failed:", existingInviteError);

      return json(
        {
          ok: false,
          error: "Could not check existing invitations",
        },
        500,
      );
    }

    if (existingInvite) {
      return json(
        {
          ok: false,
          error: "Sorry, this email already has a pending invitation.",
          code: "INVITE_ALREADY_PENDING",
        },
        409,
      );
    }

    const now = new Date();
    const expiresAt = new Date(
      now.getTime() + 7 * 24 * 60 * 60 * 1000,
    );

    const token = createInviteToken();
    const tokenHash = await sha256(token);

    const { data: invite, error: inviteError } = await admin
      .from("company_team_invites")
      .insert({
        company_id: companyId,
        email,
        role: "manager",
        status: "pending",
        token_hash: tokenHash,
        expires_at: expiresAt.toISOString(),
        created_by: user.id,
      })
      .select("id, expires_at")
      .single();

    if (inviteError || !invite) {
      console.error("Invite creation failed:", inviteError);

      return json(
        {
          ok: false,
          error: "Could not create invitation",
        },
        500,
      );
    }

    const inviteUrl =
      `https://www.carriertrust.eu/team-invite?token=${encodeURIComponent(token)}`;

    const companyName = String(company.name ?? "the company");

    const html = emailShell(`
      <div style="font-size:12px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:#10b981;">
        Company access
      </div>

      <h1 style="margin:10px 0 14px 0;font-size:32px;line-height:1.18;letter-spacing:-0.03em;color:#0f172a;">
        Join ${escapeHtml(companyName)} on CarrierTrust
      </h1>

      <p style="margin:0 0 22px 0;font-size:16px;line-height:1.7;color:#475569;">
        You have been invited to manage this company profile using your own secure CarrierTrust account.
      </p>

      <div style="margin:0 0 24px 0;padding:18px 20px;border:1px solid #e2e8f0;border-radius:16px;background:#f8fafc;">
        <div style="margin:0 0 10px 0;font-size:14px;color:#64748b;">Company</div>
        <div style="font-size:18px;font-weight:800;color:#0f172a;">
          ${escapeHtml(companyName)}
        </div>
        <div style="margin-top:14px;font-size:14px;line-height:1.7;color:#475569;">
          You will be able to help manage the company profile and publish official replies to reviews.
        </div>
      </div>

      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="border-radius:14px;background:#0f172a;">
            <a
              href="${inviteUrl}"
              style="display:inline-block;padding:15px 24px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;"
            >
              Accept invitation
            </a>
          </td>
        </tr>
      </table>

      <p style="margin:22px 0 0 0;font-size:13px;line-height:1.7;color:#64748b;">
        Sign in with <strong style="color:#334155;">${escapeHtml(email)}</strong>.
        This invitation expires in 7 days.
      </p>

      <p style="margin:8px 0 0 0;font-size:12px;line-height:1.7;color:#94a3b8;">
        If you did not expect this invitation, you can ignore this email.
      </p>
    `);

    const emailResult = await sendEmail({
      apiKey: RESEND_API_KEY,
      from: EMAIL_FROM,
      to: email,
      subject: `Invitation to join ${companyName} on CarrierTrust`,
      html,
    });

    if (!emailResult.ok) {
      console.error(
        "Resend rejected invitation:",
        JSON.stringify(emailResult),
      );

      await admin
        .from("company_team_invites")
        .update({
          status: "revoked",
          revoked_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", invite.id);

      return json(
        {
          ok: false,
          error: "Invitation was created, but the email could not be sent",
          email_status: emailResult.status,
        },
        502,
      );
    }

    return json({
      ok: true,
      invite_id: invite.id,
      company_id: companyId,
      email,
      expires_at: invite.expires_at,
      email_sent: true,
    });
  } catch (error) {
    console.error("invite-company-team-member fatal:", error);

    return json(
      {
        ok: false,
        error: "Unexpected server error",
      },
      500,
    );
  }
});
