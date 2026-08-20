import { NextResponse } from "next/server";
import { getZohoMessageDetail } from "@/lib/zoho/client";
import { withGrowthAdmin } from "@/lib/zoho/mailApi";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }> | { id: string };
};

/** READ ONLY — fetch one message body + attachment metadata. GET only. */
export async function GET(req: Request, context: RouteContext) {
  return withGrowthAdmin(req, async () => {
    const params = await Promise.resolve(context.params);
    const messageId = String(params?.id || "").trim();
    const url = new URL(req.url);
    const folderId = (url.searchParams.get("folderId") || "").trim();

    if (!messageId) {
      return NextResponse.json(
        { ok: false, error: "Missing message id" },
        { status: 400 }
      );
    }
    if (!folderId) {
      return NextResponse.json(
        { ok: false, error: "Missing folderId query parameter" },
        { status: 400 }
      );
    }

    const message = await getZohoMessageDetail({
      messageId,
      folderId,
      subject: url.searchParams.get("subject") || undefined,
      fromAddress: url.searchParams.get("fromAddress") || undefined,
      toAddress: url.searchParams.get("toAddress") || undefined,
      receivedTime: url.searchParams.get("receivedTime") || undefined,
      sentDateInGMT: url.searchParams.get("sentDateInGMT") || undefined,
      status: url.searchParams.get("status") || undefined,
    });

    return NextResponse.json({ ok: true, message });
  });
}
