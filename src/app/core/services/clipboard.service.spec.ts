import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ClipboardService } from './clipboard.service';

describe('ClipboardService', () => {
  describe('on the server', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
      });
    });

    it('returns false without touching the clipboard API', async () => {
      const service = TestBed.inject(ClipboardService);
      await expect(service.copyText('test@example.com')).resolves.toBe(false);
    });
  });

  describe('in the browser', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
      });
    });

    it('copies text when the clipboard API succeeds', async () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText },
        configurable: true,
      });

      const service = TestBed.inject(ClipboardService);
      await expect(service.copyText('willian@example.com')).resolves.toBe(true);
      expect(writeText).toHaveBeenCalledWith('willian@example.com');
    });

    it('returns false when the clipboard API throws', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
        configurable: true,
      });

      const service = TestBed.inject(ClipboardService);
      await expect(service.copyText('willian@example.com')).resolves.toBe(false);
    });
  });
});
