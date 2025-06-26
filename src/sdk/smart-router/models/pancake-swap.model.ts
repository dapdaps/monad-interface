import BigNumber from "bignumber.js";
import { utils, providers, Contract } from "ethers";
import { V3 } from "../libs/v3.lib";
import { V2 } from "../libs/v2.lib";
import chains from "../config/chains";
import routerV3Abi from "../config/abi/router-v3-2";
import routerV2Abi from "../config/abi/router-v2-1";
import weth from "../config/weth";
import { uniq } from "lodash";

class UniversalV2 extends V2 {
  private pools: CandidatePool[];

  constructor(params: any) {
    super(params);
    this.pools = params.pools || [];
  }

  protected async getPools() {
    const v2pools = this.pools.filter((pool: any) => pool.type === 0);
    return v2pools.map((pool) => {
      const isReserved = pool.reserve0.currency.address.toLowerCase() > pool.reserve1.currency.address.toLowerCase();
      const tokenA = {
        ...pool.reserve0.currency,
        address: pool.reserve0.currency.address.toLocaleLowerCase(),
      };
      const tokenB = {
        ...pool.reserve1.currency,
        address: pool.reserve1.currency.address.toLocaleLowerCase(),
      };
      return {
        ...pool,
        isReserved,
        reserve0: BigNumber(pool.reserve0.value),
        reserve1: BigNumber(pool.reserve1.value),
        tokenA,
        tokenB,
      };
    });
  }
}

class UniversalV3 extends V3 {
  private pools: CandidatePool[];

  constructor(params: any) {
    super(params);
    this.pools = params.pools || [];
  }

  protected async getPools() {
    const v3pools = this.pools.filter((pool: any) => pool.type === 1);
    return v3pools.map((pool) => {
      const isReserved = pool.reserve0.currency.address.toLowerCase() > pool.reserve1.currency.address.toLowerCase();
      const tokenA = {
        ...pool.reserve0.currency,
        address: pool.reserve0.currency.address.toLocaleLowerCase(),
      };
      const tokenB = {
        ...pool.reserve1.currency,
        address: pool.reserve1.currency.address.toLocaleLowerCase(),
      };
      return {
        ...pool,
        isReserved,
        tokenA,
        tokenB,
        price: this.getPriceByTick({
          tokenA,
          tokenB,
          isReserved: isReserved,
          tick: pool.tick
        })
      };
    });
  }
}

