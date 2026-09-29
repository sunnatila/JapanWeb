import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en/translation.json'
import ru from './locales/ru/translation.json'
import ja from './locales/ja/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      ja: { translation: ja },
    },
    supportedLngs: ['en', 'ru', 'ja'],
    fallbackLng: 'en',
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'preferred-language',
      // 'ru-RU', 'en-US' kabi kodlarni 'ru', 'en' ga keltirish (API /ru/, /en/, /ja/ kutadi)
      convertDetectedLanguage: (lng) => lng.split('-')[0],
    },
    interpolation: {
      escapeValue: false,
    },
  })

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
})

export default i18n
