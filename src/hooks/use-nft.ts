import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { erc721Abi } from 'viem'
import { toast } from 'react-toastify';


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
    error: string | null;
    nftAddress: string;
    nftMetadata: {
        totalSupply: string;
        maxSupply: string;
    } | null;
    hasNFT: boolean;
    tokenIds: string[];
    address: string;
}

export const nftAddress = '0x2a50fa8f60f67fb30472c3fe05fb336a77a5e226';
const accessToken = 'd0d4c2a8-873a-4475-a830-ee19bb224521';

export const useNFT = (): UseNFTReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState(0);
    const { address, connector } = useAccount();
    const [nftMetadata, setNFTMetadata] = useState<{
        totalSupply: string;
        maxSupply: string;
    }>({
        totalSupply: '0',
        maxSupply: '0',
    });

    const [hasNFT, setHasNFT] = useState<boolean>(false);
    const [tokenIds, setTokenIds] = useState<string[]>([]);

    const getNFTMetadata = useCallback(async () => {
        try {
            const walletProvider: any = await connector?.getProvider();
            const provider = new ethers.providers.Web3Provider(walletProvider, "any");
            const signer = provider.getSigner(address);

            const nftContract = new ethers.Contract(
                nftAddress,
                [
                    "function maxSupply() view returns (uint256)",
                    "function totalSupply() view returns (uint256)",
                    "function tokenURI(uint256 tokenId) view returns (string)",
                    "function name() view returns (string)",
                    "function symbol() view returns (string)",
                ],
                signer
            );

            const [totalSupply, maxSupply] = await Promise.all([
                nftContract.totalSupply(),
                nftContract.maxSupply(),
            ]);

            setNFTMetadata({
                totalSupply: totalSupply.toString() || '0',
                maxSupply: maxSupply.toString() || '0',
            });
        } catch (error) {
            console.error("Failed to get NFT metadata:", error);
            setError("Failed to get NFT metadata");
            return null;
        }
    }, [address, connector]);

    const checkNFT = useCallback(async (): Promise<void> => {
        try {
            const walletProvider: any = await connector?.getProvider();
            const provider = new ethers.providers.Web3Provider(walletProvider, "any");
            const signer = provider.getSigner(address);

            const nftContract = new ethers.Contract(
                nftAddress,
                [
                    "function ownerOf(uint256 tokenId) view returns (address)",
                    "function balanceOf(address owner) view returns (uint256)",
                    "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)"
                ],
                signer
            );

            // Check if user owns any NFTs in this collection
            const balance = await nftContract.balanceOf(address);
            console.log('balance:', balance);
            if (balance.toString() === '0') {
                setHasNFT(false);
                setTokenIds([]);
            } else {
                setHasNFT(true);
                setTokenIds([]);
            }

            // Get all tokenIds owned by the user
            // const tokenIds: string[] = [];
            // for (let i = 0; i < balance.toNumber(); i++) {
            //     const tokenId = await nftContract.tokenOfOwnerByIndex(address, i);
            //     console.log('tokenId:', tokenId);
            //     tokenIds.push(tokenId.toString());
            // }

            // If specific tokenId provided, check ownership of that token
            // if (tokenIds.length > 0) {
            //     setHasNFT(true);
            //     setTokenIds(tokenIds);
            // }

        } catch (error) {
            console.error("Error checking NFT ownership:", error);
            setHasNFT(false);
            setTokenIds([]);
        } finally {
            setIsLoading(false);
        }
    }, [address, connector]);

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

            const response = await fetch('/api/magiceden', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    "chain": "monad-testnet",
                    "collectionId": nftAddress,
                    "wallet": {
                        "address": address,
                        "chain": "monad-testnet"
                    },
                    "nftAmount": 1,
                    "kind": "public",
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

            toast.success('Mint NFT success');
           
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred while minting NFT';
            setError(errorMessage);
            toast.error('Mint NFT error');
        } finally {
            setIsLoading(false);
        }
    }, [address, connector, hasNFT, isLoading, refresh]);

    useEffect(() => {
        if (address) {
            getNFTMetadata();
        }
    }, [address, getNFTMetadata]);

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
        error,
        nftMetadata,
        hasNFT,
        tokenIds
    };
};
