"use client";

import { useNftStore } from "@/stores/nft";
import clsx from "clsx";
import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useState } from "react";
import { EWelcomeStatus } from "./config";
import { IShareOpen, WelcomeProvider } from "./context";
import { useDebounceFn } from "ahooks";
import useCustomAccount from "@/hooks/use-account";

const WelcomeModal = lazy(() => import("./modal"));
const WelcomeShareModal = lazy(() => import("./share"));
const WelcomeDownload = lazy(() => import("./download"));

const Welcome = (props: any) => {
  const { className } = props;

  const { account } = useCustomAccount();
  const { setWelcomeOpen, welcomeDownloaded, getWelcomeDownloaded } = useNftStore();

  const [bonus, setBonus] = useState<any>();
  const [status, setStatus] = useState<EWelcomeStatus>(EWelcomeStatus.CONNECTING);
  const [shareOpen, setShareOpen] = useState<IShareOpen>({ open: false });

  const { run: openWelcome, cancel: cancelOpenWelcome } = useDebounceFn(() => {
    setWelcomeOpen(true);
  }, { wait: 2000 });

  useEffect(() => {
    cancelOpenWelcome();
    if (getWelcomeDownloaded(account)) {
      return;
    }
    openWelcome();
  }, [welcomeDownloaded, account]);

  return (
    <WelcomeProvider
      value={{
        status,
        setStatus,
        shareOpen,
        setShareOpen,
        bonus,
        setBonus,
      }}
    >
      <div
        className={clsx("cursor-pointer w-[678px] flex justify-center items-center gap-[10px] h-[50px] flex-shrink-0 rounded-[4px] border border-[#6750FF] bg-[rgba(29,30,34,0.80)] shadow-[0_0_30px_0_#836EF9] backdrop-blur-[15px] text-[#BFFF60] font-[pixelmix] text-[14px] font-normal leading-[100%] px-6", className)}
        onClick={() => {
          setWelcomeOpen(true);
        }}
      >
        <div className="flex items-center">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={`l2r-${index}`}
              className="l-2-r"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={l2rVariants}
            >
              &gt;
            </motion.div>
          ))}
        </div>
        <div className="">
          WELCOME TO MAINNET! CLICK HERE TO DETECT YOUR REWARDS
        </div>
        <div className="flex items-center">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={`r2l-${index}`}
              className="r-2-l"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={r2lVariants}
            >
              &lt;
            </motion.div>
          ))}
        </div>
      </div>
      <Suspense fallback={null}>
        <WelcomeModal />
      </Suspense>
      <Suspense fallback={null}>
        <WelcomeShareModal />
      </Suspense>
      <Suspense fallback={null}>
        <WelcomeDownload />
      </Suspense>
    </WelcomeProvider>
  );
};

export default Welcome;

// Animation config for left-to-right: display sequentially and loop
const l2rVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: [0, 1, 1, 0],
    scale: [0.5, 1, 1, 0.5],
    transition: {
      times: [0, 0.2, 0.8, 1],
      duration: 1.5,
      delay: i * 0.2,
      repeat: Infinity,
      repeatDelay: 0.3,
    },
  }),
};

// Animation config for right-to-left: display sequentially and loop
const r2lVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: [0, 1, 1, 0],
    scale: [0.5, 1, 1, 0.5],
    transition: {
      times: [0, 0.2, 0.8, 1],
      duration: 1.5,
      delay: (2 - i) * 0.2, // Reverse delay for right-to-left animation
      repeat: Infinity,
      repeatDelay: 0.3,
    },
  }),
};
