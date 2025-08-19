import CalendarBanner from "@/components/privy-wallet/calendar/banner";
import useCustomAccount from "@/hooks/use-account";
import useIsMobile from "@/hooks/use-isMobile";
import { usePrivyAuth } from "@/hooks/use-privy-auth";
import { get } from "@/utils/http";
import { numberFormatter } from "@/utils/number-formatter";
import { formatLongText } from "@/utils/utils";
import { useRequest } from "ahooks";
import Big from "big.js";
import clsx from "clsx";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

// Custom hook to calculate remaining time today
const useTodayCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Get local time
      const now = dayjs();
      // Get UTC time
      const nowUTC = now.utc();
      // Get end of today in UTC (tomorrow 00:00:00)
      const endOfDayUTC = nowUTC.endOf('day');
      // Calculate remaining time
      const diff = endOfDayUTC.diff(nowUTC, 'second');

      if (diff > 0) {
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
};

const LeaderBoard = (props: any) => {
  const { className } = props;
  const timeLeft = useTodayCountdown();

  const isMobile = useIsMobile();
  const { accountWithAk } = useCustomAccount();
  const { address } = usePrivyAuth({ isBind: false });

  const { data, loading, runAsync: getData } = useRequest(async () => {
    if (!accountWithAk) {
      return;
    }
    try {
      const res = await get("/game/deathfun/rank");
      if (res.code !== 200) {
        return;
      }
      return res.data;
    } catch (error) {
      console.log("get leader board failed: %o", error);
    }
  }, {
    refreshDeps: [accountWithAk]
  });

  // Refresh data every minute
  useEffect(() => {
    if (!getData) return;

    const interval = setInterval(() => {
      getData();
    }, 60000); // 60000ms = 1 minute

    return () => clearInterval(interval);
  }, [getData]);

  return (
    <div className="fixed z-[3] flex flex-col top-0 right-0 bg-[#191B25] border border-black w-[20.29vw] max-w-[280px] h-[83dvh] font-[Montserrat] text-[12px] text-white font-[600] leading-[150%]">
      <div className="shrink-0 w-full pt-[72px] text-center font-[HackerNoonV2] text-[24px] text-[#E7E2FF] [text-shadow:0_0_30px_#836EF9] leading-[90%] font-[400]">
        LEADERBOARD
      </div>
      <div className="shrink-0 pt-[11px] text-center text-[12px] font-[500] leading-[100%]">
        <span className="text-[#BFFF60]">100 MON</span> daily for <span className="text-[#BFFF60]">top 50</span> by rank
      </div>
      <div className="shrink-0 pt-[10px] text-[16px] ledading-[100%] text-center">
        {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')}
      </div>
      <div className="h-0 flex-1 pt-[24px] overflow-y-auto flex flex-col gap-[15px]">
        {
          (!data && loading) ? [...new Array(10).fill(0)].map((_, i) => (
            <div className="w-full p-[0_10px] flex items-center gap-[10px] justify-between">
              <div className="flex items-center gap-[15px]">
                <Skeleton width={21} height={14} borderRadius={2} />
                <Skeleton width={50} height={14} borderRadius={2} />
              </div>
              <Skeleton width={80} height={14} borderRadius={2} />
            </div>
          )) : data?.tops?.map((item: any, i: number) => (
            <div className="w-full p-[0_10px] flex items-center gap-[10px] justify-between" key={i}>
              <div className="flex items-center gap-[15px]">
                <div className="text-[#CDC4FF] min-w-[21px] text-right">{item.rank}</div>
                <div className="">
                  {formatLongText(item.address, 5, 5)}
                </div>
              </div>
              <div className={clsx(Big(item.profit || 0).gte(0) ? "text-[#BFFF60]" : "text-[#FF4A4A]")}>
                {
                  numberFormatter(
                    item.profit,
                    2,
                    true,
                    {
                      isLessPrecision: false,
                      prefix: Big(item.profit || 0).gte(0) ? "+" : "",
                      isShort: Big(item.profit || 0).gte(10000),
                      isShortUppercase: true,
                    }
                  )
                } MON
              </div>
            </div>
          ))
        }
      </div>
      <div className="shrink-0 p-[7px_11px_11px_16px] w-full left-0 bottom-0 bg-[linear-gradient(180deg,_#28293D_0%,_#36375C_100%)] border-t border-black">
        <div className="text-[#CDC4FF]">
          Your Rank
        </div>
        {
          (!data && loading) ? (
            <div className="mt-[9px] w-full p-[0_10px] flex items-center gap-[10px] justify-between">
              <div className="flex items-center gap-[11px]">
                <Skeleton width={21} height={14} borderRadius={2} />
                <Skeleton width={50} height={14} borderRadius={2} />
              </div>
              <Skeleton width={80} height={14} borderRadius={2} />
            </div>
          ) : (
            <div className="mt-[9px] flex justify-between items-center gap-[10px]">
              <div className="flex items-center gap-[11px]">
                <div className="text-[#CDC4FF]">
                  {data?.self?.rank}
                </div>
                <div className="">
                  {formatLongText(address, 5, 5)}
                </div>
              </div>
              <div className={clsx(Big(data?.self?.profit || 0).gte(0) ? "text-[#BFFF60]" : "text-[#FF4A4A]")}>
                {
                  numberFormatter(
                    data?.self?.profit,
                    2,
                    true,
                    {
                      isLessPrecision: false,
                      prefix: Big(data?.self?.profit || 0).gte(0) ? "+" : "",
                    }
                  )
                } MON
              </div>
            </div>
          )
        }
      </div>
      {
        !isMobile && (
          <CalendarBanner className="!left-[clamp(1px_,2vw,_calc(var(--nadsa-laptop-width-base)*0.02))] !bottom-[clamp(calc(var(--nadsa-laptop-width-base)*-0.11),_-11vw,_1px)]" />
        )
      }
    </div>
  );
};

export default LeaderBoard;
