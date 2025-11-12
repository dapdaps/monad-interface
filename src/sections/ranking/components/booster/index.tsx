"use client";

import Tip from "../tip";

interface BoosterItem {
    icon: string;
    label: string;
    boost: number;
    tip: string;
}

const boosterItems: BoosterItem[] = [
    {
        icon: "/images/wallet/ranking/booster-1.png",
        label: "5500 Core Community",
        boost: 5,
        tip: "Members who received the Monad airdrop earn a 5% RP bonus",
    },
    {
        icon: "/images/wallet/ranking/booster-3.png",
        label: "Admission Ticket",
        boost: 10,
        tip: "Admission Ticket holders get a 10% RP bonus",
    },
    {
        icon: "/images/wallet/ranking/booster-2.png",
        label: "Sequence Number",
        boost: 3,
        tip: "Sequence Number NFT holders get a 3% RP bonus",
    },
];

export default function Booster() {
    const totalBoost = boosterItems.reduce((sum, item) => sum + item.boost, 0);

    return (
        <div className="w-full text-white mt-[18px] bg-[#252532]">
            {/* Header */}
            <div className="flex items-center justify-between h-[57px] pl-[27px] pr-[10px] bg-[#191627] border-b border-[#34304B]">
                <h2 className="text-white text-[18px]">
                    BOOSTER
                </h2>
                <div className="flex items-center gap-2 px-4 h-[30px] bg-[#2D2948] rounded-[4px]">
                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.3" d="M7.08896 6.55364L10.4365 0H3.6343L0 9.81818H6.66749L4.21123 18L14 6.55364H7.08896Z" fill="white" />
                    </svg>

                    <span className="text-white opacity-30 text-[16px]">
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
                            className="grayscale opacity-50 mb-4 relative w-full border border-[#382F6F] rounded-[4px] [background:radial-gradient(100%_75%_at_50%_10%,_rgba(131,110,249,0.3)_0%,_rgba(0,0,0,0)_100%)]"
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
    );
}

