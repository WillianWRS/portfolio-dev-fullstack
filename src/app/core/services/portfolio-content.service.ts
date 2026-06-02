import { computed, inject, Injectable } from '@angular/core';
import { EXPERIENCE_SOURCE } from '../content/experience.content';
import { PROJECTS_SOURCE } from '../content/projects.content';
import {
  CALENDAR_URL,
  CV_URL_BR,
  CV_URL_EN,
  GITHUB_REPO_URL,
  PROFILE_NAME,
  PROFILE_PHOTO_URL,
} from '../content/profile.content';
import { STACK_CATEGORIES_SOURCE } from '../content/stacks.content';
import { TESTIMONIALS_SOURCE } from '../content/testimonials.content';
import type { ExperienceView } from '../models/experience.model';
import {
  isProjectUnderConstruction,
  type ProjectCategory,
  type ProjectSource,
  type ProjectStatus,
  type ProjectView,
} from '../models/project.model';
import type { StackCategoryView, StackProficiency } from '../models/stack.model';
import type { TestimonialView } from '../models/testimonial.model';
import { translate } from '../i18n/translations';
import { LocaleService } from './locale.service';

@Injectable({ providedIn: 'root' })
export class PortfolioContentService {
  private readonly localeService = inject(LocaleService);

  readonly profile = computed(() => {
    const locale = this.localeService.locale();

    return {
      name: PROFILE_NAME,
      title: translate(locale, 'profile.title'),
      headline: translate(locale, 'profile.headline'),
      bio: translate(locale, 'profile.bio'),
      photoUrl: PROFILE_PHOTO_URL,
    };
  });

  readonly photoAlt = computed(() => {
    const locale = this.localeService.locale();
    const prefix = translate(locale, 'photo.altPrefix');

    return `${prefix} ${PROFILE_NAME}`;
  });

  readonly cvUrl = computed(() =>
    this.localeService.locale() === 'BR' ? CV_URL_BR : CV_URL_EN,
  );

  readonly calendarUrl = computed(() => CALENDAR_URL);

  readonly githubRepoUrl = computed(() => GITHUB_REPO_URL);

  readonly projects = computed<ProjectView[]>(() => {
    const locale = this.localeService.locale();
    const isBR = locale === 'BR';

    return PROJECTS_SOURCE.map((project) => this.mapProject(project, isBR, locale));
  });

  readonly experience = computed<ExperienceView[]>(() => {
    const locale = this.localeService.locale();
    const isBR = locale === 'BR';

    return EXPERIENCE_SOURCE.map((item) => ({
      id: item.id,
      company: item.company,
      role: isBR ? item.roleBR : item.roleEN,
      period: isBR ? item.periodBR : item.periodEN,
      highlights: [...(isBR ? item.highlightsBR : item.highlightsEN)],
      stacks: [...item.stacks],
      current: item.current ?? false,
    }));
  });

  readonly testimonials = computed<TestimonialView[]>(() => {
    const locale = this.localeService.locale();
    const isBR = locale === 'BR';

    return TESTIMONIALS_SOURCE.map((item) => ({
      id: item.id,
      author: item.author,
      role: isBR ? item.roleBR : item.roleEN,
      company: item.company,
      quote: isBR ? item.quoteBR : item.quoteEN,
    }));
  });

  readonly stackCategories = computed<StackCategoryView[]>(() => {
    const locale = this.localeService.locale();

    return STACK_CATEGORIES_SOURCE.map((category) => ({
      id: category.id,
      label: locale === 'BR' ? category.labelBR : category.labelEN,
      items: category.items.map((item) => ({
        name: item.name,
        iconSlug: item.iconSlug,
        proficiency: item.proficiency,
        proficiencyLabel: this.proficiencyLabel(item.proficiency, locale),
      })),
    }));
  });

  private mapProject(
    project: ProjectSource,
    isBR: boolean,
    locale: ReturnType<LocaleService['locale']>,
  ): ProjectView {
    const underConstruction = isProjectUnderConstruction(project);

    return {
      id: project.id,
      title: project.title,
      description: underConstruction
        ? translate(locale, 'projects.underConstruction')
        : isBR
          ? project.descriptionBR
          : project.descriptionEN,
      stacks: [...project.stacks],
      imageUrl: project.imageUrl,
      status: project.status,
      statusLabel: this.statusLabel(project.status, locale),
      category: project.category,
      categoryLabel: this.categoryLabel(project.category, locale),
      featured: project.featured ?? false,
      year: project.year,
      role: isBR ? project.roleBR : project.roleEN,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      metrics: (project.metrics ?? []).map((metric) => ({
        value: metric.value,
        label: isBR ? metric.labelBR : metric.labelEN,
      })),
      caseStudy: project.caseStudy
        ? {
            problem: isBR ? project.caseStudy.problemBR : project.caseStudy.problemEN,
            solution: isBR ? project.caseStudy.solutionBR : project.caseStudy.solutionEN,
            outcome: isBR ? project.caseStudy.outcomeBR : project.caseStudy.outcomeEN,
          }
        : undefined,
      hasCaseStudy: !!project.caseStudy,
    };
  }

  private statusLabel(status: ProjectStatus, locale: ReturnType<LocaleService['locale']>): string {
    const keys = {
      live: 'projects.statusLive',
      demo: 'projects.statusDemo',
      private: 'projects.statusPrivate',
      construction: 'projects.statusConstruction',
    } as const;

    return translate(locale, keys[status]);
  }

  private categoryLabel(
    category: ProjectCategory,
    locale: ReturnType<LocaleService['locale']>,
  ): string {
    const keys = {
      fullstack: 'projects.filterFullstack',
      backend: 'projects.filterBackend',
      frontend: 'projects.filterFrontend',
      infra: 'projects.filterInfra',
    } as const;

    return translate(locale, keys[category]);
  }

  private proficiencyLabel(
    proficiency: StackProficiency,
    locale: ReturnType<LocaleService['locale']>,
  ): string {
    const keys = {
      daily: 'stacks.proficiencyDaily',
      familiar: 'stacks.proficiencyFamiliar',
      learning: 'stacks.proficiencyLearning',
    } as const;

    return translate(locale, keys[proficiency]);
  }
}
