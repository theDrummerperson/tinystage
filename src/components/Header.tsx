'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';

// Define navigation items structure
const navLinks = [
  { href: '/about', label: 'About' },
  {
    href: '/shows', // This href will be for the main "Shows" page if top-level is clickable
    label: 'Shows',
    subItems: [
      { href: '/shows/upcoming', label: 'Upcoming Shows' },
      { href: '/shows/past', label: 'Past Performances' },
    ],
  },
  {
    href: '/get-involved', // Main "Get Involved" page href
    label: 'Get Involved',
    subItems: [
      { href: '/merch', label: 'Merchandise' },
      { href: '/support', label: 'Support Us' },
    ],
  },
];

const ctaLink = { href: '/book', label: 'Booking Inquiry' };

export default function Header(): JSX.Element {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Tracks open dropdown by its main item's href
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // For entry animations

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll detection for header styling
  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manage body scroll and mount state
  useEffect(() => {
    setIsMounted(true);
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup function to ensure body scroll is restored if component unmounts while menu is open
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleDropdown = (href: string) => {
    setOpenDropdown((prev) => (prev === href ? null : href));
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const target = event.target as Node;
        // Check if the click is outside all elements that are part of a 'group' (nav items)
        let isInsideGroup = false;
        document.querySelectorAll('.group').forEach((groupEl) => {
          if (groupEl.contains(target)) {
            isInsideGroup = true;
          }
        });
        if (!isInsideGroup) {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  // Mobile menu focus trapping and Escape key handling
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (!isMobileMenuOpen || !mobileMenuRef.current) return;

      if (event.key === 'Escape') {
        closeMobileMenu();
        mobileMenuButtonRef.current?.focus(); // Return focus to hamburger
        return;
      }

      if (event.key === 'Tab') {
        const focusableElements = Array.from(
          mobileMenuRef.current.querySelectorAll<HTMLElement>(
            'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => el.offsetParent !== null); // Filter out hidden elements

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeydown);
      // Focus the close button in mobile menu when it opens (common accessible pattern)
      const closeButton =
        mobileMenuRef.current?.querySelector<HTMLButtonElement>(
          'button[aria-label="Close menu"]',
        );
      closeButton?.focus();
    } else {
      document.removeEventListener('keydown', handleKeydown);
    }

    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-[var(--brand-black)] transition-all duration-300 ease-out',
        isMobileMenuOpen || hasScrolled
          ? 'shadow-xl border-b border-[var(--brand-gray-dark)]/60'
          : 'shadow-none border-b border-transparent',
      )}
    >
      <div className='container mx-auto flex items-center justify-between px-4 py-2.5 md:py-3'>
        <Link
          href='/'
          className='group flex shrink-0 items-center space-x-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-black)] md:space-x-3'
          aria-label='Go to Homepage'
          onClick={() => {
            closeMobileMenu();
            setOpenDropdown(null);
          }}
        >
          <div className='transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-3deg] motion-safe:group-focus-visible:scale-110'>
            <Image
              src='/images/Logo2.png'
              alt='TinyStage Icon'
              width={44}
              height={44}
              priority
              className='object-contain motion-safe:animate-glint'
            />
          </div>
        </Link>

        <nav className='hidden md:flex items-center space-x-1 lg:space-x-2'>
          {navLinks.map((item) => (
            <div key={item.href} className='group relative mx-0.5'>
              {item.subItems ? (
                <>
                  <button
                    type='button'
                    onClick={() => toggleDropdown(item.href)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleDropdown(item.href);
                      }
                      if (e.key === 'Escape') setOpenDropdown(null);
                    }}
                    aria-haspopup='menu'
                    aria-expanded={openDropdown === item.href}
                    aria-controls={`dropdown-${item.label.toLowerCase().replace(' ', '-')}`}
                    className={cn(
                      'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-black)]',
                      (pathname.startsWith(item.href) ||
                        (item.href === '/shows' &&
                          pathname.startsWith('/shows/'))) &&
                        openDropdown !== item.href
                        ? 'text-[var(--brand-yellow)]'
                        : 'text-[var(--brand-gray-light)] hover:text-[var(--brand-yellow)]',
                      openDropdown === item.href &&
                        'bg-[var(--brand-gray-dark)]/70 text-[var(--brand-yellow)]',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden='true'
                      className={cn(
                        'ml-1.5 transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1.5)]',
                        openDropdown === item.href
                          ? 'rotate-180'
                          : 'group-hover:rotate-180',
                        openDropdown === item.href
                          ? 'text-[var(--brand-yellow)]'
                          : 'text-[var(--brand-gray-light)] group-hover:text-[var(--brand-yellow)]',
                      )}
                    >
                      ▾
                    </span>
                  </button>
                  {openDropdown === item.href && (
                    <div
                      id={`dropdown-${item.label.toLowerCase().replace(' ', '-')}`}
                      className={cn(
                        'absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 origin-top transform rounded-md bg-[var(--brand-gray-dark)] shadow-2xl ring-1 ring-[var(--brand-black)]/70 ring-opacity-10 transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1.5)] motion-safe:will-change-transform z-20',
                        isMounted && openDropdown === item.href // Ensure animation runs only when intended
                          ? 'visible scale-100 opacity-100'
                          : 'invisible scale-90 opacity-0 pointer-events-none',
                      )}
                      role='menu'
                      aria-labelledby={item.label} // Optional: if button itself doesn't have sufficient label for menu
                    >
                      <ul className='p-1'>
                        {item.subItems.map((subItem, idx) => (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              role='menuitem'
                              onClick={() => setOpenDropdown(null)}
                              className={cn(
                                'block whitespace-nowrap rounded px-3 py-2 text-[0.875rem] transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--brand-gray-dark)]',
                                pathname === subItem.href
                                  ? 'bg-[var(--brand-yellow)] text-[var(--brand-black)] font-semibold'
                                  : 'text-[var(--brand-gray-light)] hover:bg-[var(--brand-black)]/80 hover:text-[var(--brand-yellow)] focus-visible:bg-[var(--brand-black)]/80 focus-visible:text-[var(--brand-yellow)]',
                                openDropdown === item.href &&
                                  isMounted &&
                                  'motion-safe:animate-fadeInSlideUp',
                              )}
                              style={{
                                animationDelay:
                                  openDropdown === item.href && isMounted
                                    ? `${idx * 40 + 30}ms` // Slightly faster stagger
                                    : '0ms',
                              }}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-black)]',
                    pathname === item.href
                      ? 'text-[var(--brand-yellow)] font-semibold'
                      : 'text-[var(--brand-gray-light)] hover:text-[var(--brand-yellow)]',
                  )}
                  onClick={() => setOpenDropdown(null)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <Link
            href={ctaLink.href}
            className='ml-3 md:ml-4'
            onClick={() => setOpenDropdown(null)}
          >
            <Button
              variant='primary'
              className='px-5 py-2 text-sm font-semibold text-[var(--brand-black)]'
            >
              {ctaLink.label}
            </Button>
          </Link>
        </nav>

        {/* Hamburger Button */}
        <button
          ref={mobileMenuButtonRef}
          className={cn(
            'md:hidden relative z-50 flex flex-col items-center justify-center w-10 h-10 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-black)] transition-colors duration-200 ease-out',
            isMobileMenuOpen
              ? 'text-[var(--brand-yellow)] hover:bg-[var(--brand-gray-dark)]/50'
              : 'text-[var(--brand-white)] hover:bg-[var(--brand-gray-dark)]/70',
          )}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-controls='mobile-menu-panel'
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span className='sr-only'>
            {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          </span>
          <div className='space-y-[5px]' aria-hidden='true'>
            <span
              className={cn(
                'block h-0.5 w-6 origin-center transform bg-current transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.5)]',
                isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : '',
              )}
            />
            <span
              className={cn(
                'block h-0.5 w-6 bg-current transition-opacity duration-200 ease-out',
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100 delay-75', // Delay opacity for smoother transition
              )}
            />
            <span
              className={cn(
                'block h-0.5 w-6 origin-center transform bg-current transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.5)]',
                isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : '',
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu - Conditionally Rendered Wrapper for Clean DOM & Transitions */}
      {isMobileMenuOpen && (
        <div
          className={cn(
            'fixed inset-0 z-40 flex',
            // Using a key on this outer div that changes when isMobileMenuOpen changes
            // can help ensure Tailwind's animate classes re-trigger correctly if needed.
            // However, the inner panel's translate-x should handle most of the visual transition.
            // For the outer wrapper, a simple fade-in for the overlay is often enough.
            isMounted && isMobileMenuOpen
              ? 'animate-fadeInBasic'
              : 'opacity-0 pointer-events-none',
          )}
          // Forcing remount on open/close for animations to re-trigger consistently
          // key={isMobileMenuOpen ? 'menu-open' : 'menu-closed'}
        >
          {/* Overlay */}
          <div
            className='absolute inset-0 bg-[var(--brand-black)]/70 backdrop-blur-sm motion-safe:will-change-opacity'
            onClick={closeMobileMenu}
            aria-hidden='true'
          />
          {/* Panel */}
          <div
            ref={mobileMenuRef}
            id='mobile-menu-panel'
            className={cn(
              'relative ml-auto h-full w-[clamp(280px,75vw,320px)] transform bg-[var(--brand-black)] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.5)] motion-safe:will-change-transform border-l border-[var(--brand-gray-dark)]/50 flex flex-col',
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
            )}
            role='dialog'
            aria-modal='true'
            aria-labelledby='mobile-menu-heading'
          >
            <div className='flex items-center justify-between border-b border-[var(--brand-gray-dark)]/50 px-4 py-3'>
              <h2
                id='mobile-menu-heading'
                className='text-lg font-semibold text-[var(--brand-white)]'
              >
                Navigation
              </h2>
              <button
                onClick={closeMobileMenu}
                className='rounded-md p-2 text-[var(--brand-white)] transition-colors hover:bg-[var(--brand-gray-dark)]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--brand-black)]'
                aria-label='Close menu'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <nav className='flex-grow overflow-y-auto p-4'>
              <ul className='space-y-1.5'>
                {navLinks.map((item, idx) => (
                  <li
                    key={item.href}
                    className={cn(
                      // Apply animation only when menu is opening and component is mounted
                      isMounted && isMobileMenuOpen
                        ? 'motion-safe:animate-fadeInSlideRight'
                        : 'opacity-0',
                    )}
                    style={{
                      animationDelay:
                        isMounted && isMobileMenuOpen
                          ? `${idx * 60 + 100}ms` // Adjusted stagger base
                          : '0ms',
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => {
                        closeMobileMenu();
                        setOpenDropdown(null);
                      }}
                      className={cn(
                        'block rounded-md px-3 py-3 text-base transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--brand-black)]',
                        pathname.startsWith(item.href) ||
                          (item.href === '/shows' &&
                            pathname.startsWith('/shows/'))
                          ? 'bg-[var(--brand-gray-dark)] text-[var(--brand-yellow)] font-semibold'
                          : 'text-[var(--brand-gray-light)] hover:bg-[var(--brand-gray-dark)]/60 hover:text-[var(--brand-yellow)] active:bg-[var(--brand-gray-dark)]/80',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li
                  className={cn(
                    'pt-2',
                    isMounted && isMobileMenuOpen
                      ? 'motion-safe:animate-fadeInSlideRight'
                      : 'opacity-0',
                  )}
                  style={{
                    animationDelay:
                      isMounted && isMobileMenuOpen
                        ? `${navLinks.length * 60 + 150}ms` // Adjusted stagger base
                        : '0ms',
                  }}
                >
                  <Link
                    href={ctaLink.href}
                    onClick={() => {
                      closeMobileMenu();
                      setOpenDropdown(null);
                    }}
                    className='block rounded-md bg-[var(--brand-yellow)] px-3 py-3.5 text-center text-base font-bold text-[var(--brand-black)] shadow-lg transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-black)]'
                  >
                    {ctaLink.label}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
