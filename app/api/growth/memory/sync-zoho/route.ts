import { NextResponse } from "next/server";
import { syncZohoHistoryToGrowthMemory } from "@/lib/growth/zohoMemorySync";
import { requireGrowthAdmin } from "@/lib/zoho/adminGuard";
import { isZohoNotConnectedError } from "@/lib/zoho/mailApi";

export const runtime = "nodejs";

/**
 * POST /api/growth/memory/sync-zoho
 *
 * Manual, admin-only Zoho → Growth Memory sync.
 * READ-ONLY Zoho list/content. WRITE only to Growth Memory.
 * No send, delete, mark read/unread, drafts, OpenAI, or cron.
 */
export async function POST(req: Request) {
  try {
    const auth = await requireGrowthAdmin(req);
    if (!auth.ok) {
      return NextResponse.json(
        { ok: false, error: auth.error },
        { status: auth.status }
      );
    }

    const result = await syncZohoHistoryToGrowthMemory();
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Zoho Growth Memory sync failed";
    const status = isZohoNotConnectedError(error) ? 409 : 500;
    console.error("GROWTH MEMORY ZOHO SYNC ERROR:", message);
    return NextResponse.json(
      {
        ok: false,
        error: message,
        connected: !isZohoNotConnectedError(error),
        notConnected: isZohoNotConnectedError(error),
      },
      { status }
    );
  }
}
