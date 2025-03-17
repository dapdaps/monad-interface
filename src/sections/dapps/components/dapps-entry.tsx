import { IDapp } from "@/types";
import { useSize } from "ahooks";
import { useRouter } from "next-nprogress-bar";
import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";
import { memo, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useSoundStore } from "@/stores/sound";

export default memo(function DappsEntry({
  direction,
  dapps
}: {
  direction: "left" | "right";
  dapps: IDapp[];
}) {
  const soundStore = useSoundStore()
  const size = useSize(document.getElementsByTagName("body")[0])

  const controls = useAnimation();
  const [clicked, setClicked] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [isPending, startTransition] = useTransition();

  const needStage2Animate = useMemo(
    () => dapps.length * 2 * 180 + (dapps.length * 2 - 1) * 80 > size?.width,
    [dapps, size]
  );
  const cycleDapps = useMemo(
    () => (needStage2Animate ? [...dapps, ...dapps] : dapps),
    [dapps, needStage2Animate]
  );

  const variants = useMemo(() => {
    return {
      initial: {
        transform:
          direction === "right"
            ? "translate3d(100%, 0, 0)"
            : "translate3d(-100%, 0, 0)"
      },
      stage1: {
        transform: needStage2Animate
          ? direction === "right"
            ? "translate3d(50%, 0, 0)"
            : "translate3d(-50%, 0, 0)"
          : "translate3d(0%, 0, 0)"
      },
      stage2: { transform: "translate3d(0%, 0, 0)" }
    };
  }, [direction, needStage2Animate]);

  function handleMouseMove(event) {
    startTransition(() => {
      setOffsetX(event.pageX - 34);
    });
  }
  function handleMouseEnter() {
    soundStore?.movingMachanicRef?.current?.play()
  }
  function handleMouseLeave() {
    soundStore?.movingMachanicRef?.current?.pause()
  }

  useEffect(() => {
    const sequence = async () => {
      // await controls?.stop()
      controls.set({
        transform:
          direction === "right"
            ? "translate3d(100%, 0, 0)"
            : "translate3d(-100%, 0, 0)"
      });
      await controls.start("stage1", {
        duration: Math.floor(cycleDapps.length / 2),
        ease: "linear"
      });
      if (needStage2Animate) {
        await controls.start("stage2", {
          duration: cycleDapps.length,
          ease: "linear",
          repeat: Infinity
        });
      }
    };
    sequence();
  }, [controls, needStage2Animate, dapps]);

  return (
    <>
      <div className={clsx("relative h-[304px]", direction === "right" ? "flex justify-end" : "")}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative z-10 w-[64px] h-[304px]">
          <img src="/images/dapps/entry.svg" alt="entry" />
        </div>
        <div className="absolute left-0 right-0 top-[10px] h-[12px] bg-[#1A2647] z-[5]">
          <div className={"absolute bottom-0"} style={{
            transform: `translate3d(${offsetX}px,100%,0)`
          }}>
            <motion.div
              className="w-[68px] flex flex-col items-center"
              animate={{
                height: clicked ? 120 : 68
              }}
              transition={{
                duration: 0.3
              }}
            >
              <div className="relative w-[21px] flex-1">
                <img src="/images/dapps/claw_line.svg" alt="claw_line" />
                <div className="absolute left-1/2 top-[10px] bottom-0 -translate-x-1/2 w-[4px] border-x border-black bg-[#435589]" />
              </div>
              <div className="w-[68px] h-[47px]">
                <img src="/images/dapps/claw.svg" alt="claw" />
              </div>
            </motion.div>
          </div>
        </div>
        <div className={clsx("min-w-full absolute bottom-[16px]", direction === "left" ? "left-0" : "right-0")}>
          <motion.div
            className={clsx("flex items-center gap-[80px]", direction === "right" ? "justify-end pr-[64px]" : "pl-[64px]")}
            variants={variants}
            initial="initial"
            animate={controls}
          >
            {
              cycleDapps.map((dapp: IDapp, index) => (
                <div
                  className="cursor-pointer w-[180px] h-[155px] bg-[url('/images/dapps/dapp_bg.svg')] bg-contain bg-no-repeat"
                  {...(needStage2Animate ? {
                    onMouseEnter() {
                      controls.stop()
                    },
                    onMouseLeave() {
                      controls.start("stage2", {
                        duration: dapps.length * 4,
                        ease: "linear",
                        repeat: Infinity
                      });
                    }
                  } : {})}
                  onClick={() => {
                    setClicked(true)
                    setTimeout(() => {
                      setClicked(false)
                    }, 300)
                  }}
                >
                  <div className="m-[32px_auto_15px] w-[56px]">
                    <img src={dapp?.icon} alt={dapp?.name} />
                  </div>
                  <div className="text-center text-black font-Unbounded text-[16px] font-semibold leading-[100%]">{dapp?.name}</div>
                  <div className="mt-[6px] flex justify-center">
                    <div className="p-[6px_10px] rounded-[6px] border border-black bg-[#7370C8] text-[#A5FFFD] font-Unbounded text-[12px] leading-[100%]">{dapp?.type}</div>
                  </div>
                </div>
              ))
            }
          </motion.div>
          <div className="relative h-[30px]">
            {
              new Array(10).fill(null).map((_, index) => (
                <div className="absolute w-[413px]" style={{ left: index * 380 }}>
                  <img src="/images/dapps/belt.svg" alt="belt" />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
})
