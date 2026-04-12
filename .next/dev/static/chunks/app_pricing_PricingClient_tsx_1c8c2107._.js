(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/pricing/PricingClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PricingPage
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
const EN = {
    loading: "Loading…",
    signIn: "Sign in",
    billingLabel: "Billing",
    pricingTitle: "Pricing",
    pricingSub: "Choose the plan format that fits your company.",
    detectedCompany: "Detected company",
    companyFallback: "Company",
    success: "Success",
    actionRequired: "Action required",
    info: "Info",
    freePlan: "FREE",
    proPlan: "PRO",
    oneMonthPlan: "ONE MONTH",
    recommended: "Most popular",
    current: "Current",
    available: "Available",
    unavailable: "Unavailable",
    upgrade: "Upgrade",
    scheduled: "Scheduled",
    expired: "Expired",
    basicCompanyPresence: "Basic company presence",
    perMonthAutoRenew: "per month • auto-renew",
    oneTimePayment: "one-time payment",
    freeFeature1: "1 official reply",
    freeFeature2: "No analytics",
    freeFeature3: "No dispute system",
    freeFooter: "Good for getting started.",
    proFeature1: "Unlimited replies",
    proFeature2: "Dispute fake reviews",
    proFeature3: "Analytics",
    proFeature4: "Verified PRO badge",
    proFeature5: "Email alerts for new reviews",
    contractTerms: "Contract terms",
    contractLine1: "€49 is charged automatically every month.",
    contractLine2: "Initial minimum commitment: 12 months.",
    contractLine3: "After the initial 12 months, billing continues automatically every month until canceled. If canceled before the initial 12 months end, an early cancellation fee of €49 is charged.",
    readFullAgreement: "Read full agreement",
    proStartsOn: "PRO will start automatically on",
    agreeTerms: "I agree to the 12-month commitment, recurring monthly billing, automatic renewal after the initial 12 months, and early cancellation terms.",
    currentBillingEnds: "Current billing period ends",
    commitmentEnds: "Commitment ends",
    remainsActiveUntil: "PRO remains active until",
    earlyFeePaid: "€49 early cancellation fee paid.",
    alreadyPro: "Already PRO",
    proScheduled: "PRO scheduled",
    openingCheckout: "Opening checkout…",
    syncing: "Syncing…",
    subscribePro: "Subscribe €49/mo",
    processing: "Processing…",
    cancelPlan: "Cancel plan",
    cancelScheduled: "Cancellation scheduled",
    planCanceled: "Cancellation scheduled successfully.",
    earlyCancellationFeeCharged: "Cancellation scheduled. €49 early cancellation fee charged.",
    monthFeature1: "PRO access for 30 days",
    monthFeature2: "No automatic renewal",
    monthFeature3: "Good for a paid trial month",
    monthFeature4: "Email alerts for new reviews",
    monthTermsTitle: "Terms",
    monthTerms1: "You pay once for 30 days of access.",
    monthTerms2: "No automatic renewal.",
    accessEnds: "Access ends",
    alreadyActive: "Already active",
    buyOneMonth: "Buy 1 month €69",
    vatNote: "VAT is calculated automatically in Stripe Checkout. Business customers can enter VAT ID where available.",
    pleaseSignInFirst: "Please sign in first.",
    noApprovedClaim: "No approved company claim found. Claim your company first.",
    acceptTermsFirst: "Please accept the PRO contract terms before subscribing.",
    alreadyHasPro: "Your company already has PRO.",
    alreadyScheduled: "PRO is already scheduled and will start on",
    alreadyHasOneMonth: "Your company already has one-month access.",
    couldNotStartCheckout: "Could not start checkout.",
    activePaidPlan: "Your company already has an active paid plan.",
    activeProPlan: "Your company already has an active PRO plan.",
    activeOneMonthPlan: "Your company already has active ONE MONTH access.",
    noCheckoutUrl: "Could not open Stripe Checkout. The server did not return a checkout URL.",
    couldNotCancelSubscription: "Could not cancel subscription.",
    checkoutCanceled: "Checkout canceled. No payment was taken.",
    paymentReceivedActivating: "Payment received. Activating plan…",
    paidPlanActive: "Your company plan is now active.",
    paymentSyncInProgress: "Payment succeeded, but plan sync is still in progress. Refresh this page in a moment.",
    delayedUpgradeSuccess: "Your PRO subscription was purchased successfully and will start automatically after your ONE MONTH access ends on"
};
const RU = {
    loading: "Загрузка…",
    signIn: "Войти",
    billingLabel: "Биллинг",
    pricingTitle: "Тарифы",
    pricingSub: "Выберите формат тарифа, который подходит вашей компании.",
    detectedCompany: "Определённая компания",
    companyFallback: "Компания",
    success: "Успешно",
    actionRequired: "Требуется действие",
    info: "Информация",
    freePlan: "БЕСПЛАТНО",
    proPlan: "ПРО",
    oneMonthPlan: "ОДИН МЕСЯЦ",
    recommended: "Оптимальный выбор",
    current: "Текущий",
    available: "Доступен",
    unavailable: "Недоступен",
    upgrade: "Переход",
    scheduled: "Запланирован",
    expired: "Истёк",
    basicCompanyPresence: "Базовое присутствие компании",
    perMonthAutoRenew: "в месяц • автопродление",
    oneTimePayment: "разовый платёж",
    freeFeature1: "1 официальный ответ",
    freeFeature2: "Без аналитики",
    freeFeature3: "Без системы споров",
    freeFooter: "Подходит для старта.",
    proFeature1: "Неограниченные ответы",
    proFeature2: "Оспаривание фейковых отзывов",
    proFeature3: "Аналитика",
    proFeature4: "Проверенный PRO badge",
    proFeature5: "Email-уведомления о новых отзывах",
    contractTerms: "Условия договора",
    contractLine1: "€49 списываются автоматически каждый месяц.",
    contractLine2: "Минимальный обязательный срок: 12 месяцев.",
    contractLine3: "После первых 12 месяцев списание продолжается автоматически каждый месяц, пока план не будет отменён. При отмене до окончания первых 12 месяцев автоматически списывается штраф €49.",
    readFullAgreement: "Читать полное соглашение",
    proStartsOn: "PRO начнёт действовать автоматически",
    agreeTerms: "Я принимаю обязательство на 12 месяцев, ежемесячное автосписание, автопродление после первых 12 месяцев и условия досрочной отмены.",
    currentBillingEnds: "Текущий расчётный период заканчивается",
    commitmentEnds: "Срок обязательства заканчивается",
    remainsActiveUntil: "PRO остаётся активным до",
    earlyFeePaid: "Штраф за досрочную отмену €49 списан.",
    alreadyPro: "Уже ПРО",
    proScheduled: "ПРО запланирован",
    openingCheckout: "Открываем checkout…",
    syncing: "Синхронизация…",
    subscribePro: "Подключить ПРО €49/мес",
    processing: "Обработка…",
    cancelPlan: "Отменить план",
    cancelScheduled: "Отмена запланирована",
    planCanceled: "Отмена успешно запланирована.",
    earlyCancellationFeeCharged: "Отмена запланирована. Штраф за досрочную отмену €49 списан.",
    monthFeature1: "PRO доступ на 30 дней",
    monthFeature2: "Без автопродления",
    monthFeature3: "Подходит для платного тестового месяца",
    monthFeature4: "Email-уведомления о новых отзывах",
    monthTermsTitle: "Условия",
    monthTerms1: "Вы платите один раз за 30 дней доступа.",
    monthTerms2: "Без автоматического продления.",
    accessEnds: "Доступ заканчивается",
    alreadyActive: "Уже активен",
    buyOneMonth: "Купить 1 месяц €69",
    vatNote: "НДС рассчитывается автоматически в Stripe Checkout. Бизнес-клиенты могут указать VAT ID, если доступно.",
    pleaseSignInFirst: "Сначала войдите в аккаунт.",
    noApprovedClaim: "Не найден подтверждённый claim компании. Сначала заявите права на компанию.",
    acceptTermsFirst: "Пожалуйста, примите условия договора PRO перед подпиской.",
    alreadyHasPro: "У вашей компании уже есть PRO.",
    alreadyScheduled: "PRO уже запланирован и начнёт действовать",
    alreadyHasOneMonth: "У вашей компании уже есть доступ на один месяц.",
    couldNotStartCheckout: "Не удалось запустить checkout.",
    activePaidPlan: "У вашей компании уже есть активный платный тариф.",
    activeProPlan: "У вашей компании уже есть активный PRO тариф.",
    activeOneMonthPlan: "У вашей компании уже есть активный ONE MONTH доступ.",
    noCheckoutUrl: "Не удалось открыть Stripe Checkout. Сервер не вернул checkout URL.",
    couldNotCancelSubscription: "Не удалось отменить подписку.",
    checkoutCanceled: "Checkout отменён. Оплата не была списана.",
    paymentReceivedActivating: "Оплата получена. Активируем тариф…",
    paidPlanActive: "Тариф компании теперь активен.",
    paymentSyncInProgress: "Оплата прошла успешно, но синхронизация тарифа ещё продолжается. Обновите страницу через минуту.",
    delayedUpgradeSuccess: "Подписка PRO успешно оплачена и начнёт действовать автоматически после окончания ONE MONTH доступа"
};
const DE = {
    loading: "Lädt…",
    signIn: "Anmelden",
    billingLabel: "Abrechnung",
    pricingTitle: "Preise",
    pricingSub: "Wählen Sie das Tarifmodell, das zu Ihrem Unternehmen passt.",
    detectedCompany: "Erkanntes Unternehmen",
    companyFallback: "Unternehmen",
    success: "Erfolg",
    actionRequired: "Aktion erforderlich",
    info: "Info",
    freePlan: "KOSTENLOS",
    proPlan: "PRO",
    oneMonthPlan: "EIN MONAT",
    recommended: "Am beliebtesten",
    current: "Aktuell",
    available: "Verfügbar",
    unavailable: "Nicht verfügbar",
    upgrade: "Upgrade",
    scheduled: "Geplant",
    expired: "Abgelaufen",
    basicCompanyPresence: "Grundlegende Firmenpräsenz",
    perMonthAutoRenew: "pro Monat • automatische Verlängerung",
    oneTimePayment: "Einmalzahlung",
    freeFeature1: "1 offizielle Antwort",
    freeFeature2: "Keine Analysen",
    freeFeature3: "Kein Streitfall-System",
    freeFooter: "Gut für den Einstieg.",
    proFeature1: "Unbegrenzte Antworten",
    proFeature2: "Fake-Bewertungen anfechten",
    proFeature3: "Analysen",
    proFeature4: "Verifiziertes PRO-Abzeichen",
    proFeature5: "E-Mail-Benachrichtigungen über neue Bewertungen",
    contractTerms: "Vertragsbedingungen",
    contractLine1: "€49 werden jeden Monat automatisch berechnet.",
    contractLine2: "Mindestlaufzeit: 12 Monate.",
    contractLine3: "Nach den ersten 12 Monaten läuft die monatliche Abrechnung automatisch weiter, bis gekündigt wird. Bei vorzeitiger Kündigung wird eine Gebühr von €49 berechnet.",
    readFullAgreement: "Vollständige Vereinbarung lesen",
    proStartsOn: "PRO startet automatisch am",
    agreeTerms: "Ich stimme der 12-monatigen Verpflichtung, der wiederkehrenden monatlichen Abrechnung, der automatischen Verlängerung nach den ersten 12 Monaten und den Bedingungen der vorzeitigen Kündigung zu.",
    currentBillingEnds: "Aktueller Abrechnungszeitraum endet",
    commitmentEnds: "Verpflichtung endet",
    remainsActiveUntil: "PRO bleibt aktiv bis",
    earlyFeePaid: "Die Gebühr für vorzeitige Kündigung in Höhe von €49 wurde berechnet.",
    alreadyPro: "Bereits PRO",
    proScheduled: "PRO geplant",
    openingCheckout: "Checkout wird geöffnet…",
    syncing: "Synchronisierung…",
    subscribePro: "PRO abonnieren €49/Monat",
    processing: "Wird verarbeitet…",
    cancelPlan: "Plan kündigen",
    cancelScheduled: "Kündigung geplant",
    planCanceled: "Kündigung erfolgreich geplant.",
    earlyCancellationFeeCharged: "Kündigung geplant. Die Gebühr für vorzeitige Kündigung in Höhe von €49 wurde berechnet.",
    monthFeature1: "PRO-Zugang für 30 Tage",
    monthFeature2: "Keine automatische Verlängerung",
    monthFeature3: "Gut für einen bezahlten Testmonat",
    monthFeature4: "E-Mail-Benachrichtigungen über neue Bewertungen",
    monthTermsTitle: "Bedingungen",
    monthTerms1: "Sie zahlen einmal für 30 Tage Zugang.",
    monthTerms2: "Keine automatische Verlängerung.",
    accessEnds: "Zugang endet",
    alreadyActive: "Bereits aktiv",
    buyOneMonth: "1 Monat kaufen €69",
    vatNote: "Die MwSt. wird in Stripe Checkout automatisch berechnet. Geschäftskunden können, falls verfügbar, eine USt-IdNr. eingeben.",
    pleaseSignInFirst: "Bitte melden Sie sich zuerst an.",
    noApprovedClaim: "Kein genehmigter Unternehmens-Claim gefunden. Beanspruchen Sie zuerst Ihr Unternehmen.",
    acceptTermsFirst: "Bitte akzeptieren Sie die PRO-Vertragsbedingungen, bevor Sie abonnieren.",
    alreadyHasPro: "Ihr Unternehmen hat bereits PRO.",
    alreadyScheduled: "PRO ist bereits geplant und startet am",
    alreadyHasOneMonth: "Ihr Unternehmen hat bereits einen Monatszugang.",
    couldNotStartCheckout: "Checkout konnte nicht gestartet werden.",
    activePaidPlan: "Ihr Unternehmen hat bereits einen aktiven kostenpflichtigen Tarif.",
    activeProPlan: "Ihr Unternehmen hat bereits einen aktiven PRO-Tarif.",
    activeOneMonthPlan: "Ihr Unternehmen hat bereits einen aktiven EIN-MONAT-Zugang.",
    noCheckoutUrl: "Stripe Checkout konnte nicht geöffnet werden. Der Server hat keine Checkout-URL zurückgegeben.",
    couldNotCancelSubscription: "Abonnement konnte nicht gekündigt werden.",
    checkoutCanceled: "Checkout abgebrochen. Es wurde keine Zahlung vorgenommen.",
    paymentReceivedActivating: "Zahlung erhalten. Tarif wird aktiviert…",
    paidPlanActive: "Ihr Unternehmenstarif ist jetzt aktiv.",
    paymentSyncInProgress: "Die Zahlung war erfolgreich, aber die Tarifsynchronisierung läuft noch. Aktualisieren Sie diese Seite in einem Moment.",
    delayedUpgradeSuccess: "Ihr PRO-Abonnement wurde erfolgreich gekauft und startet automatisch, nachdem Ihr EIN-MONAT-Zugang endet am"
};
const FR = {
    loading: "Chargement…",
    signIn: "Connexion",
    billingLabel: "Facturation",
    pricingTitle: "Tarifs",
    pricingSub: "Choisissez la formule adaptée à votre entreprise.",
    detectedCompany: "Entreprise détectée",
    companyFallback: "Entreprise",
    success: "Succès",
    actionRequired: "Action requise",
    info: "Info",
    freePlan: "GRATUIT",
    proPlan: "PRO",
    oneMonthPlan: "UN MOIS",
    recommended: "Le plus populaire",
    current: "Actuel",
    available: "Disponible",
    unavailable: "Indisponible",
    upgrade: "Passer à PRO",
    scheduled: "Planifié",
    expired: "Expiré",
    basicCompanyPresence: "Présence de base de l’entreprise",
    perMonthAutoRenew: "par mois • renouvellement automatique",
    oneTimePayment: "paiement unique",
    freeFeature1: "1 réponse officielle",
    freeFeature2: "Pas d’analytique",
    freeFeature3: "Pas de système de litige",
    freeFooter: "Idéal pour commencer.",
    proFeature1: "Réponses illimitées",
    proFeature2: "Contester les faux avis",
    proFeature3: "Analytique",
    proFeature4: "Badge PRO vérifié",
    proFeature5: "Alertes e-mail pour les nouveaux avis",
    contractTerms: "Conditions du contrat",
    contractLine1: "€49 sont débités automatiquement chaque mois.",
    contractLine2: "Engagement minimum : 12 mois.",
    contractLine3: "Après les 12 premiers mois, la facturation mensuelle continue automatiquement jusqu’à annulation. En cas de résiliation anticipée, des frais de €49 sont facturés.",
    readFullAgreement: "Lire l’accord complet",
    proStartsOn: "PRO démarrera automatiquement le",
    agreeTerms: "J’accepte l’engagement de 12 mois, la facturation mensuelle récurrente, le renouvellement automatique après les 12 premiers mois et les conditions de résiliation anticipée.",
    currentBillingEnds: "La période de facturation actuelle se termine le",
    commitmentEnds: "L’engagement se termine le",
    remainsActiveUntil: "PRO reste actif jusqu’au",
    earlyFeePaid: "Les frais de résiliation anticipée de €49 ont été facturés.",
    alreadyPro: "Déjà PRO",
    proScheduled: "PRO planifié",
    openingCheckout: "Ouverture du checkout…",
    syncing: "Synchronisation…",
    subscribePro: "Souscrire PRO €49/mois",
    processing: "Traitement…",
    cancelPlan: "Annuler l’abonnement",
    cancelScheduled: "Résiliation programmée",
    planCanceled: "Résiliation programmée avec succès.",
    earlyCancellationFeeCharged: "Résiliation programmée. Des frais de résiliation anticipée de €49 ont été facturés.",
    monthFeature1: "Accès PRO pendant 30 jours",
    monthFeature2: "Pas de renouvellement automatique",
    monthFeature3: "Idéal pour un mois d’essai payant",
    monthFeature4: "Alertes e-mail pour les nouveaux avis",
    monthTermsTitle: "Conditions",
    monthTerms1: "Vous payez une seule fois pour 30 jours d’accès.",
    monthTerms2: "Pas de renouvellement automatique.",
    accessEnds: "L’accès se termine le",
    alreadyActive: "Déjà actif",
    buyOneMonth: "Acheter 1 mois €69",
    vatNote: "La TVA est calculée automatiquement dans Stripe Checkout. Les clients professionnels peuvent saisir leur numéro de TVA si disponible.",
    pleaseSignInFirst: "Veuillez vous connecter d’abord.",
    noApprovedClaim: "Aucune revendication d’entreprise approuvée trouvée. Revendiquez d’abord votre entreprise.",
    acceptTermsFirst: "Veuillez accepter les conditions PRO avant de vous abonner.",
    alreadyHasPro: "Votre entreprise dispose déjà de PRO.",
    alreadyScheduled: "PRO est déjà planifié et démarrera le",
    alreadyHasOneMonth: "Votre entreprise dispose déjà d’un accès d’un mois.",
    couldNotStartCheckout: "Impossible de démarrer le checkout.",
    activePaidPlan: "Votre entreprise a déjà une offre payante active.",
    activeProPlan: "Votre entreprise a déjà une offre PRO active.",
    activeOneMonthPlan: "Votre entreprise a déjà un accès UN MOIS actif.",
    noCheckoutUrl: "Impossible d’ouvrir Stripe Checkout. Le serveur n’a pas renvoyé d’URL.",
    couldNotCancelSubscription: "Impossible d’annuler l’abonnement.",
    checkoutCanceled: "Checkout annulé. Aucun paiement n’a été effectué.",
    paymentReceivedActivating: "Paiement reçu. Activation de l’offre…",
    paidPlanActive: "L’offre de votre entreprise est maintenant active.",
    paymentSyncInProgress: "Le paiement a réussi, mais la synchronisation de l’offre est encore en cours. Actualisez cette page dans un instant.",
    delayedUpgradeSuccess: "Votre abonnement PRO a bien été acheté et démarrera automatiquement après la fin de votre accès UN MOIS le"
};
const ES = {
    loading: "Cargando…",
    signIn: "Iniciar sesión",
    billingLabel: "Facturación",
    pricingTitle: "Precios",
    pricingSub: "Elige el plan que mejor se adapta a tu empresa.",
    detectedCompany: "Empresa detectada",
    companyFallback: "Empresa",
    success: "Éxito",
    actionRequired: "Acción requerida",
    info: "Info",
    freePlan: "GRATIS",
    proPlan: "PRO",
    oneMonthPlan: "UN MES",
    recommended: "Más popular",
    current: "Actual",
    available: "Disponible",
    unavailable: "No disponible",
    upgrade: "Mejorar",
    scheduled: "Programado",
    expired: "Expirado",
    basicCompanyPresence: "Presencia básica de la empresa",
    perMonthAutoRenew: "por mes • renovación automática",
    oneTimePayment: "pago único",
    freeFeature1: "1 respuesta oficial",
    freeFeature2: "Sin analítica",
    freeFeature3: "Sin sistema de disputas",
    freeFooter: "Ideal para comenzar.",
    proFeature1: "Respuestas ilimitadas",
    proFeature2: "Impugnar reseñas falsas",
    proFeature3: "Analítica",
    proFeature4: "Insignia PRO verificada",
    proFeature5: "Alertas por correo sobre nuevas reseñas",
    contractTerms: "Términos del contrato",
    contractLine1: "€49 se cobran automáticamente cada mes.",
    contractLine2: "Compromiso mínimo: 12 meses.",
    contractLine3: "Después de los primeros 12 meses, el cobro mensual continúa automáticamente hasta la cancelación. Si cancelas antes de ese plazo, se cobra una penalización de €49.",
    readFullAgreement: "Leer acuerdo completo",
    proStartsOn: "PRO comenzará automáticamente el",
    agreeTerms: "Acepto el compromiso de 12 meses, la facturación mensual recurrente, la renovación automática después de los primeros 12 meses y las condiciones de cancelación anticipada.",
    currentBillingEnds: "El periodo actual de facturación termina el",
    commitmentEnds: "El compromiso termina el",
    remainsActiveUntil: "PRO permanece activo hasta",
    earlyFeePaid: "Se cobró la tarifa de cancelación anticipada de €49.",
    alreadyPro: "Ya es PRO",
    proScheduled: "PRO programado",
    openingCheckout: "Abriendo checkout…",
    syncing: "Sincronizando…",
    subscribePro: "Suscribirse a PRO €49/mes",
    processing: "Procesando…",
    cancelPlan: "Cancelar plan",
    cancelScheduled: "Cancelación programada",
    planCanceled: "Cancelación programada correctamente.",
    earlyCancellationFeeCharged: "Cancelación programada. Se cobró una tarifa de cancelación anticipada de €49.",
    monthFeature1: "Acceso PRO durante 30 días",
    monthFeature2: "Sin renovación automática",
    monthFeature3: "Ideal para un mes de prueba pagado",
    monthFeature4: "Alertas por correo sobre nuevas reseñas",
    monthTermsTitle: "Términos",
    monthTerms1: "Pagas una vez por 30 días de acceso.",
    monthTerms2: "Sin renovación automática.",
    accessEnds: "El acceso termina el",
    alreadyActive: "Ya activo",
    buyOneMonth: "Comprar 1 mes €69",
    vatNote: "El IVA se calcula automáticamente en Stripe Checkout. Los clientes empresariales pueden introducir su VAT ID si está disponible.",
    pleaseSignInFirst: "Primero inicia sesión.",
    noApprovedClaim: "No se encontró una reclamación de empresa aprobada. Reclama primero tu empresa.",
    acceptTermsFirst: "Acepta primero los términos del contrato PRO antes de suscribirte.",
    alreadyHasPro: "Tu empresa ya tiene PRO.",
    alreadyScheduled: "PRO ya está programado y comenzará el",
    alreadyHasOneMonth: "Tu empresa ya tiene acceso de un mes.",
    couldNotStartCheckout: "No se pudo iniciar el checkout.",
    activePaidPlan: "Tu empresa ya tiene un plan de pago activo.",
    activeProPlan: "Tu empresa ya tiene un plan PRO activo.",
    activeOneMonthPlan: "Tu empresa ya tiene acceso UN MES activo.",
    noCheckoutUrl: "No se pudo abrir Stripe Checkout. El servidor no devolvió una URL de checkout.",
    couldNotCancelSubscription: "No se pudo cancelar la suscripción.",
    checkoutCanceled: "Checkout cancelado. No se realizó ningún cobro.",
    paymentReceivedActivating: "Pago recibido. Activando plan…",
    paidPlanActive: "El plan de tu empresa ya está activo.",
    paymentSyncInProgress: "El pago fue exitoso, pero la sincronización del plan sigue en curso. Actualiza esta página en un momento.",
    delayedUpgradeSuccess: "Tu suscripción PRO se compró correctamente y comenzará automáticamente después de que termine tu acceso UN MES el"
};
const IT = {
    loading: "Caricamento…",
    signIn: "Accedi",
    billingLabel: "Fatturazione",
    pricingTitle: "Prezzi",
    pricingSub: "Scegli il piano più adatto alla tua azienda.",
    detectedCompany: "Azienda rilevata",
    companyFallback: "Azienda",
    success: "Successo",
    actionRequired: "Azione richiesta",
    info: "Info",
    freePlan: "GRATIS",
    proPlan: "PRO",
    oneMonthPlan: "UN MESE",
    recommended: "Più popolare",
    current: "Attuale",
    available: "Disponibile",
    unavailable: "Non disponibile",
    upgrade: "Upgrade",
    scheduled: "Programmato",
    expired: "Scaduto",
    basicCompanyPresence: "Presenza aziendale di base",
    perMonthAutoRenew: "al mese • rinnovo automatico",
    oneTimePayment: "pagamento una tantum",
    freeFeature1: "1 risposta ufficiale",
    freeFeature2: "Nessuna analitica",
    freeFeature3: "Nessun sistema di contestazione",
    freeFooter: "Ideale per iniziare.",
    proFeature1: "Risposte illimitate",
    proFeature2: "Contestare recensioni false",
    proFeature3: "Analitica",
    proFeature4: "Badge PRO verificato",
    proFeature5: "Avvisi email per nuove recensioni",
    contractTerms: "Termini del contratto",
    contractLine1: "€49 vengono addebitati automaticamente ogni mese.",
    contractLine2: "Impegno minimo: 12 mesi.",
    contractLine3: "Dopo i primi 12 mesi, la fatturazione mensile continua automaticamente fino alla cancellazione. In caso di cancellazione anticipata viene addebitata una penale di €49.",
    readFullAgreement: "Leggi l’accordo completo",
    proStartsOn: "PRO inizierà automaticamente il",
    agreeTerms: "Accetto l’impegno di 12 mesi, la fatturazione mensile ricorrente, il rinnovo automatico dopo i primi 12 mesi e le condizioni di cancellazione anticipata.",
    currentBillingEnds: "Il periodo di fatturazione attuale termina il",
    commitmentEnds: "L’impegno termina il",
    remainsActiveUntil: "PRO resta attivo fino al",
    earlyFeePaid: "È stata addebitata la penale di cancellazione anticipata di €49.",
    alreadyPro: "Già PRO",
    proScheduled: "PRO programmato",
    openingCheckout: "Apertura checkout…",
    syncing: "Sincronizzazione…",
    subscribePro: "Abbonati a PRO €49/mese",
    processing: "Elaborazione…",
    cancelPlan: "Annulla piano",
    cancelScheduled: "Cancellazione pianificata",
    planCanceled: "Cancellazione pianificata con successo.",
    earlyCancellationFeeCharged: "Cancellazione pianificata. È stata addebitata una penale di cancellazione anticipata di €49.",
    monthFeature1: "Accesso PRO per 30 giorni",
    monthFeature2: "Nessun rinnovo automatico",
    monthFeature3: "Ideale per un mese di prova a pagamento",
    monthFeature4: "Avvisi email per nuove recensioni",
    monthTermsTitle: "Termini",
    monthTerms1: "Paghi una sola volta per 30 giorni di accesso.",
    monthTerms2: "Nessun rinnovo automatico.",
    accessEnds: "L’accesso termina il",
    alreadyActive: "Già attivo",
    buyOneMonth: "Acquista 1 mese €69",
    vatNote: "L’IVA viene calcolata automaticamente in Stripe Checkout. I clienti business possono inserire il VAT ID, dove disponibile.",
    pleaseSignInFirst: "Accedi prima.",
    noApprovedClaim: "Nessun claim aziendale approvato trovato. Rivendica prima la tua azienda.",
    acceptTermsFirst: "Accetta prima i termini del contratto PRO prima di abbonarti.",
    alreadyHasPro: "La tua azienda ha già PRO.",
    alreadyScheduled: "PRO è già programmato e inizierà il",
    alreadyHasOneMonth: "La tua azienda ha già accesso di un mese.",
    couldNotStartCheckout: "Impossibile avviare il checkout.",
    activePaidPlan: "La tua azienda ha già un piano a pagamento attivo.",
    activeProPlan: "La tua azienda ha già un piano PRO attivo.",
    activeOneMonthPlan: "La tua azienda ha già un accesso UN MESE attivo.",
    noCheckoutUrl: "Impossibile aprire Stripe Checkout. Il server non ha restituito un URL di checkout.",
    couldNotCancelSubscription: "Impossibile annullare l’abbonamento.",
    checkoutCanceled: "Checkout annullato. Nessun pagamento effettuato.",
    paymentReceivedActivating: "Pagamento ricevuto. Attivazione piano…",
    paidPlanActive: "Il piano della tua azienda è ora attivo.",
    paymentSyncInProgress: "Il pagamento è andato a buon fine, ma la sincronizzazione del piano è ancora in corso. Aggiorna questa pagina tra un momento.",
    delayedUpgradeSuccess: "Il tuo abbonamento PRO è stato acquistato con successo e inizierà automaticamente dopo la fine del tuo accesso UN MESE il"
};
const TEXT = {
    en: EN,
    de: DE,
    ru: RU,
    fr: FR,
    es: ES,
    it: IT
};
const DATE_LOCALE = {
    en: "en-GB",
    de: "de-DE",
    ru: "ru-RU",
    fr: "fr-FR",
    es: "es-ES",
    it: "it-IT"
};
function formatDate(iso, locale = "en-GB") {
    if (!iso) return "—";
    try {
        return new Intl.DateTimeFormat(locale, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }).format(new Date(iso));
    } catch  {
        return String(iso);
    }
}
function normalizePlanName(value) {
    return String(value || "free").toLowerCase();
}
function PlanBullet({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "flex gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
            }, void 0, false, {
                fileName: "[project]/app/pricing/PricingClient.tsx",
                lineNumber: 815,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: children
            }, void 0, false, {
                fileName: "[project]/app/pricing/PricingClient.tsx",
                lineNumber: 816,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/pricing/PricingClient.tsx",
        lineNumber: 814,
        columnNumber: 5
    }, this);
}
_c = PlanBullet;
function TopPill({ children, tone = "idle" }) {
    const cls = tone === "active" ? "border-emerald-200 bg-emerald-50 text-emerald-900" : tone === "scheduled" ? "border-blue-200 bg-blue-50 text-blue-900" : "border-slate-200 bg-slate-50 text-slate-600";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex min-h-[34px] items-center justify-center rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide ${cls}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/pricing/PricingClient.tsx",
        lineNumber: 836,
        columnNumber: 5
    }, this);
}
_c1 = TopPill;
function PlanCard({ children, featured = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: [
            "flex min-h-[900px] flex-col rounded-[30px] p-8 backdrop-blur-2xl",
            featured ? "border border-slate-900/10 bg-white/84 shadow-[0_22px_70px_rgba(15,23,42,0.10)] ring-1 ring-slate-900/5" : "border border-white/70 bg-white/78 shadow-[0_18px_60px_rgba(15,23,42,0.08)]"
        ].join(" "),
        children: children
    }, void 0, false, {
        fileName: "[project]/app/pricing/PricingClient.tsx",
        lineNumber: 852,
        columnNumber: 5
    }, this);
}
_c2 = PlanCard;
function PlanHeader({ title, badge, badgeTone = "neutral", pill }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-[72px] items-start justify-between gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-[30px] font-extrabold tracking-tight",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/app/pricing/PricingClient.tsx",
                        lineNumber: 879,
                        columnNumber: 9
                    }, this),
                    badge ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: [
                            "mt-3 inline-flex rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] shadow-sm whitespace-nowrap",
                            badgeTone === "featured" ? "border border-slate-900/10 bg-slate-900 text-white" : "border border-slate-200 bg-slate-50 text-slate-600"
                        ].join(" "),
                        children: badge
                    }, void 0, false, {
                        fileName: "[project]/app/pricing/PricingClient.tsx",
                        lineNumber: 881,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/pricing/PricingClient.tsx",
                lineNumber: 878,
                columnNumber: 7
            }, this),
            pill
        ]
    }, void 0, true, {
        fileName: "[project]/app/pricing/PricingClient.tsx",
        lineNumber: 877,
        columnNumber: 5
    }, this);
}
_c3 = PlanHeader;
function PriceBlock({ price, caption }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-8 h-[84px]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-end gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[44px] font-extrabold leading-none tracking-tight",
                    children: price
                }, void 0, false, {
                    fileName: "[project]/app/pricing/PricingClient.tsx",
                    lineNumber: 908,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pb-1 text-sm text-slate-500",
                    children: caption
                }, void 0, false, {
                    fileName: "[project]/app/pricing/PricingClient.tsx",
                    lineNumber: 909,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/pricing/PricingClient.tsx",
            lineNumber: 907,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/pricing/PricingClient.tsx",
        lineNumber: 906,
        columnNumber: 5
    }, this);
}
_c4 = PriceBlock;
function PricingPage() {
    _s();
    const { lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$language$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const locale = DATE_LOCALE[lang || "en"] ?? "en-GB";
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PricingPage.useMemo[t]": ()=>TEXT[lang] ?? TEXT.en
    }["PricingPage.useMemo[t]"], [
        lang
    ]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [syncing, setSyncing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [payingPurchase, setPayingPurchase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [canceling, setCanceling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [companyId, setCompanyId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [company, setCompany] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [plan, setPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [statusMsg, setStatusMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [statusType, setStatusType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [agreedProTerms, setAgreedProTerms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isAuthed = Boolean(userId);
    const planName = normalizePlanName(plan?.plan);
    const scheduledPlanName = normalizePlanName(plan?.scheduled_plan);
    const isPro = planName === "pro";
    const isOneMonthActive = planName === "one_month";
    const isFree = !isPro && !isOneMonthActive;
    const hasScheduledPro = scheduledPlanName === "pro" && Boolean(plan?.scheduled_start_at);
    const isCancellationScheduled = Boolean(plan?.cancel_at_period_end);
    const isExpired = String(plan?.plan_status || "").toLowerCase() === "expired";
    const earlyFeeWasCharged = Boolean(isCancellationScheduled && plan?.canceled_at && plan?.commitment_end && new Date(plan.canceled_at).getTime() < new Date(plan.commitment_end).getTime());
    const disableProPurchase = !isAuthed || !companyId || isPro || hasScheduledPro || payingPurchase !== null || !agreedProTerms && !hasScheduledPro || syncing;
    const disableOneMonthPurchase = !isAuthed || !companyId || isOneMonthActive || isPro || hasScheduledPro || payingPurchase !== null || syncing;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PricingPage.useEffect": ()=>{
            ({
                "PricingPage.useEffect": async ()=>{
                    await loadInitialPage();
                    await handleStripeReturn();
                }
            })["PricingPage.useEffect"]();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["PricingPage.useEffect"], []);
    async function loadInitialPage() {
        setLoading(true);
        try {
            await Promise.race([
                refreshPlanData(),
                new Promise((resolve)=>setTimeout(resolve, 4000))
            ]);
        } catch (err) {
            console.error("loadInitialPage error:", err);
        } finally{
            setLoading(false);
        }
    }
    async function refreshPlanData() {
        try {
            const { data: userRes, error: userError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
            const user = userRes?.user;
            if (userError || !user) {
                setUserId(null);
                setCompanyId(null);
                setCompany(null);
                setPlan(null);
                return {
                    planValue: "free"
                };
            }
            setUserId(user.id);
            const { data: claim, error: claimError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("company_claims").select("company_id, status").eq("claimant_user_id", user.id).eq("status", "approved").order("created_at", {
                ascending: false
            }).limit(1).maybeSingle();
            if (claimError || !claim?.company_id) {
                setCompanyId(null);
                setCompany(null);
                setPlan(null);
                return {
                    planValue: "free"
                };
            }
            const cid = String(claim.company_id);
            setCompanyId(cid);
            const { data: companyRow } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("companies").select("id, name, vat_uid, country").eq("id", cid).maybeSingle();
            setCompany(companyRow || null);
            const { data: planRow, error: planError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("company_plans").select("plan, plan_status, current_period_end, commitment_end, scheduled_plan, scheduled_start_at, scheduled_setup_intent_id, scheduled_stripe_subscription_id, stripe_customer_id, stripe_subscription_id, cancel_at_period_end, canceled_at").eq("company_id", cid).maybeSingle();
            if (planError) {
                setPlan(null);
                return {
                    planValue: "free"
                };
            }
            const nextPlan = planRow || null;
            setPlan(nextPlan);
            return {
                planValue: normalizePlanName(nextPlan?.plan)
            };
        } catch (err) {
            console.error("refreshPlanData error:", err);
            setCompanyId(null);
            setCompany(null);
            setPlan(null);
            return {
                planValue: "free"
            };
        }
    }
    async function handleStripeReturn() {
        const url = new URL(window.location.href);
        const paid = url.searchParams.get("paid");
        const canceled = url.searchParams.get("canceled");
        const delayedUpgrade = url.searchParams.get("delayed_upgrade");
        const delayedUntil = url.searchParams.get("delayed_until");
        if (canceled === "1") {
            setStatusType("info");
            setStatusMsg(t.checkoutCanceled);
            cleanupQueryParams();
            return;
        }
        if (paid !== "1") return;
        if (delayedUpgrade === "1" && delayedUntil) {
            await refreshPlanData();
            setStatusType("success");
            setStatusMsg(`${t.delayedUpgradeSuccess} ${formatDate(delayedUntil, locale)}.`);
            cleanupQueryParams();
            return;
        }
        setSyncing(true);
        setStatusType("info");
        setStatusMsg(t.paymentReceivedActivating);
        for(let i = 0; i < 15; i++){
            const result = await refreshPlanData();
            if (result.planValue === "pro" || result.planValue === "one_month") {
                setStatusType("success");
                setStatusMsg(t.paidPlanActive);
                setSyncing(false);
                cleanupQueryParams();
                return;
            }
            await new Promise((resolve)=>setTimeout(resolve, 1500));
        }
        setStatusType("info");
        setStatusMsg(t.paymentSyncInProgress);
        setSyncing(false);
        cleanupQueryParams();
    }
    function cleanupQueryParams() {
        const url = new URL(window.location.href);
        url.searchParams.delete("paid");
        url.searchParams.delete("canceled");
        url.searchParams.delete("purchase");
        url.searchParams.delete("session_id");
        url.searchParams.delete("delayed_upgrade");
        url.searchParams.delete("delayed_until");
        window.history.replaceState({}, "", url.toString());
    }
    async function startCheckout(purchase) {
        setStatusMsg(null);
        setStatusType(null);
        if (!isAuthed) {
            setStatusType("error");
            setStatusMsg(t.pleaseSignInFirst);
            return;
        }
        if (!companyId) {
            setStatusType("error");
            setStatusMsg(t.noApprovedClaim);
            return;
        }
        if (purchase === "pro_monthly" && !agreedProTerms && !hasScheduledPro) {
            setStatusType("error");
            setStatusMsg(t.acceptTermsFirst);
            return;
        }
        if (purchase === "pro_monthly" && isPro) {
            setStatusType("info");
            setStatusMsg(t.alreadyHasPro);
            return;
        }
        if (purchase === "pro_monthly" && hasScheduledPro) {
            setStatusType("info");
            setStatusMsg(`${t.alreadyScheduled} ${formatDate(plan?.scheduled_start_at, locale)}.`);
            return;
        }
        if (purchase === "one_month" && isOneMonthActive) {
            setStatusType("info");
            setStatusMsg(t.alreadyHasOneMonth);
            return;
        }
        if (purchase === "one_month" && isPro) {
            setStatusType("info");
            setStatusMsg(t.activeProPlan);
            return;
        }
        if (purchase === "one_month" && hasScheduledPro) {
            setStatusType("info");
            setStatusMsg(`${t.alreadyScheduled} ${formatDate(plan?.scheduled_start_at, locale)}.`);
            return;
        }
        setPayingPurchase(purchase);
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].functions.invoke("create-checkout-session", {
                body: {
                    purchase
                }
            });
            const data = res?.data;
            const fnError = res?.error;
            if (fnError) {
                setStatusType("error");
                setStatusMsg(fnError.message || t.couldNotStartCheckout);
                return;
            }
            if (!data?.ok) {
                setStatusType("error");
                setStatusMsg(String(data?.error || t.couldNotStartCheckout));
                return;
            }
            if (data?.already_paid_plan) {
                await refreshPlanData();
                if (data?.scheduled_plan === "pro" && data?.scheduled_start_at) {
                    setStatusType("info");
                    setStatusMsg(`${t.alreadyScheduled} ${formatDate(data.scheduled_start_at, locale)}.`);
                    return;
                }
                const currentPlan = normalizePlanName(data?.current_plan);
                setStatusType("info");
                if (currentPlan === "pro") {
                    setStatusMsg(t.activeProPlan);
                } else if (currentPlan === "one_month") {
                    setStatusMsg(t.activeOneMonthPlan);
                } else {
                    setStatusMsg(t.activePaidPlan);
                }
                return;
            }
            if (data?.url) {
                window.location.href = String(data.url);
                return;
            }
            setStatusType("error");
            setStatusMsg(t.noCheckoutUrl);
        } catch (e) {
            setStatusType("error");
            setStatusMsg(String(e?.message || e));
        } finally{
            setPayingPurchase(null);
        }
    }
    async function cancelSubscription() {
        setStatusMsg(null);
        setStatusType(null);
        if (!isAuthed || !companyId) {
            setStatusType("error");
            setStatusMsg(t.pleaseSignInFirst);
            return;
        }
        setCanceling(true);
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].functions.invoke("cancel-subscription", {
                body: {}
            });
            const data = res?.data;
            const fnError = res?.error;
            if (fnError) {
                setStatusType("error");
                setStatusMsg(fnError.message || t.couldNotCancelSubscription);
                return;
            }
            if (!data?.ok) {
                setStatusType("error");
                setStatusMsg(String(data?.error || t.couldNotCancelSubscription));
                return;
            }
            setStatusType("success");
            const endDate = data?.current_period_end ? formatDate(data.current_period_end, locale) : null;
            if (data?.early_cancellation_fee_applied && endDate) {
                setStatusMsg(`${t.earlyFeePaid} ${t.remainsActiveUntil} ${endDate}.`);
            } else if (data?.early_cancellation_fee_applied) {
                setStatusMsg(t.earlyCancellationFeeCharged);
            } else if (endDate) {
                setStatusMsg(`${t.cancelScheduled}. ${t.remainsActiveUntil} ${endDate}.`);
            } else {
                setStatusMsg(t.planCanceled);
            }
            await refreshPlanData();
        } catch (e) {
            setStatusType("error");
            setStatusMsg(String(e?.message || e));
        } finally{
            setCanceling(false);
        }
    }
    const statusBoxClass = statusType === "success" ? "border-emerald-200 bg-emerald-50/90 text-emerald-950" : statusType === "error" ? "border-red-200 bg-red-50/90 text-red-950" : "border-blue-200 bg-blue-50/90 text-blue-950";
    const proPill = isExpired ? t.expired : isPro ? t.current : hasScheduledPro ? t.scheduled : t.upgrade;
    const monthPill = isExpired ? t.expired : isOneMonthActive ? t.current : isPro || hasScheduledPro ? t.unavailable : t.available;
    const buttonLabelPro = isPro ? t.alreadyPro : hasScheduledPro ? t.proScheduled : payingPurchase === "pro_monthly" ? t.openingCheckout : syncing ? t.syncing : t.subscribePro;
    const buttonLabelMonth = isOneMonthActive ? t.alreadyActive : isPro || hasScheduledPro ? t.unavailable : payingPurchase === "one_month" ? t.openingCheckout : syncing ? t.syncing : t.buyOneMonth;
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen text-slate-900",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative px-6 pb-16 pt-40 md:pt-44",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-6xl",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-slate-500",
                        children: t.loading
                    }, void 0, false, {
                        fileName: "[project]/app/pricing/PricingClient.tsx",
                        lineNumber: 1342,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/pricing/PricingClient.tsx",
                    lineNumber: 1341,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/pricing/PricingClient.tsx",
                lineNumber: 1340,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/pricing/PricingClient.tsx",
            lineNumber: 1339,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen text-slate-900",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative overflow-hidden px-6 pb-20 pt-40 md:pt-44",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-none absolute inset-0 -z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(99,102,241,0.08),transparent_55%)]"
                        }, void 0, false, {
                            fileName: "[project]/app/pricing/PricingClient.tsx",
                            lineNumber: 1353,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-[10%] top-20 h-72 w-72 rounded-full bg-violet-300/10 blur-3xl"
                        }, void 0, false, {
                            fileName: "[project]/app/pricing/PricingClient.tsx",
                            lineNumber: 1354,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute right-[8%] top-32 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl"
                        }, void 0, false, {
                            fileName: "[project]/app/pricing/PricingClient.tsx",
                            lineNumber: 1355,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl"
                        }, void 0, false, {
                            fileName: "[project]/app/pricing/PricingClient.tsx",
                            lineNumber: 1356,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.8)_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-[0.035]"
                        }, void 0, false, {
                            fileName: "[project]/app/pricing/PricingClient.tsx",
                            lineNumber: 1357,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/pricing/PricingClient.tsx",
                    lineNumber: 1352,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-6xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-5 flex items-center justify-end gap-3",
                            children: !isAuthed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/auth",
                                className: "inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 backdrop-blur-xl transition hover:bg-white",
                                children: t.signIn
                            }, void 0, false, {
                                fileName: "[project]/app/pricing/PricingClient.tsx",
                                lineNumber: 1363,
                                columnNumber: 15
                            }, this) : null
                        }, void 0, false, {
                            fileName: "[project]/app/pricing/PricingClient.tsx",
                            lineNumber: 1361,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "relative overflow-hidden rounded-[36px] border border-white/70 bg-white/72 px-7 py-8 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:px-10 md:py-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pointer-events-none absolute inset-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-200/35 blur-3xl"
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1374,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-cyan-200/25 blur-3xl"
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1375,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                    lineNumber: 1373,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500",
                                            children: t.billingLabel
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1379,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "mt-4 max-w-3xl text-[36px] font-extrabold leading-[1.02] tracking-tight md:text-[52px]",
                                            children: t.pricingTitle
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1383,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-3 max-w-2xl text-base leading-7 text-slate-600 md:text-lg",
                                            children: t.pricingSub
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1387,
                                            columnNumber: 15
                                        }, this),
                                        company ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-5 inline-flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: [
                                                        t.detectedCompany,
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1393,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold text-slate-900",
                                                    children: company.name || t.companyFallback
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1394,
                                                    columnNumber: 19
                                                }, this),
                                                company.vat_uid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-500",
                                                    children: [
                                                        "(",
                                                        String(company.vat_uid).toUpperCase(),
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1398,
                                                    columnNumber: 21
                                                }, this) : null,
                                                company.country ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-500",
                                                    children: [
                                                        "• ",
                                                        company.country
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1403,
                                                    columnNumber: 21
                                                }, this) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1392,
                                            columnNumber: 17
                                        }, this) : null,
                                        statusMsg ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `mt-6 rounded-2xl border px-5 py-4 text-sm ${statusBoxClass}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold",
                                                    children: statusType === "success" ? t.success : statusType === "error" ? t.actionRequired : t.info
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1410,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-1 opacity-90",
                                                    children: statusMsg
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1417,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1409,
                                            columnNumber: 17
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                    lineNumber: 1378,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/pricing/PricingClient.tsx",
                            lineNumber: 1372,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanCard, {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanHeader, {
                                            title: t.freePlan,
                                            pill: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopPill, {
                                                tone: isFree ? "active" : "idle",
                                                children: isFree ? t.current : t.available
                                            }, void 0, false, {
                                                fileName: "[project]/app/pricing/PricingClient.tsx",
                                                lineNumber: 1428,
                                                columnNumber: 19
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1425,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PriceBlock, {
                                            price: "€0",
                                            caption: t.basicCompanyPresence
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1434,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "mt-8 min-h-[220px] space-y-5 text-sm leading-7 text-slate-700",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanBullet, {
                                                    children: t.freeFeature1
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1437,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanBullet, {
                                                    children: t.freeFeature2
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1438,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanBullet, {
                                                    children: t.freeFeature3
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1439,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1436,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-8 min-h-[136px] rounded-3xl border border-slate-200 bg-slate-50/90 p-5 text-sm leading-7 text-slate-600",
                                            children: t.freeFooter
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1442,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-8 min-h-[140px]"
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1446,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-auto pt-8",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-[56px]"
                                            }, void 0, false, {
                                                fileName: "[project]/app/pricing/PricingClient.tsx",
                                                lineNumber: 1449,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1448,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                    lineNumber: 1424,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanCard, {
                                    featured: true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanHeader, {
                                            title: t.proPlan,
                                            badge: t.recommended,
                                            badgeTone: "featured",
                                            pill: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopPill, {
                                                tone: isPro ? "active" : hasScheduledPro ? "scheduled" : "idle",
                                                children: proPill
                                            }, void 0, false, {
                                                fileName: "[project]/app/pricing/PricingClient.tsx",
                                                lineNumber: 1459,
                                                columnNumber: 19
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1454,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PriceBlock, {
                                            price: "€49",
                                            caption: t.perMonthAutoRenew
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1465,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "mt-8 min-h-[220px] space-y-5 text-sm leading-7 text-slate-700",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanBullet, {
                                                    children: t.proFeature1
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1468,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanBullet, {
                                                    children: t.proFeature2
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1469,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanBullet, {
                                                    children: t.proFeature3
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1470,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanBullet, {
                                                    children: t.proFeature4
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1471,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanBullet, {
                                                    children: t.proFeature5
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1472,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1467,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-8 min-h-[250px] rounded-3xl border border-slate-200 bg-slate-50/90 p-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-semibold text-slate-900",
                                                    children: t.contractTerms
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1476,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 space-y-2 text-sm leading-7 text-slate-600",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: t.contractLine1
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                                            lineNumber: 1478,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: t.contractLine2
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                                            lineNumber: 1479,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: t.contractLine3
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                                            lineNumber: 1480,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1477,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/terms",
                                                        className: "text-sm font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-600",
                                                        children: t.readFullAgreement
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/pricing/PricingClient.tsx",
                                                        lineNumber: 1483,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1482,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1475,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-8 min-h-[170px]",
                                            children: hasScheduledPro ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-blue-900",
                                                children: [
                                                    t.proStartsOn,
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        children: formatDate(plan?.scheduled_start_at, locale)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/pricing/PricingClient.tsx",
                                                        lineNumber: 1496,
                                                        columnNumber: 21
                                                    }, this),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/pricing/PricingClient.tsx",
                                                lineNumber: 1494,
                                                columnNumber: 19
                                            }, this) : !isPro ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 text-sm leading-7 text-slate-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: agreedProTerms,
                                                        onChange: (e)=>setAgreedProTerms(e.target.checked),
                                                        className: "mt-1 h-4 w-4 rounded border-slate-300"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/pricing/PricingClient.tsx",
                                                        lineNumber: 1500,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: t.agreeTerms
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/pricing/PricingClient.tsx",
                                                        lineNumber: 1506,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/pricing/PricingClient.tsx",
                                                lineNumber: 1499,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 text-xs leading-6 text-slate-500",
                                                children: [
                                                    plan?.current_period_end ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            t.currentBillingEnds,
                                                            ":",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-slate-900",
                                                                children: formatDate(plan.current_period_end, locale)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/pricing/PricingClient.tsx",
                                                                lineNumber: 1513,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/pricing/PricingClient.tsx",
                                                        lineNumber: 1511,
                                                        columnNumber: 23
                                                    }, this) : null,
                                                    plan?.commitment_end ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            t.commitmentEnds,
                                                            ":",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-slate-900",
                                                                children: formatDate(plan.commitment_end, locale)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/pricing/PricingClient.tsx",
                                                                lineNumber: 1522,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/pricing/PricingClient.tsx",
                                                        lineNumber: 1520,
                                                        columnNumber: 23
                                                    }, this) : null,
                                                    isCancellationScheduled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold",
                                                                children: t.cancelScheduled
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/pricing/PricingClient.tsx",
                                                                lineNumber: 1530,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    t.remainsActiveUntil,
                                                                    " ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-slate-900",
                                                                        children: plan?.current_period_end ? formatDate(plan.current_period_end, locale) : "—"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/pricing/PricingClient.tsx",
                                                                        lineNumber: 1534,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/pricing/PricingClient.tsx",
                                                                lineNumber: 1532,
                                                                columnNumber: 25
                                                            }, this),
                                                            earlyFeeWasCharged ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: t.earlyFeePaid
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/pricing/PricingClient.tsx",
                                                                lineNumber: 1542,
                                                                columnNumber: 27
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/pricing/PricingClient.tsx",
                                                        lineNumber: 1529,
                                                        columnNumber: 23
                                                    }, this) : null
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/pricing/PricingClient.tsx",
                                                lineNumber: 1509,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1492,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-auto pt-8",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex h-[56px] items-end gap-3",
                                                children: isPro ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: cancelSubscription,
                                                    disabled: canceling || isCancellationScheduled,
                                                    className: isCancellationScheduled ? "inline-flex h-[56px] min-w-[220px] items-center justify-center rounded-2xl bg-slate-300 px-5 py-3 text-sm font-semibold text-slate-600" : "inline-flex h-[56px] min-w-[220px] items-center justify-center rounded-2xl border border-red-200 bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(220,38,38,0.22)] transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60",
                                                    children: canceling ? t.processing : isCancellationScheduled ? t.cancelScheduled : t.cancelPlan
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1553,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>startCheckout("pro_monthly"),
                                                    disabled: disableProPurchase,
                                                    className: "inline-flex h-[56px] min-w-[220px] items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition hover:-translate-y-[1px] hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none",
                                                    children: buttonLabelPro
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1569,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/pricing/PricingClient.tsx",
                                                lineNumber: 1551,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1550,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                    lineNumber: 1453,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanCard, {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanHeader, {
                                            title: t.oneMonthPlan,
                                            pill: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopPill, {
                                                tone: isOneMonthActive ? "active" : "idle",
                                                children: monthPill
                                            }, void 0, false, {
                                                fileName: "[project]/app/pricing/PricingClient.tsx",
                                                lineNumber: 1585,
                                                columnNumber: 19
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1582,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PriceBlock, {
                                            price: "€69",
                                            caption: t.oneTimePayment
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1591,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "mt-8 min-h-[220px] space-y-5 text-sm leading-7 text-slate-700",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanBullet, {
                                                    children: t.monthFeature1
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1594,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanBullet, {
                                                    children: t.monthFeature2
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1595,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanBullet, {
                                                    children: t.monthFeature3
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1596,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanBullet, {
                                                    children: t.monthFeature4
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1597,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1593,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-8 min-h-[250px] rounded-3xl border border-slate-200 bg-slate-50/90 p-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-semibold text-slate-900",
                                                    children: t.monthTermsTitle
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1601,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 space-y-2 text-sm leading-7 text-slate-600",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: t.monthTerms1
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                                            lineNumber: 1603,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: t.monthTerms2
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                                            lineNumber: 1604,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                                    lineNumber: 1602,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1600,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-8 min-h-[170px] text-xs leading-6 text-slate-500",
                                            children: isOneMonthActive && plan?.current_period_end ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    t.accessEnds,
                                                    ":",
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-slate-900",
                                                        children: formatDate(plan.current_period_end, locale)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/pricing/PricingClient.tsx",
                                                        lineNumber: 1612,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/pricing/PricingClient.tsx",
                                                lineNumber: 1610,
                                                columnNumber: 19
                                            }, this) : null
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1608,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-auto pt-8",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>startCheckout("one_month"),
                                                disabled: disableOneMonthPurchase,
                                                className: "inline-flex h-[56px] min-w-[220px] items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition hover:-translate-y-[1px] hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none",
                                                children: buttonLabelMonth
                                            }, void 0, false, {
                                                fileName: "[project]/app/pricing/PricingClient.tsx",
                                                lineNumber: 1620,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/PricingClient.tsx",
                                            lineNumber: 1619,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/pricing/PricingClient.tsx",
                                    lineNumber: 1581,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/pricing/PricingClient.tsx",
                            lineNumber: 1423,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 rounded-2xl border border-slate-200 bg-white/75 px-5 py-4 text-xs leading-6 text-slate-500 backdrop-blur-xl",
                            children: t.vatNote
                        }, void 0, false, {
                            fileName: "[project]/app/pricing/PricingClient.tsx",
                            lineNumber: 1631,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/pricing/PricingClient.tsx",
                    lineNumber: 1360,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/pricing/PricingClient.tsx",
            lineNumber: 1351,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/pricing/PricingClient.tsx",
        lineNumber: 1350,
        columnNumber: 5
    }, this);
}
_s(PricingPage, "URMHqz34WK0eLacNSNcr1nqXu68=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$language$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c5 = PricingPage;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "PlanBullet");
__turbopack_context__.k.register(_c1, "TopPill");
__turbopack_context__.k.register(_c2, "PlanCard");
__turbopack_context__.k.register(_c3, "PlanHeader");
__turbopack_context__.k.register(_c4, "PriceBlock");
__turbopack_context__.k.register(_c5, "PricingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_pricing_PricingClient_tsx_1c8c2107._.js.map