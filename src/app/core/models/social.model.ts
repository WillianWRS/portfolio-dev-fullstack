export type SocialIcon = 'github' | 'linkedin' | 'email';

export interface SocialLink {
  label: string;
  url: string;
  icon: SocialIcon;
}
