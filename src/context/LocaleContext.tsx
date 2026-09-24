import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { translations, TranslationKey, formatPKR, formatTeeth } from '../i18n/translations';

interface LocaleContextType {
  language: Language;
  isRtl: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
  formatPrice: (amount: number) => string;
  formatTeethCount: (teeth: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('apna_maweshi_lang');
    return (saved === 'ur' || saved === 'en') ? saved : 'en';
  });

  const isRtl = language === 'ur';

  useEffect(() => {
    localStorage.setItem('apna_maweshi_lang', language);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    if (isRtl) {
      document.body.classList.add('font-urdu');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.remove('font-urdu');
      document.body.classList.add('font-sans');
    }
  }, [language, isRtl]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'en' ? 'ur' : 'en'));
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations['en'][key] || String(key);
  };

  const formatPrice = (amount: number): string => {
    return formatPKR(amount, language);
  };

  const formatTeethCount = (teeth: string): string => {
    return formatTeeth(teeth, language);
  };

  return (
    <LocaleContext.Provider
      value={{
        language,
        isRtl,
        setLanguage,
        toggleLanguage,
        t,
        formatPrice,
        formatTeethCount,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
