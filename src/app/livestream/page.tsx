// src/app/livestream/page.tsx
import { Clapperboard, ExternalLink, Rss, UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Livestream Information | TinyStage',
  description:
    'Learn how to access the TinyStage global livestream, powered by FEED Media. Watch intimate live performances from Erie, PA, anywhere in the world.',
};

// COMPONENT for a single step in the guide.
// =====================================================================
const LivestreamStep = ({
  icon: Icon,
  title,
  description,
  animationDelay,
  isLastStep = false,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  animationDelay: string;
  isLastStep?: boolean;
}) => {
  return (
    <li
      className='flex items-start motion-safe:animate-fadeIn'
      style={{ animationDelay }}
    >
      <div className='flex-shrink-0 flex flex-col items-center mr-6'>
        <div className='w-12 h-12 bg-brand-gray-dark border-2 border-brand-yellow/50 rounded-full flex items-center justify-center'>
          <Icon className='w-6 h-6 text-brand-yellow' />
        </div>
        {!isLastStep && (
          <div className='w-px h-12 bg-brand-gray-dark mt-2'></div>
        )}
      </div>
      {/* 
        CHANGED: Card background is now more opaque for maximum contrast.
        - bg-brand-gray-dark/95 makes it almost solid, but retains a hint of depth.
        - backdrop-blur-lg provides a softer, more noticeable blur effect.
      */}
      <div className='transform-gpu bg-brand-gray-dark/95 backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-lg'>
        <h3 className='text-xl font-bold text-brand-yellow mb-1'>{title}</h3>
        <p className='text-brand-gray-light'>{description}</p>
      </div>
    </li>
  );
};

// DATA ARRAY for the steps.
// =====================================================================
const stepsData = [
  {
    icon: UserPlus,
    title: 'Step 1: Create a Bandcamp Account',
    description: "If you don't already have one, sign up for a free fan account on Bandcamp. This is required to follow artists and get notifications.",
    delay: '0.1s',
  },
  {
    icon: Rss,
    title: 'Step 2: Follow FEED on Bandcamp',
    description: 'Visit our partner\'s page and click the "Follow" button. This ensures you\'ll be notified the moment the livestream begins.',
    delay: '0.3s',
  },
  {
    icon: Clapperboard,
    title: 'Step 3: Tune In on Show Night',
    description: 'The livestream feed goes live at the same time as the performance. Check your email or Bandcamp feed for a direct link on the day of the show.',
    delay: '0.5s',
  },
];


const LivestreamPage = () => {
  return (
    <main className='overflow-x-hidden bg-brand-black'>
      {/* Hero Section */}
      <section className='relative h-[60vh] min-h-[450px] md:h-[70vh] flex items-center justify-center text-center text-white'>
        <div className='absolute inset-0 z-0'>
          <Image
            src='/images/dejalive.jpg'
            alt='Deja Blue performing live on stage at TinyStage'
            fill
            className='object-cover'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-brand-black/20' />
        </div>
        <div className='container mx-auto px-4 relative z-10'>
          <div className='max-w-4xl mx-auto'>
            <h1 className='text-4xl sm:text-5xl md:text-7xl font-bold text-brand-white leading-tight motion-safe:animate-fadeIn [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]'>
              The Global Stage,
              <br />
              Live from Erie.
            </h1>
            <p
              className='text-2xl md:text-3xl text-brand-yellow font-semibold mt-4 motion-safe:animate-fadeIn [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]'
              style={{ animationDelay: '0.3s' }}
            >
              TinyStage. Global LiveStream.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className='relative py-20 md:py-28 bg-brand-gray-dark'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto'>
            <div className='motion-safe:animate-fadeIn' style={{ animationDelay: '0.2s' }}>
              <div className='bg-brand-black/30 p-8 rounded-lg border border-white/10 shadow-2xl flex justify-center'>
                <Image
                  src='/images/feedlogo.png'
                  alt='FEED Media Arts Center Logo'
                  width={250}
                  height={100}
                  className='w-auto h-auto max-w-[250px]'
                />
              </div>
            </div>
            <div className='text-lg text-brand-gray-light leading-relaxed space-y-4 motion-safe:animate-fadeIn' style={{ animationDelay: '0.4s' }}>
              <h2 className='text-3xl font-bold text-brand-white mb-4'>A Dual Experience</h2>
              <p>Every TinyStage performance is a unique event, happening live and in-person at the{' '}
                <a href='https://feed.art' target='_blank' rel='noopener noreferrer' className='font-bold text-brand-yellow hover:underline'>FEED Media Arts Center</a>{' '}in Downtown Erie.</p>
              <p>Through our partnership with FEED, we're proud to broadcast every show live, bringing the intimate energy of our stage to a global audience, for free.</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] text-brand-black">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[75px] sm:h-[100px] md:h-[120px]">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-current"></path>
          </svg>
        </div>
      </section>

      {/* How to Watch Section */}
      <section className='relative py-20 md:py-28'>
        {/* 
          CHANGED: The background image is now inside its own div with filters applied
          to weaken its visual impact, ensuring text on top is always readable.
        */}
        <div className='absolute inset-0 z-0'>
          <Image
            src='/images/ellis/livebg.jpg'
            alt='Atmospheric live music performance background'
            fill
            className='object-cover blur-sm brightness-100'
          />
        </div>
        
        {/* Overlay is now separate from the image, can be adjusted independently */}
        <div className='absolute inset-0 bg-black/05' aria-hidden='true'></div>

        <div className='relative z-10 container mx-auto px-4 max-w-4xl'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-brand-white mb-4 [text-shadow:0_2px_8px_rgba(0,0,0,0.7)]'>
              How to Access the Livestream
            </h2>
            <p className='text-lg md:text-xl text-brand-gray-light [text-shadow:0_1px_4px_rgba(0,0,0,0.7)]'>
              Follow these simple steps to ensure you never miss a performance.
            </p>
          </div>
          
          <ol className='space-y-8'>
            {stepsData.map((step, index) => (
              <LivestreamStep
                key={step.title}
                icon={step.icon}
                title={step.title}
                description={step.description}
                animationDelay={step.delay}
                isLastStep={index === stepsData.length - 1}
              />
            ))}
          </ol>

          {/* CTA Button */}
          <div className='text-center mt-16 motion-safe:animate-fadeIn' style={{ animationDelay: '0.7s' }}>
            <Link
              href='https://feedart.bandcamp.com'
              target='_blank'
              rel='noopener noreferrer'
              className='group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-md text-brand-black bg-brand-yellow hover:brightness-110 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:scale-[1.03]'
            >
              Visit FEED on Bandcamp
              <ExternalLink className='ml-3 h-5 w-5' />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LivestreamPage;