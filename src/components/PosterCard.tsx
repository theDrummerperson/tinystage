// src/components/PosterCard.tsx
import { ChevronDown, ExternalLink, X as CloseIcon } from 'lucide-react'; // Example icons
import Image from 'next/image';
// import Link from 'next/link'; // Not directly used for navigation in this version
import React from 'react';

import type { PastShow } from '@/data/pastShows';

interface PosterCardProps {
  show: PastShow;
  isQuickViewOpen: boolean;
  onToggleQuickView: () => void;
  onOpenFullModal: () => void;
}

const PosterCard: React.FC<PosterCardProps> = ({
  show,
  isQuickViewOpen,
  onToggleQuickView,
  onOpenFullModal,
}) => {
  const displayImageUrl = show.flyerImageUrl || '/images/Dejaposter.png'; // Fallback if no flyer
  const displayImageAlt = `Poster for ${show.artistName} at TinyStage on ${new Date(show.performanceDate).toLocaleDateString()}`;

  // Truncate description for quick view
  const shortDescription = show.description
    ? show.description.substring(0, 150) +
      (show.description.length > 150 ? '...' : '')
    : 'More details available.';

  return (
    <div
      className={`group relative text-left bg-brand-gray-dark rounded-lg shadow-lg hover:shadow-xl hover:shadow-brand-yellow/20 transition-all duration-300 ease-out overflow-hidden transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black
      ${isQuickViewOpen ? 'ring-2 ring-brand-yellow ring-offset-2 ring-offset-brand-black shadow-2xl shadow-brand-yellow/30 -translate-y-1' : ''}`}
    >
      {/* Main Card Clickable Area for Toggling Quick View */}
      <button
        type='button'
        onClick={onToggleQuickView}
        className='block w-full text-left focus:outline-none'
        aria-expanded={isQuickViewOpen}
        aria-label={`Toggle quick view for ${show.artistName}`}
      >
        {/* Image Container */}
        <div
          className={`relative w-full aspect-[3/4] overflow-hidden ${isQuickViewOpen ? 'rounded-t-lg' : 'rounded-t-md'}`}
        >
          <Image
            src={displayImageUrl}
            alt={displayImageAlt}
            fill
            className={`object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-focus-within:scale-105 ${isQuickViewOpen ? 'scale-100 group-hover:scale-100' : 'group-hover:brightness-110'}`}
            sizes='(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 23vw'
            priority={false}
          />
          {/* Scrim for normal state */}
          {!isQuickViewOpen && (
            <div
              className='absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none group-hover:from-black/90 transition-all duration-300'
              aria-hidden='true'
            />
          )}
          {/* Text Content Overlay for Normal State */}
          {!isQuickViewOpen && (
            <div className='absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white z-10'>
              <h3 className='text-lg sm:text-xl font-semibold tracking-tight text-brand-white group-hover:text-brand-yellow transition-colors duration-200 ease-out truncate'>
                {show.artistName}
              </h3>
              <p className='mt-1 text-[0.7rem] sm:text-xs font-mono uppercase tracking-wider text-brand-gray-light opacity-80 group-hover:opacity-100 transition-opacity duration-200'>
                {new Date(show.performanceDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}
          {/* Chevron icon to indicate collapsibility, changes direction */}
          <div
            className={`absolute bottom-2 right-2 z-20 p-1 bg-brand-black/50 rounded-full text-brand-yellow transition-transform duration-300 ease-out ${isQuickViewOpen ? 'rotate-180' : 'rotate-0'}`}
          >
            <ChevronDown size={20} />
          </div>
        </div>
      </button>

      {/* Quick View Expanded Content - uses max-height for transition */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isQuickViewOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`} // Adjust max-h as needed
      >
        <div className='p-4 md:p-5 space-y-3 bg-brand-gray-dark'>
          <h3 className='text-xl sm:text-2xl font-bold tracking-tight text-brand-yellow'>
            {show.artistName}
          </h3>
          <p className='text-xs font-mono uppercase tracking-wider text-brand-gray-light'>
            {new Date(show.performanceDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className='text-sm text-brand-gray-light leading-relaxed'>
            {shortDescription}
          </p>

          {/* Placeholder for mini-gallery or other rich content */}
          {/* {show.galleryImages && show.galleryImages.length > 0 && (
            <div>Mini Gallery Here</div>
          )} */}
          {/* {show.audioPreviewUrl && (
            <div>Audio Player Here</div>
          )} */}

          <div className='flex flex-col sm:flex-row gap-3 pt-2'>
            <button
              type='button'
              onClick={onOpenFullModal}
              className='flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-brand-black bg-brand-yellow rounded-md hover:bg-yellow-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-brand-gray-dark'
            >
              Full Details <ExternalLink size={16} className='ml-2' />
            </button>
            <button
              type='button'
              onClick={onToggleQuickView} // This will close the quick view
              className='flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-brand-white bg-brand-gray-medium rounded-md hover:bg-opacity-80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-gray-light focus:ring-offset-2 focus:ring-offset-brand-gray-dark'
              aria-label='Close quick view'
            >
              Close <CloseIcon size={16} className='ml-2 sm:hidden' />{' '}
              {/* Icon for mobile, text for larger */}
            </button>
          </div>
        </div>
      </div>

      {/* "Ticket Stub" / Decorative Bottom Edge - always visible */}
      <div
        className={`h-3 bg-brand-gray-dark relative -mt-px group-hover:bg-brand-gray-medium transition-colors duration-300 ${isQuickViewOpen ? 'rounded-b-lg' : 'rounded-b-md'}`}
      >
        <div className='absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-3 bg-brand-black rounded-b-full'></div>
        <svg
          className='absolute top-0 left-0 w-full h-full text-brand-gray-medium/30 group-hover:text-brand-yellow/40 transition-colors duration-300'
          preserveAspectRatio='none'
          fill='currentColor'
          viewBox='0 0 100 5'
          aria-hidden='true'
        >
          <path d='M0,0 Q2.5,5 5,0 T10,0 Q12.5,5 15,0 T20,0 Q22.5,5 25,0 T30,0 Q32.5,5 35,0 T40,0 Q42.5,5 45,0 T50,0 Q52.5,5 55,0 T60,0 Q62.5,5 65,0 T70,0 Q72.5,5 75,0 T80,0 Q82.5,5 85,0 T90,0 Q92.5,5 95,0 T100,0 L100,5 L0,5 Z' />
        </svg>
      </div>
    </div>
  );
};

export default PosterCard;
