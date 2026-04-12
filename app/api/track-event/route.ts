import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function normalizeReferrerDomain(referrer: string | null) {
  if (!referrer) return null;

  try {
    const url = new URL(referrer);
    return url.hostname || null;
  } catch {
    return null;
  }
}

function parseUserAgent(userAgent: string) {
  const ua = userAgent || "";

  const browser =
    /edg\//i.test(ua)
      ? "Edge"
      : /opr\//i.test(ua)
      ? "Opera"
      : /chrome\//i.test(ua)
      ? "Chrome"
      : /safari\//i.test(ua) && !/chrome\//i.test(ua)
      ? "Safari"
      : /firefox\//i.test(ua)
      ? "Firefox"
      : /msie|trident/i.test(ua)
      ? "Internet Explorer"
      : "Unknown";

  const os =
    /windows nt/i.test(ua)
      ? "Windows"
      : /android/i.test(ua)
      ? "Android"
      : /iphone|ipad|ipod/i.test(ua)
      ? "iOS"
      : /mac os x|macintosh/i.test(ua)
      ? "macOS"
      : /linux/i.test(ua)
      ? "Linux"
      : "Unknown";

  const device_type =
    /tablet|ipad/i.test(ua)
      ? "tablet"
      : /mobile/i.test(ua)
      ? "mobile"
      : "desktop";

  return { browser, os, device_type };
}

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const event_type = String(body?.event_type || "page_view").trim() || "page_view";
    const page_path = String(body?.page_path || "").trim() || null;
    const page_url = String(body?.page_url || "").trim() || null;
    const referrer = String(body?.referrer || "").trim() || null;
    const source = String(body?.source || "").trim() || null;
    const medium = String(body?.medium || "").trim() || null;
    const campaign = String(body?.campaign || "").trim() || null;
    const session_id = String(body?.session_id || "").trim() || null;
    const visitor_id = String(body?.visitor_id || "").trim() || null;

    const company_id = String(body?.company_id || "").trim() || null;
    const company_name = String(body?.company_name || "").trim() || null;
    const search_query = String(body?.search_query || "").trim() || null;
    const banner_id = String(body?.banner_id || "").trim() || null;
    const banner_placement = String(body?.banner_placement || "").trim() || null;

    const user_agent = req.headers.get("user-agent") || "";
    const ip = getClientIp(req);

    const country =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      null;

    const city =
      req.headers.get("x-vercel-ip-city") ||
      null;

    const referrer_domain = normalizeReferrerDomain(referrer);
    const ua = parseUserAgent(user_agent);

    const insert = await supabaseAdmin.from("site_visits").insert({
      event_type,
      page_path,
      page_url,
      country,
      city,
      referrer,
      referrer_domain,
      source,
      medium,
      campaign,
      device_type: ua.device_type,
      browser: ua.browser,
      os: ua.os,
      user_agent,
      session_id,
      visitor_id,
      ip,
      company_id,
      company_name,
      search_query,
      banner_id,
      banner_placement,
    });

    if (insert.error) {
      return NextResponse.json(
        { error: insert.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}