"use client";

import { useEffect, useMemo } from "react";
import clsx from "clsx";
import Big from "big.js";
import { useSwitchChain } from "wagmi";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import useApprove from "@/hooks/use-approve";
import useAccount from "@/hooks/use-account";
import Loading from "@/components/loading";
import chains from "@/configs/chains";
import { DEFAULT_CHAIN_ID } from "@/configs";

interface PlaceOrderButtonProps {
    chainId?: number;
    spender?: string;
    token?: any;
    amount?: string;
    loading?: boolean;
    errorTips?: string;
    disabled?: boolean;
    onClick?: () => void;
    onRefresh?: () => void;
    updater?: any;
    className?: string;
    text?: string;
    onApprove?: (props: any) => any;
    onCheckApproved?: (props: any) => any;
    isApproveMax?: boolean;
    isSkip?: boolean;
}

export default function PlaceOrderButton({
    chainId = DEFAULT_CHAIN_ID,
    spender,
    token,
    amount,
    loading = false,
    errorTips,
    disabled,
    onClick,
    onRefresh,
    updater,
    className,
    text = "Place Order",
    onApprove,
    onCheckApproved,
    isApproveMax,
    isSkip
}: PlaceOrderButtonProps) {
    const { approve, approved, approving, checking, checkApproved } = useApprove({
        amount,
        token,
        spender,
        onSuccess: onRefresh,
        onApprove,
        onCheckApproved,
        isSkip,
        isMax: isApproveMax
    });
    const { isPending: switching, switchChain } = useSwitchChain();
    const { openConnectModal } = useConnectModal();
    const { account, chainId: currentChainId } = useAccount();

    const chain = chains[chainId];
    
    const filterId = useMemo(() => `filter0_d_${Math.random().toString(36).substr(2, 9)}`, []);

    useEffect(() => {
        checkApproved();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updater]);

    const renderButton = (content: React.ReactNode, onClickHandler?: () => void, isDisabled = false, isLoading = false) => {
        return (
            <button
                type="button"
                onClick={onClickHandler}
                disabled={isDisabled || isLoading}
                className={clsx(
                    "relative w-full h-[clamp(1px,_2.31vw,_calc(var(--pc-1512)*0.0231))] rounded-[6px] font-medium border border-[#836EF9] text-white transition-all duration-200 flex items-center justify-center gap-2 [background:radial-gradient(66%_50%_at_46%_50%,_#553BE4_0%,_#221662_100%)]",
                    !isDisabled && !isLoading
                        ? "hover:opacity-90"
                        : "cursor-not-allowed opacity-80",
                    className
                )}
            >
                {isLoading ? (
                    <Loading size={16} />
                ) : (
                    <>
                        <span>{content}</span>
                        <svg className="absolute right-0 top-1/2 -translate-y-1/2" width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter={`url(#${filterId})`}>
                                <path d="M18.7734 14.336C19.4401 14.7209 19.4401 15.6831 18.7734 16.068L11.5055 20.2642C10.6195 20.7757 9.62791 19.7842 10.1395 18.8982L11.9848 15.702C12.1634 15.3926 12.1634 15.0114 11.9848 14.702L10.1395 11.5059C9.62791 10.6198 10.6195 9.62828 11.5055 10.1398L18.7734 14.336Z" fill="white" />
                            </g>
                            <defs>
                                <filter id={filterId} x="0" y="0" width="29.2734" height="30.4041" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset />
                                    <feGaussianBlur stdDeviation="5" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result={`effect1_dropShadow_${filterId}`} />
                                    <feBlend mode="normal" in="SourceGraphic" in2={`effect1_dropShadow_${filterId}`} result="shape" />
                                </filter>
                            </defs>
                        </svg>
                    </>
                )}
            </button>
        );
    };

    if (!account || !currentChainId) {
        return renderButton("Connect wallet", () => {
            openConnectModal?.();
        });
    }

    if (currentChainId !== chainId) {
        return renderButton("Switch Network", () => {
            switchChain({
                chainId: chainId
            });
        }, false, switching);
    }

    if (checking || approving || loading) {
        return renderButton(text, undefined, true, true);
    }

    if (!amount || Big(amount || 0).lte(0)) {
        return renderButton(text, undefined, true);
    }

    if (errorTips) {
        return renderButton(errorTips, undefined, true);
    }

    if (!spender) {
        return renderButton("Insufficient Liquidity", undefined, true);
    }

    if (!approved) {
        return renderButton(`Approve ${token?.symbol}`, approve);
    }

    return renderButton(text, onClick, disabled);
}

