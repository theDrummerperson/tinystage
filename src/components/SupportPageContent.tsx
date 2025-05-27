// src/components/SupportPageContent.tsx
"use client"; // This component will have the client-side logic

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'; // No need for useState, useEffect here if it's just displaying static data from props

// Define the structure of a support option if you want to pass it as props
// Or keep the supportOptions array defined here if it's static for this component
const supportOptions = [
  {
    id: 'donate',
    title: 'Make a Donation',
    icon: ( 
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-5 text-brand-yellow group-hover:scale-110 transition-transform duration-300'>
        <path d='M11.625 16.5a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z' />
        <path fillRule='evenodd' d='M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 20.25 9v7.5A3.75 3.75 0 0 1 16.5 20.25h-9A3.75 3.75 0 0 1 3.75 16.5v-7.5A3.75 3.75 0 0 1 7.5 5.25H5.625a1.875 1.875 0 0 1-1.875-1.875V1.5ZM12 11.25a3.375 3.375 0 0 0-3.375 3.375c0 1.863 1.512 3.375 3.375 3.375s3.375-1.512 3.375-3.375c0-1.863-1.512-3.375-3.375-3.375Z' clipRule='evenodd'/>
      </svg>
    ),
    description:
      'Every contribution directly fuels our ability to host artists, maintain our space, and bring unique live music to the community. Your generosity keeps the stage lit!',
    ctaText: 'Donate Now',
    ctaLink: '#', 
    isExternalLink: true,
  },
  {
    id: 'volunteer',
    title: 'Become a Volunteer',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-5 text-brand-yellow group-hover:scale-110 transition-transform duration-300'>
        <path fillRule='evenodd' d='M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 5.69 3.117L12 21.75l-5.69-6.633Z' clipRule='evenodd'/>
      </svg>
    ),
    description:
      'Have time and passion for live music? We occasionally need help with events or promotion. Join our volunteer list to be notified of opportunities.',
    ctaText: 'Join Volunteer List',
    ctaLink: '/contact?subject=Volunteer%20Inquiry',
    isExternalLink: false,
  },
  {
    id: 'spread-the-word',
    title: 'Spread the Word',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-5 text-brand-yellow group-hover:scale-110 transition-transform duration-300'>
        <path d='M.75 3.75A.75.75 0 0 1 1.5 3h11.25a.75.75 0 0 1 0 1.5H1.5A.75.75 0 0 1 .75 3.75ZM.75 7.5A.75.75 0 0 1 1.5 6h6A.75.75 0 0 1 7.5 7.5h-6A.75.75 0 0 1 .75 7.5ZM1.5 9h4.5A.75.75 0 0 1 6 10.5h-4.5A.75.75 0 0 1 1.5 9Z' />
        <path d='M17.03 5.22a.75.75 0 0 1 0 1.06l-1.72 1.72c.004.018.01.035.01.053 0 .003-.001.006-.002.009l3.94 3.94a.75.75 0 0 1-1.06 1.06l-3.94-3.939a3.732 3.732 0 0 1-.065.012.75.75 0 0 1-.227-.032l-.003-.001-.004-.002-.002-.001a.75.75 0 0 1-.148-.09L7.03 17.03a.75.75 0 0 1-1.06-1.06l7.22-7.22a.75.75 0 0 1 1.06 0l1.72 1.72c.286.286.429.429.429.565 0 .19-.099.333-.247.462l-3.28 3.001a2.25 2.25 0 1 0 1.06 1.06l3.28-3.001c.423-.386.74-.867.74-1.528 0-.442-.143-.836-.43-1.125l-1.72-1.72Z' />
      </svg>
    ),
    description:
      'Love what we do? Tell friends, share events on social media, and bring someone new to a show. Your voice is powerful support for the TinyStage community!',
    ctaText: 'Share Our Next Show',
    ctaLink: '/shows',
    isExternalLink: false,
  },
];


