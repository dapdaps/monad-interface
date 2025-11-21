import { get } from "@/utils/http";
import { useRequest } from "ahooks";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";
import useCustomAccount from "@/hooks/use-account";

export const useBonus = (props?: { autoLoad?: boolean; }) => {
    const { autoLoad = true } = props ?? {};

    const { account } = useCustomAccount();

    const { data: allBonus, loading: allBonusLoading, runAsync: getBonus } = useRequest(async () => {
        if (!account) {
            return {};
        }

        const res = await get('/rp/bonus', {
            address: account,
        });

        if (res.code !== 200) {
            return {};
        }

        return res.data ?? {};
    }, {
        manual: true,
        refreshDeps: [account],
    });

    useEffect(() => {
        if (account && autoLoad) {
            getBonus();
        }
    }, [account, autoLoad]);

    return { allBonus: account ? allBonus : {}, allBonusLoading, getBonus };
}