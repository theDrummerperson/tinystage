// tailwind.config.ts
import type { Config } from 'tailwindcss';
import type { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': 'var(--brand-black)',
        'brand-white': 'var(--brand-white)',
        'brand-yellow': 'var(--brand-yellow)',
        'brand-gray-light': 'var(--brand-gray-light)',
        'brand-gray-medium': 'var(--brand-gray-medium)',
        'brand-gray-dark': 'var(--brand-gray-dark)',
      },
      fontFamily: {
        sans: ['YourCleanSansFont', 'system-ui', 'sans-serif'], // Ensure 'YourCleanSansFont' is imported
        display: ['Lobster', 'cursive'],
      },
      animation: {
        // ... your existing animations ...
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
        // ADD fadeOutBasic animation definition
        fadeOutBasic: 'fadeOutBasic 0.3s ease-out forwards', // Added 'forwards' to hold the end state
        glint: 'glintPlus 7s infinite ease-in-out 2s', // Note: 'glint' and 'glintPlus' are the same here
        cosmicPulse: 'cosmicPulse 14s infinite ease-in-out',
        slowRotate: 'slowRotate 180s linear infinite',
        textReveal:
          'textReveal 0.8s cubic-bezier(0.7, 0, 0.3, 1) forwards 0.5s',
        nudgeRight: 'nudgeRight 0.3s ease-in-out',
        highlightYellow: 'highlightYellow 0.6s ease-out forwards',
      },
      keyframes: {
        // ... your existing keyframes ...
        'marquee-twinkle': { /* ... */ },
        subtleSvgDrift: { /* ... */ },
        fadeIn: { /* ... */ },
        fadeInBasic: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // ADD fadeOutBasic keyframes
        fadeOutBasic: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        buttonPulseBase: { /* ... */ },
        subtleSmoke: { /* ... */ },
        subtleBgDrift: { /* ... */ },
        grainAnimate: { /* ... */ },
        hazeEffect: { /* ... */ },
        spotlightFlicker: { /* ... */ },
        lensFlareGlint: { /* ... */ },
        buttonPulseVariantOne: { /* ... */ },
        buttonPulseVariantTwo: { /* ... */ },
        glintPlus: { /* ... */ },
        fadeInSlideUp: { /* ... */ },
        fadeInSlideRight: {
          '0%': { opacity: '0', transform: 'translateX(15px)' }, // Consider value for menu context e.g. translateX(100%)
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        dropdownItemEnter: { /* ... */ },
        scaleInX: { /* ... */ },
        cosmicPulse: { /* ... */ },
        slowRotate: { /* ... */ },
        textReveal: { /* ... */ },
        nudgeRight: { /* ... */ },
        highlightYellow: { /* ... */ },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function (api: PluginAPI) {
      api.addUtilities({
        '.animation-delay-[-10s]': { 'animation-delay': '-10s' },
        '.animation-delay-[-20s]': { 'animation-delay': '-20s' },
      });
    },
    // require('@tailwindcss/forms'),
  ],
};

export default config;