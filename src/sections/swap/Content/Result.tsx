import Big from "big.js";
import { useMemo, useState } from "react";
import dapps from "@/configs/swap";
import { balanceFormated } from "@/utils/balance";

export default function Result({
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  outputCurrencyAmount,
  priceImpactType,
  trade,
  onClose
}: any) {
  const [reserve, setReserve] = useState(false);

  const priceString = useMemo(
    () =>
      reserve
        ? `1 ${outputCurrency.symbol} =
  ${Big(inputCurrencyAmount || 0)
          .div(Big(outputCurrencyAmount || 0).eq(0) ? 1 : outputCurrencyAmount)
          .toFixed(4)}
  ${inputCurrency.symbol}`
        : `1 ${inputCurrency.symbol} =
  ${Big(outputCurrencyAmount || 0)
          .div(Big(inputCurrencyAmount || 0).eq(0) ? 1 : inputCurrencyAmount)
          .toFixed(4)}
  ${outputCurrency.symbol}`,
    [
      reserve,
      inputCurrency,
      outputCurrency,
      inputCurrencyAmount,
      outputCurrencyAmount
    ]
  );

  const icon = useMemo(() => {
    return dapps[trade.name.toLowerCase()].logo
  }, [trade, dapps])

  return (
    <div className="flex items-center justify-between pt-[10px] text-[12px] text-white">
      <div className="flex items-center gap-[5px]">
        <div>{priceString}</div>
        <button
          className="cursor-pointer p-[5px] duration-500 hover:opacity-60 active:opacity-80"
          onClick={() => {
            setReserve(!reserve);
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.01514 6.11148C0.887128 4.95763 1.55283 3.03456 3.70343 3.03456C5.85402 3.03456 10.9999 3.03456 10.9999 3.03456M10.9999 3.03456L9.01977 1M10.9999 3.03456L9.01977 5"
              stroke="white"
            />
            <path
              d="M10.9849 5.88071C11.1129 7.03456 10.4472 8.95763 8.29657 8.95763C6.14598 8.95763 1.00006 8.95763 1.00006 8.95763M1.00006 8.95763L3.01978 11M1.00006 8.95763L3.01978 7"
              stroke="white"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-2">
        {/* {priceImpactType === 2 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.10016 1C7.86996 -0.333334 9.79446 -0.333333 10.5643 1L17.3935 12.8286C18.1633 14.1619 17.201 15.8286 15.6614 15.8286H2.00298C0.463382 15.8286 -0.498867 14.1619 0.270933 12.8286L7.10016 1ZM7.91793 6.22857C7.91793 5.72363 8.32727 5.31429 8.83221 5.31429C9.33716 5.31429 9.7465 5.72363 9.7465 6.22857V9.88572C9.7465 10.3907 9.33716 10.8 8.83221 10.8C8.32727 10.8 7.91793 10.3907 7.91793 9.88572V6.22857ZM8.83221 11.7143C8.32727 11.7143 7.91793 12.1236 7.91793 12.6286C7.91793 13.1335 8.32727 13.5429 8.83221 13.5429C9.33716 13.5429 9.7465 13.1335 9.7465 12.6286C9.7465 12.1236 9.33716 11.7143 8.83221 11.7143Z"
              fill="white"
            />
          </svg>
        )} */}

        <div className="flex items-center gap-2 text-[12px]">
          <div className="relative group">
            <img src={icon} className="w-[14px] h-[14px]" />
            <div className="absolute top-[-40px] whitespace-nowrap left-1/2 -translate-x-1/2 h-[36px] flex items-center justify-center px-[10px] bg-[#22202F] rounded-[4px] border border-[#34304B] backdrop-blur-[10px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
              Swap via {trade.name}
            </div>
          </div>
          
          <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.305 0L13.615 2.83543C13.6783 2.91317 13.7172 3.00721 13.727 3.10616L13.7295 3.15619V9.45588C13.7295 10.3709 12.979 11.1152 12.0494 11.1152C11.1454 11.1152 10.4104 10.4106 10.3712 9.52956L10.3694 9.45588V4.25074H9.275V11.9716L14 11.9719V13H0V11.9719H1.225V0.663108C1.22501 0.535324 1.27362 0.412124 1.36137 0.317531C1.44911 0.222939 1.56969 0.163737 1.6996 0.15147L1.75 0.149071H8.75C8.88051 0.149077 9.00634 0.196677 9.10295 0.28259C9.19956 0.368502 9.26002 0.486567 9.27255 0.61376L9.275 0.663108V3.22267H10.8944C11.025 3.22268 11.1508 3.27028 11.2474 3.35619C11.344 3.4421 11.4045 3.56017 11.417 3.68736L11.4194 3.73671V9.45588C11.4194 9.80577 11.7029 10.0871 12.0494 10.0871C12.3785 10.0871 12.6511 9.83353 12.6773 9.50797L12.6795 9.45588V3.33576L10.4843 0.640833L11.305 0ZM6.65 3.40464H3.85C3.75717 3.40464 3.66815 3.44074 3.60251 3.50501C3.53687 3.56928 3.5 3.65644 3.5 3.74733V6.48886C3.5 6.57975 3.53687 6.66691 3.60251 6.73118C3.66815 6.79545 3.75717 6.83155 3.85 6.83155H6.65C6.74283 6.83155 6.83185 6.79545 6.89749 6.73118C6.96312 6.66691 7 6.57975 7 6.48886V3.74733C7 3.65644 6.96312 3.56928 6.89749 3.50501C6.83185 3.44074 6.74283 3.40464 6.65 3.40464Z" fill="#727D97" />
          </svg>
          <div className="text-[#727D97] border-r border-[#34304B] pr-[10px] h-[12px] leading-[12px]">${trade.gasUsd}</div>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 0C2.68697 0 0 2.68697 0 6C0 9.31303 2.68562 12 6 12C9.31438 12 12 9.31438 12 6C12 2.68697 9.31438 0 6 0ZM7.57322 6.6086H5.89924C5.56337 6.6086 5.29064 6.33587 5.29064 6V2.81997C5.29064 2.4841 5.56337 2.21137 5.89924 2.21137C6.23511 2.21137 6.50784 2.4841 6.50784 2.81997V5.39275H7.57322C7.90909 5.39275 8.18182 5.66547 8.18182 6.00134C8.18182 6.33721 7.90909 6.6086 7.57322 6.6086Z" fill="#727D97" />
          </svg>
          <div className="text-[#727D97] border-r border-[#34304B] pr-[10px] h-[12px] leading-[12px]">~10s</div>
          <img src={outputCurrency.icon} className="w-[14px] h-[14px]" />
          <div>{ balanceFormated(outputCurrencyAmount, 4) }</div>
        </div>

        <button onClick={onClose}>
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L6 5L11 1"
              stroke="#A6A6DB"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
