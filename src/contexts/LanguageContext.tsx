"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getLangFromPath, getAlternatePath } from "@/lib/routes";

export type Language = "tr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Lazy-load translations
let trTranslations: Record<string, string> = {};
let enTranslations: Record<string, string> = {};

const loadTranslations = async () => {
  const [tr, en] = await Promise.all([
    import("@/i18n/tr").then((m) => m.default),
    import("@/i18n/en").then((m) => m.default),
  ]);
  trTranslations = tr;
  enTranslations = en;
};

// Pre-load translations
loadTranslations();

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const derivedLang = getLangFromPath(pathname);
  const [language, setLanguageState] = useState<Language>(derivedLang);
  const [, setLoaded] = useState(false);

  // Sync language state with URL
  useEffect(() => {
    setLanguageState(derivedLang);
    localStorage.setItem("baglac-lang", derivedLang);
  }, [derivedLang]);

  useEffect(() => {
    loadTranslations().then(() => setLoaded(true));
  }, []);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;
    const alternatePath = getAlternatePath(pathname, lang);
    localStorage.setItem("baglac-lang", lang);
    setLanguageState(lang);
    router.push(alternatePath);
  };

  const t = (key: string): string => {
    const translations = language === "tr" ? trTranslations : enTranslations;
    return translations[key] || trTranslations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
