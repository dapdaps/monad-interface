import useUser from "@/hooks/use-user";
import Summary from "./summary";
import Detail from "./detail";
import { useEffect, useState } from "react";
import { useWalletInfoStore } from "@/stores/useWalletInfoStore";

export default function WalletView() {
    const [isRotating, setIsRotating] = useState(0);
    const walletInfo = useWalletInfoStore((store: any) => store.walletInfo);
    const isLoading = useWalletInfoStore((store: any) => store.isLoading);
    const setFresh = useWalletInfoStore((store: any) => store.setFresh);

    useEffect(() => {
        setFresh(isRotating);
    }, [isRotating]);


    return (
        <div className="px-[120px] !pt-[108px] font-Oxanium mainnet-content overflow-y-auto bg-[url('/images/faucet/bg.png')] bg-black bg-no-repeat bg-top bg-cover">
            <div className="max-w-[1440px] mx-auto min-w-[1200px] flex  gap-[16px] relative h-[calc(100dvh-248px)]">
                <img className="absolute left-[-20px] top-[-20px] w-[320px] h-auto pointer-events-none" src="/images/mainnet/wallet/wallet-bg-t-l.png" />
                <img className="absolute left-[-50px] bottom-[-38px] w-[308px] h-auto pointer-events-none" src="/images/mainnet/wallet/wallet-bg-b-l.png" />
                <img className="absolute right-[-20px] bottom-[-38px] w-[320px] h-auto pointer-events-none" src="/images/mainnet/wallet/wallet-bg-b-r.png" />
                <Summary sumValue={walletInfo?.sumValue} isLoading={isLoading}  />
                <Detail tokens={walletInfo?.tokens} isLoading={isLoading} isRotating={isRotating} setIsRotating={setIsRotating} />
            </div>
        </div>
    );
}