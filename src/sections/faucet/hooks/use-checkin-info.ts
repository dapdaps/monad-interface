import useCustomAccount from "@/hooks/use-account";
import { useUserStore } from "@/stores/user";
import { AUTH_TOKENS, get } from "@/utils/http";
import { useEffect, useState } from "react";
import { ICheckinInfo } from "../config";

export default function useCheckinInfo() {
  // const account = useCustomAccount()
  const userStore = useUserStore()
  const [loading, setLoading] = useState(false)
  const [checkinInfo, setCheckinInfo] = useState<ICheckinInfo | null>(null)

  async function handleQueryCheckIn() {
    try {
      setLoading(true)
      const result = await get("/checkin")
      setLoading(false)
      setCheckinInfo(result?.data)
    } catch (error) {
      setLoading(false)
      throw new Error(error)
    }
  }
  useEffect(() => {
    userStore.accessToken.access_token && handleQueryCheckIn()
  }, [userStore.accessToken])

  return {
    loading,
    checkinInfo,
    handleQueryCheckIn
  }
}