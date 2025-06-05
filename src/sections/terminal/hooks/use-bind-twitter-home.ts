import { redirect, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import useToast from "@/hooks/use-toast";
import { useTwitterStore } from "@/stores/twitter";
import { post } from "@/utils/http";
import { useDebounceFn } from "ahooks";
import * as http from "@/utils/http";
import { useAccount } from "wagmi";

const checkAk = async () => {
  const result = window.sessionStorage.getItem(http.AUTH_TOKENS);
  const parsedResult = result ? JSON.parse(result) : {};
  if (parsedResult.access_token) {
    return true;
  }

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(0);
    }, 500);
  });

  checkAk();
};

export default function useBindTwitterHome() {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Connect X to access");
  const toast = useToast();
  const { address } = useAccount();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const twitterStore: any = useTwitterStore();

  const handleBind = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading({
      title: `Binding`
    });
    try {
      await checkAk();
      const result = await post("/twitter/bind", {
        code,
        redirect_uri: window.location.origin
      });
      if (result.code === 10006) {
        const isAddress = address?.toLowerCase() !== result.data.address;

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

      setLoading(false);
      setButtonText("");
      twitterStore.set({
        address,
        id: result.data.twitter_user_id,
        info: {
          id: result.data.twitter_user_id,
          name: result.data.twitter_user_name,
          avatar: result.data.twitter_avatar
        },
        code
      });
    } catch (err) {
      setLoading(false);
      toast.dismiss(toastId);
    }
  }, [code, loading]);

  const { run } = useDebounceFn(
    () => {
      if (twitterStore.address.toLowerCase() === address?.toLowerCase()) {
        setButtonText("");
        return;
      }
      if (!code) return;
      if (twitterStore.code === code) {
        return;
      }
      handleBind();
    },
    { wait: 500 }
  );

  useEffect(() => {
    run();
  }, [code, twitterStore.id]);

  return { loading, buttonText };
}
