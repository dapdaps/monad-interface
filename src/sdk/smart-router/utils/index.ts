import chains from "../config/chains";
import { providers } from "ethers";
import { DEFAULT_CHAIN_ID } from "@/configs"; 

const RPC_TIMEOUT = 10000;

let rpcUrlCache: Record<number, string[]> = {};

async function checkRpcAvailable(url: string): Promise<boolean> {
  try {
    const provider = new providers.JsonRpcProvider(url);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("timeout")), RPC_TIMEOUT);
    });
    
    await Promise.race([provider.getNetwork(), timeoutPromise]);
    return true;
  } catch (error) {
    return false;
  }
}

export async function initRpcCache(): Promise<void> {
  const chainId = DEFAULT_CHAIN_ID;
  const rpcUrls = chains[chainId]?.rpcUrls || [];
  if (rpcUrls.length === 0) return;
  
  const availabilityChecks = await Promise.all(
    rpcUrls.map(async (rpcUrl: string) => ({
      url: rpcUrl,
      available: await checkRpcAvailable(rpcUrl)
    }))
  );
  
  const availableRpcUrls = availabilityChecks
    .filter(check => check.available)
    .map(check => check.url);
  
  if (availableRpcUrls.length > 0) {
    rpcUrlCache[chainId] = availableRpcUrls;
  }
}

export function getRpcUrl(chainId: number): string {
  const cachedRpcUrls = rpcUrlCache[chainId];
  if (cachedRpcUrls && cachedRpcUrls.length > 0) {
    const randomIndex = Math.floor(Math.random() * cachedRpcUrls.length);
    return cachedRpcUrls[randomIndex];
  }
  
  const rpcUrls = chains[chainId]?.rpcUrls || [];
  return rpcUrls[0] || "";
}   

