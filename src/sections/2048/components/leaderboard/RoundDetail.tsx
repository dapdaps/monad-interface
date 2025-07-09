import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { usePrizeRoundDetail } from "./usePrizeRoundDetail";
import { formatThousandsSeparator } from "@/utils/balance";
import CircleLoading from "@/components/circle-loading";


const rankColors = [
    "#FFBF49", // 1st
    "#EF6BBF",   // 2nd
    "#BFFF60",   // 3rd
];

export const Icon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#836EF9"></circle><path d="M11.959 3.65234C9.5602 3.65234 3.65234 9.58932 3.65234 12.0001C3.65234 14.4109 9.5602 20.348 11.959 20.348C14.3578 20.348 20.2657 14.4108 20.2657 12.0001C20.2657 9.58943 14.3578 3.65234 11.959 3.65234ZM10.6645 16.7737C9.65297 16.4967 6.93338 11.7158 7.20907 10.6993C7.48475 9.68266 12.2419 6.94963 13.2534 7.22668C14.265 7.50369 16.9847 12.2845 16.709 13.3011C16.4333 14.3176 11.6761 17.0507 10.6645 16.7737Z" fill="white"></path></svg>
);

const RoundDetail: React.FC<{ round: any, onBack: () => void }> = ({ round, onBack }) => {
    const { prizeRoundDetail, getPrizeRoundDetail, loading } = usePrizeRoundDetail({ round: round.round });

    return (
        <div className=" w-full text-white max-w-[600px] mx-auto font-Montserrat">
            <div className="flex items-center mb-2 w-full justify-between mt-[20px] px-4 bg-[#836EF933] rounded-md py-2 cursor-pointer" onClick={onBack}>
                <div className="flex items-center gap-2">
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 11L2 6L6 1" stroke="white" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    <div>
                        Round {round.round}
                    </div>
                </div>
                <span className="flex items-center mr-4 gap-2">
                    <Icon />
                    {round.prize}
                </span>
                <span className="">{dayjs(round.start_time * 1000).format('MM.DD')} - {dayjs(round.end_time * 1000).format('MM.DD,YYYY')}</span>
            </div>
            <div className="flex  py-2 text-[#A6A6DB] text-[14px]">
                <div className="flex-[2]">Winner</div>
                <div className="flex-1 text-center">Score</div>
                <div className="flex-1 text-center">Prize</div>
                <div className="flex-1 text-right min-w-[150px] pr-8">State</div>
            </div>
            {prizeRoundDetail && !loading && prizeRoundDetail.map((w, idx) => (
                <div
                    key={w.rank}
                    className="flex items-center py-3  text-[14px]"
                >
                    <div className="flex-[2] flex items-center gap-2">
                        <div className={`w-6 h-6 flex items-center relative justify-center rounded-full text-xs}`}>
                            <svg className="absolute left-0 top-0" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5478 1.53367C13.3367 0.700518 14.6633 0.700519 15.4522 1.53367L17.4202 3.61199C17.811 4.02467 18.3589 4.25161 18.927 4.23612L21.7881 4.15809C22.9351 4.12681 23.8732 5.06489 23.8419 6.21187L23.7639 9.07302C23.7484 9.64114 23.9753 10.189 24.388 10.5798L26.4663 12.5478C27.2995 13.3367 27.2995 14.6633 26.4663 15.4522L24.388 17.4202C23.9753 17.811 23.7484 18.3589 23.7639 18.927L23.8419 21.7881C23.8732 22.9351 22.9351 23.8732 21.7881 23.8419L18.927 23.7639C18.3589 23.7484 17.811 23.9753 17.4202 24.388L15.4522 26.4663C14.6633 27.2995 13.3367 27.2995 12.5478 26.4663L10.5798 24.388C10.189 23.9753 9.64114 23.7484 9.07302 23.7639L6.21186 23.8419C5.06489 23.8732 4.12681 22.9351 4.15809 21.7881L4.23612 18.927C4.25161 18.3589 4.02467 17.811 3.61199 17.4202L1.53367 15.4522C0.700518 14.6633 0.700519 13.3367 1.53367 12.5478L3.61199 10.5798C4.02467 10.189 4.25161 9.64114 4.23612 9.07302L4.15809 6.21186C4.12681 5.06489 5.06489 4.12681 6.21187 4.15809L9.07302 4.23612C9.64114 4.25161 10.189 4.02467 10.5798 3.61199L12.5478 1.53367Z" fill={rankColors[idx] || '#7070AB'} />
                            </svg>
                            <div className="relative z-10 text-black w-[28px] h-[28px] flex items-center justify-center left-[2px] top-[2px] text-[12px] font-[600]">{idx + 1}</div>
                        </div>
                        <span>{w.game_address.slice(0, 5)}...{w.game_address.slice(-5)}</span>
                    </div>
                    <div className="flex-1 text-center">{formatThousandsSeparator(w.score)}</div>
                    <div className="flex-1 text-center">{w.prize}</div>
                    {
                        w.tx_hash && <div className="flex-1 flex gap-4 justify-end pr-4">
                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" className="cursor-pointer" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 5.34783L6.77778 11L17 1" stroke="#78FEFF" stroke-width="2" />
                            </svg>
                            <svg onClick={() => {
                                window.open(`https://testnet.monvision.io/tx/${w.tx_hash}`, '_blank');
                            }}  width="14" height="14" viewBox="0 0 14 14" fill="none" className="cursor-pointer" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.36364 9.18182L13 1M13 1H7M13 1V7M4.81818 1H1V13H13V9.18182" stroke="#A9ADB8" />
                            </svg>
                        </div>
                    }

                    {
                        !w.tx_hash && <div className="flex-1 flex gap-4 justify-end min-w-[150px] pr-4">
                            Pending
                        </div>
                    }
                </div>
            ))}

            {
                loading && <div className="flex items-center justify-center h-full pt-[100px]">
                    <CircleLoading />
                </div>
            }
        </div>
    );
};

export default RoundDetail;
