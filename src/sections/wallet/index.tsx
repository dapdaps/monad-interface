import useUser from "@/hooks/use-user";
import CustomerBox from "./customer-box";
import Copyed from "@/components/copyed";
import CustomerButton from "./customer-button.tsx/inde";

export default function WalletView() {
    const { userInfo } = useUser()

    console.log(userInfo)

    return (
        <div className="px-[28px] font-Oxanium">
            <CustomerBox>
                <div className="pb-[10px] text-white flex pr-[30px]">
                    <div className="w-[302px]">
                        <img src="/images/mainnet/wallet/main-nft.png" className="w-full h-auto" />
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
                            <CustomerButton>
                                Bridge
                            </CustomerButton>
                            <CustomerButton>
                                Swap
                            </CustomerButton>
                        </div>
                    </div>
                </div>
            </CustomerBox>
        </div>
    );
}