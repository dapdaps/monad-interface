import Big from 'big.js';

import chains from '@/configs/chains';

import checkGas from './checkGas';

const formatTrade = ({
  rawBalance,
  gasPrice,
  market,
  prices,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount
}: any) => {
  const _gas = !market.txn?.gasLimit
    ? market.gas
    : market.txn?.gasLimit.type === 'BigNumber'
    ? Number(market.txn?.gasLimit.hex)
    : market.txn?.gasLimit;

  const { isGasEnough, gas } = checkGas({
    rawBalance,
    gasPrice,
    gasLimit: _gas || 0
  });

  const inputCurrencyPrice =
    prices[inputCurrency.priceKey || inputCurrency.symbol] || 0;
  const outputCurrencyPrice =
    prices[outputCurrency.priceKey || outputCurrency.symbol] || 0;
  let priceImpact = null;
  let priceImpactType = 0;

  if (inputCurrencyPrice && outputCurrencyPrice) {
    const poolPrice = Big(inputCurrencyPrice).div(outputCurrencyPrice);
    const amountoutPrice = Big(market.outputCurrencyAmount).div(
      inputCurrencyAmount
    );
    priceImpact = poolPrice
      .minus(amountoutPrice)
      .div(poolPrice)
      .mul(100)
      .abs()
      .toFixed(2);

    if (Big(priceImpact).gt(100)) priceImpact = 100;

    if (
      Big(priceImpact || 0)
        .abs()
        .gt(1)
    ) {
      priceImpactType = 1;
    }
    if (
      Big(priceImpact || 0)
        .abs()
        .gt(2)
    ) {
      priceImpactType = 2;
    }
  }

  const nativeToken = chains[inputCurrency.chainId].nativeCurrency;

  const nativeTokenPrice = prices[nativeToken.symbol];

  let routerStr = '';

  if (market.routes?.length && market.template !== "OneClick") {
    if (market.routes[0].routes) {
      market.routes[0].routes.forEach((route: any, i: number) => {
        if (i === 0) {
          routerStr += route.token0.symbol + ' > ' + route.token1.symbol;
        } else {
          routerStr += ' > ' + route.token1.symbol;
        }
      });
    }
  } else {
    routerStr = inputCurrency.symbol + ' > ' + outputCurrency.symbol;
  }

  return {
    inputCurrency,
    outputCurrency,
    inputCurrencyAmount,
    name: market.template,
    txn: market.txn,
    routerAddress: market.routerAddress,
    noPair: market.noPair,
    outputCurrencyAmount: market.outputCurrencyAmount,
    routerStr,
    routes: market.routes?.[0].routes || [],
    isGasEnough,
    priceImpact,
    priceImpactType,
    gasUsd: nativeTokenPrice
      ? Big(nativeTokenPrice)
          .mul(gas)
          .div(10 ** nativeToken.decimals)
          .toString()
      : '-',
    version: market.version,
    type: market.type
  };
};

export default formatTrade;
