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

  purpose: string;
  purposeText: string;

  storage: string;
  storageText: string;

  rights: string;
  rightsText: string;
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    badge: "Privacy",
    title: "Privacy Policy",
    intro:
      "CarrierTrust respects your privacy and complies with the General Data Protection Regulation (GDPR).",

    dataCollected: "Data we collect",
    collect1: "Email address (for authentication)",
    collect2: "Company name and VAT (if provided)",
    collect3: "Reviews and content submitted",
    collect4: "Technical logs and IP address for security",

    purpose: "Purpose",
    purposeText:
      "Data is used to operate the platform, prevent abuse, and ensure legal compliance.",

    storage: "Storage",
    storageText:
      "Data is stored securely using Supabase infrastructure within the EU.",

    rights: "Your rights",
    rightsText:
      "You may request deletion or modification of your data anytime by contacting us.",
  },
  de: {
    badge: "Datenschutz",
    title: "Datenschutzerklärung",
    intro:
      "CarrierTrust respektiert Ihre Privatsphäre und erfüllt die Anforderungen der Datenschutz-Grundverordnung (DSGVO).",

    dataCollected: "Welche Daten wir erheben",
    collect1: "E-Mail-Adresse (zur Authentifizierung)",
    collect2: "Firmenname und USt-IdNr. (falls angegeben)",
    collect3: "Eingereichte Bewertungen und Inhalte",
    collect4: "Technische Protokolle und IP-Adresse zur Sicherheit",

    purpose: "Zweck",
    purposeText:
      "Die Daten werden verwendet, um die Plattform zu betreiben, Missbrauch zu verhindern und die rechtlichen Anforderungen einzuhalten.",

    storage: "Speicherung",
    storageText:
      "Die Daten werden sicher über die Supabase-Infrastruktur innerhalb der EU gespeichert.",

    rights: "Ihre Rechte",
    rightsText:
      "Sie können jederzeit die Löschung oder Änderung Ihrer Daten beantragen, indem Sie uns kontaktieren.",
  },
  ru: {
    badge: "Конфиденциальность",
    title: "Политика конфиденциальности",
    intro:
      "CarrierTrust уважает вашу конфиденциальность и соблюдает требования Общего регламента по защите данных (GDPR).",

    dataCollected: "Какие данные мы собираем",
    collect1: "Email-адрес (для аутентификации)",
    collect2: "Название компании и VAT номер (если указаны)",
    collect3: "Отзывы и отправленный контент",
    collect4: "Технические логи и IP-адрес в целях безопасности",

    purpose: "Цель",
    purposeText:
      "Данные используются для работы платформы, предотвращения злоупотреблений и соблюдения юридических требований.",

    storage: "Хранение",
    storageText:
      "Данные безопасно хранятся с использованием инфраструктуры Supabase в пределах ЕС.",

    rights: "Ваши права",
    rightsText:
      "Вы можете в любое время запросить удаление или изменение своих данных, связавшись с нами.",
  },
  fr: {
    badge: "Confidentialité",
    title: "Politique de confidentialité",
    intro:
      "CarrierTrust respecte votre vie privée et se conforme au Règlement général sur la protection des données (RGPD).",

    dataCollected: "Données collectées",
    collect1: "Adresse e-mail (pour l’authentification)",
    collect2: "Nom de l’entreprise et numéro de TVA (si fournis)",
    collect3: "Avis et contenus soumis",
    collect4: "Journaux techniques et adresse IP à des fins de sécurité",

    purpose: "Finalité",
    purposeText:
      "Les données sont utilisées pour exploiter la plateforme, prévenir les abus et garantir la conformité légale.",

    storage: "Stockage",
    storageText:
      "Les données sont stockées de manière sécurisée via l’infrastructure Supabase au sein de l’UE.",

    rights: "Vos droits",
    rightsText:
      "Vous pouvez demander à tout moment la suppression ou la modification de vos données en nous contactant.",
  },
  es: {
    badge: "Privacidad",
    title: "Política de privacidad",
    intro:
      "CarrierTrust respeta tu privacidad y cumple con el Reglamento General de Protección de Datos (GDPR).",

    dataCollected: "Datos que recopilamos",
    collect1: "Dirección de correo electrónico (para autenticación)",
    collect2: "Nombre de la empresa y VAT (si se proporciona)",
    collect3: "Reseñas y contenido enviado",
    collect4: "Registros técnicos y dirección IP por seguridad",

    purpose: "Finalidad",
    purposeText:
      "Los datos se utilizan para operar la plataforma, prevenir abusos y garantizar el cumplimiento legal.",

    storage: "Almacenamiento",
    storageText:
      "Los datos se almacenan de forma segura utilizando la infraestructura de Supabase dentro de la UE.",

    rights: "Tus derechos",
    rightsText:
      "Puedes solicitar la eliminación o modificación de tus datos en cualquier momento poniéndote en contacto con nosotros.",
  },
  it: {
    badge: "Privacy",
    title: "Informativa sulla privacy",
    intro:
      "CarrierTrust rispetta la tua privacy e si conforma al Regolamento generale sulla protezione dei dati (GDPR).",

    dataCollected: "Dati che raccogliamo",
    collect1: "Indirizzo email (per l’autenticazione)",
    collect2: "Nome azienda e VAT (se forniti)",
    collect3: "Recensioni e contenuti inviati",
    collect4: "Log tecnici e indirizzo IP per motivi di sicurezza",

    purpose: "Finalità",
    purposeText:
      "I dati vengono utilizzati per gestire la piattaforma, prevenire abusi e garantire la conformità legale.",

    storage: "Conservazione",
    storageText:
      "I dati sono conservati in modo sicuro utilizzando l’infrastruttura Supabase all’interno dell’UE.",

    rights: "I tuoi diritti",
    rightsText:
      "Puoi richiedere in qualsiasi momento la cancellazione o la modifica dei tuoi dati contattandoci.",
  },
};

export default function PrivacyPage() {
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
                  </ul>

                  <h2 className="pt-4 text-xl font-semibold text-slate-900">
                    {t.purpose}
                  </h2>
                  <p>{t.purposeText}</p>

                  <h2 className="pt-4 text-xl font-semibold text-slate-900">
                    {t.storage}
                  </h2>
                  <p>{t.storageText}</p>

                  <h2 className="pt-4 text-xl font-semibold text-slate-900">
                    {t.rights}
                  </h2>
                  <p>{t.rightsText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}