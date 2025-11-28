import clsx from "clsx";
import Card from "../../components/card";
import Mouse from "../../components/mouse";
import { useState } from "react";
import Swap from "./swap";

const TheBlackCurrency = (props: any) => {
  const { getVisits, swiperRef } = props;

  const [activeTab, setActiveTab] = useState<any>("buy");

  return (
    <>
      <div className="pt-[clamp(1px,_6.65vw,_calc(var(--pc-1512)*0.0665))]">
        <Card
          title="⚠️ THE BLACK CURRENCY"
          className="mx-auto"
          backdropClassName="!block [clip-path:polygon(0.9%_15%,99%_15%,99%_92.8%,96.7%_97.8%,78%_93.5%,76.5%_89.2%,70%_88.5%,60%_88%,50%_87.6%,35%_88%,23.4%_88.5%,21%_93%,2.7%_96.4%,2.7%_82%,0.9%_74.9%)]"
        >
          <div className="w-full flex justify-center gap-[clamp(1px,_3.31vw,_calc(var(--pc-1512)*0.0331))] mt-[-30px] pl-[20px] text-[clamp(1px,_0.93vw,_calc(var(--pc-1512)*0.0093))] font-[400]">
            <div className="w-0 flex-1"></div>
            <Swap activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </Card>
        <div className="flex flex-col items-center translate-y-[clamp(calc(var(--pc-1512)*-0.0397),_-3.97vw,_1px)]">
          <Mouse
            onClick={() => {
              swiperRef?.current?.swiper?.slideNext();
            }}
          />
          <img
            src="/images/mainnet/discover/icon-down.svg"
            alt=""
            className="w-[12px] h-[10px] object-center object-contain shrink-0 mt-[20px]"
          />
          <div
            onClick={() => {
              swiperRef?.current?.swiper?.slideNext();
            }}
            className="mt-[16px] text-[18px] text-white font-[400] uppercase opacity-80 cursor-pointer"
          >
            Spotlight Apps
          </div>
          <img
            src="/images/mainnet/discover/icon-down2.svg"
            alt=""
            className="w-[12px] h-[10px] object-center object-contain shrink-0 mt-[13px]"
          />
          <div
            onClick={() => {
              swiperRef?.current?.swiper?.slideTo(2);
            }}
            className="mt-[16px] text-[16px] text-white/30 font-[400] uppercase cursor-pointer"
          >
            Trending tokens
          </div>
        </div>
      </div>
    </>
  );
};

export default TheBlackCurrency;
