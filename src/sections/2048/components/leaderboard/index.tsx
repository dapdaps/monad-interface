import { formatThousandsSeparator } from "@/utils/balance";
import { get } from "@/utils/http";
import { useInterval } from "ahooks";
import React, { useCallback, useEffect, useState } from "react";
import Round from "./Round";



const rankColors = [
    "#FFBF49", // 1st
    "#EF6BBF",   // 2nd
    "#BFFF60",   // 3rd
];

export function useLeaderboard() {
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);


    const getRank = useCallback(() => {
        setLoading(true);
        get('/game/leaderboard/2048').then(res => {
            if (res.code !== 200) {
                setLeaderboard([]);
            }

            setLeaderboard(res.data || [])
        }).catch(() => {
            setLeaderboard([]);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    useInterval(() => {
        getRank();
    }, 1000 * 60, {
        immediate: true,
    });

    return {
        leaderboard,
        loading
    };
}

export default function Leaderboard() {

    const { leaderboard, loading } = useLeaderboard();
    const [open, setOpen] = useState(false);

    return (
        <>
        <div className="absolute left-[-1px] top-[50%] -translate-y-1/2 w-[355px] bg-[#23224A] rounded-r-2xl pt-4 overflow-hidden mx-auto shadow-lg border border-[#3B3970]">
            {/* Header */}
            <div className="flex flex-col items-center mb-2">
                <div className="bg-[#1A1843] flex-1 border border-[#3E347C] rounded-lg px-4 py-6 mb-1 shadow-[7px_10px_0px_0px_#00000040_inset]">
                    <div className="text-[#E7E2FF] text-[26px] tracking-widest font-HackerNoonV2 drop-shadow-[0px_0px_30px_0px_#836EF9]">LEADERBOARD</div>
                </div>
                {/* <div className="text-[#A3B7FF] text-sm font-mono tracking-widest">6.16 - <span className="bg-[#23224A] border border-[#3B3970] rounded px-1 text-xs align-middle mx-1">291 × 27</span>2025</div> */}
            </div>
            {/* Prize & Countdown */}
            {/* <div className="flex justify-between gap-2 mb-2">
        <div className="flex-1 bg-[#2D2B5A] rounded-lg flex flex-col items-center py-2">
          <div className="text-[#A3B7FF] text-xs">Prize</div>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[#A3B7FF] text-lg font-bold">💎</span>
            <span className="text-[#A3B7FF] text-lg font-bold">100</span>
          </div>
        </div>
        <div className="flex-1 bg-[#2D2B5A] rounded-lg flex flex-col items-center py-2">
          <div className="text-[#A3B7FF] text-xs">3 days 10 : 59 : 12</div>
        </div>
      </div> */}
            {/* Description */}
            <div className="text-[#A6A6DB] text-[14px] text-center font-Montserrat mt-[10px]">
                Transmission received: Your 2048 data is live. <br /> Climb the Command Center leaderboard and outsmart the cosmos.
            </div>
            {/* Table */}
            <div className="mb-2 px-4 font-Montserrat mt-[20px]">
                <div className="flex justify-between text-[#A6A6DB] text-[14px] mb-1 px-2">
                    <span>Top 10</span>
                    <span>Score</span>
                </div>
                <div className="space-y-1 mt-2 min-h-[350px]">
                    {leaderboard?.length > 0 && leaderboard.map((item, idx) => (
                        <div key={item.id} className="flex items-center justify-between px-2 py-1 text-[14px]">
                            <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 flex items-center relative justify-center rounded-full text-xs}`}>
                                    <svg className="absolute left-0 top-0" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5478 1.53367C13.3367 0.700518 14.6633 0.700519 15.4522 1.53367L17.4202 3.61199C17.811 4.02467 18.3589 4.25161 18.927 4.23612L21.7881 4.15809C22.9351 4.12681 23.8732 5.06489 23.8419 6.21187L23.7639 9.07302C23.7484 9.64114 23.9753 10.189 24.388 10.5798L26.4663 12.5478C27.2995 13.3367 27.2995 14.6633 26.4663 15.4522L24.388 17.4202C23.9753 17.811 23.7484 18.3589 23.7639 18.927L23.8419 21.7881C23.8732 22.9351 22.9351 23.8732 21.7881 23.8419L18.927 23.7639C18.3589 23.7484 17.811 23.9753 17.4202 24.388L15.4522 26.4663C14.6633 27.2995 13.3367 27.2995 12.5478 26.4663L10.5798 24.388C10.189 23.9753 9.64114 23.7484 9.07302 23.7639L6.21186 23.8419C5.06489 23.8732 4.12681 22.9351 4.15809 21.7881L4.23612 18.927C4.25161 18.3589 4.02467 17.811 3.61199 17.4202L1.53367 15.4522C0.700518 14.6633 0.700519 13.3367 1.53367 12.5478L3.61199 10.5798C4.02467 10.189 4.25161 9.64114 4.23612 9.07302L4.15809 6.21186C4.12681 5.06489 5.06489 4.12681 6.21187 4.15809L9.07302 4.23612C9.64114 4.25161 10.189 4.02467 10.5798 3.61199L12.5478 1.53367Z" fill={rankColors[idx] || '#7070AB'} />
                                    </svg>
                                    <div className="relative z-10 text-black w-[28px] h-[28px] flex items-center justify-center left-[2px] top-[2px] text-[12px] font-[600]">{idx + 1}</div>
                                </div>
                                <div className="text-[#fff] text-xs">{item.game_address.slice(0, 5)}...{item.game_address.slice(-5)}</div>
                            </div>
                            <span className="text-[#fff] text-xs">{formatThousandsSeparator(item.score)}</span>
                        </div>
                    ))}

                    {
                        leaderboard?.length === 0 && (
                            <div className="flex items-center justify-center h-full pt-[100px]">
                                <div className="text-[#A6A6DB] text-[14px]">No data</div>
                            </div>
                        )
                    }
                </div>
            </div>
            {/* Check history button */}
            {/*<button onClick={() => setOpen(true)} className="w-full mt-3 py-3  bg-[#1E1D33] text-[#A6A6DB] text-[14px] font-Montserrat">Check history</button>*/}
        </div>

        {/*<Round open={open} onClose={() => setOpen(false)}/>*/}
        </>
    );
}

