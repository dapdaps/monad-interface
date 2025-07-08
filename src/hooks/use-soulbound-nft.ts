import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { erc721Abi } from 'viem'
import { toast } from 'react-toastify';
import { useRpcStore } from '@/stores/rpc';
import { RPC_LIST } from "@/configs/rpc";
import { AUTH_TOKENS, get, post } from '@/utils/http';
import { useInterval } from 'ahooks';
import useAddAction from './use-add-action';
import { sleep } from '@/sections/bridge/lib/util';


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



export const useSoulboundNFT = ({ nftAddress, autoChecking = true }: { nftAddress: string, autoChecking?: boolean }): UseNFTReturn => {
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
                    "function totalSupply() view returns (uint256)",
                    "function tokenURI(uint256 tokenId) view returns (string)",
                    "function name() view returns (string)",
                    "function symbol() view returns (string)",
                ],
                provider
            );

            const [totalSupply, name] = await Promise.all([
                nftContract.totalSupply(),
                nftContract.name(),
            ]);

            setNFTMetadata({
                totalSupply: totalSupply.toString() || '0',
                // maxSupply: '3',
                maxSupply: '0',
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
                ],
                provider
            );

            const balance = await nftContract.balanceOf(address);


            if (balance.toString() === '0') {
                setHasNFT(false);
                setTokenIds([]);
            } else {
                const tokenId = await nftContract.tokenOfOwnerByIndex(address, 0);
                setHasNFT(true);
                setTokenIds([tokenId.toString()]);
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

            const nftContract = new ethers.Contract(
                nftAddress,
                [
                    "function safeMint(bytes signature)",
                ],
                signer
            );

            const res = await get('/nft/mintSign')

            if (res.code !== 200 || !res.data?.signature) {
                throw new Error('Failed to get signature');
            }

            const tx = await nftContract.safeMint(res.data?.signature as any);
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
                price: 0,
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


    useEffect(() => {
        getNFTMetadata()
    }, [refresh]);

    useEffect(() => {
        if (address) {
            checkNFT();
        }
    }, [address, refresh]);


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
