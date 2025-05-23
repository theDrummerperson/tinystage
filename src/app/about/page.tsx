// src/app/about/page.tsx
import { ArrowRight, HeartHandshake } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// Assuming you have these animations in your tailwind.config.js
// fadeIn: 'fadeIn 0.5s ease-out forwards', (already used by motion-safe:animate-fadeIn)
// textReveal: 'textReveal 0.8s cubic-bezier(0.7, 0, 0.3, 1) forwards 0.5s', // Added 0.5s delay
// nudgeRight: 'nudgeRight 0.3s ease-in-out',
// highlightYellow: 'highlightYellow 0.5s ease-out forwards',

export const metadata = {
  title: 'About TinyStage | Local Sound, Global Stage',
  description:
    'Learn about TinyStage, our mission to amplify underrepresented artists in Erie, PA, and how we bring local brilliance to the world.',
};

const AboutPage = () => {
  return (
    <main className='overflow-hidden'>
      {' '}
      {/* Keep overflow-hidden for safety with some animations/transforms */}
      {/* Hero Section with Enhanced Depth */}
      <section className='relative py-20 md:py-32 text-center bg-radial-gradient'>
        {' '}
        {/* Ensure .bg-radial-gradient is defined or handled by Tailwind */}
        {/* Layer 1: Abstract blurred background (optional, for depth) */}
        {/* <div className="absolute inset-0 bg-[url('/images/blurred-stage-lights.jpg')] bg-cover bg-center opacity-[0.08] z-0 motion-safe:animate-subtleBgDrift" /> */}
        {/* Layer 2: Main Radial Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-radial from-brand-gray-dark/15 via-brand-black/70 to-brand-black opacity-95 z-[1]' />{' '}
        {/* Slightly reduced opacity */}
        <div className='container mx-auto px-4 relative z-[2]'>
          {' '}
          {/* Content above overlays */}
          <div className='max-w-4xl mx-auto space-y-8 mb-12'>
            <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold text-brand-white leading-tight'>
              <span
                className='block tracking-tight motion-safe:animate-fadeIn'
                style={{ animationDelay: '0.1s' }}
              >
                Local sound.
              </span>
              {/* Enhanced "Global stage." with text reveal */}
              <span className='block text-brand-yellow mt-4 motion-safe:animate-textReveal'>
                Global stage.
              </span>
            </h1>

            <div
              className='border-l-2 border-brand-yellow pl-6 ml-4 max-w-2xl mx-auto motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.7s' }}
            >
              <p className='text-xl md:text-2xl text-brand-gray-light italic'>
                A new live music platform born from one guiding question—
              </p>
            </div>

            <div
              className='pt-8 motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.9s' }}
            >
              <p className='text-2xl md:text-3xl font-medium text-brand-white leading-relaxed'>
                What would it look like if Erie's arts scene truly reflected the
                city's cultural richness?
              </p>
            </div>
          </div>
          {/* Constellation CTA Buttons with Enhanced Interaction */}
          <div className='flex flex-wrap justify-center gap-4 md:gap-6 max-w-2xl mx-auto'>
            <Link
              href='/shows/upcoming'
              className='group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-brand-black bg-brand-yellow hover:brightness-110 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-brand-black focus:ring-brand-yellow motion-safe:animate-fadeIn'
              style={{ animationDelay: '1.1s' }} // Adjusted delays
            >
              See Upcoming Shows
              <ArrowRight className='ml-3 h-5 w-5 group-hover:animate-nudgeRight' />{' '}
              {/* Icon nudge on group hover */}
            </Link>
          </div>
        </div>
      </section>
      {/* Support Section - Enhanced Visual Hierarchy */}
      <section className='py-20 md:py-28 bg-brand-black'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-5 gap-12 items-center'>
            <div
              className='md:col-span-2 text-center md:text-left motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.2s' }}
            >
              <div className='inline-block p-5 rounded-full bg-brand-gray-dark/40 mb-6 shadow-md'>
                {' '}
                {/* Slightly larger padding, shadow */}
                <HeartHandshake className='w-16 h-16 text-brand-yellow' />{' '}
                {/* Slightly larger icon */}
              </div>
              <h2 className='text-3xl sm:text-4xl font-bold mb-3 text-brand-white'>
                Fuel the Stage
              </h2>
              <p className='text-xl text-brand-gray-medium'>
                {' '}
                {/* Slightly more prominent sub-line */}
                Your support powers the music
              </p>
            </div>

            <div
              className='md:col-span-3 motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.4s' }}
            >
              <p className='text-lg md:text-xl text-brand-gray-light leading-relaxed mb-6'>
                TinyStage is a grassroots music series powered by{' '}
                <strong className='text-brand-white'>community</strong>. Your
                support—financial, in-kind, or organizational—allows us to:
              </p>

              <ul className='space-y-4 mb-10'>
                {' '}
                {/* Increased spacing */}
                <li className='flex items-start'>
                  <ArrowRight className='text-brand-yellow mr-3 mt-1 h-5 w-5 flex-shrink-0' />{' '}
                  {/* Using ArrowRight for bullets */}
                  <span className='text-brand-gray-light'>
                    Pay artists fairly for their work
                  </span>
                </li>
                <li className='flex items-start'>
                  <ArrowRight className='text-brand-yellow mr-3 mt-1 h-5 w-5 flex-shrink-0' />
                  <span className='text-brand-gray-light'>
                    Keep performances free and accessible
                  </span>
                </li>
                <li className='flex items-start'>
                  <ArrowRight className='text-brand-yellow mr-3 mt-1 h-5 w-5 flex-shrink-0' />
                  <span className='text-brand-gray-light'>
                    Amplify local voices on a global scale
                  </span>
                </li>
              </ul>

              <p className='text-xl md:text-2xl text-brand-yellow font-semibold leading-relaxed mb-10'>
                {' '}
                {/* Increased font-semibold, margin */}
                Help us keep the spotlight bright on Erie's talent.
              </p>

              <Link
                href='/support'
                className='group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-brand-black bg-brand-yellow hover:brightness-110 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-brand-black focus:ring-brand-yellow'
              >
                Become a Supporter
                <ArrowRight className='ml-3 h-5 w-5 group-hover:animate-nudgeRight' />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
