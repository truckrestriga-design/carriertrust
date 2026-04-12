"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useLang } from "@/lib/language-context";
import { trackEvent } from "@/lib/analytics";

type Lang = "en" | "de" | "ru" | "fr" | "es" | "it";
type TabKey = "reviews" | "timeline" | "about";

type BannerItem = {
  id: string;
  image: string;
  alt?: string;
};

type BannerSide = "left" | "right";

type RotatingBannerProps = {
  side: BannerSide;
  banners: BannerItem[];
  onAddClick: (side: BannerSide) => void;
};

type TextPack = {
  back: string;
  trustScore: string;
  reviews: string;

  tabsReviews: string;
  tabsTimeline: string;
  tabsAbout: string;

  noReviewsTitle: string;
  noReviewsText: string;
  companyNotFound: string;

  by: string;
  report: string;

  writeReview: string;
  claimThisCompany: string;
  claimPending: string;
  claimApproved: string;
  verified: string;
  companyDashboard: string;

  underReviewTitle: string;
  underReviewText: string;

  companyReplyTitle: string;
  official: string;

  reportTitle: string;
  reportHelp: string;
  yourEmail: string;
  yourCompany: string;
  reason: string;
  close: string;
  submitReport: string;
  sending: string;
  thanks: string;
  fillEmailReason: string;
  invalidEmail: string;
  waitSpam: string;

  businessEmailOnly: string;
  duplicateError: string;
  rateLimitedGeneric: string;
  sendFailedGeneric: string;

  aboutTitle: string;
  aboutText: string;

  timelineTitle: string;
  timelineText: string;

  latestPublished: string;

  trustBasedOnSignals: string;
  trustBasedOnReviews: string;
  trustNoData: string;
  riskLabel: string;
  riskLow: string;
  riskMedium: string;
  riskHigh: string;
  updatedLabel: string;

  verifiedCompany: string;
  verifiedCompanyHelp: string;
  verifiedLearnMore: string;

  fraudScoreLabel: string;
  autoFlaggedLabel: string;

  countryLabel: string;
  vatLabel: string;
  loading: string;
  neutralHostingNote: string;
  verifiedBonus: string;

  adSpace: string;
  bannerEmptyText: string;
  addBanner: string;
  orderBanner: string;
  companyPageLabel: string;
  sideLabel: string;
  sideLeft: string;
  sideRight: string;
  sizeLabel: string;
  choosePeriod: string;
  companyName: string;
  companyNamePlaceholder: string;
  invoiceEmail: string;
  invoiceEmailPlaceholder: string;
  uploadBanner: string;
  chooseBannerFile: string;
  recommendedSize: string;
  paymentDetails: string;
  bankCompany: string;
  bankAccount: string;
  bankBic: string;
  amount: string;
  paymentPurpose: string;
  paymentPurposeFallback: string;
  uploadPaymentProof: string;
  uploadPaymentConfirmation: string;
  paymentProofFormats: string;
  bannerPreview: string;
  bannerPreviewEmpty: string;
  havePaid: string;
  bannerSuccessMessage: string;
  publishAfterModeration: string;
  errorSending: string;
};

const EN: TextPack = {
  back: "← Back to home",
  trustScore: "Trust score",
  reviews: "Reviews",

  tabsReviews: "Reviews",
  tabsTimeline: "Timeline",
  tabsAbout: "About",

  noReviewsTitle: "No published reviews yet",
  noReviewsText: "This company has no published reviews at the moment.",
  companyNotFound: "Company not found.",

  by: "By",
  report: "Report",

  writeReview: "Write a review",
  claimThisCompany: "Claim this company",
  claimPending: "Claim pending",
  claimApproved: "Official company account",
  verified: "Verified",
  companyDashboard: "Company dashboard",

  underReviewTitle: "Under investigation",
  underReviewText:
    "This review has received multiple reports or signals and is currently being reviewed. It remains visible unless it violates our policies.",

  companyReplyTitle: "Company reply",
  official: "Official",

  reportTitle: "Report review",
  reportHelp: "Please provide your business email and the reason for the report.",
  yourEmail: "Your business email *",
  yourCompany: "Your company (optional)",
  reason: "Reason * (illegal content, personal data, threats, spam, etc.)",
  close: "Close",
  submitReport: "Submit report",
  sending: "Sending...",
  thanks: "Thank you. Your report has been submitted.",
  fillEmailReason: "Please fill your email and the reason.",
  invalidEmail: "Please enter a valid email address.",
  waitSpam: "Please wait a bit before sending another report.",

  businessEmailOnly: "Business email only (no free email providers).",
  duplicateError: "You have already reported this review recently.",
  rateLimitedGeneric: "Too many reports. Please wait and try again.",
  sendFailedGeneric: "Could not send report right now. Please try again later.",

  aboutTitle: "About",
  aboutText:
    "Company information will appear here (next: verification + profile details).",

  timelineTitle: "Timeline",
  timelineText:
    "Timeline will appear here (next: signals, replies, verification events).",

  latestPublished: "Latest published reviews for this company",

  trustBasedOnSignals: "Based on trust signals",
  trustBasedOnReviews: "Based on published reviews",
  trustNoData: "No trust data yet",
  riskLabel: "Risk",
  riskLow: "Low",
  riskMedium: "Medium",
  riskHigh: "High",
  updatedLabel: "Updated",

  verifiedCompany: "Verified company",
  verifiedCompanyHelp: "Identity verified (VAT / domain / admin check).",
  verifiedLearnMore: "What does verified mean?",

  fraudScoreLabel: "Fraud score",
  autoFlaggedLabel: "Auto-flagged by system",

  countryLabel: "Country",
  vatLabel: "VAT",
  loading: "Loading...",
  neutralHostingNote:
    "CarrierTrust is a neutral hosting platform. Reviews are user-generated. We may remove content that violates our policies or applicable law.",
  verifiedBonus: "verified bonus",

  adSpace: "Ad space",
  bannerEmptyText: "Your banner can appear here",
  addBanner: "Add banner",
  orderBanner: "Order a banner",
  companyPageLabel: "Company Page",
  sideLabel: "Side",
  sideLeft: "left",
  sideRight: "right",
  sizeLabel: "Size",
  choosePeriod: "Choose a period:",
  companyName: "Company name",
  companyNamePlaceholder: "For example, EXPORTO LTD",
  invoiceEmail: "Invoice email",
  invoiceEmailPlaceholder: "invoice@company.com",
  uploadBanner: "Upload banner",
  chooseBannerFile: "Click to choose a file",
  recommendedSize: "Recommended size: 180×600px",
  paymentDetails: "Payment details",
  bankCompany: "Company",
  bankAccount: "Account number",
  bankBic: "BIC",
  amount: "Amount",
  paymentPurpose: "Payment purpose",
  paymentPurposeFallback: "Banner - Company Name",
  uploadPaymentProof: "Upload payment proof",
  uploadPaymentConfirmation: "Upload payment confirmation",
  paymentProofFormats: "PDF, PNG, JPG",
  bannerPreview: "Banner preview",
  bannerPreviewEmpty: "Your uploaded banner preview will appear here",
  havePaid: "I have paid",
  bannerSuccessMessage:
    "Banner request sent. The banner is now under moderation, invoice will be sent by email.",
  publishAfterModeration:
    "After payment verification and moderation, the banner will be published.",
  errorSending: "Error sending",
};

