import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import useToast from "@/hooks/use-toast";
import { useTwitterStore } from "@/stores/twitter";
import { post } from "@/utils/http";
import { useDebounceFn } from "ahooks";
import * as http from "@/utils/http";
import { useAccount } from "wagmi";
import { useUserStore } from "@/stores/user";

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
  const userStore: any = useUserStore();

  const handleBind = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading({
      title: `Binding`
    });
    try {
      await checkAk();
      const redirectUri = window.location.origin === 'https://nadsa.space' ? 'https://www.nadsa.space' : window.location.origin;
      const result = await post("/twitter/bind", {
        code,
        redirect_uri: redirectUri
      });
      toast.dismiss(toastId);
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
      if (result.code !== 200) {
        toast.fail({
          title: "Bind failed!",
          text: result.msg,
        });
        throw new Error(result.msg);
      }

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
      toast.success({
        title: `Bind successful!`
      });
    } catch (err) {
      setLoading(false);
      toast.dismiss(toastId);
    }
  }, [code, loading]);

  const { run } = useDebounceFn(
    () => {
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

  useEffect(() => {
    if (userStore.user.twitter) {
      setButtonText("");
      twitterStore.set({
        address: userStore.user.address,
        id: userStore.user.twitter.twitter_user_id,
        info: {
          id: userStore.user.twitter.twitter_user_id,
          name: userStore.user.twitter.twitter_user_name,
          avatar: userStore.user.twitter.twitter_avatar
        }
      });
    } else {
      setButtonText("Connect X to access");
    }
  }, [userStore.user]);

  return { loading, buttonText };
}
