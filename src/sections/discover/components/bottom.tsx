import { motion } from "framer-motion";

const Bottom = (props: any) => {
  const { } = props;

  return (
    <div className="flex justify-center items-end absolute z-[1] bottom-0 left-1/2 -translate-x-1/2 w-[clamp(1px,_81.61vw,_calc(var(--pc-1512)*0.8161))] h-[clamp(1px,_9.79vw,_calc(var(--pc-1512)*0.0979))]">
      <motion.img
        src="/images/mainnet/discover/bottom-circle-1.png"
        alt=""
        className="w-full h-full absolute z-[1] translate-y-[2px]"
        animate={{
          transform: ["translateY(2px)", "translateY(-5px)", "translateY(2px)"],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          delay: 2,
        }}
      />
      <motion.img
        src="/images/mainnet/discover/bottom-circle-2.png"
        alt=""
        className="w-[66.13%] h-[66.22%] absolute top-0 z-[2] translate-y-[5px]"
        animate={{
          transform: ["translateY(5px)", "translateY(-10px)", "translateY(5px)"],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          delay: 2,
        }}
      />
      <motion.img
        src="/images/mainnet/discover/bottom-circle-3.png"
        alt=""
        className="w-[34.93%] h-[29.73%] absolute top-0 z-[3] translate-y-[10px]"
        animate={{
          transform: ["translateY(10px)", "translateY(-20px)", "translateY(10px)"],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          delay: 2,
        }}
      />
    </div>
  );
};

export default Bottom;
