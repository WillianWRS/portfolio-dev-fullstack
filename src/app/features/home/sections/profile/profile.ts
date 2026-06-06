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
  protected readonly emailCopyFailed = signal(false);

  private emailFeedbackTimer: ReturnType<typeof setTimeout> | null = null;

  protected async copyEmail(event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    const copied = await this.clipboard.copyText(this.emailAddress);
    this.showEmailFeedback(copied ? 'copied' : 'failed');
  }

  private showEmailFeedback(result: 'copied' | 'failed'): void {
    if (this.emailFeedbackTimer) {
      clearTimeout(this.emailFeedbackTimer);
    }

    this.emailCopied.set(result === 'copied');
    this.emailCopyFailed.set(result === 'failed');

    this.emailFeedbackTimer = setTimeout(() => {
      this.emailCopied.set(false);
      this.emailCopyFailed.set(false);
      this.emailFeedbackTimer = null;
    }, 2400);
  }
}
