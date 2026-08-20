import { NextResponse } from "next/server";
import {
  createZohoDraft,
  getValidZohoTokens,
  listZohoAccounts,
} from "@/lib/zoho/client";
import { withGrowthAdmin } from "@/lib/zoho/mailApi";

export const runtime = "nodejs";

/** Practical email check — rejects empty / clearly invalid addresses. */
function isValidEmailAddress(value: string): boolean {
  const email = value.trim();
  if (!email || email.length > 254) return false;
  // Single address only (no commas / display-name wrappers).
  if (/[,\s<>"]/.test(email)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type DraftBody = {
  to?: unknown;
  subject?: unknown;
  body?: unknown;
};

/**
 * Create a Zoho Mail Draft only.
 * Uses official Save Draft API: POST /api/accounts/{accountId}/messages
 * with mode: "draft". Never calls send (mode omitted / send flow).
 */
export async function POST(req: Request) {
  return withGrowthAdmin(req, async () => {
    let payload: DraftBody;
    try {
      payload = (await req.json()) as DraftBody;
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const to = typeof payload.to === "string" ? payload.to.trim() : "";
    const subject =
      typeof payload.subject === "string" ? payload.subject.trim() : "";
    const body = typeof payload.body === "string" ? payload.body : "";

    if (!to) {
      return NextResponse.json(
        { ok: false, error: "to is required" },
        { status: 400 }
      );
    }
    if (!isValidEmailAddress(to)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address in to" },
        { status: 400 }
      );
    }
    if (!subject) {
      return NextResponse.json(
        { ok: false, error: "subject is required" },
        { status: 400 }
      );
    }
    if (!body.trim()) {
      return NextResponse.json(
        { ok: false, error: "body is required" },
        { status: 400 }
      );
    }

    const tokens = await getValidZohoTokens();
    const accounts = await listZohoAccounts(tokens);
    const account =
      accounts.find((a) => String(a.accountId) === String(tokens.accountId)) ||
      accounts[0];

    const fromAddress =
      tokens.accountEmail ||
      account?.primaryEmailAddress ||
      account?.mailboxAddress ||
      "";

    if (!fromAddress) {
      return NextResponse.json(
        {
          ok: false,
          error: "Connected Zoho account has no from address",
        },
        { status: 409 }
      );
    }

    const draft = await createZohoDraft({
      fromAddress,
      toAddress: to,
      subject,
      content: body,
      mailFormat: "plaintext",
    });

    return NextResponse.json({
      ok: true,
      mode: "draft",
      draft,
    });
  });
}
