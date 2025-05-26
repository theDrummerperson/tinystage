// src/data/types.ts
// Base interface for common show properties
interface BaseShow {
  id: string;
  artistName: string;
  tagline?: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  venue: {
    name: string;
    address: string;
  };
  genres: string[]; // Always an array for consistency
}

// Past show specific properties
export interface PastShow extends BaseShow {
  flyerImageUrl: string;
  performanceDate: string; // ISO date string
  artistPageLink?: string;
  featuredQuote?: string;
  photos?: { url: string; alt: string; }[];
  videoUrl?: string;
  setlist?: string[];
  members?: string[];
  hometown?: string;
  debutEP?: string;
  primaryAccentColor?: string; // For backward compatibility with existing components
}

// Upcoming show specific properties
export interface UpcomingShow extends BaseShow {
  showDate: string; // ISO date string
  ticketLink?: string;
  detailsLink?: string;
  priceRange?: string;
  status?: 'on-sale' | 'sold-out' | 'cancelled' | 'postponed';
  primaryAccentColor?: string; // For backward compatibility with existing components
}

// Utility type for show status
export type ShowStatus = 'upcoming' | 'past' | 'cancelled' | 'postponed';

// Union type for any show
export type Show = PastShow | UpcomingShow;

// Type guards
export const isPastShow = (show: Show): show is PastShow => {
  return 'performanceDate' in show;
};

export const isUpcomingShow = (show: Show): show is UpcomingShow => {
  return 'showDate' in show;
};

// Utility functions
export const createSlug = (name: string, date: string): string => {
  const namePart = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const datePart = new Date(date).toISOString().split('T')[0];
  return `${namePart}-${datePart}`;
};

export const formatDate = (dateString: string): string => {
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

// Data validation helpers
export const validateShow = (show: Partial<Show>): string[] => {
  const errors: string[] = [];
  
  if (!show.artistName?.trim()) errors.push('Artist name is required');
  if (!show.description?.trim()) errors.push('Description is required');
  if (!show.imageUrl?.trim()) errors.push('Image URL is required');
  if (!show.venue?.name?.trim()) errors.push('Venue name is required');
  if (!show.venue?.address?.trim()) errors.push('Venue address is required');
  
  // Validate date based on show type
  if (isPastShow(show as Show)) {
    const pastShow = show as Partial<PastShow>;
    if (!pastShow.performanceDate) errors.push('Performance date is required for past shows');
    else if (new Date(pastShow.performanceDate) > new Date()) {
      errors.push('Performance date cannot be in the future for past shows');
    }
  } else if (isUpcomingShow(show as Show)) {
    const upcomingShow = show as Partial<UpcomingShow>;
    if (!upcomingShow.showDate) errors.push('Show date is required for upcoming shows');
    else if (new Date(upcomingShow.showDate) < new Date()) {
      errors.push('Show date cannot be in the past for upcoming shows');
    }
  }
  
  return errors;
};

