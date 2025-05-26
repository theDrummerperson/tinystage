// src/components/ShowArchive.tsx
"use client";

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';

// Assuming Show type in @/data/types can hold all these fields
// If not, you'd define EnhancedShow here or import an updated Show type

// --- Enhanced Show Interface (if your global Show type is basic) ---
interface EnhancedShow {
  id: string;
  title: string;
  performer: string;
  date: string; 
  description?: string;
  thumbnailUrl: string;
  videoSlug: string;
  venueVibe?: string;
  tracklist?: string[];
  extendedBio?: string;
  anecdotes?: string;
  headerImage?: string;
  genre?: string[];
  hometown?: string;
  venue?: string;
  members?: string[];
  debutEP?: string;
}

// --- useTilt Hook (remains the same) ---
const useTilt = (ref: React.RefObject<HTMLElement>) => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) / (width / 2); 
    const y = (clientY - top - height / 2) / (height / 2); 
    setStyle({
      transform: `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale3d(1.01, 1.01, 1.01)`,
      transition: 'transform 0.05s linear',
    });
  }, [ref]);
  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    });
  }, []);
  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', onMouseMove);
      currentRef.addEventListener('mouseleave', onMouseLeave);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', onMouseMove);
        currentRef.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [ref, onMouseMove, onMouseLeave]); 
  return style;
};

// --- CardWrapper Component (remains the same) ---
type CardWrapperProps = React.PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
}>;
const CardWrapper: React.FC<CardWrapperProps> = ({ children, className, style }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltStyle = useTilt(cardRef);
  return (
    <div ref={cardRef} className={classNames(className)} style={{ ...style, ...tiltStyle, willChange: 'transform' }}>
      {children}
    </div>
  );
};

// --- UPDATED DEJA BLUE DATA with corrected spelling ---
const DEJA_BLUE_DATA: EnhancedShow = {
  id: 'deja-blue-feed-20250502', // Corrected spelling for ID
  title: "Deja Blue at FEED",    // Corrected spelling
  performer: "Deja Blue",        // Corrected spelling
  date: "2025-05-02",
  description: "Erie's genre-bending trio Deja Blue delivers a hauntingly familiar set of indie, dream pop, and lo-fi rock.",
  thumbnailUrl: "/images/Dejaposter.png",
  videoSlug: "deja-blue-live-feed-2025",
  venueVibe: "Intimate & Buzzing",
  genre: ["Indie", "Alternative", "Dream Pop", "Lo-Fi"],
  members: ["Rebecca Lynn – vocals & bass", "Jordan Michael – lead guitar", "Joshua Thomas – drums"],
  hometown: "Erie, PA",
  venue: "FEED Media Arts Downtown Arts Center",
  debutEP: "Ashes to Gold (coming soon)",
  tracklist: ["Intro", "Heart on Overdrive", "J+B", "Every Way", "Love Crash", "Ashes to Gold"],
  extendedBio: "Deja Blue is a genre-blending trio from Erie creating music that feels like memory: hazy, haunting, and heartbreakingly familiar. With roots in indie, lo-fi, dream pop, and alternative rock, their sound is equal parts vibe and vulnerability—something you can move to, cry to, or float away with.\n\nTheir name, a play on déjà vu and the emotional weight of the color blue, captures the essence of their music: cycles of longing, nostalgia, and emotional resonance. As the band puts it, “It’s the feeling of walking a familiar path of sadness or serenity—one that’s not entirely unwelcome but still heavy. Like a song you’ve heard before, its notes echo in your soul, haunting but beautiful.”\n\nFor Deja Blue, sound is a landscape. Every track invites you in—layered with mood, melody, and meaning. It's music that loops back, settles deep, and lingers long after the final note.",
  anecdotes: "This performance at FEED was part of their much-anticipated spring showcase, teasing tracks from their upcoming debut EP 'Ashes to Gold.' The connection with the audience was electric, especially during the raw, stripped-down moments.",
  headerImage: "/images/Dejaposter.png",
};


