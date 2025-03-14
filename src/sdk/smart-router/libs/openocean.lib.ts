import axios from "axios";
import BigNumber from "bignumber.js";
import formatRoutes from "../utils/format-routes";

type OpenOceanProps = {
  referrer: string;
  enabledDexIds: string;
  connectors: string;
};

export class OpenOcean {
  private QUOTER_PATH: { [key: number]: string } = {
    10143: "https://ethapi.openocean.finance/v2/10143/quote"
  };
  private SWAP_QUOTER_PATH: { [key: number]: string } = {
    10143: "https://ethapi.openocean.finance/v2/10143/swap"
  };
  private options: OpenOceanProps;
  private baseParams: string = "";

  private getTokenAddress(token: any) {
    return token.isNative
      ? "0x0000000000000000000000000000000000000000"
      : token.address;
  }

  constructor(options: OpenOceanProps) {
    this.options = options;
  }

  public async getRoutes({ inputCurrency, outputCurrency }: any) {
    if (!this.baseParams) return [];
    const quoterPath = this.QUOTER_PATH[inputCurrency.chainId];
    const quoterResult = await axios.get(`${quoterPath}?${this.baseParams}`);
    const data = quoterResult.data?.data?.path.routes;

    if (!data) return [];

    const routes: any = [];

    const loop = async (route: any) => {
      const tokenAddresses: { [key: string]: boolean } = {};
      route.subRoutes?.forEach((route: any) => {
        tokenAddresses[route.from] = true;
        tokenAddresses[route.to] = true;
      });
      const subRoutes = await formatRoutes({
        tokenAddresses: Object.keys(tokenAddresses),
        inputCurrency,
        outputCurrency
      });

      routes.push({
        percentage: route.percentage,
        routes: subRoutes
      });
      if (data.length) {
        loop(data.pop());
      }
    };

    await loop(data.pop());

    return routes;
  }

  public async quote({
    inputAmount,
    inputCurrency,
    outputCurrency,
    slippage,
    account
  }: any) {
    const swapQuoterPath = this.SWAP_QUOTER_PATH[inputCurrency.chainId];

    this.baseParams = `inTokenSymbol=${
      inputCurrency.symbol
    }&inTokenAddress=${this.getTokenAddress(inputCurrency)}&outTokenSymbol=${
      outputCurrency.symbol
    }&outTokenAddress=${this.getTokenAddress(
      outputCurrency
    )}&amount=${inputAmount}&gasPrice=52000000000&disabledDexIds=&slippage=${
      1 * 100
    }&account=${account}&referrer=${this.options.referrer}&flags=0`;

    const swapQuoterResult = await axios.get(
      `${swapQuoterPath}?${this.baseParams}&account=${account}`
    );

    const swapData = swapQuoterResult?.data;

    if (!swapData) {
      return {
        outputAmount: ""
      };
    }

    return {
      outputCurrencyAmount: new BigNumber(swapData.outAmount)
        .div(10 ** outputCurrency.decimals)
        .toFixed(outputCurrency.decimals),
      gas: swapData.estimatedGas,
      routerAddress: swapData.to,
      noPair: false,
      txn: {
        to: swapData.to,
        data: swapData.data,
        value: swapData.value,
        gasLimit: new BigNumber(swapData.estimatedGas)
          .multipliedBy(1.2)
          .toFixed(0)
      }
    };
  }
}