const SupportPageContent: React.FC = () => {
  // All the JSX from your original SupportPage component goes here
  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-brand-black via-brand-black to-brand-gray-dark font-sans text-brand-gray-light selection:bg-brand-yellow selection:text-brand-black flex flex-col relative isolate"
      style={{
        backgroundImage: `url('/svg/2.svg')`,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px', 
        backgroundPosition: 'center center',
      }}
    >
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-brand-black via-brand-black to-brand-gray-dark opacity-95 pointer-events-none"></div>

      <header className="relative pt-20 pb-16 md:pt-28 md:pb-24 text-center isolate z-10">
        <div
          className="absolute inset-0 z-[-1] opacity-[0.02] bg-[radial-gradient(ellipse_at_center,_var(--brand-yellow)_0%,transparent_70%)] pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-5 md:space-y-6">
            <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl font-extrabold text-brand-yellow leading-tight tracking-tighter uppercase">
              Support TinyStage
            </h1>
            <p className="text-lg md:text-xl text-brand-gray-light/90 font-normal leading-relaxed tracking-wider max-w-3xl mx-auto">
              Your support helps us shine a spotlight on incredible local artists
              and create memorable live music experiences. Here’s how you can contribute.
            </p>
            <div className="flex justify-center pt-5 md:pt-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-brand-yellow to-transparent opacity-40" />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-grow">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <div
            className={`grid grid-cols-1 ${
                supportOptions.length === 1 ? 'md:grid-cols-1 md:max-w-md mx-auto' : 
                supportOptions.length === 2 ? 'md:grid-cols-2' : 
                'md:grid-cols-3'
            } gap-8 md:gap-10`}
          >
            {supportOptions.map((option) => (
              <div
                key={option.id}
                className="group bg-brand-gray-dark/50 backdrop-blur-lg border border-brand-gray-dark/70 hover:border-brand-yellow/50 
                           p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-brand-yellow/15 text-center flex flex-col 
                           transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                {option.icon && <div className='mb-5'>{option.icon}</div>}
                <h2 className="text-xl md:text-2xl font-semibold text-brand-white mb-3 tracking-tight">
                  {option.title}
                </h2>
                <p className="text-brand-gray-light/80 leading-relaxed mb-6 flex-grow text-sm md:text-[0.95rem] font-light">
                  {option.description}
                </p>
                {option.ctaLink && option.ctaLink !== '#' ? (
                  <Link
                    href={option.ctaLink}
                    target={option.isExternalLink ? '_blank' : '_self'}
                    rel={option.isExternalLink ? 'noopener noreferrer' : undefined}
                    className="mt-auto inline-block text-brand-black bg-brand-yellow hover:brightness-110 px-6 py-2.5 rounded-lg 
                               font-semibold text-xs md:text-sm uppercase tracking-wider transition-all duration-200 ease-out transform hover:scale-[1.03] 
                               focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-brand-gray-dark shadow-md hover:shadow-lg"
                  >
                    {option.ctaText}
                  </Link>
                ) : (
                  <p className="mt-auto text-brand-gray-medium text-sm">
                    More info coming soon or contact us!
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <section className="mt-12 md:mt-20 pt-10 pb-12 md:pt-16 md:pb-20 border-t-2 border-brand-yellow/20 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-white mb-6 md:mb-8 tracking-tight">
              Why Your Support Matters
            </h2>
            <div className="relative h-56 sm:h-64 md:h-72 w-full max-w-lg mx-auto mb-8 rounded-xl overflow-hidden shadow-2xl border border-brand-gray-dark/50">
              <Image
                src="/images/community-support.jpg"
                alt="TinyStage community and artists"
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent"></div>
            </div> 
            <blockquote className="max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-brand-gray-light/90 leading-relaxed italic mb-4">
                "TinyStage isn't just a venue; it's a vital part of our local music
                scene. Supporting them means supporting the artists who pour their
                hearts out on that stage and the community that comes together to
                listen."
              </p>
              <footer className="text-base text-brand-yellow font-semibold tracking-wide">
                – A Happy Audience Member
              </footer>
            </blockquote>
            <p className="text-lg text-brand-gray-light/80 max-w-2xl mx-auto mt-8">
              Join us in making a difference. Every bit of support helps us create
              more TinyStage magic.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SupportPageContent; // Default export the client component