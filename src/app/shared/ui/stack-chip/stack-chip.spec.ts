import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { StackChip } from './stack-chip';

describe('StackChip', () => {
  let fixture: ComponentFixture<StackChip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackChip],
    }).compileComponents();

    fixture = TestBed.createComponent(StackChip);
    fixture.componentRef.setInput('name', 'Angular');
    fixture.componentRef.setInput('iconSlug', 'angular');
    fixture.detectChanges();
  });

  it('renders the stack name', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Angular');
  });

  it('uses the local icon path', () => {
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    expect(img.src).toContain('/icons/stacks/angular.svg');
  });

  it('maps proficiency to short label and class', () => {
    fixture.componentRef.setInput('proficiency', 'daily');
    fixture.componentRef.setInput('proficiencyLabel', 'Produção diária');
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('.stack-chip__badge');
    expect(badge?.textContent?.trim()).toBe('PRO');
    expect(badge?.className).toContain('bg-emerald-100');
  });

  it('falls back to CDN when the local icon fails', () => {
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    img.dispatchEvent(new Event('error'));

    expect(img.src).toBe('https://cdn.simpleicons.org/angular');
    expect(img.onerror).toBeNull();
  });
});
