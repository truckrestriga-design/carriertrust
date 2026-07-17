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
  allowed4: string;

  notAllowed: string;
  notAllowed1: string;
  notAllowed2: string;
  notAllowed3: string;
  notAllowed4: string;
  notAllowed5: string;

  moderation: string;
  moderationText: string;

  enforcement: string;
  enforcementText: string;
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    badge: "Policy",
    title: "Review Policy",
    intro:
      "CarrierTrust provides a neutral technical environment where registered users may publish business-related reviews concerning logistics, transport, and commercial cooperation. Publication does not imply factual verification, endorsement, legal approval, or editorial confirmation by CarrierTrust.",

    allowed: "Allowed content",
    allowed1: "Genuine business experiences supported by actual commercial interaction",
    allowed2: "Professional operational feedback",
    allowed3: "Constructive criticism expressed proportionally",
    allowed4: "Fact-based descriptions limited to directly experienced events",

    notAllowed: "Prohibited content",
    notAllowed1: "Fake reviews, fabricated events, manipulated narratives or impersonation",
    notAllowed2: "Defamation, insults, abusive wording or unverifiable accusations",
    notAllowed3: "Illegal content or allegations implying criminal conduct without verifiable basis",
    notAllowed4: "Disclosure of personal data, private contacts, internal documents or confidential logistics information",
    notAllowed5: "Commercial sabotage, harassment, coordinated attacks, spam or repeated abusive submissions",

    moderation: "Moderation and publication rights",
    moderationText:
      "CarrierTrust may delay, restrict, hide, remove, archive, anonymize, or refuse publication of any review at its sole discretion where content creates legal risk, lacks sufficient clarity, appears abusive, violates platform rules, or is subject to complaint. Publication is not guaranteed.",

    enforcement: "Enforcement",
    enforcementText:
      "Repeated violations may result in account suspension, permanent blocking, preservation of technical evidence, and cooperation with competent authorities where legally required.",
  },

  de: {
    badge: "Richtlinie",
    title: "Bewertungsrichtlinie",
    intro:
      "CarrierTrust stellt eine neutrale technische Umgebung bereit, in der registrierte Nutzer geschäftsbezogene Bewertungen zu Logistik, Transport und kommerzieller Zusammenarbeit veröffentlichen können. Die Veröffentlichung bedeutet keine sachliche Prüfung, Unterstützung, rechtliche Genehmigung oder redaktionelle Bestätigung durch CarrierTrust.",

    allowed: "Erlaubte Inhalte",
    allowed1: "Echte Geschäftserfahrungen mit tatsächlicher kommerzieller Interaktion",
    allowed2: "Professionelles operatives Feedback",
    allowed3: "Verhältnismäßig formulierte konstruktive Kritik",
    allowed4: "Faktenbasierte Beschreibung direkt erlebter Ereignisse",

    notAllowed: "Unzulässige Inhalte",
    notAllowed1: "Gefälschte Bewertungen, erfundene Ereignisse, manipulierte Darstellungen oder Identitätsmissbrauch",
    notAllowed2: "Verleumdung, Beleidigungen, missbräuchliche Sprache oder nicht überprüfbare Anschuldigungen",
    notAllowed3: "Rechtswidrige Inhalte oder strafrechtliche Vorwürfe ohne überprüfbare Grundlage",
    notAllowed4: "Offenlegung personenbezogener Daten, privater Kontakte, interner Dokumente oder vertraulicher Logistikinformationen",
    notAllowed5: "Kommerzielle Sabotage, Belästigung, koordinierte Angriffe, Spam oder wiederholte missbräuchliche Einreichungen",

    moderation: "Moderation und Veröffentlichungsrechte",
    moderationText:
      "CarrierTrust kann Bewertungen nach eigenem Ermessen verzögern, einschränken, verbergen, entfernen, archivieren, anonymisieren oder die Veröffentlichung verweigern, wenn Inhalte rechtliche Risiken schaffen, unklar erscheinen, missbräuchlich wirken, Plattformregeln verletzen oder Gegenstand einer Beschwerde sind. Veröffentlichung wird nicht garantiert.",

    enforcement: "Durchsetzung",
    enforcementText:
      "Wiederholte Verstöße können zur Kontosperrung, dauerhaften Blockierung, Beweissicherung technischer Daten und Zusammenarbeit mit zuständigen Behörden führen.",
  },

  ru: {
    badge: "Политика",
    title: "Политика отзывов",
    intro:
      "CarrierTrust предоставляет нейтральную техническую среду, в которой зарегистрированные пользователи могут публиковать отзывы, связанные с логистикой, транспортом и коммерческим сотрудничеством. Публикация не означает фактической проверки, одобрения, юридического подтверждения или редакционного согласования со стороны CarrierTrust.",

    allowed: "Разрешённый контент",
    allowed1: "Реальный бизнес-опыт, подтверждённый фактическим коммерческим взаимодействием",
    allowed2: "Профессиональная операционная обратная связь",
    allowed3: "Конструктивная критика в пропорциональной форме",
    allowed4: "Описание фактов, ограниченное непосредственно пережитыми событиями",

    notAllowed: "Запрещённый контент",
    notAllowed1: "Фейковые отзывы, вымышленные события, манипулятивные описания или выдача себя за другое лицо",
    notAllowed2: "Клевета, оскорбления, агрессивные формулировки или непроверяемые обвинения",
    notAllowed3: "Незаконный контент или обвинения в преступных действиях без проверяемой основы",
    notAllowed4: "Раскрытие персональных данных, частных контактов, внутренних документов или конфиденциальной логистической информации",
    notAllowed5: "Коммерческий саботаж, преследование, coordinated attacks, spam или повторные злоупотребления",

    moderation: "Модерация и право публикации",
    moderationText:
      "CarrierTrust вправе по собственному усмотрению задерживать, ограничивать, скрывать, удалять, архивировать, анонимизировать или отказывать в публикации любого отзыва, если контент создаёт юридический риск, недостаточно ясен, выглядит злоупотреблением, нарушает правила платформы или является предметом жалобы. Публикация не гарантируется.",

    enforcement: "Применение мер",
    enforcementText:
      "Повторные нарушения могут привести к блокировке аккаунта, постоянному ограничению доступа, сохранению технических доказательств и сотрудничеству с компетентными органами в случаях, предусмотренных законом.",
  },

  fr: {
    badge: "Politique",
    title: "Politique des avis",
    intro:
      "CarrierTrust fournit un environnement technique neutre dans lequel les utilisateurs enregistrés peuvent publier des avis liés à la logistique, au transport et à la coopération commerciale. La publication n’implique aucune vérification factuelle, approbation juridique ou validation éditoriale par CarrierTrust.",

    allowed: "Contenu autorisé",
    allowed1: "Expériences commerciales réelles fondées sur une interaction effective",
    allowed2: "Retour opérationnel professionnel",
    allowed3: "Critique constructive formulée de manière proportionnée",
    allowed4: "Description factuelle limitée aux événements directement vécus",

    notAllowed: "Contenu interdit",
    notAllowed1: "Faux avis, événements fabriqués, récits manipulés ou usurpation",
    notAllowed2: "Diffamation, insultes ou accusations invérifiables",
    notAllowed3: "Contenu illégal ou allégations criminelles sans base vérifiable",
    notAllowed4: "Divulgation de données personnelles, documents internes ou informations logistiques confidentielles",
    notAllowed5: "Sabotage commercial, harcèlement, spam ou abus répétés",

    moderation: "Modération et publication",
    moderationText:
      "CarrierTrust peut retarder, restreindre, masquer, supprimer, archiver, anonymiser ou refuser la publication de tout avis lorsqu’un risque juridique existe ou qu’une plainte est reçue. La publication n’est pas garantie.",

    enforcement: "Application",
    enforcementText:
      "Les violations répétées peuvent entraîner suspension, blocage permanent, conservation de preuves techniques et coopération avec les autorités compétentes.",
  },

  es: {
    badge: "Política",
    title: "Política de reseñas",
    intro:
      "CarrierTrust proporciona un entorno técnico neutral donde los usuarios registrados pueden publicar reseñas relacionadas con logística, transporte y cooperación comercial. La publicación no implica verificación factual ni aprobación editorial por parte de CarrierTrust.",

    allowed: "Contenido permitido",
    allowed1: "Experiencias comerciales reales basadas en interacción efectiva",
    allowed2: "Feedback operativo profesional",
    allowed3: "Crítica constructiva proporcionada",
    allowed4: "Descripción factual de hechos vividos directamente",

    notAllowed: "Contenido prohibido",
    notAllowed1: "Reseñas falsas, hechos fabricados o suplantación",
    notAllowed2: "Difamación, insultos o acusaciones no verificables",
    notAllowed3: "Contenido ilegal o acusaciones criminales sin base verificable",
    notAllowed4: "Divulgación de datos personales o información logística confidencial",
    notAllowed5: "Sabotaje comercial, spam o abuso repetido",

    moderation: "Moderación y publicación",
    moderationText:
      "CarrierTrust puede retrasar, restringir, ocultar, eliminar, archivar, anonimizar o rechazar cualquier reseña a su sola discreción. La publicación no está garantizada.",

    enforcement: "Aplicación",
    enforcementText:
      "Las violaciones repetidas pueden llevar a suspensión de cuenta, bloqueo permanente y cooperación con autoridades competentes.",
  },

  it: {
    badge: "Policy",
    title: "Policy recensioni",
    intro:
      "CarrierTrust fornisce un ambiente tecnico neutrale in cui gli utenti registrati possono pubblicare recensioni relative a logistica, trasporto e cooperazione commerciale. La pubblicazione non implica verifica fattuale né approvazione editoriale da parte di CarrierTrust.",

    allowed: "Contenuto consentito",
    allowed1: "Esperienze commerciali reali basate su interazione effettiva",
    allowed2: "Feedback operativo professionale",
    allowed3: "Critica costruttiva proporzionata",
    allowed4: "Descrizione fattuale di eventi direttamente vissuti",

    notAllowed: "Contenuto vietato",
    notAllowed1: "Recensioni false, eventi inventati o impersonificazione",
    notAllowed2: "Diffamazione, insulti o accuse non verificabili",
    notAllowed3: "Contenuti illegali o accuse penali senza base verificabile",
    notAllowed4: "Divulgazione di dati personali o informazioni logistiche riservate",
    notAllowed5: "Sabotaggio commerciale, spam o abuso ripetuto",

    moderation: "Moderazione e pubblicazione",
    moderationText:
      "CarrierTrust può ritardare, limitare, nascondere, rimuovere, archiviare, anonimizzare o rifiutare qualsiasi recensione a propria discrezione. La pubblicazione non è garantita.",

    enforcement: "Applicazione",
    enforcementText:
      "Violazioni ripetute possono comportare sospensione account, blocco permanente e cooperazione con autorità competenti.",
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
                    <h2 className="mb-2 text-xl font-semibold text-slate-900">{t.allowed}</h2>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>{t.allowed1}</li>
                      <li>{t.allowed2}</li>
                      <li>{t.allowed3}</li>
                      <li>{t.allowed4}</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-slate-900">{t.notAllowed}</h2>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>{t.notAllowed1}</li>
                      <li>{t.notAllowed2}</li>
                      <li>{t.notAllowed3}</li>
                      <li>{t.notAllowed4}</li>
                      <li>{t.notAllowed5}</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-slate-900">{t.moderation}</h2>
                    <p>{t.moderationText}</p>
                  </div>

                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-slate-900">{t.enforcement}</h2>
                    <p>{t.enforcementText}</p>
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