import {
  type ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withIncrementalHydration } from '@angular/platform-browser';

import { routes } from './app.routes';
import { APP_CONFIG } from '@core/config/app-config.token';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withIncrementalHydration()),
    { provide: APP_CONFIG, useValue: environment.appConfig },
  ],
};
