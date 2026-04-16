(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/supabaseClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://txwfinitghwowuwnofia.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4d2Zpbml0Z2h3b3d1d25vZmlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MzAyMjAsImV4cCI6MjA4NjIwNjIyMH0.1e8R2hAumN9IUos3SJFR02T5M2I2waXKfdln3-UnDq4"));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/i18n.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DICT",
    ()=>DICT,
    "getLang",
    ()=>getLang,
    "isLang",
    ()=>isLang,
    "setStoredLang",
    ()=>setStoredLang,
    "tr",
    ()=>tr
]);
const DICT = {
    en: {
        home: "Home",
        writeReview: "Write review",
        login: "Login",
        logout: "Logout",
        forCompanies: "For companies",
        privacy: "Privacy",
        terms: "Terms",
        contact: "Contact",
        search: "Search",
        riskIndex: "Risk index",
        companyProfile: "Company profile",
        plansAccess: "Plans & Access",
        verification: "Verification",
        reviewPolicy: "Review Policy",
        legal: "Legal",
        heroBadge: "Live EU reputation network",
        heroTitleStart: "The European",
        heroTitleAccent: "Reputation Network",
        heroTitleEnd: "for Transport & Logistics",
        heroSub: "Independent ratings and reviews based on real business experience.",
        heroPlaceholder: "Company name or VAT number…",
        heroSearch: "Search",
        heroNotFound: "No company found. Try a different name or VAT number.",
        companiesIndexed: "companies indexed",
        publishedReviews: "published reviews",
        allEuCountries: "All EU countries",
        scrollDown: "Scroll",
        whyCarrierTrust: "Why CarrierTrust",
        builtForB2B: "Built for B2B Logistics",
        processLabel: "Process",
        featuresLabel: "Features",
        businessLabel: "Business",
        getStarted: "Get Started",
        lowerNeutralTitle: "Neutral hosting platform",
        lowerNeutralBody: "CarrierTrust hosts user-generated reviews and applies traceable moderation for legal and policy breaches.",
        lowerBusinessTitle: "Business-first",
        lowerBusinessBody: "Reviews focus on real business experience. Companies can claim their profile and respond publicly.",
        lowerEuTitle: "EU-focused trust layer",
        lowerEuBody: "Designed for cross-border transport where reputation, compliance and dispute traceability matter.",
        sectionHowTitle: "How it works",
        sectionHowSub: "A simple flow designed for real B2B logistics relationships.",
        how1Title: "Search & verify",
        how1Body: "Find a company by name or VAT. Verified profiles reduce identity ambiguity.",
        how2Title: "Publish real experience",
        how2Body: "Structured reviews focused on facts, outcomes, and cooperation quality.",
        how3Title: "Traceable moderation",
        how3Body: "Clear rules and audit-ready actions for disputes, edits, and removals.",
        sectionSignalsTitle: "Trust signals that matter",
        sectionSignalsSub: "Built for cross-border operations — not generic consumer reviews.",
        sig1Title: "Verified identity",
        sig1Body: "Company verification and profile ownership reduce fake listings and impersonation.",
        sig2Title: "Moderation trace",
        sig2Body: "Moderation actions are recorded. Clear policy and predictable enforcement.",
        sig3Title: "Dispute readiness",
        sig3Body: "Designed to support dispute workflows without turning into a court.",
        sectionCompaniesTitle: "For companies",
        sectionCompaniesSub: "Tools to protect reputation, respond professionally, and stay transparent.",
        companies1Title: "Claim & manage profile",
        companies1Body: "Own your presence, add details, and respond to reviews publicly.",
        companies2Title: "Verified badge",
        companies2Body: "Signal trust and reduce friction with partners in Europe.",
        sectionFAQTitle: "FAQ",
        faq1Q: "Can anyone post reviews?",
        faq1A: "Reviews are designed for real business relationships. We focus on traceable moderation and policy compliance.",
        faq2Q: "Do you remove negative reviews?",
        faq2A: "We remove content that violates policy or law — not content that is simply negative.",
        faq3Q: "Is this available across the EU?",
        faq3A: "Yes — the platform is built EU-first and focuses on cross-border transport & logistics.",
        sectionCTAHeadline: "Build trust before the next load.",
        sectionCTASub: "Search a company or publish a real business review — in minutes.",
        ctaPrimary: "Write review",
        ctaSecondary: "Plans & Access",
        footerTagline: "EU logistics reputation network",
        footerDescription: "Independent ratings and reviews for transport and logistics companies across Europe. Built for trust, transparency and real business experience.",
        footerPlatform: "Platform",
        footerLegal: "Legal",
        footerRights: "© 2026 CarrierTrust.eu. All rights reserved.",
        footerBottomText: "Built for EU transport & logistics.",
        orbitVerified: "Verified",
        orbitVerifiedBadge: "Verified",
        orbitPaymentOverdue: "Payment Overdue",
        orbitRating: "Rating",
        orbitTrustMovement: "Trust movement",
        orbitExcellentReview: "Perfect delivery! On time, professional drivers, great communication.",
        orbitGoodReview: "Good service overall. Minor delay but handled professionally.",
        orbitBadReview: "Invoice overdue 45 days. Cargo delivered but no payment received.",
        riskIndexTitle: "Company risk index",
        riskIndexDesc: "Public index of logistics companies based on automated trust signals (fraud events, coordinated attacks, review risk).",
        highRisk: "High risk",
        mediumRisk: "Medium risk",
        lowRisk: "Low risk",
        risk: "Risk",
        searchCompanyVatCountry: "Company name, VAT or country…",
        limit: "Limit",
        refresh: "Refresh",
        loading: "Loading…",
        companies: "Companies",
        sortedByFraud: "Sorted by fraud score",
        company: "Company",
        country: "Country",
        fraudScore: "Fraud score",
        trust: "Trust",
        signals: "Signals",
        autoFlagged: "Auto-flagged",
        riskDisclaimer: "Disclaimer: Risk index is automated and may contain false positives.",
        noResults: "No results found",
        howToUseRiskIndex: "How to use risk index",
        howToUseRiskIndexBody: "Risk index helps identify logistics companies with elevated fraud signals, abnormal review patterns, or trust instability.",
        commonSignals: "Common signals",
        signalBurstReviews: "Unusual burst of reviews in short time",
        signalSameNetwork: "Reviews from same digital network",
        signalSelfReviews: "Possible self-review behaviour",
        signalFlaggedRatio: "High ratio of flagged interactions",
        wantVerified: "Verified companies can reduce false signals through profile ownership.",
        companyDashboard: "Company dashboard",
        companyLabel: "Company",
        vatLabel: "VAT",
        countryLabel: "Country",
        statusLabel: "Status",
        linked: "Linked",
        pending: "Pending",
        notLinked: "Not linked",
        viewPublicCompanyPage: "View public company page",
        viewPlans: "View plans",
        plan: "Plan",
        repliesUsed: "Replies used",
        freeReplyInfo: "Free plan includes 1 official reply. Editing is available on PRO.",
        upgradeToPro: "Upgrade to PRO",
        managePlan: "Manage plan",
        saved: "Saved",
        actionRequired: "Action required",
        info: "Info",
        freeReplyUsed: "Free reply used",
        upgradeReplyInfo: "Upgrade to PRO to reply to more reviews and edit replies.",
        reviewsTitle: "Reviews",
        replyToReviews: "Reply to customer reviews as an official company account.",
        noPublishedReviews: "No published reviews yet.",
        reviewDate: "Review date",
        issue: "Issue",
        rating: "Rating",
        lastReplySaved: "Last reply saved",
        officialReplyExists: "Official reply exists.",
        noOfficialReplyYet: "No official reply yet.",
        officialCompanyReply: "Official company reply",
        upgradeRequired: "Upgrade required",
        upgradeRequiredText: "Free plan includes 1 reply total. Upgrade to PRO for unlimited replies.",
        upgradeToEdit: "Upgrade to edit",
        upgradeEditText: "On FREE you can publish 1 reply, but editing is available on PRO.",
        writeOfficialReply: "Write an official reply…",
        saving: "Saving…",
        updateReply: "Update reply",
        publishReply: "Publish reply",
        tipReply: "Tip: Calm, factual replies and clear resolution steps help build trust over time."
    },
    de: {
        home: "Startseite",
        writeReview: "Bewertung schreiben",
        login: "Anmelden",
        logout: "Abmelden",
        forCompanies: "Für Unternehmen",
        privacy: "Datenschutz",
        terms: "Nutzungsbedingungen",
        contact: "Kontakt",
        search: "Suche",
        riskIndex: "Risikoindex",
        companyProfile: "Firmenprofil",
        plansAccess: "Tarife & Zugang",
        verification: "Verifizierung",
        reviewPolicy: "Review-Richtlinie",
        legal: "Rechtliches",
        heroBadge: "Live EU Reputationsnetzwerk",
        heroTitleStart: "Das europäische",
        heroTitleAccent: "Reputationsnetzwerk",
        heroTitleEnd: "für Transport & Logistik",
        heroSub: "Unabhängige Bewertungen basierend auf echter Geschäftserfahrung.",
        heroPlaceholder: "Firmenname oder VAT…",
        heroSearch: "Suchen",
        heroNotFound: "Keine Firma gefunden. Bitte anderen Namen oder VAT versuchen.",
        companiesIndexed: "Unternehmen indexiert",
        publishedReviews: "veröffentlichte Bewertungen",
        allEuCountries: "Alle EU-Länder",
        scrollDown: "Scrollen",
        whyCarrierTrust: "Warum CarrierTrust",
        builtForB2B: "Entwickelt für B2B-Logistik",
        processLabel: "Prozess",
        featuresLabel: "Funktionen",
        businessLabel: "Business",
        getStarted: "Jetzt starten",
        lowerNeutralTitle: "Neutrale Hosting-Plattform",
        lowerNeutralBody: "CarrierTrust hostet nutzergenerierte Bewertungen und wendet nachvollziehbare Moderation bei rechtlichen und policy-relevanten Verstößen an.",
        lowerBusinessTitle: "Geschäftsorientiert",
        lowerBusinessBody: "Bewertungen basieren auf echter Geschäftserfahrung. Unternehmen können ihr Profil beanspruchen und öffentlich antworten.",
        lowerEuTitle: "EU-orientierte Vertrauensebene",
        lowerEuBody: "Entwickelt für grenzüberschreitenden Transport, wo Reputation, Compliance und Nachvollziehbarkeit von Streitfällen wichtig sind.",
        sectionHowTitle: "So funktioniert es",
        sectionHowSub: "Ein einfacher Ablauf für echte B2B-Logistikbeziehungen.",
        how1Title: "Suchen & verifizieren",
        how1Body: "Finde ein Unternehmen per Name oder VAT. Verifizierte Profile reduzieren Identitätsverwechslungen.",
        how2Title: "Echte Erfahrung veröffentlichen",
        how2Body: "Strukturierte Bewertungen mit Fokus auf Fakten, Ergebnisse und Qualität der Zusammenarbeit.",
        how3Title: "Nachvollziehbare Moderation",
        how3Body: "Klare Regeln und auditfähige Maßnahmen für Streitfälle, Bearbeitungen und Entfernungen.",
        sectionSignalsTitle: "Vertrauenssignale, die zählen",
        sectionSignalsSub: "Entwickelt für grenzüberschreitende Abläufe — keine generischen Verbraucherbewertungen.",
        sig1Title: "Verifizierte Identität",
        sig1Body: "Unternehmensverifizierung und Profilbesitz reduzieren Fake-Listings und Identitätsmissbrauch.",
        sig2Title: "Moderationshistorie",
        sig2Body: "Moderationsmaßnahmen werden protokolliert. Klare Regeln und vorhersehbare Durchsetzung.",
        sig3Title: "Streitfall-Bereitschaft",
        sig3Body: "Entwickelt zur Unterstützung von Streitfällen, ohne zu einem Gericht zu werden.",
        sectionCompaniesTitle: "Für Unternehmen",
        sectionCompaniesSub: "Tools, um Reputation zu schützen, professionell zu antworten und transparent zu bleiben.",
        companies1Title: "Profil beanspruchen & verwalten",
        companies1Body: "Übernimm deine Präsenz, ergänze Details und antworte öffentlich auf Bewertungen.",
        companies2Title: "Verifiziertes Badge",
        companies2Body: "Signalisiere Vertrauen und reduziere Reibung mit Partnern in Europa.",
        sectionFAQTitle: "FAQ",
        faq1Q: "Kann jeder Bewertungen abgeben?",
        faq1A: "Bewertungen sind für echte Geschäftsbeziehungen gedacht. Wir setzen auf nachvollziehbare Moderation und Regelkonformität.",
        faq2Q: "Entfernen Sie negative Bewertungen?",
        faq2A: "Wir entfernen Inhalte nur bei Verstößen gegen Regeln oder Gesetze — nicht, weil sie negativ sind.",
        faq3Q: "Ist das in der gesamten EU verfügbar?",
        faq3A: "Ja — die Plattform ist EU-first aufgebaut und auf grenzüberschreitenden Transport & Logistik ausgerichtet.",
        sectionCTAHeadline: "Vertrauen vor der nächsten Ladung aufbauen.",
        sectionCTASub: "Suche ein Unternehmen oder veröffentliche in wenigen Minuten eine echte Geschäftsbewertung.",
        ctaPrimary: "Bewertung schreiben",
        ctaSecondary: "Tarife & Zugang",
        footerTagline: "EU-Reputationsnetzwerk für Logistik",
        footerDescription: "Unabhängige Bewertungen und Rezensionen für Transport- und Logistikunternehmen in ganz Europa. Entwickelt für Vertrauen, Transparenz und echte Geschäftserfahrung.",
        footerPlatform: "Plattform",
        footerLegal: "Rechtliches",
        footerRights: "© 2026 CarrierTrust.eu. Alle Rechte vorbehalten.",
        footerBottomText: "Entwickelt für EU-Transport & Logistik.",
        orbitVerified: "Verifiziert",
        orbitVerifiedBadge: "Verifiziert",
        orbitPaymentOverdue: "Zahlung überfällig",
        orbitRating: "Bewertung",
        orbitTrustMovement: "Vertrauensentwicklung",
        orbitExcellentReview: "Perfekte Lieferung! Pünktlich, professionelle Fahrer, großartige Kommunikation.",
        orbitGoodReview: "Insgesamt guter Service. Kleine Verzögerung, aber professionell gelöst.",
        orbitBadReview: "Rechnung 45 Tage überfällig. Fracht geliefert, aber keine Zahlung erhalten.",
        riskIndexTitle: "Unternehmens-Risikoindex",
        riskIndexDesc: "Öffentlicher Index von Logistikunternehmen basierend auf automatisierten Vertrauenssignalen.",
        highRisk: "Hohes Risiko",
        mediumRisk: "Mittleres Risiko",
        lowRisk: "Niedriges Risiko",
        risk: "Risiko",
        searchCompanyVatCountry: "Firmenname, VAT oder Land…",
        limit: "Limit",
        refresh: "Aktualisieren",
        loading: "Lädt…",
        companies: "Unternehmen",
        sortedByFraud: "Sortiert nach Betrugswert",
        company: "Unternehmen",
        country: "Land",
        fraudScore: "Betrugswert",
        trust: "Vertrauen",
        signals: "Signale",
        autoFlagged: "Automatisch markiert",
        riskDisclaimer: "Hinweis: Risikoindex ist automatisiert und kann Fehlalarme enthalten.",
        noResults: "Keine Ergebnisse gefunden",
        howToUseRiskIndex: "So nutzen Sie den Risikoindex",
        howToUseRiskIndexBody: "Der Risikoindex hilft dabei, Logistikunternehmen mit erhöhten Betrugssignalen oder instabilen Vertrauensmustern zu erkennen.",
        commonSignals: "Typische Signale",
        signalBurstReviews: "Ungewöhnlich viele Bewertungen in kurzer Zeit",
        signalSameNetwork: "Bewertungen aus demselben digitalen Netzwerk",
        signalSelfReviews: "Mögliches Eigenbewertungsverhalten",
        signalFlaggedRatio: "Hoher Anteil markierter Interaktionen",
        wantVerified: "Verifizierte Unternehmen können falsche Signale durch Profilbesitz reduzieren.",
        companyDashboard: "Unternehmens-Dashboard",
        companyLabel: "Unternehmen",
        vatLabel: "VAT",
        countryLabel: "Land",
        statusLabel: "Status",
        linked: "Verknüpft",
        pending: "Ausstehend",
        notLinked: "Nicht verknüpft",
        viewPublicCompanyPage: "Öffentliche Firmenseite ansehen",
        viewPlans: "Tarife ansehen",
        plan: "Tarif",
        repliesUsed: "Antworten genutzt",
        freeReplyInfo: "Free-Tarif enthält 1 offizielle Antwort. Bearbeitung nur mit PRO.",
        upgradeToPro: "Auf PRO upgraden",
        managePlan: "Tarif verwalten",
        saved: "Gespeichert",
        actionRequired: "Aktion erforderlich",
        info: "Info",
        freeReplyUsed: "Freie Antwort genutzt",
        upgradeReplyInfo: "Upgrade auf PRO für weitere Antworten und Bearbeitung.",
        reviewsTitle: "Bewertungen",
        replyToReviews: "Antworten Sie als offizielles Unternehmenskonto.",
        noPublishedReviews: "Noch keine veröffentlichten Bewertungen.",
        reviewDate: "Bewertungsdatum",
        issue: "Problem",
        rating: "Bewertung",
        lastReplySaved: "Antwort zuletzt gespeichert",
        officialReplyExists: "Offizielle Antwort vorhanden.",
        noOfficialReplyYet: "Noch keine offizielle Antwort.",
        officialCompanyReply: "Offizielle Unternehmensantwort",
        upgradeRequired: "Upgrade erforderlich",
        upgradeRequiredText: "Free enthält nur 1 Antwort insgesamt.",
        upgradeToEdit: "Upgrade zum Bearbeiten",
        upgradeEditText: "Bearbeiten ist nur mit PRO verfügbar.",
        writeOfficialReply: "Offizielle Antwort schreiben…",
        saving: "Speichert…",
        updateReply: "Antwort aktualisieren",
        publishReply: "Antwort veröffentlichen",
        tipReply: "Tipp: Ruhige, sachliche Antworten schaffen langfristig Vertrauen."
    },
    ru: {
        home: "Главная",
        writeReview: "Написать отзыв",
        login: "Вход",
        logout: "Выход",
        forCompanies: "Для компаний",
        privacy: "Конфиденциальность",
        terms: "Условия",
        contact: "Контакты",
        search: "Поиск",
        riskIndex: "Индекс риска",
        companyProfile: "Профиль компании",
        plansAccess: "Тарифы и доступ",
        verification: "Верификация",
        reviewPolicy: "Политика отзывов",
        legal: "Юридическая информация",
        heroBadge: "Live сеть репутации ЕС",
        heroTitleStart: "Европейская",
        heroTitleAccent: "сеть репутации",
        heroTitleEnd: "для транспорта и логистики",
        heroSub: "Независимые рейтинги и отзывы на основе реального делового опыта.",
        heroPlaceholder: "Название компании или VAT…",
        heroSearch: "Поиск",
        heroNotFound: "Компания не найдена. Попробуйте другое название или VAT номер.",
        companiesIndexed: "компаний в базе",
        publishedReviews: "опубликованных отзывов",
        allEuCountries: "Все страны ЕС",
        scrollDown: "Вниз",
        whyCarrierTrust: "Почему CarrierTrust",
        builtForB2B: "Создано для B2B-логистики",
        processLabel: "Процесс",
        featuresLabel: "Возможности",
        businessLabel: "Для бизнеса",
        getStarted: "Начать",
        lowerNeutralTitle: "Нейтральная платформа",
        lowerNeutralBody: "CarrierTrust размещает пользовательские отзывы и применяет прозрачную модерацию при нарушениях правил и закона.",
        lowerBusinessTitle: "Фокус на бизнесе",
        lowerBusinessBody: "Отзывы основаны на реальном бизнес-опыте. Компании могут подтвердить профиль и отвечать публично.",
        lowerEuTitle: "Доверие для ЕС",
        lowerEuBody: "Создано для трансграничной логистики, где важны репутация, compliance и фиксация спорных кейсов.",
        sectionHowTitle: "Как это работает",
        sectionHowSub: "Простой поток, рассчитанный на реальные B2B отношения в логистике.",
        how1Title: "Найди и проверь",
        how1Body: "Ищи компанию по названию или VAT. Подтверждённые профили снижают путаницу с идентичностью.",
        how2Title: "Публикуй реальный опыт",
        how2Body: "Структурированные отзывы с фокусом на факты, результат и качество сотрудничества.",
        how3Title: "Прозрачная модерация",
        how3Body: "Понятные правила и фиксируемые действия по спорам, правкам и удалению.",
        sectionSignalsTitle: "Сигналы доверия, которые важны",
        sectionSignalsSub: "Сделано для международной логистики, а не для обычных потребительских отзывов.",
        sig1Title: "Проверенная идентичность",
        sig1Body: "Верификация компании и владение профилем снижают риск фейков и подмены.",
        sig2Title: "След модерации",
        sig2Body: "Действия модерации фиксируются. Ясные правила и предсказуемое применение.",
        sig3Title: "Готовность к спорам",
        sig3Body: "Платформа помогает в спорных кейсах, но не превращается в суд.",
        sectionCompaniesTitle: "Для компаний",
        sectionCompaniesSub: "Инструменты для защиты репутации, публичных ответов и прозрачного присутствия.",
        companies1Title: "Подтвердить и управлять профилем",
        companies1Body: "Контролируй своё присутствие, добавляй данные и отвечай на отзывы публично.",
        companies2Title: "Знак верификации",
        companies2Body: "Показывай надёжность и снижай трение с партнёрами по Европе.",
        sectionFAQTitle: "FAQ",
        faq1Q: "Кто может оставить отзыв?",
        faq1A: "Отзывы предназначены для реальных деловых отношений. Мы делаем упор на прозрачную модерацию и соблюдение правил.",
        faq2Q: "Удаляете ли вы негативные отзывы?",
        faq2A: "Мы удаляем только то, что нарушает правила или закон — а не просто негатив.",
        faq3Q: "Это работает по всему ЕС?",
        faq3A: "Да — платформа создавалась как EU-first решение для трансграничной логистики.",
        sectionCTAHeadline: "Построй доверие до следующей перевозки.",
        sectionCTASub: "Найди компанию или опубликуй реальный бизнес-отзыв за пару минут.",
        ctaPrimary: "Написать отзыв",
        ctaSecondary: "Тарифы и доступ",
        footerTagline: "Репутационная сеть логистики ЕС",
        footerDescription: "Независимые рейтинги и отзывы для транспортных и логистических компаний по всей Европе. Создано для доверия, прозрачности и реального делового опыта.",
        footerPlatform: "Платформа",
        footerLegal: "Правовая информация",
        footerRights: "© 2026 CarrierTrust.eu. Все права защищены.",
        footerBottomText: "Создано для транспорта и логистики ЕС.",
        orbitVerified: "Подтверждено",
        orbitVerifiedBadge: "Проверено",
        orbitPaymentOverdue: "Просрочка оплаты",
        orbitRating: "Рейтинг",
        orbitTrustMovement: "Движение доверия",
        orbitExcellentReview: "Идеальная доставка! Всё вовремя, профессиональные водители, отличная коммуникация.",
        orbitGoodReview: "В целом хороший сервис. Небольшая задержка, но решено профессионально.",
        orbitBadReview: "Счёт просрочен на 45 дней. Груз доставлен, но оплаты нет.",
        riskIndexTitle: "Индекс риска компаний",
        riskIndexDesc: "Публичный индекс логистических компаний на основе автоматических сигналов доверия.",
        highRisk: "Высокий риск",
        mediumRisk: "Средний риск",
        lowRisk: "Низкий риск",
        risk: "Риск",
        searchCompanyVatCountry: "Компания, VAT или страна…",
        limit: "Лимит",
        refresh: "Обновить",
        loading: "Загрузка…",
        companies: "Компании",
        sortedByFraud: "Сортировка по уровню риска",
        company: "Компания",
        country: "Страна",
        fraudScore: "Индекс риска",
        trust: "Доверие",
        signals: "Сигналы",
        autoFlagged: "Авто-флаг",
        riskDisclaimer: "Важно: индекс риска автоматизирован и может содержать ложные срабатывания.",
        noResults: "Ничего не найдено",
        howToUseRiskIndex: "Как использовать индекс риска",
        howToUseRiskIndexBody: "Индекс риска помогает выявлять логистические компании с повышенными признаками мошенничества и нестабильным доверием.",
        commonSignals: "Типичные сигналы",
        signalBurstReviews: "Необычный всплеск отзывов за короткое время",
        signalSameNetwork: "Отзывы из одной цифровой сети",
        signalSelfReviews: "Вероятность саморецензирования",
        signalFlaggedRatio: "Высокая доля отмеченных взаимодействий",
        wantVerified: "Верифицированные компании могут снижать ложные сигналы через владение профилем.",
        companyDashboard: "Панель компании",
        companyLabel: "Компания",
        vatLabel: "VAT",
        countryLabel: "Страна",
        statusLabel: "Статус",
        linked: "Подтверждено",
        pending: "Ожидает",
        notLinked: "Не подтверждено",
        viewPublicCompanyPage: "Открыть публичную страницу компании",
        viewPlans: "Посмотреть тарифы",
        plan: "Тариф",
        repliesUsed: "Ответов использовано",
        freeReplyInfo: "Бесплатный тариф включает 1 официальный ответ. Редактирование доступно на PRO.",
        upgradeToPro: "Перейти на PRO",
        managePlan: "Управление тарифом",
        saved: "Сохранено",
        actionRequired: "Требуется действие",
        info: "Информация",
        freeReplyUsed: "Бесплатный ответ использован",
        upgradeReplyInfo: "Перейдите на PRO для новых ответов и редактирования.",
        reviewsTitle: "Отзывы",
        replyToReviews: "Отвечайте на отзывы как официальный аккаунт компании.",
        noPublishedReviews: "Пока нет опубликованных отзывов.",
        reviewDate: "Дата отзыва",
        issue: "Тип проблемы",
        rating: "Оценка",
        lastReplySaved: "Последний ответ сохранён",
        officialReplyExists: "Официальный ответ уже есть.",
        noOfficialReplyYet: "Официального ответа пока нет.",
        officialCompanyReply: "Официальный ответ компании",
        upgradeRequired: "Требуется обновление тарифа",
        upgradeRequiredText: "Бесплатный тариф включает только 1 ответ.",
        upgradeToEdit: "Обновить для редактирования",
        upgradeEditText: "Редактирование доступно только на PRO.",
        writeOfficialReply: "Напишите официальный ответ…",
        saving: "Сохранение…",
        updateReply: "Обновить ответ",
        publishReply: "Опубликовать ответ",
        tipReply: "Совет: спокойные и точные ответы постепенно укрепляют доверие."
    },
    fr: {
        home: "Accueil",
        writeReview: "Écrire un avis",
        login: "Connexion",
        logout: "Déconnexion",
        forCompanies: "Pour les entreprises",
        privacy: "Confidentialité",
        terms: "Conditions",
        contact: "Contact",
        search: "Recherche",
        riskIndex: "Indice de risque",
        companyProfile: "Profil entreprise",
        plansAccess: "Offres & accès",
        verification: "Vérification",
        reviewPolicy: "Politique des avis",
        legal: "Mentions légales",
        heroBadge: "Réseau de réputation UE en direct",
        heroTitleStart: "Le réseau européen",
        heroTitleAccent: "de réputation",
        heroTitleEnd: "pour le transport et la logistique",
        heroSub: "Notes et avis indépendants basés sur une vraie expérience commerciale.",
        heroPlaceholder: "Nom de l’entreprise ou numéro TVA…",
        heroSearch: "Rechercher",
        heroNotFound: "Entreprise introuvable. Essayez un autre nom ou numéro TVA.",
        companiesIndexed: "entreprises indexées",
        publishedReviews: "avis publiés",
        allEuCountries: "Tous les pays de l’UE",
        scrollDown: "Faire défiler",
        whyCarrierTrust: "Pourquoi CarrierTrust",
        builtForB2B: "Conçu pour la logistique B2B",
        processLabel: "Processus",
        featuresLabel: "Fonctionnalités",
        businessLabel: "Business",
        getStarted: "Commencer",
        lowerNeutralTitle: "Plateforme d’hébergement neutre",
        lowerNeutralBody: "CarrierTrust héberge les avis générés par les utilisateurs et applique une modération traçable pour les violations juridiques et de politique.",
        lowerBusinessTitle: "Orienté business",
        lowerBusinessBody: "Les avis se concentrent sur l’expérience commerciale réelle. Les entreprises peuvent revendiquer leur profil et répondre publiquement.",
        lowerEuTitle: "Couche de confiance orientée UE",
        lowerEuBody: "Conçu pour le transport transfrontalier où réputation, conformité et traçabilité des litiges comptent.",
        sectionHowTitle: "Comment ça marche",
        sectionHowSub: "Un flux simple conçu pour de vraies relations B2B logistiques.",
        how1Title: "Rechercher et vérifier",
        how1Body: "Trouvez une entreprise par nom ou numéro TVA. Les profils vérifiés réduisent l’ambiguïté d’identité.",
        how2Title: "Publier une vraie expérience",
        how2Body: "Avis structurés axés sur les faits, les résultats et la qualité de la coopération.",
        how3Title: "Modération traçable",
        how3Body: "Règles claires et actions auditables pour les litiges, modifications et suppressions.",
        sectionSignalsTitle: "Des signaux de confiance qui comptent",
        sectionSignalsSub: "Conçu pour les opérations transfrontalières — pas pour de simples avis consommateurs.",
        sig1Title: "Identité vérifiée",
        sig1Body: "La vérification de l’entreprise et la propriété du profil réduisent les faux profils et l’usurpation.",
        sig2Title: "Trace de modération",
        sig2Body: "Les actions de modération sont enregistrées. Politique claire et application prévisible.",
        sig3Title: "Prêt pour les litiges",
        sig3Body: "Conçu pour soutenir les flux de litige sans devenir un tribunal.",
        sectionCompaniesTitle: "Pour les entreprises",
        sectionCompaniesSub: "Des outils pour protéger la réputation, répondre professionnellement et rester transparents.",
        companies1Title: "Revendiquer et gérer le profil",
        companies1Body: "Prenez le contrôle de votre présence, ajoutez des détails et répondez publiquement aux avis.",
        companies2Title: "Badge vérifié",
        companies2Body: "Montrez la confiance et réduisez la friction avec les partenaires en Europe.",
        sectionFAQTitle: "FAQ",
        faq1Q: "Tout le monde peut-il publier un avis ?",
        faq1A: "Les avis sont conçus pour de vraies relations commerciales. Nous mettons l’accent sur une modération traçable et la conformité aux règles.",
        faq2Q: "Supprimez-vous les avis négatifs ?",
        faq2A: "Nous supprimons les contenus qui violent les règles ou la loi — pas ceux qui sont simplement négatifs.",
        faq3Q: "Est-ce disponible dans toute l’UE ?",
        faq3A: "Oui — la plateforme est conçue d’abord pour l’UE et se concentre sur le transport et la logistique transfrontaliers.",
        sectionCTAHeadline: "Construisez la confiance avant le prochain chargement.",
        sectionCTASub: "Recherchez une entreprise ou publiez un vrai avis commercial en quelques minutes.",
        ctaPrimary: "Écrire un avis",
        ctaSecondary: "Offres & accès",
        footerTagline: "Réseau de réputation logistique UE",
        footerDescription: "Notes et avis indépendants pour les entreprises de transport et de logistique à travers l’Europe. Conçu pour la confiance, la transparence et une vraie expérience commerciale.",
        footerPlatform: "Plateforme",
        footerLegal: "Légal",
        footerRights: "© 2026 CarrierTrust.eu. Tous droits réservés.",
        footerBottomText: "Conçu pour le transport & la logistique de l’UE.",
        orbitVerified: "Vérifié",
        orbitVerifiedBadge: "Vérifié",
        orbitPaymentOverdue: "Paiement en retard",
        orbitRating: "Note",
        orbitTrustMovement: "Évolution de confiance",
        orbitExcellentReview: "Livraison parfaite ! À l’heure, chauffeurs professionnels, excellente communication.",
        orbitGoodReview: "Bon service dans l’ensemble. Petit retard mais géré de façon professionnelle.",
        orbitBadReview: "Facture en retard de 45 jours. Marchandise livrée mais aucun paiement reçu.",
        riskIndexTitle: "Indice de risque des entreprises",
        riskIndexDesc: "Indice public des entreprises logistiques basé sur des signaux automatisés.",
        highRisk: "Risque élevé",
        mediumRisk: "Risque moyen",
        lowRisk: "Risque faible",
        risk: "Risque",
        searchCompanyVatCountry: "Nom, TVA ou pays…",
        limit: "Limite",
        refresh: "Actualiser",
        loading: "Chargement…",
        companies: "Entreprises",
        sortedByFraud: "Trié par score fraude",
        company: "Entreprise",
        country: "Pays",
        fraudScore: "Score fraude",
        trust: "Confiance",
        signals: "Signaux",
        autoFlagged: "Signalé automatiquement",
        riskDisclaimer: "Indice automatisé pouvant contenir des faux positifs.",
        noResults: "Aucun résultat trouvé",
        howToUseRiskIndex: "Comment utiliser l’indice de risque",
        howToUseRiskIndexBody: "L’indice aide à identifier les entreprises logistiques présentant des signaux de fraude élevés.",
        commonSignals: "Signaux fréquents",
        signalBurstReviews: "Pic inhabituel d’avis en peu de temps",
        signalSameNetwork: "Avis provenant du même réseau numérique",
        signalSelfReviews: "Possible auto-évaluation",
        signalFlaggedRatio: "Taux élevé d’interactions signalées",
        wantVerified: "Les entreprises vérifiées réduisent les faux signaux via la propriété du profil.",
        companyDashboard: "Tableau de bord entreprise",
        companyLabel: "Entreprise",
        vatLabel: "TVA",
        countryLabel: "Pays",
        statusLabel: "Statut",
        linked: "Lié",
        pending: "En attente",
        notLinked: "Non lié",
        viewPublicCompanyPage: "Voir la page publique de l’entreprise",
        viewPlans: "Voir les offres",
        plan: "Offre",
        repliesUsed: "Réponses utilisées",
        freeReplyInfo: "L’offre gratuite comprend 1 réponse officielle. La modification est disponible avec PRO.",
        upgradeToPro: "Passer à PRO",
        managePlan: "Gérer l’offre",
        saved: "Enregistré",
        actionRequired: "Action requise",
        info: "Info",
        freeReplyUsed: "Réponse gratuite utilisée",
        upgradeReplyInfo: "Passez à PRO pour répondre à plus d’avis et modifier les réponses.",
        reviewsTitle: "Avis",
        replyToReviews: "Répondez aux avis clients en tant que compte officiel de l’entreprise.",
        noPublishedReviews: "Aucun avis publié pour le moment.",
        reviewDate: "Date de l’avis",
        issue: "Problème",
        rating: "Note",
        lastReplySaved: "Dernière réponse enregistrée",
        officialReplyExists: "Une réponse officielle existe déjà.",
        noOfficialReplyYet: "Pas encore de réponse officielle.",
        officialCompanyReply: "Réponse officielle de l’entreprise",
        upgradeRequired: "Mise à niveau requise",
        upgradeRequiredText: "L’offre gratuite comprend seulement 1 réponse au total.",
        upgradeToEdit: "Passer à niveau pour modifier",
        upgradeEditText: "La modification est disponible uniquement avec PRO.",
        writeOfficialReply: "Écrire une réponse officielle…",
        saving: "Enregistrement…",
        updateReply: "Mettre à jour la réponse",
        publishReply: "Publier la réponse",
        tipReply: "Conseil : des réponses calmes, factuelles et claires renforcent la confiance avec le temps."
    },
    es: {
        home: "Inicio",
        writeReview: "Escribir reseña",
        login: "Iniciar sesión",
        logout: "Cerrar sesión",
        forCompanies: "Para empresas",
        privacy: "Privacidad",
        terms: "Términos",
        contact: "Contacto",
        search: "Buscar",
        riskIndex: "Índice de riesgo",
        companyProfile: "Perfil de empresa",
        plansAccess: "Planes y acceso",
        verification: "Verificación",
        reviewPolicy: "Política de reseñas",
        legal: "Legal",
        heroBadge: "Red de reputación UE en vivo",
        heroTitleStart: "La red europea",
        heroTitleAccent: "de reputación",
        heroTitleEnd: "para transporte y logística",
        heroSub: "Calificaciones y reseñas independientes basadas en experiencia empresarial real.",
        heroPlaceholder: "Nombre de empresa o número VAT…",
        heroSearch: "Buscar",
        heroNotFound: "Empresa no encontrada. Prueba con otro nombre o número VAT.",
        companiesIndexed: "empresas indexadas",
        publishedReviews: "reseñas publicadas",
        allEuCountries: "Todos los países de la UE",
        scrollDown: "Desplazar",
        whyCarrierTrust: "Por qué CarrierTrust",
        builtForB2B: "Hecho para logística B2B",
        processLabel: "Proceso",
        featuresLabel: "Funciones",
        businessLabel: "Business",
        getStarted: "Empezar",
        lowerNeutralTitle: "Plataforma neutral",
        lowerNeutralBody: "CarrierTrust aloja reseñas generadas por usuarios y aplica moderación trazable para infracciones legales y de políticas.",
        lowerBusinessTitle: "Enfocado al negocio",
        lowerBusinessBody: "Las reseñas se centran en experiencia comercial real. Las empresas pueden reclamar su perfil y responder públicamente.",
        lowerEuTitle: "Capa de confianza para la UE",
        lowerEuBody: "Diseñado para transporte transfronterizo donde reputación, cumplimiento y trazabilidad de disputas importan.",
        sectionHowTitle: "Cómo funciona",
        sectionHowSub: "Un flujo simple diseñado para relaciones logísticas B2B reales.",
        how1Title: "Buscar y verificar",
        how1Body: "Encuentra una empresa por nombre o VAT. Los perfiles verificados reducen la ambigüedad de identidad.",
        how2Title: "Publicar experiencia real",
        how2Body: "Reseñas estructuradas centradas en hechos, resultados y calidad de cooperación.",
        how3Title: "Moderación trazable",
        how3Body: "Reglas claras y acciones auditables para disputas, ediciones y eliminaciones.",
        sectionSignalsTitle: "Señales de confianza que importan",
        sectionSignalsSub: "Creado para operaciones transfronterizas — no para reseñas genéricas de consumo.",
        sig1Title: "Identidad verificada",
        sig1Body: "La verificación de empresa y la propiedad del perfil reducen listados falsos y suplantación.",
        sig2Title: "Rastro de moderación",
        sig2Body: "Las acciones de moderación se registran. Política clara y aplicación predecible.",
        sig3Title: "Listo para disputas",
        sig3Body: "Diseñado para apoyar flujos de disputa sin convertirse en un tribunal.",
        sectionCompaniesTitle: "Para empresas",
        sectionCompaniesSub: "Herramientas para proteger la reputación, responder profesionalmente y mantener transparencia.",
        companies1Title: "Reclamar y gestionar perfil",
        companies1Body: "Controla tu presencia, añade detalles y responde públicamente a las reseñas.",
        companies2Title: "Insignia verificada",
        companies2Body: "Muestra confianza y reduce fricción con socios en Europa.",
        sectionFAQTitle: "FAQ",
        faq1Q: "Cualquiera puede publicar reseñas?",
        faq1A: "Las reseñas están pensadas para relaciones comerciales reales. Nos centramos en moderación trazable y cumplimiento de políticas.",
        faq2Q: "Eliminan reseñas negativas?",
        faq2A: "Eliminamos contenido que viola las reglas o la ley — no contenido simplemente negativo.",
        faq3Q: "Está disponible en toda la UE?",
        faq3A: "Sí — la plataforma está construida con enfoque UE y se centra en transporte y logística transfronterizos.",
        sectionCTAHeadline: "Construye confianza antes de la próxima carga.",
        sectionCTASub: "Busca una empresa o publica una reseña comercial real en minutos.",
        ctaPrimary: "Escribir reseña",
        ctaSecondary: "Planes y acceso",
        footerTagline: "Red reputacional logística UE",
        footerDescription: "Calificaciones y reseñas independientes para empresas de transporte y logística en toda Europa. Construido para confianza, transparencia y experiencia empresarial real.",
        footerPlatform: "Plataforma",
        footerLegal: "Legal",
        footerRights: "© 2026 CarrierTrust.eu. Todos los derechos reservados.",
        footerBottomText: "Hecho para transporte y logística de la UE.",
        orbitVerified: "Verificado",
        orbitVerifiedBadge: "Verificado",
        orbitPaymentOverdue: "Pago vencido",
        orbitRating: "Calificación",
        orbitTrustMovement: "Movimiento de confianza",
        orbitExcellentReview: "¡Entrega perfecta! A tiempo, conductores profesionales, gran comunicación.",
        orbitGoodReview: "Buen servicio en general. Pequeño retraso, pero gestionado profesionalmente.",
        orbitBadReview: "Factura vencida 45 días. La carga fue entregada pero no se recibió el pago.",
        riskIndexTitle: "Índice de riesgo empresarial",
        riskIndexDesc: "Índice público de empresas logísticas basado en señales automáticas.",
        highRisk: "Alto riesgo",
        mediumRisk: "Riesgo medio",
        lowRisk: "Bajo riesgo",
        risk: "Riesgo",
        searchCompanyVatCountry: "Empresa, VAT o país…",
        limit: "Límite",
        refresh: "Actualizar",
        loading: "Cargando…",
        companies: "Empresas",
        sortedByFraud: "Ordenado por score fraude",
        company: "Empresa",
        country: "País",
        fraudScore: "Score fraude",
        trust: "Confianza",
        signals: "Señales",
        autoFlagged: "Marcado automáticamente",
        riskDisclaimer: "Índice automático con posibles falsos positivos.",
        noResults: "No se encontraron resultados",
        howToUseRiskIndex: "Cómo usar el índice de riesgo",
        howToUseRiskIndexBody: "El índice ayuda a identificar empresas logísticas con señales elevadas de fraude.",
        commonSignals: "Señales comunes",
        signalBurstReviews: "Aumento inusual de reseñas en poco tiempo",
        signalSameNetwork: "Reseñas desde la misma red digital",
        signalSelfReviews: "Posible comportamiento de auto-reseñas",
        signalFlaggedRatio: "Alta proporción de interacciones marcadas",
        wantVerified: "Las empresas verificadas reducen señales falsas mediante propiedad del perfil.",
        companyDashboard: "Panel de empresa",
        companyLabel: "Empresa",
        vatLabel: "VAT",
        countryLabel: "País",
        statusLabel: "Estado",
        linked: "Vinculado",
        pending: "Pendiente",
        notLinked: "No vinculado",
        viewPublicCompanyPage: "Ver página pública de la empresa",
        viewPlans: "Ver planes",
        plan: "Plan",
        repliesUsed: "Respuestas usadas",
        freeReplyInfo: "El plan gratuito incluye 1 respuesta oficial. La edición está disponible en PRO.",
        upgradeToPro: "Actualizar a PRO",
        managePlan: "Gestionar plan",
        saved: "Guardado",
        actionRequired: "Acción requerida",
        info: "Información",
        freeReplyUsed: "Respuesta gratuita usada",
        upgradeReplyInfo: "Actualiza a PRO para responder a más reseñas y editar respuestas.",
        reviewsTitle: "Reseñas",
        replyToReviews: "Responde a las reseñas de clientes como cuenta oficial de la empresa.",
        noPublishedReviews: "Todavía no hay reseñas publicadas.",
        reviewDate: "Fecha de reseña",
        issue: "Problema",
        rating: "Calificación",
        lastReplySaved: "Última respuesta guardada",
        officialReplyExists: "Ya existe una respuesta oficial.",
        noOfficialReplyYet: "Todavía no hay respuesta oficial.",
        officialCompanyReply: "Respuesta oficial de la empresa",
        upgradeRequired: "Actualización requerida",
        upgradeRequiredText: "El plan gratuito incluye solo 1 respuesta en total.",
        upgradeToEdit: "Actualizar para editar",
        upgradeEditText: "La edición está disponible solo en PRO.",
        writeOfficialReply: "Escribe una respuesta oficial…",
        saving: "Guardando…",
        updateReply: "Actualizar respuesta",
        publishReply: "Publicar respuesta",
        tipReply: "Consejo: respuestas tranquilas, claras y basadas en hechos ayudan a generar confianza con el tiempo."
    },
    it: {
        home: "Home",
        writeReview: "Scrivi recensione",
        login: "Accedi",
        logout: "Esci",
        forCompanies: "Per le aziende",
        privacy: "Privacy",
        terms: "Termini",
        contact: "Contatto",
        search: "Cerca",
        riskIndex: "Indice di rischio",
        companyProfile: "Profilo aziendale",
        plansAccess: "Piani e accesso",
        verification: "Verifica",
        reviewPolicy: "Politica recensioni",
        legal: "Legale",
        heroBadge: "Rete reputazionale UE live",
        heroTitleStart: "La rete europea",
        heroTitleAccent: "della reputazione",
        heroTitleEnd: "per trasporto e logistica",
        heroSub: "Valutazioni e recensioni indipendenti basate su esperienza aziendale reale.",
        heroPlaceholder: "Nome azienda o numero VAT…",
        heroSearch: "Cerca",
        heroNotFound: "Azienda non trovata. Prova con un altro nome o numero VAT.",
        companiesIndexed: "aziende indicizzate",
        publishedReviews: "recensioni pubblicate",
        allEuCountries: "Tutti i paesi UE",
        scrollDown: "Scorri",
        whyCarrierTrust: "Perché CarrierTrust",
        builtForB2B: "Creato per la logistica B2B",
        processLabel: "Processo",
        featuresLabel: "Funzionalità",
        businessLabel: "Business",
        getStarted: "Inizia",
        lowerNeutralTitle: "Piattaforma neutrale",
        lowerNeutralBody: "CarrierTrust ospita recensioni generate dagli utenti e applica moderazione tracciabile per violazioni legali e di policy.",
        lowerBusinessTitle: "Orientato al business",
        lowerBusinessBody: "Le recensioni si concentrano su esperienza aziendale reale. Le aziende possono rivendicare il profilo e rispondere pubblicamente.",
        lowerEuTitle: "Livello di fiducia orientato UE",
        lowerEuBody: "Progettato per il trasporto transfrontaliero dove reputazione, compliance e tracciabilità delle dispute contano.",
        sectionHowTitle: "Come funziona",
        sectionHowSub: "Un flusso semplice progettato per reali relazioni logistiche B2B.",
        how1Title: "Cerca e verifica",
        how1Body: "Trova un’azienda per nome o VAT. I profili verificati riducono l’ambiguità di identità.",
        how2Title: "Pubblica esperienza reale",
        how2Body: "Recensioni strutturate focalizzate su fatti, risultati e qualità della collaborazione.",
        how3Title: "Moderazione tracciabile",
        how3Body: "Regole chiare e azioni verificabili per dispute, modifiche e rimozioni.",
        sectionSignalsTitle: "Segnali di fiducia che contano",
        sectionSignalsSub: "Creato per operazioni transfrontaliere — non per recensioni consumer generiche.",
        sig1Title: "Identità verificata",
        sig1Body: "La verifica aziendale e la proprietà del profilo riducono falsi elenchi e impersonificazione.",
        sig2Title: "Traccia di moderazione",
        sig2Body: "Le azioni di moderazione vengono registrate. Policy chiara e applicazione prevedibile.",
        sig3Title: "Pronto per le dispute",
        sig3Body: "Progettato per supportare i flussi di disputa senza diventare un tribunale.",
        sectionCompaniesTitle: "Per le aziende",
        sectionCompaniesSub: "Strumenti per proteggere la reputazione, rispondere professionalmente e restare trasparenti.",
        companies1Title: "Rivendica e gestisci il profilo",
        companies1Body: "Controlla la tua presenza, aggiungi dettagli e rispondi pubblicamente alle recensioni.",
        companies2Title: "Badge verificato",
        companies2Body: "Mostra fiducia e riduci attrito con i partner in Europa.",
        sectionFAQTitle: "FAQ",
        faq1Q: "Chiunque può pubblicare recensioni?",
        faq1A: "Le recensioni sono pensate per veri rapporti commerciali. Ci concentriamo su moderazione tracciabile e conformità alle regole.",
        faq2Q: "Rimuovete recensioni negative?",
        faq2A: "Rimuoviamo contenuti che violano regole o legge — non contenuti semplicemente negativi.",
        faq3Q: "È disponibile in tutta l’UE?",
        faq3A: "Sì — la piattaforma è costruita con approccio UE-first e si concentra su trasporto e logistica transfrontalieri.",
        sectionCTAHeadline: "Costruisci fiducia prima del prossimo carico.",
        sectionCTASub: "Cerca un’azienda o pubblica una recensione aziendale reale in pochi minuti.",
        ctaPrimary: "Scrivi recensione",
        ctaSecondary: "Piani e accesso",
        footerTagline: "Rete reputazionale logistica UE",
        footerDescription: "Valutazioni e recensioni indipendenti per aziende di trasporto e logistica in tutta Europa. Costruito per fiducia, trasparenza e vera esperienza aziendale.",
        footerPlatform: "Piattaforma",
        footerLegal: "Legale",
        footerRights: "© 2026 CarrierTrust.eu. Tutti i diritti riservati.",
        footerBottomText: "Creato per trasporto e logistica UE.",
        orbitVerified: "Verificato",
        orbitVerifiedBadge: "Verificato",
        orbitPaymentOverdue: "Pagamento scaduto",
        orbitRating: "Valutazione",
        orbitTrustMovement: "Movimento fiducia",
        orbitExcellentReview: "Consegna perfetta! Puntuale, autisti professionali, ottima comunicazione.",
        orbitGoodReview: "Buon servizio nel complesso. Piccolo ritardo, ma gestito in modo professionale.",
        orbitBadReview: "Fattura scaduta da 45 giorni. Merce consegnata ma pagamento non ricevuto.",
        riskIndexTitle: "Indice di rischio aziendale",
        riskIndexDesc: "Indice pubblico delle aziende logistiche basato su segnali automatici.",
        highRisk: "Alto rischio",
        mediumRisk: "Rischio medio",
        lowRisk: "Basso rischio",
        risk: "Rischio",
        searchCompanyVatCountry: "Nome azienda, VAT o paese…",
        limit: "Limite",
        refresh: "Aggiorna",
        loading: "Caricamento…",
        companies: "Aziende",
        sortedByFraud: "Ordinato per punteggio frode",
        company: "Azienda",
        country: "Paese",
        fraudScore: "Punteggio frode",
        trust: "Affidabilità",
        signals: "Segnali",
        autoFlagged: "Segnalato automaticamente",
        riskDisclaimer: "Indice automatico con possibili falsi positivi.",
        noResults: "Nessun risultato trovato",
        howToUseRiskIndex: "Come usare l’indice di rischio",
        howToUseRiskIndexBody: "L’indice aiuta a identificare aziende logistiche con segnali elevati di frode.",
        commonSignals: "Segnali comuni",
        signalBurstReviews: "Picco insolito di recensioni in poco tempo",
        signalSameNetwork: "Recensioni dalla stessa rete digitale",
        signalSelfReviews: "Possibile comportamento auto-recensioni",
        signalFlaggedRatio: "Alta quota di interazioni segnalate",
        wantVerified: "Le aziende verificate riducono falsi segnali tramite proprietà del profilo.",
        companyDashboard: "Dashboard aziendale",
        companyLabel: "Azienda",
        vatLabel: "VAT",
        countryLabel: "Paese",
        statusLabel: "Stato",
        linked: "Collegato",
        pending: "In attesa",
        notLinked: "Non collegato",
        viewPublicCompanyPage: "Visualizza la pagina pubblica dell’azienda",
        viewPlans: "Visualizza i piani",
        plan: "Piano",
        repliesUsed: "Risposte utilizzate",
        freeReplyInfo: "Il piano gratuito include 1 risposta ufficiale. La modifica è disponibile con PRO.",
        upgradeToPro: "Passa a PRO",
        managePlan: "Gestisci piano",
        saved: "Salvato",
        actionRequired: "Azione richiesta",
        info: "Info",
        freeReplyUsed: "Risposta gratuita utilizzata",
        upgradeReplyInfo: "Passa a PRO per rispondere a più recensioni e modificare le risposte.",
        reviewsTitle: "Recensioni",
        replyToReviews: "Rispondi alle recensioni dei clienti come account ufficiale dell’azienda.",
        noPublishedReviews: "Nessuna recensione pubblicata al momento.",
        reviewDate: "Data recensione",
        issue: "Problema",
        rating: "Valutazione",
        lastReplySaved: "Ultima risposta salvata",
        officialReplyExists: "Esiste già una risposta ufficiale.",
        noOfficialReplyYet: "Nessuna risposta ufficiale ancora.",
        officialCompanyReply: "Risposta ufficiale dell’azienda",
        upgradeRequired: "Upgrade richiesto",
        upgradeRequiredText: "Il piano gratuito include solo 1 risposta totale.",
        upgradeToEdit: "Passa a livello superiore per modificare",
        upgradeEditText: "La modifica è disponibile solo con PRO.",
        writeOfficialReply: "Scrivi una risposta ufficiale…",
        saving: "Salvataggio…",
        updateReply: "Aggiorna risposta",
        publishReply: "Pubblica risposta",
        tipReply: "Suggerimento: risposte calme, chiare e basate sui fatti aiutano a costruire fiducia nel tempo."
    }
};
function isLang(value) {
    return value === "en" || value === "de" || value === "ru" || value === "fr" || value === "es" || value === "it";
}
function getLang() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const saved = localStorage.getItem("lang");
    if (saved && isLang(saved)) return saved;
    return "en";
}
function setStoredLang(lang) {
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.setItem("lang", lang);
        document.documentElement.lang = lang;
    }
}
function tr(lang, key) {
    return DICT[lang]?.[key] ?? DICT.en[key] ?? key;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/language-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLang",
    ()=>useLang
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function LanguageProvider({ children }) {
    _s();
    const [lang, setLangState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("en");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            const initial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLang"])();
            setLangState(initial);
            document.documentElement.lang = initial;
        }
    }["LanguageProvider.useEffect"], []);
    const setLang = (newLang)=>{
        setLangState(newLang);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setStoredLang"])(newLang);
    };
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LanguageProvider.useMemo[value]": ()=>({
                lang,
                setLang,
                t: ({
                    "LanguageProvider.useMemo[value]": (key)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tr"])(lang, key)
                })["LanguageProvider.useMemo[value]"]
            })
    }["LanguageProvider.useMemo[value]"], [
        lang
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/language-context.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(LanguageProvider, "KzN68mPD/1zGkpI2mBsApqCRQVM=");
_c = LanguageProvider;
function useLang() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!ctx) {
        throw new Error("useLang must be used inside LanguageProvider");
    }
    return ctx;
}
_s1(useLang, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/SiteHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SiteHeader
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
function SiteHeader() {
    _s();
    const { lang, setLang, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$language$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hidden, setHidden] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [langOpen, setLangOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const lastY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const desktopLangRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mobileLangRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mobileMenuPanelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser().then({
                "SiteHeader.useEffect": ({ data })=>{
                    setIsLoggedIn(!!data.user);
                }
            }["SiteHeader.useEffect"]);
            const { data: sub } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange({
                "SiteHeader.useEffect": (_e, session)=>{
                    setIsLoggedIn(!!session?.user);
                }
            }["SiteHeader.useEffect"]);
            lastY.current = window.scrollY || 0;
            const onScroll = {
                "SiteHeader.useEffect.onScroll": ()=>{
                    const y = window.scrollY || 0;
                    setScrolled(y > 8);
                    const goingDown = y > lastY.current;
                    if (goingDown && y > 90) {
                        setHidden(true);
                        setLangOpen(false);
                        setMobileMenuOpen(false);
                    }
                    if (!goingDown) setHidden(false);
                    lastY.current = y;
                }
            }["SiteHeader.useEffect.onScroll"];
            const onClickOutside = {
                "SiteHeader.useEffect.onClickOutside": (e)=>{
                    const target = e.target;
                    const clickedDesktopLang = desktopLangRef.current && desktopLangRef.current.contains(target);
                    const clickedMobileLang = mobileLangRef.current && mobileLangRef.current.contains(target);
                    const clickedMobileMenu = mobileMenuPanelRef.current && mobileMenuPanelRef.current.contains(target);
                    if (!clickedDesktopLang && !clickedMobileLang) {
                        setLangOpen(false);
                    }
                    if (!clickedMobileMenu) {
                        setMobileMenuOpen(false);
                    }
                }
            }["SiteHeader.useEffect.onClickOutside"];
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            document.addEventListener("mousedown", onClickOutside);
            return ({
                "SiteHeader.useEffect": ()=>{
                    window.removeEventListener("scroll", onScroll);
                    document.removeEventListener("mousedown", onClickOutside);
                    sub?.subscription?.unsubscribe();
                }
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            const closeOnDesktop = {
                "SiteHeader.useEffect.closeOnDesktop": ()=>{
                    if (window.innerWidth >= 1024) {
                        setMobileMenuOpen(false);
                    }
                }
            }["SiteHeader.useEffect.closeOnDesktop"];
            closeOnDesktop();
            window.addEventListener("resize", closeOnDesktop);
            return ({
                "SiteHeader.useEffect": ()=>window.removeEventListener("resize", closeOnDesktop)
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], []);
    async function writeReview() {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
        if (!data.user) {
            window.location.href = "/auth?next=/write-review";
            return;
        }
        window.location.href = "/write-review";
    }
    async function loginLogout() {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
        if (data.user) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
            window.location.href = "/";
            return;
        }
        window.location.href = "/auth";
    }
    const panelClass = scrolled ? "border-white/70 bg-white/78 shadow-[0_20px_60px_rgba(15,23,42,0.10)]" : "border-white/60 bg-white/68 shadow-[0_16px_40px_rgba(15,23,42,0.06)]";
    const navLink = "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-2xl border border-transparent px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-slate-200/80 hover:bg-white/85 hover:text-slate-900 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]";
    const subtleBtn = "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-2xl border border-slate-200/80 bg-white/72 px-4 py-2.5 text-sm font-medium text-slate-700 backdrop-blur-xl transition-all duration-200 hover:-translate-y-[1px] hover:bg-white hover:text-slate-900 hover:shadow-[0_10px_24px_rgba(15,23,42,0.07)]";
    const primaryBtnBase = "shrink-0 items-center justify-center whitespace-nowrap rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.20)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-slate-800 hover:shadow-[0_16px_34px_rgba(15,23,42,0.24)]";
    const currentLangLabel = lang.toUpperCase();
    const mobileNavItem = "flex min-h-[50px] items-center justify-between rounded-2xl border border-slate-200/80 bg-white/82 px-4 py-3 text-sm font-medium text-slate-800 backdrop-blur-xl transition-all duration-200 active:scale-[0.99]";
    const mobileActionBtn = "inline-flex min-h-[50px] w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200";
    const languageOptions = [
        [
            "en",
            "English"
        ],
        [
            "de",
            "Deutsch"
        ],
        [
            "ru",
            "Русский"
        ],
        [
            "fr",
            "Français"
        ],
        [
            "es",
            "Español"
        ],
        [
            "it",
            "Italiano"
        ]
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            "fixed left-0 right-0 top-0 z-50",
            "transition-transform duration-300 ease-out",
            hidden ? "-translate-y-full" : "translate-y-0"
        ].join(" "),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: [
                    "relative rounded-[1.9rem] border px-4 py-3 sm:px-6",
                    "backdrop-blur-2xl transition-all duration-300",
                    panelClass
                ].join(" "),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-0 rounded-[1.9rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.08))]"
                    }, void 0, false, {
                        fileName: "[project]/components/SiteHeader.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex items-center justify-between gap-3 sm:gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "group flex min-w-0 shrink-0 items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 font-bold text-white shadow-[0_12px_26px_rgba(16,185,129,0.28)] transition-transform duration-200 group-hover:scale-[1.03]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 rounded-2xl bg-white/10"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SiteHeader.tsx",
                                                lineNumber: 164,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative",
                                                children: "CT"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SiteHeader.tsx",
                                                lineNumber: 165,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/SiteHeader.tsx",
                                        lineNumber: 163,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "truncate text-lg font-bold tracking-tight text-slate-900",
                                                children: "CarrierTrust"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SiteHeader.tsx",
                                                lineNumber: 169,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "hidden text-xs text-slate-500 sm:block",
                                                children: "EU logistics reputation network"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SiteHeader.tsx",
                                                lineNumber: 172,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/SiteHeader.tsx",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SiteHeader.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        className: navLink,
                                        children: t("home")
                                    }, void 0, false, {
                                        fileName: "[project]/components/SiteHeader.tsx",
                                        lineNumber: 179,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/risk-index",
                                        className: navLink,
                                        children: t("riskIndex")
                                    }, void 0, false, {
                                        fileName: "[project]/components/SiteHeader.tsx",
                                        lineNumber: 183,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/company/profile",
                                        className: navLink,
                                        children: t("companyProfile")
                                    }, void 0, false, {
                                        fileName: "[project]/components/SiteHeader.tsx",
                                        lineNumber: 187,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/verified-profile",
                                        className: navLink,
                                        children: t("forCompanies")
                                    }, void 0, false, {
                                        fileName: "[project]/components/SiteHeader.tsx",
                                        lineNumber: 191,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SiteHeader.tsx",
                                lineNumber: 178,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden shrink-0 items-center gap-2 sm:flex sm:gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: writeReview,
                                        className: `hidden lg:inline-flex ${primaryBtnBase}`,
                                        children: t("writeReview")
                                    }, void 0, false, {
                                        fileName: "[project]/components/SiteHeader.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: loginLogout,
                                        className: subtleBtn,
                                        children: isLoggedIn ? t("logout") : t("login")
                                    }, void 0, false, {
                                        fileName: "[project]/components/SiteHeader.tsx",
                                        lineNumber: 201,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: desktopLangRef,
                                        className: "relative shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setLangOpen((v)=>!v),
                                                className: "inline-flex min-w-[84px] items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white/72 px-4 py-2.5 text-sm font-semibold text-slate-800 backdrop-blur-xl transition-all duration-200 hover:-translate-y-[1px] hover:bg-white hover:shadow-[0_10px_24px_rgba(15,23,42,0.07)]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: currentLangLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/SiteHeader.tsx",
                                                        lineNumber: 211,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: `h-4 w-4 text-slate-500 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`,
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M19 9l-7 7-7-7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/SiteHeader.tsx",
                                                            lineNumber: 220,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/SiteHeader.tsx",
                                                        lineNumber: 212,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/SiteHeader.tsx",
                                                lineNumber: 206,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute right-0 top-[calc(100%+12px)] w-[250px] overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-white/92 shadow-[0_24px_60px_rgba(15,23,42,0.14)] backdrop-blur-2xl transition-all duration-200 ${langOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border-b border-slate-100 px-4 py-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400",
                                                            children: "Language"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/SiteHeader.tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/SiteHeader.tsx",
                                                        lineNumber: 236,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-1.5 p-2",
                                                        children: languageOptions.map(([code, label])=>{
                                                            const active = lang === code;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>{
                                                                    setLang(code);
                                                                    setLangOpen(false);
                                                                },
                                                                className: `flex items-center justify-between rounded-xl px-3 py-3 text-left transition-all duration-200 ${active ? "bg-slate-900 text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)]" : "text-slate-700 hover:bg-slate-50"}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-semibold",
                                                                        children: code.toUpperCase()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/SiteHeader.tsx",
                                                                        lineNumber: 260,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `text-xs ${active ? "text-white/80" : "text-slate-400"}`,
                                                                        children: label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/SiteHeader.tsx",
                                                                        lineNumber: 261,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, code, true, {
                                                                fileName: "[project]/components/SiteHeader.tsx",
                                                                lineNumber: 247,
                                                                columnNumber: 25
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/SiteHeader.tsx",
                                                        lineNumber: 242,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/SiteHeader.tsx",
                                                lineNumber: 229,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/SiteHeader.tsx",
                                        lineNumber: 205,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SiteHeader.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex shrink-0 items-center gap-2 sm:hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: mobileLangRef,
                                        className: "relative shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>{
                                                    setLangOpen((v)=>!v);
                                                    setMobileMenuOpen(false);
                                                },
                                                className: "inline-flex h-11 min-w-[72px] items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white/78 px-3 text-sm font-semibold text-slate-800 backdrop-blur-xl transition-all duration-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: currentLangLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/SiteHeader.tsx",
                                                        lineNumber: 282,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: `h-4 w-4 text-slate-500 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`,
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M19 9l-7 7-7-7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/SiteHeader.tsx",
                                                            lineNumber: 291,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/SiteHeader.tsx",
                                                        lineNumber: 283,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/SiteHeader.tsx",
                                                lineNumber: 274,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute right-0 top-[calc(100%+10px)] z-30 w-[220px] overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.14)] backdrop-blur-2xl transition-all duration-200 ${langOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border-b border-slate-100 px-4 py-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400",
                                                            children: "Language"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/SiteHeader.tsx",
                                                            lineNumber: 308,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/SiteHeader.tsx",
                                                        lineNumber: 307,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-1.5 p-2",
                                                        children: languageOptions.map(([code, label])=>{
                                                            const active = lang === code;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>{
                                                                    setLang(code);
                                                                    setLangOpen(false);
                                                                },
                                                                className: `flex items-center justify-between rounded-xl px-3 py-3 text-left transition-all duration-200 ${active ? "bg-slate-900 text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)]" : "text-slate-700 hover:bg-slate-50"}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-semibold",
                                                                        children: code.toUpperCase()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/SiteHeader.tsx",
                                                                        lineNumber: 331,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `text-xs ${active ? "text-white/80" : "text-slate-400"}`,
                                                                        children: label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/SiteHeader.tsx",
                                                                        lineNumber: 332,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, code, true, {
                                                                fileName: "[project]/components/SiteHeader.tsx",
                                                                lineNumber: 318,
                                                                columnNumber: 25
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/SiteHeader.tsx",
                                                        lineNumber: 313,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/SiteHeader.tsx",
                                                lineNumber: 300,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/SiteHeader.tsx",
                                        lineNumber: 273,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            setMobileMenuOpen((v)=>!v);
                                            setLangOpen(false);
                                        },
                                        "aria-label": "Toggle mobile menu",
                                        className: "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/78 text-slate-800 backdrop-blur-xl transition-all duration-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative h-4 w-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `absolute left-0 top-0 h-[2px] w-4 rounded-full bg-current transition-all duration-200 ${mobileMenuOpen ? "top-[7px] rotate-45" : ""}`
                                                }, void 0, false, {
                                                    fileName: "[project]/components/SiteHeader.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `absolute left-0 top-[7px] h-[2px] w-4 rounded-full bg-current transition-all duration-200 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`
                                                }, void 0, false, {
                                                    fileName: "[project]/components/SiteHeader.tsx",
                                                    lineNumber: 357,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `absolute left-0 top-[14px] h-[2px] w-4 rounded-full bg-current transition-all duration-200 ${mobileMenuOpen ? "top-[7px] -rotate-45" : ""}`
                                                }, void 0, false, {
                                                    fileName: "[project]/components/SiteHeader.tsx",
                                                    lineNumber: 362,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/SiteHeader.tsx",
                                            lineNumber: 351,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/SiteHeader.tsx",
                                        lineNumber: 342,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SiteHeader.tsx",
                                lineNumber: 272,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SiteHeader.tsx",
                        lineNumber: 161,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: mobileMenuPanelRef,
                        className: `relative overflow-hidden transition-all duration-300 ease-out sm:hidden ${mobileMenuOpen ? "mt-3 max-h-[420px] opacity-100" : "max-h-0 opacity-0"}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 border-t border-white/50 pt-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: mobileNavItem,
                                    onClick: ()=>setMobileMenuOpen(false),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: t("home")
                                        }, void 0, false, {
                                            fileName: "[project]/components/SiteHeader.tsx",
                                            lineNumber: 384,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-300",
                                            children: "→"
                                        }, void 0, false, {
                                            fileName: "[project]/components/SiteHeader.tsx",
                                            lineNumber: 385,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/SiteHeader.tsx",
                                    lineNumber: 379,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/risk-index",
                                    className: mobileNavItem,
                                    onClick: ()=>setMobileMenuOpen(false),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: t("riskIndex")
                                        }, void 0, false, {
                                            fileName: "[project]/components/SiteHeader.tsx",
                                            lineNumber: 393,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-300",
                                            children: "→"
                                        }, void 0, false, {
                                            fileName: "[project]/components/SiteHeader.tsx",
                                            lineNumber: 394,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/SiteHeader.tsx",
                                    lineNumber: 388,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/company/profile",
                                    className: mobileNavItem,
                                    onClick: ()=>setMobileMenuOpen(false),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: t("companyProfile")
                                        }, void 0, false, {
                                            fileName: "[project]/components/SiteHeader.tsx",
                                            lineNumber: 402,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-300",
                                            children: "→"
                                        }, void 0, false, {
                                            fileName: "[project]/components/SiteHeader.tsx",
                                            lineNumber: 403,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/SiteHeader.tsx",
                                    lineNumber: 397,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/verified-profile",
                                    className: mobileNavItem,
                                    onClick: ()=>setMobileMenuOpen(false),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: t("forCompanies")
                                        }, void 0, false, {
                                            fileName: "[project]/components/SiteHeader.tsx",
                                            lineNumber: 411,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-300",
                                            children: "→"
                                        }, void 0, false, {
                                            fileName: "[project]/components/SiteHeader.tsx",
                                            lineNumber: 412,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/SiteHeader.tsx",
                                    lineNumber: 406,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2 pt-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setMobileMenuOpen(false);
                                                loginLogout();
                                            },
                                            className: `${mobileActionBtn} border border-slate-200/80 bg-white/82 text-slate-800`,
                                            children: isLoggedIn ? t("logout") : t("login")
                                        }, void 0, false, {
                                            fileName: "[project]/components/SiteHeader.tsx",
                                            lineNumber: 416,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setMobileMenuOpen(false);
                                                writeReview();
                                            },
                                            className: `${mobileActionBtn} bg-slate-900 text-white shadow-[0_12px_30px_rgba(15,23,42,0.20)]`,
                                            children: t("writeReview")
                                        }, void 0, false, {
                                            fileName: "[project]/components/SiteHeader.tsx",
                                            lineNumber: 426,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/SiteHeader.tsx",
                                    lineNumber: 415,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/SiteHeader.tsx",
                            lineNumber: 378,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/SiteHeader.tsx",
                        lineNumber: 372,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/SiteHeader.tsx",
                lineNumber: 152,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/SiteHeader.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/SiteHeader.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}
_s(SiteHeader, "2jDsAhxmgmYEppNd9Ge2pFEqlN4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$language$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = SiteHeader;
var _c;
__turbopack_context__.k.register(_c, "SiteHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SiteFooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$language$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/language-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function SiteFooter() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$language$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "relative mt-0 border-t border-slate-200/80 bg-white/70 backdrop-blur-xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl px-6 py-14",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-200/70",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-base font-extrabold text-white",
                                                children: "CT"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.tsx",
                                                lineNumber: 16,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 15,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-2xl font-extrabold tracking-tight text-slate-800",
                                                    children: "CarrierTrust"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Footer.tsx",
                                                    lineNumber: 20,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-slate-500",
                                                    children: t("footerTagline")
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Footer.tsx",
                                                    lineNumber: 23,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 19,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 14,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-5 max-w-md text-sm leading-7 text-slate-500",
                                    children: t("footerDescription")
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Footer.tsx",
                            lineNumber: 13,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm font-extrabold uppercase tracking-[0.14em] text-slate-400",
                                    children: t("footerPlatform")
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 flex flex-col gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/risk-index",
                                            className: "text-sm text-slate-600 transition hover:text-emerald-600",
                                            children: t("riskIndex")
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 39,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/write-review",
                                            className: "text-sm text-slate-600 transition hover:text-emerald-600",
                                            children: t("writeReview")
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 45,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/company/profile",
                                            className: "text-sm text-slate-600 transition hover:text-emerald-600",
                                            children: t("companyProfile")
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 51,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/pricing",
                                            className: "text-sm text-slate-600 transition hover:text-emerald-600",
                                            children: t("plansAccess")
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 57,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/verification",
                                            className: "text-sm text-slate-600 transition hover:text-emerald-600",
                                            children: t("verification")
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 63,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Footer.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm font-extrabold uppercase tracking-[0.14em] text-slate-400",
                                    children: t("footerLegal")
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 flex flex-col gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/privacy",
                                            className: "text-sm text-slate-600 transition hover:text-emerald-600",
                                            children: t("privacy")
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 77,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/terms",
                                            className: "text-sm text-slate-600 transition hover:text-emerald-600",
                                            children: t("terms")
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 83,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/review-policy",
                                            className: "text-sm text-slate-600 transition hover:text-emerald-600",
                                            children: t("reviewPolicy")
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 89,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/legal",
                                            className: "text-sm text-slate-600 transition hover:text-emerald-600",
                                            children: t("legal")
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 95,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/contact",
                                            className: "text-sm text-slate-600 transition hover:text-emerald-600",
                                            children: t("contact")
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Footer.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Footer.tsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: t("footerRights")
                        }, void 0, false, {
                            fileName: "[project]/components/Footer.tsx",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: t("footerBottomText")
                        }, void 0, false, {
                            fileName: "[project]/components/Footer.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Footer.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Footer.tsx",
            lineNumber: 11,
            columnNumber: 3
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Footer.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(SiteFooter, "p2BMN842WmXaElEn1NQnTw7gg40=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$language$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = SiteFooter;
var _c;
__turbopack_context__.k.register(_c, "SiteFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/analytics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "trackEvent",
    ()=>trackEvent
]);
function getOrCreateStorageValue(key) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    let value = localStorage.getItem(key);
    if (!value) {
        value = crypto.randomUUID();
        localStorage.setItem(key, value);
    }
    return value;
}
function getOrCreateSessionId() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    let value = sessionStorage.getItem("site_session_id");
    if (!value) {
        value = crypto.randomUUID();
        sessionStorage.setItem("site_session_id", value);
    }
    return value;
}
function parseUtm() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const params = new URLSearchParams(window.location.search);
    return {
        source: params.get("utm_source") || "",
        medium: params.get("utm_medium") || "",
        campaign: params.get("utm_campaign") || ""
    };
}
async function trackEvent(payload) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const visitor_id = getOrCreateStorageValue("site_visitor_id");
    const session_id = getOrCreateSessionId();
    const { source, medium, campaign } = parseUtm();
    const finalPayload = {
        page_path: window.location.pathname + window.location.search,
        page_url: window.location.href,
        referrer: document.referrer || "",
        source,
        medium,
        campaign,
        visitor_id,
        session_id,
        ...payload
    };
    try {
        await fetch("/api/track-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(finalPayload),
            keepalive: true
        });
    } catch  {
    // ignore analytics errors
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/VisitTracker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VisitTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/analytics.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function VisitTracker() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const lastTrackedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VisitTracker.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const query = searchParams?.toString();
            const pageKey = query ? `${pathname}?${query}` : pathname || "/";
            if (lastTrackedRef.current === pageKey) return;
            lastTrackedRef.current = pageKey;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackEvent"])({
                event_type: "page_view",
                page_path: pageKey,
                page_url: window.location.href
            });
        }
    }["VisitTracker.useEffect"], [
        pathname,
        searchParams
    ]);
    return null;
}
_s(VisitTracker, "w6nvCeASQ1Gx0kTplFQ9QUxmsb8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = VisitTracker;
var _c;
__turbopack_context__.k.register(_c, "VisitTracker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_e4e40bde._.js.map