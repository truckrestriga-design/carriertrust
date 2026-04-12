"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getLang, Lang, setStoredLang, tr } from "@/lib/i18n";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const initial = getLang();
    setLangState(initial);
    document.documentElement.lang = initial;
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    setStoredLang(newLang);
  };

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key: string) => tr(lang, key),
    }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used inside LanguageProvider");
  }
  return ctx;
}