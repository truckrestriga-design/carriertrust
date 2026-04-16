"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Company = {
  id: string;
  name: string | null;
  vat_uid: string | null;
  country: string | null;
};

function ClaimCompanyPageInner() {
  const sp = useSearchParams();
  const router = useRouter();

  const companyIdFromQuery = sp.get("company_id") || "";

  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<Company | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userVat, setUserVat] = useState<string>("");
  const [msg, setMsg] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setMsg(null);

      if (!companyIdFromQuery) {
        setMsg("Company is missing.");
        setLoading(false);
        return;
      }

      const { data: u } = await supabase.auth.getUser();
      if (!u?.user) {
        router.push(`/auth?next=${encodeURIComponent(`/claim-company?company_id=${companyIdFromQuery}`)}`);
        return;
      }

      setUserEmail(u.user.email || "");

      const { data: profile, error: profErr } = await supabase
        .from("profiles")
        .select("company_vat")
        .eq("user_id", u.user.id)
        .maybeSingle();

      if (profErr) {
        setMsg(profErr.message);
        setLoading(false);
        return;
      }

      setUserVat(String(profile?.company_vat || "").toUpperCase());

      const { data, error } = await supabase
        .from("companies")
        .select("id, name, vat_uid, country")
        .eq("id", companyIdFromQuery)
        .maybeSingle();

      if (error) {
        setMsg(error.message);
        setCompany(null);
      } else {
        setCompany((data || null) as any);
      }

      setLoading(false);
    })();
  }, [companyIdFromQuery, router]);

  async function submitClaim() {
    setMsg(null);

    const { data: u } = await supabase.auth.getUser();
    const user = u?.user;

    if (!user) {
      router.push(`/auth?next=${encodeURIComponent(`/claim-company?company_id=${companyIdFromQuery}`)}`);
      return;
    }

    if (!company?.id) {
      setMsg("Company not found.");
      return;
    }

    const accountVat = String(userVat || "").trim().toUpperCase();
    const companyVat = String(company.vat_uid || "").trim().toUpperCase();

    if (!accountVat) {
      setMsg("Your account VAT is missing.");
      return;
    }

    if (!companyVat) {
      setMsg("Selected company VAT is missing.");
      return;
    }

    if (accountVat !== companyVat) {
      setMsg("VAT does not match your account.");
      return;
    }

    setSending(true);

    try {
      // 1. User already has any claim?
      const { data: existingUserClaims, error: userClaimErr } = await supabase
        .from("company_claims")
        .select("id, company_id, status")
        .eq("claimant_user_id", user.id)
        .limit(10);

      if (userClaimErr) {
        setMsg(userClaimErr.message);
        return;
      }

      const sameCompanyClaim = (existingUserClaims || []).find(
        (x: any) => String(x.company_id) === String(company.id)
      );

      const anotherCompanyClaim = (existingUserClaims || []).find(
        (x: any) => String(x.company_id) !== String(company.id)
      );

      if (sameCompanyClaim?.status === "approved") {
        setMsg("Your account already has access to this company.");
        setTimeout(() => {
          router.push("/company/profile");
        }, 600);
        return;
      }

      if (anotherCompanyClaim) {
        setMsg("Your account already has access to another company.");
        return;
      }

      // 2. Company already has approved owner?
      const { data: existingApprovedOwner, error: ownerErr } = await supabase
        .from("company_claims")
        .select("id, claimant_user_id")
        .eq("company_id", company.id)
        .eq("status", "approved")
        .limit(1);

      if (ownerErr) {
        setMsg(ownerErr.message);
        return;
      }

      if (existingApprovedOwner && existingApprovedOwner.length > 0) {
        const ownerUserId = String((existingApprovedOwner[0] as any).claimant_user_id || "");
        if (ownerUserId !== user.id) {
          setMsg("This company already has an owner.");
          return;
        }
      }

      // 3. If same company has pending claim for same user -> upgrade to approved
      if (sameCompanyClaim?.id) {
        const { error: updErr } = await supabase
          .from("company_claims")
          .update({
            status: "approved",
            claimant_email: user.email || null,
          })
          .eq("id", sameCompanyClaim.id);

        if (updErr) {
          setMsg(updErr.message);
          return;
        }

        setMsg("✅ Company linked successfully.");
        setTimeout(() => {
          router.push("/company/profile");
        }, 700);
        return;
      }

      // 4. Fresh approved link
      const { error } = await supabase.from("company_claims").insert({
        company_id: company.id,
        claimant_user_id: user.id,
        claimant_email: user.email || null,
        status: "approved",
      });

      if (error) {
        setMsg(error.message);
        return;
      }

      setMsg("✅ Company linked successfully.");
      setTimeout(() => {
        router.push("/company/profile");
      }, 700);
    } finally {
      setSending(false);
    }
  }

  const card =
    "rounded-3xl border border-black/10 bg-white/70 backdrop-blur shadow-sm";
  const input =
    "w-full rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3 outline-none";
  const btn =
    "rounded-2xl px-4 py-3 bg-black text-white font-semibold hover:bg-black/90 disabled:opacity-60 transition shadow-sm";

  if (loading) {
    return (
      <main className="min-h-screen text-black">
        <div className="relative px-6">
          <div className="max-w-3xl mx-auto pt-28 pb-16">
            <div className="text-black/60">Loading…</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-black">
      <div className="relative px-6">
        <div className="max-w-3xl mx-auto pt-28 pb-16">
          <Link href="/" className="text-sm text-black/55 hover:text-black transition">
            ← Back to home
          </Link>

          <div className={`mt-6 p-6 ${card}`}>
            <h1 className="text-2xl font-extrabold tracking-tight">Link your company</h1>
            <p className="mt-2 text-sm text-black/65">
              Access is granted automatically when VAT matches your account.
            </p>

            <div className="mt-6 space-y-4">
              <div className="text-sm text-black/60">
                Signed in as: <span className="font-semibold text-black">{userEmail || "—"}</span>
              </div>

              <div className="text-sm text-black/60">
                Your VAT: <span className="font-semibold text-black">{userVat || "—"}</span>
              </div>

              {company ? (
                <div className="rounded-2xl border border-black/10 bg-white/60 p-4">
                  <div className="text-sm font-semibold text-black">
                    {company.name || "Company"}
                  </div>

                  <div className="mt-2 text-sm text-black/65">
                    VAT: <span className="font-semibold text-black">{company.vat_uid || "—"}</span>
                    {company.country ? <span className="ml-3">Country: {company.country}</span> : null}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-black/10 bg-white/60 p-4 text-sm text-black/70">
                  Company not found.
                </div>
              )}

              {msg ? (
                <div className="rounded-2xl border border-black/10 bg-white/60 p-3 text-sm text-black/80">
                  {msg}
                </div>
              ) : null}

              <button
                onClick={submitClaim}
                disabled={sending || !company}
                className={`w-full ${btn}`}
              >
                {sending ? "Linking…" : "Link company"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ClaimCompanyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <ClaimCompanyPageInner />
    </Suspense>
  );
}