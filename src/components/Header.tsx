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

// Constants for navigation items
const NAV_LINKS = [
  { href: '/about', label: 'About' },
  {
    href: '/shows',
    label: 'Shows',
    subItems: [
      { href: '/shows/upcoming', label: 'Upcoming Shows' },
      { href: '/shows/archive', label: 'Past Performances' },
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
] as const;

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

  // Memoized CTA link configuration
  const ctaLink = useMemo(
    () => ({
      href: pathname === '/' ? '#booking' : '/#booking',
      label: 'Booking Inquiry',
    }),
    [pathname],
  );

  // Scroll effect handler
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mount and body overflow effect
  useEffect(() => {
    setIsMounted(true);
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Mobile menu handlers
  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((prev) => !prev),
    [],
  );
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  // Dropdown handlers
  const toggleDropdown = useCallback((href: string) => {
    setOpenDropdown((prev) => (prev === href ? null : href));
  }, []);

  // CTA click handler with smooth scrolling
  const handleCtaClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      setOpenDropdown(null);
      if (isMobileMenuOpen) closeMobileMenu();

      const href = event.currentTarget.getAttribute('href');
      if (href?.startsWith('#') && pathname === '/') {
        event.preventDefault();
        const target = document.getElementById(href.substring(1));
        if (target) {
          const headerHeight = headerRef.current?.offsetHeight || 70;
          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            20;

          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
          setTimeout(() => {
            if (window.location.hash !== href) {
              window.history.pushState(null, '', href);
            }
          }, 400);
        }
      }
    },
    [isMobileMenuOpen, pathname, closeMobileMenu],
  );

  // Click outside dropdown handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!openDropdown) return;

      const target = event.target as Node;
      const isInsideDropdown = Array.from(
        document.querySelectorAll('.dropdown-trigger, .dropdown-panel'),
      ).some((el) => el.contains(target));

      if (!isInsideDropdown) setOpenDropdown(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  // Keyboard navigation for mobile menu
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (!isMobileMenuOpen || !mobileMenuRef.current) return;

      if (event.key === 'Escape') {
        closeMobileMenu();
        mobileMenuButtonRef.current?.focus();
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
      const closeButton =
        mobileMenuRef.current?.querySelector<HTMLButtonElement>(
          '[aria-label="Close menu"]',
        );
      closeButton?.focus();
    }

    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Helper function to get focusable elements
  const getFocusableElements = (container: HTMLElement) => {
    return Array.from(
      container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => el.offsetParent !== null);
  };

  // Helper function for tab navigation
  const handleTabNavigation = (
    event: KeyboardEvent,
    elements: HTMLElement[],
  ) => {
    const firstElement = elements[0];
    const lastElement = elements[elements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      event.preventDefault();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      event.preventDefault();
    }
  };

  // Check if a nav item is active
  const isActiveLink = (href: string) => {
    return (
      pathname === href ||
      (href === '/shows' && pathname.startsWith('/shows/')) ||
      pathname.startsWith(href)
    );
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 ease-out',
        !hasScrolled &&
          !isMobileMenuOpen &&
          'bg-transparent border-b border-transparent',
        hasScrolled &&
          !isMobileMenuOpen &&
          'bg-brand-black shadow-xl border-b-2 border-brand-yellow scale-y-[1.01]',
        isMobileMenuOpen &&
          'bg-brand-black shadow-xl border-b border-brand-gray-dark/60',
      )}
    >
      <div className='container mx-auto flex items-center justify-between px-4 py-2.5 md:py-3'>
        <LogoLink closeMobileMenu={closeMobileMenu} />

        <DesktopNavigation
          pathname={pathname}
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
          isActiveLink={isActiveLink}
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
      />
    </header>
  );
}

// Sub-components for better organization

