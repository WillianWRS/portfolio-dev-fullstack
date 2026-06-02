export type StackCategoryId = 'backend' | 'frontend' | 'database' | 'ai';

export interface StackItem {
  name: string;
  iconSlug: string;
}

export interface StackCategorySource {
  id: StackCategoryId;
  labelBR: string;
  labelEN: string;
  items: StackItem[];
}

export interface StackCategoryView {
  id: StackCategoryId;
  label: string;
  items: StackItem[];
}
