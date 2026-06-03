import { TestBed } from '@angular/core/testing';
import { EffectsCoordinatorService } from './effects-coordinator.service';

describe('EffectsCoordinatorService', () => {
  let service: EffectsCoordinatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EffectsCoordinatorService);
  });

  it('starts with zero interactions', () => {
    expect(service.interaction()).toBe(0);
  });

  it('increments interaction count on each registerInteraction', () => {
    service.registerInteraction();
    service.registerInteraction();

    expect(service.interaction()).toBe(2);
  });
});
