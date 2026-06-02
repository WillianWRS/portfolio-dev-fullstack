import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import type { BackgroundEffect } from '../../core/models/effects.model';
import { LocaleService } from '../../core/services/locale.service';
import { BackgroundEffects } from './effects/background-effects/background-effects';
import { Profile } from './sections/profile/profile';
import { Projects } from './sections/projects/projects';
import { SiteHeader } from './sections/site-header/site-header';
import { Stacks } from './sections/stacks/stacks';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BackgroundEffects,
    SiteHeader,
    Profile,
    Projects,
    Stacks,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly localeService = inject(LocaleService);

  private readonly backgroundEffects = viewChild(BackgroundEffects);

  protected readonly selectedEffect = signal<BackgroundEffect>('stars');
  protected readonly effectsMenuOpen = signal(false);

  protected onMainClick(): void {
    this.backgroundEffects()?.handleMainClick();
  }

  protected toggleEffectsMenu(): void {
    this.effectsMenuOpen.update((open) => !open);
  }

  protected selectEffect(effect: BackgroundEffect): void {
    this.selectedEffect.set(effect);
    this.effectsMenuOpen.set(false);
    this.backgroundEffects()?.onEffectChange(effect);
  }
}
