import { balanceFormated } from "@/utils/balance";
import React from "react";

type TokenPriceProps = {
  token?: string; 
  price?: number; 
  change?: number;
};

export default function TokenPrice({
  token = "ETH",
  price = 3800,
  change = 2.35,
}: TokenPriceProps) {
  const changeSign = change > 0 ? "+" : change < 0 ? "" : "";
  const changeAbs = Math.abs(change).toFixed(2);
  const changeColor = change > 0 ? "text-lime-400" : change < 0 ? "text-red-400" : "text-zinc-400";

  return (
    <div className="flex items-center gap-3 select-none">
      <div className="w-8 h-8">
        <img src="/assets/tokens/eth.png" alt="eth" className="w-full h-full" />
      </div>

      <div className="flex items-baseline gap-2">
        <span className="font-extrabold text-2xl leading-none text-lime-400">
          {balanceFormated(price, 2)}
        </span>
        {/* <span className={`text-sm font-semibold leading-none ${changeColor}`}>
          ({change !== 0 ? `${changeSign}${changeAbs}%` : "0.00%"})
        </span> */}
      </div>
    </div>
  );
}


