import { Component, signal } from '@angular/core';

interface ProjectLink {
  label: string;
  url: string | null;
}

interface Project {
  title: string;
  description: string;
  stack: string;
  links: ProjectLink[];
}

interface SocialLink {
  label: string;
  url: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
})
export class Home {
  protected readonly profile = {
    name: 'Willian Robert Scabora',
    title: 'Desenvolvedor Full Stack Pleno',
    bio: 'Desenvolvedor focado em criar arquiteturas robustas, interfaces limpas e código performático. Trabalho com Angular, Node.js e Java, aplicando princípios de Clean Architecture, Domain-Driven Design e práticas de engenharia que priorizam manutenibilidade, testabilidade e entrega contínua em produção.',
  };

  protected readonly socialLinks = signal<SocialLink[]>([
    { label: 'GitHub', url: 'https://github.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com' },
    { label: 'Email', url: 'mailto:seu.email@exemplo.com' },
  ]);

  protected readonly projects = signal<Project[]>([
    {
      title: 'Pipeline Orchestrator',
      description:
        'Simulador de pipelines CI/CD com estágios configuráveis, gates de qualidade e métricas de execução em tempo real. Permite modelar fluxos de build, test e deploy, visualizar gargalos e comparar tempos médios entre branches — útil para demonstrar domínio de DevOps e automação de entrega.',
      stack: 'Angular 21 • RxJS • Tailwind CSS • WebSocket Simulation',
      links: [
        { label: 'GitHub', url: 'https://github.com' },
        { label: 'Live Demo', url: null },
      ],
    },
    {
      title: 'Cache Layer Manager',
      description:
        'Gerenciador de cache em memória inspirado em H2 e estratégias L1/L2, com políticas LRU, TTL configurável e dashboard de hit ratio. Implementa invalidação por tags, warm-up de chaves e logs estruturados para observabilidade — demonstrando conhecimento em performance, consistência de dados e trade-offs de caching.',
      stack: 'Java 21 • Spring Boot • H2 • Redis Protocol Simulation • Tailwind CSS',
      links: [
        { label: 'GitHub', url: 'https://github.com' },
        { label: 'Live Demo', url: 'https://example.com' },
      ],
    },
    {
      title: 'API Gateway Monitor',
      description:
        'Painel de observabilidade para microsserviços com health checks agregados, latência por rota e alertas de degradação. Consome métricas simuladas de múltiplos endpoints REST, exibe status consolidado e histórico de incidentes — refletindo experiência com arquitetura distribuída e SRE básico.',
      stack: 'Node.js • Express • Angular 21 • Signal-based State • REST',
      links: [
        { label: 'GitHub', url: 'https://github.com' },
        { label: 'Live Demo', url: null },
      ],
    },
    {
      title: 'Auth Identity Service',
      description:
        'Serviço de autenticação com JWT, refresh tokens rotativos e controle de sessões concurrentes. Inclui fluxos de registro, MFA simulado e auditoria de eventos de segurança. Frontend companion em Angular consome a API com interceptors e guards — showcase de segurança aplicada e integração full stack.',
      stack: 'Java • Spring Security • PostgreSQL • Angular 21 • OAuth2 Patterns',
      links: [
        { label: 'GitHub', url: null },
        { label: 'Live Demo', url: 'https://example.com' },
      ],
    },
    {
      title: 'Event-Driven Order Hub',
      description:
        'Hub de pedidos assíncrono com publicação de eventos de domínio, consumidores desacoplados e rastreamento de saga. Simula fluxo e-commerce completo — criação, pagamento, estoque e notificação — com idempotência e dead-letter queue, evidenciando domínio em mensageria e consistência eventual.',
      stack: 'Node.js • RabbitMQ Simulation • DDD • Angular 21 • TypeScript',
      links: [
        { label: 'GitHub', url: 'https://github.com' },
        { label: 'Live Demo', url: null },
      ],
    },
  ]);
}
