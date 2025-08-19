import clsx from "clsx";
import { useSpaceInvadersContext } from "../../context";
import { useEffect } from "react";
import Accordion from "./accordion";

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
      <div className="font-[DelaGothicOne] text-[20px] flex items-center gap-[10px] px-[32px] md:px-[10px]">
        <div className="">
          Space Invaders Rules
        </div>
        <img
          src="/images/arcade/space-invaders/ghost-primary.png"
          className="w-[30px] h-[22px] object-contain object-center shrink-0"
        />
      </div>
      <div className="mt-[20px] px-[32px] md:px-[10px]">
        Gear up, explorer!<br />
        Climb a 25-level cosmic tower filled with hidden traps and big rewards.<br />
        Choose wisely, dodge the invaders, and multiply your MON — the higher you go, the bigger the prize!
      </div>
      <div className="w-[666px] mt-[15px] flex flex-col items-stretch gap-[6px] px-[22px] md:px-[10px] md:w-full">
        <Accordion
          label={(
            <Label
              icon="/images/arcade/space-invaders/emoji-rocket.png"
            >
              How to Play
            </Label>
          )}
          contentClassName=""
        >
          <ul className="list-disc pl-[15px] pb-[10px]">
            <li>
              Each floor has multiple gates — one hides an invader trap.
            </li>
            <li>
              Pick a safe gate to move up. Pick the trap, and it’s game over.
            </li>
            <li>
              The deeper you go, the higher the multiplier — up to thousands of times your original MON!
            </li>
          </ul>
        </Accordion>
        <Accordion
          label={(
            <Label
              icon="/images/arcade/space-invaders/emoji-money.png"
            >
              Entry & Rewards
            </Label>
          )}
          contentClassName=""
        >
          <ul className="list-disc pl-[15px] pb-[10px]">
            <li>
              <div>Choose your entry stake:</div>
              <ul className="list-disc pl-[15px]">
                <li>
                  0.1 MON <span className="text-[#BFFF60]">(Low risk)</span>
                </li>
                <li>
                  1 MON <span className="text-[#77FFFC]">(Standard)</span>
                </li>
                <li>
                  10 MON <span className="text-[#CA55FF]">(High stakes)</span>
                </li>
              </ul>
            </li>
            <li>
              Survive a floor and your stake is multiplied.
            </li>
            <li>
              Hit a trap and lose your stake for that round.
            </li>
          </ul>
        </Accordion>
        <Accordion
          label={(
            <Label
              icon="/images/arcade/space-invaders/emoji-storm.png"
            >
              Shuffle Gates = Your Strategy
            </Label>
          )}
          contentClassName=""
        >
          <ul className="list-disc pl-[15px] pb-[10px]">
            <li>
              Use Shuffle Gates before you start to set your challenge level.
            </li>
          </ul>
        </Accordion>
        <Accordion
          label={(
            <Label
              icon="/images/arcade/space-invaders/emoji-gift.png"
            >
              Bonus Rewards
            </Label>
          )}
          contentClassName=""
        >
          <ul className="list-disc pl-[15px] pb-[10px]">
            <li>
              Reach key levels to unlock Cosmic Loot Chests.
            </li>
            <li>
              <div>
                Chests may contain:
              </div>
              <ul className="list-disc pl-[15px]">
                <li>
                  Rare NFTs
                </li>
                <li>
                  Whitelist spots
                </li>
                <li>Other limited rewards</li>
              </ul>
            </li>
          </ul>
        </Accordion>
        <Accordion
          label={(
            <Label
              icon="/images/arcade/space-invaders/emoji-check.png"
            >
              Fair Play Guaranteed
            </Label>
          )}
          contentClassName=""
        >
          <ul className="list-disc pl-[15px] pb-[10px]">
            <li>
              Every trap is pre-generated and provable, ensuring the game is 100% fair and tamper-proof.
            </li>
          </ul>
        </Accordion>
      </div>
      <div className="mt-[15px] text-white font-[SpaceGrotesk] text-[16px] font-normal leading-[120%] px-[32px]">
        Ready to climb? Every choice counts.
      </div>
    </div>
  );
};

export default Rules;

const Label = (props: any) => {
  const { className, icon, children } = props;

  return (
    <div className={clsx("flex items-center gap-[5px]", className)}>
      <img
        src={icon}
        className="w-[24px] h-[24px] object-contain object-center shrink-0"
      />
      <div className="">
        {children}
      </div>
    </div>
  );
};
