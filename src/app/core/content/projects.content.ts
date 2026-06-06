import type { ProjectSource } from '../models/project.model';
import { PROJECT_PLACEHOLDER_IMAGE } from '../models/project.model';

const PROJECT_STACK_ICON_SLUGS: Record<string, string> = {
  'Java 17': 'java',
  'Spring Boot': 'springboot',
  PostgreSQL: 'postgresql',
  JPA: 'springboot',
  Flyway: 'flyway',
  Docker: 'docker',
  Swagger: 'swagger',
  JUnit: 'junit',
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
  createEmptySlot(1),
  createEmptySlot(2),
  createEmptySlot(3),
  createEmptySlot(4),
  createEmptySlot(5),
  createEmptySlot(6),
];

export const PROJECT_CATEGORIES = ['fullstack', 'backend', 'frontend', 'infra'] as const;
