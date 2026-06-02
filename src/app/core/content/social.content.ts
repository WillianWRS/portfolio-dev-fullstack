import { PROFILE_EMAIL } from './profile.content';
import type { SocialLink } from '../models/social.model';

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/WillianWRS', icon: 'github' },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/willian-robert-scabora-85a94217b/',
    icon: 'linkedin',
  },
  {
    label: 'Email',
    url: `mailto:${PROFILE_EMAIL}`,
    icon: 'email',
  },
];
