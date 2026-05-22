// Framer Motion Animation Presets for Propel

import { Variants } from 'framer-motion';

// Page Transitions
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

// Staggered Container (for animating children sequentially)
export const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Item animations (for use inside staggered containers)
export const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Fade In
export const fadeInVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Scale Up with Fade
export const scaleUpVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Slide In From Left
export const slideInLeftVariants: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Slide In From Right
export const slideInRightVariants: Variants = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Slide In From Top
export const slideInTopVariants: Variants = {
  initial: { opacity: 0, y: -30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Bounce In
export const bounceInVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 100,
      duration: 0.5,
    },
  },
};

// Hover Effects
export const hoverScaleVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
};

export const hoverGlowVariants: Variants = {
  initial: { boxShadow: '0 0 0 rgba(59, 130, 246, 0)' },
  hover: {
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
    transition: {
      duration: 0.3,
    },
  },
};

// Button Press Animation
export const buttonPressVariants: Variants = {
  initial: { scale: 1 },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

// Loading Spinner
export const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Pulse Animation (breathing effect)
export const pulseVariants: Variants = {
  animate: {
    opacity: [1, 0.5, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Card Hover (elevation + glow)
export const cardHoverVariants: Variants = {
  initial: {
    y: 0,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
  },
  hover: {
    y: -8,
    boxShadow: '0 20px 25px rgba(59, 130, 246, 0.3)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Flashcard Flip Animation
export const flipVariants: Variants = {
  initial: { rotateY: 0 },
  animate: { rotateY: 180 },
};

// Progress Bar Fill
export const progressBarVariants: Variants = {
  initial: { scaleX: 0 },
  animate: (width: number) => ({
    scaleX: width,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
};

// Scroll-triggered animations
export const scrollRevealVariants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Transition Presets
export const transitionPresets = {
  smooth: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
  },
  smoother: {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1],
  },
  snappy: {
    type: 'spring',
    damping: 15,
    stiffness: 100,
  },
  bouncy: {
    type: 'spring',
    damping: 10,
    stiffness: 80,
  },
};
