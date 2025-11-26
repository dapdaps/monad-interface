import { Contract, providers } from "ethers";
import weth from "../config/weth";
import BigNumber from "bignumber.js";
import chains from "../config/chains";
import { BigNumber as EthersBigNumber } from 'ethers';

import { Context, ZERO, ZERO_ADDRESS } from '@derivation-tech/context';
import { DefaultEthGasEstimator, txPlugin } from '@derivation-tech/tx-plugin';
import { aggregatorPlugin, CONFIG_ADDRESS, QUERY_SINGLE_ROUTE_ADDRESS, QUERY_SPLIT_ROUTE_ADDRESS, OYSTER_AGGREGATOR_ADDRESS } from '@synfutures/sdks-aggregator';
import { parseUnits } from "ethers/lib/utils";
import Big from "big.js";
import { monadTestnet } from "viem/chains";
import { getRpcUrl } from "../utils";

CONFIG_ADDRESS[monadTestnet.id] = '0x619fae164701e536Be8e1D3A6aaEf35DC7A40fc7'
QUERY_SINGLE_ROUTE_ADDRESS[monadTestnet.id] = '0xB03bB95FAA5DC18D66FAd10A38529f1430bd32e0'
QUERY_SPLIT_ROUTE_ADDRESS[monadTestnet.id] = '0x7a7278dd84B5E63Ada2a4cE3F846b2FF66Fd3cf7'
OYSTER_AGGREGATOR_ADDRESS[monadTestnet.id] = '0xEf8DD29d887EcD977064Ce169366C95d53926B13'

const FEE_RATE = 10;
const FEE_RECIPIENT = "0xf9f2384fee12a3e31b3d61a262df9baa6b4e8a13";
export class MondayTrade {
  private chainId: number;
  private wrappedNativeAddress: string;
  private ROUTER: { [key: number]: string } = {

  };
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

    const ctx = new Context(this.chainId, { url: getRpcUrl(this.chainId) });
    ctx.use(aggregatorPlugin());
    ctx.use(txPlugin({ gasEstimator: new DefaultEthGasEstimator() }));


    await ctx.init();

    const inputToken = await ctx.getTokenInfo(inputCurrency.isNative ? '0x0000000000000000000000000000000000000000' : inputCurrency.address);

    const outputToken = await ctx.getTokenInfo(outputCurrency.isNative ? '0x0000000000000000000000000000000000000000' : outputCurrency.address);

    const bestTrade: any = {
      amount_out: 0,
      routes: [],
      txn: null,
    }

    try {
      const result = await ctx.aggregator.querySplitRoute({
        fromTokenAddress: inputToken.address,
        toTokenAddress: outputToken.address,
        fromAmount: parseUnits(inputAmount, inputToken.decimals),
        excludePoolTypes: [],
        isDirect: false,
      });

      bestTrade.txn = async ({ signer }: any) => {
        const tx = await ctx.aggregator.multiSwap(
          {
            fromTokenAddress: inputToken.address,
            fromTokenAmount: parseUnits(inputAmount, inputToken.decimals),
            toTokenAddress: outputToken.address,
            bestPathInfo: result.bestPathInfo,
            bestAmount: result.bestAmount,
            slippageInBps: Math.ceil(slippage) * 100,
            // broker: FEE_RECIPIENT,
            // brokerFeeRate: EthersBigNumber.from(FEE_RATE),
            broker: ZERO_ADDRESS,
            brokerFeeRate: ZERO,
            deadline: Date.now() + 120 * 1000,
          },
          { signer },
        );
        return tx;
      }


      bestTrade.amount_out = result.bestAmount.toString();
    } catch (error) {
      console.log('MondayTrade error', error);
    }

    return {
      outputCurrencyAmount: BigNumber(bestTrade.amount_out || 0).div(10 ** outputCurrency.decimals).toFixed(outputCurrency.decimals).replace(/\.?0+$/, ""),
      noPair: false,
      routerAddress: OYSTER_AGGREGATOR_ADDRESS[this.chainId],
      routes: bestTrade.routes,
      // fee: {
      //   fee: Number(bestTrade.amount_out) * (Number(FEE_RATE) / 10000),
      //   token: outputCurrency,
      //   feeRate: (Number(FEE_RATE) / 10000).toString()
      // },
      fee: null,
      txn: bestTrade.txn,
    };
  }
}
