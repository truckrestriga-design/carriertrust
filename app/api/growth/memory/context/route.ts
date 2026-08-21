import { NextResponse } from "next/server";
import { requireGrowthAdmin } from "@/lib/zoho/adminGuard";
import { buildCompanyContext } from "@/lib/growth/contextBuilder";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const auth = await requireGrowthAdmin(req);

    if (!auth.ok) {
      return NextResponse.json(
        { ok: false, error: auth.error },
        { status: auth.status }
      );
    }

    const url = new URL(req.url);
    const companyId = (url.searchParams.get("companyId") || "").trim();

    if (!companyId) {
      return NextResponse.json(
        { ok: false, error: "companyId is required" },
        { status: 400 }
      );
    }

    const context = await buildCompanyContext(companyId);

    return NextResponse.json({
      ok: true,
      companyId,
      characters: context.length,
      context,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to build Growth AI context";

    console.error("GROWTH CONTEXT ERROR:", error);

    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
