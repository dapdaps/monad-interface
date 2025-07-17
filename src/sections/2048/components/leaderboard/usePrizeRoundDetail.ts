import { get } from "@/utils/http";
import { useEffect, useState } from "react";

export function usePrizeRoundDetail({ round }: { round: number }) {
    const [prizeRoundDetail, setPrizeRoundDetail] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const getPrizeRoundDetail = async () => {
        setLoading(true);
        try {
            const response = await get(`/game/2048/round/reward`, {
                round
            });
            if (response.code === 200) {
                setPrizeRoundDetail(response.data);
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getPrizeRoundDetail();
    }, [round]);

    return { prizeRoundDetail, getPrizeRoundDetail, loading };
}