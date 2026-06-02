import type { StackCategorySource } from '../models/stack.model';

export const STACK_CATEGORIES_SOURCE: StackCategorySource[] = [
  {
    id: 'backend',
    labelBR: 'Backend',
    labelEN: 'Backend',
    items: [
      { name: 'Java', iconSlug: 'java', proficiency: 'daily' },
      { name: 'Spring Boot', iconSlug: 'springboot', proficiency: 'daily' },
      { name: 'Node.js', iconSlug: 'nodedotjs', proficiency: 'daily' },
      { name: 'NestJS', iconSlug: 'nestjs', proficiency: 'daily' },
      { name: 'Go', iconSlug: 'go', proficiency: 'familiar' },
      { name: 'Kafka', iconSlug: 'apachekafka', proficiency: 'familiar' },
    ],
  },
  {
    id: 'frontend',
    labelBR: 'Frontend',
    labelEN: 'Frontend',
    items: [
      { name: 'Angular', iconSlug: 'angular', proficiency: 'daily' },
      { name: 'TypeScript', iconSlug: 'typescript', proficiency: 'daily' },
      { name: 'RxJS', iconSlug: 'reactivex', proficiency: 'daily' },
      { name: 'Tailwind CSS', iconSlug: 'tailwindcss', proficiency: 'daily' },
      { name: 'HTML5', iconSlug: 'html5', proficiency: 'daily' },
      { name: 'CSS3', iconSlug: 'css3', proficiency: 'daily' },
    ],
  },
  {
    id: 'database',
    labelBR: 'Banco de dados',
    labelEN: 'Database',
    items: [
      { name: 'PostgreSQL', iconSlug: 'postgresql', proficiency: 'daily' },
      { name: 'MongoDB', iconSlug: 'mongodb', proficiency: 'familiar' },
      { name: 'Redis', iconSlug: 'redis', proficiency: 'daily' },
      { name: 'H2', iconSlug: 'h2database', proficiency: 'familiar' },
    ],
  },
  {
    id: 'ai',
    labelBR: 'IA',
    labelEN: 'AI',
    items: [
      { name: 'Python', iconSlug: 'python', proficiency: 'familiar' },
      { name: 'LangChain', iconSlug: 'langchain', proficiency: 'learning' },
      { name: 'Cursor', iconSlug: 'cursor', proficiency: 'daily' },
    ],
  },
];

export const STACK_ICON_SLUGS = [
  ...new Set(STACK_CATEGORIES_SOURCE.flatMap((category) => category.items.map((item) => item.iconSlug))),
];
