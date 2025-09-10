import { utils, providers, ethers } from "ethers";
import { PoolFetcher, PathFinder, TokenSwap } from "@kuru-labs/kuru-sdk";
import BigNumber from "bignumber.js";
import chains from "../config/chains";
import axios from "axios";
import Big from "big.js";

export class Oneclick {
    private Api = "https://api-trade.nadsa.space";
    // private Api = "https://smart.oneclick.run";
    private RouterAddress: Record<string, string> = {
        // 10143: "0x326B7B004a023598A2eaFF7C47C37389bC677d03",
        10143: "0x503be6074f7C48355aA18eAb62Ca135e3d84443f"
    };
    private MID_TOKENS: { [key: number]: any } = {
        10143: []
    };
    private log(str: string, ...restParams: any) {
        console.log(`%cone click ${str}`, "background: #bcf886;", ...restParams);
    }
    constructor(chainId: number) { }
    private getTokenAddress(token: any) {
        return token.isNative
            ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
            : token.address;
    }

    private async getPath({
        inputCurrency,
        outputCurrency,
        inputAmount,
        slippage,
    }: any) {
        const chainId = inputCurrency.chainId;
        const _inputCurrencyAddress = this.getTokenAddress(inputCurrency);
        const _outputCurrencyAddress = this.getTokenAddress(outputCurrency);

        const res: any = await axios.get(`${this.Api}/findPath`, {
            params: {
                chainId,
                amountIn: new Big(inputAmount).mul(10 ** inputCurrency.decimals).toFixed(0),
                tokenIn: _inputCurrencyAddress,
                tokenOut: _outputCurrencyAddress,
                pathDeep: 3,
                poolSafeMode: true,
                slippage
            }
        });

        console.log('res: %o', res);
        if (res.data.result_code !== 0) {
            return null;
        }

        return res.data.result_data;
    }

    private async getTxn({
        inputCurrency,
        outputCurrency,
        routes,
        chainId,
        account,
        inputAmount,
        outputAmount,
    }: any) {
        const _inputCurrencyAddress = this.getTokenAddress(inputCurrency);
        const _outputCurrencyAddress = this.getTokenAddress(outputCurrency);


        const res: any = await axios.post(`${this.Api}/swapPath`, {
            routes,
            chain_id: chainId,
            contract_in: _inputCurrencyAddress,
            contract_out: _outputCurrencyAddress,
            in_eth: inputCurrency.isNative ? 1 : 0,
            out_eth: outputCurrency.isNative ? 1 : 0,
            amount_in: inputAmount,
            amount_out: outputAmount,
            deadline: Math.floor((Date.now() + 20 * 60 * 1000) / 1000)
        })

        console.log('getTxn: %o', res);


        if (!res.data?.data) {
            return null;
        }

        const provider = new providers.JsonRpcProvider(chains[chainId].rpcUrls[0]);

        const contract = new ethers.Contract(this.RouterAddress[chainId], ABI, provider.getSigner(account));

        const txn = await contract.populateTransaction.swap('0x' + res.data.data);
        const value = inputCurrency.isNative ? inputAmount : '0'
        try {
            const gasLimit = await contract.estimateGas.swap('0x' + res.data.data, { value });
            txn.gasLimit = gasLimit;
            console.log('gasLimit: %o', Number(gasLimit));
        } catch (error) {
        }
        
        txn.value = value;
        return txn;
    }
    public async quoter({
        inputCurrency,
        outputCurrency,
        inputAmount,
        slippage,
        account
    }: any) {
        const chainId = inputCurrency.chainId;

        const result: any = {
            txn: null,
            outputCurrencyAmount: '0',
            noPair: true,
            routerAddress: this.RouterAddress[chainId],
            routes: null,
            gas: '0'
        };

        const path = await this.getPath({
            inputCurrency,
            outputCurrency,
            inputAmount,
            slippage
        });

        if (!path || !path.amount_out) {
            return result;
        }

        try {
            const inputValue = new Big(inputAmount).mul(10 ** inputCurrency.decimals).toFixed(0)

            const txn = await this.getTxn({
                inputCurrency,
                outputCurrency,
                routes: path.routes,
                chainId,
                account,
                inputAmount: inputValue,
                outputAmount: path.amount_out
            });

            if (!txn) {
                return result;
            }

            result.outputCurrencyAmount = new Big(path.amount_out).div(10 ** outputCurrency.decimals).toFixed(outputCurrency.decimals);
            result.noPair = false;
            result.gas = txn.gasLimit;
            // result.routes = path.routes;
            result.txn = {
                ...txn,
                // gasLimit: '3218793'
            };

            console.log('txn: %o', txn);

            // if (txRequest.gasLimit) {
            //     txRequest.gasLimit = BigNumber(txRequest.gasLimit.toString())
            //         .multipliedBy(1.2)
            //         .toFixed(0);
            // }

            // result.txn = txRequest;
            result.noPair = false;

            return result;
        } catch (error) {
            this.log("quoter error: %o", error);
        }

        return result;
    }
}


const ABI = [
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "swap",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
]