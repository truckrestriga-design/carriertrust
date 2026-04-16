"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { countryFromVat } from "@/lib/vatCountry";
import { useLang } from "@/lib/language-context";

type Lang = "en" | "de" | "ru" | "fr" | "es" | "it";
type ProblemKey = "non_payment" | "late_payment" | "dispute" | "fraud" | "other";
type UiMessageKey =
  | "required"
  | "missingProfile"
  | "duplicateReviewDaily"
  | "publishFailed"
  | "success"
  | null;

type TextPack = {
  loading: string;
  pleaseWait: string;
  brandTagline: string;

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

  agreeStart: string;
  agreeHint: string;

  terms: string;
  privacy: string;
  reviewPolicy: string;

  pickExisting: string;
  problems: Record<ProblemKey, string>;

  missingProfile: string;

  lockedCompanyHint: string;
  goBackToCompany: string;
  duplicateReviewDaily: string;

  vatLabel: string;
  starAria: string;
  publishFailed: string;
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    loading: "Loading...",
    pleaseWait: "Please wait...",
    brandTagline: "EU logistics reputation network",
    title: "Write a review",
    subtitle: "Share your real business experience with other logistics companies.",
    company: "Company name",
    vat: "VAT number",
    countryAuto: "Country will be detected automatically",
    problem: "Type of problem",
    rating: "Rating",
    ratingHint: "Please select a rating (1–5 stars).",
    review: "Your review",
    submit: "Publish review",
    backHome: "Back to home",
    required: "Please fill all required fields, select a star rating, and accept the policies.",
    ok: "Thank you. Your review has been published successfully.",
    agreeStart: "I confirm that my review complies with the",
    agreeHint: "Required to publish.",
    terms: "Terms",
    privacy: "Privacy Policy",
    reviewPolicy: "Review Policy",
    pickExisting: "Select an existing company:",
    problems: {
      non_payment: "Non payment",
      late_payment: "Late payment",
      dispute: "Dispute",
      fraud: "Fraud",
      other: "Other",
    },
    missingProfile: "Your company profile is missing. Please re-login or update your account.",
    lockedCompanyHint: "Company is pre-filled from the company page.",
    goBackToCompany: "Back to company page",
    duplicateReviewDaily: "Sorry, you can only leave one review per company per day.",
    vatLabel: "VAT",
    starAria: "star",
    publishFailed: "Failed to publish review",
  },
  de: {
    loading: "Lädt...",
    pleaseWait: "Bitte warten...",
    brandTagline: "EU-Netzwerk für Logistik-Reputation",
    title: "Bewertung schreiben",
    subtitle: "Teilen Sie Ihre echte Geschäftserfahrung mit anderen Logistikunternehmen.",
    company: "Firmenname",
    vat: "USt-IdNr.",
    countryAuto: "Das Land wird automatisch erkannt",
    problem: "Problemtyp",
    rating: "Bewertung",
    ratingHint: "Bitte wählen Sie eine Bewertung (1–5 Sterne).",
    review: "Ihre Bewertung",
    submit: "Bewertung veröffentlichen",
    backHome: "Zur Startseite",
    required: "Bitte füllen Sie alle Pflichtfelder aus, wählen Sie eine Sternebewertung und akzeptieren Sie die Richtlinien.",
    ok: "Vielen Dank. Ihre Bewertung wurde erfolgreich veröffentlicht.",
    agreeStart: "Ich bestätige, dass meine Bewertung den",
    agreeHint: "Erforderlich zur Veröffentlichung.",
    terms: "AGB",
    privacy: "Datenschutzerklärung",
    reviewPolicy: "Bewertungsrichtlinie",
    pickExisting: "Bestehendes Unternehmen auswählen:",
    problems: {
      non_payment: "Nichtzahlung",
      late_payment: "Verspätete Zahlung",
      dispute: "Streitfall",
      fraud: "Betrug",
      other: "Andere",
    },
    missingProfile: "Ihr Unternehmensprofil fehlt. Bitte melden Sie sich erneut an oder aktualisieren Sie Ihr Konto.",
    lockedCompanyHint: "Das Unternehmen wurde von der Unternehmensseite vorausgefüllt.",
    goBackToCompany: "Zur Firmenseite",
    duplicateReviewDaily: "Entschuldigung, Sie können nur eine Bewertung pro Unternehmen pro Tag abgeben.",
    vatLabel: "USt-IdNr.",
    starAria: "Stern",
    publishFailed: "Bewertung konnte nicht veröffentlicht werden",
  },
  ru: {
    loading: "Загрузка...",
    pleaseWait: "Пожалуйста, подождите...",
    brandTagline: "Европейская сеть репутации в логистике",
    title: "Оставить отзыв",
    subtitle: "Поделитесь своим реальным бизнес-опытом с другими логистическими компаниями.",
    company: "Название компании",
    vat: "VAT номер",
    countryAuto: "Страна будет определена автоматически",
    problem: "Тип проблемы",
    rating: "Оценка",
    ratingHint: "Пожалуйста, выберите оценку (1–5 звёзд).",
    review: "Ваш отзыв",
    submit: "Опубликовать отзыв",
    backHome: "Назад на главную",
    required: "Пожалуйста, заполните все обязательные поля, выберите оценку и примите правила.",
    ok: "Спасибо. Ваш отзыв успешно опубликован.",
    agreeStart: "Я подтверждаю, что мой отзыв соответствует",
    agreeHint: "Обязательно для публикации.",
    terms: "Условиям",
    privacy: "Политике конфиденциальности",
    reviewPolicy: "Правилам отзывов",
    pickExisting: "Выберите существующую компанию:",
    problems: {
      non_payment: "Неоплата",
      late_payment: "Поздняя оплата",
      dispute: "Спор",
      fraud: "Мошенничество",
      other: "Другое",
    },
    missingProfile: "Профиль вашей компании отсутствует. Пожалуйста, войдите заново или обновите аккаунт.",
    lockedCompanyHint: "Компания уже подставлена со страницы компании.",
    goBackToCompany: "Назад к странице компании",
    duplicateReviewDaily: "Извините, вы можете оставлять только один отзыв на компанию в день.",
    vatLabel: "VAT",
    starAria: "звезда",
    publishFailed: "Не удалось опубликовать отзыв",
  },
  fr: {
    loading: "Chargement...",
    pleaseWait: "Veuillez patienter...",
    brandTagline: "Réseau européen de réputation logistique",
    title: "Écrire un avis",
    subtitle: "Partagez votre expérience réelle avec d’autres entreprises logistiques.",
    company: "Nom de l’entreprise",
    vat: "Numéro de TVA",
    countryAuto: "Le pays sera détecté automatiquement",
    problem: "Type de problème",
    rating: "Note",
    ratingHint: "Veuillez sélectionner une note (1 à 5 étoiles).",
    review: "Votre avis",
    submit: "Publier l’avis",
    backHome: "Retour à l’accueil",
    required: "Veuillez remplir tous les champs obligatoires, sélectionner une note et accepter les politiques.",
    ok: "Merci. Votre avis a été publié avec succès.",
    agreeStart: "Je confirme que mon avis respecte les",
    agreeHint: "Obligatoire pour publier.",
    terms: "Conditions",
    privacy: "Politique de confidentialité",
    reviewPolicy: "Politique des avis",
    pickExisting: "Sélectionnez une entreprise existante :",
    problems: {
      non_payment: "Non-paiement",
      late_payment: "Paiement en retard",
      dispute: "Litige",
      fraud: "Fraude",
      other: "Autre",
    },
    missingProfile: "Le profil de votre entreprise est manquant. Veuillez vous reconnecter ou mettre à jour votre compte.",
    lockedCompanyHint: "L’entreprise est préremplie depuis la page entreprise.",
    goBackToCompany: "Retour à l’entreprise",
    duplicateReviewDaily: "Désolé, vous ne pouvez publier qu’un seul avis par entreprise et par jour.",
    vatLabel: "TVA",
    starAria: "étoile",
    publishFailed: "Impossible de publier l’avis",
  },
  es: {
    loading: "Cargando...",
    pleaseWait: "Por favor, espera...",
    brandTagline: "Red europea de reputación logística",
    title: "Escribir una reseña",
    subtitle: "Comparte tu experiencia empresarial real con otras empresas logísticas.",
    company: "Nombre de la empresa",
    vat: "Número de VAT",
    countryAuto: "El país se detectará automáticamente",
    problem: "Tipo de problema",
    rating: "Valoración",
    ratingHint: "Selecciona una valoración (1–5 estrellas).",
    review: "Tu reseña",
    submit: "Publicar reseña",
    backHome: "Volver al inicio",
    required: "Completa todos los campos obligatorios, selecciona una valoración y acepta las políticas.",
    ok: "Gracias. Tu reseña se ha publicado correctamente.",
    agreeStart: "Confirmo que mi reseña cumple con los",
    agreeHint: "Obligatorio para publicar.",
    terms: "Términos",
    privacy: "Política de privacidad",
    reviewPolicy: "Política de reseñas",
    pickExisting: "Selecciona una empresa existente:",
    problems: {
      non_payment: "Impago",
      late_payment: "Pago tardío",
      dispute: "Disputa",
      fraud: "Fraude",
      other: "Otro",
    },
    missingProfile: "Falta el perfil de tu empresa. Vuelve a iniciar sesión o actualiza tu cuenta.",
    lockedCompanyHint: "La empresa se completa automáticamente desde la página de empresa.",
    goBackToCompany: "Volver a la empresa",
    duplicateReviewDaily: "Lo sentimos, solo puedes dejar una reseña por empresa al día.",
    vatLabel: "VAT",
    starAria: "estrella",
    publishFailed: "No se pudo publicar la reseña",
  },
  it: {
    loading: "Caricamento...",
    pleaseWait: "Attendere prego...",
    brandTagline: "Rete europea di reputazione logistica",
    title: "Scrivi una recensione",
    subtitle: "Condividi la tua esperienza reale con altre aziende della logistica.",
    company: "Nome azienda",
    vat: "Numero di VAT",
    countryAuto: "Il paese verrà rilevato automaticamente",
    problem: "Tipo di problema",
    rating: "Valutazione",
    ratingHint: "Seleziona una valutazione (1–5 stelle).",
    review: "La tua recensione",
    submit: "Pubblica recensione",
    backHome: "Torna alla home",
    required: "Compila tutti i campi obbligatori, seleziona una valutazione e accetta le policy.",
    ok: "Grazie. La tua recensione è stata pubblicata con successo.",
    agreeStart: "Confermo che la mia recensione è conforme ai",
    agreeHint: "Obbligatorio per pubblicare.",
    terms: "Termini",
    privacy: "Informativa sulla privacy",
    reviewPolicy: "Policy recensioni",
    pickExisting: "Seleziona un’azienda esistente:",
    problems: {
      non_payment: "Mancato pagamento",
      late_payment: "Pagamento in ritardo",
      dispute: "Controversia",
      fraud: "Frode",
      other: "Altro",
    },
    missingProfile: "Manca il profilo della tua azienda. Accedi di nuovo o aggiorna il tuo account.",
    lockedCompanyHint: "L’azienda è precompilata dalla pagina aziendale.",
    goBackToCompany: "Torna alla pagina azienda",
    duplicateReviewDaily: "Spiacente, puoi lasciare solo una recensione per azienda al giorno.",
    vatLabel: "VAT",
    starAria: "stella",
    publishFailed: "Impossibile pubblicare la recensione",
  },
};

