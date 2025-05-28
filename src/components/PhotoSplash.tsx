// src/components/PhotoSplash.tsx
// src/components/PhotoSplash.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';

import DesktopGridView from './DesktopGridView';
import LightboxView, { LightboxPhoto } from './LightboxView';

// --- Re-usable Icon Components ---
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
// --- Interfaces ---
interface PhotoData {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  link?: string;
}

interface PhotoSplashProps {
  rawImagesData: PhotoData[];
  sectionTitle: string;
  sectionSubtitle?: string;
  mainCtaText: string;
  mainCtaLink: string;
}

// --- Sub-Component: Section Header ---
interface SectionHeaderProps { title: string; subtitle?: string; }
const SectionHeader: React.FC<SectionHeaderProps> = React.memo(({ title, subtitle }) => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 md:mb-12">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-white mb-3 md:mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-3 text-md md:text-lg lg:text-xl text-brand-gray-light leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
));
SectionHeader.displayName = 'SectionHeader';

// --- Sub-Component: Mobile Carousel View ---
interface MobileCarouselViewProps {
  images: PhotoData[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoToSlide: (index: number) => void;
  onImageClick: (index: number) => void;
}
const MobileCarouselView: React.FC<MobileCarouselViewProps> = React.memo(({
  images,
  currentIndex,
  onPrevious,
  onNext,
  onGoToSlide,
  onImageClick,
}) => {
  if (images.length === 0) {
    return <p className="text-center text-brand-gray-light py-8">No images to display.</p>;
  }
  const currentImage = images[currentIndex];
  if (!currentImage) {
    return <p className="text-center text-brand-gray-light py-8">Error displaying image.</p>;
  }

  const imageDisplay = (
    <Image
      key={currentImage.src}
      src={currentImage.src}
      alt={currentImage.alt}
      fill
      className="object-contain w-full h-full transition-opacity duration-300 ease-in-out"
      sizes="(max-width: 639px) 90vw, (max-width: 767px) 450px, 600px"
      priority={currentIndex === 0}
    />
  );

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        className={`relative overflow-hidden rounded-xl shadow-2xl aspect-[4/3] bg-brand-gray-dark flex justify-center items-center ${!currentImage.link ? 'cursor-pointer' : ''}`}
        onClick={!currentImage.link ? () => onImageClick(currentIndex) : undefined}
        onKeyDown={!currentImage.link ? (e) => (e.key === 'Enter' || e.key === ' ') && onImageClick(currentIndex) : undefined}
        tabIndex={!currentImage.link ? 0 : undefined}
        role={!currentImage.link ? "button" : undefined}
        aria-label={!currentImage.link ? `View image: ${currentImage.title || currentImage.alt} in lightbox` : undefined}
      >
        {currentImage.link ? (
          <Link href={currentImage.link} legacyBehavior>
            <a className="block w-full h-full relative" aria-label={currentImage.title || currentImage.alt}>
              {imageDisplay}
            </a>
          </Link>
        ) : (
          <div className="w-full h-full relative">{imageDisplay}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(var(--brand-black-rgb),0.85)] via-[rgba(var(--brand-black-rgb),0.4)] to-transparent flex flex-col justify-end p-4 pointer-events-none">
            {(currentImage.title || currentImage.subtitle) && (
                <div className="bg-[rgba(var(--brand-black-rgb),0.3)] backdrop-blur-sm p-3 rounded-md pointer-events-auto">
                {currentImage.title && (
                    <h3 className="text-lg font-semibold text-brand-white">{currentImage.title}</h3>
                )}
                {currentImage.subtitle && (
                    <p className="mt-0.5 text-xs text-brand-gray-light">{currentImage.subtitle}</p>
                )}
                </div>
            )}
        </div>
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={onPrevious}
            className="absolute left-1.5 md:left-2.5 top-1/2 -translate-y-1/2 transform bg-[rgba(var(--brand-black-rgb),0.5)] hover:bg-[rgba(var(--brand-black-rgb),0.8)] text-brand-white p-2 rounded-full z-10 transition-colors focus:outline-none enhanced-focus focus:ring-offset-0"
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-1.5 md:right-2.5 top-1/2 -translate-y-1/2 transform bg-[rgba(var(--brand-black-rgb),0.5)] hover:bg-[rgba(var(--brand-black-rgb),0.8)] text-brand-white p-2 rounded-full z-10 transition-colors focus:outline-none enhanced-focus focus:ring-offset-0"
            aria-label="Next image"
          >
            <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <div className="flex justify-center mt-4 space-x-1.5 md:space-x-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => onGoToSlide(idx)}
                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ease-in-out ${
                  currentIndex === idx ? 'bg-brand-yellow scale-125' : 'bg-brand-gray-medium hover:bg-brand-gray-light scale-100'
                }`}
                aria-label={`Go to image ${idx + 1}`}
                aria-current={currentIndex === idx ? "true" : "false"}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
});
MobileCarouselView.displayName = 'MobileCarouselView';

// --- Sub-Component: Main Call to Action Button ---
interface MainCtaButtonProps { text: string; link: string; }
const MainCtaButton: React.FC<MainCtaButtonProps> = React.memo(({ text, link }) => (
  <div className="mt-12 md:mt-16 text-center px-4">
    <Link href={link} legacyBehavior>
      <a className="inline-flex items-center px-6 py-3 md:px-8 md:py-3.5 bg-brand-yellow text-brand-black text-sm md:text-base font-bold rounded-lg shadow-lg hover:bg-yellow-600 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out enhanced-focus focus:ring-offset-brand-black">
        {text}
        {/* Optional: Icon for CTA can be added here if you have one, e.g., an ArrowRightIcon component
        <ArrowRightIcon className="ml-2 h-5 w-5 text-brand-black" />
        */}
      </a>
    </Link>
  </div>
));
MainCtaButton.displayName = 'MainCtaButton';

// --- Main PhotoSplash Component ---
export default function PhotoSplash({
  rawImagesData,
  sectionTitle,
  sectionSubtitle,
  mainCtaText,
  mainCtaLink,
}: PhotoSplashProps) {
  const [carouselCurrentIndex, setCarouselCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  const handleOpenLightbox = useCallback((index: number) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const handleLightboxPrevious = useCallback(() => {
    setLightboxImageIndex((prevIndex) =>
      prevIndex === 0 ? rawImagesData.length - 1 : prevIndex - 1
    );
  }, [rawImagesData.length]);

  const handleLightboxNext = useCallback(() => {
    setLightboxImageIndex((prevIndex) =>
      prevIndex === rawImagesData.length - 1 ? 0 : prevIndex + 1
    );
  }, [rawImagesData.length]);

  const goToCarouselPrevious = useCallback(() => {
    setCarouselCurrentIndex((prevIndex) =>
      prevIndex === 0 ? rawImagesData.length - 1 : prevIndex - 1
    );
  }, [rawImagesData.length]);

  const goToCarouselNext = useCallback(() => {
    setCarouselCurrentIndex((prevIndex) =>
      prevIndex === rawImagesData.length - 1 ? 0 : prevIndex + 1
    );
  }, [rawImagesData.length]);

  const goToCarouselSlide = useCallback((slideIndex: number) => {
    setCarouselCurrentIndex(slideIndex);
  }, []);

  const currentLightboxPhoto = rawImagesData[lightboxImageIndex] as LightboxPhoto | undefined;

  return (
    <section className="py-16 md:py-24 bg-brand-black text-brand-white font-sans overflow-hidden">
      <SectionHeader title={sectionTitle} subtitle={sectionSubtitle} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:hidden">
          <MobileCarouselView
            images={rawImagesData}
            currentIndex={carouselCurrentIndex}
            onPrevious={goToCarouselPrevious}
            onNext={goToCarouselNext}
            onGoToSlide={goToCarouselSlide}
            onImageClick={handleOpenLightbox}
          />
        </div>
        <div className="hidden sm:block">
          <DesktopGridView
            images={rawImagesData}
            onImageClick={handleOpenLightbox}
          />
        </div>
      </div>

      {mainCtaText && mainCtaLink && (
        <MainCtaButton text={mainCtaText} link={mainCtaLink} />
      )}

      {isLightboxOpen && currentLightboxPhoto && (
         <LightboxView
            isOpen={isLightboxOpen}
            photo={currentLightboxPhoto}
            onClose={handleCloseLightbox}
            onPrevious={rawImagesData.length > 1 ? handleLightboxPrevious : undefined}
            onNext={rawImagesData.length > 1 ? handleLightboxNext : undefined}
            showNavigation={rawImagesData.length > 1}
        />
      )}
    </section>
  );
}