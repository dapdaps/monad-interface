import { useCallback, useEffect, useRef, useState } from "react";
import WSClient from "../lib/ws";
import useUser from "@/hooks/use-user";
import { get } from "@/utils/http";
import { playSound5, playSound6 } from "../lib/sound";
import Big from "big.js";

const WS_URL = (process.env.NEXT_PUBLIC_WS_URL || "wss://mainnet-stream-monad.dapdap.net") + "/ws";

// export const PRICE_STEP = 0.2;
export default function usePriceAndBets({ userBet }: { userBet: any }) {
    const wsClientRef = useRef<WSClient | null>(null);
    const [list, setList] = useState<any[]>([]);
    const [betList, setBetList] = useState<any[]>([]);
    const [winObj, setWinObj] = useState<any>({});
    const [animationNumbers, setAnimationNumbers] = useState<Array<{ id: string; amount: number }>>([]);
    const [priceStep, setPriceStep] = useState(0);
    const { userInfo } = useUser();
    const betListRef = useRef<any[]>([]);
    const allTimePriceRef = useRef<any>({});
    const userBetRef = useRef<any>({});
    const winObjRef = useRef<any>({});
    const priceStepRef = useRef(0);

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
                    if (priceStepRef.current === 0) {
                        return;
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
                        const roundedPriceValue = Math.floor(data.price / priceStepRef.current) * priceStepRef.current;
                        const roundedPrice = roundedPriceValue % 1 === 0 
                            ? roundedPriceValue.toString() 
                            : roundedPriceValue.toFixed(1);

                        allTimePriceRef.current[prev5sTimestamp + '-' + roundedPrice] = true;

                        if (last50Items.length > 0) {
                            const lastItem = last50Items[last50Items.length - 1];
                            const lastPrev5sTimestamp = lastItem.time - (lastItem.time % 5000);
                            const lastRoundedPriceValue = Math.floor(lastItem.price / priceStepRef.current) * priceStepRef.current;
                            const lastRoundedPrice = lastRoundedPriceValue % 1 === 0 
                                ? lastRoundedPriceValue.toString() 
                                : lastRoundedPriceValue.toFixed(1);

                            if (prev5sTimestamp === lastPrev5sTimestamp) {
                                const _roundedPrice = Number(roundedPrice);
                                const _lastRoundedPrice = Number(lastRoundedPrice);
                                const priceDiff = Number((Math.round(Math.abs(_roundedPrice - _lastRoundedPrice) / priceStepRef.current) * priceStepRef.current).toFixed(1));
                                if (priceDiff > priceStepRef.current) {
                                    const minPrice = Math.min(_roundedPrice, _lastRoundedPrice);
                                    const maxPrice = Math.max(_roundedPrice, _lastRoundedPrice);
                                    const steps = Math.floor((maxPrice - minPrice) / priceStepRef.current);
                                    for (let i = 1; i <= steps; i++) {
                                        const currentPrice = minPrice + i * priceStepRef.current;
                                        const intermediateRoundedPrice = currentPrice % 1 === 0 
                                            ? currentPrice.toString() 
                                            : currentPrice.toFixed(1);
                                        
                                        allTimePriceRef.current[prev5sTimestamp + '-' + intermediateRoundedPrice] = true;
                                    }

                                }
                            }

                            if (roundedPrice === lastRoundedPrice) {
                                const timestampDiff = prev5sTimestamp - lastPrev5sTimestamp;
                                if (timestampDiff > 5000) {
                                    let currentTimestamp = lastPrev5sTimestamp + 5000;
                                    while (currentTimestamp < prev5sTimestamp) {
                                        allTimePriceRef.current[currentTimestamp + '-' + roundedPrice] = true;
                                        currentTimestamp += 5000;
                                    }
                                }
                            }

                            // if (prev5sTimestamp !== lastPrev5sTimestamp && roundedPrice !== lastRoundedPrice) {
                            //     const timestampDiff = prev5sTimestamp - lastPrev5sTimestamp;
                            //     const priceDiff = roundedPriceValue - lastRoundedPriceValue;
                                
                            //     const timeSteps = Math.abs(timestampDiff) / 5000;
                                
                            //     if (timeSteps > 1) {
                            //         const minPrice = Math.min(lastRoundedPriceValue, roundedPriceValue);
                            //         const maxPrice = Math.max(lastRoundedPriceValue, roundedPriceValue);
                                    
                            //         for (let i = 1; i < timeSteps; i++) {
                            //             const currentTimestamp = lastPrev5sTimestamp + (timestampDiff > 0 ? i * 5000 : -i * 5000);
                                        
                            //             const t = i / timeSteps;
                            //             const interpolatedPrice = lastRoundedPriceValue + priceDiff * t;
                                        
                            //             const priceAtTime = Math.floor(interpolatedPrice / PRICE_STEP) * PRICE_STEP;
                            //             const priceAtTimeNext = priceAtTime + PRICE_STEP;
                                        
                            //             let currentPrice = minPrice;
                            //             while (currentPrice <= maxPrice) {
                            //                 const formattedPrice = currentPrice % 1 === 0 
                            //                     ? currentPrice.toString() 
                            //                     : currentPrice.toFixed(1);
                            //                 allTimePriceRef.current[currentTimestamp + '-' + formattedPrice] = true;
                            //                 currentPrice += PRICE_STEP;
                            //             }
                            //         }
                            //     }
                            // }
                        }

                        // @ts-ignore
                        window.allTimePriceRef = allTimePriceRef.current

                        return [
                            ...last50Items,
                            {
                                price: data.price,
                                time: data.timestamp,
                            },
                        ]

                    });
                } else if (data.e === 'bet') {
                    
                    if (betListRef.current.length > 0 && data.data.length > 0) {
                        const lastBet = betListRef.current[betListRef.current.length - 1];
                       
                        if (Number(lastBet.end_time) < Number(data.data[0].start_time) - 5000) {
                            // getAllBet();
                        }
                    }

                    if (data.data.length > 0) {
                        const bets = data.data[0].bets;
                        if (bets && bets.length > 0) {
                            const { max_price, min_price } = bets[0];
                            const priceStep = new Big(max_price).minus(min_price).toNumber();
                            if (priceStep !== priceStepRef.current) {
                                console.log('priceStep changed:', priceStep, priceStepRef.current);
                                setBetList([]);
                                betListRef.current = [];
                                setWinObj({});
                                winObjRef.current = {};
                                priceStepRef.current = priceStep;
                                setPriceStep(priceStep);
                                setList([])
                                allTimePriceRef.current = {};
                                return
                            }
                        }

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
        const res = await get('/game/chartvoyager/latest?newQuery=1');
        if (res.code === 200) {
            if (res.data.length > 0) {
                const startTimeMap = new Map<string, any>();
                
                res.data.forEach((item: any) => {
                    const startTime = String(item.start_time);
                    
                    if (!startTimeMap.has(startTime) || 
                        Number(item.source_time || 0) > Number(startTimeMap.get(startTime)?.source_time || 0)) {
                        startTimeMap.set(startTime, item);
                    }
                });
                
                const filteredData: any[] = [];
                startTimeMap.forEach((item) => {
                    filteredData.push(item);
                });
                

                betListRef.current = filteredData;
                setBetList(filteredData);
            }
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
        priceStep,
    };
}