const TEXT: Record<Lang, TextPack> = {
  en: EN,
  de: {
    ...EN,
    back: "← Zur Startseite",
    trustScore: "Vertrauensscore",
    reviews: "Bewertungen",
    tabsReviews: "Bewertungen",
    tabsTimeline: "Zeitverlauf",
    tabsAbout: "Über das Unternehmen",
    noReviewsTitle: "Noch keine veröffentlichten Bewertungen",
    noReviewsText:
      "Für dieses Unternehmen gibt es derzeit keine veröffentlichten Bewertungen.",
    companyNotFound: "Unternehmen nicht gefunden.",
    by: "Von",
    report: "Melden",
    writeReview: "Bewertung schreiben",
    claimThisCompany: "Dieses Unternehmen beanspruchen",
    claimPending: "Anfrage läuft",
    claimApproved: "Offizielles Firmenkonto",
    verified: "Verifiziert",
    companyDashboard: "Unternehmens-Dashboard",
    underReviewTitle: "In Prüfung",
    underReviewText:
      "Diese Bewertung hat mehrere Meldungen oder Signale erhalten und wird derzeit geprüft. Sie bleibt sichtbar, sofern sie nicht gegen unsere Richtlinien verstößt.",
    companyReplyTitle: "Antwort des Unternehmens",
    official: "Offiziell",
    reportTitle: "Bewertung melden",
    reportHelp:
      "Bitte geben Sie Ihre geschäftliche E-Mail-Adresse und den Grund der Meldung an.",
    yourEmail: "Ihre geschäftliche E-Mail *",
    yourCompany: "Ihr Unternehmen (optional)",
    reason:
      "Grund * (illegale Inhalte, personenbezogene Daten, Drohungen, Spam usw.)",
    close: "Schließen",
    submitReport: "Meldung senden",
    sending: "Wird gesendet...",
    thanks: "Danke. Ihre Meldung wurde übermittelt.",
    fillEmailReason: "Bitte E-Mail und Grund ausfüllen.",
    invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    waitSpam:
      "Bitte warten Sie kurz, bevor Sie eine weitere Meldung senden.",
    businessEmailOnly:
      "Nur geschäftliche E-Mail-Adressen (keine kostenlosen E-Mail-Anbieter).",
    duplicateError:
      "Sie haben diese Bewertung vor Kurzem bereits gemeldet.",
    rateLimitedGeneric:
      "Zu viele Meldungen. Bitte warten Sie und versuchen Sie es erneut.",
    sendFailedGeneric:
      "Die Meldung konnte derzeit nicht gesendet werden. Bitte versuchen Sie es später erneut.",
    aboutTitle: "Über das Unternehmen",
    aboutText:
      "Unternehmensinformationen werden hier angezeigt (als Nächstes: Verifizierung + Profildetails).",
    timelineTitle: "Zeitverlauf",
    timelineText:
      "Die Chronologie wird hier angezeigt (als Nächstes: Signale, Antworten, Verifizierungsereignisse).",
    latestPublished: "Neueste veröffentlichte Bewertungen für dieses Unternehmen",
    trustBasedOnSignals: "Basierend auf Vertrauenssignalen",
    trustBasedOnReviews: "Basierend auf veröffentlichten Bewertungen",
    trustNoData: "Noch keine Vertrauensdaten",
    riskLabel: "Risiko",
    riskLow: "Niedrig",
    riskMedium: "Mittel",
    riskHigh: "Hoch",
    updatedLabel: "Aktualisiert",
    verifiedCompany: "Verifiziertes Unternehmen",
    verifiedCompanyHelp: "Identität geprüft (VAT / Domain / Admin).",
    verifiedLearnMore: "Was bedeutet verifiziert?",
    fraudScoreLabel: "Betrugswert",
    autoFlaggedLabel: "Automatisch markiert",
    countryLabel: "Land",
    vatLabel: "VAT",
    loading: "Lädt...",
    neutralHostingNote:
      "CarrierTrust ist eine neutrale Hosting-Plattform. Bewertungen werden von Nutzern erstellt. Wir können Inhalte entfernen, die gegen unsere Richtlinien oder geltendes Recht verstoßen.",
    verifiedBonus: "Verifizierungsbonus",
    adSpace: "Werbefläche",
    bannerEmptyText: "Ihr Banner kann hier erscheinen",
    addBanner: "Banner hinzufügen",
    orderBanner: "Banner bestellen",
    companyPageLabel: "Unternehmensseite",
    sideLabel: "Seite",
    sideLeft: "links",
    sideRight: "rechts",
    sizeLabel: "Größe",
    choosePeriod: "Zeitraum wählen:",
    companyName: "Firmenname",
    companyNamePlaceholder: "Zum Beispiel EXPORTO LTD",
    invoiceEmail: "Rechnungs-E-Mail",
    invoiceEmailPlaceholder: "invoice@company.com",
    uploadBanner: "Banner hochladen",
    chooseBannerFile: "Klicken, um eine Datei auszuwählen",
    recommendedSize: "Empfohlene Größe: 180×600px",
    paymentDetails: "Zahlungsdetails",
    bankCompany: "Firma",
    bankAccount: "Kontonummer",
    bankBic: "BIC",
    amount: "Betrag",
    paymentPurpose: "Verwendungszweck",
    paymentPurposeFallback: "Banner - Company Name",
    uploadPaymentProof: "Zahlungsnachweis hochladen",
    uploadPaymentConfirmation: "Zahlungsbestätigung hochladen",
    paymentProofFormats: "PDF, PNG, JPG",
    bannerPreview: "Banner-Vorschau",
    bannerPreviewEmpty: "Hier erscheint die Vorschau Ihres hochgeladenen Banners",
    havePaid: "Ich habe bezahlt",
    bannerSuccessMessage:
      "Banner-Anfrage gesendet. Das Banner befindet sich jetzt in der Moderation, die Rechnung wird per E-Mail gesendet.",
    publishAfterModeration:
      "Nach Zahlungsprüfung und Moderation wird das Banner veröffentlicht.",
    errorSending: "Fehler beim Senden",
  },
  ru: {
    ...EN,
    back: "← На главную",
    trustScore: "Индекс доверия",
    reviews: "Отзывы",
    tabsReviews: "Отзывы",
    tabsTimeline: "История",
    tabsAbout: "О компании",
    noReviewsTitle: "Пока нет опубликованных отзывов",
    noReviewsText:
      "На данный момент у этой компании нет опубликованных отзывов.",
    companyNotFound: "Компания не найдена.",
    by: "От",
    report: "Пожаловаться",
    writeReview: "Написать отзыв",
    claimThisCompany: "Заявить права на компанию",
    claimPending: "Заявка на проверке",
    claimApproved: "Официальный аккаунт компании",
    verified: "Проверено",
    companyDashboard: "Панель компании",
    underReviewTitle: "На проверке",
    underReviewText:
      "На этот отзыв поступили жалобы или сигналы, и сейчас он проверяется. Он остаётся видимым, если не нарушает правила платформы.",
    companyReplyTitle: "Ответ компании",
    official: "Официально",
    reportTitle: "Жалоба на отзыв",
    reportHelp: "Укажите ваш бизнес-email и причину жалобы.",
    yourEmail: "Ваш бизнес email *",
    yourCompany: "Ваша компания (необязательно)",
    reason:
      "Причина * (незаконный контент, персональные данные, угрозы, спам и т.д.)",
    close: "Закрыть",
    submitReport: "Отправить жалобу",
    sending: "Отправка...",
    thanks: "Спасибо! Жалоба отправлена.",
    fillEmailReason: "Заполните email и причину.",
    invalidEmail: "Введите корректный email.",
    waitSpam: "Подождите немного перед повторной отправкой.",
    businessEmailOnly:
      "Только бизнес-email (без бесплатных почтовых сервисов).",
    duplicateError:
      "Вы уже недавно отправляли жалобу на этот отзыв.",
    rateLimitedGeneric:
      "Слишком много жалоб. Подождите и попробуйте ещё раз.",
    sendFailedGeneric:
      "Не удалось отправить жалобу сейчас. Попробуйте позже.",
    aboutTitle: "О компании",
    aboutText:
      "Информация о компании появится здесь (дальше: верификация и детали профиля).",
    timelineTitle: "История",
    timelineText:
      "История событий появится здесь (дальше: сигналы, ответы, события верификации).",
    latestPublished: "Последние опубликованные отзывы о компании",
    trustBasedOnSignals: "На основе сигналов доверия",
    trustBasedOnReviews: "На основе опубликованных отзывов",
    trustNoData: "Пока нет данных доверия",
    riskLabel: "Риск",
    riskLow: "Низкий",
    riskMedium: "Средний",
    riskHigh: "Высокий",
    updatedLabel: "Обновлено",
    verifiedCompany: "Компания подтверждена",
    verifiedCompanyHelp:
      "Идентичность подтверждена (VAT / домен / админ-проверка).",
    verifiedLearnMore: "Что значит verified?",
    fraudScoreLabel: "Уровень риска",
    autoFlaggedLabel: "Автоматическая отметка системой",
    countryLabel: "Страна",
    vatLabel: "VAT",
    loading: "Загрузка...",
    neutralHostingNote:
      "CarrierTrust — нейтральная платформа. Отзывы публикуются пользователями. Мы можем удалить контент, нарушающий правила платформы или применимое законодательство.",
    verifiedBonus: "бонус за верификацию",
    adSpace: "Рекламное место",
    bannerEmptyText: "Ваш баннер может быть размещён здесь",
    addBanner: "Добавить баннер",
    orderBanner: "Заказать баннер",
    companyPageLabel: "Страница компании",
    sideLabel: "Сторона",
    sideLeft: "левая",
    sideRight: "правая",
    sizeLabel: "Размер",
    choosePeriod: "Выберите период:",
    companyName: "Название компании",
    companyNamePlaceholder: "Например, EXPORTO LTD",
    invoiceEmail: "Email для счёта",
    invoiceEmailPlaceholder: "invoice@company.com",
    uploadBanner: "Загрузить баннер",
    chooseBannerFile: "Нажмите, чтобы выбрать файл",
    recommendedSize: "Рекомендуемый размер: 180×600px",
    paymentDetails: "Реквизиты для оплаты",
    bankCompany: "Компания",
    bankAccount: "Номер счёта",
    bankBic: "BIC",
    amount: "Сумма",
    paymentPurpose: "Назначение платежа",
    paymentPurposeFallback: "Banner - Company Name",
    uploadPaymentProof: "Загрузить подтверждение оплаты",
    uploadPaymentConfirmation: "Загрузить подтверждение платежа",
    paymentProofFormats: "PDF, PNG, JPG",
    bannerPreview: "Предпросмотр баннера",
    bannerPreviewEmpty: "Здесь появится предпросмотр загруженного баннера",
    havePaid: "Я оплатил",
    bannerSuccessMessage:
      "Заявка на баннер отправлена. Баннер сейчас на модерации, счёт будет отправлен на email.",
    publishAfterModeration:
      "После проверки оплаты и модерации баннер будет опубликован.",
    errorSending: "Ошибка отправки",
  },
  fr: {
    ...EN,
    back: "← Retour à l’accueil",
    trustScore: "Score de confiance",
    reviews: "Avis",
    tabsReviews: "Avis",
    tabsTimeline: "Historique",
    tabsAbout: "À propos",
    noReviewsTitle: "Aucun avis publié pour le moment",
    noReviewsText:
      "Cette entreprise n’a actuellement aucun avis publié.",
    companyNotFound: "Entreprise introuvable.",
    by: "Par",
    report: "Signaler",
    writeReview: "Écrire un avis",
    claimThisCompany: "Revendiquer cette entreprise",
    claimPending: "Demande en attente",
    claimApproved: "Compte officiel de l’entreprise",
    verified: "Vérifié",
    companyDashboard: "Tableau de bord entreprise",
    underReviewTitle: "En cours d’examen",
    underReviewText:
      "Cet avis a reçu plusieurs signalements ou signaux et est actuellement en cours d’examen. Il reste visible sauf s’il viole nos politiques.",
    companyReplyTitle: "Réponse de l’entreprise",
    official: "Officiel",
    reportTitle: "Signaler un avis",
    reportHelp:
      "Veuillez indiquer votre email professionnel et la raison du signalement.",
    yourEmail: "Votre email professionnel *",
    yourCompany: "Votre entreprise (optionnel)",
    reason:
      "Raison * (contenu illégal, données personnelles, menaces, spam, etc.)",
    close: "Fermer",
    submitReport: "Envoyer le signalement",
    sending: "Envoi...",
    thanks: "Merci. Votre signalement a été envoyé.",
    fillEmailReason: "Veuillez remplir l’email et la raison.",
    invalidEmail: "Veuillez entrer une adresse email valide.",
    waitSpam:
      "Veuillez attendre un peu avant d’envoyer un autre signalement.",
    businessEmailOnly:
      "Email professionnel uniquement (pas de fournisseurs gratuits).",
    duplicateError:
      "Vous avez déjà signalé cet avis récemment.",
    rateLimitedGeneric:
      "Trop de signalements. Veuillez patienter et réessayer.",
    sendFailedGeneric:
      "Impossible d’envoyer le signalement pour le moment. Veuillez réessayer plus tard.",
    aboutTitle: "À propos",
    aboutText:
      "Les informations sur l’entreprise apparaîtront ici (prochaine étape : vérification + détails du profil).",
    timelineTitle: "Historique",
    timelineText:
      "L’historique apparaîtra ici (prochaine étape : signaux, réponses, événements de vérification).",
    latestPublished: "Derniers avis publiés pour cette entreprise",
    trustBasedOnSignals: "Basé sur des signaux de confiance",
    trustBasedOnReviews: "Basé sur les avis publiés",
    trustNoData: "Pas encore de données de confiance",
    riskLabel: "Risque",
    riskLow: "Faible",
    riskMedium: "Moyen",
    riskHigh: "Élevé",
    updatedLabel: "Mis à jour",
    verifiedCompany: "Entreprise vérifiée",
    verifiedCompanyHelp: "Identité vérifiée (VAT / domaine / contrôle admin).",
    verifiedLearnMore: "Que signifie vérifié ?",
    fraudScoreLabel: "Score fraude",
    autoFlaggedLabel: "Signalé automatiquement",
    countryLabel: "Pays",
    vatLabel: "TVA",
    loading: "Chargement...",
    neutralHostingNote:
      "CarrierTrust est une plateforme d’hébergement neutre. Les avis sont publiés par les utilisateurs. Nous pouvons supprimer les contenus qui violent nos politiques ou la loi applicable.",
    verifiedBonus: "bonus de vérification",
    adSpace: "Espace publicitaire",
    bannerEmptyText: "Votre bannière peut apparaître ici",
    addBanner: "Ajouter une bannière",
    orderBanner: "Commander une bannière",
    companyPageLabel: "Page entreprise",
    sideLabel: "Côté",
    sideLeft: "gauche",
    sideRight: "droite",
    sizeLabel: "Taille",
    choosePeriod: "Choisissez une période :",
    companyName: "Nom de l’entreprise",
    companyNamePlaceholder: "Par exemple, EXPORTO LTD",
    invoiceEmail: "E-mail de facturation",
    invoiceEmailPlaceholder: "invoice@company.com",
    uploadBanner: "Télécharger la bannière",
    chooseBannerFile: "Cliquez pour choisir un fichier",
    recommendedSize: "Taille recommandée : 180×600px",
    paymentDetails: "Détails du paiement",
    bankCompany: "Société",
    bankAccount: "Numéro de compte",
    bankBic: "BIC",
    amount: "Montant",
    paymentPurpose: "Objet du paiement",
    paymentPurposeFallback: "Banner - Company Name",
    uploadPaymentProof: "Télécharger la preuve de paiement",
    uploadPaymentConfirmation: "Télécharger la confirmation du paiement",
    paymentProofFormats: "PDF, PNG, JPG",
    bannerPreview: "Aperçu de la bannière",
    bannerPreviewEmpty: "L’aperçu de votre bannière téléchargée apparaîtra ici",
    havePaid: "J’ai payé",
    bannerSuccessMessage:
      "Demande de bannière envoyée. La bannière est maintenant en modération, la facture sera envoyée par e-mail.",
    publishAfterModeration:
      "Après vérification du paiement et modération, la bannière sera publiée.",
    errorSending: "Erreur d’envoi",
  },
  es: {
    ...EN,
    back: "← Volver al inicio",
    trustScore: "Puntuación de confianza",
    reviews: "Reseñas",
    tabsReviews: "Reseñas",
    tabsTimeline: "Cronología",
    tabsAbout: "Acerca de",
    noReviewsTitle: "Aún no hay reseñas publicadas",
    noReviewsText:
      "Esta empresa no tiene reseñas publicadas por el momento.",
    companyNotFound: "Empresa no encontrada.",
    by: "Por",
    report: "Reportar",
    writeReview: "Escribir reseña",
    claimThisCompany: "Reclamar esta empresa",
    claimPending: "Solicitud pendiente",
    claimApproved: "Cuenta oficial de la empresa",
    verified: "Verificado",
    companyDashboard: "Panel de empresa",
    underReviewTitle: "En revisión",
    underReviewText:
      "Esta reseña ha recibido múltiples reportes o señales y actualmente está en revisión. Permanece visible salvo que infrinja nuestras políticas.",
    companyReplyTitle: "Respuesta de la empresa",
    official: "Oficial",
    reportTitle: "Reportar reseña",
    reportHelp:
      "Por favor, indica tu correo empresarial y el motivo del reporte.",
    yourEmail: "Tu correo empresarial *",
    yourCompany: "Tu empresa (opcional)",
    reason:
      "Motivo * (contenido ilegal, datos personales, amenazas, spam, etc.)",
    close: "Cerrar",
    submitReport: "Enviar reporte",
    sending: "Enviando...",
    thanks: "Gracias. Tu reporte ha sido enviado.",
    fillEmailReason: "Completa el correo y el motivo.",
    invalidEmail: "Introduce una dirección de correo válida.",
    waitSpam: "Espera un poco antes de enviar otro reporte.",
    businessEmailOnly:
      "Solo correo empresarial (sin proveedores gratuitos).",
    duplicateError:
      "Ya has reportado esta reseña recientemente.",
    rateLimitedGeneric:
      "Demasiados reportes. Espera e inténtalo de nuevo.",
    sendFailedGeneric:
      "No se pudo enviar el reporte ahora. Inténtalo más tarde.",
    aboutTitle: "Acerca de",
    aboutText:
      "La información de la empresa aparecerá aquí (siguiente paso: verificación + detalles del perfil).",
    timelineTitle: "Cronología",
    timelineText:
      "La cronología aparecerá aquí (siguiente paso: señales, respuestas, eventos de verificación).",
    latestPublished: "Últimas reseñas publicadas de esta empresa",
    trustBasedOnSignals: "Basado en señales de confianza",
    trustBasedOnReviews: "Basado en reseñas publicadas",
    trustNoData: "Aún no hay datos de confianza",
    riskLabel: "Riesgo",
    riskLow: "Bajo",
    riskMedium: "Medio",
    riskHigh: "Alto",
    updatedLabel: "Actualizado",
    verifiedCompany: "Empresa verificada",
    verifiedCompanyHelp: "Identidad verificada (VAT / dominio / revisión admin).",
    verifiedLearnMore: "¿Qué significa verificado?",
    fraudScoreLabel: "Puntuación de fraude",
    autoFlaggedLabel: "Marcado automáticamente por el sistema",
    countryLabel: "País",
    vatLabel: "VAT",
    loading: "Cargando...",
    neutralHostingNote:
      "CarrierTrust es una plataforma de alojamiento neutral. Las reseñas son generadas por usuarios. Podemos eliminar contenido que infrinja nuestras políticas o la legislación aplicable.",
    verifiedBonus: "bonificación por verificación",
    adSpace: "Espacio publicitario",
    bannerEmptyText: "Tu banner puede aparecer aquí",
    addBanner: "Añadir banner",
    orderBanner: "Pedir un banner",
    companyPageLabel: "Página de empresa",
    sideLabel: "Lado",
    sideLeft: "izquierdo",
    sideRight: "derecho",
    sizeLabel: "Tamaño",
    choosePeriod: "Elige un período:",
    companyName: "Nombre de la empresa",
    companyNamePlaceholder: "Por ejemplo, EXPORTO LTD",
    invoiceEmail: "Email de factura",
    invoiceEmailPlaceholder: "invoice@company.com",
    uploadBanner: "Subir banner",
    chooseBannerFile: "Haz clic para elegir un archivo",
    recommendedSize: "Tamaño recomendado: 180×600px",
    paymentDetails: "Detalles de pago",
    bankCompany: "Empresa",
    bankAccount: "Número de cuenta",
    bankBic: "BIC",
    amount: "Importe",
    paymentPurpose: "Concepto de pago",
    paymentPurposeFallback: "Banner - Company Name",
    uploadPaymentProof: "Subir comprobante de pago",
    uploadPaymentConfirmation: "Subir confirmación de pago",
    paymentProofFormats: "PDF, PNG, JPG",
    bannerPreview: "Vista previa del banner",
    bannerPreviewEmpty: "La vista previa del banner subido aparecerá aquí",
    havePaid: "Ya he pagado",
    bannerSuccessMessage:
      "Solicitud de banner enviada. El banner está ahora en moderación; la factura será enviada por email.",
    publishAfterModeration:
      "Después de la verificación del pago y la moderación, el banner será publicado.",
    errorSending: "Error al enviar",
  },
  it: {
    ...EN,
    back: "← Torna alla home",
    trustScore: "Punteggio di fiducia",
    reviews: "Recensioni",
    tabsReviews: "Recensioni",
    tabsTimeline: "Cronologia",
    tabsAbout: "Informazioni",
    noReviewsTitle: "Nessuna recensione pubblicata al momento",
    noReviewsText:
      "Questa azienda al momento non ha recensioni pubblicate.",
    companyNotFound: "Azienda non trovata.",
    by: "Da",
    report: "Segnala",
    writeReview: "Scrivi una recensione",
    claimThisCompany: "Rivendica questa azienda",
    claimPending: "Richiesta in attesa",
    claimApproved: "Account ufficiale dell’azienda",
    verified: "Verificato",
    companyDashboard: "Dashboard aziendale",
    underReviewTitle: "In revisione",
    underReviewText:
      "Questa recensione ha ricevuto più segnalazioni o segnali ed è attualmente in revisione. Rimane visibile a meno che non violi le nostre policy.",
    companyReplyTitle: "Risposta dell’azienda",
    official: "Ufficiale",
    reportTitle: "Segnala recensione",
    reportHelp:
      "Inserisci la tua email aziendale e il motivo della segnalazione.",
    yourEmail: "La tua email aziendale *",
    yourCompany: "La tua azienda (opzionale)",
    reason:
      "Motivo * (contenuti illegali, dati personali, minacce, spam, ecc.)",
    close: "Chiudi",
    submitReport: "Invia segnalazione",
    sending: "Invio...",
    thanks: "Grazie. La tua segnalazione è stata inviata.",
    fillEmailReason: "Compila email e motivo.",
    invalidEmail: "Inserisci un indirizzo email valido.",
    waitSpam:
      "Attendi un momento prima di inviare un’altra segnalazione.",
    businessEmailOnly:
      "Solo email aziendale (nessun provider gratuito).",
    duplicateError:
      "Hai già segnalato questa recensione di recente.",
    rateLimitedGeneric:
      "Troppe segnalazioni. Attendi e riprova.",
    sendFailedGeneric:
      "Impossibile inviare la segnalazione adesso. Riprova più tardi.",
    aboutTitle: "Informazioni",
    aboutText:
      "Le informazioni sull’azienda appariranno qui (prossimo: verifica + dettagli profilo).",
    timelineTitle: "Cronologia",
    timelineText:
      "La cronologia apparirà qui (prossimo: segnali, risposte, eventi di verifica).",
    latestPublished: "Ultime recensioni pubblicate per questa azienda",
    trustBasedOnSignals: "Basato su segnali di fiducia",
    trustBasedOnReviews: "Basato sulle recensioni pubblicate",
    trustNoData: "Nessun dato di fiducia disponibile",
    riskLabel: "Rischio",
    riskLow: "Basso",
    riskMedium: "Medio",
    riskHigh: "Alto",
    updatedLabel: "Aggiornato",
    verifiedCompany: "Azienda verificata",
    verifiedCompanyHelp: "Identità verificata (VAT / dominio / controllo admin).",
    verifiedLearnMore: "Cosa significa verificato?",
    fraudScoreLabel: "Punteggio frode",
    autoFlaggedLabel: "Segnalato automaticamente dal sistema",
    countryLabel: "Paese",
    vatLabel: "VAT",
    loading: "Caricamento...",
    neutralHostingNote:
      "CarrierTrust è una piattaforma di hosting neutrale. Le recensioni sono generate dagli utenti. Possiamo rimuovere contenuti che violano le nostre policy o la legge applicabile.",
    verifiedBonus: "bonus verifica",
    adSpace: "Spazio pubblicitario",
    bannerEmptyText: "Il tuo banner può apparire qui",
    addBanner: "Aggiungi banner",
    orderBanner: "Ordina un banner",
    companyPageLabel: "Pagina azienda",
    sideLabel: "Lato",
    sideLeft: "sinistro",
    sideRight: "destro",
    sizeLabel: "Dimensione",
    choosePeriod: "Scegli un periodo:",
    companyName: "Nome azienda",
    companyNamePlaceholder: "Ad esempio, EXPORTO LTD",
    invoiceEmail: "Email fattura",
    invoiceEmailPlaceholder: "invoice@company.com",
    uploadBanner: "Carica banner",
    chooseBannerFile: "Clicca per scegliere un file",
    recommendedSize: "Dimensione consigliata: 180×600px",
    paymentDetails: "Dettagli di pagamento",
    bankCompany: "Società",
    bankAccount: "Numero di conto",
    bankBic: "BIC",
    amount: "Importo",
    paymentPurpose: "Causale",
    paymentPurposeFallback: "Banner - Company Name",
    uploadPaymentProof: "Carica prova di pagamento",
    uploadPaymentConfirmation: "Carica conferma pagamento",
    paymentProofFormats: "PDF, PNG, JPG",
    bannerPreview: "Anteprima banner",
    bannerPreviewEmpty: "L’anteprima del banner caricato apparirà qui",
    havePaid: "Ho pagato",
    bannerSuccessMessage:
      "Richiesta banner inviata. Il banner è ora in moderazione, la fattura sarà inviata via email.",
    publishAfterModeration:
      "Dopo la verifica del pagamento e la moderazione, il banner sarà pubblicato.",
    errorSending: "Errore di invio",
  },
};

