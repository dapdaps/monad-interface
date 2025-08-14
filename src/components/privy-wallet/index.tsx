import React, { useContext, useEffect, useRef, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { motion } from "framer-motion";
import ActionModal from "./ActionModal";
import Copyed from "../copyed";
import useTokenAccountBalance from "@/hooks/use-token-account-balance";
import { monadTestnet } from "viem/chains";
import useAccount from "@/hooks/use-account";
import useTokenBalance from "@/hooks/use-token-balance";
import { useDebounceFn, useInterval } from "ahooks";
import { toast } from "react-toastify";
import { PrivyContext } from "../privy-provider";
import { usePrivyAuth } from "@/hooks/use-privy-auth";
import CalendarBanner from "./calendar/banner";
import useIsMobile from "@/hooks/use-isMobile";
import GameAccount from "./game-account";
import GameBalance from "./game-balance";
import PrivyMobile from "./mobile";

const PrivyWallet = () => {
  const containerRef = useRef<any>(null);

  const { address } = usePrivyAuth({ isBind: false });
  const isMobile = useIsMobile();

  const [open, setOpen] = useState(false);
  const [showDeposit, setShowDeposit] = useState(1);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isJustDesposit, setIsJustDesposit] = useState(false);
  const { tokenBalance, update } = useTokenAccountBalance(
    "native",
    18,
    address,
    monadTestnet.id
  );

  const { tokenBalance: nativeTokenBalance } = useTokenBalance(
    "native",
    18,
    monadTestnet.id
  );

  const { account } = useAccount();

  useInterval(() => {
    update();
  }, 30000);

  const { openDeposit, setOpenDeposit } = useContext(PrivyContext);

  useEffect(() => {
    if (openDeposit) {
      setOpen(true)
      setShowDeposit(showDeposit + 1)
      setIsJustDesposit(true)
    }
  }, [openDeposit]);

  // if (!address) {
  //     return null;
  // }

  return (
    <>
      {
        isMobile ? (
          <PrivyMobile
            address={address}
            tokenBalance={tokenBalance}
            setOpen={setOpen}
            setShowDeposit={setShowDeposit}
            setIsJustDesposit={setIsJustDesposit}
            showDeposit={showDeposit}
          />
        ) : (
          <div
            ref={containerRef}
            className="fixed bg-[#5847BA] border border-[#3E347C] text-[clamp(1px,_0.972vw,_calc(var(--nadsa-laptop-width-base)*0.00972))] leading-[150%] font-[Montserrat] font-[500] [filter:drop-shadow(0_0_20px_rgba(222,_216,_255,_0.50))] p-[clamp(1px,_0.83vw,_calc(var(--nadsa-laptop-width-base)*0.0083))] rounded-[clamp(1px,_0.83vw,_calc(var(--nadsa-laptop-width-base)*0.0083))] w-[clamp(1px,_15.97vw,_calc(var(--nadsa-laptop-width-base)*0.1596))] h-[clamp(1px,_18.06vw,_calc(var(--nadsa-laptop-width-base)*0.1806))] right-[clamp(calc(var(--nadsa-laptop-width-base)*-0.0083),_-0.83vw,_1px)] top-1/2 -translate-y-1/2 z-10"
          >
            <ScrollingBalls />
            <div className="w-full h-full bg-[#1A1843] border border-[#3E347C] rounded-l-[clamp(1px,_0.83vw,_calc(var(--nadsa-laptop-width-base)*0.0083))] shadow-[7px_10px_0_0_rgba(0,_0,_0,_0.25)_inset]">
              <div className="relative pr-[clamp(1px,_1.944vw,_calc(var(--nadsa-laptop-width-base)*0.01944))] pt-[clamp(1px,_2.3vw,_calc(var(--nadsa-laptop-width-base)*0.023))] pl-[clamp(1px,_1.319vw,_calc(var(--nadsa-laptop-width-base)*0.01319))] h-full font-Montserrat">
                <GameAccount address={address} />
                <GameBalance
                  tokenBalance={tokenBalance}
                  setOpen={setOpen}
                  setShowDeposit={setShowDeposit}
                  setIsJustDesposit={setIsJustDesposit}
                  showDeposit={showDeposit}
                />
                <button
                  data-bp="1009-004"
                  onClick={() => {
                    setOpen(true)
                    setIsJustDesposit(false)
                  }}
                  className="w-full font-Montserrat h-[clamp(1px,_2.778vw,_calc(var(--nadsa-laptop-width-base)*0.02778))] text-black flex justify-center items-center rounded-[10px] text-[clamp(1px,_1.111,_calc(var(--nadsa-laptop-width-base)*0.01111))] transition bg-[radial-gradient(50%_50%_at_50%_50%,#E1FFB5_0%,#B1FF3D_100%)] shadow-[0px_0px_6px_0px_#BFFF60]"
                >
                  Cashier
                </button>
              </div>
            </div>
            <CalendarBanner />
          </div >
        )
      }
      <ActionModal
        open={open}
        onClose={() => {
          setOpen(false)
          setOpenDeposit(false)
        }}
        balance={Number(tokenBalance || 0)}
        nativeBalance={Number(nativeTokenBalance || 0)}
        playerAddress={address}
        rechargeAddress={account || ''}
        depositInitialAmount={0.3}
        showDeposit={showDeposit}
        isJustDesposit={isJustDesposit}
      />
    </>
  );
};

