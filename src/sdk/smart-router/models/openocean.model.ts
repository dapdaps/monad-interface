import BigNumber from "bignumber.js";
import { OpenOcean as OpenOceanLib } from "../libs/openocean.lib";

export class OpenOcean {
  private openocean: OpenOceanLib;
  constructor(chainId: number) {
    this.openocean = new OpenOceanLib({
      referrer: "0x44376f8F52407ed66E6D3356535410A7DCd4652B",
      enabledDexIds: "",
      connectors: ""
    });
  }
  public async quoter({
    inputCurrency,
    outputCurrency,
    inputAmount,
    slippage,
    account
  }: any) {
    const openoceanData = await this.getOpenocean({
      inputAmount: new BigNumber(inputAmount)
        .multipliedBy(10 ** inputCurrency.decimals)
        .toFixed(0),
      inputCurrency,
      outputCurrency,
      slippage,
      account
    });

    let bestTrade = openoceanData;

    if (!bestTrade) {
      return {
        outputCurrencyAmount: "",
        noPair: true
      };
    }

    return bestTrade;
  }
  private async getOpenocean({
    inputAmount,
    inputCurrency,
    outputCurrency,
    slippage,
    account
  }: any) {
    try {
      const data = await this.openocean.quote({
        inputAmount,
        inputCurrency,
        outputCurrency,
        slippage,
        account
      });
      return data;
    } catch (err) {
      return null;
    }
  }
}
