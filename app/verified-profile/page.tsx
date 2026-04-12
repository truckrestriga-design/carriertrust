"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useLang } from "@/lib/language-context";

type Lang = "en" | "de" | "ru" | "fr" | "es" | "it";

type TextPack = {
  forCompanies: string;
  heroTitle: string;
  heroText: string;
  openPricing: string;
  createCompanyAccount: string;

  freePlan: string;
  proPlan: string;
  oneMonthPlan: string;

  freeBadge: string;
  proBadge: string;
  oneMonthBadge: string;

  freePriceSub: string;
  proPriceSub: string;
  oneMonthPriceSub: string;

  freeFeature1: string;
  freeFeature2: string;
  freeFeature3: string;
  freeFooter: string;

  proFeature1: string;
  proFeature2: string;
  proFeature3: string;
  proFeature4: string;

  contractTerms: string;
  contractLine1: string;
  contractLine2: string;
  contractLine3: string;

  monthFeature1: string;
  monthFeature2: string;
  monthFeature3: string;
  monthTerms: string;
  monthTerms1: string;
  monthTerms2: string;

  howItWorks: string;

  step1: string;
  step1Title: string;
  step1Text: string;

  step2: string;
  step2Title: string;
  step2Text: string;

  step3: string;
  step3Title: string;
  step3Text: string;

  viewFullPricing: string;
};

const EN: TextPack = {
  forCompanies: "For companies",
  heroTitle: "Verified company profile",
  heroText:
    "Manage your company presence on CarrierTrust.eu, reply officially to reviews, and choose the access level that fits your business.",
  openPricing: "Open pricing",
  createCompanyAccount: "Create company account",

  freePlan: "FREE",
  proPlan: "PRO",
  oneMonthPlan: "ONE MONTH",

  freeBadge: "Good for start",
  proBadge: "Most complete",
  oneMonthBadge: "Flexible",

  freePriceSub: "Basic company presence",
  proPriceSub: "per month • auto-renew",
  oneMonthPriceSub: "one-time payment",

  freeFeature1: "— 1 official reply",
  freeFeature2: "— No analytics",
  freeFeature3: "— No dispute system",
  freeFooter: "Good for getting started.",

  proFeature1: "— Unlimited replies",
  proFeature2: "— Dispute fake reviews",
  proFeature3: "— Analytics",
  proFeature4: "— Verified PRO badge",

  contractTerms: "Contract terms",
  contractLine1: "€49 is charged automatically every month.",
  contractLine2: "Minimum commitment: 12 months.",
  contractLine3:
    "If cancelled before 12 months end, an early cancellation fee equal to 1 month may be charged.",

  monthFeature1: "— PRO access for 30 days",
  monthFeature2: "— No automatic renewal",
  monthFeature3: "— Good for a paid trial month",
  monthTerms: "Terms",
  monthTerms1: "You pay once for 30 days of access.",
  monthTerms2: "No automatic renewal.",

  howItWorks: "How it works",

  step1: "Step 1",
  step1Title: "Create account",
  step1Text:
    "Register with your company name, VAT number, email and password.",

  step2: "Step 2",
  step2Title: "Select your company",
  step2Text:
    "If your company is already in the database, choose the existing one instead of creating a duplicate.",

  step3: "Step 3",
  step3Title: "Get access",
  step3Text:
    "After review, you can manage replies and use the tools included in your plan.",

  viewFullPricing: "View full pricing",
};

