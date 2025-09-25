import { numberFormatter } from "@/utils/number-formatter";
import clsx from "clsx";

const Trend = (props: any) => {
  const { className, children } = props;

  return (
    <div className={clsx("h-[clamp(1px,_1.72vw,_calc(var(--pc-1512)*0.0172))] pl-[clamp(1px,_0.53vw,_calc(var(--pc-1512)*0.0053))] pr-[clamp(1px,_0.53vw,_calc(var(--pc-1512)*0.0053))] flex items-center justify-center gap-[3px] text-white text-[clamp(1px,_0.93vw,_calc(var(--pc-1512)*0.0093))] font-[500] rounded-[8px] bg-[#18191A]", className)}>
      <img
        src="/images/mainnet/discover/icon-up.svg"
        alt=""
        className="w-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))] h-[clamp(1px,_0.53vw,_calc(var(--pc-1512)*0.0053))] object-center object-contain shrink-0"
      />
      <div className="">
        {numberFormatter(children, 2, true)}
      </div>
    </div>
  );
};

export default Trend;
