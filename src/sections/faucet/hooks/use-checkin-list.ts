import { get } from "@/utils/http";
import { useEffect, useState } from "react";

export default function useCheckinList() {
  const [loading, setLoading] = useState(false)
  const [checkinList, setCheckinList] = useState([])


  async function getCheckinList() {
    try {
      setLoading(true)
      const result = await get("/checkin/list")
      setLoading(false)
      setCheckinList(result?.data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  return {
    loading,
    checkinList,
    getCheckinList,
  }
}