const TEXT: Record<Lang, TextPack> = {
  en: EN,
  de: {
    forCompanies: "Für Unternehmen",
    heroTitle: "Verifiziertes Unternehmensprofil",
    heroText:
      "Verwalten Sie die Präsenz Ihres Unternehmens auf CarrierTrust.eu, antworten Sie offiziell auf Bewertungen und wählen Sie den Zugang, der zu Ihrem Unternehmen passt.",
    openPricing: "Preise öffnen",
    createCompanyAccount: "Unternehmenskonto erstellen",

    freePlan: "KOSTENLOS",
    proPlan: "PRO",
    oneMonthPlan: "EIN MONAT",

    freeBadge: "Gut für den Start",
    proBadge: "Am vollständigsten",
    oneMonthBadge: "Flexibel",

    freePriceSub: "Grundlegende Unternehmenspräsenz",
    proPriceSub: "pro Monat • automatische Verlängerung",
    oneMonthPriceSub: "Einmalzahlung",

    freeFeature1: "— 1 offizielle Antwort",
    freeFeature2: "— Keine Analysen",
    freeFeature3: "— Kein Streitfall-System",
    freeFooter: "Gut für den Einstieg.",

    proFeature1: "— Unbegrenzte Antworten",
    proFeature2: "— Falsche Bewertungen anfechten",
    proFeature3: "— Analysen",
    proFeature4: "— Verifiziertes PRO-Badge",

    contractTerms: "Vertragsbedingungen",
    contractLine1: "€49 werden automatisch jeden Monat berechnet.",
    contractLine2: "Mindestlaufzeit: 12 Monate.",
    contractLine3:
      "Bei Kündigung vor Ablauf von 12 Monaten kann eine vorzeitige Kündigungsgebühr in Höhe eines Monats berechnet werden.",

    monthFeature1: "— PRO-Zugang für 30 Tage",
    monthFeature2: "— Keine automatische Verlängerung",
    monthFeature3: "— Gut für einen bezahlten Testmonat",
    monthTerms: "Bedingungen",
    monthTerms1: "Sie zahlen einmal für 30 Tage Zugang.",
    monthTerms2: "Keine automatische Verlängerung.",

    howItWorks: "So funktioniert es",

    step1: "Schritt 1",
    step1Title: "Konto erstellen",
    step1Text:
      "Registrieren Sie sich mit Firmenname, USt-IdNr., E-Mail und Passwort.",

    step2: "Schritt 2",
    step2Title: "Unternehmen auswählen",
    step2Text:
      "Wenn Ihr Unternehmen bereits in der Datenbank vorhanden ist, wählen Sie den bestehenden Eintrag, statt ein Duplikat zu erstellen.",

    step3: "Schritt 3",
    step3Title: "Zugang erhalten",
    step3Text:
      "Nach der Prüfung können Sie Antworten verwalten und die im Tarif enthaltenen Tools nutzen.",

    viewFullPricing: "Alle Preise ansehen",
  },
  ru: {
    forCompanies: "Для компаний",
    heroTitle: "Верифицированный профиль компании",
    heroText:
      "Управляйте присутствием вашей компании на CarrierTrust.eu, официально отвечайте на отзывы и выбирайте уровень доступа, который подходит вашему бизнесу.",
    openPricing: "Открыть тарифы",
    createCompanyAccount: "Создать аккаунт компании",

    freePlan: "БЕСПЛАТНО",
    proPlan: "PRO",
    oneMonthPlan: "ОДИН МЕСЯЦ",

    freeBadge: "Хорошо для старта",
    proBadge: "Максимум возможностей",
    oneMonthBadge: "Гибко",

    freePriceSub: "Базовое присутствие компании",
    proPriceSub: "в месяц • автопродление",
    oneMonthPriceSub: "разовый платёж",

    freeFeature1: "— 1 официальный ответ",
    freeFeature2: "— Без аналитики",
    freeFeature3: "— Без системы споров",
    freeFooter: "Подходит для старта.",

    proFeature1: "— Неограниченные ответы",
    proFeature2: "— Оспаривание фейковых отзывов",
    proFeature3: "— Аналитика",
    proFeature4: "— Верифицированный PRO значёк",

    contractTerms: "Условия договора",
    contractLine1: "€49 списываются автоматически каждый месяц.",
    contractLine2: "Минимальный срок: 12 месяцев.",
    contractLine3:
      "При отмене до окончания 12 месяцев может взиматься комиссия в размере 1 месяца.",

    monthFeature1: "— PRO доступ на 30 дней",
    monthFeature2: "— Без автоматического продления",
    monthFeature3: "— Подходит для платного тестового месяца",
    monthTerms: "Условия",
    monthTerms1: "Вы платите один раз за 30 дней доступа.",
    monthTerms2: "Без автоматического продления.",

    howItWorks: "Как это работает",

    step1: "Шаг 1",
    step1Title: "Создайте аккаунт",
    step1Text:
      "Зарегистрируйтесь, указав название компании, VAT номер, email и пароль.",

    step2: "Шаг 2",
    step2Title: "Выберите свою компанию",
    step2Text:
      "Если ваша компания уже есть в базе данных, выберите существующую запись вместо создания дубликата.",

    step3: "Шаг 3",
    step3Title: "Получите доступ",
    step3Text:
      "После проверки вы сможете управлять ответами и использовать инструменты, включённые в ваш тариф.",

    viewFullPricing: "Смотреть все тарифы",
  },
  fr: {
    forCompanies: "Pour les entreprises",
    heroTitle: "Profil d’entreprise vérifié",
    heroText:
      "Gérez la présence de votre entreprise sur CarrierTrust.eu, répondez officiellement aux avis et choisissez le niveau d’accès adapté à votre activité.",
    openPricing: "Voir les tarifs",
    createCompanyAccount: "Créer un compte entreprise",

    freePlan: "GRATUIT",
    proPlan: "PRO",
    oneMonthPlan: "UN MOIS",

    freeBadge: "Idéal pour commencer",
    proBadge: "Le plus complet",
    oneMonthBadge: "Flexible",

    freePriceSub: "Présence de base de l’entreprise",
    proPriceSub: "par mois • renouvellement automatique",
    oneMonthPriceSub: "paiement unique",

    freeFeature1: "— 1 réponse officielle",
    freeFeature2: "— Pas d’analytique",
    freeFeature3: "— Pas de système de litige",
    freeFooter: "Idéal pour démarrer.",

    proFeature1: "— Réponses illimitées",
    proFeature2: "— Contestation des faux avis",
    proFeature3: "— Analytique",
    proFeature4: "— Badge PRO vérifié",

    contractTerms: "Conditions contractuelles",
    contractLine1: "€49 sont facturés automatiquement chaque mois.",
    contractLine2: "Engagement minimum : 12 mois.",
    contractLine3:
      "En cas de résiliation avant la fin des 12 mois, des frais équivalents à 1 mois peuvent être appliqués.",

    monthFeature1: "— Accès PRO pendant 30 jours",
    monthFeature2: "— Pas de renouvellement automatique",
    monthFeature3: "— Idéal pour un mois d’essai payant",
    monthTerms: "Conditions",
    monthTerms1: "Vous payez une seule fois pour 30 jours d’accès.",
    monthTerms2: "Pas de renouvellement automatique.",

    howItWorks: "Comment ça marche",

    step1: "Étape 1",
    step1Title: "Créer un compte",
    step1Text:
      "Inscrivez-vous avec le nom de votre entreprise, le numéro de TVA, l’email et le mot de passe.",

    step2: "Étape 2",
    step2Title: "Sélectionnez votre entreprise",
    step2Text:
      "Si votre entreprise existe déjà dans la base de données, choisissez-la au lieu de créer un doublon.",

    step3: "Étape 3",
    step3Title: "Obtenir l’accès",
    step3Text:
      "Après vérification, vous pourrez gérer les réponses et utiliser les outils inclus dans votre offre.",

    viewFullPricing: "Voir tous les tarifs",
  },
  es: {
    forCompanies: "Para empresas",
    heroTitle: "Perfil de empresa verificado",
    heroText:
      "Gestiona la presencia de tu empresa en CarrierTrust.eu, responde oficialmente a las reseñas y elige el nivel de acceso que mejor se adapta a tu negocio.",
    openPricing: "Abrir precios",
    createCompanyAccount: "Crear cuenta de empresa",

    freePlan: "GRATIS",
    proPlan: "PRO",
    oneMonthPlan: "UN MES",

    freeBadge: "Bueno para empezar",
    proBadge: "Más completo",
    oneMonthBadge: "Flexible",

    freePriceSub: "Presencia básica de empresa",
    proPriceSub: "por mes • renovación automática",
    oneMonthPriceSub: "pago único",

    freeFeature1: "— 1 respuesta oficial",
    freeFeature2: "— Sin analítica",
    freeFeature3: "— Sin sistema de disputas",
    freeFooter: "Bueno para empezar.",

    proFeature1: "— Respuestas ilimitadas",
    proFeature2: "— Impugnar reseñas falsas",
    proFeature3: "— Analítica",
    proFeature4: "— Badge PRO verificado",

    contractTerms: "Términos del contrato",
    contractLine1: "€49 se cobran automáticamente cada mes.",
    contractLine2: "Compromiso mínimo: 12 meses.",
    contractLine3:
      "Si cancelas antes de que finalicen los 12 meses, se puede cobrar una tarifa equivalente a 1 mes.",

    monthFeature1: "— Acceso PRO durante 30 días",
    monthFeature2: "— Sin renovación automática",
    monthFeature3: "— Bueno para un mes de prueba pagado",
    monthTerms: "Términos",
    monthTerms1: "Pagas una vez por 30 días de acceso.",
    monthTerms2: "Sin renovación automática.",

    howItWorks: "Cómo funciona",

    step1: "Paso 1",
    step1Title: "Crear cuenta",
    step1Text:
      "Regístrate con el nombre de tu empresa, número de VAT, correo electrónico y contraseña.",

    step2: "Paso 2",
    step2Title: "Selecciona tu empresa",
    step2Text:
      "Si tu empresa ya está en la base de datos, elige la existente en lugar de crear un duplicado.",

    step3: "Paso 3",
    step3Title: "Obtén acceso",
    step3Text:
      "Después de la revisión, podrás gestionar respuestas y usar las herramientas incluidas en tu plan.",

    viewFullPricing: "Ver todos los precios",
  },
  it: {
    forCompanies: "Per aziende",
    heroTitle: "Profilo aziendale verificato",
    heroText:
      "Gestisci la presenza della tua azienda su CarrierTrust.eu, rispondi ufficialmente alle recensioni e scegli il livello di accesso più adatto al tuo business.",
    openPricing: "Apri prezzi",
    createCompanyAccount: "Crea account aziendale",

    freePlan: "GRATIS",
    proPlan: "PRO",
    oneMonthPlan: "UN MESE",

    freeBadge: "Ideale per iniziare",
    proBadge: "Più completo",
    oneMonthBadge: "Flessibile",

    freePriceSub: "Presenza aziendale di base",
    proPriceSub: "al mese • rinnovo automatico",
    oneMonthPriceSub: "pagamento una tantum",

    freeFeature1: "— 1 risposta ufficiale",
    freeFeature2: "— Nessuna analitica",
    freeFeature3: "— Nessun sistema di contestazione",
    freeFooter: "Ideale per iniziare.",

    proFeature1: "— Risposte illimitate",
    proFeature2: "— Contestazione recensioni false",
    proFeature3: "— Analitica",
    proFeature4: "— Badge PRO verificato",

    contractTerms: "Termini contrattuali",
    contractLine1: "€49 vengono addebitati automaticamente ogni mese.",
    contractLine2: "Impegno minimo: 12 mesi.",
    contractLine3:
      "Se annulli prima della fine dei 12 mesi, potrebbe essere addebitata una penale pari a 1 mese.",

    monthFeature1: "— Accesso PRO per 30 giorni",
    monthFeature2: "— Nessun rinnovo automatico",
    monthFeature3: "— Ideale per un mese di prova a pagamento",
    monthTerms: "Termini",
    monthTerms1: "Paghi una sola volta per 30 giorni di accesso.",
    monthTerms2: "Nessun rinnovo automatico.",

    howItWorks: "Come funziona",

    step1: "Passo 1",
    step1Title: "Crea un account",
    step1Text:
      "Registrati con nome azienda, numero VAT, email e password.",

    step2: "Passo 2",
    step2Title: "Seleziona la tua azienda",
    step2Text:
      "Se la tua azienda è già presente nel database, scegli quella esistente invece di creare un duplicato.",

    step3: "Passo 3",
    step3Title: "Ottieni accesso",
    step3Text:
      "Dopo la revisione, potrai gestire le risposte e usare gli strumenti inclusi nel tuo piano.",

    viewFullPricing: "Vedi prezzi completi",
  },
};

