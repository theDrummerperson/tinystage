// src/data/types.ts

// 1. Define the Base Interface for common properties
export interface ShowBase {
  id: string;
  title: string;
  performer: string;
  date: string; // This will be the specific performance/show date
  description?: string;
  thumbnailUrl: string;
  videoSlug?: string; // For links to video archive
  
  // Common optional fields
  venueVibe?: string;
  tracklist?: string[];
  extendedBio?: string;
  anecdotes?: string;
  headerImage?: string;
  genre?: string[];
  hometown?: string;
  venue?: { 
    name: string;
    address?: string; 
  };
  members?: string[];
  debutEP?: string;
  primaryAccentColor?: string;
}

// 2. Define PastShow extending ShowBase
export interface PastShow extends ShowBase {
  type: 'past'; // Discriminant property
  flyerImageUrl?: string;
  artistPageLink?: string;
  featuredQuote?: string;
  photos?: { url: string; alt: string; }[];
  videoUrl?: string; // Different from videoSlug, perhaps direct video file/embed
}

// 3. Define UpcomingShow extending ShowBase
export interface UpcomingShow extends ShowBase {
  type: 'upcoming'; // Discriminant property
  ticketLink?: string;
  detailsLink?: string;
  priceRange?: string;
  status?: 'on-sale' | 'sold-out' | 'cancelled' | 'postponed' | 'tba';
}

// 4. Create a Union Type for any kind of show - THIS IS WHAT YOU'LL LIKELY IMPORT MOST OFTEN
export type AnyShow = PastShow | UpcomingShow;

// 5. Type Guards (Updated to use the 'type' discriminant)
export const isPastShow = (show: AnyShow): show is PastShow => {
  return show.type === 'past';
};

export const isUpcomingShow = (show: AnyShow): show is UpcomingShow => {
  return show.type === 'upcoming';
};

// --- Utility Functions ---
export const createSlug = (name: string, dateIsoString: string): string => {
  const namePart = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const datePart = new Date(dateIsoString).toISOString().split('T')[0]; 
  return `${namePart}-${datePart}`;
};

// Renamed to avoid potential naming conflicts in components
export const formatDateForDisplay = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

// --- Data Validation (Simplified example - expand as needed) ---
export const validateShowData = (show: Partial<AnyShow>): string[] => {
  const errors: string[] = [];
  
  if (!show.title?.trim()) errors.push('Show title is required');
  if (!show.performer?.trim()) errors.push('Performer name is required');
  // Add more common validations based on ShowBase

  if (!show.type) {
    errors.push("Show type ('past' or 'upcoming') is required for full validation.");
  } else if (show.type === 'past') {
    const pastShow = show as Partial<PastShow>;
    if (!pastShow.date) errors.push('Date is required for past shows');
    // Add more PastShow specific validations
  } else if (show.type === 'upcoming') {
    const upcomingShow = show as Partial<UpcomingShow>;
    if (!upcomingShow.date) errors.push('Date is required for upcoming shows');
    // Add more UpcomingShow specific validations
  }
  
  return errors;
};