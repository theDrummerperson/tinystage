'use client';

import Logo from '@/components/Logo';

// Social media icons with proper paths
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' />
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' />
  </svg>
);

// Social links data
const socialLinks = [
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
    url: 'http://www.instagram.com/tinystage_erie',
    icon: InstagramIcon,
    ariaLabel: 'TinyStage on Instagram',
  },
];

export default function Footer() {
  return (
    <footer className='bg-[--brand-black] text-[--brand-white] py-16 sm:py-20'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12 lg:gap-16'>
          {/* Column 1: Brand Identity */}
          <div className='space-y-4'>
            <div className='inline-block'>
              <Logo />
            </div>
            <p className='max-w-xs text-sm leading-relaxed text-[--brand-gray-medium]'>
              Erie's only intimate concert series celebrating diverse musical
              talent and fostering community through live music.
            </p>
          </div>

          {/* Column 2: Connect */}
          <div>
            <h3 className='mb-5 text-lg font-semibold tracking-tight text-[--brand-white]'>
              Get In Touch
            </h3>
            <ul className='space-y-3'>
              <li>
                <a
                  href='mailto:thetinystage@gmail.com'
                  className='text-sm text-[--brand-gray-medium] transition-colors duration-200 ease-out hover:text-[var(--brand-yellow)] focus:outline-none focus-visible:rounded focus-visible:text-[var(--brand-yellow)] focus-visible:underline'
                >
                  thetinystage@gmail.com
                </a>
              </li>
              <li>
                <div className='flex items-center space-x-4'>
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={social.ariaLabel}
                      className='text-[--brand-gray-medium] transition-colors duration-200 ease-out hover:text-[var(--brand-yellow)] focus:outline-none focus-visible:rounded focus-visible:text-[var(--brand-yellow)]'
                    >
                      <span className='sr-only'>{social.name}</span>
                      <social.icon className='h-6 w-6' />
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Stay Updated (Newsletter) */}
          <div>
            <h3 className='mb-5 text-lg font-semibold tracking-tight text-[--brand-white]'>
              Stay Updated
            </h3>
            <form
              className='flex'
              onSubmit={(e) => {
                e.preventDefault(); /* Handle submission */
              }}
            >
              <label htmlFor='footer-email' className='sr-only'>
                Your email address
              </label>
              <input
                id='footer-email'
                type='email'
                name='email'
                required
                autoComplete='email'
                placeholder='Enter your email'
                className='
                  w-full min-w-0 appearance-none rounded-l-md border border-r-0 border-[var(--brand-gray-dark)]
                  bg-[var(--brand-gray-darkest)] px-3.5 py-2.5 text-sm text-[--brand-white] placeholder-[var(--brand-gray-medium)]
                  shadow-sm transition-colors duration-200 ease-out
                  focus:border-[var(--brand-yellow)] focus:outline-none focus:ring-2
                  focus:ring-[var(--brand-yellow)] focus:ring-offset-2 focus:ring-offset-[var(--brand-black)]
                '
              />
              <button
                type='submit'
                className='
                  shrink-0 rounded-r-md border border-[var(--brand-yellow)] border-l-transparent bg-[var(--brand-yellow)]
                  px-4 py-2.5 text-sm font-semibold text-[--brand-black)]
                  shadow-sm transition-colors duration-200 ease-out hover:bg-yellow-400
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300
                  focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-black)]
                '
              >
                Join
              </button>
            </form>
            <p className='mt-3 text-xs leading-normal text-[--brand-gray-medium]'>
              Get the latest show announcements, artist spotlights, and
              community news.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-16 border-t border-[var(--brand-gray-dark)] pt-8 text-center sm:mt-20'>
          <p className='text-xs text-[--brand-gray-medium]'>
            © {new Date().getFullYear()} TinyStage Concert Series. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
