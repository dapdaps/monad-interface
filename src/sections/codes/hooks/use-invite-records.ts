import { get } from "@/utils/http";
import { useEffect, useState } from "react";

export default function useInviteRecords(updater?) {
  const [loading, setLoading] = useState(false)
  const [inviteRecords, setInviteRecords] = useState<>(null)

  async function handleGetInviteRecords() {
    try {
      setLoading(true)
      const result = await get("/invite/records")
      setLoading(false)
      setInviteRecords(result?.data)
    } catch (error) {
      setLoading(false)
      throw new Error(error)
    }
  }
  useEffect(() => {
    handleGetInviteRecords()
  }, [updater])

  return {
    loading,
    inviteRecords,
  }
}