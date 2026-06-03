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
import { BubblesField } from '../bubbles-field/bubbles-field';
import { PulseField } from '../pulse-field/pulse-field';
import { StarsField } from '../stars-field/stars-field';

@Component({
  selector: 'app-background-effects',
  imports: [BubblesField, StarsField, PulseField],
  templateUrl: './background-effects.html',
  styleUrl: '../effects-animations.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'background-effects-host' },
})
export class BackgroundEffects {
  readonly effect = input.required<BackgroundEffect>();

  private readonly coordinator = inject(EffectsCoordinatorService);
  private readonly starsField = viewChild(StarsField);

  constructor() {
    let isInitialRun = true;

    effect(() => {
      this.coordinator.interaction();

      if (isInitialRun) {
        isInitialRun = false;
        return;
      }

      if (this.effect() === 'stars') {
        this.starsField()?.spawnTriggeredMeteor();
      }
    });
  }
}
