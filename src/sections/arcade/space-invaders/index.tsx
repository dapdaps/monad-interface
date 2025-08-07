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

const SpaceInvadersView = (props: any) => {
  const spaceInvaders = useSpaceInvaders(props);

  const {
    containerRef,
    data,
    currentGameData,
  } = spaceInvaders;

  return (
    <SpaceInvadersContextProvider value={spaceInvaders}>
      <div ref={containerRef} className="w-full h-screen overflow-y-auto bg-[#010101] relative">
        <Starfield className="!fixed !z-[0]" bgColor="#010101" />
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
        <div className="relative w-full z-[2] pt-[103px] pb-[clamp(1px,_15vw,_calc(var(--nadsa-laptop-width)*0.15))]">
          <div
            className="w-[clamp(1px,_82.71vw,_calc(var(--nadsa-laptop-width)*0.8271)] min-h-[100dvh] mx-auto flex flex-col relative z-[2]"
            style={{
              width: "clamp(1px, 82.71vw, calc(var(--nadsa-laptop-width)*0.8271)",
            }}
          >
            <div className="relative w-full shrink-0">
              <img
                src="/images/arcade/space-invaders/dome.png"
                alt=""
                className="w-full shrink-0 object-bottom"
              />
              <img
                src="/images/arcade/space-invaders/title.png"
                alt=""
                className="w-[clamp(1px,_41.25vw,_calc(var(--nadsa-laptop-width)*0.4125))] h-[clamp(1px,_6.59vw,_calc(var(--nadsa-laptop-width)*0.0659))] absolute left-1/2 -translate-x-1/2 bottom-[clamp(1px,_8vw,_calc(var(--nadsa-laptop-width)*0.08))] z-[1]"
              />
              <motion.img
                src="/images/arcade/space-invaders/light.png"
                alt=""
                className="w-[clamp(1px,_10.07vw,_calc(var(--nadsa-laptop-width)*0.1007))] h-[clamp(1px,_9.51vw,_calc(var(--nadsa-laptop-width)*0.0951))] absolute left-1/2 -translate-x-[calc(50%_-_clamp(1px,_12vw,_calc(var(--nadsa-laptop-width)*0.12)))] top-[clamp(calc(var(--nadsa-laptop-width)_*_-0.034),_-3.4vw,_1px)] z-[1]"
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
            <div className="w-full h-0 flex-1 flex justify-center items-stretch pl-[clamp(1px,_0.35vw,_calc(var(--nadsa-laptop-width)*0.0035))] pr-[clamp(1px,_0.90vw,_calc(var(--nadsa-laptop-width)*0.009))] mt-[clamp(calc(var(--nadsa-laptop-width)_*_-0.065),_-6.5vw,_1px)]">
              <div className="w-[clamp(1px,_13.54vw,_calc(var(--nadsa-laptop-width)*0.1354))] shrink-0 flex flex-col">
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
              <div className="w-0 flex-1 flex flex-col pt-[clamp(1px,_4.54vw,_calc(var(--nadsa-laptop-width)*0.0454))]">
                <img
                  src="/images/arcade/space-invaders/frame-top.png"
                  alt=""
                  className="w-full h-[22px] shrink-0 object-bottom translate-y-[1px]"
                />
                <div className="w-full h-0 flex-1 relative bg-[#28293D] pt-[clamp(1px,_0.3vw,_calc(var(--nadsa-laptop-width)*0.003))]">
                  {
                    data.map((layer, layerIndex) => {
                      const isBorder = [LayerStatus.Unlocked, LayerStatus.Failed].includes(layer.status);
                      const isBg = [LayerStatus.Locked, LayerStatus.Failed].includes(layer.status);
                      return (
                        <div
                          key={layerIndex}
                          data-layer-index={layerIndex}
                          className={clsx(
                            "relative h-[clamp(1px,_14.03vw,_calc(var(--nadsa-laptop-width)*0.1403))] pb-[clamp(1px,_2.06vw,_calc(var(--nadsa-laptop-width)*0.0206))] bg-[url('/images/arcade/space-invaders/floor.png')] bg-no-repeat bg-bottom bg-contain",
                            isBorder ? "w-[116.9%] ml-[-8.45%]" : "w-[116.4%] ml-[-8.2%]",
                          )}
                        >
                          <Multiple
                            layer={layer}
                            className="absolute left-0 top-1/2 -translate-y-[calc(50%_+_clamp(1px,_1vw,_calc(var(--nadsa-laptop-width)*0.01)))] translate-x-[-95%] z-[2]"
                          >
                            {numberFormatter(layer.multiplier, 2, true, { isZeroPrecision: true })}
                          </Multiple>
                          {
                            (() => {
                              const rewardMultiplier = currentGameData?.reward?.multiplier;
                              if (!rewardMultiplier) return false;

                              const layerDiffs = data.map(l => ({
                                layer: l,
                                diff: Big(l.multiplier).minus(rewardMultiplier).toNumber()
                              }));

                              const positiveDiffs = layerDiffs.filter(item => item.diff > 0);
                              if (positiveDiffs.length === 0) return false;

                              const minPositiveDiff = Math.min(...positiveDiffs.map(item => item.diff));
                              const targetLayer = positiveDiffs.find(item => item.diff === minPositiveDiff)?.layer;

                              return targetLayer?.multiplier === layer.multiplier;
                            })() && (
                              <NftBox nft={currentGameData?.reward} />
                            )
                          }
                          <div
                            className={clsx(
                              "relative flex justify-center w-full h-full",
                              isBorder ? "pb-[clamp(1px,_2.7vw,_calc(var(--nadsa-laptop-width)*0.027))]" : "pb-[clamp(1px,_2.80vw,_calc(var(--nadsa-laptop-width)*0.028))]",
                              layer.status === LayerStatus.Unlocked && "border-[clamp(1px,_0.14vw,_calc(var(--nadsa-laptop-width)*0.0014))] border-[#BFFF60]",
                              layer.status === LayerStatus.Failed && "border-[clamp(1px,_0.14vw,_calc(var(--nadsa-laptop-width)*0.0014))] border-[#F00]",
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
                                    "w-full h-full absolute left-0 top-0 z-[2] cursor-not-allowed",
                                    layer.status === LayerStatus.Locked && "bg-black/30",
                                    layer.status === LayerStatus.Failed && "bg-red-500/10",
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
              <div className="w-[clamp(1px,_7.29vw,_calc(var(--nadsa-laptop-width)*0.0729))] shrink-0 flex flex-col">
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
          <div className="w-full absolute z-[1] translate-y-[clamp(calc(var(--nadsa-laptop-width)_*_-0.042),_-4.2vw,_1px)] h-[clamp(1px,_10.11vw,_calc(var(--nadsa-laptop-width)*0.1011))] border border-black bg-[linear-gradient(180deg,_#373B58_0%,_#212437_100%)]">
          </div>
          <img
            src="/images/arcade/space-invaders/bg-stairs2.png"
            alt=""
            className="w-full h-[clamp(1px,_12.64vw,_calc(var(--nadsa-laptop-width)*0.1264))] absolute bottom-0 left-0 z-[3]"
          />
          <Dashboard />
        </div>
      </div>
      <VerifierModal />
      <FailedGhost />
      <RecordsModal />
      <SoundEffects />
    </SpaceInvadersContextProvider>
  );
};

export default SpaceInvadersView;
