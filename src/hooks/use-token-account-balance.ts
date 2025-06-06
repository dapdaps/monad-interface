import { Contract, providers, utils } from "ethers";
import { useEffect, useState } from "react";
import chains from "@/configs/chains";

export const TOKEN_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

export default function useTokenAccountBalance(
  address: string | "native",
  decimals: number,
  account: string,
  chainId: number = 10143
) {
  const [tokenBalance, setTokenBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fresh, setFresh] = useState(0);

  const getBalance = async () => {
    if (!account || !address) return;

    const rpcUrl = chains[chainId as number].rpcUrls.default.http[0];
    const rpcProvider = new providers.JsonRpcProvider(rpcUrl);

    const _provider = rpcProvider;

    setIsLoading(true);
    try {
      if (address === "native") {
        const rawBalance = await _provider.getBalance(account);
        setTokenBalance(utils.formatEther(rawBalance));
      } else {
        const TokenContract = new Contract(address, TOKEN_ABI, _provider);
        const rawBalance = await TokenContract.balanceOf(account);
        setTokenBalance(utils.formatUnits(rawBalance, decimals));
      }
    } catch (error) {
      setIsError(true);
      console.info("useTokenBalance_ERROR", error);
    } finally {
      setIsLoading(false);
    }
  };
  const update = () => {
    setFresh((n) => n + 1);
  };
  useEffect(() => {
    getBalance();
  }, [account, address, decimals, fresh, chainId]);

  return { tokenBalance, isError, isLoading, update };
}
