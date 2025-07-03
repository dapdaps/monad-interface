import { motion } from "framer-motion";
import clsx from 'clsx';
import ExtendDex from "@/components/extend-dex";
import dapps from "@/configs/swap";

export default function Bg(props: any) {
  const { className, isDex } = props;

  return (
    <div className={clsx("absolute left-[0px] top-[0px] w-full h-[calc(100vh-60px)] overflow-hidden", className)}>
      <motion.img
        animate={{ x: ["0%", "-105vw"] }}
        transition={{
          ease: "linear",
          duration: 30,
          repeat: Infinity
        }}
        src="/images/dex/car-l.gif"
        className="w-[164px] h-[80px] absolute top-[480px] z-[2] right-[-168px]"
      />
      <motion.img
        animate={{ x: ["0%", "105vw"] }}
        transition={{
          ease: "linear",
          duration: 30,
          repeat: Infinity
        }}
        src="/images/dex/car-r.gif"
        className="w-[164px] h-[80px] absolute top-[480px] z-[2] left-[-168px]"
      />
      <img
        src="/images/dex/p-1.gif"
        className="w-[74px] h-[100px] absolute top-[540px] z-[6] left-[44px]"
      />
      <motion.img
        animate={{ x: ["0%", "-110vw"] }}
        transition={{
          ease: "linear",
          duration: 20,
          repeat: Infinity,
          repeatDelay: 23
        }}
        src="/images/dex/p-2-1.gif"
        className="w-[74px] h-[100px] absolute top-[580px] z-[7] right-[-74px]"
      />
      <motion.img
        animate={{ x: ["0%", "110vw"] }}
        transition={{
          ease: "linear",
          duration: 20,
          repeat: Infinity,
          delay: 23,
          repeatDelay: 23
        }}
        src="/images/dex/p-2-2.gif"
        className="w-[74px] h-[100px] absolute top-[580px] z-[7] left-[-74px]"
      />
      <div className="bg-[url(/images/dex/bg.png)] w-full h-[374px] bg-center absolute top-[212px] z-[1]" />
      <div className="bg-[url(/images/dex/frames.png)] w-full h-[522px] bg-center absolute top-[78px] z-[5]" />
      <div className="bg-[url(/images/dex/floor.png)] w-full bg-no-repeat h-[302px] absolute top-[600px] bg-cover z-[1]" />

      {
        !!isDex && (
          <ExtendDex dapps={[
            // dapps.izumi,
            dapps.lfj,
            dapps.pancake,
            // dapps.openocean,
            dapps.uniswap,
            dapps.kuru
          ]} />
        )
      }

    </div>
  );
}
