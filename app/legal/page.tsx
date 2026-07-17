"use client";

import { useMemo } from "react";
import { useLang } from "@/lib/language-context";

const LEGAL_EMAIL = "support@carriertrust.eu";

type Lang = "en" | "de" | "ru" | "fr" | "es" | "it";

type TextPack = {
  badge: string;
  title: string;
  intro: string;

  legalContact: string;
  legalContactText: string;
  email: string;
  preferredLanguage: string;
  preferredLanguageValue: string;

  takedownTitle: string;
  takedownText: string;

  includeTitle: string;
  include1: string;
  include2: string;
  include3: string;
  include4: string;
  include5: string;

  handlingTitle: string;
  handlingText1: string;
  handlingText2: string;
  handlingText3: string;

  counterNoticeTitle: string;
  counterNoticeText: string;
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    badge: "Legal",
    title: "Legal Contact & Content Notice Procedure",
    intro:
      "CarrierTrust is an independent neutral hosting platform established in the Republic of Latvia, European Union. This page supports legal notices, substantiated complaints, authority requests, court orders, and content-related legal communication under Regulation (EU) 2022/2065 (Digital Services Act).",

    legalContact: "Legal contact",
    legalContactText:
      "For legal notices, court orders, substantiated complaints, authority requests, or content-related legal communication, contact:",
    email: "Email",
    preferredLanguage: "Preferred language",
    preferredLanguageValue: "English",

    takedownTitle: "Requirements for a valid legal notice",
    takedownText:
      "CarrierTrust reviews allegedly unlawful content only after receiving a sufficiently precise, complete, and legally substantiated notice. Unsupported requests, incomplete notices, abusive complaints, false reports, or legally unsubstantiated demands may be rejected without action. Submission of a notice does not automatically require removal, restriction, or modification of content.",

    includeTitle: "A valid notice should include",
    include1: "Exact URL(s) of the content concerned",
    include2: "Precise legal basis explaining why the content is unlawful under applicable law",
    include3: "Supporting evidence such as documents, screenshots, contracts, correspondence, invoices, court materials, or other relevant proof",
    include4: "Full legal identity, company details, authority to act, and contact information of the complainant",
    include5: "A good-faith declaration confirming the factual accuracy of the notice and the complainant’s authority to submit it",

    handlingTitle: "How notices are handled",
    handlingText1:
      "CarrierTrust may request additional clarification, legal explanation, identity confirmation, proof of authority, or supporting evidence before taking any action.",
    handlingText2:
      "CarrierTrust may temporarily restrict, delay visibility, preserve, remove, or maintain content where legal risk appears credible. Such action does not constitute admission of illegality, fault, liability, endorsement of any complaint, or confirmation that the content was unlawful.",
    handlingText3:
      "CarrierTrust remains a neutral intermediary hosting provider. Factual and legal responsibility for reviews and submitted content remains solely with the original author.",

    counterNoticeTitle: "Counter-notice and restoration",
    counterNoticeText:
      "Where appropriate, affected authors may be notified and invited to submit a counter-notice, clarification, or supporting evidence. Content may be restored, maintained restricted, preserved, or permanently removed depending on legal assessment, available evidence, platform rules, and applicable law.",
  },

  de: {
    badge: "Rechtliches",
    title: "Rechtlicher Kontakt und Verfahren für Inhaltsmeldungen",
    intro:
      "CarrierTrust ist eine unabhängige neutrale Hosting-Plattform mit Sitz in der Republik Lettland, Europäische Union. Diese Seite unterstützt rechtliche Mitteilungen, begründete Beschwerden, Behördenanfragen, gerichtliche Anordnungen und rechtliche Kommunikation im Zusammenhang mit Inhalten gemäß Verordnung (EU) 2022/2065 (Digital Services Act).",

    legalContact: "Rechtlicher Kontakt",
    legalContactText:
      "Für rechtliche Mitteilungen, gerichtliche Anordnungen, begründete Beschwerden, Behördenanfragen oder rechtliche Kommunikation zu Inhalten kontaktieren Sie:",
    email: "E-Mail",
    preferredLanguage: "Bevorzugte Sprache",
    preferredLanguageValue: "Englisch",

    takedownTitle: "Anforderungen an eine gültige rechtliche Meldung",
    takedownText:
      "CarrierTrust prüft angeblich rechtswidrige Inhalte erst nach Eingang einer ausreichend präzisen, vollständigen und rechtlich begründeten Meldung. Nicht belegte Anfragen, unvollständige Meldungen, missbräuchliche Beschwerden, falsche Meldungen oder rechtlich unbegründete Forderungen können ohne Maßnahmen abgelehnt werden. Die Einreichung einer Meldung verpflichtet CarrierTrust nicht automatisch zur Entfernung, Einschränkung oder Änderung von Inhalten.",

    includeTitle: "Eine gültige Meldung sollte enthalten",
    include1: "Die exakte(n) URL(s) des betroffenen Inhalts",
    include2: "Eine präzise rechtliche Grundlage, aus der hervorgeht, warum der Inhalt nach anwendbarem Recht rechtswidrig ist",
    include3: "Unterstützende Nachweise wie Dokumente, Screenshots, Verträge, Korrespondenz, Rechnungen, Gerichtsunterlagen oder andere relevante Beweise",
    include4: "Vollständige rechtliche Identität, Unternehmensdaten, Vertretungsbefugnis und Kontaktdaten des Beschwerdeführers",
    include5: "Eine Erklärung nach bestem Wissen und in gutem Glauben, die die sachliche Richtigkeit der Meldung und die Befugnis zur Einreichung bestätigt",

    handlingTitle: "Wie Meldungen bearbeitet werden",
    handlingText1:
      "CarrierTrust kann zusätzliche Klarstellungen, rechtliche Erläuterungen, Identitätsbestätigung, Nachweis der Vertretungsbefugnis oder unterstützende Beweise verlangen, bevor Maßnahmen ergriffen werden.",
    handlingText2:
      "CarrierTrust kann Inhalte vorübergehend einschränken, die Sichtbarkeit verzögern, Inhalte sichern, entfernen oder bestehen lassen, wenn ein glaubwürdiges rechtliches Risiko erkennbar ist. Eine solche Maßnahme stellt kein Anerkenntnis von Rechtswidrigkeit, Verschulden, Haftung, Zustimmung zu einer Beschwerde oder Bestätigung dar, dass der Inhalt rechtswidrig war.",
    handlingText3:
      "CarrierTrust bleibt ein neutraler Vermittler und Hosting-Dienstleister. Die tatsächliche und rechtliche Verantwortung für Bewertungen und eingereichte Inhalte verbleibt ausschließlich beim ursprünglichen Autor.",

    counterNoticeTitle: "Gegendarstellung und Wiederherstellung",
    counterNoticeText:
      "Soweit angemessen, können betroffene Autoren benachrichtigt und aufgefordert werden, eine Gegendarstellung, Klarstellung oder unterstützende Nachweise einzureichen. Inhalte können abhängig von rechtlicher Bewertung, verfügbaren Beweisen, Plattformregeln und anwendbarem Recht wiederhergestellt, eingeschränkt belassen, gesichert oder dauerhaft entfernt werden.",
  },

  ru: {
    badge: "Правовая информация",
    title: "Юридический контакт и порядок уведомления о контенте",
    intro:
      "CarrierTrust — независимая нейтральная хостинг-платформа, зарегистрированная в Латвийской Республике, Европейский Союз. Эта страница предназначена для юридических уведомлений, обоснованных жалоб, запросов компетентных органов, судебных предписаний и правовой коммуникации в отношении контента в соответствии с Regulation (EU) 2022/2065 (Digital Services Act).",

    legalContact: "Юридический контакт",
    legalContactText:
      "Для юридических уведомлений, судебных предписаний, обоснованных жалоб, запросов компетентных органов или правовой коммуникации в отношении контента используйте:",
    email: "Email",
    preferredLanguage: "Предпочтительный язык",
    preferredLanguageValue: "Английский",

    takedownTitle: "Требования к корректному юридическому уведомлению",
    takedownText:
      "CarrierTrust рассматривает потенциально незаконный контент только после получения достаточно точного, полного и юридически обоснованного уведомления. Неподтверждённые запросы, неполные уведомления, злоупотребительные жалобы, ложные сообщения или юридически необоснованные требования могут быть отклонены без принятия мер. Подача уведомления не означает автоматической обязанности удалить, ограничить или изменить контент.",

    includeTitle: "Корректное уведомление должно содержать",
    include1: "Точный URL или URL-адреса спорного контента",
    include2: "Точное юридическое основание, объясняющее, почему контент является незаконным по применимому законодательству",
    include3: "Подтверждающие доказательства, включая документы, скриншоты, договоры, переписку, счета, судебные материалы или иные релевантные доказательства",
    include4: "Полную юридическую идентификацию заявителя, данные компании, подтверждение полномочий и контактную информацию",
    include5: "Добросовестное подтверждение фактической точности уведомления и полномочий заявителя на его подачу",

    handlingTitle: "Как рассматриваются уведомления",
    handlingText1:
      "CarrierTrust вправе запросить дополнительные пояснения, юридическое обоснование, подтверждение личности, подтверждение полномочий или дополнительные доказательства до принятия каких-либо мер.",
    handlingText2:
      "CarrierTrust может временно ограничить, отложить отображение, сохранить, удалить или оставить контент, если юридический риск выглядит правдоподобным. Такие действия не означают признания незаконности, вины, ответственности, согласия с жалобой или подтверждения того, что контент был незаконным.",
    handlingText3:
      "CarrierTrust остаётся нейтральным посредником и хостинг-провайдером. Фактическая и юридическая ответственность за отзывы и опубликованный контент сохраняется исключительно за первоначальным автором.",

    counterNoticeTitle: "Встречное уведомление и восстановление",
    counterNoticeText:
      "При необходимости затронутые авторы могут быть уведомлены и приглашены подать встречное уведомление, пояснение или подтверждающие доказательства. Контент может быть восстановлен, оставлен ограниченным, сохранён или окончательно удалён в зависимости от юридической оценки, доступных доказательств, правил платформы и применимого законодательства.",
  },

  fr: {
    badge: "Juridique",
    title: "Contact juridique et procédure de notification de contenu",
    intro:
      "CarrierTrust est une plateforme neutre d’hébergement indépendante établie en République de Lettonie, Union européenne. Cette page prend en charge les notifications juridiques, plaintes motivées, demandes des autorités, décisions judiciaires et communications juridiques liées au contenu conformément au Règlement (UE) 2022/2065 (Digital Services Act).",

    legalContact: "Contact juridique",
    legalContactText:
      "Pour les notifications juridiques, décisions judiciaires, plaintes motivées, demandes des autorités ou communications juridiques liées au contenu, contactez :",
    email: "Email",
    preferredLanguage: "Langue préférée",
    preferredLanguageValue: "Anglais",

    takedownTitle: "Exigences d’une notification juridique valable",
    takedownText:
      "CarrierTrust examine les contenus prétendument illicites uniquement après réception d’une notification suffisamment précise, complète et juridiquement motivée. Les demandes non étayées, notifications incomplètes, plaintes abusives, signalements mensongers ou demandes juridiquement non fondées peuvent être rejetés sans action. Le dépôt d’une notification n’entraîne pas automatiquement la suppression, la restriction ou la modification du contenu.",

    includeTitle: "Une notification valable doit inclure",
    include1: "L’URL exacte ou les URL exactes du contenu concerné",
    include2: "La base juridique précise expliquant pourquoi le contenu est illicite au regard du droit applicable",
    include3: "Des preuves à l’appui telles que documents, captures d’écran, contrats, correspondance, factures, documents judiciaires ou autres éléments pertinents",
    include4: "L’identité juridique complète, les informations de société, l’autorité pour agir et les coordonnées du plaignant",
    include5: "Une déclaration de bonne foi confirmant l’exactitude factuelle de la notification et l’autorité du plaignant pour la soumettre",

    handlingTitle: "Comment les notifications sont traitées",
    handlingText1:
      "CarrierTrust peut demander des clarifications supplémentaires, une explication juridique, une confirmation d’identité, une preuve d’autorité ou des preuves justificatives avant toute action.",
    handlingText2:
      "CarrierTrust peut temporairement restreindre, retarder la visibilité, conserver, supprimer ou maintenir le contenu lorsqu’un risque juridique crédible apparaît. Une telle action ne constitue pas une reconnaissance d’illicéité, de faute, de responsabilité, d’approbation d’une plainte ou de confirmation que le contenu était illicite.",
    handlingText3:
      "CarrierTrust demeure un intermédiaire neutre et fournisseur d’hébergement. La responsabilité factuelle et juridique des avis et contenus soumis demeure exclusivement celle de l’auteur initial.",

    counterNoticeTitle: "Contre-notification et restauration",
    counterNoticeText:
      "Le cas échéant, les auteurs concernés peuvent être informés et invités à soumettre une contre-notification, une clarification ou des preuves justificatives. Le contenu peut être restauré, maintenu restreint, conservé ou supprimé définitivement selon l’évaluation juridique, les preuves disponibles, les règles de la plateforme et le droit applicable.",
  },

  es: {
    badge: "Legal",
    title: "Contacto jurídico y procedimiento de notificación de contenido",
    intro:
      "CarrierTrust es una plataforma neutral independiente de alojamiento establecida en la República de Letonia, Unión Europea. Esta página gestiona avisos legales, reclamaciones fundamentadas, solicitudes de autoridades, órdenes judiciales y comunicaciones jurídicas relacionadas con contenido conforme al Reglamento (UE) 2022/2065 (Digital Services Act).",

    legalContact: "Contacto jurídico",
    legalContactText:
      "Para avisos legales, órdenes judiciales, reclamaciones fundamentadas, solicitudes de autoridades o comunicaciones jurídicas relacionadas con contenido, contacte:",
    email: "Email",
    preferredLanguage: "Idioma preferido",
    preferredLanguageValue: "Inglés",

    takedownTitle: "Requisitos de un aviso legal válido",
    takedownText:
      "CarrierTrust revisa contenido presuntamente ilícito únicamente después de recibir un aviso suficientemente preciso, completo y jurídicamente fundamentado. Las solicitudes sin respaldo, avisos incompletos, reclamaciones abusivas, reportes falsos o exigencias jurídicamente no fundamentadas pueden ser rechazadas sin acción. La presentación de un aviso no obliga automáticamente a eliminar, restringir o modificar contenido.",

    includeTitle: "Un aviso válido debe incluir",
    include1: "La URL exacta o las URL exactas del contenido afectado",
    include2: "La base legal precisa que explique por qué el contenido es ilícito según la legislación aplicable",
    include3: "Pruebas de respaldo como documentos, capturas de pantalla, contratos, correspondencia, facturas, materiales judiciales u otras pruebas relevantes",
    include4: "Identidad legal completa, datos de la empresa, autoridad para actuar e información de contacto del reclamante",
    include5: "Declaración de buena fe que confirme la exactitud factual del aviso y la autoridad del reclamante para presentarlo",

    handlingTitle: "Cómo se gestionan los avisos",
    handlingText1:
      "CarrierTrust puede solicitar aclaraciones adicionales, explicación legal, confirmación de identidad, prueba de autoridad o pruebas de respaldo antes de adoptar cualquier medida.",
    handlingText2:
      "CarrierTrust puede restringir temporalmente, retrasar la visibilidad, conservar, eliminar o mantener contenido cuando exista un riesgo legal creíble. Dicha medida no constituye admisión de ilicitud, culpa, responsabilidad, aceptación de ninguna reclamación ni confirmación de que el contenido fuera ilícito.",
    handlingText3:
      "CarrierTrust sigue siendo un intermediario neutral y proveedor de alojamiento. La responsabilidad factual y legal por reseñas y contenido enviado permanece exclusivamente en el autor original.",

    counterNoticeTitle: "Contraaviso y restauración",
    counterNoticeText:
      "Cuando proceda, los autores afectados pueden ser notificados e invitados a presentar un contraaviso, aclaración o pruebas de respaldo. El contenido puede ser restaurado, mantenerse restringido, conservarse o eliminarse permanentemente según la evaluación legal, las pruebas disponibles, las normas de la plataforma y la legislación aplicable.",
  },

  it: {
    badge: "Legale",
    title: "Contatto legale e procedura di segnalazione dei contenuti",
    intro:
      "CarrierTrust è una piattaforma neutrale indipendente di hosting con sede nella Repubblica di Lettonia, Unione Europea. Questa pagina supporta notifiche legali, reclami motivati, richieste delle autorità, ordini giudiziari e comunicazioni legali relative ai contenuti ai sensi del Regolamento (UE) 2022/2065 (Digital Services Act).",

    legalContact: "Contatto legale",
    legalContactText:
      "Per notifiche legali, ordini giudiziari, reclami motivati, richieste delle autorità o comunicazioni legali relative ai contenuti, contattare:",
    email: "Email",
    preferredLanguage: "Lingua preferita",
    preferredLanguageValue: "Inglese",

    takedownTitle: "Requisiti per una notifica legale valida",
    takedownText:
      "CarrierTrust valuta contenuti presuntamente illeciti solo dopo aver ricevuto una notifica sufficientemente precisa, completa e giuridicamente motivata. Richieste non supportate, notifiche incomplete, reclami abusivi, segnalazioni false o richieste giuridicamente infondate possono essere respinte senza azione. L’invio di una notifica non comporta automaticamente rimozione, restrizione o modifica del contenuto.",

    includeTitle: "Una notifica valida dovrebbe includere",
    include1: "URL esatto o URL esatti del contenuto interessato",
    include2: "Base giuridica precisa che spieghi perché il contenuto è illecito ai sensi della legge applicabile",
    include3: "Prove a supporto come documenti, screenshot, contratti, corrispondenza, fatture, materiali giudiziari o altre prove rilevanti",
    include4: "Identità legale completa, dati aziendali, autorità ad agire e informazioni di contatto del reclamante",
    include5: "Dichiarazione in buona fede che confermi l’accuratezza fattuale della notifica e l’autorità del reclamante a presentarla",

    handlingTitle: "Come vengono gestite le notifiche",
    handlingText1:
      "CarrierTrust può richiedere ulteriori chiarimenti, spiegazione legale, conferma dell’identità, prova dell’autorità ad agire o prove a supporto prima di intraprendere qualsiasi azione.",
    handlingText2:
      "CarrierTrust può limitare temporaneamente, ritardare la visibilità, conservare, rimuovere o mantenere contenuti quando appare credibile un rischio legale. Tale azione non costituisce ammissione di illiceità, colpa, responsabilità, approvazione di alcun reclamo o conferma che il contenuto fosse illecito.",
    handlingText3:
      "CarrierTrust rimane un intermediario neutrale e fornitore di hosting. La responsabilità fattuale e legale per recensioni e contenuti inviati rimane esclusivamente dell’autore originale.",

    counterNoticeTitle: "Contro-notifica e ripristino",
    counterNoticeText:
      "Ove appropriato, gli autori interessati possono essere informati e invitati a presentare una contro-notifica, chiarimento o prove a supporto. Il contenuto può essere ripristinato, mantenuto limitato, conservato o rimosso definitivamente in base alla valutazione legale, alle prove disponibili, alle regole della piattaforma e alla legge applicabile.",
  },
};

