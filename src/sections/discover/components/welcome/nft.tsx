import { BoosterItems } from "@/sections/ranking/config";
import clsx from "clsx";
import { useEffect, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { DownloadDuration } from "./config";
import WelcomeDownloadTerminal from "./download-terminal";
import { numberFormatter } from "@/utils/number-formatter";
import { useNftStore } from "@/stores/nft";
import useCustomAccount from "@/hooks/use-account";

// 3D Tilt Wrapper Component using Framer Motion
const useTilt3D = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseLeave,
  };
};

// 3D Tilt Card Component for closed state
const TiltCard = ({ item }: { item: any }) => {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt3D();

  return (
    <motion.div
      className="w-[169px] h-[139px] px-[30px] pt-[30px] text-[#B9ACFF] text-center [text-shadow:0_0_30px_#836EF9] font-Pixelmix uppercase text-[12px] not-italic font-normal leading-[120%] flex justify-center items-center bg-no-repeat bg-center bg-contain shrink-0 bg-[url('/images/mainnet/discover/welcome/folder.png')]"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {item.name}
    </motion.div>
  );
};

// 3D Tilt Card Component for opened state
const OpenedTiltCard = ({ item }: { item: any }) => {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt3D();

  return (
    <motion.div
      className="relative w-[150px] h-[112px] bg-center bg-contain bg-no-repeat shrink-0"
      style={{
        backgroundImage: `url("${item.icon}")`,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className={clsx(
          "w-[60px] h-[60px] right-[-20px] bottom-[-10px] font-Oxanium flex justify-center items-center text-[#BFFF60] text-[14px] font-[600] leading-[100%] bg-[url('/images/wallet/ranking/boost-bg.png')] bg-no-repeat bg-center bg-contain absolute",
          item.key === "golden" ? "translate-x-[-5px]" : "",
          item.key === "sequence" ? "translate-x-[-30px]" : "",
        )}
      >
        {numberFormatter(item.boost, 2, true, { prefix: "+" })}%
      </div>
    </motion.div>
  );
};

const WelcomeNft = (props: any) => {
  const { bonus } = props;

  const { account } = useCustomAccount();
  const { setWelcomeDownloadMap, getWelcomeDownloadMap } = useNftStore();

  const terminalRef = useRef<any>(null);
  const downloadTimerRef = useRef<any>({});

  const [validBonus, validBonusList] = useMemo(() => {
    let _bonus: any = {};
    const _bonusList: any = [];
    Object.entries(bonus ?? {}).forEach(([key, value]) => {
      if (!/_rp$/.test(key)) {
        if (value === true) {
          _bonus[key] = value;
          _bonus[`${key}_rp`] = bonus[`${key}_rp`];
          const curr = BoosterItems.find((it) => it.key === key);
          _bonusList.push({
            ...curr,
            rp: bonus[`${key}_rp`],
          });
          return;
        }
      }
    });
    return [_bonus, _bonusList.sort((a: any, b: any) => a.sort - b.sort)];
  }, [bonus]);

  const onDownload = (bonu: any) => {
    if (getWelcomeDownloadMap(account)?.[bonu.key]?.loading || getWelcomeDownloadMap(account)?.[bonu.key]?.opened) {
      return;
    }
    setWelcomeDownloadMap?.(account, bonu.key, { key: bonu.key, loading: true, opened: false, timestamp: Date.now() });
    terminalRef.current.onDownload(bonu);

    downloadTimerRef.current[bonu.key] = setTimeout(() => {
      setWelcomeDownloadMap?.(account, bonu.key, { key: bonu.key, loading: false, opened: true, timestamp: Date.now() });
    }, DownloadDuration);
  };

  useEffect(() => {
    return () => {
      for (const key in downloadTimerRef.current) {
        clearTimeout(downloadTimerRef.current[key]);
        delete downloadTimerRef.current[key];
      }
    };
  }, []);

  return (
    <>
      <div className="w-full px-[24px] mt-[170px]">
        <div className="w-full border-t border-b border-dashed border-[#6750FF] py-[10px]">
          <div className="w-full h-[200px] p-[14px_23px_12px] bg-black/50 border-t border-b border-dashed border-[#6750FF] flex justify-center items-center">
            <div
              className={clsx(
                "w-full grid gap-[0px]",
                validBonusList.length === 3 ? "grid-cols-3" : "",
                validBonusList.length === 2 ? "grid-cols-2" : "",
                validBonusList.length === 1 ? "grid-cols-1" : "",
              )}
            >
              {
                validBonusList.map((item: any, index: number) => {
                  const isOpened = getWelcomeDownloadMap(account)?.[item.key]?.opened;
                  return (
                    <div
                      key={index}
                      className={clsx(
                        "w-full h-full justify-center flex flex-col items-center gap-[0px]",
                        index !== 0 ? "border-l border-dashed border-[#836EF9]" : "",
                      )}
                      style={{ perspective: "1000px" }}
                    >
                      {
                        isOpened ? (
                          <OpenedTiltCard item={item} />
                        ) : (
                          <TiltCard item={item} />
                        )
                      }
                      {
                        isOpened ? (
                          <div className="text-[#BFFF60] text-[20px] leading-[200%]">
                            {numberFormatter(item.rp, 2, true, { prefix: "+" })} RP
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="w-[137px] h-[42px] disabled:opacity-50 disabled:!cursor-not-allowed shrink-0 text-[14px] text-black mt-[0px] flex justify-center items-center bg-no-repeat bg-center bg-contain bg-[url('/images/mainnet/discover/welcome/button-card-2.png')]"
                            disabled={getWelcomeDownloadMap(account)?.[item.key]?.loading}
                            onClick={() => {
                              onDownload(item);
                            }}
                          >
                            {getWelcomeDownloadMap(account)?.[item.key]?.loading ? "Downloading..." : "Download"}
                          </button>
                        )
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      <WelcomeDownloadTerminal
        ref={terminalRef}
        bonus={validBonus}
        bonusList={validBonusList}
        downloadedBonusList={validBonusList.filter((it: any) => getWelcomeDownloadMap(account)?.[it.key]?.opened) ?? []}
      />
    </>
  );
};

export default WelcomeNft;
