import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppIcon } from '@shared/ui/app-icon/app-icon';
import { LocaleService } from '@core/services/locale.service';
import { PortfolioContentService } from '@core/services/portfolio-content.service';

@Component({
  selector: 'app-testimonials',
  imports: [AppIcon],
  templateUrl: './testimonials.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Testimonials {
  protected readonly localeService = inject(LocaleService);
  protected readonly content = inject(PortfolioContentService);

  protected initials(author: string): string {
    return author
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
}
