import Starfield from "@/sections/home/Starfield";
import clsx from "clsx";
import { motion } from "framer-motion";
import Door from "./components/door";
import SpaceInvadersContextProvider from "./context";
import { useSpaceInvaders } from "./hooks";
import Dashboard from "./components/dashboard";
import Multiple from "./components/multiple";
import { numberFormatter } from "@/utils/number-formatter";
import NftBox from "./components/nft-box";
import VerifierModal from "./components/verifier/modal";
import FailedGhost from "./components/failed-ghost";
import { LayerStatus } from "./config";
import RecordsModal from "./components/records/modal";
import SoundEffects from "./components/sound-effects";
import Big from "big.js";
import RewardModal from "./components/reward/modal";
import { useUserData } from "./hooks/use-user";
import RulesModal from "./components/rules/modal";
import useIsMobile from "@/hooks/use-isMobile";
import AllInFire from "./components/all-in-fire";
import LeaderBoard from "./components/leader-board";
import ShareModal from "./components/share/modal";

const SpaceInvadersView = (props: any) => {
  const spaceInvaders = useSpaceInvaders(props);
  const userData = useUserData();
  const isMobile = useIsMobile();

  const {
    data,
    currentGameData,
    tab,
    setTab,
  } = spaceInvaders;

  return (
    <SpaceInvadersContextProvider value={{ ...spaceInvaders, ...userData }}>
      <div className="w-full h-full">
        <Starfield className="!fixed !z-[0]" bgColor="#010101" numStars={500} />
        {
          !isMobile && (
            <motion.img
              src="/images/arcade/space-invaders/monad-moon.png"
              alt=""
              className="absolute left-1/2 top-[clamp(1px,_0vw,_calc(var(--nadsa-laptop-width)*0))] z-[1]"
              style={{
                x: "-50%",
                width: "clamp(1px, 32.85vw, calc(var(--nadsa-laptop-width)*0.3285))",
                height: "clamp(1px, 22.98vw, calc(var(--nadsa-laptop-width)*0.2298))",
              }}
              animate={{
                y: [0, 20, -20, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.4, 0.8, 1],
              }}
            />
          )
        }
        {
          !isMobile ? (
            <Content
              isMobile={false}
              data={data}
              currentGameData={currentGameData}
            />
          ) : (
            <>
              <motion.div
                key="play"
                className="w-full h-full"
                initial={{
                  display: "none",
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  display: tab === "play" ? "block" : "none",
                  opacity: tab === "play" ? 1 : 0,
                  x: tab === "play" ? 0 : -10,
                }}
              >
                <Content
                  isMobile={true}
                  data={data}
                  currentGameData={currentGameData}
                />
              </motion.div>
              <motion.div
                key="leaderboard"
                className="w-full h-full"
                initial={{
                  display: "none",
                  opacity: 0,
                  x: 10,
                }}
                animate={{
                  display: tab === "leaderboard" ? "block" : "none",
                  opacity: tab === "leaderboard" ? 1 : 0,
                  x: tab === "leaderboard" ? 0 : 10,
                }}
              >
                <LeaderBoard className="!relative !w-full !h-full !max-w-[unset] pt-[30.77vw] pb-[12.09vw]" />
              </motion.div>
            </>
          )
        }
      </div>
      <VerifierModal />
      <FailedGhost />
      <RecordsModal />
      <SoundEffects />
      <RewardModal />
      <RulesModal />
      <ShareModal />
      {
        !isMobile && (
          <LeaderBoard />
        )
      }
      {
        isMobile && (
          <div className="fixed w-full h-[12.09vw] left-0 bottom-0 z-[5] bg-[#1A1843] border-t border-[#3E347C] grid grid-cols-2">
            <button
              type="button"
              className={clsx(
                "w-full h-full text-[#8A87AA] text-[3.72vw] font-[SpaceGrotesk] font-[400] leading-[100%] border-r border-[#3E347C] transition-all duration-150",
                tab === "play" && "bg-[#0E0D2F] text-white font-[600]",
              )}
              onClick={() => {
                setTab("play");
              }}
            >
              Play
            </button>
            <button
              type="button"
              className={clsx(
                "w-full h-full text-[#8A87AA] text-[3.72vw] font-[SpaceGrotesk] font-[400] leading-[100%] transition-all duration-150",
                tab === "leaderboard" && "bg-[#0E0D2F] text-white font-[600]",
              )}
              onClick={() => {
                setTab("leaderboard");
              }}
            >
              Leaderboard
            </button>
          </div>
        )
      }
    </SpaceInvadersContextProvider>
  );
};

export default SpaceInvadersView;

