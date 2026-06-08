import type { Locale } from '../models/locale.model';

export type TranslationKey =
  | 'profile.title'
  | 'profile.headline'
  | 'profile.bio'
  | 'profile.ctaProjects'
  | 'profile.ctaCv'
  | 'profile.highlight1'
  | 'profile.highlight2'
  | 'profile.highlight3'
  | 'photo.altPrefix'
  | 'nav.about'
  | 'nav.experience'
  | 'nav.projects'
  | 'nav.stacks'
  | 'nav.testimonials'
  | 'nav.contact'
  | 'nav.mainAria'
  | 'nav.menuAria'
  | 'nav.menuOpen'
  | 'nav.menuClose'
  | 'experience.heading'
  | 'experience.subtitle'
  | 'experience.current'
  | 'experience.showMore'
  | 'experience.showLess'
  | 'experience.progression'
  | 'projects.heading'
  | 'projects.subtitle'
  | 'projects.underConstruction'
  | 'projects.comingSoon'
  | 'projects.placeholderTitle'
  | 'projects.placeholderDescription'
  | 'projects.placeholderRole'
  | 'projects.placeholderStack'
  | 'projects.placeholderMetric'
  | 'projects.access'
  | 'projects.github'
  | 'projects.caseStudy'
  | 'projects.closeCaseStudy'
  | 'projects.stacksAria'
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
  | 'stacks.proficiencyLegend'
  | 'testimonials.heading'
  | 'testimonials.subtitle'
  | 'testimonials.sourceLinkedIn'
  | 'testimonials.placeholderTitle'
  | 'testimonials.placeholderRole'
  | 'testimonials.placeholderContext'
  | 'testimonials.placeholderQuote'
  | 'contact.heading'
  | 'contact.subtitle'
  | 'contact.emailLabel'
  | 'contact.whatsappLabel'
  | 'contact.whatsappHint'
  | 'contact.cvLabel'
  | 'contact.availability'
  | 'contact.recommended'
  | 'footer.text'
  | 'footer.viewSource'
  | 'footer.updated'
  | 'footer.socialAria'
  | 'footer.cta'
  | 'locale.groupAria'
  | 'loading.aria'
  | 'loading.srOnly'
  | 'email.copyAria'
  | 'email.toggleAria'
  | 'email.copied'
  | 'email.copyFailed'
  | 'scroll.progressAria'
  | 'skipToContent';

const BR: Record<TranslationKey, string> = {
  'profile.title': 'Desenvolvedor Full Stack Pleno',
  'profile.headline': 'Full Stack · Angular & Java · Arquitetura em produção',
  'profile.bio':
    'Desenvolvedor focado em criar arquiteturas robustas, interfaces limpas e código performático. Trabalho com Angular, Node.js e Java, aplicando princípios de Clean Architecture, Domain-Driven Design e práticas de engenharia que priorizam manutenibilidade, testabilidade e entrega contínua em produção.',
  'profile.ctaProjects': 'Ver projetos',
  'profile.ctaCv': 'Baixar CV',
  'profile.highlight1': 'Arquitetura limpa e código testável em produção',
  'profile.highlight2': 'Angular, Java e Node.js com foco em entrega contínua',
  'profile.highlight3': 'Interfaces acessíveis e performáticas',
  'photo.altPrefix': 'Foto de',
  'nav.about': 'Sobre',
  'nav.experience': 'Experiência',
  'nav.projects': 'Projetos',
  'nav.stacks': 'Stacks',
  'nav.testimonials': 'Depoimentos',
  'nav.contact': 'Contato',
  'nav.mainAria': 'Navegação principal',
  'nav.menuAria': 'Abrir menu de seções',
  'nav.menuOpen': 'Seções',
  'nav.menuClose': 'Fechar menu',
  'experience.heading': 'Experiência',
  'experience.subtitle': 'Mais de 8 anos em produtos digitais — de sistemas corporativos à transformação digital.',
  'experience.current': 'Atual',
  'experience.showMore': 'Ver mais',
  'experience.showLess': 'Ver menos',
  'experience.progression': 'Evolução na empresa',
  'projects.heading': 'Meus Projetos',
  'projects.subtitle': 'Cases reais e side projects com foco em impacto mensurável.',
  'projects.underConstruction': 'Em construção',
  'projects.comingSoon': 'Novos cases em breve — acompanhe as atualizações.',
  'projects.placeholderTitle': 'Espaço vazio',
  'projects.placeholderDescription': 'Espaço para descrição',
  'projects.placeholderRole': 'Espaço para papel / contribuição',
  'projects.placeholderStack': 'Espaço para stack',
  'projects.placeholderMetric': 'Espaço para métrica',
  'projects.access': 'Acesse aqui',
  'projects.github': 'GitHub',
  'projects.caseStudy': 'Ver case study',
  'projects.closeCaseStudy': 'Fechar',
  'projects.stacksAria': 'Tecnologias do projeto',
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
  'stacks.proficiencyLegend': 'PRO = produção diária · FAM = familiar · NEW = em estudo',
  'testimonials.heading': 'Depoimentos',
  'testimonials.subtitle': 'O que colegas e líderes dizem sobre a colaboração.',
  'testimonials.sourceLinkedIn': 'Recomendação no LinkedIn',
  'testimonials.placeholderTitle': 'Espaço para depoimento',
  'testimonials.placeholderRole': 'Espaço para autor / cargo',
  'testimonials.placeholderContext': 'Aguardando nova recomendação',
  'testimonials.placeholderQuote': 'Espaço para citação',
  'contact.heading': 'Vamos conversar',
  'contact.subtitle':
    'Aberto a oportunidades full stack, consultorias técnicas e projetos desafiadores.',
  'contact.emailLabel': 'E-mail',
  'contact.whatsappLabel': 'WhatsApp',
  'contact.whatsappHint': '(18) 99641-6968',
  'contact.cvLabel': 'Currículo em PDF',
  'contact.availability': 'Disponível para remoto · BR & EN',
  'contact.recommended': 'Recomendado',
  'footer.text': 'Construído com Angular 21 e Tailwind CSS.',
  'footer.viewSource': 'Ver código fonte',
  'footer.updated': 'Última atualização: jun/2026',
  'footer.socialAria': 'Links sociais',
  'footer.cta': 'Vamos conversar?',
  'locale.groupAria': 'Selecionar idioma',
  'loading.aria': 'Carregando portfólio',
  'loading.srOnly': 'Carregando',
  'email.copyAria': 'Copiar e-mail',
  'email.toggleAria': 'Mostrar ou ocultar e-mail',
  'email.copied': 'E-mail copiado',
  'email.copyFailed': 'Não foi possível copiar o e-mail',
  'scroll.progressAria': 'Progresso de leitura da página',
  'skipToContent': 'Ir para o conteúdo',
};

