import React, { useEffect, useRef, useState } from "react";
import Modal from "@/components/modal";
import { get } from "@/utils/http";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { formatEnglishDate, getUTCDatetime } from "@/utils/date";
import Empty from "@/components/empty";
import dayjs from "dayjs";
import useToast from "@/hooks/use-toast";

const IconClose = () => (
    <div className="mt-[15px] mr-[15px]">
        <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 3.375L8 0H10L6 4.5L10 9H8L5 5.625L2 9H0L4 4.5L0 0H2L5 3.375Z" fill="#A6A6DB" />
        </svg>
    </div>
);

interface HistoryModalProps {
    open: boolean;
    onClose: () => void;
}

const HistoryModal = ({ open, onClose }: HistoryModalProps) => {
    const [activeTab, setActiveTab] = useState("payouts");
    const [winningOnly, setWinningOnly] = useState(false);

    return (
        <Modal
            open={open}
            onClose={onClose}
            className=""
            closeIcon={<IconClose />}
            innerClassName="font-Unbounded"
        >
            <div className="relative">
                <img src="/images/lucky777/modal-bg.png" alt="LUCKY 777" className="absolute z-1 top-0 left-0 w-full h-full" />
                <div className="flex flex-col items-center w-[692px] pb-[30px] px-[20px] max-w-full z-10 relative text-[12px]">
                    <div className="text-center mt-[-16px]">
                        <img src="/images/lucky777/buy-777-title.svg" alt="LUCKY 777" className="w-[183px] mx-auto" />
                    </div>

                    <div className="flex mt-[20px] cursor-pointer">
                        {/* <button className={"w-[120px] h-[30px] text-black font-bold rounded-l-[4px] " + (activeTab === "winning" ? "bg-[#BFFF60]" : "bg-[#8e90bd]")} onClick={() => setActiveTab("winning")}>
                            Records
                        </button> */}
                        <button className={"w-[120px] h-[30px] text-black font-bold rounded-[4px] " + (activeTab === "payouts" ? "bg-[#BFFF60]" : "bg-[#8e90bd]")} onClick={() => setActiveTab("payouts")}>
                            Result
                        </button>
                        <button className={"w-[120px] ml-2 h-[30px] text-black font-bold rounded-[4px] " + (activeTab === "purchases" ? "bg-[#BFFF60]" : "bg-[#8e90bd]")} onClick={() => setActiveTab("purchases")}>
                            Recharge
                        </button>
                    </div>

                    {
                        activeTab === "payouts" && (
                            <div onClick={() => setWinningOnly(!winningOnly)} className="flex items-center gap-2 cursor-pointer absolute top-[60px] right-[35px]">
                                <div
                                    className={`w-4 h-4 rounded-full border-2 border-[#8e90bd] cursor-pointer ${winningOnly ? "bg-[#BFFF60]" : "bg-[#00000080]"}`}
                                />
                                <span className="text-[#8e90bd]">Winning Only</span>
                            </div>
                        )
                    }

                    <div className="w-full" style={{
                        display: activeTab === "purchases" ? 'block' : 'none',
                    }}>
                        <List type="purchases" winningOnly={false} />
                    </div>

                    <div className="w-full" style={{
                        display: activeTab === "payouts" ? 'block' : 'none',
                    }}>
                        <List type="payouts" winningOnly={winningOnly} />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

const urlMap: any = {
    purchases: "/game/purchase/records",
    payouts: "/game/draw/records",
}

function List({ type, winningOnly }: { type: string, winningOnly: boolean }) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { address } = useAccount();
    const dataRef = useRef<any[]>([]);
    const { fail } = useToast({ isGame: true })

    useEffect(() => {
        if (!address) return;
        setLoading(true);
        get(urlMap[type], { address }).then((res) => {
            if (res.code !== 200) {
                setLoading(false);
                fail({
                    title: res.message
                }, 'bottom-right');
                return;
            }
            dataRef.current = res.data;
            // setData(winningOnly ? res.data.filter((item: any) => Number(item.amount) > 0) : res.data);
            setLoading(false);
        });
    }, [type, address]);

    useEffect(() => {
        if (dataRef.current.length > 0) {
            setData(winningOnly ? dataRef.current.filter((item: any) => Number(item.amount) > 0) : dataRef.current);
        } else {
            setData([]);
        }
    }, [dataRef.current, winningOnly]);

    if (!loading && data.length === 0) {
        return (
            <div className="flex justify-center w-full">
                <div className="mt-[80px] w-[161px]">
                    <img src="/images/faucet/empty.svg" alt="empty" />
                </div>
            </div>
        )
    }

    return (
        <div className="w-full mt-[42px] min-h-[340px]">
            <div className="flex px-6 py-3 gap-[30px] text-[#A6A6DB] font-bold-[300] border-b border-[#414266]">
                <div className="w-[160px]">Time</div>
                {
                    type === "purchases" && (
                        <>
                            <div className="flex-1">Recharged</div>
                            <div className="flex-1 text-right">State</div>
                        </>
                    )
                }
                {
                    type === "payouts" && (
                        <>
                            <div className="flex-1">Consumption</div>
                            <div className="flex-1">Result</div>
                            <div className="flex-1 text-right">State</div>
                        </>
                    )
                }
            </div>
            <div className="max-h-[340px] overflow-y-auto">
                {data.map((item, idx) => (
                    <div key={item.id} className={`flex px-6 py-3 gap-[30px] text-white text-[12px] items-center ${idx % 2 !== 0 ? '' : 'bg-[#0000001A]'}`}>

                        {
                            type === "purchases" && (
                                <div className="w-[160px]">{dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')}</div>
                            )
                        }
                        {
                            type === "payouts" && (
                                <div className="w-[160px] whitespace-nowrap">{dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')}</div>
                            )
                        }


                        {
                            type === "purchases" && (
                                <>
                                    <div className="flex-1">{item.amount} MON</div>
                                    <div className="flex-1 flex items-center gap-2 justify-end">
                                        <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 5.34783L6.77778 11L17 1" stroke="#78FEFF" stroke-width="2" />
                                        </svg>
                                        <a href={`https://testnet.monvision.io/tx/${item.tx_hash}`} target="_blank" rel="noreferrer">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.36364 9.18182L13 1M13 1H7M13 1V7M4.81818 1H1V13H13V9.18182" stroke="#A9ADB8" />
                                            </svg>
                                        </a>
                                    </div>
                                </>
                            )
                        }

                        {
                            type === "payouts" && (
                                <>
                                    <div className="flex-1 flex items-center gap-2">
                                        X {item.spin}
                                    </div>
                                    {
                                        item.code === '666' && (<>
                                            <div className="flex-1 flex items-center gap-2 whitespace-nowrap">
                                                WL
                                                <img src="/images/lucky777/chogstarrr-icon.png" alt="ML" className="w-[20px] h-[20px]" />
                                            </div>
                                            <div className="flex-1 flex items-center gap-2 justify-end text-[#78FEFF]">Pending</div>
                                        </>
                                        )
                                    }

                                    {
                                        item.code !== '666' && (<>
                                            <div className="flex-1 flex items-center gap-2 whitespace-nowrap">
                                                {item.amount} MON
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="10" cy="10" r="10" fill="#836EF9" />
                                                    <path d="M9.99996 4C8.26731 4 4 8.2672 4 9.99996C4 11.7327 8.26731 16 9.99996 16C11.7326 16 16 11.7326 16 9.99996C16 8.26727 11.7327 4 9.99996 4ZM9.06497 13.431C8.33432 13.2319 6.36993 9.79563 6.56906 9.06498C6.76819 8.33429 10.2044 6.36992 10.935 6.56905C11.6657 6.76815 13.6301 10.2043 13.431 10.935C13.2318 11.6657 9.79563 13.6301 9.06497 13.431Z" fill="white" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 flex items-center gap-2 justify-end">
                                                {
                                                    Number(item.amount) > 0 && item.tx_hash && <>

                                                        <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1 5.34783L6.77778 11L17 1" stroke="#78FEFF" stroke-width="2" />
                                                        </svg>
                                                        <a href={`https://testnet.monvision.io/tx/${item.tx_hash}`} target="_blank" rel="noreferrer">
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M5.36364 9.18182L13 1M13 1H7M13 1V7M4.81818 1H1V13H13V9.18182" stroke="#A9ADB8" />
                                                            </svg>
                                                        </a>
                                                    </>
                                                }

                                                {
                                                    Number(item.amount) > 0 && !item.tx_hash && <span className="text-[#78FEFF]">Pending</span>
                                                }

                                                {
                                                    Number(item.amount) === 0 && <>-</>
                                                }
                                            </div>
                                        </>)
                                    }
                                </>
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HistoryModal;
