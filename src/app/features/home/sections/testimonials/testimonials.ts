import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppIcon } from '@shared/ui/app-icon/app-icon';
import { LocaleService } from '@core/services/locale.service';
import { PortfolioContentService } from '@core/services/portfolio-content.service';

@Component({
  selector: 'app-testimonials',
  imports: [AppIcon],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Testimonials {
  protected readonly localeService = inject(LocaleService);
  protected readonly content = inject(PortfolioContentService);
}
