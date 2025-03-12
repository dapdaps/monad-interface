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
    <div className="w-full h-[100dvh] relative overflow-hidden">
      <div
        className="absolute left-0 bottom-0 w-full bg-[url(/images/monad/background/bg1.svg)] bg-no-repeat bg-contain 
                        h-[calc(735/14.4*var(--rem))]"
      >
        <div className="relative w-full h-full">
          {/* faucet */}
          <div className="absolute left-[calc(25/14.4*var(--rem))] bottom-[calc(410/14.4*var(--rem))] w-[380px] h-[463px] bg-no-repeat bg-contain bg-[url(/images/monad/entry/faucet.svg)]"></div>
          {/* yapper */}
          <div className="absolute right-[calc(200/14.4*var(--rem))] -top-[calc(80/14.4*var(--rem))] w-[446px] h-[324px] bg-no-repeat bg-contain bg-[url(/images/monad/entry/yapper.svg)]">
            <div className="w-full h-full relative">
              <div className="absolute w-[290px] h-[265px] left-1/2 -translate-x-1/2 top-[-38px]">
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
          <div className="absolute left-[410px] bottom-[284px] w-[514px] h-[330px] bg-no-repeat bg-contain bg-[url(/images/monad/entry/data.svg)]"></div>
          {/* dapps */}
          <div className="absolute right-0 bottom-0 w-[513px] h-[445px] bg-no-repeat bg-contain bg-[url(/images/monad/entry/dapps.svg)]">
            <div className="relative w-full h-full">
              <div
                style={{
                  clipPath: `path('M110.595 0.119507C89.3718 2.47753 31.6346 1.10202 22.3002 0.119507L4.9823 21.1207V57.5964L22.3002 79.3344C39.397 80.2187 97.5763 79.7028 107.648 79.3344L124.966 57.5964V21.1207L110.595 0.119507Z')`,
                }}
                className="absolute left-[218px] top-[168px] w-[129px] px-[16px] h-[79px] overflow-hidden flex items-center justify-center"
              >
                <div className="w-[119px] overflow-hidden">
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
                        <div className="truncate text-[10px] text-center font-[900] leading-[9px]">
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
          <div className="absolute left-[100px] bottom-0 w-[514px] h-[444px] bg-no-repeat bg-contain bg-[url(/images/monad/entry/tokens.svg)]"></div>
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
