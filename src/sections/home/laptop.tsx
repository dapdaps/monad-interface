import MainLayoutHeader from "@/layouts/main/header";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MovingGif from "./MovingGif";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import useAudioPlay from "@/hooks/use-audio";
import withSound from "@/hoc/withSound";
import LazyImage from "@/components/layz-image";
import { ALL_DAPP_LIST } from "../dapps/config";
import { IDapp } from "@/types";
import { SpecialAnimateGif } from "./SpecialAnimateGif";
import { GuideEntry } from "../invitation/guide";
import { useDebounceFn } from "ahooks";
import useInviteCodes from "../codes/hooks/use-invite-codes";
import Starfield from "./Starfield";
import CodesMission from "./components/codes-mission";
import LeaderBoard from "./components/leader-board";
import Link from "next/link";
import Face from "./components/face";

const itemWidth = 51;
const itemGap = 6;

const Home = () => {
  const router = useRouter();
  const { unUsedInviteCodes } = useInviteCodes();

  const boatFloorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [boatFloorStyles, setBoatFloorStyles] = useState<any>({
    bottom: 0,
  });
  const [boatFensStyles, setBoatFensStyles] = useState<any>({
    bottom: 0,
  });

  const { run: onBoatFloorStyles, cancel: cancelBoatFloorStyles } = useDebounceFn(() => {
    const fixedHeight = 186;
    if (boatFloorRef.current) {
      const boatFloorHeight = boatFloorRef.current.offsetHeight;

      if (window.innerHeight >= boatFloorHeight) {
        const diffHeight = window.innerHeight - boatFloorHeight;
        if (diffHeight < fixedHeight) {
          setBoatFloorStyles({ top: fixedHeight, bottom: "unset" });
          setBoatFensStyles({ bottom: -(fixedHeight - diffHeight) });
        } else {
          setBoatFloorStyles({ bottom: 0 });
          setBoatFensStyles({ bottom: 0 });
        }
      } else {
        setBoatFloorStyles({ top: fixedHeight, bottom: "unset" });
        setBoatFensStyles({ bottom: -(boatFloorHeight + fixedHeight - (window.innerHeight < 900 ? 900 : window.innerHeight) - 10) });
      }
    }
  }, { wait: 50 });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      cancelBoatFloorStyles();
      onBoatFloorStyles();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // const dappItems = [
  //   { name: "Lynex", icon: "/images/monad/dapps/lynx.svg" },
  //   { name: "iZumi Finance", icon: "/images/monad/dapps/iZumi.svg" },
  //   { name: "Pancake", icon: "/images/monad/dapps/pancake.svg" },
  //   { name: "OpenOcean", icon: "/images/monad/dapps/openOcean.svg" },
  //   { name: "Infinex", icon: "/images/monad/dapps/infinex.svg" },
  //   { name: "Orderly", icon: "/images/monad/dapps/orderly.svg" },
  //   { name: "D3X", icon: "/images/monad/dapps/d3X.svg" },
  //   { name: "LFJ", icon: "/images/monad/dapps/lfj.svg" },
  //   { name: "orbiter", icon: "https://assets.dapdap.net/images/100-obiter.png" },
  // ];

  const duplicateFunc = (items: any, times: number = 2) => {
    return Array(times).fill(items).flat();
  };

  const duplicatedDappItems = duplicateFunc(ALL_DAPP_LIST);

  const totalWidth = ALL_DAPP_LIST.length * (itemWidth + itemGap) - itemGap;

  return (
    <div className={`w-full ${window.innerHeight < 900 ? 'min-h-[900px] overflow-y-auto' : 'h-[100dvh]'} relative overflow-hidden`}>
      <Starfield className="bg-[#000]" />
      <Face />
      <div className="absolute top-0 left-0 right-0 h-[calc(623/14.4*var(--rem))] bg-[url(/images/monad/background/bg3.png)] bg-no-repeat bg-contain">
        
        <CodesMission className="z-[8]" />
        {/* Amy#20250703: disable leader board */}
        {/* <LeaderBoard /> */}
        {
          window.innerHeight >= 900 && <div className="absolute left-0 right-0 top-[100%] h-[300px] bg-[#0f0f2b]" />
        }
        
      </div>
      <div
        ref={boatFloorRef}
        className="z-[7] absolute left-0 bottom-0 w-full bg-[url(/images/monad/background/bg1.svg)] bg-no-repeat bg-contain 
                        h-[calc(635/14.4*var(--rem))] min-h-[635px] min-w-[1440px]"
        style={boatFloorStyles}
      >

        <div className="relative w-full h-full min-h-[635px] min-w-[1440px]">
          <SpecialAnimateGif />
          {/* Bridge */}
          <div
            data-bp="1001-014"
            data-hover-sound
            // onClick={() => router.push("/bridge")}
            className={
              clsx('absolute left-[calc(70/14.4*var(--rem))] bottom-[calc(344/14.4*var(--rem))] w-[357px] h-[430px]',
                windowWidth >= 2560 ? 'scale-[1.3] hover:scale-[1.4]' : '',
                windowWidth >= 1920 && windowWidth < 2560 ? 'hover:scale-[1.1]' : '',
                windowWidth < 1440 ? 'scale-[0.86] hover:scale-[0.92]' : '',
                windowWidth >= 1440 && windowWidth < 1920 ? 'hover:scale-[1.03]' : '',
                "bg-no-repeat bg-contain",
                "transition-all duration-200 ease-in-out cursor-pointer",
                "bg-[url(/images/monad/entry/bridge-locked.svg)]",
                // "bg-[url(/images/monad/entry/bridge-locked.svg)] hover:bg-[url(/images/monad/entry/bridge-hover.svg)]"
              )
            }
          >
            <div className="relative w-full h-full">
              {/* <div className="w-[84px] h-[115px] absolute right-[119px] top-[92px]">
                <img src="/images/monad/entry/aperture.gif" className="w-full h-full" alt="" />
              </div> */}
              <div className="absolute left-1/2 -translate-x-1/2 mr-[50px] top-[10px]">
                <div className="w-full flex flex-col gap-[2px] items-center justify-center">
                  <div className="w-full flex items-center justify-center gap-2">
                    <img src="/images/monad/icon/bridge-lock.svg" className="w-[43px]" alt="" />
                    <div className="text-[12px] font-Unbounded font-[500] leading-[90%] text-[#6D7EA5]">
                      soon
                    </div>
                  </div>
                  <motion.img
                    // animate={{
                    //   rotateY: 180,
                    // }}
                    // transition={{
                    //   duration: 3,
                    //   repeat: Infinity,
                    //   ease: "linear",
                    // }}
                    src="/images/monad/icon/point-lock.svg"
                    className="w-[26px] h-[26px]"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          {/* game */}
          <div
            // data-hover-sound 
            data-bp="1001-007"
            onClick={() => {
              router.push("/arcade")
            }}
            className={clsx(
              'absolute left-[calc(560/14.4*var(--rem))] -top-[115px] w-[275px] h-[210px] cursor-pointer',
              'bg-no-repeat bg-contain',
              "transition-all duration-200 ease-in-out",
              // "bg-[url(/images/monad/entry/game-lock.svg)]",
              "bg-[url(/images/monad/entry/game.svg)] hover:bg-[url(/images/monad/entry/game-hover.svg)]",
              windowWidth >= 1920 && windowWidth < 2560 ? "-top-[88px] left-[calc(532/14.4*var(--rem))] hover:scale-[1.1]" : "",
              windowWidth >= 2560 ? "-top-[30px] left-[calc(710/14.4*var(--rem))] scale-[1.3] hover:scale-[1.4]" : (windowWidth < 1360 ? 'left-[529px]' : ''),
              windowWidth < 1440 ? 'scale-[0.86] hover:scale-[0.92]' : '',
              windowWidth >= 1440 && windowWidth < 1920 ? 'hover:scale-[1.03]' : '',
            )}>
            <div className="absolute left-1/2 -translate-x-[calc(50%+70px)] top-0">
              <div className="w-full flex gap-[4px] items-center justify-center">
                <div className="w-full flex items-center justify-center gap-2">
                  <img src="/images/monad/icon/arcade.svg" alt="" className="shrink-0" />
                </div>
                <motion.img
                  animate={{
                    transform: "rotateX(360deg)",
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  src="/images/monad/icon/point-to-right.svg"
                  className="w-[26px] h-[26px]"
                  alt=""
                />
              </div>
            </div>

            <Link href="/arcade" prefetch={true} className="bottom-0 block"></Link>
          </div>
          {/* Codes */}
          <div
            data-bp="1001-015"
            data-hover-sound
            onClick={() => router.push("/codes")}
            className={clsx(
              "group",
              "z-[4] w-[378px] h-[290px] absolute -top-[calc(40/14.4*var(--rem))] right-[calc(260/14.4*var(--rem))]",
              "bg-no-repeat bg-contain bg-[url(/images/monad/entry/yapper.svg)] hover:bg-[url(/images/monad/entry/yapper-hover.svg)]",
              "transition-all duration-200 ease-in-out cursor-pointer",
              windowWidth < 1440 ? 'scale-[0.86] hover:scale-[0.92]' : '',
              windowWidth >= 1440 && windowWidth < 1920 ? 'hover:scale-[1.03]' : '',
              windowWidth >= 1920 && windowWidth < 2560 ? "top-0 right-[calc(190/14.4*var(--rem))] hover:scale-[1.1]" : "",
              windowWidth >= 2560 ? "top-[80px] right-[calc(190/14.4*var(--rem))] scale-[1.3] hover:scale-[1.4]" : ""
            )}
          >
            <div className="relative w-full h-full">
              <div className="absolute left-1/2 -translate-x-1/2 top-[-50px]">
                <div className="w-full flex flex-col gap-[2px] items-center justify-center">
                  <div className="w-full flex items-center justify-center gap-2">
                    <img src="/images/monad/icon/codes.svg"  alt="" className="shrink-0 w-[67px]" />
                    {
                      unUsedInviteCodes?.length > 0 && (
                        <div className="shrink-0 px-[8px] h-[18px] text-[12px] font-[900] leading-[90%] flex items-center justify-center font-Unbounded rounded-[21px] border border-black bg-[#BFFF60] shadow-[0px_2px_0px_0px_rgba(0,_0,_0,_0.50)]">
                          {unUsedInviteCodes?.length}
                        </div>
                      )
                    }
                  </div>
                  <motion.img
                    animate={{
                      transform: "rotateY(360deg)",
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    src="/images/monad/icon/point.svg"
                    className="w-[26px] h-[26px]"
                    alt=""
                  />
                </div>
              </div>
              <div className="group-hover:hidden absolute w-[244px] h-[223px] left-1/2 -translate-x-1/2 top-[-24px] ml-[20px]">
                <motion.div
                  animate={{
                    transform: ["rotate(-10deg)", "rotate(10deg)"]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    transformOrigin: "center bottom",
                  }}
                  className="relative w-full h-full bg-no-repeat bg-contain bg-[url(/images/monad/entry/radar.svg)]"
                >
                </motion.div>
              </div>
            </div>
          </div>
          {/* Faucet */}
          <div
            data-bp="1001-004"
            data-hover-sound
            onClick={() => router.push("/faucet")}
            className={clsx(
              "z-[28] absolute w-[514px] h-[330px]",
              windowWidth < 1440 ? 'scale-[0.86] hover:scale-[0.92]' : '',
              windowWidth >= 1440 && windowWidth < 1920 ? 'hover:scale-[1.1]' : '',
              windowWidth >= 1920
                ? "left-1/2 -translate-x-1/2 -ml-[30px] bottom-[calc(200/14.4*var(--rem))]"
                : "left-[calc(450/14.4*var(--rem))] bottom-[calc(235/14.4*var(--rem))]",
              windowWidth >= 2560 ? 'scale-[1.3] hover:scale-[1.5]' : '',
              "bg-no-repeat bg-contain",
              "transition-all duration-200 ease-in-out cursor-pointer",
              "bg-[url(/images/monad/entry/data.svg)] hover:bg-[url(/images/monad/entry/data-hover.svg)]"
            )}
          >
            <div className="relative w-full h-full z-[35]">
              <div className="absolute left-1/2 -translate-x-1/2 top-[-40px] cursor-pointer">
                <div className="w-full flex flex-col gap-[2px] items-center justify-center">
                  <img src="/images/monad/icon/faucet.svg" alt="" className="w-[74px]" />
                  <motion.img
                    animate={{
                      transform: "rotateY(360deg)",
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    src="/images/monad/icon/point.svg"
                    className="w-[26px] h-[26px]"
                    alt=""
                  />
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-[30px]">
                <img
                  src="/images/monad/icon/token.gif"
                  className="w-[49px] h-[49px]"
                  alt=""
                />
              </div>
            </div>
          </div>
          {/* Dapps */}
          <div
            data-bp="1001-006"
            data-hover-sound
            onClick={() => router.push("/dapps")}
            className={clsx('z-[35] absolute right-[calc(70/14.4*var(--rem))] bottom-[calc(83/14.4*var(--rem))] w-[519px] h-[451px]',
              windowWidth >= 1440 && windowWidth < 1920 ? 'hover:scale-[1.03] bottom-[calc(63/14.4*var(--rem))]' : '',
              windowWidth >= 1920 && windowWidth < 2560 ? 'hover:scale-[1.1]' : '',
              windowWidth >= 2560 ? 'scale-[1.3] hover:scale-[1.4] !right-[calc(200/14.4*var(--rem))] bottom-[calc(63/14.4*var(--rem))]' : '',
              windowWidth < 1440 && windowWidth >= 1380 ? 'scale-[0.86] hover:scale-[0.92] !right-[calc(150/14.4*var(--rem))] bottom-[calc(90/14.4*var(--rem))]' : '',
              windowWidth < 1380 ? 'scale-[0.76] hover:scale-[0.82] !right-[calc(280/14.4*var(--rem))] bottom-[calc(90/14.4*var(--rem))]' : '',
              "bg-no-repeat bg-contain",
              "transition-all duration-200 ease-in-out cursor-pointer",
              "bg-[url(/images/monad/entry/dapps.svg)] hover:bg-[url(/images/monad/entry/dapps-hover.svg)]"
            )}
          >
            <div className="relative w-full h-full">
              <div className="absolute left-1/2 -translate-x-1/2 top-[-50px]">
                <div className="w-full flex flex-col gap-[2px] items-center justify-center">
                  <img src="/images/monad/icon/dApps.svg" className="w-[70px]" alt="" />
                  <motion.img
                    animate={{
                      transform: "rotateY(360deg)",
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    src="/images/monad/icon/point.svg"
                    className="w-[26px] h-[26px]"
                    alt=""
                  />
                </div>
              </div>
              <div
                style={{
                  clipPath: `path('M92.4244 0C73.8511 2.07096 23.324 0.862899 15.1553 0L0 18.4445V50.4796L15.1553 69.5712C30.117 70.3478 81.0311 69.8948 89.8447 69.5712L105 50.4796V18.4445L92.4244 0Z')`,
                }}
                className="absolute left-[205px] top-[147px] w-[104px] h-[70px] overflow-hidden flex items-center justify-center"
              >
                <div className="w-[105px] overflow-hidden mt-1" ref={containerRef}>
                  <motion.div
                    className="w-full flex gap-[6px] items-center"
                    style={{ width: `${totalWidth * 2}px` }}
                    animate={{
                      transform: ["translateX(0)", `translateX(${-totalWidth}px)`]
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
                        className="flex-shrink-0 w-[98px] h-[60px] rounded-[10px] border border-black bg-[#A5FFFD] flex flex-col gap-[5px] items-center justify-center"
                      >
                        <img
                          className="w-[33px] h-[32px] rounded-[10px] overflow-hidden"
                          src={item.icon}
                          alt={item.name}
                        />
                        <div className="max-w-[90px] truncate font-Montserrat text-[10px] text-center font-[700] leading-[9px]">
                          {item.name}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
              <div className="absolute top-[236px] left-1/2 -translate-x-1/2 w-[100px] h-[100px]">
                <LazyImage
                  src='/images/monad/entry/dapps.gif'
                  className='w-[100px] h-[100px]'
                  width={100}
                  height={100}
                  fallbackSrc='/images/monad/entry/default-dapps-gif.png' />
              </div>
            </div>
          </div>
          {/* tokens */}
          <div
            data-bp="1001-003"
            data-hover-sound
            onClick={() => router.push("/marketplace")}
            className={clsx(
              windowWidth >= 2560 ? 'scale-[1.3] hover:scale-[1.4]' : '',
              windowWidth < 1440 ? 'scale-[0.86] hover:scale-[0.92]' : '',
              windowWidth >= 1440 && windowWidth < 1920 ? 'hover:scale-[1.03]' : '',
              windowWidth >= 1920 && windowWidth < 2560 ? 'hover:scale-[1.1]' : '',
              "hover:cursor-pointer z-[35] absolute left-[calc(150/14.4*var(--rem))] bottom-[calc(78/14.4*var(--rem))] w-[514px] h-[444px]",
              "bg-no-repeat bg-contain",
              "transition-all duration-200 ease-in-out cursor-pointer",
              "bg-[url(/images/monad/entry/tokens.svg)] hover:bg-[url(/images/monad/entry/tokens-hover.svg)]"
            )}
          >
            <div className="relative w-full h-full">
              <div className="absolute left-1/2 -translate-x-1/2 top-[-50px]">
                <div className="w-full flex flex-col gap-[2px] items-center justify-center">
                  <img src="/images/monad/icon/tokens.svg" className="w-[75px]" alt="" />
                  <motion.img
                    animate={{
                      transform: "rotateY(360deg)",
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    src="/images/monad/icon/point.svg"
                    className="w-[26px] h-[26px]"
                    alt=""
                  />
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-[-10px]">
                <motion.img
                  animate={{
                    transform: ["translateY(0)", "translateY(10px)", "translateY(0)"]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  src="/images/monad/icon/animate-tokens.svg"
                  alt=""
                />
              </div>
              <div className="absolute left-[170px] top-[125px]">
                <img src="/images/monad/background/tokens-moyaki.gif" className="w-[100px]" alt="" />
              </div>
              <div className="absolute left-[167px] top-[95px]">
                <img src="/images/monad/background/cover.svg" alt="" />
              </div>
            </div>
          </div>
          <MovingGif.Moving2sec />
          <MovingGif.Moving3rd />
        </div>
      </div>
      <div
        style={{
          ...boatFensStyles,
          clipPath: `path('M214.865 73.8174L-105.739 -33.042L-105.739 -23.072L-105.739 5.44872L-105.739 109.528L-106.451 109.54L-106.451 319.992L-11.2575 285.34L-11.2574 448.288L1645.4 448.288L1645.4 123.497C1645.4 120.729 1642.66 118.798 1640.05 119.731L1283.18 247.518V236.726L1285.43 235.946C1289.16 234.623 1291.12 230.522 1289.8 226.785C1288.47 223.048 1284.37 221.091 1280.63 222.414L913.2 349.764C906.2 352.242 905.7 363.439 915.2 364.285L921.279 362.178V370.941C879.978 379.514 837.984 383.686 796 383.453V323.392L212.549 132.061L212.549 111.284L216.724 109.808C220.72 108.396 223.391 104.618 223.391 100.38L223.391 81.4614L221.404 80.8303C220.649 77.7625 218.467 75.0179 214.865 73.8174ZM928.456 359.69V369.406C949.25 364.823 969.857 359.121 990.186 352.301V338.291L928.456 359.69ZM997.352 335.807C997.36 335.905 997.364 336.004 997.364 336.103V349.842C998.779 349.347 1000.19 348.847 1001.61 348.341L1066.99 324.929V311.667L997.352 335.807ZM1074.17 309.179V322.358L1139.49 298.97V286.536L1074.17 309.179ZM1146.66 284.048V296.399L1211.98 273.011V261.405L1146.66 284.048ZM1219.16 258.917V270.44L1276 250.088V239.214L1219.16 258.917ZM637.5 361.224C637.366 361.186 637.231 361.149 637.097 361.111C637.079 361.091 637.06 361.071 637.041 361.051L637.5 361.207V361.224Z')`,
        }}
        className="z-[50] absolute w-[825px] h-[382px] left-0 bottom-0 bg-[url(/images/monad/background/bg2-left.svg)] bg-no-repeat bg-contain"
      >
      </div>
      <MovingGif.Moving1st />
      <div
        style={{
          ...boatFensStyles,
          clipPath: `path('M-836.258 147.799C-836.258 145.06 -833.567 143.131 -830.973 144.011L-646.29 206.615V176.84L-706.029 156.48C-709.781 155.202 -711.786 151.123 -710.507 147.371C-709.228 143.618 -705.15 141.613 -701.398 142.892L-349.722 262.749C-335.919 267.278 -308.307 285.07 -305.719 321.049L-189.616 360.017C-188.903 360.257 -188.333 360.64 -187.903 361.111C-95.1006 387.178 2.38196 390.431 96.2787 370.941V362.178L90.2004 364.285C80.7004 363.439 81.2004 352.242 88.2004 349.764L455.635 222.413C459.372 221.091 463.474 223.047 464.797 226.784C466.12 230.521 464.163 234.623 460.426 235.946L458.178 236.725V247.518L815.054 119.731C817.66 118.798 820.402 120.729 820.402 123.497L820.403 448.288L-836.257 448.288L-836.258 147.799ZM-326.156 314.19L-329.506 313.066C-330.358 312.78 -331.281 312.789 -332.127 313.092L-332.154 313.102L-341.229 310.026V283.437C-335.76 287.537 -330.143 293.317 -326.044 300.968C-326.117 301.252 -326.156 301.551 -326.156 301.858V314.19ZM103.457 369.405V359.69L165.187 338.291V352.3C144.857 359.121 124.25 364.823 103.457 369.405ZM172.364 336.103C172.364 336.004 172.36 335.905 172.352 335.807L241.99 311.667V324.928L176.605 348.341C175.193 348.847 173.779 349.347 172.364 349.841V336.103ZM249.168 322.358V309.179L314.487 286.536V298.969L249.168 322.358ZM321.665 296.399V284.048L386.984 261.405V273.01L321.665 296.399ZM394.161 270.44V258.917L451 239.214V250.088L394.161 270.44ZM-639.112 209.048V179.287L-573.075 201.793V231.434L-639.112 209.048ZM-565.897 233.867V204.239L-496.252 227.976C-496.265 228.1 -496.272 228.226 -496.272 228.354V257.469L-565.897 233.867ZM-489.094 259.902V230.415L-421.337 253.508C-421.52 253.939 -421.622 254.414 -421.622 254.912V282.774L-489.094 259.902ZM-414.444 285.207V255.857L-354.269 276.366L-354.225 276.38C-352.479 276.951 -350.408 277.824 -348.162 279.018C-348.32 279.423 -348.407 279.863 -348.407 280.324V307.592L-414.444 285.207Z')`,
        }}
        className="z-[50] absolute w-[615px] h-[382px] right-0 bottom-0 bg-[url(/images/monad/background/bg2-right.svg)] bg-no-repeat bg-contain"
      ></div>
      <GuideEntry className="absolute z-[7] left-[calc(50%_+_9vw)] bottom-[8vh]" />


    </div>
  );
};
export default Home;
