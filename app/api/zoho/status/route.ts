import { NextResponse } from "next/server";
import { requireGrowthAdmin } from "@/lib/zoho/adminGuard";
import {
  clearZohoTokens,
  loadZohoTokens,
  publicZohoConnectionStatus,
} from "@/lib/zoho/tokenStore";

export const runtime = "nodejs";

/** Connection status for admin settings. Never returns tokens. */
export async function GET(req: Request) {
  try {
    const auth = await requireGrowthAdmin(req);
    if (!auth.ok) {
      return NextResponse.json(
        { ok: false, error: auth.error },
        { status: auth.status }
      );
    }

    const tokens = await loadZohoTokens();
    return NextResponse.json({
      ok: true,
      ...publicZohoConnectionStatus(tokens),
    });
  } catch (error) {
    console.error("ZOHO STATUS ERROR:", error);
    const message =
      error instanceof Error ? error.message : "Failed to read Zoho status";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

/** Disconnect: wipe encrypted token blob. Does not send mail. */
export async function DELETE(req: Request) {
  try {
    const auth = await requireGrowthAdmin(req);
    if (!auth.ok) {
      return NextResponse.json(
        { ok: false, error: auth.error },
        { status: auth.status }
      );
    }

    await clearZohoTokens();
    return NextResponse.json({
      ok: true,
      ...publicZohoConnectionStatus(null),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to disconnect Zoho";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
