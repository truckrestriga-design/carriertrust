"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

type Lang = "en" | "de" | "ru";

export default function Header() {
  const [lang, setLang] = useState<Lang>("en");
  const [loggedIn, setLoggedIn] = useState(false);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "de" || saved === "ru" || saved === "en") {
      setLang(saved);
    }

    supabase.auth.getUser().then(({ data }) => {
      setLoggedIn(!!data.user);
    });
  }, []);

  function changeLang(l: Lang) {
    setLang(l);
    localStorage.setItem("lang", l);
    window.location.reload(); // просто и надёжно
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className="w-full px-6 py-4 flex justify-end">
      <div className="flex items-center gap-3">
        {/* Languages */}
        <button onClick={() => changeLang("en")} className="text-lg">🇬🇧</button>
        <button onClick={() => changeLang("de")} className="text-lg">🇩🇪</button>
        <button onClick={() => changeLang("ru")} className="text-lg">🇷🇺</button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {loggedIn && (
          <button
            onClick={logout}
            className="px-4 py-2 rounded-full border border-gray-300 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
