import Card from "../components/card";
import { AppList } from "../config";
import Spotlight from "../components/spotlight";
import Mouse from "../components/mouse";
import clsx from "clsx";
import { useProgressRouter } from "@/hooks/use-progress-router";
import useClickTracking from "@/hooks/use-click-tracking";
import { useMemo } from "react";

const SpotlightApps = (props: any) => {
  const { getVisits, swiperRef } = props;

  const router = useProgressRouter();
  const { handleReportWithoutDebounce } = useClickTracking();

  const SpotlightList = useMemo(() => {
    return AppList.filter((item) => item.isSpotlight).slice(0, 4);
  }, [AppList]);

  return (
    <div className="pt-[clamp(1px,_6.65vw,_calc(var(--pc-1512)*0.0665))]">
      <Card
        title="Spotlight Apps"
        className="mx-auto"
        backdropClassName="!block [clip-path:polygon(0.9%_15%,99%_15%,99%_92.8%,96.7%_97.8%,78%_93.5%,76.5%_89.2%,70%_88.5%,60%_88%,50%_87.6%,35%_88%,23.4%_88.5%,21%_93%,2.7%_96.4%,2.7%_82%,0.9%_74.9%)]"
        onExploreAll={() => {
          swiperRef?.current?.swiper?.slideTo(2);
        }}
      >
        <div className="w-full flex justify-center gap-[clamp(1px,_3.31vw,_calc(var(--pc-1512)*0.0331))]">
          {
            SpotlightList.map((item, index) => {
              const visits = getVisits(item.bpContent);

              return (
                <Spotlight
                  key={index}
                  type={index <= 1 ? "left" : "right"}
                  data={item}
                  className={clsx(
                    index === 0 ? "[transform:perspective(clamp(1px,_66.14vw,_calc(var(--pc-1512)*0.6614)))_rotateY(24deg)_scale(1.05)] origin-[center_center_clamp(calc(var(--pc-1512)*-0.0265),_-2.65vw,_1px)] backface-hidden" : "",
                    index === SpotlightList.length - 1 ? "[transform:perspective(clamp(1px,_66.14vw,_calc(var(--pc-1512)*0.6614)))_rotateY(-24deg)_scale(1.05)] origin-[center_center_clamp(calc(var(--pc-1512)*-0.0265),_-2.65vw,_1px)] backface-hidden" : "",
                  )}
                  onClick={() => {
                    handleReportWithoutDebounce(item.bp, item.bpContent);

                    if (/^https?:\/\//.test(item.link)) {
                      window.open(item.link, "_blank");
                      return;
                    }

                    router.push(item.link);
                  }}
                  visits={visits}
                />
              );
            })
          }
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
        <div className="mt-[16px] text-[18px] text-white font-[400] uppercase opacity-80">
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
    </div>
  );
};

export default SpotlightApps;
