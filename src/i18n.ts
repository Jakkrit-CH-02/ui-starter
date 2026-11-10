import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";

export const SUPPORTED_LANGUAGES = ["en"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

// To add a language: create src/locales/<code>/translation.json, import it
// here, add it to `resources` and to SUPPORTED_LANGUAGES.
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
    },
    supportedLngs: SUPPORTED_LANGUAGES,
    fallbackLng: "en",
    // "en-US" resolves to "en"
    load: "languageOnly",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      // React already escapes rendered strings
      escapeValue: false,
    },
  });

export default i18n;
