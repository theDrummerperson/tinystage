import { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import * as React from 'react';

// Adjusted to relative paths to avoid resolution errors
import '../styles/globals.css';
import '../styles/colors.css';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { siteConfig } from '../constant/config';

// 1. Load Premium Fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

// 2. Viewport Optimization (Dark Mode)
export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

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
    <html
      lang='en'
      className={`scroll-smooth ${inter.variable} ${playfair.variable}`}
    >
      <head>
        {/* 3. Custom Scrollbar & Font Overrides - Fix Hydration Error using dangerouslySetInnerHTML */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          :root {
            --font-inter: ${inter.style.fontFamily};
            --font-playfair: ${playfair.style.fontFamily};
          }
          /* Force Tailwind 'font-serif' to use Playfair without config access */
          .font-serif {
            font-family: var(--font-playfair), ui-serif, Georgia, Cambria, "Times New Roman", Times, serif !important;
          }
          /* Default Body Font */
          body {
            font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
          }
          /* Custom Scrollbar */
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #0a0a0a; }
          ::-webkit-scrollbar-thumb { background: #262626; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #eab308; }
        `,
          }}
        />
      </head>

      <body className='bg-neutral-950 text-neutral-200 antialiased selection:bg-yellow-500/30'>
        {/* 
            STRATEGIC BACKGROUND IMPLEMENTATION
            1. Fixed Position: Ensures the ambience persists during scrolling.
            2. Low Opacity (0.15): Provides texture without reducing text contrast.
            3. Blur (sm): Creates depth, pushing content to the foreground.
            4. Gradient Overlays: Darkens edges to frame the center content.
        */}
        <div className='fixed inset-0 z-[-1] pointer-events-none select-none overflow-hidden'>
          <div className='absolute inset-0 bg-neutral-950' />
          <Image
            src='/images/ellis/livebg2.jpg'
            alt='TinyStage Atmosphere'
            fill
            priority
            quality={75}
            className='object-cover object-center opacity-[0.15] blur-[2px] scale-[1.02] grayscale-[0.2]'
            sizes='100vw'
          />
          {/* Cinematic Vignette */}
          <div className='absolute inset-0 bg-gradient-to-b from-neutral-950/90 via-transparent to-neutral-950/90' />
          <div className='absolute inset-0 bg-gradient-to-r from-neutral-950/50 via-transparent to-neutral-950/50' />
        </div>

        {/* 4. Global Cinematic Film Grain (Persistent across routes) */}
        <div
          className='fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden='true'
        />

        {/* 5. Accessibility Skip Link */}
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-6 focus:py-3 focus:bg-yellow-500 focus:text-black focus:font-bold focus:rounded-md transition-transform'
        >
          Skip to content
        </a>

        <div className='flex flex-col min-h-screen relative'>
          <Header />
          <main id='main-content' className='flex-grow relative'>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
