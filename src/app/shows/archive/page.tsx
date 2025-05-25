// src/app/shows/archive/page.tsx
'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { PastShow } from '@/data/pastShows';
import { pastShowsData } from '@/data/pastShows';

import PosterCard from '@/components/PosterCard';
import ShowDetailModal from '@/components/ShowDetailModal';
import ShowsPastFeatured from '@/components/ShowsPastFeatured';

// Assuming you might have a more stylized display font for headings
// You would configure this in your tailwind.config.js
// For now, we'll use Tailwind's default sans or a generic serif for contrast if needed.

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
  const gridShows = sortedAllShows; // Use all shows for the grid

  const openModalWithShow = useCallback((show: PastShow) => {
    setSelectedShowForModal(show);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setSelectedShowForModal(null);
    // Effect cleanup will restore scroll
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (selectedShowForModal) {
      window.addEventListener('keydown', handleEsc);
      return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = '';
      };
    }
    return undefined;
  }, [selectedShowForModal, closeModal]);

  return (
    <>
      <main className='min-h-screen bg-brand-black text-brand-white'>
        {featuredShowFromArchive && (
          <ShowsPastFeatured
            show={featuredShowFromArchive}
            sectionTitle='From The Archives: A Recent Highlight'
            sectionSubtitle='Revisit one of our memorable past performances.'
            highlightLabel='Archive Gem'
            headingLevel='h1'
          />
        )}

        {/* --- START OF IMPROVED SECTION --- */}
        <div className='container mx-auto px-4 py-16 md:py-24 lg:py-32'>
          {/* Removed text-center from the <header> to allow for more flexible alignment inside */}
          <header className='mb-12 md:mb-16 lg:mb-20 relative'>
            {/* Optional: A subtle decorative background element - an SVG or a gradient streak */}
            {/* 
            <div 
              aria-hidden="true" 
              className="absolute -top-10 -left-10 w-48 h-48 opacity-5 transform -rotate-12"
            >
              <svg viewBox="0 0 100 100" fill="var(--brand-yellow)" xmlns="http://www.w3.org/2000/svg">
                 <circle cx="50" cy="50" r="40" /> // Example shape
              </svg>
            </div>
            */}

            <div className='md:max-w-3xl'>
              {' '}
              {/* Limit width of the header text block */}
              <h2 className='font-extrabold tracking-tighter text-brand-white mb-4 md:mb-6'>
                <span className='block text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
                  Explore Our
                </span>
                <span className='block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-yellow leading-tight'>
                  Past Stages
                </span>
              </h2>
              {/* Subtitle with more breathing room and slightly more contrast */}
              <p className='text-base sm:text-lg md:text-xl text-brand-gray-light max-w-xl leading-relaxed'>
                Dive into the moments, the music, and the magic. Click on any
                poster below to unfold the story of each performance.
              </p>
            </div>
          </header>
          {/* --- END OF IMPROVED SECTION --- */}

          {gridShows.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-10'>
              {gridShows.map((show) => (
                <PosterCard
                  key={show.id}
                  show={show}
                  onClick={() => openModalWithShow(show)}
                />
              ))}
            </div>
          ) : (
            <div className='text-center py-12'>
              <p className='text-xl text-brand-gray-medium mb-3'>
                The archive is quiet for now...
              </p>
              <p className='text-brand-gray-light mb-6'>
                Our history is waiting to be written. Check back soon!
              </p>
              <Link
                href='/shows'
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
          )}
        </div>
      </main>

      {selectedShowForModal && (
        <ShowDetailModal show={selectedShowForModal} onClose={closeModal} />
      )}
    </>
  );
};

export default ShowsArchivePage;
