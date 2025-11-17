import { useRequest } from "ahooks";
import { useUser } from "@/hooks/use-user";
import { get } from "@/utils/http";
import { useEffect } from "react";
import useCustomAccount from "@/hooks/use-account";

export const useUserRanking = () => {
    const { account } = useCustomAccount();

    const { runAsync: getUserRanking, data: userRanking } = useRequest(async () => {
        if (!account) {
            return {};
        }

        const res = await get('/rp/ranking/user', {
            address: account
        });


        if (res.code !== 200) {
            return {};
        }

        return res.data;
    }, {
        manual: true,
        refreshDeps: [account],
    });

    useEffect(() => {
        if (account) {
            getUserRanking();
        } else {

        }
    }, [account]);

    return {
        userRanking: account ? userRanking : {}
    }
}