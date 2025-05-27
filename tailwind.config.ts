// tailwind.config.ts
import type { Config } from 'tailwindcss';
import type { PluginAPI } from 'tailwindcss/types/config';

// Illustrative: These would be in your :root CSS (e.g., globals.css or colors.css)
// const BRAND_YELLOW_RGB = '250, 204, 21'; 
// const BRAND_BLACK_RGB = '0, 0, 0';
// const BRAND_GRAY_DARK_RGB = '31, 41, 55';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      // ----------------------------------------------------------------------
      // Colors - Referencing CSS Variables
      // ----------------------------------------------------------------------
      colors: {
        'brand-black': 'var(--brand-black)',
        'brand-white': 'var(--brand-white)',
        'brand-yellow': 'var(--brand-yellow)',
        'brand-gray-light': 'var(--brand-gray-light)',
        'brand-gray-medium': 'var(--brand-gray-medium)',
        'brand-gray-dark': 'var(--brand-gray-dark)',
      },

      // ----------------------------------------------------------------------
      // Fonts
      // ----------------------------------------------------------------------
      fontFamily: {
        sans: ['"YourCleanSansFont"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
        display: ['Lobster', 'cursive'],
      },

      // ----------------------------------------------------------------------
      // Animations & Keyframes
      // ----------------------------------------------------------------------
      animation: {
        // --- Entry / Exit Animations ---
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        fadeInBasic: 'fadeInBasic 0.3s ease-out forwards',
        fadeOutBasic: 'fadeOutBasic 0.3s ease-out forwards', // Was correctly added
        fadeInSlideUp: 'fadeInSlideUp 0.4s cubic-bezier(0.25,0.1,0.25,1.5) forwards',
        fadeInSlideRight: 'fadeInSlideRight 0.5s cubic-bezier(0.25,0.1,0.25,1.5) forwards',
        dropdownItemEnter: 'dropdownItemEnter 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        scaleInX: 'scaleInX 0.3s ease-out forwards',
        textReveal: 'textReveal 0.8s cubic-bezier(0.7, 0, 0.3, 1) forwards 0.5s',
        
        // --- Hero Constellation Animations ---
        constellationEnter: 'constellationEnter 0.8s cubic-bezier(0.25, 0.1, 0.25, 1.5) forwards', // Correctly added
        constellationPathExit: 'constellationPathExit 0.6s ease-out forwards',                 // Correctly added
        subtleImageDrift: 'subtleImageDrift var(--drift-duration, 20s) linear infinite alternate', // Correctly added, uses CSS var for duration

        // --- Pulse / Glint / Glow Animations ---
        pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        buttonPulse: 'buttonPulseBase 3s infinite ease-out',
        buttonPulseAltOne: 'buttonPulseVariantOne 2.8s infinite ease-in-out',
        buttonPulseAltTwo: 'buttonPulseVariantTwo 3.3s infinite ease-in-out 0.2s',
        glintPlus: 'glintPlus 7s infinite ease-in-out 2s', // Note: 'glint' was correctly removed as a duplicate alias
        cosmicPulse: 'cosmicPulse 14s infinite ease-in-out',
        highlightYellow: 'highlightYellow 0.6s ease-out forwards',
        spotlightFlicker: 'spotlightFlicker 0.2s infinite alternate ease-in-out',
        lensFlareGlint: 'lensFlareGlint 8s infinite ease-in-out 2.5s',
        
        // --- Continuous / Ambient Animations ---
        'marquee-twinkle': 'marquee-twinkle 4s ease-in-out infinite',
        subtleSvgDrift: 'subtleSvgDrift 20s linear infinite alternate',
        subtleSmoke: 'subtleSmoke 45s linear infinite alternate',
        subtleBgDrift: 'subtleBgDrift 90s linear infinite alternate',
        grain: 'grainAnimate 0.2s steps(3) infinite',
        hazeOne: 'hazeEffect 50s linear infinite alternate',
        hazeTwo: 'hazeEffect 60s linear infinite alternate',
        slowRotate: 'slowRotate 180s linear infinite',

        // --- Interaction Animations ---
        nudgeRight: 'nudgeRight 0.3s ease-in-out',
      },
      keyframes: {
        // --- Entry / Exit Keyframes ---
        fadeIn: { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeInBasic: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeOutBasic: { '0%': { opacity: '1' }, '100%': { opacity: '0' } }, // Was correctly added
        fadeInSlideUp: { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeInSlideRight: { '0%': { opacity: '0', transform: 'translateX(15px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        dropdownItemEnter: { '0%': { opacity: '0', transform: 'translateY(10px) scale(0.98)' }, '100%': { opacity: '1', transform: 'translateY(0) scale(1)' } },
        scaleInX: { '0%': { transform: 'scaleX(0)' }, '100%': { transform: 'scaleX(1)' } },
        textReveal: { '0%': { clipPath: 'inset(0 100% 0 0)' }, '100%': { clipPath: 'inset(0 0% 0 0)' } },

        // --- Hero Constellation Keyframes ---
        constellationEnter: { // Correctly added
          '0%': { opacity: '0', transform: 'scale(var(--initial-scale, 0.1)) rotate(var(--initial-rotation, 0deg))', filter: 'blur(3px) brightness(1.5)' },
          '60%': { opacity: '0.9', transform: 'scale(calc(var(--target-scale, 1) * 1.05)) rotate(var(--target-rotation, 0deg))', filter: 'blur(0px) brightness(1.1)' },
          '100%': { opacity: 'var(--target-opacity, 0.85)', transform: 'scale(var(--target-scale, 1)) rotate(var(--target-rotation, 0deg))', filter: 'blur(0px) brightness(1)' },
        },
        constellationPathExit: { // Correctly added
          '0%': { opacity: 'var(--target-opacity, 0.85)', transform: 'scale(var(--target-scale, 1)) rotate(var(--target-rotation, 0deg))', filter: 'blur(0px)' },
          '100%': { opacity: '0', transform: 'scale(0.2) rotate(calc(var(--target-rotation, 0deg) + 45deg))', filter: 'blur(3px)' },
        },
        subtleImageDrift: { // Correctly added
          '0%':   { transform: 'translateX(0px) translateY(0px)' }, 
          '25%':  { transform: 'translateX(var(--drift-x-1, 2px)) translateY(var(--drift-y-1, -3px))' },
          '50%':  { transform: 'translateX(var(--drift-x-2, -3px)) translateY(var(--drift-y-2, 2px))' },
          '75%':  { transform: 'translateX(var(--drift-x-3, 1px)) translateY(var(--drift-y-3, -1px))' },
          '100%': { transform: 'translateX(0px) translateY(0px)' },
        },

        // --- Pulse / Glint / Glow Keyframes ---
        // (Keep your existing definitions here)
        pulse: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '.5' } },
        buttonPulseBase: { '0%, 100%': { transform: 'scale(1)', opacity: '1' }, '50%': { transform: 'scale(1.05)', opacity: '0.85' } },
        buttonPulseVariantOne: { '0%, 100%': { boxShadow: '0 0 0 0 rgba(var(--brand-yellow-rgb), 0.4)' }, '70%': { boxShadow: '0 0 0 10px rgba(var(--brand-yellow-rgb), 0)' } },
        buttonPulseVariantTwo: { '0%, 100%': { filter: 'brightness(1)' }, '50%': { filter: 'brightness(1.15)' } },
        glintPlus: {
          '0%, 100%': { opacity: '0.9', filter: 'saturate(0.9)' },
          '10%, 30%': { opacity: '1', filter: 'saturate(1.1) drop-shadow(0 0 4px rgba(var(--brand-yellow-rgb),0.5))' },
          '20%': { opacity: '0.95', filter: 'saturate(1) drop-shadow(0 0 8px rgba(var(--brand-yellow-rgb),0.3))' },
        },
        cosmicPulse: { '0%, 100%': { opacity: '0.3', transform: 'scale(0.95)' }, '50%': { opacity: '0.7', transform: 'scale(1.05)' } },
        highlightYellow: { '0%': { backgroundColor: 'transparent', color: 'inherit' }, '40%, 60%': { backgroundColor: 'rgba(var(--brand-yellow-rgb), 0.3)', color: 'var(--brand-white)' }, '100%': { backgroundColor: 'transparent', color: 'inherit' } },
        spotlightFlicker: { '0%, 100%': { opacity: '0.8' }, '50%': { opacity: '1' } },
        lensFlareGlint: { '0%, 100%': { opacity: '0', transform: 'scale(0.5) rotate(0deg)' }, '50%': { opacity: '0.3', transform: 'scale(1) rotate(10deg)' } },
        
        // --- Continuous / Ambient Keyframes ---
        // (Keep your existing definitions here)
        'marquee-twinkle': { '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' }, '50%': { opacity: '1', transform: 'scale(1.1)' } },
        subtleSvgDrift: { '0%': { transform: 'translateX(-2%) translateY(-1%) scale(1)' }, '100%': { transform: 'translateX(2%) translateY(1%) scale(1.05)' } },
        subtleSmoke: { '0%': { opacity: '0.2', transform: 'translateY(0) scale(1)' }, '100%': { opacity: '0.05', transform: 'translateY(-50px) scale(1.5)' } },
        subtleBgDrift: { '0%': { backgroundPosition: '0% 0%' }, '100%': { backgroundPosition: '100% 100%' } },
        grainAnimate: { '0%, 100%': { transform: 'translate(0, 0)' }, '25%': { transform: 'translate(-1px, -1px)' }, '50%': { transform: 'translate(1px, 1px)' }, '75%': { transform: 'translate(-1px, 1px)' } },
        hazeEffect: { '0%': { opacity: '0.1', transform: 'translateX(-10%)' }, '100%': { opacity: '0.05', transform: 'translateX(10%)' } },
        slowRotate: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },

        // --- Interaction Keyframes ---
        nudgeRight: { '0%, 100%': { transform: 'translateX(0)' }, '50%': { transform: 'translateX(4px)' } },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        '.animation-delay-short': { 'animation-delay': '0.15s' },
        '.animation-delay-medium': { 'animation-delay': '0.3s' },
        '.animation-delay-long': { 'animation-delay': '0.5s' },
        '.animation-delay-[-10s]': { 'animation-delay': '-10s' },
        '.animation-delay-[-20s]': { 'animation-delay': '-20s' },

        // Utility for random drift variables.
        // Note: Math.random() here is evaluated once at build time.
        '.random-drift-pattern': { 
            '--drift-x-1': `${(Math.random() - 0.5) * 6}px`, 
            '--drift-y-1': `${(Math.random() - 0.5) * 6}px`,
            '--drift-x-2': `${(Math.random() - 0.5) * 6}px`, 
            '--drift-y-2': `${(Math.random() - 0.5) * 6}px`,
            '--drift-x-3': `${(Math.random() - 0.5) * 6}px`, 
            '--drift-y-3': `${(Math.random() - 0.5) * 6}px`,
            '--drift-duration': `${15 + Math.random() * 10}s`
        },
      });
    },
    // require('@tailwindcss/forms'),
  ],
};

export default config;