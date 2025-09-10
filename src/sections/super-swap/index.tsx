"use client";

import useIsMobile from "@/hooks/use-isMobile";
import Bg from "./Bg";
import Content from "./Content";
import DappIcon from "./Icon";
import config from "./config";

export default function SuperSwap() {
  const isMobile = useIsMobile();
  return (
    <div className="relative lg:w-[548px] mt-[88px]">
      <div className="relative z-[2] lg:w-[446px] md:w-[370px] lg:ml-[49px] lg:py-[40px]">
        <Content dapp={config} />
      </div>
      {
        !isMobile && (
          <>
            <DappIcon dapp={config} />
             <Bg />
          </>
        )
      }
    </div>
  );
}
