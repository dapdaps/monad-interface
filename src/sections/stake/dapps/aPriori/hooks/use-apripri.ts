import { ethers } from 'ethers';
import ABI from '../config/abi.json';
import useAccount from '@/hooks/use-account';
import { useEffect } from 'react';
import Big from 'big.js';
import useAddAction from '@/hooks/use-add-action';

export const APRIORI_CONTRACT_ADDRESS = '0xb2f82D0f38dc453D596Ad40A37799446Cc89274A';

export default function useAPriori() {
    const { account, chainId, provider } = useAccount();
    const { addAction } = useAddAction("dapp");
    const getConvertToShares = async (amount: string) => {
        if (!account || !chainId || !provider) return '0';

        try {
            const amountInWei = ethers.utils.parseEther(amount);
            const contract = new ethers.Contract(APRIORI_CONTRACT_ADDRESS, ABI, provider);
            const shares = await contract.convertToShares(amountInWei);
            console.log('shares:', new Big(shares.toString()).div(10 ** 18).toString());
            return new Big(shares.toString()).div(10 ** 18).toString();
        } catch (error) {
            console.error('Error converting to shares:', error);
            return '0';
        }
    }

    const getConvertToAssets = async (amount: string) => {
        if (!account || !chainId || !provider) return '0';

        try {
            const amountInWei = ethers.utils.parseEther(amount);
            const contract = new ethers.Contract(APRIORI_CONTRACT_ADDRESS, ABI, provider);
            const assets = await contract.convertToAssets(amountInWei);
            console.log('assets:', new Big(assets.toString()).div(10 ** 18).toString());
            return new Big(assets.toString()).div(10 ** 18).toString();
        } catch (error) {
            console.error('Error converting to assets:', error);
            return '0';
        }
    }

    const getBalance = async () => {
        if (!account || !chainId || !provider) return 0;

        try {
            const contract = new ethers.Contract(APRIORI_CONTRACT_ADDRESS, ABI, provider);
            const balance = await contract.balanceOf(account);
            console.log('balance:', balance.toString());
            return new Big(balance.toString()).div(10 ** 18).toString();
        } catch (error) {
            console.error('Error getting balance:', error);
            return '0';
        }
    }

    const handleStake = async (amount: string) => {
        if (!account || !chainId || !provider) return 0;

        try {
            const amountInWei = ethers.utils.parseEther(amount);
            const contract = new ethers.Contract(APRIORI_CONTRACT_ADDRESS, ABI, provider.getSigner());
            const tx = await contract.deposit(amountInWei, account, { value: amountInWei });
            await tx.wait();
            console.log('tx:', tx);
            addAction({
                type: 'Staking',
                template: 'aPriori',
                action: 'stake',
                token: 'native',
                amount: amount,
                add: false,
                status: 1,
                transactionHash: tx.hash,
                tokens: ['native'],
            });
            return tx.hash;
        } catch (error) {
            console.error('Error staking:', error);
            return null;
        }
    }

    const handleWithdraw = async (amount: string) => {
        if (!account || !chainId || !provider) return 0;

        try {
            const amountInWei = ethers.utils.parseEther(amount);
            const contract = new ethers.Contract(APRIORI_CONTRACT_ADDRESS, ABI, provider.getSigner());
            const tx = await contract.requestRedeem(amountInWei, account, account);
            await tx.wait();

            addAction({
                type: 'Staking',
                template: 'aPriori',
                action: 'withdraw',
                token: APRIORI_CONTRACT_ADDRESS,
                amount: amount,
                add: false,
                status: 1,
                transactionHash: tx.hash,
                tokens: [APRIORI_CONTRACT_ADDRESS],
            });

            return tx.hash;
        } catch (error) {
            console.error('Error withdrawing:', error);
            return null;
        }
    }

    const getWithdrawalRequests = async () => {
        if (!account || !chainId || !provider) return 0;

        try {
            const response = await fetch(`https://stake-api.apr.io/withdrawal_requests?address=${account}`);
            const data = await response.json();
            // console.log('data:', data);
            return data;
        } catch (error) {
        }

        return null;
    }

    const handleClaim = async (requestId: number) => {
        if (!account || !chainId || !provider) return 0;

        try {
            const contract = new ethers.Contract(APRIORI_CONTRACT_ADDRESS, [
                {
                    "type": "function",
                    "name": "redeem",
                    "inputs": [
                        {
                            "name": "requestIDs",
                            "type": "uint256[]",
                            "internalType": "uint256[]"
                        },
                        {
                            "name": "receiver",
                            "type": "address",
                            "internalType": "address"
                        }
                    ],
                    "outputs": [],
                    "stateMutability": "nonpayable"
                },
            ], provider.getSigner());

            const tx = await contract.redeem([requestId], account);
            await tx.wait();
            console.log('tx:', tx);

            addAction({
                type: 'Staking',
                template: 'aPriori',
                action: 'claim',
                token: APRIORI_CONTRACT_ADDRESS,
                amount: '0',
                add: false,
                status: 1,
                transactionHash: tx.hash,
                tokens: [APRIORI_CONTRACT_ADDRESS],
            });

            return tx.hash;
        } catch (error) {
            console.error('Error claiming:', error);
            return null;
        }
    }

    const getTVL = async () => {
        if (!account || !chainId || !provider) return 0;

        try {
            const response = await fetch('https://stake-api.apr.io/info');
            const data = await response.json();
            // console.log('data:', data);
        } catch (error) {
            console.error('Error getting TVL:', error);
        }
    }



    return {
        getConvertToShares,
        getConvertToAssets,
        getBalance,
        handleStake,
        getWithdrawalRequests,
        handleWithdraw,
        handleClaim,
        getTVL
    }
}