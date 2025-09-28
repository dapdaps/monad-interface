import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"
import * as http from "@/utils/http";
import { useInterval } from "ahooks";
import { useCallback, useState } from "react";

export const useHistory = () => {
    const { address } = useAccount()
    const [data, setData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)

    useInterval(async () => {
        if (!address) return

        setIsLoading(true)
        const res = await http.get(`/transaction/list`, {
            action_type: 'Bridge',
            page: 1,
            page_size: 1000,
        })

        console.log(res?.data?.data)

        setData(res?.data?.data || [])
        setIsLoading(false)
    }, 5000, { immediate: true })

    const updateStatus = useCallback(async (item: any) => {
        await http.post('/transaction/bridge/status', {
            tx_id: item.tx_id,
            status: '4'
        });
    }, [address])

    return { data, isLoading, updateStatus }
}       