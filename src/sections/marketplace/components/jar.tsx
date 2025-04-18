import { motion, useAnimation } from "framer-motion";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useSize } from "ahooks";
import { IToken } from "@/types";
import Big from "big.js";
import clsx from "clsx";
import Popover, {
  PopoverPlacement,
  PopoverTrigger
} from "@/components/popover";
import { numberFormatter } from "@/utils/number-formatter";
import SwapModal from "@/sections/swap/SwapModal";
import TokenModal from "./token-modal";
import useIsMobile from "@/hooks/use-isMobile";

const getRandomDuration = () => Math.random() * 2 + 4;
const getRandomPosition = (size: any) => {
  const x = Math.random() * (size?.width - 23) + 12;
  const y = Math.random() * -46 + (size?.height - 3);
  return {
    x,
    y
  };
};

const Bubble = ({ size }: any) => {
  // const size = getRandomSize();

  const { x, y } = getRandomPosition(size);
  const duration = getRandomDuration();
  const controls = useAnimation();

  const variants = {
    initial: { opacity: 0, width: 0, height: 0, left: x, top: y },
    stage1: { opacity: 1, width: 6, height: 6, left: x, top: y },
    stage2: { opacity: 0, width: 12, height: 12, left: x, top: 12 }
  };

  useEffect(() => {
    const sequence = async () => {
      await controls.start("stage1", {
        duration: 1,
        ease: "linear"
      });
      await controls.start("stage2", {
        duration,
        ease: "linear"
      });
      controls.start({
        left: [x, x, x],
        top: [y, y, 12],
        width: [0, 6, 12],
        height: [0, 6, 12],
        opacity: [0, 1, 1],
        transition: {
          duration: duration + 1,
          repeat: Infinity,
          ease: "linear"
        }
      });
    };
    sequence();
  }, [controls]);
  return (
    <motion.div
      className={`rounded-full absolute bg-white/10`}
      variants={variants}
      initial="initial"
      animate={controls}
    // transition={{
    //   duration,
    //   repeat: Infinity,
    //   ease: "linear",
    // }}
    />
  );
};

