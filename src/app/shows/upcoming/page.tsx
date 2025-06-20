// src/app/shows/upcoming/page.tsx
'use client';

import {
  Archive,
  ArrowLeft,
  Calendar,
  ChevronDown,
  Clock,
  Guitar,
  Heart,
  MapPin,
  MicVocal,
  Music2,
  Ticket,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect,useState } from 'react';

// Enhanced mock data for the setlist
const setlist = [
  { title: 'More', type: 'Original', duration: '3:42', mood: 'Introspective' },
  { title: 'Bullet with Butterfly Wings', type: 'Cover', duration: '4:15', artist: 'The Smashing Pumpkins' },
  { title: 'Giving Up', type: 'Original', duration: '3:28', mood: 'Emotional' },
  { title: 'Meant to Break', type: 'Original', duration: '4:02', mood: 'Raw' },
  { title: 'Money', type: 'Cover', duration: '3:55', artist: 'Pink Floyd' },
  { title: 'Fake Friends', type: 'Original', duration: '3:18', mood: 'Defiant' },
  { title: 'Cable Car', type: 'Cover', duration: '4:33', artist: 'The Fray' },
  { title: 'Last Hope', type: 'Cover', duration: '4:07', artist: 'Paramore' },
  { title: 'Karma', type: 'Original', duration: '3:51', mood: 'Contemplative' },
  { title: 'Voices', type: 'Original', duration: '4:24', mood: 'Haunting' },
];

const UpcomingShowPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [showFullSetlist, setShowFullSetlist] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;

  return (
    <main className='overflow-x-hidden bg-brand-black'>
      {/* Enhanced Hero Section with Parallax */}
      <section className='relative h-screen min-h-[700px] flex items-end overflow-hidden'>
        <div
          className='absolute inset-0 z-0'
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <Image
            src='/images/ellis/EllisHeader.png'
            alt='Promotional header for Ellis with a parallax effect.'
            fill
            className='object-cover h-[120%]' // Make image taller to prevent gaps
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent' />
        </div>

        <div className='container mx-auto px-4 relative z-10 pb-20'>
          <div className='max-w-4xl'>
            <div className='inline-flex items-center mb-6 motion-safe:animate-fadeIn'>
              <span className='bg-brand-yellow text-brand-black font-bold px-5 py-2 rounded-full text-md shadow-lg shadow-brand-yellow/20'>
                Show No. 03
              </span>
            </div>
            <h1 className='text-6xl sm:text-7xl md:text-9xl font-bold leading-none text-brand-white'>
              <div className='overflow-hidden'>
                <div className='motion-safe:animate-slideUp' style={{ animationDelay: '0.2s' }}>
                  <span className='block tracking-tight'>TinyStage</span>
                </div>
              </div>
              <div className='overflow-hidden'>
                <div className='motion-safe:animate-slideUp' style={{ animationDelay: '0.4s' }}>
                  <span className='block'>Presents:</span>
                </div>
              </div>
              <div className='overflow-hidden'>
                {/* --- THIS IS THE UPDATED PART --- */}
                <div className='motion-safe:animate-slideUp' style={{ animationDelay: '0.6s' }}>
                  <a
                    href="https://www.instagram.com/_ellis_music/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-brand-yellow mt-4 hover:brightness-125 transition-all duration-300"
                  >
                    Ellis
                  </a>
                </div>
              </div>
            </h1>
            <div className='flex flex-wrap gap-4 mt-8 motion-safe:animate-fadeIn' style={{ animationDelay: '0.8s' }}>
              <button className='group bg-brand-yellow text-brand-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-brand-yellow/20 flex items-center'>
                <Ticket className='mr-3 w-5 h-5 group-hover:rotate-12 transition-transform' />
                Notify Me
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`group px-6 py-4 rounded-full border-2 transition-all duration-300 hover:scale-105 flex items-center ${
                  isLiked
                    ? 'border-brand-yellow bg-brand-yellow/10 text-brand-yellow'
                    : 'border-white/30 text-white hover:border-brand-yellow hover:text-brand-yellow'
                }`}
              >
                <Heart className={`w-5 h-5 mr-2 transition-all ${isLiked ? 'fill-current scale-110' : 'group-hover:scale-110'}`} />
                {isLiked ? 'Liked' : 'Like'}
              </button>
            </div>
          </div>
        </div>
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 motion-safe:animate-bounce'>
          <ChevronDown className='w-6 h-6 text-white/60' />
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className='bg-brand-gray-dark/50 py-5 border-y border-white/10'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-sm text-brand-gray-light'>
            <div className='flex items-center'><Clock className='w-4 h-4 mr-2 text-brand-yellow' /><span>~60 min set</span></div>
            <div className='flex items-center'><Users className='w-4 h-4 mr-2 text-brand-yellow' /><span>Intimate Venue</span></div>
            <div className='flex items-center'><Music2 className='w-4 h-4 mr-2 text-brand-yellow' /><span>10 Songs</span></div>
            <div className='flex items-center'><Guitar className='w-4 h-4 mr-2 text-brand-yellow' /><span>Acoustic Performance</span></div>
          </div>
        </div>
      </section>

      {/* Enhanced Show Details */}
      <section className='py-20 md:py-28 bg-brand-gray-dark'>
        <div className='container mx-auto px-4'>
          <div className='grid lg:grid-cols-3 gap-12 items-start'>
            <div className='lg:col-span-2 space-y-6'>
              <h2 className='text-3xl sm:text-4xl font-bold text-brand-white'>An Intimate Acoustic Set</h2>
              <div className='prose prose-xl prose-invert max-w-none text-brand-gray-light leading-relaxed'>
                <p><span className='text-brand-yellow font-semibold'>Ellis</span> (@_ellis_music) is singer-songwriter from Erie, PA, whose raw honesty blurs the lines between alternative rock and emotional storytelling.</p>
                <p>Backed by guitarist <span className='font-medium text-white'>Shawn Spencer</span>, Ellis’s stripped-down live performances hit with emotional clarity—letting the lyrics lead.</p>
              </div>
            </div>
            <div className='bg-brand-black/40 border border-brand-gray-dark/50 rounded-lg p-8 shadow-2xl'>
              <h3 className='text-2xl font-bold text-brand-yellow mb-6'>Event Details</h3>
              <ul className='space-y-4 text-lg'>
                 {/* Details mapped here for brevity */}
                 <li className='flex items-start'><Calendar className='w-6 h-6 mr-4 mt-1 text-brand-yellow/80' /><span><strong className='text-white block'>Date:</strong>06/27/2025</span></li>
                 <li className='flex items-start'><MapPin className='w-6 h-6 mr-4 mt-1 text-brand-yellow/80' /><span><strong className='text-white block'>Venue:</strong>FEED Media Downtown Arts Center</span></li>
                 <li className='flex items-start'><MicVocal className='w-6 h-6 mr-4 mt-1 text-brand-yellow/80' /><span><strong className='text-white block'>Genre:</strong>Acoustic | Alt-Rock | Emo-Pop</span></li>
                 <li className='flex items-start'><Guitar className='w-6 h-6 mr-4 mt-1 text-brand-yellow/80' /><span><strong className='text-white block'>Accompaniment:</strong>Shawn Spencer (Guitar)</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Setlist */}
      <section className='py-20 md:py-28 bg-brand-black'>
        <div className='container mx-auto px-4 max-w-4xl'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl sm:text-4xl font-bold text-brand-white mb-4'>The Setlist</h2>
            <p className='text-brand-gray-light text-lg'>A curated journey through emotion and sound.</p>
          </div>
          <div className='grid md:grid-cols-2 gap-4'>
            {setlist.slice(0, showFullSetlist ? setlist.length : 6).map((song) => (
              <div key={song.title} className='group bg-brand-gray-dark/40 border border-white/10 rounded-lg p-5 hover:bg-brand-gray-dark/80 transition-colors'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='font-bold text-white text-lg group-hover:text-brand-yellow transition-colors'>{song.title}</h3>
                    <p className='text-gray-400 text-sm'>
                      {song.type === 'Cover' ? `by ${song.artist}` : song.mood}
                    </p>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <span className='text-gray-400 text-sm'>{song.duration}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${song.type === 'Original' ? 'bg-brand-yellow/20 text-brand-yellow' : 'bg-brand-gray-light/20 text-brand-gray-light'}`}>
                      {song.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {setlist.length > 6 && (
            <div className='text-center mt-8'>
              <button onClick={() => setShowFullSetlist(!showFullSetlist)} className='px-8 py-3 border border-brand-yellow/50 text-brand-yellow rounded-full hover:bg-brand-yellow/10 transition-colors flex items-center mx-auto'>
                {showFullSetlist ? 'Show Less' : `Show All ${setlist.length} Songs`}
                <ChevronDown className={`ml-2 w-5 h-5 transition-transform ${showFullSetlist ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
        </div>
      </section>
      
       {/* Final CTA */}
       <section className='py-24 bg-brand-gray-dark'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-2xl md:text-3xl font-bold text-brand-white mb-8'>Explore More Live Music</h2>
          <div className='flex flex-wrap justify-center gap-4 md:gap-6'>
            <Link href='/shows' className='group inline-flex items-center justify-center px-8 py-4 border border-brand-yellow text-lg font-medium rounded-md text-brand-yellow hover:bg-brand-yellow hover:text-brand-black shadow-lg transition-all duration-300 ease-out transform hover:scale-[1.03]'>
              <ArrowLeft className='mr-3 h-5 w-5' />
              Back to All Shows
            </Link>
            <Link href='/shows/archive' className='group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-brand-black bg-brand-yellow hover:brightness-110 shadow-xl transition-all duration-300 ease-out transform hover:scale-[1.03]'>
              View Past Performances
              <Archive className='ml-3 h-5 w-5' />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UpcomingShowPage;