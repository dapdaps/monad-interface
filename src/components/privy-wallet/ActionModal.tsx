import React, { useEffect, useState } from "react";
import Modal from "@/components/modal";
import { useAccount, useSendTransaction, useSwitchChain, useConnect, injected } from "wagmi";
import CircleLoading from "../circle-loading";
import { toast } from "react-toastify";
import Copyed from "../copyed";
import { useSendTransaction as usePrivySendTransaction } from "@privy-io/react-auth";
import { balanceFormated } from "@/utils/balance";
import { monadTestnet } from "viem/chains";

interface ActionModalProps {
    open: boolean;
    onClose: () => void;
    balance: number;
    nativeBalance: number;
    playerAddress: string;
    rechargeAddress: string;
    depositInitialAmount: number;
    showDeposit: number;
    isJustDesposit: boolean;
}

const ActionModal = ({
    open,
    onClose,
    balance,
    nativeBalance,
    playerAddress,
    depositInitialAmount,
    rechargeAddress,
    showDeposit,
    isJustDesposit,
}: ActionModalProps) => {
    const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");

    useEffect(() => {
        if (showDeposit) {
            setActiveTab("deposit");
        }
    }, [showDeposit]);

    return (
        <Modal open={open} closeIcon={<svg className="ml-[-20px] mt-[10px]" width="10" height="9" viewBox="0 0 10 9" fill="none">
            <path d="M5 3.375L8 0H10L6 4.5L10 9H8L5 5.625L2 9H0L4 4.5L0 0H2L5 3.375Z" fill="#A6A6DB" />
        </svg>} onClose={onClose} innerClassName="font-Montserrat">
            <div className="relative w-[495px]">
                <img src="/images/lucky777/modal-bg.png" className="absolute z-1 top-0 left-0 w-full h-full" />
                <div className="relative p-6 w-[495px] max-w-full py-[50px] px-[50px]">
                    {
                        !isJustDesposit && <div className="flex gap-2 justify-center">
                            <button
                                className={`w-[143px] h-[37px] rounded-[6px] ${activeTab === "deposit" ? "bg-[#BFFF60] text-black" : "bg-[#8e90bd] text-white"}`}
                                onClick={() => setActiveTab("deposit")}
                            >
                                Deposit
                            </button>
                            <button
                                className={`w-[143px] h-[37px] rounded-[6px]  ${activeTab === "withdraw" ? "bg-[#BFFF60] text-black" : "bg-[#8e90bd] text-white"}`}
                                onClick={() => setActiveTab("withdraw")}
                            >
                                Withdraw
                            </button>
                        </div>
                    }

                    {
                        isJustDesposit && <div className="font-Montserrat text-center text-white text-[18px]">You need <span className="text-[#836EF9]">~0.1 MON</span> more to play moves.</div>
                    }

                    <div className="flex items-center gap-2 justify-center mt-[30px]">
                        <GameIcon />

                        <div className=" text-white text-[16px]">
                            <div className="flex items-center gap-2">
                                <span className="">Player:</span>
                                <span className="text-[#A6A6DB]">{playerAddress.slice(0, 5)}...{playerAddress.slice(-5)}</span>
                                <Copyed value={playerAddress} />
                            </div>
                            <div>
                                <span className="">Balance:</span>
                                <span className="text-[#836EF9]"> {balanceFormated(balance, 4)} MON</span>
                            </div>
                        </div>
                    </div>

                    {activeTab === "deposit" && <Deposit
                        depositInitialAmount={depositInitialAmount}
                        rechargeAddress={rechargeAddress}
                        playerAddress={playerAddress}
                        balance={balance}
                        nativeBalance={nativeBalance}
                        onClose={onClose}
                    />}

                    {activeTab === "withdraw" && <Withdraw
                        rechargeAddress={rechargeAddress}
                        playerAddress={playerAddress}
                        balance={balance}
                        onClose={onClose}
                        nativeTokenBalance={nativeBalance} />}

                </div>
            </div>

        </Modal>
    );
};

