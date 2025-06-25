"use client"
import React from 'react';
import { LoginContainer } from '@/sections/terminal/login';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Entry: React.FC<any> = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full  bg-no-repeat bg-cover bg-top">
      <LoginContainer>
        <div className='w-full h-full flex items-center justify-center flex-col'>
          <div className='text-[42px] font-HackerNoonV2 text-[#E7E2FF] mb-[60px]'>arcade</div>
          <div className='w-full flex items-center justify-center gap-[105px]'>
            <div className='w-[400px] h-[600px] relative flex flex-col items-center justify-end'>
              <img src="/images/game/lucky-bg.svg" className='w-full h-full absolute top-0 left-0 ' />
              <motion.img
                src="/images/game/lucky7777.svg"
                className='w-[466px] absolute top-[30px] left-[-50px] max-w-[466px]'
                animate={{
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <img src="/images/game/lucky-coin.svg" className='w-[533px] absolute top-[-20px] left-[-100px] max-w-[533px]' />
              <div className="text-[22px] font-HackerNoonV2 text-[#E7E2FF] relative drop-shadow-[0px_0px_10px_#E7E2FF80]">LUCKY 777</div>
              <img data-bp="1009-002" onClick={() => {
                router.push("/lucky777");
              }} src="/images/game/lucky-start.svg" className='w-[136px] relative my-[20px] cursor-pointer hover:scale-110 transition-transform duration-200' />
              <Link href="/lucky777" prefetch={true}></Link>
            </div>
            <div className='w-[400px] h-[600px] relative flex flex-col items-center justify-end'>
              <img src="/images/game/2048-bg.svg" className='w-full h-full object-cover absolute top-0 left-0' />
              <motion.img
                src="/images/game/2048.png"
                className='w-[330px] absolute top-[40px] left-[60px]'
                animate={{
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <img src="/images/game/2048-coin.png" className='w-[513px] absolute top-[-30px] left-[-50px] max-w-[513px]' />
              <div className="text-[22px] font-HackerNoonV2 text-[#E7E2FF] relative drop-shadow-[0px_0px_10px_#E7E2FF80]">2048 on MONAD</div>
              {/* <img data-bp="1009-003" onClick={() => {
                router.push("/2048");
              }} src="/images/game/2048-start.svg" className='w-[136px] relative my-[20px] cursor-pointer hover:scale-110 transition-transform duration-200' />
              <Link href="/2048" prefetch={true}></Link> */}
              <img src="/images/game/2048-start-disabled.svg" className='w-[157px] relative mt-[20px] mb-[30px]' />
            </div>
          </div>
        </div>
      </LoginContainer>
    </div>
  );
};

export default Entry;


