"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Lang = "en" | "de" | "ru";

type TextPack = {
  headline: string;
  placeholder: string;
  search: string;
  notFound: string;
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    headline:
      "Independent ratings and reviews of logistics companies based on real business experience.",
    placeholder: "Company name or VAT number...",
    search: "Search",
    notFound: "No company found. Try a different name or VAT number.",
  },
  de: {
    headline:
      "Unabhängige Bewertungen und Rezensionen von Logistikunternehmen basierend auf realer Geschäftserfahrung.",
    placeholder: "Firmenname oder USt-IdNr...",
    search: "Suchen",
    notFound: "Keine Firma gefunden. Bitte anderen Namen oder USt-IdNr versuchen.",
  },
  ru: {
    headline:
      "Независимые рейтинги и отзывы о логистических компаниях на основе реального опыта.",
    placeholder: "Название компании или VAT номер...",
    search: "Поиск",
    notFound: "Компания не найдена. Попробуйте другое название или VAT номер.",
  },
};

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = useMemo(() => TEXT[lang], [lang]);

  const [q, setQ] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  // Load lang (header меняет localStorage lang)
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "de" || saved === "ru") {
      setLang(saved);
    }
  }, []);

  async function search() {
    setMsg(null);

    const query = q.trim();
    if (!query) return;

    setSearching(true);

    const vatCandidate = query.toUpperCase();

    // 1) Try VAT exact match
    const { data: byVat, error: vatErr } = await supabase
      .from("companies")
      .select("id")
      .eq("vat_uid", vatCandidate)
      .limit(1);

    if (vatErr) {
      setSearching(false);
      setMsg(vatErr.message);
      return;
    }

    if (byVat && byVat.length > 0) {
      window.location.href = `/companies/${byVat[0].id}`;
      return;
    }

    // 2) Try name search (case-insensitive)
    const { data: byName, error: nameErr } = await supabase
      .from("companies")
      .select("id")
      .ilike("name", `%${query}%`)
      .limit(1);

    setSearching(false);

    if (nameErr) {
      setMsg(nameErr.message);
      return;
    }

    if (byName && byName.length > 0) {
      window.location.href = `/companies/${byName[0].id}`;
      return;
    }

    setMsg(t.notFound);
  }

  return (
    <main className="min-h-screen bg-white">
      {/* CENTER CONTENT */}
      <div className="mx-auto max-w-5xl px-4 pt-24 pb-20 flex flex-col items-center text-center">
        <img src="/logo.png" alt="CarrierTrust" className="w-64" />

        <p className="mt-10 text-base sm:text-lg font-medium text-gray-700 whitespace-nowrap">
          {t.headline}
        </p>

        {/* Search box */}
        <div className="mt-8 w-full max-w-2xl flex gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔎
            </span>

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") search();
              }}
              placeholder={t.placeholder}
              className="w-full border border-gray-300 rounded-full pl-11 pr-4 py-3 outline-none focus:border-gray-900 text-black placeholder:text-gray-500"
            />
          </div>

          <button
            onClick={search}
            disabled={searching}
            className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-900 disabled:opacity-60"
          >
            {searching ? "..." : t.search}
          </button>
        </div>

        {msg && (
          <div className="mt-4 text-sm text-red-800 border border-red-200 bg-red-50 rounded-xl p-3">
            {msg}
          </div>
        )}
      </div>
    </main>
  );
}
