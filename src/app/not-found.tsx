// src/app/not-found.tsx
'use client'; // Important for using hooks or event handlers, though not strictly needed for this simple version yet. Good practice.

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'; // Replacement icon
import { Metadata } from 'next';
import Link from 'next/link'; // For client-side navigation
import * as React from 'react';

export const metadata: Metadata = {
  // This metadata is for server components, but `not-found.tsx` can be a client component.
  // If you need dynamic metadata based on client-side logic, that's different.
  // For a static "Not Found" title, this is fine if Next.js picks it up for the 404 page.
  title: 'Page Not Found',
};

export default function NotFound() {
  React.useEffect(() => {
    // If it's a client component, you might want to set document.title
    document.title = 'Page Not Found';
  }, []);

  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <ExclamationTriangleIcon
            className='h-[60px] w-[60px] drop-shadow-glow animate-flicker text-orange-400' // Example color
          />
          <h1 className='mt-8 text-4xl font-semibold md:text-6xl'>
            404 - Page Not Found
          </h1>
          <p className='mt-4 text-lg text-gray-600'>
            Sorry, the page you were looking for could not be found.
          </p>
          <Link
            href='/'
            className='mt-8 inline-block rounded-md bg-blue-500 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2' // Example button styling
          >
            Go Back Home
          </Link>
        </div>
      </section>
    </main>
  );
}
