import { usePriceStore } from "@/stores/usePriceStore";
import { balanceFormated } from "@/utils/balance";
import Big from "big.js";
import { useMemo } from "react";

export default function Route({
    name,
    fee,
    receiveAmount,
    inputCurrencyAmount,
    fromChain,
    inputCurrency,
    outputCurrency,
    checked,
    onChange,
    icon,
    duration,
    feeType,
    gas,
    isBest
}: any) {
    const prices: any = usePriceStore(store => store.price);

    // const feeText = useMemo(() => {
    //     if (feeType === 1) {
    //         return `${ balanceFormated(prices[fromChain.nativeCurrency.symbol.toUpperCase()] * (fee as any), 4)  }`
    //     }

    //     return `${balanceFormated(fee, 4)}`
    // }, [fee, fromChain, prices])    

    // const gasText = useMemo(() => {
    //     return gas ? gas.div(10 ** 18).toString() : '0'
    // }, [gas])


    return <div className={ `p-[10px] text-white border  bg-[#00000080] rounded-[4px] mt-[10px] cursor-pointer ${checked ? 'border-[#BFFF60]' : 'border-[#34304B]'}`} onClick={() => {
        onChange(true)
    }}>
        <div className="flex items-start gap-[10px] justify-between w-full">
            <div className="flex items-center gap-[10px]">
                <img className="w-[20px] h-[20px] rounded-[4px]" src={icon} />
                <div className="text-[14px] font-[400]">{name}</div>
                {
                    isBest && (
                        <div className="text-[12px] text-[#BFFF60]">Best Price</div>
                    )
                }
            </div>

            <div className="">
                <div className="flex items-center gap-2">
                    <img className="w-[18px] h-[18px] rounded-[4px]" src={outputCurrency.icon} />
                    <div className="text-[18px] font-[400]">{receiveAmount}</div>
                </div>
                <div className="text-[12px] text-[#727D97] text-right">${ balanceFormated(prices[outputCurrency.symbol] * receiveAmount, 4) }</div>
            </div>
        </div>

        <div className="flex justify-between items-center mt-[10px]">
            <div className="text-[12px] text-[#727D97]">1 {inputCurrency.symbol} ≈ {
                Big(receiveAmount || 0)
                    .div(Big(inputCurrencyAmount || 0).eq(0) ? 1 : inputCurrencyAmount)
                    .toFixed(4)} {outputCurrency.symbol}</div>
            <div className="flex gap-[10px] text-[12px] text-[#727D97] items-center">
                <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.305 0L13.615 2.83543C13.6783 2.91317 13.7172 3.00721 13.727 3.10616L13.7295 3.15619V9.45588C13.7295 10.3709 12.979 11.1152 12.0494 11.1152C11.1454 11.1152 10.4104 10.4106 10.3712 9.52956L10.3694 9.45588V4.25074H9.275V11.9716L14 11.9719V13H0V11.9719H1.225V0.663108C1.22501 0.535324 1.27362 0.412124 1.36137 0.317531C1.44911 0.222939 1.56969 0.163737 1.6996 0.15147L1.75 0.149071H8.75C8.88051 0.149077 9.00634 0.196677 9.10295 0.28259C9.19956 0.368502 9.26002 0.486567 9.27255 0.61376L9.275 0.663108V3.22267H10.8944C11.025 3.22268 11.1508 3.27028 11.2474 3.35619C11.344 3.4421 11.4045 3.56017 11.417 3.68736L11.4194 3.73671V9.45588C11.4194 9.80577 11.7029 10.0871 12.0494 10.0871C12.3785 10.0871 12.6511 9.83353 12.6773 9.50797L12.6795 9.45588V3.33576L10.4843 0.640833L11.305 0ZM6.65 3.40464H3.85C3.75717 3.40464 3.66815 3.44074 3.60251 3.50501C3.53687 3.56928 3.5 3.65644 3.5 3.74733V6.48886C3.5 6.57975 3.53687 6.66691 3.60251 6.73118C3.66815 6.79545 3.75717 6.83155 3.85 6.83155H6.65C6.74283 6.83155 6.83185 6.79545 6.89749 6.73118C6.96312 6.66691 7 6.57975 7 6.48886V3.74733C7 3.65644 6.96312 3.56928 6.89749 3.50501C6.83185 3.44074 6.74283 3.40464 6.65 3.40464Z" fill="#727D97" />
                </svg>
                ${gas || '-'}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0C2.68697 0 0 2.68697 0 6C0 9.31303 2.68562 12 6 12C9.31438 12 12 9.31438 12 6C12 2.68697 9.31438 0 6 0ZM7.57322 6.6086H5.89924C5.56337 6.6086 5.29064 6.33587 5.29064 6V2.81997C5.29064 2.4841 5.56337 2.21137 5.89924 2.21137C6.23511 2.21137 6.50784 2.4841 6.50784 2.81997V5.39275H7.57322C7.90909 5.39275 8.18182 5.66547 8.18182 6.00134C8.18182 6.33721 7.90909 6.6086 7.57322 6.6086Z" fill="#727D97" />
                </svg>
                <div>~{duration}s</div>
            </div>
        </div>

    </div>
}