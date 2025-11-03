import React, { useEffect, useMemo, useState } from "react";
import Modal from "@/components/modal";
import HexagonButton from "@/components/button/hexagon";
import clsx from "clsx";
import Big from "big.js";
import ActionButton from "../action-button";

type WalletModalProps = {
    open: boolean;
    onClose: () => void;
    gameBalance?: number;
    tokenBalance?: string;
    deposit?: (amount: string) => void;
    depositLoading?: boolean;
    withdraw?: (amount: string) => void;
    withdrawLoading?: boolean;
    onSuccess?: () => void;
};

export default function WalletModal({
    deposit,
    depositLoading,
    withdraw,
    withdrawLoading,
    tokenBalance,
    gameBalance,
    open,   
    onClose,
    onSuccess,
}: WalletModalProps) {
    const [tab, setTab] = useState<"recharge" | "withdraw">("recharge");
    const [amount, setAmount] = useState<string>("");
    const [percent, setPercent] = useState(0);

    const balanceText = useMemo(() => {
        return tab === "recharge" ? tokenBalance : gameBalance;
    }, [tokenBalance, gameBalance, tab]);

    const actionDisabled = useMemo(() => {
        if (Number(amount) <= 0) return true;
        return Number(amount) > Number(balanceText);
    }, [amount, balanceText]);

    const handlePercent = (p: number) => {
        const v = (Number(balanceText) * p * 100) / 100; 
        setAmount(v.toString());
    };

    const handleMax = () => setAmount((Math.floor(Number(balanceText) * 100) / 100).toString());

    const onAction = async () => {
        if (actionDisabled) return;
        if (tab === "recharge") {
            await deposit?.(amount);
            setAmount("");
            onSuccess?.();
        } else if (tab === "withdraw") {
            await withdraw?.(amount);
            setAmount("");
            onSuccess?.();
        }
    };

    useEffect(() => {
        try {
            if (tab === 'recharge') {
                setPercent(Number(new Big(Number(amount) / Number(tokenBalance)).toFixed(2)));
            }
    
            if (tab === 'withdraw') {
                setPercent(Number(new Big(Number(amount) / Number(gameBalance)).toFixed(2)));
            }
        } catch (error) {
            console.error('handlePercent error', error);
        }
    }, [tokenBalance, amount, tab, gameBalance]);


    return (
        <Modal
            open={open}
            onClose={onClose}
            innerClassName="bg-[url('/images/moon-or-doom/balance-modal-bg-2.png')] bg-no-repeat bg-[length:100%_100%] bg-center"
            isShowCloseIcon={false}
        >
            <div className="relative w-[520px]">
                <div className="">
                    <div className="flex items-center justify-center absolute top-[-120px] left-0 w-full">
                        <img src="/images/moon-or-doom/balance-header.png" alt="moon-or-doom" className="h-[180px]" />
                    </div>
                    <div className="mt-[14px] flex items-center justify-center gap-[80px] pt-[60px]">
                        <button
                            className={`pb-[6px] text-[20px] font-[600] text-white border-b-[3px] ${tab === "recharge" ? " border-[#31FFA6]" : " border-transparent"}`}
                            onClick={() => { setTab("recharge"); setAmount("0"); }}
                        >
                            Recharge
                        </button>
                        <button
                            className={`pb-[6px] text-[20px] font-[600] text-white border-b-[3px] ${tab === "withdraw" ? " border-[#31FFA6]" : "border-transparent"}`}
                            onClick={() => { setTab("withdraw"); setAmount("0"); }}
                        >
                            Withdraw
                        </button>
                    </div>

                    <div className="px-[37px]">
                        <div className="flex items-center justify-center gap-[8px] text-[20px] pt-[40px] mb-[25px]">
                            <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.3535 0C18.026 4.1649e-05 19.3818 1.35583 19.3818 3.02832V13.6279C19.3818 15.3004 18.026 16.6562 16.3535 16.6562H3.02832C1.35583 16.6562 3.3033e-05 15.3004 0 13.6279V3.02832C5.20369e-05 1.35584 1.35584 5.0926e-05 3.02832 0H16.3535ZM3.02832 1.51465C2.19346 1.5147 1.5147 2.19346 1.51465 3.02832V13.6279C1.51468 14.4628 2.19345 15.1416 3.02832 15.1416H16.3535C17.1884 15.1416 17.8672 14.4628 17.8672 13.6279V11.8867H11.9619C10.7077 11.8865 9.69155 10.8694 9.69141 9.61523V7.04102C9.69141 5.78671 10.7077 4.7697 11.9619 4.76953H17.8672V3.02832C17.8671 2.19346 17.1884 1.51469 16.3535 1.51465H3.02832ZM11.9619 6.28418C11.5446 6.28435 11.2051 6.62365 11.2051 7.04102V9.61523C11.2052 10.0325 11.5447 10.3719 11.9619 10.3721H17.8672V6.28418H11.9619ZM16.3535 7.57129C16.5033 7.57129 16.6499 7.61603 16.7744 7.69922C16.8988 7.7824 16.9955 7.90083 17.0527 8.03906C17.11 8.17735 17.1249 8.32977 17.0957 8.47656C17.0664 8.62324 16.9944 8.75849 16.8887 8.86426C16.7828 8.96995 16.6477 9.04211 16.501 9.07129C16.3542 9.10042 16.2017 9.08558 16.0635 9.02832C15.9252 8.97101 15.8068 8.87348 15.7236 8.74902C15.6405 8.62456 15.5967 8.47778 15.5967 8.32812C15.5968 8.12744 15.6764 7.93488 15.8184 7.79297C15.9603 7.65108 16.1528 7.5713 16.3535 7.57129Z" fill="#BFFF60" />
                            </svg>

                            <span className="text-[#BFFF60] font-[600]">{Number(balanceText || 0).toFixed(2)} MON</span>
                        </div>

                        <div className="mt-[24px] font-[400] text-[#A6A6DB] text-[14px] text-center">
                            {tab === "withdraw" ? `Withdraw $MON to your connected wallet.` : `Recharge $MON to your player.`}
                        </div>

                        <div className="mt-[16px]">
                            <div className="text-[#727D97] text-[14px] mb-[8px]">Amount</div>
                            <div className="flex items-center bg-[#0B0D1A] border border-[#2E3252] rounded-[10px] px-3 py-3 w-full">
                                <input
                                    type="text"
                                    value={amount}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setAmount(value);
                                    }}
                                    className="flex-1 bg-transparent outline-none text-white text-[16px]"
                                />
                                <div className="flex items-center gap-1 text-white text-[16px]">
                                    <span className="uppercase">MON</span>
                                </div>
                            </div>

                            <div className="mt-[10px] flex items-center justify-between text-[12px] text-[#727D97] px-[20px]">
                                <div className="flex items-center gap-[10px]">
                                    <button className={clsx("hover:text-[#BFFF60]", percent === 0.25 && "text-white")} onClick={() => handlePercent(0.25)}>25%</button>
                                    <span className="opacity-30">|</span>
                                    <button className={clsx("hover:text-[#31FFA6]", percent === 0.5 && "text-white")} onClick={() => handlePercent(0.5)}>50%</button>
                                    <span className="opacity-30">|</span>
                                    <button className={clsx("hover:text-[#31FFA6]", percent === 0.75 && "text-white")} onClick={() => handlePercent(0.75)}>75%</button>
                                    <span className="opacity-30">|</span>
                                    <button className={clsx("hover:text-[#31FFA6]", percent === 1 && "text-white")} onClick={handleMax}>Max</button>
                                </div>
                                <div className="opacity-70">bal: {Number(balanceText || 0).toFixed(2)}</div>
                            </div>
                        </div>

                        <div className="pt-[37px] pb-[50px]">
                            <ActionButton isLoading={tab === "recharge" ? depositLoading : withdrawLoading} onAction={onAction} actionDisabled={actionDisabled} text={tab === "recharge" ? "Recharge" : "Withdraw"} />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}


