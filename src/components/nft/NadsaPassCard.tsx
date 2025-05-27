import { useNFT } from "@/hooks/use-nft";
import CircleLoading from "../circle-loading";
import { useMemo } from "react";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import { useSwitchChain } from "wagmi";
import { monadTestnet } from "@reown/appkit/networks";
import useBindTwitterAccount from "@/sections/terminal/hooks/use-bind-twitter-account";

export default function NadsaPassCard() {
    const { nftMetadata, nftAddress, mintNFT, hasNFT, tokenIds, isLoading, address } = useNFT();
    const { open } = useAppKit();
    const { isSuccess: isBindTwitterAccount } = useBindTwitterAccount({ withAuth: false });
    console.log(nftMetadata, hasNFT, tokenIds, isBindTwitterAccount);

    const status = useMemo(() => {
        if (!address) {
            return 0;
        }

        if (hasNFT) {
            return 1;
        }

        if (nftMetadata?.totalSupply && nftMetadata?.maxSupply && Number(nftMetadata?.totalSupply) === Number(nftMetadata?.maxSupply)) {
            return 2;
        }

        return 0;
    }, [hasNFT, nftMetadata, address]);

    return (
        <div className="w-[308px] p-4 relative">
            <div className="absolute top-0 left-0 w-full h-full">
                <img src="/images/nft/bg.png" alt="bg" className="w-full h-full" />
            </div>
            <div className="relative pt-[65px] z-10 px-[10px]">
                <div className="absolute top-[0px] left-[38px] ">
                    <img src="/images/nft/title.svg" alt="bg" className="w-[50px] h-[50px]" />
                </div>

                <div className="text-[#00FF11] text-[22px] font-HackerNoonV2 text-center  drop-shadow-[0px_0px_10px_#BFFF6099]">DATA OVERRIDE</div>

                <div className="mt-[15px] relative">
                    <img src="/images/nft/token.png" alt="nadsa" className="w-[252px] h-[162px] mx-auto" style={{
                        opacity: status > 0 ? 0.3 : 1
                    }} />
                    {
                        status === 1 && (
                            <div className="absolute top-0 left-0 w-full h-full">
                                <img src="/images/nft/mint-successfully.svg" alt="nadsa" className="w-full" />
                            </div>
                        )
                    }
                    {
                        status === 2 && (
                            <div className="absolute top-0 left-0 w-full h-full">
                                <img src="/images/nft/mint-out.svg" alt="nadsa" className="w-full" />
                            </div>
                        )
                    }
                </div>


                <div className="mt-[20px] bg-[#212041] rounded-[6px] p-[10px] font-Pixelmix text-[12px]">
                    <div className="text-[#8D7CFF] text-[16px]">NADSA_ADMISSION_TICKET</div>
                    <div className="flex justify-between mt-[10px]">
                        <div className="text-[#8D7CFF]">Type:</div>
                        <div className={status === 2 ? 'text-[#8D7CFF]' : 'text-[#00FF11]'}>Non Fungible Token</div>
                    </div>
                    <div className="flex justify-between mt-[5px]">
                        <div className="text-[#8D7CFF]">Editions minted:</div>
                        <div className={status === 2 ? 'text-[#8D7CFF]' : 'text-[#00FF11]'}>{nftMetadata?.totalSupply} / {nftMetadata?.maxSupply}</div>
                    </div>
                    <div className="flex justify-between mt-[5px]">
                        <div className="text-[#8D7CFF]">Price:</div>
                        <div className={status === 2 ? 'text-[#8D7CFF]' : 'text-[#00FF11]'}>1 MON</div>
                    </div>
                </div>
                {
                    status !== 2 && <>
                        {
                            address ? <div className="flex items-center justify-between mt-[10px] text-[12px] h-[40px] px-[10px] bg-[#212041] rounded-[2px] font-Pixelmix">
                                <div className="text-[#FFFFFF]">{address?.slice(0, 5)}...{address?.slice(-5)}</div>
                                <div className="text-[#00FF00]">
                                    <RightArrow />
                                </div>
                            </div> : <button onClick={() => {
                                open();
                            }} className="flex items-center justify-between mt-[10px] text-[12px] h-[40px] px-[10px] bg-[#7663F4] rounded-[2px] font-Pixelmix">
                                <div className="text-[#FFFFFF]">Connect Wallet</div>
                            </button>
                        }

                        {
                            !isBindTwitterAccount ? <button onClick={() => {
                                window.open('https://twitter.com/intent/follow?screen_name=0xNADSA', '_blank');
                            }} className="flex items-center justify-center mt-[10px] text-[12px] w-full h-[40px] px-[10px] bg-[#7663F4] rounded-[2px] font-Pixelmix">
                                <div className="text-[#FFFFFF]">Follow 0xNADSA on X</div>
                            </button> : <div className="flex items-center justify-between mt-[10px] text-[12px] h-[40px] px-[10px] bg-[#212041] rounded-[2px] font-Pixelmix">
                                <div className="text-[#FFFFFF]">Followed 0xNADSA</div>
                                <div className="text-[#00FF00]">
                                    <RightArrow />
                                </div>
                            </div>
                        }

                    </>
                }

                {
                    status === 1 && (
                        <div className="flex items-center justify-center gap-[10px] text-[12px] h-[40px] mt-[10px] mb-[10px] text-[#00FF11] font-Pixelmix">
                            <RightArrow /> Mint Successfully
                        </div>
                    )
                }
                {
                    status === 0 && (
                        <MainBtn onClick={() => mintNFT()} >
                            {isLoading ? <><CircleLoading /> Mint NFT</> : 'Mint NFT'}
                        </MainBtn>
                    )
                }
                {
                    status === 2 && (
                        <div className="flex opacity-30 w-full items-center justify-center text-[12px] h-[40px] mt-[10px] mb-[10px] bg-[#7663F4] text-[#fff] rounded-[2px] font-Pixelmix">
                            MINTED OUT
                        </div>
                    )
                }
            </div>
        </div>
    );
}

const RightArrow = () => {
    return (
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4.5L6.5 10L15.5 1" stroke="#00FF11" stroke-width="2" />
        </svg>
    )
}

const MainBtn = ({ onClick, children }: { onClick: any, children: any }) => {
    const { switchChain, isPending: switching } = useSwitchChain();
    const { address, chainId } = useAccount();
    const { open } = useAppKit();

    if (!address) {
        return (
            <button onClick={() => open()} className="flex w-full items-center justify-center text-[12px] h-[40px] mt-[10px] mb-[10px] bg-[#7663F4] text-[#fff] rounded-[2px] font-Pixelmix">
                Connect
            </button>
        )
    }

    if (chainId !== monadTestnet.id) {
        return (
            <button onClick={() => switchChain({ chainId: monadTestnet.id })} className="flex w-full items-center justify-center text-[12px] h-[40px] mt-[10px] mb-[10px] bg-[#7663F4] text-[#fff] rounded-[2px] font-Pixelmix">
                Switch to Monad
            </button>
        )
    }

    return (
        <button onClick={onClick} className="flex w-full items-center justify-center text-[12px] h-[40px] mt-[10px] mb-[10px] bg-[#7663F4] text-[#fff] rounded-[2px] font-Pixelmix">
            {children}
        </button>
    )
}