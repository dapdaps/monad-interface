import { monadTestnet } from "viem/chains";
import { createPublicClient, http } from "viem";
import { RPC_LIST } from "@/configs/rpc";
import { ethers } from 'ethers';

// const environment = import.meta.env.VITE_APP_ENVIRONMENT;
// const rpc =
//     environment === "prod"
//         ? import.meta.env.VITE_MONAD_RPC_URL! ||
//           monadTestnet.rpcUrls.default.http[0]
//         : monadTestnet.rpcUrls.default.http[0];

const rpc = RPC_LIST.default.url;

export const publicClient = createPublicClient({
    chain: monadTestnet,
    transport: http(rpc),
});


/**
 * Function to poll and check Ethereum transaction status
 * @param maxRetries Maximum retry attempts (stops polling when reached)
 * @param pollInterval Polling interval (milliseconds, recommended ≥ 1000ms to avoid node pressure)
 * @param onCheck Optional callback: triggered after each check (parameters: receipt/null, current retry count, error)
 * @returns Transaction receipt (confirmed success/failure) or null (timeout unconfirmed)
 */
export async function pollTransactionStatus(
    txHash: string,
    maxRetries: number,
    pollInterval: number,
    onCheck?: (
        receipt: ethers.providers.TransactionReceipt | null,
        retries: number,
        error?: Error
    ) => void
): Promise<ethers.providers.TransactionReceipt | null> {
    let retries = 0;

    while (retries <= maxRetries) {
        try {
            const provider = new ethers.providers.JsonRpcProvider(rpc);
            const receipt = await provider.getTransactionReceipt(txHash);

            console.log('pollTransactionStatus receipt', receipt)

            // Case 1: Receipt exists (transaction has been mined)
            if (receipt) {
                // Distinguish between success (status=1) and failure (status=0)
                const status = receipt.status === 1 ? 'CONFIRMED' : 'FAILED';
                onCheck?.(receipt, retries, undefined);
                if (status === 'FAILED') {
                    console.log('pollTransactionStatus Failed to comfirm transaction.')
                    throw new Error('Transaction failed.')
                }
                return receipt; // Return receipt (regardless of success/failure)
            }

            // Case 2: Receipt doesn't exist (transaction not mined)
            onCheck?.(null, retries, undefined);

            // Check if maximum retry attempts reached
            if (retries === maxRetries) {
                onCheck?.(null, retries, new Error(`Transaction ${txHash} timeout unconfirmed`));
                console.log('pollTransactionStatus Failed to comfirm transaction.')
                throw new Error('Transaction failed.')
                return null;
            }

            // Wait for next polling cycle
            retries++;
            await new Promise(resolve => setTimeout(resolve, pollInterval));

        } catch (error: any) {
            // Handle RPC call exceptions (such as network errors)
            onCheck?.(null, retries, error instanceof Error ? error : new Error(String(error)));

            // Throw error when maximum retry attempts reached
            if (retries === maxRetries) {
                throw error;
            }

            if (error.message.includes('Transaction failed.')) {
                console.log('pollTransactionStatus Failed to comfirm transaction.')
                throw new Error('Failed to comfirm transaction.')
            }


            retries++;
            await new Promise(resolve => setTimeout(resolve, pollInterval));
        }
    }

    console.log('pollTransactionStatus Failed to comfirm transaction.')
    throw new Error('Failed to comfirm transaction.')

    // Theoretically should not reach here (loop conditions already covered)
    return null;
}
