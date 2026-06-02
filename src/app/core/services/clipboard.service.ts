import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ClipboardService {
  private readonly platformId = inject(PLATFORM_ID);

  async copyText(text: string): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }
}
