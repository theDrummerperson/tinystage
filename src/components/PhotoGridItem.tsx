// src/components/PhotoGridItem.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Photo {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  link?: string;
}

interface PhotoGridItemProps {
  photo: Photo;
  isPriority: boolean;
  onImageClick: () => void;
}

const PhotoGridItem: React.FC<PhotoGridItemProps> = React.memo(
  ({ photo, isPriority, onImageClick }) => {
    const { src, alt, title, subtitle, link } = photo;
    // Subtle tilt, reduced scale slightly to feel more contained within the perspective
    const perspectiveHoverClasses =
      'group-hover:[transform:perspective(1000px)_rotateY(1deg)_rotateX(0.5deg)_scale(1.02)]';

    const imageCardContent = (
      // p-0.5 or p-1 can create a tiny visual separation if the image bg is different from card bg
      <div className='w-full h-full flex justify-center items-center p-0.5'>
        <Image
          src={src}
          alt={alt}
          fill
          sizes='(max-width: 639px) 100vw, (min-width: 640px) 50vw, (min-width: 1024px) 33vw'
          className='object-contain w-full h-full transform transition-transform duration-300 ease-in-out' // No scale needed here as parent card scales
          loading={isPriority ? 'eager' : 'lazy'}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-[rgba(var(--brand-black-rgb),0.85)] via-[rgba(var(--brand-black-rgb),0.5)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col justify-end p-4 md:p-6 pointer-events-none'>
          <div className='transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out pointer-events-auto'>
            {title && (
              <h3 className='text-xl font-semibold text-brand-white'>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className='mt-1 text-sm text-brand-gray-light'>{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    );

    // Define a custom softer shadow in tailwind.config.ts, e.g., 'soft-xl'
    // 'shadow-soft-xl': '0 8px 25px -5px rgba(var(--brand-black-rgb), 0.15), 0 5px 15px -6px rgba(var(--brand-black-rgb), 0.1)'
    // For now, we use shadow-2xl as per your existing code, but recommend defining a softer one.
    const cardWrapperClasses = `
    relative overflow-hidden rounded-xl 
    bg-brand-gray-dark/80  // Slightly more transparent background for a bit of depth against section bg
    aspect-[4/3] md:aspect-[3/2] 
    transition-all duration-300 ease-out 
    ${perspectiveHoverClasses}
    ring-1 ring-inset ring-white/10  // Subtle inner "matting" frame
    shadow-2xl group enhanced-hover   // Consider replacing shadow-2xl with a custom softer shadow
  `;

    const commonProps = {
      className: cardWrapperClasses,
      role: link ? undefined : 'button',
      tabIndex: link ? undefined : 0,
      onClick: link ? undefined : onImageClick,
      onKeyDown: link
        ? undefined
        : (e: React.KeyboardEvent) =>
            (e.key === 'Enter' || e.key === ' ') && onImageClick(),
      'aria-label': link
        ? title || alt
        : `View image: ${title || alt} in lightbox`,
    };

    return link ? (
      <Link href={link} legacyBehavior>
        <a {...commonProps}>
          {' '}
          {/* Apply commonProps to the anchor tag */}
          {imageCardContent}
        </a>
      </Link>
    ) : (
      <div {...commonProps}>
        {' '}
        {/* Apply commonProps to the div */}
        {imageCardContent}
      </div>
    );
  },
);

PhotoGridItem.displayName = 'PhotoGridItem';
export default PhotoGridItem;
export type { Photo as PhotoGridItemData };
