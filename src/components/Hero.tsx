'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';

import { useIsMounted } from '../hooks/useIsMounted';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const ANIMATION_BASE_CLASSES =
  'transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)]';

const DELAYS = {
  // ... (your DELAYS object)
  H1_REDUCED: '0s',
  H1_MOTION: '0s',
  TINY_CHAR_BASE_MOTION: 0.2,
  TINY_CHAR_FACTOR_MOTION: 0.015,
  TINY_CHAR_BASE_REDUCED: 0.1,
  TINY_CHAR_FACTOR_REDUCED: 0.01,
  STAGE_REDUCED: '0.2s',
  STAGE_MOTION: '0.65s',
  H2_REDUCED: '0.1s',
  H2_MOTION: '0.5s',
  LOGO_REDUCED: '0.3s',
  LOGO_MOTION: '1s',
  BUTTONS_REDUCED: '0.3s',
  BUTTONS_MOTION: '1s',
  TEXT_BACKDROP_MOTION: '0.4s',
  TEXT_BACKDROP_REDUCED: '0.1s',
};

// --- SOLUTION: Define TINY_CHARS outside the component ---
const TINY_CHARS_ARRAY = 'TINY'.split('');
// --- END SOLUTION ---

interface EntryAnimationPropsOptions {
  // ... (your interface)
  isMounted: boolean;
  prefersReducedMotion: boolean;
  delay: string;
  reducedMotionDelay: string;
  initialTranslateY?: string | null;
}

