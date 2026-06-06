export interface TestimonialSource {
  id: string;
  placeholder?: boolean;
  placeholderIndex?: number;
  author: string;
  roleBR: string;
  roleEN: string;
  contextBR: string;
  contextEN: string;
  avatarUrl: string;
  sourceUrl: string;
  quoteBR: string;
  quoteEN: string;
}

export interface TestimonialView {
  id: string;
  isPlaceholder: boolean;
  author: string;
  role: string;
  context: string;
  avatarUrl: string;
  sourceUrl: string;
  quote: string;
}
