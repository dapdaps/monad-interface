import { useCallback, useEffect, useRef, useState } from "react";
import WSClient from "../lib/ws";
import useUser from "@/hooks/use-user";
import { get } from "@/utils/http";
import { playSound5, playSound6 } from "../lib/sound";

const WS_URL = (process.env.NEXT_PUBLIC_WS_URL || "wss://mainnet-stream-monad.dapdap.net") + "/ws";

const start = Date.now();
export default function usePriceAndBets({ userBet }: { userBet: any }) {
    const wsClientRef = useRef<WSClient | null>(null);
    const [list, setList] = useState<any[]>([]);
    const [betList, setBetList] = useState<any[]>([]);
    const [winObj, setWinObj] = useState<any>({});
    const [animationNumbers, setAnimationNumbers] = useState<Array<{ id: string; amount: number }>>([]);
    const { userInfo } = useUser();
    const betListRef = useRef<any[]>([]);
    const allTimePriceRef = useRef<any>({});
    const userBetRef = useRef<any>({});
    const winObjRef = useRef<any>({});

    useEffect(() => {
        userBetRef.current = userBet;
    }, [userBet]);

    useEffect(() => {
        winObjRef.current = winObj;
    }, [winObj]);

    useEffect(() => {
        // if (!userInfo.address) {
        //     return;
        // }

        const wsClient = new WSClient({
            url: WS_URL,
            address: userInfo.address,
            onMessage: (event: MessageEvent) => {
                const data = JSON.parse(event.data);
                if (data.e === 'price') {
                    if (Date.now() - start > 1000 * 5) {
                        return
                    }

                    setList((prev) => {
                        if (prev.length === 0) {
                            return [
                                {
                                    price: data.price,
                                    time: data.timestamp,
                                },
                            ]
                        }

                        const lastItem = prev[prev.length - 1];
                        if (lastItem.time >= data.timestamp) {
                            return prev;
                        }

                        const last5s = lastItem.time - (lastItem.time % 5000);
                        const cur5s = data.timestamp - (data.timestamp % 5000);
                        if ((lastItem.time < last5s + 5000 && data.timestamp >= cur5s) && (last5s !== cur5s)) {
                            const userBetKeys = Object.keys(userBetRef.current || {});
                            const winObjKeys = Object.keys(winObjRef.current || {});
                            const hasBetOnLast5s = userBetKeys.some(key => key.startsWith(`${last5s}-`));
                            const betKey = winObjKeys.find(key => key.startsWith(`${last5s}-`));
                            if (hasBetOnLast5s && !betKey) {
                                playSound6(); // user placed a bet for this 5s but hasn't won yet
                            }
                        }

                        let last50Items = prev;
                        if (prev.length >= 1000) {
                            last50Items = prev.slice(prev.length - 999);
                        }

                        const prev5sTimestamp = data.timestamp - (data.timestamp % 5000);
                        const roundedPrice = Math.floor(data.price / 0.5) * 0.5;
                        allTimePriceRef.current[prev5sTimestamp + '-' + roundedPrice] = true;

                        return [
                            ...last50Items,
                            {
                                price: data.price,
                                time: data.timestamp,
                            },
                        ]

                    });
                } else if (data.e === 'bet') {

                    return
                    
                    if (betListRef.current.length > 0 && data.data.length > 0) {
                        const lastBet = betListRef.current[betListRef.current.length - 1];
                       
                        if (Number(lastBet.end_time) < Number(data.data[0].start_time) - 5000) {
                            // getAllBet();
                        }
                    }

                    if (data.data.length > 0) {
                        setBetList((prev) => {
                            const dataSourceTimeMap = new Map(
                                data.data.map((item: any) => [
                                    `${item.start_time}-${item.end_time}`,
                                    item.source_time
                                ])
                            );
                            
                            const filteredPrev = prev.filter((item) => {
                                const key = `${item.start_time}-${item.end_time}`;
                                const newSourceTime = dataSourceTimeMap.get(key);
                                
                                if (newSourceTime === undefined) {
                                    return true;
                                }
                                
                                if (Number(item.source_time || 0) > Number(newSourceTime || 0)) {
                                    dataSourceTimeMap.delete(key);
                                    return true;
                                }

                                return false;
                            });

                            const newBetList = data.data.filter((item: any) => {
                                const key = `${item.start_time}-${item.end_time}`;
                                const newSourceTime = dataSourceTimeMap.get(key);
                                return !!newSourceTime
                            });
                            
                            let updated = [...filteredPrev, ...newBetList];
                            if (updated.length > 30) {
                                updated = updated.slice(updated.length - 30);
                            }


                            betListRef.current = updated.sort((a, b) => Number(a.end_time) - Number(b.end_time));
                            return updated;
                        });
                    }

                } else if (data.e === 'win') {

                    return
                    setWinObj((prev: any) => {
                        return {
                            ...prev,
                            [data.start_time + '-' + data.min_price]: 1,
                        }
                    });

                    const winAmount = data.amount
                    if (winAmount > 0) {
                        playSound5(); // play sound when win
                        const animationId = `${Date.now()}-${Math.random()}`;
                        setAnimationNumbers((prev) => [...prev, { id: animationId, amount: winAmount }]);

                        setTimeout(() => {
                            setAnimationNumbers((prev) => prev.filter((item) => item.id !== animationId));
                        }, 3000);
                    }
                }

            },
        });

        wsClientRef.current = wsClient;

        return () => {
            if (wsClientRef.current) {
                wsClientRef.current.close();
                wsClientRef.current = null;
            }
        };
    }, [userInfo]);

    const getAllBet = useCallback(async () => {
        const res = await get('/game/euphoria/testBet?newQuery=1');
        const res2 = await get('/game/euphoria/latest?newQuery=1');

        console.log('betList res: ', res)
        console.log('betList res2: ', res2)

        if (res.code === 200) {
            betListRef.current = res.data || {};
            setBetList(res.data || {});
        }
    }, []);

    useEffect(() => {
        getAllBet()
    }, []);

    return {
        disconnect: () => {
            if (wsClientRef.current) {
                wsClientRef.current.close();
            }
        },
        list,
        betList,
        winObj,
        animationNumbers,
        allTimePrice: allTimePriceRef.current,
    };
}
