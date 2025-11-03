import { useEffect, useRef, useState } from "react";
import WSClient from "../lib/ws";

const WS_URL = "wss://dev-stream-monad.dapdap.net/ws";

export default function usePriceAndBets() {
    const wsClientRef = useRef<WSClient | null>(null);
    const [list, setList] = useState<any[]>([]);
    const [betList, setBetList] = useState<any[]>([]);

    useEffect(() => {
        const wsClient = new WSClient({
            url: WS_URL,
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

                        // console.log('data.timestamp', data.timestamp, Date.now(), data.timestamp - Date.now());

                        return [
                            ...prev,
                            {
                                price: data.price,
                                time: data.timestamp,
                            },
                        ]

                    });

                } else if (Array.isArray(data) && data.length > 0 && data[0].e === 'bet') {
                    setBetList((prev) => {
                        return [
                            ...prev,
                            data[0]
                        ]
                    })
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
    }, []);

    return {
        disconnect: () => {
            if (wsClientRef.current) {
                wsClientRef.current.close();
            }
        },
        list,
        betList,
    };
}
