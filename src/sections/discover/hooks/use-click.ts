import { get } from "@/utils/http";
import { useRequest } from "ahooks";

export function useClick(props?: any) {
  const { } = props ?? {};

  const { runAsync: getData, loading, data } = useRequest(async () => {
    try {
      const res = await get("/track/click");
      if (res.code !== 200) {
        return;
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }, {
    refreshDeps: [],
  });

  const getVisits = (bpContent: string) => {
    return data?.[bpContent] || 0;
  };

  return {
    getData,
    loading,
    data,
    getVisits,
  };
}
