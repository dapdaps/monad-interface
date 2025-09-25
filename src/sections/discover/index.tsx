"use client";

import Bottom from "./components/bottom";
import Card from "./components/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import Spotlight from "./components/spotlight";
import { SpotlightList } from "./config";

const Discover = (props: any) => {
  const { } = props;

  return (
    <div className="relative mainnet-content overflow-y-auto bg-no-repeat bg-top bg-cover text-white bg-[#000000] bg-[url(/images/mainnet/discover/bg.png)]">
      <div className="relative w-full h-full flex flex-col items-center">
        <div className="w-full h-full relative z-[2]">
          <Swiper
            modules={[Mousewheel]}
            spaceBetween={0}
            slidesPerView={1}
            loop={false}
            direction="vertical"
            className="w-full h-full"
            mousewheel={{
              enabled: true,
              sensitivity: 1,
            }}
          >
            <SwiperSlide>
              <Card title="Spotlight Apps">
                <div className="w-full flex justify-center gap-[clamp(1px,_3.31vw,_calc(var(--pc-1512)*0.0331))]">
                  {
                    SpotlightList.map((item, index) => (
                      <Spotlight
                        key={index}
                        type={index <= 1 ? "left" : "right"}
                        data={item}
                      />
                    ))
                  }
                </div>
              </Card>
            </SwiperSlide>
          </Swiper>
        </div>
        <Bottom />
      </div>
    </div >
  );
};

export default Discover;
