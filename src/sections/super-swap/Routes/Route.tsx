import { usePriceStore } from "@/stores/usePriceStore";
import CheckBox from "../CheckBox";
import { balanceFormated } from "@/utils/balance";
import Big from "big.js";
import { useMemo } from "react";

export default function Route({ name, fee, receiveAmount, fromChain, toToken, checked, onChange, icon, duration, feeType, gas }: any) {
    const prices: any = usePriceStore(store => store.price);

    // const feeText = useMemo(() => {
    //     if (feeType === 1) {
    //         return `${ balanceFormated(prices[fromChain.nativeCurrency.symbol.toUpperCase()] * (fee as any), 4)  }`
    //     }
        
    //     return `${balanceFormated(fee, 4)}`
    // }, [fee, fromChain, prices])    

    const gasText = useMemo(() => {
        return gas ? gas.div(10 ** 18).toString() : '0'
    }, [gas])

    return <div className="flex items-center justify-between p-[10px] text-white border-b border-[#8B87FF60] last:border-b-0">
        <div className="flex items-center gap-[10px]">
            <img className="w-[30px] h-[30px] rounded-[10px]" src={icon}/>
            <div className="text-[16px] font-[600]">{ name }</div>
        </div>

        <div className="flex items-center gap-2">
            <div className="text-right">
                <div className="text-[16px] font-[600]">{ receiveAmount  }</div>
                <div className="text-[12px] text-white/60"> Gas {gasText} </div>
                {/* <div className="text-[12px] font-medium text-[#3D405A]">~10 s</div> */}
            </div>
            <CheckBox checked={checked} onChange={() => {
                onChange(true)
            }}/>
        </div>
    </div>
}