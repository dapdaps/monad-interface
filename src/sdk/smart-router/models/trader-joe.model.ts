import { Contract, providers, utils } from "ethers";
import chains from "../config/chains";
import BigNumber from "bignumber.js";
import routerAbi from "../config/abi/router-trader-joe";
import bytesAbi from "../config/abi/lfj-bytes";
import axios from "axios";
import weth from "../config/weth";

// const Interface = new utils.Interface(routerAbi);
// console.log(
//   Interface.decodeFunctionData(
//     "swapExactIn",
//     "0xf1910f70000000000000000000000000b35033d71cf5e13cab5eb8618260f94363dff9cf000000000000000000000000000000000000000000000000000000000000000000000000000000000000000088b8e2161dedc77ef4ab7585569d2415a1c1055d000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000000000000000000000000000000000000014ee14000000000000000000000000229e549c97c22b139b8c05fba770d94c086853d80000000000000000000000000000000000000000000000000000000067d940ef0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000008c0300760afe86e5de5fa0ee542fc7b7b713e1c5425701f817257fed379853cde0fa4f97ab987181b1e5ea88b8e2161dedc77ef4ab7585569d2415a1c1055d7ee1d8d858a6ca176d8394a2901023ee67481718139701010001c0669c19324ef42d7ed33219aae5d977287bc4fa271001010002d47bc78d9e0ae7056290f5de5cd08e658848bb092710010001020000000000000000000000000000000000000000"
//   )
// );
export class TraderJoe {
  private ROUTER_ABI = routerAbi;
  private BASE_PATH: { [key: number]: string } = {
    10143: "/lfj/v2/aggregator/routes/monad/jar/quote"
  };
  private ROUTER: { [key: number]: string } = {
    10143: "0x45A62B090DF48243F12A21897e7ed91863E2c86b"
  };
  private ROUTE_BYTES: { [key: number]: string } = {
    10143: "0x7f7d782b978c603e19503497E6F79bb586d7d703"
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

    if (!bestRoute) {
      return {
        outputCurrencyAmount: "",
        noPair: true
      };
    }

    const provider = new providers.JsonRpcProvider(
      chains[inputCurrency.chainId].rpcUrls[0]
    );

    const BytesRouter = new Contract(
      this.ROUTE_BYTES[inputCurrency.chainId],
      bytesAbi,
      provider.getSigner(account)
    );

    const outputCurrencyAmount = new BigNumber(bestRoute.amountOut)
      .div(10 ** outputCurrency.decimals)
      .toFixed(outputCurrency.decimals)
      .replace(/\.?0+$/, "");

    const tokens: string[] = [bestRoute.tokenIn.address];
    const percents: number[] = [];
    const flags: number[] = [];
    const pairsAddress: string[] = [];
    const tokenInIds: number[] = [];
    const tokenOutIds: number[] = [];
    const frontSwaps: any[] = [];
    const endSwaps: any[] = [];

    const loop = (swaps: any[]) => {
      swaps.forEach((swap, i) => {
        if (
          !tokens.includes(swap.tokenOut.address) &&
          swap.tokenOut.address !== bestRoute.tokenOut.address
        ) {
          tokens.push(swap.tokenOut.address);
        }

        if (i === swaps.length - 1) {
          swap.isLastToken = true;
        }

        if (swap.tokenOut.swaps.length) {
          loop(swap.tokenOut.swaps);
        }
      });
    };

    loop(bestRoute.tokenIn.swaps || []);

    tokens.push(bestRoute.tokenOut.address);

    let nodes = bestRoute.tokenIn.swaps as any[];

    while (nodes.length > 0) {
      const swap = nodes.shift();
      if (swap.tokenOut.address === bestRoute.tokenOut.address) {
        const pairIdx = endSwaps.findIndex(
          (p) => swap.pair.address === p.pair.address
        );
        swap.isLastToken = true;
        if (pairIdx !== -1) {
          endSwaps.splice(pairIdx, 1);
        }
        endSwaps.push(swap);
      } else {
        const pairIdx = frontSwaps.findIndex(
          (p) => swap.pair.address === p.pair.address
        );
        if (pairIdx !== -1) {
          swap.isLastToken = true;
          frontSwaps.splice(pairIdx, 1);
        }
        frontSwaps.push(swap);
      }

      if (swap.tokenOut.swaps.length) {
        nodes = nodes.concat(swap.tokenOut.swaps);
      }
    }

    [...frontSwaps, ...endSwaps].forEach((swap) => {
      percents.push(swap.isLastToken ? 10000 : swap.amountBp);
      flags.push(swap.pair.tokenX === swap.tokenIn.address ? 257 : 256);
      pairsAddress.push(swap.pair.address);

      tokenInIds.push(
        tokens.findIndex((token) => token === swap.tokenIn.address)
      );
      tokenOutIds.push(
        tokens.findIndex((token) => token === swap.tokenOut.address)
      );
    });

    // const _params = await BytesRouter.decodeRoute(
    //   "0x0300760afe86e5de5fa0ee542fc7b7b713e1c5425701f817257fed379853cde0fa4f97ab987181b1e5ea88b8e2161dedc77ef4ab7585569d2415a1c1055d7ee1d8d858a6ca176d8394a2901023ee67481718139701010001c0669c19324ef42d7ed33219aae5d977287bc4fa271001010002d47bc78d9e0ae7056290f5de5cd08e658848bb09271001000102"
    // );

    // console.log(_params, [
    //   tokens.length,
    //   false,
    //   tokens,
    //   pairsAddress,
    //   percents,
    //   flags,
    //   tokenInIds,
    //   tokenOutIds
    // ]);

    const routesBytes = await BytesRouter.encodeRoute(
      tokens.length,
      false,
      tokens,
      pairsAddress,
      percents,
      flags,
      tokenInIds,
      tokenOutIds
    );
    // console.log(221, routesBytes);
    const returnData = {
      outputCurrencyAmount,
      noPair: false,
      routerAddress: this.ROUTER[inputCurrency.chainId],
      routes: [
        {
          percentage: 100,
          routes: [
            {
              token0: {
                symbol: bestRoute.tokenIn.symbol
              },
              token1: {
                symbol: bestRoute.tokenOut.symbol
              }
            }
          ]
        }
      ]
    };

    const _amountOut = BigNumber(bestRoute.amountOut)
      .multipliedBy(1 - slippage)
      .toFixed(0);

    const deadline = Math.ceil(Date.now() / 1000) + 120;

    const options = {
      value: inputCurrency.isNative ? _amount : "0"
    };

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
      deadline,
      routesBytes
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

    console.log("estimateGas", estimateGas?.toString());

    const txn = await RouterContract.populateTransaction[method](...params, {
      ...options,
      gasLimit: estimateGas
        ? BigNumber(estimateGas.toString()).multipliedBy(1.2).toFixed(0)
        : 5000000
    });

    return { ...returnData, txn };
  }
}
