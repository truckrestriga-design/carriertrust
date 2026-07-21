from pathlib import Path
import re
import sys

path = Path("supabase/functions/invite-company-team-member/index.ts")

if not path.exists():
    sys.exit(f"File not found: {path}")

source = path.read_text(encoding="utf-8")
backup = path.with_suffix(".ts.backup-before-email-style")
backup.write_text(source, encoding="utf-8")

old_shell_pattern = re.compile(
    r"function emailShell\(content: string\) \{\n.*?\n\}\n\nDeno\.serve",
    re.DOTALL,
)

new_shell = '''function brandHeader() {
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

      <div style="padding:16px 6px 0 6px;font-size:12px;line-height:1.7;color:#7b8494;text-align:left;">
        CarrierTrust.eu<br />
        Reputation platform for transport companies
      </div>
    </div>
  </body>
</html>
  `;
}

Deno.serve'''

source, shell_count = old_shell_pattern.subn(new_shell, source, count=1)

if shell_count != 1:
    sys.exit("Could not replace email template. Backup created, final file not written.")

old_duplicate_block = '''    const now = new Date();
    const expiresAt = new Date(
      now.getTime() + 7 * 24 * 60 * 60 * 1000,
    );

    const token = createInviteToken();
    const tokenHash = await sha256(token);

    const { error: revokeError } = await admin
      .from("company_team_invites")
      .update({
        status: "revoked",
        revoked_at: now.toISOString(),
        updated_at: now.toISOString(),
      })
      .eq("company_id", companyId)
      .ilike("email", email)
      .eq("status", "pending");

    if (revokeError) {
      console.error("Old invite revoke failed:", revokeError);

      return json(
        {
          ok: false,
          error: "Could not replace an existing invitation",
        },
        500,
      );
    }

    const { data: invite, error: inviteError } = await admin'''

new_duplicate_block = '''    const { data: existingInvite, error: existingInviteError } =
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

    const { data: invite, error: inviteError } = await admin'''

if old_duplicate_block not in source:
    sys.exit("Could not find old duplicate block. Backup created, final file not written.")

source = source.replace(old_duplicate_block, new_duplicate_block, 1)

source = source.replace(
    'error: "This person is already an active team member",',
    'error: "Sorry, this email is already a member of your company team.",\n'
    '          code: "TEAM_MEMBER_ALREADY_ACTIVE",',
    1,
)

old_html_pattern = re.compile(
    r"    const html = emailShell\(`\n.*?\n    `\);\n\n    const emailResult",
    re.DOTALL,
)

new_html = '''    const html = emailShell(`
      <h1 style="margin:0 0 14px 0;font-size:32px;line-height:1.2;color:#0f172a;">
        You have been invited
      </h1>

      <p style="margin:0 0 20px 0;font-size:16px;line-height:1.7;color:#334155;">
        <strong>${escapeHtml(companyName)}</strong> has invited you to join
        its CarrierTrust company profile as a manager.
      </p>

      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:18px;padding:18px;margin-bottom:22px;">
        <div style="margin:0 0 12px 0;font-size:15px;font-weight:800;color:#0f172a;">
          As a company manager, you can:
        </div>

        <div style="margin:0 0 9px 0;font-size:15px;line-height:1.6;color:#334155;">
          <span style="color:#10b981;font-weight:900;">✓</span>
          Reply to company reviews
        </div>

        <div style="margin:0 0 9px 0;font-size:15px;line-height:1.6;color:#334155;">
          <span style="color:#10b981;font-weight:900;">✓</span>
          Help manage the company profile
        </div>

        <div style="margin:0;font-size:15px;line-height:1.6;color:#334155;">
          <span style="color:#10b981;font-weight:900;">✓</span>
          Work using your own secure CarrierTrust account
        </div>
      </div>

      <a
        href="${inviteUrl}"
        style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:14px;font-weight:700;font-size:15px;"
      >
        Accept invitation
      </a>

      <p style="margin:22px 0 0 0;font-size:14px;line-height:1.7;color:#64748b;">
        This invitation expires in 7 days. You must sign in using
        <strong style="color:#334155;">${escapeHtml(email)}</strong>.
      </p>

      <p style="margin:10px 0 0 0;font-size:13px;line-height:1.7;color:#94a3b8;">
        If you were not expecting this invitation, you can safely ignore this email.
      </p>
    `);

    const emailResult'''

source, html_count = old_html_pattern.subn(new_html, source, count=1)

if html_count != 1:
    sys.exit("Could not replace invitation body. Backup created, final file not written.")

path.write_text(source, encoding="utf-8")

print("Updated:", path)
print("Backup:", backup)
print("Done.")
