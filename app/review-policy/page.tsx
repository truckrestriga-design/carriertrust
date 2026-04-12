"use client";

import { useMemo } from "react";
import { useLang } from "@/lib/language-context";

type Lang = "en" | "de" | "ru" | "fr" | "es" | "it";

type TextPack = {
  badge: string;
  title: string;
  intro: string;

  allowed: string;
  allowed1: string;
  allowed2: string;
  allowed3: string;

  notAllowed: string;
  notAllowed1: string;
  notAllowed2: string;
  notAllowed3: string;
  notAllowed4: string;

  moderation: string;
  moderationText: string;
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    badge: "Policy",
    title: "Review Policy",
    intro:
      "CarrierTrust allows companies to publish reviews about logistics partners.",

    allowed: "Allowed",
    allowed1: "Real business experiences",
    allowed2: "Professional feedback",
    allowed3: "Constructive criticism",

    notAllowed: "Not allowed",
    notAllowed1: "Fake reviews",
    notAllowed2: "Defamation or insults",
    notAllowed3: "Illegal content",
    notAllowed4: "Personal data leaks",

    moderation: "Moderation",
    moderationText:
      "CarrierTrust may remove reviews that violate laws or policies.",
  },

  de: {
    badge: "Richtlinie",
    title: "Bewertungsrichtlinie",
    intro:
      "CarrierTrust erlaubt Unternehmen, Bewertungen über Logistikpartner zu veröffentlichen.",

    allowed: "Erlaubt",
    allowed1: "Reale Geschäftserfahrungen",
    allowed2: "Professionelles Feedback",
    allowed3: "Konstruktive Kritik",

    notAllowed: "Nicht erlaubt",
    notAllowed1: "Gefälschte Bewertungen",
    notAllowed2: "Verleumdung oder Beleidigungen",
    notAllowed3: "Illegale Inhalte",
    notAllowed4: "Weitergabe personenbezogener Daten",

    moderation: "Moderation",
    moderationText:
      "CarrierTrust kann Bewertungen entfernen, die gegen Gesetze oder Richtlinien verstoßen.",
  },

  ru: {
    badge: "Политика",
    title: "Политика отзывов",
    intro:
      "CarrierTrust позволяет компаниям публиковать отзывы о логистических партнёрах.",

    allowed: "Разрешено",
    allowed1: "Реальный бизнес-опыт",
    allowed2: "Профессиональная обратная связь",
    allowed3: "Конструктивная критика",

    notAllowed: "Запрещено",
    notAllowed1: "Фейковые отзывы",
    notAllowed2: "Клевета или оскорбления",
    notAllowed3: "Незаконный контент",
    notAllowed4: "Раскрытие персональных данных",

    moderation: "Модерация",
    moderationText:
      "CarrierTrust может удалять отзывы, нарушающие закон или правила платформы.",
  },

  fr: {
    badge: "Politique",
    title: "Politique des avis",
    intro:
      "CarrierTrust permet aux entreprises de publier des avis sur leurs partenaires logistiques.",

    allowed: "Autorisé",
    allowed1: "Expériences commerciales réelles",
    allowed2: "Retour professionnel",
    allowed3: "Critique constructive",

    notAllowed: "Non autorisé",
    notAllowed1: "Faux avis",
    notAllowed2: "Diffamation ou insultes",
    notAllowed3: "Contenu illégal",
    notAllowed4: "Divulgation de données personnelles",

    moderation: "Modération",
    moderationText:
      "CarrierTrust peut supprimer les avis qui violent les lois ou les politiques.",
  },

  es: {
    badge: "Política",
    title: "Política de reseñas",
    intro:
      "CarrierTrust permite a las empresas publicar reseñas sobre socios logísticos.",

    allowed: "Permitido",
    allowed1: "Experiencias comerciales reales",
    allowed2: "Feedback profesional",
    allowed3: "Crítica constructiva",

    notAllowed: "No permitido",
    notAllowed1: "Reseñas falsas",
    notAllowed2: "Difamación o insultos",
    notAllowed3: "Contenido ilegal",
    notAllowed4: "Filtración de datos personales",

    moderation: "Moderación",
    moderationText:
      "CarrierTrust puede eliminar reseñas que infrinjan leyes o políticas.",
  },

  it: {
    badge: "Policy",
    title: "Policy recensioni",
    intro:
      "CarrierTrust consente alle aziende di pubblicare recensioni sui partner logistici.",

    allowed: "Consentito",
    allowed1: "Esperienze aziendali reali",
    allowed2: "Feedback professionale",
    allowed3: "Critica costruttiva",

    notAllowed: "Non consentito",
    notAllowed1: "Recensioni false",
    notAllowed2: "Diffamazione o insulti",
    notAllowed3: "Contenuti illegali",
    notAllowed4: "Diffusione di dati personali",

    moderation: "Moderazione",
    moderationText:
      "CarrierTrust può rimuovere recensioni che violano leggi o policy.",
  },
};

export default function ReviewPolicyPage() {
  const { lang } = useLang();

  const safeLang: Lang =
    lang === "en" ||
    lang === "de" ||
    lang === "ru" ||
    lang === "fr" ||
    lang === "es" ||
    lang === "it"
      ? lang
      : "en";

  const t = useMemo(() => TEXT[safeLang], [safeLang]);

  return (
    <main className="min-h-screen text-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.14),transparent)]" />
        <div className="absolute left-[8%] top-[8%] h-[24rem] w-[24rem] rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute bottom-[8%] right-[10%] h-[20rem] w-[20rem] rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.55)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.04]" />
      </div>

      <div className="relative px-6 pb-20 pt-32 md:pt-36">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-emerald-200/50 blur-3xl" />
              <div className="absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
            </div>

            <div className="relative p-8 md:p-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {t.badge}
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {t.title}
              </h1>

              <div className="mt-8 rounded-[1.5rem] border border-slate-200/70 bg-white/80 p-6 shadow-sm md:p-8">
                <div className="space-y-5 text-sm leading-7 text-slate-600 md:text-[15px]">
                  <p>{t.intro}</p>

                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-slate-900">
                      {t.allowed}
                    </h2>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>{t.allowed1}</li>
                      <li>{t.allowed2}</li>
                      <li>{t.allowed3}</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-slate-900">
                      {t.notAllowed}
                    </h2>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>{t.notAllowed1}</li>
                      <li>{t.notAllowed2}</li>
                      <li>{t.notAllowed3}</li>
                      <li>{t.notAllowed4}</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-slate-900">
                      {t.moderation}
                    </h2>
                    <p>{t.moderationText}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}