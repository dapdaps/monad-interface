import Empty from "@/components/empty";
import useCustomAccount from "@/hooks/use-account";
import useIsMobile from "@/hooks/use-isMobile";
import { get } from "@/utils/http";
import { numberFormatter } from "@/utils/number-formatter";
import { formatLongText } from "@/utils/utils";
import { useRequest } from "ahooks";
import Big from "big.js";
import clsx from "clsx";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

const tabs = [
  { value: "daily", label: "Daily", api: "/game/deathfun/rank/daily" },
  { value: "all", label: "All Time", api: "/game/deathfun/rank" },
];

const LeaderBoard = (props: any) => {
  const { className } = props;

  const isMobile = useIsMobile();
  const { accountWithAk, account: address } = useCustomAccount();

  const [data, setData] = useState<any>();
  const [tab, setTab] = useState(tabs[0]);

  const { loading, runAsync: getData } = useRequest(async () => {
    if (!accountWithAk || !tab) {
      return;
    }
    try {
      const res = await get(tab.api);
      if (res.code !== 200) {
        setData(void 0);
        return;
      }
      setData(res.data);
      return res.data;
    } catch (error) {
      setData(void 0);
      console.log("get leader board failed: %o", error);
    }
  }, {
    refreshDeps: [accountWithAk, tab]
  });

  // Refresh data every minute
  // useEffect(() => {
  //   if (!getData) return;

  //   const interval = setInterval(() => {
  //     getData();
  //   }, 60000); // 60000ms = 1 minute

  //   return () => clearInterval(interval);
  // }, [getData]);

  return (
    <div className={clsx("fixed z-[3] flex flex-col top-0 left-0 bg-[#191B25] border border-black w-[20.29vw] max-w-[280px] h-[83dvh] font-[Montserrat] text-[12px] text-white font-[600] leading-[150%]", className)}>
      <div className="shrink-0 w-full pt-[72px] md:pt-[20px] text-center font-[HackerNoonV2] text-[24px] text-[#E7E2FF] [text-shadow:0_0_30px_#836EF9] leading-[90%] font-[400]">
        LEADERBOARD
      </div>
      <div className="shrink-0 pt-[11px] text-center text-[12px] font-[500] leading-[100%]">
        Climb <span className="text-[#BFFF60]">higher</span>, rank <span className="text-[#BFFF60]">stronger</span>
      </div>
      <div className="shrink-0 pt-[10px] flex justify-center items-center gap-[10px]">
        {
          tabs.map((_tab, _idx) => (
            <button
              key={_idx}
              type="button"
              className={clsx(
                "w-[100px] h-[26px] rounded-[6px] flex justify-center items-center border border-black font-[Unbounded] font-[400] text-[12px] text-black transition-all duration-150",
                tab.value === _tab.value ? "bg-[#BFFF60] shadow-[0_4px_0_0_rgba(0,_0,_0,_0.50)_inset]" : "bg-[#A9ADB8] shadow-[0_-4px_0_0_rgba(0,_0,_0,_0.50)_inset]",
              )}
              onClick={() => {
                if (_tab.value === tab?.value) {
                  return;
                }
                setData(void 0);
                setTab(_tab);
              }}
            >
              {_tab.label}
            </button>
          ))
        }
      </div>
      <div className="h-0 flex-1 pt-[24px] overflow-y-auto flex flex-col gap-[15px] pb-[100px]">
        {
          (!data && loading) ? [...new Array(10).fill(0)].map((_, i) => (
            <div className="w-full p-[0_10px] flex items-center gap-[10px] justify-between">
              <div className="flex items-center gap-[15px]">
                <Skeleton width={21} height={14} borderRadius={2} />
                <Skeleton width={50} height={14} borderRadius={2} />
              </div>
              <Skeleton width={80} height={14} borderRadius={2} />
            </div>
          )) : (
            !!data?.tops?.length ? data?.tops?.filter((item: any) => Big(item.profit || 0).gte(0))?.map((item: any, i: number) => (
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
            )) : (
              <Empty
                icon={(
                  <img
                    src="/images/arcade/space-invaders/icon-empty.png"
                    alt=""
                    className="w-[122px] h-[166px] object-center object-contain"
                  />
                )}
                desc={`No winners ${tab?.value === tabs[0].value ? "today" : ""}... yet`}
                descClassName="translate-y-[-80px] font-[300]"
              />
            )
          )
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
                  {data?.self?.rank ?? "-"}
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
                      prefix: Big(data?.self?.profit || 0).gt(0) ? "+" : "",
                    }
                  )
                } MON
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default LeaderBoard;
