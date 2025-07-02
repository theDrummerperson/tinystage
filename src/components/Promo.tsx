// src/components/Promo.tsx
'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils'; // Assuming you have a cn utility

const PROMO_IMAGES = [
  {
    src: '/land/2.png',
    alt: 'Johnny Kocur performing on stage at a TinyStage event.',
  },
  {
    src: '/land/1.png',
    alt: 'An energetic band captivating Deja Blue at a TinyStage show.',
  },
   {
    src: '/land/3.png',
    alt: 'Ellis performing at a TinyStage show.',
  },
];

const IMAGE_CHANGE_INTERVAL = 5000; // 5 seconds

export default function Promo() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % PROMO_IMAGES.length,
      );
    }, IMAGE_CHANGE_INTERVAL);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return (
    <section className='relative bg-brand-black py-20 md:py-28 overflow-hidden z-[1]'>
      {/* Layer 1: New Background Image (furthest back) */}
      <div
        aria-hidden='true'
        className='absolute inset-0 z-[-2] bg-cover bg-center mix-blend-luminosity opacity-20 blur-sm motion-safe:animate-subtleBgDrift'
        style={{ backgroundImage: "url('/images/5.png')" }}
      />
      {/* Layer 2: Darkening Gradient Overlay for readability */}
      <div
        aria-hidden='true'
        className='absolute inset-0 z-[-1] bg-gradient-radial from-brand-black/10 via-brand-black/70 to-brand-black'
      />

      <div className='container mx-auto px-4 relative z-[2]'>
        <div className='grid md:grid-cols-2 gap-12 lg:gap-20 items-center'>
          {/* Text Content Column */}
          <div
            className='text-center md:text-left motion-safe:animate-fadeIn'
            style={{ animationDelay: '0.1s' }}
          >
            <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-brand-white leading-tight mb-4'>
              The Sound of Our City,
              <span className='block text-brand-yellow mt-2'>Amplified.</span>
            </h2>
            <p className='text-lg md:text-xl text-brand-gray-light leading-relaxed max-w-xl mx-auto md:mx-0 mb-10'>
              TinyStage is more than a series of shows; it's a celebration of
              local talent. We provide the platform for Erie's most passionate
              artists to share their sound, story, and soul.
            </p>
            <Link
              href='/shows'
              className='group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-brand-black bg-brand-yellow hover:brightness-110 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-brand-black focus:ring-brand-yellow'
            >
              Discover Our Shows
              <ArrowRight className='ml-3 h-5 w-5 group-hover:animate-nudgeRight' />
            </Link>
          </div>

          {/* Image Rotator Column */}
          <div
            className='relative aspect-[4/3] w-full max-w-lg mx-auto motion-safe:animate-fadeIn'
            style={{ animationDelay: '0.3s' }}
          >
            <div className='absolute inset-0 rounded-xl bg-brand-black/30 shadow-2xl shadow-brand-yellow/5 border-2 border-brand-gray-dark/50 overflow-hidden'>
              {PROMO_IMAGES.map((image, index) => (
                <Image
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes='(max-width: 768px) 100vw, 50vw'
                  className={cn(
                    'object-cover transition-opacity duration-1000 ease-in-out',
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0',
                  )}
                  priority={index === 0} // Prioritize loading the first image
                />
              ))}
              {/* Progress Bar for image transition */}
              <div className='absolute bottom-0 left-0 w-full h-1 bg-brand-white/10'>
                <div
                  key={currentImageIndex} // Re-trigger animation on change
                  className='h-full bg-brand-yellow'
                  style={{
                    animation: `progress-bar ${IMAGE_CHANGE_INTERVAL}ms linear forwards`,
                  }}
                />
              </div>
            </div>
            {/* Add a subtle decorative element */}
            <div className='absolute -top-4 -right-4 w-24 h-24 bg-[url("/svg/side-peek.svg")] bg-contain bg-no-repeat opacity-20 -z-10' />
          </div>
        </div>
      </div>

      {/* Define the keyframes for the progress bar inside a style tag */}
      <style jsx>{`
        @keyframes progress-bar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
