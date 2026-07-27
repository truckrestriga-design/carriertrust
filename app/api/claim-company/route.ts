import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function upper(value: unknown) {
  return String(value || "").trim().toUpperCase();
}

function bearerToken(req: Request) {
  const authorization = req.headers.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || "";
}

export async function POST(req: Request) {
  try {
    const token = bearerToken(req);

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => null);
    const companyId = String(body?.company_id || "").trim();

    if (!companyId) {
      return NextResponse.json(
        { ok: false, error: "Company is missing." },
        { status: 400 }
      );
    }

    const [profileResult, companyResult, userClaimsResult] = await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select("company_vat")
        .eq("user_id", user.id)
        .maybeSingle(),
      supabaseAdmin
        .from("companies")
        .select("id, name, vat_uid, country")
        .eq("id", companyId)
        .maybeSingle(),
      supabaseAdmin
        .from("company_claims")
        .select("id, company_id, status")
        .eq("claimant_user_id", user.id)
        .in("status", ["pending", "approved"])
        .limit(10),
    ]);

    if (profileResult.error) {
      return NextResponse.json(
        { ok: false, error: profileResult.error.message },
        { status: 500 }
      );
    }

    if (companyResult.error) {
      return NextResponse.json(
        { ok: false, error: companyResult.error.message },
        { status: 500 }
      );
    }

    if (userClaimsResult.error) {
      return NextResponse.json(
        { ok: false, error: userClaimsResult.error.message },
        { status: 500 }
      );
    }

    const company = companyResult.data;

    if (!company?.id) {
      return NextResponse.json(
        { ok: false, error: "Company not found." },
        { status: 404 }
      );
    }

    const accountVat = upper(
      profileResult.data?.company_vat ||
        user.user_metadata?.company_vat
    );
    const companyVat = upper(company.vat_uid);

    if (!accountVat) {
      return NextResponse.json(
        { ok: false, error: "Your account VAT is missing." },
        { status: 400 }
      );
    }

    if (!companyVat) {
      return NextResponse.json(
        { ok: false, error: "Selected company VAT is missing." },
        { status: 400 }
      );
    }

    if (accountVat !== companyVat) {
      return NextResponse.json(
        { ok: false, error: "VAT does not match your account." },
        { status: 403 }
      );
    }

    const userClaims = userClaimsResult.data || [];
    const sameClaim = userClaims.find(
      (claim) => String(claim.company_id) === String(company.id)
    );
    const anotherClaim = userClaims.find(
      (claim) => String(claim.company_id) !== String(company.id)
    );

    if (sameClaim?.status === "approved") {
      return NextResponse.json({
        ok: true,
        already_has_access: true,
        company_id: company.id,
      });
    }

    if (anotherClaim) {
      return NextResponse.json(
        {
          ok: false,
          error: "Your account already has access to another company.",
        },
        { status: 409 }
      );
    }

    const { data: existingOwner, error: ownerError } = await supabaseAdmin
      .from("company_claims")
      .select("id, claimant_user_id")
      .eq("company_id", company.id)
      .eq("status", "approved")
      .limit(1)
      .maybeSingle();

    if (ownerError) {
      return NextResponse.json(
        { ok: false, error: ownerError.message },
        { status: 500 }
      );
    }

    if (
      existingOwner?.id &&
      String(existingOwner.claimant_user_id) !== String(user.id)
    ) {
      return NextResponse.json(
        { ok: false, error: "This company already has an owner." },
        { status: 409 }
      );
    }

    if (sameClaim?.id) {
      const { error: updateError } = await supabaseAdmin
        .from("company_claims")
        .update({
          status: "approved",
          claimant_email: user.email || null,
        })
        .eq("id", sameClaim.id)
        .eq("claimant_user_id", user.id);

      if (updateError) {
        return NextResponse.json(
          { ok: false, error: updateError.message },
          { status: 500 }
        );
      }
    } else {
      const { error: insertError } = await supabaseAdmin
        .from("company_claims")
        .insert({
          company_id: company.id,
          claimant_user_id: user.id,
          claimant_email: user.email || null,
          status: "approved",
        });

      if (insertError) {
        return NextResponse.json(
          { ok: false, error: insertError.message },
          { status: 500 }
        );
      }
    }

    const { data: existingPlan, error: planReadError } = await supabaseAdmin
      .from("company_plans")
      .select("id")
      .eq("company_id", company.id)
      .limit(1)
      .maybeSingle();

    if (planReadError) {
      return NextResponse.json(
        { ok: false, error: planReadError.message },
        { status: 500 }
      );
    }

    if (!existingPlan?.id) {
      const { error: planInsertError } = await supabaseAdmin
        .from("company_plans")
        .insert({
          company_id: company.id,
          plan: "free",
          replies_limit: 1,
          replies_used: 0,
          plan_status: "active",
        });

      if (planInsertError) {
        return NextResponse.json(
          { ok: false, error: planInsertError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      ok: true,
      company_id: company.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: String(error?.message || error || "Internal server error"),
      },
      { status: 500 }
    );
  }
}
