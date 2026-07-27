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
  dsaContact: string;
  preferredLanguage: string;
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
    badge: "Legal",
    title: "Legal Notice and Content Complaints",
    version: "Version 2.0",
    effectiveDate: "Effective 25 July 2026",
    operator: "Platform operator",
    vatId: "VAT ID",
    legalAddress: "Legal address",
    email: "General and legal contact",
    dsaContact: "DSA contact point",
    preferredLanguage: "Preferred communication language: English. CarrierTrust may also communicate in German, Russian, French, Spanish and Italian.",
    intro: [
      "This page explains how to send legal notices, reports concerning allegedly illegal content, counter-notices and requests for internal review relating to CarrierTrust.",
      "CarrierTrust accepts notices electronically. A notice does not automatically establish illegality, liability or a right to removal. Each sufficiently precise and substantiated notice is assessed in good faith in light of the information available, the Terms, the Review Policy and applicable law.",
    ],
    sections: [
      {
        title: "1. Scope of this procedure",
        paragraphs: [
          "Use this procedure for specific reviews, official replies, company-profile information, images, documents, account conduct or other content that you believe is illegal, infringes your rights or must be restricted under applicable law.",
          "Ordinary disagreements about service quality, payment, ratings or business performance are not automatically legal violations. They may still be reported under the Review Policy where the content is inaccurate, abusive, manipulated or unsupported.",
        ],
      },
      {
        title: "2. How to submit a notice",
        paragraphs: [
          "Send the notice to support@carriertrust.eu with the subject line “LEGAL NOTICE”. Submission by email is the current electronic notice mechanism.",
          "To allow effective assessment, provide information that is sufficiently precise, complete and understandable.",
        ],
        bullets: [
          "Your name and email address, and the organisation you represent, unless applicable law permits the notice without identification.",
          "A clear explanation of why the identified content is allegedly illegal or infringes a specific right.",
          "The exact URL and enough information to locate the review, reply, profile or other item.",
          "The relevant country, legal rule, court order, intellectual-property right, privacy right or other basis relied upon, where known.",
          "Supporting evidence, dates, documents or correspondence reasonably necessary to understand the allegation.",
          "A statement confirming your good-faith belief that the information in the notice is accurate and complete.",
          "Where you act for another person or company, evidence of authority where reasonably requested.",
        ],
      },
      {
        title: "3. Types of legal notice",
        paragraphs: [
          "Notices may concern defamation, unlawful threats, harassment, privacy, personal data, confidential information, intellectual property, impersonation, fraud-related misrepresentation, prohibited goods or services, sanctions, court orders or other unlawful content.",
          "For intellectual-property complaints, identify the protected work, mark or right, the allegedly infringing material and the basis on which you are authorised to act.",
          "For privacy or personal-data requests, identify the specific data and explain why publication or processing is unlawful. General data-protection rights should also follow the Privacy Policy.",
        ],
      },
      {
        title: "4. Confirmation and preliminary review",
        paragraphs: [
          "CarrierTrust will confirm receipt electronically without undue delay where the notice provides a working contact address. A case reference may be assigned.",
          "CarrierTrust may first assess whether the notice identifies specific content and contains enough information to support a legal assessment. If material information is missing, CarrierTrust may request clarification and may be unable to proceed until it is supplied.",
          "Receipt, acknowledgment or a request for clarification does not mean that CarrierTrust accepts the allegation or agrees to remove content.",
        ],
      },
      {
        title: "5. Assessment and possible action",
        paragraphs: [
          "CarrierTrust assesses notices in a timely, diligent, objective and non-arbitrary manner, taking account of the alleged legal basis, the precision and credibility of the notice, available evidence, the rights of affected parties, proportionality and applicable law.",
          "Depending on the circumstances, CarrierTrust may take no action, request further evidence, correct or redact information, add context, limit visibility, temporarily restrict access, remove content, preserve records, warn or restrict an account, or refer the matter to a competent authority.",
          "CarrierTrust does not guarantee a particular outcome or immediate removal. Urgent action may be taken where there is a credible and serious risk to safety, rights, security or legal compliance.",
        ],
      },
      {
        title: "6. Contact with the content author or affected company",
        paragraphs: [
          "CarrierTrust may contact the person who submitted the content or the affected company and may share the substance of the allegation and relevant supporting information where reasonably necessary for a fair assessment.",
          "Information may be withheld or limited where disclosure is prohibited by law, would create a material safety or security risk, compromise an investigation, expose unnecessary personal data or defeat the purpose of an urgent measure.",
          "Submitting a notice therefore does not guarantee that the notifier’s identity or all submitted information will remain confidential.",
        ],
      },
      {
        title: "7. Statements of reasons",
        paragraphs: [
          "Where CarrierTrust restricts content or an account because the information is considered illegal or incompatible with platform rules, CarrierTrust may provide the affected recipient with a statement of reasons as required by applicable law.",
          "The explanation may identify the measure taken, its territorial scope and duration, the main facts and circumstances, whether automated means materially contributed, the legal or contractual ground and available review options.",
          "CarrierTrust may limit the explanation where law, a binding order, safety, confidentiality or the protection of an investigation requires it.",
        ],
      },
      {
        title: "8. Counter-notices",
        paragraphs: [
          "An author or affected account may respond to a notice or restriction by sending a counter-notice to support@carriertrust.eu with the subject line “COUNTER-NOTICE” and the relevant case reference.",
          "The counter-notice should identify the disputed decision, explain why the content is lawful and compliant, correct any factual misunderstanding and include supporting evidence.",
          "A counter-notice does not automatically restore content. CarrierTrust may seek further information from either side and may maintain temporary restrictions while a credible legal or safety risk remains.",
        ],
      },
      {
        title: "9. Internal review and appeal",
        paragraphs: [
          "A notifier, content author or affected account may request an internal review of an eligible moderation decision by emailing support@carriertrust.eu with the subject line “APPEAL” and the case reference.",
          "The request should normally be made within six months after notification of the decision and should explain the alleged error or provide new relevant information.",
          "Where required by the Digital Services Act, the review will be available electronically and free of charge, handled in a timely and non-discriminatory manner and subject to qualified human supervision rather than decided solely by automated means.",
        ],
      },
      {
        title: "10. Out-of-court and regulatory options",
        paragraphs: [
          "Where the Digital Services Act applies, an eligible recipient may also have access to a certified out-of-court dispute settlement body. Availability and legal effect depend on the circumstances and applicable law.",
          "The Latvian Digital Services Coordinator is the Consumer Rights Protection Centre (Patērētāju tiesību aizsardzības centrs, PTAC). A person may contact the competent coordinator or another competent authority concerning alleged breaches of applicable digital-services law.",
          "Nothing on this page limits rights to seek judicial or administrative remedies.",
        ],
      },
      {
        title: "11. Orders from courts and authorities",
        paragraphs: [
          "CarrierTrust may act on valid and binding orders from courts, law-enforcement bodies, regulators and other competent authorities.",
          "An order should be sent through an official and verifiable channel and contain the information required by applicable law. CarrierTrust may verify authenticity, authority, scope, territorial effect and applicable deadlines.",
          "Where lawful and appropriate, CarrierTrust may inform the affected user of the order and action taken, unless the order or law prohibits disclosure.",
        ],
      },
      {
        title: "12. Preservation and disclosure of records",
        paragraphs: [
          "CarrierTrust may preserve relevant content, account records, technical logs, evidence, notices, decisions and correspondence where reasonably necessary for legal compliance, security, fraud prevention, disputes or legal claims.",
          "Removal from public view does not necessarily require immediate deletion from internal systems or backups.",
          "Information may be disclosed to advisers, insurers, courts, authorities, affected parties or service providers where legally required or reasonably necessary to establish, exercise or defend rights.",
        ],
      },
      {
        title: "13. Abuse of the notice process",
        paragraphs: [
          "Notices, counter-notices and appeals must be submitted honestly. It is prohibited to use this procedure to harass, censor legitimate criticism, gain commercial leverage, impersonate another person, submit forged evidence or make knowingly false statements.",
          "CarrierTrust may disregard manifestly unfounded or abusive submissions and may warn, limit or suspend accounts involved in repeated misuse. Serious abuse may be reported to competent authorities or relied upon in legal proceedings.",
        ],
      },
      {
        title: "14. No general monitoring or endorsement",
        paragraphs: [
          "CarrierTrust is not subject to a general obligation to monitor all user content or proactively determine every possible illegality. CarrierTrust may use moderation tools and automated signals but does not guarantee that every violation will be detected immediately.",
          "Publication, verification status, a company claim, a score, a badge, moderation history or the absence of removal does not mean that CarrierTrust endorses a company or confirms every statement.",
        ],
      },
      {
        title: "15. Privacy",
        paragraphs: [
          "Personal data submitted through this procedure is processed under the Privacy Policy for handling notices, communicating with parties, preserving evidence, complying with law and protecting rights.",
          "Do not send identity documents, unredacted bank information or other sensitive material unless it is specifically requested and necessary.",
        ],
      },
      {
        title: "16. Formal service and legal advice",
        paragraphs: [
          "Emailing support@carriertrust.eu does not by itself constitute CarrierTrust’s voluntary acceptance of formal service of court proceedings, official documents or jurisdiction, except where mandatory law provides otherwise or CarrierTrust expressly confirms acceptance.",
          "Information on this page is procedural information and not legal advice. Parties remain responsible for obtaining independent advice and meeting any limitation period, court deadline or statutory form requirement.",
        ],
      },
      {
        title: "17. Changes and language",
        paragraphs: [
          "CarrierTrust may update this procedure for legal, security, operational or product reasons. The version and effective date appear at the top.",
          "Translations are provided for convenience. The English version governs in the event of inconsistency, to the extent permitted by mandatory law.",
        ],
      },
    ],
    closing:
      "For a faster assessment, identify the exact content, explain the legal issue clearly, provide supporting material and use the subject line LEGAL NOTICE, COUNTER-NOTICE or APPEAL.",
  },

  de: {
    badge: "Rechtliches",
    title: "Rechtshinweise und Inhaltsbeschwerden",
    version: "Version 2.0",
    effectiveDate: "Gültig ab 25. Juli 2026",
    operator: "Plattformbetreiber",
    vatId: "USt-IdNr.",
    legalAddress: "Sitz",
    email: "Allgemeiner und rechtlicher Kontakt",
    dsaContact: "DSA-Kontaktstelle",
    preferredLanguage: "Bevorzugte Sprache: Englisch. CarrierTrust kann auch auf Deutsch, Russisch, Französisch, Spanisch und Italienisch kommunizieren.",
    intro: [
      "Diese Seite erklärt die Einreichung rechtlicher Hinweise, Meldungen zu mutmaßlich illegalen Inhalten, Gegenanzeigen und internen Überprüfungsanträgen.",
      "CarrierTrust nimmt Meldungen elektronisch entgegen. Eine Meldung beweist nicht automatisch Rechtswidrigkeit, Haftung oder einen Löschungsanspruch. Ausreichend genaue und begründete Meldungen werden anhand verfügbarer Informationen, Bedingungen, Bewertungsrichtlinie und Recht geprüft.",
    ],
    sections: [
      {
        title: "1. Anwendungsbereich",
        paragraphs: [
          "Nutzen Sie dieses Verfahren für konkrete Bewertungen, Antworten, Profildaten, Bilder, Dokumente, Kontoverhalten oder andere Inhalte, die Sie für rechtswidrig, rechtsverletzend oder beschränkungspflichtig halten.",
          "Gewöhnliche Meinungsverschiedenheiten über Leistung, Zahlung, Ratings oder Geschäftsverhalten sind nicht automatisch Rechtsverstöße, können aber nach der Bewertungsrichtlinie gemeldet werden.",
        ],
      },
      {
        title: "2. Meldung einreichen",
        paragraphs: [
          "Senden Sie die Meldung mit dem Betreff „LEGAL NOTICE“ an support@carriertrust.eu. E-Mail ist derzeit der elektronische Meldeweg.",
          "Die Angaben müssen ausreichend genau, vollständig und verständlich sein.",
        ],
        bullets: [
          "Name, E-Mail und vertretene Organisation, sofern das Recht keine Meldung ohne Identifizierung erlaubt.",
          "Klare Erklärung, warum der bezeichnete Inhalt rechtswidrig ist oder ein bestimmtes Recht verletzt.",
          "Exakte URL und ausreichende Angaben zum Auffinden des Inhalts.",
          "Betroffener Staat, Rechtsnorm, gerichtliche Anordnung, Schutzrecht, Datenschutzrecht oder sonstige Grundlage, soweit bekannt.",
          "Belege, Daten, Dokumente oder Korrespondenz, die zur Bewertung erforderlich sind.",
          "Gutgläubige Erklärung, dass die Angaben richtig und vollständig sind.",
          "Bei Vertretung Nachweis der Vollmacht, soweit angemessen verlangt.",
        ],
      },
      {
        title: "3. Arten rechtlicher Hinweise",
        paragraphs: [
          "Meldungen können Verleumdung, Drohung, Belästigung, Datenschutz, vertrauliche Informationen, geistiges Eigentum, Identitätstäuschung, betrugsbezogene Irreführung, verbotene Angebote, Sanktionen, gerichtliche Anordnungen oder andere Rechtswidrigkeit betreffen.",
          "Bei Schutzrechten sind Werk, Marke oder Recht, das beanstandete Material und die Vertretungsberechtigung zu benennen.",
          "Bei Datenschutz ist der konkrete Datensatz und die behauptete Rechtswidrigkeit zu erklären. Allgemeine Betroffenenrechte richten sich zusätzlich nach der Datenschutzerklärung.",
        ],
      },
      {
        title: "4. Bestätigung und Vorprüfung",
        paragraphs: [
          "CarrierTrust bestätigt den Eingang ohne unangemessene Verzögerung elektronisch, sofern eine funktionierende Kontaktadresse vorliegt. Eine Vorgangsnummer kann vergeben werden.",
          "Zunächst kann geprüft werden, ob konkreter Inhalt identifiziert und ausreichend Information vorgelegt wurde. Fehlende Angaben können nachgefordert werden.",
          "Bestätigung oder Nachfrage bedeutet keine Anerkennung des Vorwurfs oder Löschungszusage.",
        ],
      },
      {
        title: "5. Prüfung und Maßnahmen",
        paragraphs: [
          "Meldungen werden zeitnah, sorgfältig, objektiv und nicht willkürlich unter Berücksichtigung von Rechtsgrundlage, Genauigkeit, Glaubwürdigkeit, Beweisen, Rechten, Verhältnismäßigkeit und Recht geprüft.",
          "Möglich sind keine Maßnahme, Beweisanforderung, Korrektur, Schwärzung, Kontext, Sichtbarkeitsbegrenzung, vorübergehende Sperre, Entfernung, Beweissicherung, Kontomaßnahme oder Behördenweitergabe.",
          "Ein bestimmtes Ergebnis oder sofortige Entfernung wird nicht garantiert. Bei glaubhaftem schwerem Risiko kann dringend gehandelt werden.",
        ],
      },
      {
        title: "6. Kontakt mit Autor oder Unternehmen",
        paragraphs: [
          "CarrierTrust kann den Autor oder das betroffene Unternehmen kontaktieren und den wesentlichen Vorwurf und relevante Informationen für eine faire Prüfung mitteilen.",
          "Informationen können zurückgehalten werden, wenn Offenlegung gesetzlich verboten ist, Sicherheit gefährdet, Ermittlungen beeinträchtigt, unnötige persönliche Daten offenlegt oder eine Eilmaßnahme vereitelt.",
          "Die Identität und alle Angaben des Meldenden können daher nicht stets vertraulich bleiben.",
        ],
      },
      {
        title: "7. Begründung von Entscheidungen",
        paragraphs: [
          "Bei Einschränkung wegen Rechtswidrigkeit oder Regelverstoß kann CarrierTrust dem betroffenen Nutzer die gesetzlich erforderliche Begründung mitteilen.",
          "Sie kann Maßnahme, räumlichen Umfang, Dauer, wesentliche Tatsachen, automatisierte Beteiligung, Rechts- oder Vertragsgrund und Überprüfungsmöglichkeiten enthalten.",
          "Die Begründung kann aus Rechts-, Sicherheits-, Vertraulichkeits- oder Ermittlungsgründen begrenzt werden.",
        ],
      },
      {
        title: "8. Gegenanzeige",
        paragraphs: [
          "Autor oder betroffenes Konto können mit Betreff „COUNTER-NOTICE“ und Vorgangsnummer an support@carriertrust.eu reagieren.",
          "Die Gegenanzeige soll Entscheidung, Rechtmäßigkeit, Missverständnisse und Nachweise erklären.",
          "Sie führt nicht automatisch zur Wiederherstellung. Vorübergehende Maßnahmen können bei fortbestehendem Risiko aufrechterhalten werden.",
        ],
      },
      {
        title: "9. Interne Überprüfung",
        paragraphs: [
          "Meldende, Autoren oder betroffene Konten können eine berechtigte Entscheidung mit Betreff „APPEAL“ und Vorgangsnummer intern überprüfen lassen.",
          "Der Antrag sollte grundsätzlich binnen sechs Monaten nach Mitteilung gestellt werden und Fehler oder neue Informationen benennen.",
          "Soweit der DSA dies verlangt, erfolgt die Überprüfung elektronisch, kostenlos, zeitnah, diskriminierungsfrei und unter qualifizierter menschlicher Aufsicht.",
        ],
      },
      {
        title: "10. Außergerichtliche und behördliche Wege",
        paragraphs: [
          "Soweit der DSA gilt, kann Zugang zu einer zertifizierten außergerichtlichen Streitbeilegungsstelle bestehen.",
          "Lettischer Koordinator für digitale Dienste ist das Verbraucherschutzzentrum PTAC.",
          "Gerichtliche und verwaltungsrechtliche Rechtsbehelfe bleiben unberührt.",
        ],
      },
      {
        title: "11. Anordnungen von Gerichten und Behörden",
        paragraphs: [
          "CarrierTrust kann gültige bindende Anordnungen von Gerichten, Strafverfolgung, Regulatoren und zuständigen Behörden umsetzen.",
          "Anordnungen sind über einen offiziellen verifizierbaren Kanal zu senden. Echtheit, Zuständigkeit, Umfang, Gebiet und Fristen können geprüft werden.",
          "Soweit zulässig, kann der betroffene Nutzer informiert werden.",
        ],
      },
      {
        title: "12. Sicherung und Offenlegung",
        paragraphs: [
          "CarrierTrust kann Inhalte, Kontodaten, Logs, Beweise, Meldungen, Entscheidungen und Korrespondenz für Recht, Sicherheit, Betrugsprävention, Streit und Ansprüche sichern.",
          "Entfernung aus der Öffentlichkeit bedeutet nicht zwingend sofortige interne Löschung.",
          "Daten können an Berater, Versicherer, Gerichte, Behörden, Betroffene oder Anbieter weitergegeben werden, soweit gesetzlich oder zum Rechtsschutz erforderlich.",
        ],
      },
      {
        title: "13. Missbrauch",
        paragraphs: [
          "Meldungen, Gegenanzeigen und Beschwerden müssen ehrlich sein. Belästigung, Zensur legitimer Kritik, Druck, Identitätstäuschung, Fälschung und bewusste Falschaussagen sind verboten.",
          "Offensichtlich unbegründete oder missbräuchliche Eingaben können unbeachtet bleiben. Wiederholter Missbrauch kann zu Kontomaßnahmen, Behördenmeldung oder rechtlicher Verwendung führen.",
        ],
      },
      {
        title: "14. Keine allgemeine Überwachung oder Billigung",
        paragraphs: [
          "CarrierTrust muss nicht allgemein alle Inhalte überwachen oder jede mögliche Rechtswidrigkeit proaktiv feststellen. Automatische Signale können genutzt werden, ohne vollständige Erkennung zu garantieren.",
          "Veröffentlichung, Verifizierung, Claim, Score, Badge, Moderationshistorie oder Nichtlöschung bedeutet keine Billigung oder Bestätigung.",
        ],
      },
      {
        title: "15. Datenschutz",
        paragraphs: [
          "Personenbezogene Daten werden nach der Datenschutzerklärung zur Bearbeitung, Kommunikation, Beweissicherung, Rechtserfüllung und zum Rechtsschutz verarbeitet.",
          "Sensible Ausweise, ungeschwärzte Bankdaten oder ähnliche Unterlagen sind nur auf konkrete notwendige Anforderung zu senden.",
        ],
      },
      {
        title: "16. Förmliche Zustellung und Rechtsberatung",
        paragraphs: [
          "Eine E-Mail an support@carriertrust.eu stellt keine freiwillige Annahme förmlicher Zustellung, gerichtlicher Dokumente oder Gerichtsbarkeit dar, außer bei zwingendem Recht oder ausdrücklicher Bestätigung.",
          "Diese Seite enthält Verfahrensinformationen und keine Rechtsberatung. Fristen und Formanforderungen bleiben Sache der Parteien.",
        ],
      },
      {
        title: "17. Änderungen und Sprache",
        paragraphs: [
          "CarrierTrust kann das Verfahren aus rechtlichen, sicherheitsbezogenen, betrieblichen oder produktbezogenen Gründen aktualisieren. Version und Datum stehen oben.",
          "Übersetzungen dienen der Benutzerfreundlichkeit. Soweit zwingendes Recht dies erlaubt, ist bei Widersprüchen Englisch maßgeblich.",
        ],
      },
    ],
    closing:
      "Für eine schnelle Prüfung: exakten Inhalt bezeichnen, Rechtsproblem klar erklären, Belege beifügen und den Betreff LEGAL NOTICE, COUNTER-NOTICE oder APPEAL verwenden.",
  },

  ru: {
    badge: "Legal",
    title: "Юридические уведомления и жалобы на контент",
    version: "Версия 2.0",
    effectiveDate: "Действует с 25 июля 2026 года",
    operator: "Оператор платформы",
    vatId: "VAT ID",
    legalAddress: "Юридический адрес",
    email: "Общий и юридический контакт",
    dsaContact: "Контактная точка DSA",
    preferredLanguage: "Предпочтительный язык общения: английский. CarrierTrust также может общаться на немецком, русском, французском, испанском и итальянском языках.",
    intro: [
      "Эта страница устанавливает порядок подачи юридических уведомлений, сообщений о предположительно незаконном контенте, встречных уведомлений и запросов на внутренний пересмотр решений CarrierTrust.",
      "CarrierTrust принимает уведомления электронно. Само уведомление не доказывает незаконность, ответственность или право на удаление. Достаточно точное и обоснованное сообщение оценивается добросовестно с учётом доступных данных, Условий, Правил отзывов и применимого права.",
    ],
    sections: [
      {
        title: "1. Когда применяется процедура",
        paragraphs: [
          "Используйте её для конкретного отзыва, официального ответа, данных профиля, изображения, документа, поведения аккаунта или другого контента, который вы считаете незаконным, нарушающим права или подлежащим ограничению.",
          "Обычное несогласие с качеством услуги, оплатой, рейтингом или коммерческим поведением не является автоматически нарушением закона, но может быть заявлено по Правилам отзывов.",
        ],
      },
      {
        title: "2. Как направить уведомление",
        paragraphs: [
          "Отправьте письмо на support@carriertrust.eu с темой «LEGAL NOTICE». Email является текущим электронным механизмом уведомлений.",
          "Для эффективного рассмотрения сообщение должно быть достаточно точным, полным и понятным.",
        ],
        bullets: [
          "Имя, email и представляемая организация, кроме случаев, когда применимое право допускает уведомление без идентификации.",
          "Чёткое объяснение, почему конкретный контент предположительно незаконен или нарушает определённое право.",
          "Точный URL и сведения, позволяющие найти отзыв, ответ, профиль или другой материал.",
          "Страна, правовая норма, судебный акт, интеллектуальное право, право на приватность или другое основание — если известно.",
          "Доказательства, даты, документы или переписка, необходимые для понимания заявления.",
          "Подтверждение добросовестной уверенности в точности и полноте информации.",
          "При действиях за другое лицо или компанию — подтверждение полномочий по разумному запросу.",
        ],
      },
      {
        title: "3. Виды юридических уведомлений",
        paragraphs: [
          "Уведомления могут касаться диффамации, угроз, преследования, приватности, персональных данных, конфиденциальной информации, интеллектуальной собственности, выдачи себя за другое лицо, обманных утверждений, запрещённых товаров или услуг, санкций, судебных актов и иного незаконного контента.",
          "В жалобе на интеллектуальную собственность укажите защищаемый объект, нарушающий материал и основание ваших полномочий.",
          "В жалобе по персональным данным укажите конкретные данные и причину незаконности публикации или обработки. Общие права субъекта также реализуются по Политике конфиденциальности.",
        ],
      },
      {
        title: "4. Подтверждение и предварительная проверка",
        paragraphs: [
          "CarrierTrust подтверждает получение электронно без неоправданной задержки при наличии рабочего адреса. Обращению может быть присвоен номер.",
          "Сначала проверяется, указан ли конкретный контент и достаточно ли данных для оценки. При нехватке информации CarrierTrust вправе запросить уточнение и не продолжать до его получения.",
          "Подтверждение или уточняющий запрос не означает признания обвинения или согласия удалить контент.",
        ],
      },
      {
        title: "5. Рассмотрение и возможные меры",
        paragraphs: [
          "CarrierTrust рассматривает уведомления своевременно, внимательно, объективно и без произвола, учитывая правовое основание, точность, достоверность, доказательства, права сторон, соразмерность и закон.",
          "Возможны отсутствие мер, запрос доказательств, исправление, редактирование данных, контекст, ограничение видимости, временное скрытие, удаление, сохранение материалов, предупреждение или ограничение аккаунта либо обращение к органу.",
          "Определённый результат или немедленное удаление не гарантируется. При достоверном серьёзном риске могут применяться срочные меры.",
        ],
      },
      {
        title: "6. Связь с автором и компанией",
        paragraphs: [
          "CarrierTrust вправе связаться с автором или затронутой компанией и передать сущность обвинения и необходимые материалы для справедливой оценки.",
          "Информация может не раскрываться, когда это запрещено законом, создаёт риск безопасности, мешает расследованию, раскрывает избыточные данные или делает срочную меру бессмысленной.",
          "Поэтому личность заявителя и все сведения не всегда могут оставаться конфиденциальными.",
        ],
      },
      {
        title: "7. Мотивировка решения",
        paragraphs: [
          "При ограничении контента или аккаунта из-за незаконности либо нарушения правил CarrierTrust может направить затронутому пользователю мотивировку, требуемую законом.",
          "Она может включать меру, территорию, срок, основные факты, участие автоматизации, правовое или договорное основание и варианты пересмотра.",
          "Объём объяснения может быть ограничен законом, обязательным актом, безопасностью, конфиденциальностью или защитой расследования.",
        ],
      },
      {
        title: "8. Встречное уведомление",
        paragraphs: [
          "Автор или затронутый аккаунт вправе ответить письмом на support@carriertrust.eu с темой «COUNTER-NOTICE» и номером дела.",
          "Следует указать спорное решение, объяснить законность и соответствие правилам, исправить фактическое недоразумение и приложить доказательства.",
          "Встречное уведомление не восстанавливает контент автоматически. Временное ограничение может сохраняться при серьёзном риске.",
        ],
      },
      {
        title: "9. Внутренний пересмотр и апелляция",
        paragraphs: [
          "Заявитель, автор или затронутый аккаунт вправе запросить пересмотр допустимого решения письмом с темой «APPEAL» и номером дела.",
          "Запрос обычно подаётся в течение шести месяцев после уведомления о решении и должен объяснять ошибку или новые существенные сведения.",
          "Когда этого требует DSA, пересмотр доступен электронно и бесплатно, проводится своевременно, без дискриминации и под квалифицированным человеческим контролем, а не исключительно автоматически.",
        ],
      },
      {
        title: "10. Внесудебные и регуляторные варианты",
        paragraphs: [
          "Когда применяется DSA, допустимый пользователь может иметь доступ к сертифицированному органу внесудебного разрешения споров.",
          "Координатором цифровых услуг в Латвии является Центр защиты прав потребителей — Patērētāju tiesību aizsardzības centrs (PTAC).",
          "Ничто здесь не ограничивает право на судебную или административную защиту.",
        ],
      },
      {
        title: "11. Акты судов и органов",
        paragraphs: [
          "CarrierTrust вправе исполнять действительные обязательные акты судов, правоохранительных, регулирующих и иных компетентных органов.",
          "Акт должен поступить по официальному проверяемому каналу и содержать требуемые данные. CarrierTrust вправе проверить подлинность, компетенцию, объём, территорию и сроки.",
          "Когда это разрешено и уместно, затронутый пользователь может быть уведомлён.",
        ],
      },
      {
        title: "12. Сохранение и раскрытие материалов",
        paragraphs: [
          "CarrierTrust вправе сохранять контент, данные аккаунта, технические логи, доказательства, уведомления, решения и переписку для закона, безопасности, предотвращения мошенничества, споров и юридических требований.",
          "Удаление из публичного доступа не означает обязательного немедленного удаления из внутренних систем и резервных копий.",
          "Материалы могут раскрываться консультантам, страховщикам, судам, органам, затронутым лицам и провайдерам, когда это требуется законом или разумно необходимо для защиты прав.",
        ],
      },
      {
        title: "13. Злоупотребление процедурой",
        paragraphs: [
          "Уведомления, встречные уведомления и апелляции должны быть честными. Запрещено использовать процедуру для преследования, цензуры законной критики, коммерческого давления, подделки личности или доказательств и заведомо ложных заявлений.",
          "Явно необоснованные или злоупотребительные обращения могут не рассматриваться. Повторное злоупотребление может повлечь меры к аккаунту, сообщение органам или использование в юридическом процессе.",
        ],
      },
      {
        title: "14. Нет общей обязанности мониторинга или одобрения",
        paragraphs: [
          "CarrierTrust не обязан в общем порядке контролировать весь пользовательский контент или заранее определять каждое возможное нарушение. Могут использоваться инструменты и автоматические сигналы без гарантии немедленного обнаружения.",
          "Публикация, verification, claim, score, badge, история модерации или отсутствие удаления не означает одобрения компании или подтверждения каждого утверждения.",
        ],
      },
      {
        title: "15. Персональные данные",
        paragraphs: [
          "Данные процедуры обрабатываются по Политике конфиденциальности для рассмотрения, связи со сторонами, сохранения доказательств, выполнения закона и защиты прав.",
          "Не отправляйте документы личности, неотредактированные банковские данные и чувствительные материалы без конкретного необходимого запроса.",
        ],
      },
      {
        title: "16. Официальное вручение и юридическая консультация",
        paragraphs: [
          "Письмо на support@carriertrust.eu само по себе не означает добровольного принятия официального вручения судебных документов, юрисдикции или процессуальных актов, кроме случаев обязательного закона или прямого подтверждения CarrierTrust.",
          "Эта страница содержит процедурную информацию, а не юридическую консультацию. Стороны сами отвечают за независимый совет, сроки и требования к форме.",
        ],
      },
      {
        title: "17. Изменения и язык",
        paragraphs: [
          "CarrierTrust вправе обновить процедуру по юридическим, безопасностным, операционным или продуктовым причинам. Версия и дата указаны сверху.",
          "Переводы предоставляются для удобства. При расхождении английская версия имеет преимущественную силу, насколько это допускает обязательное право.",
        ],
      },
    ],
    closing:
      "Для быстрого рассмотрения укажите точный контент, ясно объясните юридическую проблему, приложите материалы и используйте тему LEGAL NOTICE, COUNTER-NOTICE или APPEAL.",
  },

  fr: {
    badge: "Juridique",
    title: "Mentions juridiques et réclamations relatives au contenu",
    version: "Version 2.0",
    effectiveDate: "En vigueur le 25 juillet 2026",
    operator: "Exploitant de la plateforme",
    vatId: "N° de TVA",
    legalAddress: "Siège social",
    email: "Contact général et juridique",
    dsaContact: "Point de contact DSA",
    preferredLanguage: "Langue de communication privilégiée : anglais. CarrierTrust peut également communiquer en allemand, russe, français, espagnol et italien.",
    intro: [
      "Cette page explique comment envoyer des notifications juridiques, signalements de contenu prétendument illégal, contre-notifications et demandes de réexamen interne.",
      "CarrierTrust accepte les notifications par voie électronique. Une notification ne prouve pas automatiquement l’illégalité, la responsabilité ou un droit au retrait. Toute notification suffisamment précise et étayée est examinée de bonne foi.",
    ],
    sections: [
      {
        title: "1. Champ d’application",
        paragraphs: [
          "Utilisez cette procédure pour un avis, une réponse, un profil, une image, un document, un comportement de compte ou autre contenu spécifique que vous estimez illégal ou attentatoire à des droits.",
          "Un désaccord ordinaire sur service, paiement, note ou conduite commerciale n’est pas automatiquement illégal, mais peut être signalé selon les Règles des avis.",
        ],
      },
      {
        title: "2. Envoyer une notification",
        paragraphs: [
          "Envoyez-la à support@carriertrust.eu avec l’objet « LEGAL NOTICE ». L’email est actuellement le mécanisme électronique.",
          "La notification doit être suffisamment précise, complète et compréhensible.",
        ],
        bullets: [
          "Nom, email et organisation représentée, sauf anonymat permis par la loi.",
          "Explication claire de l’illégalité alléguée ou du droit précis violé.",
          "URL exacte et informations permettant de localiser le contenu.",
          "Pays, règle juridique, décision, droit intellectuel, vie privée ou autre base, si connue.",
          "Preuves, dates, documents ou correspondance nécessaires.",
          "Déclaration de bonne foi sur l’exactitude et l’exhaustivité.",
          "Preuve des pouvoirs en cas de représentation, si raisonnablement demandée.",
        ],
      },
      {
        title: "3. Types de notification",
        paragraphs: [
          "Les notifications peuvent concerner diffamation, menaces, harcèlement, vie privée, données personnelles, confidentialité, propriété intellectuelle, usurpation, tromperie liée à la fraude, offres interdites, sanctions, décisions judiciaires ou autre illégalité.",
          "Pour la propriété intellectuelle, identifiez le droit protégé, le contenu litigieux et votre qualité.",
          "Pour les données personnelles, identifiez les données et la raison de l’illégalité. Les droits généraux suivent aussi la Politique de confidentialité.",
        ],
      },
      {
        title: "4. Accusé de réception et examen initial",
        paragraphs: [
          "CarrierTrust confirme la réception électroniquement sans retard indu si une adresse valable est fournie. Une référence peut être attribuée.",
          "CarrierTrust peut vérifier si le contenu est précis et les informations suffisantes. Des précisions peuvent être demandées.",
          "L’accusé de réception ou une demande d’information n’est pas une acceptation de l’allégation ni une promesse de retrait.",
        ],
      },
      {
        title: "5. Examen et mesures",
        paragraphs: [
          "Les notifications sont examinées rapidement, diligemment, objectivement et sans arbitraire selon la base juridique, la précision, la crédibilité, les preuves, les droits, la proportionnalité et la loi.",
          "CarrierTrust peut ne rien faire, demander des preuves, corriger, expurger, contextualiser, limiter, masquer, retirer, conserver, avertir, restreindre un compte ou saisir une autorité.",
          "Aucun résultat ni retrait immédiat n’est garanti. Une mesure urgente peut être prise face à un risque grave et crédible.",
        ],
      },
      {
        title: "6. Contact avec l’auteur ou l’entreprise",
        paragraphs: [
          "CarrierTrust peut contacter l’auteur ou l’entreprise et partager l’essentiel de l’allégation et les informations nécessaires à un examen équitable.",
          "Des éléments peuvent être retenus si la loi l’exige, si la sécurité ou une enquête serait compromise, si des données inutiles seraient révélées ou si une mesure urgente serait neutralisée.",
          "L’identité et toutes les informations du notifiant ne peuvent donc pas toujours rester confidentielles.",
        ],
      },
      {
        title: "7. Motivation",
        paragraphs: [
          "Lorsqu’un contenu ou compte est restreint pour illégalité ou violation des règles, CarrierTrust peut communiquer la motivation exigée par la loi.",
          "Elle peut préciser mesure, territoire, durée, faits, automatisation, base juridique ou contractuelle et voies de recours.",
          "Elle peut être limitée pour des raisons légales, de sécurité, confidentialité ou enquête.",
        ],
      },
      {
        title: "8. Contre-notification",
        paragraphs: [
          "L’auteur ou le compte concerné peut écrire à support@carriertrust.eu avec l’objet « COUNTER-NOTICE » et la référence.",
          "Il doit identifier la décision, expliquer la légalité et la conformité, corriger les faits et joindre les preuves.",
          "La contre-notification ne rétablit pas automatiquement le contenu. Une restriction temporaire peut rester en vigueur.",
        ],
      },
      {
        title: "9. Réexamen interne",
        paragraphs: [
          "Le notifiant, l’auteur ou le compte concerné peut demander le réexamen d’une décision éligible avec l’objet « APPEAL » et la référence.",
          "La demande devrait être faite dans les six mois et expliquer l’erreur ou présenter des éléments nouveaux.",
          "Lorsque le DSA l’exige, le réexamen est électronique, gratuit, rapide, non discriminatoire et sous supervision humaine qualifiée.",
        ],
      },
      {
        title: "10. Voies extrajudiciaires et autorités",
        paragraphs: [
          "Lorsque le DSA s’applique, un organisme extrajudiciaire certifié peut être disponible.",
          "Le coordinateur letton des services numériques est le Centre de protection des consommateurs PTAC.",
          "Les voies judiciaires et administratives restent disponibles.",
        ],
      },
      {
        title: "11. Ordres des tribunaux et autorités",
        paragraphs: [
          "CarrierTrust peut exécuter les ordres valides et contraignants des tribunaux et autorités compétentes.",
          "Ils doivent être transmis par un canal officiel vérifiable. Authenticité, compétence, portée, territoire et délais peuvent être contrôlés.",
          "L’utilisateur concerné peut être informé lorsque cela est légal et approprié.",
        ],
      },
      {
        title: "12. Conservation et communication",
        paragraphs: [
          "CarrierTrust peut conserver contenus, comptes, logs, preuves, notifications, décisions et correspondance pour droit, sécurité, fraude, litiges et réclamations.",
          "Le retrait public n’impose pas nécessairement l’effacement interne immédiat.",
          "Les données peuvent être communiquées aux conseils, assureurs, tribunaux, autorités, parties ou prestataires si nécessaire.",
        ],
      },
      {
        title: "13. Abus",
        paragraphs: [
          "Notifications, contre-notifications et recours doivent être honnêtes. Harcèlement, censure de critique légitime, pression commerciale, usurpation, fausses preuves et déclarations conscientes sont interdits.",
          "Les demandes manifestement infondées ou abusives peuvent être écartées. Les abus répétés peuvent entraîner des restrictions, signalements ou actions juridiques.",
        ],
      },
      {
        title: "14. Absence de surveillance générale ou d’approbation",
        paragraphs: [
          "CarrierTrust n’a pas d’obligation générale de surveiller tous les contenus ni de détecter proactivement toute illégalité. Des outils peuvent être utilisés sans garantie de détection immédiate.",
          "Publication, vérification, claim, score, badge, modération ou absence de retrait n’est pas une approbation.",
        ],
      },
      {
        title: "15. Vie privée",
        paragraphs: [
          "Les données sont traitées selon la Politique de confidentialité pour examiner, communiquer, conserver les preuves, respecter la loi et protéger les droits.",
          "N’envoyez pas de pièce d’identité, donnée bancaire non expurgée ou information sensible sans demande spécifique et nécessité.",
        ],
      },
      {
        title: "16. Signification formelle et conseil juridique",
        paragraphs: [
          "Un email à support@carriertrust.eu ne vaut pas acceptation volontaire de signification formelle, documents judiciaires ou juridiction, sauf loi impérative ou confirmation expresse.",
          "Cette page fournit une procédure et non un conseil juridique. Les parties restent responsables des conseils, délais et formes.",
        ],
      },
      {
        title: "17. Modifications et langue",
        paragraphs: [
          "CarrierTrust peut modifier la procédure pour des raisons juridiques, de sécurité, opérationnelles ou produit. Version et date figurent en haut.",
          "Les traductions sont fournies par commodité. La version anglaise prévaut dans la mesure permise par la loi impérative.",
        ],
      },
    ],
    closing:
      "Pour un examen rapide, identifiez le contenu exact, expliquez clairement le problème juridique, joignez les éléments et utilisez LEGAL NOTICE, COUNTER-NOTICE ou APPEAL.",
  },

  es: {
    badge: "Legal",
    title: "Aviso legal y reclamaciones sobre contenido",
    version: "Versión 2.0",
    effectiveDate: "En vigor desde el 25 de julio de 2026",
    operator: "Operador de la plataforma",
    vatId: "N.º de IVA",
    legalAddress: "Domicilio social",
    email: "Contacto general y legal",
    dsaContact: "Punto de contacto DSA",
    preferredLanguage: "Idioma preferido: inglés. CarrierTrust también puede comunicarse en alemán, ruso, francés, español e italiano.",
    intro: [
      "Esta página explica cómo enviar avisos legales, reportes de contenido presuntamente ilegal, contraavisos y solicitudes de revisión interna.",
      "CarrierTrust acepta avisos electrónicos. Un aviso no demuestra automáticamente ilegalidad, responsabilidad o derecho de retirada. Los avisos suficientemente precisos y fundamentados se evalúan de buena fe.",
    ],
    sections: [
      {
        title: "1. Alcance",
        paragraphs: [
          "Usa este proceso para una reseña, respuesta, perfil, imagen, documento, conducta de cuenta u otro contenido específico que consideres ilegal o lesivo de derechos.",
          "Un desacuerdo ordinario sobre servicio, pago, nota o conducta comercial no es automáticamente ilegal, aunque puede reportarse según las Normas de reseñas.",
        ],
      },
      {
        title: "2. Enviar un aviso",
        paragraphs: [
          "Envía el aviso a support@carriertrust.eu con asunto «LEGAL NOTICE». El email es el mecanismo electrónico actual.",
          "Debe ser suficientemente preciso, completo y comprensible.",
        ],
        bullets: [
          "Nombre, email y organización, salvo anonimato permitido por la ley.",
          "Explicación clara de por qué el contenido es ilegal o vulnera un derecho específico.",
          "URL exacta e información para localizarlo.",
          "País, norma, resolución, propiedad intelectual, privacidad u otra base, si se conoce.",
          "Pruebas, fechas, documentos o correspondencia necesarios.",
          "Declaración de buena fe sobre exactitud e integridad.",
          "Prueba de autoridad al actuar por otra persona o empresa, si se solicita razonablemente.",
        ],
      },
      {
        title: "3. Tipos de aviso",
        paragraphs: [
          "Pueden referirse a difamación, amenazas, acoso, privacidad, datos, confidencialidad, propiedad intelectual, suplantación, engaño relacionado con fraude, ofertas prohibidas, sanciones, órdenes o contenido ilegal.",
          "Para propiedad intelectual identifica el derecho, material y autoridad.",
          "Para privacidad identifica los datos y la razón de ilegalidad. Los derechos generales siguen también la Política de privacidad.",
        ],
      },
      {
        title: "4. Confirmación y revisión inicial",
        paragraphs: [
          "CarrierTrust confirma electrónicamente la recepción sin demora indebida si existe un contacto válido. Puede asignarse referencia.",
          "Puede comprobar si se identifica contenido concreto y hay información suficiente. Puede pedir aclaraciones.",
          "Confirmar o pedir información no acepta la acusación ni promete retirada.",
        ],
      },
      {
        title: "5. Evaluación y medidas",
        paragraphs: [
          "CarrierTrust evalúa de manera oportuna, diligente, objetiva y no arbitraria considerando base legal, precisión, credibilidad, pruebas, derechos, proporcionalidad y ley.",
          "Puede no actuar, pedir pruebas, corregir, ocultar datos, añadir contexto, limitar, ocultar, retirar, preservar, advertir, restringir cuenta o acudir a autoridad.",
          "No se garantiza resultado ni retirada inmediata. Puede haber acción urgente ante riesgo grave creíble.",
        ],
      },
      {
        title: "6. Contacto con autor o empresa",
        paragraphs: [
          "CarrierTrust puede contactar al autor o empresa y compartir la esencia y material necesario para una evaluación justa.",
          "Puede retener información por ley, seguridad, investigación, datos innecesarios o urgencia.",
          "La identidad y toda la información del notificante no siempre pueden ser confidenciales.",
        ],
      },
      {
        title: "7. Motivación",
        paragraphs: [
          "Al restringir por ilegalidad o reglas, CarrierTrust puede comunicar la motivación exigida por ley.",
          "Puede incluir medida, territorio, duración, hechos, automatización, base y opciones de revisión.",
          "Puede limitarse por ley, seguridad, confidencialidad o investigación.",
        ],
      },
      {
        title: "8. Contraaviso",
        paragraphs: [
          "El autor o cuenta puede escribir a support@carriertrust.eu con asunto «COUNTER-NOTICE» y referencia.",
          "Debe identificar la decisión, explicar legalidad y cumplimiento, corregir hechos y aportar pruebas.",
          "No restaura automáticamente. Puede mantenerse una restricción temporal.",
        ],
      },
      {
        title: "9. Revisión interna",
        paragraphs: [
          "Notificante, autor o cuenta puede pedir revisión de una decisión elegible con asunto «APPEAL» y referencia.",
          "Debe solicitarse normalmente dentro de seis meses y explicar error o información nueva.",
          "Cuando lo exige el DSA, la revisión es electrónica, gratuita, oportuna, no discriminatoria y supervisada por personas cualificadas.",
        ],
      },
      {
        title: "10. Vías extrajudiciales y autoridades",
        paragraphs: [
          "Cuando se aplique el DSA, puede existir un organismo certificado de resolución extrajudicial.",
          "El coordinador letón de servicios digitales es el Centro de Protección de los Derechos del Consumidor PTAC.",
          "No se limitan recursos judiciales o administrativos.",
        ],
      },
      {
        title: "11. Órdenes de tribunales y autoridades",
        paragraphs: [
          "CarrierTrust puede cumplir órdenes válidas y vinculantes de tribunales y autoridades.",
          "Deben enviarse por canal oficial verificable. Puede verificarse autenticidad, competencia, alcance, territorio y plazo.",
          "El usuario puede ser informado cuando sea legal y apropiado.",
        ],
      },
      {
        title: "12. Conservación y comunicación",
        paragraphs: [
          "CarrierTrust puede conservar contenido, cuentas, logs, pruebas, avisos, decisiones y correspondencia para ley, seguridad, fraude, disputas y reclamaciones.",
          "Retirar de público no implica eliminación interna inmediata.",
          "Puede comunicarse a asesores, aseguradoras, tribunales, autoridades, partes o proveedores cuando sea necesario.",
        ],
      },
      {
        title: "13. Abuso",
        paragraphs: [
          "Avisos, contraavisos y recursos deben ser honestos. Se prohíbe acoso, censura de crítica legítima, presión, suplantación, pruebas falsas y declaraciones conscientemente falsas.",
          "Las solicitudes manifiestamente infundadas o abusivas pueden ignorarse. El abuso repetido puede causar restricciones, reporte o acción legal.",
        ],
      },
      {
        title: "14. Sin vigilancia general ni respaldo",
        paragraphs: [
          "CarrierTrust no tiene obligación general de vigilar todo el contenido ni detectar proactivamente toda ilegalidad. Puede usar herramientas sin garantizar detección inmediata.",
          "Publicación, verificación, claim, score, badge, moderación o falta de retirada no significa respaldo.",
        ],
      },
      {
        title: "15. Privacidad",
        paragraphs: [
          "Los datos se tratan según la Política de privacidad para gestionar, comunicar, preservar pruebas, cumplir ley y proteger derechos.",
          "No envíes documentos de identidad, banco sin ocultar o material sensible sin petición específica y necesidad.",
        ],
      },
      {
        title: "16. Notificación formal y asesoramiento",
        paragraphs: [
          "Un email a support@carriertrust.eu no constituye aceptación voluntaria de notificación procesal, documentos judiciales o jurisdicción, salvo ley imperativa o confirmación expresa.",
          "Esta página es información procedimental, no asesoramiento jurídico. Las partes responden de asesoramiento, plazos y formas.",
        ],
      },
      {
        title: "17. Cambios e idioma",
        paragraphs: [
          "CarrierTrust puede actualizar el proceso por motivos legales, de seguridad, operativos o de producto. Versión y fecha figuran arriba.",
          "Las traducciones se ofrecen por comodidad. La versión inglesa prevalece cuando lo permite la ley imperativa.",
        ],
      },
    ],
    closing:
      "Para una revisión rápida, identifica el contenido exacto, explica claramente el problema legal, adjunta material y usa LEGAL NOTICE, COUNTER-NOTICE o APPEAL.",
  },

  it: {
    badge: "Legale",
    title: "Avviso legale e reclami sui contenuti",
    version: "Versione 2.0",
    effectiveDate: "In vigore dal 25 luglio 2026",
    operator: "Gestore della piattaforma",
    vatId: "Partita IVA",
    legalAddress: "Sede legale",
    email: "Contatto generale e legale",
    dsaContact: "Punto di contatto DSA",
    preferredLanguage: "Lingua preferita: inglese. CarrierTrust può comunicare anche in tedesco, russo, francese, spagnolo e italiano.",
    intro: [
      "Questa pagina spiega come inviare notifiche legali, segnalazioni di contenuti presumibilmente illegali, contro-notifiche e richieste di riesame interno.",
      "CarrierTrust accetta notifiche elettroniche. Una notifica non dimostra automaticamente illegalità, responsabilità o diritto alla rimozione. Le notifiche sufficientemente precise e motivate sono valutate in buona fede.",
    ],
    sections: [
      {
        title: "1. Ambito",
        paragraphs: [
          "Usa la procedura per una recensione, risposta, profilo, immagine, documento, condotta dell’account o altro contenuto specifico ritenuto illecito o lesivo di diritti.",
          "Un normale disaccordo su servizio, pagamento, rating o condotta commerciale non è automaticamente illecito, ma può essere segnalato secondo le Regole recensioni.",
        ],
      },
      {
        title: "2. Inviare una notifica",
        paragraphs: [
          "Inviala a support@carriertrust.eu con oggetto «LEGAL NOTICE». L’email è l’attuale meccanismo elettronico.",
          "Deve essere sufficientemente precisa, completa e comprensibile.",
        ],
        bullets: [
          "Nome, email e organizzazione, salvo anonimato consentito.",
          "Spiegazione chiara dell’illegalità o del diritto specifico violato.",
          "URL esatto e informazioni per localizzare il contenuto.",
          "Paese, norma, ordine, diritto intellettuale, privacy o altra base, se nota.",
          "Prove, date, documenti o corrispondenza necessari.",
          "Dichiarazione in buona fede di accuratezza e completezza.",
          "Prova dei poteri quando si agisce per altri, se ragionevolmente richiesta.",
        ],
      },
      {
        title: "3. Tipi di notifica",
        paragraphs: [
          "Possono riguardare diffamazione, minacce, molestie, privacy, dati, riservatezza, proprietà intellettuale, impersonificazione, inganno legato a frode, offerte vietate, sanzioni, ordini o altro illecito.",
          "Per proprietà intellettuale identifica diritto, materiale e autorità.",
          "Per privacy identifica i dati e la ragione di illegalità. I diritti generali seguono anche l’Informativa privacy.",
        ],
      },
      {
        title: "4. Conferma e controllo iniziale",
        paragraphs: [
          "CarrierTrust conferma elettronicamente la ricezione senza indebito ritardo se esiste un contatto valido. Può assegnare un riferimento.",
          "Può verificare contenuto specifico e sufficienza delle informazioni e chiedere chiarimenti.",
          "Conferma o richiesta di chiarimenti non accetta l’accusa né promette rimozione.",
        ],
      },
      {
        title: "5. Valutazione e misure",
        paragraphs: [
          "CarrierTrust valuta in modo tempestivo, diligente, obiettivo e non arbitrario considerando base legale, precisione, credibilità, prove, diritti, proporzionalità e legge.",
          "Può non agire, chiedere prove, correggere, oscurare, contestualizzare, limitare, nascondere, rimuovere, conservare, avvertire, limitare account o coinvolgere un’autorità.",
          "Non garantisce risultato o rimozione immediata. Può agire urgentemente per rischio grave credibile.",
        ],
      },
      {
        title: "6. Contatto con autore o impresa",
        paragraphs: [
          "CarrierTrust può contattare autore o impresa e condividere l’essenza e il materiale necessario per una valutazione equa.",
          "Può trattenere informazioni per legge, sicurezza, indagine, dati non necessari o urgenza.",
          "Identità e tutte le informazioni del segnalante non possono sempre restare riservate.",
        ],
      },
      {
        title: "7. Motivazione",
        paragraphs: [
          "Quando limita per illegalità o regole, CarrierTrust può fornire la motivazione richiesta dalla legge.",
          "Può includere misura, territorio, durata, fatti, automazione, base e riesame.",
          "Può essere limitata per legge, sicurezza, riservatezza o indagine.",
        ],
      },
      {
        title: "8. Contro-notifica",
        paragraphs: [
          "Autore o account può scrivere a support@carriertrust.eu con oggetto «COUNTER-NOTICE» e riferimento.",
          "Deve identificare decisione, legalità, conformità, errori e prove.",
          "Non ripristina automaticamente. Può restare una limitazione temporanea.",
        ],
      },
      {
        title: "9. Riesame interno",
        paragraphs: [
          "Segnalante, autore o account può chiedere riesame di una decisione ammissibile con oggetto «APPEAL» e riferimento.",
          "Va normalmente richiesto entro sei mesi e deve indicare errore o nuovi elementi.",
          "Quando richiesto dal DSA, è elettronico, gratuito, tempestivo, non discriminatorio e sotto controllo umano qualificato.",
        ],
      },
      {
        title: "10. Opzioni extragiudiziali e autorità",
        paragraphs: [
          "Quando si applica il DSA può essere disponibile un organismo certificato di risoluzione extragiudiziale.",
          "Il coordinatore lettone dei servizi digitali è il Centro per la tutela dei diritti dei consumatori PTAC.",
          "Restano disponibili rimedi giudiziari e amministrativi.",
        ],
      },
      {
        title: "11. Ordini di tribunali e autorità",
        paragraphs: [
          "CarrierTrust può eseguire ordini validi e vincolanti di tribunali e autorità.",
          "Devono arrivare da canale ufficiale verificabile. Può controllare autenticità, competenza, portata, territorio e termini.",
          "L’utente può essere informato quando legale e appropriato.",
        ],
      },
      {
        title: "12. Conservazione e comunicazione",
        paragraphs: [
          "CarrierTrust può conservare contenuti, account, log, prove, notifiche, decisioni e corrispondenza per legge, sicurezza, frode, controversie e pretese.",
          "La rimozione pubblica non richiede eliminazione interna immediata.",
          "Può comunicare a consulenti, assicuratori, tribunali, autorità, parti o fornitori quando necessario.",
        ],
      },
      {
        title: "13. Abuso",
        paragraphs: [
          "Notifiche, contro-notifiche e ricorsi devono essere onesti. Sono vietati molestie, censura di critica legittima, pressione, impersonificazione, prove false e dichiarazioni consapevolmente false.",
          "Le richieste manifestamente infondate o abusive possono essere ignorate. L’abuso ripetuto può causare limitazioni, segnalazione o azione legale.",
        ],
      },
      {
        title: "14. Nessun monitoraggio generale o approvazione",
        paragraphs: [
          "CarrierTrust non ha obbligo generale di monitorare tutto o rilevare proattivamente ogni illecito. Può usare strumenti senza garantire rilevamento immediato.",
          "Pubblicazione, verifica, claim, score, badge, moderazione o mancata rimozione non significa approvazione.",
        ],
      },
      {
        title: "15. Privacy",
        paragraphs: [
          "I dati sono trattati secondo l’Informativa privacy per gestione, comunicazione, prove, legge e tutela dei diritti.",
          "Non inviare identità, dati bancari non oscurati o materiale sensibile senza richiesta specifica e necessità.",
        ],
      },
      {
        title: "16. Notifica formale e consulenza",
        paragraphs: [
          "Un’email a support@carriertrust.eu non costituisce accettazione volontaria di notifica processuale, documenti giudiziari o giurisdizione, salvo legge imperativa o conferma espressa.",
          "Questa pagina è informazione procedurale, non consulenza legale. Le parti sono responsabili di consulenza, termini e forme.",
        ],
      },
      {
        title: "17. Modifiche e lingua",
        paragraphs: [
          "CarrierTrust può aggiornare la procedura per ragioni legali, di sicurezza, operative o di prodotto. Versione e data sono in alto.",
          "Le traduzioni sono fornite per comodità. La versione inglese prevale nei limiti della legge imperativa.",
        ],
      },
    ],
    closing:
      "Per un esame rapido, identifica il contenuto esatto, spiega chiaramente il problema legale, allega il materiale e usa LEGAL NOTICE, COUNTER-NOTICE o APPEAL.",
  },
};

export default function LegalPage() {
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
                      <p>
                        {t.dsaContact}:{" "}
                        <a
                          className="underline underline-offset-4 hover:text-emerald-600"
                          href="/contact"
                        >
                          {OPERATOR.email}
                        </a>
                      </p>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">{t.preferredLanguage}</p>
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
