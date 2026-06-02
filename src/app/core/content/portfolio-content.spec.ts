import { describe, expect, it } from 'vitest';
import { PROJECTS_SOURCE } from './projects.content';
import { isProjectUnderConstruction } from '../models/project.model';
import { translate } from '../i18n/translations';

describe('portfolio content', () => {
  it('marks placeholder image as under construction', () => {
    const placeholder = PROJECTS_SOURCE.find((p) => p.imageUrl === '/settings.png');
    expect(placeholder).toBeDefined();
    expect(isProjectUnderConstruction(placeholder!.imageUrl)).toBe(true);
  });

  it('translates project under construction label per locale', () => {
    expect(translate('BR', 'projects.underConstruction')).toBe('Em construção');
    expect(translate('EN', 'projects.underConstruction')).toBe('Under construction');
  });

  it('maps finished projects to localized descriptions', () => {
    const habit = PROJECTS_SOURCE.find((p) => p.title === 'Habit Builder')!;
    expect(isProjectUnderConstruction(habit.imageUrl)).toBe(false);
    expect(habit.descriptionBR).toContain('hábitos');
    expect(habit.descriptionEN).toContain('Habit manager');
  });
});
