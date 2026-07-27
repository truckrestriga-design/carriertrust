"use client";

import { useMemo } from "react";
import { useLang } from "@/lib/language-context";

type Lang = "en" | "de" | "ru" | "fr" | "es" | "it";

type Section = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type TextPack = {
  badge: string;
  title: string;
  version: string;
  effectiveDate: string;
  operator: string;
  vatId: string;
  legalAddress: string;
  email: string;
  intro: string[];
  sections: Section[];
  closing: string;
};

const OPERATOR = {
  name: "SIA JAKOVLEV CAPITAL",
  vatId: "LV44103016716",
  address: "Kupriču iela 1E–93, Riga, LV-1021, Latvia",
  email: "support@carriertrust.eu",
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    badge: "Review Policy",
    title: "Review Policy",
    version: "Version 2.0",
    effectiveDate: "Effective 25 July 2026",
    operator: "Platform operator",
    vatId: "VAT ID",
    legalAddress: "Legal address",
    email: "Email",
    intro: [
      "This Review Policy governs reviews, ratings, official replies, evidence and related content submitted to CarrierTrust. It forms part of the Terms of Service.",
      "CarrierTrust supports honest reporting of genuine business experience. Negative reviews are permitted, but all content must be submitted in good faith, be relevant, and distinguish verifiable facts from personal opinion or suspicion.",
    ],
    sections: [
      {
        title: "1. Who may submit a review",
        paragraphs: [
          "A review may be submitted only by a person who has sufficient knowledge of a genuine business interaction involving the reviewed company. The reviewer must be authorised to use the account and, where acting for a company, must have authority to represent that company for the submission.",
          "CarrierTrust may request confirmation of the reviewer’s identity, role, company relationship or authority. Failure to provide reasonable confirmation may result in rejection, restriction or removal.",
        ],
      },
      {
        title: "2. Genuine business experience",
        paragraphs: [
          "A review must relate to an actual or genuinely attempted professional interaction, such as transport, forwarding, logistics, payment, brokerage, subcontracting, service provision, procurement or another relevant B2B relationship.",
          "A review must not be based only on rumour, online discussion, media coverage, another person’s experience or a dispute in which the reviewer was not meaningfully involved.",
        ],
      },
      {
        title: "3. Accuracy, relevance and good faith",
        paragraphs: [
          "Reviewers must take reasonable care to ensure that factual statements are accurate, current and not misleading. Relevant context must not be deliberately omitted where the omission would materially change the meaning.",
          "Opinion is allowed when it is clearly presented as opinion and supported by the described experience. Suspicion, inference or an unresolved commercial dispute must not be presented as a proven fact, court finding or regulatory conclusion.",
          "Reviews should focus on conduct relevant to a business relationship, including communication, performance, documentation, payment, loading, delivery, claims handling and dispute resolution.",
        ],
      },
      {
        title: "4. Evidence",
        paragraphs: [
          "CarrierTrust may request contracts, transport orders, invoices, CMR documents, delivery records, correspondence, payment records, claim documents or other material reasonably relevant to the review.",
          "Evidence must be authentic and lawfully obtained. It should be complete enough to understand the context and must not be altered in a misleading way.",
          "Supporting material is not normally published. It may be stored, reviewed, redacted and disclosed where reasonably necessary for moderation, legal compliance, dispute resolution or the establishment, exercise or defence of legal claims.",
        ],
      },
      {
        title: "5. Conflicts of interest and manipulation",
        paragraphs: [
          "Reviews must reflect independent experience and must not be used to manipulate ratings or commercial reputation.",
        ],
        bullets: [
          "No reviews of your own company or a company you control.",
          "No reviews by employees, owners, managers, family members, affiliates or contractors where a material conflict is hidden.",
          "No purchased, incentivised, reciprocal, coordinated or exchange-based reviews.",
          "No multiple accounts, duplicate submissions or artificial review campaigns concerning the same experience.",
          "No competitor review submitted primarily to harm a rival rather than report genuine experience.",
          "No request for payment, discount, contract, benefit or other advantage in exchange for posting, changing or removing a review.",
        ],
      },
      {
        title: "6. Prohibited content",
        paragraphs: [
          "A review, reply or related submission must not contain unlawful, abusive or irrelevant material.",
        ],
        bullets: [
          "Threats, extortion, harassment, stalking, intimidation or encouragement of violence.",
          "Hate speech, discriminatory abuse or degrading attacks based on protected characteristics.",
          "Knowing falsehoods, impersonation, forged evidence or deliberately misleading statements.",
          "Unnecessary personal data, private addresses, personal phone numbers, identity documents, bank data or other sensitive information.",
          "Trade secrets, confidential contracts or information disclosed in breach of a legal or contractual duty.",
          "Malware, malicious links, spam, advertising, SEO manipulation or unrelated promotional content.",
          "Copyright, trademark, privacy or other rights violations.",
          "Obscene material or personal insults unrelated to the business experience.",
        ],
      },
      {
        title: "7. Fraud, crime and regulatory allegations",
        paragraphs: [
          "Serious allegations require particular care. Unless supported by a final official decision, a reviewer must not state or imply that a company or person has committed fraud, theft, a criminal offence, sanctions breach or regulatory violation as an established fact.",
          "A reviewer may describe specific observable events and may state that conduct appeared suspicious or that a matter was reported to an authority, provided the wording is accurate, proportionate and does not misrepresent the status or outcome of the matter.",
          "CarrierTrust may request stronger evidence, limit visibility, add context, change a category, temporarily hide content or refuse publication where an allegation creates a significant legal or safety risk.",
        ],
      },
      {
        title: "8. Ratings and review categories",
        paragraphs: [
          "The selected rating and category should reasonably match the written description. A rating must not be used as punishment for an unrelated disagreement or as leverage in negotiations.",
          "CarrierTrust may correct obvious category errors, standardise labels, combine duplicates or ask the reviewer to clarify an inconsistent rating. Such action does not mean CarrierTrust endorses the review.",
        ],
      },
      {
        title: "9. Editing and updating reviews",
        paragraphs: [
          "A reviewer should update the review where a material fact changes, including later payment, settlement, corrected documentation or successful resolution.",
          "CarrierTrust may show that content was edited. Earlier versions and related evidence may be retained for security, moderation, dispute and legal purposes.",
          "A resolved dispute may remain relevant as historical business information, but the review should fairly describe the resolution.",
        ],
      },
      {
        title: "10. Moderation",
        paragraphs: [
          "CarrierTrust may, but is not obliged to, review content before or after publication. Moderation may be triggered by automated signals, reports, evidence, legal concerns, platform rules or internal checks.",
          "CarrierTrust may request clarification, edit formatting, redact personal or confidential data, change labels, limit distribution, temporarily hide, reject or remove content, or restrict account functions where reasonably necessary.",
          "Moderation decisions may consider credibility, relevance, evidence, proportionality, public interest, the rights of affected parties, repeated conduct and applicable law. Publication or continued availability does not constitute approval or verification of every statement.",
        ],
      },
      {
        title: "11. Company replies",
        paragraphs: [
          "An authorised company account may publish an official reply where the applicable plan and platform rules permit it. A reply must follow the same standards of accuracy, relevance, confidentiality and respectful conduct as a review.",
          "A company may disagree, provide context, describe corrective action or dispute the facts. It must not threaten the reviewer, expose unnecessary personal data or make unsupported criminal allegations.",
          "A negative review is not removed solely because the reviewed company disputes it or because the parties later end their business relationship.",
        ],
      },
      {
        title: "12. Reports, notices and appeals",
        paragraphs: [
          "Users and affected companies may report content that they reasonably believe breaches this Policy, the Terms, third-party rights or applicable law. Reports should identify the exact content and explain the issue clearly.",
          "A report is not a guarantee of removal. CarrierTrust may request evidence, seek comments from affected parties, preserve records and issue a reasoned outcome where appropriate.",
          "Requests concerning allegedly illegal content must follow the procedure on the Legal page. Eligible moderation decisions may be appealed or challenged through the process described there.",
        ],
      },
      {
        title: "13. Repeated violations and account action",
        paragraphs: [
          "CarrierTrust may warn, limit, suspend or terminate accounts involved in repeated false reviews, manipulation, harassment, abusive reporting, forged evidence, unauthorised representation or other serious or repeated violations.",
          "CarrierTrust may consider the number, severity, frequency, intent and impact of violations and may preserve relevant records for fraud prevention, security and legal claims.",
        ],
      },
      {
        title: "14. Privacy and confidentiality",
        paragraphs: [
          "Personal data connected with reviews, replies, reports and evidence is processed under the Privacy Policy. Reviewers should disclose only information necessary to explain the business experience.",
          "CarrierTrust cannot guarantee confidentiality for information that must be disclosed by law, to protect rights, to investigate a dispute, or to respond to a competent authority or court.",
        ],
      },
      {
        title: "15. CarrierTrust’s role",
        paragraphs: [
          "User-generated reviews and replies remain the responsibility of their authors. CarrierTrust provides hosting, moderation tools, labels, scoring logic and related platform functions.",
          "CarrierTrust is not a court, regulator, credit-rating agency, debt collector or guarantor of any company. Users remain responsible for their own due diligence and commercial decisions.",
        ],
      },
      {
        title: "16. Changes, language and contact",
        paragraphs: [
          "CarrierTrust may update this Policy for legal, security, moderation or product reasons. The version and effective date appear at the top. Material changes may be communicated through the platform, by email or through renewed acceptance where appropriate.",
          "Translations are provided for convenience. The English version governs in the event of inconsistency, to the extent permitted by mandatory law.",
          "Questions about this Policy may be sent to support@carriertrust.eu.",
        ],
      },
    ],
    closing:
      "A review should help another business understand a real commercial experience. Be factual, fair, proportionate and prepared to support important claims with evidence.",
  },

  de: {
    badge: "Bewertungsrichtlinie",
    title: "Bewertungsrichtlinie",
    version: "Version 2.0",
    effectiveDate: "Gültig ab 25. Juli 2026",
    operator: "Plattformbetreiber",
    vatId: "USt-IdNr.",
    legalAddress: "Sitz",
    email: "E-Mail",
    intro: [
      "Diese Richtlinie gilt für Bewertungen, Benotungen, offizielle Antworten, Nachweise und zugehörige Inhalte auf CarrierTrust. Sie ist Bestandteil der Nutzungsbedingungen.",
      "CarrierTrust unterstützt ehrliche Berichte über echte Geschäftserfahrungen. Negative Bewertungen sind zulässig, müssen jedoch gutgläubig, relevant und klar zwischen überprüfbaren Tatsachen, Meinung und Verdacht unterscheiden.",
    ],
    sections: [
      {
        title: "1. Wer bewerten darf",
        paragraphs: [
          "Bewerten darf nur eine Person mit ausreichender Kenntnis einer echten geschäftlichen Interaktion mit dem bewerteten Unternehmen. Bei Handeln für ein Unternehmen muss sie zur Abgabe berechtigt sein.",
          "CarrierTrust kann Identität, Rolle, Unternehmensbeziehung oder Vertretungsmacht prüfen. Fehlende angemessene Bestätigung kann zur Ablehnung, Einschränkung oder Entfernung führen.",
        ],
      },
      {
        title: "2. Echte Geschäftserfahrung",
        paragraphs: [
          "Die Bewertung muss eine tatsächliche oder ernsthaft versuchte berufliche Interaktion betreffen, etwa Transport, Spedition, Logistik, Zahlung, Vermittlung, Unterauftrag, Dienstleistung oder Beschaffung.",
          "Sie darf nicht nur auf Gerüchten, Online-Diskussionen, Medienberichten oder fremden Erfahrungen beruhen.",
        ],
      },
      {
        title: "3. Richtigkeit, Relevanz und guter Glaube",
        paragraphs: [
          "Tatsachen müssen nach angemessener Prüfung richtig, aktuell und nicht irreführend sein. Wesentlicher Kontext darf nicht absichtlich ausgelassen werden.",
          "Meinungen sind zulässig, wenn sie als solche erkennbar und durch die Erfahrung gestützt sind. Verdacht, Schlussfolgerung oder ein ungelöster Handelsstreit darf nicht als bewiesene Tatsache, Gerichts- oder Behördenfeststellung dargestellt werden.",
          "Inhalte sollen sich auf geschäftsrelevantes Verhalten wie Kommunikation, Leistung, Dokumente, Zahlung, Be- und Entladung, Zustellung, Schadensbearbeitung und Streitbeilegung konzentrieren.",
        ],
      },
      {
        title: "4. Nachweise",
        paragraphs: [
          "CarrierTrust kann Verträge, Transportaufträge, Rechnungen, CMR-Unterlagen, Zustellnachweise, Korrespondenz, Zahlungs- oder Schadensunterlagen verlangen.",
          "Nachweise müssen echt, rechtmäßig erlangt, verständlich und nicht irreführend verändert sein.",
          "Sie werden normalerweise nicht veröffentlicht, können aber für Moderation, Rechtspflichten, Streitbeilegung und Rechtsansprüche gespeichert, geprüft, geschwärzt oder offengelegt werden.",
        ],
      },
      {
        title: "5. Interessenkonflikte und Manipulation",
        paragraphs: ["Bewertungen müssen unabhängige Erfahrung wiedergeben und dürfen Ratings oder Reputation nicht künstlich beeinflussen."],
        bullets: [
          "Keine Bewertung des eigenen oder kontrollierten Unternehmens.",
          "Keine verdeckten Bewertungen durch Beschäftigte, Eigentümer, Manager, Familienangehörige, verbundene Unternehmen oder Auftragnehmer.",
          "Keine gekauften, belohnten, gegenseitigen, koordinierten oder getauschten Bewertungen.",
          "Keine Mehrfachkonten, Duplikate oder künstlichen Kampagnen zur selben Erfahrung.",
          "Keine Wettbewerberbewertung mit primärem Schädigungszweck.",
          "Keine Forderung nach Zahlung, Rabatt, Vertrag oder Vorteil für Veröffentlichung, Änderung oder Löschung.",
        ],
      },
      {
        title: "6. Verbotene Inhalte",
        paragraphs: ["Bewertungen, Antworten und sonstige Eingaben dürfen keine rechtswidrigen, missbräuchlichen oder sachfremden Inhalte enthalten."],
        bullets: [
          "Drohung, Erpressung, Belästigung, Nachstellung, Einschüchterung oder Gewaltaufruf.",
          "Hassrede, Diskriminierung oder entwürdigende Angriffe.",
          "Bewusste Falschaussagen, Identitätstäuschung, gefälschte Beweise oder Irreführung.",
          "Unnötige personenbezogene Daten, Privatadressen, Telefonnummern, Ausweise, Bank- oder sensible Daten.",
          "Geschäftsgeheimnisse oder vertrauliche Informationen unter Verletzung einer Pflicht.",
          "Schadsoftware, schädliche Links, Spam, Werbung, SEO-Manipulation oder sachfremde Werbung.",
          "Verletzung von Urheber-, Marken-, Datenschutz- oder sonstigen Rechten.",
          "Obszöne Inhalte oder persönliche Beleidigungen ohne Geschäftsbezug.",
        ],
      },
      {
        title: "7. Betrugs-, Straf- und Behördenvorwürfe",
        paragraphs: [
          "Schwere Vorwürfe erfordern besondere Sorgfalt. Ohne abschließende offizielle Entscheidung darf nicht als feststehende Tatsache behauptet werden, ein Unternehmen oder eine Person habe Betrug, Diebstahl, eine Straftat, einen Sanktions- oder Regelverstoß begangen.",
          "Konkrete beobachtbare Ereignisse und eine zutreffende Mitteilung über Verdacht oder Behördenmeldung sind zulässig, sofern Status und Ergebnis nicht verfälscht werden.",
          "CarrierTrust kann stärkere Belege verlangen, Sichtbarkeit begrenzen, Kontext ergänzen, Kategorien ändern, Inhalte vorübergehend verbergen oder ablehnen.",
        ],
      },
      {
        title: "8. Ratings und Kategorien",
        paragraphs: [
          "Bewertung und Kategorie müssen zum Text passen. Ratings dürfen nicht als Strafe für sachfremde Konflikte oder als Verhandlungsdruck eingesetzt werden.",
          "CarrierTrust kann offensichtliche Kategoriefehler korrigieren, Labels vereinheitlichen, Duplikate zusammenführen oder Klarstellung verlangen. Dies ist keine Billigung.",
        ],
      },
      {
        title: "9. Änderungen und Aktualisierungen",
        paragraphs: [
          "Wesentliche Änderungen wie spätere Zahlung, Vergleich, Dokumentenkorrektur oder erfolgreiche Lösung sollen ergänzt werden.",
          "Bearbeitungen können gekennzeichnet werden. Frühere Fassungen und Nachweise können für Sicherheit, Moderation, Streitigkeiten und Recht gespeichert bleiben.",
          "Ein gelöster Streit kann historisch relevant bleiben, muss aber fair einschließlich der Lösung dargestellt werden.",
        ],
      },
      {
        title: "10. Moderation",
        paragraphs: [
          "CarrierTrust kann Inhalte vor oder nach Veröffentlichung prüfen, ist hierzu jedoch nicht allgemein verpflichtet. Auslöser können automatische Signale, Meldungen, Beweise, Rechtsrisiken oder interne Kontrollen sein.",
          "CarrierTrust kann Klarstellung verlangen, Format korrigieren, Daten schwärzen, Labels ändern, Verbreitung begrenzen, vorübergehend verbergen, ablehnen, entfernen oder Kontofunktionen einschränken.",
          "Berücksichtigt werden können Glaubwürdigkeit, Relevanz, Beweise, Verhältnismäßigkeit, öffentliches Interesse, Rechte Betroffener, Wiederholung und Recht. Veröffentlichung bedeutet keine Bestätigung jeder Aussage.",
        ],
      },
      {
        title: "11. Offizielle Unternehmensantworten",
        paragraphs: [
          "Ein berechtigtes Unternehmenskonto kann entsprechend Plan und Regeln offiziell antworten. Für Antworten gelten dieselben Anforderungen an Richtigkeit, Relevanz, Vertraulichkeit und respektvollen Umgang.",
          "Das Unternehmen darf widersprechen, Kontext geben, Maßnahmen erläutern oder Tatsachen bestreiten, aber nicht drohen, unnötige persönliche Daten offenlegen oder unbelegte Straftatvorwürfe erheben.",
          "Eine negative Bewertung wird nicht allein wegen Widerspruchs oder Beendigung der Geschäftsbeziehung gelöscht.",
        ],
      },
      {
        title: "12. Meldungen und Beschwerden",
        paragraphs: [
          "Nutzer und betroffene Unternehmen können Inhalte melden, die diese Richtlinie, Nutzungsbedingungen, Rechte Dritter oder Recht verletzen. Der genaue Inhalt und der Grund sind klar zu benennen.",
          "Eine Meldung garantiert keine Löschung. CarrierTrust kann Nachweise anfordern, Beteiligte anhören, Unterlagen sichern und gegebenenfalls eine begründete Entscheidung treffen.",
          "Hinweise zu mutmaßlich illegalen Inhalten müssen dem Verfahren auf der Rechtsseite folgen. Berechtigte Entscheidungen können dort angefochten werden.",
        ],
      },
      {
        title: "13. Wiederholte Verstöße",
        paragraphs: [
          "Konten können bei wiederholten Falschbewertungen, Manipulation, Belästigung, missbräuchlichen Meldungen, gefälschten Beweisen oder unberechtigter Vertretung verwarnt, beschränkt, gesperrt oder beendet werden.",
          "CarrierTrust kann Anzahl, Schwere, Häufigkeit, Absicht und Wirkung berücksichtigen und Unterlagen für Sicherheit, Betrugsprävention und Rechtsansprüche speichern.",
        ],
      },
      {
        title: "14. Datenschutz und Vertraulichkeit",
        paragraphs: [
          "Personenbezogene Daten zu Bewertungen, Antworten, Meldungen und Nachweisen werden nach der Datenschutzerklärung verarbeitet. Es sollen nur notwendige Angaben offengelegt werden.",
          "Vertraulichkeit kann nicht garantiert werden, wenn Offenlegung gesetzlich, zum Rechtsschutz, zur Streitprüfung oder gegenüber Behörden bzw. Gerichten erforderlich ist.",
        ],
      },
      {
        title: "15. Rolle von CarrierTrust",
        paragraphs: [
          "Nutzergenerierte Bewertungen und Antworten bleiben Sache ihrer Autoren. CarrierTrust stellt Hosting, Moderationswerkzeuge, Labels, Scoring-Logik und Plattformfunktionen bereit.",
          "CarrierTrust ist kein Gericht, Regulator, Ratinginstitut, Inkassodienst oder Garant. Nutzer bleiben für eigene Prüfungen und Geschäftsentscheidungen verantwortlich.",
        ],
      },
      {
        title: "16. Änderungen, Sprache und Kontakt",
        paragraphs: [
          "CarrierTrust kann diese Richtlinie aus rechtlichen, sicherheitsbezogenen, moderativen oder produktbezogenen Gründen ändern. Version und Datum stehen oben. Wesentliche Änderungen können über Plattform, E-Mail oder erneute Zustimmung mitgeteilt werden.",
          "Übersetzungen dienen der Benutzerfreundlichkeit. Bei Abweichungen ist, soweit zwingendes Recht dies erlaubt, die englische Fassung maßgeblich.",
          "Fragen können an support@carriertrust.eu gesendet werden.",
        ],
      },
    ],
    closing:
      "Eine Bewertung soll anderen Unternehmen eine echte Geschäftserfahrung verständlich machen. Schreiben Sie sachlich, fair und verhältnismäßig und belegen Sie wichtige Behauptungen.",
  },

  ru: {
    badge: "Правила отзывов",
    title: "Правила публикации отзывов",
    version: "Версия 2.0",
    effectiveDate: "Действуют с 25 июля 2026 года",
    operator: "Оператор платформы",
    vatId: "VAT ID",
    legalAddress: "Юридический адрес",
    email: "Email",
    intro: [
      "Настоящие Правила регулируют отзывы, оценки, официальные ответы, доказательства и связанный контент на CarrierTrust и являются частью Условий использования.",
      "CarrierTrust поддерживает честное описание реального делового опыта. Отрицательные отзывы разрешены, но контент должен публиковаться добросовестно, относиться к делу и чётко отличать проверяемые факты от мнения или подозрения.",
    ],
    sections: [
      {
        title: "1. Кто может оставить отзыв",
        paragraphs: [
          "Отзыв вправе подать только человек, имеющий достаточные знания о реальном деловом взаимодействии с оцениваемой компанией. При подаче от имени компании необходимы соответствующие полномочия.",
          "CarrierTrust вправе запросить подтверждение личности, роли, связи с компанией или полномочий. Отсутствие разумного подтверждения может привести к отказу, ограничению или удалению.",
        ],
      },
      {
        title: "2. Реальный деловой опыт",
        paragraphs: [
          "Отзыв должен относиться к фактическому или реально предпринятому профессиональному взаимодействию: перевозке, экспедированию, логистике, оплате, посредничеству, субподряду, услуге, закупке или другой B2B-связи.",
          "Нельзя основывать отзыв только на слухах, обсуждениях в интернете, публикациях СМИ, чужом опыте или споре, в котором автор существенно не участвовал.",
        ],
      },
      {
        title: "3. Точность, относимость и добросовестность",
        paragraphs: [
          "Автор обязан разумно проверить факты, актуальность и отсутствие вводящего в заблуждение содержания. Нельзя намеренно скрывать контекст, существенно меняющий смысл.",
          "Мнение разрешено, если оно ясно обозначено и основано на описанном опыте. Подозрение, вывод или нерешённый коммерческий спор нельзя представлять как доказанный факт, решение суда или вывод регулятора.",
          "Отзыв должен касаться делового поведения: коммуникации, выполнения, документов, оплаты, загрузки, доставки, претензий и разрешения спора.",
        ],
      },
      {
        title: "4. Доказательства",
        paragraphs: [
          "CarrierTrust вправе запросить договоры, транспортные заказы, счета, CMR, подтверждения доставки, переписку, платёжные данные, материалы претензии или другие относящиеся документы.",
          "Доказательства должны быть подлинными, полученными законно, достаточными для понимания контекста и не изменёнными обманным способом.",
          "Обычно они не публикуются, но могут храниться, проверяться, редактироваться и раскрываться в объёме, необходимом для модерации, закона, спора или юридической защиты.",
        ],
      },
      {
        title: "5. Конфликт интересов и манипуляции",
        paragraphs: ["Отзывы должны отражать независимый опыт и не использоваться для искусственного изменения рейтинга или репутации."],
        bullets: [
          "Нельзя оценивать собственную или контролируемую компанию.",
          "Нельзя скрывать существенную связь сотрудника, владельца, менеджера, родственника, аффилированного лица или подрядчика.",
          "Запрещены купленные, вознаграждённые, взаимные, согласованные и обменные отзывы.",
          "Запрещены несколько аккаунтов, дубли и искусственные кампании по одному опыту.",
          "Конкурент не вправе публиковать отзыв преимущественно ради нанесения вреда.",
          "Запрещено требовать оплату, скидку, договор или выгоду за публикацию, изменение или удаление отзыва.",
        ],
      },
      {
        title: "6. Запрещённый контент",
        paragraphs: ["Отзыв, ответ или иная публикация не должны содержать незаконный, оскорбительный или не относящийся к делу материал."],
        bullets: [
          "Угрозы, вымогательство, преследование, запугивание или призывы к насилию.",
          "Язык ненависти, дискриминационные или унижающие нападки.",
          "Заведомая ложь, выдача себя за другое лицо, поддельные доказательства или намеренное введение в заблуждение.",
          "Избыточные персональные данные, частные адреса, личные телефоны, документы, банковские и чувствительные данные.",
          "Коммерческая тайна и конфиденциальные сведения, раскрытые с нарушением обязанности.",
          "Вредоносные ссылки, malware, spam, реклама, SEO-манипуляции и нерелевантное продвижение.",
          "Нарушение авторских, товарных, приватных и иных прав.",
          "Непристойный материал и личные оскорбления, не связанные с деловым опытом.",
        ],
      },
      {
        title: "7. Обвинения в мошенничестве, преступлениях и нарушениях",
        paragraphs: [
          "Серьёзные обвинения требуют особой осторожности. Без окончательного официального решения нельзя утверждать как установленный факт, что компания или человек совершили мошенничество, кражу, преступление, санкционное или регуляторное нарушение.",
          "Разрешено точно описывать наблюдаемые события и указывать, что поведение показалось подозрительным или было сообщено органу, не искажая статус и результат.",
          "CarrierTrust вправе запросить усиленные доказательства, ограничить видимость, добавить контекст, изменить категорию, временно скрыть или отклонить публикацию.",
        ],
      },
      {
        title: "8. Оценки и категории",
        paragraphs: [
          "Оценка и категория должны разумно соответствовать тексту. Нельзя использовать рейтинг как наказание за нерелевантный конфликт или средство давления.",
          "CarrierTrust вправе исправить очевидную категорию, стандартизировать метку, объединить дубли или запросить пояснение. Это не означает одобрения отзыва.",
        ],
      },
      {
        title: "9. Изменение и обновление",
        paragraphs: [
          "Автору следует обновить отзыв при существенном изменении: последующей оплате, урегулировании, исправлении документов или успешном решении.",
          "CarrierTrust может отмечать редактирование. Предыдущие версии и доказательства могут храниться для безопасности, модерации, спора и юридических целей.",
          "Разрешённый спор может оставаться исторически важным, но отзыв должен честно описывать его итог.",
        ],
      },
      {
        title: "10. Модерация",
        paragraphs: [
          "CarrierTrust вправе, но не обязан, проверять контент до или после публикации. Основанием могут быть автоматические сигналы, жалобы, доказательства, юридические риски, правила или внутренние проверки.",
          "CarrierTrust вправе запросить пояснение, исправить форматирование, скрыть данные, изменить метку, ограничить распространение, временно скрыть, отклонить или удалить контент либо ограничить функции аккаунта.",
          "Учитываются достоверность, относимость, доказательства, пропорциональность, общественный интерес, права сторон, повторяемость и закон. Публикация не означает подтверждения каждого утверждения.",
        ],
      },
      {
        title: "11. Официальные ответы компаний",
        paragraphs: [
          "Уполномоченный аккаунт компании может опубликовать официальный ответ в рамках тарифа и правил. К ответу применяются те же требования точности, относимости, конфиденциальности и уважительного поведения.",
          "Компания вправе не согласиться, предоставить контекст, описать меры или оспорить факты, но не вправе угрожать, раскрывать избыточные личные данные или выдвигать необоснованные уголовные обвинения.",
          "Отрицательный отзыв не удаляется только потому, что компания с ним не согласна или деловые отношения завершены.",
        ],
      },
      {
        title: "12. Жалобы, уведомления и апелляции",
        paragraphs: [
          "Пользователи и затронутые компании могут сообщить о нарушении Правил, Условий, прав третьих лиц или закона. Следует точно указать контент и подробно объяснить проблему.",
          "Жалоба не гарантирует удаления. CarrierTrust вправе запросить доказательства, обратиться к сторонам, сохранить материалы и вынести мотивированный результат.",
          "Уведомления о предположительно незаконном контенте подаются по процедуре страницы Legal. Допустимые решения можно обжаловать по указанной там процедуре.",
        ],
      },
      {
        title: "13. Повторные нарушения и меры к аккаунту",
        paragraphs: [
          "CarrierTrust вправе предупредить, ограничить, приостановить или закрыть аккаунт за повторные ложные отзывы, манипуляции, преследование, злоупотребление жалобами, поддельные доказательства или отсутствие полномочий.",
          "Могут учитываться количество, тяжесть, частота, умысел и последствия. Материалы могут сохраняться для безопасности, предотвращения мошенничества и юридической защиты.",
        ],
      },
      {
        title: "14. Конфиденциальность и персональные данные",
        paragraphs: [
          "Данные, связанные с отзывами, ответами, жалобами и доказательствами, обрабатываются по Политике конфиденциальности. Следует раскрывать только сведения, необходимые для объяснения опыта.",
          "CarrierTrust не может гарантировать конфиденциальность, когда раскрытие требуется законом, для защиты прав, рассмотрения спора или ответа суду либо компетентному органу.",
        ],
      },
      {
        title: "15. Роль CarrierTrust",
        paragraphs: [
          "Отзывы и ответы пользователей остаются ответственностью их авторов. CarrierTrust предоставляет хостинг, инструменты модерации, метки, логику scoring и функции платформы.",
          "CarrierTrust не является судом, регулятором, рейтинговым агентством, взыскателем или гарантом компании. Пользователи самостоятельно проводят проверку и принимают коммерческие решения.",
        ],
      },
      {
        title: "16. Изменения, язык и контакт",
        paragraphs: [
          "CarrierTrust вправе обновить Правила по юридическим, безопасностным, модерационным или продуктовым причинам. Версия и дата указаны сверху. О существенных изменениях можно сообщить через платформу, email или повторное принятие.",
          "Переводы предоставляются для удобства. При расхождении английская версия имеет преимущественную силу, насколько это допускает обязательное право.",
          "Вопросы можно направлять на support@carriertrust.eu.",
        ],
      },
    ],
    closing:
      "Отзыв должен помогать другой компании понять реальный коммерческий опыт. Пишите по фактам, справедливо и соразмерно и будьте готовы подтвердить важные утверждения доказательствами.",
  },

  fr: {
    badge: "Règles des avis",
    title: "Règles de publication des avis",
    version: "Version 2.0",
    effectiveDate: "En vigueur le 25 juillet 2026",
    operator: "Exploitant de la plateforme",
    vatId: "N° de TVA",
    legalAddress: "Siège social",
    email: "Email",
    intro: [
      "Ces règles s’appliquent aux avis, notes, réponses officielles, preuves et contenus associés sur CarrierTrust et font partie des Conditions d’utilisation.",
      "CarrierTrust permet de décrire honnêtement une expérience professionnelle réelle. Les avis négatifs sont autorisés, mais doivent être publiés de bonne foi, être pertinents et distinguer les faits vérifiables de l’opinion ou du soupçon.",
    ],
    sections: [
      {
        title: "1. Qui peut publier",
        paragraphs: [
          "Seule une personne ayant une connaissance suffisante d’une interaction commerciale réelle avec l’entreprise peut publier. Pour agir au nom d’une entreprise, elle doit disposer de l’autorité nécessaire.",
          "CarrierTrust peut vérifier identité, rôle, relation ou pouvoirs. L’absence de confirmation raisonnable peut entraîner refus, limitation ou retrait.",
        ],
      },
      {
        title: "2. Expérience commerciale réelle",
        paragraphs: [
          "L’avis doit concerner une interaction professionnelle réelle ou véritablement tentée : transport, expédition, logistique, paiement, courtage, sous-traitance, service, achat ou autre relation B2B.",
          "Il ne doit pas reposer uniquement sur rumeurs, discussions en ligne, médias ou expérience d’un tiers.",
        ],
      },
      {
        title: "3. Exactitude, pertinence et bonne foi",
        paragraphs: [
          "Les faits doivent être raisonnablement vérifiés, actuels et non trompeurs. Un contexte important ne doit pas être volontairement omis.",
          "L’opinion est permise si elle est clairement présentée comme telle et fondée sur l’expérience. Un soupçon, une déduction ou un litige non résolu ne doit pas être présenté comme fait prouvé, jugement ou conclusion d’une autorité.",
          "L’avis doit porter sur la relation commerciale : communication, exécution, documents, paiement, chargement, livraison, réclamations et résolution.",
        ],
      },
      {
        title: "4. Preuves",
        paragraphs: [
          "CarrierTrust peut demander contrats, ordres de transport, factures, CMR, preuves de livraison, correspondance, paiements ou dossiers de réclamation.",
          "Les preuves doivent être authentiques, obtenues légalement, suffisantes et non modifiées de manière trompeuse.",
          "Elles ne sont normalement pas publiées, mais peuvent être conservées, examinées, expurgées ou communiquées pour modération, obligations légales, litiges ou défense de droits.",
        ],
      },
      {
        title: "5. Conflits et manipulation",
        paragraphs: ["Les avis doivent être indépendants et ne pas manipuler artificiellement les notes ou la réputation."],
        bullets: [
          "Pas d’avis sur sa propre entreprise ou une entreprise contrôlée.",
          "Pas de lien matériel caché avec salarié, propriétaire, manager, famille, affilié ou prestataire.",
          "Pas d’avis acheté, récompensé, réciproque, coordonné ou échangé.",
          "Pas de comptes multiples, doublons ou campagnes artificielles.",
          "Pas d’avis concurrentiel publié principalement pour nuire.",
          "Pas de demande de paiement, remise, contrat ou avantage contre publication, modification ou retrait.",
        ],
      },
      {
        title: "6. Contenus interdits",
        paragraphs: ["Les avis et réponses ne doivent pas contenir de matière illégale, abusive ou non pertinente."],
        bullets: [
          "Menaces, extorsion, harcèlement, intimidation ou appel à la violence.",
          "Discours haineux, discrimination ou attaque dégradante.",
          "Fausseté consciente, usurpation, fausse preuve ou tromperie délibérée.",
          "Données personnelles inutiles, adresse privée, téléphone, identité, données bancaires ou sensibles.",
          "Secret commercial ou information confidentielle divulguée en violation d’une obligation.",
          "Logiciel malveillant, lien dangereux, spam, publicité ou manipulation SEO.",
          "Violation de droits d’auteur, marque, vie privée ou autres droits.",
          "Contenu obscène ou insulte personnelle sans rapport professionnel.",
        ],
      },
      {
        title: "7. Accusations de fraude, infraction ou violation",
        paragraphs: [
          "Les accusations graves exigent une prudence particulière. Sans décision officielle définitive, il est interdit d’affirmer comme établi qu’une entreprise ou personne a commis fraude, vol, infraction, violation de sanctions ou réglementaire.",
          "Les événements observables peuvent être décrits avec exactitude et un soupçon ou signalement peut être mentionné sans déformer son statut ou son résultat.",
          "CarrierTrust peut exiger des preuves renforcées, limiter la visibilité, ajouter du contexte, modifier une catégorie, masquer temporairement ou refuser.",
        ],
      },
      {
        title: "8. Notes et catégories",
        paragraphs: [
          "La note et la catégorie doivent correspondre au texte. Elles ne doivent pas servir de punition pour un désaccord sans rapport ou de levier de négociation.",
          "CarrierTrust peut corriger une erreur manifeste, normaliser un label, fusionner des doublons ou demander une clarification sans approuver l’avis.",
        ],
      },
      {
        title: "9. Modification et mise à jour",
        paragraphs: [
          "L’auteur devrait mettre à jour l’avis en cas de paiement ultérieur, accord, correction documentaire ou résolution réussie.",
          "CarrierTrust peut signaler une modification et conserver anciennes versions et preuves pour sécurité, modération, litige et droit.",
          "Un litige résolu peut rester historiquement pertinent, mais l’issue doit être décrite équitablement.",
        ],
      },
      {
        title: "10. Modération",
        paragraphs: [
          "CarrierTrust peut examiner le contenu avant ou après publication sans obligation générale. L’examen peut être déclenché par signaux automatiques, rapports, preuves, risques juridiques ou contrôles internes.",
          "CarrierTrust peut demander des précisions, corriger le format, expurger, modifier un label, limiter la diffusion, masquer, refuser, retirer ou limiter un compte.",
          "La crédibilité, pertinence, preuve, proportionnalité, intérêt public, droits des parties, répétition et droit peuvent être pris en compte. La publication n’est pas une approbation.",
        ],
      },
      {
        title: "11. Réponses officielles",
        paragraphs: [
          "Un compte autorisé peut répondre selon le plan et les règles. Les mêmes exigences d’exactitude, pertinence, confidentialité et respect s’appliquent.",
          "L’entreprise peut contester, contextualiser ou décrire des mesures, mais ne doit pas menacer, exposer des données inutiles ou porter une accusation pénale non étayée.",
          "Un avis négatif n’est pas retiré uniquement parce que l’entreprise le conteste ou que la relation a pris fin.",
        ],
      },
      {
        title: "12. Signalements et recours",
        paragraphs: [
          "Les utilisateurs et entreprises concernés peuvent signaler un contenu contraire aux règles, Conditions, droits de tiers ou à la loi en identifiant précisément le contenu et le problème.",
          "Le signalement ne garantit pas le retrait. CarrierTrust peut demander des preuves, consulter les parties, conserver les éléments et rendre une décision motivée.",
          "Les contenus prétendument illégaux doivent suivre la procédure de la page Legal. Les décisions éligibles peuvent y être contestées.",
        ],
      },
      {
        title: "13. Violations répétées",
        paragraphs: [
          "CarrierTrust peut avertir, limiter, suspendre ou fermer les comptes impliqués dans de faux avis répétés, manipulation, harcèlement, signalements abusifs, fausses preuves ou représentation non autorisée.",
          "Le nombre, la gravité, la fréquence, l’intention et l’effet peuvent être pris en compte et les dossiers conservés.",
        ],
      },
      {
        title: "14. Vie privée et confidentialité",
        paragraphs: [
          "Les données liées aux avis, réponses, signalements et preuves sont traitées selon la Politique de confidentialité. Seules les informations nécessaires doivent être communiquées.",
          "La confidentialité ne peut être garantie lorsqu’une divulgation est requise par la loi, la défense de droits, un litige, une autorité ou un tribunal.",
        ],
      },
      {
        title: "15. Rôle de CarrierTrust",
        paragraphs: [
          "Les avis et réponses restent sous la responsabilité de leurs auteurs. CarrierTrust fournit hébergement, modération, labels, logique de score et fonctions techniques.",
          "CarrierTrust n’est ni tribunal, régulateur, agence de notation, recouvreur ni garant. Les utilisateurs effectuent leurs propres vérifications.",
        ],
      },
      {
        title: "16. Modifications, langue et contact",
        paragraphs: [
          "CarrierTrust peut modifier ces règles pour des raisons juridiques, de sécurité, de modération ou de produit. Version et date figurent en haut. Les changements importants peuvent être communiqués sur la plateforme, par email ou nouvelle acceptation.",
          "Les traductions sont fournies par commodité. La version anglaise prévaut en cas de divergence dans la mesure permise par la loi impérative.",
          "Les questions peuvent être adressées à support@carriertrust.eu.",
        ],
      },
    ],
    closing:
      "Un avis doit aider une autre entreprise à comprendre une expérience commerciale réelle. Soyez factuel, équitable, proportionné et prêt à étayer les affirmations importantes.",
  },

  es: {
    badge: "Normas de reseñas",
    title: "Normas de publicación de reseñas",
    version: "Versión 2.0",
    effectiveDate: "En vigor desde el 25 de julio de 2026",
    operator: "Operador de la plataforma",
    vatId: "N.º de IVA",
    legalAddress: "Domicilio social",
    email: "Email",
    intro: [
      "Estas Normas se aplican a reseñas, valoraciones, respuestas oficiales, pruebas y contenido relacionado en CarrierTrust y forman parte de los Términos.",
      "CarrierTrust permite informar honestamente sobre experiencias empresariales reales. Se permiten reseñas negativas, pero deben publicarse de buena fe, ser relevantes y distinguir hechos verificables de opiniones o sospechas.",
    ],
    sections: [
      {
        title: "1. Quién puede publicar",
        paragraphs: [
          "Solo puede reseñar una persona con conocimiento suficiente de una interacción empresarial real con la empresa. Al actuar por una empresa debe tener autorización.",
          "CarrierTrust puede verificar identidad, rol, relación y autoridad. No aportar una confirmación razonable puede causar rechazo, limitación o retirada.",
        ],
      },
      {
        title: "2. Experiencia empresarial real",
        paragraphs: [
          "La reseña debe referirse a una interacción profesional real o verdaderamente intentada: transporte, expedición, logística, pago, intermediación, subcontratación, servicio, compra u otra relación B2B.",
          "No puede basarse solo en rumores, conversaciones online, medios o experiencias de terceros.",
        ],
      },
      {
        title: "3. Exactitud, relevancia y buena fe",
        paragraphs: [
          "Los hechos deben comprobarse razonablemente, estar actualizados y no inducir a error. No debe omitirse deliberadamente contexto esencial.",
          "La opinión se permite si se presenta como tal y se apoya en la experiencia. Una sospecha, inferencia o disputa pendiente no debe presentarse como hecho probado, sentencia o conclusión oficial.",
          "La reseña debe centrarse en comunicación, ejecución, documentos, pago, carga, entrega, reclamaciones y resolución.",
        ],
      },
      {
        title: "4. Pruebas",
        paragraphs: [
          "CarrierTrust puede solicitar contratos, órdenes de transporte, facturas, CMR, entregas, correspondencia, pagos o reclamaciones.",
          "Las pruebas deben ser auténticas, obtenidas legalmente, suficientes y no modificadas de forma engañosa.",
          "Normalmente no se publican, pero pueden conservarse, revisarse, ocultarse parcialmente o comunicarse para moderación, ley, disputas o defensa jurídica.",
        ],
      },
      {
        title: "5. Conflictos y manipulación",
        paragraphs: ["Las reseñas deben reflejar experiencia independiente y no manipular artificialmente valoraciones o reputación."],
        bullets: [
          "No reseñar la empresa propia o controlada.",
          "No ocultar vínculos materiales de empleados, propietarios, managers, familiares, afiliados o contratistas.",
          "No reseñas compradas, incentivadas, recíprocas, coordinadas o intercambiadas.",
          "No cuentas múltiples, duplicados ni campañas artificiales.",
          "No reseña de competidor publicada principalmente para perjudicar.",
          "No exigir pago, descuento, contrato o ventaja por publicar, cambiar o retirar.",
        ],
      },
      {
        title: "6. Contenido prohibido",
        paragraphs: ["Las reseñas y respuestas no pueden contener material ilegal, abusivo o irrelevante."],
        bullets: [
          "Amenazas, extorsión, acoso, intimidación o incitación a la violencia.",
          "Odio, discriminación o ataques degradantes.",
          "Mentiras conscientes, suplantación, pruebas falsas o engaño deliberado.",
          "Datos personales innecesarios, domicilios privados, teléfonos, identidad, banco o datos sensibles.",
          "Secretos comerciales o confidenciales divulgados incumpliendo una obligación.",
          "Malware, enlaces maliciosos, spam, publicidad o manipulación SEO.",
          "Violación de copyright, marcas, privacidad u otros derechos.",
          "Contenido obsceno o insultos personales sin relación empresarial.",
        ],
      },
      {
        title: "7. Acusaciones de fraude, delito o infracción",
        paragraphs: [
          "Las acusaciones graves requieren especial cuidado. Sin decisión oficial definitiva no puede afirmarse como hecho probado que alguien cometió fraude, robo, delito, infracción de sanciones o normativa.",
          "Pueden describirse hechos observables y mencionar de forma exacta una sospecha o denuncia sin tergiversar su estado o resultado.",
          "CarrierTrust puede exigir pruebas reforzadas, limitar visibilidad, añadir contexto, cambiar categoría, ocultar temporalmente o rechazar.",
        ],
      },
      {
        title: "8. Valoraciones y categorías",
        paragraphs: [
          "La nota y categoría deben coincidir con el texto. No pueden usarse como castigo por un desacuerdo no relacionado ni como presión negociadora.",
          "CarrierTrust puede corregir errores evidentes, normalizar etiquetas, combinar duplicados o pedir aclaración sin respaldar la reseña.",
        ],
      },
      {
        title: "9. Edición y actualización",
        paragraphs: [
          "La reseña debe actualizarse cuando cambie un hecho material: pago posterior, acuerdo, corrección documental o solución.",
          "CarrierTrust puede indicar la edición y conservar versiones anteriores y pruebas para seguridad, moderación, disputa y fines legales.",
          "Una disputa resuelta puede seguir siendo histórica, pero debe describirse justamente la solución.",
        ],
      },
      {
        title: "10. Moderación",
        paragraphs: [
          "CarrierTrust puede revisar antes o después de publicar sin obligación general. La revisión puede surgir por señales automáticas, reportes, pruebas, riesgo jurídico o controles.",
          "Puede pedir aclaración, corregir formato, ocultar datos, cambiar etiquetas, limitar distribución, ocultar, rechazar, retirar o restringir una cuenta.",
          "Puede valorar credibilidad, relevancia, pruebas, proporcionalidad, interés público, derechos, repetición y ley. Publicar no significa aprobar cada afirmación.",
        ],
      },
      {
        title: "11. Respuestas oficiales",
        paragraphs: [
          "Una cuenta autorizada puede responder según el plan y las reglas. Se aplican los mismos requisitos de exactitud, relevancia, confidencialidad y respeto.",
          "La empresa puede discrepar, aportar contexto o medidas, pero no amenazar, revelar datos innecesarios ni formular acusaciones penales sin apoyo.",
          "Una reseña negativa no se elimina solo por desacuerdo o porque termine la relación.",
        ],
      },
      {
        title: "12. Reportes y recursos",
        paragraphs: [
          "Usuarios y empresas pueden reportar contenido contrario a estas Normas, Términos, derechos de terceros o ley identificándolo y explicando el problema.",
          "El reporte no garantiza retirada. CarrierTrust puede pedir pruebas, consultar a las partes, conservar registros y emitir un resultado motivado.",
          "El contenido presuntamente ilegal debe seguir la página Legal. Las decisiones elegibles pueden recurrirse allí.",
        ],
      },
      {
        title: "13. Infracciones repetidas",
        paragraphs: [
          "CarrierTrust puede advertir, limitar, suspender o cerrar cuentas por reseñas falsas repetidas, manipulación, acoso, reportes abusivos, pruebas falsas o representación no autorizada.",
          "Puede considerar número, gravedad, frecuencia, intención e impacto y conservar registros.",
        ],
      },
      {
        title: "14. Privacidad y confidencialidad",
        paragraphs: [
          "Los datos de reseñas, respuestas, reportes y pruebas se tratan según la Política de privacidad. Solo debe revelarse lo necesario.",
          "No puede garantizarse confidencialidad cuando la comunicación sea necesaria por ley, derechos, disputa, autoridad o tribunal.",
        ],
      },
      {
        title: "15. Función de CarrierTrust",
        paragraphs: [
          "Las reseñas y respuestas son responsabilidad de sus autores. CarrierTrust ofrece alojamiento, moderación, etiquetas, lógica de puntuación y funciones.",
          "CarrierTrust no es tribunal, regulador, agencia de rating, cobrador ni garante. Los usuarios hacen su propia diligencia.",
        ],
      },
      {
        title: "16. Cambios, idioma y contacto",
        paragraphs: [
          "CarrierTrust puede actualizar estas Normas por razones legales, de seguridad, moderación o producto. Versión y fecha figuran arriba. Los cambios importantes pueden comunicarse en la plataforma, por email o nueva aceptación.",
          "Las traducciones se ofrecen por comodidad. La versión inglesa prevalece en caso de conflicto en la medida permitida por la ley imperativa.",
          "Las preguntas se envían a support@carriertrust.eu.",
        ],
      },
    ],
    closing:
      "Una reseña debe ayudar a otra empresa a comprender una experiencia comercial real. Sé factual, justo, proporcionado y dispuesto a respaldar afirmaciones importantes.",
  },

  it: {
    badge: "Regole recensioni",
    title: "Regole per la pubblicazione delle recensioni",
    version: "Versione 2.0",
    effectiveDate: "In vigore dal 25 luglio 2026",
    operator: "Gestore della piattaforma",
    vatId: "Partita IVA",
    legalAddress: "Sede legale",
    email: "Email",
    intro: [
      "Queste Regole disciplinano recensioni, valutazioni, risposte ufficiali, prove e contenuti collegati su CarrierTrust e fanno parte dei Termini.",
      "CarrierTrust consente di riferire onestamente esperienze aziendali reali. Le recensioni negative sono consentite, ma devono essere in buona fede, pertinenti e distinguere fatti verificabili da opinioni o sospetti.",
    ],
    sections: [
      {
        title: "1. Chi può pubblicare",
        paragraphs: [
          "Può recensire solo chi conosce sufficientemente un’interazione aziendale reale con l’impresa. Chi agisce per un’impresa deve avere autorità.",
          "CarrierTrust può verificare identità, ruolo, relazione e poteri. La mancata conferma ragionevole può comportare rifiuto, limitazione o rimozione.",
        ],
      },
      {
        title: "2. Esperienza aziendale reale",
        paragraphs: [
          "La recensione deve riguardare un’interazione professionale reale o realmente tentata: trasporto, spedizione, logistica, pagamento, intermediazione, subappalto, servizio, acquisto o altra relazione B2B.",
          "Non può basarsi solo su voci, discussioni online, media o esperienze altrui.",
        ],
      },
      {
        title: "3. Accuratezza, pertinenza e buona fede",
        paragraphs: [
          "I fatti devono essere ragionevolmente verificati, aggiornati e non fuorvianti. Non va omesso volontariamente un contesto essenziale.",
          "L’opinione è ammessa se chiaramente indicata e fondata sull’esperienza. Sospetto, inferenza o controversia aperta non vanno presentati come fatto provato, sentenza o conclusione ufficiale.",
          "La recensione deve concentrarsi su comunicazione, esecuzione, documenti, pagamento, carico, consegna, reclami e risoluzione.",
        ],
      },
      {
        title: "4. Prove",
        paragraphs: [
          "CarrierTrust può chiedere contratti, ordini di trasporto, fatture, CMR, consegne, corrispondenza, pagamenti o documenti di reclamo.",
          "Le prove devono essere autentiche, ottenute legalmente, sufficienti e non modificate in modo ingannevole.",
          "Normalmente non sono pubblicate, ma possono essere conservate, esaminate, oscurate o comunicate per moderazione, legge, controversie o difesa legale.",
        ],
      },
      {
        title: "5. Conflitti e manipolazione",
        paragraphs: ["Le recensioni devono riflettere esperienza indipendente e non manipolare artificialmente rating o reputazione."],
        bullets: [
          "Nessuna recensione della propria impresa o di impresa controllata.",
          "Nessun legame materiale nascosto di dipendente, proprietario, manager, familiare, affiliato o appaltatore.",
          "Nessuna recensione acquistata, premiata, reciproca, coordinata o scambiata.",
          "Nessun account multiplo, duplicato o campagna artificiale.",
          "Nessuna recensione di concorrente pubblicata principalmente per danneggiare.",
          "Nessuna richiesta di pagamento, sconto, contratto o vantaggio per pubblicare, cambiare o rimuovere.",
        ],
      },
      {
        title: "6. Contenuti vietati",
        paragraphs: ["Recensioni e risposte non devono contenere materiale illecito, abusivo o irrilevante."],
        bullets: [
          "Minacce, estorsione, molestie, intimidazione o incitamento alla violenza.",
          "Odio, discriminazione o attacchi degradanti.",
          "Falsità consapevoli, impersonificazione, prove false o inganno deliberato.",
          "Dati personali non necessari, indirizzi privati, telefoni, documenti, banca o dati sensibili.",
          "Segreti commerciali o informazioni riservate divulgate violando un obbligo.",
          "Malware, link dannosi, spam, pubblicità o manipolazione SEO.",
          "Violazione di copyright, marchi, privacy o altri diritti.",
          "Materiale osceno o insulti personali non pertinenti.",
        ],
      },
      {
        title: "7. Accuse di frode, reato o violazione",
        paragraphs: [
          "Le accuse gravi richiedono particolare cautela. Senza decisione ufficiale definitiva non si può affermare come fatto provato che qualcuno abbia commesso frode, furto, reato, violazione di sanzioni o regolamentare.",
          "Si possono descrivere fatti osservabili e menzionare accuratamente un sospetto o una segnalazione senza alterarne stato o risultato.",
          "CarrierTrust può richiedere prove maggiori, limitare visibilità, aggiungere contesto, cambiare categoria, nascondere temporaneamente o rifiutare.",
        ],
      },
      {
        title: "8. Valutazioni e categorie",
        paragraphs: [
          "Valutazione e categoria devono corrispondere al testo. Non vanno usate come punizione per conflitti estranei o come pressione negoziale.",
          "CarrierTrust può correggere errori evidenti, uniformare etichette, unire duplicati o chiedere chiarimenti senza approvare la recensione.",
        ],
      },
      {
        title: "9. Modifica e aggiornamento",
        paragraphs: [
          "La recensione dovrebbe essere aggiornata in caso di pagamento successivo, accordo, correzione documentale o soluzione.",
          "CarrierTrust può indicare la modifica e conservare versioni precedenti e prove per sicurezza, moderazione, controversia e diritto.",
          "Una controversia risolta può restare storicamente rilevante, ma la soluzione deve essere descritta correttamente.",
        ],
      },
      {
        title: "10. Moderazione",
        paragraphs: [
          "CarrierTrust può controllare prima o dopo la pubblicazione senza obbligo generale. Il controllo può derivare da segnali automatici, report, prove, rischi legali o verifiche.",
          "Può chiedere chiarimenti, correggere formato, oscurare dati, cambiare etichette, limitare distribuzione, nascondere, rifiutare, rimuovere o limitare un account.",
          "Può considerare credibilità, pertinenza, prove, proporzionalità, interesse pubblico, diritti, ripetizione e legge. La pubblicazione non è approvazione.",
        ],
      },
      {
        title: "11. Risposte ufficiali",
        paragraphs: [
          "Un account autorizzato può rispondere secondo piano e regole. Si applicano gli stessi standard di accuratezza, pertinenza, riservatezza e rispetto.",
          "L’impresa può contestare, fornire contesto o descrivere misure, ma non minacciare, esporre dati inutili o fare accuse penali non supportate.",
          "Una recensione negativa non viene rimossa solo per disaccordo o fine del rapporto.",
        ],
      },
      {
        title: "12. Segnalazioni e ricorsi",
        paragraphs: [
          "Utenti e imprese possono segnalare contenuti contrari a Regole, Termini, diritti di terzi o legge, identificando il contenuto e spiegando il problema.",
          "La segnalazione non garantisce rimozione. CarrierTrust può chiedere prove, sentire le parti, conservare registri ed emettere un esito motivato.",
          "I contenuti presuntamente illegali devono seguire la pagina Legal. Le decisioni ammissibili possono essere impugnate lì.",
        ],
      },
      {
        title: "13. Violazioni ripetute",
        paragraphs: [
          "CarrierTrust può avvertire, limitare, sospendere o chiudere account per false recensioni ripetute, manipolazione, molestie, report abusivi, prove false o rappresentanza non autorizzata.",
          "Può considerare numero, gravità, frequenza, intenzione e impatto e conservare documenti.",
        ],
      },
      {
        title: "14. Privacy e riservatezza",
        paragraphs: [
          "I dati di recensioni, risposte, segnalazioni e prove sono trattati secondo l’Informativa privacy. Va comunicato solo quanto necessario.",
          "La riservatezza non può essere garantita quando la divulgazione è richiesta da legge, tutela dei diritti, controversia, autorità o tribunale.",
        ],
      },
      {
        title: "15. Ruolo di CarrierTrust",
        paragraphs: [
          "Recensioni e risposte restano responsabilità degli autori. CarrierTrust fornisce hosting, moderazione, etichette, logica di punteggio e funzioni.",
          "CarrierTrust non è tribunale, regolatore, agenzia di rating, recupero crediti o garante. Gli utenti svolgono la propria verifica.",
        ],
      },
      {
        title: "16. Modifiche, lingua e contatti",
        paragraphs: [
          "CarrierTrust può aggiornare le Regole per ragioni legali, di sicurezza, moderazione o prodotto. Versione e data sono in alto. Le modifiche importanti possono essere comunicate sulla piattaforma, via email o nuova accettazione.",
          "Le traduzioni sono fornite per comodità. La versione inglese prevale in caso di contrasto nei limiti della legge imperativa.",
          "Le domande possono essere inviate a support@carriertrust.eu.",
        ],
      },
    ],
    closing:
      "Una recensione deve aiutare un’altra impresa a comprendere un’esperienza commerciale reale. Sii fattuale, corretto, proporzionato e pronto a sostenere le affermazioni importanti.",
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
    <main className="min-h-screen select-none text-slate-900">
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

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
                <span>{t.version}</span>
                <span>{t.effectiveDate}</span>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-slate-200/70 bg-white/80 p-6 shadow-sm md:p-8">
                <div className="space-y-6 text-sm leading-7 text-slate-600 md:text-[15px]">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                    <div className="font-semibold text-slate-900">{t.operator}</div>
                    <div className="mt-2 space-y-1">
                      <p>{OPERATOR.name}</p>
                      <p>
                        {t.vatId}: {OPERATOR.vatId}
                      </p>
                      <p>
                        {t.legalAddress}: {OPERATOR.address}
                      </p>
                      <p>
                        {t.email}:{" "}
                        <a
                          className="underline underline-offset-4 hover:text-emerald-600"
                          href="/contact"
                        >
                          {OPERATOR.email}
                        </a>
                      </p>
                    </div>
                  </div>

                  {t.intro.map((paragraph, index) => (
                    <p key={`intro-${index}`}>{paragraph}</p>
                  ))}

                  {t.sections.map((section, sectionIndex) => (
                    <section key={`${section.title}-${sectionIndex}`}>
                      <h2 className="mb-2 text-xl font-semibold text-slate-900">
                        {section.title}
                      </h2>

                      <div className="space-y-3">
                        {section.paragraphs.map((paragraph, paragraphIndex) => (
                          <p key={`${sectionIndex}-p-${paragraphIndex}`}>{paragraph}</p>
                        ))}

                        {section.bullets && section.bullets.length > 0 ? (
                          <ul className="ml-6 list-disc space-y-1">
                            {section.bullets.map((bullet, bulletIndex) => (
                              <li key={`${sectionIndex}-b-${bulletIndex}`}>{bullet}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </section>
                  ))}

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-slate-700">
                    {t.closing}
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
