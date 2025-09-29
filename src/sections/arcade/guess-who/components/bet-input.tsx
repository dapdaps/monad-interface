import InputNumber from "@/components/input-number";
import clsx from "clsx";
import { RPS_MIN_BET_AMOUNT } from "../config";
import Big from "big.js";
import { numberRemoveEndZero } from "@/utils/number-formatter";

const BetInput = (props: any) => {
  const {
    className,
    betToken,
    setBetAmount,
    betAmount,
  } = props;

  return (
    <div className={clsx("flex justify-center items-center gap-[10px]", className)}>
      <div className="relative h-[56px] flex-1 flex justify-center items-center">
        <InputNumber
          className="h-full w-full text-[22px] text-right font-[500] text-white pr-[15px] pl-[140px] border border-[#34304B] rounded-[4px] bg-[#151822] shadow-[0_0_10px_0_rgba(0,0,0,.05)]"
          value={betAmount}
          onNumberChange={setBetAmount}
          autoFocus
        />
        <div className="absolute left-[11px] flex items-center gap-[11px]">
          <img
            src={betToken.icon}
            alt={betToken.symbol}
            className="w-[24px] h-[24px] object-center origin-contain shrink-0"
          />
          <div className="text-[#A6A6DB]">
            Bet Amount
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          setBetAmount((prev: any) => numberRemoveEndZero(Big(prev || 0).plus(RPS_MIN_BET_AMOUNT).toFixed(betToken.decimals)));
        }}
      >
        +{RPS_MIN_BET_AMOUNT}
      </Button>
      <Button
        onClick={() => {
          setBetAmount((prev: any) => numberRemoveEndZero(Big(prev || 0).plus(RPS_MIN_BET_AMOUNT * 10).toFixed(betToken.decimals)));
        }}
      >
        +{RPS_MIN_BET_AMOUNT * 10}
      </Button>
    </div>
  );
};

export default BetInput;

const Button = (props: any) => {
  const { className, children, ...restProps } = props;

  return (
    <button
      type="button"
      className={clsx("text-[#A6A6DB] hover:opacity-90 transition-all duration-150 text-[16px] shrink-0 h-[56px] w-[61px] border border-[#34304B] rounded-[4px] backdrop-filter-[2px] bg-[radial-gradient(53.03%_100%_at_50%_0%,_#3E3284_0%,_#1F1A3D_100%)] flex justify-center items-center", className)}
      {...restProps}
    >
      {children}
    </button>
  );
};
