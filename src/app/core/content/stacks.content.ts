import type { StackCategorySource } from '../models/stack.model';

export const STACK_CATEGORIES_SOURCE: StackCategorySource[] = [
  {
    id: 'backend',
    labelBR: 'Backend',
    labelEN: 'Backend',
    items: [
      { name: 'Java', iconSlug: 'java' },
      { name: 'Spring Boot', iconSlug: 'springboot' },
      { name: 'Node.js', iconSlug: 'nodedotjs' },
      { name: 'NestJS', iconSlug: 'nestjs' },
      { name: 'Go', iconSlug: 'go' },
      { name: 'Kafka', iconSlug: 'apachekafka' },
    ],
  },
  {
    id: 'frontend',
    labelBR: 'Frontend',
    labelEN: 'Frontend',
    items: [
      { name: 'Angular', iconSlug: 'angular' },
      { name: 'TypeScript', iconSlug: 'typescript' },
      { name: 'RxJS', iconSlug: 'reactivex' },
      { name: 'Tailwind CSS', iconSlug: 'tailwindcss' },
      { name: 'HTML5', iconSlug: 'html5' },
      { name: 'CSS3', iconSlug: 'css3' },
    ],
  },
  {
    id: 'database',
    labelBR: 'Banco de dados',
    labelEN: 'Database',
    items: [
      { name: 'PostgreSQL', iconSlug: 'postgresql' },
      { name: 'MongoDB', iconSlug: 'mongodb' },
      { name: 'Redis', iconSlug: 'redis' },
      { name: 'H2', iconSlug: 'h2database' },
    ],
  },
  {
    id: 'ai',
    labelBR: 'IA',
    labelEN: 'AI',
    items: [
      { name: 'Python', iconSlug: 'python' },
      { name: 'LangChain', iconSlug: 'langchain' },
      { name: 'Cursor', iconSlug: 'cursor' },
    ],
  },
];

export const STACK_ICON_SLUGS = [
  ...new Set(STACK_CATEGORIES_SOURCE.flatMap((category) => category.items.map((item) => item.iconSlug))),
];
