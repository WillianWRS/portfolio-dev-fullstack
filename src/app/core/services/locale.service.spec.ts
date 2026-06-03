import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LOCALE_STORAGE_KEY } from '@core/models/locale.model';
import { LocaleService } from './locale.service';

describe('LocaleService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = '';

    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });
  });

  it('defaults to BR', () => {
    const service = TestBed.inject(LocaleService);
    expect(service.locale()).toBe('BR');
    expect(service.isBR()).toBe(true);
  });

  it('setLocale updates locale, persistence and document lang', () => {
    const service = TestBed.inject(LocaleService);

    service.setLocale('EN');

    expect(service.locale()).toBe('EN');
    expect(service.isBR()).toBe(false);
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('EN');
    expect(document.documentElement.lang).toBe('en');
  });

  it('t returns localized strings for the active locale', () => {
    const service = TestBed.inject(LocaleService);

    expect(service.t('skipToContent')).toBe('Ir para o conteúdo');

    service.setLocale('EN');
    expect(service.t('skipToContent')).toBe('Skip to content');
  });
});
