// @ts-nocheck
import { Wormhole, canonicalAddress, routes, wormhole, evm as evmSdk, SignAndSendSigner } from "@wormhole-foundation/sdk";
// @ts-nocheck
import evm from "@wormhole-foundation/sdk/evm";
import { getEvmSignerForSigner, getEvmSigner } from "@wormhole-foundation/sdk-evm";
import { isSignAndSendSigner } from "@wormhole-foundation/sdk-definitions";
import { ethers, Contract, Signer, providers, utils } from 'ethers'
import chainConfig from '../../util/chainConfig';
import Big from 'big.js'
import { getQuoteInfo, setQuote } from '../../util/routerController'
import { getIcon, checkTransitionOnlineStatus } from '../../util/index'
import { QuoteRequest, QuoteResponse, ExecuteRequest, StatusParams } from '../../type/index'
import { FeeType } from '../../type/index'
import { Chain, createWalletClient, custom } from 'viem';
import { mainnet, berachain, polygon, arbitrum, optimism, scroll, polygonZkEvm, metis, bsc, manta, mode, base, mantle, avalanche, fantom, gnosis, linea, zksync, } from 'viem/chains';

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

let cachedWh: any = null;

export async function init(signer: Signer) {
    if (!signer.provider) {
        throw new Error('Signer must have a provider. Please use a browser wallet signer.');
    }

    if (!cachedWh) {
        cachedWh = await wormhole("Mainnet", [evm]);
    }

    return {
        wh: cachedWh,
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

    // const routesRequest: RoutesRequest = {
    //     fromChainId: numFromChainId,
    //     fromAmount: quoteRequest.amount.toString(),
    //     fromTokenAddress: quoteRequest.fromToken.address,
    //     fromAddress: quoteRequest.fromAddress,
    //     toChainId: numToChainId,
    //     toTokenAddress: quoteRequest.toToken.address,
    //     toAddress: quoteRequest.destAddress,
    //     options: {
    //         allowSwitchChain: false,
    //         allowDestinationCall: true,
    //         integrator: 'DapDap',
    //         order: 'CHEAPEST',
    //     }
    // }

    const wormholeSigner = await getWormholeSigner(signer);

    const { wh } = await init(signer);

    const resolver = wh.resolver([
        // routes.TokenBridgeRoute, // manual token bridge
        routes.AutomaticTokenBridgeRoute, // automatic token bridge
        // routes.CCTPRoute, // manual CCTP
        routes.AutomaticCCTPRoute, // automatic CCTP
        routes.AutomaticPorticoRoute, // Native eth transfers
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

    const sendToken = Wormhole.tokenId(sendChain.chain,  quoteRequest.fromToken.address === '0x0000000000000000000000000000000000000000' ? 'native' : quoteRequest.fromToken.address);

    console.log('sendToken', sendToken, sendChain, destChain);

    const destTokens = await resolver.supportedDestinationTokens(sendToken, sendChain, destChain);

    console.log('destTokens', destTokens);

    if (destTokens.length === 0) {
        return null;
    }

    const toAddress = quoteRequest.toToken.address === '0x0000000000000000000000000000000000000000' ? 'native' : quoteRequest.toToken.address.toLowerCase();
    let destinationToken = null;
    for (const token of destTokens) {
        const tokenAddress = token.address.address.toLowerCase();
        if (tokenAddress === toAddress) {
            destinationToken = token;
            break;
        }
    }
    
    if (!destinationToken) {
        return null;
    }
    

    const tr = await routes.RouteTransferRequest.create(wh, {
        source: sendToken,
        destination: destinationToken,
    });

    console.log('tr', tr)

    const foundRoutes = await resolver.findRoutes(tr);
    console.log("For the transfer parameters, we found these routes: ", foundRoutes);

    if (foundRoutes?.length === 0) {
        return null;
    }

    const amt = quoteRequest.amount.toFixed(0, 0);
    const transferParams = { amount: amt, options: { nativeGas: 0 } };

    let bestRoute = null;
    let bestQuote = null;
    for (const route of foundRoutes) {
        const validated = await route.validate(tr, transferParams);
        if (!validated.valid) {
            continue;
        }
        console.log("Validated parameters: ", validated.params);

        const quote = await route.quote(tr, validated.params);
        if (!quote.success) {
            continue;
        }
        console.log("Best route quote: ", quote);
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

    console.log('bestRoute', bestRoute);
    
    
    const receiverAddress = quoteRequest.destAddress
    const receiver = Wormhole.chainAddress(destChain.chain, receiverAddress);

    // console.log('bestRoute', bestRoute)

    // try {
    //     const receipt = await bestRoute.initiate(tr, wormholeSigner, quote, receiver);
    //     console.log("Initiated transfer with receipt: ", receipt);
    //     await routes.checkAndCompleteTransfer(bestRoute, receipt, wormholeSigner);
    // } catch (e) {
    //     console.log("Initiate transfer failed: ", e);
    // }

    if (bestRoute && bestQuote) {
        const uuid = setQuote({
            route: {
                tr,
                wormholeSigner,
                route: bestRoute,
                receiver,
                quote: bestQuote,
            },
            amount: quoteRequest.amount,
            isNative: false,
            bridgeType: 'Wormhole',
        })

        return {
            uuid,
            icon: 'https://wormhole.com/docs/assets/images/wormhole-button-logo.webp',
            bridgeName: 'Wormhole',
            bridgeType: 'Wormhole',
            fee: bestQuote.relayFee?.amount?.amount,
            receiveAmount: bestQuote.destinationToken?.amount?.amount,
            gas: '',
            duration: '10min',
            feeType: FeeType.usd,
            gasType: FeeType.usd,
            identification: quoteRequest.identification,
        }
    }
}

export async function execute(request: ExecuteRequest, signer: Signer): Promise<string | null> {
    const route = getQuoteInfo(request.uuid).route

    const { tr, wormholeSigner, route: bestRoute, receiver, quote } = route

    const receipt = await bestRoute.initiate(tr, wormholeSigner, quote, receiver);
    // console.log("Initiated transfer with receipt: ", receipt);
    // await routes.checkAndCompleteTransfer(bestRoute, receipt, wormholeSigner);

    return receipt.hash;
}

export async function getStatus(params: StatusParams) {
    // If source chain transaction is confirmed, check cross-chain status via Wormhole Scan API
    if (params.fromChainId && params.toChainId) {
        try {
            const fromChainId = Number(params.fromChainId);
            const toChainId = Number(params.toChainId);
            
            const wormholeFromChainId = getWormholeChainId(fromChainId);
            const wormholeToChainId = getWormholeChainId(toChainId);


            // Calculate time range for query (from transaction time to now, with some buffer)
            const fromTime = new Date(params.transitionTime - 24 * 60 * 60 * 1000); // 24 hours before
            const toTime = new Date(); // now
            
            const fromTimeStr = fromTime.toISOString();
            const toTimeStr = toTime.toISOString();

            // Build API URL - try with address first if available, then with transaction hash
            let apiUrl = new URL('https://api.wormholescan.io/api/v1/operations');
            apiUrl.searchParams.set('page', '0');
            apiUrl.searchParams.set('pageSize', '100');
            apiUrl.searchParams.set('sortOrder', 'DESC');
            apiUrl.searchParams.set('appId', 'PORTAL_TOKEN_BRIDGE');
            apiUrl.searchParams.set('sourceChain', wormholeFromChainId.toString());
            apiUrl.searchParams.set('targetChain', wormholeToChainId.toString());
            apiUrl.searchParams.set('from', fromTimeStr);
            apiUrl.searchParams.set('to', toTimeStr);

            const response = await fetch(apiUrl.toString());
            
            if (!response.ok) {
                console.error(`Wormhole Scan API error: ${response.status} ${response.statusText}`);
                return {
                    status: 0
                };
            }

            const data = await response.json();

            if (data && data.operations && Array.isArray(data.operations)) {
                // Find the operation matching our transaction hash
                const matchingOperation = data.operations.find((op: any) => {
                    const sourceTxHash = op.sourceChain?.transaction?.txHash;
                    if (!sourceTxHash) return false;
                    
                    // Normalize both hashes for comparison (handle case sensitivity)
                    const normalizedSourceHash = sourceTxHash.toLowerCase();
                    const normalizedParamsHash = params.hash?.toLowerCase();
                    
                    return normalizedSourceHash === normalizedParamsHash;
                });

                if (matchingOperation) {
                    // Check target chain status
                    const targetStatus = matchingOperation.targetChain?.status;
                    
                    if (targetStatus === 'completed') {
                        return {
                            status: 1 // Success
                        };
                    } else if (targetStatus && targetStatus !== 'pending') {
                        // If there's a status but it's not completed, it's in progress
                        return {
                            status: 0 // In progress
                        };
                    }
                } else {
                    // If no matching operation found but source tx is confirmed,
                    // the cross-chain operation might not have been indexed yet
                    return {
                        status: 0 // Pending
                    };
                }
            }

            // If no matching operation found, return pending
            return {
                status: 0
            };
        } catch (error) {
            console.error('Failed to fetch Wormhole status:', error);
            return {
                status: 0
            };
        }
    }

    return {
        status: 0
    };
}




