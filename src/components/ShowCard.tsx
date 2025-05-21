import Link from 'next/link';

import Button from '@/components/buttons/Button';

interface ShowCardProps {
  artist: string;
  date: string;
  venue: string;
  imageUrl?: string;
}

export default function ShowCard({ artist, date, venue }: ShowCardProps) {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105'>
      <div className='h-48 bg-orange-200 flex items-center justify-center'>
        {/* Placeholder for artist image */}
        <span className='text-4xl'>🎵</span>
      </div>
      <div className='p-6'>
        <h3 className='text-xl font-bold text-gray-800 mb-2'>{artist}</h3>
        <p className='text-gray-600 mb-1'>{date}</p>
        <p className='text-gray-600 mb-4'>{venue}</p>
        <Link href='/shows/1'>
          <Button variant='outline' size='sm'>
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
}
