import { describe, expect, it } from 'vitest';
import { PROJECTS_SOURCE } from './projects.content';
import { isProjectUnderConstruction } from '../models/project.model';
import { translate } from '../i18n/translations';

describe('portfolio content', () => {
  it('marks construction status projects as under construction', () => {
    const construction = PROJECTS_SOURCE.find((p) => p.status === 'construction');
    expect(construction).toBeDefined();
    expect(isProjectUnderConstruction(construction!)).toBe(true);
  });

  it('translates project under construction label per locale', () => {
    expect(translate('BR', 'projects.underConstruction')).toBe('Em construção');
    expect(translate('EN', 'projects.underConstruction')).toBe('Under construction');
  });

  it('maps finished projects to localized descriptions', () => {
    const habit = PROJECTS_SOURCE.find((p) => p.title === 'Habit Builder')!;
    expect(isProjectUnderConstruction(habit)).toBe(false);
    expect(habit.descriptionBR).toContain('hábitos');
    expect(habit.descriptionEN).toContain('Habit manager');
  });

  it('includes case studies for featured projects', () => {
    const featured = PROJECTS_SOURCE.filter((p) => p.featured);
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((p) => p.caseStudy)).toBe(true);
  });
});
