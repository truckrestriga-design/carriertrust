import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(status: number, data: unknown) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json; charset=utf-8" },
  });
}

function getIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip")?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    ""
  );
}

function normalizeEmail(email?: string): string {
  return (email ?? "").trim().toLowerCase();
}

async function sha256(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function logAbuse(
  supabase: ReturnType<typeof createClient>,
  params: {
    event_type: string;
    ip?: string;
    fingerprint?: string;
    reporter_email_norm?: string;
    review_id?: string;
    company_id?: string;
    details?: Record<string, unknown>;
  },
) {
  try {
    await supabase.from("abuse_events").insert({
      event_type: params.event_type,
      ip: params.ip ?? null,
      fingerprint: params.fingerprint ?? null,
      reporter_email_norm: params.reporter_email_norm ?? null,
      review_id: params.review_id ?? null,
      company_id: params.company_id ?? null,
      details: params.details ?? {},
    });
  } catch {
    // do not break reports because of logging
  }
}

async function bumpScore(
  supabase: ReturnType<typeof createClient>,
  profile_type: "ip" | "email" | "fingerprint",
  key: string,
  delta: number,
) {
  try {
    await supabase.rpc("bump_abuse_score", { p_type: profile_type, p_key: key, p_delta: delta });
  } catch {
    // ignore
  }
}

async function checkLimit(
  supabase: ReturnType<typeof createClient>,
  scope: "ip" | "email" | "review" | "fingerprint",
  key: string,
  windowSeconds: number,
) {
  const { data, error } = await supabase.rpc("check_and_increment_report_limit", {
    p_scope: scope,
    p_key: key,
    p_window_seconds: windowSeconds,
  });

  if (error) throw error;

  const row = Array.isArray(data) ? data[0] : data;
  return row as {
    allowed: boolean;
    remaining: number;
    blocked_until: string | null;
    reason: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
    const REPORT_TO_EMAIL = Deno.env.get("REPORT_TO_EMAIL") || "carriertrust.eu@gmail.com";
    const RESEND_FROM = Deno.env.get("RESEND_FROM") || "CarrierTrust <reports@carriertrust.eu>";
    const ADMIN_REPLY_TO = Deno.env.get("ADMIN_REPLY_TO") || "";

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    if (!RESEND_API_KEY) return json(500, { error: "Missing RESEND_API_KEY secret" });
    if (!SUPABASE_URL) return json(500, { error: "Missing SUPABASE_URL secret" });
    if (!SUPABASE_SERVICE_ROLE_KEY) return json(500, { error: "Missing SUPABASE_SERVICE_ROLE_KEY secret" });

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // Traceability
    const ip = getIp(req) || "unknown";
    const user_agent = req.headers.get("user-agent") || "unknown";
    const now_iso = new Date().toISOString();

    // Body
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return json(400, { error: "Invalid JSON body" });
    }

    // Honeypot (bot trap). Field must be empty for humans.
    const website = String(body?.website ?? "").trim();

    const reporter_email_raw = String(body?.reporter_email ?? body?.reporterEmail ?? body?.email ?? "").trim();
    const reporter_email_norm = normalizeEmail(reporter_email_raw);

    const review_id = String(body?.review_id ?? body?.reviewId ?? "").trim();
    const company_id = String(body?.company_id ?? body?.companyId ?? "").trim();
    const reason = String(body?.reason ?? "").trim();

    const company_name = String(body?.company_name ?? body?.companyName ?? "").trim();
    const company_vat = String(body?.company_vat ?? body?.companyVat ?? "").trim();
    const reporter_company = String(body?.reporter_company ?? body?.reporterCompany ?? "").trim();
    const details = String(body?.details ?? "").trim();
    const page_url = String(body?.page_url ?? body?.pageUrl ?? "").trim();

    // fingerprint = sha256(ip + user_agent)
    const fingerprint = await sha256(`${ip}|${user_agent}`);

    // Honeypot filled => bot
    if (website.length > 0) {
      await logAbuse(supabaseAdmin, {
        event_type: "honeypot",
        ip,
        fingerprint,
        reporter_email_norm: reporter_email_norm || undefined,
        review_id,
        company_id,
        details: { website },
      });

      if (ip && ip !== "unknown") await bumpScore(supabaseAdmin, "ip", ip, 3);
      if (reporter_email_norm) await bumpScore(supabaseAdmin, "email", reporter_email_norm, 2);
      if (fingerprint) await bumpScore(supabaseAdmin, "fingerprint", fingerprint, 2);

      // Quiet success: do not inform bots
      return json(200, { ok: true });
    }

    // Required fields
    if (!review_id || !company_id || !reason || !reporter_email_raw) {
      return json(400, { error: "Missing required fields: review_id, company_id, reason, reporter_email" });
    }

    // =========================================================
    // STRONG RATE LIMITS
    // IMPORTANT: return blocked_until so UI can show exact wait time
    // =========================================================
    try {
      // IP limits
      if (ip && ip !== "unknown") {
        const ipHour = await checkLimit(supabaseAdmin, "ip", ip, 3600);
        if (!ipHour.allowed) {
          await logAbuse(supabaseAdmin, {
            event_type: "rate_limited",
            ip,
            fingerprint,
            reporter_email_norm: reporter_email_norm || undefined,
            review_id,
            company_id,
            details: { scope: "ip", window: 3600, blocked_until: ipHour.blocked_until },
          });
          await bumpScore(supabaseAdmin, "ip", ip, 5);
          return json(429, { error: "rate_limited", message: "Too many reports from this IP. Try later.", blocked_until: ipHour.blocked_until });
        }

        const ipDay = await checkLimit(supabaseAdmin, "ip", ip, 86400);
        if (!ipDay.allowed) {
          await logAbuse(supabaseAdmin, {
            event_type: "rate_limited",
            ip,
            fingerprint,
            reporter_email_norm: reporter_email_norm || undefined,
            review_id,
            company_id,
            details: { scope: "ip", window: 86400, blocked_until: ipDay.blocked_until },
          });
          await bumpScore(supabaseAdmin, "ip", ip, 8);
          return json(429, { error: "rate_limited", message: "Daily IP report limit reached. Try tomorrow.", blocked_until: ipDay.blocked_until });
        }
      }

      // Email limits
      if (reporter_email_norm) {
        const emHour = await checkLimit(supabaseAdmin, "email", reporter_email_norm, 3600);
        if (!emHour.allowed) {
          await logAbuse(supabaseAdmin, {
            event_type: "rate_limited",
            ip,
            fingerprint,
            reporter_email_norm,
            review_id,
            company_id,
            details: { scope: "email", window: 3600, blocked_until: emHour.blocked_until },
          });
          await bumpScore(supabaseAdmin, "email", reporter_email_norm, 6);
          return json(429, { error: "rate_limited", message: "Too many reports from this email. Try later.", blocked_until: emHour.blocked_until });
        }

        const emDay = await checkLimit(supabaseAdmin, "email", reporter_email_norm, 86400);
        if (!emDay.allowed) {
          await logAbuse(supabaseAdmin, {
            event_type: "rate_limited",
            ip,
            fingerprint,
            reporter_email_norm,
            review_id,
            company_id,
            details: { scope: "email", window: 86400, blocked_until: emDay.blocked_until },
          });
          await bumpScore(supabaseAdmin, "email", reporter_email_norm, 10);
          return json(429, { error: "rate_limited", message: "Daily email report limit reached. Try tomorrow.", blocked_until: emDay.blocked_until });
        }
      }

      // Review limits
      const revHour = await checkLimit(supabaseAdmin, "review", review_id, 3600);
      if (!revHour.allowed) {
        await logAbuse(supabaseAdmin, {
          event_type: "rate_limited",
          ip,
          fingerprint,
          reporter_email_norm: reporter_email_norm || undefined,
          review_id,
          company_id,
          details: { scope: "review", window: 3600, blocked_until: revHour.blocked_until },
        });
        return json(429, { error: "rate_limited", message: "This review is being reported too frequently. Try later.", blocked_until: revHour.blocked_until });
      }

      const revDay = await checkLimit(supabaseAdmin, "review", review_id, 86400);
      if (!revDay.allowed) {
        await logAbuse(supabaseAdmin, {
          event_type: "rate_limited",
          ip,
          fingerprint,
          reporter_email_norm: reporter_email_norm || undefined,
          review_id,
          company_id,
          details: { scope: "review", window: 86400, blocked_until: revDay.blocked_until },
        });
        return json(429, { error: "rate_limited", message: "Daily report limit for this review reached. Try tomorrow.", blocked_until: revDay.blocked_until });
      }

      // Fingerprint limits (IP+UA)
      if (fingerprint) {
        const fpHour = await checkLimit(supabaseAdmin, "fingerprint", fingerprint, 3600);
        if (!fpHour.allowed) {
          await logAbuse(supabaseAdmin, {
            event_type: "rate_limited",
            ip,
            fingerprint,
            reporter_email_norm: reporter_email_norm || undefined,
            review_id,
            company_id,
            details: { scope: "fingerprint", window: 3600, blocked_until: fpHour.blocked_until },
          });
          await bumpScore(supabaseAdmin, "fingerprint", fingerprint, 8);
          return json(429, { error: "rate_limited", message: "Too many attempts. Please try later.", blocked_until: fpHour.blocked_until });
        }
      }
    } catch (e) {
      // fail-open: do not block honest users if limiter temporarily fails
      console.error("Rate limit error:", e);
    }

    // =========================================================
    // DUPLICATE PROTECTION: same email + same review within 1 day
    // (You can change the number of days)
    // =========================================================
    if (reporter_email_norm) {
      const since = new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString();

      const { data: existing, error } = await supabaseAdmin
        .from("reports_v2")
        .select("id, created_at")
        .eq("review_id", review_id)
        .eq("reporter_email_norm", reporter_email_norm)
        .gte("created_at", since)
        .limit(1);

      if (!error && existing && existing.length > 0) {
        await logAbuse(supabaseAdmin, {
          event_type: "duplicate",
          ip,
          fingerprint,
          reporter_email_norm,
          review_id,
          company_id,
          details: { message: "Duplicate report (same email + same review within 1 day)", existing_report_id: existing[0].id },
        });

        await bumpScore(supabaseAdmin, "email", reporter_email_norm, 4);
        if (ip && ip !== "unknown") await bumpScore(supabaseAdmin, "ip", ip, 2);

        return json(409, { error: "duplicate", message: "You already reported this review recently." });
      }
    }

    // =========================================================
    // Save to reports_v2
    // =========================================================
    const { error: dbErr } = await supabaseAdmin.from("reports_v2").insert({
      review_id,
      company_id,
      company_name: company_name || null,
      company_vat: company_vat || null,
      page_url: page_url || null,
      reporter_email: reporter_email_raw,
      reporter_company: reporter_company || null,
      reason,
      details: details || null,
      ip: ip || "unknown",
      user_agent,
    });

    if (dbErr) {
      return json(500, { error: "Failed to save report to database", details: dbErr.message });
    }

    // =========================================================
    // Email via Resend (same logic as before)
    // =========================================================
    const subject = `CarrierTrust: Report for review ${review_id}`;
    const text = [
      "New report submitted",
      "",
      `Review ID: ${review_id}`,
      `Company ID: ${company_id}`,
      company_name ? `Company name: ${company_name}` : "",
      company_vat ? `Company VAT: ${company_vat}` : "",
      page_url ? `Page URL: ${page_url}` : "",
      "",
      "Traceability:",
      `Time (UTC): ${now_iso}`,
      `IP: ${ip || "unknown"}`,
      `User-Agent: ${user_agent}`,
      "",
      `Reporter email: ${reporter_email_raw}`,
      reporter_company ? `Reporter company: ${reporter_company}` : "Reporter company: (not provided)",
      "",
      "Reason:",
      reason,
      "",
      "Details:",
      details || "(empty)",
    ].filter(Boolean).join("\n");

    const replyTo = ADMIN_REPLY_TO || reporter_email_raw;

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: RESEND_FROM, to: [REPORT_TO_EMAIL], subject, text, replyTo }),
    });

    const out = await resp.json().catch(() => ({}));
    if (!resp.ok) return json(502, { error: "Resend rejected email", details: out });

    return json(200, { ok: true });
  } catch (e) {
    return json(500, { error: "Unexpected error", details: String((e as any)?.message || e) });
  }
});