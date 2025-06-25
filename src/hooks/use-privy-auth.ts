import { useLogin, usePrivy, useConnectWallet, useWallets, useUser as usePrivyUser, useActiveWallet } from "@privy-io/react-auth";
import { useCallback, useEffect, useMemo, useState } from "react";
import useUser from "./use-user";
import { toast } from "react-toastify";
// import {UserPill} from '@privy-io/react-auth/ui';

export function usePrivyAuth({ isBind = false }: { isBind?: boolean }) {
    const { userInfo, getUserInfo, bindGameAddress } = useUser();
    const { user, createWallet, logout, ready, authenticated, connectWallet } = usePrivy();
    const { login } = useLogin();
    const { wallets } = useWallets();
    const [loginLoading, setLoginLoading] = useState(false);
    const [address, setAddress] = useState("");
    const { wallet, setActiveWallet } = useActiveWallet();


    useEffect(() => {
        try {
            if (user && !user.wallet) {
                const [privyUser] = user.linkedAccounts?.filter(
                    (account) =>
                        account.type === "wallet" &&
                        account.walletClientType === "privy"
                );
                if (!privyUser || !(privyUser as any).address) {
                    createWallet();
                }
            }
        } catch (e) {
            console.log(e)
        }
    }, [user]);

    const handleLogin = async () => {
        setLoginLoading(true);

        try {
            await logout();
            await login();
            setLoginLoading(false);
        } catch (err) {
            console.log("Problem logging in: ", err);
            setLoginLoading(false);
        }
    };

    const sendTransaction = useCallback(async ({ to, value }: { to: string, value: BigInt }) => {
        const wallet = wallets.find((wallet) => wallet.address === address);
        if (!wallet) {
            return;
        }

        const provider = await wallet.getEthereumProvider();

        const transactionRequest = {
            to,
            value
        };

        const transactionHash = await provider.request({
            method: 'eth_sendTransaction',
            params: [transactionRequest]
        });

        return transactionHash;
    }, [address])

    useEffect(() => {
        if (!user) {
            setAddress("");
            return;
        }

        let privyUser
        if (userInfo?.game_address) {
            [privyUser] = user.linkedAccounts.filter(
                (account) =>
                    account.type === "wallet" &&
                    account.walletClientType === "privy" &&
                    userInfo.game_address.toLowerCase() === account.address.toLowerCase()
            );
        } else {
            [privyUser] = user.linkedAccounts.filter(
                (account) =>
                    account.type === "wallet" &&
                    account.walletClientType === "privy"
            );
        }

        if (!privyUser || !(privyUser as any).address) {
            setAddress("");
            return;
        }

        setAddress((privyUser as any).address);

    }, [user, userInfo]);

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

        return authenticated && address;
    }, [ready, authenticated, address]);

    return {
        address,
        isLogin,
        loginLoading,
        handleLogin,
        sendTransaction,
    };
}