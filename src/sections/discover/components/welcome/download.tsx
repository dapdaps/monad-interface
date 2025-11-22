import { useEffect, useMemo, useState } from "react";
import { useWelcomeContext } from "./context";
import WelcomeProgress from "./progress";
import { BoosterItems } from "@/sections/ranking/config";
import clsx from "clsx";
import { DownloadDuration } from "./config";
import { numberFormatter } from "@/utils/number-formatter";
import { useNftStore } from "@/stores/nft";
import useCustomAccount from "@/hooks/use-account";

const WelcomeDownload = (props: any) => {
  const { } = props;

  const { account } = useCustomAccount();
  const { bonus } = useWelcomeContext();
  const { welcomeDownloadMap, getWelcomeDownloadMap } = useNftStore();

  const [downloadingBonus, downloadingBonusList] = useMemo(() => {
    let _bonus: any = {};
    const _bonusList: any = [];
    Object.entries(bonus ?? {}).forEach(([key, value]) => {
      if (!/_rp$/.test(key)) {
        if (value === true) {
          const curr = BoosterItems.find((it) => it.key === key);
          const downloading = getWelcomeDownloadMap(account)?.[key]?.loading;
          if (downloading && curr) {
            _bonus[key] = value;
            _bonus[`${key}_rp`] = bonus[`${key}_rp`];
            _bonusList.push({
              ...curr,
              rp: bonus[`${key}_rp`],
              timestamp: getWelcomeDownloadMap(account)?.[key]?.timestamp,
            });
          }
          return;
        }
      }
    });
    return [_bonus, _bonusList.sort((a: any, b: any) => a.sort - b.sort)];
  }, [bonus, welcomeDownloadMap, account]);

  if (!downloadingBonusList.length) {
    return null;
  }

  return (
    <div
      className="fixed right-[17px] bottom-[13px] z-[101] w-[439px] pl-[29px] pr-[24px] pt-[20px] pb-[20px] flex-shrink-0 rounded-[4px] border border-[#34304B] bg-[linear-gradient(180deg,_#1D1A2E_0%,_#252532_86.43%)] text-white text-[14px] font-Pixelmix font-normal leading-[120%] [text-shadow:0_0_30px_#836EF9]"
    >
      {
        downloadingBonusList.map((item: any, index: number) => (
          <DownloadItem
            key={index}
            bonu={item}
            className={index !== 0 ? "mt-[20px]" : ""}
          />
        ))
      }
    </div>
  );
};

export default WelcomeDownload;

const DownloadItem = (props: any) => {
  const { bonu, className } = props;

  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    let timer: any = null;

    clearInterval(timer);
    timer = null;

    const updateProgress = () => {
      const remainingTime = Math.max(DownloadDuration - (Date.now() - bonu.timestamp), 0);
      const progress = Math.min((Date.now() - bonu.timestamp) / DownloadDuration, 1);
      if (progress >= 1) {
        clearInterval(timer);
        timer = null;
      }
      setProgress(progress);
      setRemainingTime(remainingTime);
    };

    updateProgress();
    timer = setInterval(updateProgress, 500);

    return () => {
      clearInterval(timer);
      timer = null;
    };
  }, [bonu]);

  return (
    <div className={clsx("w-full flex justify-between items-center gap-[14px]", className)}>
      <div className="w-[96px] h-[73px] text-[#B9ACFF] text-[10px] uppercase text-center px-[10px] pt-[10px] leading-[120%] font-Pixelmix [text-shadow:0_0_30px_#836EF9] flex justify-center items-center shrink-0 bg-[url('/images/mainnet/discover/welcome/folder-2.png')] bg-no-repeat bg-center bg-contain">
        {bonu.name}
      </div>
      <div className="flex-1 w-0">
        <div className="">
          <span className="uppercase">
            {bonu.name}
          </span>
          <span>.exe</span>
        </div>
        <WelcomeProgress
          className="mt-[8px] !px-0"
          progress={progress * 100}
          totalSegments={17}
        />
        <div className="mt-[8px] text-[#B9ACFF] text-[12px]">
          {numberFormatter(remainingTime / 1000, 0, true)} seconds remaining _ {numberFormatter(progress * 100, 2, true)}%
        </div>
      </div>
    </div>
  );
};
