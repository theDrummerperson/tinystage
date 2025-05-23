export interface PastShow {
  id: string;
  artistName: string;
  performanceDate: string;
  tagline?: string;
  flyerImageUrl: string;
  flyerImageAlt: string;
  description: string;
  artistPageLink?: string; // Internal link to /artists/[slug]
  externalArtistLink?: string; // Official artist site/social
  featuredQuote?: string;
  bgColor?: string; // e.g., '#F0EBE5'
  primaryAccentColor?: string; // e.g., '#8A0303'
  textColor?: string; // e.g., 'text-gray-800' or '#333333'
  tapeColor?: string; // e.g., 'bg-yellow-300/80 text-yellow-900'
}

export const pastShowsData: PastShow[] = [
  {
    id: 'deja-blue-live',
    artistName: 'Deja Blue',
    performanceDate: 'November 5, 2023', // Replace with actual date
    tagline: 'Live at TinyStage',
    flyerImageUrl: '/gallery/dejablue.png', // Ensure this path is correct
    flyerImageAlt: 'Deja Blue performing live at TinyStage',
    description:
      'Déjà Blu is a genre-blending trio from Erie making music that feels like memory—hazy, haunting, and heartbreakingly familiar, weaving indie, lo-fi, dream pop, and alt-rock into a sound that’s equal parts vibe, vulnerability, and emotional echo.',
    artistPageLink: '/artists/deja-blue',
    featuredQuote: 'Vibes that hum like memory..',
    bgColor: '#F0EBE5', // Creamy background
    primaryAccentColor: '#8A0303', // Deep red accent
    textColor: 'text-gray-800', // Dark gray for text
    tapeColor: 'bg-yellow-300/80 text-yellow-900', // Washi tape style
  },
  // {
  //   id: "another-artist-2023",
  //   artistName: "The Groovy Collective",
  //   performanceDate: "October 10, 2023",
  //   tagline: "An Evening of Funk",
  //   flyerImageUrl: "/gallery/groovy-collective.png",
  //   flyerImageAlt: "The Groovy Collective at TinyStage",
  //   description: "...",
  //   artistPageLink: "/artists/groovy-collective",
  //   // ... other properties
  // },
];
