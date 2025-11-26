import BigNumber from "bignumber.js";
import { utils, providers, Contract } from "ethers";
import { V3 } from "../libs/v3.lib";
import chains from "../config/chains";
import routerV3Abi from "../config/abi/router-v3-2";
import { DEFAULT_CHAIN_ID } from "@/configs";
import { getRpcUrl } from "../utils";

export class CapricornV3 {
  private v3: V3;

  private FACTORY: { [key: number]: string } = {
    10143: "0x749117280Ae615BEacD54Eea4E0d580d5c895538",
    143: "0x6B5F564339DbAD6b780249827f2198a841FEB7F3"
  };
  private QUOTER: { [key: number]: string } = {
    10143: "0xb986260e95FF6C7C57c31B777613F25522D026FC",
    143: "0xB430EDD2b54cdB3B25703fb3342ca3a88663A04D"
  };  
  private ROUTER: { [key: number]: string } = {
    10143: "0xE82aeD04aEb7EEF76CCB985Db73BEe73630fe523",
    143: "0xdac97b6a3951641B177283028A8f428332333071"
  };
  private FEES: { [key: number]: number[] } = {
    143: [100, 500, 3000, 10000]
  };
  private MID_TOKENS: { [key: number]: any } = {
    143: [
      {
        address: "0x754704Bc059F8C67012fEd69BC8A327a5aafb603",
        chainId: DEFAULT_CHAIN_ID,
        symbol: "USDC",
        decimals: 6,
        name: "USD Coin",
        icon: "https://assets.dapdap.net/monad/usdc.png",
        color: "#78350F"
      }
    ]
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
    const [bestTradeV3] = await Promise.all([
      this.v3.bestTrade({
        inputCurrency,
        outputCurrency,
        inputAmount: _amount
      }),
    ]);

    console.log('bestTradeV3', bestTradeV3);


    let bestTrade = bestTradeV3;
    let routerAddress = this.ROUTER[inputCurrency.chainId];
    let type = "v3";

    if (!bestTrade) {
      return {
        outputCurrencyAmount: "",
        noPair: true
      };
    }

    return this.handleV3({
      bestTrade,
      outputCurrency,
      inputCurrency,
      _amount,
      slippage,
      account,
      routerAddress
    });
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

    const deadline = Math.ceil(Date.now() / 1000) + 120;
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
      getRpcUrl(inputCurrency.chainId)
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
