import { DEFAULT_CHAIN_ID } from "@/configs";
import useCustomAccount from "@/hooks/use-account";
import { useConnectWallet } from "@/hooks/use-connect-wallet";
import useToast from "@/hooks/use-toast";
import { useRequest } from "ahooks";
import { Contract } from "ethers";
import { RPS_CONTRACT_ADDRESS, RPS_CONTRACT_ADDRESS_ABI } from "../contract";
import { RPSRecord } from "../config";

export function useClaim(rps?: any, history?: any) {
  const { getBetTokenBalance } = rps ?? {};
  const { onRecordLoading } = history ?? {};

  const { accountWithAk, account, chainId, provider } = useCustomAccount();
  const { onConnect, onSwitchChain } = useConnectWallet();
  const toast = useToast();

  const { runAsync: onClaim, loading: claiming } = useRequest(async (_record: RPSRecord) => {
    if (!account) {
      onConnect();
      return;
    }
    if (chainId !== DEFAULT_CHAIN_ID) {
      onSwitchChain({ chainId: DEFAULT_CHAIN_ID });
      return;
    }

    onRecordLoading(_record.room_id, true);
    let toastId = toast.loading({
      title: "Claiming...",
    });
    const contract = new Contract(RPS_CONTRACT_ADDRESS, RPS_CONTRACT_ADDRESS_ABI, provider);

    // check room status
    try {
      const res = await contract.canClaimTimeout(_record.room_id);
      if (!res) {
        toast.dismiss(toastId);
        toast.fail({
          title: "Claim failed",
          text: "This room can't be claimed yet",
        });
        onRecordLoading(_record.room_id, false);
        return;
      }
    } catch (error: any) {
      console.log("claim check failed: %o", error);
      toast.dismiss(toastId);
      toast.fail({
        title: "Claim failed",
        text: error.message,
      });
      onRecordLoading(_record.room_id, false);
      return;
    }

    // claim
    try {
      const tx = await contract.claimTimeout(_record.room_id);
      toast.dismiss(toastId);
      toastId = toast.loading({ title: "Confirming...", chainId, tx: tx.hash });
      const { status, transactionHash } = await tx.wait();
      toast.dismiss(toastId);

      if (status !== 1) {
        toast.fail({
          title: "Claim failed",
          tx: transactionHash,
          chainId,
        });
        onRecordLoading(_record.room_id, false);
        return;
      }

      toast.success({
        title: "Claim successful",
        tx: transactionHash,
        chainId,
      });

      // claim done
      getBetTokenBalance();
      onRecordLoading(_record.room_id, false);
    } catch (error: any) {
      console.log("claim failed: %o", error);
      toast.fail({
        title: "Claim failed",
        text: error.message,
      });
    }
  }, { manual: true });

  return {
    onClaim,
    claiming,
  };
}
