import { numberFormatter } from "@/utils/number-formatter";
import { Monster, MONSTERS } from "../../config";
import Eyes from "../eyes";
import Monsters from "../monsters";
import Player from "./palyer";
import BetToken from "./bet-token";
import BetCard from "./bet-card";
import HexagonButton from "@/components/button/hexagon";
import BetOne from "./bet-one";
import Pending from "./pending";
import Result, { ResultUFO } from "./result";

const JoinRoom = (props: any) => {
  const { betToken } = props;

  return (
    <div className="w-full h-full relative p-[20px_32px] text-white">
      <div className="absolute flex flex-col justify-center items-center left-1/2 -translate-x-1/2 top-[-60px]">
        <Eyes className="" size={50} />
        <img
          src="/images/mainnet/arcade/guess-who/guess-who2.png"
          alt=""
          className="relative z-[2] w-[202px] h-[39px] object-center object-contain shrink-0 mt-[-10px]"
        />
      </div>
      <div className="w-[159px] h-[32px] shrink-0 rounded-[4px] bg-[#2A2631] text-[#B9C3DC] text-center text-[16px] font-medium leading-[16px] flex items-center justify-center">
        Game No.532056
      </div>
      <div className="mt-[71px] flex items-start justify-center gap-[80px]">
        <Player
          betToken={betToken}
          betAmount={1}
          isWon
        />
        <Player
          betToken={betToken}
          betAmount={1}
        />
        <Player
          betToken={betToken}
          isLost
          betAmount={1}
        />
      </div>
      <Result monster={MONSTERS.Eye3} className="!hidden" />
      <Pending className="!hidden" />
      <BetOne className="!hidden" />
      <div className="mt-[25px] flex justify-center items-center gap-[20px]">
        <BetCard
          betToken={betToken}
          betAmount={1}
          monster={Monster.Eye1}
          betMonster={[]}
          onSelectMonster={() => { }}
        />
        <BetCard
          betToken={betToken}
          betAmount={1}
          monster={Monster.Eye2}
          betMonster={[]}
          onSelectMonster={() => { }}
        />
      </div>
      <div className="mt-[24px] flex justify-center items-center">
        <HexagonButton
          onClick={() => {
          }}
          loading={false}
          disabled={false}
          className="w-[446px]"
        >
          Take A Seat
        </HexagonButton>
      </div>
      <ResultUFO />
    </div>
  );
};

export default JoinRoom;
