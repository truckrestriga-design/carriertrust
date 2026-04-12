"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLang } from "@/lib/language-context";

type Review = {
  id: string;
  review_text: string | null;
  created_at: string;
  rating: number | null;
  issue_type: string | null;
  review_replies?: { id: string; reply_text: string | null; updated_at: string | null }[] | null;
};

type Company = {
  id: string;
  name: string | null;
  vat_uid: string | null;
  country: string | null;
};

type CompanyPlanRow = {
  plan: string | null;
  replies_limit: number | null;
  replies_used: number | null;
};

type SiteVisitRow = {
  visitor_id: string | null;
};

type AccessPlan = "free" | "pro" | "business" | "one_month";
type ClaimStatus = "approved" | "pending" | null;
type LangCode = "en" | "de" | "ru" | "fr" | "es" | "it";

type AnalyticsStats = {
  views30d: number;
  uniqueVisitors30d: number;
  newReviews30d: number;
};

type AnalyticsTextPack = {
  analyticsTitle: string;
  analyticsSubtitle: string;
  premiumAnalytics: string;
  premiumAnalyticsText: string;
  companyViews30d: string;
  uniqueVisitors30d: string;
  newReviews30d: string;
  upgradeToPro: string;
  paidBadge: string;
};

type PasswordTextPack = {
  changePassword: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  saveNewPassword: string;
  savingPassword: string;
  fillAllPasswordFields: string;
  currentPasswordIncorrect: string;
  passwordsDoNotMatch: string;
  passwordTooShort: string;
  passwordChangedSuccessfully: string;
};

const ANALYTICS_TEXT: Record<LangCode, AnalyticsTextPack> = {
  en: {
    analyticsTitle: "Analytics",
    analyticsSubtitle: "Performance of your company page for the last 30 days.",
    premiumAnalytics: "Premium analytics",
    premiumAnalyticsText:
      "Upgrade to a paid plan to see company page views, unique visitors and review activity.",
    companyViews30d: "Company views (30d)",
    uniqueVisitors30d: "Unique visitors (30d)",
    newReviews30d: "New reviews (30d)",
    upgradeToPro: "Upgrade to PRO",
    paidBadge: "PRO / ONE MONTH",
  },
  de: {
    analyticsTitle: "Analysen",
    analyticsSubtitle: "Leistung Ihrer Unternehmensseite in den letzten 30 Tagen.",
    premiumAnalytics: "Premium-Analysen",
    premiumAnalyticsText:
      "Wechseln Sie zu einem kostenpflichtigen Tarif, um Seitenaufrufe, eindeutige Besucher und Bewertungsaktivität zu sehen.",
    companyViews30d: "Unternehmensaufrufe (30 T.)",
    uniqueVisitors30d: "Eindeutige Besucher (30 T.)",
    newReviews30d: "Neue Bewertungen (30 T.)",
    upgradeToPro: "Auf PRO upgraden",
    paidBadge: "PRO / EIN MONAT",
  },
  ru: {
    analyticsTitle: "Аналитика",
    analyticsSubtitle: "Результаты страницы компании за последние 30 дней.",
    premiumAnalytics: "Премиум-аналитика",
    premiumAnalyticsText:
      "Перейдите на платный тариф, чтобы видеть просмотры страницы компании, уникальных посетителей и активность по отзывам.",
    companyViews30d: "Просмотры компании (30 д.)",
    uniqueVisitors30d: "Уникальные посетители (30 д.)",
    newReviews30d: "Новые отзывы (30 д.)",
    upgradeToPro: "Перейти на PRO",
    paidBadge: "PRO / 1 МЕСЯЦ",
  },
  fr: {
    analyticsTitle: "Analytique",
    analyticsSubtitle: "Performance de la page de votre entreprise sur les 30 derniers jours.",
    premiumAnalytics: "Analytique premium",
    premiumAnalyticsText:
      "Passez à une offre payante pour voir les vues de page, les visiteurs uniques et l’activité des avis.",
    companyViews30d: "Vues entreprise (30 j)",
    uniqueVisitors30d: "Visiteurs uniques (30 j)",
    newReviews30d: "Nouveaux avis (30 j)",
    upgradeToPro: "Passer à PRO",
    paidBadge: "PRO / UN MOIS",
  },
  es: {
    analyticsTitle: "Analítica",
    analyticsSubtitle: "Rendimiento de la página de tu empresa en los últimos 30 días.",
    premiumAnalytics: "Analítica premium",
    premiumAnalyticsText:
      "Pásate a un plan de pago para ver visitas de la página, visitantes únicos y actividad de reseñas.",
    companyViews30d: "Visitas empresa (30 d)",
    uniqueVisitors30d: "Visitantes únicos (30 d)",
    newReviews30d: "Nuevas reseñas (30 d)",
    upgradeToPro: "Mejorar a PRO",
    paidBadge: "PRO / UN MES",
  },
  it: {
    analyticsTitle: "Analitica",
    analyticsSubtitle: "Prestazioni della pagina aziendale negli ultimi 30 giorni.",
    premiumAnalytics: "Analitica premium",
    premiumAnalyticsText:
      "Passa a un piano a pagamento per vedere visite pagina, visitatori unici e attività delle recensioni.",
    companyViews30d: "Visite azienda (30 g)",
    uniqueVisitors30d: "Visitatori unici (30 g)",
    newReviews30d: "Nuove recensioni (30 g)",
    upgradeToPro: "Passa a PRO",
    paidBadge: "PRO / UN MESE",
  },
};

