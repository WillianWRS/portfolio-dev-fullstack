import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import type { OnDestroy, OnInit } from '@angular/core';
import { LOADING_MIN_DISPLAY_MS } from '@core/config/critical-assets.config';
import { CriticalAssetsService } from '@core/services/critical-assets.service';
import { LocaleService } from '@core/services/locale.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.html',
  styleUrl: './loading-screen.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingScreen implements OnInit, OnDestroy {
  protected readonly localeService = inject(LocaleService);

  protected readonly dismissed = signal(false);
  /** Só monta o SVG após remover o overlay estático — evita animação rodar oculta no cache quente. */
  protected readonly animationReady = signal(false);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly criticalAssets = inject(CriticalAssetsService);
  private autoDismissTimer: ReturnType<typeof setTimeout> | null = null;
  private preloadReady = false;
  private animationStartedAt: number | null = null;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const onPageShow = (event: PageTransitionEvent) => {
        if (event.persisted && !this.dismissed()) {
          this.restartLogoAnimation();
        }
      };

      window.addEventListener('pageshow', onPageShow);
      this.destroyRef.onDestroy(() => window.removeEventListener('pageshow', onPageShow));

      this.restartLogoAnimation();
    });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    document.documentElement.classList.add('app-loading');
    document.getElementById('app-bootstrap-loading')?.remove();

    void this.criticalAssets.preloadCriticalAssets().then(() => {
      this.preloadReady = true;
      this.scheduleDismiss();
    });
  }

  ngOnDestroy(): void {
    if (this.autoDismissTimer) {
      clearTimeout(this.autoDismissTimer);
    }
  }

  protected dismiss(): void {
    document.documentElement.classList.remove('app-loading');
    this.dismissed.set(true);
  }

  private restartLogoAnimation(): void {
    this.animationReady.set(false);
    this.animationStartedAt = null;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.animationReady.set(true);
        this.animationStartedAt = performance.now();
        this.scheduleDismiss();
      });
    });
  }

  private scheduleDismiss(): void {
    if (!this.preloadReady || this.animationStartedAt === null || this.dismissed()) {
      return;
    }

    if (this.autoDismissTimer) {
      clearTimeout(this.autoDismissTimer);
    }

    const elapsed = performance.now() - this.animationStartedAt;
    const remaining = Math.max(0, LOADING_MIN_DISPLAY_MS - elapsed);
    this.autoDismissTimer = setTimeout(() => this.dismiss(), remaining);
  }
}
