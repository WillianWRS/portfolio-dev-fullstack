import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import type { StackProficiency } from '@core/models/stack.model';
import { StackIconService } from '@core/services/stack-icon.service';

@Component({
  selector: 'app-stack-chip',  templateUrl: './stack-chip.html',
  styleUrl: './stack-chip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackChip {
  private readonly stackIcons = inject(StackIconService);

  readonly name = input.required<string>();
  readonly iconSlug = input<string>();
  readonly size = input<'sm' | 'md'>('md');
  readonly proficiencyLabel = input<string>('');
  readonly proficiency = input<StackProficiency | undefined>();

  protected chipClass(): string {
    return this.size() === 'sm'
      ? 'stack-chip stack-chip--sm inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm'
      : 'stack-chip inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-base font-medium text-zinc-700 shadow-sm';
  }

  protected iconClass(): string {
    return this.size() === 'sm' ? 'stack-chip__icon h-4 w-4 shrink-0 object-contain' : 'stack-chip__icon h-6 w-6 shrink-0 object-contain';
  }

  protected hasIcon(): boolean {
    return !!this.iconSlug();
  }

  protected iconUrl(): string {
    return this.stackIcons.iconUrl(this.iconSlug()!);
  }

  protected proficiencyShort(): string {
    switch (this.proficiency()) {
      case 'daily':
        return 'PRO';
      case 'familiar':
        return 'FAM';
      case 'learning':
        return 'NEW';
      default:
        return '';
    }
  }

  protected proficiencyClass(): string {
    switch (this.proficiency()) {
      case 'daily':
        return 'bg-emerald-100 text-emerald-700';
      case 'familiar':
        return 'bg-sky-100 text-sky-700';
      case 'learning':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-zinc-100 text-zinc-600';
    }
  }

  protected onIconError(event: Event): void {
    const slug = this.iconSlug();
    if (!slug) {
      return;
    }

    const img = event.target as HTMLImageElement;
    img.src = this.stackIcons.cdnIconUrl(slug);
    img.onerror = null;
  }
}
