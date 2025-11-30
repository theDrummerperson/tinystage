'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Disc, Mic2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const PROMO_IMAGES = [
  {
    src: '/land/1.png',
    alt: 'Johnny Kocur delivering an acoustic performance.',
  },
  {
    src: '/land/2.png',
    alt: 'Deja Blue captivating the audience with soulful vocals.',
  },
  {
    src: '/land/3.png',
    alt: 'Ellis performing an intimate set under stage lights.',
  },
];

const CHANGE_INTERVAL = 6000;

export default function Promo() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMO_IMAGES.length);
    }, CHANGE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className='relative py-24 md:py-32 overflow-hidden bg-neutral-950 text-white selection:bg-yellow-500/30'>
      {/* --- Ambient Background --- */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        {/* Background Image (Blurred & Darkened) */}
        <div className='absolute inset-0 bg-neutral-950/80 z-10' />
        <Image
          src='/images/5.png'
          alt='Ambience'
          fill
          className='object-cover opacity-30 blur-[3px] grayscale-[0.5]'
          sizes='100vw'
        />
        <div className='absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent z-10' />

        {/* Noise Texture */}
        <div
          className='absolute inset-0 z-20 opacity-[0.04] mix-blend-overlay'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className='container relative z-30 mx-auto px-4 md:px-6'>
        <div className='grid lg:grid-cols-2 gap-16 lg:gap-24 items-center'>
          {/* --- Left Column: Text Content --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='text-left'
          >
            {/* Badge */}
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6 backdrop-blur-md'>
              <div className='w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse' />
              <span className='text-xs font-bold text-yellow-500 tracking-widest uppercase'>
                The Experience
              </span>
            </div>

            <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-[1.1] mb-6'>
              The Sound of Our City, <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600'>
                Amplified.
              </span>
            </h2>

            <p className='text-lg text-neutral-400 leading-relaxed mb-8 max-w-xl'>
              TinyStage is more than a series of shows; it&apos;s a celebration
              of local talent. We provide the platform for Erie&apos;s most
              passionate artists to share their sound, story, and soul in an
              environment designed for pure listening.
            </p>

            <div className='flex flex-wrap gap-6 mb-10 text-sm font-medium text-neutral-300'>
              <div className='flex items-center gap-2'>
                <div className='p-2 bg-white/5 rounded-full'>
                  <Mic2 className='w-4 h-4 text-yellow-500' />
                </div>
                <span>Live Performances</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='p-2 bg-white/5 rounded-full'>
                  <Disc className='w-4 h-4 text-yellow-500' />
                </div>
                <span>Studio Quality Audio</span>
              </div>
            </div>

            <Link
              href='/shows'
              className='group inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-neutral-950 text-lg font-bold rounded-full transition-all hover:bg-yellow-400 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]'
            >
              Discover Our Shows
              <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
            </Link>
          </motion.div>

          {/* --- Right Column: Image Carousel --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='relative'
          >
            {/* Decorative Elements */}
            <div className='absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none' />

            {/* Card Container */}
            <div className='relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900'>
              <AnimatePresence mode='popLayout'>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  className='absolute inset-0'
                >
                  <Image
                    src={PROMO_IMAGES[currentIndex].src}
                    alt={PROMO_IMAGES[currentIndex].alt}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, 50vw'
                    priority
                  />
                  {/* Gradient Overlay for Text Readability if needed, though this is a card */}
                  <div className='absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent opacity-60' />
                </motion.div>
              </AnimatePresence>

              {/* Progress Bar */}
              <div className='absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20'>
                <motion.div
                  key={currentIndex}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: CHANGE_INTERVAL / 1000,
                    ease: 'linear',
                  }}
                  className='h-full bg-yellow-500'
                />
              </div>

              {/* Floating Caption */}
              <div className='absolute bottom-6 left-6 z-20 max-w-[80%]'>
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className='text-white font-medium text-lg drop-shadow-md'
                >
                  {PROMO_IMAGES[currentIndex].alt}
                </motion.p>
              </div>
            </div>

            {/* Offset Border Effect */}
            <div className='absolute inset-0 border border-white/5 rounded-2xl transform translate-x-4 translate-y-4 -z-10' />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
