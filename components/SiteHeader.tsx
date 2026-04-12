"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { type Lang } from "@/lib/i18n";
import { useLang } from "@/lib/language-context";

export default function SiteHeader() {
  const { lang, setLang, t } = useLang();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastY = useRef(0);
  const desktopLangRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);
  const mobileMenuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setIsLoggedIn(!!session?.user);
    });

    lastY.current = window.scrollY || 0;

    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 8);

      const goingDown = y > lastY.current;
      if (goingDown && y > 90) {
        setHidden(true);
        setLangOpen(false);
        setMobileMenuOpen(false);
      }
      if (!goingDown) setHidden(false);

      lastY.current = y;
    };

    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      const clickedDesktopLang =
        desktopLangRef.current && desktopLangRef.current.contains(target);
      const clickedMobileLang =
        mobileLangRef.current && mobileLangRef.current.contains(target);
      const clickedMobileMenu =
        mobileMenuPanelRef.current && mobileMenuPanelRef.current.contains(target);

      if (!clickedDesktopLang && !clickedMobileLang) {
        setLangOpen(false);
      }

      if (!clickedMobileMenu) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onClickOutside);
      sub?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    closeOnDesktop();
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  async function writeReview() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      window.location.href = "/auth?next=/write-review";
      return;
    }

    window.location.href = "/write-review";
  }

  async function loginLogout() {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      await supabase.auth.signOut();
      window.location.href = "/";
      return;
    }

    window.location.href = "/auth";
  }

  const panelClass = scrolled
    ? "border-white/70 bg-white/78 shadow-[0_20px_60px_rgba(15,23,42,0.10)]"
    : "border-white/60 bg-white/68 shadow-[0_16px_40px_rgba(15,23,42,0.06)]";

  const navLink =
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-2xl border border-transparent px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-slate-200/80 hover:bg-white/85 hover:text-slate-900 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]";

  const subtleBtn =
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-2xl border border-slate-200/80 bg-white/72 px-4 py-2.5 text-sm font-medium text-slate-700 backdrop-blur-xl transition-all duration-200 hover:-translate-y-[1px] hover:bg-white hover:text-slate-900 hover:shadow-[0_10px_24px_rgba(15,23,42,0.07)]";

  const primaryBtnBase =
    "shrink-0 items-center justify-center whitespace-nowrap rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.20)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-slate-800 hover:shadow-[0_16px_34px_rgba(15,23,42,0.24)]";

  const currentLangLabel = lang.toUpperCase();

  const mobileNavItem =
    "flex min-h-[50px] items-center justify-between rounded-2xl border border-slate-200/80 bg-white/82 px-4 py-3 text-sm font-medium text-slate-800 backdrop-blur-xl transition-all duration-200 active:scale-[0.99]";

  const mobileActionBtn =
    "inline-flex min-h-[50px] w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200";

  const languageOptions = [
    ["en", "English"],
    ["de", "Deutsch"],
    ["ru", "Русский"],
    ["fr", "Français"],
    ["es", "Español"],
    ["it", "Italiano"],
  ] as [Lang, string][];

  return (
    <div
      className={[
        "fixed left-0 right-0 top-0 z-50",
        "transition-transform duration-300 ease-out",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4">
        <div
          className={[
            "relative rounded-[1.9rem] border px-4 py-3 sm:px-6",
            "backdrop-blur-2xl transition-all duration-300",
            panelClass,
          ].join(" ")}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.08))]" />

          <div className="relative flex items-center justify-between gap-3 sm:gap-4">
            <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 font-bold text-white shadow-[0_12px_26px_rgba(16,185,129,0.28)] transition-transform duration-200 group-hover:scale-[1.03]">
                <div className="absolute inset-0 rounded-2xl bg-white/10" />
                <span className="relative">CT</span>
              </div>

              <div className="min-w-0">
                <div className="truncate text-lg font-bold tracking-tight text-slate-900">
                  CarrierTrust
                </div>
                <div className="hidden text-xs text-slate-500 sm:block">
                  EU logistics reputation network
                </div>
              </div>
            </Link>

            <div className="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex">
              <Link href="/" className={navLink}>
                {t("home")}
              </Link>

              <Link href="/risk-index" className={navLink}>
                {t("riskIndex")}
              </Link>

              <Link href="/company/profile" className={navLink}>
                {t("companyProfile")}
              </Link>

              <Link href="/verified-profile" className={navLink}>
                {t("forCompanies")}
              </Link>
            </div>

            <div className="hidden shrink-0 items-center gap-2 sm:flex sm:gap-3">
              <button onClick={writeReview} className={`hidden lg:inline-flex ${primaryBtnBase}`}>
                {t("writeReview")}
              </button>

              <button onClick={loginLogout} className={subtleBtn}>
                {isLoggedIn ? t("logout") : t("login")}
              </button>

              <div ref={desktopLangRef} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setLangOpen((v) => !v)}
                  className="inline-flex min-w-[84px] items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white/72 px-4 py-2.5 text-sm font-semibold text-slate-800 backdrop-blur-xl transition-all duration-200 hover:-translate-y-[1px] hover:bg-white hover:shadow-[0_10px_24px_rgba(15,23,42,0.07)]"
                >
                  <span>{currentLangLabel}</span>
                  <svg
                    className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                      langOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`absolute right-0 top-[calc(100%+12px)] w-[250px] overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-white/92 shadow-[0_24px_60px_rgba(15,23,42,0.14)] backdrop-blur-2xl transition-all duration-200 ${
                    langOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="border-b border-slate-100 px-4 py-3">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Language
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 p-2">
                    {languageOptions.map(([code, label]) => {
                      const active = lang === code;

                      return (
                        <button
                          key={code}
                          type="button"
                          onClick={() => {
                            setLang(code);
                            setLangOpen(false);
                          }}
                          className={`flex items-center justify-between rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                            active
                              ? "bg-slate-900 text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)]"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span className="text-sm font-semibold">{code.toUpperCase()}</span>
                          <span className={`text-xs ${active ? "text-white/80" : "text-slate-400"}`}>
                            {label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:hidden">
              <div ref={mobileLangRef} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setLangOpen((v) => !v);
                    setMobileMenuOpen(false);
                  }}
                  className="inline-flex h-11 min-w-[72px] items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white/78 px-3 text-sm font-semibold text-slate-800 backdrop-blur-xl transition-all duration-200"
                >
                  <span>{currentLangLabel}</span>
                  <svg
                    className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                      langOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`absolute right-0 top-[calc(100%+10px)] z-30 w-[220px] overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.14)] backdrop-blur-2xl transition-all duration-200 ${
                    langOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="border-b border-slate-100 px-4 py-3">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Language
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 p-2">
                    {languageOptions.map(([code, label]) => {
                      const active = lang === code;

                      return (
                        <button
                          key={code}
                          type="button"
                          onClick={() => {
                            setLang(code);
                            setLangOpen(false);
                          }}
                          className={`flex items-center justify-between rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                            active
                              ? "bg-slate-900 text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)]"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span className="text-sm font-semibold">{code.toUpperCase()}</span>
                          <span className={`text-xs ${active ? "text-white/80" : "text-slate-400"}`}>
                            {label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen((v) => !v);
                  setLangOpen(false);
                }}
                aria-label="Toggle mobile menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/78 text-slate-800 backdrop-blur-xl transition-all duration-200"
              >
                <div className="relative h-4 w-4">
                  <span
                    className={`absolute left-0 top-0 h-[2px] w-4 rounded-full bg-current transition-all duration-200 ${
                      mobileMenuOpen ? "top-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[7px] h-[2px] w-4 rounded-full bg-current transition-all duration-200 ${
                      mobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[14px] h-[2px] w-4 rounded-full bg-current transition-all duration-200 ${
                      mobileMenuOpen ? "top-[7px] -rotate-45" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          <div
            ref={mobileMenuPanelRef}
            className={`relative overflow-hidden transition-all duration-300 ease-out sm:hidden ${
              mobileMenuOpen ? "mt-3 max-h-[420px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-2 border-t border-white/50 pt-3">
              <Link
                href="/"
                className={mobileNavItem}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{t("home")}</span>
                <span className="text-slate-300">→</span>
              </Link>

              <Link
                href="/risk-index"
                className={mobileNavItem}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{t("riskIndex")}</span>
                <span className="text-slate-300">→</span>
              </Link>

              <Link
                href="/company/profile"
                className={mobileNavItem}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{t("companyProfile")}</span>
                <span className="text-slate-300">→</span>
              </Link>

              <Link
                href="/verified-profile"
                className={mobileNavItem}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{t("forCompanies")}</span>
                <span className="text-slate-300">→</span>
              </Link>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    loginLogout();
                  }}
                  className={`${mobileActionBtn} border border-slate-200/80 bg-white/82 text-slate-800`}
                >
                  {isLoggedIn ? t("logout") : t("login")}
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    writeReview();
                  }}
                  className={`${mobileActionBtn} bg-slate-900 text-white shadow-[0_12px_30px_rgba(15,23,42,0.20)]`}
                >
                  {t("writeReview")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}