// src/components/Booking.tsx

'use client';

import React from 'react';

// REMOVE THE EMPTY INTERFACE:
// interface BookingProps {}

// OPTION 1 (Recommended for this case): Use React.FC directly, or () => JSX.Element
const Booking: React.FC = () => {
  // OR, if you prefer more direct typing without React.FC for simple components:
  // const Booking = (): JSX.Element => {
  return (
    <section
      id='booking'
      className='relative overflow-hidden py-20 md:py-28 bg-[var(--brand-yellow)] text-[var(--brand-black)]'
      style={{
        clipPath: 'polygon(0 0, 100% 3%, 100% 97%, 0% 100%)',
      }}
    >
      {/* Background texture */}
      <div
        className='absolute inset-0 z-0 opacity-[0.03] motion-safe:animate-subtleBgDrift'
        style={{
          backgroundImage: 'url(/svg/bg-light-texture.svg)',
          backgroundSize: '300px',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Diagonal accent band */}
      <div
        className='absolute -left-20 -right-20 h-40 bg-[var(--brand-black)]/5 -rotate-3 top-1/3 z-0 overflow-hidden'
        style={{
          clipPath: 'polygon(0 20%, 100% 0%, 100% 80%, 0% 100%)',
        }}
      >
        <svg
          className='absolute top-0 left-0 w-full h-full opacity-10'
          viewBox='0 0 100 20'
          preserveAspectRatio='none'
        >
          <path
            d='M5 15 Q7 10 10 15 T15 15'
            stroke='var(--brand-black)'
            fill='none'
            strokeWidth='0.5'
          />
          <path
            d='M25 12 Q27 7 30 12 T35 12'
            stroke='var(--brand-black)'
            fill='none'
            strokeWidth='0.5'
          />
          <path
            d='M45 15 Q47 10 50 15 T55 15'
            stroke='var(--brand-black)'
            fill='none'
            strokeWidth='0.5'
          />
          <path
            d='M65 12 Q67 7 70 12 T75 12'
            stroke='var(--brand-black)'
            fill='none'
            strokeWidth='0.5'
          />
          <path
            d='M85 15 Q87 10 90 15 T95 15'
            stroke='var(--brand-black)'
            fill='none'
            strokeWidth='0.5'
          />
        </svg>
      </div>

      {/* Column differentiation */}
      <div className='absolute inset-0 hidden md:block pointer-events-none'>
        <div
          className='absolute left-0 top-0 bottom-0 w-[calc(50%+40px)] bg-[var(--brand-yellow)]/90'
          style={{
            maskImage: 'linear-gradient(to right, black 90%, transparent 100%)',
          }}
        />
      </div>

      {/* Radial gradient */}
      <div
        className='absolute left-[20%] top-1/2 -translate-y-1/2 w-[150%] h-[250%] opacity-15 pointer-events-none'
        style={{
          background:
            'radial-gradient(circle, var(--brand-white) 0%, transparent 60%)',
        }}
      >
        <svg
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 opacity-20'
          viewBox='0 0 24 24'
        >
          <path d='M12 2L4 12l8 10 8-10z' fill='var(--brand-white)' />
          <path
            d='M12 2L4 12l8 10'
            fill='none'
            stroke='var(--brand-black)'
            strokeWidth='0.5'
          />
        </svg>
      </div>

      <div className='relative z-10 container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-start'>
          {/* Left Column */}
          <div className='md:text-left text-center md:pr-10 lg:pr-16 md:-mr-10 lg:-mr-16 relative'>
            <div className='hidden md:block absolute right-0 top-0 bottom-0 w-px bg-[var(--brand-black)]/20 flex items-center justify-center'>
              <svg
                className='absolute -translate-y-1/2 w-6 h-6'
                viewBox='0 0 24 24'
                fill='none'
                stroke='var(--brand-black)'
                strokeWidth='1.5'
              >
                <path d='M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z' />
                <path d='M19 10v2a7 7 0 0 1-14 0v-2' />
                <line x1='12' y1='19' x2='12' y2='23' />
                <line x1='8' y1='23' x2='16' y2='23' />
              </svg>
            </div>

            <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--brand-black)]/95 mb-2 md:mb-0'>
              Take the{' '}
              <div className='relative inline-block'>
                <svg
                  className='absolute -inset-2 sm:-inset-4 opacity-30 -z-10 w-[120%] h-[120%]'
                  viewBox='0 0 100 100'
                  preserveAspectRatio='none'
                >
                  <path
                    d='M50,0 C70,30 80,60 50,90 C30,70 20,40 50,0 Z'
                    fill='var(--brand-white)'
                  />
                </svg>
                <span
                  className='text-[var(--brand-white)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
                  style={{
                    textShadow:
                      '2px 2px 0px var(--brand-black), -2px -2px 0px var(--brand-black), 2px -2px 0px var(--brand-black), -2px 2px 0px var(--brand-black)',
                    fontStyle: 'italic',
                    fontVariationSettings: '"slnt" -10',
                  }}
                >
                  TinyStage
                </span>
              </div>
            </h2>
            <p className='mt-3 md:mt-4 text-lg md:text-xl text-[var(--brand-black)]/80 font-medium'>
              Where raw talent meets intimate audiences
            </p>
          </div>

          {/* Right Column */}
          <div className='md:text-left text-center md:pl-10 lg:pl-16 relative'>
            <div className='hidden md:block absolute left-0 top-6 w-6 h-6'>
              <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke='var(--brand-black)'
                strokeWidth='1.5'
              >
                <path d='M9 18V5l12-2v13' />
                <path d='M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
                <path d='M18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
              </svg>
            </div>

            <p className='max-w-xl text-lg md:text-xl text-[var(--brand-black)]/90 leading-relaxed mb-10 mx-auto md:mx-0'>
              <span className='relative pl-6'>
                <svg
                  className='absolute left-0 top-1 w-4 h-4'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='var(--brand-black)'
                  strokeWidth='1.5'
                >
                  <circle cx='12' cy='12' r='10' />
                  <line x1='12' y1='8' x2='12' y2='12' />
                  <line x1='12' y1='16' x2='12.01' y2='16' />
                </svg>
                We celebrate and champion local talent.
              </span>{' '}
              By partnering with artists, we craft small, stripped-down concerts
              that put{' '}
              <strong className='font-semibold'>
                raw ability center stage
              </strong>
              .
              <br className='hidden md:block my-2' />
              <span className='relative pl-6'>
                <svg
                  className='absolute left-0 top-1 w-4 h-4'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='var(--brand-black)'
                  strokeWidth='1.5'
                >
                  <path d='M17 6.1H3m16 6H8m13 6h-6' />
                </svg>
                If you're a performer, or know someone we should spotlight, we
                want to hear from you.
              </span>
            </p>
            <div className='mt-8 relative z-10'>
              <div
                className='absolute -left-4 -right-4 h-full bg-[var(--brand-white)]/20 -z-10 rounded-md flex items-center justify-center'
                style={{
                  clipPath: 'polygon(0 20%, 100% 0%, 100% 80%, 0% 100%)',
                }}
              >
                <svg
                  className='w-full h-full opacity-10'
                  viewBox='0 0 100 20'
                  preserveAspectRatio='none'
                >
                  <path
                    d='M0 15 L100 5 L100 10 L0 20 Z'
                    fill='var(--brand-black)'
                  />
                </svg>
              </div>
              {/* Enhanced CTA Button - Using <a> tag for external link */}
              <a
                href='http://www.tinyurl.com/tstage'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center rounded-md border-2 border-[var(--brand-black)] bg-transparent px-10 py-3.5 text-base font-bold text-[var(--brand-black)] shadow-md transition-all duration-200 ease-out hover:bg-[var(--brand-black)] hover:text-[var(--brand-yellow)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-black)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--brand-yellow)] transform hover:scale-[1.03] active:scale-[0.97] active:shadow-sm relative'
              >
                Submit Your Act
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-5 h-5 ml-2'
                  aria-hidden='true' // Icon is decorative
                >
                  <path
                    fillRule='evenodd'
                    d='M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
