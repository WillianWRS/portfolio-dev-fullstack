import { afterNextRender, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingScreen } from './shared/loading-screen/loading-screen';

const LOADING_DURATION_MS = 1500;
const TRANSITION_MS = 550;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingScreen],
  template: `
    @if (showLoading()) {
      <app-loading-screen [exiting]="isTransitioning()" />
    }

    <div class="app-main" [class.app-main--visible]="contentVisible()">
      <router-outlet />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .app-main {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.55s ease;
        will-change: opacity;
      }

      .app-main--visible {
        opacity: 1;
        pointer-events: auto;
      }

      @media (prefers-reduced-motion: reduce) {
        .app-main {
          transition: none;
        }
      }
    `,
  ],
})
export class App {
  protected readonly showLoading = signal(true);
  protected readonly isTransitioning = signal(false);
  protected readonly contentVisible = signal(false);

  constructor() {
    afterNextRender(() => {
      setTimeout(() => this.startExitTransition(), LOADING_DURATION_MS);
    });
  }

  private startExitTransition(): void {
    this.isTransitioning.set(true);
    this.contentVisible.set(true);

    setTimeout(() => this.showLoading.set(false), TRANSITION_MS);
  }
}
