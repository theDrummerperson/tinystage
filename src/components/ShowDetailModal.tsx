// src/components/ShowDetailModal.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import type { PastShow } from '@/data/pastShows'; // Adjust path if needed

// Assuming it's in the same components folder

interface ShowDetailModalProps {
  show: PastShow | null;
  onClose: () => void;
}

const ShowDetailModal: React.FC<ShowDetailModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent clicks inside the modal from closing it
  };

  return (
    <div
      className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-out'
      onClick={onClose} // Click on overlay closes modal
      style={{ opacity: 1 }} // Opacity handled by Framer Motion on the panel now
      role='dialog'
      aria-modal='true'
      aria-labelledby='show-modal-title'
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className='bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'
        onClick={handleModalContentClick}
      >
        {/* Option 1: Use ShowsPastFeatured as a header/banner within the modal */}
        {/* <ShowsPastFeatured show={show} sectionTitle={show.artistName} headingLevel="h2" isMinimal /> */}
        {/* Consider adding an 'isMinimal' or 'context="modal"' prop to ShowsPastFeatured
            to render a more compact version suitable for a modal. */}

        {/* Option 2: Simpler direct content (as per your original modal structure) */}
        <div className='relative w-full aspect-[16/9] mb-6 rounded overflow-hidden shadow'>
          <Image
            src={show.flyerImageUrl}
            alt={show.flyerImageAlt || `Flyer for ${show.artistName}`}
            fill
            className='object-contain' // Tailwind handles object-fit: contain
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 700px' // Adjust sizes as needed for modal context
            priority // If this image is LCP for the modal view
          />
        </div>
        <h2
          id='show-modal-title'
          className='text-3xl font-bold mb-2 text-[var(--brand-black)]'
        >
          {show.artistName}
        </h2>
        <p className='text-gray-700 mb-1 font-medium'>
          Date: {show.performanceDate}
        </p>
        {show.tagline && (
          <p className='text-gray-600 italic mb-4'>{show.tagline}</p>
        )}
        {show.description && (
          <p className='text-gray-800 mb-6 leading-relaxed whitespace-pre-wrap'>
            {show.description}
          </p>
        )}
        {show.artistPageLink && (
          <Link
            href={show.artistPageLink}
            target='_blank' // Good for external links
            rel='noopener noreferrer' // Security for target="_blank"
            className='inline-block text-white bg-[var(--brand-yellow)] hover:bg-opacity-90 px-6 py-2.5 rounded-md font-semibold transition-colors duration-200 ease-out'
          >
            More About This Show
          </Link>
        )}
        <button
          type='button'
          onClick={onClose}
          className='mt-6 block ml-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium transition-colors'
          aria-label='Close modal'
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default ShowDetailModal;
