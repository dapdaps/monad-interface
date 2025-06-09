import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useEffect, useMemo, useState } from "react";
import useUser from "./use-user";
import { toast } from "react-toastify";

export function usePrivyAuth({ isBind = false }: { isBind?: boolean }) {
    const { userInfo, getUserInfo, bindGameAddress } = useUser();
    const { user, createWallet, logout, ready, authenticated } = usePrivy();
    const { login } = useLogin();
    const [loginLoading, setLoginLoading] = useState(false);
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (user && !user.wallet) {
            createWallet();
        }
    }, [user]);

    const handleLogin = async () => {
        setLoginLoading(true);

        try {
            login();
            setLoginLoading(false);
        } catch (err) {
            console.log("Problem logging in: ", err);
            setLoginLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            setAddress("");
            return;
        }

        const [privyUser] = user.linkedAccounts.filter(
            (account) =>
                account.type === "wallet" &&
                account.walletClientType === "privy"
        );

        if (!privyUser || !(privyUser as any).address) {
            setAddress("");
            return;
        }

        setAddress((privyUser as any).address);
    }, [user]);

    useEffect(() => {
        (async () => {
            if (address && isBind) {
                if (!userInfo.game_address) {
                    const res = await bindGameAddress(address, '');
                    if (res === 10007) {
                        logout();
                    }
                    if (res === 10008) {
                        logout();
                    }
                } else {
                    if (userInfo.game_address.toLowerCase() !== address.toLowerCase()) {
                        toast.error('The EVM address is already bound. Please change the email and log in again.');
                        logout();
                    }
                }

            }
        })();
    }, [address, userInfo, isBind]);

    const isLogin = useMemo(() => {
        if (!ready) {
            return true;
        }

        return ready && authenticated;
    }, [ready, authenticated]);

    return {
        address,
        isLogin,
        loginLoading,
        handleLogin,
    };
}