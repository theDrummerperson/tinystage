// src/app/support/page.tsx
// Optional, for visual appeal
import Link from 'next/link';

// Optional: Metadata for the page (App Router)
export const metadata = {
  title: 'Support TinyStage | Help Us Grow',
  description:
    'Discover how you can contribute to TinyStage and help us continue to champion local artists and live music experiences.',
};

// You can define different support options here, perhaps with links or details
const supportOptions = [
  {
    id: 'donate',
    title: 'Make a Donation',
    // Example SVG icon (replace with your preferred icons or remove)
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-10 h-10 mx-auto mb-4 text-[var(--brand-yellow)]'
      >
        <path d='M11.625 16.5a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z' />
        <path
          fillRule='evenodd'
          d='M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 20.25 9v7.5A3.75 3.75 0 0 1 16.5 20.25h-9A3.75 3.75 0 0 1 3.75 16.5v-7.5A3.75 3.75 0 0 1 7.5 5.25H5.625a1.875 1.875 0 0 1-1.875-1.875V1.5ZM12 11.25a3.375 3.375 0 0 0-3.375 3.375c0 1.863 1.512 3.375 3.375 3.375s3.375-1.512 3.375-3.375c0-1.863-1.512-3.375-3.375-3.375Z'
          clipRule='evenodd'
        />
      </svg>
    ),
    description:
      'Every contribution, no matter the size, directly fuels our ability to host artists, maintain our space, and bring unique live music to the community. Your generosity keeps the stage lit!',
    ctaText: 'Donate Now',
    ctaLink: '#', // Replace with your donation platform link (e.g., PayPal, Patreon, GoFundMe)
    isExternalLink: true,
  },
  {
    id: 'volunteer',
    title: 'Become a Volunteer',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-10 h-10 mx-auto mb-4 text-[var(--brand-yellow)]'
      >
        <path
          fillRule='evenodd'
          d='M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 5.69 3.117L12 21.75l-5.69-6.633Z'
          clipRule='evenodd'
        />
      </svg>
    ),
    description:
      'Have some time and passion for live music? We occasionally need help with events, promotion, or other tasks. Join our volunteer list to be notified of opportunities.',
    ctaText: 'Join Volunteer List',
    ctaLink: '/contact?subject=Volunteer%20Inquiry', // Link to contact page or a sign-up form
    isExternalLink: false,
  },
  {
    id: 'spread-the-word',
    title: 'Spread the Word',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-10 h-10 mx-auto mb-4 text-[var(--brand-yellow)]'
      >
        <path d='M.75 3.75A.75.75 0 0 1 1.5 3h11.25a.75.75 0 0 1 0 1.5H1.5A.75.75 0 0 1 .75 3.75ZM.75 7.5A.75.75 0 0 1 1.5 6h6A.75.75 0 0 1 7.5 7.5h-6A.75.75 0 0 1 .75 7.5ZM1.5 9h4.5A.75.75 0 0 1 6 10.5h-4.5A.75.75 0 0 1 1.5 9Z' />
        <path d='M17.03 5.22a.75.75 0 0 1 0 1.06l-1.72 1.72c.004.018.01.035.01.053 0 .003-.001.006-.002.009l3.94 3.94a.75.75 0 0 1-1.06 1.06l-3.94-3.939a3.732 3.732 0 0 1-.065.012.75.75 0 0 1-.227-.032l-.003-.001-.004-.002-.002-.001a.75.75 0 0 1-.148-.09L7.03 17.03a.75.75 0 0 1-1.06-1.06l7.22-7.22a.75.75 0 0 1 1.06 0l1.72 1.72c.286.286.429.429.429.565 0 .19-.099.333-.247.462l-3.28 3.001a2.25 2.25 0 1 0 1.06 1.06l3.28-3.001c.423-.386.74-.867.74-1.528 0-.442-.143-.836-.43-1.125l-1.72-1.72Z' />
      </svg>
    ),
    description:
      'Love what we do? Tell your friends, share our events on social media, and bring someone new to a show. Your voice is a powerful way to support the TinyStage community!',
    ctaText: 'Share Our Next Show',
    ctaLink: '/shows', // Link to your shows page
    isExternalLink: false,
  },
];

const SupportPage = () => {
  return (
    <main className='min-h-screen bg-gray-50 text-[var(--brand-black)]'>
      <div className='container mx-auto px-4 py-16 md:py-24'>
        <header className='mb-12 md:mb-16 text-center'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--brand-black)] mb-4'>
            Support TinyStage
          </h1>
          <p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
            Your support helps us shine a spotlight on incredible local artists
            and create memorable live music experiences. Here are a few ways you
            can contribute.
          </p>
        </header>

        <div
          className={`grid grid-cols-1 md:grid-cols-${supportOptions.length === 2 ? '2' : '3'} gap-8 md:gap-10 max-w-5xl mx-auto`}
        >
          {supportOptions.map((option) => (
            <div
              key={option.id}
              className='bg-white p-6 md:p-8 rounded-xl shadow-lg text-center flex flex-col transition-all duration-300 ease-out hover:shadow-2xl hover:scale-[1.02]'
            >
              {option.icon && <div className='mb-4'>{option.icon}</div>}
              <h2 className='text-2xl font-bold text-[var(--brand-black)] mb-4'>
                {option.title}
              </h2>
              <p className='text-gray-700 leading-relaxed mb-6 flex-grow'>
                {option.description}
              </p>
              {option.ctaLink && option.ctaLink !== '#' ? (
                <Link
                  href={option.ctaLink}
                  target={option.isExternalLink ? '_blank' : '_self'}
                  rel={
                    option.isExternalLink ? 'noopener noreferrer' : undefined
                  }
                  className='mt-auto inline-block text-white bg-[var(--brand-yellow)] hover:bg-opacity-90 px-6 py-3 rounded-md font-semibold transition-colors duration-200 ease-out'
                >
                  {option.ctaText}
                </Link>
              ) : (
                <p className='mt-auto text-gray-500'>
                  {/* Placeholder or specific instruction if no direct CTA link */}
                  More info coming soon or contact us!
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Optional: Testimonial or Impact Section */}
        <section className='mt-16 md:mt-24 pt-12 border-t border-gray-200 text-center'>
          <h2 className='text-3xl font-bold text-[var(--brand-black)] mb-6'>
            Why Your Support Matters
          </h2>
          {/* You could have an image here */}
          {/* <div className="relative h-64 w-full max-w-2xl mx-auto mb-6 rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/community-support.jpg" // Replace with a relevant image
              alt="TinyStage community and artists"
              layout="fill"
              objectFit="cover"
            />
          </div> */}
          <p className='text-lg text-gray-600 max-w-2xl mx-auto mb-4'>
            "TinyStage isn't just a venue; it's a vital part of our local music
            scene. Supporting them means supporting the artists who pour their
            hearts out on that stage and the community that comes together to
            listen."
            <br />-{' '}
            <span className='font-semibold'>A Happy Audience Member</span>
          </p>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Join us in making a difference. Every bit of support helps us create
            more TinyStage magic.
          </p>
        </section>
      </div>
    </main>
  );
};

export default SupportPage;
