import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import type { BackgroundEffect } from '../../../../core/models/effects.model';
import { BubblesField } from '../bubbles-field/bubbles-field';
import { PulseField } from '../pulse-field/pulse-field';
import { StarsField } from '../stars-field/stars-field';

@Component({
  selector: 'app-background-effects',
  standalone: true,
  imports: [BubblesField, StarsField, PulseField],
  templateUrl: './background-effects.html',
  styleUrl: '../effects-animations.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'background-effects-host' },
})
export class BackgroundEffects {
  readonly effect = input.required<BackgroundEffect>();

  @ViewChild(StarsField) private readonly starsField?: StarsField;

  handleMainClick(): void {
    if (this.effect() === 'stars') {
      this.starsField?.spawnTriggeredMeteor();
    }
  }

  onEffectChange(effect: BackgroundEffect): void {
    if (effect !== 'stars') {
      this.starsField?.resetInteraction();
    }
  }
}
