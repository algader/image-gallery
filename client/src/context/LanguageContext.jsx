import React, { createContext, useContext, useState, useEffect } from 'react';

// استيراد ملفات الترجمة
import arTranslations from '../locales/ar.json';
import enTranslations from '../locales/en.json';
import deTranslations from '../locales/de.json';

const translations = {
  ar: arTranslations,
  en: enTranslations,
  de: deTranslations
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {

  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('language') || 'ar';
  });


  useEffect(() => {
    const direction = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLanguage;
    

    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = (language) => {
    if (translations[language]) {
      setCurrentLanguage(language);
    }
  };


  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
 
    return value || key;
  };


  const getLanguageInfo = () => {
    const languageInfo = {
      ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
      en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
      de: { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' }
    };
    return languageInfo[currentLanguage];
  };


  const availableLanguages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    getLanguageInfo,
    availableLanguages,
    isRTL: currentLanguage === 'ar'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
