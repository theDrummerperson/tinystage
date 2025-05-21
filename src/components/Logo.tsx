// components/Logo.tsx
import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <Link
      href='/'
      className='
        group
        flex items-center 
        space-x-3
        rounded
        focus:outline-none 
        focus-visible:ring-2 
        focus-visible:ring-[var(--brand-yellow)]
        focus-visible:ring-offset-2 
        focus-visible:ring-offset-[var(--brand-black)]
        transition-all
        duration-200
        ease-out
      '
      aria-label='TinyStage Home'
    >
      {/* Icon Mark - Matches ML.svg's yellow/black scheme */}
      <div
        className='
          w-12 h-12
          bg-[var(--brand-yellow)]
          rounded-full
          flex items-center justify-center
          shadow-sm
          transition-transform
          duration-200
          ease-out
          group-hover:scale-105
          group-focus:scale-105
          border-2
          border-[var(--brand-black)]
        '
      >
        <span
          className='
          text-lg 
          font-bold 
          text-[var(--brand-black)] 
          tracking-tighter
          select-none
          font-display
        '
        >
          TS
        </span>
      </div>

      {/* Wordmark - Matches ML.svg's white text */}
      <div className='relative'>
        <span
          className='
          text-2xl 
          font-bold 
          text-[var(--brand-white)]
          tracking-tight
          select-none
          font-display
          relative
          z-10
        '
        >
          TinyStage
        </span>
        {/* Creates the black outline effect from ML.svg */}
        <span
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
        '
        >
          TinyStage
        </span>
      </div>
    </Link>
  );
}
