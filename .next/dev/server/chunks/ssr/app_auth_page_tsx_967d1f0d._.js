module.exports = [
"[project]/app/auth/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$language$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/language-context.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const TEXT = {
    en: {
        brandTagline: "EU logistics reputation network",
        loading: "Loading…",
        claimSubtitle: "Login or register to claim your selected company.",
        reviewSubtitle: "Create an account to write a review.",
        resetSubtitle: "Set a new password for your account.",
        login: "Login",
        register: "Register",
        resetPassword: "Reset password",
        forgotPassword: "Forgot password?",
        sendResetLink: "Send reset link",
        backToLogin: "Back to login",
        newPasswordPlaceholder: "New password",
        confirmPasswordPlaceholder: "Confirm new password",
        passwordResetEmailSent: "If an account with this email exists, a reset link has been sent.",
        passwordUpdated: "Password updated successfully. You can now log in.",
        passwordsDoNotMatch: "Passwords do not match.",
        enterEmailFirst: "Enter your email first.",
        resetEmailPlaceholder: "Enter your email",
        cancel: "Cancel",
        companyNamePlaceholder: "YOUR COMPANY NAME",
        companyVatPlaceholder: "YOUR COMPANY VAT NUMBER",
        country: "Country",
        selectCountry: "Select country…",
        countryHelp: "If country is not detected from VAT, please select it manually.",
        existingCompanies: "Existing companies",
        searching: "Searching…",
        noMatchingCompanies: "No matching companies found.",
        existingCompaniesHint: "If your company is already in CarrierTrust, select it below.",
        vatLabel: "VAT",
        companyFallback: "Company",
        exactVatMatchFound: "Exact VAT match found",
        similarCompanyName: "Similar company name",
        vatAlreadyExistsMustSelect: "A company with this VAT already exists. You must select it to continue.",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Password",
        agreePrefix: "I agree to the",
        terms: "Terms",
        privacyPolicy: "Privacy Policy",
        reviewPolicy: "Review Policy",
        pleaseAcceptPolicies: "Please accept Terms, Privacy Policy and Review Policy.",
        pleaseFillAllFields: "Please fill all fields.",
        pleaseSelectCountry: "Please select company country.",
        accountCreated: "Account created successfully. Please check your email and confirm your account before logging in.",
        pleaseWait: "Please wait...",
        ifCountryNotDetected: "If country is not detected from VAT, please select it manually.",
        loginOrRegisterToClaim: "Login or register to claim your selected company.",
        createAccountToReview: "Create an account to write a review."
    },
    de: {
        brandTagline: "EU-Netzwerk für Logistik-Reputation",
        loading: "Lädt…",
        claimSubtitle: "Melden Sie sich an oder registrieren Sie sich, um Ihr ausgewähltes Unternehmen zu beanspruchen.",
        reviewSubtitle: "Erstellen Sie ein Konto, um eine Bewertung zu schreiben.",
        resetSubtitle: "Legen Sie ein neues Passwort für Ihr Konto fest.",
        login: "Login",
        register: "Registrieren",
        resetPassword: "Passwort zurücksetzen",
        forgotPassword: "Passwort vergessen?",
        sendResetLink: "Reset-Link senden",
        backToLogin: "Zurück zum Login",
        newPasswordPlaceholder: "Neues Passwort",
        confirmPasswordPlaceholder: "Neues Passwort bestätigen",
        passwordResetEmailSent: "Wenn ein Konto mit dieser E-Mail existiert, wurde ein Link zum Zurücksetzen gesendet.",
        passwordUpdated: "Passwort erfolgreich aktualisiert. Sie können sich jetzt anmelden.",
        passwordsDoNotMatch: "Die Passwörter stimmen nicht überein.",
        enterEmailFirst: "Bitte geben Sie zuerst Ihre E-Mail ein.",
        resetEmailPlaceholder: "Ihre E-Mail eingeben",
        cancel: "Abbrechen",
        companyNamePlaceholder: "IHR FIRMENNAME",
        companyVatPlaceholder: "IHRE UST-IDNR.",
        country: "Land",
        selectCountry: "Land auswählen…",
        countryHelp: "Wenn das Land nicht anhand der USt-IdNr. erkannt wird, wählen Sie es bitte manuell aus.",
        existingCompanies: "Bestehende Unternehmen",
        searching: "Suche…",
        noMatchingCompanies: "Keine passenden Unternehmen gefunden.",
        existingCompaniesHint: "Wenn Ihr Unternehmen bereits bei CarrierTrust existiert, wählen Sie es unten aus.",
        vatLabel: "USt-IdNr.",
        companyFallback: "Unternehmen",
        exactVatMatchFound: "Exakte USt-IdNr.-Übereinstimmung gefunden",
        similarCompanyName: "Ähnlicher Firmenname",
        vatAlreadyExistsMustSelect: "Ein Unternehmen mit dieser USt-IdNr. existiert bereits. Sie müssen es auswählen, um fortzufahren.",
        emailPlaceholder: "E-Mail",
        passwordPlaceholder: "Passwort",
        agreePrefix: "Ich stimme den",
        terms: "Bedingungen",
        privacyPolicy: "Datenschutzrichtlinie",
        reviewPolicy: "Bewertungsrichtlinie",
        pleaseAcceptPolicies: "Bitte akzeptieren Sie die Bedingungen, die Datenschutzrichtlinie und die Bewertungsrichtlinie.",
        pleaseFillAllFields: "Bitte füllen Sie alle Felder aus.",
        pleaseSelectCountry: "Bitte wählen Sie das Firmenland aus.",
        accountCreated: "Konto erfolgreich erstellt. Bitte prüfen Sie Ihre E-Mails und bestätigen Sie Ihr Konto, bevor Sie sich anmelden.",
        pleaseWait: "Bitte warten...",
        ifCountryNotDetected: "Wenn das Land nicht anhand der USt-IdNr. erkannt wird, wählen Sie es bitte manuell aus.",
        loginOrRegisterToClaim: "Melden Sie sich an oder registrieren Sie sich, um Ihr ausgewähltes Unternehmen zu beanspruchen.",
        createAccountToReview: "Erstellen Sie ein Konto, um eine Bewertung zu schreiben."
    },
    ru: {
        brandTagline: "Европейская сеть репутации в логистике",
        loading: "Загрузка…",
        claimSubtitle: "Войдите или зарегистрируйтесь, чтобы подтвердить права на выбранную компанию.",
        reviewSubtitle: "Создайте аккаунт, чтобы оставить отзыв.",
        resetSubtitle: "Установите новый пароль для аккаунта.",
        login: "Вход",
        register: "Регистрация",
        resetPassword: "Сброс пароля",
        forgotPassword: "Забыли пароль?",
        sendResetLink: "Отправить ссылку",
        backToLogin: "Назад ко входу",
        newPasswordPlaceholder: "Новый пароль",
        confirmPasswordPlaceholder: "Подтвердите новый пароль",
        passwordResetEmailSent: "Если аккаунт с таким email существует, ссылка для сброса пароля уже отправлена.",
        passwordUpdated: "Пароль успешно обновлён. Теперь можете войти.",
        passwordsDoNotMatch: "Пароли не совпадают.",
        enterEmailFirst: "Сначала введите email.",
        resetEmailPlaceholder: "Введите ваш email",
        cancel: "Отмена",
        companyNamePlaceholder: "НАЗВАНИЕ ВАШЕЙ КОМПАНИИ",
        companyVatPlaceholder: "VAT НОМЕР ВАШЕЙ КОМПАНИИ",
        country: "Страна",
        selectCountry: "Выберите страну…",
        countryHelp: "Если страна не определилась по VAT, пожалуйста, выберите её вручную.",
        existingCompanies: "Существующие компании",
        searching: "Поиск…",
        noMatchingCompanies: "Подходящие компании не найдены.",
        existingCompaniesHint: "Если ваша компания уже есть в CarrierTrust, выберите её ниже.",
        vatLabel: "VAT",
        companyFallback: "Компания",
        exactVatMatchFound: "Найдено точное совпадение по VAT",
        similarCompanyName: "Похожее название компании",
        vatAlreadyExistsMustSelect: "Компания с таким VAT уже существует. Чтобы продолжить, нужно выбрать её.",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Пароль",
        agreePrefix: "Я принимаю",
        terms: "Условия",
        privacyPolicy: "Политику конфиденциальности",
        reviewPolicy: "Политику отзывов",
        pleaseAcceptPolicies: "Пожалуйста, примите Условия, Политику конфиденциальности и Политику отзывов.",
        pleaseFillAllFields: "Пожалуйста, заполните все поля.",
        pleaseSelectCountry: "Пожалуйста, выберите страну компании.",
        accountCreated: "Аккаунт успешно создан. Пожалуйста, проверьте почту и подтвердите аккаунт перед входом.",
        pleaseWait: "Пожалуйста, подождите...",
        ifCountryNotDetected: "Если страна не определилась по VAT, пожалуйста, выберите её вручную.",
        loginOrRegisterToClaim: "Войдите или зарегистрируйтесь, чтобы подтвердить права на выбранную компанию.",
        createAccountToReview: "Создайте аккаунт, чтобы оставить отзыв."
    },
    fr: {
        brandTagline: "Réseau européen de réputation logistique",
        loading: "Chargement…",
        claimSubtitle: "Connectez-vous ou créez un compte pour revendiquer l’entreprise sélectionnée.",
        reviewSubtitle: "Créez un compte pour publier un avis.",
        resetSubtitle: "Définissez un nouveau mot de passe pour votre compte.",
        login: "Connexion",
        register: "Inscription",
        resetPassword: "Réinitialiser le mot de passe",
        forgotPassword: "Mot de passe oublié ?",
        sendResetLink: "Envoyer le lien",
        backToLogin: "Retour à la connexion",
        newPasswordPlaceholder: "Nouveau mot de passe",
        confirmPasswordPlaceholder: "Confirmez le nouveau mot de passe",
        passwordResetEmailSent: "Si un compte avec cet email existe, un lien de réinitialisation a été envoyé.",
        passwordUpdated: "Mot de passe mis à jour avec succès. Vous pouvez maintenant vous connecter.",
        passwordsDoNotMatch: "Les mots de passe ne correspondent pas.",
        enterEmailFirst: "Saisissez d’abord votre email.",
        resetEmailPlaceholder: "Entrez votre email",
        cancel: "Annuler",
        companyNamePlaceholder: "NOM DE VOTRE ENTREPRISE",
        companyVatPlaceholder: "NUMÉRO DE TVA DE VOTRE ENTREPRISE",
        country: "Pays",
        selectCountry: "Sélectionnez un pays…",
        countryHelp: "Si le pays n’est pas détecté à partir du numéro de TVA, veuillez le sélectionner manuellement.",
        existingCompanies: "Entreprises existantes",
        searching: "Recherche…",
        noMatchingCompanies: "Aucune entreprise correspondante trouvée.",
        existingCompaniesHint: "Si votre entreprise existe déjà sur CarrierTrust, sélectionnez-la ci-dessous.",
        vatLabel: "TVA",
        companyFallback: "Entreprise",
        exactVatMatchFound: "Correspondance exacte de TVA trouvée",
        similarCompanyName: "Nom d’entreprise similaire",
        vatAlreadyExistsMustSelect: "Une entreprise avec ce numéro de TVA existe déjà. Vous devez la sélectionner pour continuer.",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Mot de passe",
        agreePrefix: "J’accepte les",
        terms: "Conditions",
        privacyPolicy: "Politique de confidentialité",
        reviewPolicy: "Politique des avis",
        pleaseAcceptPolicies: "Veuillez accepter les Conditions, la Politique de confidentialité et la Politique des avis.",
        pleaseFillAllFields: "Veuillez remplir tous les champs.",
        pleaseSelectCountry: "Veuillez sélectionner le pays de l’entreprise.",
        accountCreated: "Compte créé avec succès. Veuillez vérifier votre email et confirmer votre compte avant de vous connecter.",
        pleaseWait: "Veuillez patienter...",
        ifCountryNotDetected: "Si le pays n’est pas détecté à partir du numéro de TVA, veuillez le sélectionner manuellement.",
        loginOrRegisterToClaim: "Connectez-vous ou créez un compte pour revendiquer l’entreprise sélectionnée.",
        createAccountToReview: "Créez un compte pour publier un avis."
    },
    es: {
        brandTagline: "Red europea de reputación logística",
        loading: "Cargando…",
        claimSubtitle: "Inicia sesión o regístrate para reclamar tu empresa seleccionada.",
        reviewSubtitle: "Crea una cuenta para escribir una reseña.",
        resetSubtitle: "Establece una nueva contraseña para tu cuenta.",
        login: "Iniciar sesión",
        register: "Registrarse",
        resetPassword: "Restablecer contraseña",
        forgotPassword: "Olvidaste tu contraseña?",
        sendResetLink: "Enviar enlace",
        backToLogin: "Volver al login",
        newPasswordPlaceholder: "Nueva contraseña",
        confirmPasswordPlaceholder: "Confirmar nueva contraseña",
        passwordResetEmailSent: "Si existe una cuenta con este email, se ha enviado un enlace para restablecer la contraseña.",
        passwordUpdated: "Contraseña actualizada correctamente. Ahora puedes iniciar sesión.",
        passwordsDoNotMatch: "Las contraseñas no coinciden.",
        enterEmailFirst: "Primero introduce tu email.",
        resetEmailPlaceholder: "Introduce tu email",
        cancel: "Cancelar",
        companyNamePlaceholder: "NOMBRE DE TU EMPRESA",
        companyVatPlaceholder: "NÚMERO DE VAT DE TU EMPRESA",
        country: "País",
        selectCountry: "Selecciona un país…",
        countryHelp: "Si el país no se detecta a partir del VAT, selecciónalo manualmente.",
        existingCompanies: "Empresas existentes",
        searching: "Buscando…",
        noMatchingCompanies: "No se encontraron empresas coincidentes.",
        existingCompaniesHint: "Si tu empresa ya existe en CarrierTrust, selecciónala abajo.",
        vatLabel: "VAT",
        companyFallback: "Empresa",
        exactVatMatchFound: "Se encontró una coincidencia exacta de VAT",
        similarCompanyName: "Nombre de empresa similar",
        vatAlreadyExistsMustSelect: "Ya existe una empresa con este VAT. Debes seleccionarla para continuar.",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Contraseña",
        agreePrefix: "Acepto los",
        terms: "Términos",
        privacyPolicy: "Política de privacidad",
        reviewPolicy: "Política de reseñas",
        pleaseAcceptPolicies: "Acepta los Términos, la Política de privacidad y la Política de reseñas.",
        pleaseFillAllFields: "Por favor, completa todos los campos.",
        pleaseSelectCountry: "Por favor, selecciona el país de la empresa.",
        accountCreated: "Cuenta creada correctamente. Revisa tu correo y confirma tu cuenta antes de iniciar sesión.",
        pleaseWait: "Por favor, espera...",
        ifCountryNotDetected: "Si el país no se detecta a partir del VAT, selecciónalo manualmente.",
        loginOrRegisterToClaim: "Inicia sesión o regístrate para reclamar tu empresa seleccionada.",
        createAccountToReview: "Crea una cuenta para escribir una reseña."
    },
    it: {
        brandTagline: "Rete europea di reputazione logistica",
        loading: "Caricamento…",
        claimSubtitle: "Accedi o registrati per rivendicare l’azienda selezionata.",
        reviewSubtitle: "Crea un account per scrivere una recensione.",
        resetSubtitle: "Imposta una nuova password per il tuo account.",
        login: "Accedi",
        register: "Registrati",
        resetPassword: "Reimposta password",
        forgotPassword: "Password dimenticata?",
        sendResetLink: "Invia link",
        backToLogin: "Torna al login",
        newPasswordPlaceholder: "Nuova password",
        confirmPasswordPlaceholder: "Conferma nuova password",
        passwordResetEmailSent: "Se esiste un account con questa email, è stato inviato un link per reimpostare la password.",
        passwordUpdated: "Password aggiornata con successo. Ora puoi accedere.",
        passwordsDoNotMatch: "Le password non coincidono.",
        enterEmailFirst: "Inserisci prima la tua email.",
        resetEmailPlaceholder: "Inserisci la tua email",
        cancel: "Annulla",
        companyNamePlaceholder: "NOME DELLA TUA AZIENDA",
        companyVatPlaceholder: "NUMERO VAT DELLA TUA AZIENDA",
        country: "Paese",
        selectCountry: "Seleziona paese…",
        countryHelp: "Se il paese non viene rilevato dal VAT, selezionalo manualmente.",
        existingCompanies: "Aziende esistenti",
        searching: "Ricerca…",
        noMatchingCompanies: "Nessuna azienda corrispondente trovata.",
        existingCompaniesHint: "Se la tua azienda esiste già su CarrierTrust, selezionala qui sotto.",
        vatLabel: "VAT",
        companyFallback: "Azienda",
        exactVatMatchFound: "Trovata corrispondenza esatta del VAT",
        similarCompanyName: "Nome azienda simile",
        vatAlreadyExistsMustSelect: "Esiste già un’azienda con questo VAT. Devi selezionarla per continuare.",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Password",
        agreePrefix: "Accetto i",
        terms: "Termini",
        privacyPolicy: "Informativa sulla privacy",
        reviewPolicy: "Policy recensioni",
        pleaseAcceptPolicies: "Accetta i Termini, l’Informativa sulla privacy e la Policy recensioni.",
        pleaseFillAllFields: "Compila tutti i campi.",
        pleaseSelectCountry: "Seleziona il paese dell’azienda.",
        accountCreated: "Account creato con successo. Controlla la tua email e conferma il tuo account prima di accedere.",
        pleaseWait: "Attendere prego...",
        ifCountryNotDetected: "Se il paese non viene rilevato dal VAT, selezionalo manualmente.",
        loginOrRegisterToClaim: "Accedi o registrati per rivendicare l’azienda selezionata.",
        createAccountToReview: "Crea un account per scrivere una recensione."
    }
};
const COUNTRY_OPTIONS = [
    "Albania",
    "Austria",
    "Belgium",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Ireland",
    "Italy",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Netherlands",
    "Poland",
    "Portugal",
    "Romania",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden"
];
function detectCountryFromVat(vatRaw) {
    const vat = String(vatRaw || "").trim().toUpperCase();
    if (vat.startsWith("EE")) return "Estonia";
    if (vat.startsWith("LV")) return "Latvia";
    if (vat.startsWith("LT")) return "Lithuania";
    if (vat.startsWith("PL")) return "Poland";
    if (vat.startsWith("DE")) return "Germany";
    if (vat.startsWith("FR")) return "France";
    if (vat.startsWith("ES")) return "Spain";
    if (vat.startsWith("IT")) return "Italy";
    if (vat.startsWith("NL")) return "Netherlands";
    if (vat.startsWith("BE")) return "Belgium";
    if (vat.startsWith("LU")) return "Luxembourg";
    if (vat.startsWith("CZ")) return "Czech Republic";
    if (vat.startsWith("SK")) return "Slovakia";
    if (vat.startsWith("HU")) return "Hungary";
    if (vat.startsWith("RO")) return "Romania";
    if (vat.startsWith("BG")) return "Bulgaria";
    if (vat.startsWith("HR")) return "Croatia";
    if (vat.startsWith("SI")) return "Slovenia";
    if (vat.startsWith("AT")) return "Austria";
    if (vat.startsWith("DK")) return "Denmark";
    if (vat.startsWith("SE")) return "Sweden";
    if (vat.startsWith("FI")) return "Finland";
    if (vat.startsWith("IE")) return "Ireland";
    if (vat.startsWith("PT")) return "Portugal";
    if (vat.startsWith("GR")) return "Greece";
    if (vat.startsWith("CY")) return "Cyprus";
    if (vat.startsWith("MT")) return "Malta";
    if (vat.startsWith("AL")) return "Albania";
    return "";
}
function AppBrand({ tagline }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-2xl font-bold text-white shadow-[0_12px_30px_rgba(16,185,129,0.28)]",
                children: "CT"
            }, void 0, false, {
                fileName: "[project]/app/auth/page.tsx",
                lineNumber: 546,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-3xl font-bold tracking-tight text-slate-900",
                        children: "CarrierTrust"
                    }, void 0, false, {
                        fileName: "[project]/app/auth/page.tsx",
                        lineNumber: 551,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 text-sm text-slate-500",
                        children: tagline
                    }, void 0, false, {
                        fileName: "[project]/app/auth/page.tsx",
                        lineNumber: 555,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/auth/page.tsx",
                lineNumber: 550,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/auth/page.tsx",
        lineNumber: 545,
        columnNumber: 5
    }, this);
}
function AuthPage() {
    const sp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$language$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLang"])();
    const safeLang = lang === "en" || lang === "de" || lang === "ru" || lang === "fr" || lang === "es" || lang === "it" ? lang : "en";
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>TEXT[safeLang], [
        safeLang
    ]);
    const initialMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const fromQuery = sp.get("mode");
        if (fromQuery === "reset") return "reset";
        return "login";
    }, [
        sp
    ]);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialMode);
    const [companyName, setCompanyName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [companyVat, setCompanyVat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [companyCountry, setCompanyCountry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [countryManual, setCountryManual] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [pass, setPass] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [confirmPass, setConfirmPass] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [agree, setAgree] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchingCompanies, setSearchingCompanies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [companyMatches, setCompanyMatches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedCompanyId, setSelectedCompanyId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [claimContextCompanyId, setClaimContextCompanyId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [claimContextLoaded, setClaimContextLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showForgotPassword, setShowForgotPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resetEmail, setResetEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>sp.get("next") || "/", [
        sp
    ]);
    const normalizedCompanyName = companyName.trim().toUpperCase();
    const normalizedCompanyVat = companyVat.trim().toUpperCase();
    const normalizedCompanyCountry = companyCountry.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const exactVatMatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!normalizedCompanyVat) return null;
        return companyMatches.find((c)=>String(c.vat_uid || "").trim().toUpperCase() === normalizedCompanyVat) || null;
    }, [
        companyMatches,
        normalizedCompanyVat
    ]);
    const hasClaimContext = Boolean(claimContextCompanyId);
    const vatDetectedCountry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>detectCountryFromVat(normalizedCompanyVat), [
        normalizedCompanyVat
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMode(initialMode);
    }, [
        initialMode
    ]);
    function setError(m) {
        setMsg(m);
    }
    function resolveMsg(value) {
        if (!value) return null;
        if (value in t) {
            return t[value];
        }
        return value;
    }
    async function ensureProfile(userId, fallbackName, fallbackVat) {
        const { data: prof, error: selErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("profiles").select("user_id, company_name, company_vat").eq("user_id", userId).maybeSingle();
        if (selErr) throw new Error(selErr.message);
        if (!prof) {
            const { error: upErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("profiles").upsert({
                user_id: userId,
                company_name: fallbackName || null,
                company_vat: fallbackVat ? String(fallbackVat).toUpperCase() : null
            });
            if (upErr) throw new Error(upErr.message);
            return;
        }
        const patch = {
            user_id: userId
        };
        let need = false;
        if (!prof.company_name && fallbackName) {
            patch.company_name = fallbackName;
            need = true;
        }
        if (!prof.company_vat && fallbackVat) {
            patch.company_vat = String(fallbackVat).toUpperCase();
            need = true;
        }
        if (need) {
            const { error: upErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("profiles").upsert(patch);
            if (upErr) throw new Error(upErr.message);
        }
    }
    async function searchCompanies(nameRaw, vatRaw) {
        const name = nameRaw.trim().toUpperCase();
        const vat = vatRaw.trim().toUpperCase();
        if (!name && !vat) {
            setCompanyMatches([]);
            setSelectedCompanyId("");
            return;
        }
        setSearchingCompanies(true);
        try {
            const byVatMap = new Map();
            const byNameMap = new Map();
            if (vat) {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("companies").select("id, name, vat_uid, country").eq("vat_uid", vat).limit(20);
                if (error) throw new Error(error.message);
                for (const row of data || []){
                    byVatMap.set(row.id, row);
                }
            }
            if (name.length >= 2) {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("companies").select("id, name, vat_uid, country").ilike("name", `%${name}%`).order("name", {
                    ascending: true
                }).limit(10);
                if (error) throw new Error(error.message);
                for (const row of data || []){
                    byNameMap.set(row.id, row);
                }
            }
            const merged = [
                ...Array.from(byVatMap.values()),
                ...Array.from(byNameMap.values()).filter((row)=>!byVatMap.has(row.id))
            ];
            setCompanyMatches(merged);
            const stillExists = merged.some((c)=>c.id === selectedCompanyId);
            if (!stillExists) {
                const exact = merged.find((c)=>String(c.vat_uid || "").trim().toUpperCase() === vat);
                if (exact) {
                    setSelectedCompanyId(exact.id);
                    setCompanyName(String(exact.name || "").toUpperCase());
                    setCompanyVat(String(exact.vat_uid || "").toUpperCase());
                    setCompanyCountry(String(exact.country || ""));
                    setCountryManual(true);
                } else {
                    setSelectedCompanyId("");
                }
            }
        } catch (e) {
            setCompanyMatches([]);
            setSelectedCompanyId("");
            setMsg(String(e?.message || e));
        } finally{
            setSearchingCompanies(false);
        }
    }
    async function loadClaimContextCompany(companyId) {
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("companies").select("id, name, vat_uid, country").eq("id", companyId).maybeSingle();
            if (error) throw new Error(error.message);
            if (!data?.id) return;
            const c = data;
            setClaimContextCompanyId(c.id);
            setSelectedCompanyId(c.id);
            setCompanyName(String(c.name || "").toUpperCase());
            setCompanyVat(String(c.vat_uid || "").toUpperCase());
            setCompanyCountry(String(c.country || ""));
            setCountryManual(true);
            setCompanyMatches([
                c
            ]);
        } catch (e) {
            setMsg(String(e?.message || e));
        } finally{
            setClaimContextLoaded(true);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const directCompanyId = sp.get("company_id") || "";
        if (directCompanyId) {
            loadClaimContextCompany(directCompanyId);
            return;
        }
        const nextValue = sp.get("next") || "";
        if (!nextValue) {
            setClaimContextLoaded(true);
            return;
        }
        try {
            const decoded = decodeURIComponent(nextValue);
            const fake = new URL(decoded, "http://localhost");
            const nestedCompanyId = fake.searchParams.get("company_id") || "";
            if (nestedCompanyId) {
                loadClaimContextCompany(nestedCompanyId);
                return;
            }
        } catch  {
        // ignore
        }
        setClaimContextLoaded(true);
    }, [
        sp
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mode !== "register") return;
        if (hasClaimContext) return;
        const timer = setTimeout(()=>{
            searchCompanies(companyName, companyVat);
        }, 350);
        return ()=>clearTimeout(timer);
    }, [
        companyName,
        companyVat,
        mode,
        hasClaimContext
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mode !== "register") return;
        if (hasClaimContext) return;
        if (selectedCompanyId) return;
        const detected = detectCountryFromVat(companyVat);
        if (detected) {
            setCompanyCountry(detected);
            setCountryManual(false);
        } else if (!countryManual) {
            setCompanyCountry("");
        }
    }, [
        companyVat,
        mode,
        hasClaimContext,
        selectedCompanyId,
        countryManual
    ]);
    async function syncCompanyAccess() {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].functions.invoke("sync-company-access", {
            body: {}
        });
        const data = res?.data;
        const fnError = res?.error;
        if (fnError) {
            throw new Error(fnError.message || "sync-company-access failed");
        }
        if (data?.ok === false) {
            throw new Error(data?.error || "sync-company-access returned error");
        }
        return data;
    }
    async function doLogin() {
        setMsg(null);
        setBusy(true);
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
                email: normalizedEmail,
                password: pass
            });
            if (error) throw new Error(error.message);
            const user = data.user;
            if (user?.id) {
                const meta = user.user_metadata;
                await ensureProfile(user.id, meta?.company_name || null, meta?.company_vat || null);
                await syncCompanyAccess();
            }
            window.location.href = next;
        } catch (e) {
            setError(String(e?.message || e));
        } finally{
            setBusy(false);
        }
    }
    async function doRegister() {
        setMsg(null);
        if (!agree) {
            setError(t.pleaseAcceptPolicies);
            return;
        }
        const em = normalizedEmail;
        let finalCompanyName = normalizedCompanyName;
        let finalCompanyVat = normalizedCompanyVat;
        let finalCompanyCountry = normalizedCompanyCountry;
        let finalSelectedCompanyId = selectedCompanyId;
        if (!finalCompanyName || !finalCompanyVat || !em || !pass) {
            setError(t.pleaseFillAllFields);
            return;
        }
        if (selectedCompanyId) {
            const selected = companyMatches.find((c)=>c.id === selectedCompanyId) || null;
            if (selected) {
                finalCompanyName = String(selected.name || finalCompanyName).trim().toUpperCase();
                finalCompanyVat = String(selected.vat_uid || finalCompanyVat).trim().toUpperCase();
                finalCompanyCountry = String(selected.country || finalCompanyCountry).trim();
            }
        }
        if (!finalCompanyCountry) {
            setError(t.pleaseSelectCountry);
            return;
        }
        if (exactVatMatch && !finalSelectedCompanyId) {
            setError(t.vatAlreadyExistsMustSelect);
            return;
        }
        setBusy(true);
        try {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signUp({
                email: em,
                password: pass,
                options: {
                    data: {
                        company_name: finalCompanyName,
                        company_vat: finalCompanyVat,
                        company_country: finalCompanyCountry,
                        selected_company_id: finalSelectedCompanyId || null
                    }
                }
            });
            if (error) throw new Error(error.message);
            setMsg("accountCreated");
            setMode("login");
        } catch (e) {
            setError(String(e?.message || e));
        } finally{
            setBusy(false);
        }
    }
    async function sendPasswordReset() {
        const emailToReset = resetEmail.trim().toLowerCase();
        if (!emailToReset) {
            setError(t.enterEmailFirst);
            return;
        }
        setBusy(true);
        setMsg(null);
        try {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.resetPasswordForEmail(emailToReset, {
                redirectTo: `${window.location.origin}/auth/callback?next=/auth?mode=reset`
            });
            if (error) throw new Error(error.message);
            setMsg("passwordResetEmailSent");
            setShowForgotPassword(false);
            setResetEmail("");
        } catch (e) {
            setError(String(e?.message || e));
        } finally{
            setBusy(false);
        }
    }
    async function doResetPassword() {
        setMsg(null);
        if (!pass || !confirmPass) {
            setError(t.pleaseFillAllFields);
            return;
        }
        if (pass !== confirmPass) {
            setError(t.passwordsDoNotMatch);
            return;
        }
        setBusy(true);
        try {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.updateUser({
                password: pass
            });
            if (error) throw new Error(error.message);
            setMsg("passwordUpdated");
            setPass("");
            setConfirmPass("");
            setTimeout(()=>{
                window.location.href = "/auth";
            }, 1200);
        } catch (e) {
            setError(String(e?.message || e));
        } finally{
            setBusy(false);
        }
    }
    const input = "w-full rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-slate-900 shadow-sm outline-none backdrop-blur placeholder:text-slate-400 focus:border-slate-300";
    const readonlyInput = "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none";
    const selectInput = "w-full rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-slate-900 shadow-sm outline-none backdrop-blur focus:border-slate-300";
    const toggleBtn = (active)=>`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${active ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/15" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`;
    const card = "rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700 shadow-sm";
    if (!claimContextLoaded) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen text-slate-900",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-none fixed inset-0 overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-slate-50"
                        }, void 0, false, {
                            fileName: "[project]/app/auth/page.tsx",
                            lineNumber: 1050,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.14),transparent)]"
                        }, void 0, false, {
                            fileName: "[project]/app/auth/page.tsx",
                            lineNumber: 1051,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-[8%] left-[8%] h-[24rem] w-[24rem] rounded-full bg-emerald-300/20 blur-3xl"
                        }, void 0, false, {
                            fileName: "[project]/app/auth/page.tsx",
                            lineNumber: 1052,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute right-[10%] bottom-[8%] h-[20rem] w-[20rem] rounded-full bg-cyan-300/20 blur-3xl"
                        }, void 0, false, {
                            fileName: "[project]/app/auth/page.tsx",
                            lineNumber: 1053,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,rgba(15,23,42,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.55)_1px,transparent_1px)] bg-[size:4rem_4rem]"
                        }, void 0, false, {
                            fileName: "[project]/app/auth/page.tsx",
                            lineNumber: 1054,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/auth/page.tsx",
                    lineNumber: 1049,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex min-h-screen items-center justify-center px-4 pt-32 pb-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-slate-500",
                        children: t.loading
                    }, void 0, false, {
                        fileName: "[project]/app/auth/page.tsx",
                        lineNumber: 1058,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/auth/page.tsx",
                    lineNumber: 1057,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/auth/page.tsx",
            lineNumber: 1048,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen text-slate-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed inset-0 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-slate-50"
                    }, void 0, false, {
                        fileName: "[project]/app/auth/page.tsx",
                        lineNumber: 1067,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.14),transparent)]"
                    }, void 0, false, {
                        fileName: "[project]/app/auth/page.tsx",
                        lineNumber: 1068,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-[8%] left-[8%] h-[24rem] w-[24rem] rounded-full bg-emerald-300/20 blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/app/auth/page.tsx",
                        lineNumber: 1069,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-[10%] bottom-[8%] h-[20rem] w-[20rem] rounded-full bg-cyan-300/20 blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/app/auth/page.tsx",
                        lineNumber: 1070,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,rgba(15,23,42,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.55)_1px,transparent_1px)] bg-[size:4rem_4rem]"
                    }, void 0, false, {
                        fileName: "[project]/app/auth/page.tsx",
                        lineNumber: 1071,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/auth/page.tsx",
                lineNumber: 1066,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex min-h-screen items-center justify-center px-4 pt-36 pb-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full max-w-xl rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -top-20 -right-16 h-56 w-56 rounded-full bg-emerald-200/50 blur-3xl"
                                }, void 0, false, {
                                    fileName: "[project]/app/auth/page.tsx",
                                    lineNumber: 1077,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl"
                                }, void 0, false, {
                                    fileName: "[project]/app/auth/page.tsx",
                                    lineNumber: 1078,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/auth/page.tsx",
                            lineNumber: 1076,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppBrand, {
                                        tagline: t.brandTagline
                                    }, void 0, false, {
                                        fileName: "[project]/app/auth/page.tsx",
                                        lineNumber: 1083,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/auth/page.tsx",
                                    lineNumber: 1082,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 text-center text-sm font-medium text-slate-600",
                                    children: mode === "reset" ? t.resetSubtitle : hasClaimContext ? t.claimSubtitle : t.reviewSubtitle
                                }, void 0, false, {
                                    fileName: "[project]/app/auth/page.tsx",
                                    lineNumber: 1086,
                                    columnNumber: 13
                                }, this),
                                mode !== "reset" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-slate-100 p-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setMode("login");
                                                setShowForgotPassword(false);
                                                setResetEmail("");
                                                setMsg(null);
                                            },
                                            className: toggleBtn(mode === "login"),
                                            children: t.login
                                        }, void 0, false, {
                                            fileName: "[project]/app/auth/page.tsx",
                                            lineNumber: 1096,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setMode("register");
                                                setShowForgotPassword(false);
                                                setResetEmail("");
                                                setMsg(null);
                                            },
                                            className: toggleBtn(mode === "register"),
                                            children: t.register
                                        }, void 0, false, {
                                            fileName: "[project]/app/auth/page.tsx",
                                            lineNumber: 1107,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/auth/page.tsx",
                                    lineNumber: 1095,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 space-y-4",
                                    children: [
                                        mode === "register" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: hasClaimContext ? readonlyInput : input,
                                                    value: companyName,
                                                    onChange: (e)=>setCompanyName(e.target.value.toUpperCase()),
                                                    placeholder: t.companyNamePlaceholder,
                                                    readOnly: hasClaimContext
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/page.tsx",
                                                    lineNumber: 1124,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: hasClaimContext ? readonlyInput : input,
                                                    value: companyVat,
                                                    onChange: (e)=>{
                                                        setCompanyVat(e.target.value.toUpperCase());
                                                        if (!selectedCompanyId && !detectCountryFromVat(e.target.value)) {
                                                            setCountryManual(true);
                                                        }
                                                    },
                                                    placeholder: t.companyVatPlaceholder,
                                                    readOnly: hasClaimContext
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/page.tsx",
                                                    lineNumber: 1132,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-2 text-sm font-semibold text-slate-800",
                                                            children: t.country
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 1146,
                                                            columnNumber: 21
                                                        }, this),
                                                        hasClaimContext ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            className: readonlyInput,
                                                            value: companyCountry,
                                                            readOnly: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 1149,
                                                            columnNumber: 23
                                                        }, this) : vatDetectedCountry && !selectedCompanyId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            className: readonlyInput,
                                                            value: companyCountry,
                                                            readOnly: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 1151,
                                                            columnNumber: 23
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            className: selectInput,
                                                            value: companyCountry,
                                                            onChange: (e)=>{
                                                                setCompanyCountry(e.target.value);
                                                                setCountryManual(true);
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: t.selectCountry
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/auth/page.tsx",
                                                                    lineNumber: 1161,
                                                                    columnNumber: 25
                                                                }, this),
                                                                COUNTRY_OPTIONS.map((country)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: country,
                                                                        children: country
                                                                    }, country, false, {
                                                                        fileName: "[project]/app/auth/page.tsx",
                                                                        lineNumber: 1163,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 1153,
                                                            columnNumber: 23
                                                        }, this),
                                                        !companyCountry ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2 text-xs text-slate-500",
                                                            children: t.countryHelp
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 1171,
                                                            columnNumber: 23
                                                        }, this) : null
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/auth/page.tsx",
                                                    lineNumber: 1145,
                                                    columnNumber: 19
                                                }, this),
                                                !hasClaimContext && (searchingCompanies || companyMatches.length > 0 || normalizedCompanyName || normalizedCompanyVat) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: card,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-semibold text-slate-900",
                                                            children: t.existingCompanies
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 1181,
                                                            columnNumber: 25
                                                        }, this),
                                                        searchingCompanies ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2 text-slate-500",
                                                            children: t.searching
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 1184,
                                                            columnNumber: 27
                                                        }, this) : companyMatches.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2 text-slate-500",
                                                            children: t.noMatchingCompanies
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 1186,
                                                            columnNumber: 27
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-2 text-slate-600",
                                                                    children: t.existingCompaniesHint
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/auth/page.tsx",
                                                                    lineNumber: 1189,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-3 space-y-2",
                                                                    children: companyMatches.map((c)=>{
                                                                        const checked = selectedCompanyId === c.id;
                                                                        const vat = String(c.vat_uid || "").trim().toUpperCase();
                                                                        const isExactVat = normalizedCompanyVat && vat === normalizedCompanyVat;
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: `flex cursor-pointer items-start gap-3 rounded-2xl border px-3 py-3 transition ${checked ? "border-slate-300 bg-white" : "border-slate-200 bg-white/70 hover:bg-white"}`,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "radio",
                                                                                    name: "selected_company",
                                                                                    checked: checked,
                                                                                    onChange: ()=>{
                                                                                        setSelectedCompanyId(c.id);
                                                                                        setCompanyName(String(c.name || "").toUpperCase());
                                                                                        setCompanyVat(String(c.vat_uid || "").toUpperCase());
                                                                                        setCompanyCountry(String(c.country || ""));
                                                                                        setCountryManual(true);
                                                                                    },
                                                                                    className: "mt-1"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/auth/page.tsx",
                                                                                    lineNumber: 1209,
                                                                                    columnNumber: 37
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "min-w-0",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "font-semibold text-slate-900",
                                                                                            children: c.name || t.companyFallback
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/auth/page.tsx",
                                                                                            lineNumber: 1224,
                                                                                            columnNumber: 39
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "mt-1 text-xs text-slate-500",
                                                                                            children: [
                                                                                                c.vat_uid ? `${t.vatLabel}: ${String(c.vat_uid).toUpperCase()}` : `${t.vatLabel}: —`,
                                                                                                c.country ? ` • ${c.country}` : ""
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/auth/page.tsx",
                                                                                            lineNumber: 1228,
                                                                                            columnNumber: 39
                                                                                        }, this),
                                                                                        isExactVat ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "mt-1 text-xs font-semibold text-slate-900",
                                                                                            children: t.exactVatMatchFound
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/auth/page.tsx",
                                                                                            lineNumber: 1236,
                                                                                            columnNumber: 41
                                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "mt-1 text-xs text-slate-500",
                                                                                            children: t.similarCompanyName
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/auth/page.tsx",
                                                                                            lineNumber: 1240,
                                                                                            columnNumber: 41
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/auth/page.tsx",
                                                                                    lineNumber: 1223,
                                                                                    columnNumber: 37
                                                                                }, this)
                                                                            ]
                                                                        }, c.id, true, {
                                                                            fileName: "[project]/app/auth/page.tsx",
                                                                            lineNumber: 1201,
                                                                            columnNumber: 35
                                                                        }, this);
                                                                    })
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/auth/page.tsx",
                                                                    lineNumber: 1193,
                                                                    columnNumber: 29
                                                                }, this),
                                                                exactVatMatch && !selectedCompanyId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-3 rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-700",
                                                                    children: t.vatAlreadyExistsMustSelect
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/auth/page.tsx",
                                                                    lineNumber: 1251,
                                                                    columnNumber: 31
                                                                }, this) : null
                                                            ]
                                                        }, void 0, true)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/auth/page.tsx",
                                                    lineNumber: 1180,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        (mode === "login" || mode === "register") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: input,
                                                    value: email,
                                                    onChange: (e)=>setEmail(e.target.value),
                                                    placeholder: t.emailPlaceholder
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/page.tsx",
                                                    lineNumber: 1264,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "password",
                                                    className: input,
                                                    value: pass,
                                                    onChange: (e)=>setPass(e.target.value),
                                                    placeholder: t.passwordPlaceholder
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/page.tsx",
                                                    lineNumber: 1271,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        mode === "reset" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "password",
                                                    className: input,
                                                    value: pass,
                                                    onChange: (e)=>setPass(e.target.value),
                                                    placeholder: t.newPasswordPlaceholder
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/page.tsx",
                                                    lineNumber: 1283,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "password",
                                                    className: input,
                                                    value: confirmPass,
                                                    onChange: (e)=>setConfirmPass(e.target.value),
                                                    placeholder: t.confirmPasswordPlaceholder
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/page.tsx",
                                                    lineNumber: 1291,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        mode === "login" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: !showForgotPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>{
                                                    setShowForgotPassword(true);
                                                    setMsg(null);
                                                    setResetEmail(email);
                                                },
                                                className: "text-left text-sm font-medium text-slate-500 transition hover:text-slate-900",
                                                children: t.forgotPassword
                                            }, void 0, false, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 1304,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "email",
                                                        value: resetEmail,
                                                        onChange: (e)=>setResetEmail(e.target.value),
                                                        placeholder: t.resetEmailPlaceholder,
                                                        className: input
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/auth/page.tsx",
                                                        lineNumber: 1317,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: sendPasswordReset,
                                                                disabled: busy,
                                                                className: "flex-1 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50",
                                                                children: busy ? t.pleaseWait : t.sendResetLink
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/auth/page.tsx",
                                                                lineNumber: 1326,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>{
                                                                    setShowForgotPassword(false);
                                                                    setResetEmail("");
                                                                    setMsg(null);
                                                                },
                                                                className: "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50",
                                                                children: t.cancel
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/auth/page.tsx",
                                                                lineNumber: 1335,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/auth/page.tsx",
                                                        lineNumber: 1325,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 1316,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/auth/page.tsx",
                                            lineNumber: 1302,
                                            columnNumber: 17
                                        }, this),
                                        mode === "register" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-start gap-3 text-sm text-slate-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: agree,
                                                    onChange: (e)=>setAgree(e.target.checked),
                                                    className: "mt-1 h-4 w-4 rounded border-slate-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/page.tsx",
                                                    lineNumber: 1354,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "leading-5",
                                                    children: [
                                                        t.agreePrefix,
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            className: "underline underline-offset-4",
                                                            href: "/terms",
                                                            target: "_blank",
                                                            children: t.terms
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 1362,
                                                            columnNumber: 21
                                                        }, this),
                                                        ",",
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            className: "underline underline-offset-4",
                                                            href: "/privacy",
                                                            target: "_blank",
                                                            children: t.privacyPolicy
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 1366,
                                                            columnNumber: 21
                                                        }, this),
                                                        " ",
                                                        "and",
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            className: "underline underline-offset-4",
                                                            href: "/review-policy",
                                                            target: "_blank",
                                                            children: t.reviewPolicy
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 1370,
                                                            columnNumber: 21
                                                        }, this),
                                                        "."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/auth/page.tsx",
                                                    lineNumber: 1360,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/auth/page.tsx",
                                            lineNumber: 1353,
                                            columnNumber: 17
                                        }, this),
                                        msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-slate-200 bg-white/80 p-3 text-sm text-slate-700 shadow-sm",
                                            children: resolveMsg(msg)
                                        }, void 0, false, {
                                            fileName: "[project]/app/auth/page.tsx",
                                            lineNumber: 1383,
                                            columnNumber: 3
                                        }, this),
                                        mode === "reset" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: busy,
                                                    onClick: doResetPassword,
                                                    className: "w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800 disabled:opacity-50",
                                                    children: busy ? t.pleaseWait : t.resetPassword
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/page.tsx",
                                                    lineNumber: 1390,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>{
                                                        setMode("login");
                                                        setMsg(null);
                                                        setPass("");
                                                        setConfirmPass("");
                                                        window.history.replaceState({}, "", "/auth");
                                                    },
                                                    className: "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50",
                                                    children: t.backToLogin
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/page.tsx",
                                                    lineNumber: 1398,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            disabled: busy,
                                            onClick: mode === "login" ? doLogin : doRegister,
                                            className: "w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800 disabled:opacity-50",
                                            children: busy ? t.pleaseWait : mode === "login" ? t.login : t.register
                                        }, void 0, false, {
                                            fileName: "[project]/app/auth/page.tsx",
                                            lineNumber: 1413,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/auth/page.tsx",
                                    lineNumber: 1121,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/auth/page.tsx",
                            lineNumber: 1081,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/auth/page.tsx",
                    lineNumber: 1075,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/auth/page.tsx",
                lineNumber: 1074,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/auth/page.tsx",
        lineNumber: 1065,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_auth_page_tsx_967d1f0d._.js.map