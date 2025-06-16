import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { erc721Abi } from 'viem'
import { toast } from 'react-toastify';
import { useRpcStore } from '@/stores/rpc';
import { RPC_LIST } from "@/configs/rpc";
import { post } from '@/utils/http';
import { useInterval } from 'ahooks';
import useAddAction from './use-add-action';


interface NFTMintResponse {
    success: boolean;
    data?: {
        mintAddress: string;
    };
    error?: string;
}

interface UseNFTReturn {
    mintNFT: () => Promise<void>;
    isLoading: boolean;
    checking: boolean;
    error: string | null;
    nftAddress: string;
    nftMetadata: {
        totalSupply: string;
        maxSupply: string;
    } | null;
    hasNFT: boolean;
    tokenIds: string[];
    address: string;
    checkAllowlistLoading: boolean;
}



export const useNFT = ({ nftAddress }: { nftAddress: string }): UseNFTReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [checking, setChecking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState(0);
    const { address, connector } = useAccount();
    const { addAction } = useAddAction('nft');
    const [nftMetadata, setNFTMetadata] = useState<{
        totalSupply: string;
        maxSupply: string;
        name: string;
    }>({
        totalSupply: '0',
        maxSupply: '0',
        name: '',
    });

    const [hasNFT, setHasNFT] = useState<boolean>(false);
    const [checkedHasNFT, setCheckedHasNFT] = useState<boolean>(false);
    const [tokenIds, setTokenIds] = useState<string[]>([]);
    const [checkAllowlistLoading, setCheckAllowlistLoading] = useState<boolean>(false);
    const rpcStore = useRpcStore();
    const rpc = useMemo(() => RPC_LIST[rpcStore.selected], [rpcStore.selected]);

    const getNFTMetadata = useCallback(async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(rpc);

            const nftContract = new ethers.Contract(
                nftAddress,
                [
                    "function maxSupply() view returns (uint256)",
                    "function totalSupply() view returns (uint256)",
                    "function tokenURI(uint256 tokenId) view returns (string)",
                    "function name() view returns (string)",
                    "function symbol() view returns (string)",
                ],
                provider
            );

            const [totalSupply, maxSupply, name] = await Promise.all([
                nftContract.totalSupply(),
                nftContract.maxSupply(),
                nftContract.name(),
            ]);


            setNFTMetadata({
                totalSupply: totalSupply.toString() || '0',
                // maxSupply: '3',
                maxSupply: maxSupply.toString() || '0',
                name: name || '',
            });
        } catch (error) {
            console.error("Failed to get NFT metadata:", error);
            setError("Failed to get NFT metadata");
            return null;
        }
    }, [connector, rpc, nftAddress, refresh]);

    const checkNFT = useCallback(async (): Promise<void> => {
        setChecking(true);
        try {
            const provider = new ethers.providers.JsonRpcProvider(rpc);

            const nftContract = new ethers.Contract(
                nftAddress,
                [
                    "function ownerOf(uint256 tokenId) view returns (address)",
                    "function balanceOf(address owner) view returns (uint256)",
                    "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
                    "function tokensOfOwner(address owner) view returns (uint256[])",
                ],
                provider
            );

            const balance = await nftContract.balanceOf(address);
            console.log('balance:', balance);

            const tokenIds = await nftContract.tokensOfOwner(address);
            const _tokenIds = tokenIds.map((tokenId: any) => Number(tokenId.toString())).sort((a: number, b: number) => a - b);

            if (balance.toString() === '0') {
                setHasNFT(false);
                setTokenIds([]);
            } else {
                setHasNFT(true);
                setTokenIds(_tokenIds || []);
            }


        } catch (error) {
            console.error("Error checking NFT ownership:", error);
            setHasNFT(false);
            setTokenIds([]);
        } finally {
            setIsLoading(false);
            setChecking(false);
            setCheckedHasNFT(true);
        }
    }, [address, connector, rpc, nftAddress, refresh]);

    const mintNFT = useCallback(async (): Promise<void> => {
        if (!address) {
            return
        }

        if (hasNFT) {
            return
        }

        if (isLoading) {
            return
        }

        setIsLoading(true);
        setError(null);

        try {
            const walletProvider: any = await connector?.getProvider();
            const provider = new ethers.providers.Web3Provider(walletProvider, "any");
            const signer = provider.getSigner(address);

            // const response = await fetch('/haha-delete/api/magiceden', {
            const response = await fetch('/api/magiceden', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    "chain": "monad-testnet",
                    "collectionId": nftAddress,
                    "wallet": {
                        "address": address,
                        "chain": "monad-testnet"
                    },
                    "nftAmount": 1,
                    "kind": "allowlist",
                    "protocol": "ERC721"
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to mint NFT');
            }

            const tx = await signer.sendTransaction(data.steps[0].params);
            await tx.wait();

            console.log(tx);

            setRefresh(refresh + 1);
            setTimeout(() => {
                checkNFT();
                getNFTMetadata();
            }, 2000);

            addAction?.({
                type: "NFT",
                template: "magiceden",
                action: "mint",
                sub_type: "mint",
                name: nftMetadata.name,
                price: 1,
                status: 1,
                transactionHash: tx.hash,
                add: true
            });

            toast.success('Mint NFT success');

        } catch (err) {
            console.log('mintNFT error: ', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred while minting NFT';
            setError(errorMessage);
            toast.error('Mint NFT error');
        } finally {
            setIsLoading(false);
        }
    }, [address, connector, hasNFT, isLoading, refresh, nftMetadata, addAction]);

    const checkAllowlist = useCallback(async (): Promise<boolean> => {
        if (!address) {
            return false
        }

        // const response = await fetch('/haha-delete/api/magiceden_check', {
        const response = await fetch('/api/magiceden_check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                "collectionId": nftAddress,
                "wallet": {
                    "chain": "monad-testnet",
                    "address": address
                }
            }),
        });
        const data = await response.json();

        const isAdd = data.stageIds.length > 0
        if (isAdd) {
            setCheckAllowlistLoading(false)
        }

        return isAdd

    }, [address, nftAddress]);

    useInterval(() => {
        if (checkAllowlistLoading) {
            checkAllowlist();
        }
    }, checkAllowlistLoading ? 30000 : undefined);

    useEffect(() => {
        getNFTMetadata()
    }, [refresh]);

    useEffect(() => {
        if (address) {
            checkNFT();
        }
    }, [address, refresh]);


    useEffect(() => {
        (async () => {
            if (checkedHasNFT && !hasNFT) {
                const res = await checkAllowlist();
                if (res === false) {
                    const res = await post('/nft/whitelist', {
                        nft_address: nftAddress
                    })
                    setCheckAllowlistLoading(true);
                }
            }
        })()
    }, [checkedHasNFT, hasNFT, address]);



    return {
        mintNFT,
        nftAddress,
        address: address || '',
        isLoading,
        checking,
        error,
        nftMetadata,
        hasNFT,
        tokenIds,
        checkAllowlistLoading,
    };
};
