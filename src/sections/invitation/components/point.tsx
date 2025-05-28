import clsx from "clsx";
import { motion } from "framer-motion";

const Point = (props: any) => {
  const { delay = 0, className } = props;

  return (
    <motion.div
      className={clsx("w-[2.564px] h-[2.564px] shrink-0 rounded-full bg-[#78FEFF] shadow-[0px_0px_4px_0px_#A5FFFD]", className)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10, delay, repeat: Infinity, repeatDelay: 3 }}
    />
  );
};

export default Point;
