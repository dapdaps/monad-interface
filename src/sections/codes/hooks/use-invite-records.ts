import useCustomAccount from "@/hooks/use-account";
import { get } from "@/utils/http";
import { useEffect, useState } from "react";

export default function useInviteRecords(updater?: any) {
  const [loading, setLoading] = useState(false)
  const [inviteRecords, setInviteRecords] = useState<any>(null)

  const { accountWithAk } = useCustomAccount();

  async function handleGetInviteRecords() {
    try {
      setLoading(true)
      const result = await get("/invite/records")
      setLoading(false)
      setInviteRecords(result?.data)
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }
  useEffect(() => {
    if (!accountWithAk) return;
    handleGetInviteRecords()
  }, [updater, accountWithAk])

  return {
    loading,
    inviteRecords,
  }
}