import ShowCard from './ShowCard';

export default function ShowsPreview() {
  const upcomingShows = [
    {
      artist: 'Deja Blue',
      date: 'May 2, 2025 • 8:00 PM',
      venue: 'Café Giant, Downtown Erie',
    },
    {
      artist: 'The Erie Collective',
      date: 'June 12, 2025 • 7:30 PM',
      venue: 'Café Giant, Downtown Erie',
    },
  ];

  return (
    <section className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-12'>
          Upcoming Shows
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          {upcomingShows.map((show, index) => (
            <ShowCard key={index} {...show} />
          ))}
        </div>

        <div className='text-center mt-12'>
          <a
            href='/shows'
            className='text-orange-600 font-medium hover:underline'
          >
            View all upcoming shows →
          </a>
        </div>
      </div>
    </section>
  );
}