type PricingPlan = {
  period: string;
  price: number;
  label: string;
};

type Company = {
  id: string;
  name: string | null;
  vat_uid: string | null;
  country: string | null;
  trust_score: number | null;
  trust_level: string | null;
  trust_updated_at: string | null;
  is_verified_company: boolean | null;
  verified_at: string | null;
  verification_method: string | null;
  fraud_score: number | null;
  risk_level: string | null;
  auto_flagged: boolean | null;
};

type ReviewReply = {
  id: string;
  reply_text: string | null;
  updated_at: string | null;
};

type Review = {
  id: string;
  created_at: string;
  rating: number | null;
  issue_type: string | null;
  review_text: string | null;
  status: string | null;
  author_email: string | null;
  author_company: string | null;
  author_company_vat: string | null;
  is_verified: boolean | null;
  verification_method: string | null;
  risk_score: number | null;
  is_flagged: boolean | null;
  review_replies?: ReviewReply[] | null;
};

type PublicReplyRow = {
  review_id: string;
  reply_text: string | null;
  updated_at: string | null;
};

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isBusinessEmail(email: string) {
  const domain = (email.split("@")[1] || "").toLowerCase();
  const blocked = [
    "gmail.com",
    "googlemail.com",
    "yahoo.com",
    "yahoo.co.uk",
    "outlook.com",
    "hotmail.com",
    "live.com",
    "icloud.com",
    "aol.com",
    "proton.me",
    "protonmail.com",
    "gmx.com",
    "mail.com",
    "yandex.ru",
    "yandex.com",
  ];
  return domain && !blocked.includes(domain);
}

