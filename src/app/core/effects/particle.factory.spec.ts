import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createAmbientMote,
  createAmbientMotes,
  createBubble,
  createBubbles,
  createMeteorStreak,
  createStarParticle,
  createTriggeredMeteor,
  createTriggeredWarmRipple,
  createWarmGlowOrb,
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

  it('createAmbientMote drifts upward with warm opacity', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    const mote = createAmbientMote(2);

    expect(mote.id).toBe(2);
    expect(mote.driftY).toBeLessThan(0);
    expect(mote.opacity).toBeGreaterThan(0);
  });

  it('createWarmGlowOrb and createTriggeredWarmRipple use coordinates', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.4);

    expect(createWarmGlowOrb(1).warmth).toBeGreaterThan(0);
    expect(createTriggeredWarmRipple(3, 120, 240)).toMatchObject({ id: 3, left: 120, top: 240 });
    expect(createAmbientMotes(3)).toHaveLength(3);
  });
});
