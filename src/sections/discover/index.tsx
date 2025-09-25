"use client";

import Bottom from "./components/bottom";
import Card from "./components/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import Spotlight from "./components/spotlight";
import { SpotlightList } from "./config";
import clsx from "clsx";
import Mouse from "./components/mouse";

const Discover = (props: any) => {
  const { } = props;

  return (
    <div className="relative mainnet-content overflow-y-auto bg-no-repeat bg-top bg-cover text-white bg-[#000000] bg-[url(/images/mainnet/discover/bg.png)]">
      <div className="relative w-full h-full flex flex-col items-center">
        <div className="w-full h-full relative z-[2] pt-[clamp(1px,_2.65vw,_calc(var(--pc-1512)*0.0265))]">
          <Swiper
            modules={[Mousewheel]}
            spaceBetween={0}
            slidesPerView={1}
            loop={false}
            direction="vertical"
            className="w-full h-full overflow-hidden"
            mousewheel={{
              enabled: true,
              sensitivity: 1,
            }}
            allowTouchMove={false}
          >
            <SwiperSlide>
              <Card
                title="Spotlight Apps"
                className="mx-auto"
                contentClassName="h-[clamp(1px,_17.26vw,_calc(var(--pc-1512)*0.1726))] flex justify-center"
                onExploreAll={() => {}}
              >
                <div className="absolute top-[clamp(1px,_7.94vw,_calc(var(--pc-1512)*0.0794))] w-full flex justify-center gap-[clamp(1px,_3.31vw,_calc(var(--pc-1512)*0.0331))]">
                  {
                    SpotlightList.map((item, index) => (
                      <Spotlight
                        key={index}
                        type={index <= 1 ? "left" : "right"}
                        data={item}
                        className={clsx(
                          index === 0 ? "[transform:perspective(clamp(1px,_66.14vw,_calc(var(--pc-1512)*0.6614)))_rotateY(24deg)_scale(1.05)] origin-[center_center_clamp(calc(var(--pc-1512)*-0.0265),_-2.65vw,_1px)] backface-hidden" : "",
                          index === SpotlightList.length - 1 ? "[transform:perspective(clamp(1px,_66.14vw,_calc(var(--pc-1512)*0.6614)))_rotateY(-24deg)_scale(1.05)] origin-[center_center_clamp(calc(var(--pc-1512)*-0.0265),_-2.65vw,_1px)] backface-hidden" : "",
                        )}
                      />
                    ))
                  }
                </div>
              </Card>
              <div className="flex flex-col items-center translate-y-[clamp(calc(var(--pc-1512)*-0.0397),_-3.97vw,_1px)]">
                <Mouse />
                <img
                  src="/images/mainnet/discover/icon-down.svg"
                  alt=""
                  className="w-[12px] h-[10px] object-center object-contain shrink-0 mt-[20px]"
                />
                <div className="mt-[16px] text-[18px] text-white font-[400] uppercase">
                  Trending tokens
                </div>
                <img
                  src="/images/mainnet/discover/icon-down2.svg"
                  alt=""
                  className="w-[12px] h-[10px] object-center object-contain shrink-0 mt-[13px]"
                />
                <div className="mt-[16px] text-[16px] text-white/30 font-[400] uppercase">
                  Explore All Apps
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col items-center translate-y-[0]">
                <div className="text-[18px] text-white font-[400] uppercase">
                  Spotlight apps
                </div>
                <img
                  src="/images/mainnet/discover/icon-down.svg"
                  alt=""
                  className="w-[12px] h-[10px] object-center object-contain shrink-0 mt-[16px] rotate-[180deg]"
                />
              </div>
              <Card
                title="Trending tokens"
                className="mx-auto"
                contentClassName="h-[clamp(1px,_17.26vw,_calc(var(--pc-1512)*0.1726))] flex justify-center"
                onExploreAll={() => {}}
              >
                <div className="absolute top-[clamp(1px,_7.94vw,_calc(var(--pc-1512)*0.0794))] w-full flex justify-center gap-[clamp(1px,_3.31vw,_calc(var(--pc-1512)*0.0331))]">
                  {
                    SpotlightList.map((item, index) => (
                      <Spotlight
                        key={index}
                        type={index <= 1 ? "left" : "right"}
                        data={item}
                        className={clsx(
                          index === 0 ? "[transform:perspective(clamp(1px,_66.14vw,_calc(var(--pc-1512)*0.6614)))_rotateY(24deg)_scale(1.05)] origin-[center_center_clamp(calc(var(--pc-1512)*-0.0265),_-2.65vw,_1px)] backface-hidden" : "",
                          index === SpotlightList.length - 1 ? "[transform:perspective(clamp(1px,_66.14vw,_calc(var(--pc-1512)*0.6614)))_rotateY(-24deg)_scale(1.05)] origin-[center_center_clamp(calc(var(--pc-1512)*-0.0265),_-2.65vw,_1px)] backface-hidden" : "",
                        )}
                      />
                    ))
                  }
                </div>
              </Card>
              <div className="flex flex-col items-center translate-y-[clamp(calc(var(--pc-1512)*-0.0397),_-3.97vw,_1px)]">
                <Mouse />
                <img
                  src="/images/mainnet/discover/icon-down.svg"
                  alt=""
                  className="w-[12px] h-[10px] object-center object-contain shrink-0 mt-[20px]"
                />
                <div className="mt-[16px] text-[18px] text-white font-[400] uppercase">
                  EXPLORE ALL APPS
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col items-center translate-y-[0]">
                <div className="text-[16px] text-white/30 font-[400] uppercase">
                  Spotlight apps
                </div>
                <img
                  src="/images/mainnet/discover/icon-down2.svg"
                  alt=""
                  className="w-[12px] h-[10px] object-center object-contain shrink-0 mt-[13px] rotate-[180deg]"
                />
                <div className="text-[18px] text-white font-[400] uppercase mt-[16px]">
                  TRENDING TOKENS
                </div>
                <img
                  src="/images/mainnet/discover/icon-down.svg"
                  alt=""
                  className="w-[12px] h-[10px] object-center object-contain shrink-0 mt-[16px] rotate-[180deg]"
                />
              </div>
              <Card
                title="EXPLORE ALL APPS"
                className="mx-auto"
                contentClassName="h-[clamp(1px,_17.26vw,_calc(var(--pc-1512)*0.1726))] flex justify-center"
              >
                <div className="absolute top-[clamp(1px,_7.94vw,_calc(var(--pc-1512)*0.0794))] w-full flex justify-center gap-[clamp(1px,_3.31vw,_calc(var(--pc-1512)*0.0331))]">
                  {
                    SpotlightList.map((item, index) => (
                      <Spotlight
                        key={index}
                        type={index <= 1 ? "left" : "right"}
                        data={item}
                        className={clsx(
                          index === 0 ? "[transform:perspective(clamp(1px,_66.14vw,_calc(var(--pc-1512)*0.6614)))_rotateY(24deg)_scale(1.05)] origin-[center_center_clamp(calc(var(--pc-1512)*-0.0265),_-2.65vw,_1px)] backface-hidden" : "",
                          index === SpotlightList.length - 1 ? "[transform:perspective(clamp(1px,_66.14vw,_calc(var(--pc-1512)*0.6614)))_rotateY(-24deg)_scale(1.05)] origin-[center_center_clamp(calc(var(--pc-1512)*-0.0265),_-2.65vw,_1px)] backface-hidden" : "",
                        )}
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
