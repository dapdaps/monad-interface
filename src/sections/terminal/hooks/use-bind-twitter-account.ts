import { useCallback, useEffect, useState } from "react";
import { post } from "@/utils/http";
import { useTwitterStore } from "@/stores/twitter";
import useToast from "@/hooks/use-toast";
import useUser from "@/hooks/use-user";
import { useDebounceFn } from "ahooks";
import { useAccount } from "wagmi";

export default function useBindTwitterAccount({ withAuth }: any) {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const twitterStore: any = useTwitterStore();
  const toast = useToast();
  const { getAccessToken } = useUser();
  const { address } = useAccount();

  const handleBind = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (!withAuth) {
        await getAccessToken();
      }
      const result = await post("/twitter/bind/account", {
        twitter_user_id: twitterStore.id
      });
      if (result.code === 10006) {
        toast.fail({
          title: "X is linked"
        });
        throw new Error("");
      }
      if (result.code !== 200) throw new Error(result.msg);
      setIsSuccess(true);
    } catch (err) {
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const { run } = useDebounceFn(
    () => {
      if (address) handleBind();
    },
    { wait: 500 }
  );

  useEffect(() => {
    run();
  }, [address]);

  return { loading, isSuccess, checkBindTwitterAccount: run };
}
