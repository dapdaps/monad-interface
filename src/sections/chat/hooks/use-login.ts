import { useState, useCallback, useEffect } from "react";
import useToast from "@/hooks/use-toast";
import { post } from "@/utils/http";
import useCustomAccount from "@/hooks/use-account";
import { useDebounceFn } from "ahooks";

export default function useLogin() {
  const [updating, setUpdating] = useState(false);
  const { fail } = useToast();
  const { account } = useCustomAccount();
  const [status, setStatus] = useState(0); // 1 for login page, 2 for chat page.
  const [showLoading, setShowLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState<any>({});

  const onLogin = useCallback(async () => {
    try {
      const res = await post("/chat/login", { address: account });
      if (!res.data.name) {
        setStatus(1);
        return;
      }

      setCurrentUser({
        address: account,
        level: res.data.level,
        name: res.data.name,
        role: res.data.role
      });
      setStatus(2);
    } catch (err) {
    } finally {
      setTimeout(() => {
        setShowLoading(false);
      }, 2000);
    }
  }, [account]);

  const onUpdateName = async (name: string) => {
    try {
      setUpdating(true);
      await post("/chat/user/name", { address: account, name });
      await onLogin();
    } catch (err) {
      fail({
        title: "Login failed!"
      });
    } finally {
      setUpdating(false);
    }
  };

  const { run: debounceLogin } = useDebounceFn(
    () => {
      const timer = setTimeout(() => {
        if (!account) {
          setStatus(1);
          setShowLoading(false);
          setCurrentUser({});
        }
      }, 2000);

      if (account) {
        clearTimeout(timer);
        onLogin();
      }
    },
    { wait: 500 }
  );

  useEffect(() => {
    debounceLogin();
  }, [account]);

  return {
    updating,
    status,
    currentUser,
    onUpdateName,
    showLoading
  };
}
