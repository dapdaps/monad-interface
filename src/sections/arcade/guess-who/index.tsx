import clsx from "clsx";
import Eyes from "./components/eyes";
import MonsterEye1 from "./components/monsters/eye-1";
import MonsterEye2 from "./components/monsters/eye-2";
import MonsterEye3 from "./components/monsters/eye-3";
import { Monster } from "./config";
import { useCreate } from "./hooks/use-create";
import Monsters from "./components/monsters";
import { motion } from "framer-motion";
import BetInput from "./components/bet-input";
import { useGuessWho } from "./hooks";
import GridTable, { GridTableAlign, GridTableSortDirection } from "@/components/flex-table/grid-table";
import HexagonButton from "@/components/button/hexagon";
import { numberFormatter } from "@/utils/number-formatter";
import PlayerAvatar from "./components/player-avatar";
import Pagination from "@/components/pagination";
import GuessWhoToast from "./components/toast";
import JoinRoomModal from "./components/join/modal";

const GuessWho = () => {

  const guessWho = useGuessWho();
  const create = useCreate(guessWho);

  return (
    <div className="mainnet-content !pb-0 overflow-auto text-white">
      <div className="flex justify-center gap-[9px] w-[1413px] mx-auto bg-[url('/images/mainnet/arcade/guess-who/bg-star-sky.png')] bg-no-repeat bg-[position:top_center] bg-contain">
        <div className="shrink-0">
          <div className="flex flex-col items-center">
            <div className="relative flex items-end justify-center w-[390px] h-[235px] bg-[url('/images/mainnet/arcade/guess-who/ufo.png')] bg-no-repeat bg-bottom bg-contain">
              <img
                src="/images/mainnet/arcade/guess-who/guess-who.png"
                alt=""
                className="relative z-[2] w-[299px] h-[100px] object-center object-contain translate-y-[-58px]"
              />
              <Eyes className="absolute top-[46px] rotate-[-10deg]" />
            </div>
            <div className="relative flex items-end justify-center z-[2] w-[480px] h-[452px] ml-[50px] mt-[-80px]">
              <Monsters
                betMonster={create.betMonster}
                onSelectMonster={create.onSelectMonster}
                className="absolute z-[1] bottom-[46px]"
                visibleMonsters={[Monster.Eye1, Monster.Eye2, Monster.Eye3]}
              />
              <motion.img
                src="/images/mainnet/arcade/guess-who/ufo-light.png"
                alt=""
                className="w-full h-full object-top object-contain"
                initial={{
                  opacity: 1,
                }}
                animate={create.betMonster?.length > 0 ? {
                  opacity: 1,
                } : {
                  opacity: [
                    1, 0.3, 0.8, 0.1, 0.9, 0.2, 0.7, 0.4, 1, 0.6, 0.3, 0.8, 0.1, 0.9, 0.2, 0.7, 0.4, 1
                  ],
                }}
                transition={create.betMonster?.length > 0 ? void 0 : {
                  repeat: Infinity,
                  duration: 4,
                  ease: "linear",
                  times: [
                    0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 1
                  ]
                }}
              />
              <BetInput
                className="absolute z-[1] bottom-[-30px] w-[422px] mx-auto"
                betToken={guessWho.betToken}
                betAmount={create.betAmount}
                setBetAmount={create.setBetAmount}
              />
            </div>
          </div>
          <div className="relative w-[480px] h-[166px] flex justify-center items-center mx-auto mt-[60px] bg-[url('/images/mainnet/arcade/guess-who/create-game-base.png')] bg-no-repeat bg-center bg-contain">
            <motion.button
              type="button"
              className="w-[218px] h-[86px] shrink-0 bg-[url('/images/mainnet/arcade/guess-who/create-game-button.png')] bg-no-repeat bg-center bg-contain"
              onClick={() => {

              }}
              initial={{
                transform: "translateY(-30px)",
              }}
              animate={{
                transform: ["translateY(-30px)", "translateY(-25px)", "translateY(-35px)", "translateY(-30px)"],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "linear",
              }}
              whileHover={{
                transform: "translateY(-30px)",
                transition: {
                  duration: 0.2,
                  ease: "easeOut",
                }
              }}
              whileTap={{
                transform: "translateY(-25px)",
                transition: {
                  duration: 0.1,
                  ease: "easeOut",
                }
              }}
            />
            <img
              src="/images/mainnet/arcade/guess-who/create-game-base-right.png"
              alt=""
              className="w-[171px] h-[112px] object-center object-contain pointer-events-none absolute bottom-0 right-[-213px]"
            />
          </div>
        </div>
        <div className="shrink-0 w-[890px]">
          <div className="w-full flex justify-between items-center gap-[10px]">
            <button
              type="button"
              className="group hover:text-white hover:bg-[radial-gradient(50%_66%_at_46%_50%,_#553BE4_0%,_#221662_100%)] transition-all duration-150 flex items-center justify-center gap-[10px] w-[86px] h-[32px] shrink-0 text-[#A1AECB] text-[16px] font-normal leading-normal bg-black rounded-[4px] border border-[#34304B]"
            >
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[10px] h-[12px] shrink-0 rotate-180 group-hover:[filter:drop-shadow(0_0_10px_rgba(255,255,255,0.60))]"
              >
                <path d="M9.5 5.06218C10.1667 5.44708 10.1667 6.40933 9.5 6.79423L2.23205 10.9904C1.34602 11.5019 0.354474 10.5104 0.866025 9.62436L2.71133 6.4282C2.88996 6.1188 2.88996 5.7376 2.71132 5.4282L0.866025 2.23205C0.354474 1.34602 1.34602 0.354474 2.23205 0.866025L9.5 5.06218Z" fill="currentColor" />
              </svg>
              <div>Back</div>
            </button>
            <div className="text-[22px] font-[600] uppercase text-center pt-[13px]">
              All GAMES . 36
            </div>
            <div className="flex justify-end items-center gap-[10px] pt-[13px]">
              <button
                type="button"
                className="w-[18px] h-[18px] p-[3px] flex justify-center items-center rounded-[2px] border border-[#5E549D] bg-[#1A1843] shadow-[0_0_10px_0_rgba(0,0,0,0.05)]"
              >
                <div
                  className={clsx(
                    "w-full h-full bg-[#BFFF60] rounded-[2px] flex justify-center items-center transition-all duration-300 opacity-0",
                  )}
                />
              </button>
              <div className="text-[#A1AECB]">
                You Joined only
              </div>
            </div>
          </div>
          <div className="w-full">
            <GridTable
              headerRowClassName="!px-0 !gap-x-[40px]"
              bodyRowClassName="odd:bg-[unset] !px-0 !gap-x-[40px] text-[18px] h-[104px] bg-[url('/images/mainnet/arcade/guess-who/bg-room-item.png')] bg-no-repeat bg-center bg-contain"
              columns={[
                {
                  dataIndex: "no",
                  title: () => (
                    <div className="pl-[40px]">
                      Game No.
                    </div>
                  ),
                  width: 140,
                  sort: true,
                  render: (record: any) => {
                    return (
                      <div className="pl-[40px]">
                        {record.no}
                      </div>
                    );
                  },
                },
                {
                  dataIndex: "player",
                  title: "Player",
                  sort: true,
                  render: (record: any) => {
                    return (
                      <div className="flex items-center gap-[40px]">
                        <PlayerAvatar />
                        <PlayerAvatar />
                        <PlayerAvatar />
                      </div>
                    );
                  },
                },
                {
                  dataIndex: "bet_amount",
                  title: "Bet Price",
                  width: 100,
                  sort: true,
                  render: (record: any) => {
                    return (
                      <div className="flex items-center gap-[6px]">
                        <img
                          src={guessWho.betToken.icon}
                          alt=""
                          className="w-[18px] h-[18px] object-center object-contain shrink-0"
                        />
                        <div className="">
                          {numberFormatter(record.bet_amount, 3, true, { isShort: true })}
                        </div>
                      </div>
                    );
                  },
                },
                {
                  dataIndex: "join",
                  title: "",
                  width: 170,
                  render: (record: any) => {
                    return (
                      <>
                        <HexagonButton
                          onClick={() => {
                          }}
                          loading={record.loading}
                          disabled={record.loading}
                          height={36}
                          className="!text-[18px]"
                          innerClassName="!pl-[47px] !pr-[19px]"
                        >
                          <div className="">
                            Join
                          </div>
                          <img
                            src="/images/mainnet/discover/icon-more3.svg"
                            alt=""
                            className="w-[14px] h-[12px] object-center object-contain shrink-0"
                          />
                        </HexagonButton>
                      </>
                    );
                  },
                },
              ]}
              data={[
                { no: "52305", bet_amount: "10" },
                { no: "52305", bet_amount: "10" },
              ]}
              loading={false}
              sortDirection={GridTableSortDirection.Desc}
              sortDataIndex="no"
              onSort={(dataIndex, nextDirection) => {
                console.log(dataIndex, nextDirection);
              }}
            />
            <div className="flex justify-end items-center pr-[110px]">
              <Pagination
                page={1}
                totalPage={1}
                pageSize={10}
                onPageChange={(_page: number) => {
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <GuessWhoToast />
      <JoinRoomModal
        betToken={guessWho.betToken}
      />
    </div>
  );
};

export default GuessWho;
