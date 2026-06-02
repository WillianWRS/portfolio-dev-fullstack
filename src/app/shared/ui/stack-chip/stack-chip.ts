import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import type { StackProficiency } from '../../../core/models/stack.model';
import { StackIconService } from '../../../core/services/stack-icon.service';

@Component({
  selector: 'app-stack-chip',
  standalone: true,
  templateUrl: './stack-chip.html',
  styleUrl: './stack-chip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackChip {
  private readonly stackIcons = inject(StackIconService);

  readonly name = input.required<string>();
  readonly iconSlug = input.required<string>();
  readonly proficiencyLabel = input<string>('');
  readonly proficiency = input<StackProficiency | undefined>();

  protected iconUrl(): string {
    return this.stackIcons.iconUrl(this.iconSlug());
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
    const img = event.target as HTMLImageElement;
    img.src = this.stackIcons.cdnIconUrl(this.iconSlug());
    img.onerror = null;
  }
}
