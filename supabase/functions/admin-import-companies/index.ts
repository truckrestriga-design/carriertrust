import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders: Record<string, string> = {
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

function isAdminEmail(userEmail: string | null | undefined, adminEmails: string[]) {
  const email = String(userEmail || "").trim().toLowerCase();
  if (!email) return false;
  return adminEmails.includes(email);
}

function parseCsv(text: string) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim());

  return lines.slice(1).map((line, index) => {
    const values = line.split(",").map((v) => v.trim());
    const row: Record<string, string> = {};

    headers.forEach((header, i) => {
      row[header] = values[i] ?? "";
    });

    row.__row_number = String(index + 2);
    return row;
  });
}

function normalizeCompany(row: Record<string, string>) {
  const name = String(row.name || "").trim();
  const vat_uid = String(row.vat_uid || "").trim().toUpperCase();
  const country = String(row.country || "").trim();

  return { name, vat_uid, country };
}

Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    if (req.method !== "POST") {
      return json({ ok: false, error: "Method not allowed" }, 405);
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const ADMIN_EMAILS_RAW = Deno.env.get("ADMIN_EMAILS") ?? "";

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
      return json({ ok: false, error: "Supabase env missing" }, 500);
    }

    const adminEmails = normalizeEmails(ADMIN_EMAILS_RAW);
    if (adminEmails.length === 0) {
      return json({ ok: false, error: "ADMIN_EMAILS secret is empty" }, 500);
    }

    const authHeader = req.headers.get("authorization") || "";
    const user = await requireUser(SUPABASE_URL, SUPABASE_ANON_KEY, authHeader);

    if (!user) {
      return json({ ok: false, error: "Unauthorized" }, 401);
    }

    if (!isAdminEmail(user.email, adminEmails)) {
      return json({ ok: false, error: "Forbidden" }, 403);
    }

    const service = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const body = await req.json().catch(() => ({}));

    const mode = String(body?.mode || "preview").toLowerCase();
    const csvText = String(body?.csv_text || "");

    if (!csvText.trim()) {
      return json({ ok: false, error: "csv_text is required" }, 400);
    }

    const parsedRows = parseCsv(csvText);

    if (parsedRows.length === 0) {
      return json({ ok: false, error: "CSV is empty or invalid" }, 400);
    }

    const validRows: Array<{ name: string; vat_uid: string; country: string; row_number: string }> = [];
    const errors: Array<{ row_number: string; error: string }> = [];

    for (const raw of parsedRows) {
      const rowNumber = String(raw.__row_number || "?");
      const item = normalizeCompany(raw);

      if (!item.name) {
        errors.push({ row_number: rowNumber, error: "Missing name" });
        continue;
      }

      if (!item.vat_uid) {
        errors.push({ row_number: rowNumber, error: "Missing vat_uid" });
        continue;
      }

      if (!item.country) {
        errors.push({ row_number: rowNumber, error: "Missing country" });
        continue;
      }

      validRows.push({
        ...item,
        row_number: rowNumber,
      });
    }

    const preview = validRows.map((r) => ({
      name: r.name,
      vat_uid: r.vat_uid,
      country: r.country,
      row_number: r.row_number,
    }));

    if (mode === "preview") {
      return json({
        ok: true,
        mode: "preview",
        total_rows: parsedRows.length,
        valid_rows: validRows.length,
        invalid_rows: errors.length,
        preview,
        errors,
      });
    }

    if (mode !== "import") {
      return json({ ok: false, error: "Unknown mode" }, 400);
    }

    let inserted = 0;
    let updated = 0;
    const importErrors: Array<{ row_number: string; error: string }> = [];

    for (const row of validRows) {
      const existingRes = await service
        .from("companies")
        .select("id, name, vat_uid, country")
        .eq("vat_uid", row.vat_uid)
        .maybeSingle();

      if (existingRes.error) {
        importErrors.push({
          row_number: row.row_number,
          error: existingRes.error.message,
        });
        continue;
      }

      if (existingRes.data) {
        const updateRes = await service
          .from("companies")
          .update({
            name: row.name,
            country: row.country,
          })
          .eq("id", existingRes.data.id);

        if (updateRes.error) {
          importErrors.push({
            row_number: row.row_number,
            error: updateRes.error.message,
          });
          continue;
        }

        updated += 1;
      } else {
        const insertRes = await service
        .from("companies")
        .insert({
          name: row.name,
          vat_uid: row.vat_uid,
          country: row.country,
        })
        .select("id")
        .single();
      
      if (insertRes.error) {
        importErrors.push({
          row_number: row.row_number,
          error: insertRes.error.message,
        });
        continue;
      }
      
      const companyId = insertRes.data.id;
      
      const planRes = await service
        .from("company_plans")
        .insert({
          company_id: companyId,
          plan: "free",
          plan_status: "active",
          replies_limit: 1,
          replies_used: 0,
        });
      
      if (planRes.error) {
        importErrors.push({
          row_number: row.row_number,
          error: planRes.error.message,
        });
        continue;
      }
      
      inserted += 1;
      continue;

        if (insertRes.error) {
          importErrors.push({
            row_number: row.row_number,
            error: insertRes.error.message,
          });
          continue;
        }

        inserted += 1;
      }
    }

    return json({
      ok: true,
      mode: "import",
      total_rows: parsedRows.length,
      valid_rows: validRows.length,
      invalid_rows: errors.length,
      inserted,
      updated,
      failed: importErrors.length,
      errors: [...errors, ...importErrors],
    });
  } catch (e: any) {
    return json({ ok: false, error: String(e?.message || e) }, 500);
  }
});