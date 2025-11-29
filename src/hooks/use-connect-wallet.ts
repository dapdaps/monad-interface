import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { useEffect, useMemo, useState } from "react";
import { useDebounceFn } from "ahooks";
import { useUserStore } from "@/stores/user";
import { formatLongText } from "@/utils/utils";
import { usePathname } from "next/navigation";
import useTokenBalance from "./use-token-balance";
import { DEFAULT_CHAIN_ID } from "@/configs";

export function useConnectWallet() {
  const { disconnect } = useDisconnect();
  const { address, isConnected, chainId, chain, isConnecting } = useAccount();
  const { switchChain, isPending: switching } = useSwitchChain();
  const userInfo = useUserStore((store: any) => store.user);
  const setUserInfo = useUserStore((store: any) => store.set);
  const pathname = usePathname();

  const { tokenBalance: userNativeBalance, update: refetchUserNativeBalance } =
    useTokenBalance("native", 18, DEFAULT_CHAIN_ID);

  const [connecting, setConnecting] = useState<boolean>(isConnecting);

  const { run: closeConnecting, cancel: cancelCloseConnecting } = useDebounceFn(
    () => {
      setConnecting(false);
    },
    { wait: 10000 }
  );

  useEffect(() => {
    cancelCloseConnecting();
    if (!isConnecting) {
      setConnecting(false);
      return;
    }
    setConnecting(true);
    closeConnecting();
  }, [isConnecting]);

  const [name, avatar, balance] = useMemo(() => {
    const defaultAvatar =
      "conic-gradient(from 180deg at 50% 50%, #00D1FF 0deg, #FF008A 360deg)";
    let _balance = "0";

    if (!address) return ["", defaultAvatar, _balance];

    if (userNativeBalance) {
      _balance = userNativeBalance;
    }

    if (userInfo?.twitter) {
      return [
        formatLongText(userInfo?.twitter?.twitter_user_name, 5, 4),
        `url("${userInfo?.twitter?.twitter_avatar}")`,
        _balance
      ];
    }

    return [formatLongText(address, 5, 4), defaultAvatar, _balance];
  }, [userInfo, address, userNativeBalance]);

  useEffect(() => {
    if (address) {
      refetchUserNativeBalance();
    }
  }, [address, pathname]);

  const onDisconnect = () => {
    disconnect();
    setUserInfo({
      user: {},
      accessToken: {
        access_token: "",
        refresh_access_token: "",
        token_type: "bearer"
      }
    });
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (
        address &&
        userInfo &&
        userInfo.address &&
        address.toLowerCase() !== userInfo.address.toLowerCase()
      ) {
        console.log("address:", address, userInfo);
        onDisconnect();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [address, userInfo]);

  return {
    onDisconnect,
    onSwitchChain: switchChain,
    switching,
    chainId,
    chain,
    connecting,
    connected: isConnected,
    name,
    avatar,
    balance
  };
}
