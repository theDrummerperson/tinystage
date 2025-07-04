import { CalendarDays } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import ShowAccordion, { Show } from '@/components/ShowAccordion';

export const metadata = {
  title: 'Show Schedule | TinyStage',
  description:
    'Explore the full schedule of upcoming and past shows at TinyStage. Find dates and get ready for the next live performance.',
};

// --- All Shows Data ---
const allShows: Show[] = [
  {
    date: 'June 27, 2025',
    artist: 'Ellis',
    status: 'Past',
    imageSrc: '/images/ellis/main1.jpg',
    slug: '/artist/ellis',
    venue: 'TinyStage Live',
    genre: 'Acoustic / Emo-Pop',
    duration: '~60 min',
    description:
      'Experience the raw, honest sound of Ellis in an intimate acoustic setting. A journey through heartbreak, healing, and everything in between.',
    highlights: ['Acoustic Set', 'New Music', 'Intimate Venue'],
  },
  {
    date: 'May 30, 2025',
    artist: 'Johnny Kocur',
    status: 'Past',
    imageSrc: '/land/1.png',
    slug: '/artist/johnny-kocur',
    venue: 'TinyStage Live',
    genre: 'Acoustic / Pop-R&B',
    duration: '65 min',
    description:
      "Relive a masterful display of acoustic storytelling. Johnny's intricate fingerpicking and heartfelt lyrics created an unforgettable evening.",
    highlights: ['Fan Favorites', 'Sold Out Show', 'Live Storytelling'],
  },
  {
    date: 'May 2, 2025',
    artist: 'Deja Blue',
    status: 'Past',
    imageSrc: '/images/deja/5.jpg',
    slug: '/artist/deja-blue',
    venue: 'TinyStage Live',
    genre: 'Blues-Rock / Soul',
    duration: '75 min',
    description:
      'An electrifying performance that blended soulful vocals with raw, blues-infused guitar riffs, leaving the audience spellbound.',
    highlights: ['High Energy', 'Soulful Vocals', 'Guitar Solos'],
  },
];

// --- Filtered Shows by Status ---
const upcomingShows = allShows.filter((show) => show.status === 'Upcoming');
const pastShows = allShows.filter((show) => show.status === 'Past');

const SchedulePage = () => {
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

        {/* Upcoming Shows Section */}
        {upcomingShows.length > 0 && (
          <section className='mb-16'>
            <h2 className='text-2xl font-bold text-brand-yellow mb-6 text-center'>
              Upcoming Shows
            </h2>
            <ShowAccordion shows={upcomingShows} />
          </section>
        )}

        {/* Past Shows Section */}
        {pastShows.length > 0 && (
          <section>
            <h2 className='text-2xl font-bold text-brand-yellow mb-6 text-center'>
              Past Shows
            </h2>
            <ShowAccordion shows={pastShows} />
          </section>
        )}
      </div>
    </main>
  );
};

export default SchedulePage;
