import clsx from 'clsx';
import Big from 'big.js';
import { motion, useAnimate } from 'framer-motion';
import { useFaucetContext } from '@/sections/faucet/context';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const FaucetCheckCard = (props: any) => {
  const { className, item } = props;

  const { today, collectedToday } = useFaucetContext();
  const [target, animate] = useAnimate();

  useEffect(() => {
    const todayDate = dayjs(today).startOf("day").valueOf();
    if (collectedToday && todayDate === item.date) {
      animate(target.current, {
        rotateY: 180,
      }, {
        duration: 0.6,
        ease: "easeInOut"
      });
    }
  }, [collectedToday, today, item]);

  return (
    <div
      className={clsx(
        "relative flex justify-center items-center w-[63px] h-[62px] rounded-[6px] shadow-[0_0_10px_0_rgba(0,_0,_0,_0.05)] [perspective:1000px] group",
        className
      )}
    >
      <motion.div
        ref={target}
        className="relative w-full h-full [transform-style:preserve-3d]"
        style={{
          rotateY: !!item.checkin_date ? 180 : 0
        }}
      >
        <div
          className="absolute w-full h-full [backface-visibility:hidden] bg-no-repeat bg-center bg-[#3E347C] bg-[url('/images/faucet/icon-un-check-in.svg')] rounded-[6px]"
        />
        <div
          className={clsx(
            "flex justify-center items-center absolute w-full h-full bg-no-repeat bg-center [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[6px]",
            Big(item.reward_amount || 0).gt(0) ? "bg-[#BFFF60]" : "bg-[#836EF9] bg-[url('/images/faucet/icon-un-check-in.svg')]"
          )}
        >
          {
            !!item.checkin_date && (
              <>
                {
                  Big(item.reward_amount || 0).gt(0) ? (
                    <>
                      <div className="text-[#3E347C] text-[12px] font-Unbounded font-[500] text-center translate-y-2.5">
                        <div>{item.reward_amount}</div>
                        <div>MON</div>
                      </div>
                      <img src="/images/faucet/icon-coin.svg" alt="" className="absolute w-[36px] h-[36px] top-[-14px]" />
                    </>
                  ) : (
                    <div className="text-white text-[16px] font-Unbounded font-[500] opacity-30 text-center">
                      {item.checkin_sort}
                    </div>
                  )
                }
              </>
            )
          }
        </div>
      </motion.div>
    </div>
  );
};

export default FaucetCheckCard;
