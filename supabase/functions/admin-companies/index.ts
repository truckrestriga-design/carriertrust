// supabase/functions/admin-companies/index.ts
//
// Admin-only. List / update / delete companies using SERVICE ROLE.
//
// GET:
//   /functions/v1/admin-companies?limit=500&q=term&filter=all
//
// PATCH body:
// {
//   "company_id": "uuid",
//   "action": "update",
//   "name": "New name",
//   "vat_uid": "DE123456789",
//   "country": "Germany"
// }
//
// DELETE body:
// {
//   "company_id": "uuid",
//   "confirm": "DELETE"
// }

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, PATCH, DELETE, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function requireAdmin(req: Request) {
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
  const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") ?? "";

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !ADMIN_EMAIL) {
    return {
      ok: false as const,
      response: json({ ok: false, error: "Server misconfigured (missing secrets)" }, 500),
    };
  }

  const authHeader = req.headers.get("authorization") || "";
  const anon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: userData, error: userErr } = await anon.auth.getUser();
  if (userErr || !userData?.user) {
    return {
      ok: false as const,
      response: json({ ok: false, error: "Unauthorized" }, 401),
    };
  }

  const email = (userData.user.email || "").toLowerCase();
  if (email !== ADMIN_EMAIL.toLowerCase()) {
    return {
      ok: false as const,
      response: json({ ok: false, error: "Forbidden" }, 403),
    };
  }

  return {
    ok: true as const,
    user: userData.user,
    SUPABASE_URL,
  };
}

Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    const admin = await requireAdmin(req);
    if (!admin.ok) return admin.response;

    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    if (!SUPABASE_SERVICE_ROLE_KEY) {
      return json({ ok: false, error: "Server misconfigured (missing service role key)" }, 500);
    }

    const service = createClient(admin.SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    if (req.method === "GET") {
      const url = new URL(req.url);
      const q = (url.searchParams.get("q") || "").trim();
      const filter = (url.searchParams.get("filter") || "all").trim().toLowerCase();
      const limitRaw = Number(url.searchParams.get("limit") || "500");
      const limit = Math.max(1, Math.min(1000, limitRaw));

      let query = service
        .from("companies")
        .select(`
          id,
          name,
          vat_uid,
          country,
          created_at,
          is_verified_company,
          verified_at,
          published_reviews_count,
          avg_rating,
          trust_score
        `)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (q) {
        query = query.or(`name.ilike.%${q}%,vat_uid.ilike.%${q}%,country.ilike.%${q}%`);
      }

      if (filter === "verified") {
        query = query.eq("is_verified_company", true);
      } else if (filter === "unverified") {
        query = query.or("is_verified_company.is.null,is_verified_company.eq.false");
      } else if (filter === "with_reviews") {
        query = query.gt("published_reviews_count", 0);
      } else if (filter === "no_reviews") {
        query = query.or("published_reviews_count.is.null,published_reviews_count.eq.0");
      }

      const { data, error } = await query;

      if (error) {
        return json({ ok: false, error: "Failed to load companies", details: error.message }, 500);
      }

      return json({
        ok: true,
        rows: data || [],
      });
    }

    if (req.method === "PATCH") {
      const body = await req.json().catch(() => ({}));
      const company_id = String(body.company_id || "").trim();
      const action = String(body.action || "").trim().toLowerCase();

      if (!company_id) {
        return json({ ok: false, error: "Missing company_id" }, 400);
      }

      if (action !== "update") {
        return json({ ok: false, error: "Invalid action" }, 400);
      }

      const name = typeof body.name === "string" ? body.name.trim() : "";
      const vat_uid = typeof body.vat_uid === "string" ? body.vat_uid.trim().toUpperCase() : "";
      const country = typeof body.country === "string" ? body.country.trim() : "";

      if (!name) return json({ ok: false, error: "Missing name" }, 400);
      if (!vat_uid) return json({ ok: false, error: "Missing vat_uid" }, 400);
      if (!country) return json({ ok: false, error: "Missing country" }, 400);

      const { data: before, error: beforeErr } = await service
        .from("companies")
        .select("id, name, vat_uid, country")
        .eq("id", company_id)
        .single();

      if (beforeErr || !before) {
        return json({ ok: false, error: "Company not found" }, 404);
      }

      const { error } = await service
        .from("companies")
        .update({
          name,
          vat_uid,
          country,
        })
        .eq("id", company_id);

      if (error) {
        return json({ ok: false, error: "Failed to update company", details: error.message }, 500);
      }

      await service.from("admin_audit_log").insert({
        admin_email: admin.user.email || null,
        action: "company_update",
        target_company_id: company_id,
        details: {
          old_name: before.name,
          old_vat_uid: before.vat_uid,
          old_country: before.country,
          new_name: name,
          new_vat_uid: vat_uid,
          new_country: country,
        },
      });

      return json({ ok: true });
    }

    if (req.method === "DELETE") {
      const body = await req.json().catch(() => ({}));
      const company_id = String(body.company_id || "").trim();
      const confirmWord = String(body.confirm || "").trim();

      if (!company_id) {
        return json({ ok: false, error: "Missing company_id" }, 400);
      }

      if (confirmWord !== "DELETE") {
        return json({ ok: false, error: "Invalid confirmation word" }, 400);
      }

      const { data: companyBefore, error: beforeErr } = await service
        .from("companies")
        .select("id, name, vat_uid, country")
        .eq("id", company_id)
        .single();

      if (beforeErr || !companyBefore) {
        return json({ ok: false, error: "Company not found" }, 404);
      }

      const { error } = await service
        .from("companies")
        .delete()
        .eq("id", company_id);

      if (error) {
        return json({ ok: false, error: "Failed to delete company", details: error.message }, 500);
      }

      await service.from("admin_audit_log").insert({
        admin_email: admin.user.email || null,
        action: "company_delete",
        target_company_id: company_id,
        details: {
          name: companyBefore.name,
          vat_uid: companyBefore.vat_uid,
          country: companyBefore.country,
        },
      });

      return json({ ok: true });
    }

    return json({ ok: false, error: "Method not allowed" }, 405);
  } catch (e) {
    console.error("admin-companies error:", e);
    return json({ ok: false, error: "Internal error" }, 500);
  }
});