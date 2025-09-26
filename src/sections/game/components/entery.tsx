"use client"
import React from 'react';
import { LoginContainer } from '@/sections/terminal/login';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import HotGame from './hot';
import useIsMobile from '@/hooks/use-isMobile';
import AllInFire from '@/sections/arcade/space-invaders/components/all-in-fire';
import clsx from 'clsx';

const MobileCard = (props: any) => {
  const { className, containerClassName, isAllInFire, children, title, onClick, button } = props;

  return (
    <div className={clsx("relative", containerClassName)}>
      {
        isAllInFire && (
          <AllInFire className="right-0 top-[-28vw] z-[0]" />
        )
      }
      <div className={clsx("relative z-[1] w-full rounded-[20px] bg-[linear-gradient(180deg,_#78FEFF_15.67%,_#489899_100%)] p-[5px]", className)}>
        {children}
        <div className="flex justify-between items-center pt-[12px] pl-[10px] pr-[5px]">
          <div className="whitespace-nowrap font-[HackerNoonV2] [text-shadow:0_0_4px_rgba(255,_255,_255,_0.50)] text-[18px] font-[400] leading-[90%] text-white">
            {title}
          </div>
          <motion.button
            type="button"
            className="h-[44px] w-[98px] bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage: `url(${button})`,
            }}
            onClick={onClick}
            whileTap={{
              scale: 0.95,
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Entry: React.FC<any> = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="w-full h-[100dvh] bg-[#0E0F29]">
        <div className="mt-[20px] text-[#BFFF60] text-[20px] leading-[90%] font-[Unbounded] font-[900] text-center">
          Arcade
        </div>
        <div className="w-full pt-[46.41vw] flex flex-col gap-[38px] px-[15px]">
          <MobileCard
            isAllInFire={true}
            title="Space Invaders"
            onClick={() => {
              router.push("/arcade/space-invaders");
            }}
            button="/images/game/2048-start.svg"
          >
            <div className="relative">
              <img
                src="/images/game/space-invaders-mobile.png"
                alt=""
                className="w-full h-[182px] rounded-[16px] object-top object-cover shrink-0"
              />
              <motion.img
                src="/images/game/space-invaders-coins-mobile.png"
                alt=""
                className="pointer-events-none w-[98.72vw] min-w-[98.72vw] min-h-[54.36vw] h-[54.36vw] absolute left-[-4vw] top-[-2vw] rounded-[16px] object-top object-contain shrink-0"
                animate={{
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </div>
          </MobileCard>
          <MobileCard
            isAllInFire={true}
            className="bg-[linear-gradient(180deg,_#836EF9_0%,_#4D4193_100%)]"
            title="LUCKY 777"
            onClick={() => {
              router.push("/arcade/lucky777");
            }}
            button="/images/game/lucky-start.svg"
          >
            <div className="relative">
              <div className="w-full h-[182px] [clip-path:polygon(0_100%,_100%_100%,_100%_-50%,_0_-50%)] rounded-[16px] relative bg-black bg-[radial-gradient(50%_50%_at_50%_50%,_#BFFF60_0%,_#000_100%)]">
                <motion.img
                  src="/images/game/lucky7777.svg"
                  alt=""
                  className="pointer-events-none w-[100vw] min-w-[100vwvw] min-h-[70vw] h-[70vw] absolute left-[-4vw] top-[-2vw] rounded-[16px] object-top object-contain shrink-0"
                  animate={{
                    y: [0, -20, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </div>
              <motion.img
                src="/images/game/lucky777-coins-mobile.png"
                alt=""
                className="pointer-events-none w-[95.72vw] min-w-[95.72vw] min-h-[52.36vw] h-[52.36vw] absolute left-[-6vw] top-[8vw] rounded-[16px] object-top object-contain shrink-0"
                animate={{
                  y: [0, -15, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              />
            </div>
          </MobileCard>
          <MobileCard
            isAllInFire={false}
            className="bg-[linear-gradient(180deg,_#BFFF60_0%,_#739939_100%)]"
            title="RPS"
            onClick={() => {
              router.push("/arcade/rps");
            }}
            button="/images/game/2048-start.svg"
          >
            <div className="w-full h-[182px] [clip-path:polygon(0_100%,_100%_100%,_100%_-50%,_0_-50%)] rounded-[16px] relative bg-[url('/images/game/2048-banner-mobile.png')] bg-no-repeat bg-center bg-cover">
              <motion.img
                src="/images/game/2048.png"
                alt=""
                className="pointer-events-none w-[100vw] min-w-[100vwvw] min-h-[70vw] h-[70vw] absolute left-[-15vw] top-[-10vw] rounded-[16px] object-top object-contain shrink-0"
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
            </div>
          </MobileCard>
        </div>
        <div className="h-[40dvh] w-full pointer-events-none"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full  bg-no-repeat bg-cover bg-top">
      <LoginContainer>
        <div className='w-full h-full flex items-center justify-center flex-col'>
          <div className='relative z-[2] text-[clamp(1px,_2.92vw,_calc(var(--nadsa-laptop-width-base)*0.0292))] font-HackerNoonV2 text-[#E7E2FF]'>
            arcade
          </div>
          <div className='w-full flex items-center justify-center mt-[clamp(1px,_7vw,_calc(var(--nadsa-laptop-width-base)*0.07))] gap-[clamp(1px,_3.47vw,_calc(var(--nadsa-laptop-width-base)*0.0347))]'>

            <motion.div
              className="w-[clamp(1px,_25vw,_calc(var(--nadsa-laptop-width-base)*0.25))] h-[clamp(1px,_37.5vw,_calc(var(--nadsa-laptop-width-base)*0.375))] relative flex flex-col items-center justify-end"
              whileHover={{
                scale: 1.11,
              }}
            >
              <HotGame />
              <img src="/images/game/lucky-bg.svg" className='w-full h-full absolute top-0 left-0 ' />
              <motion.div
                className="w-[clamp(1px,_27.78vw,_calc(var(--nadsa-laptop-width-base)*0.2778))] h-[clamp(1px,_28.06vw,_calc(var(--nadsa-laptop-width-base)*0.2806))] absolute top-[clamp(1px,_2.08vw,_calc(var(--nadsa-laptop-width-base)*0.0208))] left-[clamp(calc(var(--nadsa-laptop-width-base)*-0.0347),_-3.47vw,_1px)] bg-[url('/images/game/lucky7777.svg')] bg-no-repeat bg-center bg-contain"
                animate={{
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="w-[clamp(1px,_9.79vw,_calc(var(--nadsa-laptop-width-base)*0.0979))] h-[clamp(1px,_37.05vw,_calc(var(--nadsa-laptop-width-base)*0.3705))] absolute z-[2] left-[clamp(calc(var(--nadsa-laptop-width-base)*-0.048),_-4.8vw,_1px)] top-[clamp(calc(var(--nadsa-laptop-width-base)*-0.01),_-1vw,_1px)] bg-[url('/images/game/lucky777-coins2.png')] bg-no-repeat bg-center bg-contain" />
              <div className="text-[clamp(1px,_1.53vw,_calc(var(--nadsa-laptop-width-base)*0.0153))] font-HackerNoonV2 text-[#E7E2FF] relative drop-shadow-[0px_0px_10px_#E7E2FF80]">LUCKY 777</div>
              <img
                data-bp="1009-002"
                onClick={() => {
                  router.push("/arcade/lucky777");
                }}
                src="/images/game/lucky-start.svg"
                className='w-[clamp(1px,_9.44vw,_calc(var(--nadsa-laptop-width-base)*0.0944))] relative z-[3] my-[clamp(1px,_1.39vw,_calc(var(--nadsa-laptop-width-base)*0.0139))] cursor-pointer hover:scale-110 transition-transform duration-200'
              />
              <Link href="/arcade/lucky777" prefetch={true}></Link>
            </motion.div>

            <motion.div
              className="w-[clamp(1px,_27.78vw,_calc(var(--nadsa-laptop-width-base)*0.2778))] h-[clamp(1px,_41.67vw,_calc(var(--nadsa-laptop-width-base)*0.4167))] relative flex flex-col items-center justify-end"
              whileHover={{
                scale: 1.11,
              }}
            >
              <HotGame />
              <img src="/images/game/space-invaders2.png" className='w-full h-full absolute top-0 left-0 ' />
              <motion.div
                className="w-[clamp(1px,_31.74vw,_calc(var(--nadsa-laptop-width-base)*0.3174))] h-[clamp(1px,_40.35vw,_calc(var(--nadsa-laptop-width-base)*0.4035))] absolute z-[2] top-[clamp(calc(var(--nadsa-laptop-width-base)*-0.02),_-2vw,_1px)] right-[clamp(calc(var(--nadsa-laptop-width-base)*-0.03),_-3vw,_1px)] bg-[url('/images/game/space-invaders-coins2.png')] bg-no-repeat bg-center bg-contain"
                animate={{
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
              <div className="text-[clamp(1px,_1.53vw,_calc(var(--nadsa-laptop-width-base)*0.0153))] font-HackerNoonV2 text-[#E7E2FF] relative drop-shadow-[0px_0px_10px_#E7E2FF80]">
                Space Invaders
              </div>
              <img
                data-bp="1009-004"
                onClick={() => {
                  router.push("/arcade/space-invaders");
                }}
                src="/images/game/2048-start.svg"
                className='w-[clamp(1px,_9.44vw,_calc(var(--nadsa-laptop-width-base)*0.0944))] relative z-[3] my-[clamp(1px,_1.39vw,_calc(var(--nadsa-laptop-width-base)*0.0139))] cursor-pointer hover:scale-110 transition-transform duration-200'
              />
              <Link href="/arcade/space-invaders" prefetch={true}></Link>
            </motion.div>

            <motion.div
              className='w-[clamp(1px,_25vw,_calc(var(--nadsa-laptop-width-base)*0.25))] h-[clamp(1px,_37.5vw,_calc(var(--nadsa-laptop-width-base)*0.375))] relative flex flex-col items-center justify-end'
              whileHover={{
                scale: 1.11,
              }}
            >
              <img src="/images/game/2048-bg.svg" className='w-full h-full object-cover absolute top-0 left-0' />
              <motion.div
                className="bg-[url('/images/game/2048.png')] bg-no-repeat bg-center bg-contain w-[clamp(1px,_20vw,_calc(var(--nadsa-laptop-width-base)*0.20))] h-[clamp(1px,_26.94vw,_calc(var(--nadsa-laptop-width-base)*0.2694))] absolute top-[clamp(1px,_2.78vw,_calc(var(--nadsa-laptop-width-base)*0.0278))] left-[clamp(1px,_4.17vw,_calc(var(--nadsa-laptop-width-base)*0.0417))]"
                animate={{
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="w-[clamp(1px,_10.97vw,_calc(var(--nadsa-laptop-width-base)*0.1097))] h-[clamp(1px,_33.54vw,_calc(var(--nadsa-laptop-width-base)*0.3354))] absolute top-[clamp(calc(var(--nadsa-laptop-width-base)*-0.0278),_-2.78vw,_1px)] right-[clamp(calc(var(--nadsa-laptop-width-base)*-0.04),_-4vw,_1px)] bg-[url('/images/game/2048-coins.png')] bg-no-repeat bg-contain bg-center" />
              <div className="text-[clamp(1px,_1.53vw,_calc(var(--nadsa-laptop-width-base)*0.0153))] font-HackerNoonV2 text-[#E7E2FF] relative drop-shadow-[0px_0px_10px_#E7E2FF80]">
                RPS
              </div>
              <img
                data-bp="1009-003"
                onClick={() => {
                  router.push("/arcade/rps");
                }}
                src="/images/game/2048-start.svg"
                className='w-[clamp(1px,_9.44vw,_calc(var(--nadsa-laptop-width-base)*0.0944))] relative my-[clamp(1px,_1.39vw,_calc(var(--nadsa-laptop-width-base)*0.0139))] cursor-pointer hover:scale-110 transition-transform duration-200'
              />
              <Link href="/arcade/2048" prefetch={true}></Link>
            </motion.div>

          </div>
        </div>
      </LoginContainer>
    </div>
  );
};

export default Entry;

