import { useState } from "react";
import XpLevel from "./xpLevel";

const IMG_PATH = '/images/lucky777/xp/';
export default function Xp({ data, xpBalance, xpLevel, maxXp }: { data: any, xpBalance: number, xpLevel: number, maxXp: number }) {
    const xpValue = xpBalance || 0;
    // const maxXp = data?.game_xp.xp || 10;
    const level = xpLevel || 1;

    const [open, setOpen] = useState(false);

    const maxThan8 = level > 8;
    const prizeImg = level % 2 === 0 ? '8' : '7';

    return (
        <>
            <div className="absolute top-[135px] left-[50%] -translate-x-1/2 z-[2] w-[335px] h-[24px]" >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center z-10">
                    {
                        !maxThan8 && (
                            <img
                                src={`${IMG_PATH}level-${level}.png`}
                                alt="xp-star"
                                className="w-[75px] h-[55px] cursor-pointer ml-[-70%]"
                                onClick={() => setOpen(true)}
                            />
                        )
                    }

                    {
                        maxThan8 && (
                            <div className="relative w-[75px] h-[55px]">
                                <img
                                    src={`${IMG_PATH}level-up.png`}
                                    alt="xp-star"
                                    className="w-[75px] h-[55px] cursor-pointer ml-[-70%] absolute top-0 left-0"
                                    onClick={() => setOpen(true)}
                                />

                                <div className="absolute bottom-[10px] left-[-6px] text-[12px] text-black italic font-Montserrat font-extrabold">lv.{level}</div>
                            </div>
                        )
                    }
                </div>
                <div className="w-full relative h-full items-center font-HackerNoonV2">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[24px] bg-[#55538D] rounded-[12px] border-2 border-[#2F3163]" >

                    </div>

                    <div
                        className="h-[24px] bg-[#C6FF60] rounded-[12px] absolute left-0 top-1/2 -translate-y-1/2 border-2 border-[#2F3163] [box-shadow:0px_-4px_0px_0px_#00000080_inset]"
                        style={{ width: `${(Math.min(xpValue / maxXp, 1)) * 100}%`, minWidth: '40px', transition: 'width 0.3s' }}
                    />

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center  text-[18px] items-center z-10 text-black">
                        <span className="">{xpValue}</span>
                        <span className="">/</span>
                        <span className="">{maxXp}</span>
                    </div>
                </div>
                <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 flex items-center z-10">
                    {
                        !maxThan8 && (
                            <img
                                src={`${IMG_PATH}prize-${level}.png`}
                                alt="xp-token"
                                className="h-[42px] cursor-pointer"
                            />
                        )
                    }
                    {
                        maxThan8 && (
                            <img
                                src={`${IMG_PATH}prize-${prizeImg}.png`}
                                alt="xp-token"
                                className="h-[42px] cursor-pointer"
                            />
                        )
                    }
                </div>
            </div>
            <XpLevel open={open} onClose={() => setOpen(false)} level={level} />
        </>
    );
}