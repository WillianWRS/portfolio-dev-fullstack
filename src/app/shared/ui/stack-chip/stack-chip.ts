import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
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

  protected iconUrl(): string {
    return this.stackIcons.iconUrl(this.iconSlug());
  }

  protected onIconError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.stackIcons.cdnIconUrl(this.iconSlug());
    img.onerror = null;
  }
}
