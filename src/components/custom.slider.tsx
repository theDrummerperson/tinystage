import React, { ReactNode, useEffect, useState } from 'react';

import './custom.slider.css';

interface CustomCarouselProps {
  children: ReactNode[];
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [slideDone, setSlideDone] = useState<boolean>(true);
  const [timeID, setTimeID] = useState<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const slideNext = React.useCallback((): void => {
    setActiveIndex((val) => (val >= children.length - 1 ? 0 : val + 1));
  }, [children.length]);

  const slidePrev = (): void => {
    setActiveIndex((val) => (val <= 0 ? children.length - 1 : val - 1));
  };

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false);
      const id = setTimeout(() => {
        slideNext();
        setSlideDone(true);
      }, 5000);
      setTimeID(id);
    }

    return () => {
      if (timeID) clearTimeout(timeID);
    };
  }, [slideDone, slideNext, timeID]);

  const AutoPlayStop = (): void => {
    if (timeID) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  const AutoPlayStart = (): void => {
    if (!slideDone) {
      setSlideDone(true);
    }
  };

  return (
    <div
      className='container__slider'
      onMouseEnter={AutoPlayStop}
      onMouseLeave={AutoPlayStart}
    >
      {children.map((item, index) => (
        <div
          className={'slider__item slider__item-active-' + (activeIndex + 1)}
          key={index}
        >
          {item}
        </div>
      ))}

      <div className='container__slider__links'>
        {children.map((_, index) => (
          <button
            key={index}
            className={
              activeIndex === index
                ? 'container__slider__links-small container__slider__links-small-active'
                : 'container__slider__links-small'
            }
            onClick={(e) => {
              e.preventDefault();
              setActiveIndex(index);
            }}
          ></button>
        ))}
      </div>

      <button
        className='slider__btn-next'
        onClick={(e) => {
          e.preventDefault();
          slideNext();
        }}
      >
        {'>'}
      </button>
      <button
        className='slider__btn-prev'
        onClick={(e) => {
          e.preventDefault();
          slidePrev();
        }}
      >
        {'<'}
      </button>
    </div>
  );
};

export default CustomCarousel;
