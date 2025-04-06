import { useSoundStore } from "@/stores/sound";
import { useSize } from "ahooks";
import { motion } from "framer-motion";
import { memo, useEffect, useMemo, useState } from "react";
import DappsEntry from "./components/dapps-entry";
import RectangularButton from "./components/rectangular-button";
import { ALL_DAPP_LIST } from "./config";

export default memo(function Dapps() {
  const size = useSize(document.getElementsByTagName("body")[0]);
  const soundStore: any = useSoundStore();
  const [activeType, setActiveType] = useState("all");

  // const FILTER_LEFT_DAPP_LIST = useMemo(
  //   () =>
  //     LEFT_DAPP_LIST.filter(
  //       (dapp) => dapp.type === activeType || activeType === "all"
  //     ),
  //   [activeType]
  // );
  // const FILTER_RIGHT_DAPP_LIST = useMemo(
  //   () =>
  //     RIGHT_DAPP_LIST.filter(
  //       (dapp) => dapp.type === activeType || activeType === "all"
  //     ),
  //   [activeType]
  // );

  const dappsArray = useMemo(() => {
    const maxLength = Math.floor(((size?.width - 64) * 0.8 + 80) / 240)
    const dapps = ALL_DAPP_LIST.filter(
      (dapp: IDapp) => {
        if (activeType === "all" ||
          activeType === "instation" && dapp.link.indexOf("http") === -1 ||
          activeType === "outlink" && dapp.link.indexOf("http") > -1
        ) {
          return true
        }
        return dapp.type === activeType
      }
    )
    const array = []

    for (let i = 0; i < dapps.length; i += maxLength) {
      array.push(dapps.slice(i, i + maxLength))
    }
    return array
  }, [activeType, size])

  function handleClickButton(type: any) {
    setActiveType(type);
  }

  useEffect(() => {
    soundStore?.conveyorBeltRef?.current?.play?.();
    return () => {
      soundStore?.conveyorBeltRef?.current?.pause?.();
    };
  }, []);
  return (
    <div className="flex flex-col h-[calc(100vh-60px)] pt-[30px] overflow-hidden">
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="flex flex-col gap-[18px]">
          {
            dappsArray?.map((dapps: IDapp, index: number) => (
              <DappsEntry direction={index % 2 ? "right" : "left"} dapps={dapps} />
            ))
          }
        </div>
      </div>
      <div className="flex flex-col justify-end h-[180px]">
        <div className="h-[87px] bg-[#23243D] border-t-[18px] border-[#273051]">
          <div className="absolute bottom-[54px] left-1/2 translate-x-[calc(-50%_-_441px)] w-[63px] h-[87px] bg-[url('/images/dapps/body.svg')] bg-contain bg-no-repeat">
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
                className="w-[76px] h-[36px]"
                onClick={() => {
                  handleClickButton("all");
                }}
              >
                All
              </RectangularButton>

              <RectangularButton
                type={3}
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
                clicked={activeType === "bridge"}
                className="w-[66px] h-[36px]"
                onClick={() => handleClickButton("bridge")}
              >
                Bridge
              </RectangularButton>

              <RectangularButton
                type={3}
                clicked={activeType === "dex"}
                className="w-[58px] h-[36px]"
                onClick={() => handleClickButton("dex")}
              >
                Dex
              </RectangularButton>

              <RectangularButton
                type={3}
                clicked={activeType === "perps"}
                className="w-[69px] h-[36px]"
                onClick={() => handleClickButton("perps")}
              >
                Perps
              </RectangularButton>
              <RectangularButton
                type={3}
                clicked={activeType === "betting"}
                className="w-[69px] h-[36px]"
                onClick={() => handleClickButton("betting")}
              >
                Betting
              </RectangularButton>
              <RectangularButton
                type={2}
                clicked={activeType === "nft"}
                className="w-[66px] h-[36px]"
                onClick={() => handleClickButton("nft")}
              >
                NFT
              </RectangularButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
