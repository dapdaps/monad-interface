// @ts-nocheck
import { Wormhole, canonicalAddress, routes, wormhole, evm as evmSdk, SignAndSendSigner } from "@wormhole-foundation/sdk";
// @ts-nocheck
import evm from "@wormhole-foundation/sdk/evm";
import { getEvmSignerForSigner, getEvmSigner, _platform } from "@wormhole-foundation/sdk-evm";
import { isSignAndSendSigner } from "@wormhole-foundation/sdk-definitions";
import { ethers, Contract, Signer, providers, utils } from 'ethers'
import { cctpExecutorRoute, cctpV2StandardExecutorRoute } from '@wormhole-labs/cctp-executor-route'
import chainConfig from '../../util/chainConfig';
import Big from 'big.js'
import { getQuoteInfo, setQuote } from '../../util/routerController'
import { getIcon, checkTransitionOnlineStatus } from '../../util/index'
import { QuoteRequest, QuoteResponse, ExecuteRequest, StatusParams } from '../../type/index'
import { FeeType } from '../../type/index'
import { Chain, createWalletClient, custom } from 'viem';
import { mainnet, berachain, polygon, arbitrum, optimism, scroll, polygonZkEvm, metis, bsc, manta, mode, base, mantle, avalanche, fantom, gnosis, linea, zksync, } from 'viem/chains';
import dayjs from "dayjs";

const chains = [arbitrum, mainnet, optimism, polygon, scroll, metis, berachain, polygonZkEvm, manta, mode, bsc, base, mantle, avalanche, fantom, gnosis, linea, zksync]

const chainIdToWormholeChainName: { [key: number]: string } = {
    1: "Ethereum",
    42161: "Arbitrum",
    10: "Optimism",
    137: "Polygon",
    43114: "Avalanche",
    56: "Bsc",
    59144: "Linea",
    1088: "Metis",
    1101: "PolygonzkEvm",
    324: "Zksync",
    100: "Gnosis",
    169: "Manta",
    534352: "Scroll",
    34443: "Mode",
    8453: "Base",
    5000: "Mantle",
    250: "Fantom",
    80094: "Berachain",
    143: 'Monad'
};

// Wormhole chain ID mapping (used by Wormhole Scan API)
// Reference: https://docs.wormhole.com/wormhole/explore-wormhole/contracts
const chainIdToWormholeChainId: { [key: number]: number } = {
    1: 2,           // Ethereum
    42161: 23,      // Arbitrum
    10: 24,         // Optimism
    137: 5,         // Polygon
    43114: 6,       // Avalanche
    56: 4,          // BSC
    59144: 29,      // Linea
    1088: 37,       // Metis
    1101: 31,       // Polygon zkEVM
    324: 33,        // zkSync
    100: 25,        // Gnosis
    169: 36,        // Manta
    534352: 34,     // Scroll
    34443: 38,      // Mode
    8453: 30,       // Base
    5000: 16,       // Mantle
    250: 10,        // Fantom
    80094: 26,      // Berachain
    143: 39,        // Monad
};

function getWormholeChainName(chainId: number): string | null {
    return chainIdToWormholeChainName[chainId] || null;
}

function getWormholeChainId(chainId: number): number | null {
    return chainIdToWormholeChainId[chainId] || null;
}

let cachedWh: Wormhole | null = null;

export async function init(signer: Signer): Promise<{ wh: Wormhole }> {
    if (!signer.provider) {
        throw new Error('Signer must have a provider. Please use a browser wallet signer.');
    }

    if (!cachedWh) {
        cachedWh = await wormhole("Mainnet", [evm]);
    }

    return {
        wh: cachedWh as Wormhole,
    };
}