const GameIcon = () => {
    return (
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="21" cy="21" r="21" fill="black" />
            <path d="M21.0879 4.4209C26.5048 4.4209 31.3168 7.00652 34.3604 11.0098L23.5908 21.752L33.625 32.0654C30.5707 35.5519 26.0875 37.7568 21.0879 37.7568C11.8818 37.7567 4.41999 30.2949 4.41992 21.0889C4.41992 11.8828 11.884 4.42099 21.0879 4.4209ZM34.3613 18.5557C35.2348 18.5558 36.0728 18.9028 36.6904 19.5205C37.3081 20.1383 37.6552 20.976 37.6553 21.8496C37.6553 22.7232 37.308 23.5609 36.6904 24.1787C36.0728 24.7964 35.2348 25.1434 34.3613 25.1436C33.4876 25.1436 32.649 24.7965 32.0312 24.1787C31.4136 23.5609 31.0664 22.7232 31.0664 21.8496C31.0664 20.9761 31.4136 20.1383 32.0312 19.5205C32.649 18.9027 33.4876 18.5557 34.3613 18.5557ZM14.3633 11.0996C13.6478 11.0997 13.0664 11.682 13.0664 12.3975V14.1807H11.2832C10.5677 14.1807 9.98633 14.7621 9.98633 15.4775C9.98647 16.1929 10.5678 16.7744 11.2832 16.7744H13.0664V18.5576C13.0665 19.273 13.6479 19.8544 14.3633 19.8545C15.0787 19.8545 15.6601 19.2731 15.6602 18.5576V16.7744H17.4434C18.1588 16.7744 18.7401 16.1929 18.7402 15.4775C18.7402 14.7621 18.1588 14.1807 17.4434 14.1807H15.6602V12.3975C15.6602 11.682 15.0788 11.0996 14.3633 11.0996Z" fill="#B16EF1" />
        </svg>
    )
}