export default PrivyWallet;

// Scrolling balls component using Framer Motion
const ScrollingBalls = () => {
  const ballSize = "clamp(1px, 0.694vw, calc(var(--nadsa-laptop-width-base)*0.00694))";
  const ballSpacing = "clamp(1px, 0.694vw, calc(var(--nadsa-laptop-width-base)*0.00694))";
  const duration = 0.125;

  // Alternating twinkle animation for marquee effect
  const createTwinkleVariants = (delay: number) => ({
    animate: {
      opacity: [1, 0, 1],
      // scale: [1, 1.2, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
        delay: delay
      }
    }
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top balls - alternating twinkle */}
      <div className="absolute top-0 left-0 right-0 flex">
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`top-${index}`}
            className="rounded-full flex-shrink-0"
            style={{
              width: ballSize,
              height: ballSize,
              background: "radial-gradient(50% 50% at 50% 50%, #CDC4FF 0%, #FFF 100%)",
              filter: "drop-shadow(0 0 10px #836EF9)",
              margin: `clamp(1px, 0.0694vw, calc(var(--nadsa-laptop-width-base)*0.000694)) ${ballSpacing} 0`
            }}
            variants={createTwinkleVariants((8 - index) * duration)}
            animate="animate"
          />
        ))}
      </div>

      {/* Left balls - alternating twinkle */}
      <div className="absolute top-0 left-0 bottom-0 flex flex-col">
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`left-${index}`}
            className="rounded-full flex-shrink-0"
            style={{
              width: ballSize,
              height: ballSize,
              background: "radial-gradient(50% 50% at 50% 50%, #CDC4FF 0%, #FFF 100%)",
              filter: "drop-shadow(0 0 10px #836EF9)",
              margin: index === 0 ? `clamp(1px, 1.389vw, calc(var(--nadsa-laptop-width-base)*0.01389)) 0 ${ballSpacing} clamp(1px, 0.0694vw, calc(var(--nadsa-laptop-width-base)*0.000694))` : `${ballSpacing} 0 ${ballSpacing} clamp(1px, 0.0694vw, calc(var(--nadsa-laptop-width-base)*0.000694))`
            }}
            variants={createTwinkleVariants(8 * duration + index * duration)}
            animate="animate"
          />
        ))}
      </div>

      {/* Bottom balls - alternating twinkle */}
      <div className="absolute bottom-0 left-0 right-0 flex">
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`bottom-${index}`}
            className="rounded-full flex-shrink-0"
            style={{
              width: ballSize,
              height: ballSize,
              background: "radial-gradient(50% 50% at 50% 50%, #CDC4FF 0%, #FFF 100%)",
              filter: "drop-shadow(0 0 10px #836EF9)",
              margin: `0 ${ballSpacing} clamp(1px, 0.0694vw, calc(var(--nadsa-laptop-width-base)*0.000694))`
            }}
            variants={createTwinkleVariants(16 * duration + index * duration)}
            animate="animate"
          />
        ))}
      </div>
    </div>
  );
};
