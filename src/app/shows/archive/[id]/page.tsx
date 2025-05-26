// src/app/shows/archive/[artistSlug]/page.tsx
// NO 'use client'

import React from "react";
import { notFound } from "next/navigation";

// Define the shape of an archived show, including a slug for dynamic routing
interface Show {
  id: string;
  slug: string;        // e.g. "past-artist-name"
  title: string;
  date: string;        // format: YYYY-MM-DD
  time?: string;       // optional e.g. "8:00 PM"
  venue?: string;
  summary?: string;
}

// Placeholder archive data — replace with your real imported data
const archivedShows: Show[] = [
  {
    id: "archive-1",
    slug: "past-artist-name",
    title: "Past Artist Name",
    date: "2025-04-20",
    time: "8:00 PM",
    venue: "Old Venue",
    summary: "A recap of this past performance.",
  },
  // Add more archived shows here
];

// Pre-render paths for each archived show
export function generateStaticParams() {
  return archivedShows.map((show) => ({
    artistSlug: show.slug,
  }));
}

// Main page component for a specific artist archive
export default function ArtistArchivePage({
  params,
}: {
  params: { artistSlug: string };
}) {
  const show = archivedShows.find((s) => s.slug === params.artistSlug);
  if (!show) {
    // Render 404 if slug not found
    notFound();
  }

  return (
    <main className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-4">{show.title}</h1>
      <p className="text-gray-700">
        {show.date}{show.time ? ` · ${show.time}` : ""}
      </p>
      {show.venue && <p className="text-gray-700">{show.venue}</p>}
      {show.summary && (
        <div className="mt-4 text-gray-600">
          <p>{show.summary}</p>
        </div>
      )}
    </main>
  );
}
