"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

type Lang = "en" | "de" | "ru";

export default function SiteHeader() {
  const [lang, setLang] = useState<Lang>("en");
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "de" || saved === "ru") setLang(saved);

    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
    });
  }, []);

  function changeLang(next: Lang) {
    localStorage.setItem("lang", next);
    setLang(next);
    setOpen(false);
    location.reload();
  }

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

  const outlineBtn =
    "px-4 py-2 rounded-full border border-black/40 bg-white/60 text-black text-sm font-medium hover:bg-white/80 transition shadow-sm";

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-end gap-3 p-6">
        {/* WRITE REVIEW */}
        <button
          onClick={writeReview}
          className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-900 transition shadow"
        >
          Write review
        </button>

        {/* LOGIN */}
        <button onClick={loginLogout} className={outlineBtn}>
          {isLoggedIn ? "Logout" : "Login"}
        </button>

        {/* LANGUAGE */}
        <div className="relative">
          <button onClick={() => setOpen(!open)} className={outlineBtn}>
            {lang === "en" && "🇬🇧 EN"}
            {lang === "de" && "🇩🇪 DE"}
            {lang === "ru" && "🇷🇺 RU"}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-black/20 bg-white shadow-lg overflow-hidden">
              <button
                onClick={() => changeLang("en")}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-sm text-black"
              >
                🇬🇧 English
              </button>

              <button
                onClick={() => changeLang("de")}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-sm text-black"
              >
                🇩🇪 Deutsch
              </button>

              <button
                onClick={() => changeLang("ru")}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-sm text-black"
              >
                🇷🇺 Русский
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
