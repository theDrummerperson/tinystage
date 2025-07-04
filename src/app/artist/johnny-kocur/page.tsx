// src/app/artists/johnny-kocur/page.tsx
import React from 'react';

import KocurClientPage from './KocurClientPage'; // Import the new client component

// This is a Server Component, so it can export metadata
export const metadata = {
  title: 'Featured Artist: Johnny Kocur | TinyStage',
  description:
    'Explore the intimate acoustic performance of Johnny Kocur in the TinyStage Concert Series. Watch his full birthday performance live from the FEED Media Arts Center.',
};

// The main page component is now very simple
const KocurPage = () => {
  return <KocurClientPage />;
};

export default KocurPage;
