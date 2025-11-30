'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Calendar,
  ChevronDown,
  Hash,
  Music2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

// Define the interface locally to ensure self-containment,
// or you can import from your types file if you prefer.
export interface Show {
  artist: string;
  date: string;
  status: string; // 'Upcoming' | 'Past'
  imageSrc: string;
  description: string;
  highlights: string[];
  slug: string;
}

interface ScheduleCardProps {
  show: Show;
  index: number;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ show, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Format Date
  const dateObj = new Date(show.date);
  const day = dateObj.toLocaleDateString('en-US', { day: 'numeric' });
  const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
  const year = dateObj.toLocaleDateString('en-US', { year: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-blur-md transition-all duration-300 hover:border-yellow-500/30 hover:bg-neutral-900/60 ${isOpen ? 'ring-1 ring-yellow-500/20' : ''}`}
    >
      {/* Main Card Header / Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='cursor-pointer p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6'
      >
        {/* Date Badge */}
        <div className='flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-950 border border-white/5 shadow-inner'>
          <span className='text-xs font-bold text-yellow-500 uppercase tracking-wider'>
            {month}
          </span>
          <span className='text-2xl font-bold text-white leading-none mt-1'>
            {day}
          </span>
        </div>

        {/* Artist Info */}
        <div className='flex-grow min-w-0'>
          <div className='flex items-center gap-3 mb-1'>
            <h3 className='text-2xl font-bold text-white truncate group-hover:text-yellow-400 transition-colors'>
              {show.artist}
            </h3>
            {show.status === 'Past' && (
              <span className='px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-800 text-neutral-400 border border-neutral-700 uppercase tracking-widest'>
                Past
              </span>
            )}
          </div>
          <div className='flex items-center gap-4 text-sm text-neutral-400'>
            <div className='flex items-center gap-1.5'>
              <Calendar className='w-3.5 h-3.5' />
              <span>
                {month} {day}, {year}
              </span>
            </div>
            {show.highlights.length > 0 && (
              <div className='hidden sm:flex items-center gap-1.5'>
                <Music2 className='w-3.5 h-3.5' />
                <span>{show.highlights[1] || show.highlights[0]}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Icon */}
        <div className='absolute top-6 right-6 sm:relative sm:top-auto sm:right-auto'>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            className='p-2 rounded-full bg-white/5 text-neutral-400 group-hover:bg-yellow-500/10 group-hover:text-yellow-500 transition-colors'
          >
            <ChevronDown className='w-5 h-5' />
          </motion.div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className='px-6 pb-6 pt-0 border-t border-white/5'>
              <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 mt-6'>
                {/* Image */}
                <div className='relative aspect-video md:aspect-square rounded-lg overflow-hidden bg-neutral-800'>
                  <Image
                    src={show.imageSrc}
                    alt={show.artist}
                    fill
                    className='object-cover transform group-hover:scale-105 transition-transform duration-700'
                    sizes='(max-width: 768px) 100vw, 200px'
                  />
                </div>

                {/* Description & Tags */}
                <div className='flex flex-col justify-between'>
                  <div>
                    <h4 className='text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-2'>
                      About the Show
                    </h4>
                    <p className='text-neutral-300 leading-relaxed text-lg font-light'>
                      {show.description}
                    </p>
                  </div>

                  <div className='mt-6 flex flex-wrap gap-2'>
                    {show.highlights.map((tag, i) => (
                      <span
                        key={i}
                        className='inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300'
                      >
                        <Hash className='w-3 h-3 text-yellow-500/50' />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Link */}
                  <div className='mt-6 pt-4 border-t border-white/5 flex justify-end'>
                    <Link
                      href={show.slug}
                      className='flex items-center gap-2 text-sm font-medium text-yellow-500 hover:text-yellow-400 transition-colors'
                    >
                      View Artist Profile
                      <ArrowUpRight className='w-4 h-4' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ScheduleCard;
