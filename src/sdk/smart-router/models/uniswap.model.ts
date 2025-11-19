import BigNumber from "bignumber.js";
import { utils, providers, Contract } from "ethers";
import { V3 } from "../libs/v3.lib";
import { V2 } from "../libs/v2.lib";
import chains from "../config/chains";
import routerV3Abi from "../config/abi/router-v3-4";
import routerV2Abi from "../config/abi/router-v2-1";

export class Uniswap {
  private v3: V3;
  private v2: V2;

  private FACTORY: { [key: number]: string } = {
    143: "0x204faca1764b154221e35c0d20abb3c525710498"
  };
  private QUOTER: { [key: number]: string } = {
    143: "0x2d01411773c8c24805306e89a41f7855c3c4fe65"
  };
  private ROUTER: { [key: number]: string } = {
    143: "0xd6145b2d3f379919e8cdeda7b97e37c4b2ca9c40"
  };
  private FEES: { [key: number]: number[] } = {
    143: [100, 500, 3000, 10000]
  };
  private MID_TOKENS: { [key: number]: any } = {
    143: []
  };
  private V2_ROUTER: { [key: number]: string } = {
    143: "0x661e93cca42afacb172121ef892830ca3b70f08d"
  };
  private V2_FACTORY: { [key: number]: string } = {
    143: "0x182a927119d56008d921126764bf884221b10f59"
  };
  constructor(chainId: number) {
    this.v3 = new V3({
      fees: this.FEES[chainId],
      chainId,
      factoryAddress: this.FACTORY[chainId],
      quoterAddress: this.QUOTER[chainId],
      midTokens: this.MID_TOKENS[chainId]
    });

    this.v2 = new V2({
      midTokens: [],
      factoryAddress: this.V2_FACTORY[chainId],
      computablePairAddress: false,
      hasStable: false,
      includeStable: false,
      amountOutType: 2,
      feeIn: true
    });
  }
  public async quoter({
    inputCurrency,
    outputCurrency,
    inputAmount,
    slippage,
    account
  }: any) {
    const _amount = BigNumber(inputAmount)
      .multipliedBy(10 ** inputCurrency.decimals)
      .toFixed(0);
    const [bestTradeV3, bestTradeV2] = await Promise.all([
      this.v3.bestTrade({
        inputCurrency,
        outputCurrency,
        inputAmount: _amount
      }),
      this.v2.bestTrade({
        inputCurrency,
        outputCurrency,
        inputAmount: BigNumber(inputAmount).multipliedBy(
          10 ** inputCurrency.decimals
        )
      })
    ]);

    let bestTrade = bestTradeV3;
    let routerAddress = this.ROUTER[inputCurrency.chainId];
    let type = "v3";

    if (BigNumber(bestTrade?.amountOut).lt(bestTradeV2?.amountOut)) {
      bestTrade = bestTradeV2;
      routerAddress = this.V2_ROUTER[inputCurrency.chainId];
      type = "v2";
    }

    if (!bestTrade) {
      return {
        outputCurrencyAmount: "",
        noPair: true
      };
    }

    return this[type === "v3" ? "handleV3" : "handleV2"]({
      bestTrade,
      outputCurrency,
      inputCurrency,
      _amount,
      slippage,
      account,
      routerAddress
    });
  }

  private async handleV2({
    bestTrade,
    inputCurrency,
    outputCurrency,
    account,
    _amount,
    slippage
  }: any) {
    const outputCurrencyAmount = new BigNumber(bestTrade.amountOut)
      .div(10 ** outputCurrency.decimals)
      .toFixed(outputCurrency.decimals)
      .replace(/\.?0+$/, "");

    const returnData = {
      outputCurrencyAmount,
      noPair: false,
      routerAddress: this.ROUTER[inputCurrency.chainId],
      routes: bestTrade.routes
    };

    const provider = new providers.JsonRpcProvider(
      chains[inputCurrency.chainId].rpcUrls[0]
    );
    const RouterContract = new Contract(
      this.ROUTER[inputCurrency.chainId],
      routerV2Abi,
      provider.getSigner(account)
    );

    const _amountOut = BigNumber(bestTrade.amountOut)
      .multipliedBy(1 - slippage)
      .toFixed(0);

    const deadline = Math.ceil(Date.now() / 1000) + 120;
    let method = "";
    const options: any = {};
    const path: string[] = [];

    bestTrade.pairs.forEach((pair: any, i: number) => {
      if (i === 0) {
        path.push(pair.tokenA.address);
        path.push(pair.tokenB.address);
      } else {
        path.push(pair.tokenB.address);
      }
    });

    const params = [_amountOut, path, account, deadline];

    if (inputCurrency.isNative) {
      method = "swapExactETHForTokens";
      options.value = _amount;
    } else if (outputCurrency.isNative) {
      method = "swapExactTokensForETH";
      params.unshift(_amount);
    } else {
      method = "swapExactTokensForTokens";
      params.unshift(_amount);
    }
    let estimateGas;
    try {
      estimateGas = await RouterContract.estimateGas[method](
        ...params,
        options
      );
    } catch (err) {
      // console.log('estimateGas err', err);
    }

    console.log("estimateGas v2", estimateGas?.toString());

    const txn = await RouterContract.populateTransaction[method](...params, {
      ...options,
      gasLimit: estimateGas
        ? BigNumber(estimateGas.toString()).multipliedBy(1.2).toFixed(0)
        : 500000
    });
    return { ...returnData, txn };
  }

  private async handleV3({
    bestTrade,
    inputCurrency,
    outputCurrency,
    _amount,
    account,
    slippage
  }: any) {
    const outputCurrencyAmount = new BigNumber(bestTrade.amountOut)
      .div(10 ** outputCurrency.decimals)
      .toFixed(outputCurrency.decimals)
      .replace(/\.?0+$/, "");

    const returnData = {
      outputCurrencyAmount,
      noPair: false,
      routerAddress: this.ROUTER[inputCurrency.chainId],
      routes: bestTrade.routes
    };

    const RouterIface = new utils.Interface(routerV3Abi);
    const options = {
      value: inputCurrency.isNative ? _amount : "0"
    };

    const _amountOut = BigNumber(bestTrade.amountOut)
      .multipliedBy(1 - slippage)
      .toFixed(0);

    const multicallParams = [];

    const inputs = {
      path: bestTrade.path,
      recipient: outputCurrency.isNative
        ? this.ROUTER[inputCurrency.chainId]
        : account,
      amountIn: _amount,
      amountOutMinimum: _amountOut
    };

    multicallParams.push(
      RouterIface.encodeFunctionData("exactInput", [inputs])
    );

    if (outputCurrency.isNative) {
      multicallParams.push(
        RouterIface.encodeFunctionData("unwrapWETH9", ["0", account])
      );
    }

    const provider = new providers.JsonRpcProvider(
      chains[inputCurrency.chainId].rpcUrls[0]
    );
    const multicallContract = new Contract(
      this.ROUTER[inputCurrency.chainId],
      routerV3Abi,
      provider.getSigner(account)
    );

    let estimateGas;

    try {
      estimateGas = await multicallContract.estimateGas.multicall(
        multicallParams,
        options
      );
    } catch (err) {
      // console.log('estimateGas err', err);
    }

    console.log("estimateGas v3", estimateGas?.toString());

    const txn = await multicallContract.populateTransaction.multicall(
      multicallParams,
      {
        ...options,
        gasLimit: estimateGas
          ? BigNumber(estimateGas.toString()).multipliedBy(1.2).toFixed(0)
          : 5000000
      }
    );

    return { ...returnData, txn };
  }
}
