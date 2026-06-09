import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import type { OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppIcon } from '@shared/ui/app-icon/app-icon';
import type { TranslationKey } from '@core/i18n/translations';
import { LocaleService } from '@core/services/locale.service';
import type { Locale } from '@core/models/locale.model';

interface NavItem {
  id: string;
  href: string;
  labelKey: TranslationKey;
}

interface NavIndicatorMetrics {
  left: number;
  top: number;
  width: number;
  height: number;
}

const INDICATOR_INITIAL: NavIndicatorMetrics = { left: 0, top: 0, width: 0, height: 0 };

const MOBILE_MENU_CLOSE_MS = 280;

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, AppIcon],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader implements OnDestroy {
  protected readonly localeService = inject(LocaleService);
  protected readonly mobileMenuPresent = signal(false);
  protected readonly mobileMenuOpen = signal(false);

  protected readonly desktopIndicator = signal<NavIndicatorMetrics>(INDICATOR_INITIAL);
  protected readonly desktopIndicatorActive = signal(false);
  protected readonly desktopIndicatorSliding = signal(false);

  protected readonly mobileIndicator = signal<NavIndicatorMetrics>(INDICATOR_INITIAL);
  protected readonly mobileIndicatorActive = signal(false);
  protected readonly mobileIndicatorSliding = signal(false);

  protected readonly navItems: NavItem[] = [
    { id: 'profile', href: '#profile', labelKey: 'nav.about' },
    { id: 'projects', href: '#projects', labelKey: 'nav.projects' },
    { id: 'experience', href: '#experience', labelKey: 'nav.experience' },
    { id: 'stacks', href: '#stacks', labelKey: 'nav.stacks' },
    { id: 'testimonials', href: '#testimonials', labelKey: 'nav.testimonials' },
    { id: 'contact', href: '#contact', labelKey: 'nav.contact' },
  ];

  private desktopHoveredLink: HTMLElement | null = null;
  private mobileHoveredLink: HTMLElement | null = null;
  private mobileMenuCloseTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      this.localeService.locale();

      if (this.desktopIndicatorActive() && this.desktopHoveredLink) {
        queueMicrotask(() => this.syncDesktopIndicator(this.desktopHoveredLink!));
      }

      if (this.mobileIndicatorActive() && this.mobileHoveredLink) {
        queueMicrotask(() => this.syncMobileIndicator(this.mobileHoveredLink!));
      }
    });
  }

  protected localeButtonClass(locale: Locale): string {
    const base =
      'relative z-10 inline-flex items-center justify-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 lg:px-3';

    if (this.localeService.locale() === locale) {
      return `${base} text-zinc-950`;
    }

    return `${base} text-zinc-200 hover:text-white`;
  }

  protected selectLocale(locale: Locale): void {
    this.localeService.setLocale(locale);
  }

  protected toggleMobileMenu(): void {
    if (this.mobileMenuPresent()) {
      this.closeMobileMenu();
      return;
    }

    this.mobileMenuPresent.set(true);
    requestAnimationFrame(() => this.mobileMenuOpen.set(true));
  }

  protected closeMobileMenu(): void {
    if (!this.mobileMenuPresent()) {
      return;
    }

    this.mobileMenuOpen.set(false);
    this.hideMobileIndicator();

    if (this.mobileMenuCloseTimer) {
      clearTimeout(this.mobileMenuCloseTimer);
    }

    this.mobileMenuCloseTimer = setTimeout(() => {
      this.mobileMenuPresent.set(false);
      this.mobileMenuCloseTimer = null;
    }, MOBILE_MENU_CLOSE_MS);
  }

  ngOnDestroy(): void {
    if (this.mobileMenuCloseTimer) {
      clearTimeout(this.mobileMenuCloseTimer);
    }
  }

  protected onDesktopNavEnter(event: MouseEvent): void {
    const link = event.currentTarget;
    if (!(link instanceof HTMLElement)) {
      return;
    }

    this.desktopHoveredLink = link;
    this.syncDesktopIndicator(link);
  }

  protected onDesktopNavLeave(): void {
    this.desktopHoveredLink = null;
    this.desktopIndicatorSliding.set(false);
    this.desktopIndicatorActive.set(false);
  }

  protected onMobileNavEnter(event: MouseEvent): void {
    const link = event.currentTarget;
    if (!(link instanceof HTMLElement)) {
      return;
    }

    this.mobileHoveredLink = link;
    this.syncMobileIndicator(link);
  }

  protected onMobileNavLeave(): void {
    this.mobileHoveredLink = null;
    this.hideMobileIndicator();
  }

  private syncDesktopIndicator(link: HTMLElement): void {
    const nav = link.closest('.site-nav');
    if (!(nav instanceof HTMLElement)) {
      return;
    }

    this.moveIndicator(
      link,
      nav,
      this.desktopIndicator,
      this.desktopIndicatorActive,
      this.desktopIndicatorSliding,
    );
  }

  private syncMobileIndicator(link: HTMLElement): void {
    const nav = link.closest('.mobile-menu');
    if (!(nav instanceof HTMLElement)) {
      return;
    }

    this.moveIndicator(
      link,
      nav,
      this.mobileIndicator,
      this.mobileIndicatorActive,
      this.mobileIndicatorSliding,
    );
  }

  private hideMobileIndicator(): void {
    this.mobileHoveredLink = null;
    this.mobileIndicatorSliding.set(false);
    this.mobileIndicatorActive.set(false);
  }

  private moveIndicator(
    link: HTMLElement,
    nav: HTMLElement,
    metricsSignal: ReturnType<typeof signal<NavIndicatorMetrics>>,
    activeSignal: ReturnType<typeof signal<boolean>>,
    slidingSignal: ReturnType<typeof signal<boolean>>,
  ): void {
    const metrics = this.measureIndicator(link, nav);
    const wasActive = activeSignal();

    if (wasActive) {
      slidingSignal.set(true);
      metricsSignal.set(metrics);
      activeSignal.set(true);
      return;
    }

    slidingSignal.set(false);
    metricsSignal.set(metrics);
    activeSignal.set(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => activeSignal.set(true));
    });
  }

  private measureIndicator(link: HTMLElement, nav: HTMLElement): NavIndicatorMetrics {
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    return {
      left: linkRect.left - navRect.left,
      top: linkRect.top - navRect.top,
      width: linkRect.width,
      height: linkRect.height,
    };
  }
}
