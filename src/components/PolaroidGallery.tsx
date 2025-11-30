'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface PolaroidGalleryProps {
  images: string[];
}

const PolaroidGallery: React.FC<PolaroidGalleryProps> = ({ images }) => {
  // If no images are provided, don't render
  if (!images || images.length === 0) return null;

  return (
    <div className='relative w-full h-[400px] md:h-[500px] flex items-center justify-center py-10'>
      {images.map((src, index) => {
        // Calculate random rotation for the "scattered" look
        // We use a deterministic randomness based on index to avoid hydration mismatch
        const rotation = (index % 2 === 0 ? 1 : -1) * (((index * 3) % 10) + 2);
        const xOffset = (index % 2 === 0 ? 1 : -1) * ((index * 20) % 60);

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: rotation,
              x: index === 0 ? 0 : xOffset, // Keep first image centered, scatter others slightly
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: index * 0.15,
              type: 'spring',
              bounce: 0.4,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 0,
              zIndex: 50,
              transition: { duration: 0.2 },
            }}
            className='absolute p-3 pb-10 bg-white shadow-2xl rounded-sm transform-gpu border border-neutral-200'
            style={{
              maxWidth: '280px',
              width: '60vw',
              zIndex: index, // Stack order
            }}
          >
            {/* Glossy overlay effect */}
            <div className='absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none z-10 rounded-sm' />

            <div className='relative aspect-[4/5] bg-neutral-100 overflow-hidden shadow-inner'>
              <Image
                src={src}
                alt={`TinyStage Show Highlight ${index + 1}`}
                fill
                className='object-cover sepia-[0.2]'
                sizes='(max-width: 768px) 60vw, 280px'
              />
            </div>

            {/* Tape effect (pure CSS) */}
            {index % 2 !== 0 && (
              <div className='absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/30 backdrop-blur-sm border-l border-r border-white/40 rotate-2 shadow-sm transform z-20' />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default PolaroidGallery;
