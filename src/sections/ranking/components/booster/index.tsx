"use client";

import Tip from "../tip";
import { useBonus } from "../../hooks/use-bonus";
import clsx from "clsx";
import { useMemo } from "react";

interface BoosterItem {
    icon: string;
    label: string;
    boost: number;
    tip: string;
    key: string;
}

const boosterItems: BoosterItem[] = [
    {
        icon: "/images/wallet/ranking/booster-1.png",
        label: "5500 Core Community",
        boost: 5,
        tip: "Members who received the Monad airdrop earn a 5% RP bonus",
        key: "golden",
    },
    {
        icon: "/images/wallet/ranking/booster-3.png",
        label: "Admission Ticket",
        boost: 10,
        tip: "Admission Ticket holders get a 10% RP bonus",
        key: "admission",
    },
    {
        icon: "/images/wallet/ranking/booster-2.png",
        label: "Sequence Number",
        boost: 3,
        tip: "Sequence Number NFT holders get a 3% RP bonus",
        key: "sequence",
    },
];

export default function Booster() {

    const { allBonus, allBonusLoading } = useBonus();
    const totalBoost = useMemo(() => {
        if (!allBonus || allBonusLoading || Object.keys(allBonus).length === 0) {
            return 0;
        }
        return boosterItems.reduce((sum, item) => sum + (allBonus[item.key] ? item.boost : 0), 0);
    }, [allBonus, allBonusLoading]);

    const borderWidth = 1;
    const borderRadius = 4;
    const cutCorner = 24;
    
    const outerClipPath = `polygon(
        ${cutCorner}px 0, 
        calc(100% - ${borderRadius}px) 0, 
        calc(100% - ${borderRadius * 0.5}px) ${borderRadius * 0.3}px, 
        100% ${borderRadius}px, 
        100% calc(100% - ${cutCorner}px), 
        calc(100% - ${cutCorner}px) 100%, 
        ${borderRadius}px 100%, 
        ${borderRadius * 0.3}px calc(100% - ${borderRadius * 0.5}px), 
        0 calc(100% - ${borderRadius}px), 
        0 ${cutCorner}px
    )`;
    
    const innerClipPath = `polygon(
        ${cutCorner - borderWidth}px ${borderWidth}px, 
        calc(100% - ${borderRadius + borderWidth}px) ${borderWidth}px, 
        calc(100% - ${(borderRadius + borderWidth) * 0.5}px) ${borderWidth + borderRadius * 0.3}px, 
        calc(100% - ${borderWidth}px) ${borderRadius + borderWidth}px, 
        calc(100% - ${borderWidth}px) calc(100% - ${cutCorner - borderWidth}px), 
        calc(100% - ${cutCorner - borderWidth}px) calc(100% - ${borderWidth}px), 
        ${borderRadius + borderWidth}px calc(100% - ${borderWidth}px), 
        ${borderWidth + borderRadius * 0.3}px calc(100% - ${(borderRadius + borderWidth) * 0.5}px), 
        ${borderWidth}px calc(100% - ${borderRadius + borderWidth}px), 
        ${borderWidth}px ${cutCorner - borderWidth}px
    )`;

    return (
        <div 
            className="w-full relative mt-[18px]"
            style={{
                clipPath: outerClipPath,
                background: '#34304B',
                padding: `${borderWidth}px`
            }}
        >
            <div 
                className="w-full h-full bg-[#252532] text-white overflow-hidden"
                style={{
                    clipPath: innerClipPath
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between h-[57px] pl-[27px] pr-[10px] bg-[#191627] border-b border-[#34304B]">
                    <h2 className="text-white text-[18px]">
                        BOOSTER
                    </h2>
                    <div className="flex items-center gap-1 px-4 h-[30px] bg-[#2D2948] rounded-[4px]">
                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity={totalBoost > 0 ? "1" : "0.3"} d="M7.08896 6.55364L10.4365 0H3.6343L0 9.81818H6.66749L4.21123 18L14 6.55364H7.08896Z" fill={totalBoost > 0 ? "#BFFF60" : "white"} />
                        </svg>

                        <span className={clsx("text-[16px]", totalBoost > 0 ? "opacity-100 text-[#BFFF60]" : "opacity-30 text-white")}>
                            +{totalBoost}%
                        </span>
                    </div>
                </div>

                {/* Booster Items */}
                <div className="flex justify-between gap-[10px] px-[33px] pb-[50px] pt-[30px]">
                    {boosterItems.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center ">
                            {/* Icon Container */}
                            <div
                                className={clsx("mb-4 relative w-full border border-[#382F6F] rounded-[4px] [background:radial-gradient(100%_75%_at_50%_10%,_rgba(131,110,249,0.3)_0%,_rgba(0,0,0,0)_100%)]", allBonus?.[item.key] ? "" : "grayscale opacity-50")}
                            >
                                {/* Icon */}
                                <div className="w-full h-[100px] flex items-center justify-center">
                                    <img src={item.icon} alt={item.label} className="h-full max-w-[80%] object-contain" />
                                </div>

                                {/* Boost Badge - Hexagon */}
                                <div className="absolute -bottom-2 -right-2 z-10">
                                    <div className="relative w-[41px] h-[41px] flex items-center justify-center">
                                        <img src="/images/wallet/ranking/boost-bg.png" alt="booster-badge" className="w-[140%] h-[140%] object-cover absolute top-[-20%] left-[-2%]" />
                                        <div className="relative z-1 flex items-center text-[#BFFF60] text-[14px] font-bold">
                                            +{item.boost}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Label */}
                            <div className="flex items-center gap-2 justify-center">
                                <span className="text-white text-center text-[14px] font-medium">
                                    {item.label}
                                </span>
                                {/* Info Icon */}
                                <div className="">
                                    <Tip content={item.tip} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

