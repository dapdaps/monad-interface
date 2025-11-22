"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface WelcomeProgressProps {
  progress?: number; // Progress value from 0 to 100
  totalSegments?: number; // Total number of segments (default: 20)
  className?: string;
  innerClassName?: string;
  contentClassName?: string;
  scaleClassName?: string;
}

const WelcomeProgress = (props: WelcomeProgressProps) => {
  const { progress = 0, totalSegments = 40, className, innerClassName, contentClassName, scaleClassName } = props;

  // Calculate how many segments should be filled
  const filledSegments = useMemo(() => {
    const percentage = Math.min(Math.max(progress, 0), 100);
    return Math.floor((percentage / 100) * totalSegments);
  }, [progress, totalSegments]);

  return (
    <div className={clsx("w-full px-[24px]", className)}>
      <div className={clsx("w-full border border-[#836EF9] bg-black/50 p-[3px]", innerClassName)}>
        <div className={clsx("w-full h-[20px] flex gap-1", contentClassName)}>
          {Array.from({ length: totalSegments }).map((_, index) => {
            const isFilled = index < filledSegments;
            return (
              <motion.div
                key={index}
                className={clsx("h-full flex-1 bg-[#836EF9]", scaleClassName)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isFilled ? 1 : 0,
                  scale: isFilled ? 1 : 0.8,
                }}
                transition={{
                  duration: 0.15,
                  delay: index * 0.005,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WelcomeProgress;
