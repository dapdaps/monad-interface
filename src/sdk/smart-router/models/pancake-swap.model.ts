import BigNumber from "bignumber.js";
import { utils, providers, Contract } from "ethers";
import { V3 } from "../libs/v3.lib";
import chains from "../config/chains";
import routerAbi from "../config/abi/router-v3-2";

export class PancakeSwap {
  private v3: V3;
  private ROUTER_ABI = routerAbi;
  private FACTORY: { [key: number]: string } = {
    10143: "0x3b7838D96Fc18AD1972aFa17574686be79C50040"
  };
  private QUOTER: { [key: number]: string } = {
    10143: "0x74b06eFA24F39C60AA7F61BD516a3eaf39613D57"
  };
  private ROUTER: { [key: number]: string } = {
    10143: "0xe27dC57FcE896350a38D8d8aDcEefBfb5649D9De"
  };
  private FEES: { [key: number]: number[] } = {
    10143: [100, 500, 2500, 10000]
  };
  private MID_TOKENS: { [key: number]: any } = {
    10143: []
  };
  constructor(chainId: number) {
    this.v3 = new V3({
      fees: this.FEES[chainId],
      chainId,
      factoryAddress: this.FACTORY[chainId],
      quoterAddress: this.QUOTER[chainId],
      midTokens: this.MID_TOKENS[chainId]
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
    const bestTrade = await this.v3.bestTrade({
      inputCurrency,
      outputCurrency,
      inputAmount: _amount
    });

    if (!bestTrade) {
      return {
        outputCurrencyAmount: "",
        noPair: true
      };
    }

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

    const deadline = Math.ceil(Date.now() / 1000) + 120;
    const RouterIface = new utils.Interface(this.ROUTER_ABI);
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
      deadline,
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
      this.ROUTER_ABI,
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
