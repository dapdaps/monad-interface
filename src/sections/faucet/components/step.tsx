"use client";

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { EStatus, IStep } from '@/sections/faucet/config';
import { useEffect, useState } from 'react';

const StepList: IStep[] = [
  {
    value: 1,
    amount: 0.05,
    unit: '$MON',
    label: (
      <>
        <div className="text-white font-[500]">1</div>
        <div className="">GMonad</div>
      </>
    ),
    status: EStatus.Finished,
  },
  {
    value: 2,
    amount: 0.05,
    unit: '$MON',
    label: (
      <>
        <div className="text-white font-[500]">3</div>
        <div className="">GMonad</div>
      </>
    ),
    status: EStatus.Finished,
  },
  {
    value: 3,
    amount: 0.1,
    unit: '$MON',
    label: (
      <>
        <div className="text-white font-[500]">7</div>
        <div className="">GMonad</div>
      </>
    ),
    status: EStatus.Unfinished,
  },
  {
    value: 4,
    amount: 0.1,
    unit: '$MON',
    label: (
      <>
        <div className="">Every</div>
        <div className="text-white font-[500]">7</div>
        <div className="">GMonad</div>
      </>
    ),
    status: EStatus.Unfinished,
  },
];

const FaucetStep = (props: any) => {
  const { className } = props;

  const [current, setCurrent] = useState<IStep>();

  useEffect(() => {
    setCurrent(StepList[2]);
  }, []);

  return (
    <div className={clsx("w-full flex-1 flex items-center justify-between gap-[3px] pl-[53px] pr-[76px] text-[#A6A6DB] text-[12px] font-[300] font-Unbounded", className)}>
      {
        StepList.map((item, index) => (
          <>
            <Step key={`step-${index}`} item={item} current={current} />
            {
              index < StepList.length - 1 && (
                <div className="flex-1 h-[1px] border-t border-dashed border-t-[#7370C8]" />
              )
            }
          </>
        ))
      }
    </div>
  );
};

export default FaucetStep;

const ActiveStepPoint = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx("w-[27px] h-[27px] rounded-full overflow-hidden relative flex items-center justify-center", className)}>
      <motion.div
        className="absolute z-[1] w-[100%] h-[100%] rounded-full bg-[rgba(191,255,96,0.2)]"
        animate={{
          scale: [0.5556, 1, 0.5556],
          opacity: [1, 0, 0]
        }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity,
          times: [0, 0.95, 1],
        }}
      />
      <motion.div
        className="absolute z-[2] w-[100%] h-[100%] rounded-full bg-[rgba(191,255,96,0.2)]"
        animate={{
          scale: [0.5556, 1, 0.5556],
          opacity: [1, 0, 0]
        }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity,
          delay: 0.5,
          times: [0, 0.95, 1],
        }}
      />
      <motion.div className="absolute z-[3] w-[55.56%] h-[55.56%] rounded-full bg-[rgba(191,255,96,1)]" />
    </div>
  );
}

const StepPoint = (props: any) => {
  const { className, item } = props;

  return (
    <div className={clsx("w-[27px] h-[27px] rounded-full overflow-hidden flex justify-center items-center", className)}>
      <div className="w-[55.56%] h-[55.56%] rounded-full bg-[#7370C8] flex justify-center items-center">
        {
          item.status === EStatus.Finished && (
            <img src="/images/faucet/icon-check.svg" alt="" className="w-[10px] h-[8px]" />
          )
        }
      </div>
    </div>
  );
}

const Step = (props: any) => {
  const { className, item, current } = props;

  return (
    <div className={clsx("relative shrink-0 flex flex-col items-center justify-center", className)}>
      <div className="absolute top-[-13px] flex items-center justify-center gap-[4px]">
        <div className="text-white font-[500]">
          {item.amount}
        </div>
        <div className="">
          {item.unit}
        </div>
      </div>
      {
        current?.value === item.value ? (
          <ActiveStepPoint />
        ) : (
          <StepPoint item={item} />
        )
      }
      <div className="absolute bottom-[-13px] flex items-center justify-center gap-[4px]">
        {item.label}
      </div>
    </div>
  );
};
