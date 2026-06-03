import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppIcon } from '@shared/ui/app-icon/app-icon';
import { StackChip } from '@shared/ui/stack-chip/stack-chip';
import { LocaleService } from '@core/services/locale.service';
import { PortfolioContentService } from '@core/services/portfolio-content.service';

@Component({
  selector: 'app-stacks',  imports: [AppIcon, StackChip],
  templateUrl: './stacks.html',
  styleUrl: './stacks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Stacks {
  protected readonly localeService = inject(LocaleService);
  protected readonly content = inject(PortfolioContentService);
}
