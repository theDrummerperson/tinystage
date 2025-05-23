// src/app/about/page.tsx
import { ArrowRight, HeartHandshake, Users, Youtube } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'About TinyStage | Local Sound, Global Stage',
  description:
    'Learn about TinyStage, our mission to amplify underrepresented artists in Erie, PA, and how we bring local brilliance to the world.',
};

const AboutPage = () => {
  return (
    <main className='overflow-hidden'>
      {/* Hero Section with Radial Gradient */}
      <section className='relative py-20 md:py-32 text-center bg-radial-gradient'>
        <div className='absolute inset-0 bg-gradient-radial from-brand-gray-dark/20 via-brand-black/80 to-brand-black opacity-90' />
        <div className='container mx-auto px-4 relative z-10'>
          {/* Dynamic Headline Composition */}
          <div className='max-w-4xl mx-auto space-y-8 mb-12'>
            <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold text-brand-white leading-tight'>
              <span className='block tracking-tight'>Local sound.</span>
              <span className='block text-brand-yellow mt-4'>
                Global stage.
              </span>
            </h1>

            <div className='border-l-2 border-brand-yellow pl-6 ml-4 max-w-2xl mx-auto'>
              <p className='text-xl md:text-2xl text-brand-gray-light italic'>
                A new live music platform born from one guiding question—
              </p>
            </div>

            <div className='pt-8'>
              <p className='text-2xl md:text-3xl font-medium text-brand-white leading-relaxed'>
                What would it look like if Erie's arts scene truly reflected the
                city's cultural richness?
              </p>
            </div>
          </div>

          {/* Constellation CTA Buttons */}
          <div className='flex flex-wrap justify-center gap-4 md:gap-6 max-w-2xl mx-auto'>
            <Link
              href='/shows/upcoming'
              className='inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-brand-black bg-brand-yellow hover:brightness-110 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-brand-black focus:ring-brand-yellow motion-safe:animate-fadeIn'
              style={{ animationDelay: '100ms' }}
            >
              See Upcoming Shows
              <ArrowRight className='ml-3 h-5 w-5' />
            </Link>
            <Link
              href='/get-involved#apply'
              className='inline-flex items-center justify-center px-7 py-3.5 border border-brand-yellow text-lg font-medium rounded-md text-brand-yellow bg-transparent hover:bg-brand-yellow hover:text-brand-black shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-brand-black focus:ring-brand-yellow motion-safe:animate-fadeIn'
              style={{ animationDelay: '200ms' }}
            >
              Apply to Perform
              <Users className='ml-3 h-5 w-5' />
            </Link>
            <a
              href='#'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center px-6 py-3 border border-brand-gray-medium text-base font-medium rounded-md text-brand-gray-light bg-transparent hover:bg-brand-gray-medium hover:text-brand-white shadow-md hover:shadow-lg transition-all duration-300 ease-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-brand-black focus:ring-brand-gray-medium motion-safe:animate-fadeIn'
              style={{ animationDelay: '300ms' }}
            >
              Watch Livestream
              <Youtube className='ml-3 h-5 w-5' />
            </a>
            <Link
              href='/support'
              className='inline-flex items-center justify-center px-6 py-3 border border-brand-gray-medium text-base font-medium rounded-md text-brand-gray-light bg-transparent hover:bg-brand-gray-medium hover:text-brand-white shadow-md hover:shadow-lg transition-all duration-300 ease-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-brand-black focus:ring-brand-gray-medium motion-safe:animate-fadeIn'
              style={{ animationDelay: '400ms' }}
            >
              Support Us
              <HeartHandshake className='ml-3 h-5 w-5' />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Manifesto */}
      <section className='py-20 md:py-28 bg-brand-black bg-opacity-95 relative'>
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5" />
        <div className='container mx-auto px-4 relative z-10'>
          <div className='max-w-4xl mx-auto text-center space-y-8'>
            <h2 className='text-4xl md:text-5xl font-bold text-brand-white mb-8'>
              Our Manifesto
            </h2>

            <div className='space-y-10'>
              <p className='text-2xl md:text-3xl text-brand-white font-semibold leading-relaxed'>
                Erie has talent.
              </p>

              <p className='text-xl md:text-2xl text-brand-gray-light max-w-3xl mx-auto leading-relaxed'>
                What it doesn't always have are the platforms, resources, and
                connections to amplify that talent beyond our city limits.
              </p>

              <blockquote className='border-l-4 border-brand-yellow pl-6 py-2 my-8 text-xl md:text-2xl text-brand-white italic'>
                "A new live music platform designed to showcase Erie's
                underrepresented musical talent while fostering meaningful
                community connections."
              </blockquote>

              <div className='pt-6'>
                <p className='text-3xl text-brand-white font-semibold mb-6'>
                  TinyStage is more than a stage.
                </p>
                <p className='text-2xl text-brand-gray-light leading-relaxed'>
                  It's a space of{' '}
                  <span className='text-brand-yellow'>recognition</span>.<br />A
                  space of <span className='text-brand-yellow'>care</span>.
                  <br />A space of{' '}
                  <span className='text-brand-yellow'>collaboration</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section - Grid Layout */}
      <section className='py-20 md:py-28 bg-brand-black'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-5 gap-12 items-center'>
            <div className='md:col-span-2 text-center md:text-left'>
              <div className='inline-block p-4 rounded-full bg-brand-gray-dark/30 mb-6'>
                <HeartHandshake className='w-14 h-14 text-brand-yellow' />
              </div>
              <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-brand-white'>
                Fuel the Stage
              </h2>
              <p className='text-lg text-brand-gray-light'>
                Your support powers the music
              </p>
            </div>

            <div className='md:col-span-3'>
              <p className='text-lg md:text-xl text-brand-gray-light leading-relaxed mb-6'>
                TinyStage is a grassroots music series powered by{' '}
                <strong className='text-brand-white'>community</strong>. Your
                support—financial, in-kind, or organizational—allows us to:
              </p>

              <ul className='space-y-3 mb-8'>
                <li className='flex items-start'>
                  <span className='text-brand-yellow mr-3'>•</span>
                  <span className='text-brand-gray-light'>
                    Pay artists fairly for their work
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className='text-brand-yellow mr-3'>•</span>
                  <span className='text-brand-gray-light'>
                    Keep performances free and accessible
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className='text-brand-yellow mr-3'>•</span>
                  <span className='text-brand-gray-light'>
                    Amplify local voices on a global scale
                  </span>
                </li>
              </ul>

              <p className='text-xl md:text-2xl text-brand-yellow font-medium leading-relaxed mb-8'>
                Help us keep the spotlight bright on Erie's talent.
              </p>

              <Link
                href='/support'
                className='inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-brand-black bg-brand-yellow hover:brightness-110 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-brand-black focus:ring-brand-yellow'
              >
                Become a Supporter
                <ArrowRight className='ml-3 h-5 w-5' />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
