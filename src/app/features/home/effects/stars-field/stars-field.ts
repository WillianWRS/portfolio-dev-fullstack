import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
  PLATFORM_ID,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { ConstellationOrb, MeteorStreak, StarParticle } from '../../../../core/models/effects.model';
import {
  createConstellationOrbs,
  createMeteorStreaks,
  createStarParticles,
  createTriggeredMeteor,
} from '../../../../core/effects/particle.factory';

@Component({
  selector: 'app-stars-field',
  standalone: true,
  templateUrl: './stars-field.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarsField {
  private readonly platformId = inject(PLATFORM_ID);

  readonly active = input(true);

  protected readonly cursorOrbX = signal(0);
  protected readonly cursorOrbY = signal(0);
  protected readonly cursorOrbActive = signal(false);

  protected readonly starParticles = signal<StarParticle[]>([]);
  protected readonly constellationOrbs = signal<ConstellationOrb[]>([]);
  protected readonly meteorStreaks = signal<MeteorStreak[]>([]);
  protected readonly triggeredMeteors = signal<MeteorStreak[]>([]);

  private triggeredMeteorSeq = 0;

  constructor() {
    afterNextRender(() => {
      this.starParticles.set(createStarParticles(55));
      this.constellationOrbs.set(createConstellationOrbs(7));
      this.meteorStreaks.set(createMeteorStreaks(6));
    });
  }

  @HostListener('document:pointermove', ['$event'])
  protected onDocumentPointerMove(event: PointerEvent): void {
    if (!this.active() || !isPlatformBrowser(this.platformId)) {
      return;
    }

    this.cursorOrbX.set(event.clientX);
    this.cursorOrbY.set(event.clientY);
    this.cursorOrbActive.set(true);
  }

  spawnTriggeredMeteor(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const id = ++this.triggeredMeteorSeq;
    const meteor = createTriggeredMeteor(id);
    const durationMs = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 350
      : meteor.duration * 1000;

    this.triggeredMeteors.update((meteors) => [...meteors, meteor]);

    window.setTimeout(() => this.removeTriggeredMeteor(id), durationMs + 50);
  }

  resetInteraction(): void {
    this.triggeredMeteors.set([]);
    this.cursorOrbActive.set(false);
  }

  private removeTriggeredMeteor(meteorId: number): void {
    this.triggeredMeteors.update((meteors) => meteors.filter((meteor) => meteor.id !== meteorId));
  }
}
