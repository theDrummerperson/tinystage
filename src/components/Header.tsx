'use client';

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { cn } from '../lib/utils';

// Navigation Structure
const NAV_ITEMS = [
  { label: 'About', href: '/about' },
  { label: 'Shows', href: '/shows' },
  {
    label: 'Get Involved',
    href: '#',
    children: [
      { label: 'Merchandise', href: '/merch' },
      { label: 'Support Us', href: '/support' },
    ],
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Optimize scroll listener: Update state only when crossing the threshold
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 10 && !isScrolled) setIsScrolled(true);
    if (latest <= 10 && isScrolled) setIsScrolled(false);
  });

  // Close mobile menu and dropdowns when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
        isScrolled ? 'py-3' : 'py-5',
      )}
    >
      {/* Dynamic Background Layer */}
      <motion.div
        className='absolute inset-0 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl'
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className='container mx-auto px-4 md:px-6 relative z-10'>
        <div className='flex items-center justify-between'>
          {/* Logo Section */}
          <Link href='/' className='relative group z-50'>
            <div className='relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]'>
              <Image
                src='/images/Logo2.png'
                alt='TinyStage Logo'
                fill
                className='object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-1'>
            {NAV_ITEMS.map((item) => {
              const isDropdown = !!item.children;
              // Determine active state for parent or children
              const isActive =
                pathname === item.href ||
                (isDropdown && item.children.some((c) => pathname === c.href));

              return (
                <div
                  key={item.label}
                  className='relative'
                  onMouseEnter={() => setHoveredPath(item.label)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  {isDropdown ? (
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.label ? null : item.label,
                        )
                      }
                      className={cn(
                        'relative px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 z-10',
                        isActive
                          ? 'text-yellow-500'
                          : 'text-neutral-300 hover:text-white',
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'w-3 h-3 transition-transform duration-300',
                          activeDropdown === item.label && 'rotate-180',
                        )}
                      />

                      {/* Magic Floating Background */}
                      {hoveredPath === item.label && (
                        <motion.div
                          layoutId='nav-pill'
                          className='absolute inset-0 bg-white/5 rounded-full -z-10'
                          transition={{
                            type: 'spring',
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'relative px-4 py-2 rounded-full text-sm font-medium transition-colors block z-10',
                        isActive
                          ? 'text-yellow-500'
                          : 'text-neutral-300 hover:text-white',
                      )}
                    >
                      {item.label}
                      {hoveredPath === item.label && (
                        <motion.div
                          layoutId='nav-pill'
                          className='absolute inset-0 bg-white/5 rounded-full -z-10'
                          transition={{
                            type: 'spring',
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </Link>
                  )}

                  {/* Desktop Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdown && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className='absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-neutral-900/90 border border-white/10 rounded-xl shadow-2xl p-2 overflow-hidden backdrop-blur-xl ring-1 ring-black/50'
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {/* Little Arrow Top */}
                        <div className='absolute top-0 left-1/2 -translate-x-1/2 -mt-1.5 w-3 h-3 bg-neutral-900 border-t border-l border-white/10 rotate-45 transform' />

                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block px-4 py-2.5 text-sm rounded-lg transition-colors relative z-10',
                              pathname === child.href
                                ? 'bg-yellow-500/10 text-yellow-500 font-semibold'
                                : 'text-neutral-400 hover:text-white hover:bg-white/5',
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* CTA Button */}
            <Link
              href='/#booking'
              className='ml-4 px-6 py-2.5 bg-yellow-500 text-neutral-950 font-bold rounded-full text-sm hover:bg-yellow-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(234,179,8,0.2)]'
            >
              Book Us
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className='md:hidden relative z-50 p-2 text-white hover:text-yellow-500 transition-colors'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label='Toggle Menu'
          >
            <AnimatePresence mode='wait'>
              {mobileMenuOpen ? (
                <motion.div
                  key='close'
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className='w-8 h-8' />
                </motion.div>
              ) : (
                <motion.div
                  key='menu'
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className='w-8 h-8' />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className='fixed inset-0 z-40 md:hidden bg-neutral-950/95 backdrop-blur-2xl flex flex-col items-center justify-center min-h-screen'
          >
            {/* Atmospheric Background Blobs */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
              <div className='absolute top-1/4 left-1/4 w-80 h-80 bg-yellow-500/5 rounded-full blur-[100px] animate-pulse' />
              <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px]' />
              <div
                className='absolute inset-0 opacity-[0.03]'
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <nav className='relative z-10 flex flex-col items-center gap-8 text-center p-6 w-full max-w-sm'>
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.5,
                    ease: 'easeOut',
                  }}
                  className='w-full'
                >
                  {item.children ? (
                    <div className='flex flex-col gap-5 items-center'>
                      <span className='text-sm font-bold text-neutral-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2 mb-2'>
                        {item.label}
                      </span>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className='text-2xl font-serif text-white hover:text-yellow-500 transition-colors'
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'block text-4xl font-serif font-bold transition-colors',
                        pathname === item.href
                          ? 'text-yellow-500'
                          : 'text-white hover:text-neutral-300',
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.5 }}
                className='pt-8'
              >
                <Link
                  href='/#booking'
                  className='inline-flex items-center gap-3 px-8 py-5 bg-yellow-500 text-neutral-950 font-bold rounded-full text-xl shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] hover:scale-105 transition-all'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Us <ArrowRight className='w-6 h-6' />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
