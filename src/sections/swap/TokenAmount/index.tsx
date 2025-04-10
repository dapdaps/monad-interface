"use client";
import { useMemo, useEffect, useState } from "react";
import useTokenBalance from "@/hooks/use-token-balance";
import { balanceFormated } from "@/utils/balance";
import Loading from "@/components/circle-loading";
import Range from "@/components/range";
import { motion } from "framer-motion";
import Big from "big.js";
import clsx from "clsx";

export default function TokenAmout({
  type,
  amount,
  disabled,
  currency,
  prices,
  outputCurrencyReadonly,
  onCurrencySelectOpen,
  onAmountChange,
  onUpdateCurrencyBalance,
  updater
}: any) {
  const [focus, setFocus] = useState(false);
  const tokenPrice = useMemo(
    () => (currency ? prices[currency.priceKey || currency.symbol] : 0),
    [prices, currency]
  );

  const { tokenBalance, isLoading, update } = useTokenBalance(
    currency?.isNative ? "native" : currency?.address,
    currency?.decimals,
    currency?.chainId
  );
  const [percent, setPercent] = useState<any>(0);
  const handleRangeChange = (e: any, isAmountChange = true) => {
    const formatedBalance = balanceFormated(tokenBalance);
    if (["-", "Loading", "0"].includes(formatedBalance)) return;
    const _percent = e.target.value || 0;
    setPercent(_percent);
    isAmountChange &&
      onAmountChange?.(
        Big(tokenBalance)
          .times(Big(_percent).div(100))
          .toFixed(currency?.decimals)
          .replace(/[.]?0+$/, "")
      );
  };
  const setRange = (val: string) => {
    if (type !== "in") return;
    const formatedBalance = balanceFormated(tokenBalance);
    if (["-", "Loading", "0"].includes(formatedBalance)) return;
    let percent: any = Big(val || 0)
      .div(formatedBalance)
      .times(100)
      .toFixed(2);
    percent = Math.min(Math.max(+percent, 0), 100);
    handleRangeChange?.({ target: { value: percent } }, false);
  };
  useEffect(() => {
    if (tokenBalance && onUpdateCurrencyBalance)
      onUpdateCurrencyBalance(tokenBalance);
  }, [tokenBalance]);

  useEffect(() => {
    update();
  }, [updater]);
  return (
      <div
        className={clsx(
          "border rounded-[6px] p-[14px] md:bg-[#2D304F]/60 backdrop-blur-[10px]",
          focus ? "lg:border-[#fff] lg:bg-[#4D4D73] md:border-[#D7D7F6]" : "border-[transparent] lg:bg-white/5",
        )}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
      >
        <div className="text-[#A6A6DB] font-Unbounded text-[14px]">{type === 'in' ? 'You Pay' : 'Receive'}</div>
        <div className="flex items-center justify-between gap-[10px] text-white">

          <div className="flex-1">
            <input
              className="w-[100%] h-[100%] text-[26px] bg-[transparent]"
              value={amount}
              onChange={(ev) => {
                if (isNaN(Number(ev.target.value))) return;
                const val = ev.target.value.replace(/\s+/g, "");
                onAmountChange?.(val);
                setRange(val);
              }}
              placeholder="0"
            />
          </div>
          <div
            className={`${
              outputCurrencyReadonly ? "" : "border lg:bg-[#4D4D73] md:bg-[#393959]"
            } flex items-center justify-between lg:border-[#ACACE2] md:border-[#454556] rounded-[8px]  min-w-[102px] h-[46px] px-[7px] cursor-pointer`}
            onClick={() => {
              onCurrencySelectOpen();
            }}
          >
            {currency ? (
              <div className="flex items-center gap-[10px]">
                <div className="relative shrink-0">
                  <img
                    className="w-[26px] h-[26px]"
                    src={currency.icon || "/assets/tokens/default_icon.png"}
                  />
                </div>
                <div className="text-[16px] font-[600] max-w-[100px] truncate">
                  {currency?.symbol}
                </div>
              </div>
            ) : (
              <div className="text-[16px] font-[600]">Select a token</div>
            )}
            {!outputCurrencyReadonly && (
              <svg
                width="12"
                height="7"
                className="ml-2"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L6 5L11 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
        </div>

        <div
          onClick={() => {
            const formatedBalance = balanceFormated(tokenBalance);
            if (["-", "Loading", "0"].includes(formatedBalance)) return;
            onAmountChange?.(tokenBalance);
            setRange(tokenBalance);
          }}
          className="flex items-center justify-between text-[#A6A6DB] mt-[10px] text-[10px]"
        >
          <div>
            $
            {amount && tokenPrice
              ? balanceFormated(Big(amount).mul(tokenPrice).toString())
              : "-"}
          </div>
          <div className="flex items-center gap-[4px]">
            balance:{" "}
            {isLoading ? (
              <Loading />
            ) : (
              <span
                style={{
                  textDecoration: disabled ? "none" : "underline"
                }}
              >
                {currency ? balanceFormated(tokenBalance) : "-"}
              </span>
            )}
          </div>
        </div>

        {type === "in" && (
          <div className="flex justify-between md:flex-row items-center gap-[22px] mt-[12px]">
            <Range
              style={{ marginTop: 0, flex: 1 }}
              value={percent}
              onChange={handleRangeChange}
            />
            <div className="flex items-center gap-[8px]">
            {BalancePercentList.map((p, index) => (
                <>
                  {index > 0 && (
                    <div className="w-[1px] h-[10px] bg-[#75759D] bg-opacity-[0.5]"></div>
                  )}
                  <motion.div
                    key={p.value}
                    className="cursor-pointer h-[22px] rounded-[6px] text-[#A6A6DB] text-[10px] leading-[22px] font-[400] hover:underline hover:text-white"
                    animate={percent == p.value ? { color: "#fff" } : {}}
                    onClick={() => handleRangeChange({ target: p })}
                  >
                    {p.label}
                  </motion.div>
                </>
              ))}
            </div>
          </div>
        )}


      </div>
  );
}

const BalancePercentList = [
  { value: 25, label: "25%" },
  { value: 50, label: "50%" },
  { value: 75, label: "75%" },
  { value: 100, label: "Max" }
];
