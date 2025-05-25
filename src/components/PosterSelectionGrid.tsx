// src/components/PosterSelectionGrid.tsx
'use client';

import { Info } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils'; // Assuming you have this utility

import type { PastShow } from '@/data/pastShows';

interface PosterSelectionGridProps {
  shows: PastShow[];
  onPosterSelect: (show: PastShow) => void;
  title?: string;
  // New prop to force a specific image for all items if only one show
  // or if we want to override the show's flyerImageUrl for this specific display
  forceImageUrl?: string;
}

const PosterSelectionGrid: React.FC<PosterSelectionGridProps> = ({
  shows,
  onPosterSelect,
  title,
  forceImageUrl,
}) => {
  if (!shows || shows.length === 0) {
    return null;
  }

  const isSingleShow = shows.length === 1;

  return (
    <section
      aria-labelledby={title ? 'poster-selection-title' : undefined}
      className={cn(
        'py-12 md:py-16',
        isSingleShow ? 'flex justify-center items-center' : '', // Center if single show
      )}
    >
      <div
        className={cn(
          'container mx-auto px-4',
          isSingleShow ? 'w-full max-w-2xl lg:max-w-3xl' : '',
        )}
      >
        {' '}
        {/* Max width for single show */}
        {title && (
          <h2
            id='poster-selection-title'
            className={cn(
              'text-3xl sm:text-4xl font-bold tracking-tight text-brand-yellow mb-10 md:mb-12',
              isSingleShow ? 'text-center' : 'text-center', // Can adjust alignment
            )}
          >
            {title}
          </h2>
        )}
        <div
          className={cn(
            isSingleShow
              ? 'flex justify-center' // Simple flex centering for one item
              : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12', // Your multi-item grid (adjusted for larger cards)
          )}
        >
          {shows.map((show, index) => {
            // ALWAYS use /images/Dejaposter.png if forceImageUrl is provided or if it's a single show and no forceImageUrl (as per your request)
            const displayImageUrl =
              forceImageUrl ||
              (isSingleShow
                ? '/images/Dejaposter.png'
                : show.flyerImageUrl || '/images/Dejaposter.png');
            const displayImageAlt = `Poster for ${show.artistName} on ${new Date(show.performanceDate).toLocaleDateString()}`;

            return (
              <article
                key={show.id}
                className={cn(
                  'group relative rounded-lg overflow-hidden shadow-lg bg-brand-gray-dark transform transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-brand-yellow/30 hover:-translate-y-2 focus-within:ring-4 focus-within:ring-brand-yellow focus-within:ring-offset-4 focus-within:ring-offset-brand-black',
                  isSingleShow
                    ? 'w-full sm:w-10/12 md:w-8/12 lg:w-7/12'
                    : 'w-full', // Control width of single poster
                )}
              >
                <button
                  type='button'
                  onClick={() => onPosterSelect(show)}
                  className='block w-full text-left focus:outline-none'
                  aria-label={`View details for ${show.artistName}`}
                >
                  <div className='relative w-full aspect-[3/4] bg-brand-gray-medium'>
                    <Image
                      src={displayImageUrl} // Uses the determined image URL
                      alt={displayImageAlt}
                      fill
                      className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-105'
                      sizes={
                        isSingleShow
                          ? '(max-width: 768px) 80vw, 600px'
                          : '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw'
                      }
                      priority={index === 0} // Prioritize if it's the first (or only)
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 ease-out flex flex-col justify-end p-4 md:p-6'>
                      <h3
                        className={cn(
                          'font-semibold tracking-tight text-brand-white mb-1 drop-shadow-md',
                          isSingleShow ? 'text-2xl md:text-3xl' : 'text-xl',
                        )}
                      >
                        {show.artistName}
                      </h3>
                      <p
                        className={cn(
                          'font-mono uppercase tracking-wider text-brand-gray-light opacity-90 mb-3 drop-shadow-sm',
                          isSingleShow ? 'text-sm' : 'text-xs',
                        )}
                      >
                        {new Date(show.performanceDate).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric', // Fuller date for single view
                          },
                        )}
                      </p>
                      <div className='flex items-center text-brand-yellow font-semibold text-sm md:text-base'>
                        <Info size={isSingleShow ? 20 : 16} className='mr-2' />
                        View Performance Details
                      </div>
                    </div>
                  </div>
                </button>
                {/* Minimal info can be hidden if single show as overlay is more prominent */}
                {!isSingleShow && (
                  <div className='p-4 bg-brand-gray-dark rounded-b-lg group-hover:hidden group-focus-within:hidden transition-opacity duration-200'>
                    <h3 className='text-md font-semibold tracking-tight text-brand-white truncate'>
                      {show.artistName}
                    </h3>
                    <p className='text-xs font-mono uppercase tracking-wider text-brand-gray-light opacity-70'>
                      {new Date(show.performanceDate).toLocaleDateString(
                        'en-US',
                        {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        },
                      )}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PosterSelectionGrid;
