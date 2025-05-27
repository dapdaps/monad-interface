import { useState, useEffect } from "react";
import { useTwitterStore } from "@/stores/twitter";
import useBindTwitter from "./use-bind-twitter";
import { useDebounceFn } from "ahooks";

export default function useLogin() {
  const [status, setStatus] = useState(0); // 1 for login page, 2 for terminal page.
  const [showLoading, setShowLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>({});
  const twitterStore: any = useTwitterStore();
  const { loading } = useBindTwitter({
    onSuccess(data) {
      setStatus(2);
      twitterStore.set({ id: data.id, info: data });
      setCurrentUser(data);
    },
    withAuth: false
  });

  const { run } = useDebounceFn(
    () => {
      if (twitterStore.id) {
        setStatus(2);
        setCurrentUser(twitterStore.info);
      } else {
        setStatus(1);
      }
    },
    { wait: 500 }
  );

  useEffect(() => {
    console.log(33, twitterStore.id);
    run();
  }, [twitterStore.id]);

  useEffect(() => {
    setShowLoading(loading);
  }, [loading]);

  return {
    status,
    currentUser,
    showLoading,
    logining: loading
  };
}
