import { environment } from '../../../environments/environment';

const { appConfig } = environment;

/** Dados de identidade — fonte única em `environment.appConfig` (token `APP_CONFIG`). */
export const PROFILE_NAME = appConfig.profileName;

export const PROFILE_EMAIL = appConfig.profileEmail;

export const PROFILE_PHOTO_URL = appConfig.profilePhotoUrl;

export const CV_URL_BR = appConfig.cvUrlBr;

export const CV_URL_EN = appConfig.cvUrlEn;

export const CALENDAR_URL = appConfig.calendarUrl;

export const GITHUB_REPO_URL = appConfig.githubRepoUrl;