function getEntryAnimationStyles({
  // ... (your function)
  isMounted,
  prefersReducedMotion,
  delay,
  reducedMotionDelay,
  initialTranslateY = 'translate-y-8',
}: EntryAnimationPropsOptions) {
  const classNames = [ANIMATION_BASE_CLASSES];

  if (prefersReducedMotion) {
    classNames.push(isMounted ? 'opacity-100' : 'opacity-0');
  } else {
    if (isMounted) {
      classNames.push('opacity-100', 'translate-y-0');
    } else {
      classNames.push('opacity-0');
      if (initialTranslateY) {
        classNames.push(initialTranslateY);
      }
    }
  }

  return {
    className: cn(...classNames),
    style: {
      transitionDelay: isMounted
        ? prefersReducedMotion
          ? reducedMotionDelay
          : delay
        : '0ms',
    },
  };
}

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMounted = useIsMounted();
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // ... (mouse move effect)
    const handleMouseMove = (event: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  const spotlightStyle = useMemo(() => {
    // ... (spotlightStyle logic)
    if (!heroRef.current || prefersReducedMotion) return {};
    const jitterX = (Math.random() - 0.5) * 4;
    const jitterY = (Math.random() - 0.5) * 4;
    return {
      background: `radial-gradient(ellipse 900px 750px at ${mousePosition.x + jitterX}px ${mousePosition.y + jitterY}px, rgba(var(--brand-yellow-rgb), 0.08), transparent 65%)`,
    };
  }, [mousePosition, prefersReducedMotion]);

  // No longer define TINY_CHARS here

  const charRandomRotations = useMemo(() => {
    if (prefersReducedMotion) return TINY_CHARS_ARRAY.map(() => 0); // Use the constant
    return TINY_CHARS_ARRAY.map(() => (Math.random() - 0.5) * 2); // Use the constant
  }, [prefersReducedMotion]); // Dependency array is now correct

  const logoAnimationProps = getEntryAnimationStyles({
    // ...
    isMounted,
    prefersReducedMotion,
    delay: DELAYS.LOGO_MOTION,
    reducedMotionDelay: DELAYS.LOGO_REDUCED,
  });
  // ... (other animation props)
  const h1AnimationProps = getEntryAnimationStyles({
    isMounted,
    prefersReducedMotion,
    delay: DELAYS.H1_MOTION,
    reducedMotionDelay: DELAYS.H1_REDUCED,
    initialTranslateY: 'translate-y-5',
  });
  const stageAnimationProps = getEntryAnimationStyles({
    isMounted,
    prefersReducedMotion,
    delay: DELAYS.STAGE_MOTION,
    reducedMotionDelay: DELAYS.STAGE_REDUCED,
  });
  const h2AnimationProps = getEntryAnimationStyles({
    isMounted,
    prefersReducedMotion,
    delay: DELAYS.H2_MOTION,
    reducedMotionDelay: DELAYS.H2_REDUCED,
  });
  const buttonsAnimationProps = getEntryAnimationStyles({
    isMounted,
    prefersReducedMotion,
    delay: DELAYS.BUTTONS_MOTION,
    reducedMotionDelay: DELAYS.BUTTONS_REDUCED,
  });

  return (
    <section
      ref={heroRef}
      className='relative overflow-hidden isolate min-h-screen flex flex-col justify-center items-center text-center lg:text-left bg-[var(--brand-black)]'
    >
      {/* ... (Background layers and spotlight) ... */}
      <div
        className='absolute inset-0 z-[-2] bg-cover bg-center bg-no-repeat motion-safe:animate-subtleBgDrift'
        style={{
          backgroundImage: "url('/svg/4.svg')",
          opacity: prefersReducedMotion ? 1 : 0.7,
          mixBlendMode: 'normal',
        }}
      />
      {!prefersReducedMotion && (
        <div className='absolute inset-0 z-[-1] opacity-[0.015] motion-safe:animate-grain pointer-events-none' />
      )}
      <div
        className='absolute inset-0 z-[-1] opacity-[0.07] mix-blend-color-dodge motion-safe:animate-hazeOne'
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 20% 30%, rgba(var(--brand-yellow-rgb), 0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 25%, rgba(var(--brand-yellow-rgb), 0.1) 0%, transparent 55%), radial-gradient(ellipse at 50% 75%, rgba(var(--brand-yellow-rgb), 0.12) 0%, transparent 50%)',
        }}
      />
      <div
        className='absolute inset-0 z-[-1] opacity-[0.09] mix-blend-soft-light motion-safe:animate-hazeTwo'
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 30% 70%, rgba(var(--brand-gray-dark-rgb), 0.4) 0%, transparent 65%), radial-gradient(ellipse at 70% 30%, rgba(var(--brand-gray-dark-rgb), 0.3) 0%, transparent 50%), radial-gradient(ellipse at 10% 50%, rgba(var(--brand-gray-dark-rgb), 0.35) 0%, transparent 60%)',
          animationDirection: 'reverse',
        }}
      />
      {!prefersReducedMotion && (
        <div
          className='pointer-events-none absolute inset-0 z-0 motion-safe:animate-spotlightFlicker'
          style={{
            ...spotlightStyle,
            opacity: isMounted ? 0.25 : 0,
            transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      )}

      <div className='relative z-10 container mx-auto px-4 w-full py-16 md:py-20 lg:py-24'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center'>
          <div
            className={cn(
              'lg:col-span-4 xl:col-span-5 flex justify-center lg:justify-end mb-8 lg:mb-0',
              logoAnimationProps.className,
            )}
            style={logoAnimationProps.style}
          >
            {/* ... (Logo JSX) ... */}
            <div className='relative p-1 transition-transform duration-300 ease-out group hover:-translate-y-1.5'>
              <Image
                src='/images/TSlogo.png'
                alt='TinyStage Logo'
                width={170}
                height={170}
                priority
                className={cn(
                  'block rounded-full motion-safe:animate-glint',
                  'transition-transform duration-300 group-hover:scale-105',
                )}
              />
              <div
                className='absolute inset-[-4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'
                style={{
                  boxShadow: '0 0 20px 8px rgba(var(--brand-yellow-rgb), 0.35)',
                }}
              />
            </div>
          </div>

          <div className='lg:col-span-8 xl:col-span-7 relative'>
            <div
              className='absolute inset-x-0 top-0 bottom-0 z-0 
                         lg:-inset-x-6 lg:-inset-y-3 xl:-inset-x-8 xl:-inset-y-4
                         opacity-0 transition-opacity duration-1000 ease-out pointer-events-none'
              style={{
                backgroundImage:
                  'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(var(--brand-black-rgb), 0.35) 0%, transparent 65%)',
                opacity: isMounted ? 1 : 0,
                transitionDelay: isMounted
                  ? prefersReducedMotion
                    ? DELAYS.TEXT_BACKDROP_REDUCED
                    : DELAYS.TEXT_BACKDROP_MOTION
                  : '0ms',
              }}
            />

            <h1
              className={cn(
                'relative z-[1] font-black tracking-tighter text-[var(--brand-white)] leading-none mb-3 text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] headline-text-group',
                h1AnimationProps.className,
              )}
              style={{
                ...h1AnimationProps.style,
                textShadow:
                  '0 0 10px rgba(var(--brand-white-rgb), 0.2), 0 0 15px rgba(var(--brand-white-rgb), 0.1)',
              }}
            >
              {TINY_CHARS_ARRAY.map((char, index) => {
                // Use the constant
                const charAnimProps = getEntryAnimationStyles({
                  isMounted,
                  prefersReducedMotion,
                  delay: `${DELAYS.TINY_CHAR_BASE_MOTION + index * index * DELAYS.TINY_CHAR_FACTOR_MOTION}s`,
                  reducedMotionDelay: `${DELAYS.TINY_CHAR_BASE_REDUCED + index * DELAYS.TINY_CHAR_FACTOR_REDUCED}s`,
                  initialTranslateY: 'translate-y-3',
                });
                return (
                  <span
                    key={`tiny-${index}`}
                    className={cn(
                      'inline-block char-target',
                      charAnimProps.className,
                    )}
                    style={{
                      ...charAnimProps.style,
                      ...(isMounted &&
                        !prefersReducedMotion && {
                          transform: `rotateZ(${charRandomRotations[index]}deg)`,
                        }),
                    }}
                  >
                    {char}
                  </span>
                );
              })}
              <span
                className={cn(
                  'block text-[var(--brand-yellow)] -mt-1 sm:-mt-2 md:-mt-3 lg:-mt-4 headline-stage-text',
                  stageAnimationProps.className,
                )}
                style={{
                  ...stageAnimationProps.style,
                  textShadow: '0 0 10px rgba(var(--brand-yellow-rgb), 0.35)',
                }}
              >
                STAGE
              </span>
            </h1>

            <h2
              className={cn(
                'relative z-[1] text-xl md:text-2xl lg:text-3xl font-medium mb-6 tracking-wider uppercase',
                'text-[var(--brand-gray-light)]',
                h2AnimationProps.className,
              )}
              style={{
                ...h2AnimationProps.style,
                textShadow: '0 1px 3px rgba(var(--brand-black-rgb), 0.5)',
              }}
            >
              Concert Series
            </h2>

            <div
              className={cn(
                'relative z-[1] flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start sm:gap-5',
                buttonsAnimationProps.className,
              )}
              style={buttonsAnimationProps.style}
            >
              {/* ... (Buttons JSX) ... */}
              <Link href='/shows' className='block w-full sm:w-auto'>
                <Button
                  variant='primary'
                  className='w-full text-base font-bold px-8 py-3.5 motion-safe:animate-buttonPulseAltOne'
                >
                  See Upcoming Shows
                </Button>
              </Link>
              <Link href='/livestream' className='block w-full sm:w-auto'>
                <Button
                  variant='outline'
                  className='w-full text-base font-bold px-8 py-3.5 motion-safe:animate-buttonPulseAltTwo'
                  style={{
                    animationDelay: prefersReducedMotion ? '0s' : '0.25s',
                  }}
                >
                  Watch the Livestream
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
