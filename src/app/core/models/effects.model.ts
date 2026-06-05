export type BackgroundEffect = 'ambient' | 'bubbles' | 'stars' | 'pulse';

export interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  willPop: boolean;
}

export interface StarParticle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  opacity: number;
}

export interface ConstellationOrb {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export interface MeteorStreak {
  id: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
  length: number;
  angle: number;
}

export interface RipplePulse {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  maxScale: number;
  opacity: number;
}

export interface WarmGlowOrb {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  warmth: number;
}

export interface AmbientMote {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  opacity: number;
}

export interface WarmRipple {
  id: number;
  left: number;
  top: number;
  duration: number;
  maxScale: number;
  opacity: number;
}
