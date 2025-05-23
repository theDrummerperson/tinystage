'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';

const navLinks = [
  { href: '/about', label: 'About' },
  {
    href: '/shows', // This is the main landing page for shows (app/shows/page.tsx)
    label: 'Shows',
    subItems: [
      { href: '/shows/upcoming', label: 'Upcoming Shows' }, // Points to app/shows/upcoming/page.tsx
      { href: '/shows/archive', label: 'Past Performances' }, // Points to app/shows/archive/page.tsx (or /shows/past/page.tsx)
    ],
  },
  {
    href: '/get-involved', // This could be a page at app/get-involved/page.tsx
    label: 'Get Involved',
    subItems: [
      // These subItems assume /merch and /support are top-level pages
      // If they are sub-pages of /get-involved, their hrefs would be different
      // e.g., /get-involved/merch
      { href: '/merch', label: 'Merchandise' }, // Points to app/merch/page.tsx
      { href: '/support', label: 'Support Us' }, // Points to app/support/page.tsx
    ],
  },
];

export default function Header(): JSX.Element {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const ctaLink = useMemo(() => {
    const baseLabel = 'Booking Inquiry';
    if (pathname === '/') {
      return { href: '#booking', label: baseLabel };
    }
    return { href: '/#booking', label: baseLabel };
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 10;
      setHasScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
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

  const handleCtaClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpenDropdown(null);
    if (isMobileMenuOpen) {
      closeMobileMenu();
    }

    const href = event.currentTarget.getAttribute('href');

    if (href && href.startsWith('#') && pathname === '/') {
      event.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerOffset = headerRef.current?.offsetHeight || 70;
        const elementPosition =
          targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        setTimeout(() => {
          if (window.location.hash !== href) {
            window.history.pushState(null, '', href);
          }
        }, 400);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const target = event.target as Node;
        let isInsideGroup = false;
        const dropdownTriggers = document.querySelectorAll(
          '.group.relative > button[aria-haspopup="menu"]',
        );
        dropdownTriggers.forEach((trigger) => {
          const dropdownPanelId = trigger.getAttribute('aria-controls');
          const panel = dropdownPanelId
            ? document.getElementById(dropdownPanelId)
            : null;
          if (trigger.contains(target) || (panel && panel.contains(target))) {
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

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (!isMobileMenuOpen || !mobileMenuRef.current) return;

      if (event.key === 'Escape') {
        closeMobileMenu();
        mobileMenuButtonRef.current?.focus();
        return;
      }

      if (event.key === 'Tab') {
        const focusableElements = Array.from(
          mobileMenuRef.current.querySelectorAll<HTMLElement>(
            'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => el.offsetParent !== null);

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeydown);
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
      ref={headerRef}
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 ease-out',
        // Default state (top of page, not scrolled, mobile menu closed)
        !hasScrolled &&
          !isMobileMenuOpen &&
          'bg-transparent shadow-none border-b border-transparent',
        // Scrolled state (not mobile menu open)
        hasScrolled &&
          !isMobileMenuOpen &&
          'bg-[var(--brand-black)] shadow-xl border-b-2 border-[var(--brand-yellow)] transform scale-y-[1.01]', // Added scaleY and thicker border
        // Mobile menu open state (overrides others for background and border)
        isMobileMenuOpen &&
          'bg-[var(--brand-black)] shadow-xl border-b border-[var(--brand-gray-dark)]/60',
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
              src='/images/Logo2.png' // Ensure this path is correct
              alt='TinyStage Icon'
              width={44}
              height={44}
              priority
              className='object-contain motion-safe:animate-glint'
            />
          </div>
          {/* Optional: Brand Name Text */}
          {/* <span className="hidden sm:inline-block text-xl font-bold text-[var(--brand-yellow)] ml-2 tracking-tight group-hover:text-[var(--brand-white)] transition-colors">
            TinyStage
          </span> */}
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
                      'relative inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-black)]',
                      pathname.startsWith(item.href) ||
                        (item.href === '/shows' &&
                          pathname.startsWith('/shows/')) ||
                        openDropdown === item.href
                        ? 'text-[var(--brand-yellow)]'
                        : 'text-[var(--brand-gray-light)] hover:text-[var(--brand-yellow)]',
                      openDropdown === item.href &&
                        'bg-[var(--brand-gray-dark)]/70 text-[var(--brand-yellow)]', // Stays for open dropdown background
                    )}
                  >
                    {item.label}
                    {/* Active link indicator (underline) for dropdown triggers */}
                    {(pathname.startsWith(item.href) ||
                      (item.href === '/shows' &&
                        pathname.startsWith('/shows/')) ||
                      openDropdown === item.href) && (
                      <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-[var(--brand-yellow)] rounded-full motion-safe:animate-scaleInX' />
                    )}
                    <span
                      aria-hidden='true'
                      className={cn(
                        'ml-1.5 transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1.5)]',
                        openDropdown === item.href
                          ? 'rotate-180'
                          : 'group-hover:rotate-180',
                        // Chevron color matches text color for consistency
                        pathname.startsWith(item.href) ||
                          (item.href === '/shows' &&
                            pathname.startsWith('/shows/')) ||
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
                        'absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 origin-top transform rounded-md bg-[var(--brand-gray-dark)]/95 shadow-[0_8px_30px_rgba(0,0,0,0.3),_0_0_0_1px_var(--brand-yellow)/20,_inset_0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1.5)] motion-safe:will-change-transform z-20',
                        isMounted && openDropdown === item.href
                          ? 'visible scale-100 opacity-100'
                          : 'invisible scale-90 opacity-0 pointer-events-none',
                      )}
                      role='menu'
                      aria-labelledby={item.label}
                    >
                      <div
                        className='absolute -top-[7px] left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden'
                        aria-hidden='true'
                      >
                        <div className='w-3 h-3 bg-[var(--brand-gray-dark)]/95 rotate-45 transform origin-center -translate-y-1/2 shadow-[0_0_0_1px_var(--brand-yellow)/20]' />
                      </div>
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
                                  'motion-safe:animate-fadeInSlideUp', // Ensure this animation is defined
                              )}
                              style={{
                                animationDelay:
                                  openDropdown === item.href && isMounted
                                    ? `${idx * 40 + 30}ms`
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
                    'relative inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-black)]',
                    pathname === item.href
                      ? 'text-[var(--brand-yellow)] font-semibold'
                      : 'text-[var(--brand-gray-light)] hover:text-[var(--brand-yellow)]',
                  )}
                  onClick={() => setOpenDropdown(null)}
                >
                  {item.label}
                  {/* Active link indicator (underline) */}
                  {pathname === item.href && (
                    <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-[var(--brand-yellow)] rounded-full motion-safe:animate-scaleInX' />
                  )}
                </Link>
              )}
            </div>
          ))}
          <Link
            href={ctaLink.href}
            scroll={!(pathname === '/' && ctaLink.href.startsWith('#'))}
            className='ml-3 md:ml-4 group/cta'
            onClick={handleCtaClick}
          >
            <Button
              variant='primary'
              className='px-5 py-2 text-sm font-semibold text-[var(--brand-black)] shadow-md group-hover/cta:shadow-lg group-hover/cta:brightness-110 transition-all duration-200 ease-out transform group-hover/cta:scale-[1.03] active:scale-[0.97]'
            >
              {ctaLink.label}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-4 h-4 ml-2 opacity-80 group-hover/cta:opacity-100 transition-opacity duration-200'
              >
                <path
                  fillRule='evenodd'
                  d='M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z'
                  clipRule='evenodd'
                />
              </svg>
            </Button>
          </Link>
        </nav>

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
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100 delay-75',
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

      {isMobileMenuOpen && (
        <div
          className={cn(
            'fixed inset-0 z-40 flex',
            isMounted && isMobileMenuOpen
              ? 'animate-fadeInBasic' // Ensure this animation is defined
              : 'opacity-0 pointer-events-none',
          )}
          key={isMobileMenuOpen ? 'menu-open' : 'menu-closed'}
        >
          <div
            className='absolute inset-0 bg-[var(--brand-black)]/70 backdrop-blur-sm motion-safe:will-change-opacity'
            onClick={closeMobileMenu}
            aria-hidden='true'
          />
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
                      isMounted && isMobileMenuOpen
                        ? 'motion-safe:animate-fadeInSlideRight' // Ensure this animation is defined
                        : 'opacity-0',
                    )}
                    style={{
                      animationDelay:
                        isMounted && isMobileMenuOpen
                          ? `${idx * 60 + 100}ms`
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
                      ? 'motion-safe:animate-fadeInSlideRight' // Ensure this animation is defined
                      : 'opacity-0',
                  )}
                  style={{
                    animationDelay:
                      isMounted && isMobileMenuOpen
                        ? `${navLinks.length * 60 + 150}ms`
                        : '0ms',
                  }}
                >
                  <Link
                    href={ctaLink.href}
                    scroll={!(pathname === '/' && ctaLink.href.startsWith('#'))}
                    onClick={handleCtaClick}
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
