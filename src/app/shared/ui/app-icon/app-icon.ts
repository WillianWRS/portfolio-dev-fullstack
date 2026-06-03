import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type AppIconName =
  | 'github'
  | 'linkedin'
  | 'email'
  | 'sparkles'
  | 'folder'
  | 'settings'
  | 'check'
  | 'clipboard'
  | 'external-link'
  | 'arrow-right'
  | 'briefcase'
  | 'user'
  | 'quote'
  | 'download'
  | 'x'
  | 'calendar'
  | 'message';

@Component({
  selector: 'app-icon',  templateUrl: './app-icon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'inline-flex shrink-0',
    '[class]': 'hostClass()',
  },
})
export class AppIcon {
  readonly name = input.required<AppIconName>();
  readonly size = input<'sm' | 'md'>('md');
  readonly hostClass = input('');

  protected iconClass(): string {
    return this.size() === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  }
}
