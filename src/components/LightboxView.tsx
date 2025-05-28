// src/components/LightboxView.tsx
'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';

// Re-use or import your icon components if they are in a shared file
// For now, defining them locally for completeness of this component
const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
  </svg>
);

const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
  </svg>
);

const XMarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);


interface LightboxPhoto {
  src: string;
  alt: string;
  title?: string;
}

interface LightboxViewProps {
  isOpen: boolean;
  photo?: LightboxPhoto;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  showNavigation: boolean;
}

const LightboxView: React.FC<LightboxViewProps> = React.memo(({
  isOpen,
  photo,
  onClose,
  onPrevious,
  onNext,
  showNavigation,
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && onPrevious && showNavigation) {
        onPrevious();
      } else if (event.key === 'ArrowRight' && onNext && showNavigation) {
        onNext();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose, onPrevious, onNext, showNavigation]);

  if (!isOpen || !photo) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-[rgba(var(--brand-black-rgb),0.9)] backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 animate-fadeInBasic"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 text-brand-gray-light hover:text-brand-white transition-colors z-[51]"
        aria-label="Close lightbox"
      >
        <XMarkIcon className="w-8 h-8 md:w-10 md:h-10" />
      </button>

      <div
        className="relative w-full max-w-4xl max-h-[80vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={1600}
          height={1200}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1600px"
          className="object-contain w-auto h-auto max-w-full max-h-full rounded-lg shadow-2xl"
          priority
        />
        {photo.title && (
          <h3 id="lightbox-title" className="mt-4 text-lg text-center text-brand-white font-semibold">
            {photo.title}
          </h3>
        )}
      </div>

      {showNavigation && onPrevious && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrevious(); }}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 transform bg-[rgba(var(--brand-black-rgb),0.3)] hover:bg-[rgba(var(--brand-black-rgb),0.6)] text-brand-white p-2 md:p-3 rounded-full z-[51] transition-colors"
          aria-label="Previous image"
        >
          {/* Corrected: Removed one md:h-8 */}
          <ChevronLeftIcon className="h-6 w-6 md:w-8 md:h-8" />
        </button>
      )}
      {showNavigation && onNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 transform bg-[rgba(var(--brand-black-rgb),0.3)] hover:bg-[rgba(var(--brand-black-rgb),0.6)] text-brand-white p-2 md:p-3 rounded-full z-[51] transition-colors"
          aria-label="Next image"
        >
          {/* Corrected: Removed one md:h-8 */}
          <ChevronRightIcon className="h-6 w-6 md:w-8 md:h-8" />
        </button>
      )}
    </div>
  );
});

LightboxView.displayName = 'LightboxView';
export default LightboxView;
export type { LightboxPhoto };