export default function LegalContact() {
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
                <div className="space-y-4 text-sm leading-7 text-slate-600 md:text-[15px]">
                  <p>{t.intro}</p>

                  <h2 className="pt-4 text-xl font-semibold text-slate-900">
                    {t.legalContact}
                  </h2>
                  <p>{t.legalContactText}</p>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="mb-2">
                      <b>{t.email}:</b>{" "}
                      <a className="underline" href={`mailto:${LEGAL_EMAIL}`}>
                        {LEGAL_EMAIL}
                      </a>
                    </p>
                    <p className="mb-0">
                      <b>{t.preferredLanguage}:</b> {t.preferredLanguageValue}
                    </p>
                  </div>

                  <h2 className="pt-4 text-xl font-semibold text-slate-900">
                    {t.takedownTitle}
                  </h2>
                  <p>{t.takedownText}</p>

                  <h3 className="pt-2 text-lg font-semibold text-slate-900">
                    {t.includeTitle}
                  </h3>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>{t.include1}</li>
                    <li>{t.include2}</li>
                    <li>{t.include3}</li>
                    <li>{t.include4}</li>
                    <li>{t.include5}</li>
                  </ul>

                  <h2 className="pt-4 text-xl font-semibold text-slate-900">
                    {t.handlingTitle}
                  </h2>
                  <p>{t.handlingText1}</p>
                  <p>{t.handlingText2}</p>
                  <p>{t.handlingText3}</p>

                  <h2 className="pt-4 text-xl font-semibold text-slate-900">
                    {t.counterNoticeTitle}
                  </h2>
                  <p>{t.counterNoticeText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}