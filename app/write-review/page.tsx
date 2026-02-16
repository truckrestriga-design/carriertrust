"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { countryFromVat } from "@/lib/vatCountry";

type Lang = "en" | "de" | "ru";
type ProblemKey = "non_payment" | "late_payment" | "dispute" | "fraud" | "other";

type TextPack = {
  title: string;
  subtitle: string;
  company: string;
  vat: string;
  countryAuto: string;
  problem: string;
  rating: string;
  ratingHint: string;
  review: string;
  submit: string;
  backHome: string;
  required: string;
  ok: string;
  problems: Record<ProblemKey, string>;
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    title: "Write a review",
    subtitle: "Share your real business experience with other logistics companies.",
    company: "Company name",
    vat: "VAT number",
    countryAuto: "Country will be detected automatically",
    problem: "Type of problem",
    rating: "Rating",
    ratingHint: "Please select a rating (1–5 stars).",
    review: "Your review",
    submit: "Submit review",
    backHome: "Back to home",
    required: "Please fill all required fields and select a star rating.",
    ok: "Your review has been submitted successfully and is pending moderation.",
    problems: {
      non_payment: "Non payment",
      late_payment: "Late payment",
      dispute: "Dispute",
      fraud: "Fraud",
      other: "Other",
    },
  },
  de: {
    title: "Bewertung schreiben",
    subtitle: "Teile deine echte Geschäftserfahrung mit anderen Logistikunternehmen.",
    company: "Firmenname",
    vat: "USt-IdNr",
    countryAuto: "Land wird automatisch erkannt",
    problem: "Art des Problems",
    rating: "Bewertung",
    ratingHint: "Bitte eine Bewertung (1–5 Sterne) auswählen.",
    review: "Deine Bewertung",
    submit: "Bewertung senden",
    backHome: "Zur Startseite",
    required: "Bitte alle Pflichtfelder ausfüllen und eine Sternebewertung wählen.",
    ok: "Bewertung gesendet und wartet auf Moderation.",
    problems: {
      non_payment: "Keine Zahlung",
      late_payment: "Verspätete Zahlung",
      dispute: "Streitfall",
      fraud: "Betrug",
      other: "Andere",
    },
  },
  ru: {
    title: "Оставить отзыв",
    subtitle: "Поделитесь реальным опытом сотрудничества с логистической компанией.",
    company: "Название компании",
    vat: "VAT номер",
    countryAuto: "Страна определяется автоматически",
    problem: "Тип проблемы",
    rating: "Рейтинг",
    ratingHint: "Пожалуйста, выберите рейтинг (1–5 звёзд).",
    review: "Ваш отзыв",
    submit: "Отправить отзыв",
    backHome: "На главную",
    required: "Заполните все обязательные поля и выберите рейтинг звёздами.",
    ok: "Ваш отзыв отправлен и ожидает модерации.",
    problems: {
      non_payment: "Не оплатили",
      late_payment: "Поздняя оплата",
      dispute: "Спор",
      fraud: "Мошенничество",
      other: "Другое",
    },
  },
};

