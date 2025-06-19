// src/app/calendar/page.tsx
import ShowAccordion, { Show } from '@/components/ShowAccordion';
import { CalendarDays } from 'lucide-react';
import React from 'react';

export const metadata = {
  title: 'Show Schedule | TinyStage',
  description: 'Explore the full schedule of upcoming and past shows at TinyStage. Find dates and get ready for the next live performance.',
};

// --- ENHANCED: Show data with full metadata ---
const shows: Show[] = [
  {
    date: 'June 27, 2025',
    artist: 'Ellis',
    status: 'Upcoming',
    imageSrc: '/images/ellis/EllisHeader.png',
    slug: '/shows/upcoming',
    venue: 'TinyStage Live',
    genre: 'Acoustic / Emo-Pop',
    duration: '~60 min',
    description: 'Experience the raw, honest sound of Ellis in an intimate acoustic setting. A journey through heartbreak, healing, and everything in between.',
    highlights: ['Acoustic Set', 'New Music', 'Intimate Venue'],
  },
  {
    date: 'May 30, 2025',
    artist: 'Johnny Kocur',
    status: 'Past',
    imageSrc: '/images/kocur/1.png',
    slug: '/shows/archive#johnny-kocur',
    venue: 'TinyStage Live',
    genre: 'Acoustic / Pop-R&B',
    duration: '65 min',
    description: "Relive a masterful display of acoustic storytelling. Johnny's intricate fingerpicking and heartfelt lyrics created an unforgettable evening.",
    highlights: ['Fan Favorites', 'Sold Out Show', 'Live Storytelling'],
  },
  {
    date: 'May 2, 2025',
    artist: 'Deja Blue',
    status: 'Past',
    imageSrc: '/images/Dejaposter.png',
    slug: '/shows/archive#deja-blue',
    venue: 'TinyStage Live',
    genre: 'Blues-Rock / Soul',
    duration: '75 min',
    description: 'An electrifying performance that blended soulful vocals with raw, blues-infused guitar riffs, leaving the audience spellbound.',
    highlights: ['High Energy', 'Soulful Vocals', 'Guitar Solos'],
  },
];


const SchedulePage = () => {
  return (
    <main className="bg-brand-black py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block p-4 bg-brand-gray-dark rounded-full mb-6">
            <CalendarDays className="w-12 h-12 text-brand-yellow" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-white leading-tight mb-4">
            Show Schedule
          </h1>
          <p className="text-lg md:text-xl text-brand-gray-light">
            A chronological list of our live performances. Click any show to expand for more details.
          </p>
        </div>
        
        <ShowAccordion shows={shows} />
      </div>
    </main>
  );
};

export default SchedulePage;



