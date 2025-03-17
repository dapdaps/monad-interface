
import { ethers, Contract, Signer } from 'ethers'
import Big from 'big.js'
import { approve } from './util/approve'
import { getIcon, getAllToken, getChainScan, getBridgeMsg } from './util/index'
import { getQuoteInfo, setQuote } from './util/routerController'
import { getQuote as getOwltoRoute, execute as executeOwlto, getStatus as getOwltoStatus } from './bridges/owlto'
import { getQuote as getOrbiterRoute, execute as executeOrbiter, getStatus as getOrbiterStatus } from './bridges/orbiter'

import { ExecuteRequest, QuoteRequest, QuoteResponse, StatusParams, StatusRes } from './type'

const executeTypes: any = {
    executeOwlto,
    executeOrbiter,
}


export async function execute(executeRequest: ExecuteRequest, signer: Signer) {
  const quoteInfo = getQuoteInfo(executeRequest.uuid)
  const executeFn = executeTypes[`execute${quoteInfo.bridgeType}`]

  if (executeFn) {
    try {
      return executeFn(executeRequest, signer)
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  throw new Error('Missing Route')
}

export async function getQuote(quoteRequest: QuoteRequest, signer: Signer, callback?: (quoteResponse: QuoteResponse) => void) {
  const quoteP = []
  const { engine } = quoteRequest

  function emitRes(val: QuoteResponse | QuoteResponse[] | null) {
    if (val) {
      if (Array.isArray(val)) {
        val.forEach(item => {
          callback && callback(item)
        })
      } else {
        callback && callback(val)
      }
    }
    return val
  }

  let needFilter = false

  if (engine && engine.length) {
    for (let i = 0; i < engine.length; i++) {
      const key = engine[i]
      switch (key) {
        case 'owlto':
          quoteP.push(getOwltoRoute(quoteRequest, signer))
          break;
        case 'orbiter':
          quoteP.push(getOrbiterRoute(quoteRequest, signer))
          break;
      }
    }
  } else {
    const owltoRoute = getOwltoRoute(quoteRequest, signer).then(emitRes).catch(e => console.log('owlto:', e))
    // const orbiterRoute = getOrbiterRoute(quoteRequest, signer).then(emitRes).catch(e => console.log('orbiter:', e))
    quoteP.push(owltoRoute)
  }

  const resList: (QuoteResponse | QuoteResponse[] | null | void)[] = await Promise.all(quoteP)

  console.log('resList: ', resList)

  const _resList: QuoteResponse[] = []
  resList.forEach((item: any) => {
    if (!item) {
      return
    }
    if (Array.isArray(item)) {
      _resList.push(...item)
      return
    }

    _resList.push(item)
  })

  
  return _resList
}

export async function preloadResource(engine?: string) {
  if (!engine) {
    // import('./bridges/axelar/index')
  }
}

export async function getStatus(params: StatusParams, engine: string, signer: Signer): Promise<boolean | undefined | null | StatusRes> {
  const _engine = engine.toLocaleLowerCase()
  if (_engine === 'owlto') {
    return getOwltoStatus(params)
  }
  if (_engine === 'orbiter') {
    return getOrbiterStatus(params)
  }
}
