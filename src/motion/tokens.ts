export const MOTION_DURATION = {
  fast: 0.16,
  normal: 0.28,
  slow: 0.55,
  cinematic: 0.85,
} as const;

export const MOTION_EASING = {
  settle: [0.16, 1, 0.3, 1] as const,
  ember: [0.22, 1, 0.36, 1] as const,
  crisp: [0.25, 0.1, 0.25, 1] as const,
};

export const MOTION_STAGGER = {
  cards: 0.06,
  lines: 0.08,
  reviews: 0.09,
} as const;

export const MOTION_DISTANCE = {
  micro: 6,
  reveal: 24,
  cinematic: 36,
} as const;

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.18,
} as const;