async function getWormholeSigner(signer: Signer) {
    const wormholeSigner = await getEvmSignerForSigner(signer);

    const signAndSendSigner: SignAndSendSigner = {
        chain: () => wormholeSigner.chain(),
        address: () => wormholeSigner.address(),
        signAndSend: async (txs) => {
            const txHashes: string[] = [];
            for (const tx of txs) {
                const txResponse = await signer.sendTransaction(tx.transaction);
                txHashes.push(txResponse.hash);
            }
            return txHashes;
        }
    };

    return signAndSendSigner
}
export async function getQuote(
    quoteRequest: QuoteRequest, signer: Signer
): Promise<QuoteResponse[] | null> {
    const numFromChainId = Number(quoteRequest.fromChainId)
    const numToChainId = Number(quoteRequest.toChainId)

    if (!chainConfig[numFromChainId] || !chainConfig[numToChainId]) {
        return null
    }

    const wormholeSigner = await getWormholeSigner(signer);

    const { wh } = await init(signer) as { wh: Wormhole };

    const referrerFeeDbps = 0n;
    const route = cctpV2StandardExecutorRoute({ referrerFeeDbps });

    const resolver = wh.resolver([
        // routes.TokenBridgeRoute, // manual token bridge
        // routes.AutomaticTokenBridgeRoute, // automatic token bridge
        // routes.CCTPRoute, // manual CCTP
        // routes.AutomaticCCTPRoute, // automatic CCTP
        // routes.AutomaticPorticoRoute, // Native eth transfers
        route,
    ]);

    const fromChainName = getWormholeChainName(numFromChainId);
    const toChainName = getWormholeChainName(numToChainId);

    // const fromChainName = 'Ethereum';
    // const toChainName = 'Arbitrum';

    if (!fromChainName || !toChainName) {
        console.error(`Unsupported chain: fromChainId=${numFromChainId}, toChainId=${numToChainId}`);
        return null;
    }

    const sendChain = wh.getChain(fromChainName);
    const destChain = wh.getChain(toChainName);

    const sendToken = Wormhole.tokenId(sendChain.chain, quoteRequest.fromToken.address === '0x0000000000000000000000000000000000000000' ? 'native' : quoteRequest.fromToken.address);

    const destinationToken = Wormhole.tokenId(destChain.chain, quoteRequest.toToken.address === '0x0000000000000000000000000000000000000000' ? 'native' : quoteRequest.toToken.address);

    // const destTokens = await resolver.supportedDestinationTokens(sendToken, sendChain, destChain);

    // console.log('destTokens', destTokens);

    // if (destTokens.length === 0) {
    //     return null;
    // }

    // const toAddress = quoteRequest.toToken.address === '0x0000000000000000000000000000000000000000' ? 'native' : quoteRequest.toToken.address.toLowerCase();
    // let destinationToken = null;
    // for (const token of destTokens) {
    //     const tokenAddress = token.address.address.toLowerCase();
    //     if (tokenAddress === toAddress) {
    //         destinationToken = token;
    //         break;
    //     }
    // }

    // if (!destinationToken) {
    //     return null;
    // }


    const tr = await routes.RouteTransferRequest.create(wh, {
        source: sendToken,
        destination: destinationToken,
    });

    const foundRoutes = await resolver.findRoutes(tr);

    if (foundRoutes?.length === 0) {
        return null;
    }

    const amt = quoteRequest.amount.div(10 ** quoteRequest.fromToken.decimals).toFixed(quoteRequest.fromToken.decimals);
    const transferParams = { amount: amt, options: { nativeGas: 0 } };

    let bestRoute = null;
    let bestQuote = null;
    for (const route of foundRoutes) {
        const validated = await route.validate(tr, transferParams);
        if (!validated.valid) {
            continue;
        }

        const quote = await route.quote(tr, validated.params);
        if (!quote.success) {
            continue;
        }
        if (bestRoute) {
            if (Number(quote.destinationToken.amount.amount) > Number(bestQuote.destinationToken.amount.amount)) {
                bestRoute = route;
                bestQuote = quote;
            }
        } else {
            bestRoute = route;
            bestQuote = quote;
        }
    }

    const receiverAddress = quoteRequest.destAddress
    const receiver = Wormhole.chainAddress(destChain.chain, receiverAddress);


    if (bestRoute && bestQuote) {
        const uuid = setQuote({
            route: {
                wh,
                tr,
                wormholeSigner,
                route: bestRoute,
                receiver,
                quote: bestQuote,
                sendChain,
            },
            amount: quoteRequest.amount,
            isNative: false,
            bridgeType: 'Wormhole',
        })

        return {
            uuid,
            icon: '/images/mainnet/wormhole.svg',
            bridgeName: 'Wormhole',
            bridgeType: 'Wormhole',
            fee: new Big(bestQuote.relayFee?.amount?.amount).div(10 ** 18).toString(),
            receiveAmount: new Big(bestQuote.destinationToken?.amount?.amount).toString(),
            gas: '',
            duration: '1',
            feeType: FeeType.origin,
            gasType: FeeType.usd,
            identification: quoteRequest.identification,
        }
    }
}

