export interface TestimonialSource {
  id: string;
  author: string;
  roleBR: string;
  roleEN: string;
  company: string;
  quoteBR: string;
  quoteEN: string;
}

export interface TestimonialView {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
}
