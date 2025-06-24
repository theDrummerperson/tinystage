// src/app/layout.tsx
import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
import '@/styles/colors.css';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { siteConfig } from '@/constant/config';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'TinyStage | Intimate Live Music in Erie, PA',
    template: '%s | TinyStage',
  },
  description:
    'TinyStage is Erie’s most intimate concert series—curated live performances spotlighting the city’s most compelling artists.',
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    url: siteConfig.url,
    title: 'TinyStage | Intimate Live Music in Erie, PA',
    description:
      'Discover TinyStage, a live concert series amplifying local talent through stripped-down performances in intimate settings.',
    siteName: 'TinyStage',
    images: [`${siteConfig.url}/images/Logo2.png`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TinyStage | Intimate Live Music in Erie, PA',
    description:
      'TinyStage brings stripped-down, heartfelt performances from Erie’s most powerful voices. Stream live or attend in person.',
    images: [`${siteConfig.url}/images/Logo2.png`],
    // creator: '@TinyStageErie', // Optional if you set up a Twitter handle
  },
  authors: [
    {
      name: 'TinyStage',
      url: 'https://tinystage.live',
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
        <div className='flex flex-col min-h-screen'>
          <Header />
          <main className='flex-grow'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
