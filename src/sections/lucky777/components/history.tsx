import React, { useEffect, useState } from "react";
import Modal from "@/components/modal";
import { get } from "@/utils/http";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { formatEnglishDate, getUTCDatetime } from "@/utils/date";
import Empty from "@/components/empty";

const IconClose = () => (
    <div className="mt-[15px] mr-[15px]">
        <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 3.375L8 0H10L6 4.5L10 9H8L5 5.625L2 9H0L4 4.5L0 0H2L5 3.375Z" fill="#A6A6DB" />
        </svg>
    </div>
);

const mockData = [
    { time: "2025-05-20 14:53:23", result: "200 points", state: "success" },
    { time: "2025-05-20 14:53:23", result: "200 points", state: "success" },
    { time: "2025-05-20 14:53:23", result: "1 MON", state: "pending" },
];


interface HistoryModalProps {
    open: boolean;
    onClose: () => void;
}

const HistoryModal = ({ open, onClose }: HistoryModalProps) => {

    const [activeTab, setActiveTab] = useState("winning");

    useEffect(() => {
    }, [open]);

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

                    <div className="flex gap-[2px] mt-[20px] cursor-pointer">
                        <button className={"w-[100px] h-[30px] text-black font-bold rounded-[4px] " + (activeTab === "winning" ? "bg-[#BFFF60]" : "bg-[#8e90bd]")} onClick={() => setActiveTab("winning")}>
                            Winning
                        </button>
                        <button className={"w-[100px] h-[30px] text-black font-bold rounded-[4px] " + (activeTab === "purchases" ? "bg-[#BFFF60]" : "bg-[#8e90bd]")} onClick={() => setActiveTab("purchases")}>
                            Purchases
                        </button>
                        <button className={"w-[100px] h-[30px] text-black font-bold rounded-[4px] " + (activeTab === "payouts" ? "bg-[#BFFF60]" : "bg-[#8e90bd]")} onClick={() => setActiveTab("payouts")}>
                            Payouts
                        </button>
                    </div>

                    {activeTab === "winning" && (
                        <List type="winning" />
                    )}

                    {activeTab === "purchases" && (
                        <List type="purchases" />
                    )}

                    {activeTab === "payouts" && (
                        <List type="payouts" />
                    )}
                </div>
            </div>

        </Modal>
    );
};

const urlMap: any = {
    winning: "/game/draw/records",
    purchases: "/game/purchase/records",
    payouts: "/game/reward/records",
}

function List({ type }: { type: string }) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { address } = useAccount();

    useEffect(() => {
        if (!address) return;
        setLoading(true);
        get(urlMap[type], { address }).then((res) => {
            if (res.code !== 200) {
                setLoading(false);
                toast.error(res.message);
                return;
            }
            setData(res.data);
            setLoading(false);
        });
    }, [type, address]);

    if (!loading && data.length === 0) {
        return (
            <div className="flex justify-center ">
                <div className="mt-[80px] w-[161px]">
                    <img src="/images/faucet/empty.svg" alt="empty" />
                </div>
            </div>
        )
    }

    return (
        <div className="w-full mt-[42px] min-h-[340px]">
            <div className="flex px-6 py-3 text-[#A6A6DB] font-bold-[300] border-b border-[#414266]">
                <div className="flex-1">Time</div>
                {
                    type === "winning" && (
                        <div className="flex-1">Result</div>
                    )
                }
                {
                    type === "purchases" && (
                        <>
                            <div className="flex-1">Item</div>
                            <div className="flex-1">Paid</div>
                        </>
                    )
                }
                {
                    type === "payouts" && (
                        <>
                            <div className="flex-1">Amount</div>
                            <div className="flex-1">State</div>
                        </>
                    )
                }
            </div>
            <div className="max-h-[340px] overflow-y-auto">
                {data.map((item, idx) => (
                    <div key={item.id} className="flex px-6 py-3 text-white text-[12px] border-b border-[#414266] items-center">
                        <div className="flex-1">{formatEnglishDate(item.created_at)}</div>
                        {
                            type === "winning" && (
                                <div className="flex-1 justify-end">{item.points} points</div>
                            )
                        }
                        {
                            type === "purchases" && (
                                <>
                                    <div className="flex-1">{item.spin} Spins</div>
                                    <div className="flex-1">{item.amount} MON</div>
                                </>
                            )
                        }
                        {
                            type === "payouts" && (
                                <>
                                    <div className="flex-1">{item.amount} MON</div>
                                    <div className="flex-1">
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

                    </div>
                ))}
            </div>
        </div>
    )
}

export default HistoryModal;
