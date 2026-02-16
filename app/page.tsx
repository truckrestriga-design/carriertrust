"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Lang = "en" | "de" | "ru";

type TextPack = {
  headline: string;
  sub: string;
  searchPlaceholder: string;
  searchBtn: string;
  writeReview: string;
  howItWorksTitle: string;
  how1Title: string;
  how1Text: string;
  how2Title: string;
  how2Text: string;
  how3Title: string;
  how3Text: string;
  trustTitle: string;
  trust1Title: string;
  trust1Text: string;
  trust2Title: string;
  trust2Text: string;
  trust3Title: string;
  trust3Text: string;
  ctaTitle: string;
  ctaText: string;
  ctaBtn: string;
  footer: string;
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    headline: "Independent ratings and reviews for logistics companies",
    sub: "Search by company name or VAT number. Share your real experience to help others choose safely.",
    searchPlaceholder: "Company name or VAT number…",
    searchBtn: "Search",
    writeReview: "Write a review",
    howItWorksTitle: "How it works",
    how1Title: "Search a company",
    how1Text: "Find a logistics company by name or VAT number.",
    how2Title: "Read real reviews",
    how2Text: "See experiences from real businesses and clients.",
    how3Title: "Share your experience",
    how3Text: "Write an honest review. It takes 2 minutes.",
    trustTitle: "Why people trust CarrierTrust",
    trust1Title: "Transparent",
    trust1Text: "Reviews are tied to real accounts. No hidden scoring.",
    trust2Title: "Simple",
    trust2Text: "Search, read, and write a review in a clean flow.",
    trust3Title: "International",
    trust3Text: "Multilingual UI for EU logistics market.",
    ctaTitle: "Had a delivery experience?",
    ctaText: "Help other businesses avoid risks by leaving a review.",
    ctaBtn: "Write a review",
    footer: "CarrierTrust © " + new Date().getFullYear(),
  },
  de: {
    headline: "Unabhängige Bewertungen für Logistikunternehmen",
    sub: "Suche nach Firmenname oder USt-IdNr. Teile echte Erfahrungen, um anderen zu helfen.",
    searchPlaceholder: "Firmenname oder USt-IdNr…",
    searchBtn: "Suchen",
    writeReview: "Bewertung schreiben",
    howItWorksTitle: "So funktioniert’s",
    how1Title: "Unternehmen suchen",
    how1Text: "Finde ein Logistikunternehmen nach Name oder USt-IdNr.",
    how2Title: "Echte Bewertungen lesen",
    how2Text: "Erfahrungen von echten Unternehmen und Kunden.",
    how3Title: "Erfahrung teilen",
    how3Text: "Schreibe eine ehrliche Bewertung. Dauert 2 Minuten.",
    trustTitle: "Warum CarrierTrust vertrauenswürdig ist",
    trust1Title: "Transparent",
    trust1Text: "Bewertungen sind an echte Accounts gebunden. Keine versteckten Scores.",
    trust2Title: "Einfach",
    trust2Text: "Suchen, lesen, bewerten – klarer Flow.",
    trust3Title: "International",
    trust3Text: "Mehrsprachige UI für den EU-Logistikmarkt.",
    ctaTitle: "Hattest du eine Lieferung?",
    ctaText: "Hilf anderen Unternehmen Risiken zu vermeiden – schreibe eine Bewertung.",
    ctaBtn: "Bewertung schreiben",
    footer: "CarrierTrust © " + new Date().getFullYear(),
  },
  ru: {
    headline: "Независимые отзывы и рейтинги логистических компаний",
    sub: "Ищи по названию компании или VAT номеру. Делись реальным опытом, чтобы другие выбирали безопаснее.",
    searchPlaceholder: "Название компании или VAT номер…",
    searchBtn: "Поиск",
    writeReview: "Оставить отзыв",
    howItWorksTitle: "Как это работает",
    how1Title: "Найди компанию",
    how1Text: "По названию или VAT номеру.",
    how2Title: "Прочитай отзывы",
    how2Text: "Опыт реальных клиентов и бизнеса.",
    how3Title: "Оставь отзыв",
    how3Text: "Честно и быстро — 2 минуты.",
    trustTitle: "Почему доверяют CarrierTrust",
    trust1Title: "Прозрачно",
    trust1Text: "Отзывы привязаны к аккаунтам. Никаких скрытых оценок.",
    trust2Title: "Просто",
    trust2Text: "Поиск → чтение → отзыв — понятный поток.",
    trust3Title: "Международно",
    trust3Text: "Мультиязычность под рынок логистики ЕС.",
    ctaTitle: "Был опыт с перевозчиком?",
    ctaText: "Помоги другим бизнесам избежать рисков — оставь отзыв.",
    ctaBtn: "Оставить отзыв",
    footer: "CarrierTrust © " + new Date().getFullYear(),
  },
};

