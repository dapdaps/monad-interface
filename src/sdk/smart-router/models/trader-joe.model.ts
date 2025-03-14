import { Contract, providers } from "ethers";
import chains from "../config/chains";
import BigNumber from "bignumber.js";
import routerAbi from "../config/abi/router-trader-joe";
import axios from "axios";
import weth from "../config/weth";

export class TraderJoe {
  private ROUTER_ABI = routerAbi;
  private BASE_PATH: { [key: number]: string } = {
    10143: "/lfj/v2/aggregator/routes/monad/jar/quote"
  };
  private ROUTER: { [key: number]: string } = {
    10143: "0x45A62B090DF48243F12A21897e7ed91863E2c86b"
  };

  private getTokenAddress(token: any) {
    return token.isNative ? weth[token.chainId] : token.address;
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
    const pathParams = `amountIn=${_amount}&tokenIn=${this.getTokenAddress(
      inputCurrency
    )}&tokenOut=${this.getTokenAddress(outputCurrency)}`;

    const quoteResponse = await axios.get(
      `${this.BASE_PATH[inputCurrency.chainId]}?${pathParams}`
    );
    const bestRoute = quoteResponse.data;

    const outputCurrencyAmount = new BigNumber(bestRoute.amountOut)
      .div(10 ** outputCurrency.decimals)
      .toFixed(outputCurrency.decimals)
      .replace(/\.?0+$/, "");

    const routes = bestRoute.tokenIn.swaps.map((leg: any) => ({
      token0: {
        symbol: leg.tokenIn.symbol
      },
      token1: {
        symbol: leg.tokenOut.symbol
      }
    }));

    const returnData = {
      outputCurrencyAmount,
      noPair: false,
      routerAddress: this.ROUTER[inputCurrency.chainId],
      routes: [{ percentage: 100, routes }]
    };

    const _amountOut = BigNumber(bestRoute.amountOut)
      .multipliedBy(1 - slippage)
      .toFixed(0);

    const deadline = Math.ceil(Date.now() / 1000) + 120;
    const provider = new providers.JsonRpcProvider(
      chains[inputCurrency.chainId].rpcUrls[0]
    );

    const options: any = {};

    const pairBinSteps: number[] = [];
    const versions: number[] = [];
    const tokenPath: string[] = [];

    bestRoute.tokenIn.swaps.forEach((leg: any, i: number) => {
      pairBinSteps.push(leg.pair.data?.binStep || 0);
      versions.push(leg.pair.type === "v2" ? 2 : 0);
      if (i === 0) {
        tokenPath.push(leg.tokenIn.address);
      }
      tokenPath.push(leg.tokenOut.address);
    });

    const params = [
      _amountOut,
      {
        pairBinSteps,
        versions,
        tokenPath
      },
      account,
      deadline
    ];
    let method = "";

    if (inputCurrency.isNative) {
      method = "swapExactNATIVEForTokens";
      options.value = _amount;
    } else if (outputCurrency.isNative) {
      method = "swapExactTokensForNATIVE";
      params.unshift(_amount);
    } else {
      method = "swapExactTokensForTokens";
      params.unshift(_amount);
    }

    const RouterContract = new Contract(
      this.ROUTER[inputCurrency.chainId],
      this.ROUTER_ABI,
      provider.getSigner(account)
    );

    let estimateGas;
    try {
      estimateGas = await RouterContract.estimateGas[method](
        ...params,
        options
      );
    } catch (err) {
      // console.log('estimateGas err', err);
    }

    const txn = await RouterContract.populateTransaction[method](...params, {
      ...options,
      gasLimit: estimateGas
        ? BigNumber(estimateGas.toString()).multipliedBy(1.2).toFixed(0)
        : 5000000
    });

    return { ...returnData, txn };
  }
}
