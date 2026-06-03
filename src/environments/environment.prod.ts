import type { AppConfig } from '@core/config/app-config.model';

export const environment = {
  production: true,
  appConfig: {
    siteUrl: 'https://willianscabora.dev',
    profileName: 'Willian Robert Scabora',
    profileEmail: 'willian-scabora@hotmail.com',
    profilePhotoUrl: '/foto.png',
    cvUrlBr: '/cv-wrs-pt.pdf',
    cvUrlEn: '/cv-wrs-en.pdf',
    calendarUrl: 'https://cal.com/willian-scabora/30min',
    githubRepoUrl: 'https://github.com/WillianWRS/portfolio-dev-fullstack',
  } satisfies AppConfig,
};
