import clsx from "clsx";
import Loading from "@/components/loading";
import Skeleton from "react-loading-skeleton";
import useIsMobile from "@/hooks/use-isMobile";
import { useMemo } from "react";
import Link from "next/link";

const CurrentMission = (props: any) => {
  const { className, codesClassName, missionData, missionLoading, currentRountCodes } = props;

  const isMobile = useIsMobile();

  const { current_round_quest = {}, current_round_complete, quest_round_time } = missionData ?? {};
  const { title, action_type, token, token_amount, times } = current_round_quest;

  const currentRoundQuestText = useMemo(() => {
    if (!title) return null;
    const textArr = title.split(",");
    const questMissionLinks = Object.values(QuestMissionLinks);
    
    return textArr.map((text: string, index: number) => {
      text = text.trim();
      // remove "& earn free tokens"
      text = text.replace(/to & earn free tokens/gi, '');
      
      // check if any link matches
      for (const link of questMissionLinks) {
        if (link.reg.test(text)) {
          const parts = text.split(link.reg);
          const matchedText = text.match(link.reg)?.[0] || '';
          
          return (
            <div key={index}>
              {parts[0]}
              <Link href={link.link} prefetch={true} className="underline underline-offset-2 hover:text-[#78FEFF]">
                {matchedText}
              </Link>
              {parts[1]}
            </div>
          );
        }
      }
      
      return (
        <div key={index}>{text}</div>
      );
    });
  }, [title]);

  return (
    <div className={clsx("w-full p-[13px_15px_12px_15px] rounded-[6px] border border-[#26274B] bg-[#31305A] flex items-center justify-between text-white font-Unbounded text-[14px]", className)}>
      <div className="flex-1 min-h-[17px] leading-[200%]">
        {
          missionLoading ? (
            <Skeleton width={200} height={18} borderRadius={4} />
          ) : currentRoundQuestText
        }
      </div>
      <div className={clsx("flex items-center gap-[12px] shrink-0", codesClassName)}>
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
    link: "/game",
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
