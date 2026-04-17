"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLang } from "@/lib/language-context";

type Lang = "en" | "de" | "ru" | "fr" | "es" | "it";
type RiskTab = "high" | "medium" | "low";
type BannerSide = "left" | "right";

type CompanyRow = {
  id: string;
  name: string | null;
  vat_uid: string | null;
  country: string | null;
  trust_score: number | null;
  fraud_score: number | null;
  risk_level: string | null;
  auto_flagged: boolean | null;
  trust_updated_at?: string | null;
};

type PricingPlan = {
  period: string;
  price: number;
  label: string;
};

type BannerItem = {
  id: string;
  image: string;
  alt?: string;
};

type RotatingBannerProps = {
  side: BannerSide;
  banners: BannerItem[];
  onAddClick: (side: BannerSide) => void;
  t: TextPack;
};

type BannerOrderForm = {
  companyName: string;
  invoiceEmail: string;
};

type TextPack = {
  adSpace: string;
  bannerEmptyText: string;
  addBanner: string;

  orderBanner: string;
  searchPageLabel: string;
  sideLabel: string;
  sideLeft: string;
  sideRight: string;
  sizeLabel: string;

  choosePeriod: string;
  companyName: string;
  companyNamePlaceholder: string;
  invoiceEmail: string;
  invoiceEmailPlaceholder: string;
  invalidEmail: string;

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
  sending: string;
  successMessage: string;
  publishAfterModeration: string;

  errorSending: string;
};

const EN: TextPack = {
  adSpace: "Ad space",
  bannerEmptyText: "Your banner can appear here",
  addBanner: "Add banner",

  orderBanner: "Order a banner",
  searchPageLabel: "Risk Index Page",
  sideLabel: "Side",
  sideLeft: "left",
  sideRight: "right",
  sizeLabel: "Size",

  choosePeriod: "Choose a period:",
  companyName: "Company name",
  companyNamePlaceholder: "For example, EXPORTO LTD",
  invoiceEmail: "Invoice email",
  invoiceEmailPlaceholder: "invoice@company.com",
  invalidEmail: "Please enter a valid email",

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
  sending: "Sending...",
  successMessage:
    "Banner request sent. The banner is now under moderation, invoice will be sent by email.",
  publishAfterModeration:
    "After payment verification and moderation, the banner will be published.",

  errorSending: "Error sending",
};

