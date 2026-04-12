"use client";

import { useMemo } from "react";
import { useLang } from "@/lib/language-context";

const CONTACT_EMAIL = "carriertrust.eu@gmail.com";

type Lang = "en" | "de" | "ru" | "fr" | "es" | "it";

type TextPack = {
  badge: string;
  title: string;
  intro: string;
  email: string;
  preferredLanguage: string;
  preferredLanguageValue: string;
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    badge: "Contact",
    title: "Contact",
    intro:
      "For support, legal notices, privacy requests, or general questions — email us.",
    email: "Email",
    preferredLanguage: "Preferred language",
    preferredLanguageValue: "English",
  },
  de: {
    badge: "Kontakt",
    title: "Kontakt",
    intro:
      "Für Support, rechtliche Mitteilungen, Datenschutzanfragen oder allgemeine Fragen — schreiben Sie uns per E-Mail.",
    email: "E-Mail",
    preferredLanguage: "Bevorzugte Sprache",
    preferredLanguageValue: "Englisch",
  },
  ru: {
    badge: "Контакты",
    title: "Контакты",
    intro:
      "Для поддержки, юридических уведомлений, запросов по конфиденциальности или общих вопросов — напишите нам на майл.",
    email: "Email",
    preferredLanguage: "Предпочтительный язык",
    preferredLanguageValue: "Английский",
  },
  fr: {
    badge: "Contact",
    title: "Contact",
    intro:
      "Pour l’assistance, les notifications juridiques, les demandes liées à la confidentialité ou toute question générale — écrivez-nous par email.",
    email: "Email",
    preferredLanguage: "Langue préférée",
    preferredLanguageValue: "Anglais",
  },
  es: {
    badge: "Contacto",
    title: "Contacto",
    intro:
      "Para soporte, avisos legales, solicitudes de privacidad o preguntas generales — escríbenos por correo electrónico.",
    email: "Email",
    preferredLanguage: "Idioma preferido",
    preferredLanguageValue: "Inglés",
  },
  it: {
    badge: "Contatto",
    title: "Contatto",
    intro:
      "Per assistenza, notifiche legali, richieste relative alla privacy o domande generali — scrivici via email.",
    email: "Email",
    preferredLanguage: "Lingua preferita",
    preferredLanguageValue: "Inglese",
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

              <p className="mt-4 text-sm leading-7 text-slate-600 md:text-[15px]">
                {t.intro}
              </p>

              <div className="mt-8 rounded-[1.5rem] border border-slate-200/70 bg-white/80 p-6 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">{t.email}</div>

                <a
                  className="mt-3 inline-block text-slate-900 underline underline-offset-4 transition-colors hover:text-emerald-600"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>

                <div className="mt-3 text-xs text-slate-500">
                  {t.preferredLanguage}: {t.preferredLanguageValue}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}