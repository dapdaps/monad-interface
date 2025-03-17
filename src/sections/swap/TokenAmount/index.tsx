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
        "border rounded-[6px] p-[14px]",
        focus ? "border-[#fff] bg-[#4D4D73]" : "border-[transparent] bg-white/5"
      )}
      onFocus={() => {
        setFocus(true);
      }}
      onBlur={() => {
        setFocus(false);
      }}
    >
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
            outputCurrencyReadonly ? "" : "border bg-[#4D4D73]"
          } flex items-center justify-between border-[#ACACE2] rounded-[8px]  w-[176px] h-[46px] px-[7px] cursor-pointer`}
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

      {type === "in" && (
        <div className="flex justify-between md:flex-col md:items-stretch md:justify-start items-center gap-[22px] mt-[12px]">
          <Range
            style={{ marginTop: 0, flex: 1 }}
            value={percent}
            onChange={handleRangeChange}
          />
          <div className="flex items-center gap-[8px]">
            {BalancePercentList.map((p) => (
              <motion.div
                key={p.value}
                className="cursor-pointer h-[22px] rounded-[6px] text-[#A6A6DB] text-[10px] font-[400] px-[8px] hover:underline hover:text-white"
                animate={percent == p.value ? { color: "#fff" } : {}}
                onClick={() => handleRangeChange({ target: p })}
              >
                {p.label}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div
        onClick={() => {
          const formatedBalance = balanceFormated(tokenBalance);
          if (["-", "Loading", "0"].includes(formatedBalance)) return;
          onAmountChange?.(tokenBalance);
          setRange(tokenBalance);
        }}
        className="flex items-center justify-between text-[#75759D] mt-[10px] font-medium text-[12px]"
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
    </div>
  );
}

const BalancePercentList = [
  { value: 25, label: "25%" },
  { value: 50, label: "50%" },
  { value: 75, label: "75%" },
  { value: 100, label: "Max" }
];
