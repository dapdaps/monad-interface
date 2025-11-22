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
import { getIcon } from '../../util/index'
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

function getWormholeChainName(chainId: number): string | null {
    return chainIdToWormholeChainName[chainId] || null;
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
    console.log("Initiated transfer with receipt: ", receipt);
    await routes.checkAndCompleteTransfer(bestRoute, receipt, wormholeSigner);

    return receipt.hash;
}

export async function getStatus(params: StatusParams) {
    // const res: any = await fetch(`https://li.quest/v1/status?txHash=${params.hash}`).then(res => res.json())

    // if (res.status === 'DONE') {
    //     return {
    //         status: 1
    //     }
    // }

    return {
        status: 0
    }
}




