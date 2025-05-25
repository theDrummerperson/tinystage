// src/app/shows/archive/page.tsx
'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { PastShow } from '@/data/pastShows';
import { pastShowsData } from '@/data/pastShows';

import PosterSelectionGrid from '@/components/PosterSelectionGrid'; // <-- IMPORTED
import ShowDetailModal from '@/components/ShowDetailModal';
import ShowsPastFeatured from '@/components/ShowsPastFeatured';

const ShowsArchivePage = () => {
  const [selectedShowForModal, setSelectedShowForModal] =
    useState<PastShow | null>(null);

  const sortedAllShows = useMemo(
    () =>
      [...pastShowsData].sort(
        (a, b) =>
          new Date(b.performanceDate).getTime() -
          new Date(a.performanceDate).getTime(),
      ),
    [],
  );

  const featuredShowFromArchive: PastShow | undefined = sortedAllShows[0];
  const gridShows = sortedAllShows; // Use this for the PosterSelectionGrid

  // Handler for when a poster is selected in the grid
  const handlePosterSelect = useCallback((show: PastShow) => {
    setSelectedShowForModal(show);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const closeModal = useCallback(() => {
    setSelectedShowForModal(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (selectedShowForModal) {
          closeModal();
        }
      }
    };

    let originalBodyOverflow = '';
    if (typeof document !== 'undefined') {
      originalBodyOverflow = document.body.style.overflow;
      window.addEventListener('keydown', handleEsc);
    }

    if (selectedShowForModal && typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    } else if (!selectedShowForModal && typeof document !== 'undefined') {
      document.body.style.overflow = originalBodyOverflow;
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleEsc);
      }
      if (selectedShowForModal && typeof document !== 'undefined') {
        document.body.style.overflow = originalBodyOverflow;
      }
    };
  }, [selectedShowForModal, closeModal]);

  return (
    <>
      <main className='min-h-screen bg-brand-black text-brand-white'>
        {/* 1. Standard Featured Show (Latest) */}
        {featuredShowFromArchive && (
          <ShowsPastFeatured
            show={featuredShowFromArchive}
            sectionTitle='From The Archives: A Recent Highlight'
            sectionSubtitle='Revisit one of our memorable past performances.'
            highlightLabel='Archive Gem'
            headingLevel='h1'
            // If ShowsPastFeatured can open a modal, it might need a prop like:
            // onShowSelect={handlePosterSelect}
          />
        )}

        {/* 2. Reimagined Header */}
        <div className='container mx-auto px-4 pt-16 md:pt-24 lg:pt-32 pb-8 md:pb-12 lg:pb-16'>
          <header className='mb-12 md:mb-16 lg:mb-20 relative isolate group'>
            {/* Background effects */}
            <div
              aria-hidden='true'
              className='absolute inset-0 -z-10 overflow-hidden'
            >
              <div className='absolute -top-20 -left-20 w-72 h-72 bg-brand-yellow/5 rounded-full filter blur-3xl opacity-70 animate-pulse-slow group-hover:opacity-100 transition-opacity duration-700'></div>
              <div className='absolute -bottom-20 -right-10 w-96 h-96 bg-brand-yellow/10 rounded-full filter blur-3xl opacity-60 animate-pulse-medium group-hover:opacity-90 transition-opacity duration-700 delay-200'></div>
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-brand-white/5 rounded-full filter blur-2xl opacity-50 animate-pulse-fast group-hover:opacity-75 transition-opacity duration-700 delay-400'></div>
            </div>
            <div
              aria-hidden='true'
              className='absolute inset-0 -z-20 overflow-hidden pointer-events-none'
            >
              <span className='absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-r from-transparent via-brand-yellow/5 to-transparent transform -skew-x-12 opacity-30 group-hover:opacity-50 transition-opacity duration-500'></span>
              <span className='absolute bottom-0 right-1/4 w-1/2 h-full bg-gradient-to-l from-transparent via-brand-white/5 to-transparent transform skew-x-12 opacity-20 group-hover:opacity-40 transition-opacity duration-500 delay-100'></span>
            </div>
            {/* Text Content */}
            <div className='relative z-10 md:max-w-4xl mx-auto text-center md:text-left'>
              <span className='block font-light text-2xl sm:text-3xl md:text-4xl text-brand-gray-light tracking-wider mb-1 md:mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300'>
                Step Into The Echoes of
              </span>
              <h2 className='font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-yellow-300 to-amber-400 mb-6 md:mb-8 text-stroke-white-xs group-hover:text-stroke-yellow-xs transition-all duration-300'>
                <span className='block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none -mx-1 group-hover:tracking-wide transition-all duration-500 ease-out'>
                  PAST STAGES
                </span>
              </h2>
              {/* Optional: Subtitle for this header if desired */}
              <p className='text-base sm:text-lg md:text-xl text-brand-white/70 max-w-lg md:max-w-xl mx-auto md:mx-0 leading-relaxed font-serif italic group-hover:text-brand-white/90 transition-colors duration-300'>
                Explore our rich history of performances. Click any poster below
                to learn more.
              </p>
              <div className='mt-8 md:mt-12 flex justify-center md:justify-start'>
                <div className='w-24 h-1 bg-brand-yellow/50 rounded-full group-hover:w-32 group-hover:bg-brand-yellow transition-all duration-500 ease-out'></div>
              </div>
            </div>
          </header>
        </div>
        {/* --- END OF REIMAGINED HEADER SECTION --- */}

        {/* 3. Main Archive Content Section - Now PosterSelectionGrid */}
        {gridShows.length > 0 ? (
          <PosterSelectionGrid
            shows={gridShows}
            onPosterSelect={handlePosterSelect}
            // You can add a title prop here if PosterSelectionGrid supports it
            // title="Browse the Archives"
          />
        ) : (
          // "No shows" message if gridShows is empty
          <div className='container mx-auto px-4 pb-16 md:pb-24 lg:pb-32'>
            <div className='text-center py-12 lg:py-24 px-6 rounded-lg bg-brand-gray-dark'>
              <p className='text-2xl text-brand-yellow mb-4'>
                The archive is quiet for now...
              </p>
              <p className='text-brand-gray-light mb-6'>
                Our history is waiting to be written. Check back soon!
              </p>
              <Link
                href='/shows' // Ensure you have this route
                className='mt-4 inline-block text-brand-yellow hover:text-yellow-300 transition-colors duration-200 font-semibold group'
              >
                Discover Upcoming Shows
                <span
                  aria-hidden='true'
                  className='ml-2 inline-block transition-transform group-hover:translate-x-1'
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        )}
      </main>

      {selectedShowForModal && (
        <ShowDetailModal show={selectedShowForModal} onClose={closeModal} />
      )}
    </>
  );
};

export default ShowsArchivePage;
