"use client";

import { useLang } from "@/lib/language-context";

export default function CompaniesTitle() {
  const { lang } = useLang();

  const titles: Record<string, string> = {
    en: "Companies Directory",
    de: "Unternehmensverzeichnis",
    ru: "Каталог компаний",
    fr: "Annuaire des entreprises",
    es: "Directorio de empresas",
    it: "Directory aziende",
  };

  return (
    <h1 className="text-4xl font-bold text-slate-900 mb-8">
      {titles[lang] || titles.en}
    </h1>
  );
}