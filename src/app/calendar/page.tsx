'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Mic2, Search } from 'lucide-react';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';

import ScheduleCard, { Show } from '../../components/ScheduleCard';

// --- Static Shows Data ---
const staticShows: Show[] = [
  {
    artist: 'Ellis',
    date: '2024-06-27',
    status: 'Past',
    imageSrc: '/images/ellis/main.jpg',
    description:
      'Raw honesty and emotional storytelling blur the lines between alternative rock and pure vulnerability. This show is now archived.',
    highlights: ['Archived', 'Raw'],
    slug: '/artist/ellis',
  },
  {
    artist: 'Deja Blue',
    date: '2024-05-15',
    status: 'Past',
    imageSrc: '/gallery/db6.jpeg',
    description:
      'Electrifying, soulful vocals and raw, emotion-infused guitar and drums. This is Deja Blue!',
    highlights: ['Archived', 'Soul'],
    slug: '/artist/deja-blue',
  },
  {
    artist: 'Johnny Kocur',
    date: '2024-05-30',
    status: 'Past',
    imageSrc: '/images/MainKocur.jpg',
    description:
      'Masterful vocal performances and acoustic storytelling for a night of pop-R&B. Archived.',
    highlights: ['Archived', 'Pop-R&B'],
    slug: '/johnny-kocur',
  },
];

const SchedulePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter shows based on status
  const upcomingShows = staticShows.filter(
    (show) => show.status === 'Upcoming',
  );
  const pastShows = staticShows.filter((show) => show.status === 'Past');

  // Simple search filtering for the past shows
  const filteredPastShows = useMemo(() => {
    if (!searchTerm) return pastShows;
    return pastShows.filter(
      (show) =>
        show.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        show.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [pastShows, searchTerm]);

  return (
    <main className='relative min-h-screen bg-neutral-950 text-white overflow-x-hidden selection:bg-yellow-500/30'>
      {/* --- Background Ambience --- */}
      <div className='fixed inset-0 z-0 pointer-events-none'>
        {/* Image Layer */}
        <div className='absolute inset-0 z-0'>
          <Image
            src='/images/ellis/livebg2.jpg'
            alt='Background ambience'
            fill
            className='w-full h-full object-cover opacity-20 blur-sm scale-105'
            sizes='100vw'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-b from-neutral-950/90 via-neutral-950/95 to-neutral-950' />
        </div>

        {/* Grain Overlay - simulating texture with SVG pattern if needed, or simple css */}
        <div
          className='absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* --- Main Content --- */}
      <div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-32'>
        {/* Hero Section */}
        <section className='pt-24 md:pt-36 pb-16 flex flex-col items-center text-center'>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='mb-8 relative'
          >
            <div className='absolute inset-0 bg-yellow-500 blur-[60px] opacity-10 rounded-full animate-pulse'></div>
            <div className='relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 shadow-2xl'>
              <CalendarDays className='w-10 h-10 text-yellow-500' />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className='text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500 font-serif'
          >
            Show Schedule
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className='text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed'
          >
            A chronological list of our live performances.{' '}
            <br className='hidden sm:block' />
            Dive into the archives or prepare for the next sonic journey.
          </motion.p>
        </section>

        {/* Upcoming Section (Business Logic: Returns Empty State) */}
        {upcomingShows.length === 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='mb-24 max-w-4xl mx-auto'
          >
            <div className='relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 border border-white/10 p-10 md:p-16 text-center'>
              <div className='absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl'></div>

              <h2 className='text-3xl md:text-5xl font-bold text-white mb-4 font-serif'>
                TinyStage Will Return <br />
                <span className='text-yellow-500'>Spring 2026</span>
              </h2>
              <p className='text-neutral-400 text-lg max-w-lg mx-auto mb-8'>
                We are currently curating the next lineup of extraordinary
                artists. Stay tuned for announcements.
              </p>

              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-medium'>
                <Mic2 className='w-4 h-4' />
                <span>Currently on hiatus</span>
              </div>
            </div>
          </motion.section>
        )}

        {/* Past Shows Section */}
        {pastShows.length > 0 && (
          <section className='max-w-3xl mx-auto'>
            <div className='flex flex-col sm:flex-row items-center justify-between mb-10 gap-4'>
              <motion.h2
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className='text-2xl font-bold text-white flex items-center gap-3'
              >
                <span className='w-2 h-8 rounded-full bg-yellow-500'></span>
                Archived Shows
              </motion.h2>

              {/* Search Filter */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className='relative w-full sm:w-auto'
              >
                <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
                  <Search className='w-4 h-4 text-neutral-500' />
                </div>
                <input
                  type='text'
                  placeholder='Search artists...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full sm:w-64 bg-neutral-900/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all'
                />
              </motion.div>
            </div>

            <div className='space-y-4'>
              {filteredPastShows.length > 0 ? (
                filteredPastShows.map((show, index) => (
                  <ScheduleCard
                    key={`${show.artist}-${index}`}
                    show={show}
                    index={index}
                  />
                ))
              ) : (
                <div className='text-center py-20 border border-dashed border-white/10 rounded-2xl'>
                  <p className='text-neutral-500'>
                    No shows found matching "{searchTerm}"
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default SchedulePage;
