import { NextResponse } from "next/server";
import { listDraftMessages } from "@/lib/zoho/client";
import { MAIL_LIST_LIMIT, withGrowthAdmin } from "@/lib/zoho/mailApi";

export const runtime = "nodejs";

/** READ ONLY — lists Draft messages. Does not create/send/delete drafts. */
export async function GET(req: Request) {
  return withGrowthAdmin(req, async () => {
    const messages = await listDraftMessages({
      limit: MAIL_LIST_LIMIT,
      start: 1,
    });
    return NextResponse.json({
      ok: true,
      folder: "drafts",
      limit: MAIL_LIST_LIMIT,
      messages,
    });
  });
}
