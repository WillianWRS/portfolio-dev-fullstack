import { Component, DestroyRef, inject, signal } from '@angular/core';

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
})
export class Home {
  private readonly destroyRef = inject(DestroyRef);

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

  protected selectEffect(effect: BackgroundEffect): void {
    this.selectedEffect.set(effect);
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
