'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react'; // Added Fragment for potential future use, good practice

// Define navigation items structure for clarity and reusability
const navLinks = [
  { href: '/about', label: 'About' },
  {
    href: '/shows', // Main link for "Shows"
    label: 'Shows',
    subItems: [
      { href: '/shows/upcoming', label: 'Upcoming' },
      { href: '/shows/past', label: 'Past' },
    ],
  },
  {
    href: '/getinvolved', // Main link for "Shows"
    label: 'Get Involved',
    subItems: [
      { href: '/GI/merch', label: 'Merch' },
      { href: '/shows/support', label: 'Support' },
    ],
  },
];

const ctaLink = { href: '/book', label: 'Booking Inquiry' };

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State for ARIA attribute of the "Shows" dropdown (can be expanded for more dropdowns if needed)
  const [isShowsDropdownOpen, setIsShowsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const toggleShowsDropdown = () =>
    setIsShowsDropdownOpen(!isShowsDropdownOpen);

  return (
    <header
      className={`sticky top-0 z-50 bg-[--brand-black]
      ${isMobileMenuOpen ? 'shadow-xl' : 'shadow-md'} border-b border-[--brand-gray-dark]/50 transition-shadow duration-300`}
    >
      <div className='container mx-auto flex items-center justify-between px-4 py-3'>
        {/* Logo */}
        <Link
          href='/'
          className='group flex shrink-0 items-center space-x-3'
          aria-label='Go to Homepage'
          onClick={closeMobileMenu}
        >
          <div className='transition-transform duration-300 ease-out group-hover:scale-105'>
            <Image
              src='/images/Logo2.png'
              alt='TinyStage Icon'
              width={48}
              height={48}
              priority
              className='object-contain' // Ensures image scales nicely if its aspect ratio isn't 1:1
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden items-center md:flex'>
          {navLinks.map((item) => (
            <div key={item.href} className='group relative'>
              {' '}
              {/* Added group-focus-within here is implied by focus on link */}
              <Link
                href={item.href}
                onClick={item.subItems ? toggleShowsDropdown : undefined}
                aria-haspopup={!!item.subItems}
                aria-expanded={item.subItems ? isShowsDropdownOpen : undefined}
                className={`
                  rounded px-3 py-2 text-sm transition-all duration-200 ease-out
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--brand-yellow] focus-visible:ring-offset-2 focus-visible:ring-offset-[--brand-black]
                  ${
                    pathname === item.href ||
                    (item.href !== '/' && pathname.startsWith(item.href + '/'))
                      ? 'text-[--brand-yellow] font-semibold'
                      : 'text-[--brand-gray-light] hover:text-[--brand-yellow]'
                  }
                `}
              >
                {item.label}
                {item.subItems && (
                  <span
                    className={`ml-1.5 inline-block transform transition-transform duration-200 ease-out
                      ${isShowsDropdownOpen || 'group-hover:rotate-180'}`} // Rotate on hover OR if open by click
                  >
                    ▾
                  </span>
                )}
              </Link>
              {item.subItems && (
                <div
                  className={`
                    absolute left-0 top-full mt-2 w-48 origin-top scale-95
                    transform rounded-md border border-[--brand-gray-dark] bg-[--brand-black] shadow-xl
                    opacity-0 transition-all duration-200 ease-out
                    group-hover:visible group-hover:scale-100 group-hover:opacity-100
                    group-focus-within:visible group-focus-within:scale-100 group-focus-within:opacity-100
                    ${isShowsDropdownOpen ? '!visible !scale-100 !opacity-100' : 'invisible'} 
                    /* Ensure visibility if clicked open, even if mouse leaves */
                  `}
                  role='menu' // ARIA role for dropdown
                >
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      role='menuitem' // ARIA role for dropdown items
                      className={`
                        block whitespace-nowrap px-4 py-2.5 text-sm transition-colors duration-200 ease-out
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--brand-yellow] focus-visible:ring-offset-1 focus-visible:ring-offset-[--brand-black]
                        ${
                          pathname === subItem.href
                            ? 'bg-[--brand-gray-dark] text-[--brand-yellow]'
                            : 'text-[--brand-gray-light] hover:bg-[--brand-gray-dark] hover:text-[--brand-yellow]'
                        }
                      `}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            href={ctaLink.href}
            className='ml-5 rounded-md bg-[--brand-yellow] px-4 py-2.5 text-sm font-semibold text-[--brand-black]
              transition-colors duration-200 ease-out hover:bg-yellow-400
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[--brand-black]'
          >
            {ctaLink.label}
          </Link>
        </nav>

        {/* Mobile Menu Button & Panel */}
        <div className='md:hidden'>
          <button
            onClick={toggleMobileMenu}
            className='relative z-30 rounded-md p-2 text-[--brand-white] transition-colors hover:bg-[--brand-gray-dark]/70
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--brand-yellow] focus-visible:ring-offset-1 focus-visible:ring-offset-[--brand-black]'
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls='mobile-menu-panel'
          >
            <div className='space-y-[5px]'>
              {' '}
              {/* Slightly adjusted spacing for crisper lines */}
              <span
                className={`block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out
                  ${isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} // 7px = 5px space + 2px (half of h-0.5 * 2)
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-opacity duration-300
                  ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out
                  ${isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
              />
            </div>
          </button>

          {/* Overlay for Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              className='fixed inset-0 z-20 bg-black/60 backdrop-blur-sm transition-opacity duration-300'
              onClick={closeMobileMenu}
              aria-hidden='true'
            />
          )}

          {/* Mobile Menu Panel */}
          <div
            id='mobile-menu-panel'
            className={`
              fixed right-0 top-0 z-30 h-full w-72 max-w-[80vw] transform bg-[--brand-black]
              shadow-2xl transition-transform duration-300 ease-out
              ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
            role='dialog'
            aria-modal='true'
            aria-labelledby='mobile-menu-heading'
          >
            <div className='flex h-full flex-col'>
              <div className='flex items-center justify-between border-b border-[--brand-gray-dark]/50 px-4 py-3'>
                <h2
                  id='mobile-menu-heading'
                  className='text-lg font-semibold text-[--brand-white]'
                >
                  Menu
                </h2>
                {/* Optional: Close button inside panel if preferred, styled like hamburger */}
                <button
                  onClick={closeMobileMenu}
                  className='rounded-md p-2 text-[--brand-white] transition-colors hover:bg-[--brand-gray-dark]/70
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--brand-yellow] focus-visible:ring-offset-1 focus-visible:ring-offset-[--brand-black]'
                  aria-label='Close menu'
                >
                  {/* Simple X icon */}
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
                <ul className='space-y-2'>
                  {navLinks.map((item) => (
                    <li key={item.href}>
                      {/* For mobile, "Shows" links directly to /shows. Sub-items are not expanded here. */}
                      {/* If mobile sub-menus were desired, this would need an accordion component. */}
                      <Link
                        href={item.href}
                        onClick={() => {
                          closeMobileMenu();
                          // If "Shows" has subItems and it was clicked, ensure its desktop dropdown state is sensible.
                          // For now, mobile "Shows" navigates directly.
                        }}
                        className={`
                          block rounded-md px-3 py-2.5 text-base transition-colors duration-200 ease-out
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--brand-yellow] focus-visible:ring-offset-1 focus-visible:ring-offset-[--brand-black]
                          ${
                            pathname === item.href ||
                            (item.href !== '/' &&
                              pathname.startsWith(item.href + '/'))
                              ? 'bg-[--brand-gray-dark] text-[--brand-yellow] font-medium'
                              : 'text-[--brand-gray-light] hover:bg-[--brand-gray-dark]/70 hover:text-[--brand-yellow]'
                          }
                        `}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={ctaLink.href}
                      onClick={closeMobileMenu}
                      className='mt-4 block rounded-md bg-[--brand-yellow] px-3 py-3 text-center text-base font-semibold text-[--brand-black]
                        transition-colors duration-200 ease-out hover:bg-yellow-400
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-1 focus-visible:ring-offset-[--brand-black]'
                    >
                      {ctaLink.label}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
