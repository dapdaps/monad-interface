import { RPC_LIST } from "@/configs/rpc";
import { useRpcStore } from "@/stores/rpc";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { multicall } from "@/sdk/smart-router/utils/multicall";
import multicallAddresses from "@/sdk/smart-router/config/multicall";
import { monadTestnet } from "viem/chains";

const NFT_ADDRESSES = [
    process.env.NEXT_PUBLIC_CHART_NFT || '0x006300ab0e8969c88dcf2e7c070e6c29b6081c1f', // https://magiceden.io/collections/monad-testnet/0x006300ab0e8969c88dcf2e7c070e6c29b6081c1f
    '0xc5c9425d733b9f769593bd2814b6301916f91271', // https://magiceden.io/collections/monad-testnet/0xc5c9425d733b9f769593bd2814b6301916f91271
    '0x78ed9a576519024357ab06d9834266a04c9634b7', // https://magiceden.io/collections/monad-testnet/0x78ed9a576519024357ab06d9834266a04c9634b7
    '0x2ace467d5c55d75cf04ae7b9c7672bc499d8e246', // https://magiceden.us/collections/monad-testnet/0x2ace467d5c55d75cf04ae7b9c7672bc499d8e246
    '0x7260fe3d8f5b2accde605852423a902d7f5314ce', // https://magiceden.io/collections/monad-testnet/0x7260fe3d8f5b2accde605852423a902d7f5314ce
    '0x4fcf36ac3d46ef5c3f91b8e3714c9bfdb46d63a3', // https://magiceden.io/collections/monad-testnet/0x4fcf36ac3d46ef5c3f91b8e3714c9bfdb46d63a3
    '0xe8f0635591190fb626f9d13c49b60626561ed145', // https://magiceden.io/collections/monad-testnet/0xe8f0635591190fb626f9d13c49b60626561ed145
    '0x26c86f2835c114571df2b6ce9ba52296cc0fa6bb', // https://magiceden.io/collections/monad-testnet/0x26c86f2835c114571df2b6ce9ba52296cc0fa6bb
    '0x6ed438b2a8eff227e7e54b5324926941b140eea0', // https://magiceden.io/collections/monad-testnet/0x6ed438b2a8eff227e7e54b5324926941b140eea0
]

