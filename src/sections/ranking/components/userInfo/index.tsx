"use client";
import { useEffect, useMemo } from "react";
import { useUser } from "@/hooks/use-user";
import { formatLongText } from "@/utils/utils";
import Copyed from "@/components/copyed";
import { EMilitaryRank, MilitaryRank } from "../../config";
import { useAccount } from "wagmi";
import Tip from "../tip";
import { useUserRanking } from "../../hooks/use-user-ranking";

export default function UserInfo() {
    const { userInfo } = useUser();
    const { userRanking } = useUserRanking();

    const formattedAddress = useMemo(() => {
        if (!userInfo?.address) return "";
        const upperAddress = userInfo?.address.toUpperCase();
        return formatLongText(upperAddress, 3, 4);
    }, [userInfo]);

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

    const currentRank = useMemo(() => {
        if (!userRanking?.tier) return null;
        return MilitaryRank[EMilitaryRank[(userRanking?.tier?.charAt(0).toUpperCase() + userRanking?.tier?.slice(1)) as keyof typeof EMilitaryRank]];
    }, [userRanking]);

    const nextRank = useMemo(() => {
        if (!currentRank) return null;
        const rankNames = Object.keys(EMilitaryRank) as (keyof typeof EMilitaryRank)[];
        const currentIndex = rankNames.indexOf(currentRank.name as keyof typeof EMilitaryRank);
        if (currentIndex < 0 || currentIndex + 1 >= rankNames.length) return null;
        const nextRankKey = rankNames[currentIndex + 1];
        return MilitaryRank[EMilitaryRank[nextRankKey]];
    }, [currentRank]);

    const callbackUrl = useMemo(() => {
        return window.location.origin.includes('localhost') ? window.location.origin : 'https://alpha.nadsa.space/api/twitter_auth';
    }, []);

    return (
        <div
            className="w-full relative"
            style={{
                clipPath: outerClipPath,
                background: '#382F6F',
                padding: `${borderWidth}px`
            }}
        >
            <div
                className="w-full h-full bg-[#1B1B22] text-white rounded-[8px] overflow-hidden bg-[radial-gradient(100%_50%_at_50%_0%,_rgba(131,110,249,0.5)_0%,_rgba(0,0,0,0)_100%)]"
                style={{
                    clipPath: innerClipPath
                }}
            >
                {
                    !userInfo?.social?.twitter_user_id && (
                        <div onClick={() => {
                            if (userInfo?.social?.twitter_id) {
                                return;
                            }
                            window.open(
                                `https://x.com/i/oauth2/authorize?response_type=code&client_id=ZzZNZEw5UWdyQWRNMlU5UHRlRVE6MTpjaQ&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=tweet.read%20users.read%20follows.read%20like.read&state=state&code_challenge=challenge&code_challenge_method=plain`,
                                "_blank"
                            );
                        }} className="w-full bg-[#BFFF60] text-black h-[26px] flex items-center justify-center text-center font-[500] text-[14px] cursor-pointer">
                            + Authorize X to invite frenz
                        </div>
                    )
                }

                {
                    userInfo?.social?.twitter_user_id && (
                        <div className="flex items-center gap-2  justify-end pt-[10px] pr-[10px]">
                            <div className="text-[#A1AECB] text-[14px]">Invite link: </div>
                            <div className="text-white text-[14px] max-w-[50%] truncate">{window.location.origin + "/referral/" + userInfo?.invite_code}</div>
                            <Copyed value={window.location.origin + "/referral/" + userInfo?.invite_code || ""} />
                            <div onClick={() => {
                                
                            }} className="cursor-pointer flex items-center justify-center text-[14px] text-white bg-[#2D2948] px-[5px] py-[5px] rounded-[4px]">+ invite</div>
                        </div>
                    )
                }

                <div className="p-6 flex flex-col items-center">
                    <div className="relative w-[182px] h-[182px] rounded-[6px]  mb-5">
                        <img src={userInfo?.social?.twitter_avatar || "/images/wallet/ranking/default-avatar.png"} alt="avatar" className="w-full h-full object-cover rounded-[6px]" />
                        <div className="absolute left-0 right-0 bottom-0 h-[25px] bg-[#000000A6] flex items-center justify-center">
                            <span className="text-[#BFFF60] text-[16px] font-[500] leading-none uppercase">{userRanking?.tier}</span>
                        </div>
                        <div className="absolute bottom-[-15px] left-[-2px] w-[42px] flex items-center justify-center">
                            <img src={currentRank?.icon} alt="rank" className="w-full" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-white text-[20px]">{formattedAddress}</span>
                        <Copyed value={userInfo?.address || ""} />
                    </div>

                    <div className="flex flex-col items-center mb-6">
                        <div className="text-[#BFFF60] text-[26px] font-bold mb-1 leading-none">
                            {userRanking?.rp} RP
                        </div>
                        <div className="text-white text-[14px]">
                            Rank #{userRanking?.rank}
                        </div>
                    </div>

                    <div className="w-full text-[#A1AECB] text-[14px]">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className=" text-[14px]">Rank Progress</span>
                                <Tip content="Earn RP to advance to higher ranks" />
                            </div>
                            <span className="">{userRanking?.rp}/{currentRank?.maxRP} RP</span>
                        </div>

                        {
                            currentRank?.maxRP && <div className="relative w-full h-[16px] bg-[#2D2948] rounded-full">
                                <div
                                    className="absolute left-0 top-0 h-full bg-[#BFFF60] rounded-full transition-all duration-300"
                                    style={{ width: `${Math.min(userRanking?.rp / (currentRank?.maxRP || 1) * 100, 100)}%` }}
                                >
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[16px] h-[16px] bg-white rounded-full shadow-[0_0_6px_2px_#fff]"></div>
                                </div>
                            </div>
                        }

                        <div className="text-right text-[#A1AECB] pt-[10px]">
                            Next Level: { nextRank?.name }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}