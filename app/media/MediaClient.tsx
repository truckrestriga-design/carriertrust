"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useLang } from "@/lib/language-context";

type Lang = "en" | "de" | "ru" | "fr" | "es" | "it";

type TextPack = {
  eyebrow: string;
  title: string;
  intro: string;
  featureCount: string;
  publisherCount: string;
  languageCount: string;
  coverageTitle: string;
  coverageIntro: string;
  mediaCoverage: string;
  readArticle: string;
  ecosystemTitle: string;
  ecosystemIntro: string;
  ecosystemRecognition: string;
  viewDatabase: string;
  externalNote: string;
  contactTitle: string;
  contactText: string;
  contactAction: string;
  descriptions: Record<string, string>;
  startinTitle: string;
  startinDescription: string;
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    eyebrow: "CarrierTrust newsroom",
    title: "CarrierTrust in the media",
    intro:
      "Selected media coverage and ecosystem recognition of CarrierTrust as it builds trust infrastructure for European logistics.",
    featureCount: "4 media features",
    publisherCount: "3 publishers",
    languageCount: "2 languages",
    coverageTitle: "Media coverage",
    coverageIntro:
      "Articles and reports published by Latvian public media, business news and the national startup ecosystem platform.",
    mediaCoverage: "Media coverage",
    readArticle: "Read article",
    ecosystemTitle: "Ecosystem recognition",
    ecosystemIntro:
      "CarrierTrust is also listed in Latvia's startup ecosystem database.",
    ecosystemRecognition: "Startup ecosystem",
    viewDatabase: "View database",
    externalNote:
      "External links open the original publisher or ecosystem platform in a new tab.",
    contactTitle: "Media and partnership enquiries",
    contactText:
      "For interviews, company information, data commentary or partnerships, contact the CarrierTrust team.",
    contactAction: "Contact CarrierTrust",
    descriptions: {
      lsm: "Latvian Public Service Media covered the launch of CarrierTrust and its reputation-network approach for the transport sector.",
      labsEn:
        "The English edition of Labs of Latvia introduced CarrierTrust as a Latvia-based platform for trust and reputation in European logistics.",
      labsLv:
        "The Latvian edition of Labs of Latvia presented the platform, its origin and its role in making logistics cooperation more transparent.",
      delfi:
        "DELFI Bizness reported on how CarrierTrust helps logistics companies check partners and evaluate cooperation risks.",
    },
    startinTitle: "CarrierTrust in Latvia's startup database",
    startinDescription:
      "CarrierTrust is included in the Startin.LV startup overview supported by the Ministry of Economics of the Republic of Latvia.",
  },
  de: {
    eyebrow: "CarrierTrust Newsroom",
    title: "CarrierTrust in den Medien",
    intro:
      "Ausgewählte Medienberichte und Anerkennung im Startup-Ökosystem über CarrierTrust und den Aufbau einer Vertrauensinfrastruktur für die europäische Logistik.",
    featureCount: "4 Medienberichte",
    publisherCount: "3 Medienhäuser",
    languageCount: "2 Sprachen",
    coverageTitle: "Medienberichte",
    coverageIntro:
      "Artikel und Berichte von lettischen öffentlich-rechtlichen Medien, Wirtschaftsnachrichten und der nationalen Startup-Plattform.",
    mediaCoverage: "Medienbericht",
    readArticle: "Artikel lesen",
    ecosystemTitle: "Anerkennung im Ökosystem",
    ecosystemIntro:
      "CarrierTrust ist außerdem in der lettischen Startup-Datenbank gelistet.",
    ecosystemRecognition: "Startup-Ökosystem",
    viewDatabase: "Datenbank öffnen",
    externalNote:
      "Externe Links öffnen den ursprünglichen Herausgeber oder die Ökosystem-Plattform in einem neuen Tab.",
    contactTitle: "Medien- und Partnerschaftsanfragen",
    contactText:
      "Für Interviews, Unternehmensinformationen, Datenkommentare oder Partnerschaften kontaktieren Sie das CarrierTrust-Team.",
    contactAction: "CarrierTrust kontaktieren",
    descriptions: {
      lsm: "Der lettische öffentlich-rechtliche Rundfunk berichtete über den Start von CarrierTrust und den Ansatz eines Reputationsnetzwerks für den Transportsektor.",
      labsEn:
        "Die englische Ausgabe von Labs of Latvia stellte CarrierTrust als lettische Plattform für Vertrauen und Reputation in der europäischen Logistik vor.",
      labsLv:
        "Die lettische Ausgabe von Labs of Latvia präsentierte die Plattform, ihre Entstehung und ihre Rolle für transparentere Logistikbeziehungen.",
      delfi:
        "DELFI Bizness berichtete darüber, wie CarrierTrust Logistikunternehmen bei der Partnerprüfung und Risikobewertung unterstützt.",
    },
    startinTitle: "CarrierTrust in Lettlands Startup-Datenbank",
    startinDescription:
      "CarrierTrust ist in der Startin.LV Startup-Übersicht gelistet, die vom Wirtschaftsministerium der Republik Lettland unterstützt wird.",
  },
  ru: {
    eyebrow: "Новости CarrierTrust",
    title: "CarrierTrust в СМИ",
    intro:
      "Подборка публикаций и признание в стартап-экосистеме о CarrierTrust, создающем инфраструктуру доверия для европейской логистики.",
    featureCount: "4 публикации",
    publisherCount: "3 издания",
    languageCount: "2 языка",
    coverageTitle: "Публикации в СМИ",
    coverageIntro:
      "Материалы латвийских общественных СМИ, деловых новостей и национальной платформы стартап-экосистемы.",
    mediaCoverage: "Публикация в СМИ",
    readArticle: "Читать статью",
    ecosystemTitle: "Признание экосистемы",
    ecosystemIntro:
      "CarrierTrust также представлен в базе латвийской стартап-экосистемы.",
    ecosystemRecognition: "Стартап-экосистема",
    viewDatabase: "Открыть базу",
    externalNote:
      "Внешние ссылки открывают оригинальный сайт издания или платформы в новой вкладке.",
    contactTitle: "Для СМИ и партнёров",
    contactText:
      "По вопросам интервью, информации о компании, комментариев и партнёрства свяжитесь с командой CarrierTrust.",
    contactAction: "Связаться с CarrierTrust",
    descriptions: {
      lsm: "Латвийские общественные СМИ рассказали о запуске CarrierTrust и создании сети репутации для транспортной отрасли.",
      labsEn:
        "Английская редакция Labs of Latvia представила CarrierTrust как латвийскую платформу доверия и репутации в европейской логистике.",
      labsLv:
        "Латышская редакция Labs of Latvia рассказала о платформе, её происхождении и роли в повышении прозрачности сотрудничества.",
      delfi:
        "DELFI Bizness рассказал, как CarrierTrust помогает логистическим компаниям проверять партнёров и оценивать риски сотрудничества.",
    },
    startinTitle: "CarrierTrust в базе стартапов Латвии",
    startinDescription:
      "CarrierTrust включён в обзор стартапов Startin.LV, поддерживаемый Министерством экономики Латвийской Республики.",
  },
  fr: {
    eyebrow: "Newsroom CarrierTrust",
    title: "CarrierTrust dans les médias",
    intro:
      "Une sélection de publications et de reconnaissances de l'écosystème consacrées à CarrierTrust et à son infrastructure de confiance pour la logistique européenne.",
    featureCount: "4 publications",
    publisherCount: "3 médias",
    languageCount: "2 langues",
    coverageTitle: "Couverture médiatique",
    coverageIntro:
      "Articles publiés par les médias publics lettons, la presse économique et la plateforme nationale des startups.",
    mediaCoverage: "Couverture médiatique",
    readArticle: "Lire l'article",
    ecosystemTitle: "Reconnaissance de l'écosystème",
    ecosystemIntro:
      "CarrierTrust figure également dans la base de données des startups lettones.",
    ecosystemRecognition: "Écosystème startup",
    viewDatabase: "Voir la base",
    externalNote:
      "Les liens externes ouvrent le média ou la plateforme d'origine dans un nouvel onglet.",
    contactTitle: "Demandes médias et partenariats",
    contactText:
      "Pour les interviews, informations sur l'entreprise, commentaires ou partenariats, contactez l'équipe CarrierTrust.",
    contactAction: "Contacter CarrierTrust",
    descriptions: {
      lsm: "Le média public letton a présenté le lancement de CarrierTrust et son approche de réseau de réputation pour le transport.",
      labsEn:
        "L'édition anglaise de Labs of Latvia a présenté CarrierTrust comme une plateforme lettone de confiance pour la logistique européenne.",
      labsLv:
        "L'édition lettone de Labs of Latvia a présenté la plateforme, son origine et son rôle dans une coopération logistique plus transparente.",
      delfi:
        "DELFI Bizness a expliqué comment CarrierTrust aide les entreprises logistiques à vérifier leurs partenaires et à évaluer les risques.",
    },
    startinTitle: "CarrierTrust dans la base des startups lettones",
    startinDescription:
      "CarrierTrust figure dans l'aperçu Startin.LV soutenu par le ministère de l'Économie de la République de Lettonie.",
  },
  es: {
    eyebrow: "Sala de prensa de CarrierTrust",
    title: "CarrierTrust en los medios",
    intro:
      "Una selección de cobertura mediática y reconocimiento del ecosistema sobre CarrierTrust y su infraestructura de confianza para la logística europea.",
    featureCount: "4 publicaciones",
    publisherCount: "3 medios",
    languageCount: "2 idiomas",
    coverageTitle: "Cobertura mediática",
    coverageIntro:
      "Artículos de medios públicos letones, prensa empresarial y la plataforma nacional del ecosistema startup.",
    mediaCoverage: "Cobertura mediática",
    readArticle: "Leer artículo",
    ecosystemTitle: "Reconocimiento del ecosistema",
    ecosystemIntro:
      "CarrierTrust también aparece en la base de datos de startups de Letonia.",
    ecosystemRecognition: "Ecosistema startup",
    viewDatabase: "Ver base de datos",
    externalNote:
      "Los enlaces externos abren el medio o la plataforma original en una nueva pestaña.",
    contactTitle: "Consultas de medios y alianzas",
    contactText:
      "Para entrevistas, información de la empresa, comentarios o alianzas, contacte con el equipo de CarrierTrust.",
    contactAction: "Contactar con CarrierTrust",
    descriptions: {
      lsm: "El medio público letón cubrió el lanzamiento de CarrierTrust y su enfoque de red de reputación para el transporte.",
      labsEn:
        "La edición inglesa de Labs of Latvia presentó CarrierTrust como una plataforma letona de confianza para la logística europea.",
      labsLv:
        "La edición letona de Labs of Latvia presentó la plataforma, su origen y su papel en una cooperación logística más transparente.",
      delfi:
        "DELFI Bizness explicó cómo CarrierTrust ayuda a las empresas logísticas a comprobar socios y evaluar riesgos.",
    },
    startinTitle: "CarrierTrust en la base de startups de Letonia",
    startinDescription:
      "CarrierTrust está incluido en el resumen de Startin.LV apoyado por el Ministerio de Economía de la República de Letonia.",
  },
  it: {
    eyebrow: "Newsroom CarrierTrust",
    title: "CarrierTrust nei media",
    intro:
      "Una selezione di copertura mediatica e riconoscimenti dell'ecosistema dedicati a CarrierTrust e alla sua infrastruttura di fiducia per la logistica europea.",
    featureCount: "4 pubblicazioni",
    publisherCount: "3 testate",
    languageCount: "2 lingue",
    coverageTitle: "Copertura mediatica",
    coverageIntro:
      "Articoli pubblicati dai media pubblici lettoni, dalla stampa economica e dalla piattaforma nazionale delle startup.",
    mediaCoverage: "Copertura mediatica",
    readArticle: "Leggi l'articolo",
    ecosystemTitle: "Riconoscimento dell'ecosistema",
    ecosystemIntro:
      "CarrierTrust è presente anche nel database delle startup lettoni.",
    ecosystemRecognition: "Ecosistema startup",
    viewDatabase: "Apri database",
    externalNote:
      "I link esterni aprono l'editore o la piattaforma originale in una nuova scheda.",
    contactTitle: "Richieste media e partnership",
    contactText:
      "Per interviste, informazioni aziendali, commenti o partnership, contatta il team CarrierTrust.",
    contactAction: "Contatta CarrierTrust",
    descriptions: {
      lsm: "Il servizio pubblico lettone ha raccontato il lancio di CarrierTrust e il suo approccio di rete reputazionale per i trasporti.",
      labsEn:
        "L'edizione inglese di Labs of Latvia ha presentato CarrierTrust come piattaforma lettone di fiducia per la logistica europea.",
      labsLv:
        "L'edizione lettone di Labs of Latvia ha presentato la piattaforma, la sua origine e il suo ruolo nella trasparenza della cooperazione logistica.",
      delfi:
        "DELFI Bizness ha spiegato come CarrierTrust aiuta le aziende logistiche a verificare i partner e valutare i rischi.",
    },
    startinTitle: "CarrierTrust nel database delle startup lettoni",
    startinDescription:
      "CarrierTrust è incluso nella panoramica Startin.LV sostenuta dal Ministero dell'Economia della Repubblica di Lettonia.",
  },
};

