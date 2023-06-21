import i18n, { InitOptions, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "./en.json";
import lt from "./lt.json";
import * as RNLocalize from 'react-native-localize';

//i18n library is responsible for language localization, it checks the native language set in the device and picks language translation.
//if language isnt localized, it then fallbacks to english

interface Resources {
  translation: {
    [key: string]: string;
  };
}

const resources: Resource = {
  en: {
    translation: en,
  },
  lt: {
    translation: lt,
  },
};

const options: InitOptions = {
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
};

i18n
  .use(initReactI18next)
  .init(options);

// Detect and set the current language
const locales = RNLocalize.getLocales();
const languageTags = locales.map(locale => locale.languageTag);

// Find the best available language based on the detected locales
const bestAvailableLanguage = i18n.services.languageUtils.getBestMatchFromCodes(
  languageTags,
  Object.keys(resources)
);

i18n.changeLanguage(bestAvailableLanguage);

export default i18n;
