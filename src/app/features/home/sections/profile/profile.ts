import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AppIcon } from '@shared/ui/app-icon/app-icon';
import { PROFILE_EMAIL } from '@core/content/profile.content';
import { SOCIAL_LINKS } from '@core/content/social.content';
import { ClipboardService } from '@core/services/clipboard.service';
import { LocaleService } from '@core/services/locale.service';
import { PortfolioContentService } from '@core/services/portfolio-content.service';

@Component({
  selector: 'app-profile',  imports: [AppIcon],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
  protected readonly localeService = inject(LocaleService);
  protected readonly content = inject(PortfolioContentService);
  private readonly clipboard = inject(ClipboardService);

  protected readonly emailAddress = PROFILE_EMAIL;
  protected readonly socialLinks = SOCIAL_LINKS;

  protected readonly emailCopied = signal(false);
  protected readonly emailRevealed = signal(false);

  protected toggleEmail(): void {
    this.emailRevealed.update((revealed) => !revealed);
  }

  protected async copyEmail(event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    const copied = await this.clipboard.copyText(this.emailAddress);
    if (!copied) {
      return;
    }

    this.emailCopied.set(true);
    setTimeout(() => this.emailCopied.set(false), 2000);
  }
}
