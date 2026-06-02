import type { ProjectSource } from '../models/project.model';

export const PROJECTS_SOURCE: readonly ProjectSource[] = [
  {
    title: 'Habit Builder',
    imageUrl: '/foto2.png',
    descriptionBR:
      'Gerenciador de hábitos com registro de ações diárias, controle de disciplina e indicadores de consistência para manter rotinas e reduzir quebras de sequência.',
    descriptionEN:
      'Habit manager with daily action tracking, discipline control, and consistency metrics to sustain routines and reduce streak breaks.',
    stacks: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Angular 21', 'Kafka'],
  },
  {
    title: 'Target Locked',
    imageUrl: '/foto3.png',
    descriptionBR:
      'Definidor e acompanhador de metas com prazos, marcos intermediários e visão de progresso para transformar objetivos em planos mensuráveis.',
    descriptionEN:
      'Goal setting and tracking tool with deadlines, milestones, and progress views to turn objectives into measurable plans.',
    stacks: ['Node.js', 'NestJS', 'MongoDB', 'Angular 21', 'Redis'],
  },
  {
    title: 'Authentication Service',
    imageUrl: '/settings.png',
    descriptionBR:
      'Gateway interno com rate limiting, roteamento versionado e documentação viva OpenAPI, reduzindo acoplamento entre squads e tempo de integração.',
    descriptionEN:
      'Internal gateway with rate limiting, versioned routing, and live OpenAPI docs, reducing coupling between squads and integration time.',
    stacks: ['Go', 'Kong', 'gRPC', 'Prometheus', 'Angular 21'],
  },
  {
    title: 'E-mail Service',
    imageUrl: '/settings.png',
    descriptionBR:
      'Console de observabilidade com SLIs por serviço, correlação de traces e alertas baseados em SLO para ambientes de microsserviços.',
    descriptionEN:
      'Observability console with per-service SLIs, trace correlation, and SLO-based alerts for microservice environments.',
    stacks: ['TypeScript', 'Express', 'OpenTelemetry', 'Grafana', 'Tailwind CSS'],
  },
  {
    title: 'Work out Planner',
    imageUrl: '/settings.png',
    descriptionBR:
      'Orquestrador de releases com pipelines declarativos, aprovações por ambiente e rollback automático quando métricas de saúde degradam após o deploy.',
    descriptionEN:
      'Release orchestrator with declarative pipelines, per-environment approvals, and automatic rollback when health metrics degrade after deploy.',
    stacks: ['Angular 21', 'RxJS', 'Docker', 'GitHub Actions', 'WebSocket'],
  },
  {
    title: 'Release Tracker',
    imageUrl: '/settings.png',
    descriptionBR:
      'Serviço de identidade com JWT, refresh rotativo, MFA TOTP e políticas de sessão para aplicações corporativas multi-tenant.',
    descriptionEN:
      'Identity service with JWT, rotating refresh tokens, TOTP MFA, and session policies for multi-tenant enterprise applications.',
    stacks: ['Java', 'Spring Security', 'PostgreSQL', 'OAuth2', 'Angular 21'],
  },
  {
    title: 'Metrics Console',
    imageUrl: '/settings.png',
    descriptionBR:
      'Motor de workflows assíncronos com compensações, timers e visualização do estado de cada instância para processos de onboarding e compliance.',
    descriptionEN:
      'Async workflow engine with compensations, timers, and per-instance state visualization for onboarding and compliance processes.',
    stacks: ['Node.js', 'Temporal', 'TypeScript', 'RabbitMQ', 'DDD'],
  },
  {
    title: 'Config Hub',
    imageUrl: '/settings.png',
    descriptionBR:
      'Painel executivo com agregações em tempo quase real, filtros salvos e exportação de relatórios para acompanhamento de KPIs operacionais.',
    descriptionEN:
      'Executive dashboard with near-real-time aggregations, saved filters, and report export for tracking operational KPIs.',
    stacks: ['Angular 21', 'Signals', 'Tailwind CSS', 'Java', 'H2'],
  },
];
