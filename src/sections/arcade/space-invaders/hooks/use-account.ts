import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { usePrivyAuth } from "@/hooks/use-privy-auth";
import { DEFAULT_CHAIN_ID } from "@/configs";
import useUser from "@/hooks/use-user";
import { clientToProvider } from "@/hooks/use-account";
import { providers } from "ethers";
import { createWalletClient, custom } from "viem";
import { monadTestnet } from "viem/chains";

export function usePrivyAccount(): Partial<PrivyAccount> {
  const { user } = usePrivy();
  const { ready, wallets } = useWallets();
  const { address } = usePrivyAuth({ isBind: false });
  const { accessToken } = useUser();

  const [data, setData] = useState<Partial<PrivyAccount>>();

  const getPrivyAccount = async () => {
    if (!ready || !wallets) {
      setData(void 0);
      return;
    }
    const userWallet = wallets.find((w) => w.walletClientType == "privy" && w.address.toLocaleLowerCase() === address.toLocaleLowerCase());

    if (!userWallet) {
      setData(void 0);
      return;
    }

    const account = userWallet.address as `0x${string}`;
    const chainId = userWallet.chainId?.split(":")[1];
    const ethereumProvider = await userWallet.getEthereumProvider();
    const walletClient = createWalletClient({
      account: account,
      chain: monadTestnet,
      transport: custom(ethereumProvider),
    });
    setData({
      account: account || '',
      chainId: chainId || (DEFAULT_CHAIN_ID + ""),
      provider: clientToProvider(walletClient),
      accountWithAk: (account && accessToken) ? `${account}-${accessToken}` : void 0,
    });
  };

  useEffect(() => {
    getPrivyAccount();
  }, [user, ready, wallets, accessToken]);

  return {
    ...data,
  };
}

interface PrivyAccount {
  chainId: string;
  account: string;
  provider: any;
  accountWithAk: string;
}
