"use client";

import { useMemo } from "react";
import { useLang } from "@/lib/language-context";

type Lang = "en" | "de" | "ru" | "fr" | "es" | "it";

type TextPack = {
  badge: string;
  title: string;
  intro: string;

  dataCollected: string;
  collect1: string;
  collect2: string;
  collect3: string;
  collect4: string;
  collect5: string;

  purpose: string;
  purposeText: string;

  legalBasis: string;
  legalBasisText: string;

  storage: string;
  storageText: string;

  retention: string;
  retentionText: string;

  disclosure: string;
  disclosureText: string;

  protection: string;
  protectionText: string;

  rights: string;
  rightsText: string;

  authority: string;
  authorityText: string;
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    badge: "Privacy",
    title: "Privacy Policy",
    intro:
      "CarrierTrust respects privacy and processes personal data in accordance with Regulation (EU) 2016/679 (General Data Protection Regulation). This Privacy Policy explains how data is collected, used, stored, protected and retained when users access or use CarrierTrust.",

    dataCollected: "Data we collect",
    collect1: "Email address and authentication data for account access and security",
    collect2: "Company name, VAT number, business profile information and account details where provided",
    collect3: "Reviews, reports, legal notices, counter-notices, messages and other content submitted through the platform",
    collect4: "Technical data including IP address, timestamps, device/browser information, security logs and activity records",
    collect5: "Moderation history, complaint history, abuse signals and evidence relevant to platform integrity or legal disputes",

    purpose: "Purpose of processing",
    purposeText:
      "Data is processed to operate CarrierTrust, provide user accounts, publish and manage reviews, prevent fraud and abuse, enforce platform rules, handle complaints, preserve evidence, comply with legal obligations, protect legal rights and maintain platform security.",

    legalBasis: "Legal basis",
    legalBasisText:
      "Personal data is processed where necessary for performance of a contract, compliance with legal obligations, legitimate interests in operating and protecting the platform, fraud prevention, abuse prevention, dispute handling, legal defense, and where applicable, user consent.",

    storage: "Storage and security",
    storageText:
      "Data is stored using secure infrastructure, including Supabase services, with appropriate technical and organisational measures intended to protect data against unauthorized access, loss, misuse, alteration or disclosure.",

    retention: "Retention period",
    retentionText:
      "Data may be retained for as long as reasonably necessary for account operation, security, moderation history, complaint handling, fraud prevention, legal compliance, dispute resolution and enforcement of platform rules. Certain technical logs, timestamps, IP records and evidence may be retained where necessary to protect CarrierTrust, users or third parties.",

    disclosure: "Disclosure of data",
    disclosureText:
      "Data may be disclosed to hosting providers, technical service providers, legal representatives, courts, regulators, competent authorities or law enforcement where required by law, legal process, valid authority request, fraud investigation, security protection, dispute handling or protection of legal rights.",

    protection: "Platform protection and evidence",
    protectionText:
      "CarrierTrust may preserve IP logs, account identifiers, timestamps, moderation actions, legal notices, complaint records, counter-notices and technical evidence where necessary for abuse prevention, fraud investigation, legal defense, authority cooperation and protection of platform integrity.",

    rights: "Your rights",
    rightsText:
      "Users may request access, rectification, erasure, restriction of processing, objection to processing, data portability where applicable, or withdrawal of consent where processing is based on consent. Some requests may be limited where retention is required for legal compliance, dispute handling, fraud prevention or protection of legal claims.",

    authority: "Supervisory authority",
    authorityText:
      "Users may lodge a complaint with the Latvian Data State Inspectorate or another competent data protection authority if they believe their personal data has been processed unlawfully.",
  },

  de: {
    badge: "Datenschutz",
    title: "Datenschutzerklärung",
    intro:
      "CarrierTrust respektiert den Datenschutz und verarbeitet personenbezogene Daten gemäß Verordnung (EU) 2016/679 (Datenschutz-Grundverordnung). Diese Datenschutzerklärung erläutert, wie Daten erhoben, verwendet, gespeichert, geschützt und aufbewahrt werden, wenn Nutzer CarrierTrust aufrufen oder verwenden.",

    dataCollected: "Welche Daten wir erheben",
    collect1: "E-Mail-Adresse und Authentifizierungsdaten für Kontozugriff und Sicherheit",
    collect2: "Firmenname, Umsatzsteuer-Identifikationsnummer, Unternehmensprofilinformationen und Kontodaten, soweit angegeben",
    collect3: "Bewertungen, Meldungen, rechtliche Mitteilungen, Gegendarstellungen, Nachrichten und sonstige über die Plattform eingereichte Inhalte",
    collect4: "Technische Daten einschließlich IP-Adresse, Zeitstempel, Geräte-/Browserinformationen, Sicherheitsprotokolle und Aktivitätsaufzeichnungen",
    collect5: "Moderationsverlauf, Beschwerdeverlauf, Missbrauchssignale und Beweise, die für Plattformintegrität oder rechtliche Streitigkeiten relevant sind",

    purpose: "Zweck der Verarbeitung",
    purposeText:
      "Daten werden verarbeitet, um CarrierTrust zu betreiben, Nutzerkonten bereitzustellen, Bewertungen zu veröffentlichen und zu verwalten, Betrug und Missbrauch zu verhindern, Plattformregeln durchzusetzen, Beschwerden zu bearbeiten, Beweise zu sichern, rechtliche Verpflichtungen einzuhalten, Rechtspositionen zu schützen und die Sicherheit der Plattform aufrechtzuerhalten.",

    legalBasis: "Rechtsgrundlage",
    legalBasisText:
      "Personenbezogene Daten werden verarbeitet, soweit dies zur Vertragserfüllung, zur Erfüllung rechtlicher Verpflichtungen, aufgrund berechtigter Interessen am Betrieb und Schutz der Plattform, zur Betrugsprävention, Missbrauchsprävention, Streitbeilegung, Rechtsverteidigung und gegebenenfalls auf Grundlage der Einwilligung des Nutzers erforderlich ist.",

    storage: "Speicherung und Sicherheit",
    storageText:
      "Daten werden unter Nutzung sicherer Infrastruktur, einschließlich Supabase-Diensten, mit angemessenen technischen und organisatorischen Maßnahmen gespeichert, die Daten vor unbefugtem Zugriff, Verlust, Missbrauch, Veränderung oder Offenlegung schützen sollen.",

    retention: "Aufbewahrungsdauer",
    retentionText:
      "Daten können so lange aufbewahrt werden, wie dies für Kontobetrieb, Sicherheit, Moderationsverlauf, Beschwerdebearbeitung, Betrugsprävention, rechtliche Compliance, Streitbeilegung und Durchsetzung von Plattformregeln angemessen erforderlich ist. Bestimmte technische Protokolle, Zeitstempel, IP-Aufzeichnungen und Beweise können aufbewahrt werden, soweit dies zum Schutz von CarrierTrust, Nutzern oder Dritten erforderlich ist.",

    disclosure: "Offenlegung von Daten",
    disclosureText:
      "Daten können gegenüber Hosting-Anbietern, technischen Dienstleistern, Rechtsvertretern, Gerichten, Regulierungsbehörden, zuständigen Behörden oder Strafverfolgungsbehörden offengelegt werden, wenn dies gesetzlich, aufgrund eines Rechtsverfahrens, einer gültigen Behördenanfrage, Betrugsuntersuchung, Sicherheitsmaßnahme, Streitbeilegung oder zum Schutz rechtlicher Ansprüche erforderlich ist.",

    protection: "Plattformschutz und Beweise",
    protectionText:
      "CarrierTrust kann IP-Protokolle, Kontoidentifikatoren, Zeitstempel, Moderationsmaßnahmen, rechtliche Mitteilungen, Beschwerdeaufzeichnungen, Gegendarstellungen und technische Beweise aufbewahren, soweit dies zur Missbrauchsprävention, Betrugsuntersuchung, Rechtsverteidigung, Zusammenarbeit mit Behörden und zum Schutz der Plattformintegrität erforderlich ist.",

    rights: "Ihre Rechte",
    rightsText:
      "Nutzer können Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch gegen die Verarbeitung, Datenübertragbarkeit soweit anwendbar oder Widerruf einer Einwilligung verlangen, soweit die Verarbeitung auf Einwilligung beruht. Einige Anfragen können eingeschränkt sein, wenn eine Aufbewahrung für rechtliche Compliance, Streitbeilegung, Betrugsprävention oder Schutz rechtlicher Ansprüche erforderlich ist.",

    authority: "Aufsichtsbehörde",
    authorityText:
      "Nutzer können Beschwerde bei der lettischen Datenschutzaufsichtsbehörde Data State Inspectorate oder einer anderen zuständigen Datenschutzbehörde einreichen, wenn sie der Ansicht sind, dass ihre personenbezogenen Daten rechtswidrig verarbeitet wurden.",
  },

  ru: {
    badge: "Конфиденциальность",
    title: "Политика конфиденциальности",
    intro:
      "CarrierTrust уважает конфиденциальность и обрабатывает персональные данные в соответствии с Regulation (EU) 2016/679 (General Data Protection Regulation). Настоящая Политика объясняет, какие данные собираются, как они используются, хранятся, защищаются и сохраняются при доступе к CarrierTrust или использовании платформы.",

    dataCollected: "Какие данные мы собираем",
    collect1: "Email-адрес и данные аутентификации для доступа к аккаунту и обеспечения безопасности",
    collect2: "Название компании, VAT номер, информация бизнес-профиля и данные аккаунта, если они предоставлены",
    collect3: "Отзывы, жалобы, юридические уведомления, встречные уведомления, сообщения и иной контент, отправленный через платформу",
    collect4: "Технические данные, включая IP-адрес, временные метки, данные устройства/браузера, журналы безопасности и записи активности",
    collect5: "Историю модерации, историю жалоб, сигналы злоупотреблений и доказательства, относящиеся к целостности платформы или юридическим спорам",

    purpose: "Цели обработки",
    purposeText:
      "Данные обрабатываются для работы CarrierTrust, предоставления пользовательских аккаунтов, публикации и управления отзывами, предотвращения мошенничества и злоупотреблений, применения правил платформы, рассмотрения жалоб, сохранения доказательств, соблюдения юридических обязательств, защиты правовых интересов и поддержания безопасности платформы.",

    legalBasis: "Правовое основание",
    legalBasisText:
      "Персональные данные обрабатываются, когда это необходимо для исполнения договора, соблюдения юридических обязательств, законных интересов по эксплуатации и защите платформы, предотвращения мошенничества, предотвращения злоупотреблений, рассмотрения споров, юридической защиты, а также, где применимо, на основании согласия пользователя.",

    storage: "Хранение и безопасность",
    storageText:
      "Данные хранятся с использованием защищённой инфраструктуры, включая сервисы Supabase, с применением соответствующих технических и организационных мер, направленных на защиту данных от несанкционированного доступа, потери, злоупотребления, изменения или раскрытия.",

    retention: "Срок хранения",
    retentionText:
      "Данные могут храниться столько, сколько разумно необходимо для работы аккаунта, безопасности, истории модерации, рассмотрения жалоб, предотвращения мошенничества, соблюдения закона, разрешения споров и применения правил платформы. Отдельные технические логи, временные метки, IP-записи и доказательства могут сохраняться, если это необходимо для защиты CarrierTrust, пользователей или третьих лиц.",

    disclosure: "Раскрытие данных",
    disclosureText:
      "Данные могут быть раскрыты хостинг-провайдерам, техническим поставщикам услуг, юридическим представителям, судам, регуляторам, компетентным органам или правоохранительным органам, если это требуется законом, юридической процедурой, действительным запросом органа власти, расследованием мошенничества, защитой безопасности, рассмотрением спора или защитой правовых интересов.",

    protection: "Защита платформы и доказательства",
    protectionText:
      "CarrierTrust может сохранять IP-логи, идентификаторы аккаунтов, временные метки, действия модерации, юридические уведомления, записи жалоб, встречные уведомления и технические доказательства, если это необходимо для предотвращения злоупотреблений, расследования мошенничества, юридической защиты, сотрудничества с компетентными органами и защиты целостности платформы.",

    rights: "Ваши права",
    rightsText:
      "Пользователи могут запросить доступ к данным, исправление, удаление, ограничение обработки, возражение против обработки, переносимость данных там, где применимо, или отзыв согласия, если обработка основана на согласии. Некоторые запросы могут быть ограничены, если хранение необходимо для соблюдения закона, рассмотрения споров, предотвращения мошенничества или защиты правовых требований.",

    authority: "Надзорный орган",
    authorityText:
      "Пользователи могут подать жалобу в Латвийскую Государственную инспекцию данных (Data State Inspectorate) или другой компетентный орган по защите данных, если считают, что их персональные данные были обработаны незаконно.",
  },

  fr: {
    badge: "Confidentialité",
    title: "Politique de confidentialité",
    intro:
      "CarrierTrust respecte la vie privée et traite les données personnelles conformément au Règlement (UE) 2016/679 (Règlement général sur la protection des données). La présente Politique de confidentialité explique comment les données sont collectées, utilisées, stockées, protégées et conservées lorsque les utilisateurs accèdent à CarrierTrust ou l’utilisent.",

    dataCollected: "Données que nous collectons",
    collect1: "Adresse e-mail et données d’authentification pour l’accès au compte et la sécurité",
    collect2: "Nom de l’entreprise, numéro de TVA, informations du profil commercial et détails du compte lorsqu’ils sont fournis",
    collect3: "Avis, signalements, notifications juridiques, contre-notifications, messages et autres contenus soumis via la plateforme",
    collect4: "Données techniques, y compris adresse IP, horodatages, informations sur l’appareil/le navigateur, journaux de sécurité et enregistrements d’activité",
    collect5: "Historique de modération, historique des plaintes, signaux d’abus et preuves pertinentes pour l’intégrité de la plateforme ou les litiges juridiques",

    purpose: "Finalités du traitement",
    purposeText:
      "Les données sont traitées pour exploiter CarrierTrust, fournir des comptes utilisateurs, publier et gérer les avis, prévenir la fraude et les abus, appliquer les règles de la plateforme, traiter les plaintes, conserver des preuves, respecter les obligations légales, protéger les droits juridiques et maintenir la sécurité de la plateforme.",

    legalBasis: "Base juridique",
    legalBasisText:
      "Les données personnelles sont traitées lorsque cela est nécessaire à l’exécution d’un contrat, au respect d’obligations légales, aux intérêts légitimes liés à l’exploitation et à la protection de la plateforme, à la prévention de la fraude, à la prévention des abus, au traitement des litiges, à la défense juridique et, le cas échéant, sur la base du consentement de l’utilisateur.",

    storage: "Stockage et sécurité",
    storageText:
      "Les données sont stockées au moyen d’une infrastructure sécurisée, y compris les services Supabase, avec des mesures techniques et organisationnelles appropriées destinées à protéger les données contre l’accès non autorisé, la perte, l’utilisation abusive, la modification ou la divulgation.",

    retention: "Durée de conservation",
    retentionText:
      "Les données peuvent être conservées aussi longtemps que raisonnablement nécessaire pour le fonctionnement du compte, la sécurité, l’historique de modération, le traitement des plaintes, la prévention de la fraude, la conformité légale, la résolution des litiges et l’application des règles de la plateforme. Certains journaux techniques, horodatages, enregistrements IP et preuves peuvent être conservés lorsque cela est nécessaire pour protéger CarrierTrust, les utilisateurs ou des tiers.",

    disclosure: "Divulgation des données",
    disclosureText:
      "Les données peuvent être divulguées à des fournisseurs d’hébergement, prestataires techniques, représentants juridiques, tribunaux, régulateurs, autorités compétentes ou services répressifs lorsque la loi, une procédure juridique, une demande valide d’autorité, une enquête sur fraude, la protection de la sécurité, le traitement d’un litige ou la protection de droits juridiques l’exige.",

    protection: "Protection de la plateforme et preuves",
    protectionText:
      "CarrierTrust peut conserver les journaux IP, identifiants de compte, horodatages, actions de modération, notifications juridiques, dossiers de plaintes, contre-notifications et preuves techniques lorsque cela est nécessaire à la prévention des abus, aux enquêtes sur fraude, à la défense juridique, à la coopération avec les autorités et à la protection de l’intégrité de la plateforme.",

    rights: "Vos droits",
    rightsText:
      "Les utilisateurs peuvent demander l’accès, la rectification, l’effacement, la limitation du traitement, l’opposition au traitement, la portabilité des données lorsque cela s’applique, ou le retrait du consentement lorsque le traitement est fondé sur le consentement. Certaines demandes peuvent être limitées lorsque la conservation est nécessaire à la conformité légale, au traitement des litiges, à la prévention de la fraude ou à la protection de réclamations juridiques.",

    authority: "Autorité de contrôle",
    authorityText:
      "Les utilisateurs peuvent déposer une plainte auprès de l’Inspection nationale des données de Lettonie (Data State Inspectorate) ou d’une autre autorité compétente de protection des données s’ils estiment que leurs données personnelles ont été traitées illégalement.",
  },

  es: {
    badge: "Privacidad",
    title: "Política de privacidad",
    intro:
      "CarrierTrust respeta la privacidad y procesa datos personales de conformidad con el Reglamento (UE) 2016/679 (Reglamento General de Protección de Datos). Esta Política de privacidad explica cómo se recopilan, usan, almacenan, protegen y conservan los datos cuando los usuarios acceden a CarrierTrust o lo utilizan.",

    dataCollected: "Datos que recopilamos",
    collect1: "Dirección de correo electrónico y datos de autenticación para acceso a la cuenta y seguridad",
    collect2: "Nombre de la empresa, número de IVA, información del perfil empresarial y datos de la cuenta cuando se proporcionen",
    collect3: "Reseñas, reportes, avisos legales, contraavisos, mensajes y otros contenidos enviados a través de la plataforma",
    collect4: "Datos técnicos, incluida dirección IP, marcas de tiempo, información del dispositivo/navegador, registros de seguridad y registros de actividad",
    collect5: "Historial de moderación, historial de reclamaciones, señales de abuso y pruebas relevantes para la integridad de la plataforma o disputas legales",

    purpose: "Finalidad del procesamiento",
    purposeText:
      "Los datos se procesan para operar CarrierTrust, proporcionar cuentas de usuario, publicar y gestionar reseñas, prevenir fraude y abuso, aplicar las reglas de la plataforma, gestionar reclamaciones, conservar pruebas, cumplir obligaciones legales, proteger derechos legales y mantener la seguridad de la plataforma.",

    legalBasis: "Base legal",
    legalBasisText:
      "Los datos personales se procesan cuando es necesario para la ejecución de un contrato, el cumplimiento de obligaciones legales, intereses legítimos en operar y proteger la plataforma, prevención del fraude, prevención del abuso, gestión de disputas, defensa legal y, cuando corresponda, consentimiento del usuario.",

    storage: "Almacenamiento y seguridad",
    storageText:
      "Los datos se almacenan utilizando infraestructura segura, incluidos servicios de Supabase, con medidas técnicas y organizativas adecuadas destinadas a proteger los datos contra acceso no autorizado, pérdida, uso indebido, alteración o divulgación.",

    retention: "Periodo de conservación",
    retentionText:
      "Los datos pueden conservarse durante el tiempo razonablemente necesario para funcionamiento de la cuenta, seguridad, historial de moderación, gestión de reclamaciones, prevención de fraude, cumplimiento legal, resolución de disputas y aplicación de reglas de la plataforma. Determinados registros técnicos, marcas de tiempo, registros IP y pruebas pueden conservarse cuando sea necesario para proteger a CarrierTrust, usuarios o terceros.",

    disclosure: "Divulgación de datos",
    disclosureText:
      "Los datos pueden divulgarse a proveedores de alojamiento, proveedores técnicos, representantes legales, tribunales, reguladores, autoridades competentes o fuerzas del orden cuando sea requerido por la ley, procedimiento legal, solicitud válida de autoridad, investigación de fraude, protección de seguridad, gestión de disputas o protección de derechos legales.",

    protection: "Protección de la plataforma y pruebas",
    protectionText:
      "CarrierTrust puede conservar registros IP, identificadores de cuenta, marcas de tiempo, acciones de moderación, avisos legales, registros de reclamaciones, contraavisos y pruebas técnicas cuando sea necesario para prevención de abuso, investigación de fraude, defensa legal, cooperación con autoridades y protección de la integridad de la plataforma.",

    rights: "Tus derechos",
    rightsText:
      "Los usuarios pueden solicitar acceso, rectificación, supresión, restricción del procesamiento, oposición al procesamiento, portabilidad de datos cuando corresponda o retirada del consentimiento cuando el procesamiento se base en consentimiento. Algunas solicitudes pueden limitarse cuando la conservación sea necesaria para cumplimiento legal, gestión de disputas, prevención de fraude o protección de reclamaciones legales.",

    authority: "Autoridad supervisora",
    authorityText:
      "Los usuarios pueden presentar una reclamación ante la Inspección Estatal de Datos de Letonia (Data State Inspectorate) u otra autoridad competente de protección de datos si consideran que sus datos personales han sido procesados ilegalmente.",
  },

  it: {
    badge: "Privacy",
    title: "Informativa sulla privacy",
    intro:
      "CarrierTrust rispetta la privacy e tratta i dati personali in conformità al Regolamento (UE) 2016/679 (Regolamento generale sulla protezione dei dati). La presente Informativa spiega come i dati vengono raccolti, utilizzati, conservati, protetti e mantenuti quando gli utenti accedono a CarrierTrust o lo utilizzano.",

    dataCollected: "Dati che raccogliamo",
    collect1: "Indirizzo email e dati di autenticazione per accesso all’account e sicurezza",
    collect2: "Nome azienda, numero IVA, informazioni del profilo aziendale e dettagli dell’account ove forniti",
    collect3: "Recensioni, segnalazioni, notifiche legali, contro-notifiche, messaggi e altri contenuti inviati tramite la piattaforma",
    collect4: "Dati tecnici inclusi indirizzo IP, timestamp, informazioni su dispositivo/browser, log di sicurezza e registri di attività",
    collect5: "Cronologia di moderazione, cronologia dei reclami, segnali di abuso e prove rilevanti per l’integrità della piattaforma o controversie legali",

    purpose: "Finalità del trattamento",
    purposeText:
      "I dati sono trattati per gestire CarrierTrust, fornire account utente, pubblicare e gestire recensioni, prevenire frodi e abusi, applicare le regole della piattaforma, gestire reclami, conservare prove, rispettare obblighi legali, proteggere diritti legali e mantenere la sicurezza della piattaforma.",

    legalBasis: "Base giuridica",
    legalBasisText:
      "I dati personali sono trattati quando necessario per l’esecuzione di un contratto, il rispetto di obblighi legali, legittimi interessi relativi alla gestione e protezione della piattaforma, prevenzione frodi, prevenzione abusi, gestione controversie, difesa legale e, ove applicabile, consenso dell’utente.",

    storage: "Conservazione e sicurezza",
    storageText:
      "I dati sono conservati utilizzando infrastruttura sicura, inclusi servizi Supabase, con misure tecniche e organizzative appropriate volte a proteggere i dati da accesso non autorizzato, perdita, uso improprio, alterazione o divulgazione.",

    retention: "Periodo di conservazione",
    retentionText:
      "I dati possono essere conservati per il tempo ragionevolmente necessario per funzionamento dell’account, sicurezza, cronologia di moderazione, gestione dei reclami, prevenzione frodi, conformità legale, risoluzione controversie e applicazione delle regole della piattaforma. Determinati log tecnici, timestamp, registri IP e prove possono essere conservati quando necessario per proteggere CarrierTrust, utenti o terzi.",

    disclosure: "Divulgazione dei dati",
    disclosureText:
      "I dati possono essere divulgati a fornitori di hosting, fornitori tecnici, rappresentanti legali, tribunali, regolatori, autorità competenti o forze dell’ordine quando richiesto dalla legge, da procedure legali, da valida richiesta di autorità, indagine su frodi, protezione della sicurezza, gestione controversie o protezione di diritti legali.",

    protection: "Protezione della piattaforma e prove",
    protectionText:
      "CarrierTrust può conservare log IP, identificativi account, timestamp, azioni di moderazione, notifiche legali, registri reclami, contro-notifiche e prove tecniche quando necessario per prevenzione abusi, indagini su frodi, difesa legale, cooperazione con autorità e protezione dell’integrità della piattaforma.",

    rights: "I tuoi diritti",
    rightsText:
      "Gli utenti possono richiedere accesso, rettifica, cancellazione, limitazione del trattamento, opposizione al trattamento, portabilità dei dati ove applicabile o revoca del consenso quando il trattamento si basa sul consenso. Alcune richieste possono essere limitate quando la conservazione è necessaria per conformità legale, gestione controversie, prevenzione frodi o protezione di pretese legali.",

    authority: "Autorità di controllo",
    authorityText:
      "Gli utenti possono presentare reclamo all’Ispettorato statale dei dati della Lettonia (Data State Inspectorate) o ad altra autorità competente per la protezione dei dati se ritengono che i propri dati personali siano stati trattati illegalmente.",
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

              <div className="mt-8 rounded-[1.5rem] border border-slate-200/70 bg-white/80 p-6 shadow-sm md:p-8">
                <div className="space-y-4 text-sm leading-7 text-slate-600 md:text-[15px]">
                  <p>{t.intro}</p>

                  <h2 className="pt-4 text-xl font-semibold text-slate-900">
                    {t.dataCollected}
                  </h2>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>{t.collect1}</li>
                    <li>{t.collect2}</li>
                    <li>{t.collect3}</li>
                    <li>{t.collect4}</li>
                    <li>{t.collect5}</li>
                  </ul>

                  <h2 className="pt-4 text-xl font-semibold text-slate-900">
                    {t.purpose}
                  </h2>
                  <p>{t.purposeText}</p>

                  <h2 className="pt-4 text-xl font-semibold text-slate-900">
                    {t.legalBasis}
                  </h2>
                  <p>{t.legalBasisText}</p>

                  <h2 className="pt-4 text-xl font-semibold text-slate-900">
                    {t.storage}
                  </h2>
                  <p>{t.storageText}</p>

                  <h2 className="pt-4 text-xl font-semibold text-slate-900">
                    {t.retention}
                  </h2>
                  <p>{t.retentionText}</p>

                  <h2 className="pt-4 text-xl font-semibold text-slate-900">
                    {t.disclosure}
                  </h2>
                  <p>{t.disclosureText}</p>

                  <h2 className="pt-4 text-xl font-semibold text-slate-900">
                    {t.protection}
                  </h2>
                  <p>{t.protectionText}</p>

                  <h2 className="pt-4 text-xl font-semibold text-slate-900">
                    {t.rights}
                  </h2>
                  <p>{t.rightsText}</p>

                  <h2 className="pt-4 text-xl font-semibold text-slate-900">
                    {t.authority}
                  </h2>
                  <p>{t.authorityText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}