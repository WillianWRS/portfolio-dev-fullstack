import { Component, computed, DestroyRef, inject, signal } from '@angular/core';

type Locale = 'BR' | 'EN';

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

type SocialIcon = 'github' | 'linkedin' | 'email';

interface SocialLink {
  label: string;
  url: string;
  icon: SocialIcon;
}

type BackgroundEffect = 'bubbles' | 'stars' | 'pulse';

interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  willPop: boolean;
}

interface StarParticle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  opacity: number;
}

interface ConstellationOrb {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface MeteorStreak {
  id: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
  length: number;
  angle: number;
}

interface RipplePulse {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  maxScale: number;
  opacity: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly profileName = 'Willian Robert Scabora';

  protected readonly profileTitleBR = 'Desenvolvedor Full Stack Pleno';
  protected readonly profileTitleEN = 'Mid-Level Full Stack Developer';

  protected readonly profileDescriptionBR =
    'Desenvolvedor focado em criar arquiteturas robustas, interfaces limpas e código performático. Trabalho com Angular, Node.js e Java, aplicando princípios de Clean Architecture, Domain-Driven Design e práticas de engenharia que priorizam manutenibilidade, testabilidade e entrega contínua em produção.';
  protected readonly profileDescriptionEN =
    'Developer focused on building robust architectures, clean interfaces, and performant code. I work with Angular, Node.js, and Java, applying Clean Architecture, Domain-Driven Design, and engineering practices that prioritize maintainability, testability, and continuous delivery in production.';

  protected readonly photoAltPrefixBR = 'Foto de';
  protected readonly photoAltPrefixEN = 'Photo of';

  protected readonly effectBubbleLabelBR = 'Efeito bolha';
  protected readonly effectBubbleLabelEN = 'Bubble effect';
  protected readonly effectSkyLabelBR = 'Efeito céu';
  protected readonly effectSkyLabelEN = 'Sky effect';
  protected readonly effectPulseLabelBR = 'Efeito pulso';
  protected readonly effectPulseLabelEN = 'Pulse effect';

  protected readonly projectsHeadingBR = 'Meus Projetos';
  protected readonly projectsHeadingEN = 'My Projects';
  protected readonly projectsSubtitleBR = 'Uma coleção de projetos em que trabalhei.';
  protected readonly projectsSubtitleEN = 'A collection of projects I have worked on.';

  protected readonly footerTextBR = 'Construído com Angular 21 e Tailwind CSS.';
  protected readonly footerTextEN = 'Built with Angular 21 and Tailwind CSS.';

  protected readonly localeGroupAriaLabelBR = 'Selecionar idioma';
  protected readonly localeGroupAriaLabelEN = 'Select language';

  protected readonly effectsToggleAriaLabelBR = 'Efeitos de fundo';
  protected readonly effectsToggleAriaLabelEN = 'Background effects';

  protected readonly selectedLocale = signal<Locale>('BR');
  protected readonly effectsMenuOpen = signal(false);

  protected readonly profile = computed(() => {
    const isBR = this.selectedLocale() === 'BR';

    return {
      name: this.profileName,
      title: isBR ? this.profileTitleBR : this.profileTitleEN,
      bio: isBR ? this.profileDescriptionBR : this.profileDescriptionEN,
    };
  });

  protected readonly photoAlt = computed(() => {
    const prefix =
      this.selectedLocale() === 'BR' ? this.photoAltPrefixBR : this.photoAltPrefixEN;

    return `${prefix} ${this.profileName}`;
  });

  protected readonly projectsHeading = computed(() =>
    this.selectedLocale() === 'BR' ? this.projectsHeadingBR : this.projectsHeadingEN,
  );

  protected readonly projectsSubtitle = computed(() =>
    this.selectedLocale() === 'BR' ? this.projectsSubtitleBR : this.projectsSubtitleEN,
  );

  protected readonly footerText = computed(() =>
    this.selectedLocale() === 'BR' ? this.footerTextBR : this.footerTextEN,
  );

