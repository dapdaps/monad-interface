"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import clsx from "clsx";
import Big from "big.js";
import InputNumber from "@/components/input-number";
import { Token } from "@/types";
import { balanceFormated } from "@/utils/balance";
import { numberFormatter, numberRemoveEndZero } from "@/utils/number-formatter";
import useCustomAccount from "@/hooks/use-account";
import useTokenBalance from "@/hooks/use-token-balance";
import Loading from "@/components/loading";
import { usePriceStore } from "@/stores/usePriceStore";
import useTrade from "@/sections/swap/useTrade";
import { DEFAULT_CHAIN_ID } from "@/configs";
import { useDebounceFn } from "ahooks";
import Popover, { PopoverPlacement, PopoverTrigger } from "@/components/popover";
import TokenSelector from "./token-selector";
import SlippageSelector from "./slippage-selector";
import PlaceOrderButton from "./PlaceOrderButton";

interface TradeProps {
    tokenList: Token[];
    tokenOut: Token;
    onPlaceOrder?: (type: "buy" | "sell", amount: string, slippage: string) => void;
}

const PERCENT_OPTIONS = [
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "Max" },
];

export default function Trade({
    tokenList,
    tokenOut,
    onPlaceOrder,
}: TradeProps) {
    const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
    const [amount, setAmount] = useState("");
    const [slippage, setSlippage] = useState("10");
    const [tokenIn, setTokenIn] = useState<Token>(tokenList[0]);
    const popoverRef = useRef<any>(null);
    const slippagePopoverRef = useRef<any>(null);
    const [errorTips, setErrorTips] = useState("");

    const prices = usePriceStore((store) => store.price);

    const tokenInAddress = useMemo(() => {
        return tokenIn.isNative || tokenIn.address === "native" ? "native" : tokenIn.address;
    }, [tokenIn]);

    const {
        tokenBalance: balanceIn,
        isLoading: balanceInLoading,
    } = useTokenBalance(tokenInAddress, tokenIn.decimals, tokenIn.chainId || DEFAULT_CHAIN_ID);

    const tokenOutAddress = useMemo(() => {
        return tokenOut.isNative || tokenOut.address === "native" ? "native" : tokenOut.address;
    }, [tokenOut]);

    const {
        tokenBalance: balanceOut,
        isLoading: balanceOutLoading,
    } = useTokenBalance(tokenOutAddress, tokenOut.decimals, tokenOut.chainId || DEFAULT_CHAIN_ID);

    const handleTabChange = (tab: "buy" | "sell") => {
        setActiveTab(tab);
        setAmount("");
    };

    const currentToken = useMemo(() => {
        return activeTab === "buy" ? tokenIn : tokenOut;
    }, [activeTab, tokenIn, tokenOut]);

    const currentBalance = useMemo(() => {
        return activeTab === "buy" ? balanceIn : balanceOut;
    }, [activeTab, balanceIn, balanceOut]);

    const price = useMemo(() => {
        if (!amount || Big(amount).lte(0)) {
            return "0";
        }
        const priceKey = currentToken.priceKey || currentToken.symbol;
        const tokenPrice = prices[priceKey] || "0";
        if (!tokenPrice || Big(tokenPrice).lte(0)) {
            return "0";
        }
        return Big(amount).times(tokenPrice).toFixed(2);
    }, [prices, currentToken, amount]);

    const outputToken = useMemo(() => {
        return activeTab === "buy" ? tokenOut : tokenIn;
    }, [activeTab, tokenIn, tokenOut]);

    const handlePercentClick = (percent: number) => {
        if (!currentBalance || Big(currentBalance).lte(0)) return;

        if (percent === 100) {
            setAmount(currentBalance);
        } else {
            const newAmount = Big(currentBalance)
                .times(percent)
                .div(100)
                .toFixed(currentToken.decimals);
            setAmount(numberRemoveEndZero(newAmount));
        }
    };

    const selectedPercent = useMemo(() => {
        if (!amount || !currentBalance || Big(currentBalance).lte(0)) return null;
        
        const amountBig = Big(amount);
        const balanceBig = Big(currentBalance);
        
        for (const option of PERCENT_OPTIONS) {
            let expectedAmount: Big;
            if (option.value === 100) {
                expectedAmount = balanceBig;
            } else {
                expectedAmount = balanceBig.times(option.value).div(100);
            }
            
            const expectedAmountFormatted = numberRemoveEndZero(
                expectedAmount.toFixed(currentToken.decimals)
            );
            
            if (amount === expectedAmountFormatted || amountBig.eq(expectedAmount)) {
                return option.value;
            }
        }
        
        return null;
    }, [amount, currentBalance, currentToken.decimals]);

    const handlePlaceOrder = () => {
        if (!amount || Big(amount).lte(0)) return;
        onPlaceOrder?.(activeTab, amount, slippage);
    };

    const canPlaceOrder = useMemo(() => {
        if (!amount || Big(amount).lte(0)) return false;
        if (Big(amount).gt(currentBalance)) return false;
        return true;
    }, [amount, currentBalance]);

    const { loading, trade, onQuoter, onSwap, setTrade, } = useTrade({
        chainId: DEFAULT_CHAIN_ID,
        template: 'OneClick',
        from: 'discover',
        inputAmount: amount,
        onSuccess: () => {
            runQuoter();
        }
    });

    const { run: runQuoter } = useDebounceFn(
        () => {
            onQuoter({ 
                inputCurrency: tokenIn, 
                outputCurrency: tokenOut, 
                inputCurrencyAmount: amount, 
                extendParams: {
                    fee: 100, 
                    feeRecipient: "0xf9f2384fee12a3e31b3d61a262df9baa6b4e8a13" 
                }
            }).then(() => {

            });
        },
        {
            wait: 500
        }
    );

    useEffect(() => {
        if (!tokenIn || !tokenOut) {
          setErrorTips("Select token");
          setTrade(null);
          return;
        }
        if (Number(amount || 0) === 0) {
          setErrorTips("Enter an amount");
          setTrade(null);
          return;
        }
        if (Big(amount).gt(currentBalance || 0)) {
          setErrorTips(`Insufficient ${tokenIn?.symbol} Balance`);
          setTrade(null);
        } else {
          setErrorTips("");
        }
    
        runQuoter();
      }, [tokenIn, tokenOut, amount, currentBalance]);

    const handleTokenSelect = (token: Token) => {
        if (activeTab === "buy") {
            setTokenIn(token);
        }
        popoverRef.current?.onClose();
    };

    return (
        <div className="w-full border border-[#7262FF] rounded-[6px] mr-[50px]">
            {/* Tabs */}
            <div className="flex items-center gap-0 bg-[#836EF940] h-[37px] rounded-t-[6px] uppercase text-[16px] overflow-hidden text-white text-center text-base font-medium ">
                <div
                    onClick={() => handleTabChange("buy")}
                    className={clsx(
                        "flex-1 h-full flex items-center justify-center cursor-pointer",
                    )}
                    style={activeTab === "buy" ? {
                        background: "radial-gradient(66% 50% at 47.77% 50%, #553BE4 0%, #221662 100%)",
                        borderBottom: "1px solid #836EF9",
                        borderRight: "1px solid #836EF9",
                    } : undefined}
                >
                    BUY
                </div>
                <div
                    onClick={() => handleTabChange("sell")}
                    className={clsx(
                        "flex-1 h-full flex items-center justify-center cursor-pointer",
                    )}
                    style={activeTab === "sell" ? {
                        background: "radial-gradient(66% 50% at 47.77% 50%, #553BE4 0%, #221662 100%)",
                        borderBottom: "1px solid #836EF9",
                        borderLeft: "1px solid #836EF9",
                    } : undefined}
                >
                    SELL
                </div>
            </div>

            {/* Content */}
            <div className="space-y-4 px-[16px] py-[20px]">
                {/* Balance */}
                <div className="text-[#A6A6DB] text-sm flex items-center gap-2">
                    <span>Balance:</span>
                    {activeTab === "buy" ? (
                        balanceInLoading ? (
                            <Loading size={12} />
                        ) : (
                            <span>{balanceFormated(currentBalance, 2)}</span>
                        )
                    ) : (
                        balanceOutLoading ? (
                            <Loading size={12} />
                        ) : (
                            <span>{balanceFormated(currentBalance, 2)}</span>
                        )
                    )}
                </div>

                {/* Amount Input */}
                <div className="relative">
                    <div className="flex items-center justify-between h-[38px] bg-[#151822] rounded-[4px] border border-[#34304B] pl-[10px]">
                        <InputNumber
                            value={amount}
                            onNumberChange={setAmount}
                            placeholder="0"
                            decimals={currentToken.decimals}
                            className="w-[60%] text-white text-[18px] font-medium bg-transparent outline-none"
                        />


                        {
                            activeTab === "buy" ? <Popover
                                ref={popoverRef}
                                placement={PopoverPlacement.BottomRight}
                                content={
                                    <TokenSelector
                                        tokenList={tokenList}
                                        currentToken={currentToken}
                                        onTokenSelect={handleTokenSelect}
                                    />
                                }
                                contentClassName="bg-transparent"
                            >
                                <div className="flex items-center justify-end gap-2 shrink-0 border-l border-[#34304B] px-[10px] h-full cursor-pointer">
                                    <img
                                        src={currentToken.icon}
                                        alt={currentToken.symbol}
                                        className="w-[20px] h-[20px] rounded-full"
                                    />
                                    <span className="text-white font-semibold text-[18px]">{currentToken.symbol}</span>

                                    <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.5 0.5L5.5 4.5L10.5 0.5" stroke="#888888" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </Popover> : <div className="flex items-center justify-end gap-2 shrink-0 border-l border-[#34304B] px-[10px] h-full cursor-pointer">
                                <img
                                    src={currentToken.icon}
                                    alt={currentToken.symbol}
                                    className="w-[20px] h-[20px] rounded-full"
                                />
                                <span className="text-white font-semibold text-[18px]">{currentToken.symbol}</span>

                            </div>
                        }
                    </div>
                </div>

                {/* Price and Percent Options */}
                <div className="flex items-center justify-between">
                    <div className="text-[#727D97] text-[12px]">
                        ${balanceFormated(price, 2)}
                    </div>
                    <div className="flex items-center gap-1 text-[12px] text-[#727D97]">
                        {PERCENT_OPTIONS.map((option, index) => (
                            <div key={option.value} className="flex items-center">
                                {index > 0 && (
                                    <span className="mx-2">|</span>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handlePercentClick(option.value)}
                                    className={clsx(
                                        "hover:text-white transition-colors cursor-pointer",
                                        selectedPercent === option.value && "text-[#BFFF60] font-medium"
                                    )}
                                >
                                    {option.label}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Expected Output */}
                <div className="flex items-center justify-between">
                    <span className="text-[#727D97] text-[12px]">Expected</span>
                    <span className="text-[#BFFF60] text-[18px] font-medium">
                        {balanceFormated(trade?.outputCurrencyAmount, 2)} {outputToken.symbol}
                    </span>
                </div>

                {/* Slippage */}
                <div className="flex items-center justify-between">
                    <span className="text-[#727D97] text-[12px]">Slippage</span>
                    <Popover
                        ref={slippagePopoverRef}
                        placement={PopoverPlacement.BottomRight}
                        trigger={PopoverTrigger.Click}
                        content={
                            <SlippageSelector
                                slippage={slippage}
                                onSlippageChange={setSlippage}
                                onClose={() => slippagePopoverRef.current?.onClose()}
                            />
                        }
                        contentClassName="bg-transparent"
                    >
                        <div className="flex items-center gap-1 cursor-pointer">
                            <div className="px-2 py-1 bg-[#151822] border border-[#34304B] rounded text-white text-[12px] flex items-center gap-1">
                                <span className="text-[#727D97]">Slippage</span>
                                <span className="text-white">{slippage}%</span>
                            </div>
                        </div>
                    </Popover>
                </div>

                {/* Place Order Button */}
                <PlaceOrderButton
                    chainId={DEFAULT_CHAIN_ID}
                    spender={trade?.routerAddress}
                    token={currentToken}
                    amount={amount}
                    loading={loading}
                    errorTips={errorTips}
                    disabled={!canPlaceOrder}
                    onClick={onSwap}
                    onRefresh={() => {
                        runQuoter();
                    }}
                    updater={[tokenIn, tokenOut, amount, trade]}
                />
            </div>
        </div>
    );
}

