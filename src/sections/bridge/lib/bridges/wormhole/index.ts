// @ts-nocheck
import { Wormhole, canonicalAddress, routes, wormhole } from "@wormhole-foundation/sdk";
// @ts-nocheck
import evm from "@wormhole-foundation/sdk/evm";
import { ethers, Contract, Signer, providers, utils } from 'ethers'
import chainConfig from '../../util/chainConfig';
import Big from 'big.js'
import { getQuoteInfo, setQuote } from '../../util/routerController'
import { getIcon } from '../../util/index'
import { QuoteRequest, QuoteResponse, ExecuteRequest, StatusParams } from '../../type/index'
import { FeeType } from '../../type/index'
import { Chain, createWalletClient, custom } from 'viem';
import { mainnet, berachain, polygon, arbitrum, optimism, scroll, polygonZkEvm ,metis, bsc, manta, mode, base, mantle, avalanche, fantom, gnosis, linea, zksync, } from 'viem/chains';

const chains = [arbitrum, mainnet, optimism, polygon, scroll, metis,berachain, polygonZkEvm, manta, mode, bsc, base, mantle, avalanche, fantom, gnosis, linea, zksync]
export async function init(signer: Signer) {
    const chainId = await signer.getChainId()
    const client: any = createWalletClient({
        account: await signer.getAddress() as any,
        chain: chains.find((chain) => chain.id == chainId) as Chain,
        transport: custom((signer as any)?.provider?.provider),
    })

    

    
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

    const wh = await wormhole("Mainnet", [evm]);

    const resolver = wh.resolver([
        routes.TokenBridgeRoute, // manual token bridge
        routes.AutomaticTokenBridgeRoute, // automatic token bridge
        routes.CCTPRoute, // manual CCTP
        routes.AutomaticCCTPRoute, // automatic CCTP
        routes.AutomaticPorticoRoute, // Native eth transfers
      ]);

    const sendChain = wh.getChain("Ethereum");
    const destChain = wh.getChain("Arbitrum");

    const sendToken = Wormhole.tokenId(sendChain.chain, "native");

    const destTokens = await resolver.supportedDestinationTokens(sendToken, sendChain, destChain);

    console.log('destTokens', destTokens);

    // const routes = result.routes
    // if (routes && routes.length) {
    //     let max: any = null

    //     const route = routes[0]

    //     const uuid = setQuote({
    //         route: route,
    //         amount: quoteRequest.amount,
    //         isNative: false,
    //         bridgeType: 'Jumper',
    //     })

    //     max = {
    //         uuid,
    //         icon: 'https://s3.amazonaws.com/dapdap.prod/images/li.fi.png',
    //         bridgeName: 'Li.Fi',
    //         bridgeType: 'lifi',
    //         fee: computeFee(route),
    //         receiveAmount: new Big(route.toAmount).toString(),
    //         gas: route.gasCostUSD,
    //         duration: computeDuration(route),
    //         feeType: FeeType.usd,
    //         gasType: FeeType.usd,
    //         identification: quoteRequest.identification,
    //     }

    //     return max
    // }

    return null
}

export async function execute(request: ExecuteRequest, signer: Signer): Promise<string | null> {
    await init(signer)
    const route = getQuoteInfo(request.uuid).route

    let isResolved = false
    return await new Promise(async (resolve, reject) => {
        
    })



    return null
}

export async function getStatus(params: StatusParams) {
    const res: any = await fetch(`https://li.quest/v1/status?txHash=${params.hash}`).then(res => res.json())

    if (res.status === 'DONE') {
        return {
            status: 1
        }
    }
    
    return {
        status: 0
    }
}




