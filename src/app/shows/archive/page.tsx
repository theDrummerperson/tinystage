// src/app/shows/archive/page.tsx
'use client'; // REQUIRED because we use useState and useEffect for the modal

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { PastShow } from '@/data/pastShows'; // Adjust path if needed
import { pastShowsData } from '@/data/pastShows'; // Adjust path if needed

import PosterCard from '@/components/PosterCard'; // Import new component
import ShowDetailModal from '@/components/ShowDetailModal'; // Import new component
import ShowsPastFeatured from '@/components/ShowsPastFeatured';

const ShowsArchivePage = () => {
  const [selectedShowForModal, setSelectedShowForModal] =
    useState<PastShow | null>(null);

  // Memoize sorted data to prevent re-sorting on every render
  // Assuming pastShowsData itself is stable / loaded once.
  // If it can change (e.g., fetched from API), add it to dependency array.
  const sortedAllShows = useMemo(
    () =>
      [...pastShowsData].sort(
        (a, b) =>
          new Date(b.performanceDate).getTime() -
          new Date(a.performanceDate).getTime(),
      ),
    [], // <--- CORRECTED: Empty dependency array
  );

  const featuredShowFromArchive: PastShow | undefined = sortedAllShows[0];
  const gridShows = sortedAllShows; // Display all shows in the grid

  const openModalWithShow = useCallback((show: PastShow) => {
    setSelectedShowForModal(show);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }, []); // setSelectedShowForModal is stable

  const closeModal = useCallback(() => {
    setSelectedShowForModal(null);
    // The effect's cleanup function will handle restoring scroll if modal was open
  }, []); // setSelectedShowForModal is stable

  // Effect to handle Escape key for closing modal and clean up body overflow style
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (selectedShowForModal) {
      window.addEventListener('keydown', handleEsc);
      // Return a cleanup function
      return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = ''; // Restore scroll ONLY if modal was open
      };
    }
    // No need for an else block to set overflow to '' here,
    // as it's handled by the cleanup or if the modal was never opened.
    return undefined; // Or simply no return if no listener was added
  }, [selectedShowForModal, closeModal]);

  return (
    <>
      <main className='min-h-screen bg-gray-100 text-[var(--brand-black)]'>
        {featuredShowFromArchive && (
          <ShowsPastFeatured
            show={featuredShowFromArchive}
            sectionTitle='From The Archives: A Recent Highlight'
            sectionSubtitle='Revisit one of our memorable past performances.'
            highlightLabel='Archive Gem'
            headingLevel='h1'
          />
        )}

        <div className='container mx-auto px-4 py-16 md:py-20'>
          <header className='mb-12 md:mb-16 text-center'>
            <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--brand-black)] mb-4'>
              Explore All Past Performances
            </h2>
            <p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
              Click on any poster to learn more about the show and relive the
              moments.
            </p>
          </header>

          {gridShows.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8'>
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
              <p className='text-xl text-gray-500'>
                No past performances in the archive yet. Our history is just
                beginning!
              </p>
              <Link
                href='/shows'
                className='mt-4 inline-block text-[var(--brand-yellow)] hover:underline font-semibold'
              >
                ← Back to Shows
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Modal for Show Details, conditionally rendered */}
      {/* AnimatePresence from framer-motion can be used here for exit animations if desired */}
      {selectedShowForModal && (
        <ShowDetailModal show={selectedShowForModal} onClose={closeModal} />
      )}
    </>
  );
};

export default ShowsArchivePage;
