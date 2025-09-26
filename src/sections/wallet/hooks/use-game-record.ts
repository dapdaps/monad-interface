import useUser from "@/hooks/use-user";
import { get } from "@/utils/http";
import { useCallback, useEffect, useState } from "react";

const PAGE_SIZE = 10;
export default function useGameRecord() {
    const { userInfo } = useUser();
    const [gameRecord, setGameRecord] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [pageTotal, setPageTotal] = useState<number>(0);

    const fetchGameRecord = useCallback(async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);
        const res = await get("/game/records", {
            page: page,
            page_size: PAGE_SIZE,
        });
        setGameRecord(res.data.data);
        setPageTotal(res.data.total_page);
        setIsLoading(false);
    }, [page]); 

    useEffect(() => {
        if (!userInfo.address) {
            return;
        }
        fetchGameRecord();
    }, [page, userInfo]);

    return {
        gameRecord,
        isLoading,
        fetchGameRecord,
        page,
        pageTotal,
        PAGE_SIZE,
        setPage,
    }
}