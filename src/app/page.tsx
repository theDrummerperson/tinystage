// src/app/page.tsx
'use client';

import Head from 'next/head';
import * as React from 'react';

import Booking from '@/components/Booking';
// import '@/lib/env'; // Consider if this is truly needed here or can be in layout.tsx
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero'; // Your impressive Hero component

export default function HomePage() {
  return (
    <>
      {' '}
      {/* Use a Fragment or a simple div if no extra layout styling needed at this top level */}
      <Head>
        <title>TinyStage</title>
      </Head>
      <Header />
      <main>
        {' '}
        {/* The main content area of the page */}
        <Hero />
        <Booking />
        <React.Fragment></React.Fragment>
      </main>
      <Footer />
    </>
  );
}
