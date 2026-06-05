import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AppIcon } from '@shared/ui/app-icon/app-icon';
import { PROFILE_EMAIL } from '@core/content/profile.content';
import { LocaleService } from '@core/services/locale.service';
import { PortfolioContentService } from '@core/services/portfolio-content.service';

@Component({
  selector: 'app-contact',
  imports: [AppIcon],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly localeService = inject(LocaleService);
  protected readonly content = inject(PortfolioContentService);
  protected readonly email = PROFILE_EMAIL;
  protected readonly maskedEmail = PROFILE_EMAIL.replace(/^(.{2}).*(@.*)$/, '$1•••••$2');

  protected readonly emailRevealed = signal(false);

  protected toggleEmail(): void {
    this.emailRevealed.update((revealed) => !revealed);
  }
}
