import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AppIcon } from '@shared/ui/app-icon/app-icon';
import type { ProjectCategory, ProjectView } from '@core/models/project.model';
import { LocaleService } from '@core/services/locale.service';
import { PortfolioContentService } from '@core/services/portfolio-content.service';

type ProjectFilter = 'all' | ProjectCategory;

@Component({
  selector: 'app-projects',  imports: [AppIcon],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly localeService = inject(LocaleService);
  protected readonly content = inject(PortfolioContentService);

  protected readonly activeFilter = signal<ProjectFilter>('all');
  protected readonly selectedIndex = signal(0);
  protected readonly caseStudyOpen = signal(false);

  protected readonly filters: readonly ProjectFilter[] = [
    'all',
    'fullstack',
    'backend',
    'frontend',
    'infra',
  ];

  protected readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    const projects = this.content.projects();

    if (filter === 'all') {
      return projects;
    }

    return projects.filter((project) => project.category === filter);
  });

  protected readonly selectedProject = computed(() => {
    const projects = this.filteredProjects();
    const index = this.selectedIndex();

    return projects[index] ?? projects[0];
  });

  protected setFilter(filter: ProjectFilter): void {
    this.activeFilter.set(filter);
    this.selectedIndex.set(0);
    this.caseStudyOpen.set(false);
  }

  protected selectProject(index: number): void {
    this.selectedIndex.set(index);
    this.caseStudyOpen.set(false);
  }

  protected openCaseStudy(): void {
    this.caseStudyOpen.set(true);
  }

  protected closeCaseStudy(): void {
    this.caseStudyOpen.set(false);
  }

  protected filterLabel(filter: ProjectFilter): string {
    switch (filter) {
      case 'all':
        return this.localeService.t('projects.filterAll');
      case 'fullstack':
        return this.localeService.t('projects.filterFullstack');
      case 'backend':
        return this.localeService.t('projects.filterBackend');
      case 'frontend':
        return this.localeService.t('projects.filterFrontend');
      case 'infra':
        return this.localeService.t('projects.filterInfra');
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
}
