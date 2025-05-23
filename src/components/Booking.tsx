// src/components/Booking.tsx
'use client';

import React from 'react';

const Booking: React.FC = () => {
  return (
    <section
      id='booking'
      className='relative overflow-hidden py-20 md:py-28 bg-[var(--brand-yellow)] text-[var(--brand-black)]'
      style={{
        clipPath: 'polygon(0 0, 100% 3%, 100% 97%, 0% 100%)',
      }}
    >
      <BackgroundElements />

      <div className='relative z-10 container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-start'>
          <LeftColumn />

          <RightColumn />
        </div>
      </div>
    </section>
  );
};

const BackgroundElements = () => (
  <>
    <div
      className='absolute inset-0 z-0 opacity-[0.03] motion-safe:animate-subtleBgDrift'
      style={{
        backgroundImage: 'url(/svg/bg-light-texture.svg)',
        backgroundSize: '300px',
        backgroundRepeat: 'repeat',
        mixBlendMode: 'multiply',
      }}
    />

    <DiagonalAccentBand />

    <div className='absolute inset-0 hidden md:block pointer-events-none'>
      <div
        className='absolute left-0 top-0 bottom-0 w-[calc(50%+40px)] bg-[var(--brand-yellow)]/90'
        style={{
          maskImage: 'linear-gradient(to right, black 90%, transparent 100%)',
        }}
      />
    </div>

    <RadialGradient />
  </>
);

const DiagonalAccentBand = () => (
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
);

const RadialGradient = () => (
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
);

const LeftColumn = () => (
  <div className='md:text-left text-center md:pr-10 lg:pr-16 md:-mr-10 lg:-mr-16 relative'>
    <VerticalDivider />

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
    <p className='mt-3 md:mt-4 text-lg md:text-xl text-[var(--brand-black)]/80 font-medium leading-snug'>
      Where raw talent meets intimate audiences
    </p>
  </div>
);

const VerticalDivider = () => (
  <div className='hidden md:block absolute right-0 top-0 bottom-0 w-px bg-[var(--brand-black)]/20 items-center justify-center'>
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
);

const RightColumn = () => (
  <div className='md:text-left text-center md:pl-10 lg:pl-16 relative'>
    <MusicIcon />

    <div className='space-y-6 text-lg md:text-xl text-[var(--brand-black)]/90 leading-relaxed mb-10 max-w-xl mx-auto md:mx-0'>
      <KeyPoint
        icon={
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
          >
            <circle cx='12' cy='12' r='10' />
            <line x1='12' y1='8' x2='12' y2='12' />
            <line x1='12' y1='16' x2='12.01' y2='16' />
          </svg>
        }
        text={
          <>
            <strong className='font-semibold text-[var(--brand-black)]'>
              We celebrate and champion local talent.
            </strong>{' '}
            By partnering with artists, we craft small, stripped-down concerts
            that put{' '}
            <strong className='font-semibold text-[var(--brand-black)]/95'>
              raw ability center stage
            </strong>
            .
          </>
        }
      />

      <KeyPoint
        icon={
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
          >
            <path d='M17 6.1H3m16 6H8m13 6h-6' />
          </svg>
        }
        text={
          <strong className='font-semibold text-[var(--brand-black)]'>
            If you're a performer, or know someone we should spotlight, we want
            to hear from you.
          </strong>
        }
      />
    </div>

    <CallToAction />
  </div>
);

const KeyPoint = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: React.ReactNode;
}) => (
  <div className='flex items-start gap-3'>
    <div className='flex-shrink-0 w-5 h-5 md:w-6 md:h-6 mt-[0.3rem] text-[var(--brand-black)]/70'>
      {icon}
    </div>
    <p>{text}</p>
  </div>
);

const MusicIcon = () => (
  <div className='hidden md:block absolute left-0 top-6 w-6 h-6 text-[var(--brand-black)]/70'>
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    >
      <path d='M9 18V5l12-2v13' />
      <path d='M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
      <path d='M18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
    </svg>
  </div>
);

const CallToAction = () => (
  <div className='mt-8 relative z-10'>
    <div
      className='absolute -left-4 -right-4 h-full bg-[var(--brand-white)]/30 -z-10 rounded-md flex items-center justify-center'
      style={{
        clipPath: 'polygon(0 20%, 100% 0%, 100% 80%, 0% 100%)',
      }}
    >
      <svg
        className='w-full h-full opacity-15'
        viewBox='0 0 100 20'
        preserveAspectRatio='none'
      >
        <path d='M0 15 L100 5 L100 10 L0 20 Z' fill='var(--brand-black)' />
      </svg>
    </div>

    <a
      href='http://www.tinyurl.com/tstage'
      target='_blank'
      rel='noopener noreferrer'
      className='group inline-flex items-center justify-center rounded-md border-2 border-[var(--brand-black)] bg-transparent px-10 py-3.5 text-base font-bold text-[var(--brand-black)] shadow-md transition-all duration-200 ease-out hover:bg-[var(--brand-black)] hover:text-[var(--brand-yellow)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-black)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--brand-yellow)] transform hover:scale-[1.03] active:scale-[0.97] active:shadow-sm relative'
    >
      Submit Your Act
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1'
        aria-hidden='true'
      >
        <path
          fillRule='evenodd'
          d='M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z'
          clipRule='evenodd'
        />
      </svg>
    </a>
  </div>
);

export default Booking;
