
import { publicClient } from "../utils/client";
import { GAME_CONTRACT_ADDRESS } from "../utils/constants";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useMemo, useRef } from "react";

import {
    createWalletClient,
    custom,
    encodeFunctionData,
    formatEther,
    Hex,
    parseEther,
    parseGwei,
} from "viem";
import { waitForTransactionReceipt, getTransactionReceipt } from "viem/actions";
import { monadTestnet } from "viem/chains";
import useToast from "@/hooks/use-toast";
import reportGameRecord from "../utils/report";
import { toast } from "react-toastify";
import { usePrivyAuth } from "@/hooks/use-privy-auth";
import { use2048Store } from "@/stores/use2048";


class AdvancedPromiseQueue {
    queue: (() => Promise<any>)[];
    concurrency: number;
    activeCount: number;
    isProcessing: boolean;
    errorCallBack: (error: Error) => void;

    constructor(concurrency = 1, errorCallBack: (error: Error) => void) {
        this.queue = [];
        this.concurrency = concurrency;
        this.activeCount = 0;
        this.isProcessing = false;
        this.errorCallBack = errorCallBack || (() => { });
    }

    enqueue(fn: () => Promise<any>) {
        this.queue.push(fn);
        this.processQueue();
    }

    async processQueue() {
        if (this.isProcessing || this.activeCount >= this.concurrency) return;
        this.isProcessing = true;

        while (this.queue.length > 0 && this.activeCount < this.concurrency) {
            const currentPromise = this.queue.shift();
            if (!currentPromise) continue;
            this.activeCount++;
            try {
                await currentPromise();
            } catch (error) {
                console.error("Failed to send transaction:", error);
                this.queue = [];
                this.errorCallBack(error as Error);
                break;
            } finally {
                this.activeCount--;
            }
        }

        this.isProcessing = false;
        if (this.queue.length > 0 && this.activeCount < this.concurrency) {
            this.processQueue();
        }
    }

    clearQueue() {
        this.queue = [];
        this.activeCount = 0;
        this.isProcessing = false;
    }
}

export function useTransactions({ errorCallBack }: { errorCallBack: (error: Error) => void }) {
    // User and Wallet objects.
    const { user } = usePrivy();
    const { ready, wallets } = useWallets();
    // Fetch user nonce on new login.
    const userNonce = useRef(0);
    const userBalance = useRef(BigInt(0));
    const userAddress = useRef("");
    const { address: privyUserAddress } = usePrivyAuth({ isBind: false });
    const { info, success, fail, dismiss } = useToast({ isGame: true });
    const queue = useRef(new AdvancedPromiseQueue(1, (error: Error) => {
        resetNonceAndBalance()
        errorCallBack(error);
    }));
    const updateGameUser = use2048Store((store: any) => store.updateUser);
    const gameUser = use2048Store((store: any) => store.users[privyUserAddress || ''])
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

            // console.log('provider:', provider)

            // const tx = await provider.sendRawTransaction({ serializedTransaction: signedTransaction })

            if (window.location.pathname.includes('2048')) {
                info({
                    title: 'Sent transaction.',
                    text: `${successText}`,
                    chainId: monadTestnet.id,
                }, 'bottom-right')
            }

            const tx = await provider.sendTransaction({
                to: GAME_CONTRACT_ADDRESS,
                account: privyUserAddress,
                data,
                nonce,
                gas,
                maxFeePerGas,
                maxPriorityFeePerGas,
            })

            // const time = Date.now() - startTime;

            console.log('tx', tx)


            // // Fire toast info with benchmark and transaction hash.
            // console.log(`Transaction sent in ${time} ms: ${response.result}`);
            // const receipt = await waitForTransactionReceipt(provider.transport, {
            //     hash: tx,
            //     retryCount: 3,
            //     pollingInterval: 4000,
            // });

            // console.log('receipt', receipt)


            // let receipt = null;
            // try {
            //     receipt = await getTransactionReceipt(provider.transport, {
            //         hash: tx,
            //     });
            // } catch (error) {
            //     console.log('error', error)
            // }

            // console.log('receipt', receipt)

            let receipt = { status: 'success' }

            if (extendData) {
                reportGameRecord(tx, extendData.score, privyUserAddress);
                updateGameUser(privyUserAddress, extendData.score, gameUser.gameId);
            } else {
                receipt = await waitForTransactionReceipt(provider.transport, {
                    hash: tx,
                });
            }

            if (receipt.status === 'success') {
                if (window.location.pathname.includes('2048')) {
                    success({
                        title: 'Confirmed transaction.',
                        text: `${successText} Time: ${Date.now() - startTime} ms`,
                        tx: tx,
                        chainId: monadTestnet.id,
                    }, 'bottom-right')
                }
            } else {
                fail({
                    title: 'Failed to send transaction.',
                }, 'bottom-right')
                throw new Error('Failed to send transaction.')
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

        queue.current.enqueue(async function () {
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
        })
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

        queue.current.enqueue(async function () {
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
        })
    }

    useEffect(() => {
        return () => {
            toast.dismiss()
            toast.clearWaitingQueue()
        }
    }, [])

    return {
        userBalance,
        privyUserAddress,
        resetNonceAndBalance,
        initializeGameTransaction,
        playNewMoveTransaction,
        getLatestGameBoard,
        clearQueue: () => queue.current.clearQueue(),
    };
}
