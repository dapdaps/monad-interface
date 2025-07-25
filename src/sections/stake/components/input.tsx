import InputNumber from "@/components/input-number";
import { usePriceStore } from "@/stores/usePriceStore";
import { numberFormatter, numberRemoveEndZero } from "@/utils/number-formatter";
import Big from "big.js";
import clsx from "clsx";
import Range from "@/components/range";
import { useMemo, useState } from "react";
import useCustomAccount from "@/hooks/use-account";
import useTokenBalance from "@/hooks/use-token-balance";
import Loading from "@/components/loading";

const StakeInput = (props: any) => {
  const {
    className,
    title,
    token,
    amount,
    onAmountChange,
    balance,
    balanceLoading,
    balanceLabel = "balance",
    type,
    disabled,
    isPrice = true,
  } = props;

  const { chainId } = useCustomAccount();
  const prices = usePriceStore(store => store.price);
  const {
    tokenBalance,
    isLoading: tokenBalanceLoading,
    update: getTokenBalance,
  } = useTokenBalance(typeof balance !== "undefined" ? void 0 : token?.address, token?.decimals, chainId);

  const [balanceShow, balanceShowLoading] = useMemo(() => {
    if (typeof balance !== "undefined") {
      return [balance, balanceLoading];
    }
    return [tokenBalance, tokenBalanceLoading];
  }, [balance, balanceLoading, tokenBalance, tokenBalanceLoading]);

  const [percent, setPercent] = useState<number>(0);

  const handleRangeChange = (e: any) => {
    const isValidBalance = /^(\d+)(\.\d+)?$/.test(balanceShow + "");
    const _percent = e.target.value || 0;
    if (isValidBalance) {
      onAmountChange(numberRemoveEndZero(Big(balanceShow).times(Big(_percent).div(100)).toFixed(token?.decimals)));
    }
    setPercent(_percent);
  };

  return (
    <div className={clsx("bg-[#26234B] rounded-xl p-5 mb-4 lg:bg-white/5", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-[#A6A6DB] font-Unbounded text-[14px]">
          {title}
        </span>
      </div>
      <div className="w-full flex justify-between items-center mb-2 gap-[10px]">
        <InputNumber
          value={amount}
          disabled={disabled}
          className="text-[26px] bg-[transparent] text-white flex-1 w-0"
          placeholder="0"
          onNumberChange={(val) => {
            onAmountChange(val);
            if (type === "input" && Big(balanceShow || 0).gt(0)) {
              const _percent = Big(val || 0).div(balanceShow).times(100).toNumber();
              setPercent(Math.min(Math.max(_percent, 0), 100));
            }
          }}
        />
        <div className="flex flex-col items-end shrink-0">
          <div className="flex items-center bg-[#3B3860] rounded-lg px-3 py-1 shrink-0">
            <img
              src={token?.icon}
              alt={token?.symbol}
              className="w-5 h-5 mr-2 shrink-0"
            />
            <span className="text-white font-semibold">
              {token?.symbol}
            </span>
          </div>
          {
            balanceShowLoading ? (
              <div className="mt-[2px]">
                <Loading size={12} />
              </div>
            ) : (
              <span
                onClick={() => {
                  if (disabled) return;
                  onAmountChange(balanceShow)
                  setPercent(100);
                }}
                className={clsx("text-[10px] text-[#B6B3D6] mt-[5px]", disabled ? "cursor-default" : "cursor-pointer underline underline-offset-2")}
              >
                {balanceLabel}: {numberFormatter(balanceShow, 4, true, { isShort: true, isShortUppercase: true })}
              </span>
            )
          }
        </div>
      </div>
      {
        isPrice && (
          <div className="text-[#B6B3D6] text-sm mb-2">
            {numberFormatter(Big(amount || 0).times(token.price || prices[token?.symbol] || 0).toFixed(2), 2, true, { prefix: "$" })}
          </div>
        )
      }
      {
        type === "input" && (
          <div className="flex items-center justify-between gap-[40px]">
            <Range
              style={{ marginTop: 0, flex: 1 }}
              value={percent}
              onChange={handleRangeChange}
              disabled={disabled}
            />

            <div className="flex items-center gap-[8px]">
              {BalancePercentList.map((p, index) => (
                <>
                  {index > 0 && (
                    <div className="w-[1px] h-[10px] bg-[#75759D] bg-opacity-[0.5]"></div>
                  )}
                  <div
                    key={p.value}
                    className={clsx(
                      "h-[22px] rounded-[6px] duration-500 text-[10px] leading-[22px] font-[400] hover:underline hover:text-white",
                      disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                      p.value === percent ? "text-white" : "text-[#A6A6DB]"
                    )}
                    onClick={() => {
                      if (disabled) return;
                      if (p.value === 100) {
                        onAmountChange(balanceShow);
                        setPercent(100);
                        return;
                      }
                      onAmountChange(numberRemoveEndZero(Big(balanceShow).times(p.value / 100).toFixed(token?.decimals)));
                      setPercent(p.value);
                    }}
                  >
                    {p.label}
                  </div>
                </>
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default StakeInput;

const BalancePercentList = [
  { value: 25, label: "25%" },
  { value: 50, label: "50%" },
  { value: 75, label: "75%" },
  { value: 100, label: "Max" }
];
