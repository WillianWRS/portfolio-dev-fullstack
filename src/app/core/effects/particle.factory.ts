import { randomBetween } from '../browser/random.util';
import type {
  Bubble,
  ConstellationOrb,
  MeteorStreak,
  RipplePulse,
  StarParticle,
} from '../models/effects.model';

export function createBubble(id: number): Bubble {
  return {
    id,
    size: randomBetween(14, 68),
    left: randomBetween(0, 100),
    duration: randomBetween(10, 20),
    delay: randomBetween(-20, 0),
    drift: randomBetween(-70, 70),
    opacity: randomBetween(0.28, 0.78),
    willPop: Math.random() < 0.3,
  };
}

export function refreshBubble(bubble: Bubble): Bubble {
  if (Math.random() < 0.2) {
    return createBubble(bubble.id);
  }

  return bubble;
}

export function createStarParticle(id: number): StarParticle {
  return {
    id,
    left: randomBetween(0, 100),
    top: randomBetween(0, 100),
    size: randomBetween(2, 5),
    duration: randomBetween(8, 22),
    delay: randomBetween(-22, 0),
    driftX: randomBetween(-80, 80),
    driftY: randomBetween(-60, 60),
    opacity: randomBetween(0.25, 0.85),
  };
}

export function createConstellationOrb(id: number): ConstellationOrb {
  return {
    id,
    left: randomBetween(5, 95),
    top: randomBetween(5, 95),
    size: randomBetween(90, 220),
    duration: randomBetween(18, 32),
    delay: randomBetween(-30, 0),
    opacity: randomBetween(0.06, 0.18),
  };
}

export function createMeteorStreak(id: number): MeteorStreak {
  return {
    id,
    top: randomBetween(5, 85),
    left: randomBetween(-10, 90),
    duration: randomBetween(2.5, 5.5),
    delay: randomBetween(-12, 8),
    length: randomBetween(80, 180),
    angle: randomBetween(-35, -15),
  };
}

export function createTriggeredMeteor(id: number): MeteorStreak {
  return {
    id,
    top: randomBetween(5, 85),
    left: randomBetween(-10, 90),
    duration: randomBetween(0.55, 0.95),
    delay: 0,
    length: randomBetween(100, 200),
    angle: randomBetween(-35, -15),
  };
}

export function createRipplePulse(id: number): RipplePulse {
  return {
    id,
    left: randomBetween(8, 92),
    top: randomBetween(10, 90),
    duration: randomBetween(3.5, 7),
    delay: randomBetween(-14, 4),
    maxScale: randomBetween(2.5, 5.5),
    opacity: randomBetween(0.35, 0.75),
  };
}

export function createBubbles(count: number): Bubble[] {
  return Array.from({ length: count }, (_, index) => createBubble(index));
}

export function createStarParticles(count: number): StarParticle[] {
  return Array.from({ length: count }, (_, index) => createStarParticle(index));
}

export function createConstellationOrbs(count: number): ConstellationOrb[] {
  return Array.from({ length: count }, (_, index) => createConstellationOrb(index));
}

export function createMeteorStreaks(count: number): MeteorStreak[] {
  return Array.from({ length: count }, (_, index) => createMeteorStreak(index));
}

export function createRipplePulses(count: number): RipplePulse[] {
  return Array.from({ length: count }, (_, index) => createRipplePulse(index));
}