const MEDIA_ITEMS = [
  {
    id: "lsm",
    source: "LSM English",
    initials: "LSM",
    title: "Latvian startup launches transport sector 'reputation network'",
    date: "13 Jul 2026",
    language: "English",
    url: "https://eng.lsm.lv/article/economy/transport/13.07.2026-latvian-startup-launches-transport-sector-reputation-network.a654856/",
  },
  {
    id: "labsEn",
    source: "Labs of Latvia",
    initials: "LL",
    title:
      "Latvia-based startup CarrierTrust launches reputation network for European logistics",
    date: "Jul 2026",
    language: "English",
    url: "https://labsoflatvia.com/en/news/latvia-based-startup-carriertrust-launches-reputation-network-for-european-logistics",
  },
  {
    id: "labsLv",
    source: "Labs of Latvia",
    initials: "LL",
    title:
      "Latvijā radīts jaunuzņēmums CarrierTrust veido reputācijas tīklu loģistikas nozarei",
    date: "Jul 2026",
    language: "Latviešu",
    url: "https://labsoflatvia.com/aktuali/latvija-radits-jaunuznemums-carriertrust-veido-reputacijas-tiklu-logistikas-nozarei",
  },
  {
    id: "delfi",
    source: "DELFI Bizness",
    initials: "D",
    title:
      "Latvijā radīts jaunuzņēmums palīdz loģistikas uzņēmumiem pārbaudīt partnerus un izvērtēt riskus",
    date: "Jul 2026",
    language: "Latviešu",
    url: "https://www.delfi.lv/bizness/44467736/tehnologijas/120126621/latvija-radits-jaunuznemums-palidz-logistikas-uznemumiem-parbaudit-partnerus-un-izvertet-riskus",
  },
] as const;

