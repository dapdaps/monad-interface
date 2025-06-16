import LazyImage from "@/components/layz-image";
import { ALL_DAPP_LIST } from "@/sections/dapps/config";
import clsx from "clsx";
import { motion, useAnimate, useMotionValueEvent, useScroll } from "framer-motion";
import { useRouter } from "next-nprogress-bar";
import { useRef } from "react";
import MovingGif from "../MovingGif";
import CodesMission from "../components/codes-mission";
import { GuideEntry } from "@/sections/invitation/guide";

const itemWidth = 51;
const itemGap = 6;


const Mobile = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const guideEntryRef = useRef<any>();
  const router = useRouter();
  const mobileContainerRef = useRef(null);
  const [guideEntryContainerRef, guideEntryAnimate] = useAnimate();
  const { scrollYProgress } = useScroll({ container: mobileContainerRef });

  useMotionValueEvent(scrollYProgress, "change", (latestValue) => {
    if (latestValue < 0.9) {
      guideEntryAnimate(guideEntryContainerRef.current, {
        y: -100,
        opacity: 0,
      }, {
        duration: 0.01,
      });
      guideEntryRef.current?.closePopover();
    } else {
      guideEntryAnimate(guideEntryContainerRef.current, {
        y: 0,
        opacity: 1,
      }, {
        type: "spring",
        stiffness: 100,
        damping: 25,
        mass: 1.2,
        onComplete: () => {
          guideEntryRef.current?.openPopover();
        },
      });
    }
  });

  const duplicateFunc = (items: any, times: number = 2) => {
    return Array(times).fill(items).flat();
  };

  const duplicatedDappItems = duplicateFunc(ALL_DAPP_LIST);

  const totalWidth = ALL_DAPP_LIST.length * (itemWidth + itemGap) - itemGap;

  return (
    <div ref={mobileContainerRef} className="w-full h-[100dvh] bg-[#13142F] relative overflow-x-hidden overflow-y-scroll scrollbar-hide">
      <div className="w-full h-[278px] bg-[url(/images/mobile/home-bg1.svg)] bg-no-repeat bg-cover" />
      <div className="absolute top-[22%] w-full h-[830px] bg-[url(/images/mobile/home-bg2.svg)] bg-cover bg-no-repeat">
        <div className="w-full h-full relative">
          <div className="absolute bottom-0 w-full h-[218px]  bg-cover bg-[url(/images/mobile/home-bg3.svg)] bg-no-repeat">
            <div className="w-full h-full relative">
              <MovingGif.MovingForMobile1st className="!z-[13]" />

            </div>
          </div>
          {/* bridge */}
          <div className="absolute left-[-15%] top-[-10%] w-[254px] h-[228px]">
            <img
              src="/images/mobile/entry/bridge-locked.svg"
              className="w-full h-full"
              alt=""
            />
          </div>
          {/* game */}
          <div className="absolute right-[11%] top-[-9%] w-[141px] h-[145px]">
            <img
              src="/images/mobile/entry/game-locked.svg"
              className="w-full h-full"
              alt=""
            />
          </div>
          {/* Faucet */}
          <div
            data-bp="1001-004"
            data-hover-sound
            onClick={() => router.push("/faucet")}
            className={clsx(
              "z-[5] absolute w-[254px] h-[204px] right-[-8%] top-[13%]",
              "bg-no-repeat bg-contain",
              "transition-all duration-200 ease-in-out cursor-pointer",
              "bg-[url(/images/mobile/entry/faucet.svg)]"
            )}
          >
            <div className="relative w-full h-full">
              <div className="absolute left-1/2 -translate-x-1/2 top-[-50px] cursor-pointer scale-[0.7]">
                <div className="w-full flex flex-col gap-[2px] items-center justify-center">
                  <img src="/images/monad/icon/faucet.svg" alt="" />
                  <motion.img
                    animate={{
                      rotateY: 180,
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    src="/images/monad/icon/point.svg"
                    className="w-[38px] h-[38px]"
                    alt=""
                  />
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-[20px]">
                <img
                  src="/images/monad/icon/token.gif"
                  className="w-[33px] h-[33px]"
                  alt=""
                />
              </div>
            </div>
          </div>
          {/* tokens */}
          <div
            data-bp="1001-003"
            data-hover-sound
            onClick={() => router.push("/marketplace")}
            className={clsx(
              "hover:cursor-pointer z-[5] absolute left-[-15%] top-[22%] w-[252px] h-[226px]",
              "bg-no-repeat bg-contain",
              "transition-all duration-200 ease-in-out cursor-pointer",
              "bg-[url(/images/mobile/entry/token.svg)]"
            )}
          >
            <div className="relative w-full h-full">
              <div className="absolute left-1/2 -translate-x-1/2 top-[-70px] scale-[0.7]">
                <div className="w-full flex flex-col gap-[2px] items-center justify-center">
                  <img src="/images/monad/icon/tokens.svg" alt="" />
                  <motion.img
                    animate={{
                      rotateY: 180,
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    src="/images/monad/icon/point.svg"
                    className="w-[38px] h-[38px]"
                    alt=""
                  />
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-[-55px] scale-[0.6]">
                <motion.img
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  src="/images/monad/icon/animate-tokens.svg"
                  alt=""
                />
              </div>
              <div className="absolute left-[60px] top-[45px]">
                <img src="/images/monad/background/tokens-moyaki.gif" className="w-[100px] scale-[0.6]" alt="" />
              </div>
              <div className="absolute left-[33px] top-[6px]">
                <img src="/images/monad/background/cover.svg" className="scale-[0.5]" alt="" />
              </div>
            </div>
          </div>
          {/* Dapps */}
          <div
            data-bp="1001-006"
            data-hover-sound
            onClick={() => router.push("/dapps")}
            className={clsx('z-[7] absolute left-[12%] top-[25%] w-[519px] h-[451px] scale-[0.5]',
              "bg-no-repeat bg-contain",
              "bg-[url(/images/monad/entry/dapps.svg)]"
            )}
          >
            <div className="relative w-full h-full">
              <div className="absolute left-1/2 -translate-x-1/2 top-[-70px] scale-[1.3]">
                <div className="w-full flex flex-col gap-[2px] items-center justify-center">
                  <img src="/images/monad/icon/dApps.svg" alt="" />
                  <motion.img
                    animate={{
                      rotateY: 180,
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    src="/images/monad/icon/point.svg"
                    className="w-[38px] h-[38px]"
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
                          className="w-[33px] h-[32px] rounded-[10px] overflow-hidden"
                          src={item.icon}
                          alt={item.name}
                        />
                        {/* <div className="max-w-[45px] truncate font-Unbounded text-[10px] text-center font-[900] leading-[9px]">
                          {item.name}
                        </div> */}
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
          {/* yapper */}
          <div
            data-bp="1001-005"
            className={clsx(
              "z-[4] w-[378px] h-[290px] absolute bottom-[18%] left-[-36%] scale-[0.68]",
              "bg-no-repeat bg-contain bg-[url(/images/monad/entry/yapper-lock.svg)]",
            )}
          >
            <div className="relative w-full h-full">
              {/* <div className="absolute left-1/2 -translate-x-1/2 top-[-70px]">
                <div className="w-full flex flex-col gap-[2px] items-center justify-center">
                  <div className="w-full flex items-center justify-center">
                    <img src="/images/monad/icon/yapper.svg" alt="" />
                    <div className="text-[12px] font-Unbounded font-[500] leading-[90%] text-[#6D7EA5]">
                      soon
                    </div>
                  </div>
                  <img
                    src="/images/monad/icon/disabled-point.svg"
                    className="w-[38px] h-[38px]"
                    alt=""
                  />
                </div>
              </div> */}
              {/* <div className="absolute w-[244px] h-[223px] left-1/2 -translate-x-1/2 top-[-38px] ml-[20px]">
                <motion.div
                  animate={{ rotate: [-10, 10] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    transformOrigin: "center bottom",
                  }}
                  className="relative w-full h-full bg-no-repeat bg-contain bg-[url(/images/monad/entry/radar.svg)]"
                ></motion.div>
              </div>*/}
            </div>
          </div>
        </div>
        <motion.div
          ref={guideEntryContainerRef}
          id="guide-entry-container"
          className="absolute z-[1] w-[40px] h-[52px] bottom-[60px] right-[10px]"
          initial={{ y: -100, opacity: 0 }}
        >
          <GuideEntry ref={guideEntryRef} className="!w-full !h-full" />
        </motion.div>
      </div>
      <CodesMission className="!fixed z-[10] !top-[unset] !right-[unset] bottom-[46px] left-1/2 -translate-x-1/2" />
    </div>
  );
};

export default Mobile;
