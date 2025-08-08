import { DEFAULT_CHAIN_ID } from "@/configs";
import { monad } from "@/configs/tokens/monad-testnet";
import { Contract, utils } from "ethers";

interface RequestContractParams {
  address: string;
  abi: any;
  provider: any;
  params: any;
  value?: string | number;
  isEstimateGas?: boolean;
  method: string;
  toast?: any;
  toastId?: any;
}

export const requestContract = async (requestParams: RequestContractParams): Promise<{ success: boolean; transactionHash?: string; status?: number; error?: string; }> => {
  const {
    address,
    abi,
    provider,
    params,
    value,
    isEstimateGas = true,
    method,
    toast,
  } = requestParams;
  let { toastId } = requestParams;

  const contract = new Contract(address, abi, provider);
  const options: any = {
    gasLimit: 8000000,
  };

  let parsedValue: any;
  if (value) {
    parsedValue = utils.parseUnits(value.toString(), monad["mon"].decimals);
    options.value = parsedValue;
  }

  if (isEstimateGas) {
    try {
      const estimatedGas = await contract.estimateGas[method](...params, options);
      options.gasLimit = Math.floor(Number(estimatedGas) * 1.2);
      console.log(`Estimated gas for ${method}: ${estimatedGas}, using: ${options.gasLimit}`);
    } catch (err: any) {
      console.log("estimate gas failed: %o", err);
      options.gasLimit = 10000000;
    }
  }

  const maxRetries = 1;
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempting ${method} (attempt ${attempt}/${maxRetries})`);

      const tx = await contract[method](...params, options);

      if (toast && toastId) {
        toast.dismiss(toastId);
        toastId = toast.loading({
          title: "Confirming...",
          tx: tx.hash,
          chainId: DEFAULT_CHAIN_ID,
        }, "bottom-right");
      }

      const receipt = await tx.wait();

      if (toast && toastId) {
        toast.dismiss(toastId);
      }

      console.log(`Transaction successful: ${tx.hash}`);
      return { success: true, ...receipt };

    } catch (err: any) {
      lastError = err;
      console.log(`${method} failed (attempt ${attempt}/${maxRetries}): %o`, err);

      if (attempt === maxRetries) {
        return {
          success: false,
          error: err.message || err.reason || "Transaction failed"
        };
      }

      await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
    }
  }

  return { success: false, error: lastError?.message || "Transaction failed after all retries" };
};
