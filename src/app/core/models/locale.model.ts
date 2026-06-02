export type Locale = 'BR' | 'EN';

export const LOCALE_STORAGE_KEY = 'portfolio.locale';

export const DEFAULT_LOCALE: Locale = 'BR';

export function localeToHtmlLang(locale: Locale): string {
  return locale === 'BR' ? 'pt-BR' : 'en';
}