function LogoLink({ closeMobileMenu }: { closeMobileMenu: () => void }) {
  return (
    <Link
      href='/'
      className='group flex shrink-0 items-center space-x-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black md:space-x-3'
      aria-label='Go to Homepage'
      onClick={() => {
        closeMobileMenu();
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
  );
}

function DesktopNavigation({
  pathname,
  openDropdown,
  toggleDropdown,
  isActiveLink,
  ctaLink,
  handleCtaClick,
  isMounted,
}: {
  pathname: string;
  openDropdown: string | null;
  toggleDropdown: (href: string) => void;
  isActiveLink: (href: string) => boolean;
  ctaLink: { href: string; label: string };
  handleCtaClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  isMounted: boolean;
}) {
  return (
    <nav className='hidden md:flex items-center space-x-1 lg:space-x-2'>
      {NAV_LINKS.map((item) => (
        <div key={item.href} className='group relative mx-0.5'>
          {'subItems' in item ? (
            <DropdownNavItem
              item={item as NavLink & { subItems: readonly SubItem[] }}
              isActive={isActiveLink(item.href)}
              isOpen={openDropdown === item.href}
              onToggle={toggleDropdown}
              isMounted={isMounted}
              pathname={pathname}
            />
          ) : (
            <SimpleNavItem item={item} isActive={isActiveLink(item.href)} />
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
  item: NavLink & { subItems: readonly SubItem[] };
  isActive: boolean;
  isOpen: boolean;
  onToggle: (href: string) => void;
  isMounted: boolean;
  pathname: string;
}) {
  return (
    <>
      <button
        type='button'
        onClick={() => onToggle(item.href)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle(item.href);
          }
          if (e.key === 'Escape') onToggle(item.href);
        }}
        aria-haspopup='menu'
        aria-expanded={isOpen}
        aria-controls={`dropdown-${item.label.toLowerCase().replace(' ', '-')}`}
        className={cn(
          'dropdown-trigger relative inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black',
          isActive
            ? 'text-brand-yellow font-semibold'
            : isOpen
              ? 'text-brand-yellow'
              : 'text-brand-gray-light hover:text-brand-yellow',
          (isOpen && isActive) ||
            'hover:bg-brand-gray-dark/30 focus-visible:bg-brand-gray-dark/30',
        )}
      >
        {item.label}
        {isActive && (
          <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-brand-yellow rounded-full motion-safe:animate-scaleInX' />
        )}
        <span
          aria-hidden='true'
          className={cn(
            'ml-1.5 transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1.5)]',
            isOpen ? 'rotate-180' : 'group-hover:rotate-180',
            isActive
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
          onClose={() => onToggle(item.href)}
        />
      )}
    </>
  );
}

function DropdownPanel({
  item,
  pathname,
  isMounted,
  onClose,
}: {
  item: NavLink & { subItems: readonly SubItem[] };
  pathname: string;
  isMounted: boolean;
  onClose: () => void;
}) {
  return (
    <div
      id={`dropdown-${item.label.toLowerCase().replace(' ', '-')}`}
      className={cn(
        'dropdown-panel absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 origin-top transform rounded-md bg-brand-gray-dark/95 shadow-xl z-20',
        'transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1.5)] motion-safe:will-change-[transform,opacity]',
        isMounted
          ? 'visible scale-100 opacity-100'
          : 'invisible scale-95 opacity-0 translate-y-1 pointer-events-none',
      )}
      role='menu'
      aria-labelledby={item.label}
    >
      <div
        className='absolute -top-[7px] left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden'
        aria-hidden='true'
      >
        <div className='w-3 h-3 bg-brand-gray-dark/95 rotate-45 transform origin-center -translate-y-1/2 shadow-[0_0_0_1px_var(--brand-yellow)/20]' />
      </div>
      <ul className='p-1'>
        {item.subItems.map((subItem, idx) => (
          <DropdownItem
            key={subItem.href}
            subItem={subItem}
            isActive={pathname === subItem.href}
            isMounted={isMounted}
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
  isActive,
  isMounted,
  index,
  onClose,
}: {
  subItem: SubItem;
  isActive: boolean;
  isMounted: boolean;
  index: number;
  onClose: () => void;
}) {
  return (
    <li>
      <Link
        href={subItem.href}
        role='menuitem'
        onClick={onClose}
        className={cn(
          'group/subitem relative block whitespace-nowrap rounded px-4 py-2 text-[0.875rem] transition-all duration-150 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-1 focus-visible:ring-offset-brand-gray-dark',
          isActive
            ? 'bg-brand-yellow text-brand-black font-semibold'
            : 'text-brand-gray-light hover:bg-brand-black/80 hover:text-brand-yellow focus-visible:bg-brand-black/80',
          isMounted && 'motion-safe:animate-fadeInSlideUp',
        )}
        style={{
          animationDelay: isMounted ? `${index * 40 + 30}ms` : '0ms',
        }}
      >
        <span className='absolute left-0 top-1/2 -translate-y-1/2 h-3/5 w-1 bg-brand-yellow rounded-r-full opacity-0 group-hover/subitem:opacity-100 group-focus-visible/subitem:opacity-100 transition-opacity duration-150' />
        {subItem.label}
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
          : 'text-brand-gray-light hover:text-brand-yellow hover:bg-brand-gray-dark/30',
      )}
    >
      {item.label}
      {isActive && (
        <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-brand-yellow rounded-full motion-safe:animate-scaleInX' />
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
      <Button
        variant='primary'
        className='px-5 py-2 text-sm font-semibold text-brand-black shadow-md group-hover/cta:shadow-lg group-hover/cta:brightness-110 transition-all duration-200 ease-out transform group-hover/cta:scale-[1.03] active:scale-[0.97]'
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
  if (!isMobileMenuOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-40 flex',
        isMounted ? 'animate-fadeInBasic' : 'opacity-0 pointer-events-none',
      )}
      key={isMobileMenuOpen ? 'menu-open' : 'menu-closed'}
    >
      <div
        className='absolute inset-0 bg-brand-black/70 backdrop-blur-sm motion-safe:will-change-opacity'
        onClick={closeMobileMenu}
        aria-hidden='true'
      />
      <div
        ref={mobileMenuRef}
        id='mobile-menu-panel'
        className={cn(
          'relative ml-auto h-full w-[clamp(280px,75vw,320px)] transform bg-brand-black shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.5)]',
          'motion-safe:will-change-transform border-l border-brand-gray-dark/50 flex flex-col',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        role='dialog'
        aria-modal='true'
        aria-labelledby='mobile-menu-heading'
      >
        <div className='flex items-center justify-between border-b border-brand-gray-dark/50 px-4 py-3'>
          <h2
            id='mobile-menu-heading'
            className='text-lg font-semibold text-brand-white'
          >
            Navigation
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
            {NAV_LINKS.map((item, idx) => (
              <MobileMenuItem
                key={item.href}
                item={item}
                index={idx}
                isMounted={isMounted}
                isActive={
                  pathname.startsWith(item.href) ||
                  (item.href === '/shows' && pathname.startsWith('/shows/'))
                }
                closeMobileMenu={closeMobileMenu}
              />
            ))}
            <li
              className={cn(
                'pt-2',
                isMounted && 'motion-safe:animate-fadeInSlideRight',
              )}
              style={{
                animationDelay: isMounted
                  ? `${NAV_LINKS.length * 60 + 150}ms`
                  : '0ms',
              }}
            >
              <Link
                href={ctaLink.href}
                onClick={handleCtaClick}
                className='block rounded-md bg-brand-yellow px-3 py-3.5 text-center text-base font-bold text-brand-black shadow-lg transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black'
              >
                {ctaLink.label}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

function MobileMenuItem({
  item,
  index,
  isMounted,
  isActive,
  closeMobileMenu,
}: {
  item: NavLink;
  index: number;
  isMounted: boolean;
  isActive: boolean;
  closeMobileMenu: () => void;
}) {
  return (
    <li
      className={cn(isMounted && 'motion-safe:animate-fadeInSlideRight')}
      style={{
        animationDelay: isMounted ? `${index * 60 + 100}ms` : '0ms',
      }}
    >
      <Link
        href={item.href}
        onClick={closeMobileMenu}
        className={cn(
          'block rounded-md px-3 py-3 text-base transition-colors duration-150 ease-out',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-yellow focus-visible:ring-offset-1 focus-visible:ring-offset-brand-black',
          isActive
            ? 'bg-brand-gray-dark text-brand-yellow font-semibold'
            : 'text-brand-gray-light hover:bg-brand-gray-dark/60 hover:text-brand-yellow active:bg-brand-gray-dark/80',
        )}
      >
        {item.label}
      </Link>
    </li>
  );
}
