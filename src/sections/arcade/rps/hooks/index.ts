import useCustomAccount from "@/hooks/use-account";
import { post } from "@/utils/http";
import { useRequest } from "ahooks";
import { RPSMove } from "../config";
import { useState } from "react";

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



  return {

  };
}
