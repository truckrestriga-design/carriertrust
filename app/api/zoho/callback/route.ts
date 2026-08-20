import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { listZohoAccounts } from "@/lib/zoho/client";
import { exchangeZohoCode } from "@/lib/zoho/oauth";
import { saveZohoTokens, type ZohoStoredTokens } from "@/lib/zoho/tokenStore";

export const runtime = "nodejs";

const STATE_COOKIE = "zoho_oauth_state";

function settingsRedirect(origin: string, query: Record<string, string>) {
  const url = new URL("/admin/growth/settings", origin);
  for (const [key, value] of Object.entries(query)) {
    url.searchParams.set(key, value);
  }
  return NextResponse.redirect(url);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin = url.origin;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const errorParam = url.searchParams.get("error");

  if (errorParam) {
    return settingsRedirect(origin, {
      zoho: "error",
      reason: errorParam,
    });
  }

  if (!code || !state) {
    return settingsRedirect(origin, {
      zoho: "error",
      reason: "missing_code",
    });
  }

  const cookieStore = await cookies();
  const expectedState = cookieStore.get(STATE_COOKIE)?.value || "";

  if (!expectedState || expectedState !== state) {
    return settingsRedirect(origin, {
      zoho: "error",
      reason: "invalid_state",
    });
  }

  try {
    const tokenRes = await exchangeZohoCode(code);

    if (!tokenRes.refresh_token) {
      return settingsRedirect(origin, {
        zoho: "error",
        reason: "missing_refresh_token",
      });
    }

    const now = new Date().toISOString();
    let stored: ZohoStoredTokens = {
      accessToken: tokenRes.access_token,
      refreshToken: tokenRes.refresh_token,
      expiresAt: Date.now() + tokenRes.expires_in * 1000,
      apiDomain: tokenRes.api_domain,
      connectedAt: now,
      updatedAt: now,
    };

    // Persist first so account lookup can use the new access token.
    await saveZohoTokens(stored);

    try {
      const accounts = await listZohoAccounts(stored);
      const primary = accounts[0];
      if (primary) {
        stored = {
          ...stored,
          accountId: String(primary.accountId),
          accountEmail:
            primary.primaryEmailAddress ||
            primary.mailboxAddress ||
            undefined,
          updatedAt: new Date().toISOString(),
        };
        await saveZohoTokens(stored);
      }
    } catch {
      // Connection still valid even if account metadata fetch fails.
    }

    const res = settingsRedirect(origin, { zoho: "connected" });
    res.cookies.set(STATE_COOKIE, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    });
    return res;
  } catch (error) {
    const reason =
      error instanceof Error ? error.message.slice(0, 120) : "token_exchange";
    return settingsRedirect(origin, {
      zoho: "error",
      reason,
    });
  }
}
