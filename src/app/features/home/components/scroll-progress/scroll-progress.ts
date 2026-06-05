import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import type { OnDestroy, OnInit } from '@angular/core';
import { LocaleService } from '@core/services/locale.service';

@Component({
  selector: 'app-scroll-progress',
  template: `
    <div
      class="scroll-progress__bar"
      role="progressbar"
      [attr.aria-valuenow]="progress()"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-label]="localeService.t('scroll.progressAria')"
      [style.width.%]="progress()"
    ></div>
  `,
  styles: [
    `
      :host {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 30;
        height: 2px;
        pointer-events: none;
      }

      .scroll-progress__bar {
        height: 100%;
        background: linear-gradient(90deg, rgb(228 228 231), rgb(250 250 250));
        transition: width 0.1s linear;
      }

      @media (prefers-reduced-motion: reduce) {
        .scroll-progress__bar {
          transition: none;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollProgress implements OnInit, OnDestroy {
  protected readonly localeService = inject(LocaleService);

  private readonly platformId = inject(PLATFORM_ID);

  protected readonly progress = signal(0);

  private readonly onScroll = (): void => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const value = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    this.progress.set(Math.round(value));
  };

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    window.removeEventListener('scroll', this.onScroll);
  }
}
