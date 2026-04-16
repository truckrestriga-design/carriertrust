"use client";

import Link from "next/link";
import { useLang } from "@/lib/language-context";

export default function SiteFooter() {
  const { t } = useLang();

  return (
    <footer className="relative mt-0 border-t border-slate-200/80 bg-white/70 backdrop-blur-xl">
  <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-200/70">
                <span className="text-base font-extrabold text-white">CT</span>
              </div>

              <div>
                <div className="text-2xl font-extrabold tracking-tight text-slate-800">
                  CarrierTrust
                </div>
                <div className="text-sm text-slate-500">
                  {t("footerTagline")}
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-500">
              {t("footerDescription")}
            </p>
          </div>

          <div>
            <div className="text-sm font-extrabold uppercase tracking-[0.14em] text-slate-400">
              {t("footerPlatform")}
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/risk-index"
                className="text-sm text-slate-600 transition hover:text-emerald-600"
              >
                {t("riskIndex")}
              </Link>
              <Link
                href="/write-review"
                className="text-sm text-slate-600 transition hover:text-emerald-600"
              >
                {t("writeReview")}
              </Link>
              <Link
                href="/company/profile"
                className="text-sm text-slate-600 transition hover:text-emerald-600"
              >
                {t("companyProfile")}
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-slate-600 transition hover:text-emerald-600"
              >
                {t("plansAccess")}
              </Link>
              <Link
                href="/verification"
                className="text-sm text-slate-600 transition hover:text-emerald-600"
              >
                {t("verification")}
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-extrabold uppercase tracking-[0.14em] text-slate-400">
              {t("footerLegal")}
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/privacy"
                className="text-sm text-slate-600 transition hover:text-emerald-600"
              >
                {t("privacy")}
              </Link>
              <Link
                href="/terms"
                className="text-sm text-slate-600 transition hover:text-emerald-600"
              >
                {t("terms")}
              </Link>
              <Link
                href="/review-policy"
                className="text-sm text-slate-600 transition hover:text-emerald-600"
              >
                {t("reviewPolicy")}
              </Link>
              <Link
                href="/legal"
                className="text-sm text-slate-600 transition hover:text-emerald-600"
              >
                {t("legal")}
              </Link>
              <Link
                href="/contact"
                className="text-sm text-slate-600 transition hover:text-emerald-600"
              >
                {t("contact")}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>{t("footerRights")}</div>
          <div>{t("footerBottomText")}</div>
        </div>
      </div>
    </footer>
  );
}