const Deposit = ({
    rechargeAddress,
    playerAddress,
    balance,
    nativeBalance,
    depositInitialAmount,
    onClose,
}: {
    rechargeAddress: string;
    playerAddress: string;
    balance: number;
    nativeBalance: number;
    depositInitialAmount: number;
    onClose: () => void;
}) => {
    const [amount, setAmount] = useState(depositInitialAmount);
    const { data: hash, sendTransactionAsync, isPending, isSuccess } = useSendTransaction();

    return (
        <div>
            <div className=" mt-[50px] text-[#A6A6DB] text-[14px]">
                Recharge your player address with testnet MON directly via your external wallet.
            </div>
            <div className="flex items-center gap-4 mt-5 mb-4 text-[12px] text-white">
                <div className="flex items-center gap-2">
                    <img src="/images/game/out-wallet.svg" className="w-[34px] h-[34px]" />
                    <span className="truncate text-white">{rechargeAddress.slice(0, 5)}...{rechargeAddress.slice(-5)}</span>
                </div>
                <svg width="63" height="12" viewBox="0 0 63 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5C0.447715 5 4.82823e-08 5.44772 0 6C-4.82823e-08 6.55228 0.447715 7 1 7L1 5ZM63 6.00001L53 0.226502L53 11.7735L63 6.00001ZM1 6L1 7L2.9375 7L2.9375 6L2.9375 5L1 5L1 6ZM6.8125 6L6.8125 7L10.6875 7L10.6875 6L10.6875 5L6.8125 5L6.8125 6ZM14.5625 6L14.5625 7L18.4375 7L18.4375 6L18.4375 5L14.5625 5L14.5625 6ZM22.3125 6L22.3125 7L26.1875 7L26.1875 6L26.1875 5L22.3125 5L22.3125 6ZM30.0625 6L30.0625 7L33.9375 7L33.9375 6L33.9375 5L30.0625 5L30.0625 6ZM37.8125 6L37.8125 7L41.6875 7L41.6875 6L41.6875 5L37.8125 5L37.8125 6ZM45.5625 6L45.5625 7L49.4375 7L49.4375 6L49.4375 5L45.5625 5L45.5625 6ZM53.3125 6L53.3125 7L57.1875 7L57.1875 6L57.1875 5L53.3125 5L53.3125 6ZM1 5C0.447715 5 4.82823e-08 5.44772 0 6C-4.82823e-08 6.55228 0.447715 7 1 7L1 5ZM63 6.00001L53 0.226502L53 11.7735L63 6.00001ZM1 6L1 7L2.9375 7L2.9375 6L2.9375 5L1 5L1 6ZM6.8125 6L6.8125 7L10.6875 7L10.6875 6L10.6875 5L6.8125 5L6.8125 6ZM14.5625 6L14.5625 7L18.4375 7L18.4375 6L18.4375 5L14.5625 5L14.5625 6ZM22.3125 6L22.3125 7L26.1875 7L26.1875 6L26.1875 5L22.3125 5L22.3125 6ZM30.0625 6L30.0625 7L33.9375 7L33.9375 6L33.9375 5L30.0625 5L30.0625 6ZM37.8125 6L37.8125 7L41.6875 7L41.6875 6L41.6875 5L37.8125 5L37.8125 6ZM45.5625 6L45.5625 7L49.4375 7L49.4375 6L49.4375 5L45.5625 5L45.5625 6ZM53.3125 6L53.3125 7L57.1875 7L57.1875 6L57.1875 5L53.3125 5L53.3125 6Z" fill="#BFFF60" />
                </svg>

                <div className="flex items-center gap-2">
                    <GameIcon />
                    <span className="truncate">{playerAddress.slice(0, 5)}...{playerAddress.slice(-5)}</span>
                </div>
            </div>

            <div className="flex items-center bg-[#181A2A] border border-[#414266] rounded-[10px] px-3 py-2 w-full">
                <div className="flex items-center justify-center mr-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="10" fill="#836EF9" />
                        <path d="M9.96563 3.04346C7.96667 3.04346 3.04346 7.99094 3.04346 9.99994C3.04346 12.0089 7.96667 16.9565 9.96563 16.9565C11.9646 16.9565 16.8879 12.0089 16.8879 9.99994C16.8879 7.99103 11.9647 3.04346 9.96563 3.04346ZM8.88693 13.9779C8.04398 13.7471 5.77765 9.76303 6.00739 8.9159C6.23713 8.06872 10.2015 5.79119 11.0444 6.02207C11.8874 6.25291 14.1537 10.2369 13.924 11.0841C13.6942 11.9312 9.72989 14.2088 8.88693 13.9779Z" fill="white" />
                    </svg>
                </div>
                <input
                    type="number"
                    min={0}
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                    className="flex-1 bg-transparent outline-none text-white text-[14px] px-0 font-Montserrat"
                />
                <button
                    type="button"
                    className="ml-3 text-[#A6A6DB] text-[12px] font-Montserrat transition-colors"
                    onClick={() => setAmount(nativeBalance)}
                >
                    Max
                </button>
            </div>

            <Button disabled={isPending || !rechargeAddress || amount <= 0} onClick={async () => {
                if (!rechargeAddress) {
                    return;
                }

                if (isPending) {
                    return;
                }

                if (amount <= 0) {
                    return;
                }

                try {
                    const hash = await sendTransactionAsync({
                        to: playerAddress as `0x${string}`,
                        value: BigInt(amount * 1e18),
                    })
                    console.log('hash', hash);
                    onClose();

                    toast.success('Recharge success');
                } catch (error) {
                    console.error(error);
                    toast.error('Recharge failed');
                }

            }}>
                {isPending && <CircleLoading className="w-[20px] h-[20px] mr-5" />}
                Recharge
            </Button>
        </div>
    )
}

