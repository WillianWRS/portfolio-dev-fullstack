import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { HABIT_BUILDER_IMAGE } from '@core/config/critical-assets.config';
import type { ProgressiveAsset } from '@core/config/critical-assets.config';
import { FocusTrapDirective } from '@shared/directives/focus-trap.directive';
import { AppIcon } from '@shared/ui/app-icon/app-icon';
import { ProgressiveImage } from '@shared/ui/progressive-image/progressive-image';
import { StackChip } from '@shared/ui/stack-chip/stack-chip';
import type { ProjectView } from '@core/models/project.model';
import { LocaleService } from '@core/services/locale.service';
import { PortfolioContentService } from '@core/services/portfolio-content.service';

const FADE_DURATION_MS = 220;
const MOBILE_MEDIA_QUERY = '(max-width: 767px)';
const MOBILE_PROJECT_IDS = ['wrs-habit-builder', 'project-math', 'profissionais'] as const;

@Component({
  selector: 'app-projects',
  imports: [AppIcon, StackChip, FocusTrapDirective, ProgressiveImage, NgTemplateOutlet],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly localeService = inject(LocaleService);
  protected readonly content = inject(PortfolioContentService);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly selectedProjectId = signal<string | null>(null);
  protected readonly caseStudyOpen = signal(false);
  protected readonly isAnimating = signal(false);
  protected readonly fadeStep = signal<'idle' | 'exit' | 'enter'>('idle');
  protected readonly fadeDirection = signal<'right' | 'left' | null>(null);
  protected readonly instantTransition = signal(false);
  private readonly isMobileViewport = signal(false);

  private readonly caseStudyTrigger = signal<HTMLElement | null>(null);
  private pendingProjectId: string | null = null;
  private fadeFallbackTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private mobileMediaQuery: MediaQueryList | null = null;
  private preloadedImageUrls = new Set<string>();

  protected readonly projects = computed(() => this.content.projects());

  protected readonly displayProjects = computed(() => {
    const all = this.projects();

    if (!this.isMobileViewport()) {
      return all;
    }

    return MOBILE_PROJECT_IDS.flatMap((id) => {
      const project = all.find((item) => item.id === id);

      return project ? [project] : [];
    });
  });

  protected readonly selectedIndex = computed(() => {
    const selectedId = this.selectedProjectId();

    return this.displayProjects().findIndex((project) => project.id === selectedId);
  });

  protected readonly selectedProject = computed(() => {
    const list = this.displayProjects();
    const selectedId = this.selectedProjectId();
    const selected = list.find((project) => project.id === selectedId);

    return selected ?? list[0];
  });

  protected readonly canGoPrev = computed(() => this.selectedIndex() > 0);

  protected readonly canGoNext = computed(() => {
    const list = this.displayProjects();

    return list.length > 0 && this.selectedIndex() < list.length - 1;
  });

  constructor() {
    effect(() => {
      this.preloadProjectImages(this.displayProjects());
    });

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      this.mobileMediaQuery =
        typeof window.matchMedia === 'function' ? window.matchMedia(MOBILE_MEDIA_QUERY) : null;

      this.isMobileViewport.set(this.mobileMediaQuery?.matches ?? false);
      this.syncSelectionToActiveList();
      this.mobileMediaQuery?.addEventListener('change', this.onMobileViewportChange);

      this.destroyRef.onDestroy(() => {
        this.clearFadeFallback();
        this.mobileMediaQuery?.removeEventListener('change', this.onMobileViewportChange);
      });
    });
  }

  protected selectProject(projectId: string): void {
    if (this.isAnimating()) {
      return;
    }

    this.selectedProjectId.set(projectId);
    this.caseStudyOpen.set(false);
  }

  protected nextProject(): void {
    if (this.isAnimating() || !this.canGoNext()) {
      return;
    }

    this.navigateToIndex(this.selectedIndex() + 1, 'left');
  }

  protected prevProject(): void {
    if (this.isAnimating() || !this.canGoPrev()) {
      return;
    }

    this.navigateToIndex(this.selectedIndex() - 1, 'right');
  }

  protected openCaseStudy(event?: Event): void {
    const trigger = event?.currentTarget;
    this.caseStudyTrigger.set(trigger instanceof HTMLElement ? trigger : null);
    this.caseStudyOpen.set(true);
  }

  protected closeCaseStudy(): void {
    this.caseStudyOpen.set(false);
    queueMicrotask(() => this.caseStudyTrigger()?.focus());
    this.caseStudyTrigger.set(null);
  }

  protected onPanelTransitionEnd(event: TransitionEvent): void {
    if (event.target !== event.currentTarget || event.propertyName !== 'opacity') {
      return;
    }

    if (!this.isAnimating()) {
      return;
    }

    if (this.fadeStep() === 'exit') {
      this.beginEnterTransition();
      return;
    }

    if (this.fadeStep() === 'idle') {
      this.finishFadeTransition();
    }
  }

  protected statusClass(status: ProjectView['status']): string {
    switch (status) {
      case 'live':
        return 'project-status--live';
      case 'demo':
        return 'project-status--demo';
      case 'private':
        return 'project-status--private';
      case 'construction':
        return 'project-status--construction';
    }
  }

  protected progressiveImageAsset(project: ProjectView): ProgressiveAsset | null {
    if (project.id === 'wrs-habit-builder') {
      return HABIT_BUILDER_IMAGE;
    }

    return null;
  }

  private readonly onMobileViewportChange = (): void => {
    this.isMobileViewport.set(this.mobileMediaQuery?.matches ?? false);
    this.syncSelectionToActiveList();
  };

  private navigateToIndex(targetIndex: number, direction: 'right' | 'left'): void {
    const list = this.displayProjects();
    const currentIndex = this.selectedIndex();
    const targetProject = list[targetIndex];

    if (
      !targetProject ||
      targetIndex === currentIndex ||
      targetIndex < 0 ||
      targetIndex >= list.length
    ) {
      return;
    }

    this.caseStudyOpen.set(false);

    if (!this.shouldAnimateFade() || this.isAnimating()) {
      if (this.isAnimating()) {
        return;
      }

      this.selectedProjectId.set(targetProject.id);
      return;
    }

    this.pendingProjectId = targetProject.id;
    this.fadeDirection.set(direction);
    this.fadeStep.set('exit');
    this.isAnimating.set(true);
    this.scheduleFadeFallback();
  }

  private beginEnterTransition(): void {
    const pendingId = this.pendingProjectId;

    if (!pendingId) {
      this.finishFadeTransition();
      return;
    }

    this.selectedProjectId.set(pendingId);
    this.pendingProjectId = null;
    this.instantTransition.set(true);
    this.fadeStep.set('enter');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.instantTransition.set(false);
        this.fadeStep.set('idle');
      });
    });
  }

  private finishFadeTransition(): void {
    this.clearFadeFallback();
    this.instantTransition.set(false);
    this.fadeStep.set('idle');
    this.fadeDirection.set(null);
    this.pendingProjectId = null;
    this.isAnimating.set(false);
  }

  private scheduleFadeFallback(): void {
    this.clearFadeFallback();
    this.fadeFallbackTimeoutId = setTimeout(() => {
      this.fadeFallbackTimeoutId = null;

      if (!this.isAnimating()) {
        return;
      }

      if (this.fadeStep() === 'exit') {
        this.beginEnterTransition();
        return;
      }

      if (this.fadeStep() === 'idle') {
        this.finishFadeTransition();
      }
    }, FADE_DURATION_MS * 2 + 120);
  }

  private clearFadeFallback(): void {
    if (this.fadeFallbackTimeoutId === null) {
      return;
    }

    clearTimeout(this.fadeFallbackTimeoutId);
    this.fadeFallbackTimeoutId = null;
  }

  private syncSelectionToActiveList(): void {
    const list = this.displayProjects();
    const selectedId = this.selectedProjectId();

    if (list.length === 0) {
      this.selectedProjectId.set(null);
      return;
    }

    if (!selectedId || !list.some((project) => project.id === selectedId)) {
      this.selectedProjectId.set(list[0].id);
    }
  }

  private preloadProjectImages(projects: ProjectView[]): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    for (const project of projects) {
      this.preloadImageUrl(project.imageUrl);

      const progressive = this.progressiveImageAsset(project);

      if (progressive) {
        this.preloadImageUrl(progressive.full);
        this.preloadImageUrl(progressive.lq);
      }
    }
  }

  private preloadImageUrl(url: string): void {
    if (!url || this.preloadedImageUrls.has(url)) {
      return;
    }

    this.preloadedImageUrls.add(url);

    const image = new Image();
    image.decoding = 'async';
    image.src = url;
  }

  private shouldAnimateFade(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    if (this.matchesReducedMotion()) {
      return false;
    }

    return this.matchesMediaQuery(MOBILE_MEDIA_QUERY);
  }

  private matchesMediaQuery(query: string): boolean {
    if (!isPlatformBrowser(this.platformId) || typeof window.matchMedia !== 'function') {
      return false;
    }

    return window.matchMedia(query).matches;
  }

  private matchesReducedMotion(): boolean {
    return this.matchesMediaQuery('(prefers-reduced-motion: reduce)');
  }
}
