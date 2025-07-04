// src/app/artists/ellis/EllisClientPage.tsx
'use client'; // This component requires client-side hooks

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Disc3,
  Instagram,
  MapPin,
  Music2, // Placeholder icon for members
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// Data for the video carousel
const videos = [
  {
    id: 'q_T23-TRkS4', // Extracted from the video of Ellis's performance
    title: 'Ellis (Live at TinyStage)',
    description:
      "Watch Ellis's raw, intimate acoustic set, performed live for the TinyStage Concert Series.",
  },
];

// Data for the setlist
const setlist = [
  'More (original)',
  'Bullet with Butterfly Wings (cover)',
  'Giving Up (original)',
  'Meant to Break (original)',
  'Money (cover)',
  'Fake Friends (original)',
  'Cable Car (cover)',
  'Last Hope (cover)',
  'Karma (original)',
  'Voices (original)',
];

const EllisClientPage = () => {
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
    <main className='overflow-hidden bg-brand-black text-brand-gray-light'>
      {/* Hero Section */}
      <section className='relative h-[70vh] min-h-[500px] flex items-end text-white'>
        <div
          className='absolute inset-0 z-0'
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <Image
            src='/images/ellis/EllisHeader.png'
            alt='Atmospheric promotional image for Ellis'
            fill
            className='object-cover h-[120%]'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent' />
        </div>
        <div className='container mx-auto px-4 relative z-10 pb-20'>
          <div className='max-w-4xl'>
            <span className='inline-block text-lg font-semibold bg-brand-yellow text-brand-black rounded-full px-4 py-1 mb-4 motion-safe:animate-fadeIn'>
              Show No. 03
            </span>
            <h1 className='text-5xl sm:text-6xl md:text-8xl font-bold text-brand-white leading-tight'>
              <span
                className='block tracking-tight motion-safe:animate-fadeIn'
                style={{ animationDelay: '0.3s' }}
              >
                Featured Artist:
              </span>
              <span className='block text-brand-yellow mt-2 motion-safe:animate-textReveal'>
                Ellis
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
              Live Performance
            </h2>
          </div>
          <div className='relative'>
            <div className='aspect-video bg-brand-black rounded-lg shadow-2xl overflow-hidden border border-brand-gray-dark/50 motion-safe:animate-fadeIn'>
              <iframe
                key={videos[currentVideoIndex].id}
                width='100%'
                height='100%'
                src={`https://www.youtube.com/embed/GcdHtNGWEgw?autoplay=1&rel=0"`}
                title={videos[currentVideoIndex].title}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
              ></iframe>
            </div>
            {videos.length > 1 && (
              <>
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
              </>
            )}
          </div>
          <div className='text-center mt-8'>
            <h3 className='text-2xl font-bold text-brand-white'>
              {videos[currentVideoIndex].title}
            </h3>
            <p className='text-lg text-brand-gray-light mt-2 max-w-3xl mx-auto'>
              {videos[currentVideoIndex].description}
            </p>
          </div>
          {videos.length > 1 && (
            <div className='flex justify-center gap-2 mt-6'>
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  aria-label={`Go to video ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentVideoIndex === index ? 'bg-brand-yellow scale-125' : 'bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About the Artist Section */}
      <section className='py-20 md:py-28 bg-brand-black'>
        <div className='container mx-auto px-4'>
          <div className='grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto'>
            <div className='lg:col-span-1 space-y-6 text-lg'>
              <h3 className='text-2xl font-bold text-brand-yellow'>
                Artist Details
              </h3>
              <div className='space-y-4'>
                <p className='flex items-center'>
                  <Music2 className='w-5 h-5 mr-3 text-brand-yellow/80' />
                  Alternative Rock | Emo-Pop
                </p>
                <p className='flex items-center'>
                  <MapPin className='w-5 h-5 mr-3 text-brand-yellow/80' />
                  Girard, PA
                </p>
                <p className='flex items-center'>
                  <Disc3 className='w-5 h-5 mr-3 text-brand-yellow/80' />
                  Projects: Ellis (EP), Voices from My Head
                </p>
                <p className='flex items-center'>
                  <Instagram className='w-5 h-5 mr-3 text-brand-yellow/80' />
                  @_ellis_music_
                </p>
              </div>
            </div>
            <div className='lg:col-span-2 prose prose-xl prose-invert max-w-none text-brand-gray-light leading-relaxed'>
              <h3 className='text-2xl font-bold text-brand-yellow !mb-4'>
                About the Artist
              </h3>
              <p>
                Ellis is a singer-songwriter from Erie, Pennsylvania, whose raw
                honesty and intimate sound blur the lines between alternative
                rock and emotional storytelling. Backed by guitarist Shawn
                Spencer, Ellis’s stripped-down live acoustic performances hit
                with emotional clarity—letting the lyrics lead.
              </p>
              <p>
                Inspired by the unapologetic vulnerability of Paramore and the
                haunting cool of Billie Eilish, Ellis began writing songs at a
                young age, using music as a space to process, provoke, and be
                present. With her debut EP <em className='text-white'>Ellis</em>{' '}
                and forthcoming album{' '}
                <em className='text-white'>Voices from My Head</em>, she
                explores themes of inner conflict, betrayal, resilience, and
                release—all stitched together by her evocative voice and
                electric undertones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Setlist Showcase */}
      <section className='py-20 md:py-28 bg-brand-gray-dark'>
        <div className='container mx-auto px-4 max-w-5xl text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold text-brand-white'>
            TinyStage Setlist
          </h2>
          <p className='text-lg text-brand-gray-light mt-4 mb-10'>
            The complete setlist from her intimate acoustic performance.
          </p>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-lg'>
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

      {/* Meet the Members Section */}

      <section className='py-20 md:py-28 bg-brand-black'>
        <div className='container mx-auto px-4'>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-brand-white'>
              Meet the Performers
            </h2>
          </div>
          <div className='grid md:grid-cols-2 gap-12 max-w-2xl mx-auto'>
            {/* Ellis */}
            <div
              className='text-center motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.1s' }}
            >
              <div className='relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-brand-gray-dark/50 shadow-2xl bg-brand-gray-dark'>
                <Image
                  src='/images/ellis/main1.jpg'
                  alt='Ellis Portrait'
                  layout='fill'
                  objectFit='cover'
                  priority
                />
              </div>
              <h3 className='text-2xl font-bold text-brand-white'>Ellis</h3>
              <p className='text-brand-yellow font-semibold'>Vocals</p>
            </div>

            {/* Shawn Spencer */}
            <div
              className='text-center motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.3s' }}
            >
              <div className='relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-brand-gray-dark/50 shadow-2xl bg-brand-gray-dark'>
                <Image
                  src='/images/ellis/shawn.jpg'
                  alt='Shawn Spencer Portrait'
                  layout='fill'
                  objectFit='cover'
                  priority
                />
              </div>
              <h3 className='text-2xl font-bold text-brand-white'>
                Shawn Spencer
              </h3>
              <p className='text-brand-yellow font-semibold'>
                Supporting on Guitar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
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

export default EllisClientPage;
