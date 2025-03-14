"use client";

import Bg from "./Bg";
import Content from "./Content";
import DappIcon from "./Icon";

export default function Swap({ dapp }: any) {
  return (
    <div className="relative w-[548px] md:w-[calc(100%-32px)] md:ml-[16px] mt-[88px]">
      <div className="relative z-[2] w-[446px] ml-[49px] py-[40px]">
        <Content dapp={dapp} />
      </div>
      <DappIcon dapp={dapp} />
      <Bg />
    </div>
  );
}
