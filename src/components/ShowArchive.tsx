// src/components/ShowArchive.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// Define the Show interface
interface Show {
  id: string;
  title: string;
  performer: string;
  date: string;
  description: string;
  thumbnailUrl: string;
  videoSlug: string;
}

// --- Dummy Data ---
const DUMMY_SHOWS: Show[] = [
  // ... (DUMMY_SHOWS data remains the same)
  {
    id: 'deja-blue-20250502',
    title: 'Deja Blue Live at FEED',
    performer: 'Deja Blue',
    date: '2025-05-02',
    description: "Genre-blending soul & blues with lo-fi dream wave and indie grooves. Recorded live at FEED Media Arts Center.",
    thumbnailUrl: '/images/Dejaposter.png',
    videoSlug: 'deja-blue-live-feed-2025',
  },
  {
    id: 'tba-1',
    title: 'TBA',
    performer: 'To Be Announced',
    date: '20235-05-30',
    description: 'Cominng soon!',
    thumbnailUrl: '/images/TSlogo.png',
    videoSlug: 'archived-show-tba-1',
  },

];


const ShowArchive: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  // Removed visibleShows for now to simplify the priority/lazy loading fix.
  // Staggered animation can be re-added carefully if needed.

  useEffect(() => {
    const sortedShows = [...DUMMY_SHOWS].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (isNaN(dateA) && isNaN(dateB)) return 0;
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;
      return dateB - dateA; // Newest first
    });
    setShows(sortedShows);
  }, []);

  const formatDate = (dateString: string): string => {
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) {
      return "Date TBA";
    }
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <header className="text-center mb-12 md:mb-16">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-yellow mb-2">
          Show Archive
        </h1>
        <p className="text-lg text-brand-gray-light max-w-2xl mx-auto font-sans">
          Relive the magic. Browse our collection of past TinyStage performances – raw, intimate, and unforgettable.
        </p>
      </header>

      {Array.isArray(shows) && shows.length > 0 ? (
        <main>
          <h2 className="sr-only">Past Performances</h2>
          <div className="show-grid">
            {shows.map((show, index) => (
              <article
                key={show.id}
                className="flex flex-col group animate-fadeInBasic opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: `${index * 0.07}s` }} // Ensure opacity stays 1
                aria-labelledby={`show-title-${show.id}`}
              >
                <Link href={`/shows/${show.videoSlug}`} passHref legacyBehavior>
                  <a
                    aria-label={`Watch ${show.title} by ${show.performer}`}
                    className="block mb-4 group-hover:scale-105 group-focus-within:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-brand-black rounded-sm overflow-hidden transition-transform duration-300"
                  >
                    <div className="polaroid-frame bg-brand-white">
                      <div className="relative bg-brand-gray-medium">
                        <Image
                          src={show.thumbnailUrl}
                          alt={`Thumbnail for ${show.title}`}
                          width={320}
                          height={200}
                          className="block w-full aspect-[16/10] object-cover bg-brand-gray-dark"
                          // Apply priority only to the first few images (e.g., first 1 or 2)
                          // All other images will implicitly use loading="lazy"
                          priority={index < 2} // Example: Prioritize the first 2 images
                          // DO NOT ADD loading="lazy" here if priority is true
                        />
                      </div>
                    </div>
                  </a>
                </Link>

                <div className="flex flex-col flex-grow p-1 font-sans">
                  <h3
                    id={`show-title-${show.id}`}
                    className="font-display text-2xl text-brand-yellow leading-tight mb-1"
                  >
                    {show.title}
                  </h3>
                  <p className="text-md font-semibold text-brand-gray-light mb-0.5">
                    {show.performer}
                  </p>
                  <p className="text-sm text-brand-gray-medium mb-3">
                    {formatDate(show.date)}
                  </p>
                  <p className="text-sm text-brand-gray-light leading-relaxed mb-4 flex-grow min-h-[60px]">
                    {show.description}
                  </p>

                  <Link href={`/shows/${show.videoSlug}`} passHref legacyBehavior>
                    <a className="cta-watch self-start mt-auto py-2 px-5 text-sm font-semibold uppercase tracking-wider relative focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-brand-black rounded-sm">
                      Watch Now
                      <span className="hover-underline absolute bottom-0 left-0 w-full h-0.5 bg-brand-yellow transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100 group-focus:scale-x-100"></span>
                    </a>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </main>
      ) : (
        <p className="text-center text-xl text-brand-gray-medium py-16 font-sans">
          {shows.length === 0 && DUMMY_SHOWS.length > 0 ? "Loading shows..." : "No past shows found in the archive yet. Check back soon!"}
        </p>
      )}
    </div>
  );
};

export default ShowArchive;