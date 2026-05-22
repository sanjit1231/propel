// Advanced Design System for Propel
// Dark Mode + Glassmorphism + Vibrant Gradients

export const colors = {
  // Primary Colors
  primary: '#3B82F6', // Vibrant Blue
  accent: '#A855F7', // Electric Purple
  success: '#10B981', // Emerald
  warning: '#F59E0B', // Amber
  error: '#EF4444', // Red

  // Dark Background
  background: '#0F172A', // Very dark blue
  surface: '#1E293B', // Dark slate
  surfaceLight: '#334155', // Medium slate

  // Gradients
  gradientBlue: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
  gradientPurple: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
  gradientGreen: 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)',
  gradientPrimary: 'linear-gradient(135deg, #3B82F6 0%, #A855F7 50%, #EC4899 100%)',

  // Text Colors
  text: {
    primary: '#F1F5F9', // Very light slate
    secondary: '#CBD5E1', // Light slate
    tertiary: '#94A3B8', // Medium slate
    disabled: '#64748B', // Disabled slate
  },

  // Overlays & Glass
  glass: 'rgba(30, 41, 59, 0.7)', // Dark glass with opacity
  glassLight: 'rgba(51, 65, 85, 0.5)',
  overlay: 'rgba(15, 23, 42, 0.8)',
};

export const typography = {
  // Font Families
  fontFamily: {
    display: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  // Font Sizes
  sizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
  },

  // Font Weights
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

export const spacing = {
  // 4px grid
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
};

export const borderRadius = {
  none: '0',
  sm: '0.375rem', // 6px
  base: '0.5rem', // 8px
  md: '0.75rem', // 12px
  lg: '1rem', // 16px
  xl: '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  full: '9999px',
};

export const shadows = {
  // Glassmorphism shadows (subtle)
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',

  // Glow shadows (for hover/focus)
  glowBlue: '0 0 20px rgba(59, 130, 246, 0.4)',
  glowPurple: '0 0 20px rgba(168, 85, 247, 0.4)',
  glowPink: '0 0 20px rgba(236, 72, 153, 0.4)',
  glowGreen: '0 0 20px rgba(16, 185, 129, 0.4)',
};

export const animations = {
  // Durations
  duration: {
    fastest: '150ms',
    faster: '200ms',
    fast: '250ms',
    base: '300ms',
    slow: '400ms',
    slower: '500ms',
    slowest: '800ms',
  },

  // Timing Functions
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Keyframe animations (CSS)
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,

  slideUp: `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,

  slideDown: `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,

  slideRight: `
    @keyframes slideRight {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `,

  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `,

  spin: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,

  shimmer: `
    @keyframes shimmer {
      0% {
        background-position: -1000px 0;
      }
      100% {
        background-position: 1000px 0;
      }
    }
  `,
};

export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
