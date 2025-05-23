// src/app/shows/upcoming/page.tsx
import Image from 'next/image';
import Link from 'next/link';

import { UpcomingShow, upcomingShowsData } from '../../../data/upcomingShows'; // Adjust path if needed

// Optional: Metadata for the page (App Router)
export const metadata = {
  title: 'Upcoming Shows | TinyStage',
  description:
    'See who is playing next at TinyStage! Get details and tickets for our upcoming live music events.',
};

// Helper function to format date and time (customize as needed)
const formatShowDateTime = (
  dateString: string,
): { date: string; time: string } => {
  const dateObj = new Date(dateString);
  const optionsDate: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  return {
    date: dateObj.toLocaleDateString(undefined, optionsDate),
    time: dateObj.toLocaleTimeString(undefined, optionsTime),
  };
};

const UpcomingShowCard: React.FC<{ show: UpcomingShow }> = ({ show }) => {
  const { date, time } = formatShowDateTime(show.showDate);

  return (
    <article className='group bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 ease-out hover:shadow-2xl hover:transform hover:-translate-y-1'>
      <Link href={show.detailsLink || show.ticketLink || '#'} className='block'>
        <div className='relative w-full aspect-[16/9] overflow-hidden'>
          <Image
            src={show.coverImageUrl}
            alt={show.coverImageAlt}
            layout='fill'
            objectFit='cover'
            className='transition-transform duration-500 ease-out group-hover:scale-105'
          />
        </div>
      </Link>
      <div className='p-6 flex flex-col flex-grow'>
        <header className='mb-3'>
          <p className='text-sm font-semibold text-[var(--brand-yellow)] uppercase tracking-wider'>
            {date}
          </p>
          <h2 className='text-2xl lg:text-3xl font-bold text-[var(--brand-black)] mt-1 group-hover:text-[var(--brand-yellow)] transition-colors'>
            <Link href={show.detailsLink || show.ticketLink || '#'}>
              {show.artistName}
            </Link>
          </h2>
          {show.tagline && (
            <p className='text-md text-gray-600 mt-1'>{show.tagline}</p>
          )}
        </header>
        <p className='text-gray-700 text-sm leading-relaxed mb-4 flex-grow'>
          {show.description}
        </p>
        <div className='mt-auto border-t pt-4'>
          <div className='flex justify-between items-center mb-3'>
            <p className='text-lg font-semibold text-[var(--brand-black)]'>
              {time}
            </p>
            {show.priceRange && (
              <p className='text-md font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full'>
                {show.priceRange}
              </p>
            )}
          </div>
          {show.ticketLink && show.ticketLink !== '#' ? (
            <Link
              href={show.ticketLink}
              target='_blank'
              rel='noopener noreferrer'
              className='block w-full text-center text-white bg-[var(--brand-black)] hover:bg-opacity-80 px-6 py-3 rounded-md font-semibold transition-colors duration-200 ease-out'
            >
              Get Tickets
            </Link>
          ) : (
            <p className='text-center text-gray-500 mt-2'>
              Tickets at the door or more info soon.
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

const UpcomingShowsPage = () => {
  // Filter for shows that are actually in the future and sort them by date
  const now = new Date();
  const futureShows = upcomingShowsData
    .filter((show) => new Date(show.showDate) > now)
    .sort(
      (a, b) => new Date(a.showDate).getTime() - new Date(b.showDate).getTime(),
    );

  return (
    <main className='min-h-screen bg-gray-50 text-[var(--brand-black)]'>
      <div className='container mx-auto px-4 py-16 md:py-24'>
        <header className='mb-12 md:mb-16 text-center'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--brand-black)] mb-4'>
            Upcoming Shows
          </h1>
          <p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
            Get ready for incredible live music! Here's what's coming soon to
            the TinyStage.
          </p>
        </header>

        {futureShows.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10'>
            {futureShows.map((show) => (
              <UpcomingShowCard key={show.id} show={show} />
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-xl text-gray-500 mb-6'>
              No upcoming shows scheduled at the moment. We're working on
              bringing you more great music soon!
            </p>
            <Link
              href='/#booking' // Link to booking section or contact
              className='inline-block text-white bg-[var(--brand-yellow)] hover:bg-opacity-90 px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 ease-out'
            >
              Want to Perform?
            </Link>
          </div>
        )}

        {/* Optional: Link back to the main shows page or archive */}
        <div className='mt-16 md:mt-24 text-center'>
          <Link
            href='/shows'
            className='text-[var(--brand-black)] hover:text-[var(--brand-yellow)] font-semibold transition-colors'
          >
            ← Back to Main Shows Page
          </Link>
          <span className='mx-2 text-gray-400'>|</span>
          <Link
            href='/shows/archive'
            className='text-[var(--brand-black)] hover:text-[var(--brand-yellow)] font-semibold transition-colors'
          >
            View Past Performances →
          </Link>
        </div>
      </div>
    </main>
  );
};

export default UpcomingShowsPage;
