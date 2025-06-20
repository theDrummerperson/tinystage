// src/app/about/page.tsx
import { ArrowRight, Globe, HandHeart, Ticket } from 'lucide-react'; // CORRECTED: HandHeart instead of HeartHand
import Image from 'next/image';
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
        {/* Background Elements */}
        <div className='absolute inset-0 flex items-center justify-center z-[0] overflow-hidden pointer-events-none' aria-hidden='true'>
          <div
            className="w-[calc(100vw_-_40px)] h-[calc(100vw_-_40px)] sm:w-[700px] sm:h-[700px] md:w-[800px] md:h-[800px] lg:w-[900px] lg:h-[900px] bg-[url('/svg/4.svg')] bg-contain bg-no-repeat bg-center motion-safe:animate-cosmicPulse"
            style={{ animationDelay: '0.3s' }}
          />
        </div>
        <div className='absolute inset-0 bg-gradient-radial from-brand-gray-dark/15 via-brand-black/70 to-brand-black opacity-95 z-[1]' />

        {/* Hero Content */}
        <div className='container mx-auto px-4 relative z-[2]'>
          <div className='max-w-4xl mx-auto space-y-8 mb-12'>
            <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold text-brand-white leading-tight'>
              <span className='block tracking-tight motion-safe:animate-fadeIn' style={{ animationDelay: '0.1s' }}>
                Local sound.
              </span>
              <span className='block text-brand-yellow mt-4 motion-safe:animate-textReveal'>
                Global stage.
              </span>
            </h1>

            <div className='border-l-2 border-brand-yellow pl-6 ml-4 max-w-2xl mx-auto motion-safe:animate-fadeIn' style={{ animationDelay: '0.7s' }}>
              <p className='text-xl md:text-2xl text-brand-gray-light italic'>
                TinyStage is a monthly, community-powered concert series co-created and produced by A. Ilyas O. Abukar and Rebecca Kuhn, inspired by NPR’s Tiny Desk. We partner with Erie-area musicians—especially artists from under-represented groups—to stage intimate, stripped-down shows that are both live and live-streamed to a global audience.
              </p>
            </div>

            <blockquote className='pt-8 motion-safe:animate-fadeIn' style={{ animationDelay: '0.9s' }}>
              <p className='text-2xl md:text-3xl font-medium text-brand-white leading-relaxed border-t border-b border-brand-yellow/30 py-6 max-w-3xl mx-auto'>
                We ask: what would it look like if Erie's arts scene truly reflected the city's cultural richness?
              </p>
            </blockquote>
          </div>
        </div>

        <div className='absolute -bottom-px left-0 w-full h-20 md:h-32 z-[1] overflow-hidden'>
          <div
            className="absolute bottom-0 left-0 w-full h-full bg-[url('/svg/edge-bleed.svg')] bg-repeat-x bg-bottom opacity-60"
            style={{ backgroundSize: 'auto 100%' }}
          />
        </div>
      </section>

      {/* Meet the Founders Section */}
      <section className='py-20 md:py-28 bg-brand-gray-dark z-[1]'>
        <div className='container mx-auto px-4'>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-brand-white'>Meet the Founders</h2>
            <p className='text-lg md:text-xl text-brand-gray-light mt-4'>Bringing a shared vision for an inclusive arts scene to life.</p>
          </div>
          <div className='grid md:grid-cols-2 gap-12 max-w-4xl mx-auto'>
            {/* Founder 1 */}
            <div className='text-center motion-safe:animate-fadeIn' style={{ animationDelay: '0.2s' }}>
              <div className='relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-brand-gray-dark/50 shadow-2xl'>
                <Image src='/images/founders/awes.jpg' alt='A. Ilyas O. Abukar' layout='fill' objectFit='cover' />
              </div>
              <h3 className='text-2xl font-bold text-brand-white'>A. Ilyas O. Abukar</h3>
              <p className='text-brand-yellow font-semibold'>Co-Founder & Producer</p>
            </div>
            {/* Founder 2 */}
            <div className='text-center motion-safe:animate-fadeIn' style={{ animationDelay: '0.4s' }}>
              <div className='relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-brand-gray-dark/50 shadow-2xl'>
                <Image src='/images/founders/becca.jpg' alt='Rebecca Kuhn' layout='fill' objectFit='cover' />
              </div>
              <h3 className='text-2xl font-bold text-brand-white'>Rebecca Kuhn</h3>
              <p className='text-brand-yellow font-semibold'>Co-Founder & Producer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section with Thematic Icons */}
      <section className='relative py-20 md:py-28 bg-brand-black z-[1]'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-5 gap-12 items-center'>
            <div className='md:col-span-2 text-center md:text-left motion-safe:animate-fadeIn' style={{ animationDelay: '0.2s' }}>
              <div className='relative inline-block p-5 rounded-full bg-brand-gray-dark/40 mb-6 shadow-md'>
                <div className='relative z-10 w-24 h-24 flex items-center justify-center'>
                  <div className="w-full h-full bg-[url('/svg/spotlight.svg')] bg-contain bg-no-repeat bg-center" />
                </div>
                <div className='absolute inset-0 rounded-full bg-brand-yellow/20 blur-xl motion-safe:animate-pulse -z-10'></div>
              </div>
              <h2 className='text-3xl sm:text-4xl font-bold mb-3 text-brand-white'>Fuel the Stage</h2>
              <p className='text-xl text-brand-gray-medium'>Your support powers the music.</p>
            </div>

            <div className='md:col-span-3 motion-safe:animate-fadeIn' style={{ animationDelay: '0.4s' }}>
              <p className='text-lg md:text-xl text-brand-gray-light leading-relaxed mb-6'>
                TinyStage is a grassroots music series powered by <strong className='text-brand-white'>community</strong>. Your support allows us to:
              </p>
              <ul className='space-y-5 mb-10'>
                {/* CORRECTED ICON */}
                <li className='flex items-start'><HandHeart className='text-brand-yellow mr-4 mt-1 h-6 w-6 flex-shrink-0' /><span className='text-brand-gray-light text-lg'>Pay artists fairly for their work</span></li>
                <li className='flex items-start'><Ticket className='text-brand-yellow mr-4 mt-1 h-6 w-6 flex-shrink-0' /><span className='text-brand-gray-light text-lg'>Keep performances free and accessible</span></li>
                <li className='flex items-start'><Globe className='text-brand-yellow mr-4 mt-1 h-6 w-6 flex-shrink-0' /><span className='text-brand-gray-light text-lg'>Amplify local voices on a global scale</span></li>
              </ul>
              <p className='text-xl md:text-2xl text-brand-yellow font-semibold leading-relaxed mb-10'>
                Help us keep the spotlight bright on Erie's talent.
              </p>
              <Link href='/support' className='group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-brand-black bg-brand-yellow hover:brightness-110 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-brand-black focus:ring-brand-yellow'>
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