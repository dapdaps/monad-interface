import { Contract, providers } from "ethers";
import weth from "../config/weth";
import BigNumber from "bignumber.js";
import chains from "../config/chains";
import oneclickAbi from "../config/abi/oneclick";

export class OneClick {
  private chainId: number;
  private wrappedNativeAddress: string;
  private ROUTER: { [key: number]: string } = {
    10143: "0xB542376ec17d7D22f384fF10150713ABe72c14AF"
  };
  private HOST = "https://api-trade.nadsa.space";

  constructor(chainId: number) {
    this.chainId = chainId;
    this.wrappedNativeAddress = weth[chainId];
  }

  public async quoter(params: any) {
    let {
      inputCurrency,
      outputCurrency,
      inputAmount,
      slippage,
      account
    } = params;

    const nativeAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    const _inputAmount = BigNumber(inputAmount)
      .multipliedBy(10 ** (inputCurrency.decimals || 18))
      .toFixed(0);
    inputCurrency.address = inputCurrency.address.toLowerCase();
    outputCurrency.address = outputCurrency.address.toLowerCase();

    const candidatesParams = new URLSearchParams();
    candidatesParams.set("chainId", this.chainId + "");
    candidatesParams.set("amountIn", _inputAmount);
    candidatesParams.set("tokenIn", inputCurrency.isNative ? nativeAddress : inputCurrency.address);
    candidatesParams.set("tokenOut", outputCurrency.isNative ? nativeAddress : outputCurrency.address);
    candidatesParams.set("pathDeep", "3");
    candidatesParams.set("slippage", slippage);
    candidatesParams.set("poolSafeMode", "true");

    let bestTrade: any;
    try {
      const candidatesRes = await fetch(`${this.HOST}/findPath?` + candidatesParams.toString());
      const candidatesResJson = await candidatesRes.json();
      bestTrade = candidatesResJson.result_data;
    } catch (err: any) {
      console.log('get bestTrade failed: %o', err);
    }

    if (!bestTrade) {
      return {
        outputCurrencyAmount: "",
        noPair: true
      };
    }

    const provider = new providers.JsonRpcProvider(
      chains[inputCurrency.chainId].rpcUrls[0]
    );
    const RouterContract = new Contract(
      this.ROUTER[inputCurrency.chainId],
      oneclickAbi,
      provider.getSigner(account)
    );

    const _amountOut = BigNumber(bestTrade.amount_out)
      .multipliedBy(1 - slippage)
      .toFixed(0);
    const _minAmountOut = bestTrade.routes.reduce((acc: any, route: any) => {
      return acc.plus(route.min_amount_out);
    }, BigNumber(0));

    // 2mins
    const deadline = Date.now() + 120 * 1000;

    const swapPathParams = {
      deadline: deadline,
      min_amount_out: _minAmountOut,
      ...bestTrade,
      chain_id: this.chainId,
      referral: "0x760AfE86e5de5fa0Ee542fc7B7B713e1c5425701",
      in_eth: inputCurrency.isNative ? 1 : 0,
      out_eth: outputCurrency.isNative ? 1 : 0,
    };

    let tx: any;
    let swapPathGasLimit: any;
    try {
      const swapPathRes = await fetch(`${this.HOST}/swapPath`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(swapPathParams),
      });
      const swapPathResJson = await swapPathRes.json();
      tx = swapPathResJson.data;
      swapPathGasLimit = swapPathResJson.gas_limit;
    } catch (err: any) {
      console.log('get swap path failed: %o', err);
    }

    if (!tx) {
      return {
        outputCurrencyAmount: "",
        noPair: true
      };
    }

    const contractOptions: any = {};
    const contractParams = ["0x" + tx];
    if (inputCurrency.isNative) {
      contractOptions.value = _inputAmount;
    }

    let estimateGas;
    try {
      estimateGas = await RouterContract.estimateGas.swap(
        ...contractParams,
        contractOptions
      );
    } catch (err) {
      console.log('estimate gas failed: %o', err);
    }

    const txn = await RouterContract.populateTransaction.swap(...contractParams, {
      ...contractOptions,
      gasLimit: estimateGas
    });

    return {
      outputCurrencyAmount: BigNumber(bestTrade.amount_out || 0).div(10 ** outputCurrency.decimals).toFixed(outputCurrency.decimals).replace(/\.?0+$/, ""),
      noPair: false,
      routerAddress: this.ROUTER[inputCurrency.chainId],
      routes: bestTrade.routes,
      txn,
    };
  }
}
