'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface SocialCardProps {
    className?: string;
    style?: React.CSSProperties;
    tokenName?: string;
    tokenSymbol?: string;
    twitterHandle?: string;
    marketCap?: string;
    description?: string;
    iconUrl?: string;
    onBuyClick?: () => void;
}

const SocialCard = ({
    className,
    style,
    tokenName = 'MBC',
    tokenSymbol = 'MBC',
    twitterHandle = '@0xMarlock',
    marketCap = '$54.5M',
    description = 'Discribe meme token here...',
    iconUrl,
    onBuyClick,
}: SocialCardProps) => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const checkReadyState = () => {
            if (document.readyState === 'complete') {
                setIsReady(true);
            }
        };

        if (document.readyState === 'complete') {
            setIsReady(true);
        } else {
            window.addEventListener('load', checkReadyState);
            return () => {
                window.removeEventListener('load', checkReadyState);
            };
        }
    }, []);

    return (
        <motion.div
            className={clsx(
                'fixed bottom-[60px] right-[20px] z-[100]',
                'w-[327px] h-[147px]',
                'rounded-[8px]',
                'border border-[#6750FF]',
                'bg-[url(/images/mainnet/meme-bg.png)] bg-no-repeat bg-center bg-[size:100%_100%]',
                'p-[20px]',
                '[filter:drop-shadow(0_0_20px_rgba(131,110,249,0.6))_drop-shadow(0_0_40px_rgba(131,110,249,0.4))]',
                className
            )}
            style={style}
            initial={{ y: 200, opacity: 0 }}
            animate={isReady ? { y: 0, opacity: 1 } : { y: 200, opacity: 0 }}
            transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
                duration: 0.8,
                delay: 1,
            }}
        >
            <div className="relative flex flex-col gap-[16px] bg z-10">
                <div className="flex items-start gap-[12px]">
                    <div className="w-[60px] h-[60px] rounded-[12px] border border-white/30 bg-[#2B294A] flex items-center justify-center flex-shrink-0">
                        {iconUrl ? (
                            <img src={iconUrl} alt={tokenSymbol} className="w-full h-full object-contain" />
                        ) : (
                            <div className="w-[40px] h-[40px] rounded-full bg-black border-2 border-white/20" />
                        )}
                    </div>

                    <div className="flex-1 flex flex-col gap-[4px]">
                        <div className="text-white text-[20px] font-bold leading-tight">
                            {tokenSymbol}
                        </div>
                        <div className="text-white text-[16px] leading-tight">
                            {twitterHandle}
                        </div>
                        <div className="text-[#BFFF60] text-[14px] font-medium leading-tight whitespace-nowrap">
                            Market cap: {marketCap}
                        </div>
                    </div>

                    <button
                        onClick={onBuyClick}
                        className={clsx(
                            'flex items-center gap-[6px] border border-[#6750FF] justify-center pl-[12px]',
                            'rounded-[6px]',
                            'text-white text-[16px] font-medium',
                            'hover:opacity-90',
                            'transition-opacity',
                            '[background:radial-gradient(66%_50%_at_46%_50%,_#553BE4_0%,_#221662_100%)]'
                        )}
                    >
                        <span>Buy</span>
                        <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_1242_2078)">
                                <path d="M18.7739 14.3361C19.4406 14.721 19.4406 15.6833 18.7739 16.0682L11.506 20.2643C10.6199 20.7759 9.6284 19.7843 10.14 18.8983L11.9853 15.7021C12.1639 15.3927 12.1639 15.0115 11.9853 14.7021L10.14 11.506C9.6284 10.6199 10.6199 9.6284 11.506 10.14L18.7739 14.3361Z" fill="white" />
                            </g>
                            <defs>
                                <filter id="filter0_d_1242_2078" x="0" y="0" width="29.2739" height="30.4043" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset />
                                    <feGaussianBlur stdDeviation="5" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1242_2078" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1242_2078" result="shape" />
                                </filter>
                            </defs>
                        </svg>
                    </button>
                </div>

                <div className="text-white text-[14px] leading-relaxed">
                    {description}
                </div>
            </div>

            <div className="w-full h-full bg-[#1D1E22CC] absolute bottom-0 left-0 rounded-[8px]" />
        </motion.div>
    );
};

export default SocialCard;

