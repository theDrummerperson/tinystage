// src/app/error.tsx
'use client';

import React, { useEffect } from 'react';

import { ErrorDisplay, ErrorStateSkullIcon } from '@/components/ErrorDisplay';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error: currentError, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service (only in development)
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(currentError);
    }
  }, [currentError]);

  return (
    <ErrorDisplay
      title='Oops! System Glitch.'
      message="An unexpected error occurred on our end. We're not sure what happened, but our circuits are definitely scrambled."
      showReset={true}
      reset={reset}
      errorCode={currentError.digest}
      icon={<ErrorStateSkullIcon />}
    />
  );
}
