import { useState, useCallback, useEffect } from "react";
import useToast from "@/hooks/use-toast";
import { get, post } from "@/utils/http";
import useCustomAccount from "@/hooks/use-account";

export default function useLogin() {
  const [updating, setUpdating] = useState(false);
  const toast = useToast();
  const { account } = useCustomAccount();

  const onLogin = useCallback(
    async (name: string) => {
      try {
        const res = await post("/chat/login", { address: account });
      } catch (err) {}
    },
    [account]
  );

  const onUpdateName = async (name: string) => {
    try {
      setUpdating(true);
      const res = await post("/chat/user/name", { address: account, name });
    } catch (err) {
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {}, [account]);

  return {
    updating,
    onUpdateName
  };
}
