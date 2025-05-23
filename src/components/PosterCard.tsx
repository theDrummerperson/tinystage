// src/components/PosterCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import type { PastShow } from '@/data/pastShows'; // Adjust path if needed

interface PosterCardProps {
  show: PastShow;
  onClick?: () => void; // Make onClick optional for broader reusability
}

const PosterCard: React.FC<PosterCardProps> = ({ show, onClick }) => {
  const cardContent = (
    <>
      <div className='relative w-full aspect-[3/4] overflow-hidden'>
        <Image
          src={show.flyerImageUrl}
          alt={show.flyerImageAlt}
          fill
          className='object-cover transition-transform duration-500 ease-out group-hover:scale-105'
          sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw' // Example sizes, adjust as needed
        />
        <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300'></div>
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-[var(--brand-black)] truncate group-hover:text-[var(--brand-yellow)] transition-colors'>
          {show.artistName}
        </h3>
        <p className='text-sm text-gray-600'>{show.performanceDate}</p>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type='button'
        onClick={onClick}
        className='group block w-full text-left bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-out overflow-hidden'
        aria-label={`View details for ${show.artistName} on ${show.performanceDate}`}
      >
        {cardContent}
      </button>
    );
  }

  // Fallback if no onClick, e.g., if used on a page where cards link directly
  return (
    <Link
      href={show.artistPageLink || `/shows/archive/#${show.id}`} // Fallback to anchor if no specific artist page
      className='group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-out overflow-hidden'
      aria-label={`View details for ${show.artistName} on ${show.performanceDate}`}
    >
      {cardContent}
    </Link>
  );
};

export default PosterCard;
