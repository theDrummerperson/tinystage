// This component is a Server Component.
'use client'; // This is placed here based on the original component structure, though it's typically optional for Server Components unless hooks are used. Since useState/useEffect are removed, you can usually delete this.

// External Imports
import { ArrowRight, Calendar } from 'lucide-react';
// Next.js Imports
import Link from 'next/link';

// ================================================================
// 1. DATA & TYPES (Cleaned up: Only necessary types remain)
// ================================================================

// interface PastShowPlaceholder { ... } // REMOVED: Unused Placeholder interface

// const STATIC_FEATURED_SHOWS: PastShowPlaceholder[] = [ ... ]; // REMOVED: Unused Static data

// ================================================================
// 2. HELPER COMPONENTS (Cleaned up)
// ================================================================

// (Removed unused PerformanceMetrics component)
// (Removed unused ShowCard component)

// ================================================================
// 4. MAIN PAGE COMPONENT
// ================================================================
const ShowsPage = () => {
  return (
    <main className='overflow-x-hidden relative bg-brand-black'>
      {/* Hero Section */}
      <section className='relative py-20 md:py-32 text-center bg-radial-gradient'>
        <div
          className='absolute inset-0 flex items-center justify-center z-[0] overflow-hidden pointer-events-none'
          aria-hidden='true'
        >
          <div
            className="w-[calc(100vw_-_40px)] h-[calc(100vw_-_40px)] sm:w-[700px] sm:h-[700px] md:w-[800px] md:h-[800px] lg:w-[900px] lg:h-[900px] bg-[url('/svg/4.svg')] bg-contain bg-no-repeat bg-center motion-safe:animate-cosmicPulse"
            style={{ animationDelay: '0.3s' }}
          />
        </div>
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
                of Erie&apos;s Sound.
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
              href='/calendar'
              className='group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-brand-black bg-brand-yellow hover:brightness-110 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-brand-black focus:ring-brand-yellow motion-safe:animate-fadeIn'
              style={{ animationDelay: '1.1s' }}
            >
              See Upcoming Shows
              <ArrowRight className='ml-3 h-5 w-5 group-hover:animate-nudgeRight' />
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative SVG */}
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
                  <Calendar className='w-20 h-20' strokeWidth={1} />
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
                Our stage is a living, breathing part of Erie&apos;s music
                scene. We regularly feature incredible artists in intimate
                settings, creating an experience you won&apos;t forget.
              </p>
              <p className='text-xl md:text-2xl text-brand-yellow font-semibold leading-relaxed mb-10'>
                Find out who&apos;s playing next and be part of the magic.
              </p>
              <Link
                href='/calendar'
                className='group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-brand-black bg-brand-yellow hover:brightness-110 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-brand-black focus:ring-brand-yellow'
              >
                View Full Schedule
                <ArrowRight className='ml-3 h-5 w-5 group-hover:animate-nudgeRight' />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🚨 REMOVED: The section previously featuring "From the Archive" is now gone */}
    </main>
  );
};

export default ShowsPage;
