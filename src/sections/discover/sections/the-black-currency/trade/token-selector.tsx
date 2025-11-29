"use client";

import { useMemo } from "react";
import clsx from "clsx";
import { Token } from "@/types";
import { balanceFormated } from "@/utils/balance";
import useTokenBalance from "@/hooks/use-token-balance";
import Loading from "@/components/loading";
import { DEFAULT_CHAIN_ID } from "@/configs";

interface TokenSelectorProps {
    tokenList: Token[];
    currentToken: Token;
    onTokenSelect: (token: Token) => void;
}

export default function TokenSelector({ tokenList, currentToken, onTokenSelect }: TokenSelectorProps) {

    return (
        <div
            className="bg-[#151822] border border-[#34304B] rounded-[4px] mt-[10px] min-w-[145px]"

        >
            <div className="space-y-[8px]">
                {tokenList.map((token) => (
                    <TokenRow
                        key={token.address}
                        token={token}
                        isSelected={token.address === currentToken?.address && token.symbol === currentToken?.symbol}
                        onSelect={onTokenSelect}
                    />
                ))}
            </div>
        </div>
    );
}

interface TokenRowProps {
    token: Token;
    isSelected: boolean;
    onSelect: (token: Token) => void;
}

function TokenRow({ token, isSelected, onSelect }: TokenRowProps) {
    const tokenAddress = useMemo(() => {
        return token.isNative || token.address === "native" ? "native" : token.address;
    }, [token]);

    const {
        tokenBalance,
        isLoading,
    } = useTokenBalance(tokenAddress, token.decimals, token.chainId || DEFAULT_CHAIN_ID);

    return (
        <div
            onClick={() => onSelect(token)}
            className={clsx(
                "flex items-center justify-between px-[12px] py-[10px] rounded-[4px] cursor-pointer transition-all",
                isSelected
                    ? "bg-[#836EF940]"
                    : "hover:bg-[#1F1B2E]"
            )}
        >
            <div className="flex items-center gap-[10px] flex-1">
                <div className="relative">
                    <img
                        src={token.icon}
                        alt={token.symbol}
                        className="w-[15px] h-[15px] rounded-full"
                    />
                </div>
                <span className="text-white font-medium text-[14px]">{token.symbol}</span>
            </div>
            <div className="flex items-center justify-end">
                {isLoading ? (
                    <Loading size={12} />
                ) : (
                    <span className="text-[#A6A6DB] font-medium text-[14px]">
                        {balanceFormated(tokenBalance, 2)}
                    </span>
                )}
            </div>
        </div>
    );
}

