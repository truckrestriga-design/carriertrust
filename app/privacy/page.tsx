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
  controller: string;
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
    badge: "Privacy",
    title: "Privacy Policy",
    version: "Version 2.0",
    effectiveDate: "Effective 25 July 2026",
    controller: "Data controller",
    vatId: "VAT ID",
    legalAddress: "Legal address",
    email: "Email",
    intro: [
      "This Privacy Policy explains how SIA JAKOVLEV CAPITAL, operating CarrierTrust, collects, uses, stores, shares and protects personal data in connection with the CarrierTrust website, accounts, company profiles, reviews, replies, reports, verification, billing, analytics and support.",
      "CarrierTrust is primarily a business-to-business platform. Company information may still contain personal data where a sole trader, director, employee, manager, representative, contact person, reviewer or other identifiable individual is involved.",
    ],
    sections: [
      {
        title: "1. Who is responsible for your data",
        paragraphs: [
          "SIA JAKOVLEV CAPITAL is the controller of personal data processed through CarrierTrust, unless a separate notice expressly states otherwise.",
          "Privacy requests should be sent to support@carriertrust.eu. CarrierTrust may request information reasonably necessary to verify the identity and authority of the requester before disclosing, changing or deleting data.",
        ],
      },
      {
        title: "2. Personal data we collect",
        paragraphs: [
          "The categories collected depend on how you use CarrierTrust. We seek to collect only data reasonably necessary for the purposes described in this Policy.",
        ],
        bullets: [
          "Account and authentication data: email address, user ID, authentication records, password-reset and email-confirmation events.",
          "Company and representative data: company name, VAT number, country, company profile, role, owner or manager status, authority and verification information.",
          "Content and interaction data: reviews, ratings, official replies, reports, appeals, support requests, attachments, evidence and correspondence.",
          "Billing data: subscription, order, invoice, payment status, billing contact and tax information. Full payment-card details are normally handled by the payment provider rather than CarrierTrust.",
          "Technical and security data: IP address, timestamps, browser, operating system, device type, user agent, approximate location derived from IP, logs, rate-limit and abuse-prevention signals.",
          "Analytics and usage data: pages viewed, URL, referrer, search activity, company-profile interactions, campaign parameters, visitor and session identifiers and feature events.",
          "Communication data: messages sent to support, legal, privacy, billing or media channels and related metadata.",
          "Public and third-party data: information from public registers, public websites, licensed data sources, users, companies and service providers.",
        ],
      },
      {
        title: "3. Sources of personal data",
        paragraphs: [
          "We receive data directly from users when they register, claim a company, publish content, purchase a service, submit evidence or contact us.",
          "We may also obtain company-related and professional information from public registers, public websites, business directories, other users, the company concerned, contractors and technical service providers. Public availability does not remove the need to process personal data lawfully.",
        ],
      },
      {
        title: "4. Purposes and legal bases",
        paragraphs: [
          "We process personal data only where a legal basis applies. The applicable basis depends on the purpose and context.",
        ],
        bullets: [
          "Contract and pre-contract steps: creating and administering accounts, providing requested platform functions, processing paid services, support and account communications.",
          "Legitimate interests: operating and improving a B2B reputation platform, maintaining company profiles, enabling reviews and replies, protecting users and the platform, preventing fraud and abuse, moderating content, establishing or defending legal claims and measuring service performance where permitted by law.",
          "Legal obligations: tax, accounting, court, regulatory, law-enforcement, sanctions and other mandatory requirements.",
          "Consent: where we expressly request consent for a specific optional processing activity, including non-essential device storage or access where consent is legally required.",
          "Protection of rights: investigating complaints, preserving evidence and enforcing agreements and platform policies.",
        ],
      },
      {
        title: "5. Company profiles, reviews and public content",
        paragraphs: [
          "Company profiles, reviews, ratings and official replies are intended to be publicly visible. Public content may be indexed by search engines, copied by third parties, quoted in disputes or remain available in cached or archived form outside CarrierTrust's control.",
          "Users must not publish unnecessary personal data, confidential information or documents containing personal data unless publication is lawful and necessary. CarrierTrust may redact, restrict or remove such information.",
          "A reviewer’s personal identity is not necessarily displayed publicly, but CarrierTrust may retain account, company, technical and evidentiary data connected with the review for moderation, security and legal purposes.",
        ],
      },
      {
        title: "6. Analytics, browser storage and similar technologies",
        paragraphs: [
          "CarrierTrust may use cookies, local storage, session storage and similar technologies for authentication, language preferences, security, session continuity, analytics and service improvement.",
          "Analytics may include a first-party visitor identifier, session identifier, viewed URL, referrer, campaign parameters, browser, device and interaction events. These data help us understand usage, diagnose problems, measure campaigns, prevent abuse and improve the platform.",
          "Technologies strictly necessary for the requested service may be used without consent where permitted. Where applicable law requires consent for non-essential analytics or access to information on a user’s device, CarrierTrust will rely on consent and provide a method to withdraw it. This Privacy Policy is information and does not by itself constitute consent.",
        ],
      },
      {
        title: "7. Risk indicators and automated processing",
        paragraphs: [
          "CarrierTrust may calculate ratings, trust scores, risk levels, flags and similar indicators using reviews, ratings, platform rules, reported information and technical signals.",
          "These indicators are informational and are not intended to produce a solely automated decision that creates legal effects or similarly significantly affects an individual. CarrierTrust may review, correct or override indicators and may provide a human review where required by law or platform procedure.",
        ],
      },
      {
        title: "8. Recipients and service providers",
        paragraphs: [
          "We disclose personal data only where reasonably necessary for the purposes described in this Policy.",
        ],
        bullets: [
          "Hosting, database, authentication, storage and infrastructure providers, including services such as Supabase and Vercel.",
          "Email, support, security, monitoring, analytics and communication providers.",
          "Payment, billing, tax and accounting providers where paid services are used.",
          "Professional advisers, insurers, auditors and contractors subject to appropriate duties.",
          "Courts, regulators, law-enforcement bodies and other authorities where legally required.",
          "A purchaser, investor or successor in connection with a genuine merger, financing, restructuring, asset transfer or sale, subject to appropriate confidentiality and legal safeguards.",
          "Affected users or third parties where reasonably necessary to investigate a complaint, protect rights or resolve a dispute.",
        ],
      },
      {
        title: "9. International transfers",
        paragraphs: [
          "We aim to use service providers and processing locations within the European Economic Area where reasonably possible. Some providers or their support, security or sub-processors may process data outside the EEA.",
          "Where required, transfers are based on an adequacy decision, the European Commission’s Standard Contractual Clauses or another lawful safeguard. Information about applicable safeguards may be requested through the privacy contact.",
        ],
      },
      {
        title: "10. Retention",
        paragraphs: [
          "We keep personal data only for as long as reasonably necessary for the relevant purpose, taking account of account status, content visibility, contractual obligations, security, backups, disputes, limitation periods and legal retention duties.",
        ],
        bullets: [
          "Account and profile data may be retained while an account or company relationship remains active and for a reasonable period afterwards.",
          "Published content and associated moderation records may be retained while the content is available and afterwards where needed for disputes, repeat-abuse prevention or legal claims.",
          "Billing, tax and accounting records are retained for the period required by applicable law.",
          "Security and technical logs are retained according to operational and security needs and may be kept longer where an incident, investigation or claim requires it.",
          "Backups may retain deleted data for a limited rolling period before secure overwrite.",
        ],
      },
      {
        title: "11. Security",
        paragraphs: [
          "We use organisational and technical measures designed to protect data against unauthorised access, alteration, disclosure, loss and destruction. Measures may include access controls, authentication, encryption in transit, logging, backups, role-based permissions and service-provider safeguards.",
          "No online service can guarantee absolute security. Users must protect their credentials, use a strong unique password and notify CarrierTrust promptly of suspected account compromise.",
        ],
      },
      {
        title: "12. Your data-protection rights",
        paragraphs: [
          "Subject to the GDPR and any applicable limitations, an individual may have the right to access, rectify, erase, restrict or object to processing and, in certain cases, receive data in a portable format.",
          "Where processing is based on consent, consent may be withdrawn at any time without affecting processing already carried out lawfully. Where processing is based on legitimate interests, an objection will be assessed against compelling legitimate grounds and the need to establish, exercise or defend legal claims.",
          "Rights are not absolute. We may retain or withhold data where required by law, necessary to protect the rights of others, covered by legal privilege, or required for security, fraud prevention or legal claims.",
        ],
      },
      {
        title: "13. How to make a privacy request",
        paragraphs: [
          "Send a clear request to support@carriertrust.eu and identify the relevant account, company or content. Do not send sensitive identification documents unless requested.",
          "We may ask for reasonable verification and clarification. We normally respond within the period required by law. Manifestly unfounded or excessive requests may be refused or subject to a reasonable administrative fee where the law permits.",
        ],
      },
      {
        title: "14. Complaints",
        paragraphs: [
          "We encourage you to contact CarrierTrust first so that we can investigate and respond.",
          "You also have the right to lodge a complaint with the Latvian Data State Inspectorate (Datu valsts inspekcija) or, where applicable, another competent EEA supervisory authority.",
        ],
      },
      {
        title: "15. Children and sensitive data",
        paragraphs: [
          "CarrierTrust is a business platform and is not intended for children. Users must not submit children’s data or special-category personal data unless there is a clear lawful basis and the information is strictly necessary.",
          "CarrierTrust may remove or restrict sensitive information and may request additional justification before processing it.",
        ],
      },
      {
        title: "16. Third-party links",
        paragraphs: [
          "CarrierTrust may link to third-party websites and services. Their privacy practices are controlled by those third parties, and this Policy does not apply to their independent processing.",
        ],
      },
      {
        title: "17. Changes to this Policy",
        paragraphs: [
          "We may update this Policy to reflect legal, technical, security or operational changes. The version and effective date appear at the top of the page. Material changes may be communicated through the platform, by email or by requesting renewed acceptance where appropriate.",
          "Translations are provided for convenience. The English version governs in the event of inconsistency, to the extent permitted by mandatory law.",
        ],
      },
    ],
    closing:
      "Privacy questions and requests may be sent to support@carriertrust.eu. Content-removal notices should follow the procedure on the Legal page.",
  },

  de: {
    badge: "Datenschutz",
    title: "Datenschutzerklärung",
    version: "Version 2.0",
    effectiveDate: "Gültig ab 25. Juli 2026",
    controller: "Verantwortlicher",
    vatId: "USt-IdNr.",
    legalAddress: "Sitz",
    email: "E-Mail",
    intro: [
      "Diese Datenschutzerklärung erläutert, wie SIA JAKOVLEV CAPITAL als Betreiberin von CarrierTrust personenbezogene Daten im Zusammenhang mit Website, Konten, Unternehmensprofilen, Bewertungen, Antworten, Meldungen, Verifizierung, Abrechnung, Analyse und Support erhebt, nutzt, speichert, weitergibt und schützt.",
      "CarrierTrust ist in erster Linie eine B2B-Plattform. Unternehmensdaten können dennoch personenbezogene Daten enthalten, wenn Einzelunternehmer, Geschäftsführer, Mitarbeiter, Manager, Vertreter, Ansprechpartner, Verfasser von Bewertungen oder andere identifizierbare Personen betroffen sind.",
    ],
    sections: [
      {
        title: "1. Verantwortlicher",
        paragraphs: [
          "SIA JAKOVLEV CAPITAL ist Verantwortlicher für die über CarrierTrust verarbeiteten personenbezogenen Daten, sofern nicht ausdrücklich etwas anderes mitgeteilt wird.",
          "Datenschutzanfragen sind an support@carriertrust.eu zu richten. Vor Offenlegung, Änderung oder Löschung kann CarrierTrust Informationen verlangen, die zur Überprüfung von Identität und Berechtigung vernünftigerweise erforderlich sind.",
        ],
      },
      {
        title: "2. Von uns verarbeitete Daten",
        paragraphs: [
          "Die Kategorien hängen von der Nutzung ab. Wir bemühen uns, nur Daten zu verarbeiten, die für die beschriebenen Zwecke vernünftigerweise erforderlich sind.",
        ],
        bullets: [
          "Konto- und Authentifizierungsdaten: E-Mail-Adresse, Nutzer-ID, Anmeldeereignisse, Passwortzurücksetzung und E-Mail-Bestätigung.",
          "Unternehmens- und Vertreterdaten: Firmenname, USt-IdNr., Land, Profil, Rolle, Owner- oder Managerstatus, Vertretungsmacht und Verifizierung.",
          "Inhalte und Interaktionen: Bewertungen, Noten, offizielle Antworten, Meldungen, Beschwerden, Supportanfragen, Anlagen, Nachweise und Korrespondenz.",
          "Abrechnungsdaten: Abonnement, Bestellung, Rechnung, Zahlungsstatus, Rechnungskontakt und Steuerdaten. Vollständige Kartendaten werden grundsätzlich vom Zahlungsdienstleister verarbeitet.",
          "Technische und Sicherheitsdaten: IP-Adresse, Zeitstempel, Browser, Betriebssystem, Gerät, User-Agent, aus der IP abgeleiteter ungefährer Standort, Protokolle sowie Signale zur Missbrauchsverhinderung.",
          "Analyse- und Nutzungsdaten: aufgerufene Seiten, URL, Referrer, Suchaktivität, Profilinteraktionen, Kampagnenparameter, Besucher- und Sitzungskennungen sowie Funktionsereignisse.",
          "Kommunikationsdaten: Nachrichten an Support, Recht, Datenschutz, Abrechnung oder Medien und zugehörige Metadaten.",
          "Öffentliche und Drittquellen: öffentliche Register, Websites, lizenzierte Quellen, Nutzer, Unternehmen und Dienstleister.",
        ],
      },
      {
        title: "3. Datenquellen",
        paragraphs: [
          "Wir erhalten Daten direkt bei Registrierung, Profilbeanspruchung, Veröffentlichung, Kauf, Nachweisübermittlung oder Kontaktaufnahme.",
          "Unternehmensbezogene und berufliche Angaben können auch aus öffentlichen Registern, Websites, Verzeichnissen, anderen Nutzern, dem betroffenen Unternehmen, Auftragnehmern und technischen Dienstleistern stammen. Öffentliche Verfügbarkeit ersetzt keine rechtmäßige Verarbeitung.",
        ],
      },
      {
        title: "4. Zwecke und Rechtsgrundlagen",
        paragraphs: [
          "Wir verarbeiten Daten nur auf einer anwendbaren Rechtsgrundlage.",
        ],
        bullets: [
          "Vertrag und vorvertragliche Maßnahmen: Konten, Plattformfunktionen, kostenpflichtige Dienste, Support und kontobezogene Kommunikation.",
          "Berechtigte Interessen: Betrieb und Verbesserung einer B2B-Reputationsplattform, Unternehmensprofile, Bewertungen und Antworten, Sicherheit, Betrugs- und Missbrauchsprävention, Moderation, Rechtsansprüche und Leistungsmessung, soweit gesetzlich zulässig.",
          "Rechtliche Pflichten: Steuer-, Buchhaltungs-, Gerichts-, Behörden-, Strafverfolgungs-, Sanktions- und sonstige zwingende Anforderungen.",
          "Einwilligung: ausdrücklich angeforderte optionale Verarbeitung, einschließlich nicht notwendiger Speicherung oder Zugriffe auf Endgeräte, soweit eine Einwilligung vorgeschrieben ist.",
          "Rechtsschutz: Beschwerden, Beweissicherung und Durchsetzung von Verträgen und Plattformregeln.",
        ],
      },
      {
        title: "5. Profile, Bewertungen und öffentliche Inhalte",
        paragraphs: [
          "Profile, Bewertungen, Noten und offizielle Antworten sind zur öffentlichen Anzeige bestimmt. Öffentliche Inhalte können von Suchmaschinen indexiert, von Dritten kopiert, in Streitigkeiten zitiert oder außerhalb der Kontrolle von CarrierTrust zwischengespeichert bzw. archiviert werden.",
          "Nutzer dürfen keine unnötigen personenbezogenen Daten, vertraulichen Informationen oder Dokumente veröffentlichen, sofern dies nicht rechtmäßig und erforderlich ist. CarrierTrust kann solche Angaben schwärzen, einschränken oder entfernen.",
          "Die persönliche Identität eines Verfassers wird nicht zwingend öffentlich angezeigt. Konten-, Unternehmens-, technische und Nachweisdaten können jedoch für Moderation, Sicherheit und Rechtszwecke gespeichert werden.",
        ],
      },
      {
        title: "6. Analyse, Browserspeicher und ähnliche Technologien",
        paragraphs: [
          "CarrierTrust kann Cookies, Local Storage, Session Storage und ähnliche Technologien für Anmeldung, Spracheinstellung, Sicherheit, Sitzungskontinuität, Analyse und Verbesserung einsetzen.",
          "Analysedaten können eine First-Party-Besucherkennung, Sitzungskennung, URL, Referrer, Kampagnenparameter, Browser, Gerät und Interaktionen umfassen.",
          "Unbedingt notwendige Technologien können, soweit zulässig, ohne Einwilligung verwendet werden. Soweit das Recht für nicht notwendige Analyse oder den Zugriff auf Endgeräte eine Einwilligung verlangt, stützt sich CarrierTrust auf eine Einwilligung und ermöglicht deren Widerruf. Diese Erklärung ist Information und selbst keine Einwilligung.",
        ],
      },
      {
        title: "7. Risikoindikatoren und automatisierte Verarbeitung",
        paragraphs: [
          "CarrierTrust kann Bewertungen, Vertrauenswerte, Risikostufen und Kennzeichnungen aus Bewertungen, Plattformregeln, Meldungen und technischen Signalen berechnen.",
          "Sie dienen der Information und sollen keine ausschließlich automatisierte Entscheidung mit rechtlicher oder ähnlich erheblicher Wirkung für eine Person darstellen. CarrierTrust kann Ergebnisse prüfen, korrigieren oder überschreiben und bietet, soweit erforderlich, eine menschliche Prüfung.",
        ],
      },
      {
        title: "8. Empfänger und Dienstleister",
        paragraphs: ["Wir geben Daten nur weiter, soweit dies für die beschriebenen Zwecke vernünftigerweise erforderlich ist."],
        bullets: [
          "Hosting-, Datenbank-, Authentifizierungs-, Speicher- und Infrastruktur-Anbieter wie Supabase und Vercel.",
          "E-Mail-, Support-, Sicherheits-, Monitoring-, Analyse- und Kommunikationsanbieter.",
          "Zahlungs-, Abrechnungs-, Steuer- und Buchhaltungsanbieter.",
          "Berater, Versicherer, Prüfer und Auftragnehmer mit angemessenen Pflichten.",
          "Gerichte, Behörden und Strafverfolgungsstellen, soweit gesetzlich erforderlich.",
          "Erwerber, Investor oder Rechtsnachfolger bei tatsächlicher Finanzierung, Umstrukturierung, Fusion, Vermögensübertragung oder Verkauf.",
          "Betroffene Nutzer oder Dritte, soweit dies zur Beschwerdeprüfung, zum Schutz von Rechten oder zur Streitbeilegung erforderlich ist.",
        ],
      },
      {
        title: "9. Internationale Übermittlungen",
        paragraphs: [
          "Wir bemühen uns um Anbieter und Verarbeitungsorte im EWR. Anbieter oder deren Support-, Sicherheits- oder Unterauftragsverarbeiter können Daten außerhalb des EWR verarbeiten.",
          "Erforderliche Übermittlungen beruhen auf einem Angemessenheitsbeschluss, EU-Standardvertragsklauseln oder anderen zulässigen Garantien.",
        ],
      },
      {
        title: "10. Speicherdauer",
        paragraphs: [
          "Daten werden nur so lange gespeichert, wie dies für den Zweck vernünftigerweise erforderlich ist. Maßgeblich sind Kontostatus, Sichtbarkeit von Inhalten, Vertrags- und Rechtspflichten, Sicherheit, Sicherungskopien, Streitigkeiten und Verjährung.",
        ],
        bullets: [
          "Konto- und Profildaten während aktiver Nutzung und für einen angemessenen Zeitraum danach.",
          "Inhalte und Moderationsunterlagen während der Veröffentlichung und danach, soweit für Streitigkeiten, Wiederholungsmissbrauch oder Rechtsansprüche erforderlich.",
          "Abrechnungs-, Steuer- und Buchhaltungsunterlagen für die gesetzlich vorgeschriebene Dauer.",
          "Sicherheits- und Technikprotokolle nach betrieblichen Erfordernissen, bei Vorfällen oder Verfahren gegebenenfalls länger.",
          "Sicherungskopien können gelöschte Daten für einen begrenzten rollierenden Zeitraum enthalten.",
        ],
      },
      {
        title: "11. Sicherheit",
        paragraphs: [
          "Wir setzen organisatorische und technische Maßnahmen ein, darunter Zugriffskontrollen, Authentifizierung, Verschlüsselung bei Übertragung, Protokollierung, Backups, Rollenberechtigungen und Anbietersicherungen.",
          "Absolute Sicherheit kann nicht garantiert werden. Nutzer müssen Zugangsdaten schützen und verdächtige Nutzung unverzüglich melden.",
        ],
      },
      {
        title: "12. Ihre Rechte",
        paragraphs: [
          "Vorbehaltlich der DSGVO und gesetzlicher Einschränkungen bestehen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und gegebenenfalls Datenübertragbarkeit.",
          "Einwilligungen können jederzeit mit Wirkung für die Zukunft widerrufen werden. Bei berechtigten Interessen wird ein Widerspruch gegen zwingende schutzwürdige Gründe und Rechtsansprüche abgewogen.",
          "Rechte sind nicht absolut. Daten können aufgrund gesetzlicher Pflichten, Rechte anderer, rechtlicher Vertraulichkeit, Sicherheit, Betrugsprävention oder Rechtsansprüchen aufbewahrt oder zurückgehalten werden.",
        ],
      },
      {
        title: "13. Datenschutzanfragen",
        paragraphs: [
          "Senden Sie die Anfrage an support@carriertrust.eu und benennen Sie Konto, Unternehmen oder Inhalt. Übermitteln Sie keine sensiblen Ausweisdokumente, sofern diese nicht angefordert wurden.",
          "Wir können Identität und Anfrage angemessen prüfen. Offensichtlich unbegründete oder exzessive Anfragen können, soweit zulässig, abgelehnt oder mit einer angemessenen Gebühr belegt werden.",
        ],
      },
      {
        title: "14. Beschwerden",
        paragraphs: [
          "Bitte kontaktieren Sie zunächst CarrierTrust, damit wir den Vorgang prüfen können.",
          "Sie können sich außerdem bei der lettischen Datenschutzaufsicht Datu valsts inspekcija oder einer anderen zuständigen EWR-Aufsichtsbehörde beschweren.",
        ],
      },
      {
        title: "15. Kinder und sensible Daten",
        paragraphs: [
          "CarrierTrust ist eine Geschäftsplattform und nicht für Kinder bestimmt. Kinder- oder besondere Kategorien personenbezogener Daten dürfen nur bei klarer Rechtsgrundlage und strikter Erforderlichkeit übermittelt werden.",
          "CarrierTrust kann sensible Angaben entfernen oder einschränken und zusätzliche Begründungen verlangen.",
        ],
      },
      {
        title: "16. Links Dritter",
        paragraphs: [
          "Für unabhängige Verarbeitungen auf verlinkten Websites und Diensten Dritter gelten deren eigene Datenschutzregeln.",
        ],
      },
      {
        title: "17. Änderungen",
        paragraphs: [
          "Diese Erklärung kann wegen rechtlicher, technischer, sicherheitsbezogener oder betrieblicher Änderungen aktualisiert werden. Version und Datum stehen oben. Wesentliche Änderungen können über die Plattform, per E-Mail oder durch erneute Zustimmung mitgeteilt werden.",
          "Übersetzungen dienen der Benutzerfreundlichkeit. Bei Widersprüchen ist, soweit zwingendes Recht dies erlaubt, die englische Fassung maßgeblich.",
        ],
      },
    ],
    closing:
      "Datenschutzfragen und -anfragen richten Sie an support@carriertrust.eu. Anträge auf Entfernung von Inhalten sind nach dem Verfahren auf der Rechtsseite einzureichen.",
  },

  ru: {
    badge: "Конфиденциальность",
    title: "Политика конфиденциальности",
    version: "Версия 2.0",
    effectiveDate: "Действует с 25 июля 2026 года",
    controller: "Контролёр персональных данных",
    vatId: "VAT ID",
    legalAddress: "Юридический адрес",
    email: "Email",
    intro: [
      "Настоящая Политика объясняет, как SIA JAKOVLEV CAPITAL, оператор CarrierTrust, собирает, использует, хранит, передаёт и защищает персональные данные в связи с сайтом, аккаунтами, профилями компаний, отзывами, ответами, жалобами, верификацией, оплатой, аналитикой и поддержкой.",
      "CarrierTrust является преимущественно B2B-платформой. При этом сведения о компании могут содержать персональные данные индивидуального предпринимателя, руководителя, сотрудника, менеджера, представителя, контактного лица, автора отзыва или другого определяемого человека.",
    ],
    sections: [
      {
        title: "1. Кто отвечает за данные",
        paragraphs: [
          "SIA JAKOVLEV CAPITAL является контролёром персональных данных, обрабатываемых через CarrierTrust, если отдельное уведомление прямо не устанавливает иное.",
          "Запросы направляются на support@carriertrust.eu. До раскрытия, изменения или удаления данных CarrierTrust вправе запросить разумно необходимые сведения для подтверждения личности и полномочий заявителя.",
        ],
      },
      {
        title: "2. Какие данные мы обрабатываем",
        paragraphs: [
          "Категории зависят от способа использования платформы. Мы стремимся собирать только разумно необходимые данные.",
        ],
        bullets: [
          "Аккаунт и аутентификация: email, идентификатор пользователя, события входа, сброса пароля и подтверждения email.",
          "Компания и представители: название, VAT, страна, профиль, роль, статус Owner или Manager, полномочия и данные верификации.",
          "Контент и взаимодействия: отзывы, оценки, официальные ответы, жалобы, апелляции, поддержка, вложения, доказательства и переписка.",
          "Оплата: подписка, заказ, счёт, статус платежа, платёжный контакт и налоговые данные. Полные данные банковской карты обычно обрабатывает платёжный провайдер.",
          "Технические данные и безопасность: IP, время, браузер, ОС, устройство, user agent, примерное местоположение по IP, логи, лимиты и сигналы злоупотребления.",
          "Аналитика и использование: просмотренные страницы, URL, referrer, поиск, взаимодействие с профилями, параметры кампаний, visitor ID, session ID и события функций.",
          "Коммуникации: сообщения в поддержку, legal, privacy, billing и media и связанные метаданные.",
          "Публичные и сторонние источники: реестры, сайты, лицензированные источники, пользователи, компании и поставщики услуг.",
        ],
      },
      {
        title: "3. Источники данных",
        paragraphs: [
          "Мы получаем данные непосредственно при регистрации, подтверждении профиля, публикации, покупке, отправке доказательств или обращении.",
          "Профессиональные и корпоративные сведения также могут поступать из публичных реестров, сайтов, бизнес-каталогов, от других пользователей, компании, подрядчиков и технических поставщиков. Публичность данных не отменяет требований законной обработки.",
        ],
      },
      {
        title: "4. Цели и правовые основания",
        paragraphs: ["Мы обрабатываем данные только при наличии применимого правового основания."],
        bullets: [
          "Договор и действия до заключения договора: аккаунты, функции платформы, платные услуги, поддержка и сообщения по аккаунту.",
          "Законные интересы: работа и улучшение B2B-платформы репутации, профили компаний, отзывы и ответы, безопасность, предотвращение мошенничества и злоупотреблений, модерация, юридические требования и анализ работы сервиса — в допустимых законом пределах.",
          "Юридические обязанности: налоги, бухгалтерия, суды, органы власти, правоохранительные требования, санкции и иные обязательные требования.",
          "Согласие: отдельные необязательные операции, для которых мы прямо запрашиваем согласие, включая несущественное хранение или доступ к данным на устройстве, когда закон требует согласия.",
          "Защита прав: рассмотрение жалоб, сохранение доказательств и исполнение договоров и правил платформы.",
        ],
      },
      {
        title: "5. Профили, отзывы и публичный контент",
        paragraphs: [
          "Профили компаний, отзывы, оценки и официальные ответы предназначены для публичного отображения. Они могут индексироваться поисковиками, копироваться третьими лицами, цитироваться в спорах и сохраняться в кэше или архивах вне контроля CarrierTrust.",
          "Запрещено публиковать избыточные персональные данные, конфиденциальную информацию или документы с персональными данными без законной необходимости. CarrierTrust вправе удалить, скрыть или отредактировать такие сведения.",
          "Личность автора не обязательно показывается публично, но данные аккаунта, компании, технические сведения и доказательства могут храниться для модерации, безопасности и юридической защиты.",
        ],
      },
      {
        title: "6. Аналитика, хранение в браузере и аналогичные технологии",
        paragraphs: [
          "CarrierTrust может использовать cookies, localStorage, sessionStorage и аналогичные технологии для входа, языка, безопасности, сохранения сессии, аналитики и улучшения сервиса.",
          "Аналитика может включать собственный visitor ID, session ID, URL, referrer, параметры кампании, браузер, устройство и события взаимодействия.",
          "Строго необходимые технологии могут применяться без согласия, когда это разрешено. Когда применимое право требует согласия для необязательной аналитики или доступа к данным на устройстве, CarrierTrust основывается на согласии и предоставляет возможность его отозвать. Настоящая Политика является информацией и сама по себе не является согласием.",
        ],
      },
      {
        title: "7. Индикаторы риска и автоматизированная обработка",
        paragraphs: [
          "CarrierTrust может рассчитывать рейтинги, trust score, уровни риска и флаги на основании отзывов, правил, сообщений и технических сигналов.",
          "Они носят информационный характер и не предназначены для принятия исключительно автоматизированного решения, создающего юридические или аналогично существенные последствия для человека. CarrierTrust может проверить, исправить или отменить результат и предоставить человеческую проверку, когда это требуется.",
        ],
      },
      {
        title: "8. Получатели и поставщики услуг",
        paragraphs: ["Мы раскрываем данные только в разумно необходимом объёме."],
        bullets: [
          "Хостинг, базы данных, аутентификация, хранение и инфраструктура, включая сервисы типа Supabase и Vercel.",
          "Email, поддержка, безопасность, мониторинг, аналитика и коммуникации.",
          "Платежи, billing, налоги и бухгалтерия.",
          "Юристы, страховщики, аудиторы и подрядчики с соответствующими обязанностями.",
          "Суды, регуляторы, правоохранительные и другие органы, когда это требуется законом.",
          "Покупатель, инвестор или правопреемник при реальном финансировании, реорганизации, слиянии, передаче активов или продаже.",
          "Затронутые пользователи или третьи лица, когда это необходимо для жалобы, защиты прав или разрешения спора.",
        ],
      },
      {
        title: "9. Международная передача",
        paragraphs: [
          "Мы стремимся использовать поставщиков и обработку в ЕЭЗ. Некоторые поставщики, поддержка, безопасность или субподрядчики могут обрабатывать данные за пределами ЕЭЗ.",
          "Когда требуется, передача основывается на решении об адекватности, стандартных договорных положениях Европейской комиссии или иной законной гарантии.",
        ],
      },
      {
        title: "10. Срок хранения",
        paragraphs: [
          "Мы храним данные не дольше, чем разумно необходимо с учётом статуса аккаунта, публичности контента, договора, безопасности, резервных копий, споров, исковой давности и требований закона.",
        ],
        bullets: [
          "Аккаунт и профиль — во время активности и разумный период после её окончания.",
          "Контент и модерационные материалы — пока контент доступен и после этого, если требуется для споров, повторных нарушений или юридических требований.",
          "Платёжные, налоговые и бухгалтерские документы — установленный законом срок.",
          "Технические и security logs — по операционным потребностям, дольше при инциденте, расследовании или споре.",
          "Резервные копии могут ограниченное время содержать удалённые данные до планового перезаписывания.",
        ],
      },
      {
        title: "11. Безопасность",
        paragraphs: [
          "Мы применяем организационные и технические меры: контроль доступа, аутентификацию, шифрование при передаче, логирование, резервные копии, роли и меры поставщиков.",
          "Абсолютную безопасность онлайн-сервиса гарантировать невозможно. Пользователь обязан защищать данные входа и быстро сообщать о подозрении на компрометацию.",
        ],
      },
      {
        title: "12. Ваши права",
        paragraphs: [
          "С учётом GDPR и применимых ограничений человек может иметь право на доступ, исправление, удаление, ограничение, возражение и в определённых случаях перенос данных.",
          "Согласие можно отозвать в любое время на будущее. Возражение против законного интереса оценивается с учётом преобладающих оснований и необходимости предъявления, осуществления или защиты юридических требований.",
          "Права не абсолютны. Данные могут сохраняться из-за закона, прав других лиц, юридической тайны, безопасности, предотвращения мошенничества или судебных требований.",
        ],
      },
      {
        title: "13. Как подать запрос",
        paragraphs: [
          "Направьте запрос на support@carriertrust.eu и укажите относящийся аккаунт, компанию или контент. Не отправляйте чувствительные удостоверяющие документы без запроса.",
          "Мы вправе разумно проверить личность и уточнить запрос. Явно необоснованные или чрезмерные обращения могут быть отклонены либо облагаться разумной административной платой, когда это допускает закон.",
        ],
      },
      {
        title: "14. Жалобы",
        paragraphs: [
          "Рекомендуем сначала обратиться в CarrierTrust для проверки ситуации.",
          "Вы также вправе подать жалобу в латвийскую Datu valsts inspekcija или другой компетентный надзорный орган ЕЭЗ.",
        ],
      },
      {
        title: "15. Дети и чувствительные данные",
        paragraphs: [
          "CarrierTrust является деловой платформой и не предназначен для детей. Запрещено передавать данные детей и специальные категории данных без чёткого основания и строгой необходимости.",
          "CarrierTrust вправе удалить или ограничить чувствительные сведения и запросить дополнительное обоснование.",
        ],
      },
      {
        title: "16. Сторонние ссылки",
        paragraphs: [
          "Обработка на сторонних сайтах и сервисах регулируется их собственными политиками. Настоящая Политика на их независимую деятельность не распространяется.",
        ],
      },
      {
        title: "17. Изменения",
        paragraphs: [
          "Политика может обновляться из-за юридических, технических, операционных изменений или безопасности. Версия и дата указаны сверху. О существенных изменениях можно сообщить через платформу, email или повторное принятие.",
          "Переводы предоставляются для удобства. При расхождении английская версия имеет преимущественную силу, насколько это допускает обязательное право.",
        ],
      },
    ],
    closing:
      "Вопросы и запросы по данным направляйте на support@carriertrust.eu. Уведомления об удалении контента подаются по процедуре на странице Legal.",
  },

  fr: {
    badge: "Confidentialité",
    title: "Politique de confidentialité",
    version: "Version 2.0",
    effectiveDate: "En vigueur le 25 juillet 2026",
    controller: "Responsable du traitement",
    vatId: "N° de TVA",
    legalAddress: "Siège social",
    email: "Email",
    intro: [
      "La présente Politique explique comment SIA JAKOVLEV CAPITAL, exploitant de CarrierTrust, collecte, utilise, conserve, partage et protège les données personnelles liées au site, aux comptes, profils, avis, réponses, signalements, vérifications, paiements, analyses et assistance.",
      "CarrierTrust est principalement une plateforme B2B. Les informations professionnelles peuvent néanmoins constituer des données personnelles lorsqu’elles concernent un entrepreneur individuel, dirigeant, salarié, manager, représentant, contact, auteur d’avis ou autre personne identifiable.",
    ],
    sections: [
      {
        title: "1. Responsable du traitement",
        paragraphs: [
          "SIA JAKOVLEV CAPITAL est responsable des données traitées via CarrierTrust, sauf indication expresse contraire.",
          "Les demandes sont à adresser à support@carriertrust.eu. CarrierTrust peut demander les informations raisonnablement nécessaires pour vérifier l’identité et les pouvoirs du demandeur.",
        ],
      },
      {
        title: "2. Données traitées",
        paragraphs: ["Les catégories dépendent de l’usage. Nous cherchons à limiter les données à ce qui est raisonnablement nécessaire."],
        bullets: [
          "Compte et authentification : email, identifiant, connexions, réinitialisation du mot de passe et confirmation de l’email.",
          "Entreprise et représentants : nom, TVA, pays, profil, rôle, statut Owner ou Manager, pouvoirs et vérification.",
          "Contenus et interactions : avis, notes, réponses, signalements, recours, assistance, pièces, preuves et correspondance.",
          "Facturation : abonnement, commande, facture, paiement, contact de facturation et données fiscales. Les données complètes de carte sont normalement traitées par le prestataire de paiement.",
          "Technique et sécurité : IP, horodatage, navigateur, système, appareil, user agent, localisation approximative, journaux et signaux anti-abus.",
          "Analyse et usage : pages, URL, referrer, recherches, interactions, campagnes, identifiants visiteur et session et événements.",
          "Communications : messages adressés au support, service juridique, confidentialité, facturation ou médias.",
          "Sources publiques et tierces : registres, sites, sources sous licence, utilisateurs, entreprises et prestataires.",
        ],
      },
      {
        title: "3. Sources",
        paragraphs: [
          "Les données sont reçues directement lors de l’inscription, de la revendication, de la publication, de l’achat, de l’envoi de preuves ou d’un contact.",
          "Elles peuvent aussi provenir de registres, sites et annuaires publics, d’utilisateurs, de l’entreprise, de prestataires ou de fournisseurs techniques. Le caractère public ne dispense pas du respect de la loi.",
        ],
      },
      {
        title: "4. Finalités et bases juridiques",
        paragraphs: ["Nous traitons les données uniquement lorsqu’une base juridique s’applique."],
        bullets: [
          "Contrat et mesures précontractuelles : comptes, fonctions, services payants, assistance et communications.",
          "Intérêts légitimes : exploitation et amélioration de la plateforme B2B, profils, avis, réponses, sécurité, prévention des fraudes et abus, modération, actions en justice et mesure des performances, lorsque la loi le permet.",
          "Obligations légales : fiscalité, comptabilité, tribunaux, autorités, sanctions et autres exigences.",
          "Consentement : opérations optionnelles pour lesquelles il est expressément demandé, y compris stockage ou accès non essentiel sur l’appareil lorsque requis.",
          "Protection des droits : traitement des plaintes, conservation des preuves et exécution des accords et règles.",
        ],
      },
      {
        title: "5. Profils, avis et contenus publics",
        paragraphs: [
          "Les profils, avis, notes et réponses officielles sont destinés à être publics. Ils peuvent être indexés, copiés, cités ou conservés dans des caches ou archives hors du contrôle de CarrierTrust.",
          "Les utilisateurs ne doivent pas publier de données personnelles inutiles, informations confidentielles ou documents personnels sans nécessité légale. CarrierTrust peut les masquer, limiter ou retirer.",
          "L’identité personnelle d’un auteur n’est pas nécessairement publique, mais les données de compte, d’entreprise, techniques et probatoires peuvent être conservées.",
        ],
      },
      {
        title: "6. Analyse et technologies de navigateur",
        paragraphs: [
          "CarrierTrust peut utiliser cookies, stockage local, stockage de session et technologies similaires pour l’authentification, la langue, la sécurité, les sessions, l’analyse et l’amélioration.",
          "L’analyse peut inclure un identifiant visiteur, un identifiant de session, URL, referrer, paramètres de campagne, navigateur, appareil et événements.",
          "Les technologies strictement nécessaires peuvent être utilisées sans consentement lorsque la loi le permet. Lorsque le consentement est requis pour l’analyse non essentielle ou l’accès à l’appareil, CarrierTrust s’appuie sur ce consentement et permet son retrait. La présente Politique n’est pas en elle-même un consentement.",
        ],
      },
      {
        title: "7. Indicateurs de risque et automatisation",
        paragraphs: [
          "CarrierTrust peut calculer notes, scores, niveaux de risque et alertes à partir d’avis, règles, signalements et signaux techniques.",
          "Ils sont informatifs et ne visent pas à produire une décision exclusivement automatisée ayant un effet juridique ou similaire sur une personne. CarrierTrust peut vérifier, corriger ou remplacer un résultat et assurer un examen humain lorsque requis.",
        ],
      },
      {
        title: "8. Destinataires",
        paragraphs: ["Les données ne sont communiquées que dans la mesure raisonnablement nécessaire."],
        bullets: [
          "Hébergement, bases de données, authentification, stockage et infrastructure, tels que Supabase et Vercel.",
          "Email, assistance, sécurité, monitoring, analyse et communication.",
          "Paiement, facturation, fiscalité et comptabilité.",
          "Conseils professionnels, assureurs, auditeurs et prestataires soumis à des obligations.",
          "Tribunaux, régulateurs et autorités lorsque la loi l’exige.",
          "Acquéreur, investisseur ou successeur lors d’une opération réelle de financement, restructuration, fusion, transfert ou vente.",
          "Utilisateurs ou tiers concernés lorsqu’une plainte, la protection de droits ou un litige le nécessite.",
        ],
      },
      {
        title: "9. Transferts internationaux",
        paragraphs: [
          "Nous privilégions l’EEE. Certains prestataires ou sous-traitants peuvent traiter des données hors EEE.",
          "Les transferts requis reposent sur une décision d’adéquation, les clauses contractuelles types de la Commission européenne ou une autre garantie légale.",
        ],
      },
      {
        title: "10. Conservation",
        paragraphs: [
          "Les données sont conservées uniquement pendant la durée raisonnablement nécessaire compte tenu du compte, de la visibilité du contenu, des obligations, de la sécurité, des sauvegardes, litiges et délais de prescription.",
        ],
        bullets: [
          "Compte et profil pendant l’activité et une période raisonnable après.",
          "Contenu et modération pendant la publication et ensuite si nécessaire pour les litiges, abus répétés ou droits en justice.",
          "Facturation, fiscalité et comptabilité pendant la durée légale.",
          "Journaux techniques et de sécurité selon les besoins, plus longtemps en cas d’incident ou de litige.",
          "Les sauvegardes peuvent contenir des données supprimées pendant une période glissante limitée.",
        ],
      },
      {
        title: "11. Sécurité",
        paragraphs: [
          "Nous utilisons des mesures telles que contrôles d’accès, authentification, chiffrement en transit, journaux, sauvegardes, rôles et garanties des prestataires.",
          "Aucun service ne garantit une sécurité absolue. Les utilisateurs doivent protéger leurs identifiants et signaler rapidement toute compromission.",
        ],
      },
      {
        title: "12. Vos droits",
        paragraphs: [
          "Sous réserve du RGPD et de ses limites, vous pouvez disposer de droits d’accès, rectification, effacement, limitation, opposition et, dans certains cas, portabilité.",
          "Le consentement peut être retiré à tout moment pour l’avenir. Une opposition à un intérêt légitime sera mise en balance avec les motifs impérieux et les droits en justice.",
          "Les droits ne sont pas absolus. Certaines données peuvent être conservées pour la loi, les droits d’autrui, le secret juridique, la sécurité, la fraude ou des actions en justice.",
        ],
      },
      {
        title: "13. Exercer vos droits",
        paragraphs: [
          "Écrivez à support@carriertrust.eu en identifiant le compte, l’entreprise ou le contenu. N’envoyez pas de document sensible sauf demande.",
          "Nous pouvons vérifier raisonnablement l’identité et clarifier la demande. Les demandes manifestement infondées ou excessives peuvent être refusées ou facturées lorsque la loi le permet.",
        ],
      },
      {
        title: "14. Réclamations",
        paragraphs: [
          "Nous vous invitons à contacter d’abord CarrierTrust.",
          "Vous pouvez aussi saisir la Datu valsts inspekcija lettone ou une autre autorité de contrôle compétente de l’EEE.",
        ],
      },
      {
        title: "15. Enfants et données sensibles",
        paragraphs: [
          "CarrierTrust est une plateforme professionnelle non destinée aux enfants. Les données d’enfants ou catégories particulières ne doivent être envoyées qu’avec une base claire et une stricte nécessité.",
          "CarrierTrust peut retirer ou limiter ces données et demander une justification.",
        ],
      },
      {
        title: "16. Liens de tiers",
        paragraphs: ["Les sites et services tiers appliquent leurs propres politiques à leurs traitements indépendants."],
      },
      {
        title: "17. Modifications",
        paragraphs: [
          "La Politique peut être mise à jour pour des raisons juridiques, techniques, opérationnelles ou de sécurité. Version et date figurent en haut. Les modifications importantes peuvent être communiquées sur la plateforme, par email ou par une nouvelle acceptation.",
          "Les traductions sont fournies par commodité. La version anglaise prévaut en cas de divergence dans la mesure permise par la loi impérative.",
        ],
      },
    ],
    closing:
      "Les questions et demandes peuvent être envoyées à support@carriertrust.eu. Les demandes de retrait de contenu doivent suivre la procédure de la page Legal.",
  },

  es: {
    badge: "Privacidad",
    title: "Política de privacidad",
    version: "Versión 2.0",
    effectiveDate: "En vigor desde el 25 de julio de 2026",
    controller: "Responsable del tratamiento",
    vatId: "N.º de IVA",
    legalAddress: "Domicilio social",
    email: "Email",
    intro: [
      "Esta Política explica cómo SIA JAKOVLEV CAPITAL, operador de CarrierTrust, recopila, utiliza, conserva, comparte y protege datos personales relacionados con la web, cuentas, perfiles, reseñas, respuestas, avisos, verificación, facturación, analítica y soporte.",
      "CarrierTrust es principalmente una plataforma B2B. La información empresarial puede seguir siendo personal cuando se refiere a un autónomo, administrador, empleado, manager, representante, contacto, autor de reseña u otra persona identificable.",
    ],
    sections: [
      {
        title: "1. Responsable",
        paragraphs: [
          "SIA JAKOVLEV CAPITAL es responsable de los datos tratados mediante CarrierTrust salvo indicación expresa en contrario.",
          "Las solicitudes se envían a support@carriertrust.eu. CarrierTrust puede solicitar información razonablemente necesaria para verificar identidad y autoridad.",
        ],
      },
      {
        title: "2. Datos tratados",
        paragraphs: ["Las categorías dependen del uso. Procuramos limitar los datos a lo razonablemente necesario."],
        bullets: [
          "Cuenta y autenticación: email, ID de usuario, accesos, restablecimiento de contraseña y confirmación de email.",
          "Empresa y representantes: nombre, IVA, país, perfil, rol, Owner o Manager, autoridad y verificación.",
          "Contenido e interacción: reseñas, valoraciones, respuestas, avisos, recursos, soporte, adjuntos, pruebas y correspondencia.",
          "Facturación: suscripción, pedido, factura, pago, contacto y datos fiscales. Los datos completos de tarjeta normalmente los trata el proveedor de pagos.",
          "Técnicos y seguridad: IP, hora, navegador, sistema, dispositivo, user agent, ubicación aproximada, registros y señales antiabuso.",
          "Analítica y uso: páginas, URL, referrer, búsquedas, interacciones, campañas, identificadores de visitante y sesión y eventos.",
          "Comunicaciones: mensajes de soporte, legal, privacidad, facturación o medios.",
          "Fuentes públicas y terceras: registros, webs, fuentes licenciadas, usuarios, empresas y proveedores.",
        ],
      },
      {
        title: "3. Fuentes",
        paragraphs: [
          "Recibimos datos directamente al registrarse, reclamar un perfil, publicar, comprar, aportar pruebas o contactarnos.",
          "También pueden proceder de registros, webs y directorios públicos, usuarios, la empresa, contratistas y proveedores técnicos. Que sean públicos no elimina la obligación de tratarlos legalmente.",
        ],
      },
      {
        title: "4. Finalidades y bases legales",
        paragraphs: ["Tratamos datos solo cuando existe una base legal aplicable."],
        bullets: [
          "Contrato y medidas precontractuales: cuentas, funciones, servicios de pago, soporte y comunicaciones.",
          "Intereses legítimos: operar y mejorar la plataforma B2B, perfiles, reseñas, respuestas, seguridad, prevención de fraude y abuso, moderación, reclamaciones y medición del servicio cuando la ley lo permita.",
          "Obligación legal: impuestos, contabilidad, tribunales, autoridades, sanciones y otros requisitos.",
          "Consentimiento: actividades opcionales para las que se solicita expresamente, incluido almacenamiento o acceso no esencial en el dispositivo cuando sea necesario.",
          "Protección de derechos: reclamaciones, pruebas y aplicación de acuerdos y políticas.",
        ],
      },
      {
        title: "5. Perfiles y contenido público",
        paragraphs: [
          "Perfiles, reseñas, valoraciones y respuestas se destinan a publicación. Pueden ser indexados, copiados, citados o conservarse en cachés o archivos fuera del control de CarrierTrust.",
          "No deben publicarse datos personales innecesarios, información confidencial ni documentos personales sin necesidad legal. CarrierTrust puede ocultarlos, limitarlos o retirarlos.",
          "La identidad personal del autor no se muestra necesariamente, pero pueden conservarse datos de cuenta, empresa, técnicos y probatorios.",
        ],
      },
      {
        title: "6. Analítica y tecnologías del navegador",
        paragraphs: [
          "CarrierTrust puede usar cookies, almacenamiento local, almacenamiento de sesión y tecnologías similares para autenticación, idioma, seguridad, sesión, analítica y mejora.",
          "La analítica puede incluir identificador de visitante, sesión, URL, referrer, campañas, navegador, dispositivo y eventos.",
          "Las tecnologías estrictamente necesarias pueden utilizarse sin consentimiento cuando sea legal. Cuando se requiera consentimiento para analítica no esencial o acceso al dispositivo, CarrierTrust se basará en él y permitirá retirarlo. Esta Política no constituye por sí misma consentimiento.",
        ],
      },
      {
        title: "7. Indicadores de riesgo y automatización",
        paragraphs: [
          "CarrierTrust puede calcular valoraciones, trust scores, riesgos y alertas mediante reseñas, reglas, avisos y señales técnicas.",
          "Son informativos y no pretenden producir una decisión exclusivamente automatizada con efectos jurídicos o equivalentes para una persona. CarrierTrust puede revisar, corregir o sustituir el resultado y facilitar revisión humana cuando proceda.",
        ],
      },
      {
        title: "8. Destinatarios",
        paragraphs: ["Solo compartimos datos en la medida razonablemente necesaria."],
        bullets: [
          "Alojamiento, bases de datos, autenticación, almacenamiento e infraestructura, como Supabase y Vercel.",
          "Email, soporte, seguridad, monitorización, analítica y comunicación.",
          "Pagos, facturación, impuestos y contabilidad.",
          "Asesores, aseguradoras, auditores y contratistas sujetos a obligaciones.",
          "Tribunales, reguladores y autoridades cuando lo exija la ley.",
          "Comprador, inversor o sucesor en una operación real de financiación, reorganización, fusión, transferencia o venta.",
          "Usuarios o terceros afectados cuando sea necesario para una reclamación, proteger derechos o resolver una disputa.",
        ],
      },
      {
        title: "9. Transferencias internacionales",
        paragraphs: [
          "Procuramos utilizar el EEE. Algunos proveedores o subencargados pueden tratar datos fuera del EEE.",
          "Las transferencias necesarias se basan en una decisión de adecuación, cláusulas contractuales tipo de la Comisión Europea u otra garantía legal.",
        ],
      },
      {
        title: "10. Conservación",
        paragraphs: [
          "Conservamos los datos durante el tiempo razonablemente necesario según la cuenta, publicación, contratos, seguridad, copias, litigios, prescripción y obligaciones legales.",
        ],
        bullets: [
          "Cuenta y perfil mientras estén activos y un periodo razonable posterior.",
          "Contenido y moderación durante la publicación y después si se necesitan para disputas, abuso repetido o reclamaciones.",
          "Facturación, impuestos y contabilidad durante el periodo legal.",
          "Registros técnicos y de seguridad según las necesidades, más tiempo si hay incidente o litigio.",
          "Las copias pueden contener datos eliminados durante un periodo limitado.",
        ],
      },
      {
        title: "11. Seguridad",
        paragraphs: [
          "Aplicamos controles de acceso, autenticación, cifrado en tránsito, registros, copias, permisos por rol y garantías de proveedores.",
          "Ningún servicio garantiza seguridad absoluta. El usuario debe proteger sus credenciales y comunicar cualquier compromiso.",
        ],
      },
      {
        title: "12. Derechos",
        paragraphs: [
          "Sujeto al RGPD y sus límites, puedes tener derechos de acceso, rectificación, supresión, limitación, oposición y, en ciertos casos, portabilidad.",
          "El consentimiento puede retirarse para el futuro. Una oposición a intereses legítimos se ponderará frente a motivos imperiosos y reclamaciones jurídicas.",
          "Los derechos no son absolutos. Puede conservarse información por ley, derechos de terceros, secreto jurídico, seguridad, fraude o reclamaciones.",
        ],
      },
      {
        title: "13. Solicitudes",
        paragraphs: [
          "Escribe a support@carriertrust.eu e identifica cuenta, empresa o contenido. No envíes documentos sensibles salvo solicitud.",
          "Podemos verificar identidad y aclarar la solicitud. Las solicitudes manifiestamente infundadas o excesivas pueden rechazarse o conllevar una tarifa razonable cuando la ley lo permita.",
        ],
      },
      {
        title: "14. Reclamaciones",
        paragraphs: [
          "Te invitamos a contactar primero con CarrierTrust.",
          "También puedes reclamar ante la Datu valsts inspekcija de Letonia u otra autoridad competente del EEE.",
        ],
      },
      {
        title: "15. Menores y datos sensibles",
        paragraphs: [
          "CarrierTrust es una plataforma empresarial no dirigida a menores. No deben enviarse datos de menores o categorías especiales sin base clara y necesidad estricta.",
          "CarrierTrust puede retirar o limitar datos sensibles y pedir justificación.",
        ],
      },
      {
        title: "16. Enlaces de terceros",
        paragraphs: ["Los terceros aplican sus propias políticas a sus tratamientos independientes."],
      },
      {
        title: "17. Cambios",
        paragraphs: [
          "Podemos actualizar esta Política por cambios legales, técnicos, operativos o de seguridad. La versión y fecha figuran arriba. Los cambios importantes pueden comunicarse en la plataforma, por email o mediante nueva aceptación.",
          "Las traducciones se ofrecen por comodidad. La versión inglesa prevalece en caso de conflicto en la medida permitida por la ley imperativa.",
        ],
      },
    ],
    closing:
      "Las preguntas y solicitudes pueden enviarse a support@carriertrust.eu. Los avisos de retirada deben seguir el procedimiento de la página Legal.",
  },

  it: {
    badge: "Privacy",
    title: "Informativa sulla privacy",
    version: "Versione 2.0",
    effectiveDate: "In vigore dal 25 luglio 2026",
    controller: "Titolare del trattamento",
    vatId: "Partita IVA",
    legalAddress: "Sede legale",
    email: "Email",
    intro: [
      "La presente Informativa spiega come SIA JAKOVLEV CAPITAL, gestore di CarrierTrust, raccoglie, usa, conserva, condivide e protegge dati personali relativi a sito, account, profili, recensioni, risposte, segnalazioni, verifica, fatturazione, analisi e assistenza.",
      "CarrierTrust è principalmente una piattaforma B2B. Le informazioni aziendali possono comunque essere personali quando riguardano un imprenditore individuale, amministratore, dipendente, manager, rappresentante, contatto, autore o altra persona identificabile.",
    ],
    sections: [
      {
        title: "1. Titolare",
        paragraphs: [
          "SIA JAKOVLEV CAPITAL è titolare dei dati trattati tramite CarrierTrust salvo diversa indicazione espressa.",
          "Le richieste vanno inviate a support@carriertrust.eu. CarrierTrust può richiedere informazioni ragionevolmente necessarie per verificare identità e autorità.",
        ],
      },
      {
        title: "2. Dati trattati",
        paragraphs: ["Le categorie dipendono dall’uso. Cerchiamo di limitare i dati a quanto ragionevolmente necessario."],
        bullets: [
          "Account e autenticazione: email, ID utente, accessi, reset password e conferma email.",
          "Impresa e rappresentanti: nome, IVA, paese, profilo, ruolo, Owner o Manager, poteri e verifica.",
          "Contenuti e interazioni: recensioni, valutazioni, risposte, segnalazioni, ricorsi, supporto, allegati, prove e corrispondenza.",
          "Fatturazione: abbonamento, ordine, fattura, pagamento, contatto e dati fiscali. I dati completi della carta sono normalmente trattati dal fornitore di pagamento.",
          "Tecnici e sicurezza: IP, orari, browser, sistema, dispositivo, user agent, localizzazione approssimativa, log e segnali antiabuso.",
          "Analisi e utilizzo: pagine, URL, referrer, ricerche, interazioni, campagne, identificatori visitatore e sessione ed eventi.",
          "Comunicazioni: messaggi a supporto, legale, privacy, fatturazione o media.",
          "Fonti pubbliche e terze: registri, siti, fonti con licenza, utenti, imprese e fornitori.",
        ],
      },
      {
        title: "3. Fonti",
        paragraphs: [
          "Riceviamo dati direttamente durante registrazione, rivendicazione, pubblicazione, acquisto, invio di prove o contatto.",
          "Possono anche provenire da registri, siti e directory pubbliche, utenti, impresa, appaltatori e fornitori tecnici. La disponibilità pubblica non elimina gli obblighi di liceità.",
        ],
      },
      {
        title: "4. Finalità e basi giuridiche",
        paragraphs: ["Trattiamo dati solo quando esiste una base giuridica applicabile."],
        bullets: [
          "Contratto e misure precontrattuali: account, funzioni, servizi a pagamento, supporto e comunicazioni.",
          "Legittimi interessi: gestione e miglioramento della piattaforma B2B, profili, recensioni, risposte, sicurezza, prevenzione frodi e abusi, moderazione, pretese legali e misurazione del servizio quando consentito.",
          "Obblighi legali: imposte, contabilità, tribunali, autorità, sanzioni e altri requisiti.",
          "Consenso: attività opzionali per cui è richiesto espressamente, compreso storage o accesso non essenziale sul dispositivo quando necessario.",
          "Tutela dei diritti: reclami, prove e applicazione di accordi e regole.",
        ],
      },
      {
        title: "5. Profili e contenuti pubblici",
        paragraphs: [
          "Profili, recensioni, valutazioni e risposte sono destinati alla pubblicazione. Possono essere indicizzati, copiati, citati o conservati in cache o archivi fuori dal controllo di CarrierTrust.",
          "Non vanno pubblicati dati personali non necessari, informazioni riservate o documenti personali senza necessità legale. CarrierTrust può oscurarli, limitarli o rimuoverli.",
          "L’identità personale dell’autore non è necessariamente pubblica, ma dati di account, impresa, tecnici e probatori possono essere conservati.",
        ],
      },
      {
        title: "6. Analisi e tecnologie del browser",
        paragraphs: [
          "CarrierTrust può usare cookie, local storage, session storage e tecnologie simili per autenticazione, lingua, sicurezza, sessione, analisi e miglioramento.",
          "L’analisi può includere identificatore visitatore, sessione, URL, referrer, campagne, browser, dispositivo ed eventi.",
          "Le tecnologie strettamente necessarie possono essere usate senza consenso quando consentito. Quando il consenso è richiesto per analisi non essenziali o accesso al dispositivo, CarrierTrust si basa sul consenso e ne consente il ritiro. La presente Informativa non costituisce di per sé consenso.",
        ],
      },
      {
        title: "7. Indicatori di rischio e automazione",
        paragraphs: [
          "CarrierTrust può calcolare valutazioni, trust score, livelli di rischio e flag da recensioni, regole, segnalazioni e segnali tecnici.",
          "Sono informativi e non intendono produrre decisioni esclusivamente automatizzate con effetti giuridici o analoghi su una persona. CarrierTrust può verificare, correggere o sostituire il risultato e offrire revisione umana quando richiesta.",
        ],
      },
      {
        title: "8. Destinatari",
        paragraphs: ["Condividiamo dati solo quanto ragionevolmente necessario."],
        bullets: [
          "Hosting, database, autenticazione, storage e infrastruttura, come Supabase e Vercel.",
          "Email, supporto, sicurezza, monitoraggio, analisi e comunicazione.",
          "Pagamenti, fatturazione, imposte e contabilità.",
          "Consulenti, assicuratori, revisori e appaltatori soggetti a obblighi.",
          "Tribunali, regolatori e autorità quando richiesto.",
          "Acquirente, investitore o successore in finanziamento, riorganizzazione, fusione, trasferimento o vendita reale.",
          "Utenti o terzi coinvolti quando necessario per reclamo, tutela dei diritti o controversia.",
        ],
      },
      {
        title: "9. Trasferimenti internazionali",
        paragraphs: [
          "Cerchiamo di usare il SEE. Alcuni fornitori o sub-responsabili possono trattare dati fuori dal SEE.",
          "I trasferimenti necessari si basano su decisione di adeguatezza, clausole contrattuali standard della Commissione europea o altra garanzia legale.",
        ],
      },
      {
        title: "10. Conservazione",
        paragraphs: [
          "Conserviamo i dati per il tempo ragionevolmente necessario considerando account, pubblicazione, contratti, sicurezza, backup, controversie, prescrizione e legge.",
        ],
        bullets: [
          "Account e profilo durante l’attività e per un periodo ragionevole successivo.",
          "Contenuti e moderazione durante la pubblicazione e poi se necessari per controversie, abusi ripetuti o pretese.",
          "Fatturazione, imposte e contabilità per il periodo legale.",
          "Log tecnici e di sicurezza secondo necessità, più a lungo per incidenti o controversie.",
          "I backup possono contenere dati eliminati per un periodo limitato.",
        ],
      },
      {
        title: "11. Sicurezza",
        paragraphs: [
          "Usiamo controlli di accesso, autenticazione, cifratura in transito, log, backup, permessi per ruolo e garanzie dei fornitori.",
          "Nessun servizio garantisce sicurezza assoluta. L’utente deve proteggere le credenziali e segnalare compromissioni.",
        ],
      },
      {
        title: "12. Diritti",
        paragraphs: [
          "Ai sensi del GDPR e dei relativi limiti, possono spettare accesso, rettifica, cancellazione, limitazione, opposizione e in certi casi portabilità.",
          "Il consenso può essere ritirato per il futuro. L’opposizione ai legittimi interessi sarà bilanciata con motivi cogenti e pretese legali.",
          "I diritti non sono assoluti. I dati possono essere conservati per legge, diritti altrui, segreto legale, sicurezza, frodi o pretese.",
        ],
      },
      {
        title: "13. Richieste",
        paragraphs: [
          "Scrivi a support@carriertrust.eu indicando account, impresa o contenuto. Non inviare documenti sensibili salvo richiesta.",
          "Possiamo verificare l’identità e chiarire la richiesta. Richieste manifestamente infondate o eccessive possono essere rifiutate o soggette a costo ragionevole quando consentito.",
        ],
      },
      {
        title: "14. Reclami",
        paragraphs: [
          "Invitiamo a contattare prima CarrierTrust.",
          "È inoltre possibile presentare reclamo alla Datu valsts inspekcija lettone o a un’altra autorità competente del SEE.",
        ],
      },
      {
        title: "15. Minori e dati sensibili",
        paragraphs: [
          "CarrierTrust è una piattaforma aziendale non destinata ai minori. Dati di minori o categorie particolari non devono essere inviati senza base chiara e stretta necessità.",
          "CarrierTrust può rimuovere o limitare dati sensibili e chiedere giustificazione.",
        ],
      },
      {
        title: "16. Link di terzi",
        paragraphs: ["I terzi applicano le proprie informative ai trattamenti indipendenti."],
      },
      {
        title: "17. Modifiche",
        paragraphs: [
          "La presente Informativa può essere aggiornata per cambiamenti legali, tecnici, operativi o di sicurezza. Versione e data sono in alto. Modifiche rilevanti possono essere comunicate sulla piattaforma, via email o con nuova accettazione.",
          "Le traduzioni sono fornite per comodità. La versione inglese prevale in caso di contrasto nei limiti della legge imperativa.",
        ],
      },
    ],
    closing:
      "Domande e richieste possono essere inviate a support@carriertrust.eu. Le richieste di rimozione dei contenuti devono seguire la procedura della pagina Legal.",
  },
};

export default function PrivacyPage() {
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
                    <div className="font-semibold text-slate-900">{t.controller}</div>
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
