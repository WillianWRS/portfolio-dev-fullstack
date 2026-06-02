import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppIcon } from '../../../../shared/ui/app-icon/app-icon';
import type { BackgroundEffect } from '../../../../core/models/effects.model';
import { LocaleService } from '../../../../core/services/locale.service';
import type { Locale } from '../../../../core/models/locale.model';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, AppIcon],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader {
  protected readonly localeService = inject(LocaleService);

  protected readonly effectOptions: BackgroundEffect[] = ['bubbles', 'stars', 'pulse'];

  readonly selectedEffect = input.required<BackgroundEffect>();
  readonly effectsMenuOpen = input.required<boolean>();

  readonly effectsMenuToggle = output<void>();
  readonly effectSelect = output<BackgroundEffect>();

  protected localeButtonClass(locale: Locale): string {
    const base =
      'relative z-10 inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50';

    if (this.localeService.locale() === locale) {
      return `${base} text-zinc-950`;
    }

    return `${base} text-zinc-200 hover:text-white`;
  }

  protected effectsToggleButtonClass(): string {
    const base =
      'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950';

    if (this.effectsMenuOpen()) {
      return `${base} border-white bg-zinc-100 text-zinc-950`;
    }

    return `${base} border-zinc-300/80 bg-transparent text-zinc-200 hover:border-white hover:text-white`;
  }

  protected effectButtonClass(effect: BackgroundEffect): string {
    const base =
      'rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950';

    if (this.selectedEffect() === effect) {
      return `${base} border-white bg-zinc-100 text-zinc-950 shadow-sm hover:bg-white`;
    }

    return `${base} border-zinc-300/80 bg-zinc-950/50 text-zinc-200 hover:border-white hover:bg-zinc-900/70 hover:text-white`;
  }

  protected effectLabel(effect: BackgroundEffect): string {
    switch (effect) {
      case 'bubbles':
        return this.localeService.t('effect.bubble');
      case 'stars':
        return this.localeService.t('effect.sky');
      case 'pulse':
        return this.localeService.t('effect.pulse');
    }
  }

  protected selectLocale(locale: Locale): void {
    this.localeService.setLocale(locale);
  }
}
