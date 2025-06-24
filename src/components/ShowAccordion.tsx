// src/components/ShowAccordion.tsx
'use client';

import { ArrowRight, Calendar, ChevronDown, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

// Enhanced Show interface (remains the same)
export interface Show {
  date: string;
  artist: string;
  status: 'Past' | 'Upcoming';
  imageSrc: string;
  slug: string;
  venue?: string;
  genre?: string;
  duration?: string;
  capacity?: string;
  rating?: number;
  description?: string;
  highlights?: string[];
}

interface ShowAccordionProps {
  shows: Show[];
}

const ShowAccordion: React.FC<ShowAccordionProps> = ({ shows }) => {
  const upcomingShowIndex = shows.findIndex(
    (show) => show.status === 'Upcoming',
  );
  const [openIndex, setOpenIndex] = useState<number | null>(
    upcomingShowIndex !== -1 ? upcomingShowIndex : null,
  );

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='w-full max-w-5xl mx-auto space-y-6'>
      {shows.map((show, index) => {
        const isOpen = openIndex === index;
        const isUpcoming = show.status === 'Upcoming';

        return (
          <div
            key={show.artist}
            className={`bg-brand-gray-dark border border-white/10 rounded-xl transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'shadow-2xl shadow-brand-yellow/10 scale-[1.01]'
                : 'hover:border-white/20'
            } ${isUpcoming ? 'border-brand-yellow/50' : ''}`}
          >
            {/* Header */}
            <button
              onClick={() => handleToggle(index)}
              className='w-full p-6 md:p-8 text-left transition-colors duration-200 hover:bg-brand-black/20 group'
              aria-expanded={isOpen}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-4 md:space-x-6'>
                  <div
                    className={`p-4 rounded-lg border ${isUpcoming ? 'bg-brand-yellow/10 border-brand-yellow/30' : 'bg-brand-black/20 border-white/10'}`}
                  >
                    <Calendar
                      className={`w-6 h-6 ${isUpcoming ? 'text-brand-yellow' : 'text-brand-gray-light'}`}
                    />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-brand-gray-light uppercase tracking-wide'>
                      {show.date}
                    </p>
                    <h3 className='text-2xl md:text-3xl font-bold text-white group-hover:text-brand-yellow transition-colors'>
                      {show.artist}
                    </h3>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <span
                    className={`px-4 py-2 text-sm font-bold rounded-full ${isUpcoming ? 'bg-brand-yellow text-brand-black' : 'bg-brand-gray-dark/80 text-brand-gray-light'}`}
                  >
                    {show.status}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-brand-gray-light transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-yellow' : ''}`}
                  />
                </div>
              </div>
            </button>

            {/* Content */}
            <div
              className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className='overflow-hidden'>
                <div className='border-t border-white/10 p-6 md:p-8 grid lg:grid-cols-5 gap-8'>
                  <div className='lg:col-span-2'>
                    <div className='relative aspect-video rounded-lg overflow-hidden shadow-lg group'>
                      <Image
                        src={show.imageSrc}
                        alt={`Promotional image for ${show.artist}`}
                        fill
                        className='object-cover'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                        <div className='bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform'>
                          <Play
                            className='w-8 h-8 text-white'
                            fill='currentColor'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='lg:col-span-3 space-y-4'>
                    <p className='text-brand-gray-light text-lg'>
                      {show.description}
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {show.highlights?.map((highlight) => (
                        <span
                          key={highlight}
                          className='px-3 py-1 bg-brand-black/30 border border-white/10 text-brand-gray-light text-sm rounded-full'
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <div className='pt-4 flex flex-wrap gap-4'>
                      <Link
                        href={show.slug}
                        className='group flex-1 min-w-[200px] bg-brand-yellow text-brand-black font-bold py-3 px-6 rounded-md hover:brightness-110 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-brand-yellow/20 flex items-center justify-center'
                      >
                        {isUpcoming
                          ? 'Get Details & Tickets'
                          : 'View Performance'}
                        <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowAccordion;
