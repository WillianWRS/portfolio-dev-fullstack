import { APP_CONFIG } from '@core/config/app-config.token';
import { environment } from '../../environments/environment';

export const provideTestAppConfig = () => ({
  provide: APP_CONFIG,
  useValue: environment.appConfig,
});
