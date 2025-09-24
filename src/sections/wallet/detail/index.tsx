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

export default function Detail() {
    const tabs: any = [
        {
            label: "Tokens",
            value: "Tokens",
            content: <Tokens />,
        },
        {
            label: "NFTs",
            value: "NFTs",
            content: <Nfts />,
        },
        {
            label: "DeFi Position",
            value: "DeFi Position",
            content: <DeFiPosition />,
        },
        {
            label: "Transaction History",
            value: "Transaction History",
            content: <History />,
        }
    ]

    const [tab, setTab] = useState<typeof Tab>(tabs[0]);
    const [isRotating, setIsRotating] = useState(0);

    const tabWidth = 'auto';
    const onTab = (tab: typeof Tab) => {
        setTab(tab);
    }

    const tabsClassName = "pr-[10px]";
    const tabsHeaderClassName = "!justify-start border-b border-[#34304B]";
    const tabsHeaderItemClassName = "!px-[30px] py-[20px] text-[18px] font-[400] border-r border-[#34304B]";
    const tabsHeaderItemActiveClassName = "!text-[#BFFF60] font-[600] bg-[#151822] [text-shadow:0_0_10px_#BFFF6099]";
    const tabsBodyClassName = "overflow-hidden";

    return (
        <div className="mt-[28px] text-white">
            <CustomerBox>
                <NormalTabs
                    tabs={tabs}
                    tabWidth={tabWidth}
                    onTab={onTab}
                    currentTab={tab}
                    className={clsx("", tabsClassName)}
                    headerClassName={clsx("", tabsHeaderClassName)}
                    headerItemClassName={clsx("", tabsHeaderItemClassName)}
                    headerItemActiveClassName={clsx("", tabsHeaderItemActiveClassName)}
                    bodyClassName={clsx("overflow-hidden", tabsBodyClassName)}
                />
                <div
                    className="absolute top-0 right-0 cursor-pointer h-[68px] w-[70px] flex items-center justify-center border-l border-l-[#34304B]"
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
            </CustomerBox>
        </div>
    )
}