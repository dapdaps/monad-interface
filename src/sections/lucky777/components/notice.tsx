import { addressFormated } from "@/utils/balance";
import { get } from "@/utils/http";
import { useInterval } from "ahooks";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import useIsMobile from "@/hooks/use-isMobile";
export default function Notice() {
    const [notice, setNotice] = useState<any>([]);
    const [index, setIndex] = useState(0);
    const isMobile = useIsMobile();

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

    // if (!item) {
    //     return null;
    // }

    return (
        <div className={`absolute  left-[50%] -translate-x-1/2 w-[446px] h-[74px] bg-[#1D1E22CC] rounded-[16px] overflow-hidden border-[1px] border-[#6750FF] shadow-[0_0_24px_4px_rgba(128,0,255,0.2)] ${isMobile ? 'scale-[120%] top-[-170px]' : 'top-[-90px]'}`}>
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={index}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.5 }}
                    className="absolute w-full left-0 top-0 h-[74px] flex justify-start pl-4"
                >
                    <div className="flex items-center space-x-2 py-2">
                        <div className="mx-1 flex-shrink-0">
                            <img src="/images/lucky777/reward.svg" alt="" className="w-[42px] h-[42px]" />
                        </div>
                        <div>
                            <div className="flex items-center space-x-3">
                                <span className="text-[#B6FF6C] font-HackerNoonV2 pt-1 font-bold text-2xl tracking-widest">ATTENTION!</span>
                            </div>
                            {
                                item && <div className="mt-1 flex justify-start items-center space-x-2 font-Pixelmix text-[14px] text-[#C7C7D9]">
                                    <span>[{dayjs(item.timestamp * 1000).format('HH:mm:ss')}]</span>
                                    <span className="text-[#C7C7D9]">[{item.name ? addressFormated(item.name) : addressFormated(item.address)}]</span>
                                    {
                                        item.draw_code === '666' && <TypingText text={`Win 1 chogstarrr WL`} speed={50} />
                                    }
                                    {
                                        item.draw_code === '777' && <TypingText text={`Win 1 GTD WL`} speed={50} />
                                    }
                                    {
                                        item.draw_code === '888' && <TypingText text={`Win 1 Monadoon`} speed={50} />
                                    }
                                    {
                                        item.draw_code === '999' && <TypingText text={`Win 1 SLMND WL`} speed={50} />
                                    }
                                    {
                                        item.draw_code === '101010' && <TypingText text={`Win 1 LaMouch`} speed={50} />
                                    }
                                    {
                                        item.draw_code === '111111' && <TypingText text={`Win 1 Overnads`} speed={50} />
                                    }
                                    {
                                        item.draw_code === '121212' && <TypingText text={`Win 1 Deadnads`} speed={50} />
                                    }
                                    {
                                        item.draw_code === '131313' && <TypingText text={`Win 1 Coronads`} speed={50} />
                                    }
                                    {
                                        item.draw_code === '141414' && <TypingText text={`Win 1 Monshape`} speed={50} />
                                    }
                                    {
                                        item.draw_code === '151515' && <TypingText text={`Win 1 Llamao`} speed={50} />
                                    }
                                    {
                                        item.draw_code === '161616' && <TypingText text={`Win 1 Skrumpeys`} speed={50} />
                                    }
                                    {
                                        item.draw_code !== '666' && item.draw_code !== '777' && item.draw_code !== '888' && item.draw_code !== '999' && item.draw_code !== '101010' && item.draw_code !== '111111' && item.draw_code !== '121212' && item.draw_code !== '131313' && item.draw_code !== '141414' && item.draw_code !== '151515' && item.draw_code !== '161616' && <TypingText text={`Win ${item.amount} MON`} speed={50} />
                                    }
                                    {/* {
                                        item.code !== '666' && (<a
                                            href={`https://testnet.monvision.io/tx/${item.tx_hash}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#8B8BFF] underline hover:text-[#B6FF6C] transition"
                                        >
                                            TX
                                        </a>)
                                    } */}
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
