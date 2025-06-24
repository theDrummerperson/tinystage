// src/constant/config.ts

export const siteConfig = {
  title: 'TinyStage: Local Talent, Global Livestream',
  description:
    'An intimate live music platform amplifying underrepresented artists in Erie, PA. Local sound. Global stage. Watch live or apply to perform.', // YOUR SITE DESCRIPTION

  url: 'https://tinystage.vercel.app', // REPLACE with your actual production URL
};

// Constants for common values
export const COMMON_GENRES = [
  'Indie',
  'Alternative',
  'Dream Pop',
  'Lo-Fi',
  'Rock',
  'Folk',
  'Singer-Songwriter',
  'Acoustic',
  'Psychedelic Rock',
  'Electronic',
  'Jazz',
  'Blues',
] as const;

export type Genre = (typeof COMMON_GENRES)[number];

// Venue constants
export const VENUES = {
  FEED_MEDIA: {
    name: 'FEED Media Downtown Arts Center',
    address: 'Erie, PA',
  },
  TINYSTAGE: {
    name: 'TinyStage Listening Room',
    address: 'Erie, PA',
  },
} as const;
