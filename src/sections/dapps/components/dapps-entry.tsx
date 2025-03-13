import clsx from "clsx";
import { motion } from "framer-motion";
import { memo, useEffect, useState, useTransition } from "react";

export default memo(function DappsEntry({
  direction,
  dapps
}: {
  direction: 'left' | 'right'
  dapps: any[]
}) {

  const [clicked, setClicked] = useState(false)
  const [offsetX, setOffsetX] = useState(0)
  const [isPending, startTransition] = useTransition();

  function handleMouseMove(event) {
    startTransition(() => {
      setOffsetX(event.pageX - 34)
    })
  }


  return (
    <div className={clsx("relative h-[304px]", direction === "right" ? "flex justify-end" : "")}
      onMouseMove={handleMouseMove}
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
      <div className="absolute left-0 right-0 bottom-[16px]">
        <motion.div
          className={clsx("flex items-center gap-[80px]", direction === "right" ? "justify-end pr-[64px]" : "pl-[64px]")}
          initial={{
            transform: direction === "right" ? "translate3d(100%, 0, 0)" : "translate3d(-100%, 0, 0)",
          }}
          animate={{
            transform: "translate3d(0, 0, 0)",
          }}
          transition={{
            duration: 2,
          }}
        >
          {
            dapps.map((_, index) => (
              <div
                className="cursor-pointer w-[180px] h-[155px] bg-[url('/images/dapps/dapp_bg.svg')] bg-contain bg-no-repeat"
                onClick={() => {
                  setClicked(true)
                }}
              >
                <div className="m-[32px_auto_9px] w-[64px]">
                  <img src="/images/dapps/dapp/Lynex.svg" alt="Lynex" />
                </div>
                <div className="text-center text-black font-Unbounded text-[16px] font-semibold leading-[100%]">Lynex</div>
                <div className="mt-[6px] flex justify-center">
                  <div className="p-[6px_10px] rounded-[6px] border border-black bg-[#7370C8] text-[#A5FFFD] font-Unbounded text-[12px] leading-[100%]">Dex</div>
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
  )
})
