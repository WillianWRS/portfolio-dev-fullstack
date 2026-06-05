import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LocaleService } from '@core/services/locale.service';
import { EffectsCoordinatorService } from '@core/services/effects-coordinator.service';
import { ScrollProgress } from './components/scroll-progress/scroll-progress';
import { BackgroundEffects } from './effects/background-effects/background-effects';
import { Contact } from './sections/contact/contact';
import { Experience } from './sections/experience/experience';
import { Profile } from './sections/profile/profile';
import { Projects } from './sections/projects/projects';
import { SiteFooter } from './sections/site-footer/site-footer';
import { SiteHeader } from './sections/site-header/site-header';
import { Stacks } from './sections/stacks/stacks';
import { Testimonials } from './sections/testimonials/testimonials';

@Component({
  selector: 'app-home',
  imports: [
    ScrollProgress,
    BackgroundEffects,
    SiteHeader,
    Profile,
    Projects,
    Experience,
    Stacks,
    Testimonials,
    Contact,
    SiteFooter,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly localeService = inject(LocaleService);

  private readonly effects = inject(EffectsCoordinatorService);

  /** Interação no fundo: onda de luz quente no ponto do clique. */
  protected onMainClick(event: MouseEvent): void {
    if (event.target !== event.currentTarget) {
      return;
    }

    this.effects.registerInteraction({ x: event.clientX, y: event.clientY });
  }
}
