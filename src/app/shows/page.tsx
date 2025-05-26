// src/app/shows/page.tsx
// 

'use `client`;'

import React from "react";

// Define the shape of a single show
interface Show {
  id: string;
  title: string;
  date: string;    // e.g. "2025-06-15"
  time: string;    // e.g. "7:00 PM"
  venue: string;
  description?: string;
}

// Placeholder data — replace with your real data source or import
const shows: Show[] = [
  {
    id: "show-1",
    title: "Artist Name",
    date: "2025-06-15",
    time: "7:00 PM",
    venue: "Venue Name",
    description: "A brief description of the show.",
  },
  // Add more shows here
];

export default function ShowsPage() {
  return (
    <main className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Shows</h1>
      <ul className="space-y-4">
        {shows.map((show) => (
          <li key={show.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{show.title}</h2>
            <p className="text-gray-700">
              {show.date} &middot; {show.time}
            </p>
            <p className="text-gray-700">{show.venue}</p>
            {show.description && (
              <p className="mt-2 text-gray-600">{show.description}</p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

