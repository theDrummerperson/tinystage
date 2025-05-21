// src/app/error.tsx
'use client';

// Imports should be sorted now, and unused Link/ExclamationTriangleIcon removed by eslint --fix
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';

import TextButton from '@/components/buttons/TextButton';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error: _error, reset }: ErrorProps) {
  // <<< CHANGE 'error' to '_error' HERE
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(_error); // <<< CHANGE 'error' to '_error' HERE
  }, [_error]); // <<< CHANGE 'error' to '_error' HERE

  return (
    <main className='bg-white'>
      <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
        <InformationCircleIcon className='h-[60px] w-[60px] drop-shadow-glow animate-flicker text-red-500' />
        <h1 className='mt-8 text-4xl font-semibold md:text-6xl'>
          Oops, something went wrong!
        </h1>
        <TextButton variant='basic' onClick={reset} className='mt-6 px-6 py-3'>
          Try again
        </TextButton>
      </div>
    </main>
  );
}
