// src/data/pastShows.ts
import type { PastShow } from '@/data/types'; // IMPORT the PastShow type

// DO NOT define any 'interface PastShow' or 'type PastShow' here.

export const pastShows: PastShow[] = [
  {
    // Properties from ShowBase
    id: "deja-blu-2025-05-02",
    title: "Deja Blu TinyStage Debut", // Now valid because PastShow extends ShowBase which has title
    performer: "Deja Blu",             // Use 'performer' instead of 'artistName'
    date: "2025-05-02",                // This is the 'performanceDate'
    thumbnailUrl: "/images/Dejaposter.png", // Assuming this is the main thumbnail
    description: "Genre-blending soul & blues with lo-fi dream wave and indie grooves.", // 'description' not 'summary'
    venue: { name: "FEED Media Arts Center" }, // 'venue' as an object
    videoSlug: "deja-blu-2025-05-02-debut", // Example slug

    // Properties specific to PastShow or optional in ShowBase
    type: 'past', // Required for PastShow
    time: "7:00 PM", // Now part of ShowBase (made optional there)
    // tagline: "An unforgettable night", // Add if you have tagline in ShowBase/PastShow
    flyerImageUrl: "/images/Dejaposter.png", // Optional if defined as such in PastShow
    // flyerImageAlt: "Flyer for Deja Blu's debut", // Add if you have flyerImageAlt in PastShow
    // artistPageLink: "/artists/deja-blu",
    // featuredQuote: "The best new sound in Erie!",
    // primaryAccentColor: "var(--brand-yellow)", // Example
  },
  // Example of another show, ensuring all required fields from ShowBase are present
  {
    type: 'past',
    id: "another-artist-2024-12-01",
    title: "Live Acoustic Session",
    performer: "Another Artist",
    date: "2024-12-01",
    thumbnailUrl: "/images/TSlogo.png",
    description: "A wonderful evening of acoustic melodies.",
    venue: { name: "The Coffee House Stage" },
    time: "8:00 PM",
  }
  // …more entries here, each conforming to the PastShow type from @/data/types
];