  protected readonly localeGroupAriaLabel = computed(() =>
    this.selectedLocale() === 'BR'
      ? this.localeGroupAriaLabelBR
      : this.localeGroupAriaLabelEN,
  );

  protected readonly effectsToggleAriaLabel = computed(() =>
    this.selectedLocale() === 'BR'
      ? this.effectsToggleAriaLabelBR
      : this.effectsToggleAriaLabelEN,
  );

  protected readonly emailCopyAriaLabel = computed(() =>
    this.selectedLocale() === 'BR' ? this.emailCopyAriaLabelBR : this.emailCopyAriaLabelEN,
  );

  protected readonly emailToggleAriaLabel = computed(() =>
    this.selectedLocale() === 'BR'
      ? this.emailToggleAriaLabelBR
      : this.emailToggleAriaLabelEN,
  );

  protected readonly emailAddress = 'willian-scabora@hotmail.com';

  protected readonly emailCopyAriaLabelBR = 'Copiar e-mail';
  protected readonly emailCopyAriaLabelEN = 'Copy email';

  protected readonly emailToggleAriaLabelBR = 'Mostrar ou ocultar e-mail';
  protected readonly emailToggleAriaLabelEN = 'Show or hide email';

  protected readonly emailCopied = signal(false);
  protected readonly emailRevealed = signal(false);

  protected readonly socialLinks = signal<SocialLink[]>([
    { label: 'GitHub', url: 'https://github.com/WillianWRS', icon: 'github' },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/willian-robert-scabora-85a94217b/',
      icon: 'linkedin',
    },
    {
      label: 'Email',
      url: `mailto:${this.emailAddress}`,
      icon: 'email',
    },
  ]);

  private readonly projectsSource = [
    {
      title: 'Pipeline Orchestrator',
      descriptionBR:
        'Simulador de pipelines CI/CD com estágios configuráveis, gates de qualidade e métricas de execução em tempo real. Permite modelar fluxos de build, test e deploy, visualizar gargalos e comparar tempos médios entre branches — útil para demonstrar domínio de DevOps e automação de entrega.',
      descriptionEN:
        'CI/CD pipeline simulator with configurable stages, quality gates, and real-time execution metrics. Lets you model build, test, and deploy flows, spot bottlenecks, and compare average times across branches — useful for demonstrating DevOps and delivery automation expertise.',
      stack: 'Angular 21 • RxJS • Tailwind CSS • WebSocket Simulation',
      links: [
        { label: 'GitHub', url: 'https://github.com' },
        { label: 'Live Demo', url: null },
      ],
    },
    {
      title: 'Cache Layer Manager',
      descriptionBR:
        'Gerenciador de cache em memória inspirado em H2 e estratégias L1/L2, com políticas LRU, TTL configurável e dashboard de hit ratio. Implementa invalidação por tags, warm-up de chaves e logs estruturados para observabilidade — demonstrando conhecimento em performance, consistência de dados e trade-offs de caching.',
      descriptionEN:
        'In-memory cache manager inspired by H2 and L1/L2 strategies, with LRU policies, configurable TTL, and a hit-ratio dashboard. Implements tag-based invalidation, key warm-up, and structured logs for observability — demonstrating performance, data consistency, and caching trade-offs.',
      stack: 'Java 21 • Spring Boot • H2 • Redis Protocol Simulation • Tailwind CSS',
      links: [
        { label: 'GitHub', url: 'https://github.com' },
        { label: 'Live Demo', url: 'https://example.com' },
      ],
    },
    {
      title: 'API Gateway Monitor',
      descriptionBR:
        'Painel de observabilidade para microsserviços com health checks agregados, latência por rota e alertas de degradação. Consome métricas simuladas de múltiplos endpoints REST, exibe status consolidado e histórico de incidentes — refletindo experiência com arquitetura distribuída e SRE básico.',
      descriptionEN:
        'Observability dashboard for microservices with aggregated health checks, per-route latency, and degradation alerts. Consumes simulated metrics from multiple REST endpoints, shows consolidated status and incident history — reflecting experience with distributed architecture and basic SRE.',
      stack: 'Node.js • Express • Angular 21 • Signal-based State • REST',
      links: [
        { label: 'GitHub', url: 'https://github.com' },
        { label: 'Live Demo', url: null },
      ],
    },
    {
      title: 'Auth Identity Service',
      descriptionBR:
        'Serviço de autenticação com JWT, refresh tokens rotativos e controle de sessões concurrentes. Inclui fluxos de registro, MFA simulado e auditoria de eventos de segurança. Frontend companion em Angular consome a API com interceptors e guards — showcase de segurança aplicada e integração full stack.',
      descriptionEN:
        'Authentication service with JWT, rotating refresh tokens, and concurrent session control. Includes registration flows, simulated MFA, and security event auditing. Companion Angular frontend consumes the API with interceptors and guards — a showcase of applied security and full-stack integration.',
      stack: 'Java • Spring Security • PostgreSQL • Angular 21 • OAuth2 Patterns',
      links: [
        { label: 'GitHub', url: null },
        { label: 'Live Demo', url: 'https://example.com' },
      ],
    },
    {
      title: 'Event-Driven Order Hub',
      descriptionBR:
        'Hub de pedidos assíncrono com publicação de eventos de domínio, consumidores desacoplados e rastreamento de saga. Simula fluxo e-commerce completo — criação, pagamento, estoque e notificação — com idempotência e dead-letter queue, evidenciando domínio em mensageria e consistência eventual.',
      descriptionEN:
        'Asynchronous order hub with domain event publishing, decoupled consumers, and saga tracking. Simulates a full e-commerce flow — creation, payment, inventory, and notification — with idempotency and dead-letter queue, showcasing messaging and eventual consistency expertise.',
      stack: 'Node.js • RabbitMQ Simulation • DDD • Angular 21 • TypeScript',
      links: [
        { label: 'GitHub', url: 'https://github.com' },
        { label: 'Live Demo', url: null },
      ],
    },
  ] as const;

