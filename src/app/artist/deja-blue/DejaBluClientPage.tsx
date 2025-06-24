// src/app/artists/deja-blue/DejaBluClientPage.tsx
'use client'; // This component requires client-side hooks

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Disc3,
  MapPin,
  Music2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// --- UPDATED: Data for the video carousel with your new links ---
const videos = [
  {
    id: 'SHQSefo3vx4', // From the link for "HEARTONOVERDRIVE"
    title: 'Heart on Overdrive (Live at TinyStage)',
    description:
      'Watch the electrifying live performance of "Heart on Overdrive" from the inaugural TinyStage Concert Series.',
  },
  {
    id: 'h286tROXhPg', // From the link for "AshestoGold"
    title: 'Ashes to Gold (Live at TinyStage)',
    description:
      'The powerful title track from their debut EP, performed live at the FEED Media Arts Center.',
  },
];

// Data for the setlist
const setlist = [
  'Intro',
  'Heart on Overdrive',
  'J+B',
  'Every Way',
  'Love Crash',
  'Ashes to Gold',
];

const DejaBluClientPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1,
    );
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <main className='overflow-hidden bg-brand-black'>
      {/* Hero Section (No changes here) */}
      <section className='relative h-[70vh] min-h-[500px] flex items-end text-white'>
        <div
          className='absolute inset-0 z-0'
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <Image
            src='/images/deja/5.jpg'
            alt='Atmospheric promotional image for Déjà Blu'
            fill
            className='object-cover h-[120%]'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent' />
        </div>
        <div className='container mx-auto px-4 relative z-10 pb-20'>
          <div className='max-w-4xl'>
            <span className='inline-block text-lg font-semibold bg-brand-yellow text-brand-black rounded-full px-4 py-1 mb-4 motion-safe:animate-fadeIn'>
              Show No. 01
            </span>
            <h1 className='text-5xl sm:text-6xl md:text-8xl font-bold text-brand-white leading-tight'>
              <span
                className='block tracking-tight motion-safe:animate-fadeIn'
                style={{ animationDelay: '0.3s' }}
              >
                Featured Artist:
              </span>
              <span className='block text-brand-yellow mt-2 motion-safe:animate-textReveal'>
                Déjà Blu
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Performance Video Carousel Section */}
      <section className='py-20 md:py-28 bg-brand-gray-dark'>
        <div className='container mx-auto px-4 max-w-5xl'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl sm:text-4xl font-bold text-brand-white'>
              Live Performances
            </h2>
          </div>

          <div className='relative'>
            <div className='aspect-video bg-brand-black rounded-lg shadow-2xl overflow-hidden border border-brand-gray-dark/50 motion-safe:animate-fadeIn'>
              <iframe
                key={videos[currentVideoIndex].id}
                width='100%'
                height='100%'
                src={`https://www.youtube.com/embed/${videos[currentVideoIndex].id}?si=c141d8e13d4b4a1b&autoplay=1&rel=0`}
                title={videos[currentVideoIndex].title}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
              ></iframe>
            </div>

            <button
              onClick={handlePrevVideo}
              aria-label='Previous video'
              className='absolute top-1/2 left-4 -translate-y-1/2 bg-brand-black/50 hover:bg-brand-yellow hover:text-brand-black text-white rounded-full p-2 transition-all duration-300 z-10'
            >
              <ChevronLeft className='w-6 h-6' />
            </button>

            <button
              onClick={handleNextVideo}
              aria-label='Next video'
              className='absolute top-1/2 right-4 -translate-y-1/2 bg-brand-black/50 hover:bg-brand-yellow hover:text-brand-black text-white rounded-full p-2 transition-all duration-300 z-10'
            >
              <ChevronRight className='w-6 h-6' />
            </button>
          </div>

          <div className='text-center mt-8'>
            <h3 className='text-2xl font-bold text-brand-white'>
              {videos[currentVideoIndex].title}
            </h3>
            <p className='text-lg text-brand-gray-light mt-2 max-w-3xl mx-auto'>
              {videos[currentVideoIndex].description}
            </p>
          </div>

          <div className='flex justify-center gap-2 mt-6'>
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideoIndex(index)}
                aria-label={`Go to video ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentVideoIndex === index
                    ? 'bg-brand-yellow scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About the Band Section (No changes here) */}
      <section className='py-20 md:py-28 bg-brand-black'>
        <div className='container mx-auto px-4'>
          <div className='grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto'>
            <div className='lg:col-span-1 space-y-6 text-lg'>
              <h3 className='text-2xl font-bold text-brand-yellow'>
                Band Details
              </h3>
              <div className='space-y-4'>
                <p className='flex items-center'>
                  <Music2 className='w-5 h-5 mr-3 text-brand-yellow/80' />
                  Indie | Alt | Dream Pop
                </p>
                <p className='flex items-center'>
                  <MapPin className='w-5 h-5 mr-3 text-brand-yellow/80' />
                  Erie, PA
                </p>
                <p className='flex items-center'>
                  <Disc3 className='w-5 h-5 mr-3 text-brand-yellow/80' />
                  Debut EP: Ashes to Gold
                </p>
              </div>
            </div>
            <div className='lg:col-span-2 prose prose-xl prose-invert max-w-none text-brand-gray-light leading-relaxed'>
              <h3 className='text-2xl font-bold text-brand-yellow !mb-4'>
                About the Band
              </h3>
              <p>
                Déjà Blu is a genre-blending trio from Erie creating music that
                feels like memory: hazy, haunting, and heartbreakingly familiar.
                With roots in indie, lo-fi, dream pop, and alternative rock,
                their sound is equal parts vibe and vulnerability—something you
                can move to, cry to, or float away with.
              </p>
              <p>
                Their name, a play on <em className='text-white'>déjà vu</em>{' '}
                and the emotional weight of the color{' '}
                <em className='text-white'>blue</em>, captures the essence of
                their music: cycles of longing, nostalgia, and emotional
                resonance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* "Ashes to Gold" EP Showcase (No changes here) */}
      <section className='py-20 md:py-28 bg-brand-gray-dark'>
        <div className='container mx-auto px-4 max-w-4xl text-center'>
          <Clapperboard className='w-12 h-12 text-brand-yellow mx-auto mb-6' />
          <h2 className='text-3xl sm:text-4xl font-bold text-brand-white'>
            Debut EP: Ashes to Gold
          </h2>
          <p className='text-lg text-brand-gray-light mt-4 mb-10'>
            The complete setlist from their TinyStage performance.
          </p>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-lg'>
            {setlist.map((song) => (
              <div
                key={song}
                className='bg-brand-black/30 p-4 rounded-md border border-white/10 text-brand-gray-light'
              >
                {song}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Members Section (No changes here) */}
      <section className='py-20 md:py-28 bg-brand-black'>
        <div className='container mx-auto px-4'>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-brand-white'>
              Meet the Members
            </h2>
          </div>
          <div className='grid md:grid-cols-3 gap-12 max-w-5xl mx-auto'>
            <div
              className='text-center motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.1s' }}
            >
              <div className='relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-brand-gray-dark/50 shadow-2xl'>
                <Image
                  src='/images/deja/2.png'
                  alt='Rebecca Lynn'
                  fill
                  className='object-cover'
                />
              </div>
              <h3 className='text-2xl font-bold text-brand-white'>
                Rebecca Lynn
              </h3>
              <p className='text-brand-yellow font-semibold'>Vocals & Bass</p>
            </div>
            <div
              className='text-center motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.3s' }}
            >
              <div className='relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-brand-gray-dark/50 shadow-2xl'>
                <Image
                  src='/images/deja/3.jpg'
                  alt='Jordan Michael'
                  fill
                  className='object-cover'
                />
              </div>
              <h3 className='text-2xl font-bold text-brand-white'>
                Jordan Michael
              </h3>
              <p className='text-brand-yellow font-semibold'>Lead Guitar</p>
            </div>
            <div
              className='text-center motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.5s' }}
            >
              <div className='relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-brand-gray-dark/50 shadow-2xl'>
                <Image
                  src='/images/deja/4.jpg'
                  alt='Joshua Thomas'
                  fill
                  className='object-cover'
                />
              </div>
              <h3 className='text-2xl font-bold text-brand-white'>
                Joshua Thomas
              </h3>
              <p className='text-brand-yellow font-semibold'>Drums</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA (No changes here) */}
      <section className='py-24 bg-brand-gray-dark'>
        <div className='container mx-auto px-4 text-center'>
          <Link
            href='/calendar'
            className='group inline-flex items-center justify-center px-8 py-4 border border-brand-yellow text-lg font-medium rounded-md text-brand-yellow hover:bg-brand-yellow hover:text-brand-black shadow-lg transition-all duration-300 transform hover:scale-[1.03]'
          >
            <ArrowLeft className='mr-3 h-5 w-5' />
            View Full Schedule
          </Link>
        </div>
      </section>
    </main>
  );
};

export default DejaBluClientPage;
