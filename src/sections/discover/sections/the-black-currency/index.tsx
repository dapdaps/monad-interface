import Card from "../../components/card";
import Mouse from "../../components/mouse";
import { useState } from "react";
import Trade from "./trade";
import { monad } from "@/configs/tokens/monad";
import Price from "./price";
import { useRequest } from "ahooks";
import { get } from "@/utils/http";
import TokenDistribution from "./token-distribution";

const BlackCurrency = {
  address: "0xa485d7409bdac5a504d487ce4d0f2af40e64d80b",
  symbol: "BC",
  name: "The Black Currency",
  icon: "/images/mainnet/discover/token-the-black-currency-min.png",
  createdAt: "2025-11-28T02:00:00Z",
};



const TheBlackCurrency = (props: any) => {
  const { getVisits, swiperRef } = props;

  const [activeTab, setActiveTab] = useState<any>("buy");

  const { runAsync: getTokenMarket, loading: marketLoading, data: tokenMarket } = useRequest(async () => {
    try {
      const res = await get("/token/market", {
        address: BlackCurrency.address,
      });

      if (res.code !== 200) {
        return;
      }

      return res.data;
    } catch (error) {
      console.log("get black currency market failed: %o", error);
    }
  }, {
    pollingInterval: 60000, // 1 minute
  });

  const { runAsync: getTokenPrice, loading: priceLoading, data: tokenPrice } = useRequest(async () => {
    try {
      const res = await get("/token/trend/5", {
        address: BlackCurrency.address,
      });

      if (res.code !== 200) {
        return;
      }

      return res.data;
    } catch (error) {
      console.log("get black currency price failed: %o", error);
    }
  }, {
    pollingInterval: 10000, // 5s
  });

  console.log("tokenPrice: %o", tokenPrice);

  return (
    <>
      <div className="pt-[clamp(1px,_6.65vw,_calc(var(--pc-1512)*0.0665))]">
        <Card
          title="⚠️ THE BLACK CURRENCY"
          className="mx-auto"
          backdropClassName="!block [clip-path:polygon(0.9%_15%,99%_15%,99%_92.8%,96.7%_97.8%,78%_93.5%,76.5%_89.2%,70%_88.5%,60%_88%,50%_87.6%,35%_88%,23.4%_88.5%,21%_93%,2.7%_96.4%,2.7%_82%,0.9%_74.9%)]"
        >
          <div className="w-full flex justify-center gap-[clamp(1px,_1.32vw,_calc(var(--pc-1512)*0.0132))] mt-[clamp(calc(var(--pc-1512)*-0.0132),_-1.32vw,_1px)] pr-[clamp(1px,_7.94vw,_calc(var(--pc-1512)*0.0794))] pl-[clamp(1px,_6.61vw,_calc(var(--pc-1512)*0.0661))] text-[clamp(1px,_0.93vw,_calc(var(--pc-1512)*0.0093))] font-[400]">
            <Price token={BlackCurrency} tokenMarket={tokenMarket} marketLoading={marketLoading} tokenPrice={tokenPrice} priceLoading={priceLoading}/>
            <div className="w-[375px]">
              <Trade tokenList={[
                monad["mon"],
                monad["usdt0"],
                monad["usdc"],
              ]} tokenOut={monad["usdc"]} />

              <TokenDistribution />
            </div>
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