const Content = (props: any) => {
  const {
    isMobile,
    data,
    currentGameData,
  } = props;

  return (
    <div className="relative w-full z-[2] pt-[103px] md:pt-[30.77vw] pb-[clamp(1px,_15vw,_calc(var(--nadsa-laptop-width)*0.15))] md:pb-[92.60vw]">
      <div
        className={clsx(
          "min-h-[100dvh] mx-auto flex flex-col relative z-[2]",
          isMobile ? "w-full" : "w-[clamp(1px,_82.71vw,_calc(var(--nadsa-laptop-width)*0.8271))]"
        )}
      >
        <div className="relative w-full shrink-0 md:z-[1] md:overflow-hidden">
          <div className="w-full overflow-hidden flex justify-center items-end">
            <img
              src="/images/arcade/space-invaders/dome.png"
              alt=""
              className="w-full shrink-0 object-contain object-bottom md:min-w-[125%]"
            />
          </div>
          {
            isMobile && (
              <AllInFire className="right-0 top-[-14vw] z-[0]" />
            )
          }
          <img
            src="/images/arcade/space-invaders/title.png"
            alt=""
            className="w-[clamp(1px,_41.25vw,_calc(var(--nadsa-laptop-width)*0.4125))] h-[clamp(1px,_6.59vw,_calc(var(--nadsa-laptop-width)*0.0659)) md:w-[82.05vw] md:h-[9.49vw] absolute left-1/2 -translate-x-1/2 bottom-[clamp(1px,_8vw,_calc(var(--nadsa-laptop-width)*0.08))] z-[1]"
          />
          <motion.img
            src="/images/arcade/space-invaders/light.png"
            alt=""
            className="md:w-[15.38vw] md:h-[13.36vw] md:translate-x-[calc(-50%_+_18vw)] md:top-[-4.2vw] w-[clamp(1px,_10.07vw,_calc(var(--nadsa-laptop-width)*0.1007))] h-[clamp(1px,_9.51vw,_calc(var(--nadsa-laptop-width)*0.0951))] absolute left-1/2 -translate-x-[calc(50%_-_clamp(1px,_12vw,_calc(var(--nadsa-laptop-width)*0.12)))] top-[clamp(calc(var(--nadsa-laptop-width)_*_-0.034),_-3.4vw,_1px)] z-[1]"
            animate={{
              opacity: [1, 0.3, 1, 0.1, 1, 0.5, 1, 0.2, 1, 0.8, 1, 0.4, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.05, 0.1, 0.25, 0.3, 0.35, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            }}
          />
        </div>
        <div className="md:mt-[-11vw] md:overflow-x-hidden w-full h-0 flex-1 flex justify-center items-stretch pl-[clamp(1px,_0.35vw,_calc(var(--nadsa-laptop-width)*0.0035))] pr-[clamp(1px,_0.90vw,_calc(var(--nadsa-laptop-width)*0.009))] mt-[clamp(calc(var(--nadsa-laptop-width)_*_-0.065),_-6.5vw,_1px)]">
          <div className="md:hidden w-[clamp(1px,_13.54vw,_calc(var(--nadsa-laptop-width)*0.1354))] shrink-0 flex flex-col">
            <img
              src="/images/arcade/space-invaders/frame-left-top.png"
              alt=""
              className="w-full h-[clamp(1px,_6.04vw,_calc(var(--nadsa-laptop-width)*0.0604))] shrink-0 object-bottom translate-y-[1px]"
            />
            <div className="w-full h-0 flex-1 bg-[url('/images/arcade/space-invaders/frame-left.png')] bg-repeat-y bg-[length:100%_1px] bg-center">

            </div>
            <img
              src="/images/arcade/space-invaders/frame-left-bot.png"
              alt=""
              className="w-full h-[clamp(1px,_2.57vw,_calc(var(--nadsa-laptop-width)*0.0257))] shrink-0 object-bottom translate-y-[-1px]"
            />
          </div>
          <div className="md:min-w-[110%] w-0 flex-1 flex flex-col pt-[clamp(1px,_4.54vw,_calc(var(--nadsa-laptop-width)*0.0454))]">
            <img
              src="/images/arcade/space-invaders/frame-top.png"
              alt=""
              className="w-full h-[22px] shrink-0 object-bottom translate-y-[1px]"
            />
            <div className="w-full h-0 flex-1 relative bg-[#28293D] pt-[clamp(1px,_0.3vw,_calc(var(--nadsa-laptop-width)*0.003))]">
              {
                data.map((layer: any, layerIndex: number) => {
                  const isBorder = [LayerStatus.Unlocked, LayerStatus.Failed].includes(layer.status);
                  const isBg = [LayerStatus.Locked, LayerStatus.Failed].includes(layer.status);
                  return (
                    <div
                      key={layerIndex}
                      data-layer-index={layerIndex}
                      className={clsx(
                        "md:h-[32.05vw] md:bg-[url('/images/arcade/space-invaders/floor-mobile.png')] md:bg-[length:100%_16.41vw] md:pb-[16.41vw] relative h-[clamp(1px,_14.03vw,_calc(var(--nadsa-laptop-width)*0.1403))] pb-[clamp(1px,_2.06vw,_calc(var(--nadsa-laptop-width)*0.0206))] bg-[url('/images/arcade/space-invaders/floor.png')] bg-no-repeat bg-bottom bg-contain",
                        isBorder ? "w-[116.9%] ml-[-8.45%]" : "w-[116.4%] ml-[-8.2%]",
                      )}
                    >
                      <Multiple
                        layer={layer}
                        className="md:w-[40.13vw] md:h-[8.72vw] md:bottom-[6px] md:translate-y-[0] md:top-[unset] md:rounded-[6px] md:p-[3px] md:left-1/2 md:-translate-x-1/2 absolute left-0 top-1/2 -translate-y-[calc(50%_+_clamp(1px,_1vw,_calc(var(--nadsa-laptop-width)*0.01)))] translate-x-[-95%] z-[2]"
                      >
                        {numberFormatter(layer.multiplier, 2, true, { isZeroPrecision: true })}
                      </Multiple>
                      {
                        (() => {
                          const rewardMultiplier = currentGameData?.reward?.multiplier;
                          if (!rewardMultiplier) return false;

                          const layerDiffs = data.map((l: any) => ({
                            layer: l,
                            diff: Big(l.multiplier).minus(rewardMultiplier).toNumber()
                          }));

                          const positiveDiffs = layerDiffs.filter((item: any) => item.diff > 0);
                          if (positiveDiffs.length === 0) return false;

                          const minPositiveDiff = Math.min(...positiveDiffs.map((item: any) => item.diff));
                          const targetLayer = positiveDiffs.find((item: any) => item.diff === minPositiveDiff)?.layer;

                          return targetLayer?.multiplier === layer.multiplier;
                        })() && (
                          <NftBox nft={currentGameData?.reward} />
                        )
                      }
                      <div
                        className={clsx(
                          "relative flex justify-center w-full h-full md:pb-0",
                          isBorder ? "pb-[clamp(1px,_2.7vw,_calc(var(--nadsa-laptop-width)*0.027))]" : "pb-[clamp(1px,_2.80vw,_calc(var(--nadsa-laptop-width)*0.028))]",
                          !isMobile && layer.status === LayerStatus.Unlocked && "border-[clamp(1px,_0.14vw,_calc(var(--nadsa-laptop-width)*0.0014))] border-[#BFFF60]",
                          !isMobile && layer.status === LayerStatus.Failed && "border-[clamp(1px,_0.14vw,_calc(var(--nadsa-laptop-width)*0.0014))] border-[#F00]",
                        )}
                      >
                        <div className="relative z-[1] w-[86%] h-full bg-[linear-gradient(180deg,_#28293D_0%,_#36375C_100%)] flex justify-center items-end gap-[clamp(1px,_0.69vw,_calc(var(--nadsa-laptop-width)*0.0069))]">
                          {
                            [...new Array(layer.tiles).fill(0)].map((_, index: number) => {
                              return (
                                <Door
                                  key={`${layerIndex}-${index}`}
                                  layer={layer}
                                  layerIndex={data.length - 1 - layerIndex}
                                  tileIndex={index}
                                />
                              );
                            })
                          }
                        </div>
                        {
                          isBg && (
                            <div
                              className={clsx(
                                "md:h-[32.05vw] md:w-[78.8%] md:left-[10.8%] w-full h-full absolute left-0 top-0 z-[2] cursor-not-allowed",
                                layer.status === LayerStatus.Locked && "bg-black/30",
                                layer.status === LayerStatus.Failed && "bg-red-500/10",
                                isMobile && layer.status === LayerStatus.Unlocked && "border-[2px] border-[#BFFF60]",
                                isMobile && layer.status === LayerStatus.Failed && "border-[2px] border-[#F00]",
                              )}
                            />
                          )
                        }
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div className="md:hidden w-[clamp(1px,_7.29vw,_calc(var(--nadsa-laptop-width)*0.0729))] shrink-0 flex flex-col">
            <img
              src="/images/arcade/space-invaders/frame-right-top.png"
              alt=""
              className="w-full h-[clamp(1px,_6.04vw,_calc(var(--nadsa-laptop-width)*0.0604))] shrink-0 object-bottom translate-y-[1px]"
            />
            <div className="w-full h-0 flex-1 bg-[url('/images/arcade/space-invaders/frame-right.png')] bg-repeat-y bg-[length:100%_1px] bg-center">

            </div>
            <img
              src="/images/arcade/space-invaders/frame-right-bot.png"
              alt=""
              className="w-full h-[clamp(1px,_2.57vw,_calc(var(--nadsa-laptop-width)*0.0257))] shrink-0 object-bottom translate-y-[-1px]"
            />
          </div>
        </div>
      </div>
      <div className="md:h-[22.56vw] w-full absolute z-[1] translate-y-[clamp(calc(var(--nadsa-laptop-width)_*_-0.042),_-4.2vw,_1px)] h-[clamp(1px,_10.11vw,_calc(var(--nadsa-laptop-width)*0.1011))] border border-black bg-[linear-gradient(180deg,_#373B58_0%,_#212437_100%)]">
      </div>
      <img
        src="/images/arcade/space-invaders/bg-stairs2.png"
        alt=""
        className="md:h-[37.18vw] md:bottom-[43.33vw] w-full h-[clamp(1px,_12.64vw,_calc(var(--nadsa-laptop-width)*0.1264))] absolute bottom-0 left-0 z-[3]"
      />
      <Dashboard />
    </div>
  );
};