export async function execute(request: ExecuteRequest, signer: Signer): Promise<string | null> {
    const route = getQuoteInfo(request.uuid).route

    const { wh, tr, wormholeSigner, route: bestRoute, receiver, quote, sendChain } = route

    const sendChainExecutor = await sendChain.getProtocol("CCTPv2Executor");
    sendChainExecutor.provider = signer.provider as any;

    const receipt = await bestRoute.initiate(tr, wormholeSigner, quote, receiver);
    // console.log("Initiated transfer with receipt: ", receipt);
    // await routes.checkAndCompleteTransfer(bestRoute, receipt, wormholeSigner);

    return receipt.originTxs[receipt.originTxs.length - 1].txid;
}

const ERC20_TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
async function checkTargetChainTransactions(
    address: string,
    toChainId: string,
    toToken: string,
    amount: string
): Promise<boolean> {
    try {
        const chainId = Number(toChainId);
        const chain = chainConfig[chainId];

        if (!chain || !chain.rpcUrls || chain.rpcUrls.length === 0) {
            console.error(`Chain config not found for chainId: ${chainId}`);
            return false;
        }

        const provider = new providers.JsonRpcProvider(chain.rpcUrls[0]);

        const currentBlock = await provider.getBlockNumber();
       
        const fromBlock = Math.max(0, currentBlock - blocksPerDay);

        if (toToken.toLowerCase() === '0x0000000000000000000000000000000000000000') {
            return false;
        }
        
        const toAddressPadded = utils.hexZeroPad(address.toLowerCase(), 32);

        const filter = {
            address: toToken.toLowerCase(),
            topics: [
                ERC20_TRANSFER_TOPIC,
                null, 
                toAddressPadded, 
            ],
            fromBlock,
            toBlock: currentBlock,
        };

        let logs = [];
        try {
            logs = await provider.getLogs(filter);
        } catch (error: any) {
           
        }

        console.log('wormhole logs:', logs)

        if (!logs || logs.length === 0) {
            return false;
        }

        const iface = new utils.Interface([
            'event Transfer(address indexed from, address indexed to, uint256 value)'
        ]);

        const amountBigInt = BigInt(amount);
        const tolerance = amountBigInt / BigInt(1000);
        const minAmount = amountBigInt - tolerance;
        const maxAmount = amountBigInt + tolerance;

        for (const log of logs) {
            try {
                const parsedLog = iface.parseLog(log);
                const transferAmount = parsedLog.args.value;

                if (transferAmount >= minAmount && transferAmount <= maxAmount) {
                    return true;
                }
            } catch (error) {
                console.error('Error parsing log:', error);
                continue;
            }
        }

        return false;
    } catch (error) {
        console.error('Error checking target chain transactions:', error);
        return false;
    }
}

export async function getStatus(params: StatusParams) {
    try {
        

        

        const response = await fetch('https://executor.labsapis.com/v0/status/tx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                txHash: params.hash
            })
        });

        const data = await response.json();
        const statusInfo = data[0];

        if (statusInfo?.status === 'submitted') {
            return { status: 1 };
        }

        if (statusInfo?.status === 'aborted' && statusInfo?.failureCause === 'evm_cctp_nonce_already_used') {
            if (params.fromAddress && params.toChainId && params.token_out && params.fromAmount) {
                const found = await checkTargetChainTransactions(
                    params.fromAddress,
                    params.toChainId,
                    params.token_out[0].address,
                    params.toAmout,
                );

                if (found) {
                    return { status: 1 };
                }
            }

            if (dayjs(statusInfo.indexedAt).isBefore(dayjs().subtract(6, 'hour'))) {
                return { status: 1 };
            }

            return { status: 0 };
        }

        return { status: 0 };
    } catch (error) {
        return { status: 0 };
    }
}




