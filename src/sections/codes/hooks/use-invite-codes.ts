import { get } from "@/utils/http";
import { useEffect, useState } from "react";

export default function useInviteCodes(updater?) {
  const [loading, setLoading] = useState(false)
  const [inviteCodes, setInviteCodes] = useState<>(null)

  async function handleGetInviteCodes() {
    try {
      setLoading(true)
      const result = await get("/invite/codes")
      setLoading(false)
      setInviteCodes(result?.data)
    } catch (error) {
      setLoading(false)
      throw new Error(error)
    }
  }
  useEffect(() => {
    handleGetInviteCodes()
  }, [updater])

  return {
    loading,
    inviteCodes,
  }
}