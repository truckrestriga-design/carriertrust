import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, PATCH, OPTIONS",
};

function json(status: number, data: unknown) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json; charset=utf-8" },
  });
}

function getAuthHeader(req: Request) {
  return req.headers.get("authorization") || req.headers.get("Authorization") || "";
}

function getBearerToken(req: Request) {
  const h = getAuthHeader(req);
  const m = h.match(/^Bearer\s+(.+)$/i);
  return m?.[1] || "";
}

function isUuid(s: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });

  try {
    // В Edge Functions обычно уже есть SUPABASE_URL и SUPABASE_ANON_KEY в env
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    // admin email: либо секрет, либо fallback
    const ADMIN_EMAIL = (Deno.env.get("ADMIN_EMAIL") || "carriertrust.eu@gmail.com").toLowerCase();

    if (!SUPABASE_URL) return json(500, { error: "Missing SUPABASE_URL secret" });
    if (!SUPABASE_ANON_KEY) return json(500, { error: "Missing SUPABASE_ANON_KEY secret" });
    if (!SUPABASE_SERVICE_ROLE_KEY) return json(500, { error: "Missing SUPABASE_SERVICE_ROLE_KEY secret" });

    // ---- 1) Проверяем JWT пользователя через ANON клиент (официальный паттерн) ----
    const authHeader = getAuthHeader(req);
    const token = getBearerToken(req);
    if (!token) return json(401, { error: "Missing Authorization: Bearer <token>" });

    const supabaseAuth = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userErr } = await supabaseAuth.auth.getUser();
    if (userErr || !userData?.user) {
      return json(401, {
        error: "Invalid session (JWT)",
        details: userErr?.message || null,
      });
    }

    const email = (userData.user.email || "").toLowerCase();
    if (email !== ADMIN_EMAIL) {
      return json(403, { error: "Forbidden (not admin)" });
    }

    // ---- 2) Service role клиент только для DB ----
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // ---- ROUTES ----
    if (req.method === "GET") {
      const url = new URL(req.url);

      const limitRaw = parseInt(url.searchParams.get("limit") || "200", 10) || 200;
      const limit = Math.min(Math.max(limitRaw, 1), 500);

      const status = (url.searchParams.get("status") || "all").trim();
      const q = (url.searchParams.get("q") || "").trim();

      let query = supabaseAdmin
        .from("reports_v2")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (status !== "all") query = query.eq("status", status);

      if (q) {
        const like = `%${q}%`;

        // Поиск по текстовым полям
        query = query.or(
          [
            `reporter_email.ilike.${like}`,
            `reporter_company.ilike.${like}`,
            `company_name.ilike.${like}`,
            `company_vat.ilike.${like}`,
            `reason.ilike.${like}`,
            `ip.ilike.${like}`,
          ].join(",")
        );

        // Если q похож на UUID — дополнительно ищем точным совпадением
        if (isUuid(q)) {
          query = query.or(`review_id.eq.${q},company_id.eq.${q}`);
        }
      }

      const { data, error } = await query;
      if (error) return json(500, { error: "Failed to load reports", details: error.message });

      return json(200, { ok: true, data });
    }

    if (req.method === "PATCH") {
      let body: any = {};
      try {
        body = await req.json();
      } catch {
        return json(400, { error: "Invalid JSON body" });
      }

      const id = String(body?.id || "").trim();
      if (!id) return json(400, { error: "Missing id" });

      const patch: Record<string, any> = {};

      if (typeof body?.status === "string" && body.status.trim()) {
        patch.status = body.status.trim();
        patch.processed_at = new Date().toISOString();
      }

      if (typeof body?.admin_notes === "string") {
        patch.admin_notes = body.admin_notes;
      }

      if (Object.keys(patch).length === 0) {
        return json(400, { error: "Nothing to update" });
      }

      const { error } = await supabaseAdmin.from("reports_v2").update(patch).eq("id", id);
      if (error) return json(500, { error: "Failed to update report", details: error.message });

      return json(200, { ok: true });
    }

    return json(405, { error: "Method not allowed" });
  } catch (e) {
    return json(500, { error: "Unexpected error", details: String((e as any)?.message || e) });
  }
});