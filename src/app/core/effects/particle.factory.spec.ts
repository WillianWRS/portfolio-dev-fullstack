import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createBubble,
  createBubbles,
  createMeteorStreak,
  createStarParticle,
  createTriggeredMeteor,
  refreshBubble,
} from './particle.factory';

describe('particle.factory', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('createBubble returns values within expected ranges', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    const bubble = createBubble(1);

    expect(bubble.id).toBe(1);
    expect(bubble.size).toBeGreaterThanOrEqual(14);
    expect(bubble.size).toBeLessThanOrEqual(68);
    expect(bubble.left).toBeGreaterThanOrEqual(0);
    expect(bubble.left).toBeLessThanOrEqual(100);
    expect(bubble.willPop).toBe(false);
  });

  it('refreshBubble may recreate the bubble when random is low', () => {
    const original = createBubble(7);
    vi.spyOn(Math, 'random').mockReturnValue(0.1);

    const refreshed = refreshBubble(original);

    expect(refreshed.id).toBe(7);
    expect(refreshed).not.toBe(original);
  });

  it('createStarParticle and createMeteorStreak use the provided id', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.25);

    expect(createStarParticle(3).id).toBe(3);
    expect(createMeteorStreak(4).id).toBe(4);
    expect(createTriggeredMeteor(5).delay).toBe(0);
  });

  it('createBubbles returns the requested count', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    expect(createBubbles(4)).toHaveLength(4);
  });
});
