import { post } from "@/utils/http";
import useToast from "@/hooks/use-toast";
import { useState } from "react";
import clsx from "clsx";
import useIsMobile from "@/hooks/use-isMobile";

export default function Redeem({ onRedeem }: { onRedeem: () => void }) {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { success, fail } = useToast({
        isGame: true
    })
    const [isRedeemError, setIsRedeemError] = useState(false);
    const isMobile = useIsMobile();

    const handleRedeem = async () => {
        if (code && code.length > 0) {
            setIsLoading(true);

            const res = await post('/game/777/redeemCode', {
                code
            })

            if (res.code === 200) {
                setCode('');
                onRedeem();
                success({
                    title: 'Lucky Code Redeemed!',
                    text: 'You’ve got ' + res.data.spin + ' free spins',
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

            {
                !isMobile && <>
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
                </>
            }

            {
                isMobile && <>
                    <div className={clsx(
                        "flex items-center w-[160px] h-[30px] justify-between bg-[#242936] border border-[#414266] rounded-[6px] px-[5px]",
                        isRedeemError && 'border-[#8B0111]'
                    )}>
                        <input
                            type="text"
                            placeholder=""
                            className={clsx(
                                "w-[120px] h-full bg-transparent border-none outline-none text-[#A5FFFD] text-[18px] font-HackerNoonV2 placeholder:text-[#A5FFFD] placeholder:opacity-60",
                                isRedeemError && 'text-[#FF1452]'
                            )}
                            value={code}
                            onFocus={() => setIsRedeemError(false)}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        {/* <button
                            onClick={handleRedeem}
                            disabled={!(code.length > 0 && !isLoading)}
                            className={clsx(
                                "ml-[10px] w-[38px] h-[38px] flex items-center justify-center rounded-[8px] bg-[#836EF9] border border-[#000000] shadow-[inset_0px_4px_0px_0px_rgba(255,255,255,0.5)]",
                                (code.length > 0 && !isLoading) ? "opacity-100" : "opacity-50"
                            )}
                            style={{ padding: 0 }}
                        >
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_i_38211_5994)">
                                    <rect width="25" height="24" rx="6" fill="#836EF9" />
                                </g>
                                <rect x="0.5" y="0.5" width="24" height="23" rx="5.5" stroke="black" />
                                <path d="M12.5 8H16V15H8M8 15L10.5 12.5M8 15L10.5 17.5" stroke="black" />
                                <defs>
                                    <filter id="filter0_i_38211_5994" x="0" y="0" width="25" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="2" />
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
                                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_38211_5994" />
                                    </filter>
                                </defs>
                            </svg>

                        </button> */}

                        <div onClick={handleRedeem} className="cursor-pointer">
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_i_38211_5994)">
                                    <rect width="25" height="24" rx="6" fill="#836EF9" />
                                </g>
                                <rect x="0.5" y="0.5" width="24" height="23" rx="5.5" stroke="black" />
                                <path d="M12.5 8H16V15H8M8 15L10.5 12.5M8 15L10.5 17.5" stroke="black" />
                                <defs>
                                    <filter id="filter0_i_38211_5994" x="0" y="0" width="25" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="2" />
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
                                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_38211_5994" />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </>
            }


        </div>
    )
}