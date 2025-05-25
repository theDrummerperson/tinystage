// tailwind.config.ts
import type { Config } from 'tailwindcss';
import type { PluginAPI } from 'tailwindcss/types/config'; // Import PluginAPI for better typing

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}', // Adjust this glob pattern to match your project's file structure
  ],
  theme: {
    extend: {
      // ... your colors, fontFamily, animation, keyframes ...
      colors: {
        'brand-black': 'var(--brand-black)',
        'brand-white': 'var(--brand-white)',
        'brand-yellow': 'var(--brand-yellow)',
        'brand-gray-light': 'var(--brand-gray-light)',
        'brand-gray-medium': 'var(--brand-gray-medium)',
        'brand-gray-dark': 'var(--brand-gray-dark)',
      },
      fontFamily: {
        sans: ['YourCleanSansFont', 'system-ui', 'sans-serif'],
        display: ['Lobster', 'cursive'],
      },
      animation: {
        'marquee-twinkle': 'marquee-twinkle 4s ease-in-out infinite',
        pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        subtleSvgDrift: 'subtleSvgDrift 20s linear infinite alternate',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        glintPlus: 'glintPlus 7s infinite ease-in-out 2s',
        buttonPulse: 'buttonPulseBase 3s infinite ease-out',
        subtleSmoke: 'subtleSmoke 45s linear infinite alternate',
        subtleBgDrift: 'subtleBgDrift 90s linear infinite alternate',
        grain: 'grainAnimate 0.2s steps(3) infinite',
        hazeOne: 'hazeEffect 50s linear infinite alternate',
        hazeTwo: 'hazeEffect 60s linear infinite alternate',
        spotlightFlicker:
          'spotlightFlicker 0.2s infinite alternate ease-in-out',
        lensFlareGlint: 'lensFlareGlint 8s infinite ease-in-out 2.5s',
        buttonPulseAltOne: 'buttonPulseVariantOne 2.8s infinite ease-in-out',
        buttonPulseAltTwo:
          'buttonPulseVariantTwo 3.3s infinite ease-in-out 0.2s',
        fadeInSlideUp:
          'fadeInSlideUp 0.4s cubic-bezier(0.25,0.1,0.25,1.5) forwards',
        fadeInSlideRight:
          'fadeInSlideRight 0.5s cubic-bezier(0.25,0.1,0.25,1.5) forwards',
        dropdownItemEnter:
          'dropdownItemEnter 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        scaleInX: 'scaleInX 0.3s ease-out forwards',
        fadeInBasic: 'fadeInBasic 0.3s ease-out forwards',
        glint: 'glintPlus 7s infinite ease-in-out 2s',
        cosmicPulse: 'cosmicPulse 14s infinite ease-in-out',
        slowRotate: 'slowRotate 180s linear infinite',
        textReveal:
          'textReveal 0.8s cubic-bezier(0.7, 0, 0.3, 1) forwards 0.5s',
        nudgeRight: 'nudgeRight 0.3s ease-in-out',
        highlightYellow: 'highlightYellow 0.6s ease-out forwards',
      },
      keyframes: {
        'marquee-twinkle': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        subtleSvgDrift: {
          '0%': { transform: 'translateX(-2%) translateY(-1%) scale(1)' },
          '100%': { transform: 'translateX(2%) translateY(1%) scale(1.05)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInBasic: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        buttonPulseBase: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.85' },
        },
        subtleSmoke: {
          '0%': { opacity: '0.2', transform: 'translateY(0) scale(1)' },
          '100%': {
            opacity: '0.05',
            transform: 'translateY(-50px) scale(1.5)',
          },
        },
        subtleBgDrift: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
        grainAnimate: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-1px, -1px)' },
          '50%': { transform: 'translate(1px, 1px)' },
          '75%': { transform: 'translate(-1px, 1px)' },
        },
        hazeEffect: {
          '0%': { opacity: '0.1', transform: 'translateX(-10%)' },
          '100%': { opacity: '0.05', transform: 'translateX(10%)' },
        },
        spotlightFlicker: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        lensFlareGlint: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5) rotate(0deg)' },
          '50%': { opacity: '0.3', transform: 'scale(1) rotate(10deg)' },
        },
        buttonPulseVariantOne: {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(var(--brand-yellow-rgb), 0.4)',
          },
          '70%': { boxShadow: '0 0 0 10px rgba(var(--brand-yellow-rgb), 0)' },
        },
        buttonPulseVariantTwo: {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.15)' },
        },
        glintPlus: {
          '0%, 100%': { opacity: '0.9', filter: 'saturate(0.9)' },
          '10%, 30%': {
            opacity: '1',
            filter:
              'saturate(1.1) drop-shadow(0 0 4px rgba(var(--brand-yellow-rgb),0.5))',
          },
          '20%': {
            opacity: '0.95',
            filter:
              'saturate(1) drop-shadow(0 0 8px rgba(var(--brand-yellow-rgb),0.3))',
          },
        },
        fadeInSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInSlideRight: {
          '0%': { opacity: '0', transform: 'translateX(15px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        dropdownItemEnter: {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        scaleInX: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        cosmicPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.95)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        slowRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        textReveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0% 0 0)' },
        },
        nudgeRight: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(4px)' },
        },
        highlightYellow: {
          '0%': { backgroundColor: 'transparent', color: 'inherit' },
          '40%, 60%': {
            backgroundColor: 'rgba(var(--brand-yellow-rgb), 0.3)',
            color: 'var(--brand-white)',
          },
          '100%': { backgroundColor: 'transparent', color: 'inherit' },
        },
      },
    },
  },
  plugins: [
    function (api: PluginAPI) {
      // <-- Corrected signature, use PluginAPI
      api.addUtilities({
        '.animation-delay-[-10s]': {
          'animation-delay': '-10s',
        },
        '.animation-delay-[-20s]': {
          'animation-delay': '-20s',
        },
        // You can add more utilities here if needed
      });
    },
    // require('@tailwindcss/forms'), // Uncomment if you use this plugin
  ],
};

export default config;
