import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LocaleService } from '@core/services/locale.service';
import { EffectsCoordinatorService } from '@core/services/effects-coordinator.service';
import { BackgroundEffects } from './effects/background-effects/background-effects';
import { About } from './sections/about/about';
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
    BackgroundEffects,
    SiteHeader,
    Profile,
    About,
    Experience,
    Projects,
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

  /** Easter egg: meteoro ao clicar no fundo do main, sem capturar cliques em filhos. */
  protected onMainClick(event: MouseEvent): void {
    if (event.target !== event.currentTarget) {
      return;
    }

    this.effects.registerInteraction();
  }
}
