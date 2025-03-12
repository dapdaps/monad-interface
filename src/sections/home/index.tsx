import { motion } from "framer-motion";

const itemWidth = 51;
const itemGap = 6;

const Home = () => {
  // 定义多个 dapp 项
  const dappItems = [
    { name: "Lynx", icon: "/images/monad/dapps/lynx.svg" },
    { name: "DapDap", icon: "/images/monad/dapps/lynx.svg" },
    { name: "Monad", icon: "/images/monad/dapps/lynx.svg" },
    { name: "DEX", icon: "/images/monad/dapps/lynx.svg" },
  ];

  const duplicateFunc = (items: typeof dappItems, times: number = 2) => {
    return Array(times).fill(items).flat();
  };

  const duplicatedDappItems = duplicateFunc(dappItems);

  const totalItemWidth = dappItems.length * (itemWidth + itemGap) - itemGap;
  return (
    <div className="w-full h-[calc(100dvh-68px)] relative overflow-hidden">
      <div
        className="absolute left-0 bottom-0 w-full bg-[url(/images/monad/background/bg1.svg)] bg-no-repeat bg-contain 
                        h-[calc(635/14.4*var(--rem))]"
      >
        <div className="relative w-full h-full">
          {/* faucet */}
          <div className="absolute left-[calc(70/14.4*var(--rem))] bottom-[calc(344/14.4*var(--rem))] w-[calc(380/14.4*var(--rem))] h-[calc(463/14.4*var(--rem))] bg-no-repeat bg-contain bg-[url(/images/monad/entry/faucet.svg)]"></div>
          {/* yapper */}
          <div className="absolute right-[calc(240/14.4*var(--rem))] -top-[calc(112/14.4*var(--rem))] w-[calc(446/14.4*var(--rem))] h-[calc(324/14.4*var(--rem))] bg-no-repeat bg-contain bg-[url(/images/monad/entry/yapper.svg)]">
            <div className="w-full h-full relative">
              <div className="absolute w-[calc(290/14.4*var(--rem))] h-[calc(265/14.4*var(--rem))] left-1/2 -translate-x-1/2 top-[-38px]">
                <motion.div
                  animate={{ rotate: [-10, 10] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    transformOrigin: "center bottom",
                  }}
                  className="relative w-full h-full bg-no-repeat bg-contain bg-[url(/images/monad/entry/radar.svg)]"
                ></motion.div>
              </div>
            </div>
          </div>
          {/* data */}
          <div className="absolute left-[calc(450/14.4*var(--rem))] bottom-[calc(235/14.4*var(--rem))] w-[calc(514/14.4*var(--rem))] h-[calc(330/14.4*var(--rem))] bg-no-repeat bg-contain bg-[url(/images/monad/entry/data.svg)]"></div>
          {/* dapps */}
          <div className="absolute right-[-10px] bottom-[calc(83/14.4*var(--rem))] w-[calc(513/14.4*var(--rem))] h-[calc(445/14.4*var(--rem))] bg-no-repeat bg-contain bg-[url(/images/monad/entry/dapps.svg)]">
            <div className="relative w-full h-full">
              <div
                style={{
                  clipPath: `path('M92.4244 0C73.8511 2.07096 23.324 0.862899 15.1553 0L0 18.4445V50.4796L15.1553 69.5712C30.117 70.3478 81.0311 69.8948 89.8447 69.5712L105 50.4796V18.4445L92.4244 0Z')`,
                }}
                className="absolute left-[calc(202/14.4*var(--rem))] top-[calc(147/14.4*var(--rem))] w-[calc(105/14.4*var(--rem))] h-[calc(70/14.4*var(--rem))] overflow-hidden flex items-center justify-center"
              >
                <div className="w-[calc(105/14.4*var(--rem))]] overflow-hidden">
                  <motion.div
                    className="w-full flex gap-[6px] items-center"
                    style={{ width: `${totalItemWidth * 2}px` }}
                    animate={{
                      x: [0, -totalItemWidth],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "linear",
                    }}
                  >
                    {duplicatedDappItems.map((item, index) => (
                      <div
                        key={`dapp-${index}`}
                        className="flex-shrink-0 w-[51px] h-[60px] rounded-[10px] border border-black bg-[#A5FFFD] flex flex-col gap-[5px] items-center justify-center"
                      >
                        <img
                          className="w-[33px] h-[32px]"
                          src={item.icon}
                          alt={item.name}
                        />
                        <div className="truncate font-Unbounded text-[10px] text-center font-[900] leading-[9px]">
                          {item.name}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          {/* tokens */}
          <div className="absolute left-[calc(150/14.4*var(--rem))] bottom-[calc(78/14.4*var(--rem))] w-[calc(514/14.4*var(--rem))] h-[calc(444/14.4*var(--rem))] bg-no-repeat bg-contain bg-[url(/images/monad/entry/tokens.svg)]"></div>
        </div>
      </div>
      <div
        className="absolute left-0 bottom-0 w-full bg-[url(/images/monad/background/bg2.svg)] bg-no-repeat bg-contain 
                        h-[calc(382/14.4*var(--rem))]"
      ></div>
    </div>
  );
};
export default Home;


