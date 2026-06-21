export interface ProgressiveAsset {
  full: string;
  lq: string;
}

export const CRITICAL_ASSETS = {
  wallDesktop: {
    full: '/wall2.webp',
    lq: '/wall2-lq.webp',
  },
  wallMobile: {
    full: '/wall2-mobile.webp',
    lq: '/wall2-mobile-lq.webp',
  },
  profilePhoto: '/foto.png',
  profilePhotoMobile: '/foto%20-%20mobile.png',
  brandLogo: '/wrs.png',
  habitBuilder: {
    full: '/new-habit-builder-image.png',
    lq: '/new-habit-builder-image-lq.webp',
  },
} as const satisfies Record<string, string | ProgressiveAsset>;

export const MOBILE_MAX_WIDTH_PX = 767;

/** Tempo mínimo visível após o início da animação de formação das letras (0,9s no SCSS). */
export const LOADING_MIN_DISPLAY_MS = 900;

export const HABIT_BUILDER_IMAGE = CRITICAL_ASSETS.habitBuilder;
