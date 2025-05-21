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
      colors: {
        // Assuming your brand colors are set up in globals.css and mapped here
        'brand-black': 'var(--brand-black)',
        'brand-white': 'var(--brand-white)',
        'brand-yellow': 'var(--brand-yellow)',
        'brand-gray': {
          light: 'var(--brand-gray-light)',
          medium: 'var(--brand-gray-medium)',
          dark: 'var(--brand-gray-dark)',
        },
        // ... any other brand colors
      },
      fontFamily: {
        // sans: ['YourPrimaryFont', 'sans-serif'],
        // display: ['YourDisplayFont', 'serif'], // Example for display font
      },
      animation: {
        // --- FROM YOUR CURRENT CONFIG (Refined) ---
        glintPlus: 'glintPlus 7s infinite ease-in-out 2s', // Kept as is, review keyframes
        buttonPulse: 'buttonPulseBase 3s infinite ease-out', // Renamed to avoid conflict if you define variants
        subtleSmoke: 'subtleSmoke 45s linear infinite alternate', // Base smoke/haze
        subtleBgDrift: 'subtleBgDrift 90s linear infinite alternate',

        // --- NEWLY SUGGESTED ANIMATIONS ---
        grain: 'grainAnimate 0.2s steps(3) infinite', // Faster steps for more "active" grain
        hazeOne: 'hazeEffect 50s linear infinite alternate',
        hazeTwo: 'hazeEffect 60s linear infinite alternate', // Uses same keyframes, different duration
        spotlightFlicker:
          'spotlightFlicker 0.2s infinite alternate ease-in-out', // Slightly slower, smoother flicker
        lensFlareGlint: 'lensFlareGlint 8s infinite ease-in-out 2.5s',
        buttonPulseAltOne: 'buttonPulseVariantOne 2.8s infinite ease-in-out',
        buttonPulseAltTwo:
          'buttonPulseVariantTwo 3.3s infinite ease-in-out 0.2s',
      },
      keyframes: {
        // --- REFINED/EXISTING KEYFRAMES ---

        buttonPulseBase: {
          // Base pulse, can be used by Button.tsx or as a default
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(var(--brand-yellow-rgb), 0.25)',
          },
          '50%': {
            transform: 'scale(1.02)',
            boxShadow: '0 0 0 6px rgba(var(--brand-yellow-rgb), 0)',
          },
        },
        subtleSmoke: {
          // This will be used by hazeOne and hazeTwo via 'hazeEffect'
          // This keyframe should animate properties of multiple gradients (e.g. background-position)
          // to create a shifting, layered smoke/haze.
          // For simplicity, let's assume it animates opacity of a single gradient layer.
          // A true multi-gradient animation here would be very long.
          '0%': {
            opacity: '0.6',
            transform: 'translateX(-5px) translateY(-2px) scale(1)',
          },
          '50%': {
            opacity: '1',
            transform: 'translateX(5px) translateY(2px) scale(1.05)',
          },
          '100%': {
            opacity: '0.6',
            transform: 'translateX(-5px) translateY(-2px) scale(1)',
          },
        },
        subtleBgDrift: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '40px 40px' }, // Slower drift
        },

        // --- NEWLY SUGGESTED KEYFRAMES ---
        grainAnimate: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '25%': { transform: 'translate(-0.3px, 0.3px)' }, // More subtle grain movement
          '50%': { transform: 'translate(0.3px, -0.3px)' },
          '75%': { transform: 'translate(-0.3px, -0.3px)' },
        },
        hazeEffect: {
          // A generic keyframe for haze layers, to be used by `animate-hazeOne` and `animate-hazeTwo`
          // This would typically animate background-position of CSS gradients
          '0%': {
            backgroundPosition: '0% 0%, 100% 100%, 50% 50%',
            opacity: 0.7,
          },
          '50%': {
            backgroundPosition: '10% 20%, 90% 80%, 40% 60%',
            opacity: 1,
          },
          '100%': {
            backgroundPosition: '0% 0%, 100% 100%, 50% 50%',
            opacity: 0.7,
          },
        },
        spotlightFlicker: {
          // More analog flicker
          '0%, 100%': { opacity: 0.9 },
          '20%': { opacity: 1 },
          '40%': { opacity: 0.85 },
          '60%': { opacity: 1 },
          '80%': { opacity: 0.92 },
        },
        lensFlareGlint: {
          // Anamorphic lens flare style
          '0%, 100%': {
            opacity: 0,
            transform: 'translateX(-150%) skewX(-30deg) scaleX(0.1)',
          },
          '48%': {
            opacity: 0.7,
            transform: 'translateX(0%) skewX(-30deg) scaleX(0.3)',
          },
          '50%': {
            opacity: 1,
            transform: 'translateX(20%) skewX(-30deg) scaleX(0.5)',
            filter: 'brightness(1.5)',
          },
          '52%': {
            opacity: 0.7,
            transform: 'translateX(40%) skewX(-30deg) scaleX(0.3)',
          },
          '70%': {
            opacity: 0,
            transform: 'translateX(150%) skewX(-30deg) scaleX(0.1)',
          },
        },
        buttonPulseVariantOne: {
          // Slightly different pulse characteristics
          '0%, 100%': { transform: 'scale(1)', opacity: 0.85 },
          '50%': { transform: 'scale(1.02)', opacity: 1 },
        },
        buttonPulseVariantTwo: {
          // Another variation
          '0%, 100%': {
            transform: 'scale(1) rotate(-0.5deg)',
            boxShadow: '0 0 0 0 rgba(var(--brand-yellow-rgb), 0.2)',
          },
          '50%': {
            transform: 'scale(1.015) rotate(0.5deg)',
            boxShadow: '0 0 0 5px rgba(var(--brand-yellow-rgb), 0)',
          },
        },
        glint: {
          '0%, 100%': { filter: 'brightness(1) saturate(1)' },
          '50%': {
            filter:
              'brightness(1.15) saturate(1.1) drop-shadow(0 0 4px rgba(var(--brand-yellow-rgb),0.5))',
          },
        },
      }, // <-- Close 'keyframes'
      // Make sure to close 'extend' here
    }, // <-- Close 'extend'
  }, // <-- Close 'theme'
  plugins: [
    // Your existing plugin for negative animation delay
    function ({
      addUtilities,
    }: {
      addUtilities: (
        utilities: Record<string, import('csstype').Properties>,
      ) => void;
    }) {
      addUtilities({
        '.animation-delay-[-10s]': {
          // For hazeTwo offset
          'animation-delay': '-10s',
        },
        '.animation-delay-[-20s]': {
          // Added another example
          'animation-delay': '-20s',
        },
      } as Record<string, import('csstype').Properties>);
    },
  ],
};
