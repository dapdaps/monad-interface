import useClickTracking from "@/hooks/use-click-tracking";
import useIsMobile from "@/hooks/use-isMobile";
import { useSoundStore } from "@/stores/sound";
import { IDapp } from "@/types";
import { useSize } from "ahooks";
import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next-nprogress-bar";
import {
  memo,
  useEffect,
  useMemo,
  useState,
  useTransition
} from "react";
import DappInfo from "./dapp-info";
import ExternalLinksModal from "./external-links-modal";
import Popover, { PopoverPlacement, PopoverTrigger } from '@/components/popover';
import DappModal from "./dapp-modal";

export default memo(function DappsEntry({
  direction,
  dapps
}: {
  direction: "left" | "right";
  dapps: IDapp[];
}) {
  const isMobile = useIsMobile()
  const { handleReport } = useClickTracking()
  const soundStore = useSoundStore();
  const [targetDapp, setTargetDapp] = useState<any>(null);
  const [clickedDapp, setClickedDapp] = useState(null)
  const size = useSize(document.getElementsByTagName("body")[0]);
  const controls = useAnimation();
  const [clicked, setClicked] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [dAppsAnimateDone, setDAppsAnimateDone] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const variants = useMemo(() => {
    return {
      initial: {
        transform:
          direction === "right"
            ? "translate3d(100%, 0, 0)"
            : "translate3d(-100%, 0, 0)"
      },
      stage1: {
        transform: "translate3d(0%, 0, 0)"
      }
    };
  }, [direction]);

  function handleMouseMove(event: any) {
    startTransition(() => {
      setOffsetX(event.pageX - 34);
    });
  }

  useEffect(() => {
    const sequence = async () => {
      controls.set({
        transform:
          direction === "right"
            ? "translate3d(100%, 0, 0)"
            : "translate3d(-100%, 0, 0)"
      });
      await controls.start("stage1", {
        duration: 3,
        ease: "linear"
      });
    };
    sequence();
  }, [controls, dapps]);

  return (
    <>
      <div
        className={clsx(
          "relative",
          isMobile ? "h-[185px]" : "h-[304px]",
          direction === "right" ? "flex justify-end z-[1]" : "z-[2]"
        )}
        data-hover-sound="/audios/dapps/moving_machanic_clip.mp3"
        onMouseMove={handleMouseMove}
      >
        {
          isMobile ? <></> : (
            <div className="absolute left-0 right-0 top-[10px] h-[12px] bg-[#1A2647]">
              <div
                className={"absolute bottom-0"}
                style={{
                  transform: `translate3d(${offsetX}px,100%,0)`
                }}
              >
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
          )
        }

        <div
          className={clsx(
            "min-w-full absolute",
            isMobile ? "bottom-0" : "bottom-[16px]",
            direction === "left" ? "left-0" : "right-0"
          )}
        >
          {
            isMobile ? <></> : (
              <div
                className={clsx(
                  "absolute z-[3] w-[64px] h-[304px] bg-[#62589C] border border-black bottom-0",
                  direction === "right"
                    ? "-right-[1px] rounded-[12px_0_0_12px]"
                    : "-left-[1px] rounded-[0_12px_12px_0]"
                )}
              />
            )
          }

          <motion.div
            className={clsx(
              "flex items-center justify-center relative z-[2]",
              isMobile ? "gap-[10px]" : "gap-[80px]",
              isMobile ? "px-[10px]" : direction === "right" ? "justify-end pr-[64px]" : "pl-[64px]"
            )}
            variants={variants}
            initial="initial"
            animate={controls}
            onAnimationComplete={() => {
              setDAppsAnimateDone(true);
            }}
            onAnimationStart={() => {
              setDAppsAnimateDone(false);
            }}
          >
            {dapps.map((dapp: IDapp, index) => (
              <Popover
                key={dapp.name}
                placement={PopoverPlacement.Bottom}
                trigger={PopoverTrigger.Hover}
                closeDelayDuration={0}
                triggerContainerClassName="flex"
                content={dAppsAnimateDone && (
                  <DappInfo
                    name={dapp.name}
                    category={dapp.type}
                    icon={dapp.icon}
                    desc={dapp.desc}
                    tvl=""
                    volume24h=""
                    liquidity=""
                    link={dapp.link}
                    className="!static"
                    open={dAppsAnimateDone}
                    onClose={() => {
                      setDAppsAnimateDone(false);
                    }}
                  />
                )}
              >
                <div
                  className="cursor-pointer w-[180px] h-[155px] bg-[url('/images/dapps/dapp_bg.png')] bg-contain bg-no-repeat relative"
                  data-name={dapp.name}
                  key={dapp.name}
                  onClick={() => {
                    setClicked(true);
                    setTimeout(() => {
                      setClicked(false);
                    }, 300);
                    if (isMobile) {
                      setClickedDapp(dapp)
                    } else {
                      if (
                        dapp.link.startsWith("https://") ||
                        dapp.link.startsWith("http://")
                      ) {
                        setTargetDapp(dapp)
                      } else {
                        handleReport("1003-001", dapp.name)
                        router.push(dapp.link);
                      }
                    }
                  }}
                >
                  <div className="relative m-[32px_auto_15px] w-[56px]">
                    <img src={dapp?.icon} alt={dapp?.name} className="rounded-[10px] object-center object-contain w-[56px] h-[56px]" />
                    {
                      dapp?.link?.indexOf("http") > -1 && (
                        <div className="absolute right-[-6px] bottom-0 w-[16px]">
                          <img src="/images/dapps/link.svg" alt="link" />
                        </div>
                      )
                    }
                  </div>
                  <div
                    className="text-center text-black font-Unbounded text-[14px] font-semibold leading-[100%]"
                  >
                    {dapp?.name}
                  </div>
                  <div className="mt-[6px] flex justify-center">
                    <div className="p-[6px_10px] rounded-[6px] border border-black bg-[#7370C8] text-[#A5FFFD] font-Unbounded text-[12px] leading-[100%]">
                      {dapp?.type}
                    </div>
                  </div>
                </div>
              </Popover>
            ))}
          </motion.div>
          <div className="relative h-[30px]">
            {new Array(10).fill(null).map((_, index) => (
              <div className="absolute md:w-[285px] w-[413px]" style={{ left: index * (isMobile ? 256 : 380) }}>
                <img src={isMobile ? "/images/dapps/mobile/belt.svg" : "/images/dapps/belt.svg"} alt="belt" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {
        isMobile && (
          <DappModal
            dapp={clickedDapp}
            onClose={() => {
              setClickedDapp(null)
            }}
          />
        )
      }
      {
        targetDapp && (
          <ExternalLinksModal
            dapp={targetDapp}
            onClose={() => {
              setTargetDapp(null)
            }}
          />
        )
      }
    </>
  );
});
