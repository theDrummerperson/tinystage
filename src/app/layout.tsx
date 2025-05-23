// src/app/layout.tsx
import { Metadata } from 'next';
import * as React from 'react'; // Keep if needed for other React features

import '@/styles/globals.css';
import '@/styles/colors.css'; // !STARTERCONF (as noted in your file)

import Footer from '@/components/Footer';
// --- IMPORT YOUR HEADER AND FOOTER ---
import Header from '@/components/Header';

import { siteConfig } from '@/constant/config';

export const metadata: Metadata = {
  // ... your existing metadata ...
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico', // Corrected path for favicon
    shortcut: '/favicon.png', // Example
    apple: '/apple-touch-icon.png', // Example
  },
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`], // Ensure public/images/og.jpg exists
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/twitter-tinystage.jpg`], // Ensure public/images/twitter-tinystage.jpg exists
    // creator: '@YourTinyStageTwitterHandle',
  },
  authors: [
    {
      name: 'TinyStage',
    },
  ],
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
      <body className='bg-[var(--brand-black)] text-[var(--text-color)] antialiased'>
        {/* Wrapper for sticky footer and overall page structure */}
        <div className='flex flex-col min-h-screen'>
          <Header /> {/* <<< ADDED HEADER HERE */}
          <main className='flex-grow'>
            {' '}
            {/* flex-grow makes main content take available space */}
            {children}
          </main>
          <Footer /> {/* <<< ADDED FOOTER HERE */}
        </div>
      </body>
    </html>
  );
}
