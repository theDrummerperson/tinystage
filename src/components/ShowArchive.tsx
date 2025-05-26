// src/components/ShowArchive.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

import { formatDate, PastShow } from '@/data/types';

interface ShowArchiveProps {
  shows?: PastShow[];
}

const ShowArchive: React.FC<ShowArchiveProps> = ({ shows = [] }) => {
  // Sample data - in real app this would come from props or API
  const showsToDisplay: PastShow[] = shows.length > 0 ? shows : [
    {
      id: 'deja-blu-2025-05-02',
      artistName: 'Deja Blu',
      tagline: 'TinyStage Debut',
      description: 'Genre-blending soul & blues with lo-fi dream wave and indie grooves.',
      imageUrl: '/images/artists/deja-blu-placeholder-profile.jpg',
      imageAlt: 'Deja Blu band promotional photo',
      flyerImageUrl: '/images/Dejaposter.png',
      performanceDate: '2025-05-02T19:00:00Z',
      venue: {
        name: 'FEED Media Arts Center',
        address: 'Erie, PA',
      },
      genres: ['Soul', 'Blues', 'Dream Wave', 'Indie'],
      primaryAccentColor: '#3b82f6',
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-10 lg:mb-12 text-center">
          Show Archive
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {showsToDisplay.map((show) => (
            <article
              key={show.id}
              className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden
                         transition-all duration-300 ease-in-out 
                         hover:shadow-2xl hover:scale-[1.03] focus-within:scale-[1.03]
                         focus-within:ring-4 focus-within:ring-offset-2 focus-within:ring-offset-gray-50 dark:focus-within:ring-offset-gray-900 focus-within:ring-blue-500 dark:focus-within:ring-blue-400
                         motion-reduce:transform-none motion-reduce:transition-none"
              aria-labelledby={`show-title-${show.id}`}
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                <Image
                  src={show.flyerImageUrl}
                  alt={show.imageAlt || `Poster for ${show.artistName} at ${show.venue.name}`}
                  width={400}
                  height={600}
                  className="object-cover object-center w-full h-full 
                             group-hover:opacity-80 transition-opacity duration-300 ease-in-out"
                />
              </div>
              
              <div className="p-5 text-center">
                <h2 id={`show-title-${show.id}`} className="text-xl font-semibold text-gray-800 dark:text-white mb-1 truncate">
                  {show.artistName}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {formatDate(show.performanceDate)}
                </p>
                {show.venue && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {show.venue.name}
                  </p>
                )}
                
                <Link
                  href={`/shows/archive/${show.id}`}
                  className="relative z-10 inline-flex items-center justify-center px-6 py-2 
                             border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
                             bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800
                             transition-colors duration-150 ease-in-out"
                  aria-label={`View details for ${show.artistName}'s show`}
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowArchive;