// src/components/Header.tsx
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

import Button from '@/components/buttons/Button'; // Assuming Button is styled appropriately

// Constants for navigation items
const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/shows', label: 'Shows' },
  {
    href: '/get-involved', // Parent link
    label: 'Get Involved',
    subItems: [
      { href: '/merch', label: 'Merchandise' },
      { href: '/support', label: 'Support Us' },
    ],
  },
] as const; // Use 'as const' for stricter typing of href and label

// Type definitions for better type safety
type NavLink = (typeof NAV_LINKS)[number];
type SubItem = {
  href: string;
  label: string;
};

export default function Header(): JSX.Element {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const ctaLink = useMemo(
    () => ({
      href: pathname === '/' ? '#booking' : '/#booking', // Example: if you have a booking section on homepage
      label: 'Booking Inquiry',
    }),
    [pathname],
  );

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMounted(true); // Indicate component has mounted for animations
    // Prevent body scroll when mobile menu is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((prev) => !prev),
    [],
  );
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const toggleDropdown = useCallback((href: string) => {
    setOpenDropdown((prev) => (prev === href ? null : href));
  }, []);

  const handleCtaClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      setOpenDropdown(null); // Close any open desktop dropdowns
      if (isMobileMenuOpen) closeMobileMenu(); // Close mobile menu

      const hrefTarget = event.currentTarget.getAttribute('href');
      if (hrefTarget?.startsWith('#') && pathname === '/') {
        event.preventDefault();
        const targetId = hrefTarget.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const headerHeight = headerRef.current?.offsetHeight || 70; // Adjust default as needed
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            20; // Optional offset
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
          // Optionally update URL hash after smooth scroll
          setTimeout(() => {
            if (window.location.hash !== hrefTarget) {
              window.history.pushState(null, '', hrefTarget);
            }
          }, 400); // Delay to allow scroll to finish
        }
      }
      // If it's a normal link, it will navigate as usual
    },
    [isMobileMenuOpen, pathname, closeMobileMenu],
  );

  // Effect for closing desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!openDropdown) return;
      const target = event.target as Node;
      // Check if the click is outside any dropdown trigger or panel
      const isInsideDropdown = Array.from(
        document.querySelectorAll('.dropdown-trigger, .dropdown-panel'),
      ).some((el) => el.contains(target));

      if (!isInsideDropdown) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  // Effect for mobile menu keyboard navigation (Escape and Tab trapping)
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (!isMobileMenuOpen || !mobileMenuRef.current) return;

      if (event.key === 'Escape') {
        closeMobileMenu();
        mobileMenuButtonRef.current?.focus(); // Return focus to the menu button
        return;
      }

      if (event.key === 'Tab') {
        const focusableElements = getFocusableElements(mobileMenuRef.current);
        if (focusableElements.length === 0) return;
        handleTabNavigation(event, focusableElements);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeydown);
      // Focus the close button or first item in the mobile menu when it opens
      const firstFocusable = mobileMenuRef.current?.querySelector<HTMLElement>(
        'button[aria-label="Close menu"], a[href], button:not([disabled])',
      );
      firstFocusable?.focus();
    }

    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isMobileMenuOpen, closeMobileMenu]); // Added closeMobileMenu to dependencies

  const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
    return Array.from(
      container.querySelectorAll<HTMLElement>(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => el.offsetParent !== null && !el.hasAttribute('disabled')); // Filter out non-visible or disabled elements
  };

  const handleTabNavigation = (
    event: KeyboardEvent,
    elements: HTMLElement[],
  ) => {
    const firstElement = elements[0];
    const lastElement = elements[elements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement.focus(); // Wrap to last
        event.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        firstElement.focus(); // Wrap to first
        event.preventDefault();
      }
    }
  };

  const isActivePath = (href: string, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    // For parent items like '/shows', consider active if current path starts with it
    if (href === '/') return pathname === '/'; // Special case for home
    return pathname.startsWith(href);
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 ease-out isolate',
        !hasScrolled &&
          !isMobileMenuOpen &&
          'bg-transparent border-b border-transparent',
        hasScrolled &&
          !isMobileMenuOpen &&
          'bg-brand-black/90 backdrop-blur-md shadow-xl border-b border-brand-yellow/30 scale-y-[1.01]', // Added backdrop-blur & subtle border
        isMobileMenuOpen &&
          'bg-brand-black shadow-xl border-b border-brand-gray-dark/60',
      )}
    >
      {/* SVG Background Layer - adjust path and opacity as needed */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 z-[-1]'
        style={{
          backgroundImage: "url('/svg/4.svg')", // Ensure this SVG is in public/svg
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          opacity: hasScrolled || isMobileMenuOpen ? 0.02 : 0.04, // More subtle when scrolled/menu open
          mixBlendMode: 'soft-light', // Experiment with blend modes
          transition: 'opacity 0.3s ease-out',
        }}
      />

      <div className='container mx-auto flex items-center justify-between px-4 py-2.5 md:py-3'>
        <LogoLink closeMobileMenu={closeMobileMenu} />

        <DesktopNavigation
          pathname={pathname}
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
          isActivePath={isActivePath}
          ctaLink={ctaLink}
          handleCtaClick={handleCtaClick}
          isMounted={isMounted}
        />

        <MobileMenuButton
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          mobileMenuButtonRef={mobileMenuButtonRef}
        />
      </div>

      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        isMounted={isMounted}
        closeMobileMenu={closeMobileMenu}
        mobileMenuRef={mobileMenuRef}
        pathname={pathname}
        ctaLink={ctaLink}
        handleCtaClick={handleCtaClick}
        // isActivePath is implicitly used within MobileMenuItem
      />
    </header>
  );
}

// --- Sub-components ---

function LogoLink({ closeMobileMenu }: { closeMobileMenu: () => void }) {
  return (
    <Link
      href='/'
      className='group flex shrink-0 items-center space-x-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black md:space-x-3'
      aria-label='TinyStage Homepage'
      onClick={() => {
        closeMobileMenu(); // Close mobile menu if open
        // No need to setOpenDropdown(null) here, handled by click outside or item click
      }}
    >
      <div className='transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-3deg] motion-safe:group-focus-visible:scale-110'>
        <Image
          src='/images/Logo2.png' // Ensure this path is correct
          alt='TinyStage Logo'
          width={44}
          height={44}
          priority
          className='object-contain motion-safe:animate-glint' // Assuming animate-glint is defined
        />
      </div>
      {/* Optional: Text logo for larger screens if desired */}
      {/* <span className="font-display text-2xl text-brand-white group-hover:text-brand-yellow transition-colors">TinyStage</span> */}
    </Link>
  );
}

function DesktopNavigation({
  pathname,
  openDropdown,
  toggleDropdown,
  isActivePath,
  ctaLink,
  handleCtaClick,
  isMounted,
}: {
  pathname: string;
  openDropdown: string | null;
  toggleDropdown: (href: string) => void;
  isActivePath: (href: string, exact?: boolean) => boolean;
  ctaLink: { href: string; label: string };
  handleCtaClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  isMounted: boolean;
}) {
  return (
    <nav className='hidden md:flex items-center space-x-1 lg:space-x-2'>
      {NAV_LINKS.map((item) => (
        <div key={item.href} className='group relative mx-0.5 dropdown-trigger'>
          {' '}
          {/* Added dropdown-trigger */}
          {'subItems' in item && item.subItems ? (
            <DropdownNavItem
              item={item as NavLink & { subItems: ReadonlyArray<SubItem> }}
              isActive={isActivePath(item.href)}
              isOpen={openDropdown === item.href}
              onToggle={() => toggleDropdown(item.href)}
              isMounted={isMounted}
              pathname={pathname}
              // No need for setOpenDropdown here, onToggle handles it
            />
          ) : (
            <SimpleNavItem
              item={item}
              isActive={isActivePath(item.href, item.href === ('/' as string))}
            />
          )}
        </div>
      ))}
      <CTAButton ctaLink={ctaLink} handleCtaClick={handleCtaClick} />
    </nav>
  );
}

function DropdownNavItem({
  item,
  isActive,
  isOpen,
  onToggle,
  isMounted,
  pathname,
}: {
  item: NavLink & { subItems: ReadonlyArray<SubItem> };
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void; // Simplified onToggle to just toggle
  isMounted: boolean;
  pathname: string;
}) {
  return (
    <>
      <button
        type='button'
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
          if (e.key === 'Escape' && isOpen) {
            onToggle();
          }
        }}
        aria-haspopup='menu'
        aria-expanded={isOpen}
        aria-controls={`dropdown-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
        className={cn(
          'relative inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black',
          isActive && !isOpen
            ? 'text-brand-yellow font-semibold'
            : isOpen
              ? 'text-brand-yellow bg-brand-gray-dark/30'
              : 'text-brand-gray-light hover:text-brand-yellow hover:bg-brand-gray-dark/30',
        )}
      >
        {item.label}
        {isActive && !isOpen && (
          <span className='absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3/5 h-[2px] bg-brand-yellow rounded-full motion-safe:animate-scaleInX origin-center' />
        )}
        <span
          aria-hidden='true'
          className={cn(
            'ml-1.5 transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1.5)]',
            isOpen ? 'rotate-180' : '',
            (isActive && !isOpen) || isOpen
              ? 'text-brand-yellow'
              : 'text-brand-gray-light group-hover:text-brand-yellow',
          )}
        >
          ▾
        </span>
      </button>
      {isOpen && (
        <DropdownPanel
          item={item}
          pathname={pathname}
          isMounted={isMounted}
          onClose={onToggle} // Close dropdown when an item is clicked or panel loses focus conceptually
        />
      )}
    </>
  );
}

function DropdownPanel({
  item,
  pathname,
  isMounted, // isMounted for panel entry animation if needed
  onClose,
}: {
  item: NavLink & { subItems: ReadonlyArray<SubItem> };
  pathname: string;
  isMounted: boolean;
  onClose: () => void;
}) {
  return (
    <div
      id={`dropdown-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
      className={cn(
        'dropdown-panel absolute left-1/2 top-full mt-2.5 w-56 -translate-x-1/2 origin-top transform rounded-lg bg-brand-gray-dark/95 shadow-2xl z-30 backdrop-blur-md border border-brand-gray-dark/50',
        'transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1.5)] motion-safe:will-change-[transform,opacity]',
        isMounted // Rely on parent's isOpen to control visibility via conditional rendering
          ? 'visible scale-100 opacity-100'
          : 'invisible scale-95 opacity-0 -translate-y-1 pointer-events-none', // Initial state for entry animation
      )}
      role='menu'
      aria-labelledby={item.label}
    >
      <div // Arrow pointing up
        className='absolute -top-[7px] left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden'
        aria-hidden='true'
      >
        <div className='w-3 h-3 bg-brand-gray-dark/95 rotate-45 transform origin-center -translate-y-1/2 shadow-[0_0_0_1px_rgba(var(--brand-gray-dark-rgb),0.5)]' />
      </div>
      <ul className='p-1.5'>
        {' '}
        {/* Slightly more padding */}
        {item.subItems.map((subItem, idx) => (
          <DropdownItem
            key={subItem.href}
            subItem={subItem}
            pathname={pathname} // Pass pathname directly
            isMounted={isMounted} // For staggered animation
            index={idx}
            onClose={onClose}
          />
        ))}
      </ul>
    </div>
  );
}

function DropdownItem({
  subItem,
  pathname,
  isMounted,
  index,
  onClose,
}: {
  subItem: SubItem;
  pathname: string;
  isMounted: boolean;
  index: number;
  onClose: () => void;
}) {
  const isActive =
    pathname === subItem.href || pathname.startsWith(subItem.href + '/');
  return (
    <li>
      <Link
        href={subItem.href}
        role='menuitem'
        onClick={onClose}
        className={cn(
          'group/subitem relative block whitespace-nowrap rounded-md px-3.5 py-2 text-[0.875rem] transition-all duration-150 ease-out', // Adjusted padding
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-1 focus-visible:ring-offset-brand-gray-dark',
          isActive
            ? 'bg-brand-yellow text-brand-black font-semibold'
            : 'text-brand-gray-light hover:bg-brand-black/80 hover:text-brand-yellow focus-visible:bg-brand-black/80',
          isMounted && 'motion-safe:animate-dropdownItemEnter', // Use your defined animation
        )}
        style={{
          animationDelay: isMounted ? `${index * 35 + 20}ms` : '0ms', // Fine-tuned delay
        }}
      >
        <span
          className={cn(
            'absolute left-0 top-1/2 -translate-y-1/2 h-full w-1 bg-brand-yellow rounded-r-full transition-all duration-200 ease-out',
            isActive
              ? 'opacity-100 scale-y-75'
              : 'opacity-0 scale-y-0 group-hover/subitem:opacity-100 group-hover/subitem:scale-y-50 group-focus-visible/subitem:opacity-100 group-focus-visible/subitem:scale-y-50',
          )}
        />
        <span className='ml-1.5'>{subItem.label}</span>
      </Link>
    </li>
  );
}

function SimpleNavItem({
  item,
  isActive,
}: {
  item: NavLink;
  isActive: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        'relative inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black',
        isActive
          ? 'text-brand-yellow font-semibold'
          : 'text-brand-gray-light hover:text-brand-yellow hover:bg-brand-gray-dark/30 focus-visible:bg-brand-gray-dark/30',
      )}
    >
      {item.label}
      {isActive && (
        <span className='absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3/5 h-[2px] bg-brand-yellow rounded-full motion-safe:animate-scaleInX origin-center' />
      )}
    </Link>
  );
}

function CTAButton({
  ctaLink,
  handleCtaClick,
}: {
  ctaLink: { href: string; label: string };
  handleCtaClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link
      href={ctaLink.href}
      className='ml-3 md:ml-4 group/cta'
      onClick={handleCtaClick}
    >
      {/* Using your Button component */}
      <Button
        variant='primary' // Or 'solid' if that's your primary yellow button
        size='sm' // Or your default size
        className='group-hover/cta:brightness-110 group-hover/cta:shadow-lg transition-all duration-200 ease-out transform group-hover/cta:scale-[1.02] active:scale-[0.98]'
      >
        {ctaLink.label}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='w-4 h-4 ml-1.5 opacity-80 group-hover/cta:opacity-100 transition-opacity duration-200'
        >
          <path
            fillRule='evenodd'
            d='M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z'
            clipRule='evenodd'
          />
        </svg>
      </Button>
    </Link>
  );
}

