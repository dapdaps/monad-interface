import useCustomAccount from "@/hooks/use-account";
import { get } from "@/utils/http";
import { useEffect, useMemo, useState } from "react";

export default function useInviteCodes(updater?: any) {
  const { accountWithAk } = useCustomAccount();

  const [loading, setLoading] = useState(false)
  const [inviteCodes, setInviteCodes] = useState<any>(null)

  const [tradeInviteCodes, unUsedInviteCodes] = useMemo(() => {
    return [
      inviteCodes?.filter((item: any) => item.source === "trade"),
      inviteCodes?.filter((item: any) => !item.used)
    ];
  }, [inviteCodes])

  async function handleGetInviteCodes() {
    try {
      setLoading(true)
      const result = await get("/invite/codes")
      setLoading(false)
      setInviteCodes(result?.data)
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }
  useEffect(() => {
    handleGetInviteCodes()
  }, [updater, accountWithAk])

  return {
    loading,
    inviteCodes,
    tradeInviteCodes,
    unUsedInviteCodes,
    handleGetInviteCodes
  }
}