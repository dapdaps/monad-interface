import { RPC_LIST } from "@/configs/rpc";
import { get } from "@/utils/http";
import { multicallAddresses } from "@/utils/multicall";
import { multicall } from "@/utils/multicall";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { monadTestnet } from "viem/chains";
import { useRpcStore } from "@/stores/rpc";
import useUser from "@/hooks/use-user";
import { erc20Abi } from "viem";
import Big from "big.js";
import { usePriceStore } from "@/stores/usePriceStore";
import useTokenBalance from "@/hooks/use-token-balance";

export default function useTokens({ refresh }: { refresh: number }) {

    const [tokens, setTokens] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const rpcStore = useRpcStore();
    const { userInfo } = useUser()
    const rpc = useMemo(() => RPC_LIST[rpcStore.selected], [rpcStore.selected]);
    const { price } = usePriceStore();
    const [ sumValue, setSumValue ] = useState<string>('');
    const { tokenBalance, isLoading: tokenBalanceLoading } = useTokenBalance('native', 18, monadTestnet.id)


    const fetchTokens = useCallback(async () => {
        if (isLoading || !price || !userInfo?.address) return;

        setIsLoading(true);
        try {
            const res = await get('/token/all');
            if (res.code === 200 && res.data) {
                const _tokens = res.data.map((item: any) => {
                    item.balance = 0;
                    return {
                        address: item.address,
                        symbol: item.symbol,
                        decimals: item.decimals,
                        icon: item.icon,
                    };
                });

    
                const [balanceOfs, names, decimalses] = await Promise.all([
                    fetchTokenInfo(_tokens, 'balanceOf', [userInfo?.address]),
                    fetchTokenInfo(_tokens, 'name', []),
                    fetchTokenInfo(_tokens, 'decimals', [])
                ]);
    
                _tokens.forEach((token: any, index: number) => {
                    if (balanceOfs && names && decimalses && decimalses[index] && decimalses[index]?.length > 0 && balanceOfs[index]?.length > 0) {
                        token.balance = new Big(balanceOfs[index][0]).div(10 ** decimalses[index][0]).toFixed(4);
                        token.originalBalance = balanceOfs[index][0].toString();
                        token.name = names[index][0];
                        token.decimals = decimalses[index][0];
                        if (price[token.symbol]) {
                            token.value = new Big(token.balance).mul(price[token.symbol]).toFixed(2);
                        }
                    }

                    token.name = names[index]?.length > 0 ? names[index][0] : '';
                    token.price = price[token.symbol] ? new Big(price[token.symbol]).toFixed(2) : 0;
                });
    
                const valuedTokens = _tokens.filter((token: any) => {
                    return token.originalBalance && Number(token.originalBalance) > 0;
                });


                valuedTokens.unshift({
                    address: 'native',
                    symbol: 'MON',
                    decimals: 18,
                    name: 'MON',
                    icon: '/images/monad.svg',
                    balance: tokenBalance ? new Big(tokenBalance).toFixed(4) : 0,
                    price: price['MON'] ? new Big(price['MON']).toFixed(2) : 0,
                    value: price['MON'] && tokenBalance ? new Big(tokenBalance).mul(price['MON']).toFixed(2) : 0,
                });

                const sumValue = valuedTokens.reduce((acc: any, token: any) => {
                    return acc.add(new Big(token.value));
                }, new Big(0));
                setSumValue(sumValue.toFixed(2));

                setTokens(valuedTokens)
    
            } else {
                setTokens([]);
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setTokens([]);
            setIsLoading(false);
        }
        
    }, [isLoading, price, userInfo, tokenBalance]);

    const fetchTokenInfo = useCallback(async (_tokens: any[], method: string = 'balanceOf', params: any[] = []) => {
        if (!userInfo?.address || !rpc) return;

        const provider = new ethers.providers.JsonRpcProvider(rpc);

        const callerc20s = _tokens.map((token: any) => ({
            address: token.address,
            name: method,
            params
        }));

        const multicallErc20Results = await multicall({
            abi: erc20Abi as any,
            calls: callerc20s,
            options: {
                requireSuccess: false
            },
            multicallAddress: multicallAddresses[monadTestnet.id],
            provider
        });

        return multicallErc20Results;
    }, [rpc, userInfo]);


    useEffect(() => {
        if (!userInfo.address || !price || Object.keys(price).length === 0 || !tokenBalance) {
            return;
        }
        fetchTokens();
    }, [price, userInfo, tokenBalance, refresh]);


    return {
        tokens,
        isLoading,
        price,
        sumValue,
    }
}