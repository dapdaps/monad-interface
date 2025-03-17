import { ethers, Contract, Signer, providers } from 'ethers'
import Big from 'big.js'

import { erc20Abi } from 'viem'
import { approve } from '../../util/approve'
import { getQuoteInfo, setQuote } from '../../util/routerController'
import { getIcon, getChainSigner, getFullNum, checkTransitionOnlineStatus } from '../../util/index'
import {FeeType, StatusParams} from '../../type/index'
import chainConfig from '../../util/chainConfig'

import type { QuoteRequest, QuoteResponse, ExecuteRequest } from '../../type/index'

const icon = getIcon('orbiter')
// const base_url = 'https://api.orbiter.finance/sdk';
const base_url = 'https://testnet-api.orbiter.finance/sdk';

let crossChainRouter: any[] = []
let tokens: any = null

const { JsonRpcProvider } = providers

export async function getCrossChainRouter(): Promise<any[]> {
  if (crossChainRouter.length !== 0) {
    return crossChainRouter
  }

  try {
    const res = await fetch(`${base_url}/routers/cross-chain`);
    const resJson = await res.json();
    if (resJson.status === 'success') {
      if (crossChainRouter.length === 0) {
        crossChainRouter = resJson.result
      }
      return resJson.result;
    }
  } catch (e) { }

  return [];
}

const availableTokens = ['ETH', 'USDC', 'USDT', 'BTC']

export async function getAllTokens() {
  if (tokens) {
    return tokens
  }
  const res = await fetch(`${base_url}/tokens`);
  const resJson = await res.json();
  if (!tokens) {
    const newTokens: any = {}
    Object.keys(resJson.result).forEach((key) => {
      newTokens[key] = []
      const originTokens = resJson.result[key]
      originTokens.forEach((token: any) => {
        if (availableTokens.indexOf(token.symbol.toUpperCase()) > -1) {
          newTokens[key].push(token)
        }
      })
    })

    tokens = newTokens
  }
  return tokens
}

const lineReg = /(.*)\/(.*)-(.*)\/(.*)/

