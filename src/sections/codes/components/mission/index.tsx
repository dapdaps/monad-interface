import clsx from "clsx";
import { memo } from "react";
import CodesDescription from "../description";
import CurrentMission from "./current";
import CodesNextDrop from "./next-drop";
import { useCodesContext } from "../../context";

export default memo(function Mission(props: any) {
  const { className } = props;

  const {
    missionData,
    missionLoading,
    getMissionData,
    lastTime,
    currentRountCodes
  } = useCodesContext();

  return (
    <div className={clsx("flex flex-col items-center", className)}>
      <CodesDescription />
      <CurrentMission missionData={missionData} missionLoading={missionLoading} currentRountCodes={currentRountCodes} />
      <CodesNextDrop lastTime={lastTime} getMissionData={getMissionData} missionLoading={missionLoading} />
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
  const { className, children, onClick } = props;

  return (
    <div onClick={onClick} className={clsx("w-[257px] h-[72px] flex items-center justify-center bg-black border border-[#55648A] rounded-[6px] shadow-[3px_3px_0px_0px_#2C3635_inset] text-[#03E212] text-center font-HackerNoonV2 [text-shadow:0_0_10px_rgba(3,226,18,0.5)] text-[18px] font-[400] leading-[120%] [background-image:linear-gradient(rgba(120,254,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(120,254,255,0.1)_1px,transparent_1px)] [background-size:35px_35px]", className)}>
      {children}
    </div>
  )
};
