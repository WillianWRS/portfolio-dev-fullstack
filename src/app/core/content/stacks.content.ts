import type { StackCategorySource } from '../models/stack.model';

export const STACK_CATEGORIES_SOURCE: StackCategorySource[] = [
  {
    id: 'backend',
    labelBR: 'Backend',
    labelEN: 'Backend',
    items: [
      { name: 'Java', iconSlug: 'java', proficiency: 'daily' },
      { name: 'Spring Boot', iconSlug: 'springboot', proficiency: 'daily' },
      { name: 'Temporal', iconSlug: 'temporal', proficiency: 'daily' },
    ],
  },
  {
    id: 'frontend',
    labelBR: 'Frontend',
    labelEN: 'Frontend',
    items: [
      { name: 'Angular', iconSlug: 'angular', proficiency: 'daily' },
      { name: 'TypeScript', iconSlug: 'typescript', proficiency: 'daily' },
      { name: 'JavaScript', iconSlug: 'javascript', proficiency: 'daily' },
      { name: 'RxJS', iconSlug: 'reactivex', proficiency: 'daily' },
      { name: 'HTML5', iconSlug: 'html5', proficiency: 'daily' },
      { name: 'CSS3', iconSlug: 'css3', proficiency: 'daily' },
      { name: 'Tailwind CSS', iconSlug: 'tailwindcss', proficiency: 'daily' },
    ],
  },
  {
    id: 'database',
    labelBR: 'Banco de dados',
    labelEN: 'Database',
    items: [
      { name: 'PostgreSQL', iconSlug: 'postgresql', proficiency: 'daily' },
      { name: 'MySQL', iconSlug: 'mysql', proficiency: 'daily' },
      { name: 'MongoDB', iconSlug: 'mongodb', proficiency: 'daily' },
    ],
  },
  {
    id: 'ai',
    labelBR: 'IA',
    labelEN: 'AI',
    items: [
      { name: 'ChatGPT', proficiency: 'daily' },
      { name: 'Gemini', iconSlug: 'googlegemini', proficiency: 'daily' },
      { name: 'Grok', proficiency: 'daily' },
      { name: 'Cursor', iconSlug: 'cursor', proficiency: 'daily' },
      { name: 'BMAD', iconSlug: 'bmad', proficiency: 'daily' },
    ],
  },
];

export const STACK_ICON_SLUGS = [
  ...new Set(
    STACK_CATEGORIES_SOURCE.flatMap((category) =>
      category.items.flatMap((item) => (item.iconSlug ? [item.iconSlug] : [])),
    ),
  ),
];
