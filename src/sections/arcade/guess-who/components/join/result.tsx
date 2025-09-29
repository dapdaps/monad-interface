import { useDebounceFn } from "ahooks";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Result = (props: any) => {
  const { className, monster } = props;

  return (
    <div className={clsx("flex flex-col justify-start items-center mt-[70px]", className)}>
      <img
        src={monster.avatar}
        alt=""
        className="w-[201px] h-[150px] object-center object-contain shrink-0"
      />
      <div className="text-[#FFF] text-[32px] mt-[20px] text-center">
        {monster.name}
      </div>
    </div>
  );
};

export default Result;

export const ResultUFO = (props: any) => {
  const { onClose } = props;

  const { run: onCloseDelay } = useDebounceFn(() => {
    onClose();
  }, { wait: 5000 });

  useEffect(() => {
    onCloseDelay();
  }, []);

  return (
    <motion.div
      className="w-[540px] h-[172px] origin-left top-0 left-0 absolute bg-[url('/images/mainnet/arcade/guess-who/ufo4.png')] bg-no-repeat bg-center bg-contain"
      initial={{
        scale: 0.35,
        rotate: -22,
        x: -50,
        y: -120,
        opacity: 0,
      }}
      animate={{
        opacity: [0, 1, 1, 1, 1],
        scale: [0, 0.35, 0.5, 0.7, 1],
        rotate: [-22, 10, -10, 5, 16],
        x: [-50, 0, 50, 100, 200],
        y: [-120, -100, -150, -100, -150],
      }}
      transition={{
        times: [0, 0.1, 0.3, 0.5, 1],
        duration: 3,
        ease: "linear",
        delay: 1,
      }}
      exit={{
        scale: 0,
      }}
    >
      <motion.img
        src="/images/mainnet/arcade/guess-who/ufo-light2.png"
        alt=""
        className="w-[417px] h-[598px] object-top object-contain shrink-0 translate-x-[5px] translate-y-[140px] rotate-[-15deg]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 4,
          type: "spring",
          stiffness: 200,
          damping: 10,
        }}
      />
    </motion.div>
  );
};
