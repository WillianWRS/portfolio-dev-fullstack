import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppIcon } from '../../../../shared/ui/app-icon/app-icon';
import { PROFILE_EMAIL } from '../../../../core/content/profile.content';
import { LocaleService } from '../../../../core/services/locale.service';
import { PortfolioContentService } from '../../../../core/services/portfolio-content.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [AppIcon],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly localeService = inject(LocaleService);
  protected readonly content = inject(PortfolioContentService);
  protected readonly email = PROFILE_EMAIL;
}
