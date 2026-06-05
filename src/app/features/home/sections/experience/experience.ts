import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AppIcon } from '@shared/ui/app-icon/app-icon';
import { LocaleService } from '@core/services/locale.service';
import { PortfolioContentService } from '@core/services/portfolio-content.service';

const MAX_VISIBLE_HIGHLIGHTS = 4;

@Component({
  selector: 'app-experience',
  imports: [AppIcon],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  protected readonly localeService = inject(LocaleService);
  protected readonly content = inject(PortfolioContentService);

  private readonly expandedItems = signal<ReadonlySet<string>>(new Set());

  protected visibleHighlights(item: { id: string; highlights: readonly string[] }): readonly string[] {
    if (item.highlights.length <= MAX_VISIBLE_HIGHLIGHTS || this.expandedItems().has(item.id)) {
      return item.highlights;
    }

    return item.highlights.slice(0, MAX_VISIBLE_HIGHLIGHTS);
  }

  protected canExpand(item: { id: string; highlights: readonly string[] }): boolean {
    return item.highlights.length > MAX_VISIBLE_HIGHLIGHTS;
  }

  protected isExpanded(id: string): boolean {
    return this.expandedItems().has(id);
  }

  protected toggleExpanded(id: string): void {
    this.expandedItems.update((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }
}