function MobileMenuButton({
  isMobileMenuOpen,
  toggleMobileMenu,
  mobileMenuButtonRef,
}: {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  mobileMenuButtonRef: React.RefObject<HTMLButtonElement>;
}) {
  return (
    <button
      ref={mobileMenuButtonRef}
      className={cn(
        'md:hidden relative z-50 flex flex-col items-center justify-center w-10 h-10 rounded-md focus:outline-none',
        'focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black transition-colors duration-200 ease-out',
        isMobileMenuOpen
          ? 'text-brand-yellow hover:bg-brand-gray-dark/50'
          : 'text-brand-white hover:bg-brand-gray-dark/70',
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
  );
}

// --- ENHANCED MobileMenu Component ---
function MobileMenu({
  isMobileMenuOpen,
  isMounted,
  closeMobileMenu,
  mobileMenuRef,
  pathname,
  ctaLink,
  handleCtaClick,
}: {
  isMobileMenuOpen: boolean;
  isMounted: boolean;
  closeMobileMenu: () => void;
  mobileMenuRef: React.RefObject<HTMLDivElement>;
  pathname: string;
  ctaLink: { href: string; label: string };
  handleCtaClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  if (!isMobileMenuOpen && !isMounted) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-40 flex',
        isMobileMenuOpen
          ? 'animate-fadeInBasic'
          : isMounted
            ? 'animate-fadeOutBasic pointer-events-none'
            : 'opacity-0 pointer-events-none',
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-brand-black/80 backdrop-blur-md motion-safe:will-change-opacity transition-opacity duration-300',
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0',
        )}
        onClick={closeMobileMenu}
        aria-hidden='true'
      />
      <div
        ref={mobileMenuRef}
        id='mobile-menu-panel'
        className={cn(
          'relative ml-auto h-full w-[clamp(280px,80vw,340px)] transform bg-brand-black shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.5)]',
          'motion-safe:will-change-transform border-l-2 border-brand-yellow/50 flex flex-col',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        role='dialog'
        aria-modal='true'
        aria-labelledby='mobile-menu-heading'
        style={{ visibility: isMobileMenuOpen ? 'visible' : 'hidden' }}
      >
        {isMobileMenuOpen && (
          <>
            <div className='flex items-center justify-between border-b-2 border-brand-yellow/30 px-5 py-4'>
              <h2
                id='mobile-menu-heading'
                className='text-xl font-semibold text-brand-yellow tracking-tight'
              >
                Menu
              </h2>
              <button
                onClick={closeMobileMenu}
                className='rounded-md p-2 text-brand-white transition-colors hover:bg-brand-gray-dark/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-1 focus-visible:ring-offset-brand-black'
                aria-label='Close menu'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <nav className='flex-grow overflow-y-auto p-3'>
              <ul className='space-y-0'>
                {NAV_LINKS.map((item, idx) => (
                  <MobileMenuItem
                    key={item.href}
                    item={item}
                    index={idx}
                    isMounted={isMounted}
                    isMobileMenuOpen={isMobileMenuOpen}
                    pathname={pathname}
                    closeMobileMenu={closeMobileMenu}
                  />
                ))}
                <li
                  className={cn(
                    'px-1 pt-6 pb-2',
                    isMounted &&
                      isMobileMenuOpen &&
                      'motion-safe:animate-fadeInSlideRight',
                  )}
                  style={{
                    animationDelay:
                      isMounted && isMobileMenuOpen
                        ? `${NAV_LINKS.length * 50 + 150}ms`
                        : '0ms',
                  }}
                >
                  <Link
                    href={ctaLink.href}
                    onClick={(e) => {
                      closeMobileMenu();
                      handleCtaClick(e);
                    }}
                    className='block rounded-lg bg-brand-yellow px-4 py-3.5 text-center text-base font-bold text-brand-black shadow-lg transition-all duration-200 ease-out hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black'
                  >
                    {ctaLink.label}
                  </Link>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </div>
  );
}

function MobileMenuItem({
  item,
  index,
  isMounted,
  isMobileMenuOpen,
  pathname,
  closeMobileMenu,
}: {
  item: NavLink;
  index: number;
  isMounted: boolean;
  isMobileMenuOpen: boolean;
  pathname: string;
  closeMobileMenu: () => void;
}) {
  const hasSubItems =
    'subItems' in item && item.subItems && item.subItems.length > 0;
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // Check if the parent link or any of its sub-items are active
  const isActive = useMemo(() => {
    if (
      !hasSubItems &&
      (pathname === item.href || pathname.startsWith(item.href + '/'))
    )
      return true;
    if (hasSubItems) {
      return item.subItems.some(
        (sub) => pathname === sub.href || pathname.startsWith(sub.href + '/'),
      );
    }
    return false;
  }, [pathname, item, hasSubItems]);

  const handleToggleOrNavigate = () => {
    if (hasSubItems) {
      setIsSubMenuOpen(!isSubMenuOpen);
    } else {
      closeMobileMenu();
      // Navigation will happen via Link component
    }
  };

  return (
    <li
      className={cn(
        isMounted && isMobileMenuOpen && 'motion-safe:animate-fadeInSlideRight', // Animate only when menu is opening
        'border-b border-brand-gray-dark/30 last:border-b-0',
      )}
      style={{
        animationDelay:
          isMounted && isMobileMenuOpen ? `${index * 50 + 80}ms` : '0ms',
      }}
    >
      {hasSubItems ? (
        <button
          type='button'
          onClick={handleToggleOrNavigate}
          aria-expanded={isSubMenuOpen}
          aria-controls={`mobile-submenu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
          className={cn(
            'flex w-full items-center justify-between rounded-md px-4 py-3.5 text-left text-base font-medium transition-colors duration-150 ease-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-1 focus-visible:ring-offset-brand-black',
            isActive && !hasSubItems // Active style for simple links
              ? 'bg-brand-yellow/10 text-brand-yellow'
              : isActive && hasSubItems // Active style for parent of active sub-item
                ? 'text-brand-yellow'
                : 'text-brand-gray-light hover:bg-brand-gray-dark/60 hover:text-brand-yellow',
            isActive || (isSubMenuOpen && hasSubItems)
              ? 'font-semibold'
              : 'font-medium', // Bolder if active or submenu open
          )}
        >
          {item.label}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={cn(
              'h-5 w-5 transform transition-transform duration-200 ease-out text-brand-gray-light group-hover:text-brand-yellow',
              (isActive || isSubMenuOpen) && '!text-brand-yellow', // Chevron color matches parent
              isSubMenuOpen ? 'rotate-180' : 'rotate-0',
            )}
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      ) : (
        <Link
          href={item.href}
          onClick={handleToggleOrNavigate}
          className={cn(
            'flex w-full items-center justify-between rounded-md px-4 py-3.5 text-left text-base font-medium transition-colors duration-150 ease-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-1 focus-visible:ring-offset-brand-black',
            isActive
              ? 'bg-brand-yellow/10 text-brand-yellow'
              : 'text-brand-gray-light hover:bg-brand-gray-dark/60 hover:text-brand-yellow',
            isActive ? 'font-semibold' : 'font-medium',
          )}
        >
          {item.label}
        </Link>
      )}

      {hasSubItems && (
        <div
          id={`mobile-submenu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
          className={cn(
            'overflow-hidden transition-all duration-300 ease-out motion-safe:will-change-[max-height,opacity]',
            isSubMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <ul className='pl-5 pt-1.5 pb-2 space-y-1 border-l-2 border-brand-yellow/20 ml-4 my-1'>
            {' '}
            {/* Indent & style sub-menu */}
            {item.subItems.map((subItem, subIdx) => {
              const isSubItemActive =
                pathname === subItem.href ||
                pathname.startsWith(subItem.href + '/');
              return (
                <li
                  key={subItem.href}
                  className={cn(
                    isMounted &&
                      isMobileMenuOpen &&
                      'motion-safe:animate-fadeInSlideRight',
                  )} // Animate only when menu is opening
                  style={{
                    animationDelay:
                      isMounted && isMobileMenuOpen
                        ? `${index * 50 + 80 + (subIdx + 1) * 30}ms`
                        : '0ms',
                  }}
                >
                  <Link
                    href={subItem.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      'block rounded-md px-3 py-2.5 text-sm transition-colors duration-150 ease-out',
                      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-yellow focus-visible:ring-offset-1 focus-visible:ring-offset-brand-black',
                      isSubItemActive
                        ? 'bg-brand-yellow/15 text-brand-yellow font-medium'
                        : 'text-brand-gray-light/80 hover:bg-brand-gray-dark/50 hover:text-brand-yellow',
                    )}
                  >
                    {subItem.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
}
