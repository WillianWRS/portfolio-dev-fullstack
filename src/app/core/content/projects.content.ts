import type { ProjectSource } from '../models/project.model';
import { PROJECT_PLACEHOLDER_IMAGE } from '../models/project.model';

const PROJECT_STACK_ICON_SLUGS: Record<string, string> = {
  'Angular 21': 'angular',
  'Java 17': 'java',
  'Spring Boot': 'springboot',
  PostgreSQL: 'postgresql',
  JPA: 'springboot',
  Flyway: 'flyway',
  Docker: 'docker',
  Swagger: 'swagger',
  JUnit: 'junit',
  TypeScript: 'typescript',
  'Tailwind CSS': 'tailwindcss',
  'Firebase Hosting': 'firebase',
  Vitest: 'vitest',
};

function createEmptySlot(index: number): ProjectSource {
  return {
    id: `empty-slot-${index}`,
    title: 'Espaço vazio',
    placeholder: true,
    placeholderIndex: index,
    imageUrl: PROJECT_PLACEHOLDER_IMAGE,
    descriptionBR: '',
    descriptionEN: '',
    stacks: [],
    status: 'construction',
    category: 'fullstack',
    year: 2026,
    roleBR: '',
    roleEN: '',
  };
}

export const PROJECTS_SOURCE: readonly ProjectSource[] = [
  {
    id: 'wrs-habit-builder',
    title: 'Habit Builder',
    imageUrl: '/habit%20builder%20project.png',
    descriptionBR:
      'App web para construir e acompanhar hábitos no dia a dia: painel Hoje com progresso, metas mínimas, sequências e frequência por dia da semana — sem login, com dados no navegador e deploy em produção.',
    descriptionEN:
      'Web app to build and track daily habits: Today dashboard with progress, minimum actions, streaks, and per-weekday scheduling — no login, browser persistence, and production deployment.',
    stacks: ['Angular 21', 'TypeScript', 'Tailwind CSS', 'Firebase Hosting', 'Vitest'].map((name) => ({
      name,
      iconSlug: PROJECT_STACK_ICON_SLUGS[name],
    })),
    status: 'live',
    category: 'frontend',
    featured: true,
    year: 2026,
    roleBR: 'Desenvolvedor Frontend',
    roleEN: 'Frontend Developer',
    githubUrl: 'https://github.com/WillianWRS/wrs-habit-builder',
    liveUrl: 'https://wrs-habit-builder.web.app/',
    metrics: [
      { value: 'Hoje', labelBR: 'painel diário', labelEN: 'daily dashboard' },
      { value: 'SSR', labelBR: 'prerender Angular', labelEN: 'Angular prerender' },
      { value: 'JSON', labelBR: 'backup exportável', labelEN: 'exportable backup' },
      { value: '< 3s', labelBR: 'marcar hábito', labelEN: 'to mark habit' },
    ],
    caseStudy: {
      problemBR:
        'Ferramentas genéricas ou planilhas fazem pessoas abandonar hábitos por falta de gatilho no momento certo, metas ambiciosas demais e feedback punitivo quando um dia é perdido — o streak que zera desencoraja retomar a rotina.',
      problemEN:
        'Generic tools or spreadsheets make people abandon habits due to missing cues at the right moment, overly ambitious goals, and punitive feedback when a day is missed — fragile streaks discourage getting back on track.',
      solutionBR:
        'Habit Builder aplica intenções de implementação e ações mínimas em cada hábito, com painel Hoje para marcar em um toque, biblioteca com filtros, sequências com reset suave após faltas, tema claro/escuro e persistência versionada em localStorage com backup JSON — Angular 21, signals, SSR e Firebase Hosting.',
      solutionEN:
        'Habit Builder applies implementation intentions and minimum actions per habit, with a Today dashboard for one-tap check-ins, a filterable habit library, streaks with soft reset after misses, light/dark theme, and versioned localStorage persistence with JSON backup — Angular 21, signals, SSR, and Firebase Hosting.',
      outcomeBR:
        'App em produção com UX mobile-first, onboarding sem fricção (sem conta) e demo online pronta para revisão técnica: arquitetura por features, estado previsível com signals e produto usado no dia a dia (dogfooding).',
      outcomeEN:
        'Production app with mobile-first UX, frictionless onboarding (no account), and an online demo ready for technical review: feature-based architecture, predictable state with signals, and real daily use (dogfooding).',
    },
  },
  {
    id: 'profissionais',
    title: 'Profissionais',
    imageUrl: '/profissionais.png',
    descriptionBR:
      'API REST para cadastro de profissionais e números de contato, com persistência relacional, migrações versionadas, documentação Swagger e ambiente reproduzível via Docker.',
    descriptionEN:
      'REST API for managing professionals and contact numbers, with relational persistence, versioned migrations, Swagger documentation, and a reproducible Docker environment.',
    stacks: ['Java 17', 'Spring Boot', 'PostgreSQL', 'JPA', 'Flyway', 'Docker', 'Swagger', 'JUnit'].map(
      (name) => ({ name, iconSlug: PROJECT_STACK_ICON_SLUGS[name] }),
    ),
    status: 'demo',
    category: 'backend',
    featured: true,
    year: 2024,
    roleBR: 'Desenvolvedor Backend',
    roleEN: 'Backend Developer',
    githubUrl: 'https://github.com/WillianWRS/profissionais',
    metrics: [
      { value: 'REST', labelBR: 'API documentada', labelEN: 'documented API' },
      { value: 'JUnit', labelBR: 'testes unitários', labelEN: 'unit tests' },
      { value: 'Flyway', labelBR: 'migrações SQL', labelEN: 'SQL migrations' },
      { value: 'Docker', labelBR: 'compose pronto', labelEN: 'ready compose' },
    ],
    caseStudy: {
      problemBR:
        'Centralizar o cadastro de profissionais e múltiplos contatos exige regras de negócio consistentes, histórico de schema confiável e onboarding simples para quem for integrar ou rodar localmente.',
      problemEN:
        'Centralizing professional records and multiple contacts requires consistent business rules, reliable schema history, and simple onboarding for anyone integrating or running locally.',
      solutionBR:
        'API Spring Boot com JPA/Hibernate, migrações Flyway, testes JUnit, documentação Swagger/JavaDoc e docker-compose para subir API + PostgreSQL com um comando.',
      solutionEN:
        'Spring Boot API with JPA/Hibernate, Flyway migrations, JUnit tests, Swagger/JavaDoc documentation, and docker-compose to run API + PostgreSQL with a single command.',
      outcomeBR:
        'Projeto open source pronto para demonstrar backend Java em produção: CRUD completo, contrato HTTP explícito e ambiente containerizado para revisão técnica.',
      outcomeEN:
        'Open-source project ready to showcase production-grade Java backend: full CRUD, explicit HTTP contract, and a containerized environment for technical review.',
    },
  },
  createEmptySlot(2),
  createEmptySlot(3),
  createEmptySlot(4),
  createEmptySlot(5),
  createEmptySlot(6),
];

export const PROJECT_CATEGORIES = ['fullstack', 'backend', 'frontend', 'infra'] as const;
