import clsx from "clsx";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Pending = (props: any) => {
  const { className, isShowUFO } = props;
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") {
          return "";
        } else {
          return prev + ".";
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={clsx("flex flex-col justify-start items-center mt-[70px]", className)}>
      <motion.img
        src="/images/mainnet/arcade/guess-who/avatar-monster-pending.png"
        alt=""
        className="w-[201px] h-[150px] object-center object-contain shrink-0"
        animate={isShowUFO ? {
          rotateY: [0, 360, 720, 1080],
        } : { rotateY: 0 }}
        transition={isShowUFO ? {
          delay: 4,
          duration: 1.8,
        } : { duration: 0 }}
      />
      <div className="text-[#FFF] text-[32px] mt-[20px] text-center">
        Guess Who{dots}
      </div>
    </div>
  );
};

export default Pending;
