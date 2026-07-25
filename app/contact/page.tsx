"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useLang } from "@/lib/language-context";

type Lang = "en" | "de" | "ru" | "fr" | "es" | "it";

type ContactCard = {
  title: string;
  subject: string;
  description: string;
  details: string[];
  action: string;
};

type TextPack = {
  badge: string;
  title: string;
  subtitle: string;
  operator: string;
  vatId: string;
  legalAddress: string;
  email: string;
  languages: string;
  languagesValue: string;
  chooseTopic: string;
  cards: ContactCard[];
  beforeWriting: string;
  beforeWritingItems: string[];
  legalNoticeTitle: string;
  legalNoticeText: string;
  legalNoticeAction: string;
  privacyTitle: string;
  privacyText: string;
  privacyAction: string;
  responseTitle: string;
  responseParagraphs: string[];
  securityTitle: string;
  securityText: string;
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
    badge: "Contact",
    title: "Contact CarrierTrust",
    subtitle:
      "Use the correct subject line so your request reaches the right review process. CarrierTrust currently accepts written enquiries by email.",
    operator: "Platform operator",
    vatId: "VAT ID",
    legalAddress: "Legal address",
    email: "Email",
    languages: "Communication languages",
    languagesValue: "English, German, Russian, French, Spanish and Italian",
    chooseTopic: "Choose the relevant topic",
    cards: [
      {
        title: "General support",
        subject: "[Support]",
        description:
          "Account access, profile use, invitations, technical issues and general questions about CarrierTrust.",
        details: [
          "Identify the account or company concerned.",
          "Describe the issue and the steps that produced it.",
          "Include screenshots only where useful.",
        ],
        action: "Email support",
      },
      {
        title: "Legal and DSA notices",
        subject: "[Legal]",
        description:
          "Allegedly illegal content, rights infringements, counter-notices, appeals and communications from authorities.",
        details: [
          "For a formal content notice, use the subject LEGAL NOTICE.",
          "Include the exact URL and a clear legal explanation.",
          "Follow the requirements stated on the Legal page.",
        ],
        action: "Email legal",
      },
      {
        title: "Privacy and GDPR",
        subject: "[Privacy]",
        description:
          "Access, correction, deletion, restriction, objection and other personal-data questions.",
        details: [
          "Identify the relevant account, company or content.",
          "Do not send identity documents unless requested.",
          "Explain the specific right or concern.",
        ],
        action: "Email privacy",
      },
      {
        title: "Billing and subscriptions",
        subject: "[Billing]",
        description:
          "Invoices, subscription status, paid features, payment confirmation and billing details.",
        details: [
          "Include the company name and billing email.",
          "Reference the invoice or order where available.",
          "Do not send full payment-card details.",
        ],
        action: "Email billing",
      },
      {
        title: "Media and partnerships",
        subject: "[Media]",
        description:
          "Press enquiries, interviews, data commentary, partnerships and business cooperation.",
        details: [
          "Identify the publication or organisation.",
          "State the requested topic and deadline.",
          "Include relevant contact details.",
        ],
        action: "Email media",
      },
    ],
    beforeWriting: "Before writing",
    beforeWritingItems: [
      "Use one clear topic per email and keep the existing email thread when following up.",
      "Include exact URLs, company names, VAT numbers, dates and relevant screenshots or documents where necessary.",
      "Do not send passwords, authentication codes, complete bank-card data or unnecessary personal documents.",
      "CarrierTrust may ask for identity, authority or supporting evidence before acting on an account, company profile or legal request.",
    ],
    legalNoticeTitle: "Reporting content",
    legalNoticeText:
      "A normal support email is not automatically a valid notice of allegedly illegal content. Legal notices, counter-notices and appeals should follow the structured procedure on the Legal page.",
    legalNoticeAction: "Open Legal procedure",
    privacyTitle: "Personal-data requests",
    privacyText:
      "Personal-data requests are handled under the Privacy Policy. Rights are subject to verification and the limitations provided by applicable law.",
    privacyAction: "Open Privacy Policy",
    responseTitle: "Response and processing",
    responseParagraphs: [
      "CarrierTrust aims to review messages within a reasonable period based on urgency, complexity, available evidence and the applicable legal process. No fixed response time is promised unless mandatory law sets one.",
      "Incomplete requests may require clarification. Duplicate messages can delay review, so please continue in the same email thread.",
      "CarrierTrust may communicate the substance of a complaint to an affected user or company where reasonably necessary for a fair assessment, subject to legal, privacy and safety restrictions.",
    ],
    securityTitle: "Security reports",
    securityText:
      "For a suspected account compromise or security issue, use [Support] and state SECURITY in the subject. Do not test, exploit or attempt to access systems without authorisation.",
    closing:
      "Emailing CarrierTrust does not by itself constitute acceptance of formal service of court documents or legal proceedings, except where mandatory law provides otherwise or CarrierTrust expressly confirms acceptance.",
  },

  de: {
    badge: "Kontakt",
    title: "CarrierTrust kontaktieren",
    subtitle:
      "Verwenden Sie den passenden Betreff, damit Ihre Anfrage dem richtigen Verfahren zugeordnet wird. CarrierTrust nimmt derzeit schriftliche Anfragen per E-Mail entgegen.",
    operator: "Plattformbetreiber",
    vatId: "USt-IdNr.",
    legalAddress: "Sitz",
    email: "E-Mail",
    languages: "Kommunikationssprachen",
    languagesValue: "Englisch, Deutsch, Russisch, Französisch, Spanisch und Italienisch",
    chooseTopic: "Passendes Thema auswählen",
    cards: [
      {
        title: "Allgemeiner Support",
        subject: "[Support]",
        description:
          "Kontozugang, Profilnutzung, Einladungen, technische Probleme und allgemeine Fragen.",
        details: [
          "Betroffenes Konto oder Unternehmen angeben.",
          "Problem und Schritte zur Reproduktion beschreiben.",
          "Screenshots nur beifügen, wenn sie hilfreich sind.",
        ],
        action: "Support kontaktieren",
      },
      {
        title: "Rechtliche und DSA-Meldungen",
        subject: "[Legal]",
        description:
          "Mutmaßlich illegale Inhalte, Rechtsverletzungen, Gegenanzeigen, Beschwerden und Behördenkommunikation.",
        details: [
          "Für eine förmliche Inhaltsmeldung den Betreff LEGAL NOTICE verwenden.",
          "Exakte URL und klare rechtliche Begründung beifügen.",
          "Vorgaben der Rechtsseite beachten.",
        ],
        action: "Rechtsteam kontaktieren",
      },
      {
        title: "Datenschutz und DSGVO",
        subject: "[Privacy]",
        description:
          "Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und sonstige Datenschutzfragen.",
        details: [
          "Konto, Unternehmen oder Inhalt benennen.",
          "Ausweisdokumente nur auf Anfrage senden.",
          "Betroffenes Recht oder Anliegen klar erklären.",
        ],
        action: "Datenschutz kontaktieren",
      },
      {
        title: "Abrechnung und Abonnements",
        subject: "[Billing]",
        description:
          "Rechnungen, Abonnementstatus, bezahlte Funktionen, Zahlungsbestätigung und Rechnungsdaten.",
        details: [
          "Firmenname und Rechnungs-E-Mail angeben.",
          "Rechnung oder Bestellung referenzieren.",
          "Keine vollständigen Kartendaten senden.",
        ],
        action: "Abrechnung kontaktieren",
      },
      {
        title: "Medien und Partnerschaften",
        subject: "[Media]",
        description:
          "Presseanfragen, Interviews, Datenkommentare, Partnerschaften und geschäftliche Zusammenarbeit.",
        details: [
          "Publikation oder Organisation benennen.",
          "Thema und Frist angeben.",
          "Relevante Kontaktdaten beifügen.",
        ],
        action: "Medienkontakt",
      },
    ],
    beforeWriting: "Vor dem Schreiben",
    beforeWritingItems: [
      "Pro E-Mail ein klares Thema verwenden und bei Rückfragen im bestehenden Thread bleiben.",
      "Exakte URLs, Firmennamen, USt-IdNr., Daten und notwendige Screenshots oder Dokumente beifügen.",
      "Keine Passwörter, Codes, vollständigen Kartendaten oder unnötigen persönlichen Unterlagen senden.",
      "CarrierTrust kann vor Maßnahmen Identität, Vertretungsmacht oder Belege prüfen.",
    ],
    legalNoticeTitle: "Inhalte melden",
    legalNoticeText:
      "Eine normale Support-E-Mail ist nicht automatisch eine gültige Meldung zu mutmaßlich illegalen Inhalten. Rechtliche Meldungen, Gegenanzeigen und Beschwerden müssen dem Verfahren auf der Rechtsseite folgen.",
    legalNoticeAction: "Rechtsverfahren öffnen",
    privacyTitle: "Datenschutzanfragen",
    privacyText:
      "Datenschutzanfragen werden nach der Datenschutzerklärung bearbeitet. Rechte unterliegen Identitätsprüfung und gesetzlichen Einschränkungen.",
    privacyAction: "Datenschutzerklärung öffnen",
    responseTitle: "Antwort und Bearbeitung",
    responseParagraphs: [
      "CarrierTrust bemüht sich um Prüfung innerhalb eines angemessenen Zeitraums je nach Dringlichkeit, Komplexität, Belegen und Verfahren. Feste Zeiten werden nur zugesagt, wenn das Recht sie vorschreibt.",
      "Unvollständige Anfragen können Rückfragen erfordern. Mehrfachnachrichten können verzögern; bleiben Sie im selben Thread.",
      "Der wesentliche Inhalt einer Beschwerde kann für eine faire Prüfung an betroffene Nutzer oder Unternehmen weitergegeben werden, vorbehaltlich rechtlicher, datenschutzrechtlicher und sicherheitsbezogener Grenzen.",
    ],
    securityTitle: "Sicherheitsmeldungen",
    securityText:
      "Bei vermutetem Kontozugriff oder Sicherheitsproblem [Support] verwenden und SECURITY in den Betreff schreiben. Systeme dürfen nicht ohne Erlaubnis getestet oder ausgenutzt werden.",
    closing:
      "Eine E-Mail an CarrierTrust bedeutet nicht automatisch die Annahme förmlicher Zustellung gerichtlicher Dokumente oder Verfahren, außer bei zwingendem Recht oder ausdrücklicher Bestätigung.",
  },

  ru: {
    badge: "Контакты",
    title: "Связаться с CarrierTrust",
    subtitle:
      "Используйте правильную тему письма, чтобы обращение попало в нужный процесс. Сейчас CarrierTrust принимает письменные обращения по email.",
    operator: "Оператор платформы",
    vatId: "VAT ID",
    legalAddress: "Юридический адрес",
    email: "Email",
    languages: "Языки общения",
    languagesValue: "Английский, немецкий, русский, французский, испанский и итальянский",
    chooseTopic: "Выберите тему обращения",
    cards: [
      {
        title: "Общая поддержка",
        subject: "[Support]",
        description:
          "Доступ к аккаунту, использование профиля, приглашения, технические ошибки и общие вопросы.",
        details: [
          "Укажите относящийся аккаунт или компанию.",
          "Опишите проблему и действия, после которых она возникла.",
          "Приложите скриншоты только когда они действительно помогают.",
        ],
        action: "Написать в поддержку",
      },
      {
        title: "Legal и уведомления DSA",
        subject: "[Legal]",
        description:
          "Предположительно незаконный контент, нарушение прав, встречные уведомления, апелляции и сообщения органов.",
        details: [
          "Для формального уведомления используйте тему LEGAL NOTICE.",
          "Укажите точный URL и понятное юридическое обоснование.",
          "Соблюдайте требования страницы Legal.",
        ],
        action: "Написать по Legal",
      },
      {
        title: "Персональные данные и GDPR",
        subject: "[Privacy]",
        description:
          "Доступ, исправление, удаление, ограничение, возражение и другие вопросы по персональным данным.",
        details: [
          "Укажите аккаунт, компанию или конкретный контент.",
          "Не отправляйте документы личности без запроса.",
          "Объясните конкретное право или проблему.",
        ],
        action: "Написать по Privacy",
      },
      {
        title: "Оплата и подписки",
        subject: "[Billing]",
        description:
          "Счета, статус подписки, платные функции, подтверждение оплаты и реквизиты billing.",
        details: [
          "Укажите название компании и billing email.",
          "Добавьте номер счёта или заказа, если он есть.",
          "Не отправляйте полные данные банковской карты.",
        ],
        action: "Написать по Billing",
      },
      {
        title: "СМИ и партнёрства",
        subject: "[Media]",
        description:
          "Запросы прессы, интервью, комментарии по данным, партнёрства и деловое сотрудничество.",
        details: [
          "Укажите издание или организацию.",
          "Опишите тему и срок ответа.",
          "Добавьте актуальные контактные данные.",
        ],
        action: "Написать по Media",
      },
    ],
    beforeWriting: "Перед отправкой",
    beforeWritingItems: [
      "Одно письмо — одна понятная тема. При продолжении обращения отвечайте в существующей цепочке.",
      "Указывайте точные URL, названия компаний, VAT, даты и необходимые документы или скриншоты.",
      "Не отправляйте пароли, коды входа, полные данные карты и ненужные личные документы.",
      "Перед действиями по аккаунту, профилю или юридическому обращению CarrierTrust вправе проверить личность, полномочия и доказательства.",
    ],
    legalNoticeTitle: "Жалобы на контент",
    legalNoticeText:
      "Обычное письмо в поддержку не становится автоматически действительным уведомлением о незаконном контенте. LEGAL NOTICE, COUNTER-NOTICE и APPEAL подаются по структурированной процедуре страницы Legal.",
    legalNoticeAction: "Открыть процедуру Legal",
    privacyTitle: "Запросы по персональным данным",
    privacyText:
      "Запросы рассматриваются по Политике конфиденциальности. Осуществление прав может требовать проверки личности и подчиняется ограничениям закона.",
    privacyAction: "Открыть Privacy Policy",
    responseTitle: "Ответ и рассмотрение",
    responseParagraphs: [
      "CarrierTrust стремится рассматривать сообщения в разумный срок с учётом срочности, сложности, доказательств и применимой процедуры. Фиксированный срок не обещается, кроме случаев, когда его устанавливает закон.",
      "Для неполного обращения могут потребоваться уточнения. Повторные отдельные письма могут замедлить процесс, поэтому продолжайте одну цепочку.",
      "Суть жалобы может быть передана затронутому пользователю или компании, когда это разумно необходимо для справедливой оценки, с учётом закона, приватности и безопасности.",
    ],
    securityTitle: "Сообщения о безопасности",
    securityText:
      "При подозрении на взлом аккаунта или проблему безопасности используйте [Support] и добавьте SECURITY в тему. Запрещено без разрешения тестировать, эксплуатировать или пытаться получить доступ к системам.",
    closing:
      "Письмо CarrierTrust само по себе не означает принятия официального вручения судебных документов или процесса, кроме случаев обязательного закона или прямого подтверждения CarrierTrust.",
  },

  fr: {
    badge: "Contact",
    title: "Contacter CarrierTrust",
    subtitle:
      "Utilisez le bon objet afin que votre demande suive la procédure appropriée. CarrierTrust accepte actuellement les demandes écrites par email.",
    operator: "Exploitant de la plateforme",
    vatId: "N° de TVA",
    legalAddress: "Siège social",
    email: "Email",
    languages: "Langues de communication",
    languagesValue: "Anglais, allemand, russe, français, espagnol et italien",
    chooseTopic: "Choisissez le sujet",
    cards: [
      {
        title: "Assistance générale",
        subject: "[Support]",
        description:
          "Accès au compte, utilisation du profil, invitations, problèmes techniques et questions générales.",
        details: [
          "Identifiez le compte ou l’entreprise.",
          "Décrivez le problème et les étapes qui l’ont produit.",
          "Ajoutez des captures uniquement si elles sont utiles.",
        ],
        action: "Écrire au support",
      },
      {
        title: "Juridique et DSA",
        subject: "[Legal]",
        description:
          "Contenu prétendument illégal, atteintes aux droits, contre-notifications, recours et autorités.",
        details: [
          "Pour une notification formelle, utilisez LEGAL NOTICE.",
          "Indiquez l’URL exacte et une explication juridique claire.",
          "Suivez les exigences de la page Legal.",
        ],
        action: "Écrire au service juridique",
      },
      {
        title: "Vie privée et RGPD",
        subject: "[Privacy]",
        description:
          "Accès, rectification, effacement, limitation, opposition et questions relatives aux données.",
        details: [
          "Identifiez le compte, l’entreprise ou le contenu.",
          "N’envoyez pas de pièce d’identité sauf demande.",
          "Expliquez le droit ou la préoccupation précise.",
        ],
        action: "Écrire au service privacy",
      },
      {
        title: "Facturation et abonnements",
        subject: "[Billing]",
        description:
          "Factures, statut d’abonnement, fonctions payantes, confirmation de paiement et données de facturation.",
        details: [
          "Indiquez l’entreprise et l’email de facturation.",
          "Référencez la facture ou commande.",
          "N’envoyez pas les données complètes de carte.",
        ],
        action: "Écrire à la facturation",
      },
      {
        title: "Médias et partenariats",
        subject: "[Media]",
        description:
          "Presse, interviews, commentaires sur les données, partenariats et coopération commerciale.",
        details: [
          "Identifiez la publication ou l’organisation.",
          "Indiquez le sujet et le délai.",
          "Ajoutez les coordonnées pertinentes.",
        ],
        action: "Écrire au contact médias",
      },
    ],
    beforeWriting: "Avant d’écrire",
    beforeWritingItems: [
      "Utilisez un seul sujet clair par email et conservez le même fil pour les relances.",
      "Ajoutez URL exactes, entreprises, TVA, dates et documents ou captures nécessaires.",
      "N’envoyez pas de mot de passe, code, données complètes de carte ou documents personnels inutiles.",
      "CarrierTrust peut vérifier identité, pouvoirs ou preuves avant toute action.",
    ],
    legalNoticeTitle: "Signaler un contenu",
    legalNoticeText:
      "Un email ordinaire au support n’est pas automatiquement une notification valable de contenu prétendument illégal. Les LEGAL NOTICE, COUNTER-NOTICE et APPEAL suivent la procédure de la page Legal.",
    legalNoticeAction: "Ouvrir la procédure Legal",
    privacyTitle: "Demandes de données personnelles",
    privacyText:
      "Les demandes sont traitées selon la Politique de confidentialité. Les droits peuvent exiger une vérification et sont soumis aux limites légales.",
    privacyAction: "Ouvrir la Politique de confidentialité",
    responseTitle: "Réponse et traitement",
    responseParagraphs: [
      "CarrierTrust vise un examen dans un délai raisonnable selon l’urgence, la complexité, les preuves et la procédure. Aucun délai fixe n’est promis sauf obligation légale.",
      "Une demande incomplète peut nécessiter des précisions. Les doublons peuvent ralentir le traitement ; poursuivez le même fil.",
      "L’essentiel d’une plainte peut être communiqué à un utilisateur ou une entreprise concernés lorsque nécessaire à un examen équitable, sous réserve de la loi, de la vie privée et de la sécurité.",
    ],
    securityTitle: "Signalements de sécurité",
    securityText:
      "Pour un compte compromis ou un problème de sécurité, utilisez [Support] et ajoutez SECURITY dans l’objet. Ne testez ni n’exploitez les systèmes sans autorisation.",
    closing:
      "Un email à CarrierTrust ne vaut pas acceptation de signification formelle de documents judiciaires ou d’une procédure, sauf loi impérative ou confirmation expresse.",
  },

  es: {
    badge: "Contacto",
    title: "Contactar con CarrierTrust",
    subtitle:
      "Utiliza el asunto correcto para que la solicitud siga el proceso adecuado. CarrierTrust acepta actualmente consultas escritas por email.",
    operator: "Operador de la plataforma",
    vatId: "N.º de IVA",
    legalAddress: "Domicilio social",
    email: "Email",
    languages: "Idiomas de comunicación",
    languagesValue: "Inglés, alemán, ruso, francés, español e italiano",
    chooseTopic: "Elige el tema",
    cards: [
      {
        title: "Soporte general",
        subject: "[Support]",
        description:
          "Acceso, uso del perfil, invitaciones, problemas técnicos y preguntas generales.",
        details: [
          "Identifica la cuenta o empresa.",
          "Describe el problema y los pasos que lo causaron.",
          "Añade capturas solo cuando sean útiles.",
        ],
        action: "Escribir a soporte",
      },
      {
        title: "Legal y DSA",
        subject: "[Legal]",
        description:
          "Contenido presuntamente ilegal, derechos, contraavisos, recursos y comunicaciones de autoridades.",
        details: [
          "Para un aviso formal usa LEGAL NOTICE.",
          "Incluye URL exacta y explicación jurídica clara.",
          "Sigue la página Legal.",
        ],
        action: "Escribir a legal",
      },
      {
        title: "Privacidad y RGPD",
        subject: "[Privacy]",
        description:
          "Acceso, rectificación, supresión, limitación, oposición y cuestiones de datos.",
        details: [
          "Identifica cuenta, empresa o contenido.",
          "No envíes identidad salvo petición.",
          "Explica el derecho o problema concreto.",
        ],
        action: "Escribir a privacidad",
      },
      {
        title: "Facturación y suscripciones",
        subject: "[Billing]",
        description:
          "Facturas, estado de suscripción, funciones de pago, confirmación y datos de facturación.",
        details: [
          "Incluye empresa y email de facturación.",
          "Referencia factura o pedido.",
          "No envíes datos completos de tarjeta.",
        ],
        action: "Escribir a facturación",
      },
      {
        title: "Medios y colaboraciones",
        subject: "[Media]",
        description:
          "Prensa, entrevistas, comentarios de datos, alianzas y cooperación empresarial.",
        details: [
          "Identifica publicación u organización.",
          "Indica tema y plazo.",
          "Añade datos de contacto.",
        ],
        action: "Escribir a medios",
      },
    ],
    beforeWriting: "Antes de escribir",
    beforeWritingItems: [
      "Usa un tema claro por email y conserva el mismo hilo al continuar.",
      "Incluye URL, empresas, IVA, fechas y documentos o capturas necesarios.",
      "No envíes contraseñas, códigos, tarjetas completas ni documentos personales innecesarios.",
      "CarrierTrust puede verificar identidad, autoridad o pruebas antes de actuar.",
    ],
    legalNoticeTitle: "Reportar contenido",
    legalNoticeText:
      "Un email normal de soporte no es automáticamente un aviso válido de contenido ilegal. LEGAL NOTICE, COUNTER-NOTICE y APPEAL deben seguir la página Legal.",
    legalNoticeAction: "Abrir proceso Legal",
    privacyTitle: "Solicitudes de datos",
    privacyText:
      "Las solicitudes se gestionan conforme a la Política de privacidad. Los derechos pueden requerir verificación y están sujetos a límites legales.",
    privacyAction: "Abrir Política de privacidad",
    responseTitle: "Respuesta y gestión",
    responseParagraphs: [
      "CarrierTrust procura revisar en un plazo razonable según urgencia, complejidad, pruebas y proceso. No se promete un plazo fijo salvo obligación legal.",
      "Las solicitudes incompletas pueden necesitar aclaración. Los duplicados pueden retrasar; continúa el mismo hilo.",
      "La esencia de una reclamación puede compartirse con el usuario o empresa afectados cuando sea necesario para una evaluación justa, sujeto a ley, privacidad y seguridad.",
    ],
    securityTitle: "Avisos de seguridad",
    securityText:
      "Para compromiso de cuenta o seguridad usa [Support] e incluye SECURITY en el asunto. No pruebes ni explotes sistemas sin autorización.",
    closing:
      "Un email a CarrierTrust no constituye aceptación de notificación formal de documentos judiciales o procesos, salvo ley imperativa o confirmación expresa.",
  },

  it: {
    badge: "Contatti",
    title: "Contatta CarrierTrust",
    subtitle:
      "Usa l’oggetto corretto affinché la richiesta segua il processo appropriato. CarrierTrust accetta attualmente richieste scritte via email.",
    operator: "Gestore della piattaforma",
    vatId: "Partita IVA",
    legalAddress: "Sede legale",
    email: "Email",
    languages: "Lingue di comunicazione",
    languagesValue: "Inglese, tedesco, russo, francese, spagnolo e italiano",
    chooseTopic: "Scegli l’argomento",
    cards: [
      {
        title: "Supporto generale",
        subject: "[Support]",
        description:
          "Accesso account, uso profilo, inviti, problemi tecnici e domande generali.",
        details: [
          "Identifica account o impresa.",
          "Descrivi problema e passaggi che lo hanno prodotto.",
          "Allega screenshot solo se utili.",
        ],
        action: "Scrivi al supporto",
      },
      {
        title: "Legale e DSA",
        subject: "[Legal]",
        description:
          "Contenuto presumibilmente illecito, diritti, contro-notifiche, ricorsi e autorità.",
        details: [
          "Per una notifica formale usa LEGAL NOTICE.",
          "Includi URL esatto e spiegazione legale chiara.",
          "Segui la pagina Legal.",
        ],
        action: "Scrivi al legale",
      },
      {
        title: "Privacy e GDPR",
        subject: "[Privacy]",
        description:
          "Accesso, rettifica, cancellazione, limitazione, opposizione e domande sui dati.",
        details: [
          "Identifica account, impresa o contenuto.",
          "Non inviare identità salvo richiesta.",
          "Spiega il diritto o problema specifico.",
        ],
        action: "Scrivi alla privacy",
      },
      {
        title: "Fatturazione e abbonamenti",
        subject: "[Billing]",
        description:
          "Fatture, stato abbonamento, funzioni a pagamento, conferma e dati di fatturazione.",
        details: [
          "Indica impresa ed email di fatturazione.",
          "Riferisci fattura o ordine.",
          "Non inviare dati completi della carta.",
        ],
        action: "Scrivi alla fatturazione",
      },
      {
        title: "Media e partnership",
        subject: "[Media]",
        description:
          "Stampa, interviste, commenti sui dati, partnership e cooperazione aziendale.",
        details: [
          "Identifica pubblicazione o organizzazione.",
          "Indica argomento e scadenza.",
          "Aggiungi contatti pertinenti.",
        ],
        action: "Scrivi ai media",
      },
    ],
    beforeWriting: "Prima di scrivere",
    beforeWritingItems: [
      "Usa un argomento chiaro per email e continua nello stesso thread.",
      "Includi URL, imprese, IVA, date e documenti o screenshot necessari.",
      "Non inviare password, codici, carte complete o documenti personali non necessari.",
      "CarrierTrust può verificare identità, poteri o prove prima di agire.",
    ],
    legalNoticeTitle: "Segnalare contenuti",
    legalNoticeText:
      "Una normale email al supporto non è automaticamente una notifica valida di contenuto illecito. LEGAL NOTICE, COUNTER-NOTICE e APPEAL seguono la pagina Legal.",
    legalNoticeAction: "Apri procedura Legal",
    privacyTitle: "Richieste sui dati",
    privacyText:
      "Le richieste sono gestite secondo l’Informativa privacy. I diritti possono richiedere verifica e sono soggetti a limiti legali.",
    privacyAction: "Apri Informativa privacy",
    responseTitle: "Risposta e gestione",
    responseParagraphs: [
      "CarrierTrust mira a esaminare in un periodo ragionevole secondo urgenza, complessità, prove e processo. Non promette un termine fisso salvo obbligo legale.",
      "Richieste incomplete possono richiedere chiarimenti. I duplicati possono rallentare; continua nello stesso thread.",
      "La sostanza di un reclamo può essere condivisa con utente o impresa interessati quando necessaria a una valutazione equa, nel rispetto di legge, privacy e sicurezza.",
    ],
    securityTitle: "Segnalazioni di sicurezza",
    securityText:
      "Per account compromesso o sicurezza usa [Support] e inserisci SECURITY nell’oggetto. Non testare o sfruttare sistemi senza autorizzazione.",
    closing:
      "Un’email a CarrierTrust non costituisce accettazione di notifica formale di documenti giudiziari o procedimenti, salvo legge imperativa o conferma espressa.",
  },
};


