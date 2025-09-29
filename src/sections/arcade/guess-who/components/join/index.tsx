import { Monster, MONSTERS } from "../../config";
import Eyes from "../eyes";
import Player from "./palyer";
import BetCard from "./bet-card";
import HexagonButton from "@/components/button/hexagon";
import BetOne from "./bet-one";
import Pending from "./pending";
import Result, { ResultUFO } from "./result";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

const JoinRoom = (props: any) => {
  const {
    betToken,
    room,
    betMonster,
    onSelectMonster,
    onJoin,
    joining,
    resultPending,
    setResultPending,
    result,
    buttonValid,
    lastMonsters,
  } = props;

  const [isShowUFO, setIsShowUFO] = useState(false);
  const [isFinishedUFO, setIsFinishedUFO] = useState(false);

  useEffect(() => {
    setIsShowUFO(!!result);
  }, [result]);

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
        Game No.{room.room_id}
      </div>
      <div className="mt-[71px] flex items-start justify-center gap-[80px]">
        <Player
          betToken={betToken}
          betAmount={room.bet_amount}
          player={room.players[0]}
          isWon={isFinishedUFO && !!result && room.players[0] && result?.address?.toLowerCase() === room.players[0].address.toLowerCase()}
          isLost={isFinishedUFO && !!result && room.players[0] && result?.address?.toLowerCase() !== room.players[0].address.toLowerCase()}
          multipleAddresses={room.players.filter((player: any) => player.address === room.players[0]?.address)}
        />
        <Player
          betToken={betToken}
          betAmount={room.bet_amount}
          player={room.players[1]}
          isWon={isFinishedUFO && !!result && room.players[1] && result?.address?.toLowerCase() === room.players[1].address.toLowerCase()}
          isLost={isFinishedUFO && !!result && room.players[1] && result?.address?.toLowerCase() !== room.players[1].address.toLowerCase()}
          multipleAddresses={room.players.filter((player: any) => player.address === room.players[1]?.address)}
        />
        <Player
          betToken={betToken}
          betAmount={room.bet_amount}
          player={room.players[2]}
          isWon={isFinishedUFO && !!result && room.players[2] && result?.address?.toLowerCase() === room.players[2].address.toLowerCase()}
          isLost={isFinishedUFO && !!result && room.players[2] && result?.address?.toLowerCase() !== room.players[2].address.toLowerCase()}
          multipleAddresses={room.players.filter((player: any) => player.address === room.players[2]?.address)}
        />
      </div>

      {
        resultPending
          ? (
            <Pending className="" />
          )
          : (
            !!result
              ? (
                <Result monster={MONSTERS[result.moves as Monster]} className="" />
              )
              : (
                <>
                  {
                    lastMonsters.length === 1 ? (
                      !!betMonster.length ? (
                        <div className="mt-[25px] flex justify-center items-center gap-[20px]">
                          <BetCard
                            key={betMonster[0]}
                            betToken={betToken}
                            betAmount={room.bet_amount}
                            monster={betMonster[0]}
                            betMonster={betMonster}
                            onSelectMonster={() => {
                              onSelectMonster(betMonster[0]);
                            }}
                          />
                        </div>
                      ) : (
                        <BetOne className="" />
                      )
                    ) : (
                      <div className="mt-[25px] flex justify-center items-center gap-[20px]">
                        {
                          lastMonsters?.map((monster: any) => (
                            <BetCard
                              key={monster.value}
                              betToken={betToken}
                              betAmount={room.bet_amount}
                              monster={monster.value}
                              betMonster={betMonster}
                              onSelectMonster={() => {
                                onSelectMonster(monster.value);
                              }}
                            />
                          ))
                        }
                      </div>
                    )
                  }
                </>
              )
          )
      }

      {
        !result && !resultPending && (
          <div className="mt-[24px] flex justify-center items-center">
            <HexagonButton
              onClick={() => {
                // select last monster automatically
                if (lastMonsters?.length === 1 && !betMonster.length) {
                  onSelectMonster(lastMonsters[0].value);
                  return;
                }
                onJoin();
              }}
              loading={buttonValid.loading}
              disabled={buttonValid.disabled}
              className="w-[446px]"
            >
              {
                buttonValid.text ? buttonValid.text : (
                  <>
                    {
                      lastMonsters?.length === 1
                        ? (
                          !!betMonster.length
                            ? "Take A Seat"
                            : "Take Another Seat"
                        )
                        : `Take ${betMonster?.length > 1 ? "Two" : "A"} Seat${betMonster?.length > 1 ? "s" : ""}`
                    }
                  </>
                )
              }
            </HexagonButton>
          </div>
        )
      }

      <AnimatePresence>
        {
          isShowUFO && (
            <ResultUFO
              onClose={() => {
                setIsShowUFO(false);
                setResultPending(false);
                setIsFinishedUFO(true);
              }}
            />
          )
        }
      </AnimatePresence>
    </div>
  );
};

export default JoinRoom;
