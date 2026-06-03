import type { Locale } from '@core/models/locale.model';

export interface SeoMeta {
  title: string;
  description: string;
  ogDescription: string;
}

const BR: SeoMeta = {
  title: 'Portfólio WRS — Willian Robert Scabora',
  description:
    'Portfólio de Willian Robert Scabora — Desenvolvedor Full Stack. Angular, Node.js, Java e arquitetura de software.',
  ogDescription:
    'Desenvolvedor Full Stack focado em arquiteturas robustas, interfaces limpas e código performático.',
};

const EN: SeoMeta = {
  title: 'WRS Portfolio — Willian Robert Scabora',
  description:
    'Portfolio of Willian Robert Scabora — Full Stack Developer. Angular, Node.js, Java, and software architecture.',
  ogDescription:
    'Full Stack developer focused on robust architectures, clean interfaces, and performant code.',
};

export const SEO_META: Record<Locale, SeoMeta> = { BR, EN };
