"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

type Lang = "en" | "de" | "ru";

const TEXT: Record<Lang, any> = {
  en: {
    topWrite: "Write review",
    login: "Login",
    logout: "Logout",
    back: "Back to search",
    reviews: "Reviews",
    noReviews: "No published reviews yet.",
    avg: "Average",
    loading: "Loading...",
  },
  de: {
    topWrite: "Bewertung schreiben",
    login: "Login",
    logout: "Logout",
    back: "Zurück zur Suche",
    reviews: "Bewertungen",
    noReviews: "Noch keine veröffentlichten Bewertungen.",
    avg: "Durchschnitt",
    loading: "Laden...",
  },
  ru: {
    topWrite: "Оставить отзыв",
    login: "Войти",
    logout: "Выйти",
    back: "← Назад к поиску",
    reviews: "Отзывы",
    noReviews: "Пока нет опубликованных отзывов.",
    avg: "Средняя оценка",
    loading: "Загрузка...",
  },
};

type ReviewRow = {
  id: string;
  rating: number;
  issue_type: string;
  review_text: string;
  created_at: string;
};

export default function CompanyPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const supabase = getSupabaseBrowserClient();

  const [lang, setLang] = useState<Lang>("ru");
  const t = useMemo(() => TEXT[lang], [lang]);

  const [company, setCompany] = useState<any>(null);
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "de" || saved === "ru") setLang(saved);
  }, []);

  useEffect(() => {
    if (!id) return;

    (async () => {
      setLoading(true);
      setErr(null);

      // company
      const { data: c, error: cErr } = await supabase
        .from("companies")
        .select("id,name,vat_uid,country")
        .eq("id", id)
        .single();

      if (cErr) {
        setErr(cErr.message);
        setLoading(false);
        return;
      }

      setCompany(c);

      // published reviews only
      const { data: r, error: rErr } = await supabase
        .from("reviews")
        .select("id,rating,issue_type,review_text,created_at")
        .eq("company_id", id)
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (rErr) {
        setErr(rErr.message);
        setLoading(false);
        return;
      }

      setReviews((r || []) as ReviewRow[]);
      setLoading(false);
    })();
  }, [id]);

  const avg = useMemo(() => {
    if (!reviews.length) return 0;
    return Math.round((reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length) * 10) / 10;
  }, [reviews]);

  if (!id) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-sm text-gray-700">{t.loading}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 pt-10 pb-20">
        <div className="flex items-center justify-between">
          <a href="/" className="text-sm text-gray-600 hover:text-black">
            {t.back}
          </a>

          <a
            href="/write-review"
            className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-900"
          >
            {t.topWrite}
          </a>
        </div>

        {err && (
          <div className="mt-6 text-sm text-red-800 border border-red-200 bg-red-50 rounded-xl p-3">
            {err}
          </div>
        )}

        {loading ? (
          <div className="mt-10 text-sm text-gray-700">{t.loading}</div>
        ) : (
          <>
            <div className="mt-10 border border-gray-200 rounded-2xl p-6">
              <div className="text-2xl font-bold text-black">{company?.name}</div>
              <div className="mt-2 text-sm text-gray-600">
                {company?.country} • VAT: {company?.vat_uid}
              </div>

              <div className="mt-4 text-sm text-gray-700">
                {t.avg}: <b>{avg}</b> / 5 ({reviews.length})
              </div>
            </div>

            <div className="mt-8">
              <div className="text-lg font-semibold text-black">{t.reviews}</div>

              {!reviews.length ? (
                <div className="mt-3 text-sm text-gray-600">{t.noReviews}</div>
              ) : (
                <div className="mt-4 space-y-4">
                  {reviews.map((r) => (
                    <div key={r.id} className="border border-gray-200 rounded-2xl p-5">
                      <div className="text-sm text-gray-700">
                        ⭐ {r.rating}/5 • {r.issue_type}
                      </div>
                      <div className="mt-2 text-black whitespace-pre-wrap">{r.review_text}</div>
                      <div className="mt-3 text-xs text-gray-500">
                        {new Date(r.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
