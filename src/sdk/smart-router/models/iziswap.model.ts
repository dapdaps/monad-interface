import Web3 from "web3";
import {
  getSwapContract,
  getSwapChainWithExactInputCall
} from "iziswap-sdk/lib/swap";
import { searchPathQuery } from "iziswap-sdk/lib/search/func";
import { SwapDirection } from "iziswap-sdk/lib/search/types";
import { getMulticallContracts } from "iziswap-sdk/lib/base";
import BigNumber from "bignumber.js";
import { nativeToWNative } from "../utils/token";
import chains from "../config/chains";
import weth from "../config/weth";

type QuoterProps = {
  inputCurrency: any;
  outputCurrency: any;
  inputAmount: string;
  slippage: number;
  account: string;
};

export class iZiSwap {
  private MULTI: { [key: number]: string } = {
    143: "0x14323AfbC2b82fE58F0D9c203830EE969B4d1bE2"
  };
  private LIQUIDITY_MANAGER: { [key: number]: string } = {
    143: "0x19b683A2F45012318d9B2aE1280d68d3eC54D663"
  };
  private QUOTER: { [key: number]: string } = {
    143: "0x3EF68D3f7664b2805D4E88381b64868a56f88bC4"
  };
  private ROUTER: { [key: number]: string } = {
    143: "0x34bc1b87f60e0a30c0e24FD7Abada70436c71406"
  };
  private MID_TOKENS: { [key: number]: any } = {
    143: []
  };
  private FEES: { [key: number]: number[] } = {
    143: [100, 500, 3000, 10000]
  };
  private formatToken(token: any) {
    return { ...nativeToWNative(token), decimal: token.decimals };
  }
  private formatChain(chain: any, wethAddress: string) {
    return {
      id: chain.chainId,
      name: chain.chainName,
      tokenSymbol: chain.nativeCurrency.symbol,
      token: {
        symbol: chain.nativeCurrency.symbol,
        address: wethAddress,
        decimal: 18
      },
      wrappedTokenSymbol: "W" + chain.nativeCurrency.symbol,
      wrappedToken: {
        symbol: "W" + chain.nativeCurrency.symbol,
        address: wethAddress,
        decimal: 18
      },
      scanUrl: chain.blockExplorers,
      scanName: "",
      vmType: chain.type || "EVM",
      rpcUrl: chain.rpcUrls[0]
    };
  }
  private isGasToken(token: any, wethAddress: string): boolean {
    return (
      token?.isNative &&
      token?.address.toLowerCase() === wethAddress.toLowerCase()
    );
  }
  public async quoter({
    inputCurrency,
    outputCurrency,
    inputAmount,
    slippage,
    account
  }: QuoterProps): Promise<any> {
    const chain = chains[inputCurrency.chainId];
    const web3 = new Web3(new Web3.providers.HttpProvider(chain.rpcUrls[0]));
    const _amount = new BigNumber(inputAmount)
      .multipliedBy(10 ** inputCurrency.decimals)
      .toFixed(0);
    const wethAddress = weth[inputCurrency.chainId];
    const liquidityManagerAddress =
      this.LIQUIDITY_MANAGER[inputCurrency.chainId];
    const quoterAddress = this.QUOTER[inputCurrency.chainId];
    const routerAddress = this.ROUTER[inputCurrency.chainId];
    const fees = this.FEES[inputCurrency.chainId];
    const midTokens = this.MID_TOKENS[inputCurrency.chainId];
    const multicallContract = getMulticallContracts(
      this.MULTI[inputCurrency.chainId],
      web3
    );
    const _inputCurrency = this.formatToken(inputCurrency);
    const _outputCurrency = this.formatToken(outputCurrency);


    const searchParams = {
      chainId: inputCurrency.chainId,
      web3,
      multicall: multicallContract,
      tokenIn: this.formatToken(_inputCurrency),
      tokenOut: this.formatToken(_outputCurrency),
      liquidityManagerAddress,
      quoterAddress,
      poolBlackList: [],
      midTokenList: midTokens,
      supportFeeContractNumbers: fees,
      support001Pools: [],
      direction: SwapDirection.ExactIn,
      amount: _amount
    };

    console.log('iziswap searchParams: %o', searchParams);

    const { pathQueryResult, preQueryResult } = await searchPathQuery(
      searchParams
    );

    console.log('iziswap pathQueryResult: %o', pathQueryResult);

    if (!pathQueryResult) {
      return {
        outputCurrencyAmount: "",
        noPair: true
      };
    }


    const tokens = pathQueryResult.path.tokenChain;
    const routes: any = [];
    tokens.forEach((token: any, i: number) => {
      if (i === tokens.length - 1) return;
      routes.push({
        token0: tokens[i],
        token1: tokens[i + 1],
        fee: pathQueryResult.path.feeContractNumber[i]
      });
    });
    const outputCurrencyAmount = new BigNumber(pathQueryResult.amount)
      .div(10 ** outputCurrency.decimals)
      .toFixed(outputCurrency.decimals)
      .replace(/\.?0+$/, "");

    if (!account) {
      return {
        outputCurrencyAmount,
        priceImpact: pathQueryResult.priceImpact,
        fees: pathQueryResult.feesDecimal,
        noPair: pathQueryResult.noSufficientLiquidity,
        routes: [{ percentage: 100, routes }]
      };
    }
    const swapParams = {
      tokenChain: tokens,
      feeChain: pathQueryResult.path.feeContractNumber,
      inputAmount: _amount,
      minOutputAmount: new BigNumber(pathQueryResult.amount)
        .times(1 - slippage)
        .toFixed(0)
    };
    let gasLimit = null;
    const swapContract = getSwapContract(routerAddress, web3);
    const { swapCalling, options } = getSwapChainWithExactInputCall(
      swapContract,
      account,
      this.formatChain(chain, wethAddress),
      swapParams,
      "30000000"
    );
    const gasPrice = await web3.eth.getGasPrice();
    const _options = {
      ...options,
      value: this.isGasToken(_inputCurrency, wethAddress) ? _amount : 0,
      gasPrice
    };
    try {
      gasLimit = await swapCalling.estimateGas(_options);
    } catch (estimateErr: any) {
      console.log("estimateErr: ", estimateErr);
    }

    const txn: any = {
      to: routerAddress,
      data: swapCalling.encodeABI(),
      ..._options,
      gasLimit: new BigNumber(gasLimit || 5000000)
        .multipliedBy(1.2)
        .toFixed(0, 2)
    };
    return {
      outputCurrencyAmount,
      gas: gasLimit,
      txn,
      routes: [{ percentage: 100, routes }],
      priceImpact: pathQueryResult.priceImpact * 100,
      fees: pathQueryResult.feesDecimal,
      noPair: pathQueryResult.noSufficientLiquidity,
      routerAddress
    };
  }
}