const PASSWORD_TEXT: Record<LangCode, PasswordTextPack> = {
  en: {
    changePassword: "Change password",
    currentPassword: "Current password",
    newPassword: "New password",
    confirmPassword: "Confirm new password",
    saveNewPassword: "Save new password",
    savingPassword: "Saving...",
    fillAllPasswordFields: "Fill all password fields.",
    currentPasswordIncorrect: "Current password is incorrect.",
    passwordsDoNotMatch: "Passwords do not match.",
    passwordTooShort: "Password must be at least 6 characters.",
    passwordChangedSuccessfully: "Password changed successfully.",
  },
  de: {
    changePassword: "Passwort ändern",
    currentPassword: "Aktuelles Passwort",
    newPassword: "Neues Passwort",
    confirmPassword: "Neues Passwort bestätigen",
    saveNewPassword: "Neues Passwort speichern",
    savingPassword: "Speichern...",
    fillAllPasswordFields: "Bitte füllen Sie alle Passwortfelder aus.",
    currentPasswordIncorrect: "Das aktuelle Passwort ist falsch.",
    passwordsDoNotMatch: "Die Passwörter stimmen nicht überein.",
    passwordTooShort: "Das Passwort muss mindestens 6 Zeichen lang sein.",
    passwordChangedSuccessfully: "Passwort erfolgreich geändert.",
  },
  ru: {
    changePassword: "Сменить пароль",
    currentPassword: "Текущий пароль",
    newPassword: "Новый пароль",
    confirmPassword: "Подтвердите новый пароль",
    saveNewPassword: "Сохранить новый пароль",
    savingPassword: "Сохранение...",
    fillAllPasswordFields: "Заполните все поля пароля.",
    currentPasswordIncorrect: "Текущий пароль введён неверно.",
    passwordsDoNotMatch: "Пароли не совпадают.",
    passwordTooShort: "Пароль должен быть не короче 6 символов.",
    passwordChangedSuccessfully: "Пароль успешно изменён.",
  },
  fr: {
    changePassword: "Changer le mot de passe",
    currentPassword: "Mot de passe actuel",
    newPassword: "Nouveau mot de passe",
    confirmPassword: "Confirmez le nouveau mot de passe",
    saveNewPassword: "Enregistrer le nouveau mot de passe",
    savingPassword: "Enregistrement...",
    fillAllPasswordFields: "Veuillez remplir tous les champs du mot de passe.",
    currentPasswordIncorrect: "Le mot de passe actuel est incorrect.",
    passwordsDoNotMatch: "Les mots de passe ne correspondent pas.",
    passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères.",
    passwordChangedSuccessfully: "Mot de passe modifié avec succès.",
  },
  es: {
    changePassword: "Cambiar contraseña",
    currentPassword: "Contraseña actual",
    newPassword: "Nueva contraseña",
    confirmPassword: "Confirmar nueva contraseña",
    saveNewPassword: "Guardar nueva contraseña",
    savingPassword: "Guardando...",
    fillAllPasswordFields: "Completa todos los campos de contraseña.",
    currentPasswordIncorrect: "La contraseña actual es incorrecta.",
    passwordsDoNotMatch: "Las contraseñas no coinciden.",
    passwordTooShort: "La contraseña debe tener al menos 6 caracteres.",
    passwordChangedSuccessfully: "Contraseña cambiada correctamente.",
  },
  it: {
    changePassword: "Cambia password",
    currentPassword: "Password attuale",
    newPassword: "Nuova password",
    confirmPassword: "Conferma nuova password",
    saveNewPassword: "Salva nuova password",
    savingPassword: "Salvataggio...",
    fillAllPasswordFields: "Compila tutti i campi della password.",
    currentPasswordIncorrect: "La password attuale non è corretta.",
    passwordsDoNotMatch: "Le password non coincidono.",
    passwordTooShort: "La password deve contenere almeno 6 caratteri.",
    passwordChangedSuccessfully: "Password cambiata con successo.",
  },
};

