// src/app/layout.tsx
import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
// You've likely already merged colors.css into globals.css or handle it there.
// If colors.css still exists and is needed, keep it. Otherwise, remove if redundant.
import '@/styles/colors.css'; // REVIEW THIS IMPORT

import { siteConfig } from '@/constant/config'; // This now pulls your TinyStage info

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url), // Uses your updated URL
  title: {
    default: siteConfig.title, // Uses your TinyStage title
    template: `%s | ${siteConfig.title}`, // e.g., "About Us | TinyStage: Local Talent, Global Livestream"
  },
  description: siteConfig.description, // Uses your TinyStage description
  robots: { index: true, follow: true }, // Standard good practice
  icons: {
    // Keep these, but make sure the /favicon/... files actually exist in your public folder
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`, // Ensure this file exists in public/favicon/
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title, // Good, uses your site title
    images: [`${siteConfig.url}/images/og-tinystage.jpg`], // IMPORTANT: Create and use a specific OG image for TinyStage
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/twitter-tinystage.jpg`], // IMPORTANT: Create and use a specific Twitter image
    // creator: '@YourTinyStageTwitterHandle', // Add your Twitter handle if you have one
  },
  authors: [
    // Update or remove this
    {
      name: 'TinyStage', // Set author to TinyStage
      // url: siteConfig.url, // Optionally link to the site itself
    },
  ],
  // Add creator and publisher if desired, directly or via siteConfig
  creator: 'TinyStage',
  publisher: 'TinyStage',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='scroll-smooth'>
      {' '}
      {/* Added scroll-smooth for nice anchor link scrolling */}
      {/* The <head> is automatically populated by Next.js with the metadata object */}
      <body className='bg-[var(--brand-black)] text-[var(--text-color)] antialiased'>
        {/*
          It's common to put Header and Footer here if they appear on ALL pages.
          This ensures consistency and they are part of the core layout.
          If some pages (like a dedicated auth page) shouldn't have them,
          then keeping them in individual page.tsx files (or a sub-layout) is better.
          Let's assume for now they are global.
        */}
        {/*
        <Header /> // Example: If Header is global
        <div id="__next_wrapper" className="flex flex-col min-h-screen"> // Wrapper for sticky footer
          <main className="flex-grow">
            {children}
          </main>
          <Footer /> // Example: If Footer is global
        </div>
        */}
        {children}{' '}
        {/* Your current setup keeps Header/Footer in page.tsx, which is also fine */}
      </body>
    </html>
  );
}
