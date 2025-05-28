import React, { useCallback, useMemo, useState } from "react";
import Modal from "@/components/modal";
import { useNFT } from "@/hooks/use-nft";
import { useAppKit } from "@reown/appkit/react";
import { useUserStore } from "@/stores/user";
import CircleLoading from "../circle-loading";
import { useAccount } from "wagmi";
import { useSwitchChain } from "wagmi";
import { monadTestnet } from "@reown/appkit/networks";
import "@/sections/terminal/chat-v2/animate.css";
import { motion } from "framer-motion";

const slides = [
    {
        img: "/images/nft/home/main-1.svg",
        title: "WELCOME ABOARDING NADSA",
        desc: `In the vast, uncharted Monad Galaxy, chaos reigned. DApps launched at light speed. Yield hubs blinked into existence. Degens floated untethered, with no map to guide them. Monad's hyperspeed finality was revolutionary – but explorers lacked direction.`,
        descTitle: 'FROM THE FAR FAR AWAY...',
    },
    {
        img: "/images/nft/home/main-2.svg",
        title: "WELCOME ABOARDING NADSA",
        desc: `NADSA One is a command station in low-Monad orbit, curating the galaxy's top protocols into a single interface. Your mission control for navigating the Monadverse.`,
        descTitle: 'ENTER NADSA \\_ \n NATIONAL AGENCY FOR DECENTRALISED SPACE APPS.',
    },
    {
        img: "/images/nft/home/main-3.svg",
        title: "WELCOME ABOARDING NADSA",
        desc: `A purpose-built command center for seamless exploration of the Monad ecosystem. NADSA One brings together all the bluechip protocols across Monad – from DEXs and lending markets to bridges and beyond – all in one streamlined, in-app experience.`,
        descTitle: 'WELCOME ONBOARD TO THE NADSA ONE STATION!',
    },
    {
        img: "/images/nft/home/main-4.svg",
        title: "WELCOME ABOARDING NADSA",
        desc: `Complete your onboarding by minting a unique Sequence Number—your proof of how early you arrived at NADSA. Limited mint window.`,
        descTitle: 'Mint yourself a Sequence Number NFT \\_',
    },
];

