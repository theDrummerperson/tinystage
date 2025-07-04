import { CalendarDays } from 'lucide-react';
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
    <main className='bg-brand-black py-20 md:py-28'>
      <div className='container mx-auto px-4'>
        <div className='text-center max-w-3xl mx-auto mb-16'>
          <div className='inline-block p-4 bg-brand-gray-dark rounded-full mb-6'>
            <CalendarDays className='w-12 h-12 text-brand-yellow' />
          </div>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-brand-white leading-tight mb-4'>
            Show Schedule
          </h1>
          <p className='text-lg md:text-xl text-brand-gray-light'>
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
