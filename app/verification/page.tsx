"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useLang } from "@/lib/language-context";

type Lang = "en" | "de" | "ru" | "fr" | "es" | "it";

type TextPack = {
  title: string;
  intro: string;

  whatWeVerify: string;
  verifyBusinessIdentity: string;
  verifyOwnershipSignals: string;
  verifyManualChecks: string;

  whatItDoesNotMean: string;
  notMeanPositiveReviews: string;
  notMeanQualityGuarantee: string;
  onlyIdentityConfirmed: string;

  logisticsNote: string;
  logisticsText: string;

  footer: string;
};

const EN: TextPack = {
  title: "What does “Verified company” mean?",
  intro:
    "“Verified company” means CarrierTrust confirmed the company identity. This reduces fake profiles and increases trust.",

  whatWeVerify: "What we verify",
  verifyBusinessIdentity:
    "Business identity (VAT / registration where applicable)",
  verifyOwnershipSignals:
    "Ownership signals (domain email / claim approval)",
  verifyManualChecks: "Manual checks in suspicious cases",

  whatItDoesNotMean: "What it does NOT mean",
  notMeanPositiveReviews: "It does NOT mean all reviews are positive.",
  notMeanQualityGuarantee: "It does NOT guarantee service quality.",
  onlyIdentityConfirmed: "It only confirms the company identity is real.",

  logisticsNote: "Logistics note",
  logisticsText:
    "In logistics, verified status mainly protects against fake “clone companies” and helps customers identify the real carrier/forwarder with the same name.",

  footer:
    "CarrierTrust is a neutral hosting platform. Reviews are user-generated. We may remove content that violates our policies or applicable law.",
};

const TEXT: Record<Lang, TextPack> = {
  en: EN,
  de: {
    title: "Was bedeutet „Verifiziertes Unternehmen“?",
    intro:
      "„Verifiziertes Unternehmen“ bedeutet, dass CarrierTrust die Identität des Unternehmens bestätigt hat. Das reduziert Fake-Profile und erhöht das Vertrauen.",

    whatWeVerify: "Was wir prüfen",
    verifyBusinessIdentity:
      "Unternehmensidentität (USt-IdNr. / Registrierung, falls anwendbar)",
    verifyOwnershipSignals:
      "Eigentumssignale (Domain-E-Mail / Genehmigung des Claims)",
    verifyManualChecks: "Manuelle Prüfungen in verdächtigen Fällen",

    whatItDoesNotMean: "Was das NICHT bedeutet",
    notMeanPositiveReviews:
      "Es bedeutet NICHT, dass alle Bewertungen positiv sind.",
    notMeanQualityGuarantee:
      "Es garantiert NICHT die Qualität der Dienstleistung.",
    onlyIdentityConfirmed:
      "Es bestätigt nur, dass die Unternehmensidentität echt ist.",

    logisticsNote: "Hinweis für die Logistik",
    logisticsText:
      "In der Logistik schützt der verifizierte Status vor allem vor gefälschten „Klon-Unternehmen“ und hilft Kunden, den echten Frachtführer/Spediteur mit demselben Namen zu erkennen.",

    footer:
      "CarrierTrust ist eine neutrale Hosting-Plattform. Bewertungen werden von Nutzern erstellt. Wir können Inhalte entfernen, die gegen unsere Richtlinien oder geltendes Recht verstoßen.",
  },
  ru: {
    title: "Что означает «Верифицированная компания»?",
    intro:
      "«Верифицированная компания» означает, что CarrierTrust подтвердил личность компании. Это снижает количество фейковых профилей и повышает доверие.",

    whatWeVerify: "Что мы проверяем",
    verifyBusinessIdentity:
      "Юридическую идентичность компании (VAT / регистрация, если применимо)",
    verifyOwnershipSignals:
      "Сигналы владения (майл компании / подтверждение собственности компании)",
    verifyManualChecks: "Ручные проверки в подозрительных случаях",

    whatItDoesNotMean: "Что это НЕ означает",
    notMeanPositiveReviews:
      "Это НЕ означает, что все отзывы положительные.",
    notMeanQualityGuarantee:
      "Это НЕ гарантирует качество услуг компании.",
    onlyIdentityConfirmed:
      "Это только подтверждает, что компания реальна.",

    logisticsNote: "Примечание для логистики",
    logisticsText:
      "В логистике верифицированный статус в первую очередь защищает от фейковых «компаний-клонов» и помогает клиентам отличить настоящего перевозчика/экспедитора с тем же названием.",

    footer:
      "CarrierTrust — нейтральная хостинг-платформа. Отзывы создаются пользователями. Мы можем удалять контент, который нарушает наши правила или применимое законодательство.",
  },
  fr: {
    title: "Que signifie « Entreprise vérifiée » ?",
    intro:
      "« Entreprise vérifiée » signifie que CarrierTrust a confirmé l’identité de l’entreprise. Cela réduit les faux profils et renforce la confiance.",

    whatWeVerify: "Ce que nous vérifions",
    verifyBusinessIdentity:
      "L’identité de l’entreprise (TVA / immatriculation le cas échéant)",
    verifyOwnershipSignals:
      "Les signaux de propriété (email de domaine / validation de la revendication)",
    verifyManualChecks: "Des vérifications manuelles dans les cas suspects",

    whatItDoesNotMean: "Ce que cela NE signifie PAS",
    notMeanPositiveReviews:
      "Cela NE signifie PAS que tous les avis sont positifs.",
    notMeanQualityGuarantee:
      "Cela NE garantit PAS la qualité du service.",
    onlyIdentityConfirmed:
      "Cela confirme seulement que l’identité de l’entreprise est réelle.",

    logisticsNote: "Note logistique",
    logisticsText:
      "Dans la logistique, le statut vérifié protège surtout contre les fausses « entreprises clones » et aide les clients à identifier le vrai transporteur/transitaire portant le même nom.",

    footer:
      "CarrierTrust est une plateforme d’hébergement neutre. Les avis sont générés par les utilisateurs. Nous pouvons supprimer les contenus qui violent nos politiques ou la loi applicable.",
  },
  es: {
    title: "Qué significa «Empresa verificada»?",
    intro:
      "«Empresa verificada» significa que CarrierTrust confirmó la identidad de la empresa. Esto reduce los perfiles falsos y aumenta la confianza.",

    whatWeVerify: "Qué verificamos",
    verifyBusinessIdentity:
      "Identidad empresarial (VAT / registro cuando corresponda)",
    verifyOwnershipSignals:
      "Señales de propiedad (correo del dominio / aprobación del claim)",
    verifyManualChecks: "Revisiones manuales en casos sospechosos",

    whatItDoesNotMean: "Lo que NO significa",
    notMeanPositiveReviews:
      "NO significa que todas las reseñas sean positivas.",
    notMeanQualityGuarantee:
      "NO garantiza la calidad del servicio.",
    onlyIdentityConfirmed:
      "Solo confirma que la identidad de la empresa es real.",

    logisticsNote: "Nota logística",
    logisticsText:
      "En logística, el estado verificado protege principalmente contra falsas «empresas clon» y ayuda a los clientes a identificar al transportista/transitario real con el mismo nombre.",

    footer:
      "CarrierTrust es una plataforma de alojamiento neutral. Las reseñas son generadas por usuarios. Podemos eliminar contenido que infrinja nuestras políticas o la ley aplicable.",
  },
  it: {
    title: "Cosa significa «Azienda verificata»?",
    intro:
      "«Azienda verificata» significa che CarrierTrust ha confermato l’identità dell’azienda. Questo riduce i profili falsi e aumenta la fiducia.",

    whatWeVerify: "Cosa verifichiamo",
    verifyBusinessIdentity:
      "Identità aziendale (partita IVA / registrazione dove applicabile)",
    verifyOwnershipSignals:
      "Segnali di titolarità (email di dominio / approvazione della claim)",
    verifyManualChecks: "Controlli manuali nei casi sospetti",

    whatItDoesNotMean: "Cosa NON significa",
    notMeanPositiveReviews:
      "NON significa che tutte le recensioni siano positive.",
    notMeanQualityGuarantee:
      "NON garantisce la qualità del servizio.",
    onlyIdentityConfirmed:
      "Conferma solo che l’identità dell’azienda è reale.",

    logisticsNote: "Nota logistica",
    logisticsText:
      "Nella logistica, lo stato verificato protegge soprattutto dalle false «aziende clone» e aiuta i clienti a identificare il vero vettore/spedizioniere con lo stesso nome.",

    footer:
      "CarrierTrust è una piattaforma di hosting neutrale. Le recensioni sono generate dagli utenti. Possiamo rimuovere contenuti che violano le nostre policy o la legge applicabile.",
  },
};