function formatWaitMessage(
  lang: Lang,
  blockedUntilIso: string | null | undefined,
  t: TextPack
) {
  if (!blockedUntilIso) return t.rateLimitedGeneric;

  const ms = new Date(blockedUntilIso).getTime() - Date.now();
  if (!isFinite(ms) || ms <= 0) return t.rateLimitedGeneric;

  const minutes = Math.ceil(ms / 60000);
  if (minutes <= 1) {
    switch (lang) {
      case "ru":
        return "Подождите около 1 минуты и попробуйте снова.";
      case "de":
        return "Bitte warten Sie ca. 1 Minute und versuchen Sie es erneut.";
      case "fr":
        return "Veuillez attendre environ 1 minute et réessayer.";
      case "es":
        return "Espera aproximadamente 1 minuto e inténtalo de nuevo.";
      case "it":
        return "Attendi circa 1 minuto e riprova.";
      default:
        return "Please wait about 1 minute and try again.";
    }
  }

  if (minutes < 60) {
    switch (lang) {
      case "ru":
        return `Подождите ${minutes} мин и попробуйте снова.`;
      case "de":
        return `Bitte warten Sie ${minutes} Minuten und versuchen Sie es erneut.`;
      case "fr":
        return `Veuillez attendre ${minutes} minutes et réessayer.`;
      case "es":
        return `Espera ${minutes} minutos e inténtalo de nuevo.`;
      case "it":
        return `Attendi ${minutes} minuti e riprova.`;
      default:
        return `Please wait ${minutes} minutes and try again.`;
    }
  }

  const hours = Math.ceil(minutes / 60);
  switch (lang) {
    case "ru":
      return `Подождите примерно ${hours} ч и попробуйте снова.`;
    case "de":
      return `Bitte warten Sie etwa ${hours} Stunde(n) und versuchen Sie es erneut.`;
    case "fr":
      return `Veuillez attendre environ ${hours} heure(s) et réessayer.`;
    case "es":
      return `Espera aproximadamente ${hours} hora(s) e inténtalo de nuevo.`;
    case "it":
      return `Attendi circa ${hours} ora(e) e riprova.`;
    default:
      return `Please wait about ${hours} hour(s) and try again.`;
  }
}

function stars(n: number) {
  const full = Math.max(0, Math.min(5, n));
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
}

function BlueCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
        className="fill-sky-500/15"
      />
      <path
        d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z"
        className="stroke-sky-500/40"
        strokeWidth="1.25"
      />
      <path
        d="M8.35 12.25l2.2 2.2 5.1-5.1"
        className="stroke-sky-600"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VerifiedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
        className="fill-emerald-600/15"
      />
      <path
        d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z"
        className="stroke-emerald-600/35"
        strokeWidth="1.2"
      />
      <path
        d="M8.2 12.3l2.35 2.35L15.9 9.3"
        className="stroke-emerald-700"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RotatingBanner({ side, banners, onAddClick }: RotatingBannerProps) {
  const { lang } = useLang();
  const t = useMemo(() => TEXT[(lang as Lang) || "en"] ?? TEXT.en, [lang]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [banners]);

  const currentBanner = banners[currentIndex];

  return (
    <aside className="hidden xl:flex flex-col items-center sticky top-32 shrink-0">
      <div className="w-[180px]">
        <div className="relative h-[600px] w-[180px] overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/80 shadow-[0_18px_50px_rgba(15,23,42,0.10)] backdrop-blur">
          {currentBanner ? (
            <img
              src={currentBanner.image}
              alt={currentBanner.alt || `Banner ${side}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(241,245,249,0.96))] p-5 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 shadow-inner">
                <svg
                  className="h-8 w-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700">{t.adSpace}</p>
                <p className="mt-1 text-xs text-slate-400">180×600px</p>
                <p className="mt-3 text-xs leading-5 text-slate-500">
                  {t.bannerEmptyText}
                </p>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => onAddClick(side)}
          className="group mt-4 flex h-12 w-full items-center justify-center rounded-[1rem] border border-slate-200/80 bg-white text-sm font-semibold text-slate-800 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/70 hover:text-emerald-700"
        >
          <span className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors group-hover:bg-emerald-100 group-hover:text-emerald-600">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </span>
            {t.addBanner}
          </span>
        </button>
      </div>
    </aside>
  );
}

export default function CompanyPage() {
  const params = useParams();
  const companySlug = String(params?.id || "");
  const { lang } = useLang();
  const t = useMemo(() => TEXT[lang as Lang] ?? TEXT.en, [lang]);

  const [tab, setTab] = useState<TabKey>("reviews");

  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<Company | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const [claimStatus, setClaimStatus] = useState<
    "none" | "pending" | "approved" | "rejected"
  >("none");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const [reportOpen, setReportOpen] = useState(false);
  const [reportReviewId, setReportReviewId] = useState<string | null>(null);
  const [reporterEmail, setReporterEmail] = useState("");
  const [reporterCompany, setReporterCompany] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [website, setWebsite] = useState("");
  const [reportMsg, setReportMsg] = useState<string | null>(null);
  const [reportSending, setReportSending] = useState(false);
  const [lastReportAt, setLastReportAt] = useState<number>(0);

  const [leftBanners, setLeftBanners] = useState<BannerItem[]>([]);
  const [rightBanners, setRightBanners] = useState<BannerItem[]>([]);

  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [selectedBannerSide, setSelectedBannerSide] = useState<BannerSide | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [paymentProofName, setPaymentProofName] = useState<string | null>(null);
  const [bannerOrderCompanyName, setBannerOrderCompanyName] = useState("");
  const [bannerOrderInvoiceEmail, setBannerOrderInvoiceEmail] = useState("");
  const [bannerOrderSubmitting, setBannerOrderSubmitting] = useState(false);
  const [bannerOrderSuccess, setBannerOrderSuccess] = useState("");
  const [bannerOrderError, setBannerOrderError] = useState("");

  const pricing: PricingPlan[] = [
    { period: "week", price: 49, label: "1 week" },
    { period: "month", price: 149, label: "1 month" },
    { period: "year", price: 999, label: "1 year" },
  ];

  const translatedPricing: PricingPlan[] = useMemo(() => {
    return pricing.map((plan) => {
      let label = plan.label;

      if (plan.period === "week") {
        if (lang === "de") label = "1 Woche";
        else if (lang === "ru") label = "1 неделя";
        else if (lang === "fr") label = "1 semaine";
        else if (lang === "es") label = "1 semana";
        else if (lang === "it") label = "1 settimana";
      }

      if (plan.period === "month") {
        if (lang === "de") label = "1 Monat";
        else if (lang === "ru") label = "1 месяц";
        else if (lang === "fr") label = "1 mois";
        else if (lang === "es") label = "1 mes";
        else if (lang === "it") label = "1 mese";
      }

      if (plan.period === "year") {
        if (lang === "de") label = "1 Jahr";
        else if (lang === "ru") label = "1 год";
        else if (lang === "fr") label = "1 an";
        else if (lang === "es") label = "1 año";
        else if (lang === "it") label = "1 anno";
      }

      return { ...plan, label };
    });
  }, [lang]);

  const selectedPlanData = translatedPricing.find((p) => p.period === selectedPlan);

  const companyBankData = useMemo(
    () => ({
      companyName: 'SIA "JAKOVLEV CAPITAL"',
      accountNumber: "LV00HABA0000000000000",
      bic: "HABALV22",
    }),
    []
  );

  const bannerPaymentPurpose = bannerOrderCompanyName.trim()
    ? `Banner - ${bannerOrderCompanyName.trim()}`
    : t.paymentPurposeFallback;

  const canSubmitBannerOrder =
    !!selectedBannerSide &&
    !!selectedPlan &&
    !!bannerFile &&
    !!paymentProofFile &&
    !!bannerOrderCompanyName.trim() &&
    isValidEmail(bannerOrderInvoiceEmail);

  useEffect(() => {
    (async () => {
      try {
        setErr(null);
        setLoading(true);

        const { data: c, error: cErr } = await supabase
          .from("companies")
          .select(
            "id, name, vat_uid, country, trust_score, trust_level, trust_updated_at, is_verified_company, verified_at, verification_method, fraud_score, risk_level, auto_flagged"
          )
          .eq("slug", companySlug)
          .single();

        if (cErr) throw new Error(cErr.message);
        if (!c?.id) throw new Error("Company not found");

        setCompany(c as any);

        const realCompanyId = String(c.id);

        const { data: r, error: rErr } = await supabase
          .from("reviews")
          .select(
            "id, created_at, rating, issue_type, review_text, status, author_email, author_company, author_company_vat, is_verified, verification_method, risk_score, is_flagged"
          )
          .eq("company_id", realCompanyId)
          .eq("status", "published")
          .order("created_at", { ascending: false });

        if (rErr) throw new Error(rErr.message);

        const baseReviews: Review[] = (r || []).map((row: any) => ({
          ...row,
          review_replies: [],
        }));

        const ids = baseReviews.map((x) => x.id).filter(Boolean);

        if (ids.length > 0) {
          const res = await supabase.functions.invoke("company-replies", {
            method: "POST",
            body: { company_id: realCompanyId, review_ids: ids },
          });

          const data: any = (res as any)?.data;

          if (data?.ok && Array.isArray(data.replies)) {
            const byReviewId = new Map<string, PublicReplyRow>();
            for (const rr of data.replies as PublicReplyRow[]) {
              const rid = String((rr as any)?.review_id || "").trim();
              if (!rid) continue;
              byReviewId.set(rid, {
                review_id: rid,
                reply_text: (rr as any)?.reply_text ?? null,
                updated_at: (rr as any)?.updated_at ?? null,
              });
            }

            for (const br of baseReviews) {
              const match = byReviewId.get(br.id);
              if (
                match &&
                match.reply_text &&
                String(match.reply_text).trim().length > 0
              ) {
                br.review_replies = [
                  {
                    id: "public",
                    reply_text: match.reply_text,
                    updated_at: match.updated_at,
                  },
                ];
              }
            }
          }
        }

        setReviews(baseReviews);

        const { data: u } = await supabase.auth.getUser();
        const uid = u?.user?.id ?? null;
        setCurrentUserId(uid);

        if (uid) {
          const { data: claim, error: clErr } = await supabase
            .from("company_claims")
            .select("status")
            .eq("company_id", realCompanyId)
            .eq("claimant_user_id", uid)
            .order("created_at", { ascending: false })
            .limit(1);

          if (!clErr && claim && claim.length) {
            const st = String((claim[0] as any).status || "").toLowerCase();
            if (st === "approved") setClaimStatus("approved");
            else if (st === "pending") setClaimStatus("pending");
            else if (st === "rejected") setClaimStatus("rejected");
            else setClaimStatus("pending");
          } else {
            setClaimStatus("none");
          }
        } else {
          setClaimStatus("none");
        }
      } catch (e: any) {
        setErr(String(e?.message || e));
      } finally {
        setLoading(false);
      }
    })();
  }, [companySlug]);

  useEffect(() => {
    if (!companySlug || !company?.name) return;

    trackEvent({
      event_type: "company_view",
      company_id: company?.id || "",
      company_name: company.name || "",
      page_path: `/companies/${companySlug}`,
    });
  }, [companySlug, company?.id, company?.name]);

  useEffect(() => {
    async function loadCompanyBanners() {
      const now = new Date();

      const { data } = await supabase
        .from("banners")
        .select(
          "id, image_url, alt, placement, is_active, sort_order, expires_at, target_company_id"
        )
        .eq("is_active", true)
        .in("placement", ["company_left", "company_right"])
        .is("target_company_id", null)
        .order("sort_order", { ascending: true });

      const rows = (data || []).filter((item: any) => {
        if (!item.expires_at) return true;
        return new Date(item.expires_at) > now;
      });

      const left = rows
        .filter((item: any) => item.placement === "company_left")
        .map((item: any) => ({
          id: item.id,
          image: item.image_url,
          alt: item.alt || "Left banner",
        }));

      const right = rows
        .filter((item: any) => item.placement === "company_right")
        .map((item: any) => ({
          id: item.id,
          image: item.image_url,
          alt: item.alt || "Right banner",
        }));

      setLeftBanners(left);
      setRightBanners(right);
    }

    loadCompanyBanners();
  }, []);

  useEffect(() => {
    if (!bannerOrderSuccess || !isBannerModalOpen) return;

    const timer = setTimeout(() => {
      setIsBannerModalOpen(false);
      setBannerOrderSuccess("");
      setBannerOrderError("");
      setSelectedBannerSide(null);
      setSelectedPlan(null);
      setBannerFile(null);
      setBannerPreview(null);
      setPaymentProofFile(null);
      setPaymentProofName(null);
      setBannerOrderCompanyName("");
      setBannerOrderInvoiceEmail("");
    }, 2500);

    return () => clearTimeout(timer);
  }, [bannerOrderSuccess, isBannerModalOpen]);

  const avg = useMemo(() => {
    const vals = reviews
      .map((r) => r.rating)
      .filter((x): x is number => typeof x === "number");
    if (!vals.length) return null;
    const s = vals.reduce((a, b) => a + b, 0);
    return Math.round((s / vals.length) * 10) / 10;
  }, [reviews]);

  const reviewsCount = reviews.length;
  const isVerifiedCompany = Boolean(company?.is_verified_company);

  const trustScoreUI = useMemo(() => {
    const db = company?.trust_score;
    let base: number | null = null;

    if (typeof db === "number" && isFinite(db)) {
      base = Math.max(0, Math.min(100, Math.round(db)));
    } else if (avg !== null) {
      base = Math.max(0, Math.min(100, Math.round(((avg - 1) / 4) * 100)));
    } else {
      base = null;
    }

    if (base === null) return null;
    return isVerifiedCompany ? Math.min(100, base + 5) : base;
  }, [company?.trust_score, avg, isVerifiedCompany]);

  const trustScoreSourceLabel = useMemo(() => {
    const db = company?.trust_score;
    if (typeof db === "number" && isFinite(db)) return t.trustBasedOnSignals;
    if (avg === null) return t.trustNoData;
    return t.trustBasedOnReviews;
  }, [company?.trust_score, avg, t]);

  const riskLabel = useMemo(() => {
    const lvl = String(company?.risk_level || "").toLowerCase();
    if (lvl === "high") {
      return { text: t.riskHigh, cls: "bg-red-50 text-red-800 border-red-200" };
    }
    if (lvl === "medium") {
      return {
        text: t.riskMedium,
        cls: "bg-yellow-50 text-yellow-800 border-yellow-200",
      };
    }
    if (lvl === "low") {
      return {
        text: t.riskLow,
        cls: "bg-emerald-50 text-emerald-800 border-emerald-200",
      };
    }

    if (typeof trustScoreUI === "number") {
      if (trustScoreUI >= 75) {
        return {
          text: t.riskLow,
          cls: "bg-emerald-50 text-emerald-800 border-emerald-200",
        };
      }
      if (trustScoreUI >= 45) {
        return {
          text: t.riskMedium,
          cls: "bg-yellow-50 text-yellow-800 border-yellow-200",
        };
      }
      return { text: t.riskHigh, cls: "bg-red-50 text-red-800 border-red-200" };
    }
    return null;
  }, [company?.risk_level, trustScoreUI, t]);

  const trustBadge = useMemo(() => {
    if (trustScoreUI === null) {
      return { label: "—", cls: "bg-black/5 text-black/70 border-black/10" };
    }
    if (trustScoreUI >= 75) {
      return {
        label: `${trustScoreUI}`,
        cls: "bg-emerald-50 text-emerald-800 border-emerald-200",
      };
    }
    if (trustScoreUI >= 45) {
      return {
        label: `${trustScoreUI}`,
        cls: "bg-yellow-50 text-yellow-800 border-yellow-200",
      };
    }
    return {
      label: `${trustScoreUI}`,
      cls: "bg-red-50 text-red-800 border-red-200",
    };
  }, [trustScoreUI]);

  const companySchema = useMemo(() => {
    if (!company) return null;

    const pageUrl = `https://carriertrust.eu/companies/${companySlug}`;

    const schema: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${pageUrl}#organization`,
      name: company.name || "Company",
      url: pageUrl,
    };

    if (company.country) {
      schema.address = {
        "@type": "PostalAddress",
        addressCountry: company.country,
      };
    }

    if (company.vat_uid) {
      schema.identifier = [
        {
          "@type": "PropertyValue",
          name: "VAT",
          value: company.vat_uid,
        },
      ];
    }

    if (company.is_verified_company) {
      schema.award = ["Verified company"];
    }

    if (typeof trustScoreUI === "number") {
      schema.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: trustScoreUI,
        bestRating: 100,
        worstRating: 0,
        ratingCount: Math.max(reviewsCount || 0, 1),
      };
    }

    return schema;
  }, [company, companySlug, trustScoreUI, reviewsCount]);

  function openReport(reviewId: string) {
    setReportMsg(null);
    setReportReviewId(reviewId);
    setReportOpen(true);
  }

  function openBannerOrder(side: BannerSide) {
    setSelectedBannerSide(side);
    setSelectedPlan(null);
    setBannerFile(null);
    setBannerPreview(null);
    setPaymentProofFile(null);
    setPaymentProofName(null);
    setBannerOrderCompanyName("");
    setBannerOrderInvoiceEmail("");
    setBannerOrderSuccess("");
    setBannerOrderError("");
    setIsBannerModalOpen(true);
  }

  function closeBannerModal() {
    setIsBannerModalOpen(false);
    setBannerOrderSuccess("");
    setBannerOrderError("");
  }

  function handleBannerUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setBannerFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handlePaymentProofUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPaymentProofFile(file);
    setPaymentProofName(file.name);
  }

  async function handleSubmitBannerOrder() {
    if (
      !canSubmitBannerOrder ||
      !selectedPlanData ||
      !selectedBannerSide ||
      !bannerFile ||
      !paymentProofFile
    ) {
      return;
    }

    try {
      setBannerOrderSubmitting(true);
      setBannerOrderSuccess("");
      setBannerOrderError("");

      const placement =
        selectedBannerSide === "left" ? "company_left" : "company_right";

      const realCompanyId = company?.id || "";

      const body = new FormData();
      body.append("side", selectedBannerSide);
      body.append("placement", placement);
      body.append("period", selectedPlanData.period);
      body.append("periodLabel", selectedPlanData.label);
      body.append("price", String(selectedPlanData.price));
      body.append("companyName", bannerOrderCompanyName.trim());
      body.append("invoiceEmail", bannerOrderInvoiceEmail.trim());
      body.append("paymentPurpose", bannerPaymentPurpose);
      body.append("targetCompanyId", realCompanyId);
      body.append("target_company_id", realCompanyId);
      body.append("bannerFile", bannerFile, bannerFile.name);
      body.append("paymentProof", paymentProofFile, paymentProofFile.name);

      const response = await fetch("/api/banner-order", {
        method: "POST",
        body,
      });

      const text = await response.text();

      let result: any = null;
      try {
        result = JSON.parse(text);
      } catch {
        result = null;
      }

      if (!response.ok) {
        throw new Error(result?.error || text || t.errorSending);
      }

      setBannerOrderSuccess(t.bannerSuccessMessage);
    } catch (error) {
      setBannerOrderError(
        error instanceof Error ? error.message : t.errorSending
      );
    } finally {
      setBannerOrderSubmitting(false);
    }
  }

  async function submitReport() {
    if (!reportReviewId) return;

    const now = Date.now();
    if (lastReportAt && now - lastReportAt < 30_000) {
      setReportMsg(t.waitSpam);
      return;
    }

    const email = reporterEmail.trim().toLowerCase();
    const comp = reporterCompany.trim().toUpperCase();
    const reason = reportReason.trim();

    if (!email || !reason) return setReportMsg(t.fillEmailReason);
    if (!isValidEmail(email)) return setReportMsg(t.invalidEmail);
    if (!isBusinessEmail(email)) return setReportMsg(t.businessEmailOnly);

    setReportSending(true);
    setReportMsg(null);

    const page_url =
      typeof window !== "undefined"
        ? window.location.href
        : `https://carriertrust.eu/companies/${companySlug}`;

    try {
      const res = await supabase.functions.invoke("submit-report", {
        body: {
          website,
          review_id: reportReviewId,
          company_id: company?.id || "",
          company_name: company?.name || "",
          company_vat: company?.vat_uid || "",
          page_url,
          reporter_email: email,
          reporter_company: comp || "",
          reason,
          details: "",
        },
      });

      const data: any = (res as any)?.data;

      if (!data?.ok) {
        const code = data?.code;
        const blockedUntil = data?.blocked_until || null;

        if (code === 409) return setReportMsg(t.duplicateError);
        if (code === 429) {
          return setReportMsg(formatWaitMessage(lang as Lang, blockedUntil, t));
        }

        return setReportMsg(String(data?.message || t.sendFailedGeneric));
      }

      setLastReportAt(Date.now());
      setReportMsg(t.thanks);
      setReporterEmail("");
      setReporterCompany("");
      setReportReason("");
      setWebsite("");

      setTimeout(() => {
        setReportOpen(false);
        setReportReviewId(null);
        setReportMsg(null);
      }, 900);
    } catch (e: any) {
      setReportMsg(String(e?.message || t.sendFailedGeneric));
    } finally {
      setReportSending(false);
    }
  }

  const hero =
    "rounded-[2rem] border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_25px_80px_rgba(15,23,42,0.08)]";
  const card =
    "rounded-[1.75rem] border border-slate-200/70 bg-white/75 backdrop-blur-xl shadow-sm";
  const input =
    "w-full rounded-2xl border border-slate-200 bg-white/85 backdrop-blur px-4 py-3 outline-none text-slate-900 placeholder:text-slate-400 focus:border-slate-300 shadow-sm";
  const primaryBtn =
    "inline-flex w-full sm:w-auto items-center justify-center rounded-2xl px-4 py-3 bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition shadow-lg shadow-slate-900/15";
  const ghostBtn =
    "inline-flex w-full sm:w-auto items-center justify-center rounded-2xl px-4 py-3 border border-slate-200 bg-white/80 text-sm font-semibold text-slate-700 hover:bg-white transition";
  const disabledBtn =
    "inline-flex w-full sm:w-auto items-center justify-center rounded-2xl px-4 py-3 border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-400 cursor-default";

  const pill =
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold";
  const verifiedReviewPill = "bg-emerald-50 text-emerald-800 border-emerald-200";
  const warnBox =
    "rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-orange-900";
  const replyBox = "rounded-2xl border border-slate-200 bg-slate-50/80 p-4";
  const verifiedCompanyPill =
    "border-emerald-200 bg-gradient-to-b from-emerald-50 to-emerald-100 text-emerald-950 shadow-[0_10px_30px_rgba(16,185,129,0.14)]";
  const reportBtn =
    "self-start text-xs font-medium text-slate-400 hover:text-slate-600 transition select-none no-underline decoration-transparent";
  const tabWrap =
    "mt-6 flex items-center gap-6 border-b border-slate-200 overflow-x-auto whitespace-nowrap";
  const tabBtn = "pb-3 text-sm font-semibold transition";
  const tabOn = "text-slate-900 border-b-2 border-slate-900";
  const tabOff = "text-slate-500 hover:text-slate-900";

  function authorLabel(r: Review) {
    const name = (r.author_company || "").trim();
    if (name) return name;
    const email = (r.author_email || "").trim();
    if (email) return email;
    return "—";
  }

  const claimNext = `/claim-company?company_id=${encodeURIComponent(company?.id || "")}`;
  const claimHref = currentUserId
    ? claimNext
    : `/auth?next=${encodeURIComponent(claimNext)}`;

  const writeHref = `/write-review?company_id=${encodeURIComponent(company?.id || "")}`;

  const fraudScore =
    typeof company?.fraud_score === "number" ? company.fraud_score : 0;
  const autoFlagged = Boolean(company?.auto_flagged);

  if (loading) {
    return (
      <main className="min-h-screen text-slate-900">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-slate-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.14),transparent)]" />
          <div className="absolute top-[8%] left-[8%] h-[24rem] w-[24rem] rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="absolute bottom-[8%] right-[10%] h-[20rem] w-[20rem] rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,rgba(15,23,42,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.55)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative px-6 pt-36 md:pt-40 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-black/70">{t.loading}</div>
          </div>
        </div>
      </main>
    );
  }

  if (err) {
    return (
      <main className="min-h-screen text-black">
        <div className="relative px-6 pt-28 md:pt-32 pb-16">
          <div className="max-w-3xl mx-auto">
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-3 text-red-800">
              {err}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!company) {
    return (
      <main className="min-h-screen text-black">
        <div className="relative px-6 pt-28 md:pt-32 pb-16">
          <div className="max-w-3xl mx-auto">
            <div className="mt-6 text-black/70">{t.companyNotFound}</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-black">
      {companySchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(companySchema),
          }}
        />
      ) : null}

      <div className="relative px-6 pb-16 pt-44 md:pt-48">
        <div className="mx-auto flex max-w-[1520px] items-start gap-10 xl:gap-20">
          <RotatingBanner
            side="left"
            banners={leftBanners}
            onAddClick={openBannerOrder}
          />

          <div className="mx-auto min-w-0 max-w-4xl flex-1">
            <div className={`relative overflow-hidden p-6 md:p-8 ${hero}`}>
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl" />
                <div className="absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-cyan-200/30 blur-3xl" />
              </div>

              <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row">
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-start gap-3">
                    <h1 className="break-words text-2xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                      {company?.name || "Company"}
                    </h1>

                    {isVerifiedCompany ? (
                      <span
                        className="mt-[6px] inline-flex items-center"
                        title={t.verifiedCompanyHelp}
                        aria-label={t.verifiedCompany}
                      >
                        <BlueCheck className="h-6 w-6" />
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2.5 text-sm">
                    <span className={`${pill} border-black/10 bg-white/70 text-black/70`}>
                      {t.vatLabel}:{" "}
                      <span className="ml-1 font-bold text-black">
                        {(company?.vat_uid || "—").toUpperCase()}
                      </span>
                    </span>

                    {company?.country ? (
                      <span className={`${pill} border-black/10 bg-white/70 text-black/70`}>
                        {t.countryLabel}:{" "}
                        <span className="ml-1 font-bold text-black">
                          {company.country}
                        </span>
                      </span>
                    ) : null}

                    {isVerifiedCompany ? (
                      <span className="inline-flex items-center gap-3">
                        <span
                          className={`${pill} ${verifiedCompanyPill} px-3 py-1.5`}
                          title={t.verifiedCompanyHelp}
                        >
                          <span className="inline-flex items-center gap-2">
                            <VerifiedIcon className="h-4 w-4" />
                            <span className="font-extrabold tracking-tight">
                              {t.verifiedCompany}
                            </span>
                            {company.verified_at ? (
                              <span className="ml-1 text-[11px] font-semibold text-emerald-900/70">
                                {formatDate(company.verified_at)}
                              </span>
                            ) : null}
                          </span>
                        </span>

                        <Link
                          href="/verification"
                          className="text-xs font-semibold text-black/50 underline decoration-black/15 transition hover:text-black hover:decoration-black/40"
                        >
                          {t.verifiedLearnMore}
                        </Link>
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <Link href={writeHref} className={primaryBtn}>
                      {t.writeReview}
                    </Link>

                    {claimStatus === "approved" ? (
                      <Link href="/company/profile" className={ghostBtn}>
                        {t.companyDashboard}
                      </Link>
                    ) : claimStatus === "pending" ? (
                      <span className={disabledBtn}>{t.claimPending}</span>
                    ) : (
                      <Link href={claimHref} className={ghostBtn}>
                        {t.claimThisCompany}
                      </Link>
                    )}

                    <div className="text-sm text-slate-500 sm:ml-1">
                      {avg !== null ? (
                        <span>
                          <span className="font-semibold text-black">{avg}</span>/5 •{" "}
                          <span className="font-semibold text-black">
                            {reviewsCount}
                          </span>{" "}
                          {t.reviews.toLowerCase()}
                        </span>
                      ) : (
                        <span>
                          <span className="font-semibold text-black">
                            {reviewsCount}
                          </span>{" "}
                          {t.reviews.toLowerCase()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={tabWrap}>
                    <button
                      onClick={() => setTab("reviews")}
                      className={`${tabBtn} ${tab === "reviews" ? tabOn : tabOff}`}
                    >
                      {t.tabsReviews}
                    </button>
                    <button
                      onClick={() => setTab("timeline")}
                      className={`${tabBtn} ${tab === "timeline" ? tabOn : tabOff}`}
                    >
                      {t.tabsTimeline}
                    </button>
                    <button
                      onClick={() => setTab("about")}
                      className={`${tabBtn} ${tab === "about" ? tabOn : tabOff}`}
                    >
                      {t.tabsAbout}
                    </button>
                  </div>
                </div>

                <div className="shrink-0">
                  <div className="w-full rounded-[1.75rem] border border-slate-200/70 bg-white/80 px-5 py-5 shadow-sm backdrop-blur-xl lg:w-[280px]">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-black/55">{t.trustScore}</div>

                      {riskLabel ? (
                        <div
                          className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${riskLabel.cls}`}
                        >
                          {t.riskLabel}: {riskLabel.text}
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div
                        className={`rounded-2xl border px-3 py-1.5 text-sm font-semibold ${trustBadge.cls}`}
                      >
                        {trustBadge.label}
                        <span className="ml-1 text-[11px] font-semibold opacity-70">
                          /100
                        </span>
                      </div>
                      <div className="text-xs text-black/55">
                        {reviewsCount} {t.reviews.toLowerCase()}
                      </div>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/5">
                      <div
                        className="h-full bg-black/60"
                        style={{
                          width: `${
                            trustScoreUI === null
                              ? 0
                              : Math.max(8, Math.min(100, trustScoreUI))
                          }%`,
                        }}
                      />
                    </div>

                    <div className="mt-2 text-[11px] text-black/45">
                      {trustScoreSourceLabel}
                      {isVerifiedCompany ? (
                        <span className="ml-1 text-black/50">
                          • +5 {t.verifiedBonus}
                        </span>
                      ) : null}
                    </div>

                    {company.trust_updated_at ? (
                      <div className="mt-2 text-[11px] text-black/35">
                        {t.updatedLabel}: {formatDate(company.trust_updated_at)}
                      </div>
                    ) : null}

                    <div className="mt-4 rounded-2xl border border-black/10 bg-white/60 px-3 py-2">
                      <div className="flex items-center justify-between">
                        <div className="text-[11px] font-semibold text-black/55">
                          {t.fraudScoreLabel}
                        </div>
                        <div className="text-[11px] font-extrabold text-black">
                          {fraudScore}
                        </div>
                      </div>
                      {autoFlagged ? (
                        <div className="mt-1 text-[11px] text-red-700">
                          {t.autoFlaggedLabel}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {tab === "reviews" && (
              <>
                <div className="mt-8">
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">
                    {t.reviews}
                  </h2>
                  <div className="mt-1 text-sm text-slate-500">
                    {t.latestPublished}
                  </div>
                </div>

                {reviews.length === 0 ? (
                  <div className={`mt-4 p-6 ${card}`}>
                    <h3 className="text-lg font-bold">{t.noReviewsTitle}</h3>
                    <p className="mt-2 text-sm text-black/65">
                      {t.noReviewsText}
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 space-y-4">
                    {reviews.map((r) => {
                      const risk = Number(r.risk_score ?? 0);
                      const flagged = Boolean(r.is_flagged) || risk >= 3;

                      const reply =
                        r.review_replies && r.review_replies.length > 0
                          ? r.review_replies[0]
                          : null;

                      const hasReply = Boolean(
                        reply?.reply_text && String(reply.reply_text).trim().length > 0
                      );

                      return (
                        <div key={r.id} className={`p-5 md:p-6 ${card}`}>
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <div className="text-[20px] leading-none text-black">
                                  {stars(r.rating || 0)}
                                </div>

                                {r.is_verified ? (
                                  <span className={`${pill} ${verifiedReviewPill}`}>
                                    {t.verified}
                                    {r.verification_method ? (
                                      <span className="ml-2 text-[11px] font-semibold text-emerald-700/80">
                                        {String(r.verification_method)}
                                      </span>
                                    ) : null}
                                  </span>
                                ) : null}
                              </div>

                              <div className="mt-2 text-sm text-slate-600">
                                {t.by}{" "}
                                <span className="font-semibold text-black">
                                  {authorLabel(r)}
                                </span>
                                {r.author_company_vat ? (
                                  <span className="ml-2 text-xs text-black/45">
                                    ({String(r.author_company_vat).toUpperCase()})
                                  </span>
                                ) : null}
                              </div>

                              <div className="mt-1 text-xs text-slate-500">
                                {new Date(r.created_at).toLocaleDateString()}
                                {r.issue_type ? ` • ${r.issue_type}` : ""}
                                {risk > 0 ? ` • risk ${risk}` : ""}
                              </div>
                            </div>

                            <button
                              onClick={() => openReport(r.id)}
                              className={reportBtn}
                              title={t.report}
                            >
                              {t.report}
                            </button>
                          </div>

                          {flagged ? (
                            <div className="mt-4">
                              <div className={warnBox}>
                                <div className="text-sm font-bold">
                                  {t.underReviewTitle}
                                </div>
                                <div className="mt-1 text-sm opacity-90">
                                  {t.underReviewText}
                                </div>
                              </div>
                            </div>
                          ) : null}

                          <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                            {r.review_text || ""}
                          </div>

                          {hasReply ? (
                            <div className={`mt-4 ${replyBox}`}>
                              <div className="flex items-center justify-between gap-3">
                                <div className="text-xs font-semibold text-black/70">
                                  {t.companyReplyTitle}{" "}
                                  <span className="ml-2 rounded-full border border-black/10 bg-white/70 px-2 py-0.5 text-[11px] text-black/60">
                                    {t.official}
                                  </span>
                                </div>
                                {reply?.updated_at ? (
                                  <div className="text-xs text-black/45">
                                    {new Date(reply.updated_at).toLocaleDateString()}
                                  </div>
                                ) : null}
                              </div>

                              <div className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                                {String(reply?.reply_text || "")}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-10 text-xs leading-6 text-slate-500">
                  {t.neutralHostingNote}
                </div>
              </>
            )}

            {tab === "timeline" && (
              <div className={`mt-8 p-6 ${card}`}>
                <h2 className="text-lg font-bold">{t.timelineTitle}</h2>
                <p className="mt-2 text-sm text-black/65">{t.timelineText}</p>
              </div>
            )}

            {tab === "about" && (
              <div className={`mt-8 p-6 ${card}`}>
                <h2 className="text-lg font-bold">{t.aboutTitle}</h2>
                <p className="mt-2 text-sm text-black/65">{t.aboutText}</p>
              </div>
            )}
          </div>

          <RotatingBanner
            side="right"
            banners={rightBanners}
            onAddClick={openBannerOrder}
          />
        </div>

        {reportOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 px-4">
            <div className={`w-full max-w-lg p-5 ${hero}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">{t.reportTitle}</h2>
                  <p className="mt-1 text-sm text-black/60">{t.reportHelp}</p>
                </div>

                <button
                  onClick={() => {
                    setReportOpen(false);
                    setReportReviewId(null);
                    setReportMsg(null);
                  }}
                  className="rounded-2xl border border-black/10 bg-white/70 px-3 py-2 text-sm font-semibold transition hover:bg-white"
                >
                  {t.close}
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  name="website"
                  type="text"
                  autoComplete="off"
                  tabIndex={-1}
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    height: 0,
                    width: 0,
                    opacity: 0,
                  }}
                />

                <input
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  placeholder={t.yourEmail}
                  className={input}
                />

                <input
                  value={reporterCompany}
                  onChange={(e) => setReporterCompany(e.target.value.toUpperCase())}
                  placeholder={t.yourCompany}
                  className={`${input} uppercase`}
                />

                <textarea
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder={t.reason}
                  rows={5}
                  className={input}
                />

                {reportMsg && (
                  <div className="rounded-2xl border border-black/10 bg-white/70 p-3 text-sm text-black/80">
                    {reportMsg}
                  </div>
                )}

                <button
                  onClick={submitReport}
                  disabled={reportSending}
                  className="w-full rounded-2xl bg-black px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-black/90 disabled:opacity-60"
                >
                  {reportSending ? t.sending : t.submitReport}
                </button>
              </div>
            </div>
          </div>
        )}

        {isBannerModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl rounded-[2rem] border border-white/50 bg-white/92 shadow-[0_40px_120px_rgba(15,23,42,0.25)]">
              <button
                onClick={closeBannerModal}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200"
              >
                <svg
                  className="h-5 w-5 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="p-4 md:p-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
                  <svg
                    className="h-5 w-5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </div>

                <h2 className="text-[18px] font-bold text-slate-900">{t.orderBanner}</h2>
                <p className="mt-1 text-[13px] text-slate-500">
                  {t.companyPageLabel} • {t.sideLabel}:{" "}
                  {selectedBannerSide === "left" ? t.sideLeft : t.sideRight} • {t.sizeLabel} 180×600px
                </p>

                <div className="mt-3 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_220px]">
                  <div>
                    <div className="space-y-1">
                      <p className="text-[13px] font-semibold text-slate-700">
                        {t.choosePeriod}
                      </p>

                      {translatedPricing.map((plan) => (
                        <label
                          key={plan.period}
                          className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 px-3 py-2 transition-all ${
                            selectedPlan === plan.period
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-slate-200 hover:border-emerald-200"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="company-banner-plan"
                              value={plan.period}
                              checked={selectedPlan === plan.period}
                              onChange={(e) => setSelectedPlan(e.target.value)}
                              className="h-4 w-4 text-emerald-600"
                            />
                            <span className="text-[15px] font-medium text-slate-700">
                              {plan.label}
                            </span>
                          </div>

                          <span className="text-[16px] font-bold text-slate-900">
                            €{plan.price}
                          </span>
                        </label>
                      ))}
                    </div>

                    <div className="mt-2.5 grid gap-2">
                      <div>
                        <label className="mb-1 block text-[13px] font-semibold text-slate-700">
                          {t.companyName}
                        </label>
                        <input
                          value={bannerOrderCompanyName}
                          onChange={(e) => setBannerOrderCompanyName(e.target.value)}
                          className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none transition-colors focus:border-emerald-400"
                          placeholder={t.companyNamePlaceholder}
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-[13px] font-semibold text-slate-700">
                          {t.invoiceEmail}
                        </label>

                        <input
                          type="email"
                          value={bannerOrderInvoiceEmail}
                          onChange={(e) => setBannerOrderInvoiceEmail(e.target.value)}
                          className={`h-9 w-full rounded-xl border px-3 outline-none transition-colors ${
                            bannerOrderInvoiceEmail.length === 0
                              ? "border-slate-200 focus:border-emerald-400"
                              : isValidEmail(bannerOrderInvoiceEmail)
                              ? "border-emerald-300 focus:border-emerald-500"
                              : "border-red-300 focus:border-red-500"
                          }`}
                          placeholder={t.invoiceEmailPlaceholder}
                        />

                        {bannerOrderInvoiceEmail.length > 0 &&
                          !isValidEmail(bannerOrderInvoiceEmail) && (
                            <p className="mt-1 text-xs text-red-500">
                              {t.invalidEmail}
                            </p>
                          )}
                      </div>

                      <div>
                        <label className="mb-1 block text-[13px] font-semibold text-slate-700">
                          {t.uploadBanner}
                        </label>
                        <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-2.5 text-center transition-colors hover:border-emerald-300">
                          <p className="text-sm font-medium leading-tight text-slate-700">
                            {t.chooseBannerFile}
                          </p>
                          <p className="mt-0.5 text-xs leading-tight text-slate-400">
                            {t.recommendedSize}
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleBannerUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {selectedPlanData && (
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-2.5">
                          <p className="mb-1.5 text-[13px] font-semibold text-emerald-900">
                            {t.paymentDetails}
                          </p>

                          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[13px] text-slate-700">
                            <p className="col-span-2">
                              <span className="font-semibold">{t.bankCompany}:</span>{" "}
                              {companyBankData.companyName}
                            </p>
                            <p className="col-span-2">
                              <span className="font-semibold">{t.bankAccount}:</span>{" "}
                              {companyBankData.accountNumber}
                            </p>
                            <p>
                              <span className="font-semibold">{t.bankBic}:</span> {companyBankData.bic}
                            </p>
                            <p>
                              <span className="font-semibold">{t.amount}:</span> €{selectedPlanData.price} + VAT (EU 0%, LV 21%)
                            </p>
                            <p className="col-span-2">
                              <span className="font-semibold">{t.paymentPurpose}:</span>{" "}
                              {bannerPaymentPurpose}
                            </p>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="mb-1 block text-[13px] font-semibold text-slate-700">
                          {t.uploadPaymentProof}
                        </label>
                        <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-2.5 text-center transition-colors hover:border-emerald-300">
                          <p className="text-sm font-medium leading-tight text-slate-700">
                            {t.uploadPaymentConfirmation}
                          </p>
                          <p className="mt-0.5 text-xs leading-tight text-slate-400">
                            {t.paymentProofFormats}
                          </p>
                          <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={handlePaymentProofUpload}
                            className="hidden"
                          />
                        </label>

                        {paymentProofName && (
                          <p className="mt-1 text-xs font-medium text-emerald-600">
                            ✓ {paymentProofName}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-1 text-[13px] font-semibold text-slate-700">
                      {t.bannerPreview}
                    </p>

                    <div className="h-[600px] w-[180px] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 shadow-sm">
                      {bannerPreview ? (
                        <img
                          src={bannerPreview}
                          alt={t.bannerPreview}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center p-4 text-center text-sm leading-8 text-slate-400">
                          {t.bannerPreviewEmpty}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <button
                    disabled={!canSubmitBannerOrder || bannerOrderSubmitting}
                    onClick={handleSubmitBannerOrder}
                    className={`flex h-12 w-full items-center justify-center rounded-2xl text-base font-semibold transition-all ${
                      canSubmitBannerOrder && !bannerOrderSubmitting
                        ? "bg-slate-900 text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] hover:-translate-y-0.5 hover:bg-slate-800"
                        : "cursor-not-allowed bg-slate-100 text-slate-400"
                    }`}
                  >
                    {bannerOrderSubmitting ? t.sending : t.havePaid}
                  </button>

                  {bannerOrderSuccess && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">
                      {bannerOrderSuccess}
                    </div>
                  )}

                  {bannerOrderError && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
                      {bannerOrderError}
                    </div>
                  )}
                </div>

                <p className="mt-1.5 text-center text-xs text-slate-400">
                  {t.publishAfterModeration}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}