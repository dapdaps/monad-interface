import Big from 'big.js';
import { ethers, Contract, Signer, providers } from 'ethers'

import chainConfig from '../../util/chainConfig';
import { erc20Abi } from 'viem'
import { getQuoteInfo, setQuote } from '../../util/routerController'
import { getIcon, getFullNum, checkTransitionOnlineStatus } from '../../util/index'
import { QuoteRequest, QuoteResponse, ExecuteRequest, FeeType, StatusParams } from '../../type/index'
import { contractAddresses } from './config';

// https://owlto.finance/doc/api/#/owlto_api/get_api_config_all_tokens

const { JsonRpcProvider } = providers

const base_url = 'https://owlto.finance/api';
const icon = getIcon('owlto')

export async function checkLpInfo(
    tokenSymbol: string,
    fromChainId: string,
    toChainId: string,
    account: string
) {
    const res = await fetch(
        `${base_url}/lp-info?token=${tokenSymbol}&from_chainid=${fromChainId}&to_chainid=${toChainId}&user=${account}`
    );

    const resJson = await res.json();

    if (resJson.code === 0 && resJson.msg) {
        return resJson.msg;
    }

    return null;
}

export async function getDynamicDtc(
    tokenSymbol: string,
    fromChainId: string,
    toChainId: string,
    amount: string
) {
    const res = await fetch(
        `${base_url}/dynamic-dtc?token=${tokenSymbol}&from=${fromChainId}&to=${toChainId}&amount=${amount}`,
    );
    const resJson = await res.json();

    if (resJson.code === 0 && resJson.dtc) {
        return resJson.dtc;
    } 

    return null;
}

export async function getOwltoRoute(
    fromChainId: any,
    toChainId: any,
    fromTokenSymbol: any,
    fromTokenDecimal: any,
    address: any,
    amount: any
) {
    return new Promise((resolve, reject) => {
        Promise.all([
            checkLpInfo(
                fromTokenSymbol,
                fromChainId,
                toChainId,
                address as string
            ),
            getDynamicDtc(
                fromTokenSymbol,
                fromChainId,
                toChainId,
                new Big(amount).div(10 ** fromTokenDecimal).toString()
            )
        ])
            .then(resolve)
            .catch((e) => {
                resolve(null);
            });
    });

    return;
}


export async function getSrcTx(chainId: string, txHash: string) {
    const res = await fetch(
        `${base_url}/get-transaction?chainid=${chainId}&tx_hash=${txHash}`
    );
    const resJson = await res.json();
    if (resJson.code === 0) {
        return resJson.msg.nonce;
    }

    return null;
}

export async function getVerifyx(nonce: string, user: string, chainid: string) {
    const res = await fetch(
        `${base_url}/verify?nonce=${nonce}&user=${user}&chainid=${chainid}`
    );
    const resJson = await res.json();
    if (resJson.code === 0) {
        return resJson.msg.is_verified;
    }

    return null;
}

export async function getStatus(params: StatusParams) {
    const isSuccessOnline = await checkTransitionOnlineStatus(params.hash, params.fromChainId as string, params.transitionTime)
    if (isSuccessOnline === false) {
        return {
            status: 2
        }
    }

    if (isSuccessOnline === true) {
        const nonce = await getSrcTx(
            params.fromChainId as string,
            params.hash as string,
        );
        const status = await getVerifyx(
            nonce,
            params.address as string,
            params.fromChainId as string,
        );

        if (status) {
            return {
                status: 1
            }
        }
    }

    return {
        status: 0
    }
}

export function getRealAmount(amount: any, networkCode: any) {
    const minusAmount = amount.minus(1000)
    const _amount: any = minusAmount.toString();

    const lastNum =
        _amount.slice(0, _amount.length - networkCode.length) + networkCode;

    return lastNum;
}

let allTokens: any[] = []
let allChains: any[] = []
async function getAllToken() {
    if (allTokens.length) {
        return allTokens
    }

    const res = await fetch(
        `${base_url}/config/all-tokens`
    );
    const resJson = await res.json();
    if (resJson.code === 0) {
        if (allTokens.length === 0) {
            allTokens = resJson.msg
        }
        return resJson.msg;
    }

    return [];
}

async function getAllChain() {
    if (allChains.length) {
        return allChains
    }

    const res = await fetch(
        `${base_url}/config/all-chains`
    );
    const resJson = await res.json();

    if (resJson.code === 0) {
        if (allChains.length === 0) {
            allChains = resJson.msg
        }

        return resJson.msg;
    }

    return [];
}

export async function execute(request: ExecuteRequest, signer: Signer): Promise<string | null> {
    const quoteInfo = getQuoteInfo(request.uuid)

    const realAmount = getRealAmount(quoteInfo.amount, quoteInfo.networkCode.toString())

    const account = await signer.getAddress()

    let transactionResponse
    if (quoteInfo.isNative) {
        transactionResponse = await signer.sendTransaction({
            from: account,
            to: quoteInfo.route.contract_address,
            value: realAmount,
        });
    } else {

        const transactionData = await getRouteTransactionData(quoteInfo.route, realAmount, signer)
        transactionResponse = await signer.sendTransaction({
            ...transactionData,
            value: '0x00',
        });
    }

    // const receipt = await transactionResponse.wait()
    // const txHash = receipt.transactionHash;
    return transactionResponse.hash ? transactionResponse.hash : null
}

