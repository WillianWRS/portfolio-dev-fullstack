import { PLATFORM_ID } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTestAppConfig } from '@app/testing/test-providers';
import { Projects } from './projects';

describe('Projects', () => {
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }, provideTestAppConfig()],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();
  });

  it('creates the section with project showcase', () => {
    expect(fixture.nativeElement.querySelector('#project-panel')).toBeTruthy();
  });

  it('navigates projects without wrapping at the edges', () => {
    const component = fixture.componentInstance as Projects & {
      nextProject(): void;
      prevProject(): void;
      selectedIndex(): number;
      displayProjects(): { id: string }[];
      canGoNext(): boolean;
      canGoPrev(): boolean;
    };

    const total = component.displayProjects().length;
    expect(total).toBeGreaterThan(1);

    expect(component.canGoPrev()).toBe(false);
    expect(component.canGoNext()).toBe(true);

    component.nextProject();
    fixture.detectChanges();
    expect(component.selectedIndex()).toBe(1);

    component.prevProject();
    fixture.detectChanges();
    expect(component.selectedIndex()).toBe(0);

    for (let index = 0; index < total - 1; index += 1) {
      component.nextProject();
    }
    fixture.detectChanges();

    expect(component.selectedIndex()).toBe(total - 1);
    expect(component.canGoNext()).toBe(false);

    component.nextProject();
    fixture.detectChanges();
    expect(component.selectedIndex()).toBe(total - 1);
  });

  it('maps status to CSS class', () => {
    const component = fixture.componentInstance as Projects & {
      statusClass(status: 'live' | 'demo' | 'private' | 'construction'): string;
    };

    expect(component.statusClass('live')).toBe('project-status--live');
    expect(component.statusClass('construction')).toBe('project-status--construction');
  });
});
