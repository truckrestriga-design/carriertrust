"use client";

import { useMemo } from "react";
import { useLang } from "@/lib/language-context";

type Lang = "en" | "de" | "ru" | "fr" | "es" | "it";

type TextPack = {
  badge: string;
  title: string;
  intro: string;

  section1: string;
  section1Text: string;

  section2: string;
  section2Text: string;
  li1: string;
  li2: string;
  li3: string;
  li4: string;

  section3: string;
  section3Text: string;

  section4: string;
  section4Text: string;

  section5: string;
  section5Text: string;
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    badge: "Terms",
    title: "Terms of Service",
    intro:
      "CarrierTrust is an independent online platform based in the European Union. The platform allows companies to publish reviews regarding logistics and transport services.",

    section1: "1. Role of the Platform",
    section1Text:
      "CarrierTrust acts solely as a neutral hosting service provider under EU law, including the Digital Services Act (Regulation (EU) 2022/2065). CarrierTrust does not create, edit, verify or endorse user-generated content.",

    section2: "2. User Responsibility",
    section2Text:
      "Each user is fully and solely responsible for the content they publish.",
    li1: "The content is truthful and based on real experience",
    li2: "The content does not violate any law",
    li3: "The content does not infringe third-party rights",
    li4: "The user accepts full legal responsibility",

    section3: "3. No Liability",
    section3Text:
      "CarrierTrust shall not be liable for any damages, claims or disputes arising from user-generated content. All legal claims must be directed exclusively against the author of the content.",

    section4: "4. Content Removal",
    section4Text:
      "CarrierTrust reserves the right to remove content that violates laws or these Terms, or upon receiving a valid legal complaint.",

    section5: "5. Governing Law",
    section5Text:
      "These Terms are governed by the laws of the Republic of Latvia. Any disputes shall be subject to Latvian jurisdiction.",
  },

  de: {
    badge: "Bedingungen",
    title: "Nutzungsbedingungen",
    intro:
      "CarrierTrust ist eine unabhängige Online-Plattform mit Sitz in der Europäischen Union. Die Plattform ermöglicht Unternehmen, Bewertungen über Logistik- und Transportdienstleistungen zu veröffentlichen.",

    section1: "1. Rolle der Plattform",
    section1Text:
      "CarrierTrust handelt ausschließlich als neutraler Hosting-Dienstleister nach EU-Recht, einschließlich des Digital Services Act (Verordnung (EU) 2022/2065). CarrierTrust erstellt, bearbeitet, prüft oder unterstützt keine nutzergenerierten Inhalte.",

    section2: "2. Verantwortung des Nutzers",
    section2Text:
      "Jeder Nutzer ist vollständig und allein für die veröffentlichten Inhalte verantwortlich.",
    li1: "Die Inhalte sind wahrheitsgemäß und beruhen auf realen Erfahrungen",
    li2: "Die Inhalte verstoßen gegen kein Gesetz",
    li3: "Die Inhalte verletzen keine Rechte Dritter",
    li4: "Der Nutzer übernimmt die volle rechtliche Verantwortung",

    section3: "3. Keine Haftung",
    section3Text:
      "CarrierTrust haftet nicht für Schäden, Ansprüche oder Streitigkeiten, die aus nutzergenerierten Inhalten entstehen. Alle rechtlichen Ansprüche sind ausschließlich gegen den Autor der Inhalte zu richten.",

    section4: "4. Entfernung von Inhalten",
    section4Text:
      "CarrierTrust behält sich das Recht vor, Inhalte zu entfernen, die gegen Gesetze oder diese Bedingungen verstoßen oder nach Eingang einer gültigen rechtlichen Beschwerde.",

    section5: "5. Anwendbares Recht",
    section5Text:
      "Diese Bedingungen unterliegen dem Recht der Republik Lettland. Streitigkeiten unterliegen der lettischen Gerichtsbarkeit.",
  },

  ru: {
    badge: "Условия",
    title: "Условия использования",
    intro:
      "CarrierTrust — независимая онлайн-платформа, основанная в Европейском Союзе. Платформа позволяет компаниям публиковать отзывы о логистических и транспортных услугах.",

    section1: "1. Роль платформы",
    section1Text:
      "CarrierTrust действует исключительно как нейтральный хостинг-провайдер в соответствии с законодательством ЕС, включая Digital Services Act (Регламент (EU) 2022/2065). CarrierTrust не создаёт, не редактирует, не проверяет и не одобряет пользовательский контент.",

    section2: "2. Ответственность пользователя",
    section2Text:
      "Каждый пользователь полностью и единолично несёт ответственность за публикуемый контент.",
    li1: "Контент является правдивым и основан на реальном опыте",
    li2: "Контент не нарушает закон",
    li3: "Контент не нарушает права третьих лиц",
    li4: "Пользователь принимает полную юридическую ответственность",

    section3: "3. Ограничение ответственности",
    section3Text:
      "CarrierTrust не несёт ответственности за любые убытки, претензии или споры, возникающие из пользовательского контента. Все юридические претензии должны быть направлены исключительно автору контента.",

    section4: "4. Удаление контента",
    section4Text:
      "CarrierTrust оставляет за собой право удалять контент, нарушающий закон, данные Условия или после получения обоснованной юридической жалобы.",

    section5: "5. Применимое право",
    section5Text:
      "Настоящие Условия регулируются законодательством Латвийской Республики. Все споры подлежат юрисдикции Латвии.",
  },

  fr: {
    badge: "Conditions",
    title: "Conditions d’utilisation",
    intro:
      "CarrierTrust est une plateforme en ligne indépendante basée dans l’Union européenne. La plateforme permet aux entreprises de publier des avis concernant les services logistiques et de transport.",

    section1: "1. Rôle de la plateforme",
    section1Text:
      "CarrierTrust agit uniquement comme fournisseur d’hébergement neutre conformément au droit de l’UE, y compris le Digital Services Act (Règlement (UE) 2022/2065). CarrierTrust ne crée pas, ne modifie pas, ne vérifie pas et n’approuve pas les contenus générés par les utilisateurs.",

    section2: "2. Responsabilité de l’utilisateur",
    section2Text:
      "Chaque utilisateur est entièrement et exclusivement responsable du contenu qu’il publie.",
    li1: "Le contenu est véridique et basé sur une expérience réelle",
    li2: "Le contenu ne viole aucune loi",
    li3: "Le contenu ne porte pas atteinte aux droits de tiers",
    li4: "L’utilisateur accepte l’entière responsabilité juridique",

    section3: "3. Absence de responsabilité",
    section3Text:
      "CarrierTrust ne peut être tenu responsable des dommages, réclamations ou litiges découlant des contenus publiés par les utilisateurs. Toute action juridique doit être dirigée exclusivement contre l’auteur du contenu.",

    section4: "4. Suppression de contenu",
    section4Text:
      "CarrierTrust se réserve le droit de supprimer tout contenu violant la loi, les présentes conditions ou à réception d’une plainte juridique valable.",

    section5: "5. Droit applicable",
    section5Text:
      "Les présentes conditions sont régies par les lois de la République de Lettonie. Tout litige relève de la juridiction lettone.",
  },

  es: {
    badge: "Términos",
    title: "Términos del servicio",
    intro:
      "CarrierTrust es una plataforma online independiente con sede en la Unión Europea. La plataforma permite a las empresas publicar reseñas sobre servicios logísticos y de transporte.",

    section1: "1. Rol de la plataforma",
    section1Text:
      "CarrierTrust actúa únicamente como proveedor neutral de alojamiento bajo la legislación de la UE, incluido el Digital Services Act (Reglamento (UE) 2022/2065). CarrierTrust no crea, edita, verifica ni respalda contenido generado por usuarios.",

    section2: "2. Responsabilidad del usuario",
    section2Text:
      "Cada usuario es total y exclusivamente responsable del contenido que publica.",
    li1: "El contenido es veraz y basado en experiencia real",
    li2: "El contenido no viola ninguna ley",
    li3: "El contenido no infringe derechos de terceros",
    li4: "El usuario acepta plena responsabilidad legal",

    section3: "3. Sin responsabilidad",
    section3Text:
      "CarrierTrust no será responsable de daños, reclamaciones o disputas derivadas del contenido generado por usuarios. Todas las reclamaciones legales deben dirigirse exclusivamente al autor del contenido.",

    section4: "4. Eliminación de contenido",
    section4Text:
      "CarrierTrust se reserva el derecho de eliminar contenido que infrinja la ley o estos Términos, o tras recibir una reclamación legal válida.",

    section5: "5. Ley aplicable",
    section5Text:
      "Estos Términos se rigen por las leyes de la República de Letonia. Cualquier disputa estará sujeta a la jurisdicción letona.",
  },

  it: {
    badge: "Termini",
    title: "Termini di servizio",
    intro:
      "CarrierTrust è una piattaforma online indipendente con sede nell’Unione Europea. La piattaforma consente alle aziende di pubblicare recensioni relative ai servizi logistici e di trasporto.",

    section1: "1. Ruolo della piattaforma",
    section1Text:
      "CarrierTrust agisce esclusivamente come fornitore neutrale di hosting ai sensi della normativa UE, incluso il Digital Services Act (Regolamento (UE) 2022/2065). CarrierTrust non crea, modifica, verifica né approva contenuti generati dagli utenti.",

    section2: "2. Responsabilità dell’utente",
    section2Text:
      "Ogni utente è pienamente ed esclusivamente responsabile del contenuto pubblicato.",
    li1: "Il contenuto è veritiero e basato su esperienza reale",
    li2: "Il contenuto non viola alcuna legge",
    li3: "Il contenuto non viola diritti di terzi",
    li4: "L’utente accetta piena responsabilità legale",

    section3: "3. Nessuna responsabilità",
    section3Text:
      "CarrierTrust non è responsabile per danni, reclami o controversie derivanti da contenuti generati dagli utenti. Tutte le pretese legali devono essere rivolte esclusivamente all’autore del contenuto.",

    section4: "4. Rimozione dei contenuti",
    section4Text:
      "CarrierTrust si riserva il diritto di rimuovere contenuti che violano la legge o i presenti Termini, oppure a seguito di un valido reclamo legale.",

    section5: "5. Legge applicabile",
    section5Text:
      "I presenti Termini sono regolati dalle leggi della Repubblica di Lettonia. Qualsiasi controversia sarà soggetta alla giurisdizione lettone.",
  },
};

export default function TermsPage() {
  const { lang } = useLang();

  const safeLang: Lang =
    lang === "en" || lang === "de" || lang === "ru" || lang === "fr" || lang === "es" || lang === "it"
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
                      {t.section1}
                    </h2>
                    <p>{t.section1Text}</p>
                  </div>

                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-slate-900">
                      {t.section2}
                    </h2>
                    <p>{t.section2Text}</p>
                    <ul className="ml-6 mt-2 list-disc space-y-1">
                      <li>{t.li1}</li>
                      <li>{t.li2}</li>
                      <li>{t.li3}</li>
                      <li>{t.li4}</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-slate-900">
                      {t.section3}
                    </h2>
                    <p>{t.section3Text}</p>
                  </div>

                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-slate-900">
                      {t.section4}
                    </h2>
                    <p>{t.section4Text}</p>
                  </div>

                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-slate-900">
                      {t.section5}
                    </h2>
                    <p>{t.section5Text}</p>
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