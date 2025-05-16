import type { Options, Plugin, Service } from 'ahooks/lib/useRequest/src/types';
import { useRequest } from 'ahooks';
import { useState } from 'react';

export function useRequestByToken<TData, TParams extends any[]>(service: Service<TData, TParams>, options?: Options<TData, TParams>, plugins?: Plugin<TData, TParams>[]) {
  const [ready, setReady] = useState(true);

  return useRequest(service, {
    ...options,
    ready,
  }, plugins);
}
