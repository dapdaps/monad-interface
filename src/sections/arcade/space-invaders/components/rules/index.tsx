import clsx from "clsx";
import { useSpaceInvadersContext } from "../../context";
import { useEffect } from "react";

const Rules = (props: any) => {
  const { className } = props;

  const {
    rulesVisible,
    setRulesVisible,
  } = useSpaceInvadersContext();

  return (
    <div
      className={clsx(
        "text-white font-[SpaceGrotesk] text-[16px] font-normal leading-[120%]",
        className
      )}
    >
      <div className="font-[DelaGothicOne] text-[20px] flex items-center gap-[10px] px-[32px]">
        <div className="">
          Space Invaders Rules
        </div>
        <img
          src="/images/arcade/space-invaders/ghost-primary.png"
          className="w-[30px] h-[22px] object-contain object-center shrink-0"
        />
      </div>
      <div className="mt-[20px] px-[32px]">
        Gear up, explorer!<br />
        Climb a 25-level cosmic tower filled with hidden traps and big rewards.<br />
        Choose wisely, dodge the invaders, and multiply your MON — the higher you go, the bigger the prize!
      </div>
    </div>
  );
};

export default Rules;
