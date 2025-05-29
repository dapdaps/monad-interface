import { useEffect, useState } from "react";
import { post } from "@/utils/http";
import { useTwitterStore } from "@/stores/twitter";
import useToast from "@/hooks/use-toast";
import useUser from "@/hooks/use-user";
import { useAccount } from "wagmi";

export default function useBindTwitterAccount({ withAuth }: any) {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Connect Wallet");
  const twitterStore: any = useTwitterStore();
  const toast = useToast();
  const { getAccessToken } = useUser();
  const { address } = useAccount();

  const handleBind = async () => {
    if (loading || !twitterStore.id || !address) return;
    setLoading(true);
    try {
      if (!withAuth) {
        await getAccessToken();
      }
      const result = await post("/twitter/bind/account", {
        twitter_user_id: twitterStore.id
      });
      if (result.code === 10006) {
        const isAddress = address?.toLowerCase() !== result.data.address;
        const msg = isAddress
          ? `X linked to ${result.data.address}`
          : `Wallet linked to @${result.data.twitter_user_name}`;
        toast.fail({
          title: msg
        });
        setButtonText(
          isAddress
            ? `Switch wallet ${result.data.address.slice(
                0,
                4
              )}...${result.data.address?.slice(-4)}`
            : `Switch X ${result.data.twitter_user_name}`
        );
        throw new Error("");
      }
      if (result.code !== 200) throw new Error(result.msg);
      setButtonText("");
      twitterStore.set({ address });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!address) {
      setButtonText("Connect Wallet");
      return;
    }
    if (twitterStore.address) {
      setButtonText(
        twitterStore.address.toLowerCase() === address.toLowerCase()
          ? ""
          : `Switch wallet ${twitterStore.address?.slice(
              0,
              4
            )}...${twitterStore.address?.slice(-4)}`
      );
    } else {
      setButtonText(
        `Bind X to ${address?.slice(0, 4)}...${address?.slice(-4)}`
      );
    }
  }, [address]);

  return { loading, buttonText, handleBind };
}