export default function VerificationPage() {
  const { lang } = useLang();
  const t = useMemo(() => TEXT[(lang as Lang) || "en"] ?? TEXT.en, [lang]);

  const hero =
    "rounded-[28px] border border-black/10 bg-white/70 backdrop-blur shadow-[0_14px_60px_rgba(15,20,30,0.08)]";
  const card =
    "rounded-[22px] border border-black/10 bg-white/70 backdrop-blur shadow-sm";
  const pill =
    "inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-black/70";

  return (
    <main className="min-h-screen text-black">
      <div className="relative px-6 pb-16 pt-40 md:pt-44">
        <div className="mx-auto max-w-3xl">
          <div className={`mt-5 p-7 ${hero}`}>
            <h1 className="text-[30px] font-extrabold leading-[1.05] tracking-tight">
              {t.title}
            </h1>

            <p className="mt-4 text-sm text-black/70">{t.intro}</p>

            <div className="mt-6 grid gap-4">
              <div className={`p-5 ${card}`}>
                <div className="text-sm font-bold">{t.whatWeVerify}</div>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-black/70">
                  <li>
                    <span className="font-semibold text-black">
                      {t.verifyBusinessIdentity.split(" (")[0]}
                    </span>
                    {t.verifyBusinessIdentity.includes(" (")
                      ? ` (${t.verifyBusinessIdentity.split(" (")[1]}`
                      : ""}
                  </li>
                  <li>
                    <span className="font-semibold text-black">
                      {t.verifyOwnershipSignals.split(" (")[0]}
                    </span>
                    {t.verifyOwnershipSignals.includes(" (")
                      ? ` (${t.verifyOwnershipSignals.split(" (")[1]}`
                      : ""}
                  </li>
                  <li>
                    <span className="font-semibold text-black">
                      {t.verifyManualChecks}
                    </span>
                  </li>
                </ul>
              </div>

              <div className={`p-5 ${card}`}>
                <div className="text-sm font-bold">{t.whatItDoesNotMean}</div>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-black/70">
                  <li>{t.notMeanPositiveReviews}</li>
                  <li>{t.notMeanQualityGuarantee}</li>
                  <li>{t.onlyIdentityConfirmed}</li>
                </ul>
              </div>

              <div className={`p-5 ${card}`}>
                <span className={pill}>{t.logisticsNote}</span>
                <p className="mt-2 text-sm text-black/70">{t.logisticsText}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-black/45">{t.footer}</div>
        </div>
      </div>
    </main>
  );
}