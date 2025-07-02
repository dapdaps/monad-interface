import { utils, providers } from "ethers";
import { PoolFetcher, PathFinder, TokenSwap } from "@kuru-labs/kuru-sdk";
import BigNumber from "bignumber.js";
import chains from "../config/chains";

export class Kuru {
  private Api = "https://api.kuru.io";
  private RouterAddress: Record<string, string> = {
    10143: "0xc816865f172d640d93712C68a7E1F83F3fA63235"
  };
  private MID_TOKENS: { [key: number]: any } = {
    10143: [
      { symbol: "MON", address: "0x0000000000000000000000000000000000000000" }, // MON
      { symbol: "USDC", address: "0xf817257fed379853cDe0fa4F97AB987181B1E5Ea" }, // USDC
      { symbol: "WMON", address: "0x760AfE86e5de5fa0Ee542fc7B7B713e1c5425701" }
    ]
  };
  private log(str: string, ...restParams: any) {
    console.log(`%cKuru ${str}`, "background: #bcf886;", ...restParams);
  }
  constructor(chainId: number) { }
  private getTokenAddress(token: any) {
    return token.isNative
      ? "0x0000000000000000000000000000000000000000"
      : token.address;
  }
  public async quoter({
    inputCurrency,
    outputCurrency,
    inputAmount,
    slippage,
    account
  }: any) {
    const chainId = inputCurrency.chainId;
    const provider = new providers.JsonRpcProvider(chains[chainId].rpcUrls[0]);
    const poolFetcher = new PoolFetcher(this.Api);
    const _inputCurrencyAddress = this.getTokenAddress(inputCurrency);
    const _outputCurrencyAddress = this.getTokenAddress(outputCurrency);
    const pools = await poolFetcher.getAllPools(
      _inputCurrencyAddress,
      _outputCurrencyAddress,
      this.MID_TOKENS[chainId]
    );
    const bestPath = await PathFinder.findBestPath(
      provider,
      _inputCurrencyAddress,
      _outputCurrencyAddress,
      Number(inputAmount),
      "amountIn",
      poolFetcher,
      pools
    );
    this.log("bestPath: %o", bestPath);
    const amountOut = bestPath.output;

    const _amount = utils.parseUnits(
      inputAmount.toString(),
      inputCurrency.decimals
    );

    const _minAmountOut = utils.parseUnits(
      BigNumber(amountOut).times(1 - slippage).toFixed(outputCurrency.decimals),
      outputCurrency.decimals
    );

    let gasLimit: any = 4000000;
    try {
      gasLimit = await TokenSwap.estimateGas(
        provider.getSigner(account),
        this.RouterAddress[chainId],
        bestPath,
        inputAmount,
        inputCurrency.decimals,
        outputCurrency.decimals,
        BigNumber(slippage).times(100).toNumber(),
        true
      );
    } catch(err: any) {
      this.log("estimateGas failed: %o", err);
    }

    try {
      const txRequest = await TokenSwap.constructSwapTransaction(
        provider.getSigner(account),
        this.RouterAddress[chainId],
        bestPath,
        _amount,
        _minAmountOut,
        { gasLimit }
      );

      if (txRequest.gasLimit) {
        txRequest.gasLimit = BigNumber(txRequest.gasLimit.toString())
          .multipliedBy(1.2)
          .toFixed(0);
      }

      return {
        txn: txRequest,
        outputCurrencyAmount: amountOut,
        noPair: false,
        routerAddress: this.RouterAddress[chainId],
        routes: [
          {
            percentage: 100,
            routes: [
              {
                token0: {
                  symbol: inputCurrency.symbol
                },
                token1: {
                  symbol: outputCurrency.symbol
                }
              }
            ]
          }
        ]
      };
    } catch (error) {
      this.log("quoter error: %o", error);
    }

    return false;
  }
}
