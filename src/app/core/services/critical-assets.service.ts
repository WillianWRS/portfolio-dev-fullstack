import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, computed, DestroyRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import {
  CRITICAL_ASSETS,
  MOBILE_MAX_WIDTH_PX,
  type ProgressiveAsset,
} from '@core/config/critical-assets.config';

@Injectable({ providedIn: 'root' })
export class CriticalAssetsService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly mobileViewport = signal(false);

  readonly wallAsset = computed<ProgressiveAsset>(() =>
    this.mobileViewport() ? CRITICAL_ASSETS.wallMobile : CRITICAL_ASSETS.wallDesktop,
  );

  readonly profilePhoto = computed(() =>
    this.mobileViewport() ? CRITICAL_ASSETS.profilePhotoMobile : CRITICAL_ASSETS.profilePhoto,
  );

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.mobileViewport.set(this.resolveMobileViewport());
    }

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`);
      const syncViewport = () => this.mobileViewport.set(mediaQuery.matches);

      syncViewport();
      mediaQuery.addEventListener('change', syncViewport);
      this.destroyRef.onDestroy(() => mediaQuery.removeEventListener('change', syncViewport));
    });
  }

  preloadCriticalAssets(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve();
    }

    const wall = this.resolveMobileViewport()
      ? CRITICAL_ASSETS.wallMobile
      : CRITICAL_ASSETS.wallDesktop;
    const profilePhoto = this.resolveMobileViewport()
      ? CRITICAL_ASSETS.profilePhotoMobile
      : CRITICAL_ASSETS.profilePhoto;
    const urls = [
      wall.full,
      wall.lq,
      profilePhoto,
      CRITICAL_ASSETS.brandLogo,
      CRITICAL_ASSETS.habitBuilder.full,
      CRITICAL_ASSETS.habitBuilder.lq,
    ];

    return Promise.all(urls.map((url) => this.loadImage(url))).then(() => undefined);
  }

  private loadImage(src: string): Promise<void> {
    return new Promise((resolve) => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => resolve();
      image.onerror = () => resolve();
      image.src = src;
    });
  }

  private resolveMobileViewport(): boolean {
    if (!isPlatformBrowser(this.platformId) || typeof window.matchMedia !== 'function') {
      return false;
    }

    return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`).matches;
  }
}
