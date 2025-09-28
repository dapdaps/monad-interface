import useUser from "@/hooks/use-user";
import { get } from "@/utils/http";
import { useCallback, useEffect, useState } from "react";

const PAGE_SIZE = 10;
export default function useTransaction({ type, refresh }: { type?: string, refresh: number }) {
    const { userInfo } = useUser();
    const [transaction, setTransaction] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [pageTotal, setPageTotal] = useState<number>(0);

    const fetchTransaction = useCallback(async () => {
        if (isLoading) {
            return;
        }

        try {
            setIsLoading(true);
            const res = await get("/transaction/list", {
                page: page,
                page_size: PAGE_SIZE,
                action_type: type || undefined,
            });
            const _transaction = res.data.data.map((item: any) => {
                // item.action_type = item.action_type.toLowerCase();
                try {
                    const tokens = JSON.parse(item.action_tokens);
                    item.assets = tokens;
                } catch (error) {
                }

                return item;
            });

            setTransaction(_transaction);
            setPageTotal(res.data.total_page);
            setIsLoading(false);
        } catch (error) {
            setTransaction([]);
            setPageTotal(0);
            setIsLoading(false);
        }

    }, [page, isLoading, type]);

    useEffect(() => {
        if (!userInfo.address) {
            return;
        }
        fetchTransaction();
    }, [page, userInfo, refresh]);

    return {
        transaction,
        isLoading,
        page,
        pageTotal,
        PAGE_SIZE,
        setPage,
    }
}