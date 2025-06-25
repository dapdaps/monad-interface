import Big from "big.js";
import { useCallback, useRef, useState } from "react";
import weth from "@/configs/contract/weth";
import useAccount from "@/hooks/use-account";
import useAddAction from "@/hooks/use-add-action";
import useToast from "@/hooks/use-toast";
import { useSettingsStore } from "@/stores/settings";
import checkGas from "./checkGas";
import formatTrade from "./formatTrade";
import getWrapOrUnwrapTx from "./getWrapOrUnwrapTx";
import quoter from "@/sdk/smart-router";
import { ethers } from "ethers";
import dayjs from "dayjs";
import { AllowanceProvider, MaxAllowanceTransferAmount, PermitSingle, AllowanceTransfer } from "@uniswap/Permit2-sdk";

export default function useTrade({ chainId, template, from, onSuccess }: any) {
  const slippage: any = useSettingsStore((store: any) => store.slippage);
  const [loading, setLoading] = useState(false);
  const [trade, setTrade] = useState<any>();
  const { account, provider } = useAccount();
  const toast = useToast();
  const { addAction } = useAddAction(from || "dapp");
  const lastestCachedKey = useRef("");
  const cachedTokens = useRef<any>();
  const prices = {};

  const onQuoter = useCallback(
    async ({ inputCurrency, outputCurrency, inputCurrencyAmount }: any) => {
      setTrade(null);
      if (
        !inputCurrency ||
        !outputCurrency ||
        !inputCurrencyAmount ||
        !provider ||
        !account
      ) {
        return;
      }
      const wethAddress = weth[inputCurrency.chainId];

      const wrapType =
        inputCurrency.isNative &&
          outputCurrency.address.toLowerCase() === wethAddress.toLowerCase()
          ? 1
          : inputCurrency.address.toLowerCase() === wethAddress.toLowerCase() &&
            outputCurrency.isNative
            ? 2
            : 0;

      const amount = Big(inputCurrencyAmount)
        .mul(10 ** inputCurrency.decimals)
        .toString();
      lastestCachedKey.current = `${inputCurrency.address}-${outputCurrency.address}-${inputCurrencyAmount}`;

      try {
        setLoading(true);

        const rawBalance = await provider.getBalance(account);
        const gasPrice = await provider.getGasPrice();

        if (wrapType) {
          const signer = provider.getSigner(account);
          const { txn, gasLimit } = await getWrapOrUnwrapTx({
            signer,
            wethAddress,
            type: wrapType,
            amount
          });

          const { isGasEnough, gas } = checkGas({
            rawBalance,
            gasPrice,
            gasLimit
          });

          setTrade({
            inputCurrency,
            inputCurrencyAmount,
            outputCurrency,
            outputCurrencyAmount: inputCurrencyAmount,
            noPair: false,
            txn,
            routerAddress: wethAddress,
            gas,
            isGasEnough,
            wrapType,
          });
          setLoading(false);

          return;
        }

        const params: any = {
          inputCurrency,
          outputCurrency,
          inputAmount: inputCurrencyAmount,
          slippage: slippage / 100 || 0.005,
          account
        };

        if (typeof template === "string") {
          params.template = template;
        } else {
          params.templates = template;
        }
        const data = await quoter(params);

        if (!data) {
          throw new Error("No Data.");
        }
        setLoading(false);
        if (
          `${inputCurrency.address}-${outputCurrency.address}-${inputCurrencyAmount}` !==
          lastestCachedKey.current
        )
          return;
        if (typeof template === "string") {
          const _trade = {
            ...formatTrade({
              market: { ...data, template },
              rawBalance,
              gasPrice,
              prices,
              inputCurrency,
              outputCurrency,
              inputCurrencyAmount
            })
          };
          console.log(125, _trade);
          setTrade(_trade);
          return;
        }

        const _markets = data
          .filter((item: any) => Big(item.outputCurrencyAmount || 0).gt(0))
          .sort(
            (a: any, b: any) => b.outputCurrencyAmount - a.outputCurrencyAmount
          )
          .map((item: any) => {
            return formatTrade({
              market: item,
              rawBalance,
              gasPrice,
              prices,
              inputCurrency,
              outputCurrency,
              inputCurrencyAmount
            });
          });
        setTrade(_markets[0]);
      } catch (err) {
        console.log(err);
        setTrade(null);
        setLoading(false);
      }
    },
    [account, provider, slippage, prices, cachedTokens]
  );

  const onSwap = useCallback(async () => {
    if (!provider) return;
    const signer = provider.getSigner(account);
    const wethAddress = weth[trade.inputCurrency.chainId];
    setLoading(true);
    let toastId = toast.loading({ title: "Confirming..." });

    try {
      let tx: any;
      if (template === "Pancake" && !trade.wrapType) {
        tx = await onSwapUniversal({ signer, toastId });
      } else {
        tx = await signer.sendTransaction(trade.txn);
      }
      toast.dismiss(toastId);
      toastId = toast.loading({ title: "Pending...", tx: tx.hash, chainId });
      const { status, transactionHash } = await tx.wait();
      setLoading(false);
      toast.dismiss(toastId);

      if (status === 1) {
        toast.success({
          title: `Swap Successful!`,
          tx: transactionHash,
          chainId
        });
        onSuccess?.();
      } else {
        toast.fail({ title: `Swap failed!` });
      }
      addAction({
        type: "Swap",
        inputCurrencyAmount: trade.inputCurrencyAmount,
        inputCurrency: trade.inputCurrency,
        outputCurrencyAmount: trade.outputCurrencyAmount,
        outputCurrency: trade.outputCurrency,
        template:
          wethAddress === trade.routerAddress ? "Wrap and Unwrap" : trade.name,
        status,
        transactionHash,
        add: 0,
        token_in_currency: trade.inputCurrency,
        token_out_currency: trade.outputCurrency
      });
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.fail({
        title: err?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : `Swap failed!`
      });
      console.log(err);
      setLoading(false);
    }
  }, [account, provider, trade]);

  const onSwapUniversal = useCallback(async ({ signer, toastId }: any) => {
    const PERMIT_EXPIRATION = 30; // days
    const PERMIT_SIG_EXPIRATION = 30; // mins
    const ABI = [
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "commands",
            "type": "bytes"
          },
          {
            "internalType": "bytes[]",
            "name": "inputs",
            "type": "bytes[]"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          }
        ],
        "name": "execute",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
    ];
    const { version, routerAddress, inputCurrency, outputCurrency, inputCurrencyAmount, outputCurrencyAmount } = trade;
    const parsedInputCurrencyAmount = ethers.utils.parseUnits(inputCurrencyAmount, inputCurrency.decimals);
    const parsedOutputCurrencyAmount = ethers.utils.parseUnits(outputCurrencyAmount, outputCurrency.decimals);
    const wrapRecipient = "0x0000000000000000000000000000000000000002";
    const outputRecipient = outputCurrency.isNative ? wrapRecipient : account;
    const contract = new ethers.Contract(routerAddress, ABI, signer);
    let commands = "0x";
    const inputs: any = [];
    if (inputCurrency.isNative) {
      commands += "0b"; // WRAP_ETH
      inputs.push(
        ethers.utils.defaultAbiCoder.encode(
          ["address", "uint256"],
          [
            // The recipient of the WETH
            wrapRecipient,
            // The amount of ETH to wrap
            parsedInputCurrencyAmount
          ]
        )
      );
    } else {

      const permit2Address = "0xC51DA9473283695884AD536FFD180e618Bf6186e";
      const allowanceProvider = new AllowanceProvider(provider, permit2Address)
      const { amount: permitAmount, expiration, nonce } = await allowanceProvider.getAllowanceData(inputCurrency.address, account, routerAddress);

      if (
        !permitAmount
        || Big(permitAmount.toString()).lt(parsedInputCurrencyAmount.toString())
        || !expiration
        || dayjs().isAfter(dayjs(expiration * 1000))
      ) {
        let signature = "";
        const permitSingle: PermitSingle = {
          details: {
            token: inputCurrency.address,
            amount: MaxAllowanceTransferAmount,
            // You may set your own deadline - we use 30 days.
            expiration: dayjs().add(PERMIT_EXPIRATION, 'days').unix(),
            nonce,
          },
          spender: routerAddress,
          // You may set your own deadline - we use 30 minutes.
          sigDeadline: dayjs().add(PERMIT_SIG_EXPIRATION, 'minutes').unix(),
        };
        const { domain, types, values } = AllowanceTransfer.getPermitData(permitSingle, permit2Address, chainId);
        try {
          // We use an ethers signer to sign this data:
          signature = await signer._signTypedData(domain, types, values);
        } catch (err: any) {
          console.log('getPermitData err: %o', err);
        }
        if (!signature) {
          throw new Error("Signature failed!");
        }
        commands += "0a"; // PERMIT2_PERMIT
        inputs.push(
          ethers.utils.defaultAbiCoder.encode(
            [
              "tuple(tuple(address token, uint256 amount, uint256 expiration, uint256 nonce) details, address spender, uint256 sigDeadline)",
              "bytes",
            ],
            [permitSingle, signature]
          )
        );
      }
    }

    const pathV3: any = [[], []];
    const pathV2: any = [];
    if (trade.routes.length > 1) {
      trade.routes.forEach((route: any, idx: number) => {
        const isFirstRoute = idx === 0;
        const isLastRoute = idx === trade.routes.length - 1;
        if (isFirstRoute) {
          const firstAddress = route.token0.address;
          // token0
          pathV3[0].push("address");
          pathV3[0].push("uint24");
          pathV3[1].push(firstAddress);
          pathV3[1].push(route.fee);
          pathV2.push(firstAddress);
          return;
        }
        // middle route
        pathV3[0].push("address");
        pathV3[0].push("uint24");
        pathV3[1].push(route.token0.address);
        pathV3[1].push(route.fee);
        pathV2.push(route.token0.address);

        if (isLastRoute) {
          const lastAddress = route.token1.address;
          pathV3[0].push("address");
          pathV3[1].push(lastAddress);
          pathV2.push(lastAddress);
        }
      });
    } else {
      const firstAddress = trade.routes[0].token0.address;
      const lastAddress = trade.routes[0].token1.address;
      // token0
      pathV3[0].push("address");
      pathV3[0].push("uint24");
      pathV3[1].push(firstAddress);
      pathV3[1].push(trade.routes[0].fee);
      pathV2.push(firstAddress);
      // token1
      pathV3[0].push("address");
      pathV3[1].push(lastAddress);
      pathV2.push(lastAddress);
    }


    if (version === "v3") {
      commands += "00"; // V3_SWAP_EXACT_IN
      inputs.push(
        ethers.utils.defaultAbiCoder.encode(
          ["address", "uint256", "uint256", "bytes", "bool"],
          [
            // The recipient of the output of the trade
            outputRecipient,
            // The amount of input tokens for the trade
            parsedInputCurrencyAmount,
            // The minimum amount of output tokens the user wants
            parsedOutputCurrencyAmount,
            // The UniswapV3 encoded path to trade along
            ethers.utils.solidityPack(pathV3[0], pathV3[1]),
            // Whether the input tokens should come from the msg.sender (through Permit2)
            !inputCurrency.isNative
          ]
        )
      );
    } else {
      commands += "08"; // V2_SWAP_EXACT_IN
      inputs.push(
        ethers.utils.defaultAbiCoder.encode(
          ["address", "uint256", "uint256", "address[]", "bool"],
          [
            // The recipient of the output of the trade
            outputRecipient,
            // The amount of input tokens for the trade
            parsedInputCurrencyAmount,
            // The minimum amount of output tokens the user wants
            parsedOutputCurrencyAmount,
            // The UniswapV2 token path to trade along
            pathV2,
            // Whether the input tokens should come from the msg.sender (through Permit2)
            !inputCurrency.isNative
          ]
        )
      );
    }
    if (outputCurrency.isNative) {
      commands += "0c"; // UNWRAP_WETH
      inputs.push(
        ethers.utils.defaultAbiCoder.encode(
          ["address", "uint256"],
          [
            account,
            ethers.utils.parseUnits(outputCurrencyAmount, outputCurrency.decimals),
          ]
        )
      );
    }
    // deadline +20min
    const deadline = dayjs().add(20, 'minutes').unix();

    const options: any = {};

    if (inputCurrency.isNative) {
      options.value = parsedInputCurrencyAmount;
    }

    try {
      const gas = await contract.estimateGas.execute(commands, inputs, deadline, options);
      options.gasLimit = gas;
    } catch (err: any) {
      options.gasLimit = 4000000;
      console.log('estimateGas err: %o', err);
    }

    return contract.execute(commands, inputs, deadline, options);
  }, [account, provider, trade]);

  return { loading, trade, onQuoter, onSwap };
}