const ShowArchive: React.FC = () => {
  const [carouselShows, setCarouselShows] = useState<EnhancedShow[]>([]); 
  const [currentSlide, setCurrentSlide] = useState(0); // Will always be 0 if only one slide
  const [selectedShowForModal, setSelectedShowForModal] = useState<EnhancedShow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // MAX_SLIDES_DISPLAY is now effectively 1 if we only show Deja Blue
  // If you want to repeat Deja Blue 3 times, set this back to 3
  const MAX_SLIDES_DISPLAY_FOR_SINGLE_ARTIST = 1; 

  useEffect(() => {
    // Only use DEJA_BLUE_DATA
    const showsToDisplay: EnhancedShow[] = [DEJA_BLUE_DATA];
    
    // Process the single show item (ensure all fields, generate slug if needed)
    const processedShow = {
      ...showsToDisplay[0], // Take the first (and only) item
      id: String(showsToDisplay[0].id || Math.random().toString(36).substring(2)),
      title: showsToDisplay[0].title || "Untitled Show",
      performer: showsToDisplay[0].performer || "Unknown Artist",
      date: showsToDisplay[0].date || new Date().toISOString().split('T')[0],
      description: showsToDisplay[0].description || "No description available.",
      thumbnailUrl: showsToDisplay[0].thumbnailUrl || '/images/TSlogo.png',
      videoSlug: showsToDisplay[0].videoSlug || (showsToDisplay[0].title ? showsToDisplay[0].title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : `show-${showsToDisplay[0].id}`),
    } as EnhancedShow;
    
    const slides: EnhancedShow[] = [];
    for (let i = 0; i < MAX_SLIDES_DISPLAY_FOR_SINGLE_ARTIST; i++) {
        slides.push(processedShow); // Add the processed Deja Blue data N times
    }
    setCarouselShows(slides);
    setCurrentSlide(0); // Always start at the first slide

  }, []); // Empty dependency array, runs once on mount

  const formatDate = (dateString: string): string => { 
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) {
      return "Date TBA";
    }
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit', 
      year: 'numeric',
    }).toUpperCase();
  };

  const openModal = (show: EnhancedShow) => { 
    setSelectedShowForModal(show);
    setIsModalOpen(true);
    if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
    }
  };
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedShowForModal(null);
    if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
    }
  }, []);

  useEffect(() => { 
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    if (isModalOpen && typeof window !== 'undefined') {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleEsc);
      }
    };
  }, [isModalOpen, closeModal]);

  // Carousel navigation is only needed if carouselShows.length > 1
  const nextSlide = () => {
    if (carouselShows.length <= 1) return;
    setCurrentSlide((prev) => (prev === carouselShows.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (carouselShows.length <= 1) return;
    setCurrentSlide((prev) => (prev === 0 ? carouselShows.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-black via-brand-black to-brand-gray-dark font-sans text-brand-gray-light selection:bg-brand-yellow selection:text-brand-black flex flex-col">
      <header className="relative pt-16 pb-12 md:pt-20 md:pb-16 text-center isolate">
        <div
          className="absolute inset-0 z-[-2] bg-cover bg-center opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "url('/images/tinystage-bg-texture.jpg')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-[-1] opacity-[0.02] bg-[radial-gradient(ellipse_at_center,_var(--brand-yellow)_0%,transparent_70%)] pointer-events-none"
          aria-hidden="true"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 md:space-y-5">
            <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-yellow leading-none tracking-tighter uppercase">
              Past Stages
            </h1>
            <div className="max-w-2xl mx-auto">
              <p className="text-base md:text-lg text-brand-gray-light/80 font-normal leading-relaxed tracking-normal">
                Relive the magic. Explore our featured TinyStage performance.
              </p>
            </div>
            <div className="flex justify-center pt-4 md:pt-5">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-brand-yellow to-transparent opacity-30" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center relative pb-16 md:pb-20 px-4">
        {carouselShows.length > 0 ? (
          <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <h2 className="sr-only">Featured Performance</h2> {/* Updated heading */}
            
            <div className="relative overflow-hidden rounded-xl">
              <div 
                className="flex transition-transform duration-500 ease-out" 
                // If only one slide, transform is not strictly necessary but kept for consistency
                style={{ transform: `translateX(-${currentSlide * 100}%)` }} 
              >
                {carouselShows.map((show, index) => ( // Will map only once if MAX_SLIDES_DISPLAY_FOR_SINGLE_ARTIST is 1
                  <div key={`${show.id}-${index}`} className="w-full flex-shrink-0 px-1 py-1">
                    <CardWrapper className="group flex flex-col">
                      <article
                        aria-labelledby={`show-title-${show.id}-${index}`}
                        className="flex flex-col flex-grow bg-brand-gray-dark/40 rounded-xl shadow-2xl border border-brand-gray-dark/60 hover:border-brand-yellow/50 transition-all duration-300 ease-out backdrop-blur-lg group-hover:shadow-brand-yellow/15 p-4 md:p-5 h-full"
                      >
                        <button type="button" onClick={() => openModal(show)} className="block mb-4 group/image focus:outline-none" aria-label={`View details for ${show.title}`}>
                          <div className="relative transform group-hover/image:scale-[1.03] transition-transform duration-300 ease-out aspect-[16/10]">
                            <div className="bg-brand-black/40 p-0.5 shadow-lg rounded-sm">
                              <div className="bg-brand-white p-1 shadow-inner rounded-sm">
                                <div className="relative bg-brand-gray-medium overflow-hidden aspect-[16/10]">
                                  <Image
                                    src={show.thumbnailUrl || '/images/TSlogo.png'}
                                    alt={`Thumbnail for ${show.title}`}
                                    fill
                                    sizes="(max-width: 768px) 90vw, (max-width: 1280px) 50vw, 33vw"
                                    className="object-cover transition-all duration-300 ease-out group-hover/image:saturate-125 group-hover/image:brightness-110"
                                    priority={true} // Always prioritize if it's the only/first slide
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-brand-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>

                        <div className="flex flex-col flex-grow space-y-2.5 bg-brand-black/20 p-3 rounded-md mt-auto">
                          <div className="space-y-0.5">
                            <h3
                              id={`show-title-${show.id}-${index}`}
                              className="font-sans text-lg font-semibold text-brand-yellow leading-tight tracking-tight group-hover:text-brand-white transition-colors duration-200 truncate"
                            >
                              <button type="button" onClick={() => openModal(show)} className="text-left hover:underline decoration-brand-yellow/60 decoration-1 underline-offset-2 focus:outline-none">
                                {show.title}
                              </button>
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-2 text-xs">
                              <p className="font-sans font-medium text-brand-white/90 truncate">
                                {show.performer}
                              </p>
                              <time className="font-sans text-[0.65rem] font-medium text-brand-gray-light/70 tracking-wider shrink-0">
                                {formatDate(show.date)}
                              </time>
                            </div>
                          </div>
                          
                          {show.genre && show.genre.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                              {show.genre.slice(0, 3).map(g => (
                                <span key={g} className="px-1.5 py-0.5 text-[0.6rem] font-medium bg-brand-yellow/10 text-brand-yellow/80 rounded-sm tracking-wider">
                                  {g}
                                </span>
                              ))}
                            </div>
                          )}

                          <p className="font-sans text-sm leading-relaxed text-brand-gray-light/80 min-h-[2.625rem] pt-1 font-light line-clamp-2 group-hover:line-clamp-none transition-all duration-200">
                            {show.description}
                          </p>

                          {show.venueVibe && (
                            <div className="h-5">
                                <p className="font-sans text-[0.7rem] text-brand-yellow/60 italic tracking-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    Vibe: {show.venueVibe}
                                </p>
                            </div>
                          )}
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <button 
                              type="button"
                              onClick={() => openModal(show)}
                              aria-label={`Learn more about ${show.title}`}
                              className="inline-flex items-center gap-x-1.5 px-3 py-1.5 border border-brand-yellow/60 text-brand-yellow/80 font-sans font-medium text-[0.65rem] uppercase tracking-wider rounded hover:bg-brand-yellow hover:text-brand-black hover:border-brand-yellow transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-brand-gray-dark"
                            >
                              <span>Learn More</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                            </button>
                          </div>
                        </div>
                      </article>
                    </CardWrapper>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Navigation & Dots: Only show if more than 1 slide (which won't be the case now if MAX_SLIDES_DISPLAY_FOR_SINGLE_ARTIST is 1) */}
            {carouselShows.length > 1 && (
              <>
                <button 
                  onClick={prevSlide} 
                  aria-label="Previous show"
                  className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-5 z-10 p-2 bg-brand-gray-dark/30 hover:bg-brand-gray-dark/60 text-brand-yellow rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-brand-black"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button 
                  onClick={nextSlide} 
                  aria-label="Next show"
                  className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-5 z-10 p-2 bg-brand-gray-dark/30 hover:bg-brand-gray-dark/60 text-brand-yellow rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-brand-black"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 pt-4">
                    {carouselShows.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={classNames(
                                "w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ease-out",
                                { "bg-brand-yellow scale-125": currentSlide === idx, "bg-brand-gray-light/40 hover:bg-brand-gray-light/70": currentSlide !== idx }
                            )}
                        />
                    ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-20 md:py-32">
             <svg className="w-16 h-16 mx-auto text-brand-gray-medium opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <h3 className="font-sans text-xl md:text-2xl font-semibold text-brand-gray-medium tracking-tight">
                  {/* Updated empty state to reflect single artist focus */}
                  {DEJA_BLUE_DATA ? "Loading featured show..." : "Archive Coming Soon"}
                </h3>
                <p className="font-sans text-base text-brand-gray-light/90 max-w-md mx-auto leading-relaxed tracking-normal">
                  {DEJA_BLUE_DATA 
                    ? "We're preparing something special from Deja Blue..." 
                    : "The TinyStage archive is just getting started. Check back for unforgettable live music moments!"
                  }
                </p>
          </div>
        )}
      </main>

      {/* Liner Notes Modal (Updated to show new Deja Blue info) */}
      {isModalOpen && selectedShowForModal && (
        <div 
          className="fixed inset-0 z-[100] bg-brand-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeInBasic"
          onClick={closeModal}
          aria-modal="true"
          role="dialog"
          aria-labelledby="linerNotesTitle"
        >
          <div 
            className="bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] text-brand-black rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative animate-fadeInSlideUp"
            onClick={(e) => e.stopPropagation()}
            style={{'--brand-parchment': '#f7f3e9'} as React.CSSProperties}
          >
            <button 
              type="button" 
              onClick={closeModal}
              className="absolute top-3 right-3 text-brand-gray-medium hover:text-brand-black transition-colors p-1 rounded-full hover:bg-black/10 z-[101]"
              aria-label="Close details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {selectedShowForModal.headerImage && (
              <div className="relative -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6 h-48 md:h-64 overflow-hidden rounded-t-lg">
                <Image src={selectedShowForModal.headerImage} alt={`Image for ${selectedShowForModal.title}`} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            )}
            
            <div className={`space-y-5 md:space-y-6 ${selectedShowForModal.headerImage ? '' : 'pt-4'}`}>
              <div>
                <h2 id="linerNotesTitle" className="font-sans text-2xl md:text-3xl font-bold text-brand-black tracking-tight">
                  {selectedShowForModal.title}
                </h2>
                <p className="font-sans text-lg md:text-xl font-medium text-brand-gray-dark/80">
                  by {selectedShowForModal.performer}
                </p>
                <div className="font-sans text-sm text-brand-gray-medium mt-2 space-y-1">
                    <p><strong>Recorded:</strong> {formatDate(selectedShowForModal.date)}</p>
                    {selectedShowForModal.venue && <p><strong>Venue:</strong> {selectedShowForModal.venue}</p>}
                    {selectedShowForModal.hometown && <p><strong>From:</strong> {selectedShowForModal.hometown}</p>}
                    {selectedShowForModal.genre && selectedShowForModal.genre.length > 0 && (
                        <p><strong>Genre:</strong> {selectedShowForModal.genre.join(' | ')}</p>
                    )}
                    {selectedShowForModal.debutEP && <p><strong>Debut EP:</strong> <em className="font-medium">{selectedShowForModal.debutEP}</em></p>}
                    {selectedShowForModal.venueVibe && <p className="italic"><strong>Vibe:</strong> {selectedShowForModal.venueVibe}</p>}
                </div>
              </div>

             {selectedShowForModal.members && selectedShowForModal.members.length > 0 && (
                <section>
                  <h4 className="font-sans text-sm font-semibold uppercase text-brand-gray-medium tracking-wider mb-2 pt-3 border-t border-brand-gray-dark/10">Members</h4>
                  <ul className="list-none space-y-0.5 font-sans text-sm text-brand-gray-dark/90 pl-1">
                    {selectedShowForModal.members.map((member, i) => <li key={i}>{member}</li>)}
                  </ul>
                </section>
              )}

              {selectedShowForModal.tracklist && selectedShowForModal.tracklist.length > 0 && (
                <section>
                  <h4 className="font-sans text-sm font-semibold uppercase text-brand-gray-medium tracking-wider mb-2 pt-3 border-t border-brand-gray-dark/10">TinyStage Setlist</h4>
                  <ol className="list-decimal list-inside space-y-1 font-sans text-sm text-brand-gray-dark/90 pl-1">
                    {selectedShowForModal.tracklist.map((track, i) => <li key={i}>{track}</li>)}
                  </ol>
                </section>
              )}
              
              {selectedShowForModal.extendedBio && (
                <section>
                  <h4 className="font-sans text-sm font-semibold uppercase text-brand-gray-medium tracking-wider mb-2 pt-3 border-t border-brand-gray-dark/10">About {selectedShowForModal.performer}</h4>
                  <div className="font-sans text-sm leading-relaxed text-brand-gray-dark/90 whitespace-pre-line prose prose-sm max-w-none prose-p:my-2 prose-strong:text-brand-gray-dark">
                    {selectedShowForModal.extendedBio.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              )}

              {selectedShowForModal.anecdotes && (
                <section>
                  <h4 className="font-sans text-sm font-semibold uppercase text-brand-gray-medium tracking-wider mb-2 pt-3 border-t border-brand-gray-dark/10">Notes from the Night</h4>
                  <p className="font-sans text-sm leading-relaxed text-brand-gray-dark/90 italic whitespace-pre-line">
                    "{selectedShowForModal.anecdotes}"
                  </p>
                </section>
              )}

               <div className="pt-6 text-center border-t border-brand-gray-dark/10 mt-6">
                    {/* Modal button now links to video slug, text is "Watch This Performance" */}
                    <Link 
                        href={`/shows/${selectedShowForModal.videoSlug || '#'}`}
                        onClick={closeModal}
                        className="inline-flex items-center gap-x-2 px-6 py-3 bg-brand-yellow text-brand-black font-sans font-semibold text-sm uppercase tracking-wider rounded-md 
                                   hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-white transition-all duration-200 ease-out"
                      >
                        <span>Watch This Performance</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </Link>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowArchive;