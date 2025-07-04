// src/app/shows/page.tsx
'use client';

import { ArrowRight, Calendar, Play, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// ================================================================
// 1. DATA & TYPES
// ================================================================
interface PastShow {
  id: string;
  artist: {
    name: string;
    slug: string;
    image: string;
    imageAlt: string;
  };
  performance: {
    date: string;
    description: string;
    genre: string[];
  };
  media: {
    hasVideo: boolean;
  };
  engagement: {
    views: number;
  };
}

const FEATURED_SHOWS: PastShow[] = [
  {
    id: 'ellis-2024',
    artist: {
      name: 'Ellis',
      slug: 'ellis',
      image: '/images/ellis/main.jpg',
      imageAlt: 'Ellis performing an intimate acoustic set at TinyStage',
    },
    performance: {
      date: '2024-06-27',
      description:
        'Raw honesty and emotional storytelling blur the lines between alternative rock and pure vulnerability.',
      genre: ['Alternative Rock', 'Acoustic', 'Emo-Pop'],
    },
    media: { hasVideo: true },
    engagement: { views: 980 },
  },
  {
    id: 'deja-blue-2024',
    artist: {
      name: 'Deja Blue',
      slug: 'deja-blue',
      image: '/gallery/db6.jpeg',
      imageAlt: 'Deja Blue performing live with electric guitar and drums',
    },
    performance: {
      date: '2024-05-15',
      description:
        'Electrifying, soulful vocals and raw, emotion-infused guitar and drums. This is Deja Blue!',
      genre: ['Alternative Rock', 'Blues'],
    },
    media: { hasVideo: true },
    engagement: { views: 1250 },
  },
  {
    id: 'johnny-kocur-2024',
    artist: {
      name: 'Johnny Kocur',
      slug: 'johnny-kocur',
      image: '/images/MainKocur.jpg',
      imageAlt:
        'Johnny Kocur playing acoustic guitar with intricate fingerpicking',
    },
    performance: {
      date: '2024-05-30',
      description:
        'Masterful vocal performances and acoustic storytelling for a night of pop-R&B. This is Johnny Kocur!',
      genre: ['Pop', 'R&B', 'Acoustic'],
    },
    media: { hasVideo: true },
    engagement: { views: 1450 },
  },
];

// ================================================================
// 2. HELPER COMPONENTS
// ================================================================

// A small component for displaying performance metrics
const PerformanceMetrics = ({ show }: { show: PastShow }) => (
  <div className='flex items-center gap-3 text-xs text-brand-gray-light/80'>
    <span className='flex items-center gap-1'>
      <Users className='w-3 h-3' /> {show.engagement.views} Views
    </span>
    <span className='flex items-center gap-1'>
      <Calendar className='w-3 h-3' />
      {new Date(show.performance.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}
    </span>
  </div>
);

// The main card component for a show
const ShowCard = ({ show, index }: { show: PastShow; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = cardRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1 },
    );

    if (node) {
      observer.observe(node);
    }
    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className='group motion-safe:opacity-0'
      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
    >
      {/* CORRECTED: Link now points to the singular `/artist/` path */}
      <Link
        href={`/artist/${show.artist.slug}`}
        className='block relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-brand-yellow/20 transform transition-all duration-300 ease-in-out hover:-translate-y-2'
        aria-label={`View ${show.artist.name} performance`}
      >
        <Image
          src={show.artist.image}
          alt={show.artist.imageAlt}
          fill
          className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-105'
          sizes='(max-width: 768px) 100vw, 33vw'
          priority={index < 3}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/50 to-transparent' />
        <div className='absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
          <Play
            className='h-16 w-16 text-brand-white drop-shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300'
            fill='currentColor'
          />
        </div>
        <div className='absolute bottom-0 left-0 p-6 w-full text-left'>
          <div className='mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <PerformanceMetrics show={show} />
          </div>
          <h3 className='text-3xl font-bold text-brand-yellow drop-shadow-md'>
            {show.artist.name}
          </h3>
          <div className='flex flex-wrap gap-2 mt-2 mb-3'>
            {show.performance.genre.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className='px-2 py-1 text-xs bg-brand-yellow/20 text-brand-yellow rounded-full backdrop-blur-sm'
              >
                {genre}
              </span>
            ))}
          </div>
          <p className='text-brand-gray-light max-w-sm h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 ease-out'>
            {show.performance.description}
          </p>
        </div>
      </Link>
    </div>
  );
};

