// src/components/ShowArchive.tsx
"use client";

// Imports sorted by ESLint (run --fix after applying changes)
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';

// Correctly import AnyShow and PastShow (if specifically needed for DEJA_BLUE_DATA typing)
import { AnyShow,PastShow } from '@/data/types'; 

// --- useTilt Hook (No changes needed here, assuming it's correct from before) ---
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

// --- CardWrapper Component (No changes needed here) ---
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

// --- DEJA BLUE DATA (Typed as PastShow for specificity) ---
const DEJA_BLUE_DATA: PastShow = { 
  type: 'past', // Crucial discriminant
  id: 'deja-blue-feed-20250502',
  title: "Deja Blue at FEED",
  performer: "Deja Blue",
  date: "2025-05-02", 
  description: "Erie's genre-bending trio Deja Blue delivers a hauntingly familiar set of indie, dream pop, and lo-fi rock.",
  thumbnailUrl: "/images/Dejaposter.png",
  videoSlug: "deja-blue-live-feed-2025",
  venueVibe: "Intimate & Buzzing",
  genre: ["Indie", "Alternative", "Dream Pop", "Lo-Fi"],
  members: ["Rebecca Lynn – vocals & bass", "Jordan Michael – lead guitar", "Joshua Thomas – drums"],
  hometown: "Erie, PA",
  venue: { name: "FEED Media Arts Downtown Arts Center", address: "123 Main St, Erie, PA" }, // Example address
  debutEP: "Ashes to Gold (coming soon)",
  tracklist: ["Intro", "Heart on Overdrive", "J+B", "Every Way", "Love Crash", "Ashes to Gold"],
  extendedBio: "Deja Blue is a genre-blending trio from Erie creating music that feels like memory: hazy, haunting, and heartbreakingly familiar. With roots in indie, lo-fi, dream pop, and alternative rock, their sound is equal parts vibe and vulnerability—something you can move to, cry to, or float away with.\n\nTheir name, a play on déjà vu and the emotional weight of the color blue, captures the essence of their music: cycles of longing, nostalgia, and emotional resonance. As the band puts it, “It’s the feeling of walking a familiar path of sadness or serenity—one that’s not entirely unwelcome but still heavy. Like a song you’ve heard before, its notes echo in your soul, haunting but beautiful.”\n\nFor Deja Blue, sound is a landscape. Every track invites you in—layered with mood, melody, and meaning. It's music that loops back, settles deep, and lingers long after the final note.",
  anecdotes: "This performance at FEED was part of their much-anticipated spring showcase, teasing tracks from their upcoming debut EP 'Ashes to Gold.' The connection with the audience was electric, especially during the raw, stripped-down moments.",
  headerImage: "/images/Dejaposter.png",
  flyerImageUrl: "/images/Dejaposter.png", // PastShow specific
};


const ShowArchive: React.FC = () => {
  const [carouselShows, setCarouselShows] = useState<AnyShow[]>([]); 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedShowForModal, setSelectedShowForModal] = useState<AnyShow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const MAX_SLIDES_DISPLAY_FOR_SINGLE_ARTIST = 1; 

  useEffect(() => {
    const showsToDisplay: AnyShow[] = [DEJA_BLUE_DATA]; 
    
    // Assuming DEJA_BLUE_DATA is already well-formed and matches AnyShow (specifically PastShow here)
    // No complex processing needed if data is already good.
    const finalShowData = showsToDisplay[0];
    
    const slides: AnyShow[] = [];
    for (let i = 0; i < MAX_SLIDES_DISPLAY_FOR_SINGLE_ARTIST; i++) {
        slides.push(finalShowData);
    }
    setCarouselShows(slides);
    setCurrentSlide(0);

  }, []);

  // Local formatDate, or use the imported one: formatDateFromTypes
  const formatDateForCardDisplay = (dateString: string): string => { 
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

  const openModal = (show: AnyShow) => { 
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

  // These will be marked as unused if carouselShows.length <= 1
  const nextSlide = () => {
    if (carouselShows.length <= 1) return;
    setCurrentSlide((prev) => (prev === carouselShows.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (carouselShows.length <= 1) return;
    setCurrentSlide((prev) => (prev === 0 ? carouselShows.length - 1 : prev - 1));
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-brand-black via-brand-black to-brand-gray-dark font-sans text-brand-gray-light selection:bg-brand-yellow selection:text-brand-black flex flex-col relative isolate"
      style={{
        backgroundImage: `url('/svg/2.svg')`, 
        backgroundRepeat: 'repeat',
        backgroundSize: '300px', 
        backgroundPosition: 'center center',
      }}
    >
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-brand-black via-brand-black to-brand-gray-dark opacity-95 pointer-events-none"></div>

      <header className="relative pt-16 pb-12 md:pt-20 md:pb-16 text-center isolate z-10">
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

      <main className="flex-grow flex flex-col items-center justify-center relative pb-16 md:pb-20 px-4 z-10">
        {carouselShows.length > 0 ? (
          <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <h2 className="sr-only">Featured Performance</h2>
            
            <div className="relative overflow-hidden rounded-xl">
              <div 
                className="flex transition-transform duration-500 ease-out" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }} 
              >
                {carouselShows.map((show, index) => ( // 'show' is now of type AnyShow
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
                                    priority={true}
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
                                {formatDateForCardDisplay(show.date)}
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

            {carouselShows.length > 1 && (
              <>
               {/* ... Carousel Nav Buttons (will not render if only 1 slide) ... */}
              </>
            )}
            {carouselShows.length > 1 && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 pt-4 z-20">
                    {/* ... Carousel Dots (will not render if only 1 slide) ... */}
                </div>
            )}
          </div>
        ) : (
           <div className="text-center py-20 md:py-32 z-10">
             {/* ... Empty State ... */}
           </div>
        )}
      </main>

      {isModalOpen && selectedShowForModal && ( // selectedShowForModal is now AnyShow
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
                    <p><strong>Recorded:</strong> {formatDateForCardDisplay(selectedShowForModal.date)}</p> {/* Use renamed local function */}
                    {selectedShowForModal.venue?.name && <p><strong>Venue:</strong> {selectedShowForModal.venue.name}</p>}
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