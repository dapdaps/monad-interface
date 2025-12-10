"use client"

import { useState, useCallback } from 'react'
import { playSound1 } from '../lib/sound'
import { IS_PRODUCTION } from '@/configs'

type BetProps = {
    bet?: number
    onChange?: (value: number) => void
}

export const BET_AMOUNTS = IS_PRODUCTION ? [50, 200, 500] : [5, 10, 20, 50]

export default function Bet(props: BetProps) {
    const { bet, onChange } = props

    const handleAmountClick = useCallback((amount: number) => {
        playSound1();
        onChange?.(amount)  
    }, [onChange])

    return (
        <div className="flex items-center gap-[10px]">
            <span className="text-white text-[14px] font-[400]">BET MON</span>

            <div className="flex items-center gap-1 text-[14px]">
                {BET_AMOUNTS.map((amount) => (
                    <button
                        key={amount}
                        onClick={() => handleAmountClick(amount)}
                        className={`
                            w-[42px] h-[36px] rounded-md text-white 
                            transition-all duration-200 select-none border
                            ${bet === amount
                                ? 'border-[#836EF9] bg-[radial-gradient(53.03%_100%_at_50%_0%,_#3E3284_0%,_#1F1A3D_100%)]'
                                : 'bg-[#151822] border-[#34304B] hover:bg-[radial-gradient(53.03%_100%_at_50%_0%,_#3E3284_0%,_#1F1A3D_100%)] hover:border-[#836EF9] '
                            }
                        `}
                    >
                        {amount}
                    </button>
                ))}
            </div>
        </div>
    )
}