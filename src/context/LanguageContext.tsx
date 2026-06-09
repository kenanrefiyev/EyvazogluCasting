import React, { createContext, useContext, useState, } from 'react';
import { translations } from '../data/translations';
import type { Lang } from '../data/translations';

type TranslationKey = keyof (typeof translations)[keyof typeof translations];

interface LanguageContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    // Try to get language from localStorage
    const saved = localStorage.getItem('eyvazoglu_lang');
    return (saved === 'RU' || saved === 'ENG' || saved === 'AZ') ? saved : 'AZ';
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('eyvazoglu_lang', newLang);
  };

  const t = (key: TranslationKey): string => {
    // Falls back to AZ translation if missing in target lang
    const value = translations[lang]?.[key] || translations['AZ']?.[key];
    return value || String(key);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
