// src/app/shows/upcoming/page.tsx
"use client";

import { upcomingShows } from "@/data/upcomingShows";

export default function ShowsPage() {
  return (
    <main className="px-6 py-8">
      <h1 className="text-3xl mb-6">Upcoming Shows</h1>
      <ul className="space-y-4">
        {upcomingShows.map(show => (
          <li key={show.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{show.artist}</h2>
            <p>{show.date} @ {show.time}</p>
            <p>{show.venue}</p>
            {show.description && <p className="mt-2 text-gray-600">{show.description}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
