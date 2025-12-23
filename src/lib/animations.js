// Animation variants and constants
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8 }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 }
};

export const staggerChildren = (delayMultiplier = 0.1) => ({
  animate: {
    transition: {
      staggerChildren: delayMultiplier
    }
  }
});

export const getDelayedFadeInUp = (delay) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay }
});

export const getDelayedFadeIn = (delay) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, delay }
});

export const cardHover = {
  scale: 1.02,
  transition: { duration: 0.3 }
};

export const ANIMATION_DELAYS = {
  SHORT: 0.2,
  MEDIUM: 0.4,
  LONG: 0.6,
  EXTRA_LONG: 0.8
};
