// src/data/upcomingShows.ts

export interface Show {
  id: string;
  artist: string;
  date: string; // e.g. "2025-05-30"
  time: string; // e.g. "7:00 PM"
  venue: string; // e.g. "FEED Media Arts Center"
  description?: string;
}

export const upcomingShows: Show[] = [
  {
    id: 'johnny-kocur-2025-05-30',
    artist: 'Johnny Kocur',
    date: '2025-05-30',
    time: '7:00 PM',
    venue: 'FEED Media Arts Center',
    description: 'An R&B/pop birthday set with Ryan Sands on guitar.',
  },
  // …add more shows here
];
