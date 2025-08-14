import clsx from "clsx";
import { motion } from "framer-motion";
import { NFT_INFORMATIONS } from "../config";

const NftBox = (props: any) => {
  const { className, nft } = props;

  const nftInfo = NFT_INFORMATIONS[nft.category];

  return (
    <div className={clsx("absolute z-[3] right-[clamp(1px,_1.5vw,_calc(var(--nadsa-laptop-width)*0.015))] bottom-[clamp(1px,_2.2vw,_calc(var(--nadsa-laptop-width)*0.022))] w-[clamp(1px,_5.069vw,_calc(var(--nadsa-laptop-width)*0.05069))] h-[clamp(1px,_4.236vw,_calc(var(--nadsa-laptop-width)*0.04236))]", className)}>
      <motion.img
        src="/images/arcade/space-invaders/reward-box2.png"
        alt=""
        className="w-full h-full object-center object-contain flex-0"
        animate={{
          rotate: [0, 10, -10, 5, -5, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }}
      />
      <motion.div
        className="absolute flex justify-center items-center bg-[url('/images/arcade/space-invaders/bubbles.png')] bg-no-repeat bg-center bg-contain right-[clamp(calc(var(--nadsa-laptop-width)_*_-0.054),_-5.4vw,_1px)] top-0 w-[clamp(1px,_5vw,_calc(var(--nadsa-laptop-width)*0.05))] h-[clamp(1px,_5vw,_calc(var(--nadsa-laptop-width)*0.05))] object-center object-contain origin-left"
        animate={{
          rotate: [0, 5, -5, 2, -2, 0],
          scale: [1, 1.05, 1.1, 1.15, 1.1, 1],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }}
      >
        <img
          src={nftInfo?.avatar}
          alt=""
          className="rounded-full object-center object-cover w-[clamp(1px,_4vw,_calc(var(--nadsa-laptop-width)*0.04))] h-[clamp(1px,_4vw,_calc(var(--nadsa-laptop-width)*0.04))]"
          style={{
            transform: "translateX(clamp(1px, 0.22vw, calc(var(--nadsa-laptop-width)*0.0022))"
          }}
        />
      </motion.div>
    </div>
  );
};

export default NftBox;