type CompanyPick = {
  id: string;
  name: string | null;
  vat_uid: string | null;
  country: string | null;
};

function andWord(lang: Lang) {
  if (lang === "de") return "und";
  if (lang === "ru") return "и";
  if (lang === "fr") return "et";
  if (lang === "es") return "y";
  if (lang === "it") return "e";
  return "and";
}

type CreateReviewResp =
  | { ok: true; review_id: string; company_id: string; risk_score?: number; reviewAlert?: any }
  | { ok: false; code?: string | number; status?: number; error?: string; details?: string; message?: string };

function AppBrand({ tagline }: { tagline: string }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-2xl font-bold text-white shadow-[0_12px_30px_rgba(16,185,129,0.28)]">
        CT
      </div>

      <div className="text-left">
        <div className="text-3xl font-bold tracking-tight text-slate-900">CarrierTrust</div>
        <div className="mt-1 text-sm text-slate-500">{tagline}</div>
      </div>
    </div>
  );
}

function WriteReviewPageInner() {
  const sp = useSearchParams();
  const companyIdFromUrl = sp.get("company_id") || "";
  const { lang } = useLang();

  const safeLang: Lang =
    lang === "en" || lang === "de" || lang === "ru" || lang === "fr" || lang === "es" || lang === "it"
      ? lang
      : "en";

  const t = useMemo(() => TEXT[safeLang], [safeLang]);

  const [loading, setLoading] = useState(true);

  const [companyName, setCompanyName] = useState("");
  const [vat, setVat] = useState("");
  const [country, setCountry] = useState("");

  const [issue, setIssue] = useState<ProblemKey>("non_payment");
  const [rating, setRating] = useState<number | null>(null);
  const [text, setText] = useState("");

  const [agreePolicies, setAgreePolicies] = useState(false);

  const [msg, setMsg] = useState<string | null>(null);
  const [msgType, setMsgType] = useState<"success" | "error" | null>(null);
  const [msgKey, setMsgKey] = useState<UiMessageKey>(null);

  const [saving, setSaving] = useState(false);

  const [suggestions, setSuggestions] = useState<CompanyPick[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const lockedCompany = Boolean(companyIdFromUrl);

  useEffect(() => {
    if (!msgKey) return;

    if (msgKey === "required") setMsg(t.required);
    else if (msgKey === "missingProfile") setMsg(t.missingProfile);
    else if (msgKey === "duplicateReviewDaily") setMsg(t.duplicateReviewDaily);
    else if (msgKey === "publishFailed") setMsg(t.publishFailed);
    else if (msgKey === "success") setMsg(t.ok);
  }, [msgKey, t]);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        const next = companyIdFromUrl ? `/write-review?company_id=${encodeURIComponent(companyIdFromUrl)}` : "/write-review";
        window.location.href = `/auth?next=${encodeURIComponent(next)}`;
        return;
      }

      if (companyIdFromUrl) {
        try {
          const { data: c, error } = await supabase
            .from("companies")
            .select("id, name, vat_uid, country")
            .eq("id", companyIdFromUrl)
            .single();

          if (!error && c) {
            setCompanyName(String(c.name || "").toUpperCase());
            setVat(String(c.vat_uid || "").toUpperCase());
            setCountry(String(c.country || countryFromVat(String(c.vat_uid || "")) || ""));
            setSuggestions([]);
            setShowSuggestions(false);
          }
        } catch {
          // ignore
        }
      }

      setLoading(false);
    });
  }, [companyIdFromUrl]);

  useEffect(() => {
    const v = vat.trim();
    setCountry(countryFromVat(v) || country || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vat]);

  useEffect(() => {
    if (lockedCompany) return;

    const name = companyName.trim();
    const vatNorm = vat.trim().toUpperCase();

    if (!name && !vatNorm) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const handle = setTimeout(async () => {
      try {
        if (vatNorm.length >= 3) {
          const { data: byVat } = await supabase
            .from("companies")
            .select("id, name, vat_uid, country")
            .eq("vat_uid", vatNorm)
            .limit(5);

          if (byVat && byVat.length) {
            setSuggestions(byVat as any);
            setShowSuggestions(true);
            return;
          }
        }

        if (name.length >= 3) {
          const { data: byName } = await supabase
            .from("companies")
            .select("id, name, vat_uid, country")
            .ilike("name", `%${name}%`)
            .order("name", { ascending: true })
            .limit(7);

          if (byName && byName.length) {
            setSuggestions(byName as any);
            setShowSuggestions(true);
            return;
          }
        }

        setSuggestions([]);
        setShowSuggestions(false);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 250);

    return () => clearTimeout(handle);
  }, [companyName, vat, lockedCompany]);

  function pickCompany(c: CompanyPick) {
    setCompanyName((c.name || "").toUpperCase());
    setVat((c.vat_uid || "").toUpperCase());
    setCountry(c.country || countryFromVat(c.vat_uid || "") || "");
    setShowSuggestions(false);
  }

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-white/85 backdrop-blur px-4 py-3 outline-none text-slate-900 placeholder:text-slate-400 focus:border-slate-300 shadow-sm";

  function setError(m: string, key: UiMessageKey = null) {
    setMsgType("error");
    setMsgKey(key);
    setMsg(m);
  }

  function setSuccess(m: string, key: UiMessageKey = null) {
    setMsgType("success");
    setMsgKey(key);
    setMsg(m);
  }

  async function submitReview() {
    setMsg(null);
    setMsgType(null);
    setMsgKey(null);

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      const next = companyIdFromUrl ? `/write-review?company_id=${encodeURIComponent(companyIdFromUrl)}` : "/write-review";
      window.location.href = `/auth?next=${encodeURIComponent(next)}`;
      return;
    }

    const name = companyName.trim().toUpperCase();
    const vatNorm = vat.trim().toUpperCase();
    const reviewText = text.trim();

    if (!name || !vatNorm || !country || rating === null || !reviewText || !agreePolicies) {
      setError(t.required, "required");
      return;
    }

    setSaving(true);

    try {
      const { data: prof, error: profErr } = await supabase
        .from("profiles")
        .select("company_name, company_vat")
        .eq("user_id", userData.user.id)
        .maybeSingle();

      if (profErr) {
        setError(profErr.message);
        return;
      }

      const authorCompany = String(prof?.company_name || "").trim();
      const authorVat = String(prof?.company_vat || "").trim().toUpperCase();

      if (!authorCompany) {
        setError(t.missingProfile, "missingProfile");
        return;
      }

      let companyId: string | null = null;

      if (companyIdFromUrl) {
        companyId = companyIdFromUrl;
      } else {
        const { data: byVat, error: byVatErr } = await supabase
          .from("companies")
          .select("id")
          .eq("vat_uid", vatNorm)
          .limit(1);

        if (byVatErr) {
          setError(byVatErr.message);
          return;
        }

        if (byVat && byVat.length > 0) {
          companyId = byVat[0].id;
        } else {
          const { data: newCompany, error: insErr } = await supabase
            .from("companies")
            .insert({ name, country, vat_uid: vatNorm })
            .select("id")
            .single();

          if (insErr) {
            setError(insErr.message);
            return;
          }

          companyId = newCompany.id;
        }
      }

      if (!companyId) {
        setError(t.publishFailed, "publishFailed");
        return;
      }

      const res = await supabase.functions.invoke("create-review", {
        body: {
          company_id: companyId,
          rating,
          issue_type: issue,
          review_text: reviewText,
          author_company: authorCompany,
          author_company_vat: authorVat ? authorVat : null,
          company_vat: vatNorm,
        },
      });

      const fnError = (res as any)?.error;
      const data = (res as any)?.data as CreateReviewResp | undefined;

      if (!data?.ok) {
        const code = (data as any)?.code;

        if (code === "DUPLICATE_DAILY") {
          setError(t.duplicateReviewDaily, "duplicateReviewDaily");
          return;
        }

        if (fnError?.message && code !== "DUPLICATE_DAILY") {
          setError(String(fnError.message));
          return;
        }

        setError(String((data as any)?.error || (data as any)?.details || (data as any)?.message || t.publishFailed));
        return;
      }

      setSuccess(t.ok, "success");

      setTimeout(() => {
        window.location.href = `/companies/${data.company_id}`;
      }, 1400);
    } catch (e: any) {
      setError(String(e?.message || t.publishFailed));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen text-slate-900">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-slate-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.14),transparent)]" />
          <div className="absolute left-[8%] top-[8%] h-[24rem] w-[24rem] rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="absolute bottom-[8%] right-[10%] h-[20rem] w-[20rem] rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.55)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.04]" />
        </div>

        <div className="relative flex min-h-screen items-center justify-center px-4 pb-10 pt-32">
          <div className="text-slate-500">{t.loading}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.14),transparent)]" />
        <div className="absolute left-[8%] top-[8%] h-[24rem] w-[24rem] rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute bottom-[8%] right-[10%] h-[20rem] w-[20rem] rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.55)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.04]" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 pb-10 pt-36">
        <div className="relative w-full max-w-xl rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-emerald-200/50 blur-3xl" />
            <div className="absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
          </div>

          <div className="relative">
            <div className="flex justify-center">
              <AppBrand tagline={t.brandTagline} />
            </div>

            <h1 className="mt-12 text-center text-2xl font-bold tracking-tight text-slate-900">{t.title}</h1>
            <p className="mt-2 text-center text-sm font-medium text-slate-600">{t.subtitle}</p>

            {lockedCompany ? (
              <a
                href={`/companies/${encodeURIComponent(companyIdFromUrl)}`}
                className="mt-4 inline-flex w-full justify-center text-sm font-semibold text-slate-600 transition hover:text-slate-900"
              >
                {t.goBackToCompany}
              </a>
            ) : null}

            {lockedCompany ? (
              <div className="mt-3 text-center text-xs text-slate-500">{t.lockedCompanyHint}</div>
            ) : null}

            <div className="mt-6 space-y-4">
              <div className="relative">
                <input
                  className={`${inputClass} ${lockedCompany ? "cursor-not-allowed opacity-70" : ""}`}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value.toUpperCase())}
                  placeholder={t.company}
                  onFocus={() => !lockedCompany && suggestions.length && setShowSuggestions(true)}
                  onBlur={() => !lockedCompany && setTimeout(() => setShowSuggestions(false), 150)}
                  disabled={lockedCompany}
                />

                {!lockedCompany && showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-lg backdrop-blur">
                    <div className="border-b border-slate-200 bg-white/70 px-4 py-2 text-xs text-slate-500">
                      {t.pickExisting}
                    </div>
                    {suggestions.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => pickCompany(c)}
                        className="w-full px-4 py-3 text-left transition hover:bg-slate-50"
                      >
                        <div className="text-sm font-semibold text-slate-900">
                          {(c.name || "—").toUpperCase()}
                        </div>
                        <div className="text-xs text-slate-500">
                          {t.vatLabel}: {(c.vat_uid || "—").toUpperCase()}
                          {c.country ? ` • ${c.country}` : ""}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <input
                className={`${inputClass} ${lockedCompany ? "cursor-not-allowed opacity-70" : ""}`}
                value={vat}
                onChange={(e) => setVat(e.target.value.toUpperCase())}
                placeholder={t.vat}
                onFocus={() => !lockedCompany && suggestions.length && setShowSuggestions(true)}
                onBlur={() => !lockedCompany && setTimeout(() => setShowSuggestions(false), 150)}
                disabled={lockedCompany}
              />

              <div className="px-1 text-xs text-slate-500">
                {t.countryAuto}
                {country ? `: ${country}` : ""}
              </div>

              <select className={inputClass} value={issue} onChange={(e) => setIssue(e.target.value as ProblemKey)}>
                {Object.keys(t.problems).map((k) => (
                  <option key={k} value={k}>
                    {t.problems[k as ProblemKey]}
                  </option>
                ))}
              </select>

              <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">{t.rating}</div>
                <div className="mt-3 flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      className={`h-10 w-10 rounded-2xl border font-semibold transition ${
                        rating === n
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                      aria-label={`${n} ${t.starAria}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                {!rating && <div className="mt-2 text-xs text-slate-500">{t.ratingHint}</div>}
              </div>

              <textarea
                className={`${inputClass} min-h-[140px]`}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t.review}
              />
            </div>

            <label className="mt-5 flex items-start gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={agreePolicies}
                onChange={(e) => setAgreePolicies(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300"
              />
              <span className="leading-5">
                {t.agreeStart}{" "}
                <a href="/terms" target="_blank" className="underline underline-offset-4 hover:text-slate-900">
                  {t.terms}
                </a>{" "}
                {andWord(safeLang)}{" "}
                <a href="/privacy" target="_blank" className="underline underline-offset-4 hover:text-slate-900">
                  {t.privacy}
                </a>{" "}
                {andWord(safeLang)}{" "}
                <a href="/review-policy" target="_blank" className="underline underline-offset-4 hover:text-slate-900">
                  {t.reviewPolicy}
                </a>
                . <span className="text-xs text-slate-500">{t.agreeHint}</span>
              </span>
            </label>

            {msg && msgType === "success" && (
              <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-3 text-sm text-green-900">
                {msg}
              </div>
            )}
            {msg && msgType === "error" && (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-900">
                {msg}
              </div>
            )}

            <button
              type="button"
              className="mt-5 w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800 disabled:opacity-50"
              disabled={saving || !agreePolicies}
              onClick={submitReview}
            >
              {saving ? t.pleaseWait : t.submit}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function WriteReviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <WriteReviewPageInner />
    </Suspense>
  );
}