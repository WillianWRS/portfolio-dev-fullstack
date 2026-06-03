import { DOCUMENT } from '@angular/common';
import { afterNextRender, computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  localeToHtmlLang,
  type Locale,
} from '../models/locale.model';
import { translate, type TranslationKey } from '../i18n/translations';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  private readonly localeSignal = signal<Locale>(DEFAULT_LOCALE);

  readonly locale = this.localeSignal.asReadonly();

  readonly isBR = computed(() => this.locale() === 'BR');

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored === 'BR' || stored === 'EN') {
        this.localeSignal.set(stored);
      }

      this.syncDocumentLang();
    });
  }

  setLocale(locale: Locale): void {
    this.localeSignal.set(locale);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
      this.syncDocumentLang();
    }
  }

  t(key: TranslationKey): string {
    return translate(this.locale(), key);
  }

  private syncDocumentLang(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.document.documentElement.lang = localeToHtmlLang(this.locale());
  }
}
