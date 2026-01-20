'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import translations
import hiTranslations from '@/locales/hi.json';
import enTranslations from '@/locales/en.json';
import bnTranslations from '@/locales/bn.json';
import mrTranslations from '@/locales/mr.json';
import teTranslations from '@/locales/te.json';
import taTranslations from '@/locales/ta.json';
import guTranslations from '@/locales/gu.json';
import knTranslations from '@/locales/kn.json';
import paTranslations from '@/locales/pa.json';
import mlTranslations from '@/locales/ml.json';

export type Locale = 'hi' | 'en' | 'bn' | 'mr' | 'te' | 'ta' | 'gu' | 'kn' | 'pa' | 'ml';
export type TFunction = (key: string, params?: Record<string, string | number>) => string;

const translations: Record<Locale, any> = {
  hi: hiTranslations,
  en: enTranslations,
  bn: bnTranslations,
  mr: mrTranslations,
  te: teTranslations,
  ta: taTranslations,
  gu: guTranslations,
  kn: knTranslations,
  pa: paTranslations,
  ml: mlTranslations,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TFunction;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('hi');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    if (savedLocale && translations[savedLocale]) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem('locale', newLocale);
    setLocaleState(newLocale);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    let translation = translations[locale]?.[key] || translations['hi'][key] || key;
    if (params) {
        Object.keys(params).forEach(paramKey => {
            translation = translation.replace(`{${paramKey}}`, String(params[paramKey]));
        });
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
