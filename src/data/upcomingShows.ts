// src/data/upcomingShows.ts
export interface UpcomingShow {
  // Ensure this interface is also exported if used elsewhere, or defined here
  id: string;
  artistName: string;
  showDate: string; // e.g., "2024-07-15T19:30:00" (ISO string for easier date handling)
  venueName?: string;
  tagline?: string;
  description: string;
  coverImageUrl: string;
  coverImageAlt: string;
  ticketLink?: string;
  detailsLink?: string;
  priceRange?: string;
  genres?: string[];
}

// Ensure this array is actually populated with data
export const upcomingShowsData: UpcomingShow[] = [
  // <<<< IMPORTANT: `export const`
  {
    id: 'artist-xyz-july-2024',
    artistName: 'The Sonic Bloom',
    showDate: '2024-12-15T20:00:00', // Example: Future date
    tagline: 'Psychedelic Rock Experience',
    description:
      'Join The Sonic Bloom for a mind-bending journey through their latest album and classic hits. Expect vibrant visuals and powerful riffs.',
    coverImageUrl: '/images/upcoming/sonic-bloom.jpg',
    coverImageAlt: 'The Sonic Bloom band performing',
    ticketLink: 'https://example.com/tickets/sonic-bloom',
    priceRange: '$20 Advance / $25 Door',
    genres: ['Psychedelic Rock', 'Indie Rock'],
  },
  {
    id: 'solo-acoustic-aug-2024',
    artistName: 'Elara Moon',
    showDate: '2025-01-05T19:00:00', // Example: Future date
    tagline: 'Intimate Acoustic Set',
    description:
      'Experience the captivating vocals and heartfelt songwriting of Elara Moon in a special stripped-down acoustic performance.',
    coverImageUrl: '/images/upcoming/elara-moon.jpg',
    coverImageAlt: 'Elara Moon, solo acoustic artist',
    ticketLink: 'https://example.com/tickets/elara-moon',
    priceRange: '$15',
    genres: ['Acoustic', 'Singer-Songwriter', 'Folk'],
  },
  // Add more upcoming shows. If this array is empty, futureShows will be empty, but it shouldn't cause the 'filter' error.
];
