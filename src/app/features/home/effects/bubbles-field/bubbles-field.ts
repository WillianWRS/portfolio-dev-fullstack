import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import type { Bubble } from '@core/models/effects.model';
import { createBubbles, refreshBubble } from '@core/effects/particle.factory';

@Component({
  selector: 'app-bubbles-field',  templateUrl: './bubbles-field.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BubblesField {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly bubbles = signal<Bubble[]>([]);

  constructor() {
    afterNextRender(() => {
      this.bubbles.set(createBubbles(80));

      const intervalId = setInterval(() => {
        this.bubbles.update((items) => items.map((bubble) => refreshBubble(bubble)));
      }, 3000);

      this.destroyRef.onDestroy(() => clearInterval(intervalId));
    });
  }
}