const TEXT: Record<Lang, TextPack> = {
  en: EN,
  de: {
    ...EN,
    adSpace: "Werbefläche",
    bannerEmptyText: "Ihr Banner kann hier erscheinen",
    addBanner: "Banner hinzufügen",
    orderBanner: "Banner bestellen",
    searchPageLabel: "Risk-Index-Seite",
    sideLabel: "Seite",
    sideLeft: "links",
    sideRight: "rechts",
    sizeLabel: "Größe",
    choosePeriod: "Zeitraum wählen:",
    companyName: "Firmenname",
    companyNamePlaceholder: "Zum Beispiel EXPORTO LTD",
    invoiceEmail: "Rechnungs-E-Mail",
    invoiceEmailPlaceholder: "invoice@company.com",
    invalidEmail: "Bitte geben Sie eine gültige E-Mail ein",
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
    sending: "Wird gesendet...",
    successMessage:
      "Banner-Anfrage gesendet. Das Banner befindet sich jetzt in der Moderation, die Rechnung wird per E-Mail gesendet.",
    publishAfterModeration:
      "Nach Zahlungsprüfung und Moderation wird das Banner veröffentlicht.",
    errorSending: "Fehler beim Senden",
  },
  ru: {
    ...EN,
    adSpace: "Рекламное место",
    bannerEmptyText: "Ваш баннер может быть размещён здесь",
    addBanner: "Добавить баннер",
    orderBanner: "Заказать баннер",
    searchPageLabel: "Страница Risk Index",
    sideLabel: "Сторона",
    sideLeft: "левая",
    sideRight: "правая",
    sizeLabel: "Размер",
    choosePeriod: "Выберите период:",
    companyName: "Название компании",
    companyNamePlaceholder: "Например, EXPORTO LTD",
    invoiceEmail: "Email для счёта",
    invoiceEmailPlaceholder: "invoice@company.com",
    invalidEmail: "Введите корректный email",
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
    sending: "Отправка...",
    successMessage:
      "Заявка на баннер отправлена. Баннер сейчас на модерации, счёт будет отправлен на email.",
    publishAfterModeration:
      "После проверки оплаты и модерации баннер будет опубликован.",
    errorSending: "Ошибка отправки",
  },
  fr: {
    ...EN,
    adSpace: "Espace publicitaire",
    bannerEmptyText: "Votre bannière peut apparaître ici",
    addBanner: "Ajouter une bannière",
    orderBanner: "Commander une bannière",
    searchPageLabel: "Page Risk Index",
    sideLabel: "Côté",
    sideLeft: "gauche",
    sideRight: "droite",
    sizeLabel: "Taille",
    choosePeriod: "Choisissez une période :",
    companyName: "Nom de l’entreprise",
    companyNamePlaceholder: "Par exemple, EXPORTO LTD",
    invoiceEmail: "E-mail de facturation",
    invoiceEmailPlaceholder: "invoice@company.com",
    invalidEmail: "Veuillez entrer un e-mail valide",
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
    sending: "Envoi...",
    successMessage:
      "Demande de bannière envoyée. La bannière est maintenant en modération, la facture sera envoyée par e-mail.",
    publishAfterModeration:
      "Après vérification du paiement et modération, la bannière sera publiée.",
    errorSending: "Erreur d’envoi",
  },
  es: {
    ...EN,
    adSpace: "Espacio publicitario",
    bannerEmptyText: "Tu banner puede aparecer aquí",
    addBanner: "Añadir banner",
    orderBanner: "Pedir un banner",
    searchPageLabel: "Página Risk Index",
    sideLabel: "Lado",
    sideLeft: "izquierdo",
    sideRight: "derecho",
    sizeLabel: "Tamaño",
    choosePeriod: "Elige un período:",
    companyName: "Nombre de la empresa",
    companyNamePlaceholder: "Por ejemplo, EXPORTO LTD",
    invoiceEmail: "Email de factura",
    invoiceEmailPlaceholder: "invoice@company.com",
    invalidEmail: "Introduce un email válido",
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
    sending: "Enviando...",
    successMessage:
      "Solicitud de banner enviada. El banner está ahora en moderación; la factura será enviada por email.",
    publishAfterModeration:
      "Después de la verificación del pago y la moderación, el banner será publicado.",
    errorSending: "Error al enviar",
  },
  it: {
    ...EN,
    adSpace: "Spazio pubblicitario",
    bannerEmptyText: "Il tuo banner può apparire qui",
    addBanner: "Aggiungi banner",
    orderBanner: "Ordina un banner",
    searchPageLabel: "Pagina Risk Index",
    sideLabel: "Lato",
    sideLeft: "sinistro",
    sideRight: "destro",
    sizeLabel: "Dimensione",
    choosePeriod: "Scegli un periodo:",
    companyName: "Nome azienda",
    companyNamePlaceholder: "Ad esempio, EXPORTO LTD",
    invoiceEmail: "Email fattura",
    invoiceEmailPlaceholder: "invoice@company.com",
    invalidEmail: "Inserisci un’email valida",
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
    sending: "Invio...",
    successMessage:
      "Richiesta banner inviata. Il banner è ora in moderazione, la fattura sarà inviata via email.",
    publishAfterModeration:
      "Dopo la verifica del pagamento e la moderazione, il banner sarà pubblicato.",
    errorSending: "Errore di invio",
  },
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function pillForRisk(r: RiskTab) {
  if (r === "high") return "bg-red-50 text-red-800 border-red-200";
  if (r === "medium") return "bg-yellow-50 text-yellow-800 border-yellow-200";
  return "bg-emerald-50 text-emerald-800 border-emerald-200";
}

function RotatingBanner({ side, banners, onAddClick, t }: RotatingBannerProps) {
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

export default function RiskIndexPage() {
  const { t, lang } = useLang();
  const modalT = useMemo(() => TEXT[(lang as Lang) || "en"] ?? TEXT.en, [lang]);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [tab, setTab] = useState<RiskTab>("high");
  const [rows, setRows] = useState<CompanyRow[]>([]);
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(50);

  const [leftBanners, setLeftBanners] = useState<BannerItem[]>([]);
  const [rightBanners, setRightBanners] = useState<BannerItem[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSide, setSelectedSide] = useState<BannerSide | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [paymentProofName, setPaymentProofName] = useState<string | null>(null);

  const [form, setForm] = useState<BannerOrderForm>({
    companyName: "",
    invoiceEmail: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

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

  const paymentPurpose = form.companyName.trim()
    ? `Banner - ${form.companyName.trim()}`
    : modalT.paymentPurposeFallback;

  const canSubmit =
    !!selectedSide &&
    !!selectedPlan &&
    !!bannerFile &&
    !!paymentProofFile &&
    !!form.companyName.trim() &&
    isValidEmail(form.invoiceEmail);

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, limit]);

  useEffect(() => {
    async function loadBanners() {
      const now = new Date();

      const { data } = await supabase
        .from("banners")
        .select("id, image_url, alt, placement, is_active, sort_order, expires_at")
        .eq("is_active", true)
        .in("placement", ["risk_left", "risk_right"])
        .order("sort_order", { ascending: true });

      const rows = (data || []).filter((item: any) => {
        if (!item.expires_at) return true;
        return new Date(item.expires_at) > now;
      });

      const left = rows
        .filter((item: any) => item.placement === "risk_left")
        .map((item: any) => ({
          id: item.id,
          image: item.image_url,
          alt: item.alt || "Left banner",
        }));

      const right = rows
        .filter((item: any) => item.placement === "risk_right")
        .map((item: any) => ({
          id: item.id,
          image: item.image_url,
          alt: item.alt || "Right banner",
        }));

      setLeftBanners(left);
      setRightBanners(right);
    }

    void loadBanners();
  }, []);

  useEffect(() => {
    if (!successMessage || !isModalOpen) return;

    const timer = setTimeout(() => {
      setIsModalOpen(false);
      setSuccessMessage("");
      setSubmitError("");
      setSelectedSide(null);
      setSelectedPlan(null);
      setBannerFile(null);
      setBannerPreview(null);
      setPaymentProofFile(null);
      setPaymentProofName(null);
      setForm({
        companyName: "",
        invoiceEmail: "",
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [successMessage, isModalOpen]);

  async function load() {
    try {
      setLoading(true);
      setErr(null);

      const { data, error } = await supabase
  .from("companies")
  .select(`
    id,
    name,
    vat_uid,
    country,
    trust_score,
    trust_updated_at,
    fraud_score,
    risk_level,
    auto_flagged,
    reviews!inner(id,status)
  `)
  .eq("risk_level", tab)
  .eq("reviews.status", "published")
  .order("fraud_score", { ascending: false })
  .limit(clamp(limit, 10, 200));

if (error) throw new Error(error.message);

      setRows((data || []) as CompanyRow[]);
    } catch (e: any) {
      setErr(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  function openOrder(side: BannerSide) {
    setSelectedSide(side);
    setSelectedPlan(null);
    setBannerFile(null);
    setBannerPreview(null);
    setPaymentProofFile(null);
    setPaymentProofName(null);
    setForm({
      companyName: "",
      invoiceEmail: "",
    });
    setSuccessMessage("");
    setSubmitError("");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSuccessMessage("");
    setSubmitError("");
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

  function updateForm<K extends keyof BannerOrderForm>(key: K, value: BannerOrderForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmitPaid() {
    if (!canSubmit || !selectedPlanData || !selectedSide || !bannerFile || !paymentProofFile) {
      return;
    }

    try {
      setSubmitting(true);
      setSuccessMessage("");
      setSubmitError("");

      const body = new FormData();
      body.append("side", selectedSide);
      body.append("placement", selectedSide === "left" ? "risk_left" : "risk_right");
      body.append("period", selectedPlanData.period);
      body.append("periodLabel", selectedPlanData.label);
      body.append("price", String(selectedPlanData.price));
      body.append("companyName", form.companyName.trim());
      body.append("invoiceEmail", form.invoiceEmail.trim());
      body.append("paymentPurpose", paymentPurpose);
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
        throw new Error(result?.error || text || modalT.errorSending);
      }

      setSuccessMessage(modalT.successMessage);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : modalT.errorSending);
    } finally {
      setSubmitting(false);
    }
  }

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;

    return rows.filter((c) => {
      const name = String(c.name || "").toLowerCase();
      const vat = String(c.vat_uid || "").toLowerCase();
      const country = String(c.country || "").toLowerCase();
      return name.includes(s) || vat.includes(s) || country.includes(s);
    });
  }, [rows, q]);

  const card =
    "rounded-[28px] border border-black/10 bg-white/70 backdrop-blur shadow-[0_14px_60px_rgba(15,20,30,0.08)]";
  const tableCard =
    "rounded-[22px] border border-black/10 bg-white/60 backdrop-blur shadow-sm overflow-hidden";
  const input =
    "w-full rounded-2xl border border-black/10 bg-white/85 backdrop-blur px-4 py-3 outline-none text-black placeholder:text-black/40 focus:border-black/25 shadow-sm";
  const pill = "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold";
  const tabBtn = "px-4 py-2 rounded-full border text-sm font-semibold transition";
  const tabOn = "bg-black text-white border-black";
  const tabOff = "bg-white/70 border-black/15 text-black hover:bg-white";

  return (
    <main className="min-h-screen text-black">
      <div className="relative px-6 pt-44 pb-16 md:pt-48">
        <div className="mx-auto flex max-w-[1520px] items-start gap-10 xl:gap-20">
          <RotatingBanner side="left" banners={leftBanners} onAddClick={openOrder} t={modalT} />

          <div className="mx-auto min-w-0 max-w-5xl flex-1">
            <div className={`p-6 ${card}`}>
              <div className="flex items-start justify-between gap-6 max-lg:flex-col">
                <div className="min-w-0">
                  <h1 className="text-3xl font-extrabold tracking-tight">
                    {t("riskIndexTitle")}
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm text-black/55">
                    {t("riskIndexDesc")}
                  </p>
                  <Link
  href="/companies"
  className="mt-3 inline-flex items-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
>
  BOTON TEST 123
</Link>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setTab("high")}
                      className={`${tabBtn} ${tab === "high" ? tabOn : tabOff}`}
                    >
                      {t("highRisk")}
                    </button>

                    <button
                      onClick={() => setTab("medium")}
                      className={`${tabBtn} ${tab === "medium" ? tabOn : tabOff}`}
                    >
                      {t("mediumRisk")}
                    </button>

                    <button
                      onClick={() => setTab("low")}
                      className={`${tabBtn} ${tab === "low" ? tabOn : tabOff}`}
                    >
                      {t("lowRisk")}
                    </button>

                    <span className={`${pill} ${pillForRisk(tab)}`}>
                      {t("risk")}: {tab.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 w-[300px] max-lg:w-full">
                  <div className="text-xs font-semibold text-black/60">{t("search")}</div>

                  <input
                    className={`mt-2 ${input}`}
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder={t("searchCompanyVatCountry")}
                  />

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-black/50">{t("limit")}</div>

                    <select
                      value={limit}
                      onChange={(e) => setLimit(Number(e.target.value))}
                      className="rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm"
                    >
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                      <option value={200}>200</option>
                    </select>
                  </div>

                  <button
                    onClick={() => void load()}
                    className="mt-3 w-full rounded-2xl bg-black px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-black/90"
                  >
                    {t("refresh")}
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="mt-6 text-black/70">{t("loading")}</div>
            ) : err ? (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
                {err}
              </div>
            ) : (
              <div className={`mt-6 ${tableCard}`}>
                <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
                  <div className="text-sm font-semibold">
                    {t("companies")}: <span className="text-black">{filtered.length}</span>
                  </div>
                  <div className="text-xs text-black/45">{t("sortedByFraud")}</div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-black/[0.03] text-black/70">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">{t("company")}</th>
                        <th className="px-4 py-3 text-left font-semibold">VAT</th>
                        <th className="px-4 py-3 text-left font-semibold">{t("country")}</th>
                        <th className="px-4 py-3 text-left font-semibold">{t("fraudScore")}</th>
                        <th className="px-4 py-3 text-left font-semibold">{t("trust")}</th>
                        <th className="px-4 py-3 text-left font-semibold">{t("signals")}</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filtered.map((c) => {
                        const fraud = typeof c.fraud_score === "number" ? c.fraud_score : 0;
                        const trust =
                          typeof c.trust_score === "number" ? Math.round(c.trust_score) : null;

                        return (
                          <tr
                            key={c.id}
                            className="border-t border-black/10 transition hover:bg-black/[0.02]"
                          >
                            <td className="px-4 py-3">
                              <Link
                                href={`/companies/${c.id}`}
                                className="font-semibold text-black hover:underline"
                              >
                                {c.name || t("company")}
                              </Link>
                            </td>

                            <td className="px-4 py-3 text-black/70">
                              {(c.vat_uid || "—").toUpperCase()}
                            </td>

                            <td className="px-4 py-3 text-black/70">{c.country || "—"}</td>

                            <td className="px-4 py-3">
                              <span
                                className={[
                                  "inline-flex items-center rounded-xl border px-2.5 py-1 text-xs font-extrabold",
                                  tab === "high"
                                    ? "border-red-200 bg-red-50 text-red-900"
                                    : tab === "medium"
                                    ? "border-yellow-200 bg-yellow-50 text-yellow-900"
                                    : "border-emerald-200 bg-emerald-50 text-emerald-900",
                                ].join(" ")}
                              >
                                {fraud}
                              </span>
                            </td>

                            <td className="px-4 py-3 text-black/70">
                              {trust === null ? "—" : `${trust}/100`}
                            </td>

                            <td className="px-4 py-3">
                              {c.auto_flagged ? (
                                <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-800">
                                  {t("autoFlagged")}
                                </span>
                              ) : (
                                <span className="text-black/40">—</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}

                      {filtered.length === 0 ? (
                        <tr>
                          <td className="px-4 py-6 text-black/60" colSpan={6}>
                            {t("noResults")}
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-black/10 px-4 py-3 text-xs text-black/45">
                  {t("riskDisclaimer")}
                </div>
              </div>
            )}

            <div className="mt-10 rounded-[26px] border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur">
              <h2 className="text-lg font-extrabold tracking-tight">{t("howToUseRiskIndex")}</h2>

              <p className="mt-2 text-sm leading-relaxed text-black/65">
                {t("howToUseRiskIndexBody")}
              </p>

              <h3 className="mt-5 text-sm font-extrabold">{t("commonSignals")}</h3>

              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/65">
                <li>{t("signalBurstReviews")}</li>
                <li>{t("signalSameNetwork")}</li>
                <li>{t("signalSelfReviews")}</li>
                <li>{t("signalFlaggedRatio")}</li>
              </ul>

              <p className="mt-4 text-xs text-black/45">{t("wantVerified")}</p>
            </div>
          </div>

          <RotatingBanner side="right" banners={rightBanners} onAddClick={openOrder} t={modalT} />
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 py-6">
            <div className="relative w-full max-w-4xl rounded-[2rem] border border-white/50 bg-white/92 shadow-[0_40px_120px_rgba(15,23,42,0.25)]">
              <button
                onClick={closeModal}
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

                <h2 className="text-[18px] font-bold text-slate-900">{modalT.orderBanner}</h2>
                <p className="mt-1 text-[13px] text-slate-500">
                  {modalT.searchPageLabel} • {modalT.sideLabel}:{" "}
                  {selectedSide === "left" ? modalT.sideLeft : modalT.sideRight} • {modalT.sizeLabel} 180×600px
                </p>

                <div className="mt-3 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_220px]">
                  <div>
                    <div className="space-y-1">
                      <p className="text-[13px] font-semibold text-slate-700">
                        {modalT.choosePeriod}
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
                              name="risk-banner-plan"
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
                          {modalT.companyName}
                        </label>
                        <input
                          value={form.companyName}
                          onChange={(e) => updateForm("companyName", e.target.value)}
                          className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none transition-colors focus:border-emerald-400"
                          placeholder={modalT.companyNamePlaceholder}
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-[13px] font-semibold text-slate-700">
                          {modalT.invoiceEmail}
                        </label>

                        <input
                          type="email"
                          value={form.invoiceEmail}
                          onChange={(e) => updateForm("invoiceEmail", e.target.value)}
                          className={`h-9 w-full rounded-xl border px-3 outline-none transition-colors ${
                            form.invoiceEmail.length === 0
                              ? "border-slate-200 focus:border-emerald-400"
                              : isValidEmail(form.invoiceEmail)
                              ? "border-emerald-300 focus:border-emerald-500"
                              : "border-red-300 focus:border-red-500"
                          }`}
                          placeholder={modalT.invoiceEmailPlaceholder}
                        />

                        {form.invoiceEmail.length > 0 && !isValidEmail(form.invoiceEmail) && (
                          <p className="mt-1 text-xs text-red-500">{modalT.invalidEmail}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-[13px] font-semibold text-slate-700">
                          {modalT.uploadBanner}
                        </label>
                        <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-2.5 text-center transition-colors hover:border-emerald-300">
                          <p className="text-sm font-medium leading-tight text-slate-700">
                            {modalT.chooseBannerFile}
                          </p>
                          <p className="mt-0.5 text-xs leading-tight text-slate-400">
                            {modalT.recommendedSize}
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
                            {modalT.paymentDetails}
                          </p>

                          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[13px] text-slate-700">
                            <p className="col-span-2">
                              <span className="font-semibold">{modalT.bankCompany}:</span>{" "}
                              {companyBankData.companyName}
                            </p>
                            <p className="col-span-2">
                              <span className="font-semibold">{modalT.bankAccount}:</span>{" "}
                              {companyBankData.accountNumber}
                            </p>
                            <p>
                              <span className="font-semibold">{modalT.bankBic}:</span>{" "}
                              {companyBankData.bic}
                            </p>
                            <p>
                              <span className="font-semibold">{modalT.amount}:</span> €
                              {selectedPlanData.price} + VAT (EU 0%, LV 21%)
                            </p>
                            <p className="col-span-2">
                              <span className="font-semibold">{modalT.paymentPurpose}:</span>{" "}
                              {paymentPurpose}
                            </p>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="mb-1 block text-[13px] font-semibold text-slate-700">
                          {modalT.uploadPaymentProof}
                        </label>
                        <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-2.5 text-center transition-colors hover:border-emerald-300">
                          <p className="text-sm font-medium leading-tight text-slate-700">
                            {modalT.uploadPaymentConfirmation}
                          </p>
                          <p className="mt-0.5 text-xs leading-tight text-slate-400">
                            {modalT.paymentProofFormats}
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
                      {modalT.bannerPreview}
                    </p>

                    <div className="h-[600px] w-[180px] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 shadow-sm">
                      {bannerPreview ? (
                        <img
                          src={bannerPreview}
                          alt={modalT.bannerPreview}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center p-4 text-center text-sm leading-8 text-slate-400">
                          {modalT.bannerPreviewEmpty}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <button
                    disabled={!canSubmit || submitting}
                    onClick={() => void handleSubmitPaid()}
                    className={`flex h-12 w-full items-center justify-center rounded-2xl text-base font-semibold transition-all ${
                      canSubmit && !submitting
                        ? "bg-slate-900 text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] hover:-translate-y-0.5 hover:bg-slate-800"
                        : "cursor-not-allowed bg-slate-100 text-slate-400"
                    }`}
                  >
                    {submitting ? modalT.sending : modalT.havePaid}
                  </button>

                  {successMessage && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">
                      {successMessage}
                    </div>
                  )}

                  {submitError && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
                      {submitError}
                    </div>
                  )}
                </div>

                <p className="mt-1.5 text-center text-xs text-slate-400">
                  {modalT.publishAfterModeration}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}