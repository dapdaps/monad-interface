import clsx from "clsx";
import { memo } from "react";
import { useMission } from "../../hooks/use-mission";
import Skeleton from "react-loading-skeleton";
import Loading from "@/components/loading";
import { motion } from "framer-motion";
import { numberFormatter } from "@/utils/number-formatter";

export default memo(function Mission(props: any) {
  const { className } = props;

  const { missionData, missionLoading, getMissionData, lastTime, currentRountCodes } = useMission();

  const { current_round_quest = {}, current_round_complete, quest_round_time } = missionData ?? {};
  const { title, action_type, token, token_amount, times } = current_round_quest;

  const notZeroLastTime = /^\d+/.test(lastTime);

  return (
    <div className={clsx("flex flex-col items-center", className)}>
      <div className="text-white font-Unbounded text-[18px]">Global Crew Mission</div>
      <div className="m-[18px_0_28px] text-[#A6A6DB] font-Unbounded text-[12px] font-light text-center">
        Unlock Access codes by using the platform.<br />Earn MON by inviting new crew members.
      </div>
      <div className="w-full p-[13px_15px_12px_15px] rounded-[6px] border border-[#26274B] bg-[#31305A] flex items-center justify-between text-white font-Unbounded text-[14px]">
        <div className="flex-1">
          {
            missionLoading ? (
              <Skeleton width={200} height={18} borderRadius={4} />
            ) : title
          }
        </div>
        <div className="flex items-center gap-[12px] shrink-0">
          {
            current_round_complete && (
              <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.34783L6.77778 11L17 1" stroke="#78FEFF" stroke-width="2" />
              </svg>
            )
          }
          <div className="flex items-center gap-[2px]">+{missionLoading ? (
            <Loading size={12} />
          ) : currentRountCodes} Codes</div>
        </div>
      </div>

      <div className="m-[24px_0_0px] flex flex-col items-center gap-[9px] text-[12px] font-Unbounded font-light">
        <div className="text-[#A6A6DB] flex items-center gap-[4px]">
          <div>Next code drop in</div>
          <div>
            {
              !notZeroLastTime && (
                <button
                  type="button"
                  className="w-[16px] h-[16px] flex items-center justify-center"
                  onClick={() => getMissionData()}
                  disabled={missionLoading}
                >
                  <motion.img
                    src="/images/icon-refresh.svg"
                    alt="refresh"
                    className="w-[12px] h-[12px] object-center object-contain"
                    animate={missionLoading ? {
                      rotate: [0, 360],
                      transition: {
                        duration: 1,
                        repeat: Infinity,
                      }
                    } : void 0}
                  />
                </button>
              )
            }
          </div>
        </div>
        <MissionScreen>
          {lastTime}
        </MissionScreen>
      </div>

      {/* <div className="w-full h-[10px] grid grid-cols-5 gap-0 mb-[82px]">
        {
          consecutiveList.map((item, index) => {
            return (
              <ProgressItem
                key={index}
                data={item}
                progress={index < consecutiveList?.length - 1 ? consecutiveList[index + 1].completed ? 100 : (item.completed ? 50 : 0) : 0}
              />
            );
          })
        }
      </div> */}

    </div>
  )
})

const ProgressItem = (props: any) => {
  const { data, progress = 0 } = props;

  const { codes, completed, isMore, mission } = data;

  return (
    <div className={clsx("h-full relative", !isMore && "border border-[#26274B]")}>
      <div className="absolute z-[1] left-[-15px] top-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-full bg-[#31305A] border border-[#26274B] shrink-0"></div>
      {
        completed && (
          <div className="absolute z-[3] left-[-10px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] shrink-0 rounded-full bg-[#A5FFFD] bg-[url('/images/codes/icon-check.svg')] bg-no-repeat bg-center bg-[length:11px_7px]"></div>
        )
      }
      {
        isMore ? (
          <div className="w-full h-full left-0 top-0 absolute z-[2] bg-[url('/images/codes/bg-dashed.svg')] bg-repeat-x bg-[position:left_center]"></div>
        ) : (
          <div className="w-full h-full left-0 top-0 bg-[#31305A] absolute z-[2]"></div>
        )
      }
      {
        (!isMore && completed) && (
          <div style={{ width: `calc(${progress}% - 10px)` }} className="w-0 h-[4px] left-[5px] rounded-[2px] top-1/2 -translate-y-1/2 bg-[#A5FFFD] absolute z-[3]"></div>
        )
      }
      <div className={clsx("absolute z-[4] left-[-30px] bottom-[-34px] text-[#A6A6DB] font-Unbounded text-[12px] font-normal leading-normal", completed && "text-white")}>
        +{codes} Codes
      </div>
    </div>
  );
};

export const MissionScreen = (props: any) => {
  const { className, children } = props;

  return (
    <div className={clsx("w-[257px] h-[72px] flex items-center justify-center bg-black border border-[#55648A] rounded-[6px] shadow-[3px_3px_0px_0px_#2C3635_inset] text-[#03E212] text-center font-HackerNoonV2 [text-shadow:0_0_10px_rgba(3,226,18,0.5)] text-[18px] font-[400] leading-[120%] [background-image:linear-gradient(rgba(120,254,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(120,254,255,0.1)_1px,transparent_1px)] [background-size:35px_35px]", className)}>
      {children}
    </div>
  )
};
