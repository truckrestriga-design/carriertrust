import { NextResponse } from "next/server";
import { listSentMessages } from "@/lib/zoho/client";
import { MAIL_LIST_LIMIT, withGrowthAdmin } from "@/lib/zoho/mailApi";

export const runtime = "nodejs";

/** READ ONLY — lists Sent messages. Does not send/delete/mutate mail. */
export async function GET(req: Request) {
  return withGrowthAdmin(req, async () => {
    const messages = await listSentMessages({ limit: MAIL_LIST_LIMIT, start: 1 });
    return NextResponse.json({
      ok: true,
      folder: "sent",
      limit: MAIL_LIST_LIMIT,
      messages,
    });
  });
}