  protected readonly projects = computed<Project[]>(() => {
    const isBR = this.selectedLocale() === 'BR';

    return this.projectsSource.map((project) => ({
      title: project.title,
      description: isBR ? project.descriptionBR : project.descriptionEN,
      stack: project.stack,
      links: [...project.links],
    }));
  });

  protected readonly selectedEffect = signal<BackgroundEffect>('stars');

  protected readonly bubbles = signal<Bubble[]>(
    Array.from({ length: 80 }, (_, index) => this.createBubble(index)),
  );

  protected readonly starParticles = signal<StarParticle[]>(
    Array.from({ length: 55 }, (_, index) => this.createStarParticle(index)),
  );

  protected readonly constellationOrbs = signal<ConstellationOrb[]>(
    Array.from({ length: 7 }, (_, index) => this.createConstellationOrb(index)),
  );

  protected readonly meteorStreaks = signal<MeteorStreak[]>(
    Array.from({ length: 6 }, (_, index) => this.createMeteorStreak(index)),
  );

  protected readonly ripplePulses = signal<RipplePulse[]>(
    Array.from({ length: 14 }, (_, index) => this.createRipplePulse(index)),
  );

  constructor() {
    const intervalId = setInterval(() => {
      this.bubbles.set(this.bubbles().map((bubble) => this.refreshBubble(bubble)));
    }, 3000);

    this.destroyRef.onDestroy(() => clearInterval(intervalId));
  }

  protected reloadPage(event: Event): void {
    event.preventDefault();

    const path = window.location.pathname;
    if (path === '/' || path === '') {
      window.location.reload();
      return;
    }

    window.location.href = '/';
  }

  protected toggleEffectsMenu(): void {
    this.effectsMenuOpen.update((open) => !open);
  }

  protected selectEffect(effect: BackgroundEffect): void {
    this.selectedEffect.set(effect);
    this.effectsMenuOpen.set(false);
  }

  protected effectsToggleButtonClass(): string {
    const base =
      'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950';

    if (this.effectsMenuOpen()) {
      return `${base} border-white bg-zinc-100 text-zinc-950`;
    }

    return `${base} border-zinc-300/80 bg-transparent text-zinc-200 hover:border-white hover:text-white`;
  }

