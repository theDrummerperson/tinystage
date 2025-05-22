// src/app/page.tsx
'use client';

import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';

// import '@/lib/env'; // Consider if this is truly needed here or can be in layout.tsx
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero'; // Your impressive Hero component

export default function HomePage() {
  return (
    <>
      {' '}
      {/* Use a Fragment or a simple div if no extra layout styling needed at this top level */}
      <Head>
        <title>TinyStage</title>
      </Head>
      <Header />
      <main>
        {' '}
        {/* The main content area of the page */}
        <Hero />
        {
          <React.Fragment>
            <section className='relative overflow-hidden py-20 md:py-28 bg-[var(--brand-yellow)] text-[var(--brand-black)]'>
              {/* Optional: Subtle texture overlay (same as before) */}
              <div
                className='absolute inset-0 z-0 opacity-[0.03] motion-safe:animate-subtleBgDrift'
                style={{
                  backgroundImage: 'url(/svg/bg-light-texture.svg)',
                  backgroundSize: '300px',
                  backgroundRepeat: 'repeat',
                  mixBlendMode: 'multiply',
                }}
              />

              <div className='relative z-10 container mx-auto px-4'>
                {/* Grid for two-column layout on medium screens and up */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-start'>
                  {/* Column 1: Heading */}
                  <div className='md:text-left text-center'>
                    {' '}
                    {/* Text align left on md+, center on mobile */}
                    <h2
                      className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--brand-black)] mb-6 md:mb-0'
                      // mb-0 on md+ because spacing will be handled by the column gap or paragraph's top margin
                    >
                      Take the{' '}
                      <span
                        className='text-[var(--brand-white)]'
                        style={{
                          textShadow:
                            '1px 1px 0px var(--brand-black), -1px -1px 0px var(--brand-black), 1px -1px 0px var(--brand-black), -1px 1px 0px var(--brand-black)',
                        }}
                      >
                        TinyStage
                      </span>{' '}
                      {/* Enhanced shadow for better outline */}
                    </h2>
                  </div>

                  {/* Column 2: Paragraph and CTA */}
                  <div className='md:text-left text-center'>
                    {' '}
                    {/* Text align left on md+, center on mobile */}
                    <p className='max-w-xl text-lg md:text-xl text-[var(--brand-black)]/90 leading-relaxed mb-10 mx-auto md:mx-0'>
                      {' '}
                      {/* Slightly more opaque text */}
                      We celebrate and champion local talent. By partnering with
                      artists, we craft small, stripped-down concerts that put
                      raw ability center stage.
                      <br className='hidden md:block my-2' />{' '}
                      {/* Using my-2 for a bit of space if line breaks */}
                      If you're a performer, or know someone we should
                      spotlight, we want to hear from you.
                    </p>
                    <div className='mt-8'>
                      {' '}
                      {/* Removed mx-auto md:mx-0 as button will align with text */}
                      <Link
                        href='http://www.tinyurl.com/tstage'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-block rounded-md border-2 border-[var(--brand-black)] bg-transparent px-10 py-3.5 text-base font-bold text-[var(--brand-black)] shadow-md transition-all duration-200 ease-out hover:bg-[var(--brand-black)] hover:text-[var(--brand-yellow)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-black)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--brand-yellow)] transform hover:scale-[1.03] active:scale-[0.97]'
                      >
                        Submit Your Act
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </React.Fragment>
        }
      </main>
      <Footer />
    </>
  );
}
