'use client';

import Link from 'next/link';

import Button from '@/components/buttons/Button';

export default function Hero() {
  return (
    <section className='relative bg-gradient-to-r from-orange-50 to-blue-50 py-20 md:py-32'>
      <div className='container mx-auto px-4 text-center'>
        <h1 className='text-4xl md:text-6xl font-bold text-gray-800 mb-4'>
          TinyStage Concert Series
        </h1>
        <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'>
          An intimate live music platform amplifying underrepresented artists in
          Erie, PA.
        </p>
        <p className='text-lg text-orange-600 font-medium mb-8'>
          Local sound. Global stage.
        </p>

        <div className='flex flex-wrap justify-center gap-4'>
          <Link href='/shows'>
            <Button variant='primary'>See Upcoming Shows</Button>
          </Link>
          <Link href='/apply'>
            <Button variant='outline'>Apply to Perform</Button>
          </Link>
          <Link href='/livestream'>
            <Button variant='outline'>Watch the Livestream</Button>
          </Link>
          <Link href='/support'>
            <Button variant='primary'>Support the Series</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
