import { Injectable, signal } from '@angular/core';

/**
 * Seam de desacoplamento entre a página e os efeitos de fundo.
 * A página apenas sinaliza uma interação; os efeitos decidem como reagir,
 * sem que `Home` conheça os detalhes internos dos campos de partículas.
 */
@Injectable({ providedIn: 'root' })
export class EffectsCoordinatorService {
  private readonly interactionSignal = signal(0);

  /** Contador monotônico de interações do usuário com a área principal. */
  readonly interaction = this.interactionSignal.asReadonly();

  registerInteraction(): void {
    this.interactionSignal.update((count) => count + 1);
  }
}
