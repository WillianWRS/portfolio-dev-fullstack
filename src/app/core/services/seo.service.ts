import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { APP_CONFIG } from '@core/config/app-config.token';
import { SEO_META } from '@core/i18n/seo-meta';
import { LocaleService } from './locale.service';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly localeService = inject(LocaleService);
  private readonly appConfig = inject(APP_CONFIG);

  constructor() {
    effect(() => {
      this.apply(this.localeService.locale());
    });
  }

  private apply(locale: ReturnType<LocaleService['locale']>): void {
    const seo = SEO_META[locale];
    const imageUrl = `${this.appConfig.siteUrl}${this.appConfig.profilePhotoUrl}`;

    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.ogDescription });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:url', content: this.appConfig.siteUrl });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.ogDescription });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });

    this.updateJsonLd(seo.description);
  }

  private updateJsonLd(description: string): void {
    const script = this.document.getElementById('portfolio-json-ld');
    if (!script) {
      return;
    }

    const payload = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: this.appConfig.profileName,
      jobTitle: 'Full Stack Developer',
      description,
      url: this.appConfig.siteUrl,
      image: `${this.appConfig.siteUrl}${this.appConfig.profilePhotoUrl}`,
      sameAs: [
        'https://github.com/WillianWRS',
        'https://www.linkedin.com/in/willian-robert-scabora-85a94217b/',
      ],
      knowsAbout: ['Angular', 'Java', 'Spring Boot', 'Node.js', 'TypeScript', 'Clean Architecture'],
    };

    script.textContent = JSON.stringify(payload);
  }
}
