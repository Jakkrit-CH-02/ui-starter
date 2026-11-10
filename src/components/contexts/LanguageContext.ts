import { createContext, useContext } from "react";

export type LanguageContextType = {
  /** Current language code, e.g. "en" */
  language: string;
  setLanguage: (language: string) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => undefined,
});

export const useLanguage = () => useContext(LanguageContext);
