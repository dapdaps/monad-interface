import useUser from "@/hooks/use-user";
import Summary from "./summary";
import Detail from "./detail";

export default function WalletView() {

    return (
        <div className="px-[120px] font-Oxanium mainnet-content overflow-y-auto bg-[url('/images/faucet/bg.png')] bg-black bg-no-repeat bg-top bg-cover">
            <Summary />
            <Detail />
        </div>
    );
}