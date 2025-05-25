// src/components/PosterCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import type { PastShow } from '@/data/pastShows'; // Adjust path if needed

interface PosterCardProps {
  show: PastShow; // We'll still accept the show prop, but use a hardcoded image
  onClick?: () => void;
}

const PosterCard: React.FC<PosterCardProps> = ({ show, onClick }) => {
  // As per request, the flyer image is replaced.
  const displayImageUrl = '/images/Dejaposter.png';
  // If Dejaposter is always for a specific artist, use that. Otherwise, use show.artistName or a generic alt.
  const displayImageAlt = `Poster for Deja D. Bonds at TinyStage`; // Be specific to the hardcoded image

  const cardContent = (
    <>
      {/* Image Container: Relative for text overlay and aspect ratio */}
      <div className='relative w-full aspect-[3/4] overflow-hidden rounded-t-md'>
        <Image
          src={displayImageUrl}
          alt={displayImageAlt}
          fill
          className='object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-110'
          sizes='(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 23vw'
          priority={false} // Set to true if this card is often above the fold
        />
        {/* Scrim: Gradient overlay for text readability at the bottom */}
        <div
          className='absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none'
          aria-hidden='true'
        />
        {/* Text Content Overlay */}
        <div className='absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white z-10'>
          <h3 className='text-lg sm:text-xl font-semibold tracking-tight text-brand-white group-hover:text-brand-yellow transition-colors duration-200 ease-out truncate'>
            {show.artistName}
          </h3>
          <p className='mt-1 text-[0.7rem] sm:text-xs font-mono uppercase tracking-wider text-brand-gray-light opacity-80 group-hover:opacity-100 transition-opacity duration-200'>
            {show.performanceDate}
          </p>
        </div>
      </div>

      {/* Optional: "Ticket Stub" / Decorative Bottom Edge */}
      <div className='h-3 bg-brand-gray-dark relative -mt-px'>
        <div className='absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-3 bg-brand-black rounded-b-full'></div>
        <svg
          className='absolute top-0 left-0 w-full h-full text-brand-gray-medium/30'
          preserveAspectRatio='none'
          fill='currentColor'
          viewBox='0 0 100 5'
          aria-hidden='true'
        >
          <path d='M0,0 Q2.5,5 5,0 T10,0 Q12.5,5 15,0 T20,0 Q22.5,5 25,0 T30,0 Q32.5,5 35,0 T40,0 Q42.5,5 45,0 T50,0 Q52.5,5 55,0 T60,0 Q62.5,5 65,0 T70,0 Q72.5,5 75,0 T80,0 Q82.5,5 85,0 T90,0 Q92.5,5 95,0 T100,0 L100,5 L0,5 Z' />
        </svg>
      </div>
    </>
  );

  // Wrapper class for both button and link to ensure consistent styling
  const wrapperClassName =
    'group block w-full text-left bg-brand-gray-dark rounded-lg shadow-lg hover:shadow-xl hover:shadow-brand-yellow/20 transition-all duration-300 ease-out overflow-hidden transform hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black';

  if (onClick) {
    return (
      <button
        type='button'
        onClick={onClick}
        className={wrapperClassName}
        aria-label={`View details for ${show.artistName} on ${show.performanceDate}`}
      >
        {cardContent}
      </button>
    );
  }

  return (
    <Link
      href={show.artistPageLink || `/shows/archive/#${show.id}`}
      className={wrapperClassName}
      aria-label={`View details for ${show.artistName} on ${show.performanceDate}`}
    >
      {cardContent}
    </Link>
  );
};

export default PosterCard;
