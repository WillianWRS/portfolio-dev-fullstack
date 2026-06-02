import { computed, inject, Injectable } from '@angular/core';
import { PROJECTS_SOURCE } from '../content/projects.content';
import { PROFILE_NAME, PROFILE_PHOTO_URL } from '../content/profile.content';
import { STACK_CATEGORIES_SOURCE } from '../content/stacks.content';
import { isProjectUnderConstruction, type ProjectView } from '../models/project.model';
import type { StackCategoryView } from '../models/stack.model';
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
      bio: translate(locale, 'profile.bio'),
      photoUrl: PROFILE_PHOTO_URL,
    };
  });

  readonly photoAlt = computed(() => {
    const locale = this.localeService.locale();
    const prefix = translate(locale, 'photo.altPrefix');

    return `${prefix} ${PROFILE_NAME}`;
  });

  readonly projects = computed<ProjectView[]>(() => {
    const locale = this.localeService.locale();
    const isBR = locale === 'BR';
    const underConstruction = translate(locale, 'projects.underConstruction');

    return PROJECTS_SOURCE.map((project) => {
      const isPlaceholder = isProjectUnderConstruction(project.imageUrl);

      return {
        title: project.title,
        description: isPlaceholder
          ? underConstruction
          : isBR
            ? project.descriptionBR
            : project.descriptionEN,
        stacks: [...project.stacks],
        imageUrl: project.imageUrl,
      };
    });
  });

  readonly stackCategories = computed<StackCategoryView[]>(() => {
    const locale = this.localeService.locale();
    const isBR = locale === 'BR';

    return STACK_CATEGORIES_SOURCE.map((category) => ({
      id: category.id,
      label: isBR ? category.labelBR : category.labelEN,
      items: category.items,
    }));
  });
}
