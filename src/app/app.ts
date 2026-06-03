import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from '@core/services/seo.service';
import { LoadingScreen } from './shared/loading-screen/loading-screen';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingScreen],
  template: `
    <app-loading-screen />
    <router-outlet />
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  constructor() {
    /** Inicializa metadados dinâmicos reativos ao locale. */
    inject(SeoService);
  }
}
