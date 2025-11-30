'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Music, Sparkles } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// import PolaroidGallery from '../../components/PolaroidGallery';
import PolaroidGallery from '@/components/PolaroidGallery';

// ================================================================
// 1. IMAGE CONFIGURATION
// 🚨 TODO: Update these paths to match your actual files in public/tinyshow/
// ================================================================
const showImages = [
  '/tinyshow/_MG_1369.JPG',
  '/tinyshow/_MG_1286.JPG',
  '/tinyshow/_MG_1286.JPG',
  '/tinyshow/_MG_1307.JPG',
  '/tinyshow/_MG_1604.JPG',
];

const ShowsPage = () => {
  return (
    <main className='relative min-h-screen bg-neutral-950 text-white overflow-x-hidden selection:bg-yellow-500/30'>
      {/* --- Background Ambience (Consistent with Calendar Page) --- */}
      <div className='fixed inset-0 z-0 pointer-events-none'>
        {/* Background Image Layer */}
        <div className='absolute inset-0 z-0'>
          <div className="absolute inset-0 bg-[url('/svg/4.svg')] bg-cover opacity-10 mix-blend-screen animate-pulse duration-[10s]" />
          <div className='absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/90 to-neutral-950' />
        </div>

        {/* Grain Overlay */}
        <div
          className='absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-32'>
        {/* --- Hero Section --- */}
        <section className='pt-24 md:pt-40 pb-16 md:pb-24 flex flex-col items-center text-center'>
          {/* Animated Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className='mb-8 relative'
          >
            <div className='absolute inset-0 bg-yellow-500 blur-[50px] opacity-20 rounded-full animate-pulse'></div>
            <div className='relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md'>
              <Sparkles className='w-4 h-4 text-yellow-500' />
              <span className='text-sm font-medium text-yellow-500 tracking-wider uppercase'>
                Live Music Experience
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className='text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 font-serif'
          >
            The Heartbeat <br className='hidden md:block' />
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-200 to-white'>
              of Erie&apos;s Sound
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className='text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-12'
          >
            Intimate performances. Unforgettable moments. <br />
            This is where local talent takes the spotlight.
          </motion.p>

          {/* Hero Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className='flex flex-wrap justify-center gap-4'
          >
            <Link
              href='/calendar'
              className='group relative inline-flex items-center justify-center px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]'
            >
              See Upcoming Shows
              <ArrowRight className='ml-2 w-5 h-5 transition-transform group-hover:translate-x-1' />
            </Link>
          </motion.div>
        </section>

        {/* --- Polaroid Gallery Section --- */}
        <section className='py-12 md:py-20'>
          <div className='relative'>
            {/* Background Glow for Gallery */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none'></div>

            <PolaroidGallery images={showImages} />

            <div className='text-center mt-8'>
              <p className='font-handwriting text-neutral-500 text-lg rotate-[-2deg]'>
                captured moments from the tinystage archive
              </p>
            </div>
          </div>
        </section>

        {/* --- Info / CTA Section --- */}
        <section className='py-20 md:py-32'>
          <div className='relative overflow-hidden rounded-3xl bg-neutral-900/50 border border-white/5 p-8 md:p-16 backdrop-blur-sm'>
            {/* Decorative Background Elements */}
            <div className='absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -mr-20 -mt-20'></div>
            <div className='absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-20 -mb-20'></div>

            <div className='grid md:grid-cols-2 gap-12 items-center relative z-10'>
              {/* Text Content */}
              <div className='text-left'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='p-3 bg-neutral-800 rounded-xl border border-white/10'>
                    <Calendar className='w-8 h-8 text-yellow-500' />
                  </div>
                  <h2 className='text-3xl md:text-4xl font-bold text-white'>
                    Catch Us Live
                  </h2>
                </div>

                <p className='text-lg text-neutral-300 leading-relaxed mb-8'>
                  Our stage is a living, breathing part of Erie&apos;s music
                  scene. We regularly feature incredible artists in intimate
                  settings, creating an atmosphere that connects the audience
                  directly to the soul of the music.
                </p>

                <div className='space-y-4 mb-10'>
                  <div className='flex items-start gap-3'>
                    <Music className='w-5 h-5 text-yellow-500 mt-1' />
                    <p className='text-neutral-400'>
                      Curated lineup of emerging and established talent.
                    </p>
                  </div>
                  <div className='flex items-start gap-3'>
                    <Sparkles className='w-5 h-5 text-yellow-500 mt-1' />
                    <p className='text-neutral-400'>
                      Intimate setting designed for acoustic purity.
                    </p>
                  </div>
                </div>

                <Link
                  href='/calendar'
                  className='inline-flex items-center text-yellow-500 hover:text-yellow-400 font-medium text-lg border-b border-yellow-500/30 hover:border-yellow-500 pb-1 transition-colors'
                >
                  View Full Schedule <ArrowRight className='ml-2 w-5 h-5' />
                </Link>
              </div>

              {/* Right Side Visual/Graphic */}
              <div className='relative h-full min-h-[300px] flex items-center justify-center'>
                {/* Abstract Composition */}
                <div className='relative w-full max-w-sm aspect-square'>
                  <div className='absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]'></div>
                  <div className='absolute inset-4 border border-dashed border-white/20 rounded-full animate-[spin_15s_linear_infinite_reverse]'></div>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='text-center p-8 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10'>
                      <span className='block text-5xl font-bold text-white mb-2'>
                        Next
                      </span>
                      <span className='block text-sm text-neutral-400 uppercase tracking-widest mb-4'>
                        Performance
                      </span>
                      <div className='w-12 h-1 bg-yellow-500 mx-auto rounded-full'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ShowsPage;
