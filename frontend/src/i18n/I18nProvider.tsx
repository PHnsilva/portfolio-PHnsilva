import { useEffect, useState, type ReactNode } from 'react';
import { I18nContext, type Lang } from './context';
const key = 'portfolio.lang';
export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem(key) === 'en' ? 'en' : 'pt';
    } catch {
      return 'pt';
    }
  });
  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    try {
      localStorage.setItem(key, lang);
    } catch {
      /* Storage is optional. */
    }
  }, [lang]);
  return (
    <I18nContext.Provider
      value={{ lang, toggleLang: () => setLang((value) => (value === 'pt' ? 'en' : 'pt')) }}
    >
      {children}
    </I18nContext.Provider>
  );
}
