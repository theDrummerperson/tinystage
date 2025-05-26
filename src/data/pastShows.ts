// src/data/pastShows.ts

// 1. Define the shape of your past-show data
export interface PastShow {
  id: string;
  title: string;
  date: string;       // e.g. "2025-04-20"
  time?: string;      // optional
  venue?: string;
  summary?: string;
}

// 2. Supply some sample data (or import from elsewhere)
export const pastShows: PastShow[] = [
  {
    id: "deja-blu-2025-05-02",
    title: "Deja Blu TinyStage Debut",
    date: "2025-05-02",
    time: "7:00 PM",
    venue: "FEED Media Arts Center",
    summary: "Genre-blending soul & blues with lo-fi dream wave and indie grooves.",
  },
  // …more entries here
];
