'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
  Variants,
} from 'framer-motion';
import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

// Animation Variants for Staggered Entrance
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Custom ease curve
    },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      delay: 0.5,
    },
  },
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  // 1. HIGH PERFORMANCE MOUSE TRACKING
  // Using useMotionValue avoids React re-renders on mousemove
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Dynamic background gradient based on mouse position
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(234, 179, 8, 0.08), transparent 80%)`;

  // Parallax for background image
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className='relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-neutral-950 text-white selection:bg-yellow-500/30'
    >
      {/* --- CINEMATIC BACKGROUND LAYERS --- */}

      {/* 1. Base Image with Parallax */}
      <motion.div className='absolute inset-0 z-0' style={{ y: bgY }}>
        <Image
          src='/images/ellis/livebg2.jpg'
          alt='TinyStage Ambience'
          fill
          priority
          className='object-cover opacity-20 blur-[2px] grayscale-[0.3]'
          sizes='100vw'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-neutral-950' />
      </motion.div>

      {/* 2. Interactive Spotlight (GPU Accelerated) */}
      <motion.div
        className='absolute inset-0 z-[1] pointer-events-none mix-blend-screen'
        style={{ background: spotlight }}
      />

      {/* 3. Noise Texture */}
      <div
        className='absolute inset-0 z-[2] opacity-[0.04] mix-blend-overlay pointer-events-none'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* --- CONTENT GRID --- */}
      <div className='relative z-10 container mx-auto px-4 md:px-6'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='grid lg:grid-cols-12 gap-12 items-center'
        >
          {/* Left Column: Logo (Visual Anchor) */}
          <div className='lg:col-span-5 order-2 lg:order-1 flex justify-center lg:justify-end'>
            <motion.div
              variants={logoVariants}
              className='relative group cursor-default'
            >
              {/* Glow Effect behind logo */}
              <div className='absolute inset-0 bg-yellow-500/20 rounded-full blur-3xl group-hover:bg-yellow-500/30 transition-colors duration-500' />

              <div className='relative w-[200px] h-[200px] md:w-[280px] md:h-[280px]'>
                <Image
                  src='/images/TSlogo.png'
                  alt='TinyStage Logo'
                  fill
                  className='object-contain drop-shadow-2xl'
                  priority
                />
                {/* Rotating Ring Border */}
                <div className='absolute inset-0 border border-dashed border-white/20 rounded-full animate-[spin_20s_linear_infinite]' />
              </div>
            </motion.div>
          </div>

          {/* Right Column: Typography & Actions */}
          <div className='lg:col-span-7 order-1 lg:order-2 text-center lg:text-left'>
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className='flex justify-center lg:justify-start mb-6'
            >
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm'>
                <Sparkles className='w-4 h-4 text-yellow-500' />
                <span className='text-xs font-bold text-neutral-300 tracking-widest uppercase'>
                  Erie's Premier Concert Series
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <h1 className='relative font-bold leading-[0.9] tracking-tighter mb-8'>
              <motion.div variants={itemVariants} className='overflow-hidden'>
                <span className='block text-6xl sm:text-7xl md:text-8xl text-neutral-200'>
                  TINY
                </span>
              </motion.div>
              <motion.div variants={itemVariants} className='overflow-hidden'>
                <span className='block text-[5rem] sm:text-[6rem] md:text-[8rem] font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-200 to-yellow-600 drop-shadow-sm'>
                  STAGE
                </span>
              </motion.div>
            </h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className='text-lg md:text-xl text-neutral-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed'
            >
              Experience the raw power of live music. Stripped down, intimate
              performances from the most compelling artists in the region.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className='flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start'
            >
              <Link
                href='/shows'
                className='group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-neutral-950 font-bold text-lg rounded-full transition-all hover:bg-yellow-400 hover:scale-105 shadow-[0_0_20px_rgba(234,179,8,0.3)]'
              >
                See Upcoming Shows
                <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </Link>

              <Link
                href='/livestream'
                className='group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white/5 text-white font-medium text-lg rounded-full border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-yellow-500/50'
              >
                <PlayCircle className='mr-2 w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform' />
                Watch Livestream
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none z-[5]' />
    </section>
  );
}
