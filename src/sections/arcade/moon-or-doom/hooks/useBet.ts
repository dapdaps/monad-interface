import useToast from "@/hooks/use-toast";
import useUser from "@/hooks/use-user";
import { get, post } from "@/utils/http";
import Big from "big.js";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useBet({ gameBalance }: { gameBalance: number }) {
    const [bet, setBet] = useState<number>(0.1);
    const [betLoading, setBetLoading] = useState<boolean>(false);
    const [userBetObj, setUserBetObj] = useState<any>({});
    const [insufficientBalance, setInsufficientBalance] = useState<boolean>(false);
    const gameBalanceRef = useRef<number>(gameBalance);
    const userBetObjRef = useRef<any>({});
    const betRef = useRef<number>(bet);

    const { success, fail } = useToast();
    const { userInfo } = useUser();

    useEffect(() => {
        gameBalanceRef.current = gameBalance;
    }, [gameBalance]);

    useEffect(() => {
        betRef.current = bet;
    }, [bet]);
    
    const handleBet = useCallback(async ({
        minPrice,
        multiplier,
        startTime
    }: {
        minPrice: string,
        multiplier: string,
        startTime: string
    }) => {

        console.log('bet', bet);

        if (Big(gameBalanceRef.current).lt(bet)) {
            setInsufficientBalance(true);
            return;
        }

        if (betLoading) {
            return;
        }
        const key = startTime + '-' + minPrice;


        if (userBetObjRef.current[key]) {
            fail({ title: 'You have already placed a bet on this time' });
            return;
        }

        try {
            setBetLoading(true)
            const res = await post('/game/euphoria/order', {
                "bet_amount": betRef.current.toString(),
                "min_price": minPrice,
                "multiplier": multiplier,
                "start_time": startTime
            });

            if (res.code === 200 && res.data.success) {
                success({ title: 'Bet successful' });
                setUserBetObj((prev: any) => {
                    userBetObjRef.current = {
                        ...prev,
                        [key]: {
                            betAmount: betRef.current.toString(),
                            minPrice,
                            multiplier,
                            startTime
                        }
                    }
                    return userBetObjRef.current;
                });
            } else {
                fail({ title: 'Bet failed' });
            }
        } catch (error) {
            fail({ title: 'Bet failed' });
        } finally {
            setBetLoading(false);
        }
    }, [bet]);

    return {
        bet,
        setBet,
        handleBet,
        betLoading,
        userBet: userBetObj,
        insufficientBalance,
        setInsufficientBalance,
    };
}