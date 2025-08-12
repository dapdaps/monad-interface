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

const PrivyWallet = () => {
  const containerRef = useRef<any>(null);

  const { address } = usePrivyAuth({ isBind: false });

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
      <div
        ref={containerRef}
        className="fixed bg-[#5847BA] border border-[#3E347C] text-[clamp(1px,_0.972vw,_calc(var(--nadsa-laptop-width-base)*0.00972))] leading-[150%] font-[Montserrat] font-[500] [filter:drop-shadow(0_0_20px_rgba(222,_216,_255,_0.50))] p-[clamp(1px,_0.83vw,_calc(var(--nadsa-laptop-width-base)*0.0083))] rounded-[clamp(1px,_0.83vw,_calc(var(--nadsa-laptop-width-base)*0.0083))] w-[clamp(1px,_15.97vw,_calc(var(--nadsa-laptop-width-base)*0.1596))] h-[clamp(1px,_18.06vw,_calc(var(--nadsa-laptop-width-base)*0.1806))] right-[clamp(calc(var(--nadsa-laptop-width-base)*-0.0083),_-0.83vw,_1px)] top-1/2 -translate-y-1/2 z-10"
      >
        <ScrollingBalls />
        <div className="w-full h-full bg-[#1A1843] border border-[#3E347C] rounded-l-[clamp(1px,_0.83vw,_calc(var(--nadsa-laptop-width-base)*0.0083))] shadow-[7px_10px_0_0_rgba(0,_0,_0,_0.25)_inset]">
          <div className="relative pr-[clamp(1px,_1.944vw,_calc(var(--nadsa-laptop-width-base)*0.01944))] pt-[clamp(1px,_2.3vw,_calc(var(--nadsa-laptop-width-base)*0.023))] pl-[clamp(1px,_1.319vw,_calc(var(--nadsa-laptop-width-base)*0.01319))] h-full font-Montserrat">
            <div className="flex items-center w-full">
              <span className="mr-[clamp(1px,_0.694vw,_calc(var(--nadsa-laptop-width-base)*0.00694))] flex items-center justify-center">
                <svg
                  className="w-[clamp(1px,_2.639vw,_calc(var(--nadsa-laptop-width-base)*0.02639))] h-[clamp(1px,_2.639vw,_calc(var(--nadsa-laptop-width-base)*0.02639))] shrink-0"
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="19" cy="19" r="19" fill="black" />
                  <path d="M19.0801 4C23.981 4 28.3342 6.33908 31.0879 9.96094L21.3447 19.6807L30.4229 29.0117C27.6594 32.1661 23.6035 34.1611 19.0801 34.1611C10.7507 34.1611 4 27.4094 4 19.0801C4.00024 10.7509 10.7528 4.00003 19.0801 4ZM31.0879 16.7881C31.8784 16.7881 32.6373 17.1022 33.1963 17.6611C33.7551 18.22 34.0683 18.9782 34.0684 19.7686C34.0684 20.5588 33.755 21.3171 33.1963 21.876C32.6373 22.4349 31.8784 22.749 31.0879 22.749C30.2976 22.7489 29.5393 22.4348 28.9805 21.876C28.4217 21.3171 28.1074 20.5589 28.1074 19.7686C28.1075 18.9782 28.4216 18.22 28.9805 17.6611C29.5393 17.1023 30.2976 16.7882 31.0879 16.7881ZM12.9961 10.043C12.3488 10.043 11.8223 10.5695 11.8223 11.2168V12.8301H10.209C9.56166 12.8301 9.03516 13.3566 9.03516 14.0039C9.03539 14.651 9.5618 15.1767 10.209 15.1768H11.8223V16.79C11.8223 17.4374 12.3488 17.9639 12.9961 17.9639C13.6434 17.9638 14.1689 17.4373 14.1689 16.79V15.1768H15.7832C16.4302 15.1765 16.9558 14.6509 16.9561 14.0039C16.9561 13.3567 16.4304 12.8303 15.7832 12.8301H14.1689V11.2168C14.1689 10.5695 13.6434 10.0431 12.9961 10.043Z" fill="#B16EF1" />
                </svg>
              </span>
              <div className="flex-1">
                <div className="text-[#A6A6DB] text-left">Game Account</div>
                <div className="text-white flex items-center mt-[clamp(1px,_0.0694vw,_calc(var(--nadsa-laptop-width-base)*0.000694))] cursor-pointer">
                  <span>{address && address.slice(0, 5)}...{address && address.slice(-5)}</span>
                  <div className="ml-[clamp(1px,_0.486vw,_calc(var(--nadsa-laptop-width-base)*0.00486))] text-[#a084ff]">
                    <Copyed value={address || ''} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#000] rounded-[10px] border border-[#8184CC] px-[clamp(1px,_0.833vw,_calc(var(--nadsa-laptop-width-base)*0.00833))] py-[clamp(1px,_0.556vw,_calc(var(--nadsa-laptop-width-base)*0.00556))] mb-[clamp(1px,_1.389vw,_calc(var(--nadsa-laptop-width-base)*0.01389))] w-full mt-[clamp(1px,_1.389vw,_calc(var(--nadsa-laptop-width-base)*0.01389))] ">
              <div className="flex items-center">
                <span className="mr-[clamp(1px,_0.556vw,_calc(var(--nadsa-laptop-width-base)*0.00556))] flex items-center">
                  <svg
                    className="w-[clamp(1px,_1.667vw,_calc(var(--nadsa-laptop-width-base)*0.01667))] h-[clamp(1px,_1.667vw,_calc(var(--nadsa-laptop-width-base)*0.01667))] shrink-0"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="12" fill="#836EF9" />
                    <path d="M11.959 3.65234C9.5602 3.65234 3.65234 9.58932 3.65234 12.0001C3.65234 14.4109 9.5602 20.348 11.959 20.348C14.3578 20.348 20.2657 14.4108 20.2657 12.0001C20.2657 9.58943 14.3578 3.65234 11.959 3.65234ZM10.6645 16.7737C9.65297 16.4967 6.93338 11.7158 7.20907 10.6993C7.48475 9.68266 12.2419 6.94963 13.2534 7.22668C14.265 7.50369 16.9847 12.2845 16.709 13.3011C16.4333 14.3176 11.6761 17.0507 10.6645 16.7737Z" fill="white" />
                  </svg>
                </span>
                <span className="text-white text-[clamp(1px,_1.111vw,_calc(var(--nadsa-laptop-width-base)*0.01111))]">
                  {Number(tokenBalance || 0).toFixed(4)}
                </span>
              </div>
              <div className="cursor-pointer float-right" onClick={() => {
                setOpen(true)
                setShowDeposit(showDeposit + 1)
                setIsJustDesposit(false)
              }}>
                <svg
                  className="w-[clamp(1px,_1.389vw,_calc(var(--nadsa-laptop-width-base)*0.01389))] h-[clamp(1px,_1.389vw,_calc(var(--nadsa-laptop-width-base)*0.01389))] shrink-0"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="20" rx="4" fill="#836EF9" />
                  <path d="M13.4912 10.8004H10.7998V13.467C10.7998 13.7616 10.5615 14 10.2669 14H9.73399C9.43941 14 9.20018 13.7616 9.20018 13.467V10.8004H6.50881C6.22763 10.8004 6 10.5727 6 10.2915V9.70851C6 9.4273 6.22763 9.19964 6.50881 9.19964H9.20018V6.53298C9.20018 6.23837 9.43941 6 9.73399 6H10.2669C10.5615 6 10.7998 6.23926 10.7998 6.53298V9.19964H13.4912C13.7724 9.19964 14 9.4273 14 9.70851V10.2915C14 10.5718 13.7724 10.8004 13.4912 10.8004Z" fill="white" />
                </svg>
              </div>
            </div>
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
      </div>
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
