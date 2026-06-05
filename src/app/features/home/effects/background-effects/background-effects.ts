import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import type { BackgroundEffect } from '@core/models/effects.model';
import { EffectsCoordinatorService } from '@core/services/effects-coordinator.service';
import { AmbientField } from '../ambient-field/ambient-field';
import { BubblesField } from '../bubbles-field/bubbles-field';
import { PulseField } from '../pulse-field/pulse-field';
import { StarsField } from '../stars-field/stars-field';

@Component({
  selector: 'app-background-effects',
  imports: [AmbientField, BubblesField, StarsField, PulseField],
  templateUrl: './background-effects.html',
  styleUrl: '../effects-animations.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'background-effects-host' },
})
export class BackgroundEffects {
  readonly effect = input.required<BackgroundEffect>();

  private readonly coordinator = inject(EffectsCoordinatorService);
  private readonly ambientField = viewChild(AmbientField);
  private readonly starsField = viewChild(StarsField);

  constructor() {
    let isInitialRun = true;

    effect(() => {
      const count = this.coordinator.interaction();
      const point = this.coordinator.interactionPoint();

      if (isInitialRun) {
        isInitialRun = false;
        return;
      }

      if (count === 0) {
        return;
      }

      if (this.effect() === 'ambient' && point) {
        this.ambientField()?.spawnTriggeredRipple(point.x, point.y);
        return;
      }

      if (this.effect() === 'stars') {
        this.starsField()?.spawnTriggeredMeteor();
      }
    });
  }
}
