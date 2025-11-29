import { Contract, providers } from "ethers";
import weth from "../config/weth";
import BigNumber from "bignumber.js";
import chains from "../config/chains";
import oneclickAbi from "../config/abi/oneclick";
import { getRpcUrl } from "../utils";
import { getTokenInfo } from "../utils/token";

const FEE_RATE = 10;
const FEE_RECIPIENT = "0xf9f2384fee12a3e31b3d61a262df9baa6b4e8a13";

const DEX_ID_MAP = {
    "1": {
        name: "UniswapV2",
        logo: "/images/dapps/icons/uniswap.png"
    },
    "2": {
        name: "UniswapV3",
        logo: "/images/dapps/icons/uniswap.png"
    },
    "3": {
        name: "PancakeV2",
        logo: "/images/dapps/icons/Pancake.svg"
    },
    "4": {
        name: "PancakeV3",
        logo: "/images/dapps/icons/Pancake.svg"
    },
    "8": {
        name: "Kuru",
        logo: "/images/dapps/icons/kuru.svg"
    },
    "10": {
      name: "CapricornV3",
      logo: "/images/mainnet/capricorn2.png"
    },
    "11": {
      name: "Dyorswapv2",
      logo: "/images/mainnet/dyorswap.ico"
    }
}
export class OneClick {
  private chainId: number;
  private wrappedNativeAddress: string;
  private ROUTER: { [key: number]: string } = {
    // 10143: "0xc26484D2ce20e31e363e2f27782B4E9718fF918a",
    10143: "0x92493D26DDe5Edbd1660e0f49f1dd853B9623f80",
    // 143: "0x3Ff9bE8f6EE484E44659e05bE52969AA85DBAEB5",
    // 143: '0x592FeB6B3dAE615fa15636f8a839E8d25FECE630'
    143: '0x5fE80A45EE559B30f9EC1C8092247DF61c0a0a97'
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
      account,
      extendParams
    } = params;

    // 5%
    // const slippage: any = 0.05;

    const nativeAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    const _inputAmount = BigNumber(inputAmount)
      .multipliedBy(10 ** (inputCurrency.decimals || 18))
      .toFixed(0);
    const inputCurrencyAddress = inputCurrency.address.toLowerCase();
    const outputCurrencyAddress = outputCurrency.address.toLowerCase();


    const candidatesParams = new URLSearchParams();
    candidatesParams.set("chainId", this.chainId + "");
    candidatesParams.set("amountIn", _inputAmount);
    candidatesParams.set("tokenIn", inputCurrency.isNative ? nativeAddress : inputCurrencyAddress);
    candidatesParams.set("tokenOut", outputCurrency.isNative ? nativeAddress : outputCurrencyAddress);
    candidatesParams.set("pathDeep", "3");
    candidatesParams.set("slippage", slippage);
    candidatesParams.set("poolSafeMode", "true");
    candidatesParams.set("maxTickCount", "10");
    // candidatesParams.set("appFeeRate", FEE_RATE.toString());
    // candidatesParams.set("appFeeRecipient", FEE_RECIPIENT);
    if (extendParams && extendParams.fee) {
      candidatesParams.set("appFeeRate", extendParams.fee.toString());
      candidatesParams.set("appFeeRecipient", extendParams.feeRecipient);
    }

    let bestTrade: any;
    try {
      const candidatesRes = await fetch(`${this.HOST}/findPath?` + candidatesParams.toString());
      const candidatesResJson = await candidatesRes.json();
      if (candidatesResJson.result_code === 0) {
        bestTrade = candidatesResJson.result_data;
      }
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
      getRpcUrl(inputCurrency.chainId)
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
      // chainId: this.chainId,
      // app_fee_rate: FEE_RATE,
      // app_fee_recipient: FEE_RECIPIENT,
      // appFeeRate: FEE_RATE,
      // appFeeRecipient: FEE_RECIPIENT,
      // referral: "0x760AfE86e5de5fa0Ee542fc7B7B713e1c5425701",
      in_eth: inputCurrency.isNative ? 1 : 0,
      out_eth: outputCurrency.isNative ? 1 : 0,
    };
    if (extendParams && extendParams.fee) {
      swapPathParams.app_fee_rate = Number(extendParams.fee);
      swapPathParams.app_fee_recipient = extendParams.feeRecipient;

      swapPathParams.appFeeRate = extendParams.fee.toString();
      swapPathParams.appFeeRecipient = extendParams.feeRecipient;
    }

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

    if (BigNumber(bestTrade.amount_out || 0).lte(0)) {
      return {
        outputCurrencyAmount: "",
        noPair: true
      };
    }

    const { routes } = bestTrade;

    const tokenAddresses: string[] = []

    const routesFormat = routes.map((route: any) => {
      return {
        percentage: Number(route.amount_in) / Number(bestTrade.amount_in),
        amountIn: route.amount_in,
        pools: route?.pools?.map((pool: any) => {
          tokenAddresses.push(pool.token_in.toLowerCase())
          tokenAddresses.push(pool.token_out.toLowerCase())
          return {
            dexId: pool.dex_id,
            dex: DEX_ID_MAP[pool.dex_id as keyof typeof DEX_ID_MAP],
            amountIn: pool.amount_in,
            tokenIn: pool.token_in,
            tokenOut: pool.token_out,
          }
        }),
      }
    })

    const seen = new Set<string>();
    const uniqueTokenAddresses = tokenAddresses.filter(addr => {
      const lowerAddr = addr.toLowerCase();
      if (seen.has(lowerAddr)) {
        return false;
      }
      seen.add(lowerAddr);
      return true;
    });
    tokenAddresses.length = 0;
    tokenAddresses.push(...uniqueTokenAddresses);

    const tokenInfo = await getTokenInfo(tokenAddresses);

    routesFormat.forEach((route: any) => {
      route.pools.forEach((pool: any) => {
        pool.tokenInInfo = tokenInfo[pool.tokenIn.toLowerCase()];
        pool.tokenOutInfo = tokenInfo[pool.tokenOut.toLowerCase()];
      });
    });

    return {
      outputCurrencyAmount: BigNumber(bestTrade.amount_out || 0).div(10 ** outputCurrency.decimals).toFixed(outputCurrency.decimals).replace(/\.?0+$/, ""),
      noPair: false,
      routerAddress: this.ROUTER[inputCurrency.chainId],
      routes: routesFormat,
      // fee: {
      //   fee: Number(bestTrade.amount_out_no_fee) - Number(bestTrade.amount_out),
      //   token: outputCurrency,
      //   feeRate: (Number(FEE_RATE) / 10000).toString()
      // },
      fee: null,
      txn,
    };
  }
}
