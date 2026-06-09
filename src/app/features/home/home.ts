import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CriticalAssetsService } from '@core/services/critical-assets.service';
import { LocaleService } from '@core/services/locale.service';
import { EffectsCoordinatorService } from '@core/services/effects-coordinator.service';
import { ProgressiveImage } from '@shared/ui/progressive-image/progressive-image';
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
    ProgressiveImage,
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
  protected readonly criticalAssets = inject(CriticalAssetsService);

  private readonly effects = inject(EffectsCoordinatorService);

  /** Interação no fundo: onda de luz quente no ponto do clique. */
  protected onMainClick(event: MouseEvent): void {
    if (this.criticalAssets.mobileViewport()) {
      return;
    }

    if (event.target !== event.currentTarget) {
      return;
    }

    this.effects.registerInteraction({ x: event.clientX, y: event.clientY });
  }
}
