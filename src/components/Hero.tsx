'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleChange = () => setPrefersReducedMotion(motionQuery.matches);
    motionQuery.addEventListener('change', handleChange);

    const handleMouseMove = (event: MouseEvent) => {
      if (heroRef.current && !motionQuery.matches) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    if (!motionQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (!motionQuery.matches) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      motionQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const spotlightStyle = useMemo(() => {
    if (!heroRef.current || prefersReducedMotion) return {};
    const jitterX = (Math.random() - 0.5) * 4;
    const jitterY = (Math.random() - 0.5) * 4;
    return {
      background: `radial-gradient(ellipse 900px 750px at ${mousePosition.x + jitterX}px ${mousePosition.y + jitterY}px, rgba(var(--brand-yellow-rgb), 0.08), transparent 65%)`,
    };
  }, [mousePosition, prefersReducedMotion]);

  const entryAnimateBase =
    'transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)]';
  const entryAnimateActive = 'opacity-100 translate-y-0';
  const entryAnimateInitial = 'opacity-0 translate-y-8';

  const motionAwareClass = (
    classesWithMotion: string,
    classesWithoutMotion = 'transition-opacity opacity-0 duration-1000',
  ) => (prefersReducedMotion ? `${classesWithoutMotion}` : classesWithMotion);

  return (
    <section
      ref={heroRef}
      className='relative overflow-hidden isolate min-h-screen flex flex-col justify-center items-center text-center lg:text-left bg-[var(--brand-black)]'
    >
      {/* Background SVG Layer */}
      <div
        className='absolute inset-0 z-[-2] bg-cover bg-center bg-no-repeat motion-safe:animate-subtleBgDrift'
        style={{
          backgroundImage: 'url(/svg/bg.svg',
          opacity: prefersReducedMotion ? 0.02 : 0.04,
          mixBlendMode: 'color-dodge',
        }}
      />

      {/* Animated Noise Overlay */}
      {!prefersReducedMotion && (
        <div className='absolute inset-0 z-[-1] opacity-[0.015] motion-safe:animate-grain pointer-events-none' />
      )}

      {/* Projected Haze Effect - Layer 1 (Warmer/Yellowish tint) */}
      <div
        className='absolute inset-0 z-[-1] opacity-[0.07] mix-blend-color-dodge motion-safe:animate-hazeOne'
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 30%, rgba(var(--brand-yellow-rgb), 0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 25%, rgba(var(--brand-yellow-rgb), 0.1) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 75%, rgba(var(--brand-yellow-rgb), 0.12) 0%, transparent 50%)
          `,
        }}
      />
      {/* Projected Haze Effect - Layer 2 (Cooler Gray/Darker) */}
      <div
        className='absolute inset-0 z-[-1] opacity-[0.09] mix-blend-soft-light motion-safe:animate-hazeTwo'
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 30% 70%, rgba(var(--brand-gray-dark-rgb), 0.4) 0%, transparent 65%),
            radial-gradient(ellipse at 70% 30%, rgba(var(--brand-gray-dark-rgb), 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 10% 50%, rgba(var(--brand-gray-dark-rgb), 0.35) 0%, transparent 60%)
          `,
          animationDirection: 'reverse',
        }}
      />

      {/* Mouse-Reactive "Handheld Camera Light" Spotlight */}
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
              motionAwareClass(
                `${entryAnimateBase} ${isMounted ? entryAnimateActive : entryAnimateInitial}`,
                `${entryAnimateBase} ${isMounted ? 'opacity-100' : 'opacity-0'}`,
              ),
            )}
            style={{
              transitionDelay: isMounted
                ? prefersReducedMotion
                  ? '0.3s'
                  : '1s'
                : '0ms',
            }}
          >
            {/* --- LOGO AREA MODIFIED --- */}
            <div className='relative p-1 transition-transform duration-300 ease-out group hover:-translate-y-1.5'>
              <Image
                src='/images/TSlogo.png'
                alt='TinyStage Logo'
                width={170}
                height={170}
                priority
                className={cn(
                  'block rounded-full motion-safe:animate-glint', // Changed back to 'animate-glint' (or your preferred simpler glint)
                  'transition-transform duration-300 group-hover:scale-105', // Scale effect on image
                )}
              />
              {/* This div is now primarily for the hover glow effect */}
              <div
                className='absolute inset-[-4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' // inset-[-4px] for slightly larger glow area
                style={{
                  // More prominent glow, less spread, more opacity
                  boxShadow: '0 0 20px 8px rgba(var(--brand-yellow-rgb), 0.35)',
                }}
              />
            </div>
            {/* --- END LOGO AREA MODIFICATION --- */}
          </div>

          <div className='lg:col-span-8 xl:col-span-7'>
            <h1
              ref={h1Ref}
              className={cn(
                'font-black tracking-tighter text-[var(--brand-white)] leading-none mb-3 text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] headline-text-group',
                motionAwareClass(
                  `${entryAnimateBase} ${isMounted ? entryAnimateActive : entryAnimateInitial}`,
                  `${entryAnimateBase} ${isMounted ? 'opacity-100' : 'opacity-0'}`,
                ),
              )}
              style={{
                transitionDelay: isMounted
                  ? prefersReducedMotion
                    ? '0s'
                    : '0s'
                  : '0ms',
              }}
            >
              {'TINY'.split('').map((char, index) => (
                <span
                  key={`tiny-${index}`}
                  className={cn(
                    'inline-block char-target',
                    motionAwareClass(
                      `${entryAnimateBase} ${isMounted ? entryAnimateActive : entryAnimateInitial.replace('translate-y-5', 'translate-y-3')}`,
                      `${entryAnimateBase} ${isMounted ? 'opacity-100' : 'opacity-0'}`,
                    ),
                  )}
                  style={{
                    transitionDelay: isMounted
                      ? `${0.2 + index * index * 0.015}s`
                      : '0ms',
                    transform:
                      isMounted && !prefersReducedMotion
                        ? `translateY(0) rotateZ(${(Math.random() - 0.5) * 1}deg)`
                        : 'translateY(3px) rotateZ(0deg)',
                    opacity: isMounted ? 1 : 0,
                  }}
                >
                  {char}
                </span>
              ))}
              <span
                className={cn(
                  'block text-[var(--brand-yellow)] -mt-1 sm:-mt-2 md:-mt-3 lg:-mt-4 headline-stage-text',
                  motionAwareClass(
                    `${entryAnimateBase} ${isMounted ? entryAnimateActive : entryAnimateInitial}`,
                    `${entryAnimateBase} ${isMounted ? 'opacity-100' : 'opacity-0'}`,
                  ),
                )}
                style={{
                  transitionDelay: isMounted
                    ? prefersReducedMotion
                      ? '0.2s'
                      : '0.65s'
                    : '0ms',
                }}
              >
                STAGE
              </span>
            </h1>
            <h2
              className={cn(
                'text-xl md:text-2xl lg:text-3xl font-medium text-[var(--brand-gray-medium)] mb-6 tracking-wider uppercase',
                motionAwareClass(
                  `${entryAnimateBase} ${isMounted ? entryAnimateActive : entryAnimateInitial}`,
                  `${entryAnimateBase} ${isMounted ? 'opacity-100' : 'opacity-0'}`,
                ),
              )}
              style={{
                transitionDelay: isMounted
                  ? prefersReducedMotion
                    ? '0.1s'
                    : '0.5s'
                  : '0ms',
              }}
            >
              Concert Series
            </h2>

            <p
              className={cn(
                'max-w-md text-base md:text-lg text-[var(--brand-gray-light)] leading-relaxed mb-10 mx-auto lg:mx-0 group/paragraph transition-all duration-300 ease-out motion-safe:hover:leading-loose motion-safe:hover:blur-[0.3px]',
                motionAwareClass(
                  `${entryAnimateBase} ${isMounted ? entryAnimateActive : entryAnimateInitial}`,
                  `${entryAnimateBase} ${isMounted ? 'opacity-100' : 'opacity-0'}`,
                ),
              )}
              style={{
                transitionDelay: isMounted
                  ? prefersReducedMotion
                    ? '0.25s'
                    : '0.8s'
                  : '0ms',
              }}
            >
              An intimate live music platform amplifying underrepresented
              artists in Erie, PA. Local sound. Global stage.
            </p>

            <div
              className={cn(
                'flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start sm:gap-5',
                motionAwareClass(
                  `${entryAnimateBase} ${isMounted ? entryAnimateActive : entryAnimateInitial}`,
                  `${entryAnimateBase} ${isMounted ? 'opacity-100' : 'opacity-0'}`,
                ),
              )}
              style={{
                transitionDelay: isMounted
                  ? prefersReducedMotion
                    ? '0.3s'
                    : '1s'
                  : '0ms',
              }}
            >
              <Link
                href='/shows'
                legacyBehavior={false}
                className='block w-full sm:w-auto'
              >
                <Button
                  variant='primary'
                  className={cn(
                    'w-full text-base font-bold px-8 py-3.5 motion-safe:animate-buttonPulseAltOne',
                  )}
                >
                  See Upcoming Shows
                </Button>
              </Link>
              <Link
                href='/livestream'
                legacyBehavior={false}
                className='block w-full sm:w-auto'
              >
                <Button
                  variant='outline'
                  className={cn(
                    'w-full text-base font-bold px-8 py-3.5 motion-safe:animate-buttonPulseAltTwo',
                  )}
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
