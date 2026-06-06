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
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.html',
  styleUrl: './loading-screen.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.loading-screen-host--dismissed]': 'dismissed()',
  },
})
export class LoadingScreen implements OnInit, OnDestroy {
  protected readonly localeService = inject(LocaleService);

  protected readonly dismissed = signal(false);

  private readonly platformId = inject(PLATFORM_ID);
  private autoDismissTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.dismissed.set(true);
      return;
    }

    this.autoDismissTimer = setTimeout(() => this.dismiss(), 1200);
  }

  ngOnDestroy(): void {
    if (this.autoDismissTimer) {
      clearTimeout(this.autoDismissTimer);
    }
  }

  protected dismiss(): void {
    this.dismissed.set(true);
  }
}
