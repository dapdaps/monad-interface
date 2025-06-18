import NFT from "@/components/nft";
import clsx from "clsx";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const DataOverrideMobile = (props: any) => {
  const { className, onLoginOut } = props;

  const titleRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
        className={clsx(
          "flex items-center gap-[5px] text-[#0F1] text-center [text-shadow:0px_0px_10px_rgba(191,255,96,0.60)] font-HackerNoonV2 text-[14px] font-normal leading-[90%]",
          className
        )}
      >
        <img
          src="/images/nft/data-override.gif"
          alt=""
          className="shrink-0 w-[26px] h-[26px] object-center object-contain -translate-y-[2px]"
        />
        <div className="w-[152px] shrink-0 overflow-hidden">
          <motion.div
            ref={titleRef}
            className="whitespace-nowrap w-[152px] flex items-center gap-[20px]"
            animate={{
              opacity: [1, 0.3, 1],
              x: [0, "calc(-100% - 20px)"]
            }}
            transition={{
              opacity: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              },
              x: {
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }
            }}
          >
            <div className="w-full shrink-0">DATA OVERRIDE</div>
            <div className="w-full shrink-0">DATA OVERRIDE</div>
          </motion.div>
        </div>
      </button>
      <NFT
        isOpen={isOpen}
        closeModal={() => {
          setIsOpen(false);
        }}
        className=""
        onLoginOut={onLoginOut}
        isHomepageLink={false}
        isShowCloseIcon={true}
        cardClassName="mx-auto"
        innerClassName="w-full justify-center"
        contentClassName="!bottom-[unset] !left-[unset]"
        style={{
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          zIndex: 121,
          right: "unset",
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)"
        }}
        isForceNormal={true}
      />
    </>
  );
};

export default DataOverrideMobile;