  protected selectLocale(locale: Locale): void {
    this.selectedLocale.set(locale);
  }

  protected toggleEmail(): void {
    this.emailRevealed.update((revealed) => !revealed);
  }

  protected async copyEmail(event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    try {
      await navigator.clipboard.writeText(this.emailAddress);
      this.emailCopied.set(true);
      setTimeout(() => this.emailCopied.set(false), 2000);
    } catch {
      // fallback silencioso se a API de clipboard não estiver disponível
    }
  }

  protected effectLabel(effect: BackgroundEffect): string {
    const isBR = this.selectedLocale() === 'BR';

    switch (effect) {
      case 'bubbles':
        return isBR ? this.effectBubbleLabelBR : this.effectBubbleLabelEN;
      case 'stars':
        return isBR ? this.effectSkyLabelBR : this.effectSkyLabelEN;
      case 'pulse':
        return isBR ? this.effectPulseLabelBR : this.effectPulseLabelEN;
    }
  }

  protected localeButtonClass(locale: Locale): string {
    const base =
      'relative z-10 inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50';

    if (this.selectedLocale() === locale) {
      return `${base} text-zinc-950`;
    }

    return `${base} text-zinc-200 hover:text-white`;
  }

  protected effectButtonClass(effect: BackgroundEffect): string {
    const base =
      'rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950';

    if (this.selectedEffect() === effect) {
      return `${base} border-white bg-zinc-100 text-zinc-950 shadow-sm hover:bg-white`;
    }

    return `${base} border-zinc-300/80 bg-zinc-950/50 text-zinc-200 hover:border-white hover:bg-zinc-900/70 hover:text-white`;
  }

  private refreshBubble(bubble: Bubble): Bubble {
    if (Math.random() < 0.2) {
      return this.createBubble(bubble.id);
    }

    return bubble;
  }

  private createBubble(id: number): Bubble {
    return {
      id,
      size: this.randomBetween(14, 68),
      left: this.randomBetween(0, 100),
      duration: this.randomBetween(10, 20),
      delay: this.randomBetween(-20, 0),
      drift: this.randomBetween(-70, 70),
      opacity: this.randomBetween(0.28, 0.78),
      willPop: Math.random() < 0.3,
    };
  }

  private createStarParticle(id: number): StarParticle {
    return {
      id,
      left: this.randomBetween(0, 100),
      top: this.randomBetween(0, 100),
      size: this.randomBetween(2, 5),
      duration: this.randomBetween(8, 22),
      delay: this.randomBetween(-22, 0),
      driftX: this.randomBetween(-80, 80),
      driftY: this.randomBetween(-60, 60),
      opacity: this.randomBetween(0.25, 0.85),
    };
  }

  private createConstellationOrb(id: number): ConstellationOrb {
    return {
      id,
      left: this.randomBetween(5, 95),
      top: this.randomBetween(5, 95),
      size: this.randomBetween(90, 220),
      duration: this.randomBetween(18, 32),
      delay: this.randomBetween(-30, 0),
      opacity: this.randomBetween(0.06, 0.18),
    };
  }

  private createMeteorStreak(id: number): MeteorStreak {
    return {
      id,
      top: this.randomBetween(5, 85),
      left: this.randomBetween(-10, 90),
      duration: this.randomBetween(2.5, 5.5),
      delay: this.randomBetween(-12, 8),
      length: this.randomBetween(80, 180),
      angle: this.randomBetween(-35, -15),
    };
  }

  private createRipplePulse(id: number): RipplePulse {
    return {
      id,
      left: this.randomBetween(8, 92),
      top: this.randomBetween(10, 90),
      duration: this.randomBetween(3.5, 7),
      delay: this.randomBetween(-14, 4),
      maxScale: this.randomBetween(2.5, 5.5),
      opacity: this.randomBetween(0.35, 0.75),
    };
  }

  private randomBetween(min: number, max: number): number {
    return Number((Math.random() * (max - min) + min).toFixed(2));
  }
}
