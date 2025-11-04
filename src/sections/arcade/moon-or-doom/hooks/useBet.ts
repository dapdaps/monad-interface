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

    const { success, fail } = useToast();
    const { userInfo } = useUser();

    useEffect(() => {
        gameBalanceRef.current = gameBalance;
    }, [gameBalance]);
    const handleBet = async ({
        betAmount,
        minPrice,
        multiplier,
        startTime
    }: {
        betAmount: string,
        minPrice: string,
        multiplier: string,
        startTime: string
    }) => {

        console.log('handleBet', gameBalanceRef.current, betAmount, minPrice, multiplier, startTime);

        if (Big(gameBalanceRef.current).lt(betAmount)) {
            setInsufficientBalance(true);
            return;
        }

        if (betLoading) {
            return;
        }

        try {
            setBetLoading(true)
            const res = await post('/game/euphoria/order', {
                "bet_amount": betAmount,
                "min_price": minPrice,
                "multiplier": multiplier,
                "start_time": startTime
            });

            if (res.code === 200) {
                success({ title: 'Bet successful' });
                setUserBetObj((prev: any) => {
                    return {
                        ...prev,
                        [startTime + '-' + minPrice]: {
                            betAmount,
                            minPrice,
                            multiplier,
                            startTime
                        }
                    }
                });
            } else {
                fail({ title: 'Bet failed' });
            }
        } catch (error) {
            fail({ title: 'Bet failed' });
        } finally {
            setBetLoading(false);
        }

    };

    const getAllBet = useCallback(async () => {
        const res = await get('/game/euphoria/latest');
        console.log('res:', res);
        if (res.code === 200) {
            
        }
    }, []);

    useEffect(() => {
        if (userInfo.address) {
            getAllBet();
        }
    }, [userInfo]);


    return {
        bet,
        setBet,
        handleBet,
        betLoading,
        userBet: userBetObj,
        getAllBet,
        insufficientBalance,
        setInsufficientBalance,
    };
}