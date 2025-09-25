import Popover, { PopoverPlacement, PopoverTrigger } from "@/components/popover";
import { MissionScreen } from "@/sections/codes/components/mission";
import clsx from "clsx";
import useIsMobile from "@/hooks/use-isMobile";
import { useState } from "react";
import { useUserStore } from "@/stores/user";
import { useInterval } from "ahooks";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const disabled = true;

const CodesMission = (props: any) => {
  const { className } = props;

  const isMobile = useIsMobile();
  const [lastTime, setLastTime] = useState<string>("00h 00m 00s");
  const router = useRouter();
  const userInviteTimestamp = useUserStore((store: any) => store.inviteTimestamp);

  useInterval(() => {
    const {
      // seconds
      quest_round_time,
      // seconds
      quest_start_time
    } = userInviteTimestamp ?? {};
    const zeroLastTime = "-- : -- : --";
    if (!quest_round_time || !quest_start_time) return setLastTime(zeroLastTime);
    const now = dayjs();
    const start = dayjs(quest_start_time * 1000);
    const diff = now.diff(start, "second");
    const currentRoundDiff = diff % quest_round_time;
    const lastTime = quest_round_time - currentRoundDiff;
    if (lastTime <= 1) {
      return setLastTime(zeroLastTime);
    }
    const lastH = Math.floor(lastTime / 3600);
    const lastM = Math.floor((lastTime % 3600) / 60);
    const lastS = lastTime % 60;
    setLastTime(`${lastH < 10 ? `0${lastH}` : lastH} : ${lastM < 10 ? `0${lastM}` : lastM} : ${lastS < 10 ? `0${lastS}` : lastS}`);
  }, 1000, { immediate: true });

  return (
    <div
      className={clsx(
        "absolute top-[20vh] right-[5vw] p-[9px_12px_0] shrink-0 bg-no-repeat bg-contain bg-top",
        isMobile ? "w-[183px] h-[124px] bg-[url('/images/codes/bg-countdown-screen-mobile.png')]" : "w-[221px] h-[171px] bg-[url('/images/codes/bg-countdown-screen.png')]",
        className
      )}
    >
      <Popover
        content={disabled ? null : (
          <div className="relative w-[272px] h-[120px] p-[16px_0_0_16px] bg-[rgba(26,24,67,0.80)] border border-[#3E347C] rounded-[6px] filter-[drop-shadow(0px_0px_10px_rgba(0,_0,_0,_0.25))] backdrop-blur-[10px] text-white font-Unbounded text-[12px] font-[300] leading-[150%]">
            <img
              src="/images/codes/icon-card-triaggle.svg"
              alt=""
              className={clsx(
                "absolute left-1/2 -translate-x-1/2 w-[18px] h-[14px] object-center object-contain",
                isMobile ? "bottom-[-14px] rotate-180" : "top-[-14px]"
              )}
            />
            <div className="text-white font-Unbounded text-[12px] font-[500] leading-[150%]">
              Global Crew Mission Countdown
            </div>
            <div className="">
              Earn a new invite code every 24 hours by using the platform. Onboard your friends to earn MON rewards.
            </div>
          </div>
        )}
        trigger={PopoverTrigger.Hover}
        placement={isMobile ? PopoverPlacement.Top : PopoverPlacement.Bottom}
        closeDelayDuration={0}
        offset={20}
      >
        <MissionScreen
          className={clsx(
            "cursor-pointer flex flex-col gap-[3px] w-full !border-black !shadow-[0px_2px_0px_0px_rgba(255,_255,_255,_0.25)_inset] !rounded-[2px] ![background-image:unset] !p-[4px_5px]",
            isMobile ? "!h-[53px]" : "!h-[75px]"
          )}
          onClick={() => {
            if (disabled) {
              return;
            }
            router.push("/codes");
          }}
        >
          <div className="text-[#A6A6DB] text-center font-Unbounded text-[10px] font-[300] leading-normal">
            {
              disabled ? "NADSA Two Station" : "Next code drop in"
            }
          </div>
          <div className="text-[18px]">
            {disabled ? "IN PROGRESS" : lastTime}
          </div>
        </MissionScreen>
      </Popover>
    </div>
  );
};

export default CodesMission;
