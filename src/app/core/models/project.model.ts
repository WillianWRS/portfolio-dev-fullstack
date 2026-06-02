export const PROJECT_PLACEHOLDER_IMAGE = '/settings.png';

export interface ProjectSource {
  title: string;
  imageUrl: string;
  descriptionBR: string;
  descriptionEN: string;
  stacks: readonly string[];
}

export interface ProjectView {
  title: string;
  description: string;
  stacks: string[];
  imageUrl: string;
}

export function isProjectUnderConstruction(imageUrl: string): boolean {
  return imageUrl === PROJECT_PLACEHOLDER_IMAGE;
}