const Withdraw = ({
    playerAddress,
    rechargeAddress,
    balance,
    nativeTokenBalance,
    onClose,
}: {
    playerAddress: string;
    rechargeAddress: string;
    balance: number;
    nativeTokenBalance: number;
    onClose: () => void;
}) => {
    const [amount, setAmount] = useState(0);
    const [isPending, setIsPending] = useState(false);
    const { sendTransaction: sendTransactionPrivy } = usePrivySendTransaction({
        onSuccess: (params) => {
            console.log('sendTransactionPrivy', params);
            setIsPending(false);
        },
        onError: (error) => {
            console.error('sendTransactionPrivy', error);
            setIsPending(false);
        }
    });
    const [withdrawAddress, setWithdrawAddress] = useState(rechargeAddress);

    return (
        <div className="font-Montserrat">
            <div className="text-[#A6A6DB] text-[14px] mt-[30px]">Receive address:</div>
            <div className="flex items-center bg-[#181A2A] border border-[#414266] rounded-[10px] px-3 py-2 w-full mt-[10px]">
                <input
                    placeholder="0x..."
                    value={withdrawAddress}
                    onChange={e => setWithdrawAddress(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-white text-[14px]  px-0 font-Montserrat"
                />
            </div>

            <div className="text-[#A6A6DB] text-[14px] mt-[30px]">Withdraw amount:</div>
            <div className="flex items-center bg-[#181A2A] border border-[#414266] rounded-[10px] px-3 py-2 w-full mt-[10px]">
                <div className="flex items-center justify-center mr-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="10" fill="#836EF9" />
                        <path d="M9.96563 3.04346C7.96667 3.04346 3.04346 7.99094 3.04346 9.99994C3.04346 12.0089 7.96667 16.9565 9.96563 16.9565C11.9646 16.9565 16.8879 12.0089 16.8879 9.99994C16.8879 7.99103 11.9647 3.04346 9.96563 3.04346ZM8.88693 13.9779C8.04398 13.7471 5.77765 9.76303 6.00739 8.9159C6.23713 8.06872 10.2015 5.79119 11.0444 6.02207C11.8874 6.25291 14.1537 10.2369 13.924 11.0841C13.6942 11.9312 9.72989 14.2088 8.88693 13.9779Z" fill="white" />
                    </svg>

                </div>
                <input
                    type="number"
                    min={1}
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                    className="flex-1 bg-transparent outline-none text-white text-[14px]  px-0 font-Montserrat"
                />
                <button
                    type="button"
                    className="ml-3 text-[#A6A6DB] text-[12px] font-Montserrat transition-colors"
                    onClick={() => setAmount(balance)}
                >
                    Max
                </button>
            </div>

            <button
                disabled={isPending || !rechargeAddress || amount <= 0}
                className="w-full flex items-center justify-center mt-[40px] h-[40px] font-Montserrat text-black font-bold py-2 rounded-[10px] text-[16px] transition bg-[radial-gradient(50%_50%_at_50%_50%,#E1FFB5_0%,#B1FF3D_100%)] shadow-[0px_0px_6px_0px_#BFFF60] disabled:opacity-50 "
                onClick={async () => {
                    if (!withdrawAddress) {
                        return;
                    }

                    if (amount <= 0) {
                        return;
                    }

                    if (isPending) {
                        return;
                    }

                    setIsPending(true);

                    const hash = await sendTransactionPrivy({
                        to: rechargeAddress as `0x${string}`,
                        value: BigInt(amount * 1e18),
                    }, {
                        uiOptions: {
                            showWalletUIs: true,
                            isCancellable: true,
                            successHeader: 'Withdraw success',
                            successDescription: 'You\'re all set.',
                            buttonText: 'Withdraw',
                        }
                    })

                    console.log('hash', hash);

                    onClose();

                    toast.success('Withdraw success');
                }}
            >
                {isPending && <CircleLoading className="w-[20px] h-[20px] mr-5" />}
                Withdraw
            </button>
        </div>
    )
}

const Button = ({
    children,
    disabled,
    onClick,
}: {
    children: React.ReactNode;
    disabled: boolean;
    onClick: () => void;
}) => {
    const { address, chainId } = useAccount();
    const { switchChain } = useSwitchChain();

    if (chainId !== monadTestnet.id) {
        return (
            <button
                onClick={() => {
                    switchChain({
                        chainId: monadTestnet.id,
                    })
                }}
                className="w-full flex items-center justify-center mt-[40px] h-[40px] font-Montserrat text-black font-bold py-2 rounded-[10px] text-[16px] transition bg-[radial-gradient(50%_50%_at_50%_50%,#E1FFB5_0%,#B1FF3D_100%)] shadow-[0px_0px_6px_0px_#BFFF60] disabled:opacity-50 "
            >
                Switch to Monad
            </button>
        )
    }


    return (
        <button
            disabled={disabled}
            className="w-full flex items-center justify-center mt-[40px] h-[40px] font-Montserrat text-black font-bold py-2 rounded-[10px] text-[16px] transition bg-[radial-gradient(50%_50%_at_50%_50%,#E1FFB5_0%,#B1FF3D_100%)] shadow-[0px_0px_6px_0px_#BFFF60] disabled:opacity-50 "
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default ActionModal;
