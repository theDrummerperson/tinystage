'use client';

import { motion, Variants } from 'framer-motion';
import { Clapperboard, ExternalLink, Radio, Rss, UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// --- Data ---
const stepsData = [
  {
    icon: UserPlus,
    title: 'Create Account',
    description:
      'Sign up for a free fan account on Bandcamp to follow artists and receive show notifications.',
  },
  {
    icon: Rss,
    title: 'Follow FEED',
    description:
      'Visit our partner\'s page and click "Follow". This ensures you get an alert the moment we go live.',
  },
  {
    icon: Clapperboard,
    title: 'Tune In Live',
    description:
      'Check your email or Bandcamp feed on show night for the direct link. The stream starts when the music starts.',
  },
];

const LivestreamPage = () => {
  return (
    <main className='relative min-h-screen bg-neutral-950 text-white overflow-x-hidden selection:bg-yellow-500/30'>
      {/* --- Global Background Ambience --- */}
      <div className='fixed inset-0 z-0 pointer-events-none'>
        <div className='absolute inset-0 bg-neutral-950' />
        {/* Subtle animated gradient orbs */}
        <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] animate-pulse duration-[8s]' />
        <div className='absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[100px]' />

        {/* Noise Texture */}
        <div
          className='absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* --- Hero Section --- */}
      <section className='relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden'>
        {/* Hero Background Image */}
        <div className='absolute inset-0 z-0'>
          <Image
            src='/images/dejalive.jpg'
            alt='Deja Blue performing live'
            fill
            className='object-cover opacity-40 blur-[2px] scale-105'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/40 to-neutral-950' />
          <div className='absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-neutral-950/80' />
        </div>

        <div className='container relative z-10 px-4 text-center'>
          <motion.div
            initial='hidden'
            animate='visible'
            variants={containerVariants}
            className='max-w-4xl mx-auto'
          >
            {/* Live Badge */}
            <motion.div
              variants={itemVariants}
              className='flex justify-center mb-8'
            >
              <div className='inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-md'>
                <span className='relative flex h-3 w-3'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-red-500'></span>
                </span>
                <span className='text-sm font-bold text-red-500 tracking-widest uppercase'>
                  Global Livestream
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className='text-5xl md:text-7xl lg:text-8xl font-bold font-serif leading-none tracking-tight mb-8 text-white drop-shadow-2xl'
            >
              From Erie <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-600'>
                To The World.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className='text-xl md:text-2xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md'
            >
              Experience the intimacy of TinyStage from anywhere.{' '}
              <br className='hidden md:block' />
              Broadcast live in high-fidelity audio and video.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* --- Partnership Section --- */}
      <section className='relative py-24 bg-neutral-900/30 border-y border-white/5 backdrop-blur-sm'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto'
          >
            {/* Left: Logo Card */}
            <div className='relative group'>
              <div className='absolute inset-0 bg-gradient-to-tr from-yellow-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700' />
              <div className='relative bg-neutral-950 border border-white/10 rounded-3xl p-12 flex items-center justify-center h-[300px] shadow-2xl'>
                <Image
                  src='/images/feedlogo.png'
                  alt='FEED Media Arts Center'
                  width={300}
                  height={150}
                  className='w-auto h-auto max-w-[220px] md:max-w-[280px] opacity-90 group-hover:opacity-100 transition-opacity'
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className='space-y-8'>
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10'>
                <Radio className='w-4 h-4 text-yellow-500' />
                <span className='text-xs font-bold text-neutral-400 tracking-wider uppercase'>
                  Streaming Partner
                </span>
              </div>

              <h2 className='text-4xl md:text-5xl font-bold font-serif text-white leading-tight'>
                A Dual Experience
              </h2>

              <div className='space-y-6 text-lg text-neutral-400 leading-relaxed'>
                <p>
                  Every TinyStage performance is a unique event happening live
                  at the
                  <a
                    href='https://feed.art'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-yellow-500 hover:text-yellow-400 font-medium ml-1.5 transition-colors border-b border-yellow-500/30 hover:border-yellow-500 pb-0.5'
                  >
                    FEED Media Arts Center
                  </a>{' '}
                  in Downtown Erie.
                </p>
                <p>
                  Through our partnership with FEED, we leverage
                  state-of-the-art broadcast technology to bring the raw,
                  unedited energy of our stage directly to your
                  screen—completely free.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Steps Section --- */}
      <section className='relative py-24 md:py-32 overflow-hidden'>
        {/* Background Layer for this section */}
        <div className='absolute inset-0 z-0'>
          <Image
            src='/images/ellis/livebg.jpg'
            alt='Background'
            fill
            className='object-cover opacity-10 blur-sm'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-neutral-950' />
        </div>

        <div className='container relative z-10 px-4 max-w-5xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-20'
          >
            <h2 className='text-3xl md:text-5xl font-bold font-serif mb-6'>
              How to Tune In
            </h2>
            <p className='text-xl text-neutral-400'>
              Your front-row seat is just three steps away.
            </p>
          </motion.div>

          <div className='relative'>
            {/* Connecting Line (Desktop) */}
            <div className='absolute left-[27px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-yellow-500/50 via-yellow-500/20 to-transparent hidden md:block' />

            <div className='space-y-12'>
              {stepsData.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className='relative flex flex-col md:flex-row gap-8 items-start group'
                >
                  {/* Icon Bubble */}
                  <div className='relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl bg-neutral-900 border border-yellow-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.1)] group-hover:border-yellow-500 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300'>
                    <step.icon className='w-6 h-6 text-yellow-500' />
                  </div>

                  {/* Content Card */}
                  <div className='flex-grow p-8 rounded-3xl bg-neutral-900/60 border border-white/5 backdrop-blur-md hover:bg-neutral-800/60 hover:border-white/10 transition-all duration-300'>
                    <h3 className='text-2xl font-bold text-white mb-3 flex items-center gap-3'>
                      <span className='text-yellow-500/50 text-lg font-serif italic'>
                        0{index + 1}.
                      </span>
                      {step.title}
                    </h3>
                    <p className='text-neutral-400 leading-relaxed'>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className='mt-20 text-center'
          >
            <Link
              href='https://feedart.bandcamp.com'
              target='_blank'
              rel='noopener noreferrer'
              className='group relative inline-flex items-center justify-center px-10 py-5 bg-yellow-500 text-neutral-950 text-xl font-bold rounded-full overflow-hidden transition-transform hover:scale-105 shadow-[0_0_40px_rgba(234,179,8,0.3)]'
            >
              <span className='relative z-10 flex items-center gap-3'>
                Visit FEED on Bandcamp <ExternalLink className='w-5 h-5' />
              </span>
              <div className='absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300' />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default LivestreamPage;
