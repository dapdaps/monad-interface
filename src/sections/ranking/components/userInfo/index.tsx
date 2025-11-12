"use client";
import { useMemo } from "react";
import { useUser } from "@/hooks/use-user";
import { formatLongText } from "@/utils/utils";
import Copyed from "@/components/copyed";
import { MilitaryRank } from "../../config";
import { useAccount } from "wagmi";
import Tip from "../tip";

export default function UserInfo() {
    const { userInfo } = useUser();
    const { address } = useAccount();

    const rp = 123; // Rank Points
    const globalRank = 2157;
    const currentRP = 123;
    const nextLevelRP = 150;
    const progress = (currentRP / nextLevelRP) * 100;

    const currentRank = useMemo(() => {
        if (rp >= 500) return MilitaryRank.General;
        if (rp >= 300) return MilitaryRank.Colonel;
        if (rp >= 200) return MilitaryRank.Major;
        if (rp >= 100) return MilitaryRank.Lieutenant;
        if (rp >= 50) return MilitaryRank.Corporal;
        return MilitaryRank.Private;
    }, [rp]);

    const displayAddress = useMemo(() => {
        return address || userInfo?.address || "0x0000000000000000000000000000000000000000";
    }, [address, userInfo]);

    const formattedAddress = useMemo(() => {
        if (!displayAddress) return "";
        const upperAddress = displayAddress.toUpperCase();
        return formatLongText(upperAddress, 3, 4);
    }, [displayAddress]);

    return (
        <div className="w-full bg-[#1B1B22] text-white rounded-[8px] overflow-hidden bg-[radial-gradient(100%_60.5%_at_50%_0%,_rgba(131,110,249,0.3)_0%,_rgba(0,0,0,0)_100%)]">
            <div className="w-full bg-[#BFFF60] text-black h-[26px] flex items-center justify-center text-center font-[500] text-[14px] cursor-pointer">
                + Authorize X to invite frenz
            </div>

            <div className="p-6 flex flex-col items-center">
                <div className="relative w-[182px] h-[182px] rounded-[6px]  mb-4">
                    <img src="/images/wallet/ranking/default-avatar.png" alt="avatar" className="w-full h-full object-cover" />
                    <div className="absolute left-0 right-0 bottom-0 h-[25px] bg-[#000000A6] flex items-center justify-center">
                        <span className="text-[#BFFF60] text-[16px] font-[500] leading-none">{currentRank.name.toUpperCase()}</span>
                    </div>
                    <div className="absolute bottom-[-10px] left-[-2px] w-[42px] h-[42px] flex items-center justify-center">
                        <img src={currentRank.icon} alt="rank" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <span className="text-white text-[20px]">{formattedAddress}</span>
                    <Copyed value={displayAddress} />
                </div>

                <div className="flex flex-col items-center mb-6">
                    <div className="text-[#BFFF60] text-[26px] font-bold mb-1 leading-none">
                        {rp} RP
                    </div>
                    <div className="text-white text-[14px]">
                        Rank #{globalRank.toLocaleString()}
                    </div>
                </div>

                <div className="w-full text-[#A1AECB] text-[14px]">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className=" text-[14px]">Rank Progress</span>
                            <Tip content="Earn RP to advance to higher ranks" />
                        </div>
                        <span className="">{currentRP}/{nextLevelRP} RP</span>
                    </div>
                    
                    <div className="relative w-full h-[16px] bg-[#2D2948] rounded-full">
                        <div 
                            className="absolute left-0 top-0 h-full bg-[#BFFF60] rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[16px] h-[16px] bg-white rounded-full shadow-[0_0_6px_2px_#fff]"></div>
                        </div>
                    </div>

                    <div className="text-right text-[#A1AECB] pt-[10px]">
                        Next Level:{nextLevelRP}
                    </div>
                </div>
            </div>
        </div>
    );
}