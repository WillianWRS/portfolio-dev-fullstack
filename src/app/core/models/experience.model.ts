export interface ExperienceSource {
  id: string;
  company: string;
  roleBR: string;
  roleEN: string;
  periodBR: string;
  periodEN: string;
  highlightsBR: readonly string[];
  highlightsEN: readonly string[];
  stacks: readonly string[];
  current?: boolean;
}

export interface ExperienceView {
  id: string;
  company: string;
  role: string;
  period: string;
  highlights: string[];
  stacks: string[];
  current: boolean;
}
