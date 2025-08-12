import clsx from "clsx";
import { motion } from "framer-motion";
import CalendarModal from "./modal";
import { useState } from "react";

const CalendarBanner = (props: any) => {
  const { className } = props;

  const [open, setOpen] = useState(false);

  return (
    <div className={clsx("absolute left-[clamp(calc(var(--nadsa-laptop-width-base)*-0.005),_-0.5vw,_1px)] bottom-[clamp(calc(var(--nadsa-laptop-width-base)*-0.10),_-10vw,_1px)]", className)}>
      <motion.img
        src="/images/game/calendar/all-in-banner.png"
        alt=""
        className="cursor-pointer shrink-0 object-center object-contain w-[clamp(1px,_15.42vw,_calc(var(--nadsa-laptop-width-base)*0.1542))] h-[clamp(1px,_10.76vw,_calc(var(--nadsa-laptop-width-base)*0.1076))]"
        style={{ transformOrigin: "center top" }}
        animate={{
          rotate: [0, 1, -0.5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          times: [0, 0.25, 0.75, 1],
        }}
        onClick={() => {
          setOpen(true);
        }}
      />
      <img
        src="/images/game/calendar/all-in-tape.png"
        alt=""
        className="absolute left-1/2 -translate-x-1/2 top-[clamp(calc(var(--nadsa-laptop-width-base)*-0.01),_-1vw,_1px)] z-[1] shrink-0 object-center object-contain w-[clamp(1px,_2.78vw,_calc(var(--nadsa-laptop-width-base)*0.0278))] h-[clamp(1px,_4.44vw,_calc(var(--nadsa-laptop-width-base)*0.0444))]"
      />
      <CalendarModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default CalendarBanner;
