import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  PLATFORM_ID,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EFFECTS_CONFIG } from '@core/effects/effects.config';
import type { AmbientMote, WarmGlowOrb, WarmRipple } from '@core/models/effects.model';
import {
  createAmbientMotes,
  createTriggeredWarmRipple,
  createWarmGlowOrbs,
} from '@core/effects/particle.factory';

@Component({
  selector: 'app-ambient-field',
  templateUrl: './ambient-field.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmbientField {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly active = input(true);

  protected readonly cursorGlowX = signal(0);
  protected readonly cursorGlowY = signal(0);
  protected readonly cursorGlowActive = signal(false);

  protected readonly dustMotes = signal<AmbientMote[]>([]);
  protected readonly warmOrbs = signal<WarmGlowOrb[]>([]);
  protected readonly triggeredRipples = signal<WarmRipple[]>([]);

  private triggeredRippleSeq = 0;
  private pointerRafId = 0;
  private pendingPointerX = 0;
  private pendingPointerY = 0;

  constructor() {
    afterNextRender(() => {
      const { ambient } = EFFECTS_CONFIG;
      this.dustMotes.set(createAmbientMotes(ambient.moteCount));
      this.warmOrbs.set(createWarmGlowOrbs(ambient.glowOrbCount));

      if (isPlatformBrowser(this.platformId)) {
        const onPointerMove = (event: PointerEvent) => this.schedulePointerUpdate(event);
        document.addEventListener('pointermove', onPointerMove, { passive: true });
        this.destroyRef.onDestroy(() => {
          document.removeEventListener('pointermove', onPointerMove);
          if (this.pointerRafId) {
            cancelAnimationFrame(this.pointerRafId);
          }
        });
      }
    });
  }

  spawnTriggeredRipple(x: number, y: number): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const id = ++this.triggeredRippleSeq;
    const ripple = createTriggeredWarmRipple(id, x, y);
    const { triggeredRippleDurationMinMs } = EFFECTS_CONFIG.ambient;
    const durationMs = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? triggeredRippleDurationMinMs
      : ripple.duration * 1000;

    this.triggeredRipples.update((ripples) => [...ripples, ripple]);

    window.setTimeout(() => this.removeTriggeredRipple(id), durationMs + 50);
  }

  resetInteraction(): void {
    this.triggeredRipples.set([]);
    this.cursorGlowActive.set(false);
  }

  private schedulePointerUpdate(event: PointerEvent): void {
    if (!this.active()) {
      return;
    }

    this.pendingPointerX = event.clientX;
    this.pendingPointerY = event.clientY;

    if (this.pointerRafId) {
      return;
    }

    this.pointerRafId = requestAnimationFrame(() => {
      this.pointerRafId = 0;
      this.cursorGlowX.set(this.pendingPointerX);
      this.cursorGlowY.set(this.pendingPointerY);
      this.cursorGlowActive.set(true);
    });
  }

  private removeTriggeredRipple(rippleId: number): void {
    this.triggeredRipples.update((ripples) => ripples.filter((ripple) => ripple.id !== rippleId));
  }
}
