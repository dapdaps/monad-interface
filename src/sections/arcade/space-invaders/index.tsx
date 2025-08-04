import Starfield from "@/sections/home/Starfield";
import clsx from "clsx";
import { motion } from "framer-motion";
import Door from "./components/door";
import SpaceInvadersContextProvider from "./context";
import { LayerStatus, useSpaceInvaders } from "./hooks";

const SpaceInvadersView = (props: any) => {
  const spaceInvaders = useSpaceInvaders(props);

  const { containerRef, data } = spaceInvaders;

  return (
    <SpaceInvadersContextProvider value={spaceInvaders}>
      <div ref={containerRef} className="w-full h-screen overflow-y-auto bg-[#010101] relative">
        <Starfield className="!absolute !z-[0]" bgColor="#010101" />
        <motion.img
          src="/images/arcade/space-invaders/monad-moon.png"
          alt=""
          className="w-[32.85vw] h-[22.98vw] absolute left-1/2 top-[0vw] z-[1]"
          style={{
            x: "-50%",
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
        <div className="relative w-full h-full z-[2] pt-[103px]">
          <div className="w-[82.71vw] min-h-[500px] mx-auto flex flex-col">
            <div className="relative w-full shrink-0">
              <img
                src="/images/arcade/space-invaders/dome.png"
                alt=""
                className="w-full shrink-0 object-bottom"
              />
              <img
                src="/images/arcade/space-invaders/title.png"
                alt=""
                className="w-[41.25vw] h-[6.59vw] absolute left-1/2 -translate-x-1/2 bottom-[8vw] z-[1]"
              />
              <motion.img
                src="/images/arcade/space-invaders/light.png"
                alt=""
                className="w-[10.07vw] h-[9.51vw] absolute left-1/2 -translate-x-[calc(50%_-_12vw)] top-[-3.4vw] z-[1]"
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
            <div className="w-full h-0 flex-1 flex justify-center items-stretch pl-[0.35vw] pr-[0.90vw] mt-[-6.5vw]">
              <div className="w-[13.54vw] shrink-0 flex flex-col">
                <img
                  src="/images/arcade/space-invaders/frame-left-top.png"
                  alt=""
                  className="w-full h-[6.04vw] shrink-0 object-bottom translate-y-[1px]"
                />
                <div className="w-full h-0 flex-1 bg-[url('/images/arcade/space-invaders/frame-left.png')] bg-repeat-y bg-[length:100%_1px] bg-center">

                </div>
                <img
                  src="/images/arcade/space-invaders/frame-left-bot.png"
                  alt=""
                  className="w-full h-[2.57vw] shrink-0 object-bottom translate-y-[-1px]"
                />
              </div>
              <div className="w-0 flex-1 flex flex-col pt-[4.54vw]">
                <img
                  src="/images/arcade/space-invaders/frame-top.png"
                  alt=""
                  className="w-full h-[22px] shrink-0 object-bottom translate-y-[1px]"
                />
                <div className="w-full h-0 flex-1 relative bg-[#28293D] pt-[0.3vw]">
                  {
                    data.map((layer: any, layerIndex: number) => {
                      const isBorder = [LayerStatus.Unlocked, LayerStatus.Failed].includes(layer.status);
                      const isBg = [LayerStatus.Locked, LayerStatus.Failed].includes(layer.status);
                      return (
                        <div
                          key={layerIndex}
                          className={clsx(
                            "relative h-[14.03vw] pb-[2.06vw] bg-[url('/images/arcade/space-invaders/floor.png')] bg-no-repeat bg-bottom bg-contain",
                            isBorder ? "w-[116.9%] ml-[-8.45%]" : "w-[116.4%] ml-[-8.2%]",
                          )}
                        >
                          <div
                            className={clsx(
                              "relative flex justify-center w-full h-full",
                              isBorder ? "pb-[2.7vw]" : "pb-[2.80vw]",
                              layer.status === LayerStatus.Unlocked && "border-[0.14vw] border-[#BFFF60]",
                              layer.status === LayerStatus.Failed && "border-[0.14vw] border-[#F00]",
                            )}
                          >
                            <div className="relative z-[1] w-[86%] h-full bg-[linear-gradient(180deg,_#28293D_0%,_#36375C_100%)] flex justify-center items-end gap-[0.69vw]">
                              {
                                layer.items.map((item: any, index: number) => {
                                  return (
                                    <Door
                                      key={`${layerIndex}-${index}`}
                                      layer={layer}
                                      item={item}
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
              <div className="w-[7.29vw] shrink-0 flex flex-col">
                <img
                  src="/images/arcade/space-invaders/frame-right-top.png"
                  alt=""
                  className="w-full h-[6.04vw] shrink-0 object-bottom translate-y-[1px]"
                />
                <div className="w-full h-0 flex-1 bg-[url('/images/arcade/space-invaders/frame-right.png')] bg-repeat-y bg-[length:100%_1px] bg-center">

                </div>
                <img
                  src="/images/arcade/space-invaders/frame-right-bot.png"
                  alt=""
                  className="w-full h-[2.57vw] shrink-0 object-bottom translate-y-[-1px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SpaceInvadersContextProvider>
  );
};

export default SpaceInvadersView;
