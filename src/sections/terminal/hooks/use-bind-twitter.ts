import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import useToast from "@/hooks/use-toast";
import { useTwitterStore } from "@/stores/twitter";
import { post } from "@/utils/http";
import { useDebounceFn } from "ahooks";

export default function useBindTwitter({
  onSuccess,
  withAuth
}: {
  onSuccess: (data: any) => void;
  withAuth: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
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
      const result = await post(
        !withAuth ? "/twitter/connect" : "/twitter/bind",
        {
          code,
          redirect_uri: window.location.origin + window.location.pathname
        }
      );
      if (result.code !== 200) throw new Error(result.msg);

      setLoading(false);
      onSuccess({
        id: result.data.twitter_user_id,
        name: result.data.twitter_user_name
      });
    } catch (err) {
      setLoading(false);
      toast.dismiss(toastId);
      toast.fail({
        title: `Twitter bind failed`
      });
    }
  }, [code, loading]);

  const { run } = useDebounceFn(
    () => {
      if (!code || twitterStore.id) return;
      handleBind();
    },
    { wait: 500 }
  );

  useEffect(() => {
    run();
  }, [code, twitterStore.id]);

  return { loading };
}
