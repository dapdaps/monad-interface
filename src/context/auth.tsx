import React, { useContext, useEffect, useMemo, useRef } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import useUser from "@/hooks/use-user";
import { useConnectWallet } from "@/hooks/use-connect-wallet";
import { useUserStore } from "@/stores/user";

export const AuthContext = React.createContext<any | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { address } = useAccount();
  const { getAccessToken } = useUser();
  const {
    onDisconnect,
    onSwitchChain,
    switching,
    chainId,
    chain,
    connecting,
    connected: isConnected,
    name,
    avatar,
    balance
  } = useConnectWallet();
  const accessToken = useUserStore((store: any) => store.accessToken);
  const modal = useConnectModal();
  const logininning = useRef(false);

  const isLogin = useMemo(() => {
    return !!accessToken?.access_token && !!address;
  }, [accessToken, address]);

  const login = async () => {
    if (!address) {
      modal.openConnectModal?.();
      logininning.current = true;
      return;
    }
    if (!isLogin) await getAccessToken();
  };

  useEffect(() => {
    if (!address || !logininning.current) return;
    getAccessToken();
    logininning.current = false;
  }, [address]);

  return (
    <AuthContext.Provider
      value={{
        login,
        isLogin,
        onDisconnect,
        onSwitchChain,
        switching,
        chainId,
        chain,
        connecting,
        connected: isConnected,
        name,
        avatar,
        balance
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext) || {};
};
