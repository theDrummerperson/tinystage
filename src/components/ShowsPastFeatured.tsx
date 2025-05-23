// src/components/ShowsPastFeatured.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { PastShow } from '@/data/pastShows'; // Ensure this path is correct and PastShow is exported

// >>> This is the interface defining the props <<<
export interface ShowsPastFeaturedProps {
  // Ensure 'export' if used across files, though not strictly needed if only used here and imported type is correct
  show: PastShow;
  sectionTitle?: string;
  sectionSubtitle?: string;
  highlightLabel?: string;
  headingLevel?: 'h1' | 'h2';
}

// >>> This is how the component is typed <<<
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
    // ... other properties from show that you use ...
    performanceDate,
    tagline,
    flyerImageUrl,
    flyerImageAlt,
    description,
    artistPageLink,
    featuredQuote,
    bgColor = '#F0EBE5',
    primaryAccentColor = '#8A0303',
    textColor = 'text-gray-800',
    tapeColor = 'bg-yellow-300/80 text-yellow-900',
  } = show; // Make sure all props from 'show' that you intend to use are destructured or accessed via show.propertyName

  const HeadingTag = headingLevel;

  return (
    // ... your JSX using the props like artistName, flyerImageUrl, etc. ...
    <section
      style={{ backgroundColor: bgColor }}
      className='pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden relative'
      aria-labelledby={`featured-past-show-heading-${id}`} // id is needed from show
    >
      <div className='container mx-auto px-4'>
        <header className='mb-12 md:mb-16 text-center'>
          <HeadingTag
            id={`featured-past-show-heading-${id}`} // id is needed from show
            className={`text-2xl sm:text-3xl font-semibold tracking-tight mb-2 ${headingLevel === 'h1' ? 'md:text-4xl' : ''}`}
            style={{ color: primaryAccentColor }}
          >
            {sectionTitle}
          </HeadingTag>
          <p
            className={`text-lg md:text-xl ${textColor.includes('text-') ? textColor : 'text-gray-700'} max-w-2xl mx-auto`}
          >
            {sectionSubtitle}
          </p>
        </header>

        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center relative'>
          {/* Image Block */}
          <Link
            href={artistPageLink || '#'}
            className='group relative block'
            aria-disabled={!artistPageLink}
            tabIndex={!artistPageLink ? -1 : 0}
          >
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className='transform rotate-[-2deg] shadow-2xl rounded-2xl overflow-hidden border-4 border-white'
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

          {/* Text Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='relative z-10'
          >
            <div
              className={`absolute -top-8 -left-2 md:-left-4 ${tapeColor} px-4 py-1.5 text-xs font-bold uppercase tracking-widest transform -rotate-3 shadow-lg rounded-sm`}
            >
              {highlightLabel}
            </div>
            <h2
              className='text-4xl sm:text-5xl font-extrabold mb-3 md:mb-4'
              style={{ color: primaryAccentColor }}
            >
              {artistName}
            </h2>
            <p
              className={`text-sm font-semibold ${textColor.includes('text-') ? textColor.replace('800', '600') : 'text-gray-600'} mb-6 uppercase tracking-wider`}
            >
              Performed: {performanceDate}
            </p>
            <p
              className={`${textColor.includes('text-') ? textColor : 'text-gray-800'} text-base leading-relaxed mb-8 max-w-prose`}
            >
              {description}
            </p>
            {artistPageLink && (
              <Link
                href={artistPageLink}
                className='inline-block text-white px-8 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm uppercase tracking-wide'
                style={{ backgroundColor: primaryAccentColor }}
              >
                View Performance Details
                <span aria-hidden='true' className='ml-2'>
                  →
                </span>
              </Link>
            )}
            {featuredQuote && (
              <div className='absolute bottom-[-3rem] right-0 md:right-[-1rem] bg-white/90 px-4 py-2.5 shadow-lg max-w-[200px] sm:max-w-[220px] text-xs italic text-gray-600 transform rotate-2 border border-gray-200/80 rounded-sm'>
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
