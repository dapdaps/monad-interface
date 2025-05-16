import React, { useCallback, useState } from "react";
import Modal from "@/components/modal";
import { useAccount, useSendTransaction, useSwitchChain, useConnect, injected } from "wagmi";
import { post } from "@/utils/http";
import { getSignature } from "@/utils/signature";

import {
    monadTestnet,
} from "@reown/appkit/networks";
import { useAppKit } from "@reown/appkit/react";
import { toast } from "react-toastify";

interface BuyTimesModalProps {
    open: boolean;
    onClose: () => void;
    refreshData: () => void;
}

const destAddress: any = '0x74D00ee5dF8AC41EB1e5879ed3A371D55ada6102';
const amount = 0.01;

const BuyTimesModal = ({ open, onClose, refreshData }: BuyTimesModalProps) => {
    const { address, chainId } = useAccount();

    const { data: hash, sendTransactionAsync, isPending, isSuccess } = useSendTransaction();

    const handleSelectTimes = useCallback(async (selectedTimes: number) => {
        if (!address) {
            return;
        }

        try {
            const hash = await sendTransactionAsync({
                to: destAddress,
                value: BigInt(amount * selectedTimes * 1e18),
            });
            console.log('hash:', hash);
            const res = await post("/game/purchase", {
                tx_id: hash,
                amount: (selectedTimes * amount).toString(),
                account_id: address,
                ss: getSignature(
                    `tx_hash=${hash}&time=${Math.ceil(Date.now() / 1000)}&amount=${selectedTimes * amount}`
                )
            });
            console.log('res:', res);
            if (res.code !== 200) {
                toast.error(res.message);
                return;
            }
            refreshData();
            toast.success('Buy times successfully');
        } catch (e) {
            console.log('e:', e);
            toast.error('Failed to buy times');
        }


    }, [address, sendTransactionAsync]);

    return (
        <Modal open={open} onClose={onClose} className="" closeIcon={<IconClose />} innerClassName="w-[592px] max-w-full p-8 bg-[url('/images/lucky777/modal-bg.svg')] bg-cover bg-top bg-no-repeat font-HackerNoonV2">
            <div className="flex flex-col items-center">
                <div className="text-center mt-[-48px]">
                    <img src="/images/lucky777/buy-777-title.svg" alt="LUCKY 777" className="w-[183px]  mx-auto" />
                </div>
                <div className="w-full bg-[#18172B] rounded-[6px] p-[24px] mt-[42px] border-[#414266] rou">
                    <div className="flex justify-between items-center">
                        <span className="text-white text-[14px] font-Unbounded">TIMES</span>
                        <span className="text-[#BFFF60] font-bold text-[18px]">x1</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-[15px] text-[14px] font-Unbounded">
                    <div className="text-[#fff] flex items-center gap-[10px]">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="13" cy="13" r="13" fill="#836EF9" />
                            <path d="M12.9999 5.19971C10.7475 5.19971 5.19995 10.7471 5.19995 12.9997C5.19995 15.2522 10.7475 20.7997 12.9999 20.7997C15.2524 20.7997 20.8 15.2522 20.8 12.9997C20.8 10.7472 15.2524 5.19971 12.9999 5.19971ZM11.7844 17.4599C10.8346 17.2011 8.28086 12.734 8.53973 11.7842C8.7986 10.8343 13.2656 8.2806 14.2154 8.53947C15.1653 8.7983 17.7191 13.2653 17.4602 14.2152C17.2013 15.1651 12.7343 17.7188 11.7844 17.4599Z" fill="white" />
                        </svg>
                        MON
                    </div>
                    <svg width="380" height="2" viewBox="0 0 380 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1H380" stroke="white" stroke-opacity="0.2" stroke-dasharray="2 2" />
                    </svg>
                    <div className="text-white">0.1</div>
                </div>

                <MainBtn onClick={() => handleSelectTimes(1)} />

                <div className="flex w-full justify-between gap-4">
                    <div className="flex-1 bg-[#4D4D73] border-[#ACACE2] rounded-[6px] flex flex-col items-center py-4 gap-2">
                        <div className="text-[#BFFF60] font-bold mb-2">x10</div>
                        <img src="/images/lucky777/coin-10.svg" alt="10 coins" className="mb-2 mt-[20px]" />
                        <MoreBtn onClick={() => handleSelectTimes(10)}>1 MON</MoreBtn>
                    </div>
                    <div className="flex-1 bg-[#4D4D73] border-[#ACACE2] rounded-[6px] flex flex-col items-center py-4 gap-2">
                        <div className="text-[#BFFF60] font-bold mb-2">x50</div>
                        <img src="/images/lucky777/coin-50.svg" alt="50 coins" className="mb-2 mt-[11px]" />
                        <MoreBtn onClick={() => handleSelectTimes(50)}>5 MON</MoreBtn>
                    </div>
                    <div className="flex-1 bg-[#4D4D73] border-[#ACACE2] rounded-[6px] flex flex-col items-center py-4 gap-2">
                        <div className="text-[#BFFF60] font-bold mb-2">x100</div>
                        <img src="/images/lucky777/coin-100.svg" alt="100 coins" className="mb-2" />
                        <MoreBtn onClick={() => handleSelectTimes(100)}>10 MON</MoreBtn>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

const IconClose = () => {
    return (
        <div className="mt-[15px] mr-[15px]">
            <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3.375L8 0H10L6 4.5L10 9H8L5 5.625L2 9H0L4 4.5L0 0H2L5 3.375Z" fill="#A6A6DB" />
            </svg>
        </div>

    )
}

const MainBtn = ({ onClick }: { onClick: any }) => {
    const { switchChain, isPending: switching } = useSwitchChain();
    const { address, chainId } = useAccount();
    const { open } = useAppKit();

    if (!address) {
        return (
            <button onClick={() => open()} className="w-full bg-[#BFFF60] text-[#23223A] text-[14px] py-4 rounded-[6px] mb-8 mt-[30px] border-[#000]">
                Connect
            </button>
        )
    }

    if (chainId !== monadTestnet.id) {
        return (
            <button onClick={() => switchChain({ chainId: monadTestnet.id })} className="w-full bg-[#BFFF60] text-[#23223A] text-[14px] py-4 rounded-[6px] mb-8 mt-[30px] border-[#000]">
                Switch to Monad
            </button>
        )
    }

    return (
        <button onClick={onClick} className="w-full bg-[#BFFF60] text-[#23223A] text-[14px] py-4 rounded-[6px] mb-8 mt-[30px] border-[#000]">
            BUY
        </button>
    )
}

const MoreBtn = ({ onClick, children }: { onClick: any, children: any }) => {
    const { switchChain, isPending: switching } = useSwitchChain();
    const { address, chainId } = useAccount();
    const { open } = useAppKit();

    if (!address) {
        return (
            <button onClick={() => open()} className="bg-[#BFFF60] text-[#23223A] font-bold py-1 px-4 rounded">Connect</button>
        )
    }

    if (chainId !== monadTestnet.id) {
        return (
            <button onClick={() => switchChain({ chainId: monadTestnet.id })} className="bg-[#BFFF60] text-[#23223A] font-bold py-1 px-4 rounded">Switch</button>
        )
    }

    return (
        <button onClick={onClick} className="bg-[#BFFF60] text-[#23223A] font-bold py-1 px-4 rounded">{children}</button>
    )
}



export default BuyTimesModal;
