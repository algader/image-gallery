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
  // جلب اللغة المحفوظة من localStorage أو استخدام العربية كافتراضية
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('language') || 'ar';
  });

  // تحديث اتجاه النص واللغة في document
  useEffect(() => {
    const direction = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLanguage;
    
    // حفظ اللغة في localStorage
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = (language) => {
    if (translations[language]) {
      setCurrentLanguage(language);
    }
  };

  // دالة للحصول على الترجمة
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    // إذا لم توجد الترجمة، ارجع المفتاح نفسه
    return value || key;
  };

  // دالة للحصول على معلومات اللغة الحالية
  const getLanguageInfo = () => {
    const languageInfo = {
      ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
      en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
      de: { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' }
    };
    return languageInfo[currentLanguage];
  };

  // قائمة اللغات المتاحة
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
