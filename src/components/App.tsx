import React, { useEffect, useState } from 'react';

import AboutPage from '../app/about/page';
import SchedulePage from '../app/calendar/page';
import RootLayout from '../app/layout';
import ShowsPage from '../app/shows/page';

export default function App() {
  const [path, setPath] = useState('/');

  useEffect(() => {
    // Set initial path
    setPath(window.location.pathname);

    // Listen for browser navigation (back/forward)
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Simple client-side routing
  const getPage = () => {
    switch (path) {
      case '/calendar':
        return <SchedulePage />;
      case '/shows':
        return <ShowsPage />;
      case '/about':
        return <AboutPage />;
      default:
        // Default to About page or Home if available
        return <AboutPage />;
    }
  };

  return <RootLayout>{getPage()}</RootLayout>;
}
