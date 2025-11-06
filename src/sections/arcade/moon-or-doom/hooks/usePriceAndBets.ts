import { useCallback, useEffect, useRef, useState } from "react";
import WSClient from "../lib/ws";
import useUser from "@/hooks/use-user";
import { get } from "@/utils/http";

const WS_URL = "wss://dev-stream-monad.dapdap.net/ws";

export default function usePriceAndBets() {
    const wsClientRef = useRef<WSClient | null>(null);
    const [list, setList] = useState<any[]>([]);
    const [betList, setBetList] = useState<any[]>([]);
    const [winObj, setWinObj] = useState<any>({});
    const [animationNumbers, setAnimationNumbers] = useState<Array<{ id: string; amount: number }>>([]);
    const { userInfo } = useUser();
    const betListRef = useRef<any[]>([]);

    useEffect(() => {
        if (!userInfo.address) {
            return;
        }

        const wsClient = new WSClient({
            url: WS_URL,
            address: userInfo.address,
            onMessage: (event: MessageEvent) => {
                const data = JSON.parse(event.data);
                if (data.e === 'price') {
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

                        let last50Items = prev;
                        if (prev.length >= 500) {
                            last50Items = prev.slice(prev.length - 499);
                        }

                        return [
                            ...last50Items,
                            {
                                price: data.price,
                                time: data.timestamp,
                            },
                        ]

                    });
                } else if (Array.isArray(data) && data.length > 0 && data[0].e === 'bet') {

                    if (betListRef.current.length > 0) {
                        const lastBet = betListRef.current[betListRef.current.length - 1];
                        if (lastBet.end_time !== data[0].start_time) {
                            getAllBet();
                        }
                    }

                    setBetList((prev) => {
                        let updated = [...prev, data[0]];
                        if (updated.length > 50) {
                            updated = updated.slice(updated.length - 50);
                        }
                        betListRef.current = updated;
                        return updated;
                    });
                } else if (data.e === 'win') {
                    setWinObj((prev: any) => {
                        return {
                            ...prev,
                            [data.start_time + '-' + data.min_price]: 1,
                        }
                    });

                    const winAmount = data.amount
                    if (winAmount > 0) {
                        const animationId = `${Date.now()}-${Math.random()}`;
                        setAnimationNumbers((prev) => [...prev, { id: animationId, amount: winAmount }]);
                        
                        setTimeout(() => {
                            setAnimationNumbers((prev) => prev.filter((item) => item.id !== animationId));
                        }, 2000);
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
        const res = await get('/game/euphoria/latest');
        if (res.code === 200) {
            betListRef.current = res.data || [];
            setBetList(res.data || []);
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
    };
}
