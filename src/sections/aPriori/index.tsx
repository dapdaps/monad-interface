import useIsMobile from "@/hooks/use-isMobile";
import useAPriori from "./hooks/use-apripri";
import Bg from "../swap/Bg";
import DappIcon from "../swap/Icon";

import { dapp } from "./config/dapp";
import { TabItem } from "@/components/tab/TabItem";
import { Tab } from "@/components/tab/Tab";
import Stake from "./components/stake";
import Withdraw from "./components/withdraw";

export default function APriori() {
    const { getConvertToShares, getConvertToAssets, getBalance, handleStake, getWithdrawalRequests, handleWithdraw, handleClaim, getTVL } = useAPriori();
    const isMobile = useIsMobile();

    return (
        <div className="relative lg:w-[548px] mt-[88px]">
            <div className="relative z-[2] lg:w-[446px] md:w-[370px] lg:ml-[49px] lg:py-[40px]">
                <Tab defaultActiveKey="1" onChange={(key) => {
                }}>
                    <TabItem tab="Stake" tabKey="1"><Stake /></TabItem>
                    <TabItem tab="Withdraw" tabKey="2"><Withdraw /></TabItem>
                </Tab>
            </div>
            {
                !isMobile && (
                    <>
                        <DappIcon dapp={dapp} />
                        <Bg />
                    </>
                )
            }

            {/* <h1>APriori</h1>
            <div className="flex flex-col gap-4">
                <button onClick={() => getConvertToShares(1)}>getConvertToShares</button>
                <button onClick={() => getConvertToAssets(1)}>getConvertToAssets</button>
                <button onClick={() => getBalance()}>getBalance</button>
                <button onClick={() => handleStake(0.1)}>handleStake</button>
                <button onClick={() => getWithdrawalRequests()}>getWithdrawalRequests</button>
                <button onClick={() => handleWithdraw(0.1)}>handleWithdraw</button>
                <button onClick={() => handleClaim(8052651)}>handleClaim</button>
                <button onClick={() => getTVL()}>getTVL</button>
            </div> */}
        </div>
    )
}