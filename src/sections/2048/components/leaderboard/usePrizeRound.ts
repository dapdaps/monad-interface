import { get } from "@/utils/http";
import { useEffect, useState } from "react";

export function usePrizeRound() {
    const [loading, setLoading] = useState(false);
    const [prizeRound, setPrizeRound] = useState<any[]>([]);

    const getPrizeRound = async () => {
        setLoading(true);
        try {
            const response = await get('/game/2048/round/history');
            if (response.code === 200) {
                setPrizeRound(response.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPrizeRound();
    }, []);

    return { prizeRound, loading };
}