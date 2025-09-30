import clsx from "clsx";
import Eyes from "./components/eyes";
import { Monster } from "./config";
import { useCreate } from "./hooks/use-create";
import Monsters from "./components/monsters";
import { motion } from "framer-motion";
import BetInput from "./components/bet-input";
import { useGuessWho } from "./hooks";
import GridTable from "@/components/flex-table/grid-table";
import HexagonButton from "@/components/button/hexagon";
import { numberFormatter } from "@/utils/number-formatter";
import PlayerAvatar from "./components/player-avatar";
import Pagination from "@/components/pagination";
import GuessWhoToast from "./components/toast";
import JoinRoomModal from "./components/join/modal";
import Popover, { PopoverPlacement, PopoverTrigger } from "@/components/popover";
import dayjs from "dayjs";
import { useJoin } from "./hooks/use-join";

const GuessWho = () => {

  const guessWho = useGuessWho();
  const create = useCreate(guessWho);
  const join = useJoin(guessWho);

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
            <Popover
              content={!!create.buttonValid.text ? (
                <div className="rounded-[4px] bg-[#2A2631] p-[5px_15px] text-[#B9C3DC] text-[16px]">
                  {create.buttonValid.text}
                </div>
              ) : null}
              trigger={PopoverTrigger.Hover}
              placement={PopoverPlacement.Top}
              closeDelayDuration={0}
              offset={32}
            >
              <motion.button
                type="button"
                className="w-[218px] h-[86px] disabled:!cursor-not-allowed disabled:opacity-50 shrink-0 bg-[url('/images/mainnet/arcade/guess-who/create-game-button.png')] bg-no-repeat bg-center bg-contain"
                disabled={create.buttonValid.disabled || create.buttonValid.loading}
                onClick={() => {
                  create.onCreate();
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
            </Popover>
            <img
              src="/images/mainnet/arcade/guess-who/create-game-base-right.png"
              alt=""
              className="w-[171px] h-[112px] object-center object-contain pointer-events-none absolute bottom-0 right-[-213px]"
            />
          </div>
        </div>
        <div className="shrink-0 w-[890px]">
          <div className="w-full flex justify-between items-center gap-[10px]">
            <div className="flex items-center gap-[10px]">
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
              <button
                type="button"
                className="group disabled:opacity-50 disabled:!cursor-not-allowed hover:text-white hover:bg-[radial-gradient(50%_66%_at_46%_50%,_#553BE4_0%,_#221662_100%)] transition-all duration-150 flex items-center justify-center gap-[10px] w-[100px] h-[32px] shrink-0 text-[#A1AECB] text-[16px] font-normal leading-normal bg-black rounded-[4px] border border-[#34304B]"
                disabled={guessWho.loading}
                onClick={() => {
                  guessWho.getList();
                }}
              >
                <motion.svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[12px] h-[12px] shrink-0 group-hover:[filter:drop-shadow(0_0_10px_rgba(255,255,255,0.60))]"
                  animate={guessWho.loading ? {
                    rotate: [0, 360],
                  } : {
                    rotate: [null, 0],
                  }}
                  transition={guessWho.loading ? {
                    ease: "linear",
                    repeat: Infinity,
                    duration: 1,
                  } : {
                    ease: "linear",
                    duration: 0,
                  }}
                >
                  <path d="M11.6309 0.515677C11.6228 0.208176 11.3776 0.01438 11.0263 0.0214448C10.6744 0.0285096 10.4931 0.233543 10.4353 0.541168C10.4054 0.700697 10.415 0.867597 10.4133 1.03126C10.4103 1.31047 10.4125 1.58974 10.4125 1.86901C10.3668 1.8888 10.321 1.9086 10.2753 1.92842C10.1218 1.78751 9.97085 1.64395 9.81434 1.50613C8.40375 0.264124 6.73012 -0.198246 4.85584 0.0765588C2.20954 0.46454 0.248857 2.56873 0.018784 5.19545C-0.197047 7.65949 1.46737 10.0403 3.96569 10.8411C6.49304 11.6513 9.30514 10.7083 10.7266 8.57158C10.8181 8.43402 10.9132 8.29281 10.969 8.14072C11.0775 7.84532 11.023 7.57031 10.7175 7.41246C10.4231 7.26041 10.1441 7.32148 9.93509 7.57954C9.83056 7.7086 9.7511 7.85582 9.65352 7.99037C8.77224 9.20579 7.56164 9.86803 6.01254 9.94015C3.9383 10.0367 2.03687 8.75176 1.43236 6.85779C0.80802 4.90168 1.67158 2.79401 3.51867 1.7658C5.31415 0.766283 7.61919 1.05312 9.07218 2.46247C9.17858 2.56567 9.25027 2.70153 9.42277 2.93848C8.85551 2.93848 8.41879 2.91642 7.98572 2.94493C7.58578 2.97129 7.37396 3.19858 7.37725 3.51768C7.38045 3.82837 7.60713 4.08544 7.99196 4.09448C8.99643 4.11808 10.002 4.10952 11.0069 4.09929C11.338 4.09593 11.6121 3.91491 11.6222 3.60245C11.6552 2.57421 11.6578 1.54408 11.6309 0.515677Z" fill="#A1AECB" />
                </motion.svg>
                <div>Refresh</div>
              </button>
            </div>
            <div className="text-[22px] font-[600] uppercase text-center pt-[13px]">
              All GAMES . {guessWho.list.total}
            </div>
            <div className="flex justify-end items-center gap-[10px] pt-[13px]">
              <button
                type="button"
                className="disabled:opacity-50 disabled:!cursor-not-allowed w-[18px] h-[18px] p-[3px] flex justify-center items-center rounded-[2px] border border-[#5E549D] bg-[#1A1843] shadow-[0_0_10px_0_rgba(0,0,0,0.05)]"
                disabled={guessWho.loading}
                onClick={() => {
                  guessWho.onJoined(!guessWho.list.joined);
                }}
              >
                {
                  guessWho.list.joined && (
                    <div
                      className={clsx(
                        "w-full h-full bg-[#BFFF60] rounded-[2px] flex justify-center items-center transition-all duration-300",
                      )}
                    />
                  )
                }
              </button>
              <div className="text-[#A1AECB]">
                You Joined only
              </div>
            </div>
          </div>
          <div className="w-full">
            <GridTable
              bodyClassName="max-h-[calc(100dvh_-_187px)] overflow-y-auto"
              headerRowClassName="!px-0 !gap-x-[20px]"
              bodyRowClassName="odd:bg-[unset] !px-0 !gap-x-[20px] text-[18px] h-[104px] bg-[url('/images/mainnet/arcade/guess-who/bg-room-item.png')] bg-no-repeat bg-center bg-contain"
              columns={[
                {
                  dataIndex: "room_id",
                  title: () => (
                    <div className="pl-[40px]">
                      Game No.
                    </div>
                  ),
                  width: 140,
                  sort: false,
                  render: (record: any) => {
                    return (
                      <div className="pl-[40px]">
                        {record.room_id}
                      </div>
                    );
                  },
                },
                {
                  dataIndex: "player",
                  title: "Player",
                  width: 250,
                  sort: false,
                  render: (record: any) => {
                    return (
                      <div className="flex items-center gap-[30px]">
                        <PlayerAvatar
                          avatar={record.players[0]?.avatar}
                          moves={record.players[0]?.moves}
                        />
                        <PlayerAvatar
                          avatar={record.players[1]?.avatar}
                          moves={record.players[1]?.moves}
                        />
                        <PlayerAvatar
                          avatar={record.players[2]?.avatar}
                          moves={record.players[2]?.moves}
                        />
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
                          {numberFormatter(record.bet_amount, 3, true, { isShort: true, isZeroPrecision: false })}
                        </div>
                      </div>
                    );
                  },
                },
                {
                  dataIndex: "create_time",
                  title: "Create Time",
                  width: 160,
                  sort: true,
                  render: (record: any) => {
                    return dayjs(record.create_time * 1000).utc().format("MM/DD/YYYY HH:mm");
                  },
                },
                {
                  dataIndex: "join",
                  title: "",
                  width: 120,
                  render: (record: any) => {
                    return (
                      <>
                        <HexagonButton
                          loading={record.loading}
                          disabled={record.loading}
                          height={36}
                          className="!text-[18px]"
                          innerClassName="!pl-[27px] !pr-[20px]"
                          onClick={() => {
                            join.onOpen(record);
                          }}
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
              data={guessWho.list.data}
              loading={guessWho.loading}
              sortDirection={guessWho.list.order as any}
              sortDataIndex={guessWho.list.sort}
              onSort={(dataIndex: any, nextDirection: any) => {
                guessWho.onSort(dataIndex, nextDirection);
              }}
            />
            <div className="flex justify-start items-center pl-[10px] py-[10px]">
              <Pagination
                page={guessWho.list.page}
                totalPage={guessWho.list.pageTotal}
                pageSize={guessWho.list.pageSize}
                onPageChange={(_page: number) => {
                  guessWho.onPageChange(_page);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <GuessWhoToast /> */}
      <JoinRoomModal
        open={join.open}
        onClose={join.onClose}
        room={guessWho.room}
        betToken={guessWho.betToken}
        betMonster={join.betMonster}
        onSelectMonster={join.onSelectMonster}
        onJoin={join.onJoin}
        joining={join.joining}
        resultPending={join.resultPending}
        setResultPending={join.setResultPending}
        result={join.result}
        buttonValid={join.buttonValid}
        lastMonsters={join.lastMonsters}
      />
    </div>
  );
};

export default GuessWho;
