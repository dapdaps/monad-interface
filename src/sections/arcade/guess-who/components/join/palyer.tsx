import Big from "big.js";
import PlayerAvatar from "../player-avatar";
import BetToken from "./bet-token";
import clsx from "clsx";
import { formatLongText } from "@/utils/utils";

const Player = (props: any) => {
  const { betToken, betAmount, className, isLost, isWon, player } = props;

  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-[13px]",
        className,
        isLost ? "[filter:grayscale(100%)]" : "",
      )}
    >
      <PlayerAvatar
        className="!w-[76px] !h-[76px]"
        avatarClassName="!w-[58px] !h-[46px] !top-[-12px] !right-[-25px]"
        avatar={player?.avatar}
        moves={player?.moves}
      />
      <div className="flex flex-col items-center gap-[5px]">
        <div className={clsx("max-w-[76px] whitespace-nowrap", player ? "" : "opacity-50")}>
          {player ? formatLongText(player?.address, 4, 3) : "Empty seat"}
        </div>
        {
          !isLost && (
            <BetToken
              betToken={betToken}
              betAmount={isWon ? Big(betAmount).times(3) : betAmount}
            />
          )
        }
        {
          isWon && (
            <div className="w-[120px] h-[32px] mt-[10px] shrink-0 rounded-[4px] border border-[#FFDAA9] text-[#FFBE73] text-[20px] flex items-center justify-center">
              x3 Winner
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Player;
