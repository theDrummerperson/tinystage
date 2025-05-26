// components/Logo.tsx
import Link from 'next/link';
import React from 'react';

// Add this to your tailwind.config.js plugins or global CSS if you want text-stroke
// Example Tailwind Plugin for text-stroke:
/*
plugins: [
  function ({ addUtilities, theme, e }) {
    const utilities = {};
    const strokeWidths = { '1': '1px', '2': '2px' }; // Add more as needed
    const colors = theme('colors');

    for (const widthKey in strokeWidths) {
      for (const colorKey in colors) {
        if (typeof colors[colorKey] === 'string') {
          utilities[`.text-stroke-${widthKey}-${colorKey}`] = {
            '-webkit-text-stroke-width': strokeWidths[widthKey],
            '-webkit-text-stroke-color': colors[colorKey],
            'paint-order': 'stroke fill',
          };
        }
      }
    }
    addUtilities(utilities, ['responsive', 'hover']);
  },
],
*/

export default function Logo() {
  return (
    <Link
      href='/'
      className='
        group
        flex items-center 
        space-x-3 

        focus:outline-none 
        focus-visible:ring-2 
        focus-visible:ring-[var(--brand-yellow)]
        focus-visible:ring-offset-4 /* Increased offset for more breathing room */
        focus-visible:ring-offset-[var(--brand-black)]
        transition-all
        duration-300 /* Slightly longer duration for smoother feel */
        ease-in-out /* Smoother easing */
      '
      aria-label='TinyStage Home'
    >
      {/* Icon Mark */}
      <div
        className='
          relative /* For potential pseudo-element effects */
          w-12 h-12
          bg-[var(--brand-yellow)]
          rounded-full
          flex items-center justify-center
          shadow-md /* Slightly more pronounced */
          transition-all /* Transition all properties */
          duration-300
          ease-in-out
          group-hover:scale-110 /* Slightly larger scale */
          group-hover:rotate-[-6deg] /* Playful rotation */
          group-hover:shadow-lg 
          group-hover:shadow-[var(--brand-yellow)]/30
          group-focus-visible:scale-110 /* Consistent with hover */
          group-focus-visible:rotate-[-6deg]
          border
          border-[var(--brand-black)]
          group-hover:border-[var(--brand-yellow)] /* Change color on hover for a pop */
        '
      >
        <span
          className='
          text-xl /* Slightly adjusted size */
          font-extrabold /* Using a standard weight from sans for potentially better clarity */
          text-[var(--brand-black)] 
          tracking-tighter
          select-none
          /* Use font-display for the TS mark for clarity */
          group-hover:text-[var(--brand-black)] /* Ensure text color remains on hover */
        '
        >
          TS
        </span>
      </div>

      {/* Wordmark */}
      <div className='relative'>
        {/* Fill Text */}
        {/* Lobster is usually bold by nature, ensure it's the weight you want */}
                <span
                  className='
                    block
                    text-2xl 
                    font
                  group-hover:text-[var(--brand-yellow)] /* Wordmark color changes on hover */
                  tracking-tight
                  select-none
                  font-display /* Using Lobster as per your config */
                  relative
                  z-10
                  transition-colors duration-300 ease-in-out
                '
                >
                  TinyStage
                </span>
        {/* Outline - Using Text Stroke (preferred) or your layered span approach */}
        {/* Option 1: Text Stroke (add .text-stroke-1-brand-black utility) */}
        <span
          aria-hidden="true" // Decorative
          className='
          absolute inset-0
          block
          text-2xl
          font-bold
          /* text-stroke-1-brand-black */ /* Apply your text-stroke utility here */
          text-transparent /* Fill is transparent, stroke provides color */
          tracking-tight
          select-none
          font-display
          z-0
          group-hover:/* text-stroke-1-brand-yellow */ /* Optional: change stroke color on hover */
          transition-colors duration-300 ease-in-out /* For stroke color */
        '
        >
          TinyStage
        </span>
        {/* Option 2: Your text-shadow approach (if text-stroke is not used) */}
        {/* <span
          aria-hidden="true"
          className='
          absolute
          inset-0
          text-2xl
          font-bold
          text-[var(--brand-black)]
          tracking-tight
          select-none
          font-display
          z-0
          [text-shadow:_1px_1px_0_var(--brand-black),_-1px_-1px_0_var(--brand-black),_1px_-1px_0_var(--brand-black),_-1px_1px_0_var(--brand-black)]
          group-hover:text-[var(--brand-yellow)] // If you want the "shadow" to also change
        '
        >
          TinyStage
        </span> */}
      </div>
    </Link>
  );
}