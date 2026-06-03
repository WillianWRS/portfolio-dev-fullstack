import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppIcon } from '@shared/ui/app-icon/app-icon';
import { SOCIAL_LINKS } from '@core/content/social.content';
import { LocaleService } from '@core/services/locale.service';

@Component({
  selector: 'app-about',  imports: [AppIcon],
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly localeService = inject(LocaleService);
  protected readonly githubLink = SOCIAL_LINKS.find((link) => link.icon === 'github')!;
}
