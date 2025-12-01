import { providers } from "ethers";
import weth from "../config/weth";
import BigNumber from "bignumber.js";
import { getRpcUrl } from "../utils";

interface TokenCache {
  token: string;
  expires_at: number;
  rate_limit: {
    rps: number;
    burst: number;
  };
}

interface GenerateTokenResponse {
  token: string;
  expires_at: number;
  rate_limit: {
    rps: number;
    burst: number;
  };
}

interface QuoteResponse {
  type: string;
  status: string;
  output: string;
  minOut: string;
  transaction: {
    calldata: string;
    value: string;
    to: string;
  };
  gasPrices?: {
    slow: string;
    standard: string;
    fast: string;
    rapid: string;
    extreme: string;
  };
}

export class KuruAgg {
  private chainId: number;
  private wrappedNativeAddress: string;
  private HOST = "https://ws.kuru.io/api";
  
  // Token cache: key is user address, value is token cache
  private tokenCache: Map<string, TokenCache> = new Map();

  constructor(chainId: number) {
    this.chainId = chainId;
    this.wrappedNativeAddress = weth[chainId];
  }

  private async getToken(userAddress: string): Promise<string> {
    const lowerAddress = userAddress.toLowerCase();
    const cached = this.tokenCache.get(lowerAddress);

    if (cached && cached.expires_at > Date.now() / 1000 + 300) {
      return cached.token;
    }

    try {
      const response = await fetch(`${this.HOST}/generate-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_address: userAddress,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate token: ${response.statusText}`);
      }

      const data: GenerateTokenResponse = await response.json();
      
      this.tokenCache.set(lowerAddress, {
        token: data.token,
        expires_at: data.expires_at,
        rate_limit: data.rate_limit,
      });

      return data.token;
    } catch (error: any) {
      console.error("Failed to generate Kuru token:", error);
      throw error;
    }
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

    let token: string;
    try {
      token = await this.getToken(account);
    } catch (error: any) {
      console.error("Failed to get token:", error);
      return {
        outputCurrencyAmount: "",
        noPair: true,
      };
    }

    const slippageTolerance = typeof slippage === 'number'
      ? Math.round(slippage * 10000)
      : parseInt(slippage) || 50;

    const quoteParams: any = {
      userAddress: account.toLowerCase(),
      tokenIn: tokenIn,
      tokenOut: tokenOut,
      amount: _inputAmount,
      slippageTolerance: slippageTolerance,
      autoSlippage: true,
    };

    if (extendParams?.referrerAddress) {
      quoteParams.referrerAddress = extendParams.referrerAddress;
      quoteParams.referrerFeeBps = extendParams.referrerFeeBps || 25;
    }

    let quoteResponse: QuoteResponse;
    try {
      const response = await fetch(`${this.HOST}/quote`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteParams),
      });

      if (!response.ok) {
        throw new Error(`Quote request failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status !== "success" || !data.transaction) {
        return {
          outputCurrencyAmount: "",
          noPair: true,
        };
      }

      quoteResponse = data;
    } catch (error: any) {
      console.error("Failed to get quote:", error);
      return {
        outputCurrencyAmount: "",
        noPair: true,
      };
    }

    const outputAmount = BigNumber(quoteResponse.output || 0)
      .div(10 ** outputCurrency.decimals)
      .toFixed(outputCurrency.decimals)
      .replace(/\.?0+$/, "");

    if (BigNumber(quoteResponse.output || 0).lte(0)) {
      return {
        outputCurrencyAmount: "",
        noPair: true,
      };
    }

    const transaction = quoteResponse.transaction || {};
    const txn: any = {
      to: transaction.to,
      data: transaction.calldata ? `0x${transaction.calldata}` : "0x",
      value: transaction.value || "0",
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
    }

    return {
      outputCurrencyAmount: outputAmount,
      noPair: false,
      routerAddress: transaction.to,
      routes: [
        {
          percentage: 100,
          pools: [
            {
              dex: {
                name: "Kuru",
                logo: "/images/dapps/icons/kuru.svg",
              },
              amountIn: _inputAmount,
              tokenIn: tokenIn,
              tokenOut: tokenOut,
            },
          ],
        },
      ],
      fee: null,
      txn,
      gasEstimate: txn.gasLimit,
      gasPrices: quoteResponse.gasPrices,
    };
  }
}
