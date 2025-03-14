import { motion, useAnimation } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { useSize } from "ahooks";


const getRandomDuration = () => Math.random() * 4 + 6;
const getRandomPosition = (size: any) => {
  const x = Math.random() * (size?.width - 23) + 12
  const y = Math.random() * (-46) + (size?.height - 3)
  return {
    x,
    y
  }
}

const Bubble = ({
  size
}: any) => {
  // const size = getRandomSize();

  const { x, y } = getRandomPosition(size)
  const duration = getRandomDuration();
  const controls = useAnimation();

  const variants = {
    initial: { opacity: 0, width: 0, height: 0, left: x, top: y },
    stage1: { opacity: 1, width: 6, height: 6 },
    stage2: { opacity: 0, width: 24, height: 24, left: x, y: 12 },
  };


  useEffect(() => {
    const sequence = async () => {
      await controls.start("stage1");
      console.log('====1111====')
      await controls.start("stage2");
    };
    sequence();
  }, [controls]);
  return (
    <motion.div
      className={`rounded-full absolute bg-white/10`}
      variants={variants}
      initial="initial"
      animate={controls}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      }}
    />
  );
};
export default memo(function jar() {
  const jarRef = useRef(null)
  const size = useSize(jarRef)


  return (
    <div className="w-[21.667vw] h-full flex flex-col items-center">
      <div className="relative z-10 w-[19.301vw] h-[10.833vw] bg-[url('/images/marketplace/jar_top.svg')] bg-center bg-contain bg-no-repeat">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[12.639vw] h-[2.639vw] flex items-center justify-center text-[#78FEFF] font-bold">
          Meme Coins
        </div>
      </div>
      <div ref={jarRef} className="-mt-[0.8vw] relative flex flex-col w-[18.194vw] flex-1 border border-black bg-black/50 shadow-[0_0_40px_20px_rgba(0,255,249,0.5)_inset] backdrop-blur-[5px]">
        <div
          className="flex-1"
          style={{
            background: "linear-gradient(180deg, rgba(191, 255, 96, 0.30) 0%, rgba(191, 255, 96, 0.00) 100%)"
          }}
        ></div>
        <img src="/images/marketplace/line.svg" alt="line" />
        <div className="flex-1"></div>
        <img src="/images/marketplace/line.svg" alt="line" />
        <div
          className="flex-1"
          style={{
            background: "linear-gradient(180deg, rgba(255, 80, 217, 0.00) 0%, rgba(255, 80, 217, 0.50) 100%)"
          }}
        ></div>

        {
          size && (
            <div className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none">
              {
                new Array(20).fill(null).map((_, index: number) => (
                  <Bubble key={index} size={size} />
                ))
              }
            </div>
          )
        }
      </div>
      <div className="w-full">
        <img className="w-full" src="/images/marketplace/jar_bottom.svg" alt="jar_bottom" />
      </div>
    </div>
  )
})
