import { useRequest } from "ahooks";
import { useUser } from "@/hooks/use-user";
import { get } from "@/utils/http";
import { useEffect } from "react";

export const useUserRanking = () => {
    const { userInfo } = useUser();

    const { runAsync: getUserRanking, data: userRanking } = useRequest(async () => {
        if (!userInfo?.address) {
            return {};
        }

        const res = await get('/rp/ranking/user', {
            address: userInfo.address
        });


        if (res.code !== 200) {
            return {};
        }

        return res.data;
    }, {
        manual: true,
        refreshDeps: [userInfo?.address],
    });

    useEffect(() => {
        if (userInfo?.address) {
            getUserRanking();
        } else {

        }
    }, [userInfo]);

    return {
        userRanking: userInfo?.address ? userRanking : {}
    }
}