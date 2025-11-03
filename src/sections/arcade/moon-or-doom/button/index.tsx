"use client"

import { useCallback } from 'react'

type BackProps = {
    label?: string
    className?: string
    onClick?: () => void
    icon?: React.ReactNode
}

export default function DoomButton(props: BackProps) {
    const { label = 'Back', className, onClick, icon } = props

    const handleClick = useCallback(() => {
        onClick?.()
    }, [onClick])

    return (
        <button
            onClick={handleClick}
            className={
                'inline-flex items-center gap-2 px-3 h-10 rounded-md border text-[16px] border-[#34304B] bg-black/20 text-[#A1AECB] pr-[10px]' +
                'hover:bg-white/5 hover:border-white/25 transition-colors select-none ' +
                (className || '')
            }
        >
            {icon}
            {label}
        </button>
    )
}


