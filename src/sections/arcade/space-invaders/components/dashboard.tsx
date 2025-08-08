import { motion } from "framer-motion";
import { AMOUNT_OPTIONS, LastGameStatus, NFT_AVATARS } from "../config";
import { useSpaceInvadersContext } from "../context";
import { useMemo } from "react";
import { monad } from "@/configs/tokens/monad-testnet";
import { numberFormatter } from "@/utils/number-formatter";
import { addressFormated } from "@/utils/balance";
import Loading from "@/components/loading";
import clsx from "clsx";
import Popover, { PopoverPlacement, PopoverTrigger } from "@/components/popover";
import Skeleton from "react-loading-skeleton";
import Big from "big.js";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Dashboard = (props: any) => {
  const { } = props;

  const {
    data,
    onAmountChange,
    amount,
    onMapChange,
    onCashOut,
    cashOutPending,
    gameLost,
    currentLayer,
    onGameStart,
    gameStarted,
    onVerifierOpen,
    startButton,
    userBalance,
    gameStartLoading,
    gameLoading,
    currentWinLayer,
    currentGameData,
    allNFTList,
    allNFTListLoading,
    setRecordsVisible,
    setRulesVisible,
  } = useSpaceInvadersContext();

  const amountIndex = useMemo(() => {
    return AMOUNT_OPTIONS.findIndex((option) => option.value === amount);
  }, [amount]);

  return (
    <div className={clsx(
      "fixed text-white font-[DelaGothicOne] font-[400] leading-[100%] text-[clamp(1px,_1.11vw,_calc(var(--nadsa-laptop-width)*0.0111))] left-1/2 -translate-x-1/2 bottom-0 z-[4] w-[clamp(1px,_41.67vw,_calc(var(--nadsa-laptop-width)*0.4167))] h-[clamp(1px,_17vw,_calc(var(--nadsa-laptop-width)*0.17))] rounded-t-[clamp(1px,_0.83vw,_calc(var(--nadsa-laptop-width)*0.0083))] border border-b-0 bg-[#191B25]",
      gameLost ? "border-[#FF3434] bg-[linear-gradient(0deg,_rgba(255,_52,_52,_0.06)_0%,_rgba(255,_52,_52,_0.06)_100%)]" : "border-[#3E347C]",
    )}>
      <div className="absolute z-[1] top-[clamp(1px,_1.11vw,_calc(var(--nadsa-laptop-width)*0.0111))] left-[clamp(1px,_1.11vw,_calc(var(--nadsa-laptop-width)*0.0111))] flex justify-start items-center">
        <button
          type="button"
          className="text-[#8A87AA] font-[SpaceGrotesk]"
          onClick={() => {
            setRulesVisible?.(true);
          }}
        >
          Rules
        </button>
      </div>
      <div className="absolute z-[1] top-[clamp(1px,_1.11vw,_calc(var(--nadsa-laptop-width)*0.0111))] right-[clamp(1px,_1.11vw,_calc(var(--nadsa-laptop-width)*0.0111))] flex justify-end items-center">
        <button
          type="button"
          className="text-[#8A87AA] font-[SpaceGrotesk]"
          onClick={() => {
            setRecordsVisible?.(true);
          }}
        >
          Stats
        </button>
      </div>
      {
        cashOutPending ? (
          <>
            <div className="mt-[5px] flex justify-center items-center gap-[clamp(1px,_0.69vw,_calc(var(--nadsa-laptop-width)*0.0069))] font-[DelaGothicOne] text-center text-[#BFFF60] text-[clamp(1px,_1.59vw,_calc(var(--nadsa-laptop-width)*0.0159))] pt-[clamp(1px,_4vw,_calc(var(--nadsa-laptop-width)*0.04))]">
              <div className="">Processing Payout</div>
              <motion.img
                src="/images/arcade/space-invaders/icon-loading.svg"
                alt=""
                className="flex-0 object-center object-contain w-[clamp(1px,_1.25vw,_calc(var(--nadsa-laptop-width)*0.0125))] h-[clamp(1px,_1.25vw,_calc(var(--nadsa-laptop-width)*0.0125))]"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
            </div>
            <div className="font-[SpaceGrotesk] text-[#8A87AA] mt-[clamp(1px,_4vw,_calc(var(--nadsa-laptop-width)*0.04))] text-center font-[500]">
              Your payout of <span className="text-[#BFFF60]">{numberFormatter(Big(currentWinLayer?.multiplier || 1).times(amount || 0), 2, true)} MON</span> is being processed...
            </div>
          </>
        ) : (
          gameStarted ? (
            <>
              <CurrentLayer
                multiple={currentWinLayer?.multiplier}
                amount={amount}
              />
              <CashOut
                onCashOut={onCashOut}
                cashOutPending={cashOutPending}
                currentWinLayer={currentWinLayer}
                currentGameData={currentGameData}
                className="mt-[clamp(1px,_2vw,_calc(var(--nadsa-laptop-width)*0.02))]"
              />
            </>
          ) : (
            <>
              {
                gameLost ? (
                  <div className="flex justify-center items-center gap-[clamp(1px,_1.04vw,_calc(var(--nadsa-laptop-width)*0.0104))] pt-[clamp(1px,_2vw,_calc(var(--nadsa-laptop-width)*0.02))]">
                    <img
                      src="/images/arcade/space-invaders/icon-attacked.png"
                      alt=""
                      className="w-[clamp(1px,_3.61vw,_calc(var(--nadsa-laptop-width)*0.0361))] h-[clamp(1px,_3.61vw,_calc(var(--nadsa-laptop-width)*0.0361))] shrink-0"
                    />
                    <div className="text-[#FF3434] text-[clamp(1px,_1.81vw,_calc(var(--nadsa-laptop-width)*0.0181))] font-[DelaGothicOne] font-[400] leading-[100%]">
                      ATTACKED
                    </div>
                  </div>
                ) : (
                  <CurrentLayer
                    multiple={currentWinLayer?.multiplier}
                    amount={amount}
                  />
                )
              }
              {
                gameStarted ? (
                  <CashOut
                    onCashOut={onCashOut}
                    cashOutPending={cashOutPending}
                    currentWinLayer={currentWinLayer}
                    currentGameData={currentGameData}
                    className="mt-[clamp(1px,_1vw,_calc(var(--nadsa-laptop-width)*0.01))]"
                  />
                ) : (
                  <div className="flex justify-center items-center gap-[clamp(1px,_0.83vw,_calc(var(--nadsa-laptop-width)*0.0083))] shrink-0 mt-[clamp(1px,_2vw,_calc(var(--nadsa-laptop-width)*0.02))]">
                    <div className="">
                      BET
                    </div>
                    <div className="relative ml-[clamp(1px,_0.49vw,_calc(var(--nadsa-laptop-width)*0.0049))] flex-0 flex justify-center items-center bg-[rgba(255,_255,_255,_0.10)] h-[clamp(1px,_3.19vw,_calc(var(--nadsa-laptop-width)*0.0319))] border border-[#3B3951] rounded-[clamp(1px,_0.83vw,_calc(var(--nadsa-laptop-width)*0.0083))] backdrop-blur-[clamp(1px,_1.74vw,_calc(var(--nadsa-laptop-width)*0.0174))] p-[clamp(1px,_0.35vw,_calc(var(--nadsa-laptop-width)*0.0035))]">
                      {
                        AMOUNT_OPTIONS.map((option) => (
                          <button
                            type="button"
                            className="disabled:opacity-50 disabled:!cursor-not-allowed w-[clamp(1px,_6.81vw,_calc(var(--nadsa-laptop-width)*0.0681))] h-full flex justify-center items-center relative z-[1] button"
                            onClick={() => {
                              onAmountChange?.(option.value);
                            }}
                            disabled={(!gameStarted && currentGameData?.status === LastGameStatus.Ongoing) || gameLoading || gameStartLoading}
                          >
                            {option.label}
                          </button>
                        ))
                      }
                      <motion.div
                        className="w-[clamp(1px,_6.81vw,_calc(var(--nadsa-laptop-width)*0.0681))] h-[calc(100%_-_clamp(1px,_0.7vw,_calc(var(--nadsa-laptop-width)*0.007)))] bg-[#5237FF] border border-[#413C54] rounded-[clamp(1px,_0.69vw,_calc(var(--nadsa-laptop-width)*0.0069))] absolute z-[0] left-[clamp(1px,_0.35vw,_calc(var(--nadsa-laptop-width)*0.0035))] top-[clamp(1px,_0.35vw,_calc(var(--nadsa-laptop-width)*0.0035))]"
                        initial={{
                          x: 0,
                        }}
                        animate={{
                          x: `${100 * amountIndex}%`,
                        }}
                      />
                    </div>
                    <Popover
                      content={startButton?.tooltip ? (
                        <div className="p-[10px_15px] rounded-[6px] text-white font-[Montserrat] text-[14px] leading-[120%] border border-[#514F60] bg-[#2B294A] shadow-[0_0_10px_0_rgba(0,_0,_0,_0.05)]">
                          {startButton?.tooltip}
                        </div>
                      ) : null}
                      placement={PopoverPlacement.Top}
                      trigger={PopoverTrigger.Hover}
                      closeDelayDuration={0}
                    >
                      <button
                        type="button"
                        className="disabled:opacity-50 disabled:!cursor-not-allowed button w-[clamp(1px,_10vw,_calc(var(--nadsa-laptop-width)*0.1))] flex-0 h-[clamp(1px,_3.19vw,_calc(var(--nadsa-laptop-width)*0.0319))] rounded-[clamp(1px,_0.83vw,_calc(var(--nadsa-laptop-width)*0.0083))] border border-[#413C54] bg-[#5237FF] text-white font-[DelaGothicOne] font-[400] leading-[100%] text-[clamp(1px,_1.11vw,_calc(var(--nadsa-laptop-width)*0.0111))] flex justify-center items-center gap-[clamp(1px,_0.5vw,_calc(var(--nadsa-laptop-width)*0.005))]"
                        onClick={onGameStart}
                        disabled={startButton?.disabled || gameStartLoading || gameLoading}
                      >
                        <div>
                          {(gameStartLoading || gameLoading) && (
                            <Loading size={16} />
                          )}
                        </div>
                        <div>
                          {startButton?.text}
                        </div>
                      </button>
                    </Popover>
                  </div>
                )
              }
              <div className="whitespace-nowrap flex justify-between items-center gap-[clamp(1px,_5.42vw,_calc(var(--nadsa-laptop-width)*0.0542))] pt-[clamp(1px,_2vw,_calc(var(--nadsa-laptop-width)*0.02))] pl-[clamp(1px,_2.22vw,_calc(var(--nadsa-laptop-width)*0.0222))] pr-[clamp(1px,_4.1vw,_calc(var(--nadsa-laptop-width)*0.041))]">
                <button
                  type="button"
                  className="disabled:opacity-50 disabled:!cursor-not-allowed flex items-center gap-[clamp(1px,_0.49vw,_calc(var(--nadsa-laptop-width)*0.0049))] text-[#8A87AA] text-[clamp(1px,_1.11vw,_calc(var(--nadsa-laptop-width)*0.0111))] font-[400] leading-[100%] font-[SpaceGrotesk]"
                  disabled={gameLoading || (!gameStarted && currentGameData?.status === LastGameStatus.Ongoing) || gameStartLoading}
                  onClick={onMapChange}
                >
                  <img
                    src="/images/arcade/space-invaders/icon-reload.png"
                    alt=""
                    className="w-[clamp(1px,_1.39vw,_calc(var(--nadsa-laptop-width)*0.0139))] h-[clamp(1px,_1.39vw,_calc(var(--nadsa-laptop-width)*0.0139))] flex-0 object-center object-contain"
                  />
                  <div className="">Shuffle Gates</div>
                </button>
                {
                  gameLost && (
                    <button
                      type="button"
                      className="flex items-center gap-[clamp(1px,_0.49vw,_calc(var(--nadsa-laptop-width)*0.0049))] text-[#8A87AA] text-[clamp(1px,_1.11vw,_calc(var(--nadsa-laptop-width)*0.0111))] font-[400] leading-[100%] font-[SpaceGrotesk]"
                      onClick={() => {
                        onVerifierOpen?.();
                      }}
                    >
                      <img
                        src="/images/arcade/space-invaders/icon-provably.png"
                        alt=""
                        className="w-[clamp(1px,_1.39vw,_calc(var(--nadsa-laptop-width)*0.0139))] h-[clamp(1px,_1.39vw,_calc(var(--nadsa-laptop-width)*0.0139))] flex-0 object-center object-contain"
                      />
                      <div className="">Provably fair</div>
                    </button>
                  )
                }
                <button
                  type="button"
                  className="flex items-center gap-[clamp(1px,_0.49vw,_calc(var(--nadsa-laptop-width)*0.0049))] text-[#12FFC0] text-[clamp(1px,_0.83vw,_calc(var(--nadsa-laptop-width)*0.0083))] font-[400] leading-[100%] font-[DelaGothicOne] !cursor-default"
                >
                  <img
                    src="/images/arcade/space-invaders/icon-wallet.png"
                    alt=""
                    className="w-[clamp(1px,_1.39vw,_calc(var(--nadsa-laptop-width)*0.0139))] h-[clamp(1px,_1.39vw,_calc(var(--nadsa-laptop-width)*0.0139))] flex-0 object-center object-contain"
                  />
                  <div className="">
                    {numberFormatter(userBalance, 2, true)} MON
                  </div>
                </button>
              </div>
            </>
          )
        )
      }
      {
        allNFTList?.length && (
          <div
            className="absolute right-[clamp(calc(var(--nadsa-laptop-width)_*_-0.16),_-16vw,_1px)] bottom-[clamp(1px,_3vw,_calc(var(--nadsa-laptop-width)*0.03))] pl-[clamp(1px,_3vw,_calc(var(--nadsa-laptop-width)*0.03))] pt-[clamp(1px,_1.8vw,_calc(var(--nadsa-laptop-width)*0.018))] pr-[clamp(1px,_0.85vw,_calc(var(--nadsa-laptop-width)*0.0085))] w-[clamp(1px,_16vw,_calc(var(--nadsa-laptop-width)*0.16))] h-[clamp(1px,_13.894vw,_calc(var(--nadsa-laptop-width)*0.13894))] bg-[url('/images/arcade/space-invaders/nft-board.png')] bg-no-repeat bg-left bg-contain"
          >
            {
              allNFTListLoading ? (
                <div className="flex w-full items-center gap-[clamp(1px,_0.42vw,_calc(var(--nadsa-laptop-width)*0.0042))]">
                  <Skeleton className="w-[clamp(1px,_3.47vw,_calc(var(--nadsa-laptop-width)*0.0347))] h-[clamp(1px,_3.47vw,_calc(var(--nadsa-laptop-width)*0.0347))]" />
                  <div className="w-0 flex-1">
                    <Skeleton className="h-[clamp(1px,_0.69vw,_calc(var(--nadsa-laptop-width)*0.0069))] mb-[clamp(1px,_0.2vw,_calc(var(--nadsa-laptop-width)*0.002))]" />
                    <Skeleton className="h-[clamp(1px,_0.80vw,_calc(var(--nadsa-laptop-width)*0.0080))] mb-[clamp(1px,_0.2vw,_calc(var(--nadsa-laptop-width)*0.002))]" />
                    <Skeleton className="h-[clamp(1px,_0.80vw,_calc(var(--nadsa-laptop-width)*0.0080))]" />
                  </div>
                </div>
              ) : allNFTList && allNFTList.length > 0 ? (
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={0}
                  slidesPerView={1}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  className="w-full h-full"
                >
                  {allNFTList.map((nft, index) => {
                    const avatar = NFT_AVATARS[nft.category];
                    return (
                      <SwiperSlide key={index}>
                        <div className="flex w-full items-center gap-[clamp(1px,_0.42vw,_calc(var(--nadsa-laptop-width)*0.0042))]">
                          <img
                            src={avatar}
                            alt=""
                            className="rounded-[clamp(1px,_0.417vw,_calc(var(--nadsa-laptop-width)*0.00417))] w-[clamp(1px,_3.47vw,_calc(var(--nadsa-laptop-width)*0.0347))] h-[clamp(1px,_3.47vw,_calc(var(--nadsa-laptop-width)*0.0347))] object-center object-contain flex-0"
                          />
                          <div className="w-0 flex-1 font-[Unbounded] text-white text-[clamp(1px,_0.80vw,_calc(var(--nadsa-laptop-width)*0.0080))] font-[500] leading-[normal]">
                            <div className="text-[#A6A6DB] text-[clamp(1px,_0.69vw,_calc(var(--nadsa-laptop-width)*0.0069))] font-[300]">
                              NFT Airdrop
                            </div>
                            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                              {nft?.category}
                            </div>
                            <div className="text-[#03E212] font-[HackerNoonV2] font-[400] leading-[120%] mt-[clamp(1px,_0.2vw,_calc(var(--nadsa-laptop-width)*0.002))]">
                              {nft?.remaining || 0}/{nft?.total || 0}
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              ) : null
            }
          </div>
        )
      }
    </div>
  );
};

export default Dashboard;

const CurrentLayer = (props: any) => {
  const { className, multiple = 1, amount } = props;

  return (
    <div className={clsx("flex justify-center items-center gap-[clamp(1px,_6.25vw,_calc(var(--nadsa-laptop-width)*0.0625))] pt-[clamp(1px,_3vw,_calc(var(--nadsa-laptop-width)*0.03))]", className)}>
      <div className="text-[clamp(1px,_2.08vw,_calc(var(--nadsa-laptop-width)*0.0208))]">
        {numberFormatter(multiple, 2, true, { isZeroPrecision: true })}x
      </div>
      <div className="flex items-center gap-[clamp(1px,_0.556vw,_calc(var(--nadsa-laptop-width)*0.00556))]">
        <img
          src={monad["mon"].icon}
          alt=""
          className="w-[clamp(1px,_2.08vw,_calc(var(--nadsa-laptop-width)*0.0208))] h-[clamp(1px,_2.08vw,_calc(var(--nadsa-laptop-width)*0.0208))] object-center object-contain flex-0"
        />
        <div className="text-[#BFFF60] text-[clamp(1px,_2.08vw,_calc(var(--nadsa-laptop-width)*0.0208))]">
          {numberFormatter(Big(amount || 0).times(multiple || 1), 2, true)}
        </div>
      </div>
    </div>
  );
};

const CashOut = (props: any) => {
  const { className, onCashOut, cashOutPending, currentWinLayer, currentGameData } = props;

  return (
    <>
      <div className={clsx("flex justify-center items-center", className)}>
        <button
          type="button"
          className="disabled:opacity-50 disabled:!cursor-not-allowed w-[clamp(1px,_25.69vw,_calc(var(--nadsa-laptop-width)*0.2569))] h-[clamp(1px,_3.19vw,_calc(var(--nadsa-laptop-width)*0.0319))] gap-[clamp(1px,_0.5vw,_calc(var(--nadsa-laptop-width)*0.005))] border border-[#413C54] bg-[#5237FF] rounded-[clamp(1px,_0.69vw,_calc(var(--nadsa-laptop-width)*0.0069))] flex justify-center items-center button text-white text-[clamp(1px,_1.11vw,_calc(var(--nadsa-laptop-width)*0.0111))] font-[DelaGothicOne] font-[400] leading-[100%] uppercase"
          onClick={onCashOut}
          disabled={cashOutPending || !currentWinLayer}
        >
          {
            cashOutPending && (
              <Loading size={16} />
            )
          }
          <div>Cash Out</div>
        </button>
      </div>
      <div className="flex justify-center items-center pt-[clamp(1px,_2vw,_calc(var(--nadsa-laptop-width)*0.02))] text-[#8A87AA] font-[SpaceGrotesk]">
        Game Hash: {addressFormated(currentGameData?.create_hash || "")}
      </div>
    </>
  );
}