export default function ContactPage() {
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
        <div className="mx-auto max-w-6xl">
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

              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                {t.subtitle}
              </p>

              <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[1.5rem] border border-slate-200/70 bg-white/80 p-6 shadow-sm md:p-8">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {t.operator}
                  </h2>

                  <div className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                    <p className="font-semibold text-slate-900">{OPERATOR.name}</p>
                    <p>
                      {t.vatId}: {OPERATOR.vatId}
                    </p>
                    <p>
                      {t.legalAddress}: {OPERATOR.address}
                    </p>
                    <p>
                      {t.email}: <span className="font-bold text-slate-900">{OPERATOR.email}</span>
                    </p>
                    <p>
                      {t.languages}: {t.languagesValue}
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50/70 p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {t.beforeWriting}
                  </h2>
                  <ul className="mt-4 ml-5 list-disc space-y-2 text-sm leading-6 text-slate-700">
                    {t.beforeWritingItems.map((item, index) => (
                      <li key={`before-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <h2 className="mt-10 text-2xl font-semibold text-slate-900">
                {t.chooseTopic}
              </h2>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {t.cards.map((card, index) => (
                  <article
                    key={`${card.subject}-${index}`}
                    className="flex flex-col rounded-[1.5rem] border border-slate-200/70 bg-white/80 p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {card.title}
                      </h3>
                      <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {card.subject}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {card.description}
                    </p>

                    <ul className="mt-4 ml-5 list-disc space-y-1 text-sm leading-6 text-slate-600">
                      {card.details.map((detail, detailIndex) => (
                        <li key={`${index}-detail-${detailIndex}`}>{detail}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {t.legalNoticeTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {t.legalNoticeText}
                  </p>
                  <Link
                    href="/legal"
                    className="mt-4 inline-flex text-sm font-semibold text-emerald-700 underline underline-offset-4"
                  >
                    {t.legalNoticeAction}
                  </Link>
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {t.privacyTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {t.privacyText}
                  </p>
                  <Link
                    href="/privacy"
                    className="mt-4 inline-flex text-sm font-semibold text-emerald-700 underline underline-offset-4"
                  >
                    {t.privacyAction}
                  </Link>
                </div>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-slate-200/70 bg-white/80 p-6 shadow-sm md:p-8">
                <h2 className="text-xl font-semibold text-slate-900">
                  {t.responseTitle}
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  {t.responseParagraphs.map((paragraph, index) => (
                    <p key={`response-${index}`}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/80 p-5">
                  <h3 className="font-semibold text-slate-900">
                    {t.securityTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {t.securityText}
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-sm leading-6 text-slate-700">
                {t.closing}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
