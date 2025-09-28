import { numberFormatter } from "@/utils/number-formatter";

const BetToken = (props: any) => {
  const { betToken, betAmount } = props;

  return (
    <div className="flex justify-center items-center gap-[6px] text-[18px]">
      <img
        src={betToken.icon}
        alt={betToken.symbol}
        className="w-[18px] h-[18px] object-center object-contain shrink-0"
      />
      <div className="">
        {numberFormatter(betAmount, 3, true, { isShort: true, isZeroPrecision: true })}
      </div>
    </div>
  );
};

export default BetToken;
