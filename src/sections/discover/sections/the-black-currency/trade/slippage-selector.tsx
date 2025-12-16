"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import InputNumber from "@/components/input-number";

interface SlippageSelectorProps {
    slippage: string;
    onSlippageChange: (value: string) => void;
    onClose: () => void;
}

export default function SlippageSelector({ slippage, onSlippageChange, onClose }: SlippageSelectorProps) {
    const [customSlippage, setCustomSlippage] = useState(slippage);

    useEffect(() => {
        setCustomSlippage(slippage);
    }, [slippage]);

    const handlePresetClick = (value: string) => {
        onSlippageChange(value);
        setCustomSlippage(value);
        onClose();
    };

    const handleCustomChange = (value: string) => {
        setCustomSlippage(value);
        if (value && !isNaN(Number(value)) && Number(value) >= 0) {
            onSlippageChange(value);
        }
    };

    const slippagePresets = [
        { value: "10", label: "10%", level: "Low", color: "text-[#9BD742]" },
        { value: "20", label: "20%", level: "Medium", color: "text-[#836EF9]" },
        { value: "30", label: "30%", level: "High", color: "text-[#FF6D00]" },
    ];

    return (
        <div className="bg-[#151822] border border-[#34304B] rounded-[6px] py-2 px-3 mt-2 min-w-[215px]">
            <div className="text-white text-[14px] font-medium mb-2">Slippage</div>

            {/* Preset buttons */}
            <div className="flex items-center gap-2 mb-4">
                {slippagePresets.map((preset) => (
                    <button
                        key={preset.value}
                        type="button"
                        onClick={() => handlePresetClick(preset.value)}
                        className={clsx(
                            "flex-1 min-w-0 flex flex-col items-center justify-center px-3 py-2 rounded-[4px] border border-[#34304B] transition-all",
                            slippage === preset.value
                                ? "bg-[#252A3A]"
                                : ""
                        )}
                    >
                        <span className="text-white text-[14px] font-medium whitespace-nowrap">{preset.label}</span>
                        <span className={clsx("text-[12px] mt-1 whitespace-nowrap", preset.color)}>{preset.level}</span>
                    </button>
                ))}
            </div>

            {/* Custom input */}
            <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center h-[38px] bg-[#0F1117] rounded-[4px] border border-[#34304B] px-3">
                    <InputNumber
                        value={customSlippage}
                        onNumberChange={handleCustomChange}
                        placeholder="0"
                        decimals={2}
                        className="flex-1 text-white text-[14px] bg-transparent outline-none"
                    />
                    <span className="text-[#727D97] text-[14px] ml-2">%</span>
                </div>
            </div>
        </div>
    );
}


