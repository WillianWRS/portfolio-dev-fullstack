import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-progressive-image',
  template: `
    <img
      class="progressive-image__lq"
      [class]="imgClass()"
      [src]="srcLq()"
      [alt]="alt()"
      aria-hidden="true"
      decoding="async"
    />
    <img
      class="progressive-image__full"
      [class.progressive-image__full--loaded]="loaded()"
      [class]="imgClass()"
      [src]="srcFull()"
      [alt]="alt()"
      [width]="width()"
      [height]="height()"
      decoding="async"
      (load)="onFullLoad()"
    />
  `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
        overflow: hidden;
      }

      :host(.progressive-image-host--cover) {
        position: absolute;
        inset: 0;
      }

      .progressive-image__lq,
      .progressive-image__full {
        display: block;
        width: 100%;
        height: 100%;
      }

      :host(.progressive-image-host--cover) .progressive-image__lq,
      :host(.progressive-image-host--cover) .progressive-image__full {
        object-fit: cover;
      }

      .progressive-image__lq {
        transform: scale(1.05);
        filter: blur(12px);
      }

      .progressive-image__full {
        position: absolute;
        inset: 0;
        opacity: 0;
        transition: opacity 0.45s ease;
      }

      .progressive-image__full--loaded {
        opacity: 1;
      }

      @media (prefers-reduced-motion: reduce) {
        .progressive-image__full {
          transition: none;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.progressive-image-host--cover]': 'cover()',
  },
})
export class ProgressiveImage {
  readonly srcFull = input.required<string>();
  readonly srcLq = input.required<string>();
  readonly alt = input('');
  readonly imgClass = input('');
  readonly width = input<number | undefined>(undefined);
  readonly height = input<number | undefined>(undefined);
  readonly cover = input(false);

  protected readonly loaded = signal(false);

  protected onFullLoad(): void {
    this.loaded.set(true);
  }
}
