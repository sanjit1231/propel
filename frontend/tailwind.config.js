/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        accent: '#EC4899',
        // Zeabur dark backgrounds
        bg: {
          primary: '#0a0a0a',
          secondary: '#0f0f1f',
          tertiary: '#1a1a2e',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
        'gradient-zeabur': 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 30%, #EC4899 100%)',
        'gradient-glow': 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        base: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        'glow-blue': '0 0 40px rgba(99, 102, 241, 0.6)',
        'glow-purple': '0 0 50px rgba(124, 58, 237, 0.7)',
        'glow-pink': '0 0 40px rgba(236, 72, 153, 0.6)',
        'glow-combined': '0 0 60px rgba(124, 58, 237, 0.5), 0 0 40px rgba(236, 72, 153, 0.4)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out',
        slideUp: 'slideUp 0.4s ease-out',
        slideDown: 'slideDown 0.4s ease-out',
        slideRight: 'slideRight 0.4s ease-out',
        shimmer: 'shimmer 2s infinite',
        glow: 'glow 4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
