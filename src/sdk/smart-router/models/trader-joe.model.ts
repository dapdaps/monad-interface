import { Contract, providers, utils } from "ethers";
import chains from "../config/chains";
import BigNumber from "bignumber.js";
import routerAbi from "../config/abi/router-trader-joe";
import axios from "axios";
import weth from "../config/weth";

const Interface = new utils.Interface(routerAbi);
console.log(
  Interface.decodeFunctionData(
    "swapExactIn",
    "0xf1910f70000000000000000000000000b35033d71cf5e13cab5eb8618260f94363dff9cf0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f817257fed379853cde0fa4f97ab987181b1e5ea000000000000000000000000000000000000000000000000002386f26fc1000000000000000000000000000000000000000000000000000000000000000288ea000000000000000000000000229e549c97c22b139b8c05fba770d94c086853d80000000000000000000000000000000000000000000000000000000067d41efa000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000440200760afe86e5de5fa0ee542fc7b7b713e1c5425701f817257fed379853cde0fa4f97ab987181b1e5ea7ee1d8d858a6ca176d8394a2901023ee6748171827100101000100000000000000000000000000000000000000000000000000000000"
  )
);
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

    const params = [
      "0xb35033d71cf5e13cab5eb8618260f94363dff9cf",
      inputCurrency.isNative
        ? "0x0000000000000000000000000000000000000000"
        : bestRoute.tokenIn.address,
      outputCurrency.isNative
        ? "0x0000000000000000000000000000000000000000"
        : bestRoute.tokenOut.address,
      bestRoute.amountIn,
      _amountOut,
      account,
      deadline
    ];
    let method = "swapExactIn";

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
