// app/shows/page.tsx
'use client'; // Still needed if other parts of the page use client components or hooks

import Link from 'next/link';

// Remove direct imports of Image and motion if they are only used in ShowsPastFeatured
// import Image from 'next/image';
// import { motion } from 'framer-motion';
import { PastShow, pastShowsData } from '@/data/pastShows'; // Adjust path if needed

import ShowsPastFeatured from '@/components/ShowsPastFeatured'; // Import the new component

// If you want to set metadata for this page (App Router)
// export const metadata = {
//   title: 'Shows | TinyStage',
//   description: 'Discover upcoming shows and look back at past performances at TinyStage.',
// };

const ShowsPage = () => {
  // Get the featured past show (assuming the first one in the data is the most recent/featured)
  const featuredPastShow: PastShow | undefined = pastShowsData[0]; // Or filter/find by a specific ID/flag

  return (
    <main className='min-h-screen'>
      {/* Use the new component here */}
      {featuredPastShow && <ShowsPastFeatured show={featuredPastShow} />}
      {/* End Featured Past Performance Section */}

      {/* Placeholder for Upcoming Shows Section */}
      <section
        className='container mx-auto px-4 py-16 md:py-24 border-t'
        style={{
          borderColor: featuredPastShow?.primaryAccentColor
            ? `${featuredPastShow.primaryAccentColor}40`
            : '#8A030340',
        }}
      >
        <h2
          className='text-3xl sm:text-4xl font-extrabold text-center mb-10 md:mb-12'
          style={{ color: featuredPastShow?.primaryAccentColor || '#8A0303' }}
        >
          Upcoming Shows
        </h2>
        <div className='text-center text-lg text-gray-600'>
          <p>Stay tuned for our next lineup of incredible artists!</p>
          <p className='mt-4'>
            <Link
              href='/#booking'
              className='text-[var(--brand-yellow)] hover:underline font-semibold'
            >
              Want to perform? Submit your act!
            </Link>
          </p>
        </div>
      </section>

      {/* Placeholder for Link to Full Past Show Archive */}
      {pastShowsData.length > 0 && (
        <section className='container mx-auto px-4 pb-16 md:pb-24 text-center'>
          <Link
            href='/shows/archive'
            className='inline-block text-white px-6 py-3 rounded-md font-medium transition-colors text-sm'
            style={{
              backgroundColor: featuredPastShow?.primaryAccentColor
                ? `${featuredPastShow.primaryAccentColor}B3`
                : '#8A0303B3',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                featuredPastShow?.primaryAccentColor || '#8A0303')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                featuredPastShow?.primaryAccentColor
                  ? `${featuredPastShow.primaryAccentColor}B3`
                  : '#8A0303B3')
            }
          >
            View All Past Performances →
          </Link>
        </section>
      )}

      {!featuredPastShow && (
        <div className='container mx-auto px-4 py-16 md:py-24 text-center'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-[var(--brand-black)] mb-6'>
            Our Stage Awaits
          </h1>
          <p className='text-lg text-[var(--brand-gray-dark)] max-w-xl mx-auto'>
            We're busy curating amazing new experiences. Check back soon for
            upcoming shows and a look at our past performances!
          </p>
        </div>
      )}
    </main>
  );
};

export default ShowsPage;
