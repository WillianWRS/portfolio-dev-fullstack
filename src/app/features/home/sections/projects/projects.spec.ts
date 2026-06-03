import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { Projects } from './projects';

describe('Projects', () => {
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();
  });

  it('creates the section with project filters', () => {
    const filters = fixture.nativeElement.querySelectorAll('.project-filter');
    expect(filters.length).toBe(5);
  });

  it('filters projects by category', () => {
    const component = fixture.componentInstance as Projects & {
      setFilter(filter: 'backend'): void;
      activeFilter(): string;
      filteredProjects(): { category: string }[];
    };

    component.setFilter('backend');
    fixture.detectChanges();

    expect(component.activeFilter()).toBe('backend');
    expect(component.filteredProjects().every((p) => p.category === 'backend')).toBe(true);
  });

  it('resets selection and case study when changing filter', () => {
    const component = fixture.componentInstance as Projects & {
      setFilter(filter: 'frontend'): void;
      openCaseStudy(): void;
      caseStudyOpen(): boolean;
      selectedIndex(): number;
    };

    component.openCaseStudy();
    component.setFilter('frontend');
    fixture.detectChanges();

    expect(component.caseStudyOpen()).toBe(false);
    expect(component.selectedIndex()).toBe(0);
  });

  it('maps status to CSS class', () => {
    const component = fixture.componentInstance as Projects & {
      statusClass(status: 'live' | 'demo' | 'private' | 'construction'): string;
    };

    expect(component.statusClass('live')).toBe('project-status--live');
    expect(component.statusClass('construction')).toBe('project-status--construction');
  });
});
