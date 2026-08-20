import { NextResponse } from "next/server";
import { requireGrowthAdmin } from "@/lib/zoho/adminGuard";

export const MAIL_LIST_LIMIT = 20;

export function isZohoNotConnectedError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error || "");
  return /not connected/i.test(message);
}

export async function withGrowthAdmin(
  req: Request,
  handler: () => Promise<NextResponse>
) {
  try {
    const auth = await requireGrowthAdmin(req);
    if (!auth.ok) {
      return NextResponse.json(
        { ok: false, error: auth.error },
        { status: auth.status }
      );
    }
    return await handler();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Zoho Mail request failed";
    const status = isZohoNotConnectedError(error) ? 409 : 500;
    console.error("ZOHO MAIL API ERROR:", message);
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
