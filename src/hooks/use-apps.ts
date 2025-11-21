import { useCallback } from 'react';
import { useRequest } from 'ahooks';
import { get } from '@/utils/http';
import { useAppsStore, App } from '@/stores/apps';

export function useApps() {
  const { apps, setApps } = useAppsStore();

  const { run: fetchApps, loading } = useRequest(
    async () => {
      try {
        const result = await get('/apps');
        const data = result?.data || [];
        setApps(data);
        return data;
      } catch (err) {
        console.error('fetchApps failed: %o', err);
        setApps([]);
        return [];
      }
    },
    { manual: true }
  );

  const refreshApps = useCallback(() => {
    fetchApps();
  }, [fetchApps]);

  return {
    apps,
    loading,
    fetchApps,
    refreshApps,
  };
}

