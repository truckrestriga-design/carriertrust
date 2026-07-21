from pathlib import Path
import re
import sys

component = Path("components/company/CompanyTeamManager.tsx")
edge = Path("supabase/functions/invite-company-team-member/index.ts")

for path in (component, edge):
    if not path.exists():
        sys.exit(f"File not found: {path}")

# Patch friendly Edge Function error parsing
source = component.read_text(encoding="utf-8")
component.with_suffix(".tsx.backup-before-friendly-errors").write_text(source, encoding="utf-8")

old = """      if (error) throw new Error(getErrorMessage(error));

      if (data?.ok === false) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Could not send the invitation.",
        );
      }
"""

new = """      if (error) {
        let message = getErrorMessage(error);

        const context = (
          error as {
            context?: {
              json?: () => Promise<{
                error?: string;
                code?: string;
              }>;
            };
          }
        ).context;

        try {
          const body = await context?.json?.();

          if (typeof body?.error === "string" && body.error.trim()) {
            message = body.error;
          }
        } catch {
          // Keep the original Supabase error message.
        }

        throw new Error(message);
      }

      if (data?.ok === false) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Could not send the invitation.",
        );
      }
"""

if old not in source:
    sys.exit("Could not find CompanyTeamManager error block.")

component.write_text(source.replace(old, new, 1), encoding="utf-8")

# Patch email header and body
source = edge.read_text(encoding="utf-8")
edge.with_suffix(".ts.backup-before-real-logo").write_text(source, encoding="utf-8")

brand_pattern = re.compile(r"function brandHeader\(\) \{\n.*?\n\}\n\nfunction emailShell", re.DOTALL)
new_brand = """function brandHeader() {
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

function emailShell"""

source, count = brand_pattern.subn(new_brand, source, count=1)
if count != 1:
    sys.exit("Could not replace brandHeader.")

shell_pattern = re.compile(r"function emailShell\(content: string\) \{\n.*?\n\}\n\nDeno\.serve", re.DOTALL)
new_shell = """function emailShell(content: string) {
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

Deno.serve"""

source, count = shell_pattern.subn(new_shell, source, count=1)
if count != 1:
    sys.exit("Could not replace emailShell.")

html_pattern = re.compile(r"    const html = emailShell\(`\n.*?\n    `\);\n\n    const emailResult", re.DOTALL)
new_html = """    const html = emailShell(`
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

    const emailResult"""

source, count = html_pattern.subn(new_html, source, count=1)
if count != 1:
    sys.exit("Could not replace invitation email body.")

edge.write_text(source, encoding="utf-8")

print("Updated both files successfully.")
