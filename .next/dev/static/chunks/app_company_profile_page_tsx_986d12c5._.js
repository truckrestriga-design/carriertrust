(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/company/profile/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CompanyProfilePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$language$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/language-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const ANALYTICS_TEXT = {
    en: {
        analyticsTitle: "Analytics",
        analyticsSubtitle: "Performance of your company page for the last 30 days.",
        premiumAnalytics: "Premium analytics",
        premiumAnalyticsText: "Upgrade to a paid plan to see company page views, unique visitors and review activity.",
        companyViews30d: "Company views (30d)",
        uniqueVisitors30d: "Unique visitors (30d)",
        newReviews30d: "New reviews (30d)",
        upgradeToPro: "Upgrade to PRO",
        paidBadge: "PRO / ONE MONTH"
    },
    de: {
        analyticsTitle: "Analysen",
        analyticsSubtitle: "Leistung Ihrer Unternehmensseite in den letzten 30 Tagen.",
        premiumAnalytics: "Premium-Analysen",
        premiumAnalyticsText: "Wechseln Sie zu einem kostenpflichtigen Tarif, um Seitenaufrufe, eindeutige Besucher und Bewertungsaktivität zu sehen.",
        companyViews30d: "Unternehmensaufrufe (30 T.)",
        uniqueVisitors30d: "Eindeutige Besucher (30 T.)",
        newReviews30d: "Neue Bewertungen (30 T.)",
        upgradeToPro: "Auf PRO upgraden",
        paidBadge: "PRO / EIN MONAT"
    },
    ru: {
        analyticsTitle: "Аналитика",
        analyticsSubtitle: "Результаты страницы компании за последние 30 дней.",
        premiumAnalytics: "Премиум-аналитика",
        premiumAnalyticsText: "Перейдите на платный тариф, чтобы видеть просмотры страницы компании, уникальных посетителей и активность по отзывам.",
        companyViews30d: "Просмотры компании (30 д.)",
        uniqueVisitors30d: "Уникальные посетители (30 д.)",
        newReviews30d: "Новые отзывы (30 д.)",
        upgradeToPro: "Перейти на PRO",
        paidBadge: "PRO / 1 МЕСЯЦ"
    },
    fr: {
        analyticsTitle: "Analytique",
        analyticsSubtitle: "Performance de la page de votre entreprise sur les 30 derniers jours.",
        premiumAnalytics: "Analytique premium",
        premiumAnalyticsText: "Passez à une offre payante pour voir les vues de page, les visiteurs uniques et l’activité des avis.",
        companyViews30d: "Vues entreprise (30 j)",
        uniqueVisitors30d: "Visiteurs uniques (30 j)",
        newReviews30d: "Nouveaux avis (30 j)",
        upgradeToPro: "Passer à PRO",
        paidBadge: "PRO / UN MOIS"
    },
    es: {
        analyticsTitle: "Analítica",
        analyticsSubtitle: "Rendimiento de la página de tu empresa en los últimos 30 días.",
        premiumAnalytics: "Analítica premium",
        premiumAnalyticsText: "Pásate a un plan de pago para ver visitas de la página, visitantes únicos y actividad de reseñas.",
        companyViews30d: "Visitas empresa (30 d)",
        uniqueVisitors30d: "Visitantes únicos (30 d)",
        newReviews30d: "Nuevas reseñas (30 d)",
        upgradeToPro: "Mejorar a PRO",
        paidBadge: "PRO / UN MES"
    },
    it: {
        analyticsTitle: "Analitica",
        analyticsSubtitle: "Prestazioni della pagina aziendale negli ultimi 30 giorni.",
        premiumAnalytics: "Analitica premium",
        premiumAnalyticsText: "Passa a un piano a pagamento per vedere visite pagina, visitatori unici e attività delle recensioni.",
        companyViews30d: "Visite azienda (30 g)",
        uniqueVisitors30d: "Visitatori unici (30 g)",
        newReviews30d: "Nuove recensioni (30 g)",
        upgradeToPro: "Passa a PRO",
        paidBadge: "PRO / UN MESE"
    }
};
const PASSWORD_TEXT = {
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
        passwordChangedSuccessfully: "Password changed successfully."
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
        passwordChangedSuccessfully: "Passwort erfolgreich geändert."
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
        passwordChangedSuccessfully: "Пароль успешно изменён."
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
        passwordChangedSuccessfully: "Mot de passe modifié avec succès."
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
        passwordChangedSuccessfully: "Contraseña cambiada correctamente."
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
        passwordChangedSuccessfully: "Password cambiata con successo."
    }
};
function normalizeAccessPlan(v) {
    const s = String(v || "free").toLowerCase().trim();
    if (s === "one_month" || s === "one month") return "one_month";
    if (s === "business") return "business";
    if (s === "pro") return "pro";
    return "free";
}
function formatPlanLabel(plan) {
    if (plan === "one_month") return "ONE MONTH";
    return plan.toUpperCase();
}
function formatDate(iso) {
    try {
        return new Date(iso).toLocaleString();
    } catch  {
        return iso;
    }
}
function startOfDaysAgo(days) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
}
function CompanyProfilePage() {
    _s();
    const { t, lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$language$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const safeLang = (lang || "en") in ANALYTICS_TEXT ? lang : "en";
    const analyticsText = ANALYTICS_TEXT[safeLang] || ANALYTICS_TEXT.en;
    const passwordText = PASSWORD_TEXT[safeLang] || PASSWORD_TEXT.en;
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [statusType, setStatusType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [statusMsg, setStatusMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [statusMsgKey, setStatusMsgKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [claimStatus, setClaimStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [companyId, setCompanyId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [company, setCompany] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profilePlan, setProfilePlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("free");
    const [companyPlanRow, setCompanyPlanRow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [reviews, setReviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [replyDraft, setReplyDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [savingId, setSavingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [analyticsLoading, setAnalyticsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [analytics, setAnalytics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        views30d: 0,
        uniqueVisitors30d: 0,
        newReviews30d: 0
    });
    const [showPasswordForm, setShowPasswordForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentPassword, setCurrentPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newPassword, setNewPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [confirmPassword, setConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [passwordBusy, setPasswordBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    function resolvedStatusMsg() {
        if (statusMsgKey) return passwordText[statusMsgKey];
        return statusMsg;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CompanyProfilePage.useEffect": ()=>{
            loadAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["CompanyProfilePage.useEffect"], []);
    const effectivePlan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CompanyProfilePage.useMemo[effectivePlan]": ()=>{
            const companyPlan = normalizeAccessPlan(companyPlanRow?.plan);
            if (companyPlan !== "free") return companyPlan;
            return profilePlan;
        }
    }["CompanyProfilePage.useMemo[effectivePlan]"], [
        companyPlanRow?.plan,
        profilePlan
    ]);
    const isFree = effectivePlan === "free";
    const isPaid = effectivePlan === "pro" || effectivePlan === "business" || effectivePlan === "one_month";
    const planLabel = formatPlanLabel(effectivePlan);
    const repliesUsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CompanyProfilePage.useMemo[repliesUsed]": ()=>{
            const used = Number(companyPlanRow?.replies_used ?? 0);
            return Number.isFinite(used) ? Math.max(0, used) : 0;
        }
    }["CompanyProfilePage.useMemo[repliesUsed]"], [
        companyPlanRow
    ]);
    const isLimitReached = isFree && repliesUsed >= 1;
    const hasCompanyLink = Boolean(companyId);
    const hasApprovedAccess = claimStatus === "approved";
    const isPending = claimStatus === "pending";
    async function loadAll() {
        setLoading(true);
        setStatusType(null);
        setStatusMsg(null);
        setStatusMsgKey(null);
        const { data: u } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
        const user = u?.user;
        if (!user) {
            window.location.href = "/auth";
            return;
        }
        const { data: prof } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("profiles").select("plan").eq("id", user.id).maybeSingle();
        setProfilePlan(normalizeAccessPlan(prof?.plan));
        const { data: claims } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("company_claims").select("company_id, status, created_at").eq("claimant_user_id", user.id).in("status", [
            "approved",
            "pending"
        ]).order("created_at", {
            ascending: false
        }).limit(10);
        const approvedClaim = (claims || []).find((c)=>c.status === "approved") || null;
        const pendingClaim = (claims || []).find((c)=>c.status === "pending") || null;
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
                newReviews30d: 0
            });
            setLoading(false);
            return;
        }
        setClaimStatus(activeClaim.status);
        setCompanyId(activeClaim.company_id);
        const [{ data: c }, { data: pr }, { data: r }] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("companies").select("id, name, vat_uid, country").eq("id", activeClaim.company_id).single(),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("company_plans").select("plan, replies_limit, replies_used").eq("company_id", activeClaim.company_id).maybeSingle(),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("reviews").select("id, created_at, rating, issue_type, review_text, review_replies(id, reply_text, updated_at)").eq("company_id", activeClaim.company_id).eq("status", "published").order("created_at", {
                ascending: false
            })
        ]);
        setCompany(c || null);
        setCompanyPlanRow(pr || null);
        const rows = r || [];
        setReviews(rows);
        const d = {};
        rows.forEach((rev)=>{
            d[rev.id] = rev.review_replies?.[0]?.reply_text || "";
        });
        setReplyDraft(d);
        const nextPlan = normalizeAccessPlan(pr?.plan);
        if (nextPlan === "pro" || nextPlan === "business" || nextPlan === "one_month") {
            await loadAnalytics(activeClaim.company_id);
        } else {
            setAnalytics({
                views30d: 0,
                uniqueVisitors30d: 0,
                newReviews30d: 0
            });
        }
        setLoading(false);
    }
    async function loadAnalytics(targetCompanyId) {
        setAnalyticsLoading(true);
        const since30d = startOfDaysAgo(30);
        const [{ data: visits, error: visitsError }, { count: reviewsCount, error: reviewsError }] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("site_visits").select("visitor_id").eq("event_type", "company_view").eq("company_id", targetCompanyId).gte("created_at", since30d),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("reviews").select("id", {
                count: "exact",
                head: true
            }).eq("company_id", targetCompanyId).eq("status", "published").gte("created_at", since30d)
        ]);
        if (visitsError || reviewsError) {
            setAnalytics({
                views30d: 0,
                uniqueVisitors30d: 0,
                newReviews30d: 0
            });
            setAnalyticsLoading(false);
            return;
        }
        const visitRows = visits || [] || [];
        const uniqueVisitors = new Set(visitRows.map((v)=>(v.visitor_id || "").trim()).filter(Boolean)).size;
        setAnalytics({
            views30d: visitRows.length,
            uniqueVisitors30d: uniqueVisitors,
            newReviews30d: reviewsCount || 0
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
        const { data: userRes, error: userErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
        const email = userRes?.user?.email;
        if (userErr || !email) {
            setStatusType("error");
            setStatusMsgKey("currentPasswordIncorrect");
            setPasswordBusy(false);
            return;
        }
        const { error: signInError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
            email,
            password: currentPassword
        });
        if (signInError) {
            setStatusType("error");
            setStatusMsgKey("currentPasswordIncorrect");
            setPasswordBusy(false);
            return;
        }
        const { error: updateError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.updateUser({
            password: newPassword
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
    async function saveReply(reviewId) {
        if (!companyId) return;
        const text = (replyDraft[reviewId] || "").trim();
        if (text.length < 2) return;
        setSavingId(reviewId);
        setStatusType(null);
        setStatusMsg(null);
        setStatusMsgKey(null);
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].functions.invoke("company-replies", {
            method: "PATCH",
            body: {
                review_id: reviewId,
                reply_text: text
            }
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
    const hero = "rounded-[28px] border border-black/10 bg-white/70 backdrop-blur shadow-[0_14px_60px_rgba(15,20,30,0.08)]";
    const card = "rounded-[22px] border border-black/10 bg-white/60 backdrop-blur shadow-sm";
    const input = "w-full rounded-2xl border border-black/10 bg-white/85 px-4 py-3 outline-none";
    const statCard = "relative overflow-hidden rounded-[22px] border border-black/10 bg-white/75 backdrop-blur shadow-sm p-5";
    const lockedCard = "rounded-[22px] border border-black/10 bg-gradient-to-br from-white/80 to-black/[0.03] backdrop-blur shadow-sm p-6";
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen text-black",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 pt-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto",
                    children: t("loading")
                }, void 0, false, {
                    fileName: "[project]/app/company/profile/page.tsx",
                    lineNumber: 582,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/company/profile/page.tsx",
                lineNumber: 581,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/company/profile/page.tsx",
            lineNumber: 580,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen text-black",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-6 pt-45 pb-16",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-6 ${hero}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-start justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-3xl font-extrabold",
                                                children: t("companyDashboard")
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/profile/page.tsx",
                                                lineNumber: 595,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-semibold tracking-wide",
                                                children: [
                                                    t("plan"),
                                                    ": ",
                                                    planLabel
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/profile/page.tsx",
                                                lineNumber: 596,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/profile/page.tsx",
                                        lineNumber: 594,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right text-sm text-black/60",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                t("repliesUsed"),
                                                ":",
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold text-black",
                                                    children: repliesUsed
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/profile/page.tsx",
                                                    lineNumber: 604,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/profile/page.tsx",
                                            lineNumber: 602,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/profile/page.tsx",
                                        lineNumber: 601,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/profile/page.tsx",
                                lineNumber: 593,
                                columnNumber: 13
                            }, this),
                            company && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 space-y-2 text-sm text-black/70",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            t("companyLabel"),
                                            ":",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-black",
                                                children: company.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/profile/page.tsx",
                                                lineNumber: 613,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/profile/page.tsx",
                                        lineNumber: 611,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            t("vatLabel"),
                                            ":",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-black",
                                                children: company.vat_uid || "—"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/profile/page.tsx",
                                                lineNumber: 617,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/profile/page.tsx",
                                        lineNumber: 615,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            t("countryLabel"),
                                            ":",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-black",
                                                children: company.country || "—"
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/profile/page.tsx",
                                                lineNumber: 621,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/profile/page.tsx",
                                        lineNumber: 619,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            t("statusLabel"),
                                            ":",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-black",
                                                children: hasApprovedAccess ? t("linked") : isPending ? t("pending") : t("notLinked")
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/profile/page.tsx",
                                                lineNumber: 625,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/company/profile/page.tsx",
                                        lineNumber: 623,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/profile/page.tsx",
                                lineNumber: 610,
                                columnNumber: 15
                            }, this),
                            (statusMsg || statusMsgKey) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `mt-5 rounded-2xl border px-4 py-3 text-sm ${statusType === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : statusType === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-black/10 bg-black/[0.03] text-black/70"}`,
                                children: resolvedStatusMsg()
                            }, void 0, false, {
                                fileName: "[project]/app/company/profile/page.tsx",
                                lineNumber: 633,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 flex flex-wrap gap-3",
                                children: [
                                    hasCompanyLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/companies/${companyId}`,
                                        className: "rounded-2xl border px-4 py-3",
                                        children: t("viewPublicCompanyPage")
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/profile/page.tsx",
                                        lineNumber: 648,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/pricing",
                                        className: "rounded-2xl border px-4 py-3",
                                        children: t("viewPlans")
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/profile/page.tsx",
                                        lineNumber: 653,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowPasswordForm((v)=>!v);
                                            setStatusType(null);
                                            setStatusMsg(null);
                                            setStatusMsgKey(null);
                                        },
                                        className: "rounded-2xl border px-4 py-3",
                                        children: passwordText.changePassword
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/profile/page.tsx",
                                        lineNumber: 657,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/profile/page.tsx",
                                lineNumber: 646,
                                columnNumber: 13
                            }, this),
                            showPasswordForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 rounded-2xl border border-black/10 bg-white/70 p-4 space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "password",
                                        value: currentPassword,
                                        onChange: (e)=>setCurrentPassword(e.target.value),
                                        placeholder: passwordText.currentPassword,
                                        className: input
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/profile/page.tsx",
                                        lineNumber: 672,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "password",
                                        value: newPassword,
                                        onChange: (e)=>setNewPassword(e.target.value),
                                        placeholder: passwordText.newPassword,
                                        className: input
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/profile/page.tsx",
                                        lineNumber: 680,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "password",
                                        value: confirmPassword,
                                        onChange: (e)=>setConfirmPassword(e.target.value),
                                        placeholder: passwordText.confirmPassword,
                                        className: input
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/profile/page.tsx",
                                        lineNumber: 688,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: changePassword,
                                        disabled: passwordBusy,
                                        className: "w-full rounded-2xl bg-black px-4 py-3 text-white",
                                        children: passwordBusy ? passwordText.savingPassword : passwordText.saveNewPassword
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/profile/page.tsx",
                                        lineNumber: 696,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/company/profile/page.tsx",
                                lineNumber: 671,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/profile/page.tsx",
                        lineNumber: 592,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8",
                        children: isPaid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `p-6 ${card}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-xl font-extrabold",
                                                    children: analyticsText.analyticsTitle
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/profile/page.tsx",
                                                    lineNumber: 712,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-sm text-black/60",
                                                    children: analyticsText.analyticsSubtitle
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/profile/page.tsx",
                                                    lineNumber: 713,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/profile/page.tsx",
                                            lineNumber: 711,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-semibold",
                                            children: planLabel
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/profile/page.tsx",
                                            lineNumber: 718,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/profile/page.tsx",
                                    lineNumber: 710,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 grid gap-4 md:grid-cols-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: statCard,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs uppercase tracking-[0.14em] text-black/45",
                                                    children: analyticsText.companyViews30d
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/profile/page.tsx",
                                                    lineNumber: 725,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 text-3xl font-extrabold",
                                                    children: analyticsLoading ? "—" : analytics.views30d
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/profile/page.tsx",
                                                    lineNumber: 728,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/profile/page.tsx",
                                            lineNumber: 724,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: statCard,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs uppercase tracking-[0.14em] text-black/45",
                                                    children: analyticsText.uniqueVisitors30d
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/profile/page.tsx",
                                                    lineNumber: 734,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 text-3xl font-extrabold",
                                                    children: analyticsLoading ? "—" : analytics.uniqueVisitors30d
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/profile/page.tsx",
                                                    lineNumber: 737,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/profile/page.tsx",
                                            lineNumber: 733,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: statCard,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs uppercase tracking-[0.14em] text-black/45",
                                                    children: analyticsText.newReviews30d
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/profile/page.tsx",
                                                    lineNumber: 743,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 text-3xl font-extrabold",
                                                    children: analyticsLoading ? "—" : analytics.newReviews30d
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/profile/page.tsx",
                                                    lineNumber: 746,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/profile/page.tsx",
                                            lineNumber: 742,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/profile/page.tsx",
                                    lineNumber: 723,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/profile/page.tsx",
                            lineNumber: 709,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: lockedCard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-start justify-between gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-xl font-extrabold",
                                                    children: analyticsText.premiumAnalytics
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/profile/page.tsx",
                                                    lineNumber: 756,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-sm text-black/60 max-w-2xl",
                                                    children: analyticsText.premiumAnalyticsText
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/profile/page.tsx",
                                                    lineNumber: 759,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/company/profile/page.tsx",
                                            lineNumber: 755,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-full border border-black/10 bg-black text-white px-3 py-1 text-xs font-semibold",
                                            children: analyticsText.paidBadge
                                        }, void 0, false, {
                                            fileName: "[project]/app/company/profile/page.tsx",
                                            lineNumber: 764,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/company/profile/page.tsx",
                                    lineNumber: 754,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 grid gap-4 md:grid-cols-3",
                                    children: [
                                        analyticsText.companyViews30d,
                                        analyticsText.uniqueVisitors30d,
                                        analyticsText.newReviews30d
                                    ].map((label, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: statCard,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs uppercase tracking-[0.14em] text-black/45",
                                                    children: label
                                                }, void 0, false, {
                                                    fileName: "[project]/app/company/profile/page.tsx",
                                                    lineNumber: 776,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative mt-4 h-[46px] overflow-hidden rounded-xl bg-gradient-to-r from-black/[0.03] via-black/[0.05] to-black/[0.03]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 flex items-center px-1",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-full text-[34px] font-black tracking-[-0.06em] text-black/30 blur-[10px] select-none",
                                                                style: {
                                                                    transform: "scaleX(1.18) skewX(-10deg)",
                                                                    filter: "blur(10px) contrast(1.15)"
                                                                },
                                                                children: "88 472"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/company/profile/page.tsx",
                                                                lineNumber: 782,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/profile/page.tsx",
                                                            lineNumber: 781,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.68)_0px,rgba(255,255,255,0.68)_14px,rgba(255,255,255,0.22)_14px,rgba(255,255,255,0.22)_28px)] opacity-90"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/profile/page.tsx",
                                                            lineNumber: 793,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 bg-white/22 backdrop-blur-[7px]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/profile/page.tsx",
                                                            lineNumber: 794,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-y-0 left-[16%] w-10 bg-white/55 blur-xl"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/profile/page.tsx",
                                                            lineNumber: 795,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-y-0 right-[18%] w-12 bg-white/50 blur-xl"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/company/profile/page.tsx",
                                                            lineNumber: 796,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/company/profile/page.tsx",
                                                    lineNumber: 780,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, idx, true, {
                                            fileName: "[project]/app/company/profile/page.tsx",
                                            lineNumber: 775,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/company/profile/page.tsx",
                                    lineNumber: 769,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/pricing",
                                        className: "inline-flex rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white",
                                        children: analyticsText.upgradeToPro
                                    }, void 0, false, {
                                        fileName: "[project]/app/company/profile/page.tsx",
                                        lineNumber: 803,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/company/profile/page.tsx",
                                    lineNumber: 802,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/profile/page.tsx",
                            lineNumber: 753,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/company/profile/page.tsx",
                        lineNumber: 707,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-extrabold",
                                children: t("reviewsTitle")
                            }, void 0, false, {
                                fileName: "[project]/app/company/profile/page.tsx",
                                lineNumber: 815,
                                columnNumber: 13
                            }, this),
                            reviews.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `mt-4 p-6 ${card}`,
                                children: t("noPublishedReviews")
                            }, void 0, false, {
                                fileName: "[project]/app/company/profile/page.tsx",
                                lineNumber: 818,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4 mt-4",
                                children: reviews.map((r)=>{
                                    const hasReply = Boolean(r.review_replies?.[0]);
                                    const disableReplyButton = savingId === r.id || !hasReply && isLimitReached || !hasApprovedAccess;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `p-6 ${card}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-start justify-between gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-black/50",
                                                        children: [
                                                            t("reviewDate"),
                                                            ": ",
                                                            formatDate(r.created_at)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/company/profile/page.tsx",
                                                        lineNumber: 829,
                                                        columnNumber: 25
                                                    }, this),
                                                    !hasApprovedAccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-800",
                                                        children: isPending ? t("pending") : t("upgradeRequired")
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/company/profile/page.tsx",
                                                        lineNumber: 834,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/profile/page.tsx",
                                                lineNumber: 828,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 text-sm",
                                                children: r.review_text
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/profile/page.tsx",
                                                lineNumber: 840,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 text-xs text-black/50",
                                                children: [
                                                    t("issue"),
                                                    ": ",
                                                    r.issue_type || "—",
                                                    " • ",
                                                    t("rating"),
                                                    ": ",
                                                    r.rating || "—",
                                                    "/5"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/company/profile/page.tsx",
                                                lineNumber: 842,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 text-sm font-bold",
                                                children: t("officialCompanyReply")
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/profile/page.tsx",
                                                lineNumber: 846,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                rows: 5,
                                                className: `mt-3 ${input}`,
                                                value: replyDraft[r.id] || "",
                                                onChange: (e)=>setReplyDraft((p)=>({
                                                            ...p,
                                                            [r.id]: e.target.value
                                                        })),
                                                placeholder: t("writeOfficialReply"),
                                                disabled: !hasApprovedAccess
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/profile/page.tsx",
                                                lineNumber: 850,
                                                columnNumber: 23
                                            }, this),
                                            isFree && !hasReply && isLimitReached && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800",
                                                children: t("upgradeRequiredText")
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/profile/page.tsx",
                                                lineNumber: 865,
                                                columnNumber: 25
                                            }, this),
                                            !hasApprovedAccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3 text-sm text-black/70",
                                                children: isPending ? t("claimPending") : t("replyToReviews")
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/profile/page.tsx",
                                                lineNumber: 871,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>saveReply(r.id),
                                                disabled: disableReplyButton,
                                                className: `mt-3 w-full rounded-2xl px-4 py-3 ${disableReplyButton ? "bg-black/20 text-black/45 cursor-not-allowed" : "bg-black text-white"}`,
                                                children: savingId === r.id ? t("saving") : hasReply ? t("updateReply") : t("publishReply")
                                            }, void 0, false, {
                                                fileName: "[project]/app/company/profile/page.tsx",
                                                lineNumber: 876,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, r.id, true, {
                                        fileName: "[project]/app/company/profile/page.tsx",
                                        lineNumber: 827,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/company/profile/page.tsx",
                                lineNumber: 820,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/company/profile/page.tsx",
                        lineNumber: 814,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-10 text-xs text-black/45",
                        children: t("tipReply")
                    }, void 0, false, {
                        fileName: "[project]/app/company/profile/page.tsx",
                        lineNumber: 898,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/company/profile/page.tsx",
                lineNumber: 591,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/company/profile/page.tsx",
            lineNumber: 590,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/company/profile/page.tsx",
        lineNumber: 589,
        columnNumber: 5
    }, this);
}
_s(CompanyProfilePage, "KNeDY8Cr0v6SjrvVISdz49FWGgE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$language$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = CompanyProfilePage;
var _c;
__turbopack_context__.k.register(_c, "CompanyProfilePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_company_profile_page_tsx_986d12c5._.js.map