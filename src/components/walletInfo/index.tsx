import useUser from "@/hooks/use-user"
import { useWalletInfoStore } from "@/stores/useWalletInfoStore"
import { useRouter } from "next/navigation"

export default function WalletInfo() {
    const { userInfo } = useUser()
    const { walletInfo } = useWalletInfoStore()
    const router = useRouter()

    return (
        <div
            className="fixed bottom-[130px] right-[40px] w-[350px] border-b-2 border-t-2 text-[16px] font-[500] uppercase border-[#A5FFFD] font-Oxanium text-[#A5FFFD] [background:radial-gradient(50%_46.84%_at_50%_53.16%,rgba(0,0,0,0.15)_0%,rgba(165,255,253,0.15)_100%)]"
            style={{
                transform: "perspective(600px) skewX(6deg) rotateZ(6deg) rotateY(-10deg) "
            }}
        >
            <div className="flex items-center justify-between h-[40px] px-[20px] border-b border-[#A5FFFD]">
                <div>Wallet</div>
                <div>{userInfo?.address?.slice(0, 5)}...{userInfo?.address?.slice(-4)}</div>
            </div>
            <div className="flex items-center justify-between h-[60px] px-[20px]">
                <div></div>
                <div className="text-[26px] flex gap-[10px] items-center">
                    <span>${walletInfo?.sumValue}</span>
                    <div className="cursor-pointer hover:scale-110 transition-all duration-300" onClick={() => router.push('/wallet')}>
                        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.6785 9.29686C14.2749 9.76459 14.1544 10.6998 13.459 11.0012L2.33382 15.8233C1.45594 16.2038 0.59632 15.2527 1.06337 14.4177L4.45775 8.34876C4.63559 8.0308 4.62644 7.64127 4.43386 7.33202L1.00068 1.81874C0.409187 0.86887 1.58622 -0.187281 2.46669 0.503288L13.6785 9.29686Z" fill="#A5FFFD" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}