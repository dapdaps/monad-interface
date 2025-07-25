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
        </div>
    )
}