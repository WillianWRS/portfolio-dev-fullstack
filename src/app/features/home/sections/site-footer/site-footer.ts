import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppIcon } from '../../../../shared/ui/app-icon/app-icon';
import { SOCIAL_LINKS } from '../../../../core/content/social.content';
import { LocaleService } from '../../../../core/services/locale.service';
import { PortfolioContentService } from '../../../../core/services/portfolio-content.service';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [AppIcon],
  templateUrl: './site-footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  protected readonly localeService = inject(LocaleService);
  protected readonly content = inject(PortfolioContentService);
  protected readonly socialLinks = SOCIAL_LINKS.filter((link) => link.icon !== 'email');
}
