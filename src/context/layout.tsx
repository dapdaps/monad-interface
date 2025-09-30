import { DEFAULT_CHAIN_ID } from "@/configs";
import useClickTracking from "@/hooks/use-click-tracking";
import useRem from "@/hooks/use-rem";
import useTokenBalance from "@/hooks/use-token-balance";
import useTokenPrice from "@/hooks/use-token-price";
import useUser from "@/hooks/use-user";
import { useUserStore } from "@/stores/user";
import { createContext, useContext, useEffect } from "react";
import { useAccount } from "wagmi";
import useWalletTokens from "@/hooks/use-wallet-tokens";

interface ILayoutContext {
  getNativeBalance: () => void;
  nativeBalance: string;
  nativeBalanceLoading: boolean;
}

const LayoutContext = createContext<Partial<ILayoutContext>>({});

const LayoutContextProvider = ({ children }: { children: any }) => {
  useRem();
  const { address } = useAccount();
  const { getAccessToken } = useUser();
  const { initializePrice } = useTokenPrice();
  const { handleReportNoCode } = useClickTracking();
  const setUserInfo = useUserStore((store: any) => store.set);
  useWalletTokens();

  useEffect(() => {
    handleReportNoCode();
    initializePrice();
  }, []);

  useEffect(() => {
    getAccessToken("mainnet layout");
  }, [address]);

  const {
    tokenBalance: nativeBalance,
    isLoading: nativeBalanceLoading,
    getTokenBalance: getNativeBalance,
  } = useTokenBalance("native", 18, DEFAULT_CHAIN_ID);

  useEffect(() => {
    console.log("%cNativeBalance: %o", "background:#3A6F43;color:#fff;", nativeBalance);
    setUserInfo({
      nativeBalance: nativeBalance,
    });
  }, [nativeBalance]);

  return (
    <LayoutContext.Provider
      value={{
        getNativeBalance,
        nativeBalance,
        nativeBalanceLoading,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;

export const useLayoutContext = () => {
  return useContext(LayoutContext);
};
