import { Injectable, signal } from '@angular/core';

export interface InteractionPoint {
  x: number;
  y: number;
}

/**
 * Seam de desacoplamento entre a página e os efeitos de fundo.
 * A página apenas sinaliza uma interação; os efeitos decidem como reagir,
 * sem que `Home` conheça os detalhes internos dos campos de partículas.
 */
@Injectable({ providedIn: 'root' })
export class EffectsCoordinatorService {
  private readonly interactionSignal = signal(0);
  private readonly interactionPointSignal = signal<InteractionPoint | null>(null);

  /** Contador monotônico de interações do usuário com a área principal. */
  readonly interaction = this.interactionSignal.asReadonly();
  readonly interactionPoint = this.interactionPointSignal.asReadonly();

  registerInteraction(point?: InteractionPoint): void {
    if (point) {
      this.interactionPointSignal.set(point);
    }

    this.interactionSignal.update((count) => count + 1);
  }
}
