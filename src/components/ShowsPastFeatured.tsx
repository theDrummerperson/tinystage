// src/components/ShowsPastFeatured.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { PastShow } from '@/data/pastShows';

export interface ShowsPastFeaturedProps {
  show: PastShow;
  sectionTitle?: string;
  sectionSubtitle?: string;
  highlightLabel?: string;
  headingLevel?: 'h1' | 'h2';
}

const ShowsPastFeatured: React.FC<ShowsPastFeaturedProps> = ({
  show,
  sectionTitle = 'Previously On TinyStage',
  sectionSubtitle = 'A special look back at an unforgettable performance.',
  highlightLabel = 'Recent Highlight',
  headingLevel = 'h1',
}) => {
  const {
    id,
    artistName,
    performanceDate,
    tagline,
    flyerImageUrl,
    flyerImageAlt,
    description,
    artistPageLink,
    featuredQuote,
  } = show;

  const HeadingTag = headingLevel;

  return (
    <section
      className='bg-brand-gray-dark text-brand-white pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden relative' // Ensure 'relative' for absolute positioning of children
      aria-labelledby={`featured-past-show-heading-${id}`}
    >
      {/* Content needs to be relatively positioned with a z-index higher than the background */}
      <div className='container mx-auto px-4 relative z-10'>
        <header className='mb-12 md:mb-16 text-center'>
          <HeadingTag
            id={`featured-past-show-heading-${id}`}
            className={`text-2xl sm:text-3xl font-semibold tracking-tight mb-2 text-brand-yellow ${headingLevel === 'h1' ? 'md:text-4xl' : ''}`}
          >
            {sectionTitle}
          </HeadingTag>
          <p className='text-lg md:text-xl text-brand-gray-light max-w-2xl mx-auto'>
            {sectionSubtitle}
          </p>
        </header>

        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center'>
          {/* Image Block */}
          <Link
            href={artistPageLink || '#'}
            className='group relative block' // Keep 'relative' if it has its own absolute children
            aria-disabled={!artistPageLink}
            tabIndex={!artistPageLink ? -1 : 0}
          >
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className='transform rotate-[-2deg] shadow-2xl rounded-2xl overflow-hidden border-4 border-brand-yellow'
            >
              <Image
                src={flyerImageUrl}
                alt={flyerImageAlt}
                width={1200}
                height={800}
                className='object-cover w-full h-full'
                priority
              />
              <div className='absolute bottom-4 left-4 bg-black/80 text-white text-xs uppercase tracking-wider px-3 py-1.5 font-mono rounded-sm shadow-md'>
                {artistName} – {tagline || `Live ${performanceDate}`}
              </div>
            </motion.div>
          </Link>

          {/* Text Block - ensure it's above the background */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='relative z-10' // Ensures this content is above the z-0 background SVGs
          >
            <div className='absolute -top-8 -left-2 md:-left-4 bg-brand-yellow text-brand-black px-4 py-1.5 text-xs font-bold uppercase tracking-widest transform -rotate-3 shadow-lg rounded-sm'>
              {highlightLabel}
            </div>
            <h2 className='text-4xl sm:text-5xl font-extrabold mb-3 md:mb-4 text-brand-yellow'>
              {artistName}
            </h2>
            <p className='text-sm font-semibold text-brand-gray-light mb-6 uppercase tracking-wider'>
              Performed: {performanceDate}
            </p>
            <p className='text-brand-white text-base leading-relaxed mb-8 max-w-prose'>
              {description}
            </p>
            {artistPageLink && (
              <Link
                href={artistPageLink}
                className='inline-block bg-brand-yellow text-brand-black px-8 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm uppercase tracking-wide'
              >
                View Performance Details
                <span aria-hidden='true' className='ml-2'>
                  →
                </span>
              </Link>
            )}
            {featuredQuote && (
              <div className='absolute bottom-[-3rem] right-0 md:right-[-1rem] bg-brand-gray-dark text-brand-gray-light px-4 py-2.5 shadow-lg max-w-[200px] sm:max-w-[220px] text-xs italic transform rotate-2 border border-brand-gray-medium/50 rounded-sm'>
                "{featuredQuote}"
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShowsPastFeatured;
