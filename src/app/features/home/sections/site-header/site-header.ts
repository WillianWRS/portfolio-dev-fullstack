import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { TranslationKey } from '@core/i18n/translations';
import { LocaleService } from '@core/services/locale.service';
import type { Locale } from '@core/models/locale.model';

interface NavItem {
  id: string;
  href: string;
  labelKey: TranslationKey;
}

@Component({
  selector: 'app-site-header',  imports: [RouterLink],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader {
  protected readonly localeService = inject(LocaleService);

  protected readonly navItems: NavItem[] = [
    { id: 'projects', href: '#projects', labelKey: 'nav.projects' },
    { id: 'experience', href: '#experience', labelKey: 'nav.experience' },
    { id: 'stacks', href: '#stacks', labelKey: 'nav.stacks' },
    { id: 'contact', href: '#contact', labelKey: 'nav.contact' },
  ];

  protected localeButtonClass(locale: Locale): string {
    const base =
      'relative z-10 inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50';

    if (this.localeService.locale() === locale) {
      return `${base} text-zinc-950`;
    }

    return `${base} text-zinc-200 hover:text-white`;
  }

  protected selectLocale(locale: Locale): void {
    this.localeService.setLocale(locale);
  }
}
