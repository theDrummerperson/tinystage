// src/app/page.tsx
'use client'; // Keep if Hero or Booking need client-side features

// Remove Head from next/head, use Next.js 13+ App Router metadata in layout.tsx
// import Head from 'next/head';
import * as React from 'react'; // Keep if needed for React.Fragment or other specific React features

import Booking from '@/components/Booking';
import Hero from '@/components/Hero';
// Remove Header and Footer imports as they are now in RootLayout
// import Footer from '@/components/Footer';
// import Header from '@/components/Header';

export default function HomePage() {
  return (
    <>
      {' '}
      {/* Or simply remove the fragment if main is the only direct child */}
      {/*
        The <Head> component from 'next/head' is for the Pages Router.
        In the App Router, metadata is handled by the `export const metadata` object
        in layout.tsx or page.tsx files.
        You can remove the <Head> component below.
      */}
      {/*
      <Head>
        <title>TinyStage</title>
      </Head>
      */}
      {/* Header is now rendered by RootLayout */}
      <main>
        {' '}
        {/* Keep a main tag for semantic content if Hero and Booking are sections */}
        <Hero />
        <Booking />
        {/* <React.Fragment></React.Fragment>  // This empty fragment does nothing, can be removed */}
      </main>
      {/* Footer is now rendered by RootLayout */}
    </>
  );
}
