import { motion } from "framer-motion";
import { AMOUNT_OPTIONS } from "../config";
import { useSpaceInvadersContext } from "../context";
import { useMemo } from "react";
import { monad } from "@/configs/tokens/monad-testnet";
import { numberFormatter } from "@/utils/number-formatter";
import { addressFormated } from "@/utils/balance";
import Loading from "@/components/loading";
import clsx from "clsx";

const Dashboard = (props: any) => {
  const { } = props;

  const {
    onAmountChange,
    amount,
    onMapChange,
    userGameData,
    userGameDataLoading,
    onCashOut,
    cashOutPending,
    gameFailed,
    currentLayer,
    onGameStart,
    gameStarted,
  } = useSpaceInvadersContext();

  const amountIndex = useMemo(() => {
    return AMOUNT_OPTIONS.findIndex((option) => option.value === amount);
  }, [amount]);

  return (
    <div className={clsx(
      "fixed text-white font-[DelaGothicOne] font-[400] leading-[100%] text-[1.11vw] left-1/2 -translate-x-1/2 bottom-0 z-[4] w-[41.67vw] h-[14.03vw] rounded-t-[0.83vw] border border-b-0 bg-[#191B25]",
      gameFailed ? "border-[#FF3434] bg-[linear-gradient(0deg,_rgba(255,_52,_52,_0.06)_0%,_rgba(255,_52,_52,_0.06)_100%)]" : "border-[#3E347C]",
    )}>
      {
        gameStarted ? (
          <>
            <CurrentLayer
              multiple={currentLayer?.multiple}
              amount={amount}
            />
            <CashOut
              onCashOut={onCashOut}
              cashOutPending={cashOutPending}
            />
          </>
        ) : (
          <>
            {
              gameFailed ? (
                <div className="flex justify-center items-center gap-[1.04vw] pt-[1vw]">
                  <img
                    src="/images/arcade/space-invaders/icon-attacked.png"
                    alt=""
                    className="w-[3.61vw] h-[3.61vw] shrink-0"
                  />
                  <div className="text-[#FF3434] text-[1.81vw] font-[DelaGothicOne] font-[400] leading-[100%]">
                    ATTACKED
                  </div>
                </div>
              ) : (
                <CurrentLayer
                  multiple={currentLayer?.multiple}
                  amount={amount}
                />
              )
            }
            {
              gameStarted ? (
                <CashOut
                  onCashOut={onCashOut}
                  cashOutPending={cashOutPending}
                />
              ) : (
                <div className="flex justify-center items-center gap-[0.83vw] shrink-0 mt-[1vw]">
                  <div className="">
                    BET
                  </div>
                  <div className="relative ml-[0.49vw] flex-0 flex justify-center items-center bg-[rgba(255,_255,_255,_0.10)] h-[3.19vw] border border-[#3B3951] rounded-[0.83vw] backdrop-blur-[1.74vw] p-[0.35vw]">
                    {
                      AMOUNT_OPTIONS.map((option) => (
                        <button
                          type="button"
                          className="w-[6.81vw] h-full flex justify-center items-center relative z-[1] button"
                          onClick={() => {
                            onAmountChange?.(option.value);
                          }}
                        >
                          {option.label}
                        </button>
                      ))
                    }
                    <motion.div
                      className="w-[6.81vw] h-[calc(100%_-_0.7vw)] bg-[#5237FF] border border-[#413C54] rounded-[0.69vw] absolute z-[0] left-[0.35vw] top-[0.35vw]"
                      initial={{
                        x: 0,
                      }}
                      animate={{
                        x: `${100 * amountIndex}%`,
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="button w-[10vw] flex-0 h-[3.19vw] rounded-[0.83vw] border border-[#413C54] bg-[#5237FF] text-white font-[DelaGothicOne] font-[400] leading-[100%] text-[1.11vw] flex justify-center items-center gap-[0.5vw]"
                    onClick={onGameStart}
                  >
                    GO!
                  </button>
                </div>
              )
            }
            <div className="flex justify-between items-center gap-[5.42vw] pl-[2.22vw] pr-[4.1vw] mt-[1vw]">
              <button
                type="button"
                className="flex items-center gap-[0.49vw] text-[#8A87AA] text-[1.11vw] font-[400] leading-[100%] font-[SpaceGrotesk]"
                onClick={onMapChange}
              >
                <img
                  src="/images/arcade/space-invaders/icon-reload.png"
                  alt=""
                  className="w-[1.39vw] h-[1.39vw] flex-0 object-center object-contain"
                />
                <div className="">Shuffle Gates</div>
              </button>
              {
                gameFailed && (
                  <button
                    type="button"
                    className="flex items-center gap-[0.49vw] text-[#8A87AA] text-[1.11vw] font-[400] leading-[100%] font-[SpaceGrotesk]"
                  >
                    <img
                      src="/images/arcade/space-invaders/icon-provably.png"
                      alt=""
                      className="w-[1.39vw] h-[1.39vw] flex-0 object-center object-contain"
                    />
                    <div className="">Provably fair</div>
                  </button>
                )
              }
              <button
                type="button"
                className="flex items-center gap-[0.49vw] text-[#12FFC0] text-[0.83vw] font-[400] leading-[100%] font-[DelaGothicOne] !cursor-default"
              >
                <img
                  src="/images/arcade/space-invaders/icon-wallet.png"
                  alt=""
                  className="w-[1.39vw] h-[1.39vw] flex-0 object-center object-contain"
                />
                <div className="">4.2 MON</div>
              </button>
            </div>
            <div className="absolute right-[-13.75vw] bottom-[2vw] pl-[2.29vw] pt-[1.36vw] w-[13.75vw] h-[11.94vw] bg-[url('/images/arcade/space-invaders/nft-board.png')] bg-no-repeat bg-left bg-contain">
              <div className="flex items-center gap-[0.42vw]">
                <img
                  src="/images/arcade/space-invaders/nft-avatar.png"
                  alt=""
                  className="w-[3.47vw] h-[3.47vw] object-center object-contain flex-0"
                />
                <div className="font-[Unbounded] text-white text-[0.83vw] font-[500] leading-[normal]">
                  <div className="text-[#A6A6DB] text-[0.69vw] font-[300]">NFT Airdrop</div>
                  <div className="">Monadverse</div>
                  <div className="text-[#03E212] font-[HackerNoonV2] font-[400] leading-[120%] mt-[0.2vw]">
                    50/50
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  );
};

export default Dashboard;

const CurrentLayer = (props: any) => {
  const { className, multiple, amount } = props;

  return (
    <div className={clsx("flex justify-center items-center gap-[6.25vw] pt-[2.08vw]", className)}>
      <div className="text-[2.08vw]">
        {numberFormatter(multiple, 2, true, { isZeroPrecision: true })}x
      </div>
      <div className="flex items-center gap-[0.556vw]">
        <img
          src={monad["mon"].icon}
          alt=""
          className="w-[2.08vw] h-[2.08vw] object-center object-contain flex-0"
        />
        <div className="text-[#BFFF60] text-[2.08vw]">
          {numberFormatter(amount, 2, true)}
        </div>
      </div>
    </div>
  );
};

const CashOut = (props: any) => {
  const { className, onCashOut, cashOutPending } = props;

  return (
    <>
      <div className="flex justify-center items-center pt-[1.6vw]">
        <button
          type="button"
          className="disabled:opacity-50 disabled:!cursor-not-allowed w-[25.69vw] h-[3.19vw] gap-[0.5vw] border border-[#413C54] bg-[#5237FF] rounded-[0.69vw] flex justify-center items-center button text-white text-[1.11vw] font-[DelaGothicOne] font-[400] leading-[100%] uppercase"
          onClick={onCashOut}
          disabled={cashOutPending}
        >
          {
            cashOutPending && (
              <Loading size={16} />
            )
          }
          <div>Cash Out</div>
        </button>
      </div>
      <div className="flex justify-center items-center pt-[1.5vw] text-[#8A87AA] font-[SpaceGrotesk]">
        Game Hash: {addressFormated("0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef")}
      </div>
    </>
  );
}
