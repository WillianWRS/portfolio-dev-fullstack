import { Component, computed, DestroyRef, inject, signal } from '@angular/core';

type Locale = 'BR' | 'EN';

interface Project {
  title: string;
  description: string;
  stacks: string[];
  imageUrl: string;
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

  protected readonly projectUnderConstructionBR = 'Em construção';
  protected readonly projectUnderConstructionEN = 'Under construction';

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
  ] as const;

  protected readonly selectedProjectIndex = signal(0);

  protected readonly projects = computed<Project[]>(() => {
    const isBR = this.selectedLocale() === 'BR';

    return this.projectsSource.map((project) => {
      const isUnderConstruction = project.imageUrl === '/settings.png';

      return {
        title: project.title,
        description: isUnderConstruction
          ? isBR
            ? this.projectUnderConstructionBR
            : this.projectUnderConstructionEN
          : isBR
            ? project.descriptionBR
            : project.descriptionEN,
        stacks: [...project.stacks],
        imageUrl: project.imageUrl,
      };
    });
  });

  protected readonly selectedProject = computed(
    () => this.projects()[this.selectedProjectIndex()],
  );

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

  protected selectProject(index: number): void {
    this.selectedProjectIndex.set(index);
  }

  protected projectListItemClass(index: number): string {
    const base =
      'inline-flex w-full items-center gap-2.5 py-5 text-left text-lg transition-[color,font-size] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 rounded-sm';

    if (this.selectedProjectIndex() === index) {
      return `${base} text-[1.2375rem] font-semibold text-zinc-900`;
    }

    return `${base} font-medium text-zinc-500 hover:text-[1.18125rem] hover:text-zinc-800`;
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
