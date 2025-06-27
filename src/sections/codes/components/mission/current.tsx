import clsx from "clsx";
import Loading from "@/components/loading";
import Skeleton from "react-loading-skeleton";
import useIsMobile from "@/hooks/use-isMobile";
import { useMemo } from "react";
import Link from "next/link";

const CurrentMission = (props: any) => {
  const { className, codesClassName, missionData, missionLoading, currentRountCodes } = props;

  const isMobile = useIsMobile();

  const { current_round_quest = {}, current_round_complete, quest_round_time, current_round_missions = [] } = missionData ?? {};
  const { title, action_type, token, token_amount, times } = current_round_quest;

  const currentRoundQuestText = useMemo(() => {
    if (!current_round_missions || current_round_missions.length === 0) return null;
    const questMissionLinks = Object.values(QuestMissionLinks);

    return current_round_missions.map((mission: { title: string; complete: boolean }, index: number) => {
      let text = mission.title.trim();
      // remove "& earn free tokens"
      text = text.replace(/to & earn free tokens/gi, '');

      // check if any link matches
      for (const link of questMissionLinks) {
        if (link.reg.test(text)) {
          const parts = text.split(link.reg);
          const matchedText = text.match(link.reg)?.[0] || '';

          return (
            <div key={index} className="flex items-center gap-[5px] md:justify-center">
              <div className={clsx("overflow-hidden text-ellipsis whitespace-nowrap", isMobile ? "" : "flex-1 w-0 ")}>
                {parts[0]}
                <Link href={link.link} prefetch={true} className={clsx("underline underline-offset-2", isMobile ? "" : "hover:text-[#78FEFF]")}>
                  {matchedText}
                </Link>
                {parts[1]}
              </div>
              {mission.complete && (
                <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M1 5.34783L6.77778 11L17 1" stroke="#78FEFF" stroke-width="2" />
                </svg>
              )}
            </div>
          );
        }
      }

      return (
        <div key={index} className="flex items-center gap-[5px]">
          <div className="flex-1 w-0 overflow-hidden text-ellipsis whitespace-nowrap">
            {text}
          </div>
          {mission.complete && (
            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M1 5.34783L6.77778 11L17 1" stroke="#78FEFF" stroke-width="2" />
            </svg>
          )}
        </div>
      );
    });
  }, [current_round_missions]);

  return (
    <div className={clsx("w-full p-[13px_15px_12px_15px] rounded-[6px] border border-[#26274B] bg-[#31305A] flex items-center justify-between gap-[16px] text-white font-Unbounded text-[14px]", className)}>
      <div className={clsx("flex-1 min-h-[17px] leading-[200%] md:w-full", isMobile && missionLoading ? "flex justify-center" : "")}>
        {
          missionLoading ? (
            <Skeleton width={200} height={18} borderRadius={4} />
          ) : currentRoundQuestText
        }
      </div>
      <div className={clsx("flex items-center gap-[12px] shrink-0", codesClassName)}>
        <div className="flex items-center gap-[2px]">
          +{missionLoading ? (
            <Loading size={12} />
          ) : currentRountCodes} Codes
        </div>
      </div>
    </div>
  );
};

export default CurrentMission;

const QuestMissionLinks = {
  "LFJ": {
    reg: /LFJ/i,
    link: "/dex/lfj",
  },
  "arcade": {
    reg: /arcade/i,
    link: "/arcade",
  },
  "Kuru": {
    reg: /Kuru/i,
    link: "/dex/kuru",
  },
  "Uniswap": {
    reg: /Uniswap/i,
    link: "/dex/uniswap",
  },
  "Pancake": {
    reg: /Pancake/i,
    link: "/dex/pancake",
  },
  "Timeswap": {
    reg: /Timeswap/i,
    link: "/lending/timeswap",
  },
  "check-in": {
    reg: /check-in/i,
    link: "/faucet",
  },
};