function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 17 17 7M8 7h9v9"
      />
    </svg>
  );
}

export default function MediaClient() {
  const { lang } = useLang();
  const t = useMemo(() => TEXT[(lang as Lang) || "en"] ?? TEXT.en, [lang]);

  const glass =
    "border border-white/75 bg-white/72 backdrop-blur-2xl shadow-[0_22px_70px_rgba(15,23,42,0.09)]";
  const card =
    "border border-slate-200/80 bg-white/76 backdrop-blur-xl shadow-[0_14px_42px_rgba(15,23,42,0.06)]";
  const pill =
    "inline-flex items-center rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-900";

  return (
    <main className="min-h-screen text-slate-900">
      <div className="relative px-5 pb-20 pt-36 sm:px-6 sm:pt-40 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <section className={`relative overflow-hidden rounded-[2rem] p-7 sm:p-10 lg:p-12 ${glass}`}>
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-emerald-300/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="relative max-w-3xl">
              <span className={pill}>
                <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
                {t.eyebrow}
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                {t.title}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                {t.intro}
              </p>
            </div>

            <div className="relative mt-9 grid gap-3 sm:grid-cols-3">
              {[t.featureCount, t.publisherCount, t.languageCount].map(
                (label, index) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/80 bg-white/64 px-4 py-4 shadow-sm backdrop-blur-xl"
                  >
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      0{index + 1}
                    </div>
                    <div className="mt-1 text-sm font-bold text-slate-800">
                      {label}
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          <section className="mt-14">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-slate-950">
                  {t.coverageTitle}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  {t.coverageIntro}
                </p>
              </div>
              <span className="w-fit rounded-full border border-slate-200/80 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-500 backdrop-blur-xl">
                2026
              </span>
            </div>

            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {MEDIA_ITEMS.map((item) => (
                <article
                  key={item.id}
                  className={`group flex min-h-[300px] flex-col rounded-[1.7rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_22px_56px_rgba(15,23,42,0.10)] sm:p-7 ${card}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 text-sm font-extrabold text-white shadow-[0_10px_26px_rgba(16,185,129,0.25)]">
                        {item.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-extrabold text-slate-900">
                          {item.source}
                        </div>
                        <div className="mt-0.5 text-xs text-slate-500">
                          {item.date}
                        </div>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full border border-slate-200/80 bg-white/80 px-2.5 py-1 text-[11px] font-bold text-slate-500">
                      {item.language}
                    </span>
                  </div>

                  <div className="mt-6">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                      {t.mediaCoverage}
                    </span>
                    <h3 className="mt-3 text-xl font-extrabold leading-snug tracking-[-0.02em] text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {t.descriptions[item.id]}
                    </p>
                  </div>

                  <div className="mt-auto pt-7">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-2xl border border-slate-200/90 bg-white/90 px-4 py-2.5 text-sm font-bold text-slate-800 transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-950"
                    >
                      {t.readArticle}
                      <ExternalArrow />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <div>
              <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-slate-950">
                {t.ecosystemTitle}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                {t.ecosystemIntro}
              </p>
            </div>

            <article className={`mt-7 overflow-hidden rounded-[1.8rem] ${card}`}>
              <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden border-b border-slate-200/70 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-8 lg:border-b-0 lg:border-r">
                  <div className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-emerald-400/30 blur-3xl" />
                  <div className="relative w-full max-w-sm rounded-[1.4rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-extrabold text-white">
                        Startin.LV
                      </div>
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-300" />
                        <span className="h-2 w-2 rounded-full bg-cyan-300" />
                        <span className="h-2 w-2 rounded-full bg-white/50" />
                      </div>
                    </div>
                    <div className="mt-5 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-white/65">
                      Search: CarrierTrust
                    </div>
                    <div className="mt-3 grid grid-cols-[1.4fr_0.7fr_0.7fr] gap-2 text-[10px] text-white/45">
                      <span>Company</span>
                      <span>Sector</span>
                      <span>Country</span>
                    </div>
                    <div className="mt-2 grid grid-cols-[1.4fr_0.7fr_0.7fr] gap-2 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-3 text-xs font-semibold text-white">
                      <span>CarrierTrust</span>
                      <span>Trust</span>
                      <span>Latvia</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-9">
                  <span className="w-fit rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1 text-xs font-bold text-emerald-900">
                    {t.ecosystemRecognition}
                  </span>
                  <h3 className="mt-5 text-2xl font-extrabold tracking-[-0.025em] text-slate-950">
                    {t.startinTitle}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    {t.startinDescription}
                  </p>
                  <div className="mt-6">
                    <a
                      href="https://startups.startin.lv/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(15,23,42,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
                    >
                      {t.viewDatabase}
                      <ExternalArrow />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </section>

          <section className={`mt-14 rounded-[1.8rem] p-7 sm:p-9 ${glass}`}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-extrabold tracking-[-0.025em] text-slate-950">
                  {t.contactTitle}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {t.contactText}
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center rounded-2xl border border-emerald-200/80 bg-emerald-50/80 px-5 py-3 text-sm font-bold text-emerald-950 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50"
              >
                {t.contactAction}
              </Link>
            </div>
          </section>

          <p className="mt-7 text-center text-xs leading-5 text-slate-400">
            {t.externalNote}
          </p>
        </div>
      </div>
    </main>
  );
}
