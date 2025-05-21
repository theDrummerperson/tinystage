import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          // Your custom yellow color (#fddb2f) as primary
          50: '#fffdf5',
          100: '#fffae6',
          200: '#fff5cc',
          300: '#ffed99',
          400: '#fddb2f', // Your primary brand color
          500: '#e5c52a',
          600: '#ccaf25',
          700: '#b39920',
          800: '#997d1b',
          900: '#806716',
          950: '#665110',
        },
        dark: '#222222',
        // Simplified color palette focusing on your brand colors
        black: '#000000',
        white: '#ffffff',
        // You can still keep the orange palette if needed for accents
        accent: {
          DEFAULT: '#fddb2f', // Same as primary-400
          dark: '#e5c52a',
          light: '#fff5cc',
        },
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(253, 219, 47, 0.8)) drop-shadow(0 0 15px rgba(253, 219, 47, 0.5)) drop-shadow(0 0 1px rgba(253, 219, 47, 0.8))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
