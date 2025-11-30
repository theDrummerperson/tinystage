'use client';

import { motion, Variants } from 'framer-motion';
import {
  ArrowRight,
  Globe,
  HandHeart,
  Mic2,
  Sparkles,
  Ticket,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const AboutPage = () => {
  return (
    <main className='relative min-h-screen bg-neutral-950 text-white overflow-x-hidden selection:bg-yellow-500/30'>
      {/* --- Global Background Ambience --- */}
      <div className='fixed inset-0 z-0 pointer-events-none'>
        {/* Background Image/Gradient Layer */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/80 to-neutral-950' />
          {/* Subtle animated orb */}
          <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] animate-pulse duration-[8s]' />
          <div className='absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]' />
        </div>

        {/* Noise Texture */}
        <div
          className='absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* --- Hero Section --- */}
        <section className='pt-32 md:pt-48 pb-20 md:pb-32 text-center max-w-5xl mx-auto'>
          <motion.div
            initial='hidden'
            animate='visible'
            variants={staggerContainer}
          >
            {/* Eyebrow */}
            <motion.div
              variants={fadeInUp}
              className='flex justify-center mb-6'
            >
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md'>
                <div className='w-2 h-2 rounded-full bg-yellow-500 animate-pulse' />
                <span className='text-xs font-bold text-neutral-300 tracking-widest uppercase'>
                  Our Mission
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className='text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 font-serif leading-[1.1]'
            >
              Local Sound. <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-200 to-yellow-500 bg-[length:200%_auto] animate-shine'>
                Global Stage.
              </span>
            </motion.h1>

            {/* Divider */}
            <motion.div
              variants={fadeInUp}
              className='w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mx-auto mb-10'
            />

            {/* Main Description */}
            <motion.div
              variants={fadeInUp}
              className='relative bg-neutral-900/40 border border-white/5 rounded-2xl p-8 md:p-10 backdrop-blur-sm max-w-3xl mx-auto'
            >
              <Sparkles className='absolute -top-6 -left-6 w-12 h-12 text-yellow-500/20' />
              <p className='text-xl md:text-2xl text-neutral-300 leading-relaxed font-light'>
                TinyStage is a monthly, community-powered concert series
                co-created by A. Ilyas O. Abukar and Rebecca Kuhn.
                <span className='text-white font-medium block mt-4'>
                  We partner with Erie-area musicians to stage intimate,
                  stripped-down shows that are both live and live-streamed to
                  the world.
                </span>
              </p>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              variants={fadeInUp}
              className='mt-12 text-neutral-500 italic text-lg md:text-xl font-serif'
            >
              "What would it look like if Erie's arts scene truly reflected the
              city's cultural richness?"
            </motion.blockquote>
          </motion.div>
        </section>

        {/* --- Founders Section --- */}
        <section className='py-20 border-t border-white/5'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-3xl md:text-4xl font-bold font-serif mb-4'>
              Meet the Founders
            </h2>
            <p className='text-neutral-400'>
              The visionaries behind the lens and the soundboard.
            </p>
          </motion.div>

          <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            {/* Founder 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='group relative h-[400px] rounded-2xl overflow-hidden'
            >
              <Image
                src='/images/founders/awes.jpg'
                alt='A. Ilyas O. Abukar'
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity' />
              <div className='absolute bottom-0 left-0 p-8'>
                <h3 className='text-2xl font-bold text-white mb-1'>
                  A. Ilyas O. Abukar
                </h3>
                <p className='text-yellow-500 font-medium tracking-wide text-sm uppercase'>
                  Co-Founder & Producer
                </p>
              </div>
            </motion.div>

            {/* Founder 2 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='group relative h-[400px] rounded-2xl overflow-hidden'
            >
              <Image
                src='/images/founders/becca.jpg'
                alt='Rebecca Kuhn'
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity' />
              <div className='absolute bottom-0 left-0 p-8'>
                <h3 className='text-2xl font-bold text-white mb-1'>
                  Rebecca Kuhn
                </h3>
                <p className='text-yellow-500 font-medium tracking-wide text-sm uppercase'>
                  Co-Founder & Producer
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- Support Section --- */}
        <section className='py-24 relative'>
          <div className='absolute inset-0 bg-neutral-900/30 -skew-y-3 transform origin-left z-0' />

          <div className='relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center'>
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-500/10 mb-8 border border-yellow-500/20'>
                <Mic2 className='w-8 h-8 text-yellow-500' />
              </div>
              <h2 className='text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight'>
                Fuel the <br />
                <span className='text-yellow-500'>Movement.</span>
              </h2>
              <p className='text-lg text-neutral-400 mb-8 leading-relaxed'>
                TinyStage is a grassroots music series powered by community. We
                aren't just putting on shows; we are building an ecosystem where
                art flourishes.
              </p>

              <Link
                href='/support'
                className='group inline-flex items-center justify-center px-8 py-4 bg-white text-neutral-950 text-lg font-bold rounded-full hover:bg-yellow-500 transition-all duration-300 hover:scale-105 shadow-xl'
              >
                Become a Supporter
                <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </Link>
            </motion.div>

            {/* Right Content - Feature Grid */}
            <div className='grid gap-6'>
              {[
                {
                  icon: HandHeart,
                  title: 'Artist Appreciation',
                  desc: 'All proceeds from this event go directly to the artists.',
                },
                {
                  icon: Ticket,
                  title: 'Accessible to All',
                  desc: 'Keeping performances free and accessible removes barriers to experiencing live culture.',
                },
                {
                  icon: Globe,
                  title: 'Global Amplification',
                  desc: 'Our high-fidelity livestreams bring local Erie brilliance to screens around the world.',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                  className='flex items-start gap-5 p-6 rounded-xl bg-neutral-900/50 border border-white/5 hover:border-yellow-500/30 transition-colors backdrop-blur-sm'
                >
                  <div className='flex-shrink-0 p-3 rounded-lg bg-neutral-800 text-yellow-500'>
                    <item.icon className='w-6 h-6' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-white mb-2'>
                      {item.title}
                    </h3>
                    <p className='text-neutral-400 text-sm leading-relaxed'>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
