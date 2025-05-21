'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';

// Define navigation items structure for clarity and reusability
const navLinks = [
  { href: '/about', label: 'About' },
  {
    href: '/shows',
    label: 'Shows',
    subItems: [
      { href: '/shows/upcoming', label: 'Upcoming Shows' },
      { href: '/shows/past', label: 'Past Performances' },
    ],
  },
  {
    href: '/get-involved',
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? 'hidden' : '';
      return newState;
    });
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleDropdown = (href: string) => {
    setOpenDropdown((prev) => (prev === href ? null : href));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdown &&
        !event
          .composedPath()
          .some((el) => (el as HTMLElement).classList?.contains('group'))
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const focusableElements =
        mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-2.5 lg:space-x-3'>
          {navLinks.map((item) => (
            <div key={item.href} className='group relative mx-1'>
              {item.subItems ? (
                <>
                  <button
                    type='button'
                    onClick={() => toggleDropdown(item.href)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        toggleDropdown(item.href);
                      }
                      if (e.key === 'Escape') setOpenDropdown(null);
                    }}
                    aria-haspopup='menu'
                    aria-expanded={openDropdown === item.href}
                    className={cn(
                      'inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-black)]',
                      pathname.startsWith(item.href)
                        ? 'text-[var(--brand-yellow)]'
                        : 'text-[var(--brand-gray-light)] hover:text-[var(--brand-yellow)]',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden='true'
                      className={cn(
                        'ml-1.5 transition-transform duration-200',
                        openDropdown === item.href
                          ? 'rotate-180 text-[var(--brand-yellow)]'
                          : 'group-hover:rotate-180 text-[var(--brand-gray-light)]',
                      )}
                    >
                      ▾
                    </span>
                  </button>
                  {item.subItems && openDropdown === item.href && (
                    <div
                      className={cn(
                        'absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 origin-top transform rounded-md bg-[var(--brand-gray-dark)] shadow-2xl ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1.5)] motion-safe:will-change-transform z-20',
                      )}
                      role='menu'
                    >
                      <ul className='p-1'>
                        {item.subItems.map((subItem, idx) => (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              role='menuitem'
                              onClick={() => setOpenDropdown(null)}
                              className={cn(
                                'block whitespace-nowrap rounded-md px-3 py-2 text-[0.875rem] transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-gray-dark)]',
                                pathname === subItem.href
                                  ? 'bg-[var(--brand-yellow)] text-[var(--brand-black)] font-semibold'
                                  : 'text-[var(--brand-gray-light)] hover:bg-[var(--brand-black)] hover:text-[var(--brand-yellow)]',
                              )}
                              style={{
                                animationDelay:
                                  openDropdown === item.href && isMounted
                                    ? `${idx * 50 + 30}ms`
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
                    'inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-black)]',
                    pathname === item.href
                      ? 'text-[var(--brand-yellow)]'
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
            'md:hidden flex flex-col items-center justify-center w-10 h-10 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-black)] transition-all duration-200',
            isMobileMenuOpen
              ? 'text-[var(--brand-yellow)]'
              : 'text-[var(--brand-white)]',
          )}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-controls='mobile-menu-panel'
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span
            className={cn(
              'block h-0.5 w-6 bg-current transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.5)]',
              isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : '',
            )}
          />
          <span
            className={cn(
              'block h-0.5 w-6 bg-current transition-opacity duration-200 ease-out',
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100',
            )}
          />
          <span
            className={cn(
              'block h-0.5 w-6 bg-current transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.5)]',
              isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : '',
            )}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='fixed inset-0 z-40 flex'>
          {/* Overlay */}
          <div
            className='fixed inset-0 bg-[var(--brand-black)]/70 backdrop-blur-sm transition-opacity duration-300 ease-out motion-safe:will-change-opacity'
            onClick={closeMobileMenu}
            aria-hidden='true'
          />
          {/* Panel */}
          <div
            ref={mobileMenuRef}
            id='mobile-menu-panel'
            className={cn(
              'relative ml-auto h-full w-[clamp(280px,75vw,320px)] bg-[var(--brand-black)] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.5)] motion-safe:will-change-transform border-l border-[var(--brand-gray-dark)]/50 flex flex-col',
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
              <ul className='space-y-1'>
                {navLinks.map((item, idx) => (
                  <li
                    key={item.href}
                    className={cn(
                      'motion-safe:opacity-0 motion-safe:translate-x-4',
                      isMobileMenuOpen &&
                        isMounted &&
                        'motion-safe:animate-fadeInSlideRight',
                    )}
                    style={{
                      animationDelay:
                        isMobileMenuOpen && isMounted
                          ? `${idx * 70 + 100}ms`
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
                        'block rounded-md px-3 py-3 text-base transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--brand-black)]',
                        pathname === item.href ||
                          (item.href !== '/' &&
                            pathname.startsWith(item.href + '/'))
                          ? 'bg-[var(--brand-gray-dark)] text-[var(--brand-yellow)] font-semibold'
                          : 'text-[var(--brand-gray-light)] hover:bg-[var(--brand-gray-dark)]/70 hover:text-[var(--brand-yellow)]',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li
                  className={cn(
                    'pt-2 motion-safe:opacity-0 motion-safe:translate-x-4',
                    isMobileMenuOpen &&
                      isMounted &&
                      'motion-safe:animate-fadeInSlideRight',
                  )}
                  style={{
                    animationDelay:
                      isMobileMenuOpen && isMounted
                        ? `${navLinks.length * 70 + 150}ms`
                        : '0ms',
                  }}
                >
                  <Link
                    href={ctaLink.href}
                    onClick={() => {
                      closeMobileMenu();
                      setOpenDropdown(null);
                    }}
                    className='block rounded-md bg-[var(--brand-yellow)] px-3 py-3.5 text-center text-base font-bold text-[var(--brand-black)] shadow-md transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-black)]'
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
