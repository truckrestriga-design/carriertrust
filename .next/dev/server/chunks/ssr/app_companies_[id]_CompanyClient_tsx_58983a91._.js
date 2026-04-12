module.exports = [
"[project]/app/companies/[id]/CompanyClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CompanyPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$language$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/language-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/analytics.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const EN = {
    back: "← Back to home",
    trustScore: "Trust score",
    reviews: "Reviews",
    tabsReviews: "Reviews",
    tabsTimeline: "Timeline",
    tabsAbout: "About",
    noReviewsTitle: "No published reviews yet",
    noReviewsText: "This company has no published reviews at the moment.",
    companyNotFound: "Company not found.",
    by: "By",
    report: "Report",
    writeReview: "Write a review",
    claimThisCompany: "Claim this company",
    claimPending: "Claim pending",
    claimApproved: "Official company account",
    verified: "Verified",
    companyDashboard: "Company dashboard",
    underReviewTitle: "Under investigation",
    underReviewText: "This review has received multiple reports or signals and is currently being reviewed. It remains visible unless it violates our policies.",
    companyReplyTitle: "Company reply",
    official: "Official",
    reportTitle: "Report review",
    reportHelp: "Please provide your business email and the reason for the report.",
    yourEmail: "Your business email *",
    yourCompany: "Your company (optional)",
    reason: "Reason * (illegal content, personal data, threats, spam, etc.)",
    close: "Close",
    submitReport: "Submit report",
    sending: "Sending...",
    thanks: "Thank you. Your report has been submitted.",
    fillEmailReason: "Please fill your email and the reason.",
    invalidEmail: "Please enter a valid email address.",
    waitSpam: "Please wait a bit before sending another report.",
    businessEmailOnly: "Business email only (no free email providers).",
    duplicateError: "You have already reported this review recently.",
    rateLimitedGeneric: "Too many reports. Please wait and try again.",
    sendFailedGeneric: "Could not send report right now. Please try again later.",
    aboutTitle: "About",
    aboutText: "Company information will appear here (next: verification + profile details).",
    timelineTitle: "Timeline",
    timelineText: "Timeline will appear here (next: signals, replies, verification events).",
    latestPublished: "Latest published reviews for this company",
    trustBasedOnSignals: "Based on trust signals",
    trustBasedOnReviews: "Based on published reviews",
    trustNoData: "No trust data yet",
    riskLabel: "Risk",
    riskLow: "Low",
    riskMedium: "Medium",
    riskHigh: "High",
    updatedLabel: "Updated",
    verifiedCompany: "Verified company",
    verifiedCompanyHelp: "Identity verified (VAT / domain / admin check).",
    verifiedLearnMore: "What does verified mean?",
    fraudScoreLabel: "Fraud score",
    autoFlaggedLabel: "Auto-flagged by system",
    countryLabel: "Country",
    vatLabel: "VAT",
    loading: "Loading...",
    neutralHostingNote: "CarrierTrust is a neutral hosting platform. Reviews are user-generated. We may remove content that violates our policies or applicable law.",
    verifiedBonus: "verified bonus",
    adSpace: "Ad space",
    bannerEmptyText: "Your banner can appear here",
    addBanner: "Add banner",
    orderBanner: "Order a banner",
    companyPageLabel: "Company Page",
    sideLabel: "Side",
    sideLeft: "left",
    sideRight: "right",
    sizeLabel: "Size",
    choosePeriod: "Choose a period:",
    companyName: "Company name",
    companyNamePlaceholder: "For example, EXPORTO LTD",
    invoiceEmail: "Invoice email",
    invoiceEmailPlaceholder: "invoice@company.com",
    uploadBanner: "Upload banner",
    chooseBannerFile: "Click to choose a file",
    recommendedSize: "Recommended size: 180×600px",
    paymentDetails: "Payment details",
    bankCompany: "Company",
    bankAccount: "Account number",
    bankBic: "BIC",
    amount: "Amount",
    paymentPurpose: "Payment purpose",
    paymentPurposeFallback: "Banner - Company Name",
    uploadPaymentProof: "Upload payment proof",
    uploadPaymentConfirmation: "Upload payment confirmation",
    paymentProofFormats: "PDF, PNG, JPG",
    bannerPreview: "Banner preview",
    bannerPreviewEmpty: "Your uploaded banner preview will appear here",
    havePaid: "I have paid",
    bannerSuccessMessage: "Banner request sent. The banner is now under moderation, invoice will be sent by email.",
    publishAfterModeration: "After payment verification and moderation, the banner will be published.",
    errorSending: "Error sending"
};
const TEXT = {
    en: EN,
    de: {
        ...EN,
        back: "← Zur Startseite",
        trustScore: "Vertrauensscore",
        reviews: "Bewertungen",
        tabsReviews: "Bewertungen",
        tabsTimeline: "Zeitverlauf",
        tabsAbout: "Über das Unternehmen",
        noReviewsTitle: "Noch keine veröffentlichten Bewertungen",
        noReviewsText: "Für dieses Unternehmen gibt es derzeit keine veröffentlichten Bewertungen.",
        companyNotFound: "Unternehmen nicht gefunden.",
        by: "Von",
        report: "Melden",
        writeReview: "Bewertung schreiben",
        claimThisCompany: "Dieses Unternehmen beanspruchen",
        claimPending: "Anfrage läuft",
        claimApproved: "Offizielles Firmenkonto",
        verified: "Verifiziert",
        companyDashboard: "Unternehmens-Dashboard",
        underReviewTitle: "In Prüfung",
        underReviewText: "Diese Bewertung hat mehrere Meldungen oder Signale erhalten und wird derzeit geprüft. Sie bleibt sichtbar, sofern sie nicht gegen unsere Richtlinien verstößt.",
        companyReplyTitle: "Antwort des Unternehmens",
        official: "Offiziell",
        reportTitle: "Bewertung melden",
        reportHelp: "Bitte geben Sie Ihre geschäftliche E-Mail-Adresse und den Grund der Meldung an.",
        yourEmail: "Ihre geschäftliche E-Mail *",
        yourCompany: "Ihr Unternehmen (optional)",
        reason: "Grund * (illegale Inhalte, personenbezogene Daten, Drohungen, Spam usw.)",
        close: "Schließen",
        submitReport: "Meldung senden",
        sending: "Wird gesendet...",
        thanks: "Danke. Ihre Meldung wurde übermittelt.",
        fillEmailReason: "Bitte E-Mail und Grund ausfüllen.",
        invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        waitSpam: "Bitte warten Sie kurz, bevor Sie eine weitere Meldung senden.",
        businessEmailOnly: "Nur geschäftliche E-Mail-Adressen (keine kostenlosen E-Mail-Anbieter).",
        duplicateError: "Sie haben diese Bewertung vor Kurzem bereits gemeldet.",
        rateLimitedGeneric: "Zu viele Meldungen. Bitte warten Sie und versuchen Sie es erneut.",
        sendFailedGeneric: "Die Meldung konnte derzeit nicht gesendet werden. Bitte versuchen Sie es später erneut.",
        aboutTitle: "Über das Unternehmen",
        aboutText: "Unternehmensinformationen werden hier angezeigt (als Nächstes: Verifizierung + Profildetails).",
        timelineTitle: "Zeitverlauf",
        timelineText: "Die Chronologie wird hier angezeigt (als Nächstes: Signale, Antworten, Verifizierungsereignisse).",
        latestPublished: "Neueste veröffentlichte Bewertungen für dieses Unternehmen",
        trustBasedOnSignals: "Basierend auf Vertrauenssignalen",
        trustBasedOnReviews: "Basierend auf veröffentlichten Bewertungen",
        trustNoData: "Noch keine Vertrauensdaten",
        riskLabel: "Risiko",
        riskLow: "Niedrig",
        riskMedium: "Mittel",
        riskHigh: "Hoch",
        updatedLabel: "Aktualisiert",
        verifiedCompany: "Verifiziertes Unternehmen",
        verifiedCompanyHelp: "Identität geprüft (VAT / Domain / Admin).",
        verifiedLearnMore: "Was bedeutet verifiziert?",
        fraudScoreLabel: "Betrugswert",
        autoFlaggedLabel: "Automatisch markiert",
        countryLabel: "Land",
        vatLabel: "VAT",
        loading: "Lädt...",
        neutralHostingNote: "CarrierTrust ist eine neutrale Hosting-Plattform. Bewertungen werden von Nutzern erstellt. Wir können Inhalte entfernen, die gegen unsere Richtlinien oder geltendes Recht verstoßen.",
        verifiedBonus: "Verifizierungsbonus",
        adSpace: "Werbefläche",
        bannerEmptyText: "Ihr Banner kann hier erscheinen",
        addBanner: "Banner hinzufügen",
        orderBanner: "Banner bestellen",
        companyPageLabel: "Unternehmensseite",
        sideLabel: "Seite",
        sideLeft: "links",
        sideRight: "rechts",
        sizeLabel: "Größe",
        choosePeriod: "Zeitraum wählen:",
        companyName: "Firmenname",
        companyNamePlaceholder: "Zum Beispiel EXPORTO LTD",
        invoiceEmail: "Rechnungs-E-Mail",
        invoiceEmailPlaceholder: "invoice@company.com",
        uploadBanner: "Banner hochladen",
        chooseBannerFile: "Klicken, um eine Datei auszuwählen",
        recommendedSize: "Empfohlene Größe: 180×600px",
        paymentDetails: "Zahlungsdetails",
        bankCompany: "Firma",
        bankAccount: "Kontonummer",
        bankBic: "BIC",
        amount: "Betrag",
        paymentPurpose: "Verwendungszweck",
        paymentPurposeFallback: "Banner - Company Name",
        uploadPaymentProof: "Zahlungsnachweis hochladen",
        uploadPaymentConfirmation: "Zahlungsbestätigung hochladen",
        paymentProofFormats: "PDF, PNG, JPG",
        bannerPreview: "Banner-Vorschau",
        bannerPreviewEmpty: "Hier erscheint die Vorschau Ihres hochgeladenen Banners",
        havePaid: "Ich habe bezahlt",
        bannerSuccessMessage: "Banner-Anfrage gesendet. Das Banner befindet sich jetzt in der Moderation, die Rechnung wird per E-Mail gesendet.",
        publishAfterModeration: "Nach Zahlungsprüfung und Moderation wird das Banner veröffentlicht.",
        errorSending: "Fehler beim Senden"
    },
    ru: {
        ...EN,
        back: "← На главную",
        trustScore: "Индекс доверия",
        reviews: "Отзывы",
        tabsReviews: "Отзывы",
        tabsTimeline: "История",
        tabsAbout: "О компании",
        noReviewsTitle: "Пока нет опубликованных отзывов",
        noReviewsText: "На данный момент у этой компании нет опубликованных отзывов.",
        companyNotFound: "Компания не найдена.",
        by: "От",
        report: "Пожаловаться",
        writeReview: "Написать отзыв",
        claimThisCompany: "Заявить права на компанию",
        claimPending: "Заявка на проверке",
        claimApproved: "Официальный аккаунт компании",
        verified: "Проверено",
        companyDashboard: "Панель компании",
        underReviewTitle: "На проверке",
        underReviewText: "На этот отзыв поступили жалобы или сигналы, и сейчас он проверяется. Он остаётся видимым, если не нарушает правила платформы.",
        companyReplyTitle: "Ответ компании",
        official: "Официально",
        reportTitle: "Жалоба на отзыв",
        reportHelp: "Укажите ваш бизнес-email и причину жалобы.",
        yourEmail: "Ваш бизнес email *",
        yourCompany: "Ваша компания (необязательно)",
        reason: "Причина * (незаконный контент, персональные данные, угрозы, спам и т.д.)",
        close: "Закрыть",
        submitReport: "Отправить жалобу",
        sending: "Отправка...",
        thanks: "Спасибо! Жалоба отправлена.",
        fillEmailReason: "Заполните email и причину.",
        invalidEmail: "Введите корректный email.",
        waitSpam: "Подождите немного перед повторной отправкой.",
        businessEmailOnly: "Только бизнес-email (без бесплатных почтовых сервисов).",
        duplicateError: "Вы уже недавно отправляли жалобу на этот отзыв.",
        rateLimitedGeneric: "Слишком много жалоб. Подождите и попробуйте ещё раз.",
        sendFailedGeneric: "Не удалось отправить жалобу сейчас. Попробуйте позже.",
        aboutTitle: "О компании",
        aboutText: "Информация о компании появится здесь (дальше: верификация и детали профиля).",
        timelineTitle: "История",
        timelineText: "История событий появится здесь (дальше: сигналы, ответы, события верификации).",
        latestPublished: "Последние опубликованные отзывы о компании",
        trustBasedOnSignals: "На основе сигналов доверия",
        trustBasedOnReviews: "На основе опубликованных отзывов",
        trustNoData: "Пока нет данных доверия",
        riskLabel: "Риск",
        riskLow: "Низкий",
        riskMedium: "Средний",
        riskHigh: "Высокий",
        updatedLabel: "Обновлено",
        verifiedCompany: "Компания подтверждена",
        verifiedCompanyHelp: "Идентичность подтверждена (VAT / домен / админ-проверка).",
        verifiedLearnMore: "Что значит verified?",
        fraudScoreLabel: "Уровень риска",
        autoFlaggedLabel: "Автоматическая отметка системой",
        countryLabel: "Страна",
        vatLabel: "VAT",
        loading: "Загрузка...",
        neutralHostingNote: "CarrierTrust — нейтральная платформа. Отзывы публикуются пользователями. Мы можем удалить контент, нарушающий правила платформы или применимое законодательство.",
        verifiedBonus: "бонус за верификацию",
        adSpace: "Рекламное место",
        bannerEmptyText: "Ваш баннер может быть размещён здесь",
        addBanner: "Добавить баннер",
        orderBanner: "Заказать баннер",
        companyPageLabel: "Страница компании",
        sideLabel: "Сторона",
        sideLeft: "левая",
        sideRight: "правая",
        sizeLabel: "Размер",
        choosePeriod: "Выберите период:",
        companyName: "Название компании",
        companyNamePlaceholder: "Например, EXPORTO LTD",
        invoiceEmail: "Email для счёта",
        invoiceEmailPlaceholder: "invoice@company.com",
        uploadBanner: "Загрузить баннер",
        chooseBannerFile: "Нажмите, чтобы выбрать файл",
        recommendedSize: "Рекомендуемый размер: 180×600px",
        paymentDetails: "Реквизиты для оплаты",
        bankCompany: "Компания",
        bankAccount: "Номер счёта",
        bankBic: "BIC",
        amount: "Сумма",
        paymentPurpose: "Назначение платежа",
        paymentPurposeFallback: "Banner - Company Name",
        uploadPaymentProof: "Загрузить подтверждение оплаты",
        uploadPaymentConfirmation: "Загрузить подтверждение платежа",
        paymentProofFormats: "PDF, PNG, JPG",
        bannerPreview: "Предпросмотр баннера",
        bannerPreviewEmpty: "Здесь появится предпросмотр загруженного баннера",
        havePaid: "Я оплатил",
        bannerSuccessMessage: "Заявка на баннер отправлена. Баннер сейчас на модерации, счёт будет отправлен на email.",
        publishAfterModeration: "После проверки оплаты и модерации баннер будет опубликован.",
        errorSending: "Ошибка отправки"
    },
    fr: {
        ...EN,
        back: "← Retour à l’accueil",
        trustScore: "Score de confiance",
        reviews: "Avis",
        tabsReviews: "Avis",
        tabsTimeline: "Historique",
        tabsAbout: "À propos",
        noReviewsTitle: "Aucun avis publié pour le moment",
        noReviewsText: "Cette entreprise n’a actuellement aucun avis publié.",
        companyNotFound: "Entreprise introuvable.",
        by: "Par",
        report: "Signaler",
        writeReview: "Écrire un avis",
        claimThisCompany: "Revendiquer cette entreprise",
        claimPending: "Demande en attente",
        claimApproved: "Compte officiel de l’entreprise",
        verified: "Vérifié",
        companyDashboard: "Tableau de bord entreprise",
        underReviewTitle: "En cours d’examen",
        underReviewText: "Cet avis a reçu plusieurs signalements ou signaux et est actuellement en cours d’examen. Il reste visible sauf s’il viole nos politiques.",
        companyReplyTitle: "Réponse de l’entreprise",
        official: "Officiel",
        reportTitle: "Signaler un avis",
        reportHelp: "Veuillez indiquer votre email professionnel et la raison du signalement.",
        yourEmail: "Votre email professionnel *",
        yourCompany: "Votre entreprise (optionnel)",
        reason: "Raison * (contenu illégal, données personnelles, menaces, spam, etc.)",
        close: "Fermer",
        submitReport: "Envoyer le signalement",
        sending: "Envoi...",
        thanks: "Merci. Votre signalement a été envoyé.",
        fillEmailReason: "Veuillez remplir l’email et la raison.",
        invalidEmail: "Veuillez entrer une adresse email valide.",
        waitSpam: "Veuillez attendre un peu avant d’envoyer un autre signalement.",
        businessEmailOnly: "Email professionnel uniquement (pas de fournisseurs gratuits).",
        duplicateError: "Vous avez déjà signalé cet avis récemment.",
        rateLimitedGeneric: "Trop de signalements. Veuillez patienter et réessayer.",
        sendFailedGeneric: "Impossible d’envoyer le signalement pour le moment. Veuillez réessayer plus tard.",
        aboutTitle: "À propos",
        aboutText: "Les informations sur l’entreprise apparaîtront ici (prochaine étape : vérification + détails du profil).",
        timelineTitle: "Historique",
        timelineText: "L’historique apparaîtra ici (prochaine étape : signaux, réponses, événements de vérification).",
        latestPublished: "Derniers avis publiés pour cette entreprise",
        trustBasedOnSignals: "Basé sur des signaux de confiance",
        trustBasedOnReviews: "Basé sur les avis publiés",
        trustNoData: "Pas encore de données de confiance",
        riskLabel: "Risque",
        riskLow: "Faible",
        riskMedium: "Moyen",
        riskHigh: "Élevé",
        updatedLabel: "Mis à jour",
        verifiedCompany: "Entreprise vérifiée",
        verifiedCompanyHelp: "Identité vérifiée (VAT / domaine / contrôle admin).",
        verifiedLearnMore: "Que signifie vérifié ?",
        fraudScoreLabel: "Score fraude",
        autoFlaggedLabel: "Signalé automatiquement",
        countryLabel: "Pays",
        vatLabel: "TVA",
        loading: "Chargement...",
        neutralHostingNote: "CarrierTrust est une plateforme d’hébergement neutre. Les avis sont publiés par les utilisateurs. Nous pouvons supprimer les contenus qui violent nos politiques ou la loi applicable.",
        verifiedBonus: "bonus de vérification",
        adSpace: "Espace publicitaire",
        bannerEmptyText: "Votre bannière peut apparaître ici",
        addBanner: "Ajouter une bannière",
        orderBanner: "Commander une bannière",
        companyPageLabel: "Page entreprise",
        sideLabel: "Côté",
        sideLeft: "gauche",
        sideRight: "droite",
        sizeLabel: "Taille",
        choosePeriod: "Choisissez une période :",
        companyName: "Nom de l’entreprise",
        companyNamePlaceholder: "Par exemple, EXPORTO LTD",
        invoiceEmail: "E-mail de facturation",
        invoiceEmailPlaceholder: "invoice@company.com",
        uploadBanner: "Télécharger la bannière",
        chooseBannerFile: "Cliquez pour choisir un fichier",
        recommendedSize: "Taille recommandée : 180×600px",
        paymentDetails: "Détails du paiement",
        bankCompany: "Société",
        bankAccount: "Numéro de compte",
        bankBic: "BIC",
        amount: "Montant",
        paymentPurpose: "Objet du paiement",
        paymentPurposeFallback: "Banner - Company Name",
        uploadPaymentProof: "Télécharger la preuve de paiement",
        uploadPaymentConfirmation: "Télécharger la confirmation du paiement",
        paymentProofFormats: "PDF, PNG, JPG",
        bannerPreview: "Aperçu de la bannière",
        bannerPreviewEmpty: "L’aperçu de votre bannière téléchargée apparaîtra ici",
        havePaid: "J’ai payé",
        bannerSuccessMessage: "Demande de bannière envoyée. La bannière est maintenant en modération, la facture sera envoyée par e-mail.",
        publishAfterModeration: "Après vérification du paiement et modération, la bannière sera publiée.",
        errorSending: "Erreur d’envoi"
    },
    es: {
        ...EN,
        back: "← Volver al inicio",
        trustScore: "Puntuación de confianza",
        reviews: "Reseñas",
        tabsReviews: "Reseñas",
        tabsTimeline: "Cronología",
        tabsAbout: "Acerca de",
        noReviewsTitle: "Aún no hay reseñas publicadas",
        noReviewsText: "Esta empresa no tiene reseñas publicadas por el momento.",
        companyNotFound: "Empresa no encontrada.",
        by: "Por",
        report: "Reportar",
        writeReview: "Escribir reseña",
        claimThisCompany: "Reclamar esta empresa",
        claimPending: "Solicitud pendiente",
        claimApproved: "Cuenta oficial de la empresa",
        verified: "Verificado",
        companyDashboard: "Panel de empresa",
        underReviewTitle: "En revisión",
        underReviewText: "Esta reseña ha recibido múltiples reportes o señales y actualmente está en revisión. Permanece visible salvo que infrinja nuestras políticas.",
        companyReplyTitle: "Respuesta de la empresa",
        official: "Oficial",
        reportTitle: "Reportar reseña",
        reportHelp: "Por favor, indica tu correo empresarial y el motivo del reporte.",
        yourEmail: "Tu correo empresarial *",
        yourCompany: "Tu empresa (opcional)",
        reason: "Motivo * (contenido ilegal, datos personales, amenazas, spam, etc.)",
        close: "Cerrar",
        submitReport: "Enviar reporte",
        sending: "Enviando...",
        thanks: "Gracias. Tu reporte ha sido enviado.",
        fillEmailReason: "Completa el correo y el motivo.",
        invalidEmail: "Introduce una dirección de correo válida.",
        waitSpam: "Espera un poco antes de enviar otro reporte.",
        businessEmailOnly: "Solo correo empresarial (sin proveedores gratuitos).",
        duplicateError: "Ya has reportado esta reseña recientemente.",
        rateLimitedGeneric: "Demasiados reportes. Espera e inténtalo de nuevo.",
        sendFailedGeneric: "No se pudo enviar el reporte ahora. Inténtalo más tarde.",
        aboutTitle: "Acerca de",
        aboutText: "La información de la empresa aparecerá aquí (siguiente paso: verificación + detalles del perfil).",
        timelineTitle: "Cronología",
        timelineText: "La cronología aparecerá aquí (siguiente paso: señales, respuestas, eventos de verificación).",
        latestPublished: "Últimas reseñas publicadas de esta empresa",
        trustBasedOnSignals: "Basado en señales de confianza",
        trustBasedOnReviews: "Basado en reseñas publicadas",
        trustNoData: "Aún no hay datos de confianza",
        riskLabel: "Riesgo",
        riskLow: "Bajo",
        riskMedium: "Medio",
        riskHigh: "Alto",
        updatedLabel: "Actualizado",
        verifiedCompany: "Empresa verificada",
        verifiedCompanyHelp: "Identidad verificada (VAT / dominio / revisión admin).",
        verifiedLearnMore: "¿Qué significa verificado?",
        fraudScoreLabel: "Puntuación de fraude",
        autoFlaggedLabel: "Marcado automáticamente por el sistema",
        countryLabel: "País",
        vatLabel: "VAT",
        loading: "Cargando...",
        neutralHostingNote: "CarrierTrust es una plataforma de alojamiento neutral. Las reseñas son generadas por usuarios. Podemos eliminar contenido que infrinja nuestras políticas o la legislación aplicable.",
        verifiedBonus: "bonificación por verificación",
        adSpace: "Espacio publicitario",
        bannerEmptyText: "Tu banner puede aparecer aquí",
        addBanner: "Añadir banner",
        orderBanner: "Pedir un banner",
        companyPageLabel: "Página de empresa",
        sideLabel: "Lado",
        sideLeft: "izquierdo",
        sideRight: "derecho",
        sizeLabel: "Tamaño",
        choosePeriod: "Elige un período:",
        companyName: "Nombre de la empresa",
        companyNamePlaceholder: "Por ejemplo, EXPORTO LTD",
        invoiceEmail: "Email de factura",
        invoiceEmailPlaceholder: "invoice@company.com",
        uploadBanner: "Subir banner",
        chooseBannerFile: "Haz clic para elegir un archivo",
        recommendedSize: "Tamaño recomendado: 180×600px",
        paymentDetails: "Detalles de pago",
        bankCompany: "Empresa",
        bankAccount: "Número de cuenta",
        bankBic: "BIC",
        amount: "Importe",
        paymentPurpose: "Concepto de pago",
        paymentPurposeFallback: "Banner - Company Name",
        uploadPaymentProof: "Subir comprobante de pago",
        uploadPaymentConfirmation: "Subir confirmación de pago",
        paymentProofFormats: "PDF, PNG, JPG",
        bannerPreview: "Vista previa del banner",
        bannerPreviewEmpty: "La vista previa del banner subido aparecerá aquí",
        havePaid: "Ya he pagado",
        bannerSuccessMessage: "Solicitud de banner enviada. El banner está ahora en moderación; la factura será enviada por email.",
        publishAfterModeration: "Después de la verificación del pago y la moderación, el banner será publicado.",
        errorSending: "Error al enviar"
    },
    it: {
        ...EN,
        back: "← Torna alla home",
        trustScore: "Punteggio di fiducia",
        reviews: "Recensioni",
        tabsReviews: "Recensioni",
        tabsTimeline: "Cronologia",
        tabsAbout: "Informazioni",
        noReviewsTitle: "Nessuna recensione pubblicata al momento",
        noReviewsText: "Questa azienda al momento non ha recensioni pubblicate.",
        companyNotFound: "Azienda non trovata.",
        by: "Da",
        report: "Segnala",
        writeReview: "Scrivi una recensione",
        claimThisCompany: "Rivendica questa azienda",
        claimPending: "Richiesta in attesa",
        claimApproved: "Account ufficiale dell’azienda",
        verified: "Verificato",
        companyDashboard: "Dashboard aziendale",
        underReviewTitle: "In revisione",
        underReviewText: "Questa recensione ha ricevuto più segnalazioni o segnali ed è attualmente in revisione. Rimane visibile a meno che non violi le nostre policy.",
        companyReplyTitle: "Risposta dell’azienda",
        official: "Ufficiale",
        reportTitle: "Segnala recensione",
        reportHelp: "Inserisci la tua email aziendale e il motivo della segnalazione.",
        yourEmail: "La tua email aziendale *",
        yourCompany: "La tua azienda (opzionale)",
        reason: "Motivo * (contenuti illegali, dati personali, minacce, spam, ecc.)",
        close: "Chiudi",
        submitReport: "Invia segnalazione",
        sending: "Invio...",
        thanks: "Grazie. La tua segnalazione è stata inviata.",
        fillEmailReason: "Compila email e motivo.",
        invalidEmail: "Inserisci un indirizzo email valido.",
        waitSpam: "Attendi un momento prima di inviare un’altra segnalazione.",
        businessEmailOnly: "Solo email aziendale (nessun provider gratuito).",
        duplicateError: "Hai già segnalato questa recensione di recente.",
        rateLimitedGeneric: "Troppe segnalazioni. Attendi e riprova.",
        sendFailedGeneric: "Impossibile inviare la segnalazione adesso. Riprova più tardi.",
        aboutTitle: "Informazioni",
        aboutText: "Le informazioni sull’azienda appariranno qui (prossimo: verifica + dettagli profilo).",
        timelineTitle: "Cronologia",
        timelineText: "La cronologia apparirà qui (prossimo: segnali, risposte, eventi di verifica).",
        latestPublished: "Ultime recensioni pubblicate per questa azienda",
        trustBasedOnSignals: "Basato su segnali di fiducia",
        trustBasedOnReviews: "Basato sulle recensioni pubblicate",
        trustNoData: "Nessun dato di fiducia disponibile",
        riskLabel: "Rischio",
        riskLow: "Basso",
        riskMedium: "Medio",
        riskHigh: "Alto",
        updatedLabel: "Aggiornato",
        verifiedCompany: "Azienda verificata",
        verifiedCompanyHelp: "Identità verificata (VAT / dominio / controllo admin).",
        verifiedLearnMore: "Cosa significa verificato?",
        fraudScoreLabel: "Punteggio frode",
        autoFlaggedLabel: "Segnalato automaticamente dal sistema",
        countryLabel: "Paese",
        vatLabel: "VAT",
        loading: "Caricamento...",
        neutralHostingNote: "CarrierTrust è una piattaforma di hosting neutrale. Le recensioni sono generate dagli utenti. Possiamo rimuovere contenuti che violano le nostre policy o la legge applicabile.",
        verifiedBonus: "bonus verifica",
        adSpace: "Spazio pubblicitario",
        bannerEmptyText: "Il tuo banner può apparire qui",
        addBanner: "Aggiungi banner",
        orderBanner: "Ordina un banner",
        companyPageLabel: "Pagina azienda",
        sideLabel: "Lato",
        sideLeft: "sinistro",
        sideRight: "destro",
        sizeLabel: "Dimensione",
        choosePeriod: "Scegli un periodo:",
        companyName: "Nome azienda",
        companyNamePlaceholder: "Ad esempio, EXPORTO LTD",
        invoiceEmail: "Email fattura",
        invoiceEmailPlaceholder: "invoice@company.com",
        uploadBanner: "Carica banner",
        chooseBannerFile: "Clicca per scegliere un file",
        recommendedSize: "Dimensione consigliata: 180×600px",
        paymentDetails: "Dettagli di pagamento",
        bankCompany: "Società",
        bankAccount: "Numero di conto",
        bankBic: "BIC",
        amount: "Importo",
        paymentPurpose: "Causale",
        paymentPurposeFallback: "Banner - Company Name",
        uploadPaymentProof: "Carica prova di pagamento",
        uploadPaymentConfirmation: "Carica conferma pagamento",
        paymentProofFormats: "PDF, PNG, JPG",
        bannerPreview: "Anteprima banner",
        bannerPreviewEmpty: "L’anteprima del banner caricato apparirà qui",
        havePaid: "Ho pagato",
        bannerSuccessMessage: "Richiesta banner inviata. Il banner è ora in moderazione, la fattura sarà inviata via email.",
        publishAfterModeration: "Dopo la verifica del pagamento e la moderazione, il banner sarà pubblicato.",
        errorSending: "Errore di invio"
    }
};
function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function isBusinessEmail(email) {
    const domain = (email.split("@")[1] || "").toLowerCase();
    const blocked = [
        "gmail.com",
        "googlemail.com",
        "yahoo.com",
        "yahoo.co.uk",
        "outlook.com",
        "hotmail.com",
        "live.com",
        "icloud.com",
        "aol.com",
        "proton.me",
        "protonmail.com",
        "gmx.com",
        "mail.com",
        "yandex.ru",
        "yandex.com"
    ];
    return domain && !blocked.includes(domain);
}
function formatWaitMessage(lang, blockedUntilIso, t) {
    if (!blockedUntilIso) return t.rateLimitedGeneric;
    const ms = new Date(blockedUntilIso).getTime() - Date.now();
    if (!isFinite(ms) || ms <= 0) return t.rateLimitedGeneric;
    const minutes = Math.ceil(ms / 60000);
    if (minutes <= 1) {
        switch(lang){
            case "ru":
                return "Подождите около 1 минуты и попробуйте снова.";
            case "de":
                return "Bitte warten Sie ca. 1 Minute und versuchen Sie es erneut.";
            case "fr":
                return "Veuillez attendre environ 1 minute et réessayer.";
            case "es":
                return "Espera aproximadamente 1 minuto e inténtalo de nuevo.";
            case "it":
                return "Attendi circa 1 minuto e riprova.";
            default:
                return "Please wait about 1 minute and try again.";
        }
    }
    if (minutes < 60) {
        switch(lang){
            case "ru":
                return `Подождите ${minutes} мин и попробуйте снова.`;
            case "de":
                return `Bitte warten Sie ${minutes} Minuten und versuchen Sie es erneut.`;
            case "fr":
                return `Veuillez attendre ${minutes} minutes et réessayer.`;
            case "es":
                return `Espera ${minutes} minutos e inténtalo de nuevo.`;
            case "it":
                return `Attendi ${minutes} minuti e riprova.`;
            default:
                return `Please wait ${minutes} minutes and try again.`;
        }
    }
    const hours = Math.ceil(minutes / 60);
    switch(lang){
        case "ru":
            return `Подождите примерно ${hours} ч и попробуйте снова.`;
        case "de":
            return `Bitte warten Sie etwa ${hours} Stunde(n) und versuchen Sie es erneut.`;
        case "fr":
            return `Veuillez attendre environ ${hours} heure(s) et réessayer.`;
        case "es":
            return `Espera aproximadamente ${hours} hora(s) e inténtalo de nuevo.`;
        case "it":
            return `Attendi circa ${hours} ora(e) e riprova.`;
        default:
            return `Please wait about ${hours} hour(s) and try again.`;
    }
}
function stars(n) {
    const full = Math.max(0, Math.min(5, n));
    return "★".repeat(full) + "☆".repeat(5 - full);
}
function formatDate(iso) {
    try {
        return new Date(iso).toLocaleDateString();
    } catch  {
        return iso;
    }
}
function BlueCheck({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z",
                className: "fill-sky-500/15"
            }, void 0, false, {
                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                lineNumber: 964,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z",
                className: "stroke-sky-500/40",
                strokeWidth: "1.25"
            }, void 0, false, {
                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                lineNumber: 968,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8.35 12.25l2.2 2.2 5.1-5.1",
                className: "stroke-sky-600",
                strokeWidth: "2.25",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                lineNumber: 973,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
        lineNumber: 963,
        columnNumber: 5
    }, this);
}
function VerifiedIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z",
                className: "fill-emerald-600/15"
            }, void 0, false, {
                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                lineNumber: 987,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z",
                className: "stroke-emerald-600/35",
                strokeWidth: "1.2"
            }, void 0, false, {
                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                lineNumber: 991,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8.2 12.3l2.35 2.35L15.9 9.3",
                className: "stroke-emerald-700",
                strokeWidth: "2.2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                lineNumber: 996,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
        lineNumber: 986,
        columnNumber: 5
    }, this);
}
function RotatingBanner({ side, banners, onAddClick }) {
    const { lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$language$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLang"])();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>TEXT[lang || "en"] ?? TEXT.en, [
        lang
    ]);
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (banners.length <= 1) return;
        const interval = setInterval(()=>{
            setCurrentIndex((prev)=>(prev + 1) % banners.length);
        }, 5000);
        return ()=>clearInterval(interval);
    }, [
        banners.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setCurrentIndex(0);
    }, [
        banners
    ]);
    const currentBanner = banners[currentIndex];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "hidden xl:flex flex-col items-center sticky top-32 shrink-0",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-[180px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative h-[600px] w-[180px] overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/80 shadow-[0_18px_50px_rgba(15,23,42,0.10)] backdrop-blur",
                    children: currentBanner ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: currentBanner.image,
                        alt: currentBanner.alt || `Banner ${side}`,
                        className: "h-full w-full object-cover"
                    }, void 0, false, {
                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                        lineNumber: 1033,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-full w-full flex-col items-center justify-center gap-4 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(241,245,249,0.96))] p-5 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 shadow-inner",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "h-8 w-8 text-emerald-600",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M12 4v16m8-8H4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                        lineNumber: 1047,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                    lineNumber: 1041,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                lineNumber: 1040,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-slate-700",
                                        children: t.adSpace
                                    }, void 0, false, {
                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                        lineNumber: 1057,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-slate-400",
                                        children: "180×600px"
                                    }, void 0, false, {
                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                        lineNumber: 1058,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-xs leading-5 text-slate-500",
                                        children: t.bannerEmptyText
                                    }, void 0, false, {
                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                        lineNumber: 1059,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                lineNumber: 1056,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                        lineNumber: 1039,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                    lineNumber: 1031,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>onAddClick(side),
                    className: "group mt-4 flex h-12 w-full items-center justify-center rounded-[1rem] border border-slate-200/80 bg-white text-sm font-semibold text-slate-800 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/70 hover:text-emerald-700",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors group-hover:bg-emerald-100 group-hover:text-emerald-600",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "h-3.5 w-3.5",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2.2,
                                        d: "M12 4v16m8-8H4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                        lineNumber: 1079,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                    lineNumber: 1073,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                lineNumber: 1072,
                                columnNumber: 13
                            }, this),
                            t.addBanner
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                        lineNumber: 1071,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                    lineNumber: 1067,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
            lineNumber: 1030,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
        lineNumber: 1029,
        columnNumber: 5
    }, this);
}
function CompanyPage() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const companySlug = String(params?.id || "");
    const { lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$language$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLang"])();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>TEXT[lang] ?? TEXT.en, [
        lang
    ]);
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("reviews");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [company, setCompany] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [reviews, setReviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [claimStatus, setClaimStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("none");
    const [currentUserId, setCurrentUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [reportOpen, setReportOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reportReviewId, setReportReviewId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [reporterEmail, setReporterEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [reporterCompany, setReporterCompany] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [reportReason, setReportReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [website, setWebsite] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [reportMsg, setReportMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [reportSending, setReportSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastReportAt, setLastReportAt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [leftBanners, setLeftBanners] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [rightBanners, setRightBanners] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isBannerModalOpen, setIsBannerModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedBannerSide, setSelectedBannerSide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedPlan, setSelectedPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [bannerFile, setBannerFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [bannerPreview, setBannerPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [paymentProofFile, setPaymentProofFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [paymentProofName, setPaymentProofName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [bannerOrderCompanyName, setBannerOrderCompanyName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [bannerOrderInvoiceEmail, setBannerOrderInvoiceEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [bannerOrderSubmitting, setBannerOrderSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [bannerOrderSuccess, setBannerOrderSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [bannerOrderError, setBannerOrderError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const pricing = [
        {
            period: "week",
            price: 49,
            label: "1 week"
        },
        {
            period: "month",
            price: 149,
            label: "1 month"
        },
        {
            period: "year",
            price: 999,
            label: "1 year"
        }
    ];
    const translatedPricing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return pricing.map((plan)=>{
            let label = plan.label;
            if (plan.period === "week") {
                if (lang === "de") label = "1 Woche";
                else if (lang === "ru") label = "1 неделя";
                else if (lang === "fr") label = "1 semaine";
                else if (lang === "es") label = "1 semana";
                else if (lang === "it") label = "1 settimana";
            }
            if (plan.period === "month") {
                if (lang === "de") label = "1 Monat";
                else if (lang === "ru") label = "1 месяц";
                else if (lang === "fr") label = "1 mois";
                else if (lang === "es") label = "1 mes";
                else if (lang === "it") label = "1 mese";
            }
            if (plan.period === "year") {
                if (lang === "de") label = "1 Jahr";
                else if (lang === "ru") label = "1 год";
                else if (lang === "fr") label = "1 an";
                else if (lang === "es") label = "1 año";
                else if (lang === "it") label = "1 anno";
            }
            return {
                ...plan,
                label
            };
        });
    }, [
        lang
    ]);
    const selectedPlanData = translatedPricing.find((p)=>p.period === selectedPlan);
    const companyBankData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            companyName: 'SIA "JAKOVLEV CAPITAL"',
            accountNumber: "LV00HABA0000000000000",
            bic: "HABALV22"
        }), []);
    const bannerPaymentPurpose = bannerOrderCompanyName.trim() ? `Banner - ${bannerOrderCompanyName.trim()}` : t.paymentPurposeFallback;
    const canSubmitBannerOrder = !!selectedBannerSide && !!selectedPlan && !!bannerFile && !!paymentProofFile && !!bannerOrderCompanyName.trim() && isValidEmail(bannerOrderInvoiceEmail);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (async ()=>{
            try {
                setErr(null);
                setLoading(true);
                const { data: c, error: cErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("companies").select("id, name, vat_uid, country, trust_score, trust_level, trust_updated_at, is_verified_company, verified_at, verification_method, fraud_score, risk_level, auto_flagged").eq("slug", companySlug).single();
                if (cErr) throw new Error(cErr.message);
                if (!c?.id) throw new Error("Company not found");
                setCompany(c);
                const realCompanyId = String(c.id);
                const { data: r, error: rErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("reviews").select("id, created_at, rating, issue_type, review_text, status, author_email, author_company, author_company_vat, is_verified, verification_method, risk_score, is_flagged").eq("company_id", realCompanyId).eq("status", "published").order("created_at", {
                    ascending: false
                });
                if (rErr) throw new Error(rErr.message);
                const baseReviews = (r || []).map((row)=>({
                        ...row,
                        review_replies: []
                    }));
                const ids = baseReviews.map((x)=>x.id).filter(Boolean);
                if (ids.length > 0) {
                    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].functions.invoke("company-replies", {
                        method: "POST",
                        body: {
                            company_id: realCompanyId,
                            review_ids: ids
                        }
                    });
                    const data = res?.data;
                    if (data?.ok && Array.isArray(data.replies)) {
                        const byReviewId = new Map();
                        for (const rr of data.replies){
                            const rid = String(rr?.review_id || "").trim();
                            if (!rid) continue;
                            byReviewId.set(rid, {
                                review_id: rid,
                                reply_text: rr?.reply_text ?? null,
                                updated_at: rr?.updated_at ?? null
                            });
                        }
                        for (const br of baseReviews){
                            const match = byReviewId.get(br.id);
                            if (match && match.reply_text && String(match.reply_text).trim().length > 0) {
                                br.review_replies = [
                                    {
                                        id: "public",
                                        reply_text: match.reply_text,
                                        updated_at: match.updated_at
                                    }
                                ];
                            }
                        }
                    }
                }
                setReviews(baseReviews);
                const { data: u } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
                const uid = u?.user?.id ?? null;
                setCurrentUserId(uid);
                if (uid) {
                    const { data: claim, error: clErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("company_claims").select("status").eq("company_id", realCompanyId).eq("claimant_user_id", uid).order("created_at", {
                        ascending: false
                    }).limit(1);
                    if (!clErr && claim && claim.length) {
                        const st = String(claim[0].status || "").toLowerCase();
                        if (st === "approved") setClaimStatus("approved");
                        else if (st === "pending") setClaimStatus("pending");
                        else if (st === "rejected") setClaimStatus("rejected");
                        else setClaimStatus("pending");
                    } else {
                        setClaimStatus("none");
                    }
                } else {
                    setClaimStatus("none");
                }
            } catch (e) {
                setErr(String(e?.message || e));
            } finally{
                setLoading(false);
            }
        })();
    }, [
        companySlug
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!companySlug || !company?.name) return;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trackEvent"])({
            event_type: "company_view",
            company_id: company?.id || "",
            company_name: company.name || "",
            page_path: `/companies/${companySlug}`
        });
    }, [
        companySlug,
        company?.id,
        company?.name
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function loadCompanyBanners() {
            const now = new Date();
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("banners").select("id, image_url, alt, placement, is_active, sort_order, expires_at, target_company_id").eq("is_active", true).in("placement", [
                "company_left",
                "company_right"
            ]).is("target_company_id", null).order("sort_order", {
                ascending: true
            });
            const rows = (data || []).filter((item)=>{
                if (!item.expires_at) return true;
                return new Date(item.expires_at) > now;
            });
            const left = rows.filter((item)=>item.placement === "company_left").map((item)=>({
                    id: item.id,
                    image: item.image_url,
                    alt: item.alt || "Left banner"
                }));
            const right = rows.filter((item)=>item.placement === "company_right").map((item)=>({
                    id: item.id,
                    image: item.image_url,
                    alt: item.alt || "Right banner"
                }));
            setLeftBanners(left);
            setRightBanners(right);
        }
        loadCompanyBanners();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!bannerOrderSuccess || !isBannerModalOpen) return;
        const timer = setTimeout(()=>{
            setIsBannerModalOpen(false);
            setBannerOrderSuccess("");
            setBannerOrderError("");
            setSelectedBannerSide(null);
            setSelectedPlan(null);
            setBannerFile(null);
            setBannerPreview(null);
            setPaymentProofFile(null);
            setPaymentProofName(null);
            setBannerOrderCompanyName("");
            setBannerOrderInvoiceEmail("");
        }, 2500);
        return ()=>clearTimeout(timer);
    }, [
        bannerOrderSuccess,
        isBannerModalOpen
    ]);
    const avg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const vals = reviews.map((r)=>r.rating).filter((x)=>typeof x === "number");
        if (!vals.length) return null;
        const s = vals.reduce((a, b)=>a + b, 0);
        return Math.round(s / vals.length * 10) / 10;
    }, [
        reviews
    ]);
    const reviewsCount = reviews.length;
    const isVerifiedCompany = Boolean(company?.is_verified_company);
    const trustScoreUI = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const db = company?.trust_score;
        let base = null;
        if (typeof db === "number" && isFinite(db)) {
            base = Math.max(0, Math.min(100, Math.round(db)));
        } else if (avg !== null) {
            base = Math.max(0, Math.min(100, Math.round((avg - 1) / 4 * 100)));
        } else {
            base = null;
        }
        if (base === null) return null;
        return isVerifiedCompany ? Math.min(100, base + 5) : base;
    }, [
        company?.trust_score,
        avg,
        isVerifiedCompany
    ]);
    const trustScoreSourceLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const db = company?.trust_score;
        if (typeof db === "number" && isFinite(db)) return t.trustBasedOnSignals;
        if (avg === null) return t.trustNoData;
        return t.trustBasedOnReviews;
    }, [
        company?.trust_score,
        avg,
        t
    ]);
    const riskLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const lvl = String(company?.risk_level || "").toLowerCase();
        if (lvl === "high") {
            return {
                text: t.riskHigh,
                cls: "bg-red-50 text-red-800 border-red-200"
            };
        }
        if (lvl === "medium") {
            return {
                text: t.riskMedium,
                cls: "bg-yellow-50 text-yellow-800 border-yellow-200"
            };
        }
        if (lvl === "low") {
            return {
                text: t.riskLow,
                cls: "bg-emerald-50 text-emerald-800 border-emerald-200"
            };
        }
        if (typeof trustScoreUI === "number") {
            if (trustScoreUI >= 75) {
                return {
                    text: t.riskLow,
                    cls: "bg-emerald-50 text-emerald-800 border-emerald-200"
                };
            }
            if (trustScoreUI >= 45) {
                return {
                    text: t.riskMedium,
                    cls: "bg-yellow-50 text-yellow-800 border-yellow-200"
                };
            }
            return {
                text: t.riskHigh,
                cls: "bg-red-50 text-red-800 border-red-200"
            };
        }
        return null;
    }, [
        company?.risk_level,
        trustScoreUI,
        t
    ]);
    const trustBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (trustScoreUI === null) {
            return {
                label: "—",
                cls: "bg-black/5 text-black/70 border-black/10"
            };
        }
        if (trustScoreUI >= 75) {
            return {
                label: `${trustScoreUI}`,
                cls: "bg-emerald-50 text-emerald-800 border-emerald-200"
            };
        }
        if (trustScoreUI >= 45) {
            return {
                label: `${trustScoreUI}`,
                cls: "bg-yellow-50 text-yellow-800 border-yellow-200"
            };
        }
        return {
            label: `${trustScoreUI}`,
            cls: "bg-red-50 text-red-800 border-red-200"
        };
    }, [
        trustScoreUI
    ]);
    const companySchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!company) return null;
        const pageUrl = `https://carriertrust.eu/companies/${companySlug}`;
        const schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${pageUrl}#organization`,
            name: company.name || "Company",
            url: pageUrl
        };
        if (company.country) {
            schema.address = {
                "@type": "PostalAddress",
                addressCountry: company.country
            };
        }
        if (company.vat_uid) {
            schema.identifier = [
                {
                    "@type": "PropertyValue",
                    name: "VAT",
                    value: company.vat_uid
                }
            ];
        }
        if (company.is_verified_company) {
            schema.award = [
                "Verified company"
            ];
        }
        if (typeof trustScoreUI === "number") {
            schema.aggregateRating = {
                "@type": "AggregateRating",
                ratingValue: trustScoreUI,
                bestRating: 100,
                worstRating: 0,
                ratingCount: Math.max(reviewsCount || 0, 1)
            };
        }
        return schema;
    }, [
        company,
        companySlug,
        trustScoreUI,
        reviewsCount
    ]);
    function openReport(reviewId) {
        setReportMsg(null);
        setReportReviewId(reviewId);
        setReportOpen(true);
    }
    function openBannerOrder(side) {
        setSelectedBannerSide(side);
        setSelectedPlan(null);
        setBannerFile(null);
        setBannerPreview(null);
        setPaymentProofFile(null);
        setPaymentProofName(null);
        setBannerOrderCompanyName("");
        setBannerOrderInvoiceEmail("");
        setBannerOrderSuccess("");
        setBannerOrderError("");
        setIsBannerModalOpen(true);
    }
    function closeBannerModal() {
        setIsBannerModalOpen(false);
        setBannerOrderSuccess("");
        setBannerOrderError("");
    }
    function handleBannerUpload(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        setBannerFile(file);
        const reader = new FileReader();
        reader.onloadend = ()=>{
            setBannerPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
    function handlePaymentProofUpload(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        setPaymentProofFile(file);
        setPaymentProofName(file.name);
    }
    async function handleSubmitBannerOrder() {
        if (!canSubmitBannerOrder || !selectedPlanData || !selectedBannerSide || !bannerFile || !paymentProofFile) {
            return;
        }
        try {
            setBannerOrderSubmitting(true);
            setBannerOrderSuccess("");
            setBannerOrderError("");
            const placement = selectedBannerSide === "left" ? "company_left" : "company_right";
            const realCompanyId = company?.id || "";
            const body = new FormData();
            body.append("side", selectedBannerSide);
            body.append("placement", placement);
            body.append("period", selectedPlanData.period);
            body.append("periodLabel", selectedPlanData.label);
            body.append("price", String(selectedPlanData.price));
            body.append("companyName", bannerOrderCompanyName.trim());
            body.append("invoiceEmail", bannerOrderInvoiceEmail.trim());
            body.append("paymentPurpose", bannerPaymentPurpose);
            body.append("targetCompanyId", realCompanyId);
            body.append("target_company_id", realCompanyId);
            body.append("bannerFile", bannerFile, bannerFile.name);
            body.append("paymentProof", paymentProofFile, paymentProofFile.name);
            const response = await fetch("/api/banner-order", {
                method: "POST",
                body
            });
            const text = await response.text();
            let result = null;
            try {
                result = JSON.parse(text);
            } catch  {
                result = null;
            }
            if (!response.ok) {
                throw new Error(result?.error || text || t.errorSending);
            }
            setBannerOrderSuccess(t.bannerSuccessMessage);
        } catch (error) {
            setBannerOrderError(error instanceof Error ? error.message : t.errorSending);
        } finally{
            setBannerOrderSubmitting(false);
        }
    }
    async function submitReport() {
        if (!reportReviewId) return;
        const now = Date.now();
        if (lastReportAt && now - lastReportAt < 30_000) {
            setReportMsg(t.waitSpam);
            return;
        }
        const email = reporterEmail.trim().toLowerCase();
        const comp = reporterCompany.trim().toUpperCase();
        const reason = reportReason.trim();
        if (!email || !reason) return setReportMsg(t.fillEmailReason);
        if (!isValidEmail(email)) return setReportMsg(t.invalidEmail);
        if (!isBusinessEmail(email)) return setReportMsg(t.businessEmailOnly);
        setReportSending(true);
        setReportMsg(null);
        const page_url = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : `https://carriertrust.eu/companies/${companySlug}`;
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].functions.invoke("submit-report", {
                body: {
                    website,
                    review_id: reportReviewId,
                    company_id: company?.id || "",
                    company_name: company?.name || "",
                    company_vat: company?.vat_uid || "",
                    page_url,
                    reporter_email: email,
                    reporter_company: comp || "",
                    reason,
                    details: ""
                }
            });
            const data = res?.data;
            if (!data?.ok) {
                const code = data?.code;
                const blockedUntil = data?.blocked_until || null;
                if (code === 409) return setReportMsg(t.duplicateError);
                if (code === 429) {
                    return setReportMsg(formatWaitMessage(lang, blockedUntil, t));
                }
                return setReportMsg(String(data?.message || t.sendFailedGeneric));
            }
            setLastReportAt(Date.now());
            setReportMsg(t.thanks);
            setReporterEmail("");
            setReporterCompany("");
            setReportReason("");
            setWebsite("");
            setTimeout(()=>{
                setReportOpen(false);
                setReportReviewId(null);
                setReportMsg(null);
            }, 900);
        } catch (e) {
            setReportMsg(String(e?.message || t.sendFailedGeneric));
        } finally{
            setReportSending(false);
        }
    }
    const hero = "rounded-[2rem] border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_25px_80px_rgba(15,23,42,0.08)]";
    const card = "rounded-[1.75rem] border border-slate-200/70 bg-white/75 backdrop-blur-xl shadow-sm";
    const input = "w-full rounded-2xl border border-slate-200 bg-white/85 backdrop-blur px-4 py-3 outline-none text-slate-900 placeholder:text-slate-400 focus:border-slate-300 shadow-sm";
    const primaryBtn = "inline-flex w-full sm:w-auto items-center justify-center rounded-2xl px-4 py-3 bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition shadow-lg shadow-slate-900/15";
    const ghostBtn = "inline-flex w-full sm:w-auto items-center justify-center rounded-2xl px-4 py-3 border border-slate-200 bg-white/80 text-sm font-semibold text-slate-700 hover:bg-white transition";
    const disabledBtn = "inline-flex w-full sm:w-auto items-center justify-center rounded-2xl px-4 py-3 border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-400 cursor-default";
    const pill = "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold";
    const verifiedReviewPill = "bg-emerald-50 text-emerald-800 border-emerald-200";
    const warnBox = "rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-orange-900";
    const replyBox = "rounded-2xl border border-slate-200 bg-slate-50/80 p-4";
    const verifiedCompanyPill = "border-emerald-200 bg-gradient-to-b from-emerald-50 to-emerald-100 text-emerald-950 shadow-[0_10px_30px_rgba(16,185,129,0.14)]";
    const reportBtn = "self-start text-xs font-medium text-slate-400 hover:text-slate-600 transition select-none no-underline decoration-transparent";
    const tabWrap = "mt-6 flex items-center gap-6 border-b border-slate-200 overflow-x-auto whitespace-nowrap";
    const tabBtn = "pb-3 text-sm font-semibold transition";
    const tabOn = "text-slate-900 border-b-2 border-slate-900";
    const tabOff = "text-slate-500 hover:text-slate-900";
    function authorLabel(r) {
        const name = (r.author_company || "").trim();
        if (name) return name;
        const email = (r.author_email || "").trim();
        if (email) return email;
        return "—";
    }
    const claimNext = `/claim-company?company_id=${encodeURIComponent(company?.id || "")}`;
    const claimHref = currentUserId ? claimNext : `/auth?next=${encodeURIComponent(claimNext)}`;
    const writeHref = `/write-review?company_id=${encodeURIComponent(company?.id || "")}`;
    const fraudScore = typeof company?.fraud_score === "number" ? company.fraud_score : 0;
    const autoFlagged = Boolean(company?.auto_flagged);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen text-slate-900",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-none fixed inset-0 overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-slate-50"
                        }, void 0, false, {
                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                            lineNumber: 1762,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.14),transparent)]"
                        }, void 0, false, {
                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                            lineNumber: 1763,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-[8%] left-[8%] h-[24rem] w-[24rem] rounded-full bg-emerald-300/20 blur-3xl"
                        }, void 0, false, {
                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                            lineNumber: 1764,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute bottom-[8%] right-[10%] h-[20rem] w-[20rem] rounded-full bg-cyan-300/20 blur-3xl"
                        }, void 0, false, {
                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                            lineNumber: 1765,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,rgba(15,23,42,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.55)_1px,transparent_1px)] bg-[size:4rem_4rem]"
                        }, void 0, false, {
                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                            lineNumber: 1766,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                    lineNumber: 1761,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative px-6 pt-36 md:pt-40 pb-16",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-5xl mx-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-black/70",
                            children: t.loading
                        }, void 0, false, {
                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                            lineNumber: 1771,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                        lineNumber: 1770,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                    lineNumber: 1769,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
            lineNumber: 1760,
            columnNumber: 7
        }, this);
    }
    if (err) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen text-black",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative px-6 pt-28 md:pt-32 pb-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 rounded-2xl border border-red-200 bg-red-50 p-3 text-red-800",
                        children: err
                    }, void 0, false, {
                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                        lineNumber: 1783,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                    lineNumber: 1782,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                lineNumber: 1781,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
            lineNumber: 1780,
            columnNumber: 7
        }, this);
    }
    if (!company) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen text-black",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative px-6 pt-28 md:pt-32 pb-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 text-black/70",
                        children: t.companyNotFound
                    }, void 0, false, {
                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                        lineNumber: 1797,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                    lineNumber: 1796,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                lineNumber: 1795,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
            lineNumber: 1794,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen text-black",
        children: [
            companySchema ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: {
                    __html: JSON.stringify(companySchema)
                }
            }, void 0, false, {
                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                lineNumber: 1807,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative px-6 pb-16 pt-44 md:pt-48",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto flex max-w-[1520px] items-start gap-10 xl:gap-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RotatingBanner, {
                                side: "left",
                                banners: leftBanners,
                                onAddClick: openBannerOrder
                            }, void 0, false, {
                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                lineNumber: 1817,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-auto min-w-0 max-w-4xl flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `relative overflow-hidden p-6 md:p-8 ${hero}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pointer-events-none absolute inset-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute -right-16 -top-20 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                        lineNumber: 1826,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-cyan-200/30 blur-3xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                        lineNumber: 1827,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                lineNumber: 1825,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative flex flex-col items-start justify-between gap-8 lg:flex-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "min-w-0 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex min-w-0 items-start gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                                        className: "break-words text-2xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-3xl md:text-4xl",
                                                                        children: company?.name || "Company"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 1833,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    isVerifiedCompany ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "mt-[6px] inline-flex items-center",
                                                                        title: t.verifiedCompanyHelp,
                                                                        "aria-label": t.verifiedCompany,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BlueCheck, {
                                                                            className: "h-6 w-6"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 1843,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 1838,
                                                                        columnNumber: 23
                                                                    }, this) : null
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                lineNumber: 1832,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-4 flex flex-wrap items-center gap-2.5 text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `${pill} border-black/10 bg-white/70 text-black/70`,
                                                                        children: [
                                                                            t.vatLabel,
                                                                            ":",
                                                                            " ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "ml-1 font-bold text-black",
                                                                                children: (company?.vat_uid || "—").toUpperCase()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                lineNumber: 1851,
                                                                                columnNumber: 23
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 1849,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    company?.country ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `${pill} border-black/10 bg-white/70 text-black/70`,
                                                                        children: [
                                                                            t.countryLabel,
                                                                            ":",
                                                                            " ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "ml-1 font-bold text-black",
                                                                                children: company.country
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                lineNumber: 1859,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 1857,
                                                                        columnNumber: 23
                                                                    }, this) : null,
                                                                    isVerifiedCompany ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "inline-flex items-center gap-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: `${pill} ${verifiedCompanyPill} px-3 py-1.5`,
                                                                                title: t.verifiedCompanyHelp,
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "inline-flex items-center gap-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VerifiedIcon, {
                                                                                            className: "h-4 w-4"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                            lineNumber: 1872,
                                                                                            columnNumber: 29
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-extrabold tracking-tight",
                                                                                            children: t.verifiedCompany
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                            lineNumber: 1873,
                                                                                            columnNumber: 29
                                                                                        }, this),
                                                                                        company.verified_at ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "ml-1 text-[11px] font-semibold text-emerald-900/70",
                                                                                            children: formatDate(company.verified_at)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                            lineNumber: 1877,
                                                                                            columnNumber: 31
                                                                                        }, this) : null
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 1871,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                lineNumber: 1867,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                                href: "/verification",
                                                                                className: "text-xs font-semibold text-black/50 underline decoration-black/15 transition hover:text-black hover:decoration-black/40",
                                                                                children: t.verifiedLearnMore
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                lineNumber: 1884,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 1866,
                                                                        columnNumber: 23
                                                                    }, this) : null
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                lineNumber: 1848,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: writeHref,
                                                                        className: primaryBtn,
                                                                        children: t.writeReview
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 1895,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    claimStatus === "approved" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: "/company/profile",
                                                                        className: ghostBtn,
                                                                        children: t.companyDashboard
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 1900,
                                                                        columnNumber: 23
                                                                    }, this) : claimStatus === "pending" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: disabledBtn,
                                                                        children: t.claimPending
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 1904,
                                                                        columnNumber: 23
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: claimHref,
                                                                        className: ghostBtn,
                                                                        children: t.claimThisCompany
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 1906,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-slate-500 sm:ml-1",
                                                                        children: avg !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-semibold text-black",
                                                                                    children: avg
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 1914,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                "/5 •",
                                                                                " ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-semibold text-black",
                                                                                    children: reviewsCount
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 1915,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                " ",
                                                                                t.reviews.toLowerCase()
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 1913,
                                                                            columnNumber: 25
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-semibold text-black",
                                                                                    children: reviewsCount
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 1922,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                " ",
                                                                                t.reviews.toLowerCase()
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 1921,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 1911,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                lineNumber: 1894,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: tabWrap,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setTab("reviews"),
                                                                        className: `${tabBtn} ${tab === "reviews" ? tabOn : tabOff}`,
                                                                        children: t.tabsReviews
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 1932,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setTab("timeline"),
                                                                        className: `${tabBtn} ${tab === "timeline" ? tabOn : tabOff}`,
                                                                        children: t.tabsTimeline
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 1938,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setTab("about"),
                                                                        className: `${tabBtn} ${tab === "about" ? tabOn : tabOff}`,
                                                                        children: t.tabsAbout
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 1944,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                lineNumber: 1931,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                        lineNumber: 1831,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "shrink-0",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-full rounded-[1.75rem] border border-slate-200/70 bg-white/80 px-5 py-5 shadow-sm backdrop-blur-xl lg:w-[280px]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-between",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs text-black/55",
                                                                            children: t.trustScore
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 1956,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        riskLabel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `rounded-full border px-2.5 py-1 text-[11px] font-semibold ${riskLabel.cls}`,
                                                                            children: [
                                                                                t.riskLabel,
                                                                                ": ",
                                                                                riskLabel.text
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 1959,
                                                                            columnNumber: 25
                                                                        }, this) : null
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                    lineNumber: 1955,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-3 flex items-center justify-between",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `rounded-2xl border px-3 py-1.5 text-sm font-semibold ${trustBadge.cls}`,
                                                                            children: [
                                                                                trustBadge.label,
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "ml-1 text-[11px] font-semibold opacity-70",
                                                                                    children: "/100"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 1972,
                                                                                    columnNumber: 25
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 1968,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs text-black/55",
                                                                            children: [
                                                                                reviewsCount,
                                                                                " ",
                                                                                t.reviews.toLowerCase()
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 1976,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                    lineNumber: 1967,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-4 h-2 overflow-hidden rounded-full bg-black/5",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "h-full bg-black/60",
                                                                        style: {
                                                                            width: `${trustScoreUI === null ? 0 : Math.max(8, Math.min(100, trustScoreUI))}%`
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 1982,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                    lineNumber: 1981,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-2 text-[11px] text-black/45",
                                                                    children: [
                                                                        trustScoreSourceLabel,
                                                                        isVerifiedCompany ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "ml-1 text-black/50",
                                                                            children: [
                                                                                "• +5 ",
                                                                                t.verifiedBonus
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 1997,
                                                                            columnNumber: 25
                                                                        }, this) : null
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                    lineNumber: 1994,
                                                                    columnNumber: 21
                                                                }, this),
                                                                company.trust_updated_at ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-2 text-[11px] text-black/35",
                                                                    children: [
                                                                        t.updatedLabel,
                                                                        ": ",
                                                                        formatDate(company.trust_updated_at)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                    lineNumber: 2004,
                                                                    columnNumber: 23
                                                                }, this) : null,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-4 rounded-2xl border border-black/10 bg-white/60 px-3 py-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center justify-between",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "text-[11px] font-semibold text-black/55",
                                                                                    children: t.fraudScoreLabel
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 2011,
                                                                                    columnNumber: 25
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "text-[11px] font-extrabold text-black",
                                                                                    children: fraudScore
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 2014,
                                                                                    columnNumber: 25
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 2010,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        autoFlagged ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-1 text-[11px] text-red-700",
                                                                            children: t.autoFlaggedLabel
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 2019,
                                                                            columnNumber: 25
                                                                        }, this) : null
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                    lineNumber: 2009,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                            lineNumber: 1954,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                        lineNumber: 1953,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                lineNumber: 1830,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                        lineNumber: 1824,
                                        columnNumber: 13
                                    }, this),
                                    tab === "reviews" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-8",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl",
                                                        children: t.reviews
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                        lineNumber: 2032,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1 text-sm text-slate-500",
                                                        children: t.latestPublished
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                        lineNumber: 2035,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                lineNumber: 2031,
                                                columnNumber: 17
                                            }, this),
                                            reviews.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `mt-4 p-6 ${card}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-bold",
                                                        children: t.noReviewsTitle
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                        lineNumber: 2042,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 text-sm text-black/65",
                                                        children: t.noReviewsText
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                        lineNumber: 2043,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                lineNumber: 2041,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 space-y-4",
                                                children: reviews.map((r)=>{
                                                    const risk = Number(r.risk_score ?? 0);
                                                    const flagged = Boolean(r.is_flagged) || risk >= 3;
                                                    const reply = r.review_replies && r.review_replies.length > 0 ? r.review_replies[0] : null;
                                                    const hasReply = Boolean(reply?.reply_text && String(reply.reply_text).trim().length > 0);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `p-5 md:p-6 ${card}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "min-w-0",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex flex-wrap items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "text-[20px] leading-none text-black",
                                                                                        children: stars(r.rating || 0)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                        lineNumber: 2067,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    r.is_verified ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: `${pill} ${verifiedReviewPill}`,
                                                                                        children: [
                                                                                            t.verified,
                                                                                            r.verification_method ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "ml-2 text-[11px] font-semibold text-emerald-700/80",
                                                                                                children: String(r.verification_method)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                                lineNumber: 2075,
                                                                                                columnNumber: 39
                                                                                            }, this) : null
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                        lineNumber: 2072,
                                                                                        columnNumber: 35
                                                                                    }, this) : null
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                lineNumber: 2066,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-2 text-sm text-slate-600",
                                                                                children: [
                                                                                    t.by,
                                                                                    " ",
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "font-semibold text-black",
                                                                                        children: authorLabel(r)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                        lineNumber: 2085,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    r.author_company_vat ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "ml-2 text-xs text-black/45",
                                                                                        children: [
                                                                                            "(",
                                                                                            String(r.author_company_vat).toUpperCase(),
                                                                                            ")"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                        lineNumber: 2089,
                                                                                        columnNumber: 35
                                                                                    }, this) : null
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                lineNumber: 2083,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 text-xs text-slate-500",
                                                                                children: [
                                                                                    new Date(r.created_at).toLocaleDateString(),
                                                                                    r.issue_type ? ` • ${r.issue_type}` : "",
                                                                                    risk > 0 ? ` • risk ${risk}` : ""
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                lineNumber: 2095,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 2065,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>openReport(r.id),
                                                                        className: reportBtn,
                                                                        title: t.report,
                                                                        children: t.report
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 2102,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                lineNumber: 2064,
                                                                columnNumber: 27
                                                            }, this),
                                                            flagged ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-4",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: warnBox,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-sm font-bold",
                                                                            children: t.underReviewTitle
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 2114,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-1 text-sm opacity-90",
                                                                            children: t.underReviewText
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 2117,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                    lineNumber: 2113,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                lineNumber: 2112,
                                                                columnNumber: 29
                                                            }, this) : null,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700",
                                                                children: r.review_text || ""
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                lineNumber: 2124,
                                                                columnNumber: 27
                                                            }, this),
                                                            hasReply ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `mt-4 ${replyBox}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-between gap-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-xs font-semibold text-black/70",
                                                                                children: [
                                                                                    t.companyReplyTitle,
                                                                                    " ",
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "ml-2 rounded-full border border-black/10 bg-white/70 px-2 py-0.5 text-[11px] text-black/60",
                                                                                        children: t.official
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                        lineNumber: 2133,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                lineNumber: 2131,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            reply?.updated_at ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-xs text-black/45",
                                                                                children: new Date(reply.updated_at).toLocaleDateString()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                lineNumber: 2138,
                                                                                columnNumber: 35
                                                                            }, this) : null
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 2130,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700",
                                                                        children: String(reply?.reply_text || "")
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 2144,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                lineNumber: 2129,
                                                                columnNumber: 29
                                                            }, this) : null
                                                        ]
                                                    }, r.id, true, {
                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                        lineNumber: 2063,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                lineNumber: 2048,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-10 text-xs leading-6 text-slate-500",
                                                children: t.neutralHostingNote
                                            }, void 0, false, {
                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                lineNumber: 2155,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    tab === "timeline" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `mt-8 p-6 ${card}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-bold",
                                                children: t.timelineTitle
                                            }, void 0, false, {
                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                lineNumber: 2163,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-sm text-black/65",
                                                children: t.timelineText
                                            }, void 0, false, {
                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                lineNumber: 2164,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                        lineNumber: 2162,
                                        columnNumber: 15
                                    }, this),
                                    tab === "about" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `mt-8 p-6 ${card}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-bold",
                                                children: t.aboutTitle
                                            }, void 0, false, {
                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                lineNumber: 2170,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-sm text-black/65",
                                                children: t.aboutText
                                            }, void 0, false, {
                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                lineNumber: 2171,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                        lineNumber: 2169,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                lineNumber: 1823,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RotatingBanner, {
                                side: "right",
                                banners: rightBanners,
                                onAddClick: openBannerOrder
                            }, void 0, false, {
                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                lineNumber: 2176,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                        lineNumber: 1816,
                        columnNumber: 9
                    }, this),
                    reportOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 px-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-full max-w-lg p-5 ${hero}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-lg font-bold",
                                                    children: t.reportTitle
                                                }, void 0, false, {
                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                    lineNumber: 2188,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-sm text-black/60",
                                                    children: t.reportHelp
                                                }, void 0, false, {
                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                    lineNumber: 2189,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                            lineNumber: 2187,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setReportOpen(false);
                                                setReportReviewId(null);
                                                setReportMsg(null);
                                            },
                                            className: "rounded-2xl border border-black/10 bg-white/70 px-3 py-2 text-sm font-semibold transition hover:bg-white",
                                            children: t.close
                                        }, void 0, false, {
                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                            lineNumber: 2192,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                    lineNumber: 2186,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: website,
                                            onChange: (e)=>setWebsite(e.target.value),
                                            name: "website",
                                            type: "text",
                                            autoComplete: "off",
                                            tabIndex: -1,
                                            style: {
                                                position: "absolute",
                                                left: "-9999px",
                                                height: 0,
                                                width: 0,
                                                opacity: 0
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                            lineNumber: 2205,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: reporterEmail,
                                            onChange: (e)=>setReporterEmail(e.target.value),
                                            placeholder: t.yourEmail,
                                            className: input
                                        }, void 0, false, {
                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                            lineNumber: 2221,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: reporterCompany,
                                            onChange: (e)=>setReporterCompany(e.target.value.toUpperCase()),
                                            placeholder: t.yourCompany,
                                            className: `${input} uppercase`
                                        }, void 0, false, {
                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                            lineNumber: 2228,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: reportReason,
                                            onChange: (e)=>setReportReason(e.target.value),
                                            placeholder: t.reason,
                                            rows: 5,
                                            className: input
                                        }, void 0, false, {
                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                            lineNumber: 2235,
                                            columnNumber: 17
                                        }, this),
                                        reportMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-black/10 bg-white/70 p-3 text-sm text-black/80",
                                            children: reportMsg
                                        }, void 0, false, {
                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                            lineNumber: 2244,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: submitReport,
                                            disabled: reportSending,
                                            className: "w-full rounded-2xl bg-black px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-black/90 disabled:opacity-60",
                                            children: reportSending ? t.sending : t.submitReport
                                        }, void 0, false, {
                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                            lineNumber: 2249,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                    lineNumber: 2204,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                            lineNumber: 2185,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                        lineNumber: 2184,
                        columnNumber: 11
                    }, this),
                    isBannerModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-full max-w-4xl rounded-[2rem] border border-white/50 bg-white/92 shadow-[0_40px_120px_rgba(15,23,42,0.25)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: closeBannerModal,
                                    className: "absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "h-5 w-5 text-slate-500",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M6 18L18 6M6 6l12 12"
                                        }, void 0, false, {
                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                            lineNumber: 2274,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                        lineNumber: 2268,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                    lineNumber: 2264,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 md:p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "h-5 w-5 text-emerald-600",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                    lineNumber: 2291,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                lineNumber: 2285,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                            lineNumber: 2284,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-[18px] font-bold text-slate-900",
                                            children: t.orderBanner
                                        }, void 0, false, {
                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                            lineNumber: 2300,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-[13px] text-slate-500",
                                            children: [
                                                t.companyPageLabel,
                                                " • ",
                                                t.sideLabel,
                                                ":",
                                                " ",
                                                selectedBannerSide === "left" ? t.sideLeft : t.sideRight,
                                                " • ",
                                                t.sizeLabel,
                                                " 180×600px"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                            lineNumber: 2301,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_220px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[13px] font-semibold text-slate-700",
                                                                    children: t.choosePeriod
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                    lineNumber: 2309,
                                                                    columnNumber: 23
                                                                }, this),
                                                                translatedPricing.map((plan)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: `flex cursor-pointer items-center justify-between rounded-2xl border-2 px-3 py-2 transition-all ${selectedPlan === plan.period ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-emerald-200"}`,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-3",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        type: "radio",
                                                                                        name: "company-banner-plan",
                                                                                        value: plan.period,
                                                                                        checked: selectedPlan === plan.period,
                                                                                        onChange: (e)=>setSelectedPlan(e.target.value),
                                                                                        className: "h-4 w-4 text-emerald-600"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                        lineNumber: 2323,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[15px] font-medium text-slate-700",
                                                                                        children: plan.label
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                        lineNumber: 2331,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                lineNumber: 2322,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[16px] font-bold text-slate-900",
                                                                                children: [
                                                                                    "€",
                                                                                    plan.price
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                lineNumber: 2336,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, plan.period, true, {
                                                                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                        lineNumber: 2314,
                                                                        columnNumber: 25
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                            lineNumber: 2308,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2.5 grid gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "mb-1 block text-[13px] font-semibold text-slate-700",
                                                                            children: t.companyName
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 2345,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            value: bannerOrderCompanyName,
                                                                            onChange: (e)=>setBannerOrderCompanyName(e.target.value),
                                                                            className: "h-9 w-full rounded-xl border border-slate-200 px-3 outline-none transition-colors focus:border-emerald-400",
                                                                            placeholder: t.companyNamePlaceholder
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 2348,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                    lineNumber: 2344,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "mb-1 block text-[13px] font-semibold text-slate-700",
                                                                            children: t.invoiceEmail
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 2357,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "email",
                                                                            value: bannerOrderInvoiceEmail,
                                                                            onChange: (e)=>setBannerOrderInvoiceEmail(e.target.value),
                                                                            className: `h-9 w-full rounded-xl border px-3 outline-none transition-colors ${bannerOrderInvoiceEmail.length === 0 ? "border-slate-200 focus:border-emerald-400" : isValidEmail(bannerOrderInvoiceEmail) ? "border-emerald-300 focus:border-emerald-500" : "border-red-300 focus:border-red-500"}`,
                                                                            placeholder: t.invoiceEmailPlaceholder
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 2361,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        bannerOrderInvoiceEmail.length > 0 && !isValidEmail(bannerOrderInvoiceEmail) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-1 text-xs text-red-500",
                                                                            children: t.invalidEmail
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 2377,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                    lineNumber: 2356,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "mb-1 block text-[13px] font-semibold text-slate-700",
                                                                            children: t.uploadBanner
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 2384,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-2.5 text-center transition-colors hover:border-emerald-300",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-sm font-medium leading-tight text-slate-700",
                                                                                    children: t.chooseBannerFile
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 2388,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "mt-0.5 text-xs leading-tight text-slate-400",
                                                                                    children: t.recommendedSize
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 2391,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "file",
                                                                                    accept: "image/*",
                                                                                    onChange: handleBannerUpload,
                                                                                    className: "hidden"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 2394,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 2387,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                    lineNumber: 2383,
                                                                    columnNumber: 23
                                                                }, this),
                                                                selectedPlanData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "rounded-2xl border border-emerald-200 bg-emerald-50 p-2.5",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mb-1.5 text-[13px] font-semibold text-emerald-900",
                                                                            children: t.paymentDetails
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 2405,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "grid grid-cols-2 gap-x-3 gap-y-1 text-[13px] text-slate-700",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "col-span-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-semibold",
                                                                                            children: [
                                                                                                t.bankCompany,
                                                                                                ":"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                            lineNumber: 2411,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        " ",
                                                                                        companyBankData.companyName
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 2410,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "col-span-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-semibold",
                                                                                            children: [
                                                                                                t.bankAccount,
                                                                                                ":"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                            lineNumber: 2415,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        " ",
                                                                                        companyBankData.accountNumber
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 2414,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-semibold",
                                                                                            children: [
                                                                                                t.bankBic,
                                                                                                ":"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                            lineNumber: 2419,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        " ",
                                                                                        companyBankData.bic
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 2418,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-semibold",
                                                                                            children: [
                                                                                                t.amount,
                                                                                                ":"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                            lineNumber: 2422,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        " €",
                                                                                        selectedPlanData.price,
                                                                                        " + VAT (EU 0%, LV 21%)"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 2421,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "col-span-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-semibold",
                                                                                            children: [
                                                                                                t.paymentPurpose,
                                                                                                ":"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                            lineNumber: 2425,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        " ",
                                                                                        bannerPaymentPurpose
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 2424,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 2409,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                    lineNumber: 2404,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "mb-1 block text-[13px] font-semibold text-slate-700",
                                                                            children: t.uploadPaymentProof
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 2433,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-2.5 text-center transition-colors hover:border-emerald-300",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-sm font-medium leading-tight text-slate-700",
                                                                                    children: t.uploadPaymentConfirmation
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 2437,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "mt-0.5 text-xs leading-tight text-slate-400",
                                                                                    children: t.paymentProofFormats
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 2440,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "file",
                                                                                    accept: ".pdf,image/*",
                                                                                    onChange: handlePaymentProofUpload,
                                                                                    className: "hidden"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                                    lineNumber: 2443,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 2436,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        paymentProofName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-1 text-xs font-medium text-emerald-600",
                                                                            children: [
                                                                                "✓ ",
                                                                                paymentProofName
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                            lineNumber: 2452,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                    lineNumber: 2432,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                            lineNumber: 2343,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                    lineNumber: 2307,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mb-1 text-[13px] font-semibold text-slate-700",
                                                            children: t.bannerPreview
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                            lineNumber: 2461,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-[600px] w-[180px] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 shadow-sm",
                                                            children: bannerPreview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: bannerPreview,
                                                                alt: t.bannerPreview,
                                                                className: "h-full w-full object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                lineNumber: 2467,
                                                                columnNumber: 25
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex h-full w-full items-center justify-center p-4 text-center text-sm leading-8 text-slate-400",
                                                                children: t.bannerPreviewEmpty
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                                lineNumber: 2473,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                            lineNumber: 2465,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                    lineNumber: 2460,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                            lineNumber: 2306,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 flex flex-col gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    disabled: !canSubmitBannerOrder || bannerOrderSubmitting,
                                                    onClick: handleSubmitBannerOrder,
                                                    className: `flex h-12 w-full items-center justify-center rounded-2xl text-base font-semibold transition-all ${canSubmitBannerOrder && !bannerOrderSubmitting ? "bg-slate-900 text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] hover:-translate-y-0.5 hover:bg-slate-800" : "cursor-not-allowed bg-slate-100 text-slate-400"}`,
                                                    children: bannerOrderSubmitting ? t.sending : t.havePaid
                                                }, void 0, false, {
                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                    lineNumber: 2482,
                                                    columnNumber: 19
                                                }, this),
                                                bannerOrderSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700",
                                                    children: bannerOrderSuccess
                                                }, void 0, false, {
                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                    lineNumber: 2495,
                                                    columnNumber: 21
                                                }, this),
                                                bannerOrderError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700",
                                                    children: bannerOrderError
                                                }, void 0, false, {
                                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                                    lineNumber: 2501,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                            lineNumber: 2481,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1.5 text-center text-xs text-slate-400",
                                            children: t.publishAfterModeration
                                        }, void 0, false, {
                                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                            lineNumber: 2507,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                                    lineNumber: 2283,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                            lineNumber: 2263,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                        lineNumber: 2262,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
                lineNumber: 1815,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/companies/[id]/CompanyClient.tsx",
        lineNumber: 1805,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_companies_%5Bid%5D_CompanyClient_tsx_58983a91._.js.map