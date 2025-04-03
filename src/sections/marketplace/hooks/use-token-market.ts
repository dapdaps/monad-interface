import useToast from "@/hooks/use-toast";
import { get } from "@/utils/http";
import { useEffect, useState } from "react";

export default function useTokenMarket() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [market, setMarket] = useState<any>([]);
  const [updater, setUpdater] = useState(0);
  async function handleQueryTokenMarket() {
    try {
      setLoading(true);
      const response = await get("/token/market");
      setLoading(false);
      if (response.code === 200) {
        setMarket(response?.data ?? []);
      } else {
        throw new Error(response?.data);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }
  function onRefresh() {
    setUpdater(Date.now());
  }

  useEffect(() => {
    handleQueryTokenMarket();
  }, [updater]);

  return {
    loading,
    market,
    onRefresh
  };
}
