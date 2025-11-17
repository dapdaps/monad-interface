import useUser from "@/hooks/use-user";
import { get } from "@/utils/http";
import { useRequest } from "ahooks";
import { useEffect } from "react";

export const useUserRP = () => {
    const { userInfo } = useUser();
    const { data: userRP, runAsync: getUserRP } = useRequest(async () => {
        if (!userInfo?.address) {
            return {};
        }

        const res = await get('/rp/user');
        if (res.code !== 200) {
            return {};
        }
        return res.data ?? {};
    }, {
        manual: true,
        refreshDeps: [userInfo?.address],
    });

    useEffect(() => {
        if (userInfo?.address) {
            getUserRP();
        }
    }, [userInfo]);

    return {
        userRP: userInfo?.address ? userRP : {},
        getUserRP,
    };
};