function normalizeAccessPlan(v: unknown): AccessPlan {
  const s = String(v || "free").toLowerCase().trim();
  if (s === "one_month" || s === "one month") return "one_month";
  if (s === "business") return "business";
  if (s === "pro") return "pro";
  return "free";
}

function formatPlanLabel(plan: AccessPlan) {
  if (plan === "one_month") return "ONE MONTH";
  return plan.toUpperCase();
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function startOfDaysAgo(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

export default function CompanyProfilePage() {
  const { t, lang } = useLang();

  const safeLang = ((lang as LangCode) || "en") in ANALYTICS_TEXT ? (lang as LangCode) : "en";
  const analyticsText = ANALYTICS_TEXT[safeLang] || ANALYTICS_TEXT.en;
  const passwordText = PASSWORD_TEXT[safeLang] || PASSWORD_TEXT.en;

  const [loading, setLoading] = useState(true);
  const [statusType, setStatusType] = useState<"success" | "error" | "info" | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [statusMsgKey, setStatusMsgKey] = useState<keyof PasswordTextPack | null>(null);

  const [claimStatus, setClaimStatus] = useState<ClaimStatus>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [company, setCompany] = useState<Company | null>(null);

  const [profilePlan, setProfilePlan] = useState<AccessPlan>("free");
  const [companyPlanRow, setCompanyPlanRow] = useState<CompanyPlanRow | null>(null);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [replyDraft, setReplyDraft] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsStats>({
    views30d: 0,
    uniqueVisitors30d: 0,
    newReviews30d: 0,
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordBusy, setPasswordBusy] = useState(false);

  function resolvedStatusMsg() {
    if (statusMsgKey) return passwordText[statusMsgKey];
    return statusMsg;
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const effectivePlan = useMemo<AccessPlan>(() => {
    const companyPlan = normalizeAccessPlan(companyPlanRow?.plan);
    if (companyPlan !== "free") return companyPlan;
    return profilePlan;
  }, [companyPlanRow?.plan, profilePlan]);

  const isFree = effectivePlan === "free";
  const isPaid =
    effectivePlan === "pro" ||
    effectivePlan === "business" ||
    effectivePlan === "one_month";

  const planLabel = formatPlanLabel(effectivePlan);

  const repliesUsed = useMemo(() => {
    const used = Number(companyPlanRow?.replies_used ?? 0);
    return Number.isFinite(used) ? Math.max(0, used) : 0;
  }, [companyPlanRow]);

  const isLimitReached = isFree && repliesUsed >= 1;
  const hasCompanyLink = Boolean(companyId);
  const hasApprovedAccess = claimStatus === "approved";
  const isPending = claimStatus === "pending";

  async function loadAll() {
    setLoading(true);
    setStatusType(null);
    setStatusMsg(null);
    setStatusMsgKey(null);

    const { data: u } = await supabase.auth.getUser();
    const user = u?.user;

    if (!user) {
      window.location.href = "/auth";
      return;
    }

    const { data: prof } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .maybeSingle();

    setProfilePlan(normalizeAccessPlan((prof as any)?.plan));

    const { data: claims } = await supabase
      .from("company_claims")
      .select("company_id, status, created_at")
      .eq("claimant_user_id", user.id)
      .in("status", ["approved", "pending"])
      .order("created_at", { ascending: false })
      .limit(10);

    const approvedClaim = (claims || []).find((c: any) => c.status === "approved") || null;
    const pendingClaim = (claims || []).find((c: any) => c.status === "pending") || null;
    const activeClaim = approvedClaim || pendingClaim || null;

    if (!activeClaim?.company_id) {
      setCompanyId(null);
      setCompany(null);
      setClaimStatus(null);
      setCompanyPlanRow(null);
      setReviews([]);
      setReplyDraft({});
      setAnalytics({
        views30d: 0,
        uniqueVisitors30d: 0,
        newReviews30d: 0,
      });
      setLoading(false);
      return;
    }

    setClaimStatus(activeClaim.status);
    setCompanyId(activeClaim.company_id);

    const [{ data: c }, { data: pr }, { data: r }] = await Promise.all([
      supabase
        .from("companies")
        .select("id, name, vat_uid, country")
        .eq("id", activeClaim.company_id)
        .single(),
      supabase
        .from("company_plans")
        .select("plan, replies_limit, replies_used")
        .eq("company_id", activeClaim.company_id)
        .maybeSingle(),
      supabase
        .from("reviews")
        .select(
          "id, created_at, rating, issue_type, review_text, review_replies(id, reply_text, updated_at)"
        )
        .eq("company_id", activeClaim.company_id)
        .eq("status", "published")
        .order("created_at", { ascending: false }),
    ]);

    setCompany((c as any) || null);
    setCompanyPlanRow((pr as any) || null);

    const rows = (r || []) as any as Review[];
    setReviews(rows);

    const d: Record<string, string> = {};
    rows.forEach((rev) => {
      d[rev.id] = rev.review_replies?.[0]?.reply_text || "";
    });
    setReplyDraft(d);

    const nextPlan = normalizeAccessPlan((pr as any)?.plan);
    if (nextPlan === "pro" || nextPlan === "business" || nextPlan === "one_month") {
      await loadAnalytics(activeClaim.company_id);
    } else {
      setAnalytics({
        views30d: 0,
        uniqueVisitors30d: 0,
        newReviews30d: 0,
      });
    }

    setLoading(false);
  }

  async function loadAnalytics(targetCompanyId: string) {
    setAnalyticsLoading(true);

    const since30d = startOfDaysAgo(30);

    const [{ data: visits, error: visitsError }, { count: reviewsCount, error: reviewsError }] =
      await Promise.all([
        supabase
          .from("site_visits")
          .select("visitor_id")
          .eq("event_type", "company_view")
          .eq("company_id", targetCompanyId)
          .gte("created_at", since30d),
        supabase
          .from("reviews")
          .select("id", { count: "exact", head: true })
          .eq("company_id", targetCompanyId)
          .eq("status", "published")
          .gte("created_at", since30d),
      ]);

    if (visitsError || reviewsError) {
      setAnalytics({
        views30d: 0,
        uniqueVisitors30d: 0,
        newReviews30d: 0,
      });
      setAnalyticsLoading(false);
      return;
    }

    const visitRows = ((visits || []) as SiteVisitRow[]) || [];
    const uniqueVisitors = new Set(
      visitRows
        .map((v) => (v.visitor_id || "").trim())
        .filter(Boolean)
    ).size;

    setAnalytics({
      views30d: visitRows.length,
      uniqueVisitors30d: uniqueVisitors,
      newReviews30d: reviewsCount || 0,
    });

    setAnalyticsLoading(false);
  }

  async function changePassword() {
    setStatusType(null);
    setStatusMsg(null);
    setStatusMsgKey(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setStatusType("error");
      setStatusMsgKey("fillAllPasswordFields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusType("error");
      setStatusMsgKey("passwordsDoNotMatch");
      return;
    }

    if (newPassword.length < 6) {
      setStatusType("error");
      setStatusMsgKey("passwordTooShort");
      return;
    }

    setPasswordBusy(true);

    const { data: userRes, error: userErr } = await supabase.auth.getUser();
    const email = userRes?.user?.email;

    if (userErr || !email) {
      setStatusType("error");
      setStatusMsgKey("currentPasswordIncorrect");
      setPasswordBusy(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    });

    if (signInError) {
      setStatusType("error");
      setStatusMsgKey("currentPasswordIncorrect");
      setPasswordBusy(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setStatusType("error");
      setStatusMsgKey(null);
      setStatusMsg(updateError.message);
      setPasswordBusy(false);
      return;
    }

    setStatusType("success");
    setStatusMsgKey("passwordChangedSuccessfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordForm(false);
    setPasswordBusy(false);
  }

  async function saveReply(reviewId: string) {
    if (!companyId) return;

    const text = (replyDraft[reviewId] || "").trim();
    if (text.length < 2) return;

    setSavingId(reviewId);
    setStatusType(null);
    setStatusMsg(null);
    setStatusMsgKey(null);

    const { error } = await supabase.functions.invoke("company-replies", {
      method: "PATCH",
      body: { review_id: reviewId, reply_text: text },
    });

    if (error) {
      setStatusType("error");
      setStatusMsg(error.message || "Error sending");
      setSavingId(null);
      return;
    }

    setStatusType("success");
    setStatusMsg(t("saved"));
    await loadAll();
    setSavingId(null);
  }

  const hero =
    "rounded-[28px] border border-black/10 bg-white/70 backdrop-blur shadow-[0_14px_60px_rgba(15,20,30,0.08)]";
  const card = "rounded-[22px] border border-black/10 bg-white/60 backdrop-blur shadow-sm";
  const input =
    "w-full rounded-2xl border border-black/10 bg-white/85 px-4 py-3 outline-none";
  const statCard =
    "relative overflow-hidden rounded-[22px] border border-black/10 bg-white/75 backdrop-blur shadow-sm p-5";
  const lockedCard =
    "rounded-[22px] border border-black/10 bg-gradient-to-br from-white/80 to-black/[0.03] backdrop-blur shadow-sm p-6";

  if (loading) {
    return (
      <main className="min-h-screen text-black">
        <div className="px-6 pt-40">
          <div className="max-w-4xl mx-auto">{t("loading")}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-black">
      <div className="px-6 pt-45 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className={`p-6 ${hero}`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold">{t("companyDashboard")}</h1>
                <div className="mt-2 inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-semibold tracking-wide">
                  {t("plan")}: {planLabel}
                </div>
              </div>

              <div className="text-right text-sm text-black/60">
                <div>
                  {t("repliesUsed")}:{" "}
                  <span className="font-semibold text-black">{repliesUsed}</span>
                </div>
              </div>
            </div>

            {company && (
              <div className="mt-4 space-y-2 text-sm text-black/70">
                <div>
                  {t("companyLabel")}:{" "}
                  <span className="font-semibold text-black">{company.name}</span>
                </div>
                <div>
                  {t("vatLabel")}:{" "}
                  <span className="font-semibold text-black">{company.vat_uid || "—"}</span>
                </div>
                <div>
                  {t("countryLabel")}:{" "}
                  <span className="font-semibold text-black">{company.country || "—"}</span>
                </div>
                <div>
                  {t("statusLabel")}:{" "}
                  <span className="font-semibold text-black">
                    {hasApprovedAccess ? t("linked") : isPending ? t("pending") : t("notLinked")}
                  </span>
                </div>
              </div>
            )}

            {(statusMsg || statusMsgKey) && (
              <div
                className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
                  statusType === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : statusType === "error"
                    ? "border-red-200 bg-red-50 text-red-800"
                    : "border-black/10 bg-black/[0.03] text-black/70"
                }`}
              >
                {resolvedStatusMsg()}
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              {hasCompanyLink && (
                <Link href={`/companies/${companyId}`} className="rounded-2xl border px-4 py-3">
                  {t("viewPublicCompanyPage")}
                </Link>
              )}

              <Link href="/pricing" className="rounded-2xl border px-4 py-3">
                {t("viewPlans")}
              </Link>

              <button
                onClick={() => {
                  setShowPasswordForm((v) => !v);
                  setStatusType(null);
                  setStatusMsg(null);
                  setStatusMsgKey(null);
                }}
                className="rounded-2xl border px-4 py-3"
              >
                {passwordText.changePassword}
              </button>
            </div>

            {showPasswordForm && (
              <div className="mt-4 rounded-2xl border border-black/10 bg-white/70 p-4 space-y-3">
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder={passwordText.currentPassword}
                  className={input}
                />

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={passwordText.newPassword}
                  className={input}
                />

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={passwordText.confirmPassword}
                  className={input}
                />

                <button
                  onClick={changePassword}
                  disabled={passwordBusy}
                  className="w-full rounded-2xl bg-black px-4 py-3 text-white"
                >
                  {passwordBusy ? passwordText.savingPassword : passwordText.saveNewPassword}
                </button>
              </div>
            )}
          </div>

          <div className="mt-8">
            {isPaid ? (
              <div className={`p-6 ${card}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold">{analyticsText.analyticsTitle}</h2>
                    <p className="mt-1 text-sm text-black/60">
                      {analyticsText.analyticsSubtitle}
                    </p>
                  </div>

                  <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-semibold">
                    {planLabel}
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className={statCard}>
                    <div className="text-xs uppercase tracking-[0.14em] text-black/45">
                      {analyticsText.companyViews30d}
                    </div>
                    <div className="mt-3 text-3xl font-extrabold">
                      {analyticsLoading ? "—" : analytics.views30d}
                    </div>
                  </div>

                  <div className={statCard}>
                    <div className="text-xs uppercase tracking-[0.14em] text-black/45">
                      {analyticsText.uniqueVisitors30d}
                    </div>
                    <div className="mt-3 text-3xl font-extrabold">
                      {analyticsLoading ? "—" : analytics.uniqueVisitors30d}
                    </div>
                  </div>

                  <div className={statCard}>
                    <div className="text-xs uppercase tracking-[0.14em] text-black/45">
                      {analyticsText.newReviews30d}
                    </div>
                    <div className="mt-3 text-3xl font-extrabold">
                      {analyticsLoading ? "—" : analytics.newReviews30d}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={lockedCard}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold">
                      {analyticsText.premiumAnalytics}
                    </h2>
                    <p className="mt-1 text-sm text-black/60 max-w-2xl">
                      {analyticsText.premiumAnalyticsText}
                    </p>
                  </div>

                  <div className="rounded-full border border-black/10 bg-black text-white px-3 py-1 text-xs font-semibold">
                    {analyticsText.paidBadge}
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {[
                    analyticsText.companyViews30d,
                    analyticsText.uniqueVisitors30d,
                    analyticsText.newReviews30d,
                  ].map((label, idx) => (
                    <div key={idx} className={statCard}>
                      <div className="text-xs uppercase tracking-[0.14em] text-black/45">
                        {label}
                      </div>

                      <div className="relative mt-4 h-[46px] overflow-hidden rounded-xl bg-gradient-to-r from-black/[0.03] via-black/[0.05] to-black/[0.03]">
                        <div className="absolute inset-0 flex items-center px-1">
                          <div
                            className="w-full text-[34px] font-black tracking-[-0.06em] text-black/30 blur-[10px] select-none"
                            style={{
                              transform: "scaleX(1.18) skewX(-10deg)",
                              filter: "blur(10px) contrast(1.15)",
                            }}
                          >
                            88 472
                          </div>
                        </div>

                        <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.68)_0px,rgba(255,255,255,0.68)_14px,rgba(255,255,255,0.22)_14px,rgba(255,255,255,0.22)_28px)] opacity-90" />
                        <div className="absolute inset-0 bg-white/22 backdrop-blur-[7px]" />
                        <div className="absolute inset-y-0 left-[16%] w-10 bg-white/55 blur-xl" />
                        <div className="absolute inset-y-0 right-[18%] w-12 bg-white/50 blur-xl" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <Link
                    href="/pricing"
                    className="inline-flex rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white"
                  >
                    {analyticsText.upgradeToPro}
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-extrabold">{t("reviewsTitle")}</h2>

            {reviews.length === 0 ? (
              <div className={`mt-4 p-6 ${card}`}>{t("noPublishedReviews")}</div>
            ) : (
              <div className="space-y-4 mt-4">
                {reviews.map((r) => {
                  const hasReply = Boolean(r.review_replies?.[0]);
                  const disableReplyButton =
                    savingId === r.id || (!hasReply && isLimitReached) || !hasApprovedAccess;

                  return (
                    <div key={r.id} className={`p-6 ${card}`}>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="text-xs text-black/50">
                          {t("reviewDate")}: {formatDate(r.created_at)}
                        </div>

                        {!hasApprovedAccess && (
                          <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-800">
                            {isPending ? t("pending") : t("upgradeRequired")}
                          </div>
                        )}
                      </div>

                      <div className="mt-2 text-sm">{r.review_text}</div>

                      <div className="mt-2 text-xs text-black/50">
                        {t("issue")}: {r.issue_type || "—"} • {t("rating")}: {r.rating || "—"}/5
                      </div>

                      <div className="mt-4 text-sm font-bold">
                        {t("officialCompanyReply")}
                      </div>

                      <textarea
                        rows={5}
                        className={`mt-3 ${input}`}
                        value={replyDraft[r.id] || ""}
                        onChange={(e) =>
                          setReplyDraft((p) => ({
                            ...p,
                            [r.id]: e.target.value,
                          }))
                        }
                        placeholder={t("writeOfficialReply")}
                        disabled={!hasApprovedAccess}
                      />

                      {isFree && !hasReply && isLimitReached && (
                        <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                          {t("upgradeRequiredText")}
                        </div>
                      )}

                      {!hasApprovedAccess && (
                        <div className="mt-3 rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3 text-sm text-black/70">
                          {isPending ? t("claimPending") : t("replyToReviews")}
                        </div>
                      )}

                      <button
                        onClick={() => saveReply(r.id)}
                        disabled={disableReplyButton}
                        className={`mt-3 w-full rounded-2xl px-4 py-3 ${
                          disableReplyButton
                            ? "bg-black/20 text-black/45 cursor-not-allowed"
                            : "bg-black text-white"
                        }`}
                      >
                        {savingId === r.id
                          ? t("saving")
                          : hasReply
                          ? t("updateReply")
                          : t("publishReply")}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-10 text-xs text-black/45">{t("tipReply")}</div>
        </div>
      </div>
    </main>
  );
}