"use client";

import Bottom from "./components/bottom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import SpotlightApps from "./sections/spotlight-apps";
import TrendingTokens from "./sections/trending-tokens";
import ExploreAllApps from "./sections/explore-all-apps";
import { useRef, useEffect, useState } from "react";
import { useClick } from "./hooks/use-click";
import { Virtual, Navigation, Pagination } from 'swiper/modules';

// import './style.css';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

const Discover = (props: any) => {
  const { } = props;

  const swiperRef = useRef<any>(null);
  const { getVisits } = useClick();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const scrollableContent = target.closest('.explore-all-apps-content') as HTMLElement;

      if (scrollableContent) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableContent;
        const isAtTop = scrollTop === 0;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight;
        const isScrollingUp = e.deltaY < 0;
        const isScrollingDown = e.deltaY > 0;

        // If scrolled to top and scrolling up, or scrolled to bottom and scrolling down, allow Swiper to take over
        if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
          // Don't prevent the event, let Swiper handle it
          return;
        }

        // Otherwise prevent event bubbling to Swiper, but allow normal scrolling within content area
        e.stopPropagation();
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: true, capture: true });

    return () => {
      document.removeEventListener('wheel', handleWheel, true);
    };
  }, []);

  return (
    <div className="relative mainnet-content !pb-0 !pt-0 overflow-y-auto bg-no-repeat bg-top bg-cover text-white bg-[#000000] bg-[url(/images/mainnet/discover/bg.png)]">
      <div className="relative w-full h-full flex flex-col items-center">
        <div className="w-full h-full relative z-[2]">
          <Swiper
            ref={swiperRef}
            modules={[Mousewheel]}
            spaceBetween={0}
            slidesPerView={1}
            loop={false}
            direction="vertical"
            className="w-full h-full overflow-hidden"
            mousewheel={{
              enabled: true,
              sensitivity: 1,
              releaseOnEdges: true,
              thresholdDelta: 25,
              thresholdTime: 150,
            }}
            allowTouchMove={false}
          >
            <SwiperSlide>
              <SpotlightApps
                getVisits={getVisits}
                swiperRef={swiperRef}
              />
            </SwiperSlide>
            <SwiperSlide>
              <TrendingTokens
                swiperRef={swiperRef}
              />
            </SwiperSlide>
            <SwiperSlide>
              <ExploreAllApps
                getVisits={getVisits}
                swiperRef={swiperRef}
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <Bottom />
      </div>
    </div >
  );
};

export default Discover;

export const x = () => {

  const [swiperRef, setSwiperRef] = useState<any>(null);
  const appendNumber = useRef(500);
  const prependNumber = useRef(1);
  // Create array with 500 slides
  const [slides, setSlides] = useState(
    Array.from({ length: 500 }).map((_, index) => `Slide ${index + 1}`)
  );

  const prepend = () => {
    setSlides([
      `Slide ${prependNumber.current - 2}`,
      `Slide ${prependNumber.current - 1}`,
      ...slides,
    ]);
    prependNumber.current = prependNumber.current - 2;
    swiperRef?.slideTo(swiperRef?.activeIndex + 2, 0);
  };

  const append = () => {
    setSlides([...slides, 'Slide ' + ++appendNumber.current]);
  };

  const slideTo = (index: number) => {
    swiperRef.slideTo(index - 1, 0);
  };

  return (
    <div className="pt-[150px]">
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        onSwiper={setSwiperRef}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        virtual
      >
        {slides.map((slideContent, index) => (
          <SwiperSlide key={slideContent} virtualIndex={index}>
            {slideContent}
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="append-buttons">
        <button onClick={() => prepend()} className="prepend-2-slides">
          Prepend 2 Slides
        </button>
        <button onClick={() => slideTo(1)} className="prepend-slide">
          Slide 1
        </button>
        <button onClick={() => slideTo(250)} className="slide-250">
          Slide 250
        </button>
        <button onClick={() => slideTo(500)} className="slide-500">
          Slide 500
        </button>
        <button onClick={() => append()} className="append-slides">
          Append Slide
        </button>
      </p>
    </div>
  )
};
