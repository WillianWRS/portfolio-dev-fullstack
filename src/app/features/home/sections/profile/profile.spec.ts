import { PLATFORM_ID } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTestAppConfig } from '@app/testing/test-providers';
import { PROFILE_EMAIL } from '@core/content/profile.content';
import { Profile } from './profile';

describe('Profile', () => {
  let fixture: ComponentFixture<Profile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profile],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }, provideTestAppConfig()],
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    fixture.detectChanges();
  });

  it('renders profile headline from content service', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Full Stack');
  });

  it('toggles email visibility', () => {
    const component = fixture.componentInstance as Profile & {
      toggleEmail(): void;
      emailRevealed(): boolean;
    };

    expect(component.emailRevealed()).toBe(false);
    component.toggleEmail();
    expect(component.emailRevealed()).toBe(true);
    component.toggleEmail();
    expect(component.emailRevealed()).toBe(false);
  });

  it('copies email when clipboard succeeds', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    const component = fixture.componentInstance as Profile & {
      copyEmail(event: Event): Promise<void>;
      emailCopied(): boolean;
    };

    await component.copyEmail(new Event('click'));

    expect(writeText).toHaveBeenCalledWith(PROFILE_EMAIL);
    expect(component.emailCopied()).toBe(true);
  });

  it('does not mark copied when clipboard fails', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
      configurable: true,
    });

    const component = fixture.componentInstance as Profile & {
      copyEmail(event: Event): Promise<void>;
      emailCopied(): boolean;
    };

    await component.copyEmail(new Event('click'));

    expect(component.emailCopied()).toBe(false);
  });
});
