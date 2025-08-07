import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";

const Accordion = (props: any) => {
  const { className, label, children, contentClassName, labelClassName } = props;

  const [expand, setExpand] = useState(false);

  return (
    <div
      className={clsx(
        "w-full rounded-[6px] border border-[#7370C8] bg-[rgba(14,15,41,0.30)] text-white font-[DelaGothicOne] text-[16px] font-normal leading-[100%]",
        className
      )}
    >
      <div
        className={clsx("w-full flex justify-between items-center gap-[10px] p-[12px_15px_12px_10px] cursor-pointer", labelClassName)}
        onClick={() => {
          setExpand(!expand);
        }}
      >
        <div className="">
          {label}
        </div>
        <IconArrow expand={expand} />
      </div>
      <motion.div
        className={clsx("w-full overflow-hidden px-[10px] text-[#A6A6DB] font-[SpaceGrotesk] text-[16px] font-normal leading-[120%]", contentClassName)}
        initial={{
          height: 0,
        }}
        animate={{
          height: expand ? "auto" : 0,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Accordion;

const IconArrow = (props: any) => {
  const { className, expand } = props;

  return (
    <motion.svg
      className={clsx("shrink-0 w-[15px] h-[15px]", className)}
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{
        rotate: 0,
      }}
      animate={{
        rotate: expand ? 180 : 0,
      }}
    >
      <motion.path
        d="M6.5 12L12.9952 0.75H0.00480938L6.5 12Z"
        animate={{
          fill: expand ? "#BFFF60" : "#7370C8",
        }}
      />
    </motion.svg>
  );
};
