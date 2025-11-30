// src/app/calendar/page.tsx
'use client';

// External Imports
import { CalendarDays } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

// Assuming the component is at src/components/ShowAccordion.tsx
import ShowAccordion, { Show } from '../../../components/ShowAccordion';

// Removed local Show interface to avoid import conflict

// --- Static Shows Data (POPULATED) ---
const staticShows: Show[] = [
  {
    artist: 'Ellis',
    date: '2024-06-27',
    status: 'Past', // 🚨 CHANGE 1: Set to Past
    imageSrc: '/images/ellis/main.jpg',
    description:
      'Raw honesty and emotional storytelling blur the lines between alternative rock and pure vulnerability. This show is now archived.',
    highlights: ['Archived', 'Raw'],
    slug: '/artist/ellis', // 🚨 CHANGE 3: Updated slug
  },
  {
    artist: 'Deja Blue',
    date: '2024-05-15',
    status: 'Past', // 🚨 CHANGE 1: Set to Past
    imageSrc: '/gallery/db6.jpeg',
    description:
      'Electrifying, soulful vocals and raw, emotion-infused guitar and drums. This is Deja Blue!',
    highlights: ['Archived', 'Soul'],
    slug: '/artist/deja-blue', // 🚨 CHANGE 3: Updated slug
  },
  {
    artist: 'Johnny Kocur',
    date: '2024-05-30',
    status: 'Past', // 🚨 CHANGE 1: Set to Past
    imageSrc: '/images/MainKocur.jpg',
    description:
      'Masterful vocal performances and acoustic storytelling for a night of pop-R&B. Archived.',
    highlights: ['Archived', 'Pop-R&B'],
    slug: '/artist/johnny-kocur', // 🚨 CHANGE 3: Updated slug
  },
];

// --- MAIN PAGE COMPONENT ---
const SchedulePage = () => {
  const [loading] = useState(false);

  // Combine static (e.g., Upcoming) and dynamic (Past) shows
  const allCombinedShows = [...staticShows];

  // Filter shows based on status
  const upcomingShows = allCombinedShows.filter(
    (show) => show.status === 'Upcoming',
  );
  // Now contains all three shows
  const pastShows = allCombinedShows.filter((show) => show.status === 'Past');

  return (
    <main className='relative bg-brand-black pb-20 md:pb-28'>
      {/* Background Image Layer */}
      <Image
        src='/images/ellis/livebg2.jpg'
        alt='Ellis live performance background'
        fill
        className='w-full h-full object-cover object-center opacity-50 blur-[1.5px] brightness-[0.5]'
        priority
        sizes='100vw'
      />

      {/* Foreground Content */}
      <div className='relative z-20 container mx-auto px-4'>
        {/* Hero Header Section */}
        <div className='text-center max-w-3xl mx-auto pt-32 md:pt-40 mb-16'>
          <div className='inline-block p-4 bg-black/70 rounded-full mb-6 backdrop-blur-sm drop-shadow-md'>
            <CalendarDays className='w-12 h-12 text-brand-yellow' />
          </div>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-xl'>
            Show Schedule
          </h1>
          <p className='text-lg md:text-xl text-brand-gray-light drop-shadow-md'>
            A chronological list of our live performances. Click any show to
            expand for more details.
          </p>
        </div>

        {/* Loading State (Will not show as loading is false) */}
        {loading && (
          <div className='text-center text-brand-yellow/80 mt-10'>
            <p>Loading full schedule...</p>
          </div>
        )}

        {/* Upcoming Shows Section - Will not display because upcomingShows.length is 0 */}
        {upcomingShows.length > 0 && (
          <section className='mb-20 mt-10'>
            <h2 className='text-2xl font-bold text-brand-yellow mb-6 text-center'>
              Upcoming Shows
            </h2>
            <ShowAccordion shows={upcomingShows} />
          </section>
        )}

        {/* Fallback Message for NO upcoming shows - Now displays the new headline */}
        {!loading && upcomingShows.length === 0 && (
          <section className='mb-20 mt-10'>
            <h2 className='text-4xl font-extrabold text-brand-yellow mb-6 text-center tracking-wider'>
              TinyStage Will Return Spring 2026!{' '}
              {/* 🚨 CHANGE 2: Headline updated */}
            </h2>
          </section>
        )}

        {/* Past Shows Section (Archived) - Now visible since pastShows.length is 3 */}
        {!loading && pastShows.length > 0 && (
          <section className='mt-10'>
            <h2 className='text-2xl font-bold text-brand-yellow mb-6 text-center'>
              Archived Shows
            </h2>
            <ShowAccordion shows={pastShows} />
          </section>
        )}
      </div>
    </main>
  );
};

export default SchedulePage;
