'use client';

// Corrected Import Order (Example - actual order depends on eslint-plugin-simple-import-sort config)
import Link from 'next/link'; // Assuming this will be used for Privacy/Terms or if Logo isn't a link
import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import Logo from '@/components/Logo';

// --- SVG Icon Components (Optimized: added aria-hidden, explicit fill/stroke where appropriate) ---
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='currentColor' // Explicit fill
    aria-hidden='true' // Decorative icon
  >
    <path d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' />
  </svg>
);
const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='currentColor' // Explicit fill
    aria-hidden='true' // Decorative icon
  >
    <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
  </svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='currentColor' // Explicit fill
    aria-hidden='true' // Decorative icon
  >
    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' />
  </svg>
);

// Type for social link icon components
type SocialIconComponent = React.FC<{ className?: string }>;

const socialLinksData: {
  name: string;
  url: string;
  icon: SocialIconComponent; // Use the defined type
  ariaLabel: string;
}[] = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/tinystageerie',
    icon: FacebookIcon,
    ariaLabel: 'TinyStage on Facebook',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/GetTiny',
    icon: YouTubeIcon,
    ariaLabel: 'TinyStage on YouTube',
  },
  {
    name: 'Instagram',
    url: 'http://www.instagram.com/tinystage_erie', // Consider https if available
    icon: InstagramIcon,
    ariaLabel: 'TinyStage on Instagram',
  },
];

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  // Ensure setNewsletterStatus is used if this state is kept.
  // If only for display based on other logic, this state might be simplified.
  const [newsletterStatus, setNewsletterStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNewsletterSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (!newsletterEmail || newsletterStatus === 'submitting') return; // Prevent multiple submits

    setNewsletterStatus('submitting'); // THIS IS THE USE OF setNewsletterStatus

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Replace with actual API call:
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: newsletterEmail }),
      // });
      // if (!response.ok) throw new Error('Subscription failed');
      // const data = await response.json();

      // Assume success for now for the simulation
      const success = true; // Based on your previous code

      if (success) {
        setNewsletterStatus('success');
        setNewsletterEmail(''); // Clear email on success
        setTimeout(() => setNewsletterStatus('idle'), 3000);
      } else {
        // This branch might not be hit if success is always true
        setNewsletterStatus('error');
        setTimeout(() => setNewsletterStatus('idle'), 3000);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Newsletter submission error:', error);
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }
  };

  const entryAnimateBase =
    'transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]';
  const entryAnimateActive = 'opacity-100 translate-y-0';
  const entryAnimateInitial = 'opacity-0 translate-y-5';

  // Refined motionAwareClass for clarity
  const getAnimationClasses = (
    baseClasses: string,
    activeClasses: string,
    initialClasses: string,
  ) => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // For reduced motion, just handle opacity transition if desired, or ensure it's visible
      return cn(
        baseClasses.split(' ')[0],
        isMounted ? 'opacity-100' : 'opacity-0',
      );
    }
    return cn(baseClasses, isMounted ? activeClasses : initialClasses);
  };

  return (
    <footer className='relative overflow-hidden bg-[var(--brand-black)] text-[var(--text-color)] py-20 sm:py-24'>
      <div
        className='absolute inset-0 z-0 opacity-[0.02] motion-safe:animate-subtleBgDrift'
        style={{
          backgroundImage: 'url(/svg/bg.svg)',
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
        }}
      />

      <div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-12 sm:gap-10 md:grid-cols-3 lg:gap-16'>
          {/* Column 1: Brand Identity */}
          <div
            className={cn(
              'space-y-5',
              getAnimationClasses(
                entryAnimateBase,
                entryAnimateActive,
                entryAnimateInitial,
              ),
            )}
            style={{ transitionDelay: isMounted ? '0.1s' : '0ms' }}
          >
            <div className='inline-block group rounded-sm focus-within:ring-2 focus-within:ring-[var(--brand-yellow)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--brand-black)]'>
              {/* Assuming Logo.tsx already renders a Link to '/' */}
              <Logo />
            </div>
            <p className='max-w-xs text-sm leading-relaxed text-[var(--brand-gray-medium)]'>
              Erie's only intimate concert series celebrating diverse musical
              talent and fostering community through live music.
            </p>
          </div>

          {/* Column 2: Connect */}
          <div
            className={cn(
              'space-y-5',
              getAnimationClasses(
                entryAnimateBase,
                entryAnimateActive,
                entryAnimateInitial,
              ),
            )}
            style={{ transitionDelay: isMounted ? '0.25s' : '0ms' }}
          >
            <h3 className='text-base font-semibold tracking-wider uppercase text-[var(--brand-gray-light)]'>
              Get In Touch
            </h3>
            <ul className='space-y-2.5 text-sm'>
              <li>
                <a
                  href='mailto:thetinystage@gmail.com'
                  className='text-[var(--brand-gray-medium)] transition-colors duration-200 ease-out hover:text-[var(--brand-yellow)] focus:outline-none focus-visible:text-[var(--brand-yellow)] focus-visible:underline rounded-sm'
                >
                  thetinystage@gmail.com
                </a>
              </li>
              <li>
                <div className='flex items-center space-x-4 pt-1'>
                  {socialLinksData.map(
                    (
                      social, // Removed unused _idx
                    ) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label={social.ariaLabel}
                        className='text-[var(--brand-gray-medium)] transition-all duration-200 ease-out hover:text-[var(--brand-yellow)] hover:scale-110 focus:outline-none focus-visible:rounded-full focus-visible:text-[var(--brand-yellow)] focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-black)]'
                      >
                        <social.icon className='h-5 w-5' />
                      </a>
                    ),
                  )}
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Stay Updated (Newsletter) */}
          <div
            className={cn(
              'space-y-5',
              getAnimationClasses(
                entryAnimateBase,
                entryAnimateActive,
                entryAnimateInitial,
              ),
            )}
            style={{ transitionDelay: isMounted ? '0.4s' : '0ms' }}
          >
            <h3 className='text-base font-semibold tracking-wider uppercase text-[var(--brand-gray-light)]'>
              Stay Updated
            </h3>
            <form
              className='flex items-start'
              onSubmit={handleNewsletterSubmit}
            >
              <div className='w-full'>
                <label htmlFor='footer-email' className='sr-only'>
                  Your email address
                </label>
                <div className='flex'>
                  <input
                    id='footer-email'
                    type='email'
                    name='email'
                    required
                    autoComplete='email'
                    placeholder='Your email address'
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    disabled={newsletterStatus === 'submitting'}
                    className='w-full min-w-0 flex-auto appearance-none rounded-l-md border border-r-0 border-[var(--brand-gray-dark)] bg-[var(--brand-gray-darkest)] px-3.5 py-2.5 text-sm text-[var(--brand-white)] placeholder-[var(--brand-gray-medium)] shadow-sm transition-colors duration-200 ease-out focus:border-[var(--brand-yellow)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-yellow)] focus:ring-offset-2 focus:ring-offset-[var(--brand-black)] disabled:opacity-60'
                  />
                  <button
                    type='submit'
                    disabled={
                      newsletterStatus === 'submitting' ||
                      !newsletterEmail.trim()
                    } // Disable if submitting or email is empty
                    className='relative shrink-0 rounded-r-md border border-[var(--brand-yellow)] border-l-transparent bg-[var(--brand-yellow)] px-4 py-2.5 text-sm font-bold text-[var(--brand-black)] shadow-sm transition-all duration-200 ease-out hover:brightness-110 active:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-black)] disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {newsletterStatus === 'submitting' ? (
                      <span
                        className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                        role='status'
                      >
                        <span className='sr-only'>Submitting...</span>
                      </span>
                    ) : (
                      'Join'
                    )}
                  </button>
                </div>
                {newsletterStatus === 'success' && (
                  <p className='mt-2 text-xs text-green-400 motion-safe:animate-fadeInUp'>
                    Thanks for subscribing!
                  </p>
                )}
                {newsletterStatus === 'error' && (
                  <p className='mt-2 text-xs text-red-400 motion-safe:animate-fadeInUp'>
                    Something went wrong. Please try again.
                  </p>
                )}
                {newsletterStatus === 'idle' &&
                  !newsletterEmail && ( // Show only if idle and no email typed yet, or after success
                    <p className='mt-2 text-xs leading-normal text-[var(--brand-gray-medium)]'>
                      Latest shows, artist spotlights, community news.
                    </p>
                  )}
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-16 border-t border-[var(--brand-gray-dark)]/70 pt-8 text-center sm:mt-20'>
          <p className='text-xs text-[var(--brand-gray-medium)]'>
            © {new Date().getFullYear()} TinyStage Concert Series. All rights
            reserved.
          </p>
          <nav className='mt-3 space-x-4 text-xs'>
            <Link // Link component is used here
              href='/privacy-policy'
              className='text-[var(--brand-gray-medium)] hover:text-[var(--brand-yellow)] transition-colors duration-150 focus-visible:outline-none focus-visible:text-[var(--brand-yellow)] focus-visible:underline rounded-sm'
            >
              Privacy
            </Link>
            <span className='text-[var(--brand-gray-dark)]' aria-hidden='true'>
              |
            </span>
            <Link // And here
              href='/terms-of-service'
              className='text-[var(--brand-gray-medium)] hover:text-[var(--brand-yellow)] transition-colors duration-150 focus-visible:outline-none focus-visible:text-[var(--brand-yellow)] focus-visible:underline rounded-sm'
            >
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
