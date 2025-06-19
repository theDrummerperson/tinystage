// src/app/shows/page.tsx
import { ArrowRight, CalendarDays, Play } from 'lucide-react';
import Image from 'next/image';
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

   
    
      </section>

      {/* SVG Peeking from Side */}
      <div className='absolute top-1/4 -right-20 w-40 h-auto opacity-20 z-0 pointer-events-none motion-safe:animate-subtleSvgDrift'>
        <div className="w-full h-full bg-[url('/svg/side-peek.svg')] bg-contain bg-no-repeat aspect-square" />
      </div>






     {/* === ENHANCED V5: Featured Past Shows Section === */}
<section className='relative py-20 md:py-28 bg-brand-black z-[1] overflow-hidden'>
  
  {/* --- Simplified Background --- */}
  <div className='absolute inset-0 z-0' aria-hidden='true'>
    {/* Layer 1: The SVG Graphic */}
    <div className='absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none'>
      <div
        className="w-[1200px] h-[1200px] bg-[url('/svg/4.svg')] bg-contain bg-no-repeat bg-center 
                   opacity-20 mix-blend-lighten motion-safe:animate-cosmicPulse"
      />
    </div>
    
    {/* Layer 2: Gradient Overlay for Contrast */}
    <div className='absolute inset-0 bg-gradient-radial from-brand-black/10 via-brand-black/50 to-brand-black/80' />
  </div>

  {/* --- Content (on top of background) --- */}
  <div className='container mx-auto px-4 text-center relative z-[1]'>
    <div
      className='max-w-3xl mx-auto mb-20 md:mb-24 motion-safe:animate-fadeIn'
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

    {/* Dynamic "Collage" Layout Container */}
    <div className='relative flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-0 max-w-5xl mx-auto mb-16 min-h-[500px] md:min-h-[400px]'>
      
      {/* Card 1: Deja Blue */}
      <div
        className='w-full max-w-md md:absolute md:left-0 md:top-0 group motion-safe:animate-fadeIn'
        style={{ animationDelay: '0.3s' }}
      >
        <Link
          href='/shows/archive#deja-blue'
          className='block relative aspect-video lg:aspect-[4/3] rounded-lg overflow-hidden shadow-2xl transition-all duration-500 ease-out 
                     md:rotate-[-4deg] md:hover:rotate-0 md:hover:scale-105 md:hover:z-10 
                     hover:shadow-[0_0_45px_rgba(var(--brand-yellow-rgb),0.3)]'
        >
          <Image
            src='/gallery/db6.jpeg'
            alt='Deja Blue performing live with a guitar at TinyStage'
            fill
            className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/40 to-transparent' />
          <div className='absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
            <Play
              className='h-16 w-16 text-brand-white drop-shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300'
              fill='currentColor'
            />
          </div>
          <div className='absolute bottom-0 left-0 p-6 w-full text-left'>
            <h3 className='text-3xl font-bold text-brand-yellow drop-shadow-md transition-transform duration-300 group-hover:translate-x-1'>
              Deja Blue
            </h3>
            <p className='mt-2 text-brand-gray-light max-w-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-75'>
              Electrifying, soulful vocals, songwriting, and raw, emotion-infused guitar and drums. This is Deja Blue!
            </p>
          </div>
        </Link>
      </div>

      {/* Card 2: Johnny Kocur */}
      <div
        className='w-full max-w-md md:absolute md:right-0 md:bottom-0 group motion-safe:animate-fadeIn'
        style={{ animationDelay: '0.5s' }}
      >
        <Link
          href='/shows/archive#johnny-kocur'
          className='block relative aspect-video lg:aspect-[4/3] rounded-lg overflow-hidden shadow-2xl transition-all duration-500 ease-out
                     md:rotate-[3deg] md:hover:rotate-0 md:hover:scale-105 md:hover:z-10 
                     hover:shadow-[0_0_45px_rgba(var(--brand-yellow-rgb),0.3)]'
        >
          <Image
            src='/images/MainKocur.jpg'
            alt='Johnny Kocur playing an acoustic guitar at TinyStage'
            fill
            className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/40 to-transparent' />
          <div className='absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
            <Play
              className='h-16 w-16 text-brand-white drop-shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300'
              fill='currentColor'
            />
          </div>
          <div className='absolute bottom-0 left-0 p-6 w-full text-left'>
            <h3 className='text-3xl font-bold text-brand-yellow drop-shadow-md transition-transform duration-300 group-hover:translate-x-1'>
              Johnny Kocur
            </h3>
            <p className='mt-2 text-brand-gray-light max-w-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-75'>
              Masterful vocal performances and acoustic storytelling with intricate fingerpicking for a night of pop-R&B. This is Johnny Kocur!
            </p>
          </div>
        </Link>
      </div>
    </div>

    {/* CTA Button */}
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





   {/* Edge Bleed Effect */}
        <div className='absolute -bottom-px left-0 w-full h-10 md:h-32 z-[1] overflow-hidden'>
          <div
            className="absolute bottom-0 left-0 w-full h-full bg-[url('/svg/edge-bleed.svg')] bg-repeat-x bg-bottom opacity-10"
            style={{ backgroundSize: 'auto 100%' }}
          />
        </div>



    </main>
  );
};

export default ShowsPage;