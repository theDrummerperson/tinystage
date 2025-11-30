'use client';

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  Variants,
} from 'framer-motion';
import {
  Archive,
  ArrowLeft,
  Calendar,
  ChevronDown,
  Clock,
  Guitar,
  Heart,
  MapPin,
  Mic2,
  Music2,
  Play,
  Share2,
  Ticket,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// --- Mock Data ---
const setlist = [
  { title: 'More', type: 'Original', duration: '3:42', mood: 'Introspective' },
  {
    title: 'Bullet with Butterfly Wings',
    type: 'Cover',
    duration: '4:15',
    artist: 'The Smashing Pumpkins',
  },
  { title: 'Giving Up', type: 'Original', duration: '3:28', mood: 'Emotional' },
  { title: 'Meant to Break', type: 'Original', duration: '4:02', mood: 'Raw' },
  { title: 'Money', type: 'Cover', duration: '3:55', artist: 'Pink Floyd' },
  {
    title: 'Fake Friends',
    type: 'Original',
    duration: '3:18',
    mood: 'Defiant',
  },
  { title: 'Cable Car', type: 'Cover', duration: '4:33', artist: 'The Fray' },
  { title: 'Last Hope', type: 'Cover', duration: '4:07', artist: 'Paramore' },
  { title: 'Karma', type: 'Original', duration: '3:51', mood: 'Contemplative' },
  { title: 'Voices', type: 'Original', duration: '4:24', mood: 'Haunting' },
];

const UpcomingShowPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [showFullSetlist, setShowFullSetlist] = useState(false);

  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <main
      className='relative min-h-screen bg-neutral-950 text-white overflow-x-hidden selection:bg-yellow-500/30'
      ref={containerRef}
    >
      {/* --- Global Background Ambience --- */}
      <div className='fixed inset-0 z-0 pointer-events-none'>
        <div className='absolute inset-0 bg-neutral-950' />
        <div className='absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-neutral-900 to-transparent opacity-60' />

        {/* Noise Texture */}
        <div
          className='absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* --- Hero Section with Parallax --- */}
      <section className='relative h-screen min-h-[700px] flex items-end overflow-hidden'>
        <motion.div
          className='absolute inset-0 z-0'
          style={{ y: parallaxY, opacity }}
        >
          <Image
            src='/images/ellis/EllisHeader.png'
            alt='Ellis performing live'
            fill
            className='object-cover'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent' />
          <div className='absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-neutral-950/80' />
        </motion.div>

        <div className='container relative z-10 mx-auto px-4 pb-24 md:pb-32'>
          <motion.div
            className='max-w-5xl'
            variants={containerVariants}
            initial='hidden'
            animate='visible'
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className='inline-flex items-center gap-2 mb-8'
            >
              <span className='px-4 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 text-sm font-bold tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(234,179,8,0.2)]'>
                Show No. 03
              </span>
            </motion.div>

            {/* Title */}
            <h1 className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] text-white font-serif mb-8 drop-shadow-2xl'>
              <div className='overflow-hidden'>
                <motion.span variants={itemVariants} className='block'>
                  TinyStage
                </motion.span>
              </div>
              <div className='overflow-hidden'>
                <motion.span
                  variants={itemVariants}
                  className='block text-neutral-500 italic'
                >
                  Presents:
                </motion.span>
              </div>
              <div className='overflow-hidden'>
                <motion.div variants={itemVariants}>
                  <a
                    href='https://www.instagram.com/_ellis_music/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent hover:text-yellow-400 transition-colors duration-300'
                  >
                    Ellis
                  </a>
                </motion.div>
              </div>
            </h1>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className='flex flex-wrap gap-5'
            >
              <button className='group relative inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-neutral-950 font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]'>
                <span className='relative z-10 flex items-center gap-2'>
                  <Ticket className='w-5 h-5' />
                  Notify Me
                </span>
                <div className='absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300' />
              </button>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`group px-8 py-4 rounded-full border border-white/10 font-medium text-lg flex items-center gap-2 backdrop-blur-md transition-all hover:scale-105 ${
                  isLiked
                    ? 'bg-red-500/10 text-red-500 border-red-500/30'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                <Heart
                  className={`w-5 h-5 transition-transform ${isLiked ? 'fill-current scale-110' : 'group-hover:scale-110'}`}
                />
                {isLiked ? 'Liked' : 'Like'}
              </button>

              <button className='px-6 py-4 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 backdrop-blur-md transition-all hover:scale-105'>
                <Share2 className='w-5 h-5' />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className='absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-500'
        >
          <ChevronDown className='w-8 h-8' />
        </motion.div>
      </section>

      {/* --- Quick Stats Bar --- */}
      <div className='border-y border-white/5 bg-neutral-900/50 backdrop-blur-sm'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5'>
            {[
              { icon: Clock, label: '~60 min set' },
              { icon: Users, label: 'Intimate Venue' },
              { icon: Music2, label: '10 Songs' },
              { icon: Guitar, label: 'Acoustic' },
            ].map((stat, i) => (
              <div
                key={i}
                className='flex items-center justify-center gap-3 py-6 text-neutral-400'
              >
                <stat.icon className='w-4 h-4 text-yellow-500' />
                <span className='text-sm font-medium tracking-wide uppercase'>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Show Details --- */}
      <section className='py-24 md:py-32'>
        <div className='container mx-auto px-4'>
          <div className='grid lg:grid-cols-12 gap-16 items-start'>
            {/* Left Content: Bio */}
            <div className='lg:col-span-7 space-y-8'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className='text-4xl md:text-5xl font-bold text-white font-serif mb-8 leading-tight'>
                  An Intimate <br />
                  <span className='text-neutral-500'>Acoustic Set</span>
                </h2>
                <div className='prose prose-lg prose-invert text-neutral-300 font-light leading-relaxed'>
                  <p className='mb-6'>
                    <span className='text-yellow-500 font-medium'>Ellis</span>{' '}
                    (@_ellis_music) is a singer-songwriter from Erie, PA, whose
                    raw honesty blurs the lines between alternative rock and
                    emotional storytelling.
                  </p>
                  <p>
                    Backed by guitarist{' '}
                    <span className='text-white font-medium border-b border-yellow-500/50'>
                      Shawn Spencer
                    </span>
                    , Ellis’s stripped-down live performances hit with emotional
                    clarity—letting the lyrics lead and the melody linger.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Content: Event Card */}
            <div className='lg:col-span-5'>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className='relative rounded-3xl bg-neutral-900/50 border border-white/5 p-8 backdrop-blur-md shadow-2xl'
              >
                {/* Decorative Glow */}
                <div className='absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -mr-10 -mt-10' />

                <h3 className='text-xl font-bold text-white font-serif mb-8 flex items-center gap-3'>
                  <div className='w-2 h-8 bg-yellow-500 rounded-full' />
                  Event Details
                </h3>

                <ul className='space-y-6'>
                  {[
                    { icon: Calendar, label: 'Date', value: 'June 27, 2025' },
                    {
                      icon: MapPin,
                      label: 'Venue',
                      value: 'FEED Media Arts Center',
                    },
                    {
                      icon: Mic2,
                      label: 'Genre',
                      value: 'Acoustic / Alt-Rock',
                    },
                    {
                      icon: Guitar,
                      label: 'Featuring',
                      value: 'Shawn Spencer (Guitar)',
                    },
                  ].map((item, i) => (
                    <li key={i} className='flex items-start gap-4'>
                      <div className='p-2.5 rounded-xl bg-neutral-800 text-yellow-500 border border-white/5'>
                        <item.icon className='w-5 h-5' />
                      </div>
                      <div>
                        <span className='block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1'>
                          {item.label}
                        </span>
                        <span className='block text-white font-medium text-lg'>
                          {item.value}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Setlist --- */}
      <section className='py-24 bg-neutral-900/30 border-t border-white/5'>
        <div className='container mx-auto px-4 max-w-4xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-3xl md:text-5xl font-bold font-serif mb-4'>
              The Setlist
            </h2>
            <p className='text-neutral-400'>
              A curated journey through emotion and sound.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='grid md:grid-cols-2 gap-4'
          >
            <AnimatePresence>
              {setlist
                .slice(0, showFullSetlist ? setlist.length : 6)
                .map((song) => (
                  <motion.div
                    key={song.title}
                    variants={itemVariants}
                    layout
                    className='group relative overflow-hidden rounded-xl bg-neutral-900 border border-white/5 p-5 hover:border-yellow-500/30 hover:bg-neutral-800 transition-all duration-300'
                  >
                    <div className='flex items-center justify-between relative z-10'>
                      <div>
                        <h3 className='font-bold text-white text-lg group-hover:text-yellow-500 transition-colors'>
                          {song.title}
                        </h3>
                        <div className='flex items-center gap-2 mt-1'>
                          {song.type === 'Cover' && (
                            <Play className='w-3 h-3 text-neutral-500 fill-current' />
                          )}
                          <p className='text-neutral-500 text-sm'>
                            {song.type === 'Cover'
                              ? `by ${song.artist}`
                              : song.mood}
                          </p>
                        </div>
                      </div>

                      <div className='text-right'>
                        <span className='block text-neutral-600 text-sm font-mono mb-1'>
                          {song.duration}
                        </span>
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${song.type === 'Original' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-neutral-800 text-neutral-400'}`}
                        >
                          {song.type}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>

          {setlist.length > 6 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className='text-center mt-12'
            >
              <button
                onClick={() => setShowFullSetlist(!showFullSetlist)}
                className='inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 text-sm font-medium transition-colors'
              >
                {showFullSetlist
                  ? 'Show Less'
                  : `View All ${setlist.length} Songs`}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${showFullSetlist ? 'rotate-180' : ''}`}
                />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* --- Footer CTA --- */}
      <section className='py-24'>
        <div className='container mx-auto px-4 text-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='inline-block p-1 rounded-full bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800'
          >
            <div className='bg-neutral-950 rounded-full px-10 py-12 md:px-20 border border-white/5'>
              <h2 className='text-2xl md:text-4xl font-bold font-serif mb-8 text-white'>
                Explore More Live Music
              </h2>
              <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                <Link
                  href='/shows'
                  className='w-full sm:w-auto px-8 py-4 rounded-full bg-white text-neutral-950 font-bold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2'
                >
                  <ArrowLeft className='w-5 h-5' />
                  Back to All Shows
                </Link>
                <Link
                  href='/calendar'
                  className='w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 font-bold transition-colors flex items-center justify-center gap-2'
                >
                  View Past Performances
                  <Archive className='w-5 h-5' />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default UpcomingShowPage;
