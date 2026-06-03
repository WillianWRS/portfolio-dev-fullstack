import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import type { RipplePulse } from '@core/models/effects.model';
import { createRipplePulses } from '@core/effects/particle.factory';

@Component({
  selector: 'app-pulse-field',  templateUrl: './pulse-field.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PulseField {
  protected readonly ripplePulses = signal<RipplePulse[]>([]);

  constructor() {
    afterNextRender(() => {
      this.ripplePulses.set(createRipplePulses(14));
    });
  }
}