const EN: Record<TranslationKey, string> = {
  'profile.title': 'Mid-Level Full Stack Developer',
  'profile.headline': 'Full Stack · Angular & Java · Production architecture',
  'profile.bio':
    'Developer focused on building robust architectures, clean interfaces, and performant code. I work with Angular, Node.js, and Java, applying Clean Architecture, Domain-Driven Design, and engineering practices that prioritize maintainability, testability, and continuous delivery in production.',
  'profile.ctaProjects': 'View projects',
  'profile.ctaCv': 'Download CV',
  'profile.highlight1': 'Clean architecture and testable code in production',
  'profile.highlight2': 'Angular, Java, and Node.js focused on continuous delivery',
  'profile.highlight3': 'Accessible and performant interfaces',
  'photo.altPrefix': 'Photo of',
  'nav.about': 'About',
  'nav.experience': 'Experience',
  'nav.projects': 'Projects',
  'nav.stacks': 'Stacks',
  'nav.testimonials': 'Testimonials',
  'nav.contact': 'Contact',
  'nav.mainAria': 'Main navigation',
  'nav.menuAria': 'Open sections menu',
  'nav.menuOpen': 'Sections',
  'nav.menuClose': 'Close menu',
  'experience.heading': 'Experience',
  'experience.subtitle': 'Over 8 years in digital products — from corporate systems to digital transformation.',
  'experience.current': 'Current',
  'experience.showMore': 'Show more',
  'experience.showLess': 'Show less',
  'experience.progression': 'Role progression',
  'projects.heading': 'My Projects',
  'projects.subtitle': 'Real cases and side projects focused on measurable impact.',
  'projects.underConstruction': 'Under construction',
  'projects.comingSoon': 'New case studies coming soon — stay tuned.',
  'projects.placeholderTitle': 'Empty slot',
  'projects.placeholderDescription': 'Space for description',
  'projects.placeholderRole': 'Space for role / contribution',
  'projects.placeholderStack': 'Space for stack',
  'projects.placeholderMetric': 'Space for metric',
  'projects.access': 'Access here',
  'projects.github': 'GitHub',
  'projects.caseStudy': 'View case study',
  'projects.closeCaseStudy': 'Close',
  'projects.stacksAria': 'Project technologies',
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
  'stacks.proficiencyLegend': 'PRO = daily production · FAM = familiar · NEW = learning',
  'testimonials.heading': 'Testimonials',
  'testimonials.subtitle': 'What colleagues and leaders say about working together.',
  'testimonials.sourceLinkedIn': 'LinkedIn recommendation',
  'testimonials.placeholderTitle': 'Testimonial slot',
  'testimonials.placeholderRole': 'Space for author / role',
  'testimonials.placeholderContext': 'Awaiting new recommendation',
  'testimonials.placeholderQuote': 'Space for quote',
  'contact.heading': "Let's talk",
  'contact.subtitle':
    'Open to full stack opportunities, technical consulting, and challenging projects.',
  'contact.emailLabel': 'Email',
  'contact.whatsappLabel': 'WhatsApp',
  'contact.whatsappHint': '+55 18 99641-6968',
  'contact.cvLabel': 'Resume PDF',
  'contact.availability': 'Available remote · BR & EN',
  'contact.recommended': 'Recommended',
  'footer.text': 'Built with Angular 21 and Tailwind CSS.',
  'footer.viewSource': 'View source code',
  'footer.updated': 'Last updated: Jun/2026',
  'footer.socialAria': 'Social links',
  'footer.cta': "Let's talk?",
  'locale.groupAria': 'Select language',
  'loading.aria': 'Loading portfolio',
  'loading.srOnly': 'Loading',
  'email.copyAria': 'Copy email',
  'email.toggleAria': 'Show or hide email',
  'email.copied': 'Email copied',
  'email.copyFailed': 'Could not copy email',
  'scroll.progressAria': 'Page reading progress',
  'skipToContent': 'Skip to content',
};

export const TRANSLATIONS: Record<Locale, Record<TranslationKey, string>> = { BR, EN };

export function translate(locale: Locale, key: TranslationKey): string {
  return TRANSLATIONS[locale][key];
}
