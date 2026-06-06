import type { TestimonialSource } from '../models/testimonial.model';

function createEmptyTestimonialSlot(index: number): TestimonialSource {
  return {
    id: `testimonial-slot-${index}`,
    placeholder: true,
    placeholderIndex: index,
    author: '',
    roleBR: '',
    roleEN: '',
    contextBR: '',
    contextEN: '',
    avatarUrl: '',
    sourceUrl: '',
    quoteBR: '',
    quoteEN: '',
  };
}

export const TESTIMONIALS_SOURCE: readonly TestimonialSource[] = [
  {
    id: 'pedro-foganholi',
    author: 'Pedro Luiz Foganholi',
    roleBR: 'Desenvolvedor Backend | Java | Spring Boot | Microserviços | MySQL | MongoDB | Docker | Testes',
    roleEN: 'Backend Developer | Java | Spring Boot | Microservices | MySQL | MongoDB | Docker | Testing',
    contextBR:
      '8 de fevereiro de 2023, Pedro Luiz era sênior em relação a Willian mas não supervisionava Willian diretamente',
    contextEN:
      'February 8, 2023, Pedro Luiz was senior to Willian but did not directly supervise Willian',
    avatarUrl: '/pedro.png',
    sourceUrl: 'https://www.linkedin.com/in/willian-robert-scabora-85a94217b/details/recommendations/',
    quoteBR:
      'Trabalho a bastante tempo com Willian onde entramos com não muita diferença de tempo. Nesse período que ficamos nos mesmos projetos vi a força de vontade apresentada por Willian nas tarefas e a humildade para receber criticas construtivas e assim se tornar um profissional melhor. Busca sempre fazer coisas novas e claro, da forma correta para melhor escalabilidade dos projetos em que trabalha.',
    quoteEN:
      'I have worked with Willian for quite a while; we joined around the same time. During the period we shared projects, I saw the drive Willian brings to tasks and the humility to accept constructive criticism and grow as a professional. He always seeks to do new things the right way, with scalability in mind for the projects he works on.',
  },
  createEmptyTestimonialSlot(1),
  createEmptyTestimonialSlot(2),
];
