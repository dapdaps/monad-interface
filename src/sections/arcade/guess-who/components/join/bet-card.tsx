import clsx from "clsx";
import Monsters from "../monsters";
import BetToken from "./bet-token";

const BetCard = (props: any) => {
  const { betToken, betAmount, monster, betMonster, onSelectMonster } = props;

  return (
    <div
      className={clsx(
        "w-[197px] h-[252px] rounded-[10px] bg-[#161620] border pb-[20px] flex flex-col justify-end items-center gap-[25px]",
        betMonster?.includes(monster) ? "border-[#836EF9]" : "border-[#161620]",
      )}
    >
      <Monsters
        visibleMonsters={[monster]}
        betMonster={betMonster}
        onSelectMonster={onSelectMonster}
      />
      <BetToken
        betToken={betToken}
        betAmount={betAmount}
      />
    </div>
  );
};

export default BetCard;
