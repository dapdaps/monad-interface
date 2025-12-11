import { providers } from "ethers";
import weth from "../config/weth";
import BigNumber from "bignumber.js";
import { getRpcUrl } from "../utils";

interface SwapResponse {
  from: string;
  to: string;
  data: string;
  value: string;
  gas: string;
  gasPrice: string;
  amountIn: string;
  amountOut: string;
}

export class LFJAgg {
  private chainId: number;
  private wrappedNativeAddress: string;
  private HOST = "/lfj/v2/aggregator/routes/monad/0x/swap";

  constructor(chainId: number) {
    this.chainId = chainId;
    this.wrappedNativeAddress = weth[chainId];
  }

  private getTokenAddress(token: any): string {
    return token.isNative
      ? "0x0000000000000000000000000000000000000000"

      : token.address.toLowerCase();
  }

  public async quoter(params: any) {
    let {
      inputCurrency,
      outputCurrency,
      inputAmount,
      slippage,
      account,
      extendParams,
    } = params;

    if (!account) {
      return {
        outputCurrencyAmount: "",
        noPair: true,
      };
    }

    const nativeAddress = "0x0000000000000000000000000000000000000000";
    const _inputAmount = BigNumber(inputAmount)
      .multipliedBy(10 ** (inputCurrency.decimals || 18))
      .toFixed(0);
    
    const tokenIn = this.getTokenAddress(inputCurrency);
    const tokenOut = this.getTokenAddress(outputCurrency);

    const slippageBps = typeof slippage === 'number'
      ? Math.round(slippage * 10000)
      : parseInt(slippage) || 50;

    const feeBps = extendParams?.feeBps || 0;

    const queryParams = new URLSearchParams({
      amountIn: _inputAmount,
      feeBps: feeBps.toString(),
      slippageBps: slippageBps.toString(),
      tokenIn: tokenIn,
      tokenOut: tokenOut,
      userAddress: account.toLowerCase(),
    });

    let swapResponse: SwapResponse;
    try {
      const response = await fetch(`${this.HOST}?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error(`Swap request failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data || !data.to || !data.data) {
        return {
          outputCurrencyAmount: "",
          noPair: true,
        };
      }

      swapResponse = data;
    } catch (error: any) {
      console.error("Failed to get swap quote:", error);
      return {
        outputCurrencyAmount: "",
        noPair: true,
      };
    }

    const outputAmount = BigNumber(swapResponse.amountOut || 0)
      .div(10 ** outputCurrency.decimals)
      .toFixed(outputCurrency.decimals)
      .replace(/\.?0+$/, "");

    if (BigNumber(swapResponse.amountOut || 0).lte(0)) {
      return {
        outputCurrencyAmount: "",
        noPair: true,
      };
    }

    const txn: any = {
      to: swapResponse.to,
      data: swapResponse.data.startsWith("0x") ? swapResponse.data : `0x${swapResponse.data}`,
      value: swapResponse.value || "0",
      gasLimit: null,
    };

    const provider = new providers.JsonRpcProvider(
      getRpcUrl(inputCurrency.chainId)
    );

    let gasEstimate: any = null;
    try {
      gasEstimate = await provider.estimateGas({
        to: txn.to,
        data: txn.data,
        value: txn.value,
        from: account,
      });

      if (gasEstimate) {
        txn.gasLimit = BigNumber(gasEstimate.toString())
          .multipliedBy(1.2)
          .toFixed(0);
      }
    } catch (err: any) {
      console.error("Failed to estimate gas:", err);
      if (swapResponse.gas) {
        txn.gasLimit = BigNumber(swapResponse.gas)
          .multipliedBy(1.2)
          .toFixed(0);
      }
    }

    return {
      outputCurrencyAmount: outputAmount,
      noPair: false,
      routerAddress: swapResponse.to,
      routes: [],
      fee: null,
      txn,
      gasEstimate: txn.gasLimit,
    };
  }
}

