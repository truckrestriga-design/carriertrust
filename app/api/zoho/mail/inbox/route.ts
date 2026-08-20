import { NextResponse } from "next/server";
import { listInboxMessages } from "@/lib/zoho/client";
import { MAIL_LIST_LIMIT, withGrowthAdmin } from "@/lib/zoho/mailApi";

export const runtime = "nodejs";

/** READ ONLY — lists Inbox messages. Does not send/delete/mutate mail. */
export async function GET(req: Request) {
  return withGrowthAdmin(req, async () => {
    const messages = await listInboxMessages({ limit: MAIL_LIST_LIMIT, start: 1 });
    return NextResponse.json({
      ok: true,
      folder: "inbox",
      limit: MAIL_LIST_LIMIT,
      messages,
    });
  });
}
