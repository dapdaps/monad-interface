import { useCallback, useState } from "react";

import { usePriceStore } from "@/stores/usePriceStore";
import * as http from "@/utils/http";

const DELAY = 1000 * 60 * 5;
export default function () {
  const setPriceStore = usePriceStore((store: any) => store.set);
  const [pending, setPending] = useState(false);
  const initializePrice = useCallback(async () => {
    if (pending) return;
    setPending(true);
    try {
      const res = await http.get("/token/price");
      setPriceStore({
        price: res.data || {}
      });
      setTimeout(() => {
        initializePrice();
      }, DELAY);
      setPending(false);
    } catch (err) {
      setPending(false);
    }
  }, [pending]);

  return { initializePrice };
}
