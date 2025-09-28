import useUser from "@/hooks/use-user";
import { get } from "@/utils/http";
import { useCallback, useEffect, useRef, useState } from "react";

const PAGE_SIZE = 12;
export default function useNft({ refresh }: { refresh: number }) {
    const { userInfo } = useUser(); 
    const [nfts, setNfts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const pagedNfts = useRef<any[]>([]);
    const [page, setPage] = useState(1);
    const [pageTotal, setPageTotal] = useState(1);
    const continuationRef = useRef<string | null>(null);
    const toalPageRef = useRef(1);

    const getNfts = useCallback(async (pageIndex: number = 1) => {
        if (isLoading) {
            return;
        }

        if (pageIndex < toalPageRef.current) {
            setNfts(pagedNfts.current[pageIndex - 1]);
            setPage(pageIndex);
            return;
        }

        setIsLoading(true);
        
        try {
            const res = await get('/user/nft', {
                limit: PAGE_SIZE,
                sort_by: 'acquiredAt',
                sort_direction: 'desc',
                continuation: continuationRef.current,
            });
            if (res.code === 200 && res.data.tokens) {
                setNfts(res.data.tokens);
                setPage(pageIndex);
                pagedNfts.current.push(res.data.tokens)
                if (res.data.continuation) {
                    continuationRef.current = res.data.continuation;
                    setPageTotal(pageIndex + 1);
                    toalPageRef.current = pageIndex + 1;
                } else {
                    setPageTotal(pageIndex);
                    toalPageRef.current = pageIndex;
                }
            } else {
                setNfts([]);
            }
        } catch (err) {
            setNfts([]);    
        } finally {
            setIsLoading(false);
        }
    }, [pageTotal, isLoading]);


    useEffect(() => {
        if (!userInfo.address) {
            return;
        }

        setPageTotal(1)
        continuationRef.current = null
        pagedNfts.current = []
        toalPageRef.current = 1

        getNfts(1);
    }, [userInfo, refresh]);

    return {
        nfts,
        isLoading,
        getNfts,
        page,
        pageTotal,
        PAGE_SIZE,
    }
}