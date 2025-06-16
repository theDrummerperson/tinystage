// src/app/shows/page.tsx
import { ArrowRight, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Our Shows | TinyStage',
  description:
    "Explore upcoming shows and past performances from TinyStage. Discover and experience live music from Erie's most vibrant artists.",
};

const ShowsPage = () => {
  return (
    <main className='overflow-hidden relative'>
      {/* Hero Section */}
      <section className='relative py-20 md:py-32 text-center bg-radial-gradient'>
        {/* Layer 0: Ethereal SVG Background */}
        <div
          className='absolute inset-0 flex items-center justify-center z-[0] overflow-hidden pointer-events-none'
          aria-hidden='true'
        >
          <div
            className="w-[calc(100vw_-_40px)] h-[calc(100vw_-_40px)] 
                       sm:w-[700px] sm:h-[700px] 
                       md:w-[800px] md:h-[800px] 
                       lg:w-[900px] lg:h-[900px]
                       bg-[url('/svg/4.svg')] bg-contain bg-no-repeat bg-center
                       motion-safe:animate-cosmicPulse"
            style={{
              animationDelay: '0.3s',
            }}
          />
        </div>

        {/* Layer 1: Main Radial Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-radial from-brand-gray-dark/15 via-brand-black/70 to-brand-black opacity-95 z-[1]' />

        <div className='container mx-auto px-4 relative z-[2]'>
          <div className='max-w-4xl mx-auto space-y-8 mb-12'>
            <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold text-brand-white leading-tight'>
              <span
                className='block tracking-tight motion-safe:animate-fadeIn'
                style={{ animationDelay: '0.1s' }}
              >
                The Heartbeat
              </span>
              <span className='block text-brand-yellow mt-4 motion-safe:animate-textReveal'>
                of Erie's Sound.
              </span>
            </h1>

            <div
              className='border-l-2 border-brand-yellow pl-6 ml-4 max-w-2xl mx-auto motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.7s' }}
            >
              <p className='text-xl md:text-2xl text-brand-gray-light italic'>
                Intimate performances, unforgettable moments. This is where
                local talent takes the spotlight.
              </p>
            </div>
          </div>

          <div className='flex flex-wrap justify-center gap-4 md:gap-6 max-w-2xl mx-auto'>
            <Link
              href='/shows/upcoming'
              className='group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-brand-black bg-brand-yellow hover:brightness-110 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-brand-black focus:ring-brand-yellow motion-safe:animate-fadeIn'
              style={{ animationDelay: '1.1s' }}
            >
              See Upcoming Shows
              <ArrowRight className='ml-3 h-5 w-5 group-hover:animate-nudgeRight' />
            </Link>
          </div>
        </div>

        {/* Edge Bleed Effect */}
        <div className='absolute -bottom-px left-0 w-full h-20 md:h-32 z-[1] overflow-hidden'>
          <div
            className="absolute bottom-0 left-0 w-full h-full bg-[url('/svg/edge-bleed.svg')] bg-repeat-x bg-bottom opacity-60"
            style={{ backgroundSize: 'auto 100%' }}
          />
        </div>
      </section>

      {/* SVG Peeking from Side */}
      <div className='absolute top-1/4 -right-20 w-40 h-auto opacity-20 z-0 pointer-events-none motion-safe:animate-subtleSvgDrift'>
        <div className="w-full h-full bg-[url('/svg/side-peek.svg')] bg-contain bg-no-repeat aspect-square" />
      </div>

      {/* Upcoming Shows Section */}
      <section className='relative py-20 md:py-28 bg-brand-black z-[1]'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-5 gap-12 items-center'>
            <div
              className='md:col-span-2 text-center md:text-left motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.2s' }}
            >
              <div className='relative inline-block p-5 rounded-full bg-brand-gray-dark/40 mb-6 shadow-md'>
                <div className='relative z-10 w-24 h-24 flex items-center justify-center text-brand-yellow'>
                  <CalendarDays className='w-20 h-20' strokeWidth={1} />
                </div>
                <div className='absolute inset-0 rounded-full bg-brand-yellow/20 blur-xl motion-safe:animate-pulse -z-10'></div>
              </div>
              <h2 className='text-3xl sm:text-4xl font-bold mb-3 text-brand-white'>
                Catch Us Live
              </h2>
              <p className='text-xl text-brand-gray-medium'>
                The next show is just around the corner.
              </p>
            </div>
            <div
              className='md:col-span-3 motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.4s' }}
            >
              <p className='text-lg md:text-xl text-brand-gray-light leading-relaxed mb-6'>
                Our stage is a living, breathing part of Erie's music scene. We
                regularly feature incredible artists in intimate settings,
                creating an experience you won't forget.
              </p>
              <p className='text-xl md:text-2xl text-brand-yellow font-semibold leading-relaxed mb-10'>
                Find out who's playing next and be part of the magic.
              </p>
              <Link
                href='/shows/upcoming'
                className='group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-brand-black bg-brand-yellow hover:brightness-110 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-brand-black focus:ring-brand-yellow'
              >
                View Full Schedule
                <ArrowRight className='ml-3 h-5 w-5 group-hover:animate-nudgeRight' />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Past Shows Section */}
      <section className='relative py-20 md:py-28 bg-brand-gray-dark z-[1]'>
        <div className='container mx-auto px-4 text-center'>
          <div
            className='max-w-3xl mx-auto mb-16 motion-safe:animate-fadeIn'
            style={{ animationDelay: '0.1s' }}
          >
            <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-brand-white'>
              From the Archive
            </h2>
            <p className='text-lg md:text-xl text-brand-gray-light max-w-2xl mx-auto'>
              Relive the moments that defined our stage. Here are a couple of
              standout performances from our past shows.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12'>
            <div
              className='bg-brand-black/40 rounded-lg p-8 border border-brand-gray-dark/50 shadow-lg text-left motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.3s' }}
            >
              <h3 className='text-2xl font-bold text-brand-yellow mb-2'>
                Deja Blue
              </h3>
              <p className='text-brand-gray-light leading-relaxed mb-6'>
                An electrifying performance that blended soulful vocals with
                raw, blues-infused guitar riffs, leaving the audience
                spellbound.
              </p>
              <Link
                href='/shows/archive#deja-blue'
                className='font-semibold text-brand-white hover:text-brand-yellow transition-colors group inline-flex items-center'
              >
                Watch the Performance{' '}
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </div>

            <div
              className='bg-brand-black/40 rounded-lg p-8 border border-brand-gray-dark/50 shadow-lg text-left motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.5s' }}
            >
              <h3 className='text-2xl font-bold text-brand-yellow mb-2'>
                Johnny Kocur
              </h3>
              <p className='text-brand-gray-light leading-relaxed mb-6'>
                A masterful display of acoustic storytelling. Johnny's
                intricate fingerpicking and heartfelt lyrics created an
                intimate, unforgettable evening.
              </p>
              <Link
                href='/shows/archive#johnny-kocur'
                className='font-semibold text-brand-white hover:text-brand-yellow transition-colors group inline-flex items-center'
              >
                Watch the Performance{' '}
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </div>
          </div>

          <div
            className='motion-safe:animate-fadeIn'
            style={{ animationDelay: '0.7s' }}
          >
            <Link
              href='/shows/archive'
              className='group inline-flex items-center justify-center px-8 py-4 border border-brand-yellow text-lg font-medium rounded-md text-brand-yellow hover:bg-brand-yellow hover:text-brand-black shadow-lg transition-all duration-300 ease-out transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-brand-black focus:ring-brand-yellow'
            >
              Explore All Past Shows
              <ArrowRight className='ml-3 h-5 w-5 group-hover:animate-nudgeRight' />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShowsPage;