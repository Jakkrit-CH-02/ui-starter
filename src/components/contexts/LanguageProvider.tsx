import { useCallback, useEffect, useMemo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "./LanguageContext";

type Props = {
  children: ReactNode;
};

/** Exposes the i18next language to the app and keeps <html lang> in sync. */
export const LanguageProvider = ({ children }: Props) => {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? "en";

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback(
    (next: string) => {
      void i18n.changeLanguage(next);
    },
    [i18n]
  );

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
