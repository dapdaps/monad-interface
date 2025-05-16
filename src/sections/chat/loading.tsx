"use client";

import clsx from "clsx";
import StarFieldCanvas from "@/sections/home/StarrySky";
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { LoginContainer } from '@/sections/chat/login';

const SCALE = 10;
// loading timeout is 13 s (include animation duration)
const TIMEOUT = 13000;

const ChatLoading = (props: any, ref: any) => {
  const { className, onComplete } = props;

  const [boatRef, boatAnimation] = useAnimate();
  const [boatDone, setBoatDone] = useState(false);

  const { run: onCompleteBoat } = useDebounceFn(() => {
    setBoatDone(true);
  }, { wait: 1000 });
  const { run: onCompleteAnimate } = useDebounceFn(() => {
    onComplete?.();
  }, { wait: 1300 });
  const { run: onCompleteAnimateTimeout } = useDebounceFn(() => {
    console.log('timeout...');
    setBoatDone(true);
    const timer = setTimeout(() => {
      setBoatDone(true);
      clearTimeout(timer);
      onComplete?.();
    }, TIMEOUT - SCALE * 1000);
  }, { wait: SCALE * 1000 });

  const onFast = () => {
    boatAnimation(boatRef.current, {
      scale: SCALE,
      x: 0,
      y: "-62%"
    }, {
      duration: 1,
      ease: "easeIn",
    });
    onCompleteBoat();
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
    <AnimatePresence>
      {
        !boatDone ? (
          <AnimateOpacityContainer
            key="boat"
            className={clsx(
              "fixed left-0 top-0 w-screen h-screen bg-[#000] overflow-hidden z-[10] cursor-pointer terminal",
              className
            )}
          >
            <StarFieldCanvas className="!static !z-[0]" />
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
        ) : (
          <AnimateOpacityContainer
            key="title"
            className={clsx(
              "fixed left-0 top-0 w-screen h-screen bg-[#000] overflow-hidden z-[10] cursor-pointer terminal",
              className
            )}
          >
            <LoginContainer className="!static">
              <div className="flex flex-col items-center !w-[1202px] mx-auto">
                <div className="w-full flex">
                  <img src="/images/logo-white.svg" alt="" className="mt-[163px] w-[147px] h-[40px] object-center object-contain pointer-events-none shrink-0" />
                </div>
                <img src="/images/chat/loading-title.png" alt="" className="mt-[26px] w-full h-[442px] object-center object-contain pointer-events-none shrink-0" />
              </div>
            </LoginContainer>
          </AnimateOpacityContainer>
        )
      }
    </AnimatePresence>
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
