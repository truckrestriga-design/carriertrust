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

function clean(v: unknown) {
  return String(v || "").trim();
}

function upper(v: unknown) {
  return String(v || "").trim().toUpperCase();
}

function detectCountryFromVat(vat: string) {
  const v = upper(vat);

  if (v.startsWith("EE")) return "Estonia";
  if (v.startsWith("LV")) return "Latvia";
  if (v.startsWith("LT")) return "Lithuania";
  if (v.startsWith("PL")) return "Poland";
  if (v.startsWith("DE")) return "Germany";
  if (v.startsWith("FR")) return "France";
  if (v.startsWith("ES")) return "Spain";
  if (v.startsWith("IT")) return "Italy";
  if (v.startsWith("NL")) return "Netherlands";
  if (v.startsWith("BE")) return "Belgium";
  if (v.startsWith("LU")) return "Luxembourg";
  if (v.startsWith("CZ")) return "Czech Republic";
  if (v.startsWith("SK")) return "Slovakia";
  if (v.startsWith("HU")) return "Hungary";
  if (v.startsWith("RO")) return "Romania";
  if (v.startsWith("BG")) return "Bulgaria";
  if (v.startsWith("HR")) return "Croatia";
  if (v.startsWith("SI")) return "Slovenia";
  if (v.startsWith("AT")) return "Austria";
  if (v.startsWith("DK")) return "Denmark";
  if (v.startsWith("SE")) return "Sweden";
  if (v.startsWith("FI")) return "Finland";
  if (v.startsWith("IE")) return "Ireland";
  if (v.startsWith("PT")) return "Portugal";
  if (v.startsWith("GR")) return "Greece";
  if (v.startsWith("CY")) return "Cyprus";
  if (v.startsWith("MT")) return "Malta";
  if (v.startsWith("AL")) return "Albania";

  return "";
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

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
      return json({ ok: false, error: "Supabase env missing" }, 500);
    }

    const authHeader = req.headers.get("authorization") || "";
    const user = await requireUser(SUPABASE_URL, SUPABASE_ANON_KEY, authHeader);

    if (!user) {
      return json({ ok: false, error: "Unauthorized" }, 401);
    }

    const service = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const meta = (user.user_metadata || {}) as Record<string, unknown>;

    const metaCompanyName = upper(meta.company_name);
    const metaCompanyVat = upper(meta.company_vat);
    const metaCompanyCountry = clean(meta.company_country);
    const selectedCompanyId = clean(meta.selected_company_id);
    const userEmail = clean(user.email);

    const { data: profile, error: profileErr } = await service
      .from("profiles")
      .select("user_id, company_name, company_vat")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileErr) {
      return json({ ok: false, error: profileErr.message }, 500);
    }

    const profileCompanyName = upper(profile?.company_name);
    const profileCompanyVat = upper(profile?.company_vat);

    const requestedCompanyName = metaCompanyName || profileCompanyName;
    const requestedCompanyVat = metaCompanyVat || profileCompanyVat;
    const requestedCompanyCountry =
      metaCompanyCountry || detectCountryFromVat(requestedCompanyVat);

    if (!requestedCompanyName || !requestedCompanyVat) {
      return json({
        ok: true,
        skipped: true,
        reason: "No company data on account",
      });
    }

    if (!requestedCompanyCountry) {
      return json({
        ok: false,
        error: "Company country is required.",
      }, 400);
    }

    const { data: existingApprovedClaim, error: existingApprovedErr } = await service
      .from("company_claims")
      .select("id, company_id, status")
      .eq("claimant_user_id", user.id)
      .eq("status", "approved")
      .limit(1)
      .maybeSingle();

    if (existingApprovedErr) {
      return json({ ok: false, error: existingApprovedErr.message }, 500);
    }

    if (existingApprovedClaim?.company_id) {
      return json({
        ok: true,
        skipped: true,
        company_id: existingApprovedClaim.company_id,
        reason: "User already has approved company access",
      });
    }

    const { data: otherClaim, error: otherClaimErr } = await service
      .from("company_claims")
      .select("id, company_id, status")
      .eq("claimant_user_id", user.id)
      .in("status", ["pending", "approved"])
      .limit(1)
      .maybeSingle();

    if (otherClaimErr) {
      return json({ ok: false, error: otherClaimErr.message }, 500);
    }

    let finalCompanyId = "";
    let finalCompanyName = requestedCompanyName;
    let finalCompanyVat = requestedCompanyVat;
    let finalCompanyCountry = requestedCompanyCountry;
    let createdNewCompany = false;

    if (selectedCompanyId) {
      const { data: selectedCompany, error: selectedErr } = await service
        .from("companies")
        .select("id, name, vat_uid, country")
        .eq("id", selectedCompanyId)
        .maybeSingle();

      if (selectedErr) {
        return json({ ok: false, error: selectedErr.message }, 500);
      }

      if (!selectedCompany?.id) {
        return json({ ok: false, error: "Selected company not found" }, 404);
      }

      finalCompanyId = selectedCompany.id;
      finalCompanyName = upper(selectedCompany.name) || requestedCompanyName;
      finalCompanyVat = upper(selectedCompany.vat_uid) || requestedCompanyVat;
      finalCompanyCountry = clean(selectedCompany.country) || requestedCompanyCountry;
    } else {
      const { data: existingByVat, error: existingVatErr } = await service
        .from("companies")
        .select("id, name, vat_uid, country")
        .eq("vat_uid", requestedCompanyVat)
        .maybeSingle();

      if (existingVatErr) {
        return json({ ok: false, error: existingVatErr.message }, 500);
      }

      if (existingByVat?.id) {
        finalCompanyId = existingByVat.id;
        finalCompanyName = upper(existingByVat.name) || requestedCompanyName;
        finalCompanyVat = upper(existingByVat.vat_uid) || requestedCompanyVat;
        finalCompanyCountry = clean(existingByVat.country) || requestedCompanyCountry;
      } else {
        const { data: insertedCompany, error: insertCompanyErr } = await service
          .from("companies")
          .insert({
            name: requestedCompanyName,
            vat_uid: requestedCompanyVat,
            country: requestedCompanyCountry,
          })
          .select("id, name, vat_uid, country")
          .single();

        if (insertCompanyErr) {
          return json({ ok: false, error: insertCompanyErr.message }, 500);
        }

        finalCompanyId = insertedCompany.id;
        finalCompanyName = upper(insertedCompany.name) || requestedCompanyName;
        finalCompanyVat = upper(insertedCompany.vat_uid) || requestedCompanyVat;
        finalCompanyCountry = clean(insertedCompany.country) || requestedCompanyCountry;
        createdNewCompany = true;
      }
    }

    if (!finalCompanyId) {
      return json({ ok: false, error: "Could not resolve company" }, 500);
    }

    if (otherClaim?.company_id && String(otherClaim.company_id) !== String(finalCompanyId)) {
      return json({
        ok: false,
        error: "Your account already has another company claim.",
      }, 409);
    }

    const { data: existingOwner, error: ownerErr } = await service
      .from("company_claims")
      .select("id, claimant_user_id")
      .eq("company_id", finalCompanyId)
      .eq("status", "approved")
      .limit(1)
      .maybeSingle();

    if (ownerErr) {
      return json({ ok: false, error: ownerErr.message }, 500);
    }

    if (existingOwner?.id && String(existingOwner.claimant_user_id) !== String(user.id)) {
      return json({
        ok: false,
        error: "This company already has an owner.",
      }, 409);
    }

    const { error: profileUpsertErr } = await service
      .from("profiles")
      .upsert({
        user_id: user.id,
        company_name: finalCompanyName,
        company_vat: finalCompanyVat,
      });

    if (profileUpsertErr) {
      return json({ ok: false, error: profileUpsertErr.message }, 500);
    }

    const { data: existingPlan, error: planSelErr } = await service
      .from("company_plans")
      .select("id, company_id")
      .eq("company_id", finalCompanyId)
      .maybeSingle();

    if (planSelErr) {
      return json({ ok: false, error: planSelErr.message }, 500);
    }

    if (!existingPlan?.id) {
      const { error: planInsertErr } = await service
        .from("company_plans")
        .insert({
          company_id: finalCompanyId,
          plan: "free",
          replies_limit: 1,
          replies_used: 0,
          plan_status: "active",
        });

      if (planInsertErr) {
        return json({ ok: false, error: planInsertErr.message }, 500);
      }
    }

    const { data: sameClaim, error: sameClaimErr } = await service
      .from("company_claims")
      .select("id, status")
      .eq("claimant_user_id", user.id)
      .eq("company_id", finalCompanyId)
      .limit(1)
      .maybeSingle();

    if (sameClaimErr) {
      return json({ ok: false, error: sameClaimErr.message }, 500);
    }

    if (sameClaim?.id) {
      const { error: updClaimErr } = await service
        .from("company_claims")
        .update({
          status: "approved",
          claimant_email: userEmail || null,
        })
        .eq("id", sameClaim.id);

      if (updClaimErr) {
        return json({ ok: false, error: updClaimErr.message }, 500);
      }
    } else {
      const { error: insertClaimErr } = await service
        .from("company_claims")
        .insert({
          company_id: finalCompanyId,
          claimant_user_id: user.id,
          claimant_email: userEmail || null,
          status: "approved",
        });

      if (insertClaimErr) {
        return json({ ok: false, error: insertClaimErr.message }, 500);
      }
    }

    return json({
      ok: true,
      company_id: finalCompanyId,
      company_name: finalCompanyName,
      company_vat: finalCompanyVat,
      company_country: finalCompanyCountry,
      created_new_company: createdNewCompany,
      linked: true,
    });
  } catch (e: any) {
    return json({ ok: false, error: String(e?.message || e) }, 500);
  }
});