import MainLayoutHeader from "@/layouts/main/header";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MovingGif from "./MovingGif";

const itemWidth = 51;
const itemGap = 6;

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const dappItems = [
    { name: "Lynex", icon: "/images/monad/dapps/lynx.svg" },
    { name: "iZumi Finance", icon: "/images/monad/dapps/iZumi.svg" },
    { name: "Pancake", icon: "/images/monad/dapps/pancake.svg" },
    { name: "OpenOcean", icon: "/images/monad/dapps/OpenOcean.svg" },
    { name: "Infinex", icon: "/images/monad/dapps/infinex.svg" },
    { name: "Orderly", icon: "/images/monad/dapps/orderly.svg" },
    { name: "D3X", icon: "/images/monad/dapps/d3X.svg" },
    { name: "LFJ", icon: "/images/monad/dapps/lfj.svg" },
    { name: "Owlto Finance", icon: "/images/monad/dapps/owltoFinance.svg" },
  ];

  const duplicateFunc = (items: typeof dappItems, times: number = 2) => {
    return Array(times).fill(items).flat();
  };

  const duplicatedDappItems = duplicateFunc(dappItems);

  const totalWidth = dappItems.length * (itemWidth + itemGap) - itemGap;

  return (
    <div className="w-full h-[100dvh] relative overflow-hidden">
      <MainLayoutHeader />
      <div className="absolute top-0 left-[110px] w-[409px] h-[283px] bg-[url(/images/monad/icon/left-window.svg)]"></div>
      <div className="absolute top-0 right-[138px] w-[427px] h-[313px] bg-[url(/images/monad/icon/right-window.svg)]"></div>
      <div
        className="absolute left-0 bottom-0 w-full bg-[url(/images/monad/background/bg1.svg)] bg-no-repeat bg-contain 
                        h-[calc(635/14.4*var(--rem))] min-h-[635px] min-w-[1440px]"
      >
        <div className="relative w-full h-full min-h-[635px] min-w-[1440px]">
          {/* Bridge */}
          <div className="absolute left-[calc(70/14.4*var(--rem))] bottom-[calc(344/14.4*var(--rem))] w-[357px] h-[430px]">
            <div className="relative w-full h-full">
              <div className="w-full h-full top-0 left-0 bg-no-repeat bg-contain bg-[url(/images/monad/entry/bridge.svg)]"></div>
              <div className="absolute left-1/2 -translate-x-1/2 mr-[50px] top-0">
                <div className="w-full flex flex-col gap-[2px] items-center justify-center">
                  <img src="/images/monad/icon/bridge.svg" alt="" />
                  <motion.img 
                    animate={{ 
                      rotateY: 180
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }} src="/images/monad/icon/point.svg" className="w-[38px] h-[38px]" alt="" />
                </div>
              </div>
            </div>
          </div>
          {/* yapper */}
          <div className="z-[4] absolute right-[calc(280/14.4*var(--rem))] -top-[calc(80/14.4*var(--rem))] w-[378px] h-[290px]">
            <div className="relative w-full h-full">
              <div className="w-full h-full top-0 left-0 bg-no-repeat bg-contain bg-[url(/images/monad/entry/yapper.svg)]"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-[-70px]">
                <div className="w-full flex flex-col gap-[2px] items-center justify-center">
                  <div className="w-full flex items-center justify-center">
                    <img src="/images/monad/icon/yapper.svg" alt="" />
                    <div className="text-[12px] font-Unbounded font-[500] leading-[90%] text-[#6D7EA5]">soon</div>
                  </div>
                  <img src="/images/monad/icon/disabled-point.svg" className="w-[38px] h-[38px]" alt="" />
                </div>
              </div>
              <div className="absolute w-[244px] h-[223px] left-1/2 -translate-x-1/2 top-[-38px] ml-[20px]">
                <motion.div
                  // animate={{ rotate: [-10, 10] }}
                  // transition={{
                  //   duration: 2,
                  //   repeat: Infinity,
                  //   repeatType: "reverse",
                  //   ease: "easeInOut",
                  //   transformOrigin: "center bottom",
                  // }}
                  className="relative w-full h-full bg-no-repeat bg-contain bg-[url(/images/monad/entry/radar.svg)]"
                ></motion.div>
              </div>
            </div>
          </div>
          {/* Faucet */}
          <div className="z-[5] absolute left-[calc(450/14.4*var(--rem))] bottom-[calc(235/14.4*var(--rem))] w-[514px] h-[330px]">
            <div className="relative w-full h-full">
              <div className="w-full h-full top-0 left-0 bg-no-repeat bg-contain bg-[url(/images/monad/entry/data.svg)]"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-[-70px]">
                <div className="w-full flex flex-col gap-[2px] items-center justify-center">
                  <img src="/images/monad/icon/faucet.svg" alt="" />
                  <motion.img 
                    animate={{ 
                      rotateY: 180
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }} src="/images/monad/icon/point.svg" className="w-[38px] h-[38px]" alt="" />
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-[30px]">
                <img src="/images/monad/icon/token.gif" className="w-[49px] h-[49px]" alt="" />
              </div>
            </div>
          </div>
          {/* Dapps */}
          <div className="z-[7] absolute -right-[calc(10/14.4*var(--rem))] bottom-[calc(83/14.4*var(--rem))] w-[513px] h-[445px]">
            <div className="relative w-full h-full">
              <div className="w-full h-full top-0 left-0 bg-no-repeat bg-contain bg-[url(/images/monad/entry/dapps.svg)]"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-[-70px]">
                <div className="w-full flex flex-col gap-[2px] items-center justify-center">
                <img src="/images/monad/icon/dApps.svg" alt="" />
                  <motion.img 
                    animate={{ 
                      rotateY: 180
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }} src="/images/monad/icon/point.svg" className="w-[38px] h-[38px]" alt="" />
                </div>
              </div>
              <div
                style={{
                  clipPath: `path('M92.4244 0C73.8511 2.07096 23.324 0.862899 15.1553 0L0 18.4445V50.4796L15.1553 69.5712C30.117 70.3478 81.0311 69.8948 89.8447 69.5712L105 50.4796V18.4445L92.4244 0Z')`,
                }}
                className="absolute left-[202px] top-[147px] w-[105px] h-[70px] overflow-hidden flex items-center justify-center"
              >
                <div className="w-[105px] overflow-hidden" ref={containerRef}>
                  <motion.div
                    className="w-full flex gap-[6px] items-center"
                    style={{ width: `${totalWidth * 2}px` }}
                    animate={{
                      x: [0, -totalWidth],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "linear",
                    }}
                  >
                    {duplicatedDappItems.map((item, index) => (
                      <div
                        key={`dapp-${index}`}
                        className="flex-shrink-0 w-[51px] h-[60px] rounded-[10px] border border-black bg-[#A5FFFD] flex flex-col gap-[5px] items-center justify-center"
                      >
                        <img
                          className="w-[33px] h-[32px]"
                          src={item.icon}
                          alt={item.name}
                        />
                        <div className="max-w-[45px] truncate font-Unbounded text-[10px] text-center font-[900] leading-[9px]">
                          {item.name}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          {/* tokens */}
          <div className="z-[5] absolute left-[calc(150/14.4*var(--rem))] bottom-[calc(78/14.4*var(--rem))] w-[514px] h-[444px]">
            <div className="relative w-full h-full">
              <div className="w-full h-full top-0 left-0 bg-no-repeat bg-contain bg-[url(/images/monad/entry/tokens.svg)]"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-[-70px]">
                <div className="w-full flex flex-col gap-[2px] items-center justify-center">
                <img src="/images/monad/icon/tokens.svg" alt="" />
                  <motion.img 
                    animate={{ 
                      rotateY: 180
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }} src="/images/monad/icon/point.svg" className="w-[38px] h-[38px]" alt="" />
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-[-10px]">
                  <motion.img
                    // 上下移动
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    src="/images/monad/icon/animate-tokens.svg" alt="" />
              </div>
            </div>
          </div>
          <MovingGif.Moving2sec />
          <MovingGif.Moving3rd />
        </div>
      </div>
      <div
        className="z-[8] absolute left-0 bottom-0 w-full bg-[url(/images/monad/background/bg2.svg)] bg-no-repeat bg-contain 
                        h-[calc(382/14.4*var(--rem))]"
      >
        <div className="relative w-full h-full">
          <MovingGif.Moving1st />
        </div>
      </div>
    </div>
  );
};
export default Home;






