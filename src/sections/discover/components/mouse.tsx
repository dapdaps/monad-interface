import clsx from "clsx";
import { motion } from "framer-motion";

const Mouse = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx("w-[24px] h-[46px] border border-white/30 rounded-[12px] bg-[rgba(25,25,26,0.60)] backdrop-blur-[15px] shrink-0 flex justify-center items-start pt-[10px]", className)}>
      <motion.div
        className="w-[3px] h-[11px] rounded-[1.5px] bg-white"
        animate={{
          transform: ["translateY(0px)", "translateY(8px)", "translateY(0px)"],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
      >
      </motion.div>
    </div>
  );
};

export default Mouse;
