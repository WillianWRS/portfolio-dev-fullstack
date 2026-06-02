import type { Locale } from '../models/locale.model';

export type TranslationKey =
  | 'profile.title'
  | 'profile.bio'
  | 'photo.altPrefix'
  | 'effect.bubble'
  | 'effect.sky'
  | 'effect.pulse'
  | 'projects.heading'
  | 'projects.subtitle'
  | 'projects.underConstruction'
  | 'projects.access'
  | 'stacks.heading'
  | 'stacks.subtitle'
  | 'footer.text'
  | 'locale.groupAria'
  | 'effects.toggleAria'
  | 'email.copyAria'
  | 'email.toggleAria';

const BR: Record<TranslationKey, string> = {
  'profile.title': 'Desenvolvedor Full Stack Pleno',
  'profile.bio':
    'Desenvolvedor focado em criar arquiteturas robustas, interfaces limpas e código performático. Trabalho com Angular, Node.js e Java, aplicando princípios de Clean Architecture, Domain-Driven Design e práticas de engenharia que priorizam manutenibilidade, testabilidade e entrega contínua em produção.',
  'photo.altPrefix': 'Foto de',
  'effect.bubble': 'Efeito bolha',
  'effect.sky': 'Efeito céu',
  'effect.pulse': 'Efeito pulso',
  'projects.heading': 'Meus Projetos',
  'projects.subtitle': 'Uma coleção de projetos em que trabalhei.',
  'projects.underConstruction': 'Em construção',
  'projects.access': 'Acessar',
  'stacks.heading': 'Stacks e Ferramentas',
  'stacks.subtitle':
    'Tecnologias e ferramentas que uso no dia a dia para construir produtos em produção.',
  'footer.text': 'Construído com Angular 21 e Tailwind CSS.',
  'locale.groupAria': 'Selecionar idioma',
  'effects.toggleAria': 'Efeitos de fundo',
  'email.copyAria': 'Copiar e-mail',
  'email.toggleAria': 'Mostrar ou ocultar e-mail',
};

const EN: Record<TranslationKey, string> = {
  'profile.title': 'Mid-Level Full Stack Developer',
  'profile.bio':
    'Developer focused on building robust architectures, clean interfaces, and performant code. I work with Angular, Node.js, and Java, applying Clean Architecture, Domain-Driven Design, and engineering practices that prioritize maintainability, testability, and continuous delivery in production.',
  'photo.altPrefix': 'Photo of',
  'effect.bubble': 'Bubble effect',
  'effect.sky': 'Sky effect',
  'effect.pulse': 'Pulse effect',
  'projects.heading': 'My Projects',
  'projects.subtitle': 'A collection of projects I have worked on.',
  'projects.underConstruction': 'Under construction',
  'projects.access': 'Access',
  'stacks.heading': 'Stacks & Tools',
  'stacks.subtitle':
    'Technologies and tools I use daily to build products in production.',
  'footer.text': 'Built with Angular 21 and Tailwind CSS.',
  'locale.groupAria': 'Select language',
  'effects.toggleAria': 'Background effects',
  'email.copyAria': 'Copy email',
  'email.toggleAria': 'Show or hide email',
};

export const TRANSLATIONS: Record<Locale, Record<TranslationKey, string>> = { BR, EN };

export function translate(locale: Locale, key: TranslationKey): string {
  return TRANSLATIONS[locale][key];
}
