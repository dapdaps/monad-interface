import { RPC_LIST } from "@/configs/rpc";
import { publicClient } from "../utils/client";
import { GAME_CONTRACT_ADDRESS } from "../utils/constants";
import { post } from "../utils/fetch";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useMemo, useRef } from "react";
import { useThrottleFn } from 'ahooks';

import {
    createWalletClient,
    custom,
    encodeFunctionData,
    formatEther,
    Hex,
    parseEther,
    parseGwei,
} from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { monadTestnet } from "viem/chains";
import { useRpcStore } from "@/stores/rpc";
import useToast from "@/hooks/use-toast";
import reportGameRecord from "../utils/report";
import { toast } from "react-toastify";
import { usePrivyAuth } from "@/hooks/use-privy-auth";
import { use2048Store } from "@/stores/use2048";


export function useTransactions() {
    // User and Wallet objects.
    const { user } = usePrivy();
    const { ready, wallets } = useWallets();
    const score = use2048Store((store: any) => store.score);
    const store2048 = use2048Store((store: any) => store);
    // Fetch user nonce on new login.
    const userNonce = useRef(0);
    const userBalance = useRef(BigInt(0));
    const userAddress = useRef("");
    const rpcStore = useRpcStore();
    const { address: privyUserAddress } = usePrivyAuth({ isBind: false });
    const rpc = useMemo(() => RPC_LIST[rpcStore.selected].url, [rpcStore.selected]);
    const { info, success, fail, dismiss } = useToast({ isGame: true });
    // Resets nonce and balance
    async function resetNonceAndBalance() {
        if (!user) {
            return;
        }

        const nonce = await publicClient.getTransactionCount({
            address: privyUserAddress as Hex,
        });
        const balance = await publicClient.getBalance({
            address: privyUserAddress as Hex,
        });

        console.log("Setting nonce: ", nonce);
        console.log("Setting balance: ", balance.toString());

        userNonce.current = nonce;
        userBalance.current = balance;
        userAddress.current = privyUserAddress;
    }

    useEffect(() => {
        if (privyUserAddress) {
            resetNonceAndBalance();
        }
    }, [user, privyUserAddress]);

    // Fetch provider on new login.
    const walletClient = useRef<any>(null);
    useEffect(() => {
        async function getWalletClient() {
            if (!ready || !wallets) return;

            const userWallet = wallets.find(
                (w) => w.walletClientType == "privy" && w.address.toLocaleLowerCase() === privyUserAddress.toLocaleLowerCase()
            );

            if (!userWallet) return;

            const ethereumProvider = await userWallet.getEthereumProvider();
            const provider = createWalletClient({
                chain: monadTestnet,
                transport: custom(ethereumProvider),
            });

            console.log("Setting provider: ", provider);
            walletClient.current = provider;
        }

        getWalletClient();
    }, [user, ready, wallets]);

    // Sends a transaction and wait for receipt.
    async function sendRawTransactionAndConfirm({
        successText,
        gas,
        data,
        nonce,
        maxFeePerGas = parseGwei("50"),
        maxPriorityFeePerGas = parseGwei("5"),
        extendData
    }: {
        successText?: string;
        gas: BigInt;
        data: Hex;
        nonce: number;
        maxFeePerGas?: BigInt;
        maxPriorityFeePerGas?: BigInt;
        extendData?: any;
    }): Promise<any> {
        let e: Error | null = null;

        try {
            // Sign and send transaction.
            const provider = walletClient.current;
            if (!provider) {
                throw Error("Wallet not found.");
            }
            const privyUserAddress = userAddress.current;
            if (!privyUserAddress) {
                throw Error("Privy user not found.");
            }

            const startTime = Date.now();
            // const signedTransaction = await provider.signTransaction({
            //     to: GAME_CONTRACT_ADDRESS,
            //     account: privyUserAddress,
            //     data,
            //     nonce,
            //     gas,
            //     maxFeePerGas,
            //     maxPriorityFeePerGas,
            // });

            const tx = await provider.sendTransaction({
                to: GAME_CONTRACT_ADDRESS,
                account: privyUserAddress,
                data,
                nonce,
                gas,
                maxFeePerGas,
                maxPriorityFeePerGas,
            })

            const time = Date.now() - startTime;


            // // Fire toast info with benchmark and transaction hash.
            // console.log(`Transaction sent in ${time} ms: ${response.result}`);
            if (window.location.pathname.includes('2048')) {
                info({
                    title: 'Sent transaction.',
                    text: `${successText} Time: ${time} ms`,
                    tx: tx,
                    chainId: monadTestnet.id,
                }, 'bottom-right')
            }

            if (extendData) {
                reportGameRecord(tx, extendData.score, privyUserAddress);
            }

            if (window.location.pathname.includes('2048')) {
                success({
                    title: 'Confirmed transaction.',
                    text: `${successText} Time: ${Date.now() - startTime} ms`,
                    tx: tx,
                    chainId: monadTestnet.id,
                }, 'bottom-right')
            }
        } catch (error) {
            e = error as Error;
            if (window.location.pathname.includes('2048')) {
                fail({
                    title: 'Failed to send transaction.',
                }, 'bottom-right')
            }
            if (e) {
                throw e;
            }
        }
    }

    // Returns a the latest stored baord of a game as an array.
    async function getLatestGameBoard(
        gameId: Hex
    ): Promise<
        readonly [
            readonly [
                number,
                number,
                number,
                number,
                number,
                number,
                number,
                number,
                number,
                number,
                number,
                number,
                number,
                number,
                number,
                number
            ],
            bigint
        ]
    > {

        const [latestBoard, nextMoveNumber] = await publicClient.readContract({
            address: GAME_CONTRACT_ADDRESS,
            abi: [
                {
                    type: "function",
                    name: "getBoard",
                    inputs: [
                        {
                            name: "gameId",
                            type: "bytes32",
                            internalType: "bytes32",
                        },
                    ],
                    outputs: [
                        {
                            name: "boardArr",
                            type: "uint8[16]",
                            internalType: "uint8[16]",
                        },
                        {
                            name: "nextMoveNumber",
                            type: "uint256",
                            internalType: "uint256",
                        },
                    ],
                    stateMutability: "view",
                },
            ],
            functionName: "getBoard",
            args: [gameId],
        });

        return [latestBoard, nextMoveNumber];
    }





    // Initializes a game. Calls `prepareGame` and `startGame`.
    async function initializeGameTransaction(
        gameId: Hex,
        boards: readonly [bigint, bigint, bigint, bigint],
        moves: readonly [number, number, number]
    ): Promise<void> {
        let balance = userBalance.current;
        if (parseFloat(formatEther(balance)) < 0.01) {
            balance = await publicClient.getBalance({
                address: userAddress.current as Hex,
            });
            if (parseFloat(formatEther(balance)) < 0.01) {
                throw Error("Signer has insufficient balance.");
            }
            userBalance.current = balance;
        }

        // Sign and send transaction: start game
        console.log("Starting game!");

        const nonce = userNonce.current;
        userNonce.current = nonce + 1;
        userBalance.current = balance - parseEther("0.0075");

        await sendRawTransactionAndConfirm({
            nonce: nonce,
            successText: "Started game!",
            gas: BigInt(150_000),
            data: encodeFunctionData({
                abi: [
                    {
                        type: "function",
                        name: "startGame",
                        inputs: [
                            {
                                name: "gameId",
                                type: "bytes32",
                                internalType: "bytes32",
                            },
                            {
                                name: "boards",
                                type: "uint128[4]",
                                internalType: "uint128[4]",
                            },
                            {
                                name: "moves",
                                type: "uint8[3]",
                                internalType: "uint8[3]",
                            },
                        ],
                        outputs: [],
                        stateMutability: "nonpayable",
                    },
                ],
                functionName: "startGame",
                args: [gameId, boards, moves],
            }),
        });
    }

    async function playNewMoveTransaction(
        gameId: Hex,
        board: bigint,
        move: number,
        moveCount: number,
        score: number
    ): Promise<void> {
        // Sign and send transaction: play move
        console.log(`Playing move ${moveCount}!`);

        console.log('playNewMoveTransaction', gameId, board, move, moveCount)

        let balance = userBalance.current;
        if (parseFloat(formatEther(balance)) < 0.01) {
            balance = await publicClient.getBalance({
                address: userAddress.current as Hex,
            });
            if (parseFloat(formatEther(balance)) < 0.01) {
                throw Error("Signer has insufficient balance.");
            }
            userBalance.current = balance;
        }

        const nonce = userNonce.current;
        userNonce.current = nonce + 1;
        userBalance.current = balance - parseEther("0.005");


        await sendRawTransactionAndConfirm({
            nonce,
            successText: `Played move ${moveCount}`,
            gas: BigInt(100_000),
            data: encodeFunctionData({
                abi: [
                    {
                        type: "function",
                        name: "play",
                        inputs: [
                            {
                                name: "gameId",
                                type: "bytes32",
                                internalType: "bytes32",
                            },
                            {
                                name: "move",
                                type: "uint8",
                                internalType: "uint8",
                            },
                            {
                                name: "resultBoard",
                                type: "uint128",
                                internalType: "uint128",
                            },
                        ],
                        outputs: [],
                        stateMutability: "nonpayable",
                    },
                ],
                functionName: "play",
                args: [gameId, move, board],
            }),
            extendData: {
                score
            }
        });
    }

    useEffect(() => {
        return () => {
            toast.dismiss()
            toast.clearWaitingQueue()
        }
    }, [])

    return {
        privyUserAddress,
        resetNonceAndBalance,
        initializeGameTransaction,
        playNewMoveTransaction,
        getLatestGameBoard,
    };
}
