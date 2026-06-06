export interface ExperienceProgressionStep {
  roleBR: string;
  roleEN: string;
  periodBR: string;
  periodEN: string;
}

export interface ExperienceSource {
  id: string;
  company: string;
  roleBR: string;
  roleEN: string;
  periodBR: string;
  periodEN: string;
  locationBR?: string;
  locationEN?: string;
  highlightsBR: readonly string[];
  highlightsEN: readonly string[];
  stacks: readonly string[];
  progression?: readonly ExperienceProgressionStep[];
  current?: boolean;
}

export interface ExperienceProgressionView {
  role: string;
  period: string;
}

export interface ExperienceView {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  stacks: string[];
  progression: ExperienceProgressionView[];
  current: boolean;
}
