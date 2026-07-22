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

function emailShell(content: string) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CarrierTrust company invitation</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f6f8;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f6f8;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:760px;background:#ffffff;border:1px solid #e2e8f0;border-radius:28px;overflow:hidden;box-shadow:0 18px 60px rgba(15,23,42,0.08);">
            <tr>
              <td style="padding:32px 36px;background:linear-gradient(135deg,#f7fffb 0%,#eefcf7 45%,#ebfaf7 100%);border-bottom:1px solid #e2e8f0;">
                <table role="presentation" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <table role="presentation" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="72" height="72" align="center" valign="middle" style="width:72px;height:72px;border-radius:22px;background:linear-gradient(135deg,#16d39a 0%,#12b8cc 100%);font-size:28px;font-weight:700;color:#ffffff;box-shadow:0 14px 32px rgba(16,185,129,0.22);">
                            CT
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td style="padding-left:18px;vertical-align:middle;">
                      <div style="font-size:34px;line-height:1.1;font-weight:800;color:#0b1635;">CarrierTrust</div>
                      <div style="margin-top:8px;font-size:17px;line-height:1.4;color:#64748b;">EU logistics reputation network</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:40px 48px 44px;">
                ${content}
                <div style="margin-top:34px;font-size:15px;line-height:1.7;color:#64748b;">
                  This email was sent by CarrierTrust.
                </div>
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

// Prevent inviting an email that already has a CarrierTrust account.
const { data: usersPage, error: usersError } =
  await admin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

if (usersError) {
  console.error("User lookup failed:", usersError);

  return json(
    {
      ok: false,
      error: "Could not verify whether this email is already registered.",
    },
    500,
  );
}

const existingUser = usersPage.users.find(
  (u) => normalizeEmail(u.email) === email,
);

if (existingUser) {
  return json(
    {
      ok: false,
      error: "This email is already registered on CarrierTrust.",
      code: "USER_ALREADY_EXISTS",
    },
    409,
  );
}

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
      <div style="font-size:34px;line-height:1.2;font-weight:800;color:#0b1635;margin:0 0 20px;">
        Join ${escapeHtml(companyName)} on CarrierTrust
      </div>

      <div style="font-size:18px;line-height:1.7;color:#334155;margin:0 0 26px;">
        You have been invited to create a secure CarrierTrust manager account and help manage the company profile.
      </div>

      <div style="margin:0 0 28px;padding:20px 22px;border:1px solid #dbe4ef;border-radius:20px;background:#f8fafc;">
        <div style="font-size:14px;line-height:1.5;color:#64748b;">Company</div>
        <div style="margin-top:7px;font-size:20px;line-height:1.4;font-weight:800;color:#0b1635;">
          ${escapeHtml(companyName)}
        </div>
        <div style="margin-top:14px;font-size:16px;line-height:1.7;color:#475569;">
          The invitation is linked to <strong>${escapeHtml(email)}</strong>. You will be able to manage the company profile and publish official replies to reviews.
        </div>
      </div>

      <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 28px;">
        <tr>
          <td>
            <a href="${inviteUrl}" style="display:inline-block;background:#07153d;color:#ffffff;text-decoration:none;font-size:18px;font-weight:700;padding:18px 28px;border-radius:18px;box-shadow:0 12px 30px rgba(7,21,61,0.18);">
              Create manager account
            </a>
          </td>
        </tr>
      </table>

      <div style="margin:0 0 22px;padding:20px 22px;border:1px solid #dbe4ef;border-radius:20px;background:#f8fafc;font-size:16px;line-height:1.7;color:#475569;">
        This invitation expires in 7 days and can be used only once. If you did not expect this invitation, you can safely ignore this email.
      </div>
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
