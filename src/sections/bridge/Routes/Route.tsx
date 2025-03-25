import { usePriceStore } from "@/stores/usePriceStore";
import CheckBox from "../CheckBox";
import { balanceFormated } from "@/utils/balance";
import Big from "big.js";

export default function Route({ name, fee, receiveAmount, fromChain, toToken, checked, onChange, duration }: any) {
    const prices: any = usePriceStore(store => store.price);

    return <div className="py-[10px] text-[12px]">
        {/* <div className="flex items-center gap-[10px]">
            <img className="w-[30px] h-[30px]" src="https://s3.amazonaws.com/dapdap.prod/images/stargate.png"/>
            <div className="text-[16px] font-[600]">{ name }</div>
        </div> */}

        <div className="flex items-center justify-between">
            <div className="text-[#75759D]">Est. Received</div>
            <div className="text-[12px] text-[#fff]">{Big(receiveAmount).div(10 ** toToken.decimals).toString()}</div>
        </div>

        <div className="flex items-center justify-between mt-[5px]">
            <div className="text-[#75759D]">Speed</div>
            <div className="text-[12px] text-[#fff]">~{ duration }</div>
        </div>

        <div className="flex items-center justify-between mt-[5px]">
            <div className="text-[#75759D]">Fee</div>
            <div className="text-[12px] text-[#fff]">${balanceFormated(prices[fromChain.nativeCurrency.symbol.toUpperCase()] * (fee as any), 4)}</div>
        </div>
    </div>
}