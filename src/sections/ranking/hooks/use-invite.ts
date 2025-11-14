import { useUser } from "@/hooks/use-user";
import { get } from "@/utils/http";
import { useRequest } from "ahooks";
import { useEffect, useState } from "react";

export const useInvite = () => {
    const { userInfo } = useUser();
    const [page, setPage] = useState(1);

    const { data: invite, runAsync: getInvite } = useRequest(async () => {
        const res = await get('/invite/records', {
            page: page,
            page_size: 10,
        });
        if (res.code !== 200) {
            return {};
        }
        return res.data ?? {};
    }, {
        manual: true,
        refreshDeps: [userInfo?.address, page],
    });

    useEffect(() => {
        if (userInfo?.address) {
            getInvite();
        }
    }, [userInfo]);

    return {
        invite,
        page,
        setPage,
    };
}