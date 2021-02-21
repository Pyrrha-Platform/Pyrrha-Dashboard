import i18n from 'i18next';
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import ca from './locales/ca.json';

i18n
  .use(detector)
  .use(initReactI18next).init({
  fallbackLng: 'en',
  resources: {
    en: { translations: en },
    es: { translations: es },
    ca: { translations: ca },
  },
  defaultNS: 'translations',
  interpolation: { escapeValue: false },
});
i18n.languages = ['en', 'es', 'ca'];

export default i18n;
