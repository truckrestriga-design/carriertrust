import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");

  if (!token_hash || !type) {
    return NextResponse.redirect(
      new URL("/auth?error=link_invalid", url.origin)
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase.auth.verifyOtp({
    token_hash,
    type: type as any,
  });

  if (error || !data?.user) {
    return NextResponse.redirect(
      new URL("/auth?error=link_invalid", url.origin)
    );
  }

  const user = data.user;
  const email = user.email || "";
  const companyName = String(user.user_metadata?.company_name || "");
  const companyVat = String(user.user_metadata?.company_vat || "");
  const companyCountry = String(user.user_metadata?.company_country || "");

  try {
    const res = await fetch(`${url.origin}/api/admin-signup-alert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-alert-secret": process.env.ADMIN_ALERT_SECRET || "",
      },
      body: JSON.stringify({
        email,
        company_name: companyName,
        company_vat: companyVat,
        company_country: companyCountry,
      }),
      cache: "no-store",
    });

    const text = await res.text();
    console.log("ADMIN ALERT STATUS:", res.status);
    console.log("ADMIN ALERT RESPONSE:", text);
  } catch (e) {
    console.error("Admin signup alert failed:", e);
  }

  return NextResponse.redirect(
    new URL("/auth?confirmed=1", url.origin)
  );
}