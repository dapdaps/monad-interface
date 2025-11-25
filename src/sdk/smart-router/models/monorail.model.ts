import { Contract, providers } from "ethers";
import weth from "../config/weth";
import BigNumber from "bignumber.js";
import chains from "../config/chains";

const FEE_RATE = 10;
const FEE_RECIPIENT = "0xf9f2384fee12a3e31b3d61a262df9baa6b4e8a13";

export class Monorail {
  private chainId: number;
  private wrappedNativeAddress: string;
  private ROUTER: { [key: number]: string } = {

  };
  private HOST = "https://pathfinder.monorail.xyz/v4";

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

    const nativeAddress = "0x0000000000000000000000000000000000000000";
    const inputCurrencyAddress = inputCurrency.isNative ? nativeAddress : inputCurrency.address.toLowerCase();
    const outputCurrencyAddress = outputCurrency.isNative ? nativeAddress : outputCurrency.address.toLowerCase();

    const slippageBps = typeof slippage === 'number'
      ? Math.round(slippage * 10000)
      : parseInt(slippage) || 300;

    const deadline = 180;

    const quoteParams = new URLSearchParams();
    quoteParams.set("amount", inputAmount.toString());
    quoteParams.set("from", inputCurrencyAddress);
    quoteParams.set("to", outputCurrencyAddress);
    quoteParams.set("slippage", slippageBps.toString());
    quoteParams.set("deadline", deadline.toString());
    quoteParams.set("source", "1176155310268")
    if (account) {
      quoteParams.set("sender", account);
    }

    let quoteResponse: any;
    try {
      const quoteRes = await fetch(`${this.HOST}/quote?` + quoteParams.toString());
      quoteResponse = await quoteRes.json();
    } catch (err: any) {
      console.log('get monorail quote failed: %o', err);
      return {
        outputCurrencyAmount: "",
        noPair: true
      };
    }

    if (!quoteResponse || !quoteResponse.output) {
      return {
        outputCurrencyAmount: "",
        noPair: true
      };
    }

    const outputAmount = BigNumber(quoteResponse.output || 0)
      .div(10 ** outputCurrency.decimals)
      .toFixed(outputCurrency.decimals)
      .replace(/\.?0+$/, "");

    if (BigNumber(quoteResponse.output || 0).lte(0)) {
      return {
        outputCurrencyAmount: "",
        noPair: true
      };
    }

    const transaction = quoteResponse.transaction || {};
    const txn: any = {
      to: transaction.to,
      data: transaction.data || "0x",
      value: transaction.value,
      gasLimit: BigNumber(2100000).multipliedBy(1.2).toFixed(0),
      // gasLimit: quoteResponse.gas_estimate ? BigNumber(quoteResponse.gas_estimate).toString() : undefined,
    };

    const provider = new providers.JsonRpcProvider(
      chains[inputCurrency.chainId].rpcUrls[0]
    );

    let gasEstimate: any = null
    // try {
    //   gasEstimate = await provider.getSigner(account).estimateGas(txn);

    //   if (gasEstimate) {
    //     // txn.gasLimit = BigNumber(gasEstimate).multipliedBy(1.2).toFixed(0);
    //   }

    // } catch (err) {
    //   console.log('estimateGas err: %o', err);
    // }


    return {
      outputCurrencyAmount: outputAmount,
      noPair: false,
      routerAddress: transaction.to,
      routes: quoteResponse.routes || [],
      // fee: quoteResponse.fees?.protocol_amount_formatted 
      //   ? {
      //       fee: quoteResponse.fees.protocol_amount_formatted,
      //       token: outputCurrency,
      //       feeRate: quoteResponse.fees.protocol_bps ? (Number(quoteResponse.fees.protocol_bps) / 10000).toString() : "0"
      //     }
      //   : null,
      fee: null,
      txn,
      gasEstimate,
      priceImpact: quoteResponse.compound_impact ? (Number(quoteResponse.compound_impact) * 100).toString() : undefined,
    };
  }
}