export async function getQuote(request: QuoteRequest, signer: Signer): Promise<QuoteResponse | null> {
  const _crossChainRouter = await getCrossChainRouter()
  const _tokens = await getAllTokens()

  console.log('request: ', _crossChainRouter, _tokens)

  request.toToken.symbol = 'ETH'
  
  for (let i = 0; i < _crossChainRouter.length; i++) {
    const currentRoute = _crossChainRouter[i]

    const line = currentRoute.line
    const chainTokenAry = line.match(lineReg)
    const toTokenSymbol = chainTokenAry.length ? chainTokenAry[4] : null

    if (currentRoute.srcChain === request.fromChainId.toString()
      && currentRoute.tgtChain === request.toChainId.toString()
      && currentRoute.srcToken.toLowerCase() === request.fromToken.address.toLowerCase()
      && (currentRoute.tgtToken.toLowerCase() === request.toToken.address.toLowerCase() || request.toToken.symbol === toTokenSymbol)
      && currentRoute.state === 'available'
    ) {

      const chainTokens = _tokens[currentRoute.srcChain]

      const fromToken = chainTokens.find((item: any) => item.address.toLowerCase() === request.fromToken.address.toLowerCase())

      console.log('fromToken: ', fromToken)

      if (!fromToken) {
        return null
      }

      const maxAmt = new Big(currentRoute.maxAmt).mul(10 ** fromToken.decimals)
      const minAmt = new Big(currentRoute.minAmt).minus(currentRoute.withholdingFee).mul(10 ** fromToken.decimals)

      if (request.amount.lte(maxAmt) && request.amount.gte(minAmt)) {
        const chainFrom = chainConfig[request.fromChainId as any]
        const rpc = chainFrom.rpcUrls[0]
        const provider = new JsonRpcProvider(rpc);
        const newSigner = provider.getSigner(request.fromAddress)
        
        const gas = await computeGas(currentRoute, request.amount, request.fromAddress, fromToken.isNative, newSigner) 
        // const withholdingFee = new Big(currentRoute.withholdingFee).mul(10 ** fromToken.decimals)
        // const tradeFee = request.amount.minus(withholdingFee).mul(new Big(currentRoute.tradeFee).div(10 ** 6))

        // const fee = withholdingFee.plus(tradeFee)

        const withholdingFee = new Big(currentRoute.withholdingFee).mul(10 ** fromToken.decimals)
        const tradeFee = request.amount.mul(new Big(currentRoute.tradeFee).div(10 ** 6))

        const fee = withholdingFee.plus(tradeFee)

        const receiveAmount = request.amount.minus(tradeFee).div(10 ** request.fromToken.decimals).mul(10 ** request.toToken.decimals).toString()

        const uuid = setQuote({
          route: currentRoute,
          amount: request.amount.plus(withholdingFee),
          isNative: fromToken.isNative,
          bridgeType: 'Orbiter',
        })

        let _fee = fee.div(10 ** fromToken.decimals).toString()
        if (toTokenSymbol === 'BTC') {
          _fee = withholdingFee.div(10 ** fromToken.decimals).mul(88520).toString()
        }

        return {
          uuid,
          icon,
          bridgeName: 'Orbiter',
          bridgeType: 'Orbiter',
          fee: _fee,
          receiveAmount,
          gas,
          duration: currentRoute.spentTime,
          feeType: fromToken.isNative ? FeeType.origin : FeeType.usd,
          gasType: FeeType.origin,
          identification: request.identification,
        }
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
        to: route.endpoint,
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
  } catch(e) {
    console.log(e)
  }
  
  return 0
}

export async function execute(request: ExecuteRequest, signer: Signer): Promise<string | null> {
  const quoteInfo = getQuoteInfo(request.uuid)
  const realAmount = getRealAmount(quoteInfo.amount, quoteInfo.route.vc)

  const account = await signer.getAddress()

  let transactionResponse
  if (quoteInfo.isNative) {
    transactionResponse = await signer.sendTransaction({
      from: account,
      to: quoteInfo.route.endpoint,
      value: realAmount,
    });
  } else {
    // const isApprove = await approve(quoteInfo.route.srcToken, new Big(realAmount), quoteInfo.route.endpoint, signer)
    // if (!isApprove) {
    //   return null
    // }

    const transactionData = await getRouteTransactionData(quoteInfo.route, realAmount, signer)
    transactionResponse = await signer.sendTransaction({
      ...transactionData,
      value: '0x00',
      // gasPrice: gasPrice,
      // gasLimit: gasEstimate
    });
  }

  // const receipt = await transactionResponse.wait()
  // const txHash = receipt.transactionHash;
  // return txHash ? txHash : null

  return transactionResponse.hash ? transactionResponse.hash : null
}

function getRealAmount(
  amount: any,
  vc: any,
) {
  const minusAmount = amount.minus(10000)
  const _amount = getFullNum(minusAmount.toString())
  const lastNum = _amount.slice(0, _amount.length - vc.length) + vc;
  return lastNum;
}

async function getRouteTransactionData(route: any, amount: Big, signer: Signer) {
  const routerContract = new Contract(
    route.srcToken,
    erc20Abi,
    signer,
  )

  const transactionData = await routerContract.populateTransaction.transfer(route.endpoint, amount.toString())

  return transactionData
}


export async function getStatus(params: StatusParams) {
  const isSuccessOnline = await checkTransitionOnlineStatus(params.hash, params.fromChainId as string, params.transitionTime)
  if (isSuccessOnline === false) {
    return {
      status: 2
    }
  }

  if (isSuccessOnline === true) {
    const res = await fetch(`${base_url}/transaction/cross-chain/${params.hash}`);
    const resJson = await res.json();
    if (resJson.result?.status === 99 || resJson.result?.opStatus === 99) {
      return {
        status: 1
      };
    }
  }
  
  return {
    status: 0
  };;
}
