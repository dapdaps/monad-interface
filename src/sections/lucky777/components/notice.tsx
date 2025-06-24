import { addressFormated } from "@/utils/balance";
import { get } from "@/utils/http";
import { useInterval } from "ahooks";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
export default function Notice() {
    const [notice, setNotice] = useState<any>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!notice.length) {
                return;
            }
            setIndex(prev => (prev + 1) % notice.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [notice]);

    const fetchNotice = useCallback(async () => {
        const res = await get("/game/announcement");
        if (res.code !== 200 || !res.data) {
            return;
        }
        setNotice(res.data);
    }, []);

    useInterval(() => {
        fetchNotice();
    }, 10 * 60 * 1000, { immediate: true });


    const item = useMemo(() => {
        if (!notice.length) {
            return null;
        }
        return notice[index];
    }, [notice, index]);

    if (!item) {
        return null;
    }

    return (
        <div className="absolute top-[-90px] left-[50%] -translate-x-1/2 w-[446px] h-[74px] bg-[#1D1E22CC] rounded-[16px] overflow-hidden border-[1px] border-[#6750FF] px-8 shadow-[0_0_24px_4px_rgba(128,0,255,0.2)]">
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={index}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.5 }}
                    className="absolute w-full left-0 top-0 h-[74px] text-center flex items-center justify-center"
                >
                    <div className="flex items-center space-x-4 py-2">
                        <div className="mr-2 ml-1 flex-shrink-0">
                            <img src="/images/lucky777/reward.svg" alt="" className="w-[42px] h-[42px]" />
                        </div>
                        <div >
                            <div className="flex items-center space-x-3">
                                <span className="text-[#B6FF6C] font-HackerNoonV2 pt-1 font-bold text-2xl tracking-widest">ATTENTION!</span>
                            </div>
                            {
                                item && <div className="mt-1 flex justify-start items-center space-x-2 font-Pixelmix text-[14px] text-[#C7C7D9]">
                                <span>[{dayjs(item.timestamp * 1000).format('HH:mm:ss')}]</span>
                                <span className="text-[#C7C7D9]">[{item.name ? addressFormated(item.name) : addressFormated(item.address)}]</span>
                                <TypingText text={`Win ${item.amount} MON`} speed={50} />
                                <a
                                    href={`https://testnet.monvision.io/tx/${item.tx_hash}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[#8B8BFF] underline hover:text-[#B6FF6C] transition"
                                >
                                    TX
                                </a>
                            </div>
                            }

                            {
                                !item && <div className="h-[40px] w-[360px]"></div>
                            }
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}


const TypingText = ({ text, speed = 50 }: any) => {
    const [displayed, setDisplayed] = useState('');

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            current++;
            setDisplayed(text.slice(0, current));
            if (current >= text.length) {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return <span className="text-[#C7C7D9] inline-block w-[110px] whitespace-nowrap  text-left">{displayed}</span>;
};
