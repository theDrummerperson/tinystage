// src/components/MerchPageContent.tsx
"use client"; // Mark as a Client Component

import Link from 'next/link';
import React from 'react';

const MerchPageContent: React.FC = () => {
  return (
    // Root div styled similarly to your other pages for consistency
    <div 
      className="min-h-screen bg-gradient-to-b from-brand-black via-brand-black to-brand-gray-dark font-sans text-brand-gray-light selection:bg-brand-yellow selection:text-brand-black flex flex-col relative isolate"
      style={{
        // Optional: Using the same SVG background pattern as other pages
        backgroundImage: `url('/svg/2.svg')`, 
        backgroundRepeat: 'repeat',
        backgroundSize: '300px', 
        backgroundPosition: 'center center',
      }}
    >
      {/* Overlay for pattern opacity, same as other pages */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-brand-black via-brand-black to-brand-gray-dark opacity-95 pointer-events-none"></div>

      {/* Header Section - can be simpler for a "Coming Soon" page */}
      <header className="relative pt-20 pb-16 md:pt-28 md:pb-24 text-center isolate z-10">
        <div
          className="absolute inset-0 z-[-1] opacity-[0.02] bg-[radial-gradient(ellipse_at_center,_var(--brand-yellow)_0%,transparent_70%)] pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-5 md:space-y-6">
            <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl font-extrabold text-brand-yellow leading-tight tracking-tighter uppercase">
              TinyStage Merch
            </h1>
            <p className="text-lg md:text-xl text-brand-gray-light/90 font-normal leading-relaxed tracking-wider max-w-2xl mx-auto">
              Get ready to represent your favorite intimate music series!
            </p>
            <div className="flex justify-center pt-5 md:pt-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-brand-yellow to-transparent opacity-40" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - "Coming Soon" message */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 py-12 md:py-16">
        <div className="bg-brand-gray-dark/30 backdrop-blur-md border border-brand-gray-dark/50 p-8 sm:p-12 md:p-16 rounded-2xl shadow-xl max-w-md w-full">
          <div className="mb-6">
            {/* Optional: You can add an icon here, like a t-shirt or a music note */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 sm:h-20 sm:w-20 text-brand-yellow mx-auto opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-brand-white mb-4 tracking-tight">
            Coming Soon!
          </h2>
          <p className="text-brand-gray-light/80 leading-relaxed mb-8 text-base sm:text-lg">
            Our official TinyStage merchandise store is under construction. We're brewing up some awesome gear for you. Check back soon to grab your exclusive items and support local music!
          </p>
          <Link 
            href="/" 
            className="inline-block text-brand-black bg-brand-yellow hover:brightness-110 px-6 py-3 rounded-lg 
                       font-semibold text-sm uppercase tracking-wider transition-all duration-200 ease-out transform hover:scale-[1.03] 
                       focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-brand-gray-dark shadow-md hover:shadow-lg"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default MerchPageContent;