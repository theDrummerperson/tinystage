// src/app/about/page.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'About TinyStage | Local Sound, Global Stage',
  description:
    'Learn about TinyStage, our mission to amplify underrepresented artists in Erie, PA, and how we bring local brilliance to the world.',
};

const AboutPage = () => {
  return (
    <main className='overflow-hidden relative'>
      {/* Hero Section */}
      <section className='relative py-20 md:py-32 text-center bg-radial-gradient'>
        {/* Layer 0: New Ethereal SVG Background Element (/svg/1.svg) - The Cosmic Resonator */}
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
                       motion-safe:animate-cosmicPulse motion-safe:animate-slowRotate"
            style={{
              animationDelay: '0.3s', // Delay for the pulse animation to desynchronize
              // The slowRotate animation handles continuous rotation
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
                Local sound.
              </span>
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

        {/* Edge Bleed Effect - Bottom of Hero Section */}
        <div className='absolute -bottom-px left-0 w-full h-20 md:h-32 z-[1] overflow-hidden'>
          <div
            className="absolute bottom-0 left-0 w-full h-full bg-[url('/svg/edge-bleed.svg')] bg-repeat-x bg-bottom opacity-60"
            style={{ backgroundSize: 'auto 100%' }}
          />
        </div>
      </section>

      {/* SVG Peeking from Side - Global Element */}
      <div className='absolute top-1/4 -right-20 w-40 h-auto opacity-20 z-0 pointer-events-none motion-safe:animate-subtleSvgDrift'>
        <div className="w-full h-full bg-[url('/svg/side-peek.svg')] bg-contain bg-no-repeat aspect-square" />
      </div>

      {/* Support Section with Spotlight SVG */}
      <section className='relative py-20 md:py-28 bg-brand-black z-[1]'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-5 gap-12 items-center'>
            <div
              className='md:col-span-2 text-center md:text-left motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.2s' }}
            >
              <div className='relative inline-block p-5 rounded-full bg-brand-gray-dark/40 mb-6 shadow-md'>
                {/* Spotlight SVG with glow effect */}
                <div className='relative z-10 w-24 h-24 flex items-center justify-center'>
                  <div className="w-full h-full bg-[url('/svg/spotlight.svg')] bg-contain bg-no-repeat bg-center" />
                </div>
                {/* Glow effect */}
                <div className='absolute inset-0 rounded-full bg-brand-yellow/20 blur-xl motion-safe:animate-pulse -z-10'></div>
                {/* Subtle radial gradient emanating from the SVG */}
                <div className='absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_30%,rgba(234,179,8,0.1)_70%,transparent_100%)]'></div>
              </div>

              <h2 className='text-3xl sm:text-4xl font-bold mb-3 text-brand-white'>
                Fuel the Stage
              </h2>
              <p className='text-xl text-brand-gray-medium'>
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
                <li className='flex items-start'>
                  <ArrowRight className='text-brand-yellow mr-3 mt-1 h-5 w-5 flex-shrink-0' />
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
