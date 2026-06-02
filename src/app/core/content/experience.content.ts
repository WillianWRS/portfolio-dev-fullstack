import type { ExperienceSource } from '../models/experience.model';

export const EXPERIENCE_SOURCE: readonly ExperienceSource[] = [
  {
    id: 'techflow',
    company: 'TechFlow Solutions',
    roleBR: 'Desenvolvedor Full Stack Pleno',
    roleEN: 'Mid-Level Full Stack Developer',
    periodBR: 'Mar 2023 — Presente',
    periodEN: 'Mar 2023 — Present',
    current: true,
    stacks: ['Angular', 'Java', 'Spring Boot', 'PostgreSQL', 'Kafka'],
    highlightsBR: [
      'Liderou migração de monolito legado para arquitetura de microsserviços, reduzindo deploys de 2h para 12min.',
      'Implementou pipeline CI/CD com testes automatizados, elevando cobertura de 45% para 87%.',
      'Mentorou 2 desenvolvedores júnior em code review e práticas de Clean Architecture.',
    ],
    highlightsEN: [
      'Led migration from legacy monolith to microservices architecture, reducing deploys from 2h to 12min.',
      'Implemented CI/CD pipeline with automated tests, raising coverage from 45% to 87%.',
      'Mentored 2 junior developers on code review and Clean Architecture practices.',
    ],
  },
  {
    id: 'datastream',
    company: 'DataStream Labs',
    roleBR: 'Desenvolvedor Full Stack',
    roleEN: 'Full Stack Developer',
    periodBR: 'Jan 2021 — Fev 2023',
    periodEN: 'Jan 2021 — Feb 2023',
    stacks: ['Angular', 'Node.js', 'NestJS', 'MongoDB', 'Redis'],
    highlightsBR: [
      'Desenvolveu dashboard analítico usado por 200+ usuários internos com agregações em tempo quase real.',
      'Reduziu latência p95 de APIs críticas em 62% com cache Redis e otimização de queries.',
      'Introduziu padrões de DDD e testes de integração no squad de produto.',
    ],
    highlightsEN: [
      'Built analytics dashboard used by 200+ internal users with near-real-time aggregations.',
      'Reduced p95 latency of critical APIs by 62% with Redis cache and query optimization.',
      'Introduced DDD patterns and integration tests to the product squad.',
    ],
  },
  {
    id: 'inovare',
    company: 'Inovare Digital',
    roleBR: 'Desenvolvedor Frontend',
    roleEN: 'Frontend Developer',
    periodBR: 'Jun 2019 — Dez 2020',
    periodEN: 'Jun 2019 — Dec 2020',
    stacks: ['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS'],
    highlightsBR: [
      'Reescreveu portal do cliente de jQuery para Angular, melhorando Lighthouse Performance de 38 para 94.',
      'Criou biblioteca de componentes interna reutilizada em 5 projetos.',
      'Colaborou com UX na implementação de design system acessível (WCAG AA).',
    ],
    highlightsEN: [
      'Rewrote client portal from jQuery to Angular, improving Lighthouse Performance from 38 to 94.',
      'Created internal component library reused across 5 projects.',
      'Collaborated with UX on accessible design system implementation (WCAG AA).',
    ],
  },
];
