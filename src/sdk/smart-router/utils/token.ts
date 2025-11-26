import weth from '../config/weth';
import tokenInfoAbi from '../config/abi/token-info';
import { Contract, providers } from 'ethers';
import { getRpcUrl } from '.';
import { DEFAULT_CHAIN_ID } from '@/configs';

const tokenInfoCache = new Map<string, any>();

export async function getTokenInfo(tokenAddresses: any) {
  const cachedResults: Map<string, any> = new Map();
  const uncachedAddresses: string[] = [];
  
  tokenAddresses.forEach((addr: string) => {
    const lowerAddr = addr.toLowerCase();
    
    if (tokenInfoCache.has(lowerAddr)) {
      cachedResults.set(addr, tokenInfoCache.get(lowerAddr));
    } else {
      uncachedAddresses.push(addr);
    }
  });
  
  let queryResults: any[] = [];
  if (uncachedAddresses.length > 0) {
    const provider = new providers.JsonRpcProvider(getRpcUrl(DEFAULT_CHAIN_ID));
    const tokenInfoContract = new Contract('0x48387FAEDcD42dbFB6fF39EB1D853FFD721ffa14', tokenInfoAbi, provider);
    queryResults = await tokenInfoContract.queryTokens(uncachedAddresses);
    
    uncachedAddresses.forEach((addr: string, index: number) => {
      const lowerAddr = addr.toLowerCase();
      if (queryResults[index]) {
        tokenInfoCache.set(lowerAddr, queryResults[index]);
      }
    });
  }
  
  const result: any = {};
  let queryIndex = 0;
  
  tokenAddresses.forEach((addr: string) => {
    if (cachedResults.has(addr)) {
      result[addr] = cachedResults.get(addr)[3];
    } else {
      result[addr] = queryResults[queryIndex][3];
      queryIndex++;
    }
  });
  
  return result;
} 

export function nativeToWNative(token: any) {
  if (token.isNative && token.chainId !== 1088) {
    return { ...token, address: weth[token.chainId] };
  }
  return token;
}
