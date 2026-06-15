export type ProjectStatus = 'live' | 'demo' | 'private' | 'construction';
export type ProjectCategory = 'fullstack' | 'backend' | 'frontend' | 'infra';

export interface ProjectStackSource {
  name: string;
  iconSlug?: string;
}

export interface ProjectStackView {
  name: string;
  iconSlug?: string;
}

export interface ProjectMetricSource {
  value: string;
  labelBR: string;
  labelEN: string;
}

export interface ProjectCaseStudySource {
  problemBR: string;
  problemEN: string;
  solutionBR: string;
  solutionEN: string;
  outcomeBR: string;
  outcomeEN: string;
}

export interface ProjectSource {
  id: string;
  title: string;
  imageUrl: string;
  descriptionBR: string;
  descriptionEN: string;
  stacks: readonly ProjectStackSource[];
  status: ProjectStatus;
  category: ProjectCategory;
  featured?: boolean;
  placeholder?: boolean;
  placeholderIndex?: number;
  year: number;
  githubUrl?: string;
  liveUrl?: string;
  metrics?: readonly ProjectMetricSource[];
  caseStudy?: ProjectCaseStudySource;
}

export interface ProjectView {
  id: string;
  title: string;
  description: string;
  stacks: ProjectStackView[];
  imageUrl: string;
  status: ProjectStatus;
  statusLabel: string;
  category: ProjectCategory;
  categoryLabel: string;
  featured: boolean;
  isPlaceholder: boolean;
  year: number | string;
  githubUrl?: string;
  liveUrl?: string;
  metrics: { value: string; label: string }[];
  caseStudy?: { problem: string; solution: string; outcome: string };
  hasCaseStudy: boolean;
}

export const PROJECT_PLACEHOLDER_IMAGE = '/settings.png';

export function isProjectUnderConstruction(
  project: Pick<ProjectSource, 'status' | 'imageUrl' | 'placeholder'>,
): boolean {
  return (
    project.placeholder === true ||
    project.status === 'construction' ||
    project.imageUrl === PROJECT_PLACEHOLDER_IMAGE
  );
}