export default function Aboarding({
    isOpen,
    closeModal,
    className
}: {
    isOpen: boolean;
    closeModal: () => void;
    className?: string;
}) {
    const { nftMetadata, nftAddress, mintNFT, hasNFT, tokenIds, isLoading, address } = useNFT({ nftAddress: '0x378d216463a2245bf4b70a1730579e4da175dd0f' });
    const { open } = useAppKit();
    const setUserInfo = useUserStore((store: any) => store.set);
    const isFollowedTwitter = useUserStore((store: any) => store.isFollowedTwitter);

    const [index, setIndex] = useState(0);

    const handlePrev = useCallback(() => {
        setIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }, [index]);

    const handleNext = useCallback(() => {
        setIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
    }, [index]);

    const handleStart = useCallback(() => {
        console.log('handleStart')
        closeModal()
    }, [index]);

    const { img, title, desc, descTitle } = useMemo(() => slides[index], [index]);
    const isLast = useMemo(() => index === slides.length - 1, [index]);

    return (
        <Modal
            open={isOpen}
            isShowCloseIcon={false}
            isMaskClose={false}
            onClose={closeModal}
            className={className}
        >
            <div className="relative w-[714px] h-[721px]">
                <div className="absolute left-0 top-0 w-full h-full">
                    <img src="/images/nft/home/bg.png" alt="main-1" className="w-full h-full" />
                </div>
                <div className="w-full h-full relative">
                    {
                        !isLast && <div>
                            <div className="w-full text-center pt-[70px] text-[24px] text-[#E7E2FF] uppercase font-HackerNoonV2 drop-shadow-[0px_0px_10px_#836EF9]" >
                                {title}
                            </div>

                            <div className="flex-1 flex items-center justify-center w-full mt-[30px]">
                                <img
                                    src={img}
                                    alt={`main-${index + 1}`}
                                    className="object-contain max-h-[340px] max-w-[90%] mx-auto"
                                    style={{ imageRendering: "pixelated" }}
                                />
                            </div>

                            <div className="w-full px-8 mt-[30px]">
                                <div className="text-[#00FF00] text-[18px] whitespace-pre-wrap font-HackerNoonV2 drop-shadow-[0px_0px_10px_#00FF00]">
                                    {descTitle}

                                </div>
                                <div className="text-[#00FF00] text-[14px] mt-[10px] font-Pixelmix">
                                    {desc}
                                </div>
                            </div>
                        </div>
                    }

                    {
                        isLast && <div className="pt-[100px]">
                            <div className="flex-1 relative mx-[50px] h-[379px] rounded-[6px] overflow-hidden bg-[url('/images/nft/home/nft-bg.png')] bg-no-repeat bg-contain bg-center">
                                <div className="w-full h-full bg-[repeating-linear-gradient(to_bottom,_transparent_0px,_rgba(255,255,255,0.2)_1px,_transparent_2px,_rgba(255,255,255,0.2)_3px)]">
                                    <div className="absolute pointer-events-none z-[1] w-full left-0 h-full top-0 overflow-hidden">
                                        <motion.div
                                            className="absolute z-[10] pointer-events-none w-full h-[5px] left-0 top-0 opacity-10 bg-[linear-gradient(to_bottom,_transparent,_rgba(255,255,255,0.5),_transparent)]"
                                            animate={{
                                                y: ["-50px", "400px"]
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 10
                                            }}
                                        />
                                    </div>
                                    <div className="absolute pointer-events-none z-[1] w-[120%] left-[-10%] h-[120%] top-[-10%] overflow-hidden">
                                        <div className="noise opacity-30 pointer-events-none absolute z-[1] w-full left-0 h-full top-0 overflow-hidden"></div>
                                    </div>
                                    <div className="w-full h-full p-[10px] flex gap-[20px] relative justify-between items-center">
                                        <div className="relative w-[280px] h-[340px]">
                                            <img
                                                src="/images/nft/home/un-mint.svg"
                                                alt="nft-card"
                                                className="w-full h-full object-contain"
                                                style={{ imageRendering: "pixelated" }}
                                            />
                                        </div>

                                        <div className="flex-1 flex items-center justify-between ">
                                            <div className="">
                                                <div className="text-[#E7E2FF] text-[18px] font-HackerNoonV2 drop-shadow-[0px_0px_10px_#836EF9]">
                                                    SEQUENCE NUMBER NFT
                                                </div>

                                                <div className="font-Pixelmix text-[14px] border border-[#675BA7] bg-[#000000] py-[20px] rounded-[4px] flex gap-[10px] justify-center items-end mt-[20px]">
                                                    <div className="text-center">
                                                        <div className="text-[#8D7CFF] text-[12px]">Left</div>
                                                        <div className="text-[#00FF00]  text-[20px] mt-[5px]">{nftMetadata?.totalSupply || 0}</div>
                                                    </div>
                                                    <div className="text-[#8D7CFF]"> / </div>
                                                    <div className="text-center">
                                                        <div className="text-[#8D7CFF] text-[12px]">Total</div>
                                                        <div className="text-[#8D7CFF]  text-[20px] mt-[5px]">{nftMetadata?.maxSupply || 0}</div>
                                                    </div>
                                                </div>

                                                <div className="mt-6 space-y-3">
                                                    {
                                                        !isFollowedTwitter ? <button onClick={() => {
                                                            window.open('https://twitter.com/intent/follow?screen_name=0xNADSA', '_blank');
                                                            setTimeout(() => {
                                                                setUserInfo({ isFollowedTwitter: true });
                                                            }, 3000);
                                                        }} className="w-full bg-[#00FF00] h-[44px] text-black flex items-center justify-center rounded font-Pixelmix text-[12px] shadow-[0px_0px_10px_0px_#03E212]">
                                                            Follow @0xNADSA on X
                                                        </button> : <div className="w-full relative  h-[44px] text-[#836EF9] flex items-center justify-between font-Pixelmix text-[12px] border border-[#836EF9] rounded-[4px] px-[15px]">
                                                            <div className="text-[#836EF9]">Followed 0xNADSA</div>
                                                            <div className="text-[#836EF9]">
                                                                <RightArrow />
                                                            </div>
                                                        </div>
                                                    }

                                                    <MainBtn onClick={() => mintNFT()} disabled={isLoading}>
                                                        {isLoading ? <><CircleLoading /> <span className="ml-[10px]">Mint NFT</span></> : 'Mint NFT'}
                                                    </MainBtn>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full px-8 mt-[30px]">
                                <div className="text-[#00FF00] text-[18px] whitespace-pre-wrap font-HackerNoonV2 drop-shadow-[0px_0px_10px_#00FF00]">
                                    {descTitle}

                                </div>
                                <div className="text-[#00FF00] text-[14px] mt-[10px] font-Pixelmix">
                                    {desc}
                                </div>
                            </div>
                        </div>
                    }



                    <div className="absolute bottom-6 right-8 flex gap-4 font-Pixelmix">
                        <button
                            onClick={handlePrev}
                            disabled={index === 0}
                            className={`px-6 py-2 rounded bg-transparent  text-[#00FF00] text-[14px] transition-all duration-150 ${index === 0 ? "hidden " : " cursor-pointer"}`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={index === slides.length - 1}
                            className={`px-6 py-2 rounded bg-transparent text-[#00FF00] text-[14px]  transition-all duration-150 ${index === slides.length - 1 ? "hidden " : " cursor-pointer"}`}
                        >
                            Next
                        </button>
                        <button
                            onClick={handleStart}
                            className={`px-6 py-2 rounded bg-transparent text-[#00FF00] text-[14px]  transition-all duration-150 ${index !== slides.length - 1 ? "hidden " : " cursor-pointer"}`}
                        >
                            Start
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}


const mainBtnCls = 'w-full flex items-center justify-center bg-[#00FF00] h-[44px] text-black py-2 px-4 rounded font-Pixelmix text-[12px] shadow-[0px_0px_10px_0px_#03E212]'
const MainBtn = ({ onClick, children, disabled }: { onClick: any, children: any, disabled: boolean }) => {
    const { switchChain, isPending: switching } = useSwitchChain();
    const { address, chainId } = useAccount();
    const { open } = useAppKit();

    if (!address) {
        return (
            <button onClick={() => open()} className={mainBtnCls}>
                Connect
            </button>
        )
    }

    if (chainId !== monadTestnet.id) {
        return (
            <button onClick={() => switchChain({ chainId: monadTestnet.id })} className={mainBtnCls}>
                Switch to Monad
            </button>
        )
    }

    return (
        <button onClick={() => {
            if (disabled) {
                return;
            }

            onClick();
        }} disabled={disabled} className={mainBtnCls + ' disabled:opacity-50'}>
            {children}
        </button>
    )
}

const RightArrow = () => {
    return (
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4.5L6.5 10L15.5 1" stroke="#00FF11" stroke-width="2" />
        </svg>
    )
}