import Modal from "@/components/modal";
import { useNftStore } from "@/stores/nft";
import clsx from "clsx";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import WelcomeFooter from "./footer";

const WelcomeContent = lazy(() => import("./content"));

const WelcomeModal = (props: any) => {
  const { } = props;

  const { isWelcomeOpen, setWelcomeOpen } = useNftStore();

  return (
    <Modal
      open={isWelcomeOpen}
      onClose={() => {
        setWelcomeOpen(false);
      }}
      className="backdrop-blur-sm"
      isMaskClose={false}
      isShowCloseIcon={false}
    >
      <div className="relative w-[1023px] h-[740px] flex justify-center bg-[url('/images/mainnet/discover/welcome/welcome-card.png')] bg-no-repeat bg-center bg-contain">
        <div className="pointer-events-none w-[85%] h-[66.5%] overflow-hidden top-[15.5%] absolute z-[1] bg-[repeating-linear-gradient(to_bottom,_transparent_0px,_rgba(255,255,255,0.05)_1px,_transparent_2px,_rgba(255,255,255,0.05)_3px)]">
          <div className="absolute pointer-events-none z-[0] w-full left-0 h-full top-0 overflow-hidden">
            <motion.div
              className="absolute z-[0] pointer-events-none w-full h-[5px] left-0 top-0 opacity-10 bg-[linear-gradient(to_bottom,_transparent,_rgba(255,255,255,0.3),_transparent)]"
              animate={{
                transform: ["translateY(-100px)", "translateY(1000px)"],
              }}
              transition={{
                repeat: Infinity,
                duration: 10
              }}
            />
          </div>
          <div className="absolute pointer-events-none z-[0] w-[150%] left-[-25%] h-[150%] top-[-25%] overflow-hidden">
            <div className={clsx("noise pointer-events-none absolute z-[1] w-full left-0 h-full top-0 overflow-hidden", "opacity-[0.12]")}></div>
          </div>
        </div>
        <div
          className="absolute z-[2] w-[85%] h-[66.5%] top-[15.5%] text-[#BFFF60] font-[pixelmix] text-[14px] not-italic font-normal leading-[28px]"
        >
          <Suspense fallback={null}>
            <WelcomeContent />
          </Suspense>
        </div>
        <WelcomeFooter />
      </div>
    </Modal>
  );
};

export default WelcomeModal;
