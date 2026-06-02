import type { ProjectSource } from '../models/project.model';

export const PROJECTS_SOURCE: readonly ProjectSource[] = [
  {
    id: 'habit-builder',
    title: 'Habit Builder',
    imageUrl: '/foto2.png',
    descriptionBR:
      'Gerenciador de hábitos com registro de ações diárias, controle de disciplina e indicadores de consistência para manter rotinas e reduzir quebras de sequência.',
    descriptionEN:
      'Habit manager with daily action tracking, discipline control, and consistency metrics to sustain routines and reduce streak breaks.',
    stacks: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Angular 21', 'Kafka'],
    status: 'live',
    category: 'fullstack',
    featured: true,
    year: 2025,
    roleBR: 'Tech Lead & Full Stack',
    roleEN: 'Tech Lead & Full Stack',
    githubUrl: 'https://github.com/WillianWRS/habit-builder',
    liveUrl: 'https://habit-builder-demo.example.com',
    metrics: [
      { value: '12k+', labelBR: 'usuários ativos', labelEN: 'active users' },
      { value: '99.2%', labelBR: 'uptime', labelEN: 'uptime' },
      { value: '87%', labelBR: 'cobertura de testes', labelEN: 'test coverage' },
    ],
    caseStudy: {
      problemBR:
        'Usuários abandonavam hábitos por falta de feedback imediato e visibilidade de progresso ao longo do tempo.',
      problemEN:
        'Users dropped habits due to lack of immediate feedback and long-term progress visibility.',
      solutionBR:
        'Arquitetura event-driven com Kafka para processar streaks em tempo real, dashboard Angular com Signals e API Spring Boot modular.',
      solutionEN:
        'Event-driven architecture with Kafka for real-time streak processing, Angular Signals dashboard, and modular Spring Boot API.',
      outcomeBR:
        'Retenção de 30 dias subiu 34% e tempo médio de resposta da API caiu de 420ms para 95ms após otimização de queries.',
      outcomeEN:
        '30-day retention increased by 34% and average API response time dropped from 420ms to 95ms after query optimization.',
    },
  },
  {
    id: 'target-locked',
    title: 'Target Locked',
    imageUrl: '/foto3.png',
    descriptionBR:
      'Definidor e acompanhador de metas com prazos, marcos intermediários e visão de progresso para transformar objetivos em planos mensuráveis.',
    descriptionEN:
      'Goal setting and tracking tool with deadlines, milestones, and progress views to turn objectives into measurable plans.',
    stacks: ['Node.js', 'NestJS', 'MongoDB', 'Angular 21', 'Redis'],
    status: 'demo',
    category: 'fullstack',
    featured: true,
    year: 2024,
    roleBR: 'Desenvolvedor Full Stack',
    roleEN: 'Full Stack Developer',
    githubUrl: 'https://github.com/WillianWRS/target-locked',
    liveUrl: 'https://target-locked-demo.example.com',
    metrics: [
      { value: '3.2k', labelBR: 'metas criadas', labelEN: 'goals created' },
      { value: '<120ms', labelBR: 'p95 API', labelEN: 'p95 API' },
    ],
    caseStudy: {
      problemBR:
        'Equipes de produto precisavam alinhar OKRs trimestrais sem perder rastreabilidade entre marcos e entregas.',
      problemEN:
        'Product teams needed to align quarterly OKRs without losing traceability between milestones and deliverables.',
      solutionBR:
        'NestJS com DDD tático, cache Redis para dashboards e frontend Angular com visualização de progresso por sprint.',
      solutionEN:
        'NestJS with tactical DDD, Redis cache for dashboards, and Angular frontend with sprint-based progress visualization.',
      outcomeBR:
        'Redução de 28% no tempo de planejamento trimestral reportado por 4 squads piloto.',
      outcomeEN:
        '28% reduction in quarterly planning time reported by 4 pilot squads.',
    },
  },
  {
    id: 'auth-service',
    title: 'Authentication Service',
    imageUrl: '/foto2.png',
    descriptionBR:
      'Serviço de identidade com JWT, refresh rotativo, MFA TOTP e políticas de sessão para aplicações corporativas multi-tenant.',
    descriptionEN:
      'Identity service with JWT, rotating refresh tokens, TOTP MFA, and session policies for multi-tenant enterprise applications.',
    stacks: ['Go', 'PostgreSQL', 'Redis', 'OAuth2', 'Docker'],
    status: 'private',
    category: 'backend',
    year: 2024,
    roleBR: 'Backend Engineer',
    roleEN: 'Backend Engineer',
    metrics: [
      { value: '50k+', labelBR: 'auth/dia', labelEN: 'auth/day' },
      { value: '0', labelBR: 'incidentes críticos', labelEN: 'critical incidents' },
    ],
    caseStudy: {
      problemBR:
        'Múltiplos produtos reimplementavam autenticação com inconsistências de segurança e alto custo de manutenção.',
      problemEN:
        'Multiple products reimplemented authentication with security inconsistencies and high maintenance cost.',
      solutionBR:
        'Microsserviço centralizado em Go com refresh token rotation, rate limiting e auditoria de sessões.',
      solutionEN:
        'Centralized Go microservice with refresh token rotation, rate limiting, and session auditing.',
      outcomeBR:
        'Integração de novos produtos caiu de 3 semanas para 3 dias; conformidade SOC2 simplificada.',
      outcomeEN:
        'New product integration dropped from 3 weeks to 3 days; SOC2 compliance simplified.',
    },
  },
  {
    id: 'email-service',
    title: 'E-mail Service',
    imageUrl: '/settings.png',
    descriptionBR:
      'Plataforma de envio transacional com templates versionados, filas resilientes e métricas de entregabilidade em tempo real.',
    descriptionEN:
      'Transactional email platform with versioned templates, resilient queues, and real-time deliverability metrics.',
    stacks: ['TypeScript', 'Express', 'RabbitMQ', 'PostgreSQL', 'Prometheus'],
    status: 'live',
    category: 'backend',
    year: 2023,
    roleBR: 'Desenvolvedor Backend',
    roleEN: 'Backend Developer',
    githubUrl: 'https://github.com/WillianWRS/email-service',
    metrics: [
      { value: '2M+', labelBR: 'e-mails/mês', labelEN: 'emails/month' },
      { value: '99.7%', labelBR: 'entregabilidade', labelEN: 'deliverability' },
    ],
  },
  {
    id: 'workout-planner',
    title: 'Workout Planner',
    imageUrl: '/foto3.png',
    descriptionBR:
      'Planejador de treinos com periodização automática, histórico de cargas e recomendações baseadas em recuperação.',
    descriptionEN:
      'Workout planner with automatic periodization, load history, and recovery-based recommendations.',
    stacks: ['Angular 21', 'RxJS', 'Node.js', 'MongoDB', 'WebSocket'],
    status: 'demo',
    category: 'frontend',
    year: 2023,
    roleBR: 'Desenvolvedor Frontend',
    roleEN: 'Frontend Developer',
    githubUrl: 'https://github.com/WillianWRS/workout-planner',
    liveUrl: 'https://workout-planner-demo.example.com',
    metrics: [
      { value: '4.8★', labelBR: 'avaliação beta', labelEN: 'beta rating' },
      { value: '15ms', labelBR: 'TTI médio', labelEN: 'avg TTI' },
    ],
  },
  {
    id: 'release-tracker',
    title: 'Release Tracker',
    imageUrl: '/settings.png',
    descriptionBR:
      'Orquestrador de releases com pipelines declarativos, aprovações por ambiente e rollback automático quando métricas degradam.',
    descriptionEN:
      'Release orchestrator with declarative pipelines, per-environment approvals, and automatic rollback when metrics degrade.',
    stacks: ['Java', 'Spring Boot', 'Docker', 'GitHub Actions', 'Grafana'],
    status: 'private',
    category: 'infra',
    year: 2023,
    roleBR: 'DevOps & Backend',
    roleEN: 'DevOps & Backend',
    metrics: [
      { value: '40%', labelBR: 'menos rollbacks', labelEN: 'fewer rollbacks' },
      { value: '12min', labelBR: 'deploy médio', labelEN: 'avg deploy' },
    ],
  },
  {
    id: 'metrics-console',
    title: 'Metrics Console',
    imageUrl: '/settings.png',
    descriptionBR:
      'Console de observabilidade com SLIs por serviço, correlação de traces e alertas baseados em SLO para microsserviços.',
    descriptionEN:
      'Observability console with per-service SLIs, trace correlation, and SLO-based alerts for microservices.',
    stacks: ['TypeScript', 'OpenTelemetry', 'Grafana', 'Angular 21', 'NestJS'],
    status: 'construction',
    category: 'infra',
    year: 2026,
    roleBR: 'Full Stack (em desenvolvimento)',
    roleEN: 'Full Stack (in development)',
    githubUrl: 'https://github.com/WillianWRS/metrics-console',
  },
  {
    id: 'config-hub',
    title: 'Config Hub',
    imageUrl: '/settings.png',
    descriptionBR:
      'Painel executivo com agregações em tempo quase real, filtros salvos e exportação de relatórios para KPIs operacionais.',
    descriptionEN:
      'Executive dashboard with near-real-time aggregations, saved filters, and report export for operational KPIs.',
    stacks: ['Angular 21', 'Signals', 'Java', 'PostgreSQL', 'Tailwind CSS'],
    status: 'construction',
    category: 'fullstack',
    year: 2026,
    roleBR: 'Full Stack (em desenvolvimento)',
    roleEN: 'Full Stack (in development)',
  },
];

export const PROJECT_CATEGORIES = ['fullstack', 'backend', 'frontend', 'infra'] as const;
