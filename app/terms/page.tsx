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
  footerNotice: string;
};

const OPERATOR = {
  name: "SIA JAKOVLEV CAPITAL",
  vatId: "LV44103016716",
  address: "Kupriču iela 1E–93, Riga, LV-1021, Latvia",
  email: "support@carriertrust.eu",
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    badge: "Terms",
    title: "Terms of Service",
    version: "Version 2.0",
    effectiveDate: "Effective 25 July 2026",
    operator: "Platform operator",
    vatId: "VAT ID",
    legalAddress: "Legal address",
    email: "Email",
    intro: [
      "These Terms form a binding business-to-business agreement between SIA JAKOVLEV CAPITAL, the operator of CarrierTrust, and every person or organisation that accesses the platform, creates an account, submits content, claims or manages a company profile, or purchases a paid service.",
      "By using CarrierTrust, you confirm that you have read and accepted these Terms, the Privacy Policy and the Review Policy. Mandatory rights that cannot lawfully be excluded or limited remain unaffected.",
    ],
    sections: [
      {
        title: "1. Scope and business use",
        paragraphs: [
          "CarrierTrust is an online reputation and information platform for the transport and logistics sector. It may provide company profiles, reviews, official replies, verification indicators, risk-related indicators, search tools and paid business features. The platform is intended primarily for professional and commercial use.",
          "A person acting for a company confirms that they are authorised to represent or bind that company. Use of CarrierTrust does not create an agency, partnership, employment, fiduciary or joint-venture relationship.",
        ],
      },
      {
        title: "2. Accounts, authority and security",
        paragraphs: [
          "You must provide accurate, current and complete information, protect account credentials and promptly correct inaccurate data. You are responsible for activity through your account unless you promptly report unauthorised use.",
          "CarrierTrust may request evidence of identity, company authority, ownership, management rights or business activity and may reject, limit or suspend access where information cannot be verified, appears misleading or creates a legal, security or abuse risk. Company owners are responsible for invited managers and for removing access when authority ends.",
        ],
      },
      {
        title: "3. Role of CarrierTrust",
        paragraphs: [
          "CarrierTrust provides technical hosting and platform functionality for user-generated content and also creates its own interface, labels, verification processes and scoring logic. User-generated statements remain the responsibility of their authors.",
          "Publication, visibility, verification, a claimed profile, a subscription or any badge does not mean that CarrierTrust endorses a company, confirms every statement, guarantees solvency or service quality, or recommends a transaction. CarrierTrust is not a court, regulator, credit-rating agency, debt-collection service or substitute for legal, financial, sanctions, compliance or commercial due diligence.",
        ],
      },
      {
        title: "4. Company profiles, user content and evidence",
        paragraphs: [
          "Company profiles may be created from public registers, public websites, licensed or third-party data, user submissions or information supplied by a company. The existence of a profile does not imply a contractual relationship, approval or participation by that company. Important information must be independently verified.",
          "You retain ownership of content you submit and grant SIA JAKOVLEV CAPITAL a worldwide, non-exclusive, royalty-free, transferable and sublicensable licence to host, store, reproduce, format, translate, display, distribute, technically adapt and moderate that content as reasonably necessary to operate, secure, improve, promote and legally defend CarrierTrust.",
          "Reviews must concern a genuine business interaction, be submitted in good faith and comply with the Review Policy. CarrierTrust may request contracts, transport orders, invoices, CMR documents, correspondence, payment records or other evidence. Supporting material is not normally published, but may be retained and disclosed where legally required or reasonably necessary to establish, exercise or defend legal claims.",
        ],
        bullets: [
          "Do not publish unnecessary personal data, private contact details or confidential documents.",
          "Do not upload content obtained unlawfully or subject to a duty of secrecy.",
          "Do not present suspicion, inference or a commercial dispute as a proven criminal or regulatory finding.",
        ],
      },
      {
        title: "5. Claims, verification and paid status",
        paragraphs: [
          "A claimed company profile indicates that CarrierTrust has approved access for a person purporting to represent the company. A verification indicator confirms only the checks expressly described on the verification page at the time of verification.",
          "Verification does not certify financial stability, regulatory compliance, service quality, beneficial ownership, absence of disputes or the accuracy of all profile content. PRO or another paid status is a commercial subscription and is not a positive reputation score, independent endorsement or basis for preferential moderation.",
        ],
      },
      {
        title: "6. Ratings and Risk Index",
        paragraphs: [
          "Ratings, trust scores, risk levels, flags and similar indicators may be generated from available reviews, platform rules, reported information and technical signals. They may change when new information becomes available or methodology is updated.",
          "These indicators are informational only. They are not a credit rating, legal judgment, finding of fraud, sanctions-screening result or recommendation to accept, reject or terminate a business relationship. Users remain solely responsible for their own checks and commercial decisions.",
        ],
      },
      {
        title: "7. Moderation, notices and appeals",
        paragraphs: [
          "CarrierTrust may, but is not obliged to, review content before or after publication. It may request clarification or evidence, label content, limit distribution, temporarily hide it, redact personal or confidential information, remove it, disable features or restrict accounts where reasonably necessary to enforce law, these Terms, the Review Policy, security requirements or third-party rights.",
          "CarrierTrust does not undertake a general obligation to monitor all information and does not guarantee that every violation will be identified immediately. Notices concerning allegedly illegal content must follow the procedure on the Legal page. CarrierTrust may communicate with affected parties, preserve relevant records, issue a reasoned decision and allow an eligible appeal or counter-notice.",
        ],
      },
      {
        title: "8. Prohibited conduct",
        paragraphs: ["You must not misuse CarrierTrust or assist another person in doing so."],
        bullets: [
          "No fake, purchased, reciprocal, manipulated or conflict-of-interest reviews.",
          "No threats, extortion, harassment, hate content, unlawful accusations or demands for payment in exchange for changing or removing content.",
          "No impersonation, malware, credential abuse, unauthorised security testing, burdensome scraping, circumvention of access controls or unauthorised automated access.",
          "No use that violates sanctions, export controls, competition law, intellectual-property rights, privacy rights or other applicable law.",
        ],
      },
      {
        title: "9. Paid services, billing and taxes",
        paragraphs: [
          "The price, billing cycle, initial term, renewal rules, included features, cancellation conditions and any early-termination charge are those displayed and accepted at purchase or stated in a separate order or agreement. Prices exclude VAT unless expressly stated otherwise.",
          "Paid services may renew automatically where disclosed before purchase. Fees are non-refundable except where the accepted offer, a separate agreement or mandatory law provides otherwise. CarrierTrust may suspend paid features for overdue payment and may use third-party payment providers.",
        ],
      },
      {
        title: "10. Availability and intellectual property",
        paragraphs: [
          "CarrierTrust is provided on an as-available basis. Maintenance, security incidents, third-party failures, legal requirements or product changes may cause interruption, delay or loss of functionality. CarrierTrust may modify, replace or discontinue features and may take urgent action without prior notice where required for security, legal compliance or service integrity.",
          "The CarrierTrust name, software, design, databases, selection and arrangement of information, logos and platform-created materials are owned by or licensed to SIA JAKOVLEV CAPITAL. Except as expressly permitted, users may not copy, resell, reverse engineer or commercially exploit them.",
        ],
      },
      {
        title: "11. Disclaimers, liability and indemnity",
        paragraphs: [
          "To the maximum extent permitted by law, CarrierTrust and platform information are provided without warranties of accuracy, completeness, merchantability, fitness for a particular purpose, non-infringement, uninterrupted availability or business outcome. Users rely on reviews, profiles, scores and links at their own commercial risk.",
          "To the maximum extent permitted by law, SIA JAKOVLEV CAPITAL is not liable for indirect, incidental, special, punitive or consequential loss, loss of profit, revenue, contracts, data, reputation, business opportunity or anticipated savings, or loss arising from user-generated content, third-party conduct or a transaction between users.",
          "To the maximum extent permitted by law, the aggregate liability of SIA JAKOVLEV CAPITAL arising from or relating to CarrierTrust during any twelve-month period is limited to the fees paid by the claimant to CarrierTrust during the preceding twelve months or EUR 100, whichever is greater.",
          "Nothing excludes liability that cannot lawfully be excluded, including fraud, wilful misconduct, gross negligence, death or personal injury caused by negligence, or mandatory data-protection obligations. To the extent permitted by law, you agree to indemnify SIA JAKOVLEV CAPITAL and its officers, employees, contractors and representatives against third-party claims, penalties, losses and reasonable legal costs arising from your content, breach, infringement, lack of authority or unlawful use of CarrierTrust.",
        ],
      },
      {
        title: "12. Suspension, governing law and changes",
        paragraphs: [
          "CarrierTrust may warn, limit, suspend or terminate an account, company access, content or paid feature where it reasonably believes there has been a breach, unlawful activity, security risk, repeated abusive reporting, non-payment, false authority claim or risk to users, third parties or the platform. Relevant content and records may be retained for legal compliance, disputes, fraud prevention, backups or legal claims.",
          "These Terms and related non-contractual obligations are governed by the laws of the Republic of Latvia. The courts of Riga, Latvia have exclusive jurisdiction unless mandatory law requires another forum. Before proceedings, a party should send a written description of the dispute to support@carriertrust.eu and allow a reasonable opportunity for an amicable solution.",
          "CarrierTrust may update these Terms for legal, security, operational or product changes. Material changes will be communicated by reasonable means. Translations are provided for convenience; the English version governs in case of inconsistency, to the extent permitted by mandatory law. Invalid provisions are limited only to the minimum necessary and the remainder remains effective.",
        ],
      },
    ],
    footerNotice:
      "Questions about these Terms may be sent to support@carriertrust.eu. Legal notices concerning content should follow the procedure on the Legal page.",
  },

  de: {
    badge: "Bedingungen",
    title: "Nutzungsbedingungen",
    version: "Version 2.0",
    effectiveDate: "Gültig ab 25. Juli 2026",
    operator: "Plattformbetreiber",
    vatId: "USt-IdNr.",
    legalAddress: "Sitz",
    email: "E-Mail",
    intro: [
      "Diese Nutzungsbedingungen bilden eine verbindliche Vereinbarung zwischen Unternehmen zwischen SIA JAKOVLEV CAPITAL als Betreiberin von CarrierTrust und jeder Person oder Organisation, die auf die Plattform zugreift, ein Konto erstellt, Inhalte übermittelt, ein Unternehmensprofil beansprucht oder verwaltet oder einen kostenpflichtigen Dienst erwirbt.",
      "Durch die Nutzung von CarrierTrust bestätigen Sie, dass Sie diese Bedingungen, die Datenschutzrichtlinie und die Bewertungsrichtlinie gelesen und akzeptiert haben. Zwingende Rechte, die gesetzlich nicht ausgeschlossen oder beschränkt werden dürfen, bleiben unberührt.",
    ],
    sections: [
      {
        title: "1. Geltungsbereich und geschäftliche Nutzung",
        paragraphs: [
          "CarrierTrust ist eine Online-Reputations- und Informationsplattform für den Transport- und Logistiksektor. Sie kann Unternehmensprofile, Bewertungen, offizielle Antworten, Verifizierungs- und Risikoindikatoren, Suchwerkzeuge und kostenpflichtige Geschäftsfunktionen bereitstellen. Die Plattform ist vorwiegend für berufliche und geschäftliche Nutzung bestimmt.",
          "Wer für ein Unternehmen handelt, bestätigt, zur Vertretung oder Bindung dieses Unternehmens berechtigt zu sein. Die Nutzung von CarrierTrust begründet kein Agentur-, Gesellschafts-, Arbeits-, Treuhand- oder Joint-Venture-Verhältnis.",
        ],
      },
      {
        title: "2. Konten, Vertretungsmacht und Sicherheit",
        paragraphs: [
          "Sie müssen richtige, aktuelle und vollständige Angaben machen, Zugangsdaten schützen und unrichtige Angaben unverzüglich korrigieren. Sie sind für Aktivitäten über Ihr Konto verantwortlich, sofern Sie eine unbefugte Nutzung nicht unverzüglich melden.",
          "CarrierTrust kann Nachweise zu Identität, Vertretungsmacht, Eigentum, Verwaltungsrechten oder Geschäftstätigkeit verlangen und den Zugang ablehnen, beschränken oder aussetzen, wenn Angaben nicht überprüfbar oder irreführend sind oder ein Rechts-, Sicherheits- oder Missbrauchsrisiko besteht. Unternehmensinhaber sind für eingeladene Manager und die rechtzeitige Entfernung ihrer Zugänge verantwortlich.",
        ],
      },
      {
        title: "3. Rolle von CarrierTrust",
        paragraphs: [
          "CarrierTrust stellt technische Hosting- und Plattformfunktionen für nutzergenerierte Inhalte bereit und entwickelt zugleich eigene Benutzeroberflächen, Kennzeichnungen, Verifizierungsverfahren und Bewertungslogiken. Für nutzergenerierte Aussagen bleiben deren Verfasser verantwortlich.",
          "Veröffentlichung, Sichtbarkeit, Verifizierung, ein beanspruchtes Profil, ein Abonnement oder ein Abzeichen bedeuten keine Empfehlung, Bestätigung jeder Aussage, Garantie von Zahlungsfähigkeit oder Qualität oder Empfehlung eines Geschäfts. CarrierTrust ist weder Gericht noch Aufsichtsbehörde, Ratingagentur, Inkassodienst oder Ersatz für rechtliche, finanzielle, sanktionsrechtliche, Compliance- oder Geschäftsprüfungen.",
        ],
      },
      {
        title: "4. Unternehmensprofile, Nutzerinhalte und Nachweise",
        paragraphs: [
          "Profile können aus öffentlichen Registern, öffentlichen Websites, lizenzierten oder sonstigen Drittdaten, Nutzerangaben oder Angaben des Unternehmens erstellt werden. Das Vorhandensein eines Profils bedeutet weder Vertragsbeziehung noch Zustimmung oder Teilnahme des Unternehmens. Wichtige Angaben sind selbständig zu prüfen.",
          "Sie behalten das Eigentum an Ihren Inhalten und gewähren SIA JAKOVLEV CAPITAL eine weltweite, nicht ausschließliche, unentgeltliche, übertragbare und unterlizenzierbare Lizenz, diese Inhalte zu hosten, zu speichern, zu vervielfältigen, zu formatieren, zu übersetzen, anzuzeigen, zu verbreiten, technisch anzupassen und zu moderieren, soweit dies für Betrieb, Sicherheit, Verbesserung, Bewerbung und rechtliche Verteidigung von CarrierTrust erforderlich ist.",
          "Bewertungen müssen sich auf eine echte Geschäftsbeziehung beziehen, nach Treu und Glauben abgegeben werden und der Bewertungsrichtlinie entsprechen. CarrierTrust kann Verträge, Transportaufträge, Rechnungen, CMR-Dokumente, Korrespondenz, Zahlungsnachweise oder andere Belege anfordern. Belege werden grundsätzlich nicht veröffentlicht, können jedoch gesetzlich oder zur Rechtsverteidigung aufbewahrt und offengelegt werden.",
        ],
        bullets: [
          "Keine unnötigen personenbezogenen Daten, privaten Kontaktdaten oder vertraulichen Dokumente.",
          "Keine rechtswidrig erlangten oder geheimhaltungspflichtigen Inhalte.",
          "Verdacht, Schlussfolgerungen oder Handelsstreitigkeiten dürfen nicht als erwiesene Straftat oder behördliche Feststellung dargestellt werden.",
        ],
      },
      {
        title: "5. Profilansprüche, Verifizierung und kostenpflichtiger Status",
        paragraphs: [
          "Ein beanspruchtes Profil zeigt an, dass CarrierTrust einer Person, die das Unternehmen zu vertreten behauptet, Zugang gewährt hat. Ein Verifizierungsindikator bestätigt nur die auf der Verifizierungsseite zum jeweiligen Zeitpunkt ausdrücklich beschriebenen Prüfungen.",
          "Verifizierung bestätigt weder finanzielle Stabilität, regulatorische Konformität, Qualität, wirtschaftlich Berechtigte, Streitfreiheit noch die vollständige Richtigkeit des Profils. PRO oder ein anderer kostenpflichtiger Status ist ein kommerzielles Abonnement und kein positiver Reputationswert, keine unabhängige Empfehlung und keine bevorzugte Moderation.",
        ],
      },
      {
        title: "6. Bewertungen und Risk Index",
        paragraphs: [
          "Bewertungen, Vertrauenswerte, Risikostufen, Kennzeichnungen und ähnliche Indikatoren können aus verfügbaren Bewertungen, Plattformregeln, gemeldeten Informationen und technischen Signalen erzeugt werden und sich mit neuen Informationen oder Methodikänderungen ändern.",
          "Sie dienen ausschließlich der Information und sind weder Kreditrating noch gerichtliche Feststellung, Betrugsnachweis, Sanktionsprüfung oder Empfehlung, eine Geschäftsbeziehung einzugehen, abzulehnen oder zu beenden. Nutzer bleiben allein für eigene Prüfungen und Entscheidungen verantwortlich.",
        ],
      },
      {
        title: "7. Moderation, Meldungen und Beschwerden",
        paragraphs: [
          "CarrierTrust kann Inhalte vor oder nach Veröffentlichung prüfen, ist hierzu jedoch nicht verpflichtet. CarrierTrust kann Erläuterungen oder Belege verlangen, Inhalte kennzeichnen, ihre Verbreitung beschränken, sie vorübergehend ausblenden, personenbezogene oder vertrauliche Angaben schwärzen, Inhalte entfernen, Funktionen deaktivieren oder Konten beschränken, soweit dies zur Durchsetzung von Recht, Bedingungen, Bewertungsrichtlinie, Sicherheit oder Drittrechten erforderlich ist.",
          "CarrierTrust übernimmt keine allgemeine Überwachungspflicht und garantiert nicht, dass jeder Verstoß sofort erkannt wird. Meldungen über mutmaßlich rechtswidrige Inhalte sind nach dem Verfahren auf der Rechtsseite einzureichen. CarrierTrust kann Betroffene kontaktieren, Unterlagen sichern, eine begründete Entscheidung erlassen und eine zulässige Beschwerde oder Gegendarstellung ermöglichen.",
        ],
      },
      {
        title: "8. Verbotenes Verhalten",
        paragraphs: ["Sie dürfen CarrierTrust nicht missbrauchen oder andere dabei unterstützen."],
        bullets: [
          "Keine gefälschten, gekauften, gegenseitigen, manipulierten oder interessenkonfliktbehafteten Bewertungen.",
          "Keine Drohungen, Erpressung, Belästigung, Hassinhalte, rechtswidrigen Anschuldigungen oder Zahlungsforderungen für Änderung oder Entfernung von Inhalten.",
          "Keine Identitätstäuschung, Schadsoftware, Zugangsdatenmissbrauch, unbefugten Sicherheitstests, dienstbelastendes Scraping, Umgehung von Zugangskontrollen oder unbefugten automatisierten Zugriff.",
          "Keine Nutzung unter Verstoß gegen Sanktionen, Exportkontrollen, Wettbewerbsrecht, geistige Eigentumsrechte, Datenschutz oder sonstiges Recht.",
        ],
      },
      {
        title: "9. Kostenpflichtige Dienste, Abrechnung und Steuern",
        paragraphs: [
          "Preis, Abrechnungszeitraum, Anfangslaufzeit, Verlängerungsregeln, Funktionen, Kündigungsbedingungen und gegebenenfalls eine Gebühr für vorzeitige Beendigung ergeben sich aus dem bei Erwerb akzeptierten Angebot oder einer gesonderten Bestellung bzw. Vereinbarung. Preise verstehen sich zuzüglich Umsatzsteuer, sofern nicht ausdrücklich anders angegeben.",
          "Kostenpflichtige Dienste können sich automatisch verlängern, wenn dies vor dem Erwerb offengelegt wurde. Gebühren werden nur erstattet, wenn Angebot, gesonderte Vereinbarung oder zwingendes Recht dies vorsieht. CarrierTrust kann Funktionen bei Zahlungsverzug aussetzen und Zahlungsdienstleister einsetzen.",
        ],
      },
      {
        title: "10. Verfügbarkeit und geistiges Eigentum",
        paragraphs: [
          "CarrierTrust wird nach Verfügbarkeit bereitgestellt. Wartung, Sicherheitsvorfälle, Ausfälle Dritter, gesetzliche Anforderungen oder Produktänderungen können Unterbrechungen, Verzögerungen oder Funktionsverluste verursachen. Funktionen können geändert, ersetzt oder eingestellt und dringende Maßnahmen ohne Vorankündigung ergriffen werden.",
          "Name, Software, Gestaltung, Datenbanken, Auswahl und Anordnung von Informationen, Logos und von der Plattform erstellte Materialien stehen im Eigentum von SIA JAKOVLEV CAPITAL oder sind an sie lizenziert. Ohne ausdrückliche Erlaubnis dürfen sie nicht kopiert, weiterverkauft, zurückentwickelt oder kommerziell verwertet werden.",
        ],
      },
      {
        title: "11. Gewährleistungsausschluss, Haftung und Freistellung",
        paragraphs: [
          "Soweit gesetzlich zulässig, werden CarrierTrust und Plattforminformationen ohne Gewähr für Richtigkeit, Vollständigkeit, Marktgängigkeit, Eignung, Nichtverletzung, unterbrechungsfreie Verfügbarkeit oder Geschäftserfolg bereitgestellt. Die Nutzung erfolgt auf eigenes geschäftliches Risiko.",
          "Soweit gesetzlich zulässig, haftet SIA JAKOVLEV CAPITAL nicht für mittelbare, beiläufige, besondere, punitive oder Folgeschäden, entgangenen Gewinn, Umsatz, Verträge, Daten, Ruf, Geschäftschancen oder erwartete Einsparungen sowie nicht für Verluste aus Nutzerinhalten, Verhalten Dritter oder Geschäften zwischen Nutzern.",
          "Soweit gesetzlich zulässig, ist die Gesamthaftung innerhalb eines Zwölfmonatszeitraums auf die vom Anspruchsteller in den vorangegangenen zwölf Monaten gezahlten Gebühren oder 100 EUR begrenzt, je nachdem, welcher Betrag höher ist.",
          "Unberührt bleibt gesetzlich nicht ausschließbare Haftung, insbesondere für Betrug, Vorsatz, grobe Fahrlässigkeit, Tod oder Körperverletzung durch Fahrlässigkeit und zwingenden Datenschutz. Soweit zulässig, stellen Sie SIA JAKOVLEV CAPITAL sowie Organmitglieder, Mitarbeiter, Auftragnehmer und Vertreter von Drittansprüchen, Geldbußen, Verlusten und angemessenen Rechtskosten aus Ihren Inhalten, Verstößen, Rechtsverletzungen, fehlender Vertretungsmacht oder rechtswidriger Nutzung frei.",
        ],
      },
      {
        title: "12. Aussetzung, Recht und Änderungen",
        paragraphs: [
          "CarrierTrust kann Konto, Unternehmenszugang, Inhalt oder kostenpflichtige Funktion verwarnen, beschränken, aussetzen oder beenden, wenn vernünftigerweise ein Verstoß, rechtswidrige Tätigkeit, Sicherheitsrisiko, missbräuchliche Meldungen, Zahlungsverzug, falsche Vertretungsbehauptung oder Risiko für Nutzer, Dritte oder Plattform angenommen wird. Erforderliche Unterlagen können für Rechtspflichten, Streitigkeiten, Betrugsprävention, Backups oder Rechtsansprüche aufbewahrt werden.",
          "Diese Bedingungen und außervertragliche Pflichten unterliegen dem Recht der Republik Lettland. Ausschließlich zuständig sind die Gerichte in Riga, sofern zwingendes Recht keinen anderen Gerichtsstand verlangt. Vor einem Verfahren sollte der Streit an support@carriertrust.eu mitgeteilt und eine angemessene Gelegenheit zur gütlichen Lösung gegeben werden.",
          "CarrierTrust kann diese Bedingungen aus rechtlichen, sicherheitsbezogenen, betrieblichen oder produktbezogenen Gründen aktualisieren. Wesentliche Änderungen werden angemessen mitgeteilt. Übersetzungen dienen der Benutzerfreundlichkeit; bei Widersprüchen ist die englische Fassung maßgeblich, soweit zwingendes Recht dies erlaubt. Unwirksame Bestimmungen werden nur im notwendigen Mindestumfang beschränkt.",
        ],
      },
    ],
    footerNotice:
      "Fragen zu diesen Bedingungen richten Sie an support@carriertrust.eu. Rechtliche Meldungen zu Inhalten sind nach dem Verfahren auf der Rechtsseite einzureichen.",
  },

  ru: {
    badge: "Условия",
    title: "Условия использования",
    version: "Версия 2.0",
    effectiveDate: "Действуют с 25 июля 2026 года",
    operator: "Оператор платформы",
    vatId: "VAT ID",
    legalAddress: "Юридический адрес",
    email: "Email",
    intro: [
      "Настоящие Условия образуют обязательное соглашение между коммерческими субъектами: SIA JAKOVLEV CAPITAL, оператором CarrierTrust, и каждым лицом или организацией, которые используют платформу, создают аккаунт, публикуют контент, подтверждают права на профиль компании, управляют им или приобретают платную услугу.",
      "Используя CarrierTrust, вы подтверждаете, что прочитали и приняли настоящие Условия, Политику конфиденциальности и Политику отзывов. Обязательные права, которые закон не позволяет исключить или ограничить, сохраняются.",
    ],
    sections: [
      {
        title: "1. Сфера применения и деловое использование",
        paragraphs: [
          "CarrierTrust — онлайн-платформа репутации и деловой информации для транспортной и логистической отрасли. Она может предоставлять профили компаний, отзывы, официальные ответы, признаки верификации и риска, поиск и платные бизнес-функции. Платформа предназначена прежде всего для профессионального и коммерческого использования.",
          "Лицо, действующее от имени компании, подтверждает наличие полномочий представлять или связывать такую компанию. Использование CarrierTrust не создаёт агентских, партнёрских, трудовых, фидуциарных отношений или совместного предприятия.",
        ],
      },
      {
        title: "2. Аккаунты, полномочия и безопасность",
        paragraphs: [
          "Вы обязаны предоставлять точную, актуальную и полную информацию, защищать данные для входа и своевременно исправлять неточности. Вы отвечаете за действия через аккаунт, если только незамедлительно не сообщили о несанкционированном использовании.",
          "CarrierTrust вправе запросить подтверждение личности, полномочий, прав собственника или менеджера и коммерческой деятельности и вправе отклонить, ограничить или приостановить доступ, если сведения невозможно подтвердить, они вводят в заблуждение либо создают юридический риск, угрозу безопасности или риск злоупотребления. Владелец профиля отвечает за приглашённых менеджеров и прекращение их доступа.",
        ],
      },
      {
        title: "3. Роль CarrierTrust",
        paragraphs: [
          "CarrierTrust предоставляет технический хостинг и функции платформы для пользовательского контента, а также создаёт собственный интерфейс, обозначения, процедуры верификации и правила расчёта показателей. За пользовательские заявления отвечают их авторы.",
          "Публикация, видимость, верификация, подтверждённый профиль, подписка или значок не означают рекомендацию компании, подтверждение каждого заявления, гарантию платёжеспособности или качества либо совет заключить сделку. CarrierTrust не является судом, регулятором, рейтинговым агентством, службой взыскания и не заменяет юридическую, финансовую, санкционную, комплаенс- или коммерческую проверку.",
        ],
      },
      {
        title: "4. Профили компаний, контент и доказательства",
        paragraphs: [
          "Профили могут создаваться из публичных реестров, открытых сайтов, лицензированных или сторонних данных, пользовательских материалов либо информации компании. Наличие профиля не означает договорных отношений, одобрения или участия компании. Важные сведения необходимо проверять самостоятельно.",
          "Вы сохраняете права на свой контент и предоставляете SIA JAKOVLEV CAPITAL всемирную, неисключительную, безвозмездную, передаваемую и сублицензируемую лицензию на размещение, хранение, воспроизведение, форматирование, перевод, показ, распространение, техническую адаптацию и модерацию контента в разумно необходимом объёме для работы, защиты, улучшения, продвижения и юридической защиты CarrierTrust.",
          "Отзывы должны касаться реального делового взаимодействия, подаваться добросовестно и соответствовать Политике отзывов. CarrierTrust вправе запросить договоры, транспортные заказы, счета, CMR, переписку, подтверждения оплаты и иные доказательства. Обычно они не публикуются, но могут храниться и раскрываться по закону или для предъявления, осуществления и защиты юридических требований.",
        ],
        bullets: [
          "Не публикуйте избыточные персональные данные, частные контакты и конфиденциальные документы.",
          "Не загружайте незаконно полученный контент или материалы, охраняемые обязанностью хранить тайну.",
          "Не представляйте подозрение, вывод или коммерческий спор как доказанное преступление либо официальное решение органа власти.",
        ],
      },
      {
        title: "5. Подтверждение профиля, верификация и платный статус",
        paragraphs: [
          "Подтверждённый профиль означает, что CarrierTrust предоставил доступ лицу, заявившему полномочия представлять компанию. Индикатор верификации подтверждает только проверки, прямо описанные на странице верификации на момент их проведения.",
          "Верификация не подтверждает финансовую устойчивость, соблюдение всех норм, качество, бенефициарных владельцев, отсутствие споров или точность всего профиля. PRO и иной платный статус являются коммерческой подпиской, а не положительной репутационной оценкой, независимой рекомендацией или основанием для предпочтительной модерации.",
        ],
      },
      {
        title: "6. Рейтинги и Risk Index",
        paragraphs: [
          "Оценки, trust score, уровни риска, флаги и аналогичные показатели могут формироваться из доступных отзывов, правил платформы, сообщений и технических сигналов и изменяться при появлении новой информации или обновлении методики.",
          "Они носят исключительно информационный характер и не являются кредитным рейтингом, судебным решением, установлением мошенничества, результатом санкционной проверки или рекомендацией начинать, отклонять либо прекращать деловые отношения. Пользователь самостоятельно проводит проверки и принимает решения.",
        ],
      },
      {
        title: "7. Модерация, уведомления и обжалование",
        paragraphs: [
          "CarrierTrust вправе, но не обязан проверять контент до или после публикации. Платформа может запрашивать пояснения и доказательства, маркировать контент, ограничивать распространение, временно скрывать, удалять персональные или конфиденциальные сведения, удалять материалы, отключать функции или ограничивать аккаунты, если это необходимо для соблюдения закона, Условий, Политики отзывов, безопасности или прав третьих лиц.",
          "CarrierTrust не принимает на себя общую обязанность контролировать всю информацию и не гарантирует немедленное выявление каждого нарушения. Уведомления о предположительно незаконном контенте подаются по процедуре на странице Legal. CarrierTrust может связаться со сторонами, сохранить записи, вынести мотивированное решение и предоставить допустимую возможность апелляции или встречного уведомления.",
        ],
      },
      {
        title: "8. Запрещённые действия",
        paragraphs: ["Запрещается злоупотреблять CarrierTrust или помогать другим лицам делать это."],
        bullets: [
          "Запрещены фальшивые, купленные, взаимные, манипулируемые отзывы и отзывы при конфликте интересов.",
          "Запрещены угрозы, вымогательство, преследование, разжигание ненависти, незаконные обвинения и требования оплаты за изменение или удаление контента.",
          "Запрещены выдача себя за другое лицо, вредоносные программы, злоупотребление учётными данными, тестирование безопасности без разрешения, чрезмерный scraping, обход контроля доступа и несанкционированный автоматизированный доступ.",
          "Запрещено использование с нарушением санкций, экспортного контроля, конкуренции, интеллектуальных прав, конфиденциальности и иного применимого закона.",
        ],
      },
      {
        title: "9. Платные услуги, расчёты и налоги",
        paragraphs: [
          "Цена, расчётный период, первоначальный срок, правила продления, включённые функции, порядок отмены и возможная плата за досрочное прекращение определяются предложением, принятым при покупке, либо отдельным заказом или договором. Цены указаны без VAT, если прямо не предусмотрено иное.",
          "Платные услуги могут продлеваться автоматически, если это раскрыто до покупки. Платежи не возвращаются, кроме случаев, предусмотренных предложением, отдельным договором или обязательным законодательством. CarrierTrust вправе приостановить платные функции при просрочке и использовать сторонних платёжных провайдеров.",
        ],
      },
      {
        title: "10. Доступность и интеллектуальная собственность",
        paragraphs: [
          "CarrierTrust предоставляется по мере доступности. Обслуживание, инциденты безопасности, сбои третьих лиц, требования закона или изменения продукта могут привести к перерывам, задержкам и утрате функций. CarrierTrust вправе изменять, заменять или прекращать функции и принимать срочные меры без предварительного уведомления.",
          "Название CarrierTrust, программное обеспечение, дизайн, базы данных, подбор и расположение информации, логотипы и материалы платформы принадлежат SIA JAKOVLEV CAPITAL или используются по лицензии. Без прямого разрешения запрещено их копировать, перепродавать, проводить обратную разработку или коммерчески эксплуатировать.",
        ],
      },
      {
        title: "11. Отказ от гарантий, ответственность и возмещение",
        paragraphs: [
          "В максимально допустимой законом степени CarrierTrust и информация предоставляются без гарантий точности, полноты, коммерческой пригодности, пригодности для конкретной цели, ненарушения прав, непрерывной доступности или коммерческого результата. Пользователь действует на собственный коммерческий риск.",
          "В максимально допустимой законом степени SIA JAKOVLEV CAPITAL не отвечает за косвенные, случайные, специальные, штрафные или последующие убытки, упущенную прибыль, доход, договоры, данные, репутацию, возможности или ожидаемую экономию, а также за убытки вследствие пользовательского контента, действий третьих лиц или сделок между пользователями.",
          "В максимально допустимой законом степени совокупная ответственность за любой двенадцатимесячный период ограничивается суммой, уплаченной заявителем CarrierTrust за предыдущие двенадцать месяцев, либо 100 EUR — в зависимости от того, какая сумма выше.",
          "Не ограничивается ответственность, которую закон запрещает ограничивать, включая мошеннические действия, умысел, грубую неосторожность, смерть или вред здоровью вследствие неосторожности и обязательства по защите данных. В допустимой законом степени вы обязуетесь возместить SIA JAKOVLEV CAPITAL, её должностным лицам, работникам, подрядчикам и представителям требования третьих лиц, штрафы, убытки и разумные юридические расходы из вашего контента, нарушения, отсутствия полномочий или незаконного использования.",
        ],
      },
      {
        title: "12. Приостановление, право и изменения",
        paragraphs: [
          "CarrierTrust вправе предупредить, ограничить, приостановить или прекратить аккаунт, доступ к компании, контент или платную функцию при разумном подозрении на нарушение, незаконную деятельность, угрозу безопасности, злоупотребление жалобами, неоплату, ложные полномочия либо риск для пользователей, третьих лиц или платформы. Необходимые записи могут храниться для соблюдения закона, споров, предотвращения мошенничества, резервного копирования и юридических требований.",
          "Настоящие Условия и связанные внедоговорные обязательства регулируются законодательством Латвийской Республики. Исключительную юрисдикцию имеют суды Риги, если обязательный закон не предусматривает иной суд. До начала разбирательства стороне следует направить описание спора на support@carriertrust.eu и предоставить разумную возможность мирного урегулирования.",
          "CarrierTrust вправе обновлять Условия в связи с изменениями закона, безопасности, работы или продукта. О существенных изменениях сообщается разумным способом. Переводы предоставляются для удобства; при расхождениях преимущественную силу имеет английская версия, насколько это допускается обязательным законодательством. Недействительное положение ограничивается только в минимально необходимой степени.",
        ],
      },
    ],
    footerNotice:
      "Вопросы по настоящим Условиям направляйте на support@carriertrust.eu. Юридические уведомления о контенте подаются по процедуре на странице Legal.",
  },

  fr: {
    badge: "Conditions",
    title: "Conditions d’utilisation",
    version: "Version 2.0",
    effectiveDate: "En vigueur le 25 juillet 2026",
    operator: "Exploitant de la plateforme",
    vatId: "N° de TVA",
    legalAddress: "Siège social",
    email: "Email",
    intro: [
      "Les présentes Conditions constituent un accord contraignant entre professionnels entre SIA JAKOVLEV CAPITAL, exploitant de CarrierTrust, et toute personne ou organisation qui utilise la plateforme, crée un compte, soumet du contenu, revendique ou gère un profil d’entreprise ou achète un service payant.",
      "En utilisant CarrierTrust, vous confirmez avoir lu et accepté les présentes Conditions, la Politique de confidentialité et la Politique des avis. Les droits impératifs qui ne peuvent légalement être exclus ou limités restent applicables.",
    ],
    sections: [
      {
        title: "1. Champ d’application et usage professionnel",
        paragraphs: [
          "CarrierTrust est une plateforme en ligne de réputation et d’information pour le transport et la logistique. Elle peut proposer profils d’entreprise, avis, réponses officielles, indicateurs de vérification et de risque, recherche et fonctions professionnelles payantes. Elle est destinée principalement à un usage professionnel.",
          "Toute personne agissant pour une entreprise confirme être autorisée à la représenter ou l’engager. L’utilisation de CarrierTrust ne crée aucune relation d’agence, de société, de travail, fiduciaire ou de coentreprise.",
        ],
      },
      {
        title: "2. Comptes, pouvoir et sécurité",
        paragraphs: [
          "Vous devez fournir des informations exactes, à jour et complètes, protéger vos identifiants et corriger rapidement les données inexactes. Vous êtes responsable des activités via votre compte sauf notification immédiate d’une utilisation non autorisée.",
          "CarrierTrust peut demander une preuve d’identité, de représentation, de propriété, de gestion ou d’activité commerciale et refuser, limiter ou suspendre l’accès lorsque les informations sont invérifiables, trompeuses ou créent un risque juridique, de sécurité ou d’abus. Le titulaire du profil est responsable des gestionnaires invités et du retrait de leurs accès.",
        ],
      },
      {
        title: "3. Rôle de CarrierTrust",
        paragraphs: [
          "CarrierTrust fournit l’hébergement technique et les fonctions nécessaires aux contenus des utilisateurs et crée également sa propre interface, ses libellés, procédures de vérification et règles de notation. Les déclarations des utilisateurs restent sous la responsabilité de leurs auteurs.",
          "Publication, visibilité, vérification, profil revendiqué, abonnement ou badge ne signifient ni recommandation, ni confirmation de chaque déclaration, ni garantie de solvabilité ou de qualité, ni conseil de conclure une transaction. CarrierTrust n’est ni tribunal, ni régulateur, ni agence de notation, ni service de recouvrement et ne remplace pas les vérifications juridiques, financières, de sanctions, de conformité ou commerciales.",
        ],
      },
      {
        title: "4. Profils, contenu utilisateur et preuves",
        paragraphs: [
          "Les profils peuvent provenir de registres publics, sites publics, données sous licence ou de tiers, contributions d’utilisateurs ou informations de l’entreprise. Leur existence n’implique ni relation contractuelle, ni approbation, ni participation. Les informations importantes doivent être vérifiées indépendamment.",
          "Vous conservez la propriété de votre contenu et accordez à SIA JAKOVLEV CAPITAL une licence mondiale, non exclusive, gratuite, transférable et sous-licenciable afin de l’héberger, stocker, reproduire, mettre en forme, traduire, afficher, distribuer, adapter techniquement et modérer dans la mesure nécessaire au fonctionnement, à la sécurité, à l’amélioration, à la promotion et à la défense juridique de CarrierTrust.",
          "Les avis doivent concerner une interaction commerciale réelle, être déposés de bonne foi et respecter la Politique des avis. CarrierTrust peut demander contrats, ordres de transport, factures, CMR, correspondances, preuves de paiement ou autres justificatifs. Ils ne sont normalement pas publiés, mais peuvent être conservés et divulgués lorsque la loi ou la défense de droits l’exige.",
        ],
        bullets: [
          "Ne publiez pas de données personnelles inutiles, coordonnées privées ou documents confidentiels.",
          "Ne téléversez pas de contenu obtenu illégalement ou soumis au secret.",
          "Ne présentez pas un soupçon, une déduction ou un litige commercial comme une infraction prouvée ou une décision officielle.",
        ],
      },
      {
        title: "5. Revendication, vérification et statut payant",
        paragraphs: [
          "Un profil revendiqué indique que CarrierTrust a accordé l’accès à une personne affirmant représenter l’entreprise. Un indicateur de vérification confirme uniquement les contrôles expressément décrits sur la page de vérification au moment où ils sont effectués.",
          "La vérification ne certifie ni stabilité financière, ni conformité, ni qualité, ni bénéficiaires effectifs, ni absence de litiges, ni exactitude totale du profil. PRO ou tout autre statut payant est un abonnement commercial et non une note positive, une recommandation indépendante ou une modération préférentielle.",
        ],
      },
      {
        title: "6. Notes et Risk Index",
        paragraphs: [
          "Notes, scores de confiance, niveaux de risque, alertes et indicateurs similaires peuvent être produits à partir des avis disponibles, règles de la plateforme, informations signalées et signaux techniques et évoluer avec de nouvelles informations ou une nouvelle méthodologie.",
          "Ils sont uniquement informatifs et ne constituent ni notation de crédit, ni décision juridique, ni constatation de fraude, ni résultat de filtrage des sanctions, ni recommandation commerciale. Chaque utilisateur reste responsable de ses contrôles et décisions.",
        ],
      },
      {
        title: "7. Modération, notifications et recours",
        paragraphs: [
          "CarrierTrust peut, sans y être obligé, examiner un contenu avant ou après publication. La plateforme peut demander des précisions ou preuves, apposer un libellé, limiter la diffusion, masquer temporairement, expurger des données personnelles ou confidentielles, retirer un contenu, désactiver des fonctions ou restreindre un compte lorsque cela est nécessaire au respect de la loi, des Conditions, de la Politique des avis, de la sécurité ou des droits de tiers.",
          "CarrierTrust n’assume aucune obligation générale de surveillance et ne garantit pas l’identification immédiate de chaque violation. Les notifications de contenu prétendument illégal doivent suivre la page Legal. CarrierTrust peut communiquer avec les parties, conserver des dossiers, rendre une décision motivée et permettre un recours ou une contre-notification admissible.",
        ],
      },
      {
        title: "8. Comportements interdits",
        paragraphs: ["Vous ne devez pas détourner CarrierTrust de son usage ni aider autrui à le faire."],
        bullets: [
          "Aucun avis faux, acheté, réciproque, manipulé ou affecté par un conflit d’intérêts.",
          "Aucune menace, extorsion, harcèlement, haine, accusation illicite ou demande de paiement en échange d’une modification ou suppression.",
          "Aucune usurpation, logiciel malveillant, abus d’identifiants, test de sécurité non autorisé, extraction surchargeant le service, contournement des contrôles ou accès automatisé non autorisé.",
          "Aucune utilisation contraire aux sanctions, contrôles à l’exportation, concurrence, propriété intellectuelle, vie privée ou autre loi.",
        ],
      },
      {
        title: "9. Services payants, facturation et taxes",
        paragraphs: [
          "Prix, périodicité, durée initiale, renouvellement, fonctions, résiliation et éventuels frais de résiliation anticipée sont ceux acceptés lors de l’achat ou prévus dans un accord séparé. Les prix s’entendent hors TVA sauf indication contraire.",
          "Les services peuvent se renouveler automatiquement lorsque cela est indiqué avant l’achat. Les frais ne sont remboursables que si l’offre, un accord séparé ou une règle impérative le prévoit. CarrierTrust peut suspendre les fonctions en cas d’impayé et recourir à des prestataires de paiement.",
        ],
      },
      {
        title: "10. Disponibilité et propriété intellectuelle",
        paragraphs: [
          "CarrierTrust est fourni selon disponibilité. Maintenance, incident de sécurité, défaillance de tiers, obligation légale ou changement de produit peuvent entraîner interruption, retard ou perte de fonction. CarrierTrust peut modifier, remplacer ou arrêter des fonctions et prendre des mesures urgentes sans préavis.",
          "Le nom CarrierTrust, le logiciel, le design, les bases de données, la sélection et l’organisation des informations, les logos et les contenus créés par la plateforme appartiennent ou sont concédés à SIA JAKOVLEV CAPITAL. Sans autorisation, ils ne peuvent être copiés, revendus, décompilés ou exploités commercialement.",
        ],
      },
      {
        title: "11. Exclusions, responsabilité et indemnisation",
        paragraphs: [
          "Dans toute la mesure permise, CarrierTrust et les informations sont fournis sans garantie d’exactitude, d’exhaustivité, de qualité marchande, d’adéquation, de non-contrefaçon, de disponibilité continue ou de résultat commercial. L’utilisateur agit à ses propres risques professionnels.",
          "Dans toute la mesure permise, SIA JAKOVLEV CAPITAL n’est pas responsable des pertes indirectes, accessoires, spéciales, punitives ou consécutives, pertes de bénéfice, chiffre d’affaires, contrats, données, réputation, opportunités ou économies, ni des pertes provenant de contenus, actes de tiers ou transactions entre utilisateurs.",
          "Dans toute la mesure permise, la responsabilité cumulée sur douze mois est limitée aux frais payés par le demandeur au cours des douze mois précédents ou à 100 EUR, le montant le plus élevé étant retenu.",
          "Aucune responsabilité légalement non excluable n’est limitée, notamment en cas de fraude, faute intentionnelle, faute lourde, décès ou dommage corporel causé par négligence ou obligations impératives de protection des données. Dans la mesure permise, vous indemnisez SIA JAKOVLEV CAPITAL, ses dirigeants, employés, prestataires et représentants contre les réclamations de tiers, amendes, pertes et frais juridiques raisonnables résultant de votre contenu, violation, absence de pouvoir ou usage illicite.",
        ],
      },
      {
        title: "12. Suspension, droit et modifications",
        paragraphs: [
          "CarrierTrust peut avertir, limiter, suspendre ou résilier compte, accès, contenu ou fonction payante en cas de manquement raisonnablement suspecté, activité illégale, risque de sécurité, abus des signalements, impayé, fausse représentation ou risque pour les utilisateurs, les tiers ou la plateforme. Les dossiers nécessaires peuvent être conservés pour la loi, les litiges, la prévention de la fraude, les sauvegardes ou les droits en justice.",
          "Les présentes Conditions et obligations extracontractuelles sont régies par le droit de la République de Lettonie. Les tribunaux de Riga sont exclusivement compétents sauf forum imposé par une règle impérative. Avant toute procédure, la partie devrait écrire à support@carriertrust.eu et laisser une possibilité raisonnable de règlement amiable.",
          "CarrierTrust peut mettre à jour ces Conditions pour des raisons juridiques, de sécurité, opérationnelles ou liées au produit. Les changements importants seront communiqués raisonnablement. Les traductions sont fournies par commodité; en cas de divergence, la version anglaise prévaut dans la mesure permise. Une clause inapplicable est limitée au strict minimum.",
        ],
      },
    ],
    footerNotice:
      "Les questions relatives à ces Conditions peuvent être adressées à support@carriertrust.eu. Les notifications juridiques relatives au contenu doivent suivre la procédure de la page Legal.",
  },

  es: {
    badge: "Términos",
    title: "Términos del servicio",
    version: "Versión 2.0",
    effectiveDate: "En vigor desde el 25 de julio de 2026",
    operator: "Operador de la plataforma",
    vatId: "N.º de IVA",
    legalAddress: "Domicilio social",
    email: "Email",
    intro: [
      "Estos Términos constituyen un acuerdo vinculante entre empresas entre SIA JAKOVLEV CAPITAL, operador de CarrierTrust, y toda persona u organización que utilice la plataforma, cree una cuenta, envíe contenido, reclame o gestione un perfil de empresa o compre un servicio de pago.",
      "Al utilizar CarrierTrust confirmas que has leído y aceptado estos Términos, la Política de privacidad y la Política de reseñas. Los derechos imperativos que no puedan excluirse o limitarse permanecen intactos.",
    ],
    sections: [
      {
        title: "1. Alcance y uso empresarial",
        paragraphs: [
          "CarrierTrust es una plataforma online de reputación e información para transporte y logística. Puede ofrecer perfiles, reseñas, respuestas oficiales, indicadores de verificación y riesgo, búsqueda y funciones empresariales de pago. Está destinada principalmente al uso profesional.",
          "Quien actúe por una empresa confirma que está autorizado para representarla o vincularla. El uso de CarrierTrust no crea una relación de agencia, sociedad, empleo, fiducia o empresa conjunta.",
        ],
      },
      {
        title: "2. Cuentas, autoridad y seguridad",
        paragraphs: [
          "Debes proporcionar información exacta, actual y completa, proteger las credenciales y corregir sin demora los datos inexactos. Eres responsable de la actividad mediante tu cuenta salvo notificación inmediata de un uso no autorizado.",
          "CarrierTrust puede pedir pruebas de identidad, representación, propiedad, gestión o actividad y rechazar, limitar o suspender el acceso cuando la información sea inviable de verificar, engañosa o cree riesgo legal, de seguridad o abuso. El titular del perfil responde de los managers invitados y de retirar sus accesos.",
        ],
      },
      {
        title: "3. Función de CarrierTrust",
        paragraphs: [
          "CarrierTrust proporciona alojamiento técnico y funciones para contenido de usuarios y también desarrolla su propia interfaz, etiquetas, procesos de verificación y reglas de puntuación. Las declaraciones siguen siendo responsabilidad de sus autores.",
          "Publicación, visibilidad, verificación, perfil reclamado, suscripción o insignia no significan recomendación, confirmación de cada afirmación, garantía de solvencia o calidad ni consejo de operar. CarrierTrust no es tribunal, regulador, agencia de rating, servicio de cobro ni sustituto de verificaciones jurídicas, financieras, de sanciones, cumplimiento o comerciales.",
        ],
      },
      {
        title: "4. Perfiles, contenido y pruebas",
        paragraphs: [
          "Los perfiles pueden crearse a partir de registros públicos, webs públicas, datos licenciados o de terceros, aportaciones de usuarios o información de la empresa. Su existencia no implica relación contractual, aprobación ni participación. La información importante debe verificarse de forma independiente.",
          "Conservas la titularidad de tu contenido y concedes a SIA JAKOVLEV CAPITAL una licencia mundial, no exclusiva, gratuita, transferible y sublicenciable para alojarlo, almacenarlo, reproducirlo, formatearlo, traducirlo, mostrarlo, distribuirlo, adaptarlo técnicamente y moderarlo en lo necesario para operar, proteger, mejorar, promocionar y defender jurídicamente CarrierTrust.",
          "Las reseñas deben referirse a una interacción comercial real, presentarse de buena fe y cumplir la Política de reseñas. CarrierTrust puede solicitar contratos, órdenes de transporte, facturas, CMR, correspondencia, pagos u otras pruebas. Normalmente no se publican, pero pueden conservarse y revelarse cuando la ley o la defensa jurídica lo exijan.",
        ],
        bullets: [
          "No publiques datos personales innecesarios, contactos privados ni documentos confidenciales.",
          "No subas contenido obtenido ilegalmente o sujeto a secreto.",
          "No presentes sospechas, inferencias o disputas comerciales como delitos probados o decisiones oficiales.",
        ],
      },
      {
        title: "5. Reclamación, verificación y estado de pago",
        paragraphs: [
          "Un perfil reclamado indica que CarrierTrust aprobó el acceso de una persona que afirma representar a la empresa. Un indicador de verificación confirma únicamente las comprobaciones descritas expresamente en la página de verificación cuando se realizaron.",
          "La verificación no certifica estabilidad financiera, cumplimiento, calidad, beneficiarios efectivos, ausencia de disputas ni exactitud total del perfil. PRO u otro estado de pago es una suscripción comercial y no una reputación positiva, recomendación independiente ni moderación preferente.",
        ],
      },
      {
        title: "6. Valoraciones y Risk Index",
        paragraphs: [
          "Valoraciones, trust scores, niveles de riesgo, alertas e indicadores similares pueden generarse a partir de reseñas, reglas, información reportada y señales técnicas y cambiar con nueva información o metodología.",
          "Son meramente informativos y no constituyen rating crediticio, resolución jurídica, constatación de fraude, resultado de sanciones ni recomendación comercial. Cada usuario responde de sus comprobaciones y decisiones.",
        ],
      },
      {
        title: "7. Moderación, avisos y recursos",
        paragraphs: [
          "CarrierTrust puede, sin estar obligado, revisar contenido antes o después de publicarlo. Puede pedir aclaraciones o pruebas, etiquetar, limitar distribución, ocultar temporalmente, suprimir datos personales o confidenciales, retirar contenido, desactivar funciones o restringir cuentas cuando sea necesario para la ley, los Términos, la Política de reseñas, la seguridad o derechos de terceros.",
          "CarrierTrust no asume una obligación general de supervisión ni garantiza detectar inmediatamente cada infracción. Los avisos de contenido presuntamente ilegal deben seguir la página Legal. CarrierTrust puede comunicarse con las partes, conservar registros, emitir una decisión motivada y permitir un recurso o contraaviso admisible.",
        ],
      },
      {
        title: "8. Conductas prohibidas",
        paragraphs: ["No debes utilizar indebidamente CarrierTrust ni ayudar a otra persona a hacerlo."],
        bullets: [
          "No se permiten reseñas falsas, compradas, recíprocas, manipuladas o con conflicto de intereses.",
          "No se permiten amenazas, extorsión, acoso, odio, acusaciones ilícitas ni exigencias de pago por modificar o retirar contenido.",
          "No se permiten suplantación, malware, abuso de credenciales, pruebas de seguridad sin permiso, scraping gravoso, elusión de controles ni acceso automatizado no autorizado.",
          "No se permite el uso contrario a sanciones, exportación, competencia, propiedad intelectual, privacidad u otra ley.",
        ],
      },
      {
        title: "9. Servicios de pago, facturación e impuestos",
        paragraphs: [
          "El precio, ciclo, plazo inicial, renovación, funciones, cancelación y cualquier cargo por terminación anticipada serán los aceptados al comprar o los establecidos en un acuerdo separado. Los precios no incluyen IVA salvo indicación expresa.",
          "Los servicios pueden renovarse automáticamente cuando se informe antes de comprar. Los importes no son reembolsables salvo que la oferta, un acuerdo separado o una norma imperativa dispongan lo contrario. CarrierTrust puede suspender funciones por impago y utilizar proveedores de pagos.",
        ],
      },
      {
        title: "10. Disponibilidad y propiedad intelectual",
        paragraphs: [
          "CarrierTrust se presta según disponibilidad. Mantenimiento, incidentes, fallos de terceros, requisitos legales o cambios pueden causar interrupciones, retrasos o pérdida de funciones. CarrierTrust puede modificar, sustituir o discontinuar funciones y adoptar medidas urgentes sin aviso.",
          "El nombre CarrierTrust, software, diseño, bases de datos, selección y organización de información, logotipos y materiales propios pertenecen o están licenciados a SIA JAKOVLEV CAPITAL. Sin permiso no pueden copiarse, revenderse, someterse a ingeniería inversa ni explotarse comercialmente.",
        ],
      },
      {
        title: "11. Exclusiones, responsabilidad e indemnización",
        paragraphs: [
          "En la máxima medida permitida, CarrierTrust y la información se proporcionan sin garantía de exactitud, integridad, comerciabilidad, idoneidad, no infracción, disponibilidad continua o resultado empresarial. El usuario actúa bajo su propio riesgo comercial.",
          "En la máxima medida permitida, SIA JAKOVLEV CAPITAL no responde de daños indirectos, incidentales, especiales, punitivos o consecuentes, pérdida de beneficios, ingresos, contratos, datos, reputación, oportunidades o ahorros, ni de pérdidas por contenido, actos de terceros u operaciones entre usuarios.",
          "En la máxima medida permitida, la responsabilidad total durante doce meses se limita a las tarifas pagadas por el reclamante en los doce meses anteriores o a 100 EUR, la cantidad mayor.",
          "No se limita responsabilidad que legalmente no pueda excluirse, incluida fraude, dolo, negligencia grave, muerte o lesión por negligencia u obligaciones imperativas de datos. En la medida permitida, indemnizarás a SIA JAKOVLEV CAPITAL, sus administradores, empleados, contratistas y representantes frente a reclamaciones de terceros, multas, pérdidas y costes jurídicos razonables derivados de tu contenido, incumplimiento, falta de autoridad o uso ilícito.",
        ],
      },
      {
        title: "12. Suspensión, ley y cambios",
        paragraphs: [
          "CarrierTrust puede advertir, limitar, suspender o terminar cuenta, acceso, contenido o función de pago ante incumplimiento razonablemente sospechado, actividad ilegal, riesgo de seguridad, abuso de avisos, impago, falsa autoridad o riesgo para usuarios, terceros o plataforma. Los registros necesarios pueden conservarse por cumplimiento, disputas, fraude, copias de seguridad o reclamaciones.",
          "Estos Términos y obligaciones extracontractuales se rigen por las leyes de la República de Letonia. Los tribunales de Riga tendrán jurisdicción exclusiva salvo otro foro imperativo. Antes de proceder, la parte debería escribir a support@carriertrust.eu y permitir una oportunidad razonable de solución amistosa.",
          "CarrierTrust puede actualizar estos Términos por cambios legales, de seguridad, operativos o de producto. Los cambios materiales se comunicarán razonablemente. Las traducciones se ofrecen por comodidad; en caso de conflicto prevalece la versión inglesa en la medida permitida. Una cláusula inejecutable se limitará solo en lo mínimo necesario.",
        ],
      },
    ],
    footerNotice:
      "Las preguntas sobre estos Términos pueden enviarse a support@carriertrust.eu. Los avisos legales sobre contenido deben seguir el procedimiento de la página Legal.",
  },

  it: {
    badge: "Termini",
    title: "Termini di servizio",
    version: "Versione 2.0",
    effectiveDate: "In vigore dal 25 luglio 2026",
    operator: "Gestore della piattaforma",
    vatId: "Partita IVA",
    legalAddress: "Sede legale",
    email: "Email",
    intro: [
      "I presenti Termini costituiscono un accordo vincolante tra imprese fra SIA JAKOVLEV CAPITAL, gestore di CarrierTrust, e ogni persona o organizzazione che utilizza la piattaforma, crea un account, invia contenuti, rivendica o gestisce un profilo aziendale o acquista un servizio a pagamento.",
      "Utilizzando CarrierTrust confermi di aver letto e accettato i presenti Termini, l’Informativa sulla privacy e la Policy recensioni. Restano salvi i diritti imperativi che non possono essere esclusi o limitati.",
    ],
    sections: [
      {
        title: "1. Ambito e uso professionale",
        paragraphs: [
          "CarrierTrust è una piattaforma online di reputazione e informazione per trasporti e logistica. Può offrire profili, recensioni, risposte ufficiali, indicatori di verifica e rischio, ricerca e funzioni a pagamento. È destinata principalmente all’uso professionale.",
          "Chi agisce per un’impresa conferma di essere autorizzato a rappresentarla o vincolarla. L’uso di CarrierTrust non crea rapporti di agenzia, società, lavoro, fiducia o joint venture.",
        ],
      },
      {
        title: "2. Account, poteri e sicurezza",
        paragraphs: [
          "Devi fornire informazioni accurate, aggiornate e complete, proteggere le credenziali e correggere rapidamente i dati inesatti. Sei responsabile delle attività tramite il tuo account salvo immediata comunicazione di un uso non autorizzato.",
          "CarrierTrust può richiedere prove di identità, rappresentanza, proprietà, gestione o attività e rifiutare, limitare o sospendere l’accesso quando le informazioni non siano verificabili, siano fuorvianti o creino rischio legale, di sicurezza o abuso. Il titolare del profilo è responsabile dei manager invitati e della rimozione dei loro accessi.",
        ],
      },
      {
        title: "3. Ruolo di CarrierTrust",
        paragraphs: [
          "CarrierTrust fornisce hosting tecnico e funzioni per i contenuti degli utenti e sviluppa inoltre la propria interfaccia, etichette, procedure di verifica e regole di punteggio. Le dichiarazioni restano responsabilità dei rispettivi autori.",
          "Pubblicazione, visibilità, verifica, profilo rivendicato, abbonamento o badge non significano approvazione, conferma di ogni affermazione, garanzia di solvibilità o qualità o consiglio di effettuare una transazione. CarrierTrust non è tribunale, autorità, agenzia di rating, servizio di recupero crediti né sostituisce verifiche legali, finanziarie, sanzionatorie, di compliance o commerciali.",
        ],
      },
      {
        title: "4. Profili, contenuti e prove",
        paragraphs: [
          "I profili possono derivare da registri pubblici, siti pubblici, dati in licenza o di terzi, contributi degli utenti o informazioni dell’impresa. La loro esistenza non implica rapporto contrattuale, approvazione o partecipazione. Le informazioni importanti devono essere verificate autonomamente.",
          "Mantieni la titolarità dei contenuti e concedi a SIA JAKOVLEV CAPITAL una licenza mondiale, non esclusiva, gratuita, trasferibile e sublicenziabile per ospitarli, archiviarli, riprodurli, formattarli, tradurli, mostrarli, distribuirli, adattarli tecnicamente e moderarli quanto necessario per gestire, proteggere, migliorare, promuovere e difendere legalmente CarrierTrust.",
          "Le recensioni devono riguardare un’interazione commerciale reale, essere presentate in buona fede e rispettare la Policy recensioni. CarrierTrust può richiedere contratti, ordini di trasporto, fatture, CMR, corrispondenza, pagamenti o altre prove. Normalmente non sono pubblicate, ma possono essere conservate e comunicate se richiesto dalla legge o dalla difesa di diritti.",
        ],
        bullets: [
          "Non pubblicare dati personali non necessari, contatti privati o documenti riservati.",
          "Non caricare contenuti ottenuti illegalmente o soggetti a segreto.",
          "Non presentare sospetti, deduzioni o controversie commerciali come reati provati o decisioni ufficiali.",
        ],
      },
      {
        title: "5. Rivendicazione, verifica e stato a pagamento",
        paragraphs: [
          "Un profilo rivendicato indica che CarrierTrust ha approvato l’accesso di una persona che dichiara di rappresentare l’impresa. Un indicatore di verifica conferma unicamente i controlli espressamente descritti nella pagina di verifica quando sono stati effettuati.",
          "La verifica non certifica stabilità finanziaria, conformità, qualità, titolarità effettiva, assenza di controversie o correttezza totale del profilo. PRO o altro stato a pagamento è un abbonamento commerciale e non un punteggio positivo, approvazione indipendente o moderazione preferenziale.",
        ],
      },
      {
        title: "6. Valutazioni e Risk Index",
        paragraphs: [
          "Valutazioni, trust score, livelli di rischio, segnalazioni e indicatori analoghi possono derivare da recensioni, regole, informazioni segnalate e segnali tecnici e cambiare con nuove informazioni o metodologie.",
          "Sono esclusivamente informativi e non costituiscono rating creditizio, decisione legale, accertamento di frode, risultato sanzionatorio o raccomandazione commerciale. Ogni utente resta responsabile delle proprie verifiche e decisioni.",
        ],
      },
      {
        title: "7. Moderazione, segnalazioni e ricorsi",
        paragraphs: [
          "CarrierTrust può, senza esservi obbligata, esaminare contenuti prima o dopo la pubblicazione. Può chiedere chiarimenti o prove, etichettare, limitare la distribuzione, nascondere temporaneamente, oscurare dati personali o riservati, rimuovere contenuti, disattivare funzioni o limitare account quando necessario per legge, Termini, Policy recensioni, sicurezza o diritti di terzi.",
          "CarrierTrust non assume un obbligo generale di sorveglianza né garantisce l’immediata individuazione di ogni violazione. Le segnalazioni di contenuti presumibilmente illegali devono seguire la pagina Legal. CarrierTrust può comunicare con le parti, conservare registri, emettere una decisione motivata e consentire ricorso o contro-notifica ammissibile.",
        ],
      },
      {
        title: "8. Condotte vietate",
        paragraphs: ["Non devi utilizzare impropriamente CarrierTrust né aiutare altri a farlo."],
        bullets: [
          "Niente recensioni false, acquistate, reciproche, manipolate o in conflitto di interessi.",
          "Niente minacce, estorsione, molestie, odio, accuse illecite o richieste di pagamento per cambiare o rimuovere contenuti.",
          "Niente impersonificazione, malware, abuso di credenziali, test di sicurezza non autorizzati, scraping gravoso, elusione dei controlli o accesso automatizzato non autorizzato.",
          "Nessun uso contrario a sanzioni, controlli export, concorrenza, proprietà intellettuale, privacy o altra legge.",
        ],
      },
      {
        title: "9. Servizi a pagamento, fatturazione e imposte",
        paragraphs: [
          "Prezzo, ciclo, durata iniziale, rinnovo, funzioni, cancellazione ed eventuale costo di recesso anticipato sono quelli accettati all’acquisto o indicati in un accordo separato. I prezzi non includono IVA salvo indicazione espressa.",
          "I servizi possono rinnovarsi automaticamente quando comunicato prima dell’acquisto. Le somme non sono rimborsabili salvo previsione dell’offerta, accordo separato o legge imperativa. CarrierTrust può sospendere funzioni per mancato pagamento e usare fornitori di pagamento.",
        ],
      },
      {
        title: "10. Disponibilità e proprietà intellettuale",
        paragraphs: [
          "CarrierTrust è fornito secondo disponibilità. Manutenzione, incidenti, guasti di terzi, obblighi legali o modifiche possono causare interruzioni, ritardi o perdita di funzioni. CarrierTrust può modificare, sostituire o interrompere funzioni e adottare misure urgenti senza preavviso.",
          "Nome CarrierTrust, software, design, database, selezione e organizzazione delle informazioni, loghi e materiali propri appartengono o sono concessi a SIA JAKOVLEV CAPITAL. Senza permesso non possono essere copiati, rivenduti, sottoposti a reverse engineering o sfruttati commercialmente.",
        ],
      },
      {
        title: "11. Esclusioni, responsabilità e manleva",
        paragraphs: [
          "Nella massima misura consentita, CarrierTrust e le informazioni sono forniti senza garanzie di accuratezza, completezza, commerciabilità, idoneità, non violazione, disponibilità continua o risultato commerciale. L’utente agisce a proprio rischio professionale.",
          "Nella massima misura consentita, SIA JAKOVLEV CAPITAL non risponde di danni indiretti, incidentali, speciali, punitivi o consequenziali, perdita di profitto, ricavi, contratti, dati, reputazione, opportunità o risparmi, né di perdite da contenuti, condotta di terzi o transazioni tra utenti.",
          "Nella massima misura consentita, la responsabilità complessiva in dodici mesi è limitata alle somme pagate dal reclamante nei dodici mesi precedenti o a 100 EUR, a seconda dell’importo maggiore.",
          "Non è limitata responsabilità legalmente non escludibile, incluse frode, dolo, colpa grave, morte o lesione per negligenza e obblighi imperativi sui dati. Nella misura consentita, manlevi SIA JAKOVLEV CAPITAL, amministratori, dipendenti, collaboratori e rappresentanti da pretese di terzi, sanzioni, perdite e ragionevoli costi legali derivanti dai tuoi contenuti, violazioni, mancanza di poteri o uso illecito.",
        ],
      },
      {
        title: "12. Sospensione, legge e modifiche",
        paragraphs: [
          "CarrierTrust può avvertire, limitare, sospendere o cessare account, accesso, contenuti o funzioni a pagamento in caso di ragionevole sospetto di violazione, attività illegale, rischio sicurezza, abuso delle segnalazioni, mancato pagamento, falsa autorità o rischio per utenti, terzi o piattaforma. I registri necessari possono essere conservati per legge, controversie, frodi, backup o diritti legali.",
          "I presenti Termini e le obbligazioni extracontrattuali sono regolati dalle leggi della Repubblica di Lettonia. I tribunali di Riga hanno giurisdizione esclusiva salvo diverso foro imperativo. Prima di procedere, la parte dovrebbe scrivere a support@carriertrust.eu e consentire un ragionevole tentativo amichevole.",
          "CarrierTrust può aggiornare i Termini per cambiamenti legali, di sicurezza, operativi o di prodotto. Le modifiche rilevanti saranno comunicate ragionevolmente. Le traduzioni sono fornite per comodità; in caso di contrasto prevale la versione inglese nei limiti consentiti. Una clausola inapplicabile sarà limitata solo quanto necessario.",
        ],
      },
    ],
    footerNotice:
      "Le domande sui Termini possono essere inviate a support@carriertrust.eu. Le notifiche legali sui contenuti devono seguire la procedura della pagina Legal.",
  },
};

export default function TermsPage() {
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
                          <p key={`${sectionIndex}-p-${paragraphIndex}`}>
                            {paragraph}
                          </p>
                        ))}

                        {section.bullets && section.bullets.length > 0 ? (
                          <ul className="ml-6 list-disc space-y-1">
                            {section.bullets.map((bullet, bulletIndex) => (
                              <li key={`${sectionIndex}-b-${bulletIndex}`}>
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </section>
                  ))}

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-slate-700">
                    {t.footerNotice}
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