export default function VerifiedProfilePage() {
  const { lang } = useLang();
  const t = useMemo(() => TEXT[(lang as Lang) || "en"] ?? TEXT.en, [lang]);

  const card =
    "rounded-[28px] border border-black/10 bg-white/70 backdrop-blur shadow-[0_14px_60px_rgba(15,20,30,0.08)]";
  const planCard =
    "rounded-[24px] border border-black/10 bg-white/75 backdrop-blur p-6 shadow-sm";
  const pill =
    "inline-flex items-center rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-semibold text-black/65";
  const blackBtn =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 bg-black text-white font-semibold hover:bg-black/90 transition shadow-sm";
  const ghostBtn =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 border border-black/10 bg-white/80 text-black font-semibold hover:bg-white transition shadow-sm";

  return (
    <main className="min-h-screen text-black">
      <div className="relative px-6">
        <div className="mx-auto max-w-6xl pb-16 pt-45">

          <div className={`p-8 ${card}`}>
            <div className="max-w-3xl">
              <div className={pill}>{t.forCompanies}</div>

              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                {t.heroTitle}
              </h1>

              <p className="mt-4 text-lg leading-8 text-black/65">
                {t.heroText}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/pricing" className={blackBtn}>
                  {t.openPricing}
                </Link>
                <Link href="/auth?next=/company/profile" className={ghostBtn}>
                  {t.createCompanyAccount}
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className={planCard}>
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-3xl font-extrabold tracking-tight">{t.freePlan}</h2>
                <span className={pill}>{t.freeBadge}</span>
              </div>

              <div className="mt-6 text-5xl font-extrabold">€0</div>
              <div className="mt-2 text-black/55">{t.freePriceSub}</div>

              <div className="mt-8 space-y-4 text-lg text-black/80">
                <div>{t.freeFeature1}</div>
                <div>{t.freeFeature2}</div>
                <div>{t.freeFeature3}</div>
              </div>

              <div className="mt-10 text-sm text-black/50">{t.freeFooter}</div>
            </div>

            <div className={planCard}>
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-3xl font-extrabold tracking-tight">{t.proPlan}</h2>
                <span className={pill}>{t.proBadge}</span>
              </div>

              <div className="mt-6 text-5xl font-extrabold">€49</div>
              <div className="mt-2 text-black/55">{t.proPriceSub}</div>

              <div className="mt-8 space-y-4 text-lg text-black/80">
                <div>{t.proFeature1}</div>
                <div>{t.proFeature2}</div>
                <div>{t.proFeature3}</div>
                <div>{t.proFeature4}</div>
              </div>

              <div className="mt-8 rounded-2xl border border-black/10 bg-white/75 p-4 text-sm text-black/75">
                <div className="font-bold text-black">{t.contractTerms}</div>
                <div className="mt-2">{t.contractLine1}</div>
                <div className="mt-1">{t.contractLine2}</div>
                <div className="mt-1">{t.contractLine3}</div>
              </div>
            </div>

            <div className={planCard}>
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-3xl font-extrabold tracking-tight">{t.oneMonthPlan}</h2>
                <span className={pill}>{t.oneMonthBadge}</span>
              </div>

              <div className="mt-6 text-5xl font-extrabold">€69</div>
              <div className="mt-2 text-black/55">{t.oneMonthPriceSub}</div>

              <div className="mt-8 space-y-4 text-lg text-black/80">
                <div>{t.monthFeature1}</div>
                <div>{t.monthFeature2}</div>
                <div>{t.monthFeature3}</div>
              </div>

              <div className="mt-8 rounded-2xl border border-black/10 bg-white/75 p-4 text-sm text-black/75">
                <div className="font-bold text-black">{t.monthTerms}</div>
                <div className="mt-2">{t.monthTerms1}</div>
                <div className="mt-1">{t.monthTerms2}</div>
              </div>
            </div>
          </div>

          <div className={`mt-8 p-6 ${card}`}>
            <h3 className="text-2xl font-extrabold tracking-tight">
              {t.howItWorks}
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-black/10 bg-white/70 p-5">
                <div className="text-sm font-bold text-black/55">{t.step1}</div>
                <div className="mt-2 text-lg font-semibold">{t.step1Title}</div>
                <div className="mt-2 text-sm text-black/65">
                  {t.step1Text}
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white/70 p-5">
                <div className="text-sm font-bold text-black/55">{t.step2}</div>
                <div className="mt-2 text-lg font-semibold">{t.step2Title}</div>
                <div className="mt-2 text-sm text-black/65">
                  {t.step2Text}
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white/70 p-5">
                <div className="text-sm font-bold text-black/55">{t.step3}</div>
                <div className="mt-2 text-lg font-semibold">{t.step3Title}</div>
                <div className="mt-2 text-sm text-black/65">
                  {t.step3Text}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/auth?next=/company/profile" className={blackBtn}>
                {t.createCompanyAccount}
              </Link>
              <Link href="/pricing" className={ghostBtn}>
                {t.viewFullPricing}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}