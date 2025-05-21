// src/app/page.tsx
'use client';

import Head from 'next/head';
import * as React from 'react';

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
        <Hero />{' '}
        {/* Render Hero directly. It will manage its own full height and background. */}
        {/* Other sections of your homepage would go here, each in their own <section> tags */}
        {/* For example: */}
        {/*
        <section className="py-16 bg-brand-white text-brand-black">
          <div className="container mx-auto">
            <h2>About TinyStage</h2>
            <p>...</p>
          </div>
        </section>

        <section className="py-16 bg-brand-gray-dark text-brand-gray-light">
          <div className="container mx-auto">
            <h2>Upcoming Shows Preview</h2>
            <p>...</p>
          </div>
        </section>
        */}
      </main>
      <Footer />
    </>
  );
}