const NFT_METADATA = [
    {
        name: 'NADSA ADMISSION TICKET',
        tokenURI: 'https://gateway.pinata.cloud/ipfs/bafybeiaa7hlcd5qr47gljieuqtzfcrfhxlmlav2dl7dh6qjezyz45odou4/0.png',
        balance: 0
    },
    {
        name: 'Purple Frens',
        tokenURI: 'https://img.reservoir.tools/images/v2/monad-testnet/i9YO%2F4yHXUdJsWcTqhqvf6b0%2F9xrEoNQAVxX6v3MP7NAkwSLId7QPBB5F%2FdOhyaZoQPZMYvDC1NGGf32jEhlM7hTOt5zfyCyxFAnm5VKop0FYj0CrD2zJn%2FbBln2AIga',
        balance: 0
    },
    {
        name: 'TheDaks Testnet',
        tokenURI: 'https://img.reservoir.tools/images/v2/monad-testnet/i9YO%2F4yHXUdJsWcTqhqvf5%2FEEjhsBi2TXBlrzvV3uC41QPySPXqGEXirnaA47%2BHziZD5H2zdh9AquCJk%2FwPL%2BlKU6TtUnF7lwfMbPHMjPi3QdSJOZP2sla59D4GQ4O7BJePi5gIYEGPm%2FCP%2FW6VVWg%3D%3D',
        balance: 0
    },
    {
        name: 'Monadverse Genesis Hatch',
        tokenURI: 'https://img.reservoir.tools/images/v2/monad-testnet/rSNTYhb5erNxjAvRIO43VmyRWA65FLBByGN48YnLWEaK1qhgk0UdUhpIzDeYZajJDUHBbk7Vw%2BRf7ieKh8bG8cfRHt8dabqwxqUT7fGDRQ2jQ9xbclnJkgXu4f4ivW2Q.gif', 
        balance: 0
    },
    {
        name: 'Coronad GTD PASS',
        tokenURI: 'https://img.reservoir.tools/images/v2/monad-testnet/i9YO%2F4yHXUdJsWcTqhqvfy%2Fhb6jno%2BLy8eeCNfg%2B2y%2FXPXT8vPjPxzYvh4u4gmEr50jV6Y2%2FWz%2BM3r%2FMsJGW1jrTW8idrkGjLQNbc7y7kX%2Bv%2F38q9WQWsAzQGxrCCYVJ%2FO91DKH9bsIwUHi5leUW6A%3D%3D.gif',
        balance: 0
    },
    {
        name: 'Scroll of Coronation',
        tokenURI: 'https://img.reservoir.tools/images/v2/monad-testnet/gHTKSzFx0LtiQ%2F9Ps%2BvNeVgBFAztuwXodw2%2BCjKTPZz652KFwF9YgjS5bGJ8IJ144h5QFfNT8vhI5nQVhIezKEC7E6XoDwFfbKVClWbWRqAdk4A30zhPXowGIQhveLpIkVV39gA6OXxS2vltx2C8kSbD04HRw9J46BeYB%2FMxOUw%3D.png',
        balance: 0
    },
    {
        name: 'Skrumpets',
        tokenURI: 'https://img.reservoir.tools/images/v2/monad-testnet/xGIQsppdhx9jPELiWEASU%2FjUqyN30zbMlUWyRD8eC9mBC4Xx9S%2FMOnyJExVCFyjSd2mbq5cmkbR%2BjI1pJtmvMnm21z7MQpjYT8IxahQ%2BSQknrg%2F1OklbvJTs0Q4rc7gBCmt8I%2FdUU6K%2F%2FJErLfgzOw%3D%3D',
        balance: 0
    },
    {
        name: 'Lil Chogstars: Testnet Starlist',
        tokenURI: 'https://img.reservoir.tools/images/v2/monad-testnet/%2BF4uAprNqLw%2FUAbX2wIMCCDOrSMYnuquZ7uLfI8jfCPx91ji8y8t28ju7WegcOBEsQLRSAiSOMA7ZurgZAhJ3AA67Rq0%2BZO1NuXhfxuje7tsQOVTtxZ1gIq9RRIa64oWT8z0aA577xll1PUwCpHISw%3D%3D',
        balance: 0
    },
    {
        name: 'Blocknads',
        tokenURI: '/images/faucet/nft-blocknads.avif',
        balance: 0
    },
]

export default function useMultiNft() {
    const [multiNft, setMultiNft] = useState<any>([...NFT_METADATA]);
    const [multiNftLoading, setMultiNftLoading] = useState<boolean>(false);
    const [hasNft, setHasNft] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState(0);
    const { address, connector } = useAccount();

    const rpcStore = useRpcStore();
    const rpc = useMemo(() => RPC_LIST[rpcStore.selected], [rpcStore.selected]);

    const getMultiNft = useCallback(async () => {
        if (!address || multiNftLoading) return;

        setMultiNftLoading(true);
        try {
            const provider = new ethers.providers.JsonRpcProvider(rpc);

            const calls = NFT_ADDRESSES.map((nftAddress: any) => ({
                address: nftAddress,
                name: 'balanceOf',
                params: [address]
            }));

            const multicallResults = await multicall({
                abi: ['function balanceOf(address owner) view returns (uint256)'],
                calls,
                options: {
                    requireSuccess: false
                },
                multicallAddress: multicallAddresses[monadTestnet.id],
                provider
            });

            const _multiNft: any = [...NFT_METADATA];
            let hasNft = false;
            if (multicallResults && multicallResults.length > 0) {
                multicallResults.forEach((result: any, index: number) => {
                    if (result) {
                        _multiNft[index].balance = result[0].toNumber();
                        hasNft = true;
                        return
                    }
                    _multiNft[index].balance = 0;
                });

            }
            setHasNft(hasNft);
            setMultiNft(_multiNft);
        } catch (error) {
            console.error("Failed to get multi NFT:", error);
            setError("Failed to get multi NFT");
        }

        setMultiNftLoading(false);
    }, [address, rpc, refresh, multiNftLoading]);


    useEffect(() => {
        getMultiNft();
    }, [address]);

    return {
        hasNft,
        NFT_ADDRESSES,
        multiNft,
        multiNftLoading,
        getMultiNft,
        baseUri: 'https://magiceden.io/collections/monad-testnet/'
    }
}   