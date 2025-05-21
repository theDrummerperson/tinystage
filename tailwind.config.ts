// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // <--- Start of extend
      colors: {
        'brand-black': 'var(--brand-black)',
        'brand-white': 'var(--brand-white)',
        'brand-yellow': 'var(--brand-yellow)',
        'brand-gray': {
          light: 'var(--brand-gray-light)',
          medium: 'var(--brand-gray-medium)',
          dark: 'var(--brand-gray-dark)',
        },
      },
      fontFamily: {
        // sans: ['YourPrimaryFont', 'sans-serif'],
        // display: ['YourDisplayFont', 'serif'],
      },
      animation: {
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
          'fadeInSlideUp 0.4s cubic-bezier(0.25,0.1,0.25,1.5) forwards', // Correctly added
        fadeInSlideRight:
          'fadeInSlideRight 0.5s cubic-bezier(0.25,0.1,0.25,1.5) forwards', // Correctly added
      },
      keyframes: {
        // <--- Start of keyframes
        buttonPulseBase: {
          /* ... */
        },
        subtleSmoke: {
          /* ... */
        },
        subtleBgDrift: {
          /* ... */
        },
        grainAnimate: {
          /* ... */
        },
        hazeEffect: {
          /* ... */
        },
        spotlightFlicker: {
          /* ... */
        },
        lensFlareGlint: {
          /* ... */
        },
        buttonPulseVariantOne: {
          /* ... */
        },
        buttonPulseVariantTwo: {
          /* ... */
        },
        glint: {
          /* ... */
        }, // Assuming you renamed glintPlus or want both
        glintPlus: {
          // This was in your original, I'm keeping it but ensure you don't have duplicate logic with 'glint'
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
          // Correctly added
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInSlideRight: {
          // Correctly added
          '0%': { opacity: '0', transform: 'translateX(15px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      }, // <--- This brace closes 'keyframes'
    }, // <--- This brace closes 'extend'
  }, // <--- This brace closes 'theme'
  plugins: [
    function ({
      addUtilities,
    }: {
      addUtilities: (
        utilities: Record<string, import('csstype').Properties>,
      ) => void;
    }) {
      addUtilities({
        '.animation-delay-[-10s]': {
          'animation-delay': '-10s',
        },
        '.animation-delay-[-20s]': {
          'animation-delay': '-20s',
        },
      } as Record<string, import('csstype').Properties>);
    },
  ],
};
