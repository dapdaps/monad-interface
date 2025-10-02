import clsx from "clsx";
import Eyes from "./components/eyes";
import { Monster, Status, StatusMap } from "./config";
import { useCreate } from "./hooks/use-create";
import Monsters from "./components/monsters";
import { AnimatePresence, motion } from "framer-motion";
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
import { useProgressRouter } from "@/hooks/use-progress-router";
import Audios from "./components/audios";
import TimeAgo from "./components/time-ago";
import Big from "big.js";
import { useClaim } from "./hooks/use-claim";
import ClaimModal from "./components/claim";
import HistoryModal from "./components/history";

const GuessWho = () => {

  const router = useProgressRouter();

  const guessWho = useGuessWho();
  const create = useCreate(guessWho);
  const join = useJoin(guessWho);
  const claim = useClaim(guessWho);

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
                className="absolute z-[1] top-[50px]"
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
                className="absolute z-[1] top-[250px] w-[422px] mx-auto"
                betToken={guessWho.betToken}
                playAudio={guessWho.playAudio}
                betAmount={create.betAmount}
                setBetAmount={create.setBetAmount}
              />
              <div className="absolute bottom-[-50px] w-[480px] h-[166px] flex justify-center items-center bg-[url('/images/mainnet/arcade/guess-who/create-game-base.png')] bg-no-repeat bg-center bg-contain">
                <motion.button
                  type="button"
                  className="w-[218px] h-[86px] text-[center] text-[20px] text-white uppercase font-[600] flex justify-center items-center disabled:!cursor-not-allowed disabled:opacity-50 shrink-0 bg-[url('/images/mainnet/arcade/guess-who/create-game-button2.png')] bg-no-repeat bg-center bg-contain"
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
                >
                  {create.buttonValid.text}
                </motion.button>
              </div>
            </div>
            <div className="w-[370px] h-[172px] flex flex-col items-stretch mt-[70px] translate-x-[20px] shrink-0 mb-[20px]">
              <div className="absolute z-[1] left-0 top-0 w-full h-full bg-[radial-gradient(50%_87.3%_at_50%_29.37%,rgba(0,0,0,0.15)_0%,rgba(165,255,253,0.15)_100%)] blur-[5px]"></div>
              <div className="relative z-[2] w-full border-b-[2px] pl-[3px] pr-[10px] shrink-0 text-white text-[18px] font-[600] border-t-[2px] border-[#A5FFFD] pt-[7px] pb-[10px] flex justify-between items-center">
                <div className="uppercase">
                  Joining
                </div>
                <div className="">
                  {numberFormatter(guessWho.userLatest?.length, 0, true)}
                </div>
              </div>
              <div className="relative z-[2] w-full h-0 flex-1 overflow-y-auto">
                {
                  guessWho.userLatest.map((it: any, idx: number) => (
                    <div
                      key={idx}
                      className="w-full flex justify-between items-center gap-[10px] pt-[12px] pb-[5px] pl-[3px] pr-[10px]"
                    >
                      <div className="flex items-center gap-[10px] shrink-0">
                        <div className="max-w-[60px] whitespace-nowrap overflow-hidden text-ellipsis" title={it.room_id}>
                          {it.room_id}
                        </div>
                        <div className="flex items-center gap-[15px]">
                          {
                            it.status === Status.Won && it.winner_address ? (
                              it.players?.filter((player: any) => player.moves !== it.winner_moves)?.map((player: any, playerIdx: number) => (
                                <PlayerAvatar
                                  key={`${idx}-${playerIdx}`}
                                  avatar={player.avatar}
                                  moves={player.moves}
                                  className="!w-[26px] !h-[26px] !rounded-[8px] translate-y-[0px]"
                                />
                              ))
                            ) : (
                              <>
                                <PlayerAvatar
                                  key={`${idx}-${0}`}
                                  avatar={it.players?.[0]?.avatar}
                                  moves={it.players?.[0]?.moves}
                                  className="!w-[26px] !h-[26px] !rounded-[8px] translate-y-[0px]"
                                />
                                <PlayerAvatar
                                  key={`${idx}-${1}`}
                                  avatar={it.players?.[1]?.avatar}
                                  moves={it.players?.[1]?.moves}
                                  className="!w-[26px] !h-[26px] !rounded-[8px] translate-y-[0px]"
                                />
                                <PlayerAvatar
                                  key={`${idx}-${2}`}
                                  avatar={it.players?.[2]?.avatar}
                                  moves={it.players?.[2]?.moves}
                                  className="!w-[26px] !h-[26px] !rounded-[8px] translate-y-[0px]"
                                />
                              </>
                            )
                          }
                        </div>
                      </div>
                      <div className="shrink-0 flex justify-end items-center gap-[5px]">
                        {
                          it.status === Status.Won && it.winner_address ? (
                            <div className="flex justify-end items-center gap-[2px]">
                              <div className="text-[#BFFF60]">
                                {numberFormatter(Big(it.bet_amount || 0).times(3), 2, true, { isShort: true })} {guessWho.betToken?.symbol} Winner
                              </div>
                              <PlayerAvatar
                                avatar={it.players?.find?.((player: any) => player.moves === it.winner_moves)?.avatar}
                                moves={it.players?.find?.((player: any) => player.moves === it.winner_moves)?.moves}
                                className="!w-[26px] !h-[26px] !rounded-[8px] translate-y-[0px]"
                              />
                            </div>
                          ) : (
                            <div
                              className=""
                              style={{
                                color: StatusMap[it.status as Status].color,
                              }}
                            >
                              {StatusMap[it.status as Status].name}
                            </div>
                          )
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className="shrink-0 w-[890px]">
          <div className="w-full flex justify-between items-center gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <button
                type="button"
                className="group hover:text-white hover:bg-[radial-gradient(50%_66%_at_46%_50%,_#553BE4_0%,_#221662_100%)] transition-all duration-150 flex items-center justify-center gap-[10px] w-[86px] h-[32px] shrink-0 text-[#A1AECB] text-[16px] font-normal leading-normal bg-black rounded-[4px] border border-[#34304B]"
                onClick={() => {
                  guessWho.playAudio({ type: "click", action: "play" });
                  router.back();
                }}
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
            </div>
            <div className="flex justify-center items-center gap-[60px]">
              <motion.button
                type="button"
                className="group relative text-[22px] font-[600] uppercase text-center"
                initial={{
                  color: "#727D97",
                }}
                animate={{
                  color: guessWho.listTab === "all" ? "#FFF" : "#727D97",
                }}
                whileHover={{
                  color: "#FFF",
                }}
                onClick={() => {
                  if (guessWho.listTab === "all") return;
                  guessWho.playAudio({ type: "click", action: "play" });
                  guessWho.setListTab("all");
                }}
              >
                All GAMES
                <div
                  className={clsx(
                    "w-full h-[3px] bg-[#A5FFFD] absolute bottom-0 transition-all duration-300 group-hover:opacity-100  group-hover:translate-y-[5px]",
                    guessWho.listTab === "all" ? "opacity-100 translate-y-[5px]" : "opacity-0 translate-y-[-5px]",
                  )}
                />
              </motion.button>
              <motion.button
                type="button"
                className="group relative text-[22px] font-[600] uppercase text-center"
                initial={{
                  color: "#727D97",
                }}
                animate={{
                  color: guessWho.listTab === "yours" ? "#FFF" : "#727D97",
                }}
                whileHover={{
                  color: "#FFF",
                }}
                onClick={() => {
                  if (guessWho.listTab === "yours") return;
                  guessWho.playAudio({ type: "click", action: "play" });
                  guessWho.setListTab("yours");
                }}
              >
                Yours
                <div
                  className={clsx(
                    "w-full h-[3px] bg-[#A5FFFD] absolute bottom-0 transition-all duration-300 group-hover:opacity-100  group-hover:translate-y-[5px]",
                    guessWho.listTab === "yours" ? "opacity-100 translate-y-[5px]" : "opacity-0 translate-y-[-5px]",
                  )}
                />
              </motion.button>
            </div>
            <div className="flex justify-end items-center gap-[12px]">
              <button
                type="button"
                className="group disabled:opacity-50 disabled:!cursor-not-allowed hover:text-white hover:bg-[radial-gradient(50%_66%_at_46%_50%,_#553BE4_0%,_#221662_100%)] transition-all duration-150 flex items-center justify-center gap-[10px] w-[33px] h-[28px] shrink-0 text-[#66657E] text-[16px] font-normal leading-normal bg-black/50 rounded-[2px] border border-[#383E4E] backdrop-blur-[10px]"
                disabled={guessWho.loading || guessWho.userListLoading}
                onClick={() => {
                  guessWho.playAudio({ type: "click", action: "play" });
                  if (guessWho.listTab === "yours") {
                    guessWho.getUserList();
                    return;
                  }
                  guessWho.getList();
                }}
              >
                <motion.svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[15px] h-[16px] shrink-0 group-hover:[filter:drop-shadow(0_0_10px_rgba(255,255,255,0.60))]"
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
                  <path d="M8.4375 15.5L9.375 11.75H11.6672C12.6045 10.726 13.1246 9.38822 13.125 8C13.125 5.44063 11.4113 3.21406 9.07125 2.52125C8.68875 2.40875 8.4375 2.04313 8.4375 1.64375C8.4375 1.03719 9.01594 0.570312 9.59812 0.740938C12.7181 1.65969 15 4.58656 15 8C15 11.7847 12.0806 14.9872 8.4375 15.5ZM0 8C0 4.21625 2.91938 1.01281 6.5625 0.5L5.625 4.25H3.33281C2.3955 5.27401 1.87544 6.61178 1.875 8C1.875 10.5594 3.58875 12.7859 5.92875 13.4778C6.11462 13.5369 6.27657 13.6542 6.39068 13.8124C6.5048 13.9706 6.56503 14.1612 6.5625 14.3562C6.5625 14.9628 5.98406 15.4297 5.40188 15.2591C2.28188 14.3403 0 11.4134 0 8Z" fill="currentColor" />
                </motion.svg>
              </button>
              <button
                type="button"
                className="text-[#A1AECB] font-[400] pr-[5px] hover:text-white transition-all duration-300"
                onClick={() => {
                  guessWho.playAudio({ type: "click", action: "play" });
                  guessWho.setHistoryOpen(true);
                }}
              >
                History
              </button>
            </div>
          </div>

          <AnimatePresence>
            {
              guessWho.listTab === "all" && (
                <motion.div
                  key="all"
                  className="w-full mt-[10px]"
                  initial={{
                    opacity: 0,
                    x: -200,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                >
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
                        width: 300,
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
                        dataIndex: "create_time",
                        title: "Time",
                        width: 110,
                        sort: true,
                        render: (record: any) => {
                          return (
                            <TimeAgo record={record} />
                          )
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
                </motion.div>
              )
            }
            {
              guessWho.listTab === "yours" && (
                <motion.div
                  key="yours"
                  className="w-full mt-[10px]"
                  initial={{
                    opacity: 0,
                    x: 200,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                >
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
                            <div className={clsx("pl-[40px]", [Status.Won, Status.Canceled].includes(record.status) && "opacity-50")}>
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
                            <div className={clsx("flex items-center gap-[30px]", [Status.Won, Status.Canceled].includes(record.status) && "opacity-50")}>
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
                        dataIndex: "create_time",
                        title: "Time",
                        width: 90,
                        render: (record: any) => {
                          return (
                            <TimeAgo record={record} className={[Status.Won, Status.Canceled].includes(record.status) ? "opacity-50" : ""} />
                          )
                        },
                      },
                      {
                        dataIndex: "bet_amount",
                        title: "Bet Price",
                        width: 100,
                        render: (record: any) => {
                          return (
                            <div className={clsx("flex items-center gap-[6px]", [Status.Won, Status.Canceled].includes(record.status) ? "opacity-50" : "")}>
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
                        dataIndex: "status",
                        title: "Status",
                        width: 200,
                        render: (record: any) => {
                          return record.status === Status.Won && record.winner_address ? (
                            <div className="flex items-center gap-[15px] opacity-50">
                              <div className="">
                                {StatusMap[record.status as Status].name2}
                              </div>
                              <PlayerAvatar
                                avatar={record.players?.find((player: any) => player.moves === record.winner_moves)?.avatar}
                                moves={record.players?.find((player: any) => player.moves === record.winner_moves)?.moves}
                                className="!w-[34px] !h-[34px] !rounded-[8px] translate-y-[0px]"
                              />
                              <div className="text-[#BFFF60] text-[16px] font-[400]">
                                <div className="max-w-[70px] overflow-hidden whitespace-nowrap">
                                  {numberFormatter(Big(record.bet_amount || 0).times(3), 2, true, { isShort: true })} {guessWho.betToken?.symbol}
                                </div>
                                <div className="mt-[0px]">
                                  Winner
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="flex items-center gap-[5px]"
                              style={{
                                color: StatusMap[record.status as Status].color,
                              }}
                            >
                              <div className="shrink-0">{StatusMap[record.status as Status].name}</div>
                              {
                                record.canClaim && (
                                  <HexagonButton
                                    type="button"
                                    className="w-[80px] !bg-[#C7853A] !text-[#C7853A] hover:!text-white"
                                    innerClassName="!bg-[#221F32] !bg-[url('')]"
                                    hoverClassName="!bg-[#C7853A]"
                                    height={36}
                                    onClick={() => {
                                      claim.onClaimOpen(true, record);
                                    }}
                                  >
                                    <div>Close</div>
                                  </HexagonButton>
                                )
                              }
                            </div>
                          );
                        },
                      },
                    ]}
                    data={guessWho.userList.data}
                    loading={guessWho.userListLoading}
                    sortDirection={guessWho.userList.order as any}
                    sortDataIndex={guessWho.userList.sort}
                    onSort={(dataIndex: any, nextDirection: any) => {
                      guessWho.onUserListSort(dataIndex, nextDirection);
                    }}
                  />
                  <div className="flex justify-start items-center pl-[10px] py-[10px]">
                    <Pagination
                      page={guessWho.userList.page}
                      totalPage={guessWho.userList.pageTotal}
                      pageSize={guessWho.userList.pageSize}
                      onPageChange={(_page: number) => {
                        guessWho.onUserListPageChange(_page);
                      }}
                    />
                  </div>
                </motion.div>
              )
            }
          </AnimatePresence>

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
      <HistoryModal
        open={guessWho.historyOpen}
        onClose={() => {
          guessWho.setHistoryOpen(false);
        }}
      />
      <ClaimModal
        account={guessWho.account}
        open={claim.claimData.open}
        room={claim.claimData.room}
        onClose={() => {
          claim.onClaimOpen(false);
        }}
        onClaim={claim.onClaim}
        claiming={claim.claiming}
      />
      <Audios audioRefs={guessWho.audioRefs} />
    </div>
  );
};

export default GuessWho;