export default function WriteReviewPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = useMemo(() => TEXT[lang], [lang]);

  const [loading, setLoading] = useState(true);

  const [companyName, setCompanyName] = useState("");
  const [vat, setVat] = useState("");
  const [country, setCountry] = useState("");

  const [issue, setIssue] = useState<ProblemKey>("non_payment");
  const [rating, setRating] = useState<number | null>(null);
  const [text, setText] = useState("");

  const [msg, setMsg] = useState<string | null>(null);
  const [msgType, setMsgType] = useState<"success" | "error" | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "de" || saved === "ru") setLang(saved);

    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = "/auth?next=/write-review";
        return;
      }
      setLoading(false);
    });
  }, []);

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900 text-black placeholder:text-gray-400 caret-black";

  function setError(m: string) {
    setMsgType("error");
    setMsg(m);
  }
  function setSuccess(m: string) {
    setMsgType("success");
    setMsg(m);
  }

  async function submitReview() {
    setMsg(null);
    setMsgType(null);

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      window.location.href = "/auth?next=/write-review";
      return;
    }

    const name = companyName.trim();
    const vatNorm = vat.trim().toUpperCase();
    const reviewText = text.trim();

    if (!name || !vatNorm || !country || rating === null || !reviewText) {
      setError(t.required);
      return;
    }

    setSaving(true);

    try {
      // 1) Find company by VAT
      let companyId: string | null = null;

      const { data: byVat, error: byVatErr } = await supabase
        .from("companies")
        .select("id")
        .eq("vat_uid", vatNorm)
        .limit(1);

      if (byVatErr) throw new Error(byVatErr.message);

      if (byVat && byVat.length > 0) {
        companyId = byVat[0].id;
      } else {
        // 2) Create company
        const { data: newCompany, error: insErr } = await supabase
          .from("companies")
          .insert({ name, country, vat_uid: vatNorm })
          .select("id")
          .single();

        if (insErr) throw new Error(insErr.message);
        companyId = newCompany.id;
      }

      // 3) Insert review (pending) + get id back
      const { data: created, error: reviewErr } = await supabase
        .from("reviews")
        .insert({
          company_id: companyId,
          author_user_id: userData.user.id,
          author_email: userData.user.email, // важно чтобы в БД колонка author_email существовала
          rating,
          issue_type: issue,
          review_text: reviewText,
          status: "pending",
        })
        .select("id")
        .single();

      if (reviewErr) throw new Error(reviewErr.message);

      // 4) Notify admin (не блокируем успех)
      if (created?.id) {
        const { error: fnErr } = await supabase.functions.invoke("notify-admin-new-review", {
          body: { review_id: created.id },
        });

        if (fnErr) {
          console.warn("Admin email failed:", fnErr.message);
        }
      }

      // Clear form
      setCompanyName("");
      setVat("");
      setCountry("");
      setIssue("non_payment");
      setRating(null);
      setText("");

      setSuccess(t.ok);
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="p-10 text-black">Loading...</p>;

  return (
    <main className="min-h-screen bg-white">
      <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-10">
        <div className="w-full max-w-md border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
          <div className="flex justify-center">
            <img src="/logo.png" alt="CarrierTrust" className="w-64" />
          </div>

          <h1 className="mt-4 text-lg font-semibold text-gray-900 text-center">{t.title}</h1>
          <p className="mt-2 text-sm text-gray-700 text-center font-medium">{t.subtitle}</p>

          <div className="mt-6 space-y-3">
            <input
              className={inputClass}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder={t.company}
            />

            <input
              className={inputClass}
              value={vat}
              onChange={(e) => {
                const v = e.target.value;
                setVat(v);
                setCountry(countryFromVat(v) || "");
              }}
              placeholder={t.vat}
            />

            <input
              className={inputClass + " bg-gray-100 cursor-not-allowed"}
              value={country}
              readOnly
              placeholder={t.countryAuto}
            />

            <select
              className={inputClass}
              value={issue}
              onChange={(e) => setIssue(e.target.value as ProblemKey)}
            >
              {(Object.keys(t.problems) as ProblemKey[]).map((k) => (
                <option key={k} value={k}>
                  {t.problems[k]}
                </option>
              ))}
            </select>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-900">{t.rating} *</label>
                {rating === null && <span className="text-xs text-gray-500">{t.ratingHint}</span>}
              </div>

              <div className="mt-2 flex gap-2 text-3xl">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = rating !== null && rating >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`${active ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-500 transition`}
                      aria-label={`Rate ${star}`}
                      title={`Rate ${star}`}
                    >
                      ★
                    </button>
                  );
                })}
              </div>
            </div>

            <textarea
              className={inputClass}
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.review}
            />

            {msg && msgType === "success" && (
              <div className="text-sm text-green-800 border border-green-200 bg-green-50 rounded-xl p-3">
                {msg}
              </div>
            )}

            {msg && msgType === "error" && (
              <div className="text-sm text-red-800 border border-red-200 bg-red-50 rounded-xl p-3">
                {msg}
              </div>
            )}

            <button
              type="button"
              onClick={submitReview}
              disabled={saving}
              className="mt-1 w-full px-4 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 disabled:opacity-60"
            >
              {saving ? "Please wait..." : t.submit}
            </button>

            <a href="/" className="mt-2 block text-center text-sm font-medium text-gray-700 hover:text-black">
              {t.backHome}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
