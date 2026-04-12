import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

async function requireUser(url: string, anonKey: string, authHeader: string) {
  const anon = createClient(url, anonKey, {
    global: {
      headers: { Authorization: authHeader },
    },
  });

  const { data, error } = await anon.auth.getUser();
  if (error || !data?.user) return null;
  return data.user;
}

function normalizeEmails(raw: string) {
  return raw
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
}

Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const ADMIN_EMAILS = normalizeEmails(Deno.env.get("ADMIN_EMAILS") ?? "");

    const authHeader = req.headers.get("authorization") || "";
    const user = await requireUser(SUPABASE_URL, SUPABASE_ANON_KEY, authHeader);

    if (!user) {
      return json({ ok: false, error: "Unauthorized" }, 401);
    }

    if (!ADMIN_EMAILS.includes((user.email || "").toLowerCase())) {
      return json({ ok: false, error: "Forbidden" }, 403);
    }

    const service = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data, error } = await service
      .from("admin_audit_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      return json({ ok: false, error: error.message }, 500);
    }

    return json({
      ok: true,
      rows: data || [],
    });
  } catch (e: any) {
    return json({
      ok: false,
      error: String(e?.message || e),
    }, 500);
  }
});