export async function getQuote(quoteRequest: QuoteRequest, signer: Signer): Promise<QuoteResponse | null> {
    // const account = await signer.getAddress()
    const tokens = await getAllToken()
    const chains = await getAllChain()
    let fromToken: any = null
    let toToken: any = null
    let fromChain: any = null
    let toChain: any = null

    for (let i = 0; i < chains.length; i++) {
        if (chains[i].chainId.toString() === quoteRequest.fromChainId.toString()) {
            fromChain = chains[i]
        }

        if (chains[i].chainId.toString() === quoteRequest.toChainId.toString()) {
            toChain = chains[i]
        }
    }

    if (!fromChain || !toChain) {
        return null
    }

    for (let i = 0; i < tokens.length; i++) {
        const currentToken = tokens[i]
        if (quoteRequest.fromChainId.toString() === currentToken.chainId.toString()
            && quoteRequest.fromToken.address.toUpperCase() === currentToken.address.toUpperCase()) {
            fromToken = currentToken
        }

        if (quoteRequest.toChainId.toString() === currentToken.chainId.toString()
            && quoteRequest.toToken.address.toUpperCase() === currentToken.address.toUpperCase()) {
            toToken = currentToken
        }

        if (fromToken && toToken) {
            break
        }
    }

    if (!fromToken || !toToken) {
        return null
    }

    const res: any = await getOwltoRoute(
        quoteRequest.fromChainId,
        quoteRequest.toChainId,
        fromToken.symbol,
        fromToken.decimal,
        quoteRequest.fromAddress,
        quoteRequest.amount.toString()
    )

    const contract_address = contractAddresses[quoteRequest.fromChainId]?.ETH

    if (res[1] && contract_address) {
        // const { max, min, token_decimal, gas_token_name } = res[0]

        const _max = new Big(100 * 10 ** 18)
        const _min = new Big(1)
        const fee = new Big(res[1]).mul(10 ** fromToken.decimal)

        if (quoteRequest.amount.lt(_max) && quoteRequest.amount.gt(_min) && quoteRequest.amount.gt(fee)) {
            const isNative = quoteRequest.fromToken.symbol === chainConfig[Number(quoteRequest.fromChainId)].nativeCurrency.symbol

            const chainFrom = chainConfig[quoteRequest.fromChainId as any]
            const rpc = chainFrom.rpcUrls[0]
            const provider = new JsonRpcProvider(rpc);
            const newSigner = provider.getSigner(quoteRequest.fromAddress)

            const gas = await computeGas({
                contract_address
            }, quoteRequest.amount, quoteRequest.fromAddress, isNative, newSigner) 
            // const gas = currentChainId === Number(quoteRequest.fromChainId) ? await computeGas(res[0], quoteRequest.amount, signer) : '0'

            let networkCode = toChain.networkCode.toString()

            if (networkCode.length < 4) {
                networkCode = networkCode.padStart(4, '0')
            }

            const uuid = setQuote({
                route: { contract_address },
                amount: quoteRequest.amount.plus(fee),
                isNative,
                networkCode: networkCode,
                bridgeType: 'Owlto',
            })

            const receiveAmount = quoteRequest.amount.div(10 ** quoteRequest.fromToken.decimals).mul(10 ** quoteRequest.toToken.decimals).toString()

            return {
                uuid,
                icon,
                bridgeName: 'Owlto',
                bridgeType: 'Owlto',
                fee: res[1],
                receiveAmount,
                gas: gas,
                duration: 60 + 's',
                feeType: isNative ? FeeType.origin : FeeType.usd,
                gasType: FeeType.origin,
                identification: quoteRequest.identification,
            }
        }
    }

    return null
}

export async function computeGas(route: any, amount: Big, fromAddress: string, isNative: boolean, signer: any) {
    try {
        let transactionData: any = null
        const price = await signer.getGasPrice()
        if (isNative) {
            transactionData = {
                from: fromAddress,
                to: route.contract_address,
                value: '1',
            }
        } else {
            transactionData = await getRouteTransactionData(route, new Big(1), signer)
        }


        const gasLimit = await signer.estimateGas({
            ...transactionData,
            value: transactionData.value || '0x00',
            // gasPrice: price.toString()
        });

        return getFullNum((Number(gasLimit.toString()) * Number(price.toString())) / (10 ** 18))
    } catch (e) {
        console.log('computeGas error:', e)
    }

    return 0
}

export async function getAllTokens() {
    const res = await fetch(`${base_url}/config/all-tokens`).then(res => res.json())
    if (res.code === 0) {
        const { msg } = res
        const chainTokens: any = {}
        msg.forEach((item: any) => {
            chainTokens[item.chainId] = chainTokens[item.chainId] || []
            chainTokens[item.chainId].push({
                symbol: item.symbol,
                address: item.address,
                decimal: item.decimal,
                chainId: item.chainId,
            })
        })

        return chainTokens
    }

    return null
}

async function getRouteTransactionData(route: any, amount: Big, signer: Signer) {
    const routerContract = new Contract(
        route.from_token_address,
        erc20Abi,
        signer,
    )
    const transactionData = await routerContract.populateTransaction.transfer(route.maker_address, amount.toString())

    return transactionData
}



export default {};
