// src/lib/archive-data.ts
interface Show {
  id: string
  title: string
  performer: string
  date: string
  thumbnail: string
  excerpt: string
}

export async function loadShows(): Promise<Show[]> {
  // In real implementation, this would fetch from CMS/API
  return [
    {
      id: "1",
      title: "Moonlit Sessions",
      performer: "The Night Owls",
      date: "2023-11-15",
      thumbnail: "/img/shows/owl-session.jpg",
      excerpt: "Jazz trio's candlelit performance of Blue Note classics"
    },
    // ... more sample shows
  ]
}