// src/components/ShowUpcoming.tsx
'use client'; // If you plan to add any client-side interactivity later, otherwise optional for static display

import Image from 'next/image';
import React from 'react';

// Define an interface for the upcoming show props
interface UpcomingShowProps {
  artistName: string;
  posterImage: string;
  genre: string[];
  members: string[];
  hometown: string;
  debutEPStatus: string;
  tinyStageSetlistPreview: string[];
  aboutArtist: string;
  performanceDate?: string; // Optional: if you want to display the date
  venue?: string; // Optional
}

const JOHNNY_KOCUR_UPCOMING_DATA: UpcomingShowProps = {
  artistName: 'Johnny Kocur',
  posterImage: '/images/kocur/1.png', // Ensure this path is correct relative to /public
  genre: ['Soul', 'Pop', 'R&B'],
  members: ['Johnny Kocur—vocals', 'Ryan Sands—Supporting on Guitar'],
  hometown: 'Erie, PA',
  debutEPStatus: 'TBA',
  tinyStageSetlistPreview: ['Intro', 'TBA'],
  aboutArtist:
    'Johnny Kocur (rhymes with “poker” 😉) is an Erie-born singer whose pop-and-R&B-inflected songs land like an old friend stopping by your living room. Growing up on the shores of Lake Erie, Johnny discovered that music wasn’t just background noise—it was the truest expression of who he is. Drawing on the irresistible hooks of modern pop and the warm grooves of classic R&B, his voice balances bright optimism with a vulnerable honesty, making every lyric feel like both a secret and an open invitation.\n\nStill finding his footing onstage, Johnny brings an infectious enthusiasm to every performance. He treats each show as a homecoming—celebrating community, honoring personal growth, and embracing that electric moment when you realize you’re exactly where you belong. Whether he’s delivering a tender ballad or sliding into a slick groove, Johnny’s genuine warmth shines through: he’ll laugh if you throw tomatoes, then win you over by the second chorus. With his TinyStage debut, Johnny Kocur is just getting started—and he can’t wait to take you along for the ride.',
  // performanceDate: "OCT 26, 2024", // Example: Add if you have a date
  // venue: "The TinyStage Cafe",       // Example: Add if you have a venue
};

const ShowUpcoming: React.FC = () => {
  const show = JOHNNY_KOCUR_UPCOMING_DATA; // Using the hardcoded data for this component

  // Helper to split the bio into paragraphs for better rendering
  const bioParagraphs = show.aboutArtist.split('\n\n');

  return (
    <div className='min-h-screen bg-gradient-to-br from-brand-gray-dark via-brand-black to-brand-black font-sans text-brand-gray-light selection:bg-brand-yellow selection:text-brand-black flex flex-col items-center justify-center p-4 sm:p-6 md:p-8'>
      <article className='bg-brand-black/30 backdrop-blur-xl border border-brand-gray-dark/50 rounded-2xl shadow-2xl w-full max-w-3xl lg:max-w-4xl overflow-hidden transform transition-all duration-500 hover:shadow-brand-yellow/20'>
        <div className='md:flex'>
          {/* Left Column: Poster Image */}
          <div className='md:w-2/5 md:flex-shrink-0 relative group'>
            <Image
              src={show.posterImage}
              alt={`Poster for ${show.artistName}`}
              width={800} // Provide original width for aspect ratio calculation
              height={1200} // Provide original height
              className='w-full h-64 md:h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105'
              priority // Prioritize this image as it's the main visual
            />
            <div className='absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-brand-black/40 md:via-transparent md:to-transparent opacity-75 group-hover:opacity-100 transition-opacity duration-500' />
          </div>

          {/* Right Column: Show Information */}
          <div className='md:w-3/5 p-6 md:p-8 lg:p-10 flex flex-col space-y-5 md:space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)] md:max-h-none'>
            {' '}
            {/* Scroll for smaller screens */}
            <header>
              <h1 className='font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-yellow leading-tight tracking-tighter uppercase'>
                Coming Soon
              </h1>
              <p className='font-sans text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-white mt-1 tracking-tight'>
                {show.artistName}
              </p>
              {show.performanceDate && show.venue && (
                <p className='text-sm text-brand-gray-light mt-1.5'>
                  {show.performanceDate} at {show.venue}
                </p>
              )}
            </header>
            <section className='space-y-3 text-sm md:text-base'>
              <div>
                <h3 className='font-semibold text-brand-yellow/90 uppercase text-xs tracking-wider mb-1'>
                  Genre
                </h3>
                <p className='text-brand-gray-light'>
                  {show.genre.join(' | ')}
                </p>
              </div>
              <div>
                <h3 className='font-semibold text-brand-yellow/90 uppercase text-xs tracking-wider mb-1'>
                  Members
                </h3>
                <ul className='list-none text-brand-gray-light'>
                  {show.members.map((member, i) => (
                    <li key={i}>{member}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className='font-semibold text-brand-yellow/90 uppercase text-xs tracking-wider mb-1'>
                  Hometown
                </h3>
                <p className='text-brand-gray-light'>{show.hometown}</p>
              </div>
              <div>
                <h3 className='font-semibold text-brand-yellow/90 uppercase text-xs tracking-wider mb-1'>
                  Debut EP
                </h3>
                <p className='text-brand-gray-light'>{show.debutEPStatus}</p>
              </div>
              <div>
                <h3 className='font-semibold text-brand-yellow/90 uppercase text-xs tracking-wider mb-1'>
                  TinyStage Setlist Preview
                </h3>
                <p className='text-brand-gray-light'>
                  {show.tinyStageSetlistPreview.join(' · ')}
                </p>
              </div>
            </section>
            <section className='prose prose-sm md:prose-base prose-invert max-w-none prose-p:my-2.5 prose-headings:text-brand-yellow/90 prose-strong:text-brand-white'>
              {/* Using prose for About section styling */}
              <h3 className='font-semibold uppercase text-xs tracking-wider !mb-2 !mt-0'>
                About {show.artistName}
              </h3>
              {bioParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className='text-brand-gray-light/90 font-light leading-relaxed tracking-normal'
                >
                  {paragraph}
                </p>
              ))}
            </section>
            {/* Optional: Placeholder for a future link or RSVP */}
            <div className='pt-4 text-center md:text-left'>
              <span className='inline-block px-6 py-3 bg-brand-yellow/10 border-2 border-brand-yellow/30 text-brand-yellow font-semibold text-sm uppercase tracking-widest rounded-lg cursor-not-allowed opacity-70'>
                Stay Tuned!
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ShowUpcoming;
