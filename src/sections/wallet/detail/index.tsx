import { Tab } from "@/components/tab/Tab";
import CustomerBox from "../customer-box";
import NormalTabs from "@/components/tab";
import clsx from "clsx";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tokens from "../tokens";
import Nfts from "../nfts";
import DeFiPosition from "../defi-position";
import History from "../history";

const transactionTabStyle = {
    background: "linear-gradient(135deg, #3E3284 0%, #1F1A3D 100%)",
    color: "#fff"
}
export default function Detail(props: any) {
    const { tokens, isLoading: tokensLoading, isRotating, setIsRotating } = props;
    const [transactionTab, setTransactionTab] = useState<any>(1);

    const tabs: any = [
        {
            label: "Tokens",
            value: "Tokens",
            content: <TabContent><Tokens tokens={tokens} isLoading={tokensLoading} /></TabContent>,
        },
        {
            label: "NFTs",
            value: "NFTs",
            content: <TabContent><Nfts refresh={isRotating} /></TabContent>,
        },
        // {
        //     label: "DeFi Position",
        //     value: "DeFi Position",
        //     content: <DeFiPosition />,
        // },
        {
            label: "Transactions",
            value: "Transactions",
            content: <History type={transactionTab} refresh={isRotating} />,
        }
    ]

    const [tab, setTab] = useState<any>(tabs[0]);
    

    const tabWidth = 'auto';
    const onTab = (tab: typeof Tab) => {
        setTab(tab);
    }

    const tabsClassName = "pr-[10px] flex-1 h-full";
    const tabsHeaderClassName = "!justify-start h-[39px] overflow-hidden rounded-tl-[6px]";
    const tabsHeaderItemClassName = " py-[20px] text-[18px] relative !text-[#A1AECB] font-[400] h-full bg-[url('/images/mainnet/wallet/wallet-tab-bg.png')] bg-no-repeat bg-center bg-[length:100%_100%] !px-[50px] uppercase first:!pl-[100px] ml-[-15px] first:ml-[-50px] z-1 leading-[1]";
    const tabsHeaderItemActiveClassName = "!text-[#fff] font-[600] !bg-[url('/images/mainnet/wallet/wallet-tab-bg-active.png')] bg-no-repeat bg-center bg-[length:100%_100%] [text-shadow:0_0_10px_#FFFFFF99] !z-10";
    const tabsBodyClassName = "border border-[#383E4E] h-full bg-[#00000080] mt-[4px]";

    return (
        <div className="text-white flex-1 flex flex-col gap-[2px] h-[calc(100dvh-290px)]">
            <NormalTabs
                tabs={tabs}
                tabWidth={tabWidth}
                onTab={onTab}
                currentTab={tab}
                className={clsx("", tabsClassName)}
                headerClassName={clsx("", tabsHeaderClassName)}
                headerItemClassName={clsx("", tabsHeaderItemClassName)}
                headerItemActiveClassName={clsx("", tabsHeaderItemActiveClassName)}
                bodyClassName={clsx("", tabsBodyClassName)}
            />

            {
                tab.value === tabs[2].value && (
                    <div className="absolute font-Oxanium top-[-2px] text-[#A1AECB] right-[60px] flex bg-[#00000033] items-center gap-0 font-[400] text-[16px] h-[36px] border border-[#272C37] rounded-[2px]">
                        <div
                            className="px-[10px] cursor-pointer h-full flex items-center justify-center min-w-[100px] w-full focus:outline-none transition-all duration-200 font-normal"
                            style={transactionTab === 1 ? transactionTabStyle : {}}
                            onClick={() => setTransactionTab(1)}
                        >
                            Transacaction
                        </div>
                        <div
                            className="px-[10px] cursor-pointer h-full flex items-center justify-center bg-transparent focus:outline-none transition-all duration-200"
                            style={transactionTab === 2 ? transactionTabStyle : {}}
                            onClick={() => setTransactionTab(2)}
                        >
                            Gaming
                        </div>
                    </div>
                )
            }

            <div
                className="absolute top-[-2px] right-[9px] cursor-pointer h-[36px] w-[43px] flex  items-center rounded-[2px] justify-center border border-[#383E4E]"
                onClick={() => {
                    setIsRotating(isRotating + 1);
                }}
            >
                <AnimatePresence>
                    <motion.svg
                        initial={{ rotate: 0 }}
                        animate={{
                            rotate: 360 * isRotating,
                            transition: {
                                rotate: { duration: 1, ease: "easeInOut" }
                            },
                        }}
                        width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.125 18L11.25 13.5H14.0006C15.1254 12.2712 15.7495 10.6659 15.75 9C15.75 5.92875 13.6935 3.25687 10.8855 2.4255C10.4265 2.2905 10.125 1.85175 10.125 1.3725C10.125 0.644625 10.8191 0.084375 11.5177 0.289125C15.2618 1.39163 18 4.90387 18 9C18 13.5416 14.4967 17.3846 10.125 18ZM0 9C0 4.4595 3.50325 0.615375 7.875 0L6.75 4.5H3.99938C2.8746 5.72881 2.25052 7.33414 2.25 9C2.25 12.0712 4.3065 14.7431 7.1145 15.5734C7.33755 15.6443 7.53188 15.785 7.66882 15.9749C7.80576 16.1647 7.87804 16.3935 7.875 16.6275C7.875 17.3554 7.18088 17.9156 6.48225 17.7109C2.73825 16.6084 0 13.0961 0 9Z" fill="#66657E" />
                    </motion.svg>
                </AnimatePresence>
            </div>
        </div>
    )
}

const TabContent = (props: any) => {
    const { children } = props;
    return (
        <div className="h-[calc(100dvh-295px)] overflow-y-auto">
            {children}
        </div>
    )
}