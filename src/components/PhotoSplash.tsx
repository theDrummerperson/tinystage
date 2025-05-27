// src/components/PhotoSplash.tsx
"use client";

import Link from 'next/link';
import React, { useMemo } from 'react'; // Removed useState, useEffect, useRef if only for parallax which was removed

import Button from '@/components/buttons/Button';

import PhotoSplashItem from './PhotoSplashItem';

// Interface for the data passed to PhotoSplashItem
interface PreparedImage {
  src: string;
  alt: string;
  linkHref: string; // This will be set based on src content
  title?: string;
  subtitle?: string;
}

// Interface for the raw image data received as props
interface RawPhotoSplashImage {
  src: string;
  alt: string; // Alt is still good to have for CMS or initial data
  // No eventLink or merchLink needed here anymore if logic is internal
  title?: string;
  subtitle?: string;
}

interface PhotoSplashProps {
  rawImagesData: RawPhotoSplashImage[]; // Changed prop name
  mainCtaText?: string;
  mainCtaLink?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
}

const defaultRawImagesData: RawPhotoSplashImage[] = [
  
  { src: "/images/kocur/kocur1.jpg", alt: "Johnny Kocur performing", title: "Johnny Kocur", subtitle: "Night of Pop-R&B" },
  { src: "/images/deja/2.png", alt: "Deja Blue dynamic shot", title: "Deja Blue", subtitle: "Raw & Expressive" },
  { src: "/images/kocur/kocur2.jpg", alt: "Johnny Kocur close-up", title: "Johnny Kocur", subtitle: "Night of Pop-R&B"},
  { src: "/images/kocur/kocur3.jpg", alt: "Johnny Kocur with guitar", title: "Johnny Kocur", subtitle: "Acoustic Vibes" },
  { src: "/images/deja/4.jpg", alt: "Deja Blue crowd interaction", title: "Deja Blue", subtitle: "Night of Pop-R&B"},
  { src: "/images/kocur/RyanS.jpg", alt: "Ryan Sands performing", title: "Ryan Sands", subtitle: "Soulful Performance" },
 
];


const PhotoSplash: React.FC<PhotoSplashProps> = ({
  rawImagesData = defaultRawImagesData, // Use the new prop name
  mainCtaText = "Explore All Performances",
  mainCtaLink = "/shows/archive",
  sectionTitle = "Experience the Stage",
  sectionSubtitle = "A glimpse into the unforgettable moments and the artists who make them happen."
}) => {

  // Prepare images with correct links based on src content
  const preparedImagesData: PreparedImage[] = useMemo(() => {
    return rawImagesData.map(image => {
      let linkHref = "/shows"; // Default link
      if (image.src.includes("/deja/")) {
        linkHref = "/shows/archive"; // All Deja images link to archive
      } else if (image.src.includes("/kocur/")) {
        linkHref = "/shows/upcoming"; // All Kocur images link to upcoming
      }
      return {
        ...image,
        linkHref: linkHref,
      };
    });
  }, [rawImagesData]);


  return (
    <section 
      className="relative py-16 md:py-24 bg-brand-black overflow-hidden isolate"
      style={{ /* ... optional background pattern ... */ }}
    >
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-brand-yellow/5 rounded-full blur-[150px] opacity-30 -translate-x-1/2 -translate-y-1/2 z-[-1]" aria-hidden="true"/>
      <div className="absolute bottom-0 right-1/4 w-2/5 h-2/5 bg-brand-blue/5 rounded-full blur-[120px] opacity-20 translate-x-1/2 translate-y-1/2 z-[-1]" aria-hidden="true"/>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="text-center mb-12 md:mb-16">
          <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-brand-yellow leading-tight tracking-tighter uppercase mb-3">
            {sectionTitle}
          </h2>
          <p className="text-lg md:text-xl text-brand-gray-light/80 max-w-2xl mx-auto font-light">
            {sectionSubtitle}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {preparedImagesData.map((image, index) => ( // Use preparedImagesData
            <PhotoSplashItem 
              key={image.src + index} 
              image={image} // Pass the fully prepared image object
              index={index}
            />
          ))}
        </div>

        {mainCtaLink && mainCtaText && (
          <div className="mt-16 md:mt-20 text-center">
            <Link href={mainCtaLink} passHref>
              <Button
                variant="primary"
                size="lg"
                className="px-10 py-4 text-base md:text-lg font-bold tracking-wider uppercase motion-safe:animate-buttonPulse"
              >
                {mainCtaText}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoSplash;