import useCustomAccount from "@/hooks/use-account";
import { useRequest } from "ahooks";

export function useRPS(props?: any) {
  const { } = props ?? {};

  const { accountWithAk, account } = useCustomAccount();

  const { } = useRequest(async () => {
    if (!accountWithAk) {
      return;
    }
  }, {
    refreshDeps: [accountWithAk],
  });

  return {};
}
