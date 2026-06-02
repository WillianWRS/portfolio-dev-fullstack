export type ProjectStatus = 'live' | 'demo' | 'private' | 'construction';
export type ProjectCategory = 'fullstack' | 'backend' | 'frontend' | 'infra';

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
  stacks: readonly string[];
  status: ProjectStatus;
  category: ProjectCategory;
  featured?: boolean;
  year: number;
  roleBR: string;
  roleEN: string;
  githubUrl?: string;
  liveUrl?: string;
  metrics?: readonly ProjectMetricSource[];
  caseStudy?: ProjectCaseStudySource;
}

export interface ProjectView {
  id: string;
  title: string;
  description: string;
  stacks: string[];
  imageUrl: string;
  status: ProjectStatus;
  statusLabel: string;
  category: ProjectCategory;
  categoryLabel: string;
  featured: boolean;
  year: number;
  role: string;
  githubUrl?: string;
  liveUrl?: string;
  metrics: { value: string; label: string }[];
  caseStudy?: { problem: string; solution: string; outcome: string };
  hasCaseStudy: boolean;
}

export const PROJECT_PLACEHOLDER_IMAGE = '/settings.png';

export function isProjectUnderConstruction(project: Pick<ProjectSource, 'status' | 'imageUrl'>): boolean {
  return project.status === 'construction' || project.imageUrl === PROJECT_PLACEHOLDER_IMAGE;
}