// The component for the "Featured Past Shows" section
const FeaturedPastShowsSection = () => {
  const allGenres = Array.from(
    new Set(FEATURED_SHOWS.flatMap((show) => show.performance.genre)),
  );
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredShows =
    activeFilter === 'all'
      ? FEATURED_SHOWS
      : FEATURED_SHOWS.filter((show) =>
          show.performance.genre.includes(activeFilter),
        );

  return (
    <section className='relative py-20 md:py-28 bg-brand-black z-[1] overflow-hidden'>
      <div className='absolute inset-0 z-0' aria-hidden='true'>
        <div className='absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none'>
          <div className="w-[1200px] h-[1200px] bg-[url('/svg/4.svg')] bg-contain bg-no-repeat bg-center opacity-20 mix-blend-lighten motion-safe:animate-cosmicPulse" />
        </div>
        <div className='absolute inset-0 bg-gradient-radial from-brand-black/10 via-brand-black/50 to-brand-black/80' />
      </div>
      <div className='container mx-auto px-4 text-center relative z-[1]'>
        <div
          className='max-w-3xl mx-auto mb-12 md:mb-16 motion-safe:animate-fadeIn'
          style={{ animationDelay: '0.1s' }}
        >
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-brand-white'>
            From the Archive
          </h2>
          <p className='text-lg md:text-xl text-brand-gray-light max-w-2xl mx-auto mb-8'>
            Relive the moments that defined our stage. Here are standout
            performances from our past shows.
          </p>
          <div className='flex flex-wrap justify-center gap-2 md:gap-3'>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${activeFilter === 'all' ? 'bg-brand-yellow text-brand-black' : 'bg-brand-gray-dark/40 text-brand-gray-light hover:bg-brand-yellow/20'}`}
            >
              All Shows
            </button>
            {allGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveFilter(genre)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${activeFilter === genre ? 'bg-brand-yellow text-brand-black' : 'bg-brand-gray-dark/40 text-brand-gray-light hover:bg-brand-yellow/20'}`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16'>
          {filteredShows.map((show, index) => (
            <ShowCard key={show.id} show={show} index={index} />
          ))}
        </div>
        <div
          className='motion-safe:animate-fadeIn'
          style={{ animationDelay: '0.9s' }}
        >
          <Link
            href='/shows/archive'
            className='group inline-flex items-center justify-center px-8 py-4 border border-brand-yellow text-lg font-medium rounded-md text-brand-yellow hover:bg-brand-yellow hover:text-brand-black shadow-lg transition-all duration-300 ease-out transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-brand-black focus:ring-brand-yellow'
          >
            Explore All Past Shows
            <ArrowRight className='ml-3 h-5 w-5 group-hover:animate-nudgeRight' />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ================================================================
// 4. MAIN PAGE COMPONENT
// ================================================================
const ShowsPage = () => {
  return (
    <main className='overflow-x-hidden relative bg-brand-black'>
      {/* Hero Section */}
      <section className='relative py-20 md:py-32 text-center bg-radial-gradient'>
        <div
          className='absolute inset-0 flex items-center justify-center z-[0] overflow-hidden pointer-events-none'
          aria-hidden='true'
        >
          <div
            className="w-[calc(100vw_-_40px)] h-[calc(100vw_-_40px)] sm:w-[700px] sm:h-[700px] md:w-[800px] md:h-[800px] lg:w-[900px] lg:h-[900px] bg-[url('/svg/4.svg')] bg-contain bg-no-repeat bg-center motion-safe:animate-cosmicPulse"
            style={{ animationDelay: '0.3s' }}
          />
        </div>
        <div className='absolute inset-0 bg-gradient-radial from-brand-gray-dark/15 via-brand-black/70 to-brand-black opacity-95 z-[1]' />
        <div className='container mx-auto px-4 relative z-[2]'>
          <div className='max-w-4xl mx-auto space-y-8 mb-12'>
            <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold text-brand-white leading-tight'>
              <span
                className='block tracking-tight motion-safe:animate-fadeIn'
                style={{ animationDelay: '0.1s' }}
              >
                The Heartbeat
              </span>
              <span className='block text-brand-yellow mt-4 motion-safe:animate-textReveal'>
                of Erie's Sound.
              </span>
            </h1>
            <div
              className='border-l-2 border-brand-yellow pl-6 ml-4 max-w-2xl mx-auto motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.7s' }}
            >
              <p className='text-xl md:text-2xl text-brand-gray-light italic'>
                Intimate performances, unforgettable moments. This is where
                local talent takes the spotlight.
              </p>
            </div>
          </div>
          <div className='flex flex-wrap justify-center gap-4 md:gap-6 max-w-2xl mx-auto'>
            <Link
              href='/calendar'
              className='group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-brand-black bg-brand-yellow hover:brightness-110 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-brand-black focus:ring-brand-yellow motion-safe:animate-fadeIn'
              style={{ animationDelay: '1.1s' }}
            >
              See Upcoming Shows
              <ArrowRight className='ml-3 h-5 w-5 group-hover:animate-nudgeRight' />
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative SVG */}
      <div className='absolute top-1/4 -right-20 w-40 h-auto opacity-20 z-0 pointer-events-none motion-safe:animate-subtleSvgDrift'>
        <div className="w-full h-full bg-[url('/svg/side-peek.svg')] bg-contain bg-no-repeat aspect-square" />
      </div>

      {/* Upcoming Shows Section */}
      <section className='relative py-20 md:py-28 bg-brand-black z-[1]'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-5 gap-12 items-center'>
            <div
              className='md:col-span-2 text-center md:text-left motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.2s' }}
            >
              <div className='relative inline-block p-5 rounded-full bg-brand-gray-dark/40 mb-6 shadow-md'>
                <div className='relative z-10 w-24 h-24 flex items-center justify-center text-brand-yellow'>
                  <Calendar className='w-20 h-20' strokeWidth={1} />
                </div>
                <div className='absolute inset-0 rounded-full bg-brand-yellow/20 blur-xl motion-safe:animate-pulse -z-10'></div>
              </div>
              <h2 className='text-3xl sm:text-4xl font-bold mb-3 text-brand-white'>
                Catch Us Live
              </h2>
              <p className='text-xl text-brand-gray-medium'>
                The next show is just around the corner.
              </p>
            </div>
            <div
              className='md:col-span-3 motion-safe:animate-fadeIn'
              style={{ animationDelay: '0.4s' }}
            >
              <p className='text-lg md:text-xl text-brand-gray-light leading-relaxed mb-6'>
                Our stage is a living, breathing part of Erie's music scene. We
                regularly feature incredible artists in intimate settings,
                creating an experience you won't forget.
              </p>
              <p className='text-xl md:text-2xl text-brand-yellow font-semibold leading-relaxed mb-10'>
                Find out who's playing next and be part of the magic.
              </p>
              <Link
                href='/calendar'
                className='group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-brand-black bg-brand-yellow hover:brightness-110 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-brand-black focus:ring-brand-yellow'
              >
                View Full Schedule
                <ArrowRight className='ml-3 h-5 w-5 group-hover:animate-nudgeRight' />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FeaturedPastShowsSection />
    </main>
  );
};

export default ShowsPage;
