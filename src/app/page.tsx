// src/app/page.tsx
'use client'; 

import * as React from 'react'; 

import Booking from '@/components/Booking';
import Hero from '@/components/Hero';
import Promo from '@/components/Promo'; // <-- 1. Import the new component

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Promo />      {/* <-- 2. Add the component here */}
        <Booking /> 
      </main>
    </>
  );
}