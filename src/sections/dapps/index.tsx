import { motion } from "framer-motion"
import { memo } from "react"
export default memo(function Dapps() {
  return (
    <div className="min-h-[840px] pt-[30px]">
      <div className="flex flex-col gap-[18px]">
        <div className="relative h-[304px]">
          <div className="relative z-10 w-[64px] h-[304px]">
            <img src="/images/dapps/entry.svg" alt="entry" />
          </div>
          <div className="absolute left-0 right-0 top-[10px] h-[12px] bg-[#1A2647]">
            <div className="absolute left-1/2 bottom-0 translate-x-[calc(-50%_+_50px)] translate-y-[100%] w-[68px]">
              <img src="/images/dapps/claw.svg" alt="claw" />
            </div>
          </div>
          <div className="absolute left-0 right-0 bottom-[16px]">
            <motion.div
              className="flex items-center gap-[80px] pl-[64px]"
              initial={{
                transform: "translate3d(-100%, 0, 0)",
              }}
              animate={{
                transform: "translate3d(0, 0,0)",
              }}
              transition={{
                duration: 2,

              }}
            >
              {
                new Array(5).fill(null).map((_, index) => (
                  <div className="w-[180px] h-[155px] bg-[url('/images/dapps/dapp_bg.svg')] bg-contain bg-no-repeat">
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

        <div className="flex justify-end relative h-[304px]">
          <div className="relative z-10 w-[64px] h-[304px]">
            <img src="/images/dapps/entry.svg" alt="entry" />
          </div>
          <div className="absolute left-0 right-0 top-[10px] h-[12px] bg-[#1A2647]">
            <div className="absolute left-1/2 bottom-0 translate-x-[calc(-50%_-_442px)] translate-y-[100%] w-[68px]">
              <img src="/images/dapps/claw.svg" alt="claw" />
            </div>
          </div>
          <div className="absolute left-0 right-0 bottom-[16px]">
            <motion.div
              className="flex items-center justify-end gap-[80px] pr-[64px]"
              initial={{
                transform: "translate3d(100%, 0, 0)",
              }}
              animate={{
                transform: "translate3d(0, 0,0)",
              }}
              transition={{
                duration: 2,

              }}
            >
              {
                new Array(5).fill(null).map((_, index) => (
                  <div className="w-[180px] h-[155px] bg-[url('/images/dapps/dapp_bg.svg')] bg-contain bg-no-repeat">
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
      </div>

      <div className="absolute left-0 right-0 bottom-0 h-[87px] bg-[#23243D] border-t-[18px] border-[#273051]">

        <div className="absolute bottom-[42px] left-1/2 translate-x-[calc(-50%_-_441px)] w-[81px] h-[110px] bg-[url('/images/dapps/body.svg')] bg-contain bg-no-repeat">
          <motion.div className="absolute right-0 top-0 w-[29px] origin-bottom-left"
            animate={{
              rotate: [0, -15, 0, 8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <img src="/images/dapps/hand.svg" alt="hand" />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[470px] h-[136px] bg-[url('/images/dapps/operation_panel.svg')] bg-center bg-contain bg-no-repeat">
          <div class="trapezoid-container w-[200px] h-[100px] relative">
            <div class="trapezoid w-full h-full bg-blue-500 rounded-tl-lg rounded-r-lg"></div>
          </div>


          {/* <div className="w-[88px] h-[36px] border border-black rounded-[6px] bg-[#A6A6D2] drop-shadow-[0_6px_0_#000]"></div> */}

        </div>
      </div>
    </div>
  )
})
