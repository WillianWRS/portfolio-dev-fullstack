import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CV_URL_BR, CV_URL_EN, PROFILE_NAME } from '@core/content/profile.content';
import { LocaleService } from './locale.service';
import { PortfolioContentService } from './portfolio-content.service';

describe('PortfolioContentService', () => {
  let content: PortfolioContentService;
  let locale: LocaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });

    content = TestBed.inject(PortfolioContentService);
    locale = TestBed.inject(LocaleService);
  });

  it('exposes profile data localized to the active locale', () => {
    expect(content.profile().name).toBe(PROFILE_NAME);
    expect(content.profile().title).toContain('Full Stack');

    locale.setLocale('EN');
    expect(content.profile().title).toContain('Full Stack');
    expect(content.profile().bio).toContain('Developer focused');
  });

  it('switches CV URL by locale', () => {
    expect(content.cvUrl()).toBe(CV_URL_BR);

    locale.setLocale('EN');
    expect(content.cvUrl()).toBe(CV_URL_EN);
  });

  it('maps projects with localized labels', () => {
    const projects = content.projects();
    expect(projects.length).toBeGreaterThan(0);

    const construction = projects.find((p) => p.status === 'construction');
    expect(construction?.description).toBe('Em construção');

    locale.setLocale('EN');
    const enConstruction = content.projects().find((p) => p.status === 'construction');
    expect(enConstruction?.description).toBe('Under construction');
  });

  it('maps experience entries for the active locale', () => {
    locale.setLocale('BR');
    const brExperience = content.experience();
    expect(brExperience.length).toBeGreaterThan(0);
    expect(brExperience[0].role).toBeTruthy();
    expect(brExperience[0].highlights.length).toBeGreaterThan(0);

    locale.setLocale('EN');
    const enExperience = content.experience();
    expect(enExperience[0].role).not.toBe(brExperience[0].role);
  });

  it('maps stack categories with proficiency labels', () => {
    const categories = content.stackCategories();
    expect(categories.length).toBeGreaterThan(0);
    expect(categories[0].items[0].proficiencyLabel).toBeTruthy();
  });
});
