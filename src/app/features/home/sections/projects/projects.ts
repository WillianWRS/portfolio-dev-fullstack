import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AppIcon } from '../../../../shared/ui/app-icon/app-icon';
import { LocaleService } from '../../../../core/services/locale.service';
import { PortfolioContentService } from '../../../../core/services/portfolio-content.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [AppIcon],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly localeService = inject(LocaleService);
  protected readonly content = inject(PortfolioContentService);

  protected readonly selectedIndex = signal(0);

  protected selectProject(index: number): void {
    this.selectedIndex.set(index);
  }
}
