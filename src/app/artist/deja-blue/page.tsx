// src/app/artists/deja-blue/page.tsx
import React from 'react';

import DejaBluClientPage from './DejaBluClientPage'; // Import the new client component

// This is a Server Component, so it can export metadata
export const metadata = {
  title: 'Featured Artist: Déjà Blu | TinyStage',
  description: 'Explore the inaugural performance of Déjà Blu in the TinyStage Concert Series. Watch their full performance of the debut EP "Ashes to Gold".',
};

// The main page component is now very simple
const DejaBluPage = () => {
  return <DejaBluClientPage />;
};

export default DejaBluPage;