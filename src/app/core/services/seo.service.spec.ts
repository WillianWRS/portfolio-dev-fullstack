import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { APP_CONFIG } from '@core/config/app-config.token';
import { environment } from '../../../environments/environment';
import { LocaleService } from './locale.service';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: APP_CONFIG, useValue: environment.appConfig },
      ],
    });
  });

  it('updates title and description when locale changes', () => {
    TestBed.inject(SeoService);
    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);
    const locale = TestBed.inject(LocaleService);

    locale.setLocale('EN');
    TestBed.flushEffects();

    expect(title.getTitle()).toContain('Portfolio');
    expect(meta.getTag('name="description"')?.content).toContain('Full Stack Developer');

    locale.setLocale('BR');
    TestBed.flushEffects();

    expect(title.getTitle()).toContain('Portfólio');
    expect(meta.getTag('name="description"')?.content).toContain('Desenvolvedor Full Stack');
  });
});