export default function HomePage() {
  const router = useRouter();

  const initialLang = useMemo<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "de" || saved === "ru") return saved;
    return "en";
  }, []);

  const [lang, setLang] = useState<Lang>(initialLang);
  const [q, setQ] = useState("");

  const t = TEXT[lang];

  function changeLang(next: Lang) {
    setLang(next);
    localStorage.setItem("lang", next);
  }

  function goSearch() {
    const query = q.trim();
    if (!query) return;
    // ВАЖНО: у тебя уже есть страница /companies/[id]
    // Поэтому пока отправляем на поиск через параметр (если у тебя есть другая страница поиска — скажи, поменяем)
    router.push(`/write-review?search=${encodeURIComponent(query)}`);
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="CarrierTrust" className="h-9 w-auto" />
          </a>

          <div className="flex items-center gap-2">
            <select
              value={lang}
              onChange={(e) => changeLang(e.target.value as Lang)}
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm"
            >
              <option value="en">EN</option>
              <option value="de">DE</option>
              <option value="ru">RU</option>
            </select>

            <a
              href="/write-review"
              className="px-4 py-2 rounded-xl bg-black text-white text-sm font-semibold hover:bg-gray-900"
            >
              {t.writeReview}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-10">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {t.headline}
            </h1>
            <p className="mt-4 text-gray-700 text-base md:text-lg">
              {t.sub}
            </p>

            <div className="mt-6 flex gap-2">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && goSearch()}
                placeholder={t.searchPlaceholder}
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900"
              />
              <button
                onClick={goSearch}
                className="px-5 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900"
              >
                {t.searchBtn}
              </button>
            </div>

            <div className="mt-4">
              <a
                href="/write-review"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-gray-300 font-semibold hover:bg-gray-50"
              >
                {t.writeReview}
              </a>
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
            <div className="text-sm font-semibold text-gray-900">CarrierTrust</div>
            <div className="mt-2 text-gray-700 text-sm">
              • Fast search by VAT<br />
              • Reviews from real accounts<br />
              • Multilingual: EN/DE/RU
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white border border-gray-200 p-3">
                <div className="text-xs text-gray-500">Avg rating</div>
                <div className="text-lg font-bold">4.6</div>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-3">
                <div className="text-xs text-gray-500">Companies</div>
                <div className="text-lg font-bold">—</div>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-3">
                <div className="text-xs text-gray-500">Reviews</div>
                <div className="text-lg font-bold">—</div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              (Статистика появится, когда подключим таблицы Supabase.)
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-extrabold">{t.howItWorksTitle}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { title: t.how1Title, text: t.how1Text, n: "1" },
            { title: t.how2Title, text: t.how2Text, n: "2" },
            { title: t.how3Title, text: t.how3Text, n: "3" },
          ].map((x) => (
            <div key={x.n} className="border border-gray-200 rounded-2xl p-6">
              <div className="text-xs font-bold text-gray-500">STEP {x.n}</div>
              <div className="mt-2 text-lg font-bold">{x.title}</div>
              <div className="mt-2 text-gray-700 text-sm">{x.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-6xl px-4 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-extrabold">{t.trustTitle}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { title: t.trust1Title, text: t.trust1Text },
            { title: t.trust2Title, text: t.trust2Text },
            { title: t.trust3Title, text: t.trust3Text },
          ].map((x) => (
            <div key={x.title} className="rounded-2xl bg-gray-50 border border-gray-200 p-6">
              <div className="text-lg font-bold">{x.title}</div>
              <div className="mt-2 text-gray-700 text-sm">{x.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-12 border-t border-gray-200">
        <div className="rounded-2xl border border-gray-200 p-8 bg-black text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-2xl font-extrabold">{t.ctaTitle}</div>
            <div className="mt-2 text-white/80">{t.ctaText}</div>
          </div>
          <a
            href="/write-review"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-100"
          >
            {t.ctaBtn}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-gray-500">
        {t.footer}
      </footer>
    </main>
  );
}
