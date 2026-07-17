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
  li5: string;

  section3: string;
  section3Text: string;

  section4: string;
  section4Text: string;

  section5: string;
  section5Text: string;

  section6: string;
  section6Text: string;

  section7: string;
  section7Text: string;

  section8: string;
  section8Text: string;
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    badge: "Terms",
    title: "Terms of Service",
    intro:
      "CarrierTrust is an independent online platform based in the Republic of Latvia, European Union. The platform provides technical infrastructure allowing users to publish reviews regarding logistics, transport and business cooperation.",

    section1: "1. Role of the Platform",
    section1Text:
      "CarrierTrust operates exclusively as a neutral intermediary hosting service under applicable European Union law, including Regulation (EU) 2022/2065 (Digital Services Act). CarrierTrust does not create, initiate, pre-approve, verify, endorse, guarantee, or assume responsibility for the factual accuracy of user-generated content before publication. CarrierTrust shall not be considered the publisher, editor, author, employer, agent, or representative of any user submitting content.",

    section2: "2. User Responsibility",
    section2Text:
      "Each user is fully and solely responsible for all content submitted, published, uploaded, or transmitted through CarrierTrust. By submitting content, the user confirms that:",
    li1: "The content is truthful and based on genuine business experience",
    li2: "The content does not contain false statements, unlawful accusations, defamation, insults, misleading claims, or unverified allegations of criminal conduct",
    li3: "The content does not infringe privacy, confidentiality, trade secrets, intellectual property, contractual obligations, or third-party rights",
    li4: "The content does not disclose personal data, confidential logistics information, internal pricing, documents, or commercially sensitive information without lawful basis",
    li5: "The user accepts full legal responsibility and agrees to indemnify CarrierTrust against all claims, losses, damages, legal costs, liabilities, or proceedings arising from submitted content",

    section3: "3. No Liability",
    section3Text:
      "To the maximum extent permitted by law, CarrierTrust shall not be liable for any direct, indirect, incidental, reputational, financial, contractual, regulatory, punitive, or consequential damages arising from user-generated content, third-party disputes, publication delays, content removal, account suspension, temporary restriction of access, platform downtime, data loss, or actions taken in response to legal complaints. Any legal claim concerning user-generated content must be directed against the original author of that content.",

    section4: "4. Content Moderation and Removal",
    section4Text:
      "CarrierTrust reserves the right, at its sole discretion and without prior notice, to remove, restrict, suspend, hide, archive, anonymize, de-index, preserve, or permanently delete any content or account where required by law, internal policy, legal complaint, authority request, fraud prevention, abuse prevention, technical necessity, or protection of platform integrity. Removal, restriction, or preservation of content shall not constitute admission of liability, endorsement of any claim, or confirmation that the content was unlawful.",

    section5: "5. No Duty to Investigate",
    section5Text:
      "CarrierTrust has no general obligation to monitor, investigate facts, verify evidence, assess commercial truthfulness, or independently determine legality of user submissions before publication. CarrierTrust may review content after receiving a sufficiently precise and substantiated notice, court order, authority request, or internal abuse signal.",

    section6: "6. Account Suspension and Abuse",
    section6Text:
      "CarrierTrust may suspend, restrict, or permanently terminate accounts involved in repeated violations, fake reviews, unlawful content, abusive submissions, false legal notices, harassment, manipulation, fraud, automated misuse, or attempts to interfere with the platform, its users, or its moderation systems.",

    section7: "7. Evidence Preservation",
    section7Text:
      "CarrierTrust may preserve technical records, timestamps, IP logs, user identifiers, account activity, moderation history, complaint history, and related evidence where necessary for legal compliance, dispute handling, fraud prevention, platform security, enforcement of these Terms, or cooperation with competent authorities.",

    section8: "8. Governing Law and Language Priority",
    section8Text:
      "These Terms are governed exclusively by the laws of the Republic of Latvia. All disputes, claims, injunctions, administrative complaints, or judicial proceedings shall be subject to the exclusive jurisdiction of the competent courts of Riga, Latvia. In case of inconsistency between language versions, the English version shall prevail.",
  },

  de: {
    badge: "Bedingungen",
    title: "Nutzungsbedingungen",
    intro:
      "CarrierTrust ist eine unabhängige Online-Plattform mit Sitz in der Republik Lettland, Europäische Union. Die Plattform stellt technische Infrastruktur bereit, über die Nutzer Bewertungen zu Logistik, Transport und geschäftlicher Zusammenarbeit veröffentlichen können.",

    section1: "1. Rolle der Plattform",
    section1Text:
      "CarrierTrust handelt ausschließlich als neutraler Vermittler- und Hosting-Dienstleister nach anwendbarem Recht der Europäischen Union, einschließlich der Verordnung (EU) 2022/2065 (Digital Services Act). CarrierTrust erstellt, initiiert, genehmigt, überprüft, unterstützt, garantiert oder übernimmt vor der Veröffentlichung keine Verantwortung für die sachliche Richtigkeit nutzergenerierter Inhalte. CarrierTrust gilt nicht als Herausgeber, Redakteur, Autor, Arbeitgeber, Vertreter oder Beauftragter eines Nutzers, der Inhalte einreicht.",

    section2: "2. Verantwortung des Nutzers",
    section2Text:
      "Jeder Nutzer ist vollständig und allein für alle Inhalte verantwortlich, die über CarrierTrust eingereicht, veröffentlicht, hochgeladen oder übermittelt werden. Mit der Einreichung von Inhalten bestätigt der Nutzer, dass:",
    li1: "Die Inhalte wahrheitsgemäß sind und auf tatsächlicher Geschäftserfahrung beruhen",
    li2: "Die Inhalte keine falschen Aussagen, rechtswidrigen Anschuldigungen, Verleumdungen, Beleidigungen, irreführenden Behauptungen oder unbelegten Vorwürfe strafbaren Verhaltens enthalten",
    li3: "Die Inhalte keine Datenschutzrechte, Vertraulichkeitspflichten, Geschäftsgeheimnisse, geistigen Eigentumsrechte, vertraglichen Pflichten oder Rechte Dritter verletzen",
    li4: "Die Inhalte keine personenbezogenen Daten, vertraulichen Logistikinformationen, internen Preise, Dokumente oder geschäftlich sensiblen Informationen ohne rechtmäßige Grundlage offenlegen",
    li5: "Der Nutzer die volle rechtliche Verantwortung übernimmt und CarrierTrust von sämtlichen Ansprüchen, Verlusten, Schäden, Rechtskosten, Verbindlichkeiten oder Verfahren freistellt, die aus den eingereichten Inhalten entstehen",

    section3: "3. Keine Haftung",
    section3Text:
      "Soweit gesetzlich zulässig, haftet CarrierTrust nicht für direkte, indirekte, zufällige, reputationsbezogene, finanzielle, vertragliche, regulatorische, strafende oder Folgeschäden, die aus nutzergenerierten Inhalten, Streitigkeiten Dritter, Veröffentlichungsverzögerungen, Inhaltsentfernung, Kontosperrung, vorübergehender Zugriffsbeschränkung, Plattformausfällen, Datenverlust oder Maßnahmen aufgrund rechtlicher Beschwerden entstehen. Rechtliche Ansprüche wegen nutzergenerierter Inhalte sind gegen den ursprünglichen Autor der Inhalte zu richten.",

    section4: "4. Moderation und Entfernung von Inhalten",
    section4Text:
      "CarrierTrust behält sich das Recht vor, nach eigenem Ermessen und ohne vorherige Ankündigung Inhalte oder Konten zu entfernen, einzuschränken, auszusetzen, zu verbergen, zu archivieren, zu anonymisieren, zu de-indexieren, aufzubewahren oder dauerhaft zu löschen, wenn dies gesetzlich, nach interner Richtlinie, aufgrund rechtlicher Beschwerden, behördlicher Anfragen, zur Betrugs- oder Missbrauchsprävention, aus technischen Gründen oder zum Schutz der Plattformintegrität erforderlich ist. Entfernung, Einschränkung oder Aufbewahrung von Inhalten stellt kein Schuldeingeständnis, keine Anerkennung eines Anspruchs und keine Bestätigung der Rechtswidrigkeit dar.",

    section5: "5. Keine Untersuchungspflicht",
    section5Text:
      "CarrierTrust ist nicht allgemein verpflichtet, Inhalte vor Veröffentlichung zu überwachen, Tatsachen zu untersuchen, Beweise zu prüfen, geschäftliche Wahrhaftigkeit zu bewerten oder die Rechtmäßigkeit von Nutzereinreichungen selbstständig festzustellen. CarrierTrust kann Inhalte nach Erhalt einer hinreichend genauen und begründeten Mitteilung, gerichtlichen Anordnung, behördlichen Anfrage oder eines internen Missbrauchssignals prüfen.",

    section6: "6. Kontosperrung und Missbrauch",
    section6Text:
      "CarrierTrust kann Konten einschränken, sperren oder dauerhaft beenden, wenn sie an wiederholten Verstößen, gefälschten Bewertungen, rechtswidrigen Inhalten, missbräuchlichen Einreichungen, falschen rechtlichen Mitteilungen, Belästigung, Manipulation, Betrug, automatisiertem Missbrauch oder Versuchen beteiligt sind, die Plattform, Nutzer oder Moderationssysteme zu beeinträchtigen.",

    section7: "7. Beweissicherung",
    section7Text:
      "CarrierTrust kann technische Aufzeichnungen, Zeitstempel, IP-Protokolle, Nutzerkennungen, Kontoaktivitäten, Moderationsverläufe, Beschwerdeverläufe und zugehörige Beweise aufbewahren, soweit dies für rechtliche Compliance, Streitbeilegung, Betrugsprävention, Plattformsicherheit, Durchsetzung dieser Bedingungen oder Zusammenarbeit mit zuständigen Behörden erforderlich ist.",

    section8: "8. Anwendbares Recht und Sprachpriorität",
    section8Text:
      "Diese Bedingungen unterliegen ausschließlich dem Recht der Republik Lettland. Alle Streitigkeiten, Ansprüche, einstweiligen Verfügungen, Verwaltungsbeschwerden oder Gerichtsverfahren unterliegen der ausschließlichen Zuständigkeit der zuständigen Gerichte in Riga, Lettland. Bei Abweichungen zwischen Sprachversionen ist die englische Version maßgeblich.",
  },

  ru: {
    badge: "Условия",
    title: "Условия использования",
    intro:
      "CarrierTrust — независимая онлайн-платформа, расположенная в Латвийской Республике, Европейский Союз. Платформа предоставляет техническую инфраструктуру, позволяющую пользователям публиковать отзывы о логистике, транспорте и деловом сотрудничестве.",

    section1: "1. Роль платформы",
    section1Text:
      "CarrierTrust действует исключительно как нейтральный посреднический хостинг-сервис в соответствии с применимым законодательством Европейского Союза, включая Регламент (EU) 2022/2065 (Digital Services Act). CarrierTrust не создаёт, не инициирует, не утверждает заранее, не проверяет, не одобряет, не гарантирует и не принимает на себя ответственность за фактическую точность пользовательского контента до его публикации. CarrierTrust не считается издателем, редактором, автором, работодателем, агентом или представителем пользователя, публикующего контент.",

    section2: "2. Ответственность пользователя",
    section2Text:
      "Каждый пользователь полностью и единолично несёт ответственность за весь контент, отправленный, опубликованный, загруженный или переданный через CarrierTrust. Отправляя контент, пользователь подтверждает, что:",
    li1: "Контент является правдивым и основан на реальном деловом опыте",
    li2: "Контент не содержит ложных сведений, незаконных обвинений, клеветы, оскорблений, вводящих в заблуждение заявлений или неподтверждённых обвинений в преступном поведении",
    li3: "Контент не нарушает права на приватность, конфиденциальность, коммерческую тайну, интеллектуальную собственность, договорные обязательства или права третьих лиц",
    li4: "Контент не раскрывает персональные данные, конфиденциальную логистическую информацию, внутренние цены, документы или коммерчески чувствительную информацию без законного основания",
    li5: "Пользователь принимает полную юридическую ответственность и обязуется возместить CarrierTrust любые претензии, убытки, ущерб, юридические расходы, обязательства или разбирательства, возникающие из опубликованного контента",

    section3: "3. Отсутствие ответственности",
    section3Text:
      "В максимально допустимой законом степени CarrierTrust не несёт ответственности за прямые, косвенные, случайные, репутационные, финансовые, договорные, регуляторные, штрафные или последующие убытки, возникающие из пользовательского контента, споров третьих лиц, задержек публикации, удаления контента, блокировки аккаунта, временного ограничения доступа, недоступности платформы, потери данных или действий, предпринятых в ответ на юридические жалобы. Любые юридические претензии, связанные с пользовательским контентом, должны быть направлены исключительно первоначальному автору такого контента.",

    section4: "4. Модерация и удаление контента",
    section4Text:
      "CarrierTrust оставляет за собой право по собственному усмотрению и без предварительного уведомления удалять, ограничивать, приостанавливать, скрывать, архивировать, анонимизировать, деиндексировать, сохранять или окончательно удалять любой контент или аккаунт, если это требуется законом, внутренней политикой, юридической жалобой, запросом компетентного органа, предотвращением мошенничества или злоупотреблений, технической необходимостью либо защитой целостности платформы. Удаление, ограничение или сохранение контента не означает признания ответственности, согласия с какой-либо претензией или подтверждения незаконности контента.",

    section5: "5. Отсутствие обязанности расследовать",
    section5Text:
      "CarrierTrust не несёт общей обязанности мониторить контент, расследовать факты, проверять доказательства, оценивать коммерческую достоверность или самостоятельно определять законность пользовательских публикаций до их размещения. CarrierTrust может рассмотреть контент после получения достаточно точного и обоснованного уведомления, судебного предписания, запроса компетентного органа или внутреннего сигнала о злоупотреблении.",

    section6: "6. Блокировка аккаунтов и злоупотребления",
    section6Text:
      "CarrierTrust может приостановить, ограничить или окончательно заблокировать аккаунты, связанные с повторными нарушениями, фейковыми отзывами, незаконным контентом, злоупотреблениями, ложными юридическими уведомлениями, преследованием, манипуляциями, мошенничеством, автоматизированным злоупотреблением или попытками вмешательства в работу платформы, пользователей или систем модерации.",

    section7: "7. Сохранение доказательств",
    section7Text:
      "CarrierTrust может сохранять технические записи, временные метки, IP-логи, идентификаторы пользователей, активность аккаунтов, историю модерации, историю жалоб и связанные доказательства, если это необходимо для соблюдения закона, рассмотрения споров, предотвращения мошенничества, безопасности платформы, применения настоящих Условий или сотрудничества с компетентными органами.",

    section8: "8. Применимое право и приоритет языка",
    section8Text:
      "Настоящие Условия регулируются исключительно законодательством Латвийской Республики. Все споры, претензии, обеспечительные меры, административные жалобы или судебные разбирательства относятся к исключительной юрисдикции компетентных судов города Рига, Латвия. В случае расхождений между языковыми версиями приоритет имеет английская версия.",
  },

  fr: {
    badge: "Conditions",
    title: "Conditions d’utilisation",
    intro:
      "CarrierTrust est une plateforme en ligne indépendante basée en République de Lettonie, Union européenne. La plateforme fournit une infrastructure technique permettant aux utilisateurs de publier des avis concernant la logistique, le transport et la coopération commerciale.",

    section1: "1. Rôle de la plateforme",
    section1Text:
      "CarrierTrust agit exclusivement comme service d’hébergement intermédiaire neutre conformément au droit applicable de l’Union européenne, y compris le Règlement (UE) 2022/2065 (Digital Services Act). CarrierTrust ne crée pas, n’initie pas, ne préapprouve pas, ne vérifie pas, n’approuve pas, ne garantit pas et n’assume aucune responsabilité quant à l’exactitude factuelle des contenus générés par les utilisateurs avant leur publication. CarrierTrust ne doit pas être considéré comme éditeur, rédacteur, auteur, employeur, agent ou représentant d’un utilisateur soumettant du contenu.",

    section2: "2. Responsabilité de l’utilisateur",
    section2Text:
      "Chaque utilisateur est entièrement et exclusivement responsable de tout contenu soumis, publié, téléversé ou transmis via CarrierTrust. En soumettant du contenu, l’utilisateur confirme que :",
    li1: "Le contenu est véridique et fondé sur une expérience commerciale réelle",
    li2: "Le contenu ne contient pas de fausses déclarations, accusations illicites, diffamation, insultes, affirmations trompeuses ou allégations non vérifiées de comportement criminel",
    li3: "Le contenu ne porte pas atteinte à la vie privée, à la confidentialité, aux secrets d’affaires, à la propriété intellectuelle, aux obligations contractuelles ou aux droits de tiers",
    li4: "Le contenu ne divulgue pas de données personnelles, informations logistiques confidentielles, prix internes, documents ou informations commercialement sensibles sans base légale",
    li5: "L’utilisateur accepte l’entière responsabilité juridique et s’engage à indemniser CarrierTrust contre toute réclamation, perte, dommage, frais juridiques, responsabilité ou procédure découlant du contenu soumis",

    section3: "3. Absence de responsabilité",
    section3Text:
      "Dans toute la mesure permise par la loi, CarrierTrust ne saurait être tenu responsable des dommages directs, indirects, accessoires, réputationnels, financiers, contractuels, réglementaires, punitifs ou consécutifs résultant de contenus générés par les utilisateurs, litiges avec des tiers, retards de publication, suppression de contenu, suspension de compte, restriction temporaire d’accès, interruption de la plateforme, perte de données ou mesures prises en réponse à des plaintes juridiques. Toute réclamation juridique concernant un contenu généré par un utilisateur doit être dirigée contre l’auteur initial de ce contenu.",

    section4: "4. Modération et suppression de contenu",
    section4Text:
      "CarrierTrust se réserve le droit, à sa seule discrétion et sans préavis, de supprimer, restreindre, suspendre, masquer, archiver, anonymiser, désindexer, conserver ou supprimer définitivement tout contenu ou compte lorsque cela est requis par la loi, une politique interne, une plainte juridique, une demande d’autorité, la prévention de la fraude ou des abus, une nécessité technique ou la protection de l’intégrité de la plateforme. La suppression, restriction ou conservation d’un contenu ne constitue pas une reconnaissance de responsabilité, une approbation d’une réclamation ou une confirmation que le contenu était illicite.",

    section5: "5. Absence d’obligation d’enquête",
    section5Text:
      "CarrierTrust n’a aucune obligation générale de surveiller, d’enquêter sur les faits, de vérifier les preuves, d’évaluer la véracité commerciale ou de déterminer de manière indépendante la légalité des contenus soumis par les utilisateurs avant leur publication. CarrierTrust peut examiner un contenu après réception d’une notification suffisamment précise et étayée, d’une ordonnance judiciaire, d’une demande d’autorité ou d’un signal interne d’abus.",

    section6: "6. Suspension de compte et abus",
    section6Text:
      "CarrierTrust peut suspendre, restreindre ou résilier définitivement des comptes impliqués dans des violations répétées, faux avis, contenus illicites, soumissions abusives, fausses notifications juridiques, harcèlement, manipulation, fraude, abus automatisé ou tentatives d’interférence avec la plateforme, ses utilisateurs ou ses systèmes de modération.",

    section7: "7. Conservation des preuves",
    section7Text:
      "CarrierTrust peut conserver des enregistrements techniques, horodatages, journaux IP, identifiants d’utilisateur, activité de compte, historique de modération, historique de plaintes et preuves associées lorsque cela est nécessaire à la conformité légale, au traitement des litiges, à la prévention de la fraude, à la sécurité de la plateforme, à l’application des présentes Conditions ou à la coopération avec les autorités compétentes.",

    section8: "8. Droit applicable et priorité linguistique",
    section8Text:
      "Les présentes Conditions sont régies exclusivement par le droit de la République de Lettonie. Tous litiges, réclamations, injonctions, plaintes administratives ou procédures judiciaires relèvent de la compétence exclusive des tribunaux compétents de Riga, Lettonie. En cas d’incohérence entre les versions linguistiques, la version anglaise prévaut.",
  },

  es: {
    badge: "Términos",
    title: "Términos del servicio",
    intro:
      "CarrierTrust es una plataforma online independiente con sede en la República de Letonia, Unión Europea. La plataforma proporciona infraestructura técnica que permite a los usuarios publicar reseñas relacionadas con logística, transporte y cooperación empresarial.",

    section1: "1. Rol de la plataforma",
    section1Text:
      "CarrierTrust opera exclusivamente como servicio neutral intermediario de alojamiento bajo la legislación aplicable de la Unión Europea, incluido el Reglamento (UE) 2022/2065 (Digital Services Act). CarrierTrust no crea, inicia, aprueba previamente, verifica, respalda, garantiza ni asume responsabilidad por la exactitud factual del contenido generado por usuarios antes de su publicación. CarrierTrust no será considerado editor, redactor, autor, empleador, agente o representante de ningún usuario que envíe contenido.",

    section2: "2. Responsabilidad del usuario",
    section2Text:
      "Cada usuario es total y exclusivamente responsable de todo contenido enviado, publicado, cargado o transmitido a través de CarrierTrust. Al enviar contenido, el usuario confirma que:",
    li1: "El contenido es veraz y se basa en una experiencia empresarial real",
    li2: "El contenido no contiene declaraciones falsas, acusaciones ilícitas, difamación, insultos, afirmaciones engañosas o alegaciones no verificadas de conducta criminal",
    li3: "El contenido no infringe privacidad, confidencialidad, secretos comerciales, propiedad intelectual, obligaciones contractuales o derechos de terceros",
    li4: "El contenido no divulga datos personales, información logística confidencial, precios internos, documentos o información comercialmente sensible sin base legal",
    li5: "El usuario acepta plena responsabilidad legal y se compromete a indemnizar a CarrierTrust frente a reclamaciones, pérdidas, daños, costes legales, responsabilidades o procedimientos derivados del contenido enviado",

    section3: "3. Ausencia de responsabilidad",
    section3Text:
      "En la máxima medida permitida por la ley, CarrierTrust no será responsable de daños directos, indirectos, incidentales, reputacionales, financieros, contractuales, regulatorios, punitivos o consecuentes derivados del contenido generado por usuarios, disputas con terceros, retrasos de publicación, eliminación de contenido, suspensión de cuentas, restricción temporal de acceso, interrupciones de la plataforma, pérdida de datos o acciones tomadas en respuesta a reclamaciones legales. Cualquier reclamación legal relacionada con contenido generado por usuarios deberá dirigirse contra el autor original de dicho contenido.",

    section4: "4. Moderación y eliminación de contenido",
    section4Text:
      "CarrierTrust se reserva el derecho, a su sola discreción y sin aviso previo, de eliminar, restringir, suspender, ocultar, archivar, anonimizar, desindexar, conservar o eliminar permanentemente cualquier contenido o cuenta cuando sea requerido por la ley, política interna, reclamación legal, solicitud de autoridad, prevención de fraude, prevención de abuso, necesidad técnica o protección de la integridad de la plataforma. La eliminación, restricción o conservación de contenido no constituye admisión de responsabilidad, aceptación de ninguna reclamación ni confirmación de que el contenido fuera ilícito.",

    section5: "5. Sin obligación de investigar",
    section5Text:
      "CarrierTrust no tiene obligación general de supervisar, investigar hechos, verificar pruebas, evaluar la veracidad comercial o determinar independientemente la legalidad de los envíos de usuarios antes de su publicación. CarrierTrust podrá revisar contenido tras recibir una notificación suficientemente precisa y fundamentada, orden judicial, solicitud de autoridad o señal interna de abuso.",

    section6: "6. Suspensión de cuentas y abuso",
    section6Text:
      "CarrierTrust podrá suspender, restringir o cancelar permanentemente cuentas involucradas en violaciones repetidas, reseñas falsas, contenido ilícito, envíos abusivos, falsas notificaciones legales, acoso, manipulación, fraude, abuso automatizado o intentos de interferir con la plataforma, sus usuarios o sus sistemas de moderación.",

    section7: "7. Conservación de pruebas",
    section7Text:
      "CarrierTrust podrá conservar registros técnicos, marcas de tiempo, registros IP, identificadores de usuario, actividad de cuenta, historial de moderación, historial de reclamaciones y pruebas relacionadas cuando sea necesario para cumplimiento legal, gestión de disputas, prevención de fraude, seguridad de la plataforma, aplicación de estos Términos o cooperación con autoridades competentes.",

    section8: "8. Ley aplicable y prioridad lingüística",
    section8Text:
      "Estos Términos se rigen exclusivamente por las leyes de la República de Letonia. Todas las disputas, reclamaciones, medidas cautelares, quejas administrativas o procedimientos judiciales estarán sujetos a la jurisdicción exclusiva de los tribunales competentes de Riga, Letonia. En caso de inconsistencia entre versiones lingüísticas, prevalecerá la versión inglesa.",
  },

  it: {
    badge: "Termini",
    title: "Termini di servizio",
    intro:
      "CarrierTrust è una piattaforma online indipendente con sede nella Repubblica di Lettonia, Unione Europea. La piattaforma fornisce infrastruttura tecnica che consente agli utenti di pubblicare recensioni relative a logistica, trasporto e cooperazione commerciale.",

    section1: "1. Ruolo della piattaforma",
    section1Text:
      "CarrierTrust opera esclusivamente come servizio neutrale di hosting intermediario ai sensi del diritto applicabile dell’Unione Europea, incluso il Regolamento (UE) 2022/2065 (Digital Services Act). CarrierTrust non crea, avvia, pre-approva, verifica, approva, garantisce né assume responsabilità per l’accuratezza fattuale dei contenuti generati dagli utenti prima della pubblicazione. CarrierTrust non deve essere considerato editore, redattore, autore, datore di lavoro, agente o rappresentante di alcun utente che invii contenuti.",

    section2: "2. Responsabilità dell’utente",
    section2Text:
      "Ogni utente è pienamente ed esclusivamente responsabile di tutti i contenuti inviati, pubblicati, caricati o trasmessi tramite CarrierTrust. Inviando contenuti, l’utente conferma che:",
    li1: "Il contenuto è veritiero e basato su reale esperienza commerciale",
    li2: "Il contenuto non contiene dichiarazioni false, accuse illecite, diffamazione, insulti, affermazioni fuorvianti o accuse non verificate di condotta criminale",
    li3: "Il contenuto non viola privacy, riservatezza, segreti commerciali, proprietà intellettuale, obblighi contrattuali o diritti di terzi",
    li4: "Il contenuto non divulga dati personali, informazioni logistiche riservate, prezzi interni, documenti o informazioni commercialmente sensibili senza base giuridica",
    li5: "L’utente accetta piena responsabilità legale e si impegna a manlevare CarrierTrust da reclami, perdite, danni, costi legali, responsabilità o procedimenti derivanti dai contenuti inviati",

    section3: "3. Esclusione di responsabilità",
    section3Text:
      "Nella massima misura consentita dalla legge, CarrierTrust non sarà responsabile per danni diretti, indiretti, incidentali, reputazionali, finanziari, contrattuali, regolatori, punitivi o consequenziali derivanti da contenuti generati dagli utenti, controversie con terzi, ritardi di pubblicazione, rimozione di contenuti, sospensione di account, restrizione temporanea dell’accesso, interruzioni della piattaforma, perdita di dati o azioni adottate in risposta a reclami legali. Qualsiasi pretesa legale relativa a contenuti generati dagli utenti deve essere rivolta contro l’autore originale di tali contenuti.",

    section4: "4. Moderazione e rimozione dei contenuti",
    section4Text:
      "CarrierTrust si riserva il diritto, a propria esclusiva discrezione e senza preavviso, di rimuovere, limitare, sospendere, nascondere, archiviare, anonimizzare, deindicizzare, conservare o eliminare definitivamente qualsiasi contenuto o account quando richiesto dalla legge, da policy interna, reclamo legale, richiesta di autorità, prevenzione di frodi o abusi, necessità tecnica o protezione dell’integrità della piattaforma. La rimozione, limitazione o conservazione del contenuto non costituisce ammissione di responsabilità, accettazione di alcuna pretesa o conferma dell’illiceità del contenuto.",

    section5: "5. Nessun obbligo di indagine",
    section5Text:
      "CarrierTrust non ha alcun obbligo generale di monitorare, investigare fatti, verificare prove, valutare la veridicità commerciale o determinare autonomamente la legalità dei contenuti inviati dagli utenti prima della pubblicazione. CarrierTrust può esaminare contenuti dopo aver ricevuto una segnalazione sufficientemente precisa e motivata, ordine giudiziario, richiesta di autorità o segnale interno di abuso.",

    section6: "6. Sospensione account e abuso",
    section6Text:
      "CarrierTrust può sospendere, limitare o chiudere definitivamente account coinvolti in violazioni ripetute, recensioni false, contenuti illeciti, invii abusivi, false notifiche legali, molestie, manipolazione, frode, abuso automatizzato o tentativi di interferire con la piattaforma, i suoi utenti o i suoi sistemi di moderazione.",

    section7: "7. Conservazione delle prove",
    section7Text:
      "CarrierTrust può conservare registri tecnici, timestamp, log IP, identificativi utente, attività account, cronologia di moderazione, cronologia reclami e prove correlate quando necessario per conformità legale, gestione delle controversie, prevenzione frodi, sicurezza della piattaforma, applicazione dei presenti Termini o cooperazione con autorità competenti.",

    section8: "8. Legge applicabile e priorità linguistica",
    section8Text:
      "I presenti Termini sono regolati esclusivamente dalle leggi della Repubblica di Lettonia. Tutte le controversie, pretese, ingiunzioni, reclami amministrativi o procedimenti giudiziari saranno soggetti alla giurisdizione esclusiva dei tribunali competenti di Riga, Lettonia. In caso di incoerenza tra versioni linguistiche, prevale la versione inglese.",
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
                      <li>{t.li5}</li>
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

                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-slate-900">
                      {t.section6}
                    </h2>
                    <p>{t.section6Text}</p>
                  </div>

                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-slate-900">
                      {t.section7}
                    </h2>
                    <p>{t.section7Text}</p>
                  </div>

                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-slate-900">
                      {t.section8}
                    </h2>
                    <p>{t.section8Text}</p>
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