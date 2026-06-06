import type { AppConfig } from '@core/config/app-config.model';

export const environment = {
  production: true,
  appConfig: {
    siteUrl: 'https://willianscabora.dev',
    profileName: 'Willian Robert Scabora',
    profileEmail: 'willian-scabora@hotmail.com',
    profilePhotoUrl: '/foto.png',
    cvUrlBr: '/Willian-Robert-Scabora.pdf',
    cvUrlEn: '/Willian-Robert-Scabora.pdf',
    whatsappUrl: 'https://wa.me/5518996416968',
    githubRepoUrl: 'https://github.com/WillianWRS/portfolio-dev-fullstack',
  } satisfies AppConfig,
};
