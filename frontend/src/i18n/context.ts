import { createContext, useContext } from 'react';
export type Lang = 'pt' | 'en';
export type Localized<T = string> = Record<Lang, T>;
export const bilingual = <T>(pt: T, en: T): Localized<T> => ({ pt, en });
export const I18nContext = createContext<{ lang: Lang; toggleLang: () => void } | null>(null);
export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('I18nProvider is required');
  return { ...context, pick: <T>(value: Localized<T>): T => value[context.lang] };
}
