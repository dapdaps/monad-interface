import { motion } from "framer-motion";
import { memo, useRef } from "react";
import DappsEntry from "./components/dapps-entry";
import RectangularButton from "./components/rectangular-button";
import usePage from "./hooks/use-page";
import { useSize } from "ahooks";

export default memo(function Laptop() {
  const entryScrollRef = useRef(null)
  const entryContainerRef = useRef(null)
  const { dappsArray, activeType, handleClickButton } = usePage()

  const size = useSize(entryScrollRef?.current)
  const wrapSize = useSize(entryContainerRef?.current)


  console.log("=====size", size)
  console.log("====wrapSize", wrapSize)
  return (
    <div className="flex flex-col h-[calc(100vh-60px)] pt-[30px] overflow-hidden">

      <div className="relative flex-1 overflow-x-hidden overflow-y-auto" ref={entryContainerRef}>
        <div className="flex flex-col gap-[18px]" ref={entryScrollRef}>
          {
            dappsArray?.map((dapps: IDapp, index: number) => (
              <DappsEntry direction={index % 2 ? "right" : "left"} dapps={dapps} />
            ))
          }
        </div>
        {
          size?.height > wrapSize?.height && (
            <div className="cursor-pointer fixed right-[15px] bottom-[63px] z-20 w-[36px] h-[60px] flex items-center justify-center rounded-[18px] border border-[#A5FFFD] bg-[rgba(255,255,255,0.10)]">
              <div className="w-[30px]">
                <img src="/images/dapps/icon_scroll_down.gif" alt="icon_scroll_down" />
              </div>
            </div>
          )
        }

      </div>
      <div className="flex flex-col justify-end">
        <div className="h-[87px] bg-[#23243D] border-t-[18px] border-[#273051]">
          <div className="absolute z-[10] bottom-[54px] left-1/2 translate-x-[calc(-50%_-_441px)] w-[63px] h-[87px] bg-[url('/images/dapps/body.svg')] bg-contain bg-no-repeat">
            <motion.div
              className="absolute -right-[13.3px] top-[7px] w-[37px] origin-bottom-left"
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
            <div className="absolute left-[52px] top-[24px] flex gap-[10px]">
              <RectangularButton
                type={1}
                clicked={activeType === "all"}
                className="w-[76px] h-[36px] uppercase"
                onClick={() => {
                  handleClickButton("all");
                }}
              >
                All
              </RectangularButton>

              <RectangularButton
                type={3}
                data-bp="1003-002"
                clicked={activeType === "instation"}
                className="w-[132px] h-[36px]"
                onClick={() => {
                  handleClickButton("instation");
                }}
              >
                Instant Access
              </RectangularButton>
              <RectangularButton
                type={2}
                data-bp="1003-003"
                clicked={activeType === "outlink"}
                className="w-[136px] h-[36px]"
                onClick={() => {
                  handleClickButton("outlink");
                }}
              >
                <div className="flex items-center gap-[3px]">
                  <span>External Links</span>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 8L8 1M8 1H1.63636M8 1V7.36364" stroke="black" strokeWidth="1.6" />
                  </svg>
                </div>
              </RectangularButton>
            </div>

            <div className="absolute left-[46px] top-[71px] flex gap-[12px]">
              <RectangularButton
                type={1}
                data-bp="1003-005"
                clicked={activeType === "Dex"}
                className="w-[58px] h-[36px] uppercase"
                onClick={() => handleClickButton("Dex")}
              >
                Dex
              </RectangularButton>
              <RectangularButton
                type={3}
                data-bp="1003-007"
                clicked={activeType === "Betting"}
                className="w-[69px] h-[36px] uppercase"
                onClick={() => handleClickButton("Betting")}
              >
                Betting
              </RectangularButton>
              <RectangularButton
                type={3}
                data-bp="1003-008"
                clicked={activeType === "NFT"}
                className="w-[66px] h-[36px] uppercase"
                onClick={() => handleClickButton("NFT")}
              >
                NFT
              </RectangularButton>
              <RectangularButton
                type={3}
                data-bp="1003-004"
                clicked={activeType === "Lending"}
                className="w-[76px] h-[36px] uppercase"
                onClick={() => handleClickButton("Lending")}
              >
                Lending
              </RectangularButton>
              <RectangularButton
                type={2}
                data-bp="1003-006"
                clicked={activeType === "other"}
                className="w-[69px] h-[36px] uppercase"
                onClick={() => handleClickButton("other")}
              >
                Other
              </RectangularButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
