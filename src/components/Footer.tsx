// src/components/Footer.tsx
'use client';

import { AlertTriangle, CheckCircle, Loader2, Mail, Send } from 'lucide-react'; // Using more icons
import React, { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import Logo from '@/components/Logo'; // Assuming Logo.tsx is well-styled

// --- SVG Icon Components (Kept as is from your example, they are good) ---
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='currentColor'
    aria-hidden='true'
  >
    <path d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' />
  </svg>
);
const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='currentColor'
    aria-hidden='true'
  >
    <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
  </svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='currentColor'
    aria-hidden='true'
  >
    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' />
  </svg>
);

type SocialIconComponent = React.FC<{ className?: string }>;

const socialLinksData: {
  name: string;
  url: string;
  icon: SocialIconComponent;
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
    url: 'https://www.instagram.com/tinystage_erie',
    icon: InstagramIcon,
    ariaLabel: 'TinyStage on Instagram',
  }, // Changed to https
];

// Define a type for newsletter status messages for better type safety
type NewsletterMessage = {
  text: string;
  type: 'success' | 'error';
  icon: React.ElementType;
};

const newsletterMessages: Record<'success' | 'error', NewsletterMessage> = {
  success: {
    text: 'Thanks for subscribing! Keep an eye on your inbox.',
    type: 'success',
    icon: CheckCircle,
  },
  error: {
    text: 'Something went wrong. Please try again later.',
    type: 'error',
    icon: AlertTriangle,
  },
};

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [currentMessage, setCurrentMessage] =
    useState<NewsletterMessage | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Effect to handle display and clearing of newsletter messages
  useEffect(() => {
    if (newsletterStatus === 'success' || newsletterStatus === 'error') {
      setCurrentMessage(newsletterMessages[newsletterStatus]);
      const timer = setTimeout(() => {
        setCurrentMessage(null); // Start fade out
        // Optionally reset status to idle after fade out completes if needed by other logic
        // setTimeout(() => setNewsletterStatus('idle'), 500); // Match fade out duration
      }, 3000); // Message visible for 3s
      return () => clearTimeout(timer);
    } else if (newsletterStatus === 'idle') {
      setCurrentMessage(null); // Clear message when idle
    }
  }, [newsletterStatus]);

  const handleNewsletterSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!newsletterEmail.trim() || newsletterStatus === 'submitting') return;

      setNewsletterStatus('submitting');
      setCurrentMessage(null); // Clear previous messages

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
        // const response = await fetch('/api/newsletter', { /* ... */ });
        // if (!response.ok) throw new Error('Subscription failed');
        const simulatedApiSuccess = Math.random() > 0.2; // Simulate 80% success rate

        if (simulatedApiSuccess) {
          setNewsletterStatus('success');
          setNewsletterEmail('');
        } else {
          setNewsletterStatus('error');
        }
      } catch (error) {
        setNewsletterStatus('error');
      } finally {
        // If not success/error, reset to idle. Success/error handled by useEffect.
        if (newsletterStatus !== 'success' && newsletterStatus !== 'error') {
          setNewsletterStatus('idle');
        }
      }
    },
    [newsletterEmail, newsletterStatus],
  );

  const getAnimationClasses = (
    baseClasses: string,
    activeClasses: string,
    initialClasses: string,
    delayClass = '', // Added delayClass
  ) => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      return cn(
        baseClasses.split(' ')[0],
        isMounted ? 'opacity-100' : 'opacity-0',
        'transition-opacity duration-500',
      );
    }
    return cn(
      baseClasses,
      isMounted ? activeClasses : initialClasses,
      isMounted ? delayClass : '',
    );
  };

  const entryAnimateBase =
    'transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.2)]';
  const entryAnimateActive = 'opacity-100 translate-y-0 scale-100';
  const entryAnimateInitial = 'opacity-0 translate-y-6 scale-95';

  return (
    <footer className='relative overflow-hidden bg-brand-black text-brand-white py-20 sm:py-28 lg:py-32 isolate'>
      {/* Enhanced Background: Subtle animated gradient overlay */}
      <div
        aria-hidden='true'
        className='absolute inset-0 -z-10 opacity-50 mix-blend-soft-light motion-safe:animate-[pulse_20s_cubic-bezier(0.4,0,0.6,1)_infinite]'
        style={{
          backgroundImage:
            'radial-gradient(circle at top left, var(--brand-yellow), transparent 40%), radial-gradient(circle at bottom right, var(--brand-blue, var(--brand-yellow)), transparent 40%)', // Assuming a --brand-blue or fallback
        }}
      />
      <div
        aria-hidden='true'
        className='absolute inset-0 z-0 opacity-[0.03] motion-safe:animate-subtleBgDrift'
        style={{
          backgroundImage: 'url(/svg/bg-dark-noise.svg)', // Assuming a subtle noise SVG
          backgroundSize: '300px', // smaller size for more noticeable drift
          mixBlendMode: 'overlay',
        }}
      />

      <div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-y-16 gap-x-12 md:grid-cols-3 lg:gap-x-16'>
          {/* Column 1: Brand Identity */}
          <div
            className={cn(
              'space-y-6',
              getAnimationClasses(
                entryAnimateBase,
                entryAnimateActive,
                entryAnimateInitial,
                'delay-100',
              ),
            )}
          >
            <div className='inline-block group focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-yellow focus-within:ring-offset-4 focus-within:ring-offset-brand-black rounded-sm'>
              <Logo /> {/* Assuming Logo is a Link */}
            </div>
            <p className='max-w-xs text-sm leading-relaxed text-brand-gray-light opacity-90'>
              Erie's premier intimate concert series, celebrating diverse
              musical talent and fostering community through the power of live
              music.
            </p>
          </div>

          {/* Column 2: Connect */}
          <div
            className={cn(
              'space-y-6',
              getAnimationClasses(
                entryAnimateBase,
                entryAnimateActive,
                entryAnimateInitial,
                'delay-200',
              ),
            )}
          >
            <h3 className="text-lg font-semibold tracking-tight text-brand-white relative pb-2 mb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-brand-yellow/70">
              Get In Touch
            </h3>
            <ul className='space-y-3 text-sm'>
              <li>
                <a
                  href='mailto:thetinystage@gmail.com'
                  className='group inline-flex items-center text-brand-gray-light transition-colors duration-200 ease-out hover:text-brand-yellow focus:outline-none focus-visible:text-brand-yellow rounded-sm'
                >
                  <Mail
                    size={16}
                    className='mr-2.5 opacity-70 group-hover:opacity-100 transition-opacity'
                  />
                  thetinystage@gmail.com
                </a>
              </li>
              <li>
                <div className='flex items-center space-x-3 pt-2'>
                  {socialLinksData.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={social.ariaLabel}
                      className='text-brand-gray-light transition-all duration-200 ease-out hover:text-brand-yellow hover:scale-110 transform focus:outline-none focus-visible:rounded-full focus-visible:text-brand-yellow focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black p-1 -m-1' // Added padding for larger click target
                    >
                      <social.icon className='h-5 w-5' />
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Stay Updated (Newsletter) */}
          <div
            className={cn(
              'space-y-6',
              getAnimationClasses(
                entryAnimateBase,
                entryAnimateActive,
                entryAnimateInitial,
                'delay-300',
              ),
            )}
          >
            <h3 className="text-lg font-semibold tracking-tight text-brand-white relative pb-2 mb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-brand-yellow/70">
              Stay Updated
            </h3>
            <form className='space-y-3' onSubmit={handleNewsletterSubmit}>
              <div className='relative flex group focus-within:ring-2 focus-within:ring-brand-yellow focus-within:ring-offset-2 focus-within:ring-offset-brand-black rounded-md transition-shadow focus-within:shadow-lg focus-within:shadow-brand-yellow/20'>
                <label htmlFor='footer-email' className='sr-only'>
                  Your email address
                </label>
                <input
                  id='footer-email'
                  type='email'
                  name='email'
                  required
                  autoComplete='email'
                  placeholder='your.email@example.com'
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={newsletterStatus === 'submitting'}
                  className='w-full min-w-0 flex-auto appearance-none rounded-l-md border-0 bg-brand-gray-dark/70 px-4 py-2.5 text-sm text-brand-white placeholder-brand-gray-medium shadow-sm transition-colors duration-200 ease-out focus:bg-brand-gray-dark focus:placeholder-brand-gray-light focus:ring-0 focus:outline-none disabled:opacity-60'
                />
                <button
                  type='submit'
                  disabled={
                    newsletterStatus === 'submitting' || !newsletterEmail.trim()
                  }
                  className='relative shrink-0 rounded-r-md bg-brand-yellow px-4 py-2.5 text-sm font-bold text-brand-black shadow-sm transition-all duration-200 ease-out hover:brightness-110 active:brightness-95 focus:outline-none disabled:bg-brand-yellow/50 disabled:text-brand-black/70 disabled:cursor-not-allowed flex items-center justify-center'
                  style={{ minWidth: '5rem' }} // Ensure button has some width for spinner
                >
                  {newsletterStatus === 'submitting' ? (
                    <Loader2
                      size={18}
                      className='animate-spin'
                      aria-label='Submitting'
                    />
                  ) : (
                    <Send
                      size={16}
                      className='transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                    /> // Subtle icon animation on button hover
                  )}
                  <span className='ml-2 hidden sm:inline'>
                    {newsletterStatus === 'submitting' ? 'Wait...' : 'Join'}
                  </span>
                </button>
              </div>

              <div className='h-6 relative'>
                {' '}
                {/* Fixed height for message area to prevent layout shifts */}
                {currentMessage && (
                  <p
                    className={cn(
                      'absolute inset-x-0 bottom-0 flex items-center text-xs transition-all duration-500 ease-out',
                      currentMessage.type === 'success'
                        ? 'text-green-400'
                        : 'text-red-400',
                      isMounted &&
                        newsletterStatus !== 'idle' &&
                        newsletterStatus !== 'submitting'
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-2', // Animate in/out
                    )}
                  >
                    <currentMessage.icon
                      size={14}
                      className='mr-1.5 shrink-0'
                    />
                    {currentMessage.text}
                  </p>
                )}
                {newsletterStatus === 'idle' &&
                  !newsletterEmail.trim() &&
                  !currentMessage && (
                    <p className='absolute inset-x-0 bottom-0 text-xs leading-normal text-brand-gray-medium opacity-70 motion-safe:animate-fadeInBasic'>
                      Latest shows, artist spotlights, community news.
                    </p>
                  )}
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={cn(
            'mt-20 sm:mt-24 border-t border-brand-gray-dark/50 pt-8 text-center',
            getAnimationClasses(
              entryAnimateBase,
              entryAnimateActive,
              entryAnimateInitial,
              'delay-[400ms]',
            ), // Use array for Tailwind JIT
          )}
        >
          <p className='text-xs text-brand-gray-medium opacity-80'>
            © {new Date().getFullYear()} TinyStage Concert Series. All rights
            reserved. Site by{' '}
            <a
              href='https://yourname.com'
              target='_blank'
              rel='noopener noreferrer'
              className='font-medium hover:text-brand-yellow transition-colors'
            >
              Your Name
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
