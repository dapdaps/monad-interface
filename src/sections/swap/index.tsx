"use client";

import useIsMobile from "@/hooks/use-isMobile";
import Bg from "./Bg";
import Content from "./Content";
import DappIcon from "./Icon";
import { useState } from "react";

export default function Swap({ dapp, isSuperSwap }: any) {
  const isMobile = useIsMobile();
  const [showRoute, setShowRoute] = useState(false);
  return (
    <div className="pt-[150px] flex justify-center items-start gap-[15px]">
      <div className="relative lg:w-[550px]">
        <div className="relative z-[2] px-[34px] py-[45px] font-Oxanium ">
          <Content
            dapp={dapp}
            isSuperSwap={isSuperSwap}
            onShowRoute={(routes: any) => {
              if (routes && routes.length > 0) {
                setShowRoute(true);
              } else {
                setShowRoute(false);
              }
            }}
          // showSetting={!["SuperSwap"].includes(dapp.name)}
          />
        </div>

        {
          !isMobile && (
            <>
              {
                // !["SuperSwap"].includes(dapp.name) && (
                //   <DappIcon dapp={dapp} />
                // )
                <DappIcon dapp={dapp} isSuperSwap={isSuperSwap} />
              }
              <Bg className={showRoute ? "mt-[-15px]" : "mt-[-5px]"}/>
            </>
          )
        }
      </div>

      {
        showRoute && (
          <div className="flex-1"></div>
        )
      }
    </div>
  );
}
