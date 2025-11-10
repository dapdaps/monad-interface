"use client"

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import DoomButton from '../button'
import { playSound1 } from '../lib/sound'

type BackProps = {
    label?: string
    className?: string
}

export default function Back(props: BackProps) {
    const { label = 'Back', className } = props
    const router = useRouter()

    const handleBack = useCallback(() => {
        router.back()
    }, [router])

    return (
        <DoomButton
            label={label}
            className={className}
            onClick={() => {
                playSound1();
                handleBack();
            }}
            icon={
                <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_83_12272)">
                        <path d="M10.5 14.3356C9.83333 14.7205 9.83333 15.6828 10.5 16.0677L17.768 20.2638C18.654 20.7754 19.6455 19.7838 19.134 18.8978L17.2887 15.7016C17.11 15.3922 17.11 15.011 17.2887 14.7016L19.134 11.5055C19.6455 10.6195 18.654 9.62791 17.7679 10.1395L10.5 14.3356Z" fill="#A1AECB" />
                    </g>
                    <defs>
                        <filter id="filter0_d_83_12272" x="0" y="0" width="29.2734" height="30.4033" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_83_12272" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_83_12272" result="shape" />
                        </filter>
                    </defs>
                </svg>

            }
        />
    )
}


