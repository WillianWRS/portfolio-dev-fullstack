import type { Locale } from '../models/locale.model';

export type TranslationKey =
  | 'profile.title'
  | 'profile.headline'
  | 'profile.bio'
  | 'profile.ctaProjects'
  | 'profile.ctaCv'
  | 'photo.altPrefix'
  | 'effect.bubble'
  | 'effect.sky'
  | 'effect.pulse'
  | 'nav.experience'
  | 'nav.projects'
  | 'nav.stacks'
  | 'nav.contact'
  | 'nav.mainAria'
  | 'recruiter.modeOn'
  | 'recruiter.modeOff'
  | 'recruiter.toggleAria'
  | 'experience.heading'
  | 'experience.subtitle'
  | 'experience.current'
  | 'projects.heading'
  | 'projects.subtitle'
  | 'projects.underConstruction'
  | 'projects.access'
  | 'projects.github'
  | 'projects.caseStudy'
  | 'projects.closeCaseStudy'
  | 'projects.filterAll'
  | 'projects.filterFullstack'
  | 'projects.filterBackend'
  | 'projects.filterFrontend'
  | 'projects.filterInfra'
  | 'projects.statusLive'
  | 'projects.statusDemo'
  | 'projects.statusPrivate'
  | 'projects.statusConstruction'
  | 'projects.caseProblem'
  | 'projects.caseSolution'
  | 'projects.caseOutcome'
  | 'projects.privateNote'
  | 'stacks.heading'
  | 'stacks.subtitle'
  | 'stacks.proficiencyDaily'
  | 'stacks.proficiencyFamiliar'
  | 'stacks.proficiencyLearning'
  | 'testimonials.heading'
  | 'testimonials.subtitle'
  | 'contact.heading'
  | 'contact.subtitle'
  | 'contact.emailLabel'
  | 'contact.calendarLabel'
  | 'contact.calendarHint'
  | 'contact.cvLabel'
  | 'contact.availability'
  | 'footer.text'
  | 'footer.viewSource'
  | 'footer.updated'
  | 'locale.groupAria'
  | 'effects.toggleAria'
  | 'email.copyAria'
  | 'email.toggleAria'
  | 'skipToContent';

const BR: Record<TranslationKey, string> = {
  'profile.title': 'Desenvolvedor Full Stack Pleno',
  'profile.headline': 'Full Stack · Angular & Java · Arquitetura em produção',
  'profile.bio':
    'Desenvolvedor focado em criar arquiteturas robustas, interfaces limpas e código performático. Trabalho com Angular, Node.js e Java, aplicando princípios de Clean Architecture, Domain-Driven Design e práticas de engenharia que priorizam manutenibilidade, testabilidade e entrega contínua em produção.',
  'profile.ctaProjects': 'Ver projetos',
  'profile.ctaCv': 'Baixar CV',
  'photo.altPrefix': 'Foto de',
  'effect.bubble': 'Efeito bolha',
  'effect.sky': 'Efeito céu',
  'effect.pulse': 'Efeito pulso',
  'nav.experience': 'Experiência',
  'nav.projects': 'Projetos',
  'nav.stacks': 'Stacks',
  'nav.contact': 'Contato',
  'nav.mainAria': 'Navegação principal',
  'recruiter.modeOn': 'Modo recrutador',
  'recruiter.modeOff': 'Modo apresentação',
  'recruiter.toggleAria': 'Alternar modo recrutador',
  'experience.heading': 'Experiência',
  'experience.subtitle': 'Trajetória profissional em empresas de produto digital.',
  'experience.current': 'Atual',
  'projects.heading': 'Meus Projetos',
  'projects.subtitle': 'Cases reais e side projects com foco em impacto mensurável.',
  'projects.underConstruction': 'Em construção',
  'projects.access': 'Acessar demo',
  'projects.github': 'GitHub',
  'projects.caseStudy': 'Ver case study',
  'projects.closeCaseStudy': 'Fechar',
  'projects.filterAll': 'Todos',
  'projects.filterFullstack': 'Full Stack',
  'projects.filterBackend': 'Backend',
  'projects.filterFrontend': 'Frontend',
  'projects.filterInfra': 'Infra',
  'projects.statusLive': 'Em produção',
  'projects.statusDemo': 'Demo',
  'projects.statusPrivate': 'Privado',
  'projects.statusConstruction': 'Em construção',
  'projects.caseProblem': 'Problema',
  'projects.caseSolution': 'Solução',
  'projects.caseOutcome': 'Resultado',
  'projects.privateNote': 'Repositório privado — disponível sob solicitação.',
  'stacks.heading': 'Stacks e Ferramentas',
  'stacks.subtitle':
    'Tecnologias que uso no dia a dia, com nível de proficiência indicado.',
  'stacks.proficiencyDaily': 'Produção diária',
  'stacks.proficiencyFamiliar': 'Familiar',
  'stacks.proficiencyLearning': 'Em estudo',
  'testimonials.heading': 'Depoimentos',
  'testimonials.subtitle': 'O que colegas e líderes dizem sobre a colaboração.',
  'contact.heading': 'Vamos conversar',
  'contact.subtitle':
    'Aberto a oportunidades full stack, consultorias técnicas e projetos desafiadores.',
  'contact.emailLabel': 'E-mail',
  'contact.calendarLabel': 'Agendar conversa',
  'contact.calendarHint': '30 min · Google Meet',
  'contact.cvLabel': 'Currículo em PDF',
  'contact.availability': 'Disponível para remoto · BR & EN',
  'footer.text': 'Construído com Angular 21 e Tailwind CSS.',
  'footer.viewSource': 'Ver código fonte',
  'footer.updated': 'Última atualização: jun/2026',
  'locale.groupAria': 'Selecionar idioma',
  'effects.toggleAria': 'Efeitos de fundo',
  'email.copyAria': 'Copiar e-mail',
  'email.toggleAria': 'Mostrar ou ocultar e-mail',
  'skipToContent': 'Ir para o conteúdo',
};

