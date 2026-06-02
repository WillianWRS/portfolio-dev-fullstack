export type StackCategoryId = 'backend' | 'frontend' | 'database' | 'ai';
export type StackProficiency = 'daily' | 'familiar' | 'learning';

export interface StackItem {
  name: string;
  iconSlug: string;
  proficiency: StackProficiency;
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
  items: StackItemView[];
}

export interface StackItemView {
  name: string;
  iconSlug: string;
  proficiency: StackProficiency;
  proficiencyLabel: string;
}
