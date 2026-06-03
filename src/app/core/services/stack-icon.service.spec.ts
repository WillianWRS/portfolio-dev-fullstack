import { TestBed } from '@angular/core/testing';
import { StackIconService } from './stack-icon.service';

describe('StackIconService', () => {
  let service: StackIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StackIconService);
  });

  it('builds local icon path from slug', () => {
    expect(service.iconUrl('angular')).toBe('/icons/stacks/angular.svg');
  });

  it('builds CDN fallback URL from slug', () => {
    expect(service.cdnIconUrl('angular')).toBe('https://cdn.simpleicons.org/angular');
  });
});
