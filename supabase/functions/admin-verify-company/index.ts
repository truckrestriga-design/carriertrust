// supabase/functions/admin-verify-company/index.ts
//
// Admin-only. Verifies/unverifies a company using SERVICE ROLE.
//
// POST body:
// {
//   "company_id": "uuid",
//   "action": "verify" | "unverify"
// }
//
// Response:
// { ok:true }

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
    if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") ?? "";

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY || !ADMIN_EMAIL) {
      return json({ ok: false, error: "Server misconfigured (missing secrets)" }, 500);
    }

    // 1) Admin auth (via user JWT in Authorization header)
    const authHeader = req.headers.get("authorization") || "";
    const anon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userErr } = await anon.auth.getUser();
    if (userErr || !userData?.user) return json({ ok: false, error: "Unauthorized" }, 401);

    const email = (userData.user.email || "").toLowerCase();
    if (email !== ADMIN_EMAIL.toLowerCase()) return json({ ok: false, error: "Forbidden" }, 403);

    // 2) Parse body
    const body = await req.json().catch(() => ({}));
    const company_id = String(body.company_id || "").trim();
    const action = String(body.action || "").trim().toLowerCase();

    if (!company_id) return json({ ok: false, error: "Missing company_id" }, 400);
    if (action !== "verify" && action !== "unverify") {
      return json({ ok: false, error: "Invalid action" }, 400);
    }

    // 3) Service role update
    const service = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    if (action === "verify") {
      const { error } = await service
        .from("companies")
        .update({
          is_verified_company: true,
          verified_at: new Date().toISOString(),
          verification_method: "admin_manual",
          verified_by_admin: userData.user.id,
        })
        .eq("id", company_id);

      if (error) return json({ ok: false, error: "Failed to verify", details: error.message }, 500);
      return json({ ok: true });
    }

    // unverify
    const { error } = await service
      .from("companies")
      .update({
        is_verified_company: false,
        verified_at: null,
        verification_method: null,
        verified_by_admin: null,
      })
      .eq("id", company_id);

    if (error) return json({ ok: false, error: "Failed to unverify", details: error.message }, 500);
    return json({ ok: true });
  } catch (e) {
    console.error("admin-verify-company error:", e);
    return json({ ok: false, error: "Internal error" }, 500);
  }
});