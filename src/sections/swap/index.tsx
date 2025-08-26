"use client";

import useIsMobile from "@/hooks/use-isMobile";
import Bg from "./Bg";
import Content from "./Content";
import DappIcon from "./Icon";

export default function Swap({ dapp }: any) {
  const isMobile = useIsMobile();
  return (
    <div className="relative lg:w-[548px] mt-[88px]">
      <div className="relative z-[2] lg:w-[446px] md:w-[370px] lg:ml-[49px] lg:py-[40px]">
        <Content dapp={dapp} />

      </div>
      {
        !isMobile && (
          <>
            {
              !["SuperSwap"].includes(dapp.name) && (
                <DappIcon dapp={dapp} />
              )
            }
            <Bg />
          </>
        )
      }
    </div>
  );
}
