'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { dictionary, getDictionary } from '../locales/dictionary';

type DictionaryType = typeof dictionary.id;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: DictionaryType;
  formatPrice: (priceIdr: number, priceJpy: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('id');

  useEffect(() => {
    const saved = localStorage.getItem('saraya_lang') as Language;
    if (saved && (saved === 'ja' || saved === 'id' || saved === 'en')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('saraya_lang', lang);
    }
  };

  const t = getDictionary(language) as DictionaryType;

  const formatPrice = (priceIdr: number, priceJpy: number): string => {
    if (language === 'ja') {
      return `¥${priceJpy.toLocaleString('ja-JP')}`;
    }
    return `Rp ${priceIdr.toLocaleString('id-ID')}`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