const EN: Record<TranslationKey, string> = {
  'profile.title': 'Mid-Level Full Stack Developer',
  'profile.headline': 'Full Stack · Angular & Java · Production architecture',
  'profile.bio':
    'Developer focused on building robust architectures, clean interfaces, and performant code. I work with Angular, Node.js, and Java, applying Clean Architecture, Domain-Driven Design, and engineering practices that prioritize maintainability, testability, and continuous delivery in production.',
  'profile.ctaProjects': 'View projects',
  'profile.ctaCv': 'Download CV',
  'photo.altPrefix': 'Photo of',
  'effect.bubble': 'Bubble effect',
  'effect.sky': 'Sky effect',
  'effect.pulse': 'Pulse effect',
  'nav.experience': 'Experience',
  'nav.projects': 'Projects',
  'nav.stacks': 'Stacks',
  'nav.contact': 'Contact',
  'nav.mainAria': 'Main navigation',
  'recruiter.modeOn': 'Recruiter mode',
  'recruiter.modeOff': 'Presentation mode',
  'recruiter.toggleAria': 'Toggle recruiter mode',
  'experience.heading': 'Experience',
  'experience.subtitle': 'Professional journey at digital product companies.',
  'experience.current': 'Current',
  'projects.heading': 'My Projects',
  'projects.subtitle': 'Real cases and side projects focused on measurable impact.',
  'projects.underConstruction': 'Under construction',
  'projects.access': 'View demo',
  'projects.github': 'GitHub',
  'projects.caseStudy': 'View case study',
  'projects.closeCaseStudy': 'Close',
  'projects.filterAll': 'All',
  'projects.filterFullstack': 'Full Stack',
  'projects.filterBackend': 'Backend',
  'projects.filterFrontend': 'Frontend',
  'projects.filterInfra': 'Infra',
  'projects.statusLive': 'In production',
  'projects.statusDemo': 'Demo',
  'projects.statusPrivate': 'Private',
  'projects.statusConstruction': 'Under construction',
  'projects.caseProblem': 'Problem',
  'projects.caseSolution': 'Solution',
  'projects.caseOutcome': 'Outcome',
  'projects.privateNote': 'Private repository — available on request.',
  'stacks.heading': 'Stacks & Tools',
  'stacks.subtitle': 'Technologies I use daily, with proficiency level indicated.',
  'stacks.proficiencyDaily': 'Daily production',
  'stacks.proficiencyFamiliar': 'Familiar',
  'stacks.proficiencyLearning': 'Learning',
  'testimonials.heading': 'Testimonials',
  'testimonials.subtitle': 'What colleagues and leaders say about working together.',
  'contact.heading': "Let's talk",
  'contact.subtitle':
    'Open to full stack opportunities, technical consulting, and challenging projects.',
  'contact.emailLabel': 'Email',
  'contact.calendarLabel': 'Schedule a call',
  'contact.calendarHint': '30 min · Google Meet',
  'contact.cvLabel': 'Resume PDF',
  'contact.availability': 'Available remote · BR & EN',
  'footer.text': 'Built with Angular 21 and Tailwind CSS.',
  'footer.viewSource': 'View source code',
  'footer.updated': 'Last updated: Jun/2026',
  'locale.groupAria': 'Select language',
  'effects.toggleAria': 'Background effects',
  'email.copyAria': 'Copy email',
  'email.toggleAria': 'Show or hide email',
  'skipToContent': 'Skip to content',
};

export const TRANSLATIONS: Record<Locale, Record<TranslationKey, string>> = { BR, EN };

export function translate(locale: Locale, key: TranslationKey): string {
  return TRANSLATIONS[locale][key];
}
