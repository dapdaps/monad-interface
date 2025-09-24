import { useUser } from "@/hooks/use-user";
import CustomerBox from "../customer-box";
import Copyed from "@/components/copyed";
import HexagonButton from "@/components/button/hexagon";
import { useRouter } from "next/navigation";
import { useSoulboundNFT } from "@/hooks/use-soulbound-nft";

export default function Summary() {
    const { userInfo } = useUser()
    const router = useRouter();

    const { hasNFT, tokenIds } = useSoulboundNFT({
        nftAddress: process.env.NEXT_PUBLIC_INDEX_NFT || '0x01E266Be41C053DC537315d6ed4ea9F487f5A037',
        autoChecking: false,
    })

    console.log(hasNFT, tokenIds);

    return (
        <CustomerBox>
            <div className="pb-[10px] text-white flex pr-[30px]">
                <div className="w-[302px] relative">
                    <img src="/images/mainnet/wallet/main-nft.png" className="w-full h-auto" />
                    {
                        hasNFT && (
                            <div className="absolute top-[115px] left-1/2 -translate-x-1/2 text-black font-bold">
                                NO.{tokenIds[0]}
                            </div>
                        )
                    }
                </div>
                <div className="pt-[60px]">
                    <div className="font-[600] text-[20px] flex items-center gap-[10px]">
                        <div>
                            {userInfo?.address.slice(0, 5)}...{userInfo?.address.slice(-4)}
                        </div>
                        <Copyed value={userInfo?.address} />
                    </div>

                    <div className="text-[36px] font-[600] leading-[1] mt-[30px]">$2744.71</div>

                    <div className="flex gap-[20px] mt-[100px]">
                        <HexagonButton onClick={() => {
                            router.push('/bridge');
                        }}>
                            <div className="px-[20px] flex items-center justify-center relative group">
                                <div>Bridge</div>
                                <ArrawIcon />
                            </div>
                        </HexagonButton>
                        <HexagonButton>
                            <div className="px-[20px] flex items-center justify-center relative group">
                                <div>Swap</div>
                                <ArrawIcon />
                            </div>
                        </HexagonButton>
                    </div>
                </div>
            </div>
        </CustomerBox>
    )
}


const ArrawIcon = () => {
    return (
        <div className="absolute top-1/2 -translate-y-1/2 right-[-10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_40077_3240)">
                    <path d="M22 16.9282L10 23.8564L14 16.9282L10 10L22 16.9282Z" fill="#BFFF60" />
                </g>
                <defs>
                    <filter id="filter0_d_40077_3240" x="0" y="0" width="32" height="33.8564" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.74902 0 0 0 0 1 0 0 0 0 0.376471 0 0 0 0.6 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_40077_3240" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_40077_3240" result="shape" />
                    </filter>
                </defs>
            </svg>
        </div>
    )
}