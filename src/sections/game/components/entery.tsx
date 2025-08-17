"use client"
import React from 'react';
import { LoginContainer } from '@/sections/terminal/login';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import HotGame from './hot';

const Entry: React.FC<any> = () => {
  const router = useRouter();
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

            {/* <motion.div
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
            </motion.div> */}

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
                2048 on MONAD
              </div>
              <img
                data-bp="1009-003"
                onClick={() => {
                  router.push("/arcade/2048");
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