export class PancakeSwap {
  private v3: V3;
  private v2: V2;

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
  private V2_ROUTER: { [key: number]: string } = {
    10143: "0x3a3eBAe0Eec80852FBC7B9E824C6756969cc8dc1"
  };
  private V2_FACTORY: { [key: number]: string } = {
    10143: "0x82438CE666d9403e488bA720c7424434e8Aa47CD"
  };
  constructor(chainId: number) {
    this.v3 = new V3({
      fees: this.FEES[chainId],
      chainId,
      factoryAddress: this.FACTORY[chainId],
      quoterAddress: this.QUOTER[chainId],
      midTokens: this.MID_TOKENS[chainId]
    });

    this.v2 = new V2({
      midTokens: [],
      factoryAddress: this.V2_FACTORY[chainId],
      computablePairAddress: false,
      hasStable: false,
      includeStable: false,
      amountOutType: 2,
      feeIn: true
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
    const [bestTradeV3, bestTradeV2] = await Promise.all([
      this.v3.bestTrade({
        inputCurrency,
        outputCurrency,
        inputAmount: _amount
      }),
      this.v2.bestTrade({
        inputCurrency,
        outputCurrency,
        inputAmount: BigNumber(inputAmount).multipliedBy(
          10 ** inputCurrency.decimals
        )
      })
    ]);

    let bestTrade = bestTradeV3;
    let routerAddress = this.ROUTER[inputCurrency.chainId];
    let type = "v3";

    if (BigNumber(bestTrade?.amountOut).lt(bestTradeV2?.amountOut)) {
      bestTrade = bestTradeV2;
      routerAddress = this.V2_ROUTER[inputCurrency.chainId];
      type = "v2";
    }

    if (!bestTrade) {
      return {
        outputCurrencyAmount: "",
        noPair: true
      };
    }

    return this[type === "v3" ? "handleV3" : "handleV2"]({
      bestTrade,
      outputCurrency,
      inputCurrency,
      _amount,
      slippage,
      account,
      routerAddress
    });
  }

  private async handleV2({
    bestTrade,
    inputCurrency,
    outputCurrency,
    account,
    _amount,
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

    const provider = new providers.JsonRpcProvider(
      chains[inputCurrency.chainId].rpcUrls[0]
    );
    const RouterContract = new Contract(
      this.ROUTER[inputCurrency.chainId],
      routerV2Abi,
      provider.getSigner(account)
    );

    const _amountOut = BigNumber(bestTrade.amountOut)
      .multipliedBy(1 - slippage)
      .toFixed(0);

    const deadline = Math.ceil(Date.now() / 1000) + 120;
    let method = "";
    const options: any = {};
    const path: string[] = [];

    bestTrade.pairs.forEach((pair: any, i: number) => {
      if (i === 0) {
        path.push(pair.tokenA.address);
        path.push(pair.tokenB.address);
      } else {
        path.push(pair.tokenB.address);
      }
    });

    const params = [_amountOut, path, account, deadline];

    if (inputCurrency.isNative) {
      method = "swapExactETHForTokens";
      options.value = _amount;
    } else if (outputCurrency.isNative) {
      method = "swapExactTokensForETH";
      params.unshift(_amount);
    } else {
      method = "swapExactTokensForTokens";
      params.unshift(_amount);
    }
    let estimateGas;
    try {
      estimateGas = await RouterContract.estimateGas[method](
        ...params,
        options
      );
    } catch (err) {
      // console.log('estimateGas err', err);
    }

    console.log("estimateGas v2", estimateGas?.toString());

    const txn = await RouterContract.populateTransaction[method](...params, {
      ...options,
      gasLimit: estimateGas
        ? BigNumber(estimateGas.toString()).multipliedBy(1.2).toFixed(0)
        : 500000
    });
    return { ...returnData, txn };
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

    const deadline = Math.ceil(Date.now() / 1000) + 120;
    const RouterIface = new utils.Interface(routerV3Abi);
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

    console.log("estimateGas v3", estimateGas?.toString());

    const txn = await multicallContract.populateTransaction.multicall(
      multicallParams,
      {
        ...options,
        gasLimit: estimateGas
          ? BigNumber(estimateGas.toString()).multipliedBy(1.2).toFixed(0)
          : 500000
      }
    );

    return { ...returnData, txn };
  }
}

export class PancakeSwapUniversal extends PancakeSwap {
  private chainId: number;
  private wrappedNativeAddress: string;

  constructor(chainId: number) {
    super(chainId);
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

    const _inputAmount = BigNumber(inputAmount)
      .multipliedBy(10 ** (inputCurrency.decimals || 18))
      .toFixed(0);
    inputCurrency.address = inputCurrency.address.toLowerCase();
    outputCurrency.address = outputCurrency.address.toLowerCase();

    const candidatesURL = new URL("https://pancakeswap.finance/api/pools/candidates");
    candidatesURL.searchParams.set("addressA", this.normalizeAddress(inputCurrency.address));
    candidatesURL.searchParams.set("addressB", this.normalizeAddress(outputCurrency.address));
    candidatesURL.searchParams.set("chainId", this.chainId + "");
    candidatesURL.searchParams.set("protocol", "stable,v2,v3");
    candidatesURL.searchParams.set("type", "light");

    let candidates: CandidatePool[] = [];
    try {
      const candidatesRes = await fetch("/pancakeswap.finance/api/pools/candidates?" + candidatesURL.searchParams.toString());
      const candidatesResJson = await candidatesRes.json();
      candidates = candidatesResJson.data;
    } catch (err: any) {
      console.log('get candidates failed: %o', err);
    }

    if (!candidates.length) {
      return {
        outputCurrencyAmount: "",
        noPair: true
      };
    }

    const {
      bestTrade,
      routerAddress,
      type
    } = await this.findBestRoute(
      inputCurrency,
      outputCurrency,
      candidates,
      _inputAmount,
      slippage,
      account
    );

    if (!bestTrade) {
      return {
        outputCurrencyAmount: "",
        noPair: true
      };
    }

    const handleRes = await this[type === "v3" ? "handleV3" : "handleV2"]({
      bestTrade,
      outputCurrency,
      inputCurrency,
      _amount: _inputAmount,
      slippage,
      account,
      routerAddress
    });

    return {
      ...handleRes,
      routerAddress,
      version: type,
      type: "UniversalRouter",
    };
  }

  private normalizeAddress(addr?: string, isWrapped?: boolean): string {
    if (!addr) return "";
    if (isWrapped) {
      if (addr.toLowerCase() === "0x0000000000000000000000000000000000000000" || addr.toLowerCase() === "native") {
        return this.wrappedNativeAddress;
      }
      return addr.toLowerCase();
    }
    if (addr.toLowerCase() === "native") {
      return "0x0000000000000000000000000000000000000000";
    }
    return addr.toLowerCase();
  }

  private async findBestRoute(inputCurrency: any, outputCurrency: any, pools: CandidatePool[], inputAmount: string, slippage: number, account: string) {
    const universalV2 = new UniversalV2({
      midTokens: [],
      factoryAddress: "",
      computablePairAddress: false,
      hasStable: false,
      includeStable: false,
      amountOutType: 2,
      feeIn: true,
      pools
    });
    const universalV3 = new UniversalV3({
      fees: uniq(pools.map((pool: any) => pool.fee)).sort((a: number, b: number) => a - b),
      chainId: this.chainId,
      factoryAddress: "",
      quoterAddress: "0x74b06eFA24F39C60AA7F61BD516a3eaf39613D57",
      midTokens: [],
      type: true,
      pools
    });

    const [v2Route, v3Route] = await Promise.all([
      universalV2.bestTrade({
        inputCurrency,
        outputCurrency,
        inputAmount,
        // FIXME
        isDirectPath: true
      }),
      universalV3.bestTrade({
        inputCurrency,
        outputCurrency,
        inputAmount,
        // FIXME
        isDirectPath: true
      })
    ]);

    let bestTrade = v3Route;
    const routerAddress = "0x94D220C58A23AE0c2eE29344b00A30D1c2d9F1bc";
    let type = "v3";

    if (BigNumber(bestTrade?.amountOut).lt(v2Route?.amountOut)) {
      bestTrade = v2Route;
      type = "v2";
    }

    return {
      bestTrade,
      routerAddress,
      type,
    };
  }
}

interface CandidateCurrency {
  address: string;
  decimals: number;
  symbol: string;
}

interface CandidateReserve {
  currency: CandidateCurrency;
  value: string;
}

interface CandidateToken {
  address: string;
  decimals: number;
  symbol: string;
}

type CandidateTypeV2 = 0;
type CandidateTypeV3 = 1;
type CandidateType = CandidateTypeV2 | CandidateTypeV3;

interface CandidatePool {
  type: CandidateType;
  address: string;
  reserve0: CandidateReserve;
  reserve1: CandidateReserve;
  token0?: CandidateToken;
  token1?: CandidateToken;
  fee?: number;
  liquidity?: string;
  sqrtRatioX96?: string;
  tick?: number;
  token0ProtocolFee?: string;
  token1ProtocolFee?: string;
}