const TokenItem = ({ token, type, onClick }: { token: IToken; type: any; onClick: VoidFunction }) => {
  const isMobile = useIsMobile()
  return (
    <>
      <motion.div
        className="group absolute"
        animate={{
          transform: [
            "translate3d(-50%, calc(-50% - 50px), 0)",
            "translate3d(-50%, calc(-50% - 56px), 0)",
            "translate3d(-50%, calc(-50% - 50px), 0)",
            "translate3d(-50%, calc(-50% - 44px), 0)",
            "translate3d(-50%, calc(-50% - 50px), 0)",
          ]
        }}
        transition={{
          duration: 2,
          ease: "linear",
          repeat: Infinity
        }}
        style={{
          left: token?.x + "%",
          top: token?.y + "%"
        }}
      >
        <Popover
          trigger={PopoverTrigger.Hover}
          placement={PopoverPlacement.Right}
          onClickBefore={() => isMobile ? false : true}
          content={
            <div
              className={clsx(
                "relative w-[193px] h-[118px] bg-no-repeat bg-contain bg-center",
                Big(token?.price_change_percent_24h ?? 0).gte(0)
                  ? "bg-[url('/images/marketplace/popover_bg_up.svg')]"
                  : "bg-[url('/images/marketplace/popover_bg_down.svg')]"
              )}
            >
              <div className="absolute top-[8px] left-[24px] right-[11px]">
                <div className="flex items-end gap-[6px]">
                  <div className="text-black text-[14px] font-semibold leading-normal">
                    {token?.symbol}
                  </div>
                  <div className="text-black text-[10px] leading-normal">{token?.name}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black text-[10px] opacity-60">
                    Price
                  </span>
                  <span className="text-black text-[10px]">
                    {numberFormatter(token?.price, 5, true, {
                      prefix: "$",
                      isShort: true
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black text-[10px] opacity-60">
                    Volume
                  </span>
                  <span className="text-black text-[10px]">
                    {numberFormatter(token?.volume_24h, 2, true, {
                      prefix: "$",
                      isShort: true
                    })}
                  </span>
                </div>
              </div>
            </div>
          }
        >
          <div className="cursor-pointer w-[60px] rounded-full overflow-hidden border-[3px] border-black group-hover:border-white">
            <img className="w-full" src={token?.icon} alt={token?.name} />
          </div>
          <div
            onClick={onClick}
            className="cursor-pointer absolute left-[3px] right-[3px] top-[3px] bottom-[3px] rounded-full bg-black/50 items-center justify-center text-white text-[13px] font-Unbounded font-semibold hidden group-hover:flex"
          >
            Swap
          </div>
          <div className="cursor-pointer absolute left-1/2 -bottom-[9px] -translate-x-1/2 p-[2px_8px] rounded-[10px] bg-black text-white font-Unbounded text-[13px] font-semibold border border-transparent group-hover:border-white">
            {token?.symbol}
          </div>
          {type === "price" ? (
            <div className="absolute left-0 right-0 -bottom-[26px] flex items-center justify-center gap-[2px]">
              <div className="w-[10px]">
                {Big(token?.price_change_percent_24h ?? 0).gte(0) ? (
                  <img src="/images/marketplace/up.svg" alt="up" />
                ) : (
                  <img src="/images/marketplace/down.svg" alt="down" />
                )}
              </div>
              <div
                className={clsx(
                  "font-Unbounded text-[10px] font-light",
                  Big(token?.price_change_percent_24h ?? 0).gte(0)
                    ? "text-[#BFFF60]"
                    : "text-[#FB52D9]"
                )}
              >
                {Big(token?.price_change_percent_24h ?? 0).toFixed(2)}%
              </div>
            </div>
          ) : (
            <div className="absolute left-0 right-0 -bottom-[26px] flex items-center justify-center  text-white text-[10px] font-light">
              {numberFormatter(token?.volume_24h, 2, true, {
                prefix: "$",
                isShort: true
              })}
            </div>
          )}
        </Popover>
      </motion.div>


    </>
  );
};
export default memo(function jar({
  title,
  tokens,
  type
}: {
  title: string;
  tokens: any[];
  type: string;
}) {
  const isMobile = useIsMobile()
  const jarRef = useRef(null);
  const size = useSize(jarRef);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [clickedToken, setClickedToken] = useState(null)
  const [top, bottom] = useMemo(() => {
    const jarRect = jarRef?.current?.getBoundingClientRect()
    const token_y_percentage = 30 / jarRect?.height * 100
    const key = type === "price" ? "price_change_percent_24h" : "volume_24h";
    let _top = 0;
    let _bottom = 0;
    const up = 1;
    const down = -1;

    for (let i = 0; i < tokens.length; i++) {
      const prev = tokens?.[i - 1]?.[key] ?? 0;
      const curr = tokens?.[i]?.[key] ?? 0;
      if (
        i - 1 > -1 &&
        Big(prev).gte(up) &&
        Big(curr).lt(up) &&
        Big(curr).gt(down)
      ) {
        _top = (tokens?.[i - 1]?.y + tokens?.[i]?.y) / 2 - 14;
      }
      if (i - 1 > -1 && Big(prev).gte(down) && Big(curr).lt(down)) {
        _bottom = (tokens?.[i - 1]?.y + tokens?.[i]?.y) / 2 - 14;
      }
    }

    return isNaN(token_y_percentage) ? [_top, _bottom] : [Big(_top).gt(0) ? (_top + token_y_percentage) : 0, Big(_bottom).gt(0) ? (_bottom + token_y_percentage) : 0];
  }, [tokens, jarRef]);
  return (
    <div className="md:w-[82.564vw] w-[21.667vw] md:h-[260vw] h-full flex flex-col items-center">
      <div className="relative z-10 md:w-[82.564vw] w-[19.301vw] md:h-[30.256vw] h-[10.833vw] md:bg-[url('/images/marketplace/mobile/jar_top.svg')] bg-[url('/images/marketplace/jar_top.svg')] bg-center bg-contain bg-no-repeat">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 md:w-[44.872vw] w-[12.639vw] md:h-[10.256vw] h-[2.639vw] flex items-center justify-center md:text-[#BFFF60] md:text-stroke-1 text-[#78FEFF] font-bold">
          {title}
        </div>
      </div>
      <div
        ref={jarRef}
        className={clsx(
          "-mt-[0.8vw] relative flex flex-col md:w-[76.923vw] w-[18.194vw] flex-1 border border-black bg-black/50 backdrop-blur-[5px]",
          type === "price"
            ? "shadow-[0_0_40px_20px_rgba(0,255,249,0.5)_inset]"
            : "shadow-[0_0_40px_20px_rgba(0,255,249,0.50)_inset]"
        )}
      >
        {type === "price" ? (
          <div className="absolute left-0 top-0 right-0 bottom-0 pointer-events-none">
            <div
              className="absolute left-0 top-0 right-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(191, 255, 96, 0.30) 0%, rgba(191, 255, 96, 0.00) 100%)",
                bottom: 100 - top + "%"
              }}
            ></div>
            <div
              className="absolute left-0 right-0"
              style={{
                top: top + "%"
              }}
            >
              <img
                className="w-full"
                src="/images/marketplace/line.svg"
                alt="line"
              />
            </div>
            {Big(bottom).gt(0) && (
              <div
                className="absolute left-0 right-0"
                style={{
                  top: bottom + "%"
                }}
              >
                <img
                  className="w-full"
                  src="/images/marketplace/line.svg"
                  alt="line"
                />
              </div>
            )}
            <div
              className="absolute left-0 bottom-0 right-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 80, 217, 0.00) 0%, rgba(255, 80, 217, 0.50) 100%)",
                top: (Big(bottom).gt(0) ? bottom : top) + "%"
              }}
            ></div>
          </div>
        ) : (
          <></>
        )}
        <div className="absolute left-0 right-0 top-0 bottom-0">
          {tokens?.map((token: IToken, index) => (
            <TokenItem
              token={token}
              type={type}
              onClick={() => {
                setClickedToken(token)
                if (!isMobile) {
                  setShowSwapModal(true)
                }
              }}
            />
          ))}
        </div>

        {size && (
          <div className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none">
            {new Array(20).fill(null).map((_, index: number) => (
              <Bubble key={index} size={size} />
            ))}
          </div>
        )}
      </div>
      <div className="w-full">
        <img
          className="w-full"
          src="/images/marketplace/jar_bottom.svg"
          alt="jar_bottom"
        />
      </div>

      {showSwapModal && (
        <SwapModal
          show={showSwapModal}
          defaultOutputCurrency={clickedToken}
          outputCurrencyReadonly
          onClose={() => {
            setShowSwapModal(false);
          }}
          from="marketplace"
        />
      )}
      {
        isMobile && (
          <TokenModal
            token={clickedToken}
            onSwap={() => {
              setShowSwapModal(true)
            }}
            onClose={() => {
              setClickedToken(null)
            }}
          />
        )
      }
    </div>
  );
});
