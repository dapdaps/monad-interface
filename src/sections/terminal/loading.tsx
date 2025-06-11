"use client";

import clsx from "clsx";
import { motion, useAnimate } from 'framer-motion';
import React, { useEffect, useImperativeHandle } from 'react';
import { useDebounceFn } from 'ahooks';
import Starfield from "../home/Starfield";

const SCALE = 10;
// loading timeout is 13 s (include animation duration)
const TIMEOUT = 13000;

const ChatLoading = (props: any, ref: any) => {
  const { className, onComplete } = props;

  const [boatRef, boatAnimation] = useAnimate();

  const { run: onCompleteAnimate } = useDebounceFn(() => {
    onComplete?.();
  }, { wait: 1000 });
  const { run: onCompleteAnimateTimeout } = useDebounceFn(() => {
    console.log('timeout...');
    onComplete?.();
  }, { wait: TIMEOUT });

  const onFast = () => {
    boatAnimation(boatRef.current, {
      scale: SCALE,
      x: 0,
      y: "-62%"
    }, {
      duration: 1,
      ease: "easeIn",
    });
    onCompleteAnimate();
  };

  useImperativeHandle(ref, () => ({
    onFast,
    boatRef,
    boatAnimation,
  }));

  useEffect(() => {
    onCompleteAnimateTimeout();
  }, []);

  return (
    <AnimateOpacityContainer
      key="boat"
      className={clsx(
        "fixed left-0 top-0 w-screen h-screen bg-[#000] overflow-hidden z-[10] cursor-pointer terminal",
        className
      )}
    >
      <Starfield className="!static !z-[0]" />
      <motion.img
        ref={boatRef}
        src="/images/chat/loading-bg.png"
        alt=""
        className="w-full h-full object-cover object-center left-0 top-0 absolute z-[1]"
        transition={{
          delay: 0.1,
          duration: SCALE,
          ease: "easeIn"
        }}
        initial={{
          scale: 1,
          x: 0,
          y: 0
        }}
        animate={{
          scale: SCALE,
          x: 0,
          y: "-62%"
        }}
      />
    </AnimateOpacityContainer>
  );
};

export default React.forwardRef(ChatLoading);

export const AnimateOpacity = {
  initial: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const AnimateOpacityContainer = (props: any) => {
  const { children, className } = props;

  return (
    <motion.div
      className={className}
      {...AnimateOpacity}
    >
      {children}
    </motion.div>
  );
};
