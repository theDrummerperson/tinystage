// src/components/PhotoSplashItem.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { cn } from '@/lib/utils';

interface PhotoSplashImage {
  src: string;
  alt: string;
  linkHref: string; // Link will now be determined by the parent
  title?: string;
  subtitle?: string;
}

interface PhotoSplashItemProps {
  image: PhotoSplashImage;
  index: number;
}

const PhotoSplashItem: React.FC<PhotoSplashItemProps> = ({ image, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px -50px 0px",
  });

  // isExternal is less relevant now as links are internal
  // const isExternal = !!(image.linkHref.startsWith('http')); 

  return (
    <Link
      href={image.linkHref} // Use the linkHref passed from the parent
      ref={ref}
      // target={isExternal ? '_blank' : '_self'} // Not needed if all internal
      // rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(
        "relative aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] rounded-lg overflow-hidden shadow-xl group transform-gpu",
        "transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.5)] motion-safe:will-change-transform",
        inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
      )}
      style={{ 
        transitionDelay: `${index * 70}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={image.alt || `View details for ${image.title || 'performance'}`} // Improved aria-label
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-all duration-500 ease-out group-hover:scale-110"
        priority={index < 4}
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-brand-black/70 via-brand-black/40 to-transparent transition-opacity duration-300 ease-out",
          isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      />
      <div className={cn(
          "absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white transition-all duration-300 ease-out transform",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
      )}>
        {image.title && (
          <h3 className="font-sans font-semibold text-lg md:text-xl text-brand-yellow tracking-tight">
            {image.title}
          </h3>
        )}
        {image.subtitle && (
          <p className="text-xs md:text-sm text-brand-gray-light/90 mt-0.5">
            {image.subtitle}
          </p>
        )}
         {/* Simplified or removed action text, as the whole card is a link */}
         <p className="text-sm font-medium text-brand-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            Explore →
          </p>
      </div>
    </Link>
  );
};

export default PhotoSplashItem;