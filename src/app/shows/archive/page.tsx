// src/app/shows/archive/page.tsx


import React from "react";

// Define the shape of a single archived show
interface Show {
  id: string;
  title: string;
  date: string;    // format: YYYY-MM-DD
  time?: string;   // optional: e.g. "7:00 PM"
  venue?: string;
  summary?: string;
}

// Placeholder archive data — replace with your real archived data source or import
const archivedShows: Show[] = [
  {
    id: "archive-1",
    title: "Past Artist Name",
    date: "2025-04-20",
    time: "8:00 PM",
    venue: "Old Venue",
    summary: "A recap of this past performance.",
  },
  // Add more archived shows here
];

export default function ArchivePage() {
  return (
    <main className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Show Archive</h1>
      {archivedShows.length === 0 ? (
        <p className="text-gray-600">No archived shows available.</p>
      ) : (
        <ul className="space-y-4">
          {archivedShows.map((show) => (
            <li key={show.id} className="border p-4 rounded-lg bg-gray-50">
              <h2 className="text-xl font-semibold">{show.title}</h2>
              <p className="text-gray-700">{show.date}{show.time ? ` · ${show.time}` : ""}</p>
              {show.venue && <p className="text-gray-700">{show.venue}</p>}
              {show.summary && (
                <p className="mt-2 text-gray-600">{show.summary}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
