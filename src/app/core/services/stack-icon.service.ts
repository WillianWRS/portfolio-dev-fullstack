import { Injectable } from '@angular/core';

const CDN_BASE = 'https://cdn.simpleicons.org';

@Injectable({ providedIn: 'root' })
export class StackIconService {
  /** Prefer local icons under /icons/stacks/; falls back to CDN when file is missing. */
  iconUrl(slug: string): string {
    return `/icons/stacks/${slug}.svg`;
  }

  cdnIconUrl(slug: string): string {
    return `${CDN_BASE}/${slug}`;
  }
}
