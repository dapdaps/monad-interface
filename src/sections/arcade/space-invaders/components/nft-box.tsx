import clsx from "clsx";
import { motion } from "framer-motion";

const NftBox = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx("absolute z-[3] right-[1.5vw] bottom-[2.2vw] w-[5vw] h-[4.86vw]", className)}>
      <motion.img
        src="/images/arcade/space-invaders/reward-box.png"
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
      <motion.img
        src="/images/arcade/space-invaders/reward-nft-avatar.png"
        alt=""
        className="absolute right-[-5.4vw] top-0 w-[5.556vw] h-[5vw] object-center object-contain origin-left"
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
      />
    </div>
  );
};

export default NftBox;
