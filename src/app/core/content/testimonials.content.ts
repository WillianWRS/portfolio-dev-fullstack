import type { TestimonialSource } from '../models/testimonial.model';

export const TESTIMONIALS_SOURCE: readonly TestimonialSource[] = [
  {
    id: 'marina-costa',
    author: 'Marina Costa',
    roleBR: 'Engineering Manager',
    roleEN: 'Engineering Manager',
    company: 'TechFlow Solutions',
    quoteBR:
      'Willian combina visão arquitetural com entrega consistente. Foi peça-chave na migração para microsserviços — sempre propõe soluções pragmáticas sem perder qualidade técnica.',
    quoteEN:
      'Willian combines architectural vision with consistent delivery. He was key to our microservices migration — always proposing pragmatic solutions without sacrificing technical quality.',
  },
  {
    id: 'rafael-mendes',
    author: 'Rafael Mendes',
    roleBR: 'Tech Lead',
    roleEN: 'Tech Lead',
    company: 'DataStream Labs',
    quoteBR:
      'Trabalhar com Willian elevou o padrão do time. Code reviews detalhados, documentação clara e domínio tanto de frontend quanto backend. Recomendo sem hesitar.',
    quoteEN:
      'Working with Willian raised the team standard. Detailed code reviews, clear documentation, and mastery of both frontend and backend. I recommend him without hesitation.',
  },
  {
    id: 'camila-oliveira',
    author: 'Camila Oliveira',
    roleBR: 'Product Owner',
    roleEN: 'Product Owner',
    company: 'Inovare Digital',
    quoteBR:
      'Raro encontrar um dev que traduz requisitos de negócio em soluções técnicas elegantes. Willian sempre antecipa riscos e comunica trade-offs de forma acessível.',
    quoteEN:
      'Rare to find a developer who translates business requirements into elegant technical solutions. Willian always anticipates risks and communicates trade-offs accessibly.',
  },
];
