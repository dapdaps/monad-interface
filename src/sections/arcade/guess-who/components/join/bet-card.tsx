import Monsters from "../monsters";
import BetToken from "./bet-token";

const BetCard = (props: any) => {
  const { betToken, betAmount, monster, betMonster, onSelectMonster } = props;

  return (
    <div className="w-[197px] h-[252px] rounded-[10px] bg-[#161620] pb-[20px] flex flex-col justify-end items-center gap-[25px]">
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
