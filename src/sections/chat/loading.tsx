"use client";

import clsx from 'clsx';
import StarFieldCanvas from '@/sections/home/StarrySky';
import { motion } from 'framer-motion';

const SCALE = 10;

const ChatLoading = (props: any) => {
  const { className, onComplete, delay = 0.6 } = props;

  return (
    <div className={clsx("relative w-full h-screen bg-[#000] overflow-hidden", className)}>
      <StarFieldCanvas className="!static !z-[0]" />
      <motion.img
        src="/images/chat/loading-bg.png"
        alt=""
        className="w-full h-full object-cover object-center left-0 top-0 absolute z-[1]"
        transition={{
          delay: delay,
          duration: SCALE,
          ease: "easeIn",
        }}
        initial={{
          scale: 1,
          x: 0,
          y: 0
        }}
        animate={{
          scale: SCALE,
          x: 0,
          y: "-62%",
        }}
        onAnimationComplete={onComplete}
      />
    </div>
  );
};

export default ChatLoading;
