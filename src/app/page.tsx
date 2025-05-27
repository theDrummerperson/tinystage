// src/app/page.tsx
'use client'; 

import * as React from 'react'; 

import Booking from '@/components/Booking';
import Hero from '@/components/Hero';
import PhotoSplash from '@/components/PhotoSplash';

interface RawCustomImage {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

const customRawImages: RawCustomImage[] = [
  { src: "/images/deja/2.png", alt: "Profile shot of Beccah Lynn", title: "Rebecca Lynn (Deja Blue)", subtitle: "Vocal Powerhouse" },
  { src: "/images/deja/3.jpg", alt: "Close up of Jordan Michaels", title: " Jordan Michael (Deja Blue)", subtitle: "Guitarist" },
  { src: "/images/deja/4.jpg", alt: "Deja Blue singer with audience", title: " Joshua Thomas (Deja Blue)", subtitle: "Drummer" },
  { src: "/images/kocur/kocur1.jpg", alt: "Johnny Kocur performing with guitar", title: "Johnny Kocur", subtitle: "Captivating" },
  { src: "/images/kocur/kocur2.jpg", alt: "Johnny Kocur with Ryan Sands", title: "Johnny Kocur w/ Ryan Sands", subtitle: "Kinetic" },
  { src: "/images/kocur/kocur3.jpg", alt: "Profile shot of Johnny Kocur", title: "Johnny Kocur", subtitle: "Sangerr" },
  { src: "/images/kocur/RyanS.jpg", alt: "Profile shot of Ryan Sands", title: "Ryan Sands", subtitle: "Guitarist" },
];


export default function HomePage() {
  return (
    <>
      <main>
        <Hero />

        <PhotoSplash 
          rawImagesData={customRawImages} 
          sectionTitle="Catch Them Live"
          sectionSubtitle="Experience the energy and passion of our featured artists."
          mainCtaText="View All Shows"
          mainCtaLink="/shows/archive"
        />
          <Booking /> 
      </main>
    </>
  );
}