"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type PricingPlan = {
  period: string;
  price: number;
  label: string;
};

type Placement =
  | "search_left"
  | "search_right"
  | "company_left"
  | "company_right";

  function BannerOrderPageInner() {
  const router = useRouter();
  const params = useSearchParams();

  const sideParam = (params.get("side") || "").toLowerCase();
  const placementParam = (params.get("placement") || "").toLowerCase() as Placement | "";
  const companyId = params.get("company_id") || "";
  const companyNameFromUrl = params.get("company_name") || "";

  const side: "left" | "right" =
    sideParam === "right" ? "right" : "left";

  const placement: Placement =
    placementParam === "search_left" ||
    placementParam === "search_right" ||
    placementParam === "company_left" ||
    placementParam === "company_right"
      ? placementParam
      : side === "right"
      ? "search_right"
      : "search_left";

  const isCompanyPlacement =
    placement === "company_left" || placement === "company_right";

  const pricing: PricingPlan[] = [
    { period: "week", price: 49, label: "1 week" },
    { period: "month", price: 149, label: "1 month" },
    { period: "year", price: 999, label: "1 year" },
  ];

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState(companyNameFromUrl);
  const [invoiceEmail, setInvoiceEmail] = useState("");

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [paymentProofName, setPaymentProofName] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const selectedPlanData = pricing.find((p) => p.period === selectedPlan);

  const companyBankData = useMemo(
    () => ({
      companyName: 'SIA "JAKOVLEV CAPITAL"',
      accountNumber: "LV00HABA0000000000000",
      bic: "HABALV22",
    }),
    []
  );

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const paymentPurpose = companyName.trim()
    ? `Banner - ${companyName.trim()}`
    : "Banner - Company Name";

  const placementLabel = useMemo(() => {
    switch (placement) {
      case "search_left":
        return "Search page • left";
      case "search_right":
        return "Search page • right";
      case "company_left":
        return "Company page • left";
      case "company_right":
        return "Company page • right";
      default:
        return "Search page • left";
    }
  }, [placement]);

  const canSubmit =
    !!selectedPlan &&
    !!bannerFile &&
    !!paymentProofFile &&
    !!companyName.trim() &&
    isValidEmail(invoiceEmail);

  function handleBannerUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setBannerFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handlePaymentProofUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPaymentProofFile(file);
    setPaymentProofName(file.name);
  }

  async function handleSubmitPaid() {
    if (!canSubmit || !selectedPlanData || !bannerFile || !paymentProofFile) {
      return;
    }

    try {
      setSubmitting(true);
      setSuccessMessage("");

      const body = new FormData();
      body.append("side", side);
      body.append("placement", placement);
      body.append("targetCompanyId", companyId);
      body.append("targetCompanyName", companyNameFromUrl || "");
      body.append("period", selectedPlanData.period);
      body.append("periodLabel", selectedPlanData.label);
      body.append("price", String(selectedPlanData.price));
      body.append("companyName", companyName.trim());
      body.append("invoiceEmail", invoiceEmail.trim());
      body.append("paymentPurpose", paymentPurpose);
      body.append("bannerFile", bannerFile, bannerFile.name);
      body.append("paymentProof", paymentProofFile, paymentProofFile.name);

      const response = await fetch("/api/banner-order", {
        method: "POST",
        body,
      });

      const text = await response.text();

      let result: any = null;
      try {
        result = JSON.parse(text);
      } catch {
        result = null;
      }

      if (!response.ok) {
        throw new Error(result?.error || text || "Failed to send banner order");
      }

      setSuccessMessage(
        "Banner request sent. The banner is now under moderation, invoice will be sent by email."
      );

      setTimeout(() => {
        if (isCompanyPlacement && companyId) {
          router.push(`/companies/${companyId}`);
          return;
        }

        router.push("/search");
      }, 2500);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to send banner order");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen text-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.14),transparent)]" />
        <div className="absolute top-[8%] left-[8%] h-[24rem] w-[24rem] rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute bottom-[8%] right-[10%] h-[20rem] w-[20rem] rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,rgba(15,23,42,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.55)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative px-4 pt-36 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <Link
              href={isCompanyPlacement && companyId ? `/companies/${companyId}` : "/search"}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
            >
              ← Back
            </Link>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="grid grid-cols-1 gap-8 p-8 md:p-10 xl:grid-cols-[1fr_220px]">
              <div>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                  <svg
                    className="h-8 w-8 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Order a banner
                </h1>

                <p className="mt-2 text-slate-500">
                  Placement: <span className="font-semibold text-slate-800">{placementLabel}</span>
                </p>

                {isCompanyPlacement && companyNameFromUrl && (
                  <p className="mt-2 text-slate-500">
                    Company page: <span className="font-semibold text-slate-800">{companyNameFromUrl}</span>
                  </p>
                )}

                <div className="mt-8 space-y-3">
                  <p className="text-sm font-semibold text-slate-700">Choose a period:</p>

                  {pricing.map((plan) => (
                    <label
                      key={plan.period}
                      className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition-all ${
                        selectedPlan === plan.period
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-slate-200 hover:border-emerald-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="plan"
                          value={plan.period}
                          checked={selectedPlan === plan.period}
                          onChange={(e) => setSelectedPlan(e.target.value)}
                          className="h-5 w-5 text-emerald-600"
                        />
                        <span className="font-medium text-slate-700">{plan.label}</span>
                      </div>
                      <span className="text-xl font-bold text-slate-900">€{plan.price}</span>
                    </label>
                  ))}
                </div>

                <div className="mt-6 grid gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Company name
                    </label>
                    <input
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition-colors focus:border-emerald-400"
                      placeholder="For example, gaja sia"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Invoice email
                    </label>

                    <input
                      type="email"
                      value={invoiceEmail}
                      onChange={(e) => setInvoiceEmail(e.target.value)}
                      className={`h-12 w-full rounded-xl border px-4 outline-none transition-colors ${
                        invoiceEmail.length === 0
                          ? "border-slate-200 focus:border-emerald-400"
                          : isValidEmail(invoiceEmail)
                          ? "border-emerald-300 focus:border-emerald-500"
                          : "border-red-300 focus:border-red-500"
                      }`}
                      placeholder="invoice@company.com"
                    />

                    {invoiceEmail.length > 0 && !isValidEmail(invoiceEmail) && (
                      <p className="mt-2 text-sm text-red-500">Please enter a valid email</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Upload banner
                    </label>
                    <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center transition-colors hover:border-emerald-300">
                      <p className="text-sm font-medium text-slate-700">Click to choose a file</p>
                      <p className="mt-1 text-xs text-slate-400">Recommended size: 180×600px</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {selectedPlanData && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                      <p className="mb-3 text-sm font-semibold text-emerald-900">
                        Payment details
                      </p>
                      <div className="space-y-2 text-sm text-slate-700">
                        <p>
                          <span className="font-semibold">Company:</span>{" "}
                          {companyBankData.companyName}
                        </p>
                        <p>
                          <span className="font-semibold">Account number:</span>{" "}
                          {companyBankData.accountNumber}
                        </p>
                        <p>
                          <span className="font-semibold">BIC:</span> {companyBankData.bic}
                        </p>
                        <p>
                          <span className="font-semibold">Amount:</span> €{selectedPlanData.price}
                        </p>
                        <p>
                          <span className="font-semibold">Payment purpose:</span> {paymentPurpose}
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Upload payment proof
                    </label>
                    <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center transition-colors hover:border-emerald-300">
                      <p className="text-sm font-medium text-slate-700">Upload payment confirmation</p>
                      <p className="mt-1 text-xs text-slate-400">PDF, PNG, JPG</p>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={handlePaymentProofUpload}
                        className="hidden"
                      />
                    </label>

                    {paymentProofName && (
                      <p className="mt-2 text-sm font-medium text-emerald-600">
                        ✓ {paymentProofName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <button
                    disabled={!canSubmit || submitting}
                    onClick={handleSubmitPaid}
                    className={`flex h-14 w-full items-center justify-center rounded-2xl text-base font-semibold transition-all ${
                      canSubmit && !submitting
                        ? "bg-slate-900 text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] hover:-translate-y-0.5 hover:bg-slate-800"
                        : "cursor-not-allowed bg-slate-100 text-slate-400"
                    }`}
                  >
                    {submitting ? "Sending..." : "I have paid"}
                  </button>

                  {successMessage && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                      {successMessage}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-slate-700">Banner preview</p>

                <div className="h-[600px] w-[180px] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 shadow-sm">
                  {bannerPreview ? (
                    <img
                      src={bannerPreview}
                      alt="Banner preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-4 text-center text-sm leading-6 text-slate-400">
                      Your uploaded banner preview will appear here
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function BannerOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <BannerOrderPageInner />
    </Suspense>
  );
}