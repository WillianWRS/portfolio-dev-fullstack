import { describe, expect, it } from 'vitest';
import { PROJECTS_SOURCE } from './projects.content';
import { isProjectUnderConstruction } from '../models/project.model';
import { translate } from '../i18n/translations';

describe('portfolio content', () => {
  it('marks placeholder projects as under construction', () => {
    const placeholder = PROJECTS_SOURCE.find((p) => p.placeholder);
    expect(placeholder).toBeDefined();
    expect(isProjectUnderConstruction(placeholder!)).toBe(true);
  });

  it('translates placeholder description per locale', () => {
    expect(translate('BR', 'projects.placeholderDescription')).toBe('Espaço para descrição');
    expect(translate('EN', 'projects.placeholderDescription')).toBe('Space for description');
  });

  it('lists habit builder as the first showcase project', () => {
    const habitBuilder = PROJECTS_SOURCE[0];
    expect(habitBuilder.id).toBe('wrs-habit-builder');
    expect(isProjectUnderConstruction(habitBuilder)).toBe(false);
    expect(habitBuilder.liveUrl).toBe('https://wrs-habit-builder.web.app/');
    expect(habitBuilder.githubUrl).toBe('https://github.com/WillianWRS/wrs-habit-builder');
    expect(habitBuilder.caseStudy).toBeDefined();
  });

  it('keeps profissionais as a finished showcase project', () => {
    const profissionais = PROJECTS_SOURCE.find((p) => p.id === 'profissionais')!;
    expect(isProjectUnderConstruction(profissionais)).toBe(false);
    expect(profissionais.descriptionBR).toContain('API REST');
    expect(profissionais.caseStudy).toBeDefined();
  });

  it('includes case study only for real showcase projects', () => {
    const realProjects = PROJECTS_SOURCE.filter((p) => !p.placeholder);
    expect(realProjects.length).toBeGreaterThan(0);
    expect(realProjects.every((p) => p.caseStudy)).toBe(true);
  });
});
