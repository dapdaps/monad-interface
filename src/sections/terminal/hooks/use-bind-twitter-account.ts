import { useCallback, useEffect, useState } from "react";
import { post } from "@/utils/http";
import { useTwitterStore } from "@/stores/twitter";
import useToast from "@/hooks/use-toast";
import useUser from "@/hooks/use-user";
import { useDebounceFn } from "ahooks";
import { useAccount } from "wagmi";

export default function useBindTwitterAccount({ withAuth }: any) {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Connect Wallet");
  const twitterStore: any = useTwitterStore();
  const toast = useToast();
  const { getAccessToken } = useUser();
  const { address } = useAccount();

  const handleBind = async () => {
    if (loading || !twitterStore.id) return;
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
        setButtonText(isAddress ? "Please switch wallet" : "Please switch X");
        throw new Error("");
      }
      if (result.code !== 200) throw new Error(result.msg);
      setButtonText("");
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const { run } = useDebounceFn(
    () => {
      if (address) {
        handleBind();
      } else {
        setButtonText("Connect Wallet");
      }
    },
    { wait: 500 }
  );

  useEffect(() => {
    run();
  }, [address]);

  return { loading, buttonText };
}
