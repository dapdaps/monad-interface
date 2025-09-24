import { useState } from "react";
import { RPS_MOVES_ROUND, RPSMoves } from "../../config";
import clsx from "clsx";
import HexagonButton from "@/components/button/hexagon";
import { numberFormatter } from "@/utils/number-formatter";

const JoinRoom = (props: any) => {
  const {
    room,
    betToken,
    betTokenBalance,
    onSelectMove,
    moves,
    buttonValid,
    onJoin,
  } = props;

  const [round, setRound] = useState(1);

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-1">
        <div className="flex items-center gap-1">
          <div className="text-[#727D97]">Current Room:</div>
          <div className="">{room.room_id}</div>
        </div>
        <div className="flex items-center gap-1">
          <div className="text-[#727D97]">Bet amount:</div>
          <div className="">{room.bet_amount} {betToken.symbol}</div>
        </div>
        <div className="flex items-center gap-1">
          <div className="text-[#727D97]">Your Balance:</div>
          <div className="">{numberFormatter(betTokenBalance, 2, true)} {betToken.symbol}</div>
        </div>
        <div className="flex items-center gap-1">
          <div className="text-[#727D97]">Current Round:</div>
          <div className="">{round}</div>
        </div>
      </div>
      <ul className="mt-2">
        {
          [...new Array(RPS_MOVES_ROUND).fill(0)].map((_, index) => {
            if (round !== index + 1) {
              return;
            }
            return (
              <li key={index}>
                <h4>Round {index + 1}</h4>
                <div className="grid grid-cols-3 gap-2">
                  {
                    Object.values(RPSMoves).map((item) => {
                      return (
                        <button
                          type="button"
                          key={item.value}
                          className={clsx(
                            "w-[80px] h-[80px] flex justify-center items-center border rounded-sm",
                            moves[index] === item.value ? "border-[#BFFF60] bg-[#BFFF60] text-black" : "border-white text-white"
                          )}
                          onClick={() => {
                            onSelectMove(item.value, index);
                            // auto next round
                            if (index < RPS_MOVES_ROUND - 1) {
                              setRound(round + 1);
                            }
                          }}
                        >
                          {item.label}
                        </button>
                      );
                    })
                  }
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <HexagonButton
                    onClick={() => {
                      setRound(round - 1);
                    }}
                    loading={false}
                    disabled={index === 0}
                    height={24}
                    className="!text-[16px]"
                  >
                    Prev
                  </HexagonButton>
                  <HexagonButton
                    onClick={() => {
                      setRound(round + 1);
                    }}
                    loading={false}
                    disabled={index === RPS_MOVES_ROUND - 1}
                    height={24}
                    className="!text-[16px]"
                  >
                    Next
                  </HexagonButton>
                </div>
              </li>
            );
          })
        }
      </ul>
      <div className="mt-2">
        <HexagonButton
          className="w-full"
          onClick={onJoin}
          loading={buttonValid.loading}
          disabled={buttonValid.disabled}
        >
          {buttonValid.text}
        </HexagonButton>
      </div>
    </div>
  );
};

export default JoinRoom;
