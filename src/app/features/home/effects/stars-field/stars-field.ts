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
import type { ConstellationOrb, MeteorStreak, StarParticle } from '@core/models/effects.model';
import {
  createConstellationOrbs,
  createMeteorStreaks,
  createStarParticles,
  createTriggeredMeteor,
} from '@core/effects/particle.factory';

@Component({
  selector: 'app-stars-field',
  templateUrl: './stars-field.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarsField {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly active = input(true);

  protected readonly cursorOrbX = signal(0);
  protected readonly cursorOrbY = signal(0);
  protected readonly cursorOrbActive = signal(false);

  protected readonly starParticles = signal<StarParticle[]>([]);
  protected readonly constellationOrbs = signal<ConstellationOrb[]>([]);
  protected readonly meteorStreaks = signal<MeteorStreak[]>([]);
  protected readonly triggeredMeteors = signal<MeteorStreak[]>([]);

  private triggeredMeteorSeq = 0;
  private pointerRafId = 0;
  private pendingPointerX = 0;
  private pendingPointerY = 0;

  constructor() {
    afterNextRender(() => {
      const { stars } = EFFECTS_CONFIG;
      this.starParticles.set(createStarParticles(stars.particleCount));
      this.constellationOrbs.set(createConstellationOrbs(stars.constellationOrbCount));
      this.meteorStreaks.set(createMeteorStreaks(stars.meteorCount));

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

  spawnTriggeredMeteor(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const id = ++this.triggeredMeteorSeq;
    const meteor = createTriggeredMeteor(id);
    const { triggeredMeteorDurationMinMs } = EFFECTS_CONFIG.stars;
    const durationMs = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? triggeredMeteorDurationMinMs
      : meteor.duration * 1000;

    this.triggeredMeteors.update((meteors) => [...meteors, meteor]);

    window.setTimeout(() => this.removeTriggeredMeteor(id), durationMs + 50);
  }

  resetInteraction(): void {
    this.triggeredMeteors.set([]);
    this.cursorOrbActive.set(false);
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
      this.cursorOrbX.set(this.pendingPointerX);
      this.cursorOrbY.set(this.pendingPointerY);
      this.cursorOrbActive.set(true);
    });
  }

  private removeTriggeredMeteor(meteorId: number): void {
    this.triggeredMeteors.update((meteors) => meteors.filter((meteor) => meteor.id !== meteorId));
  }
}
