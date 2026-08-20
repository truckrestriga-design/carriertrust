import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { requireGrowthAdmin } from "@/lib/zoho/adminGuard";
import { buildZohoAuthorizeUrl, getZohoOAuthConfig } from "@/lib/zoho/oauth";

export const runtime = "nodejs";

const STATE_COOKIE = "zoho_oauth_state";

export async function POST(req: Request) {
  try {
    const auth = await requireGrowthAdmin(req);
    if (!auth.ok) {
      return NextResponse.json(
        { ok: false, error: auth.error },
        { status: auth.status }
      );
    }

    // Validate OAuth env early so the UI gets a clear error.
    getZohoOAuthConfig();

    const state = randomBytes(24).toString("hex");
    const authorizeUrl = buildZohoAuthorizeUrl(state);

    const res = NextResponse.json({
      ok: true,
      authorizeUrl,
      // Never return client secret or tokens.
    });

    res.cookies.set(STATE_COOKIE, state, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 600,
    });

    return res;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to start Zoho connect";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
