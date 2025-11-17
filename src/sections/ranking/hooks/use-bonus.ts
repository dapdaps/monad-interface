import { get } from "@/utils/http";
import { useRequest } from "ahooks";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";

export const useBonus = () => {
    const { userInfo } = useUser();

    const { data: allBonus, loading: allBonusLoading, runAsync: getBonus } = useRequest(async () => {
        if (!userInfo?.address) {
            return {};
        }

        const res = await get('/rp/bonus', {
            address: userInfo.address,
        });

        if (res.code !== 200) {
            return {};
        }

        return res.data ?? {};
    }, {
        manual: true,
        refreshDeps: [userInfo.address],
    });

    useEffect(() => {
        if (userInfo.address) {
            getBonus();
        }
    }, [userInfo]);

    return { allBonus: userInfo?.address ? allBonus : {}, allBonusLoading };
}