import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function NftT(props: any) {
  const { monadverse, monadoon, slmnd } = props;
  const nfts = [
    { key: "monadverse", data: monadverse, img: "/images/lucky777/nft-monadverse-t.png", cls: 'rotate-[-2deg]' },
    { key: "monadoon", data: monadoon, img: "/images/lucky777/nft-monadoon-t.png", cls: 'rotate-[2deg]' },
    { key: "slmnd", data: slmnd, img: "/images/lucky777/nft-slmnd-t.png", cls: 'rotate-[0deg]' },
  ].filter(nft => Number(nft.data?.remaining) > 0);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (nfts.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex(i => (i + 1) % nfts.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [nfts.length]);

  if (nfts.length === 0) {
    return null;
  }

  return (
    <div className='absolute bottom-[70px] left-[40px] z-[2] w-[137px] h-[180px]'>
      {
        nfts.map((nft, index) => (
          <div
            key={nft.key}
            className='absolute w-full h-full left-0 top-0'
          >
            {
              nfts.length > 1 && (
                nfts.map((nft, index) => (
                  <img src={nft.img} alt="" className={clsx('w-[127px] absolute top-0 left-0 h-[175px]', nft.cls)} />
                ))
              )
            }
            {/* <img src='/images/lucky777/t-bg.png' alt="" className={clsx('w-[137px] absolute top-0 left-0 h-[180px]')} /> */}
            <img src={nfts[currentIndex].img} alt="" className={clsx('w-[127px] absolute top-0 left-0 h-[175px]', nfts[currentIndex].cls)} />
          </div>
        ))
      }
      <AnimatePresence mode="wait">
        {nfts.length > 0 && (
          <motion.div
            key={nfts[currentIndex].key}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='absolute w-full h-full left-0 top-0'
          >
            <img src={nfts[currentIndex].img} alt="" className={clsx('w-[127px] absolute top-0 left-0', nfts[currentIndex].cls, nfts[currentIndex].key === 'monadoon' ? 'h-[175px]' : 'h-[175px]')} />
            <div className="absolute right-[30px] bottom-[75px] font-Montserrat text-[14px] font-bold italic text-white rotate-[-5deg] drop-shadow-[2px_2px_0_#000] [text-shadow:0_0_2px_#000,1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000]">
              {nfts[currentIndex].data.remaining}/{nfts[currentIndex].data.total}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <img src="/images/lucky777/nft-t.png" alt="" className='z-[10] w-[27] h-[33px] absolute top-0 left-[45px]' />
    </div>
  );
}