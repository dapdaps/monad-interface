import { post } from "@/utils/http";
import useToast from "@/hooks/use-toast";
import { useState } from "react";
import clsx from "clsx";

export default function Redeem({ onRedeem }: { onRedeem: () => void }) {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { success, fail } = useToast({
        isGame: true
    })
    const [isRedeemError, setIsRedeemError] = useState(false);

    const handleRedeem = async () => {
        if (code &&code.length > 0) {
            setIsLoading(true);

            const res = await post('/game/777/redeemCode', {
                code
            })

            if (res.code === 200) {
                setCode('');
                onRedeem();
                success({ 
                    title: 'Lucky Code Redeemed!', 
                    text: 'You’ve got '+ res.data.spin +' free spins',
                }, 'bottom-right');
                setIsRedeemError(false);
            } else {
                setIsRedeemError(true);
                fail({ title: res.message || res.data }, 'bottom-right');
            }

            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-between px-[10px] pb-[10px] items-center">
            <span className="font-HackerNoonV2 text-[14px] text-[#A5FFFD] whitespace-nowrap">LUCKY CODE</span>
            <input
                type="text"
                placeholder=""
                className={clsx("w-[90px] h-[26px] bg-[#242936] border border-[#414266] rounded-[6px] px-[2px] text-[#A5FFFD] text-[14px] font-HackerNoonV2 outline-none placeholder:text-[#A5FFFD] placeholder:opacity-60 text-center", isRedeemError && 'border-[#8B0111] text-[#FF1452]')}
                value={code}
                onFocus={() => setIsRedeemError(false)}
                onChange={(e) => setCode(e.target.value)}
            />
            <div
                onClick={handleRedeem}
                className={`cursor-pointer w-[80px] h-[27px] leading-[27px] text-black text-[12px] font-HackerNoonV2 text-center bg-[#836EF9] border border-[#000000] rounded-[6px] shadow-[inset_0px_4px_0px_0px_rgba(255,255,255,0.5)] ${code.length > 0 && !isLoading ? 'opacity-100' : 'opacity-50'}`}
            >
                Redeem
            </div>
        </div>
    )
}