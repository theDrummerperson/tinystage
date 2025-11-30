'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  Check,
  Facebook,
  Instagram,
  Loader2,
  Mail,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

// --- Configuration ---
const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/tinystageerie',
    icon: Facebook,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/tinystage_erie',
    icon: Instagram,
  },
  { name: 'YouTube', href: 'https://www.youtube.com/GetTiny', icon: Youtube },
];

const NAV_COLUMNS = [
  {
    title: 'Discover',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Show Schedule', href: '/calendar' },
      { label: 'Past Performances', href: '/shows' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Get Involved', href: '/support' },
      { label: 'Merchandise', href: '/merch' },
      { label: 'Contact', href: 'mailto:thetinystage@gmail.com' },
    ],
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      // randomly succeed or fail for demo
      const isSuccess = Math.random() > 0.1;
      setStatus(isSuccess ? 'success' : 'error');
      if (isSuccess) setEmail('');

      // Reset after delay
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <footer className='relative bg-neutral-950 text-white overflow-hidden pt-24 pb-12 selection:bg-yellow-500/30'>
      {/* --- Cinematic Background --- */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* Top Gradient Fade */}
        <div className='absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-neutral-950 to-transparent z-10' />

        {/* Animated Aurora Gradients */}
        <div className='absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10s]' />
        <div className='absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] mix-blend-screen' />

        {/* Noise Texture */}
        <div
          className='absolute inset-0 opacity-[0.03] mix-blend-overlay'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className='container relative z-20 mx-auto px-4 md:px-6'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='grid lg:grid-cols-12 gap-12 lg:gap-8 mb-20'
        >
          {/* Brand Column */}
          <motion.div
            variants={itemVariants}
            className='lg:col-span-4 space-y-6'
          >
            <Link href='/' className='inline-block group'>
              <div className='flex items-center gap-3'>
                <div className='relative w-10 h-10 transition-transform duration-500 group-hover:rotate-12'>
                  <Image
                    src='/images/Logo2.png'
                    alt='TinyStage Logo'
                    fill
                    className='object-contain'
                  />
                </div>
                <span className='font-serif text-2xl font-bold tracking-tight text-white group-hover:text-yellow-500 transition-colors'>
                  TinyStage
                </span>
              </div>
            </Link>
            <p className='text-neutral-400 leading-relaxed max-w-sm'>
              Erie's premier intimate concert series. Celebrating diverse
              musical talent and fostering community through the raw power of
              live performance.
            </p>
            <div className='flex items-center gap-4'>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='p-2 rounded-full bg-white/5 border border-white/5 text-neutral-400 hover:text-white hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300 group'
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className='w-5 h-5 transition-transform group-hover:scale-110' />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Columns */}
          <motion.div
            variants={itemVariants}
            className='lg:col-span-4 grid grid-cols-2 gap-8'
          >
            {NAV_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className='font-serif text-lg font-semibold text-white mb-6 relative inline-block'>
                  {col.title}
                  <span className='absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-500 rounded-full' />
                </h3>
                <ul className='space-y-3'>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className='text-neutral-400 hover:text-yellow-500 transition-colors text-sm font-medium inline-flex items-center group'
                      >
                        <span className='w-0 overflow-hidden transition-all duration-300 group-hover:w-3 opacity-0 group-hover:opacity-100 text-yellow-500 mr-0 group-hover:mr-1'>
                          •
                        </span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Newsletter Column */}
          <motion.div variants={itemVariants} className='lg:col-span-4'>
            <div className='bg-neutral-900/50 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm'>
              <h3 className='font-serif text-xl font-semibold text-white mb-2'>
                Join the Inner Circle
              </h3>
              <p className='text-neutral-400 text-sm mb-6'>
                Get early access to tickets, exclusive artist interviews, and
                behind-the-scenes content.
              </p>

              <form onSubmit={handleSubscribe} className='relative'>
                <div className='relative group'>
                  <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-yellow-500 transition-colors' />
                  <input
                    type='email'
                    placeholder='your.email@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    className='w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-10 pr-12 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all'
                    required
                  />
                  <button
                    type='submit'
                    disabled={status === 'loading' || status === 'success'}
                    className='absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-yellow-500 text-neutral-950 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                  >
                    {status === 'loading' ? (
                      <Loader2 className='w-4 h-4 animate-spin' />
                    ) : (
                      <ArrowRight className='w-4 h-4' />
                    )}
                  </button>
                </div>

                {/* Status Feedback */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className='absolute top-full left-0 mt-2 flex items-center gap-2 text-xs text-green-400 font-medium'
                    >
                      <Check className='w-3 h-3' />
                      <span>You're on the list!</span>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className='absolute top-full left-0 mt-2 flex items-center gap-2 text-xs text-red-400 font-medium'
                    >
                      <AlertCircle className='w-3 h-3' />
                      <span>Something went wrong. Try again.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500'
        >
          <p>
            © {new Date().getFullYear()} TinyStage Concert Series. All rights
            reserved.
          </p>
          <div className='flex items-center gap-6'>
            <Link href='#' className='hover:text-yellow-500 transition-colors'>
              Privacy Policy
            </Link>
            <Link href='#' className='hover:text-yellow-500 transition-colors'>
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
